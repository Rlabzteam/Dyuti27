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
require_once __DIR__ . '/mailer_helper.php'; // dyutiSendMail()

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

if (!function_exists('val')) {
    function val($arr, $key, $fallback = null) {
        return (is_array($arr) && isset($arr[$key]) && $arr[$key] !== '') ? $arr[$key] : $fallback;
    }
}

// Extract payload fields
$registrationId = val($payload, 'registration_id', val($payload, 'order_id', null));
$paymentOrderId = val($payload, 'payment_order_id', val($payload, 'order_id', null));
$razorpayPaymentId = val($payload, 'razorpay_payment_id', val($payload, 'payment_id', null));
$razorpayOrderId = val($payload, 'razorpay_order_id', null);
$razorpaySignature = val($payload, 'razorpay_signature', null);
$paymentStatus = val($payload, 'payment_status', val($payload, 'status', 'pending'));
$eventType = val($payload, 'event', 'payment.update');
$amount = isset($payload['amount']) ? (float)$payload['amount'] : null;
$currency = val($payload, 'currency', 'INR');
$clientIp = isset($_SERVER['REMOTE_ADDR']) ? $_SERVER['REMOTE_ADDR'] : null;

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

        // 3. If payment is NOW success and email not yet sent, dispatch notification email
        if ($normalizedStatus === 'success' && $registrationId) {
            try {
                $regRow = $pdo->prepare("
                    SELECT * FROM registrations
                    WHERE (registration_id = :reg_id OR payment_order_id = :order_id)
                    AND email_sent = 0
                    LIMIT 1
                ");
                $regRow->execute([':reg_id' => $registrationId, ':order_id' => $paymentOrderId]);
                $reg = $regRow->fetch();

                if ($reg) {
                    // Build minimal HTML email body for webhook-triggered send
                    $regId   = htmlspecialchars($reg['registration_id']);
                    $name    = htmlspecialchars($reg['full_name']);
                    $title   = htmlspecialchars($reg['title']);
                    $org     = htmlspecialchars($reg['organization']);
                    $emailTo = $reg['email'];
                    $fee     = htmlspecialchars($reg['fee_amount']);
                    $cat     = htmlspecialchars($reg['registration_category']);
                    $txn     = htmlspecialchars($razorpayPaymentId ?: $paymentOrderId ?: 'N/A');
                    $dt      = date('Y-m-d H:i:s');

                    $webhookHtml = '
<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8">
<title>DYUTI 2027 Registration Confirmed</title></head>
<body style="font-family:sans-serif;background:#f4f6f9;padding:20px;">
<div style="max-width:640px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e2e8f0">
  <div style="background:#071A33;padding:28px;text-align:center;">
    <div style="color:#d4af37;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;">DYUTI 2027 &bull; National Conference</div>
    <h1 style="color:#fff;margin:8px 0 4px;font-size:20px;">Registration & Payment Confirmed</h1>
    <div style="color:#cbd5e1;font-size:12px;">Rajagiri College of Social Sciences, Kochi</div>
  </div>
  <div style="background:#ecfdf5;border-bottom:1px solid #a7f3d0;padding:10px 24px;text-align:center;color:#065f46;font-size:13px;font-weight:700;">
    &#x2714; Payment Verified &bull; Server-Confirmed
  </div>
  <div style="padding:24px;">
    <table width="100%" cellpadding="8" style="border-collapse:collapse;font-size:13px;">
      <tr><td style="color:#64748b;font-weight:600;background:#f8fafc;width:40%;">Registration ID</td><td style="font-weight:700;">' . $regId . '</td></tr>
      <tr><td style="color:#64748b;font-weight:600;background:#f8fafc;">Transaction ID</td><td style="font-weight:700;color:#059669;">' . $txn . '</td></tr>
      <tr><td style="color:#64748b;font-weight:600;background:#f8fafc;">Delegate Name</td><td style="font-weight:700;">' . $title . ' ' . $name . '</td></tr>
      <tr><td style="color:#64748b;font-weight:600;background:#f8fafc;">Organization</td><td>' . $org . '</td></tr>
      <tr><td style="color:#64748b;font-weight:600;background:#f8fafc;">Category</td><td>' . $cat . '</td></tr>
      <tr><td style="color:#64748b;font-weight:600;background:#f8fafc;">Amount</td><td style="font-weight:700;">INR ' . $fee . '</td></tr>
      <tr><td style="color:#64748b;font-weight:600;background:#f8fafc;">Payment Status</td><td style="color:#059669;font-weight:700;">SUCCESS</td></tr>
      <tr><td style="color:#64748b;font-weight:600;background:#f8fafc;">Date / Time</td><td>' . $dt . '</td></tr>
    </table>
    <p style="color:#64748b;font-size:12px;margin-top:16px;">This notification was dispatched by the server webhook upon payment confirmation.</p>
  </div>
</div>
</body></html>';

                    $webhookPlain = "DYUTI 2027 Registration Confirmed (Server Webhook)\n"
                        . "Registration ID: {$regId}\nDelegate: {$title} {$name}\n"
                        . "Organization: {$org}\nCategory: {$cat}\nAmount: INR {$fee}\n"
                        . "Transaction ID: {$txn}\nStatus: SUCCESS\nDate: {$dt}";

                    $webhookSubject = "DYUTI 2027 Registration & Payment Confirmed: {$title} {$name} [{$regId}]";

                    $emailResult = dyutiSendMail(
                        'dyuti@rajagiri.edu',
                        'DYUTI Secretariat',
                        $webhookSubject,
                        $webhookHtml,
                        $webhookPlain
                    );

                    if ($emailResult['sent']) {
                        // Mark email sent so browser-redirect trigger won't duplicate it
                        $markStmt = $pdo->prepare(
                            "UPDATE registrations SET email_sent = 1 WHERE registration_id = :reg_id"
                        );
                        $markStmt->execute([':reg_id' => $reg['registration_id']]);
                        error_log('[DYUTI Webhook] Email sent to dyuti@rajagiri.edu for ' . $regId);
                    } else {
                        error_log('[DYUTI Webhook] Email FAILED for ' . $regId . ': ' . $emailResult['error']);
                    }
                }
            } catch (Exception $emailEx) {
                error_log('[DYUTI Webhook] Email exception: ' . $emailEx->getMessage());
            }
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
