<?php
/**
 * DYUTI 2027 Registration Persistence API (save_registration.php)
 * Compatible with PHP 5.6, 7.x, and 8.x
 */

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Accept');
header('Content-Type: application/json');

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
    echo json_encode([
        'status' => 'error',
        'message' => 'Empty registration payload received.'
    ]);
    exit;
}

$pdo = getDbConnection();

if (!$pdo) {
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'message' => 'Database connection failed. Could not save registration.'
    ]);
    exit;
}

try {
    $paymentMode = strtolower(val($data, 'paymentMode', val($data, 'payment_mode', 'online')));
    if (!in_array($paymentMode, ['online', 'bank_transfer'])) {
        $paymentMode = 'online';
    }

    $rawStatus = strtolower(val($data, 'paymentStatus', val($data, 'payment_status', 'pending')));
    $allowedStatuses = ['pending', 'success', 'failed', 'refunded', 'cancelled'];
    $paymentStatus = in_array($rawStatus, $allowedStatuses) ? $rawStatus : 'pending';

    $defaultRegId = 'DYUTI27-' . ($paymentMode === 'bank_transfer' ? 'REG-' : 'ONLINE-') . mt_rand(10000, 99999);
    $regId = val($data, 'registration_id', val($data, 'regId', $defaultRegId));

    $txnRef = val($data, 'transactionRef', val($data, 'transaction_ref', val($data, 'vortex_transaction_id', val($data, 'transaction_id', null))));
    $orderId = val($data, 'payment_order_id', val($data, 'order_id', val($data, 'vortex_order_id', null)));

    $stmt = $pdo->prepare("
        INSERT INTO registrations (
            registration_id, title, full_name, designation, gender, organization, discipline,
            address, pincode, phone, email, food_preference, food_details,
            require_accommodation, accommodation_notes, is_presenting_paper, paper_title,
            cmt_paper_id, paper_theme, registration_category, fee_amount, currency,
            payment_mode, payment_status, payment_order_id, razorpay_payment_id,
            transaction_ref, ip_address, user_agent
        ) VALUES (
            :reg_id, :title, :name, :designation, :gender, :org, :discipline,
            :address, :pincode, :phone, :email, :food_pref, :food_details,
            :accommodation, :accommodation_notes, :is_presenting, :paper_title,
            :cmt_id, :paper_theme, :category, :fee, :currency,
            :payment_mode, :payment_status, :payment_order_id, :pay_id,
            :txn_ref, :ip, :ua
        )
        ON DUPLICATE KEY UPDATE
            payment_status = VALUES(payment_status),
            payment_order_id = COALESCE(VALUES(payment_order_id), payment_order_id),
            razorpay_payment_id = COALESCE(VALUES(razorpay_payment_id), razorpay_payment_id),
            transaction_ref = COALESCE(VALUES(transaction_ref), transaction_ref),
            updated_at = NOW()
    ");

    $stmt->execute([
        ':reg_id'              => $regId,
        ':title'               => val($data, 'title', 'Dr.'),
        ':name'                => val($data, 'name', val($data, 'full_name', '')),
        ':designation'         => val($data, 'designation', ''),
        ':gender'              => val($data, 'gender', ''),
        ':org'                 => val($data, 'organization', ''),
        ':discipline'          => val($data, 'discipline', ''),
        ':address'             => val($data, 'address', ''),
        ':pincode'             => val($data, 'pincode', ''),
        ':phone'               => val($data, 'phone', val($data, 'mobile', '')),
        ':email'               => val($data, 'email', ''),
        ':food_pref'           => val($data, 'foodPreference', val($data, 'food_preference', 'veg')),
        ':food_details'        => val($data, 'foodDetails', val($data, 'food_details', null)),
        ':accommodation'       => strtolower(val($data, 'requireAccommodation', val($data, 'require_accommodation', 'no'))) === 'yes' ? 'yes' : 'no',
        ':accommodation_notes' => val($data, 'accommodationNotes', val($data, 'accommodation_notes', null)),
        ':is_presenting'       => strtolower(val($data, 'isPresentingPaper', val($data, 'is_presenting_paper', 'no'))) === 'yes' ? 'yes' : 'no',
        ':paper_title'         => val($data, 'paperTitle', val($data, 'paper_title', null)),
        ':cmt_id'              => val($data, 'cmtPaperId', val($data, 'cmt_paper_id', null)),
        ':paper_theme'         => val($data, 'paperTheme', val($data, 'paper_theme', null)),
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
    ]);

    echo json_encode([
        'status' => 'success',
        'registration_id' => $regId,
        'message' => 'Registration saved to database successfully.'
    ]);
} catch (PDOException $e) {
    error_log("Error saving registration: " . $e->getMessage());
    echo json_encode([
        'status' => 'error',
        'message' => 'Database save error: ' . $e->getMessage()
    ]);
}
?>
