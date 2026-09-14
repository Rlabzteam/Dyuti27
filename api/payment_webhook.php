<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Accept, X-Razorpay-Signature');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once __DIR__ . '/db_config.php';

// Read raw JSON webhook/server payload
$rawInput = file_get_contents('php://input');
$payload = json_decode($rawInput, true) ?: $_POST;

if (empty($payload)) {
    echo json_encode([
        'status' => 'error',
        'message' => 'No payload data received.'
    ]);
    exit;
}

$pdo = getDbConnection();

// Extract payload fields
$registrationId = $payload['registration_id'] ?? $payload['order_id'] ?? null;
$paymentOrderId = $payload['payment_order_id'] ?? $payload['order_id'] ?? null;
$razorpayPaymentId = $payload['razorpay_payment_id'] ?? $payload['payment_id'] ?? null;
$razorpayOrderId = $payload['razorpay_order_id'] ?? null;
$razorpaySignature = $payload['razorpay_signature'] ?? null;
$paymentStatus = $payload['payment_status'] ?? $payload['status'] ?? 'pending';
$eventType = $payload['event'] ?? 'payment.update';
$amount = isset($payload['amount']) ? (float)$payload['amount'] : null;
$currency = $payload['currency'] ?? 'INR';
$clientIp = $_SERVER['REMOTE_ADDR'] ?? null;

// Normalize status values
if (in_array(strtolower($paymentStatus), ['success', 'captured', 'paid'])) {
    $normalizedStatus = 'success';
} elseif (in_array(strtolower($paymentStatus), ['failed', 'failure', 'error'])) {
    $normalizedStatus = 'failed';
} else {
    $normalizedStatus = 'pending';
}

if ($pdo) {
    try {
        // 1. Insert into immutable payment_logs audit table
        $logStmt = $pdo->prepare("
            INSERT INTO payment_logs 
                (registration_id, event_type, payment_order_id, razorpay_payment_id, status, amount, currency, raw_payload, ip_address)
            VALUES 
                (:reg_id, :event_type, :order_id, :payment_id, :status, :amount, :currency, :raw_payload, :ip)
        ");
        $logStmt->execute([
            ':reg_id'       => $registrationId,
            ':event_type'   => $eventType,
            ':order_id'     => $paymentOrderId,
            ':payment_id'   => $razorpayPaymentId,
            ':status'       => $normalizedStatus,
            ':amount'       => $amount,
            ':currency'     => $currency,
            ':raw_payload'  => $rawInput,
            ':ip'           => $clientIp
        ]);

        // 2. If registration_id exists in registrations table, update its payment status and payment IDs
        if ($registrationId) {
            $updateStmt = $pdo->prepare("
                UPDATE registrations 
                SET 
                    payment_status = :status,
                    payment_order_id = COALESCE(:order_id, payment_order_id),
                    razorpay_payment_id = COALESCE(:pay_id, razorpay_payment_id),
                    razorpay_order_id = COALESCE(:rzp_order_id, razorpay_order_id),
                    razorpay_signature = COALESCE(:sig, razorpay_signature),
                    gateway_response = :raw_response,
                    updated_at = NOW()
                WHERE registration_id = :reg_id OR payment_order_id = :order_id_lookup
            ");
            $updateStmt->execute([
                ':status'          => $normalizedStatus,
                ':order_id'        => $paymentOrderId,
                ':pay_id'          => $razorpayPaymentId,
                ':rzp_order_id'    => $razorpayOrderId,
                ':sig'             => $razorpaySignature,
                ':raw_response'    => $rawInput,
                ':reg_id'          => $registrationId,
                ':order_id_lookup' => $paymentOrderId
            ]);
        }

        echo json_encode([
            'status' => 'success',
            'message' => 'Payment record and audit logs updated successfully.'
        ]);
        exit;
    } catch (PDOException $e) {
        error_log("Database error in payment_webhook: " . $e->getMessage());
        echo json_encode([
            'status' => 'error',
            'message' => 'Database update error: ' . $e->getMessage()
        ]);
        exit;
    }
} else {
    // Database not configured or connection failed, acknowledge webhook reception
    echo json_encode([
        'status' => 'acknowledged',
        'message' => 'Webhook received (Database connection offline).'
    ]);
}
?>
