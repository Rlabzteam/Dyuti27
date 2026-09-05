<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Accept');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once __DIR__ . '/db_config.php';

$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true);

if (empty($data)) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Empty registration payload received.'
    ]);
    exit;
}

$pdo = getDbConnection();

if (!$pdo) {
    // If database connection is not yet configured, return success with registration ID for preview mode
    $regId = $data['registration_id'] ?? ('DYUTI27-REG-' . mt_rand(10000, 99999));
    echo json_encode([
        'status' => 'success',
        'registration_id' => $regId,
        'message' => 'Registration accepted (Database offline mode).'
    ]);
    exit;
}

try {
    $regId = $data['registration_id'] ?? ('DYUTI27-' . ($data['payment_mode'] === 'online' ? 'ONLINE-' : 'REG-') . mt_rand(10000, 99999));

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
        ':title'               => $data['title'] ?? 'Dr.',
        ':name'                => $data['name'] ?? $data['full_name'] ?? '',
        ':designation'         => $data['designation'] ?? '',
        ':gender'              => $data['gender'] ?? '',
        ':org'                 => $data['organization'] ?? '',
        ':discipline'          => $data['discipline'] ?? '',
        ':address'             => $data['address'] ?? '',
        ':pincode'             => $data['pincode'] ?? '',
        ':phone'               => $data['phone'] ?? '',
        ':email'               => $data['email'] ?? '',
        ':food_pref'           => $data['foodPreference'] ?? $data['food_preference'] ?? 'veg',
        ':food_details'        => $data['foodDetails'] ?? $data['food_details'] ?? null,
        ':accommodation'       => $data['requireAccommodation'] ?? $data['require_accommodation'] ?? 'no',
        ':accommodation_notes' => $data['accommodationNotes'] ?? $data['accommodation_notes'] ?? null,
        ':is_presenting'       => $data['isPresentingPaper'] ?? $data['is_presenting_paper'] ?? 'no',
        ':paper_title'         => $data['paperTitle'] ?? $data['paper_title'] ?? null,
        ':cmt_id'              => $data['cmtPaperId'] ?? $data['cmt_paper_id'] ?? null,
        ':paper_theme'         => $data['paperTheme'] ?? $data['paper_theme'] ?? null,
        ':category'            => $data['registrationCategory'] ?? $data['registration_category'] ?? 'student',
        ':fee'                 => $data['amount'] ?? $data['fee_amount'] ?? 750.00,
        ':currency'            => $data['currency'] ?? 'INR',
        ':payment_mode'        => $data['paymentMode'] ?? $data['payment_mode'] ?? 'online',
        ':payment_status'      => $data['paymentStatus'] ?? $data['payment_status'] ?? 'pending',
        ':payment_order_id'    => $data['payment_order_id'] ?? $data['order_id'] ?? null,
        ':pay_id'              => $data['razorpay_payment_id'] ?? $data['payment_id'] ?? null,
        ':txn_ref'             => $data['transactionRef'] ?? $data['transaction_ref'] ?? null,
        ':ip'                  => $_SERVER['REMOTE_ADDR'] ?? null,
        ':ua'                  => $_SERVER['HTTP_USER_AGENT'] ?? null
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
