<?php
/**
 * DYUTI 2027 Registration Persistence API (save_registration.php)
 * Strictly 100% compatible with PHP 5.6, 7.x, and 8.x
 *
 * CRITICAL RULE:
 * - Every new registration form submission MUST ALWAYS INSERT A NEW ROW.
 * - No existing registration data must EVER be removed or overwritten.
 * - All participant entries are preserved.
 * - Updates ONLY modify payment status metadata (payment_status, transaction_ref, updated_at)
 *   and NEVER overwrite a participant's personal particulars (name, email, phone, etc.).
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

    $action = strtolower(trim(val($data, 'action', '')));

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
    $inputRegId = trim(val($data, 'registration_id', val($data, 'regId', '')));
    $txnRef  = val($data, 'transactionRef', val($data, 'transaction_ref', val($data, 'vortex_transaction_id', val($data, 'transaction_id', null))));
    $orderId = val($data, 'payment_order_id', val($data, 'order_id', val($data, 'vortex_order_id', null)));
    $payId   = val($data, 'razorpay_payment_id', val($data, 'payment_id', null));

    // Auto-ensure participation_type column exists in registrations table
    try {
        $chkCol = $pdo->query("SHOW COLUMNS FROM `registrations` LIKE 'participation_type'");
        if ($chkCol && $chkCol->rowCount() === 0) {
            $pdo->exec("ALTER TABLE `registrations` ADD COLUMN `participation_type` VARCHAR(64) NOT NULL DEFAULT 'regular' COMMENT 'regular, idea_pitch, stall' AFTER `is_presenting_paper`");
            $pdo->exec("ALTER TABLE `registrations` ADD INDEX `idx_participation_type` (`participation_type`)");
        }
    } catch (Exception $e) {
        // Continue safely if already exists or DDL not permitted
    }

    // Check if an existing record matches this registration_id
    $existingRow = null;
    if (!empty($inputRegId)) {
        $checkStmt = $pdo->prepare("SELECT id, registration_id, email, full_name, payment_status FROM registrations WHERE registration_id = :id LIMIT 1");
        $checkStmt->execute(array(':id' => $inputRegId));
        $existingRow = $checkStmt->fetch(PDO::FETCH_ASSOC);
    }

    $isPaymentUpdate = ($action === 'confirm_payment' || $action === 'update_payment' || (!empty($txnRef) && $paymentStatus === 'success'));

    // Fallback lookups when updating payment: if not matched by ID, try payment_order_id/txnRef or email
    if (!$existingRow && !empty($txnRef) && $isPaymentUpdate) {
        $checkTxnStmt = $pdo->prepare("SELECT id, registration_id, email, full_name, payment_status FROM registrations WHERE payment_order_id = :txn OR transaction_ref = :txn LIMIT 1");
        $checkTxnStmt->execute(array(':txn' => $txnRef));
        $existingRow = $checkTxnStmt->fetch(PDO::FETCH_ASSOC);
    }

    if (!$existingRow && !empty($email) && $isPaymentUpdate) {
        $checkEmailStmt = $pdo->prepare("
            SELECT id, registration_id, email, full_name, payment_status 
            FROM registrations 
            WHERE LOWER(email) = LOWER(:email) 
            ORDER BY (CASE WHEN LOWER(payment_status) = 'pending' THEN 1 ELSE 0 END) DESC, id DESC 
            LIMIT 1
        ");
        $checkEmailStmt->execute(array(':email' => $email));
        $existingRow = $checkEmailStmt->fetch(PDO::FETCH_ASSOC);
    }

    // 1. PAYMENT STATUS UPDATE (Confirm payment / Mark failed on existing registration)
    // ONLY executed when updating payment for an existing record.
    // NEVER overwrites delegate particulars (name, email, phone, organization, etc.).
    if ($existingRow && $isPaymentUpdate) {
        // Double check: if email is provided in payload and does not match existing record,
        // do not touch that other person's record!
        $existingEmail = strtolower(trim($existingRow['email']));
        if (!empty($email) && !empty($existingEmail) && $existingEmail !== $email) {
            // Email mismatch: stale ID from another user was submitted
            $existingRow = null;
        } else {
            // Safe in-place payment update ONLY (touching only payment metadata)
            $updateStmt = $pdo->prepare("
                UPDATE registrations SET
                    payment_status = :status,
                    payment_order_id = COALESCE(:order_id, payment_order_id),
                    razorpay_payment_id = COALESCE(:pay_id, razorpay_payment_id),
                    transaction_ref = COALESCE(:txn_ref, transaction_ref),
                    updated_at = NOW()
                WHERE registration_id = :reg_id
            ");
            $updateStmt->execute(array(
                ':status'   => $paymentStatus,
                ':order_id' => $orderId,
                ':pay_id'   => $payId,
                ':txn_ref'  => $txnRef,
                ':reg_id'   => $existingRow['registration_id']
            ));

            echo json_encode(array(
                'status' => 'success',
                'action' => 'updated_payment_status',
                'message' => 'Payment status successfully updated in database.',
                'registration_id' => $existingRow['registration_id'],
                'payment_status' => $paymentStatus
            ));
            exit;
        }
    }

    // 2. STRICT DUPLICATE PREVENTION FOR NEW REGISTRATIONS
    // If the delegate has ANY existing registration row (whether pending or confirmed),
    // strictly reject new registration attempts to prevent duplicate entries in the database.
    if (!empty($email) && !$isPaymentUpdate) {
        $checkDupStmt = $pdo->prepare("
            SELECT registration_id, payment_status, full_name
            FROM registrations
            WHERE LOWER(email) = LOWER(:email)
              AND (:reg_id = '' OR registration_id != :reg_id)
            ORDER BY (CASE WHEN LOWER(payment_status) IN ('success', 'captured', 'paid', 'confirmed') THEN 1 ELSE 0 END) DESC, id DESC
            LIMIT 1
        ");
        $checkDupStmt->execute(array(':email' => $email, ':reg_id' => $inputRegId));
        $dupRecord = $checkDupStmt->fetch(PDO::FETCH_ASSOC);
        if ($dupRecord) {
            $isConfirmed = in_array(strtolower($dupRecord['payment_status']), array('success', 'captured', 'paid', 'confirmed'));
            http_response_code(409);
            echo json_encode(array(
                'status' => 'error',
                'already_registered' => true,
                'registration_id' => $dupRecord['registration_id'],
                'payment_status' => $dupRecord['payment_status'],
                'message' => $isConfirmed
                    ? "The email '{$email}' is already registered with confirmed payment (Registration ID: {$dupRecord['registration_id']}). Duplicate entries are not permitted."
                    : "The email '{$email}' is already registered with Application ID '{$dupRecord['registration_id']}' (Payment Status: Pending). Duplicate registrations are not permitted. Please track your registration status to complete or retry your payment."
            ));
            exit;
        }
    }

    // 3. NEW REGISTRATION INSERTION
    // Every new registration form submission MUST ALWAYS INSERT A NEW ROW.
    // It must NEVER replace, update, or overwrite any existing participant's data.

    // Guarantee that $targetRegId is 100% unique and does not exist in registrations table
    $defaultPrefix = $paymentMode === 'bank_transfer' ? 'DYUTI27-REG-' : 'DYUTI27-ONLINE-';
    $targetRegId = $inputRegId;

    // Check if $targetRegId is already used by ANY row in the table
    $isAvailable = false;
    if (!empty($targetRegId)) {
        $chkUnique = $pdo->prepare("SELECT id FROM registrations WHERE registration_id = :id LIMIT 1");
        $chkUnique->execute(array(':id' => $targetRegId));
        $isAvailable = ($chkUnique->fetch() === false);
    }

    // If ID is empty or already in use, generate a brand new unique ID
    while (!$isAvailable) {
        $randomCode = mt_rand(100000, 999999);
        $targetRegId = $defaultPrefix . $randomCode;
        $chkUnique = $pdo->prepare("SELECT id FROM registrations WHERE registration_id = :id LIMIT 1");
        $chkUnique->execute(array(':id' => $targetRegId));
        if ($chkUnique->fetch() === false) {
            $isAvailable = true;
        }
    }

    // Parse purpose of participation: regular | idea_pitch | stall
    $rawPart = strtolower(trim(val($data, 'participationType', val($data, 'participation_type', 'regular'))));
    if (in_array($rawPart, array('idea_pitch', 'idea pitch', 'ideapitch', 'idea-pitch'))) {
        $participationType = 'idea_pitch';
    } elseif (in_array($rawPart, array('stall', 'exhibition', 'stall / exhibition', 'stall_participant', 'stall participant'))) {
        $participationType = 'stall';
    } else {
        $participationType = 'regular';
    }

    // Parse category & determine appropriate fee
    $rawCat = val($data, 'registrationCategory', val($data, 'registration_category', val($data, 'categoryLabel', val($data, 'category', 'student'))));
    $catMap = array(
        'student'      => 'UG / PG Student',
        'scholar'      => 'M.Phil / Research Scholars',
        'professional' => 'Professionals / Academicians',
        'stall'        => 'Stall / Exhibition Participant'
    );
    $category = isset($catMap[$rawCat]) ? $catMap[$rawCat] : $rawCat;

    $defaultFee = ($participationType === 'stall' || $rawCat === 'stall' || $category === 'Stall / Exhibition Participant' || $rawCat === 'professional' || $category === 'Professionals / Academicians') ? 1000.00 : 750.00;
    $feeAmount = (float)val($data, 'amount', val($data, 'fee_amount', $defaultFee));

    $insertStmt = $pdo->prepare("
        INSERT INTO registrations (
            registration_id, title, full_name, designation, gender, organization, discipline,
            address, pincode, phone, email, food_preference, food_details,
            require_accommodation, accommodation_notes, is_presenting_paper, participation_type,
            registration_category, fee_amount, currency,
            payment_mode, payment_status, payment_order_id, razorpay_payment_id,
            transaction_ref, ip_address, user_agent, email_sent
        ) VALUES (
            :reg_id, :title, :name, :designation, :gender, :org, :discipline,
            :address, :pincode, :phone, :email, :food_pref, :food_details,
            :accommodation, :accommodation_notes, :is_presenting, :part_type,
            :category, :fee, :currency,
            :payment_mode, :payment_status, :payment_order_id, :pay_id,
            :txn_ref, :ip, :ua, 0
        )
    ");

    $insertStmt->execute(array(
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
        ':part_type'           => $participationType,
        ':category'            => $category,
        ':fee'                 => $feeAmount,
        ':currency'            => val($data, 'currency', 'INR'),
        ':payment_mode'        => $paymentMode,
        ':payment_status'      => $paymentStatus,
        ':payment_order_id'    => $orderId,
        ':pay_id'              => $payId,
        ':txn_ref'             => $txnRef,
        ':ip'                  => isset($_SERVER['REMOTE_ADDR']) ? $_SERVER['REMOTE_ADDR'] : null,
        ':ua'                  => isset($_SERVER['HTTP_USER_AGENT']) ? $_SERVER['HTTP_USER_AGENT'] : null
    ));

    echo json_encode(array(
        'status' => 'success',
        'action' => 'inserted_new_row',
        'message' => 'New registration successfully inserted into database.',
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
