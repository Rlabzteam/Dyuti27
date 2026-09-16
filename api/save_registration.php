<?php
/**
 * DYUTI 2027 Registration Persistence API (save_registration.php)
 * Reuses existing pending/failed records on payment retry to prevent duplicate rows in database.
 * Strictly 100% compatible with PHP 5.6, 7.x, and 8.x
 */

ini_set('display_errors', 0);
error_reporting(E_ALL & ~E_NOTICE & ~E_DEPRECATED);

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Accept');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once __DIR__ . '/db_config.php';

// Safe getter helper compatible with PHP 5.6+
function val($arr, $key, $fallback = '') {
    return (is_array($arr) && isset($arr[$key]) && $arr[$key] !== '') ? $arr[$key] : $fallback;
}

$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true);

if (empty($data) || !is_array($data)) {
    echo json_encode(array(
        'status' => 'error',
        'message' => 'Empty registration payload received.'
    ));
    exit;
}

$pdo = getDbConnection();

if (!$pdo) {
    http_response_code(500);
    echo json_encode(array(
        'status' => 'error',
        'message' => 'Database connection failed. Could not save registration.'
    ));
    exit;
}

try {
    $pdo->setAttribute(PDO::ATTR_EMULATE_PREPARES, true);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $paymentMode = strtolower(val($data, 'paymentMode', val($data, 'payment_mode', 'online')));
    if (!in_array($paymentMode, array('online', 'bank_transfer'))) {
        $paymentMode = 'online';
    }

    // Normalize payment status: allow explicit 'success', 'failed', 'cancelled', or default 'pending'
    $rawStatus = strtolower(val($data, 'payment_status', val($data, 'paymentStatus', 'pending')));
    if (in_array($rawStatus, array('success', 'captured', 'paid', 'confirmed'))) {
        $paymentStatus = 'success';
    } elseif (in_array($rawStatus, array('failed', 'failure', 'cancelled', 'incomplete', 'error'))) {
        $paymentStatus = 'failed';
    } else {
        $paymentStatus = 'pending';
    }

    $email = strtolower(trim(val($data, 'email', '')));
    $phone = trim(val($data, 'phone', val($data, 'mobile', '')));
    $phoneDigits = preg_replace('/\D/', '', $phone);
    $phoneLast10 = strlen($phoneDigits) >= 10 ? substr($phoneDigits, -10) : $phoneDigits;

    // Check if client explicitly provided an existing registration_id (e.g. from Retry Payment)
    $inputRegId = trim(val($data, 'registration_id', val($data, 'regId', '')));

    // 1. If delegate already has a CONFIRMED / SUCCESS registration, prevent duplicate entries
    if (!empty($email)) {
        $checkDupStmt = $pdo->prepare("
            SELECT registration_id, payment_status, full_name
            FROM registrations
            WHERE email = :email 
              AND LOWER(payment_status) IN ('success', 'captured', 'paid', 'confirmed')
              AND (:reg_id = '' OR registration_id != :reg_id)
            LIMIT 1
        ");
        $checkDupStmt->execute(array(':email' => $email, ':reg_id' => $inputRegId));
        $dupRecord = $checkDupStmt->fetch(PDO::FETCH_ASSOC);
        if ($dupRecord) {
            http_response_code(409);
            echo json_encode(array(
                'status' => 'error',
                'already_registered' => true,
                'registration_id' => $dupRecord['registration_id'],
                'message' => "The email '{$email}' is already registered with confirmed payment (Registration ID: {$dupRecord['registration_id']}). Duplicate entries are not permitted."
            ));
            exit;
        }
    }

    // 2. REUSE EXISTING PENDING/FAILED REGISTRATION:
    // If user previously registered and is retrying payment, DO NOT CREATE A NEW ROW!
    // Reuse their existing registration_id so the existing row is updated in-place.
    $targetRegId = '';
    if (!empty($inputRegId)) {
        $targetRegId = $inputRegId;
    } else {
        // Look for existing pending/failed registration matching this delegate's email or phone
        if (!empty($email) || !empty($phoneLast10)) {
            $findPendingStmt = $pdo->prepare("
                SELECT registration_id 
                FROM registrations 
                WHERE (
                    (:email != '' AND email = :email) 
                    OR (:phone_last10 != '' AND phone LIKE :phone_like)
                )
                AND LOWER(payment_status) IN ('pending', 'failed')
                ORDER BY id DESC LIMIT 1
            ");
            $findPendingStmt->execute(array(
                ':email'        => $email,
                ':phone_last10' => $phoneLast10,
                ':phone_like'   => '%' . $phoneLast10
            ));
            $existingPending = $findPendingStmt->fetch(PDO::FETCH_ASSOC);
            if ($existingPending && !empty($existingPending['registration_id'])) {
                $targetRegId = $existingPending['registration_id'];
            }
        }
    }

    // If still empty (brand new first-time registrant), generate a new reference ID
    if (empty($targetRegId)) {
        $defaultPrefix = $paymentMode === 'bank_transfer' ? 'DYUTI27-REG-' : 'DYUTI27-ONLINE-';
        $targetRegId = $defaultPrefix . mt_rand(10000, 99999);
    }

    $txnRef  = val($data, 'transactionRef', val($data, 'transaction_ref', val($data, 'vortex_transaction_id', val($data, 'transaction_id', null))));
    $orderId = val($data, 'payment_order_id', val($data, 'order_id', val($data, 'vortex_order_id', null)));

    $stmt = $pdo->prepare("
        INSERT INTO registrations (
            registration_id, title, full_name, designation, gender, organization, discipline,
            address, pincode, phone, email, food_preference, food_details,
            require_accommodation, accommodation_notes, is_presenting_paper,
            registration_category, fee_amount, currency,
            payment_mode, payment_status, payment_order_id, razorpay_payment_id,
            transaction_ref, ip_address, user_agent, email_sent
        ) VALUES (
            :reg_id, :title, :name, :designation, :gender, :org, :discipline,
            :address, :pincode, :phone, :email, :food_pref, :food_details,
            :accommodation, :accommodation_notes, :is_presenting,
            :category, :fee, :currency,
            :payment_mode, :payment_status, :payment_order_id, :pay_id,
            :txn_ref, :ip, :ua, 0
        )
        ON DUPLICATE KEY UPDATE
            title = VALUES(title),
            full_name = VALUES(full_name),
            designation = VALUES(designation),
            gender = VALUES(gender),
            organization = VALUES(organization),
            discipline = VALUES(discipline),
            address = VALUES(address),
            pincode = VALUES(pincode),
            phone = VALUES(phone),
            email = VALUES(email),
            food_preference = VALUES(food_preference),
            require_accommodation = VALUES(require_accommodation),
            is_presenting_paper = VALUES(is_presenting_paper),
            fee_amount = VALUES(fee_amount),
            registration_category = VALUES(registration_category),
            payment_status = VALUES(payment_status),
            payment_order_id = COALESCE(VALUES(payment_order_id), payment_order_id),
            razorpay_payment_id = COALESCE(VALUES(razorpay_payment_id), razorpay_payment_id),
            transaction_ref = COALESCE(VALUES(transaction_ref), transaction_ref),
            updated_at = NOW()
    ");

    $stmt->execute(array(
        ':reg_id'              => $targetRegId,
        ':title'               => val($data, 'title', 'Dr.'),
        ':name'                => val($data, 'name', val($data, 'full_name', '')),
        ':designation'         => val($data, 'designation', ''),
        ':gender'              => val($data, 'gender', ''),
        ':org'                 => val($data, 'organization', ''),
        ':discipline'          => val($data, 'discipline', ''),
        ':address'             => val($data, 'address', ''),
        ':pincode'             => val($data, 'pincode', ''),
        ':phone'               => $phone,
        ':email'               => $email,
        ':food_pref'           => val($data, 'foodPreference', val($data, 'food_preference', 'veg')),
        ':food_details'        => val($data, 'foodDetails', val($data, 'food_details', null)),
        ':accommodation'       => strtolower(val($data, 'requireAccommodation', val($data, 'require_accommodation', 'no'))) === 'yes' ? 'yes' : 'no',
        ':accommodation_notes' => val($data, 'accommodationNotes', val($data, 'accommodation_notes', null)),
        ':is_presenting'       => strtolower(val($data, 'isPresentingPaper', val($data, 'is_presenting_paper', 'no'))) === 'yes' ? 'yes' : 'no',
        ':category'            => val($data, 'registrationCategory', val($data, 'registration_category', val($data, 'categoryLabel', 'student'))),
        ':fee'                 => val($data, 'amount', val($data, 'fee_amount', 750.00)),
        ':currency'            => val($data, 'currency', 'INR'),
        ':payment_mode'        => $paymentMode,
        ':payment_status'      => $paymentStatus,
        ':payment_order_id'    => $orderId,
        ':pay_id'              => val($data, 'razorpay_payment_id', val($data, 'payment_id', null)),
        ':txn_ref'             => $txnRef,
        ':ip'                  => isset($_SERVER['REMOTE_ADDR']) ? $_SERVER['REMOTE_ADDR'] : null,
        ':ua'                  => isset($_SERVER['HTTP_USER_AGENT']) ? $_SERVER['HTTP_USER_AGENT'] : null
    ));

    echo json_encode(array(
        'status' => 'success',
        'message' => 'Registration successfully updated in database.',
        'registration_id' => $targetRegId,
        'payment_status' => $paymentStatus
    ));

} catch (Exception $e) {
    error_log("Save registration database error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(array(
        'status' => 'error',
        'message' => 'Database error while saving registration: ' . $e->getMessage()
    ));
}
?>
