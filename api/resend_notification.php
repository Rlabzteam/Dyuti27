<?php
/**
 * DYUTI 2027 — Resend Registration Notification to Secretariat & Delegate
 * Usage:
 *   Browser: https://dyuti.in/rcss/api/resend_notification.php?reg_id=DYUTI27-ONLINE-29965
 *   Or view all: https://dyuti.in/rcss/api/resend_notification.php
 *   Or send all unsent: https://dyuti.in/rcss/api/resend_notification.php?send_all_unsent=1
 * Compatible with PHP 5.6+
 */

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Accept');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once __DIR__ . '/db_config.php';
require_once __DIR__ . '/mailer_helper.php';
require_once __DIR__ . '/fpdf.php';

$pdo = getDbConnection();
if (!$pdo) {
    die("Database connection failed. Please check db_config.php.");
}

$rawInput = file_get_contents('php://input');
$postJson = json_decode($rawInput, true);

$targetRegId = isset($_GET['reg_id']) ? trim($_GET['reg_id']) : (
    isset($_POST['reg_id']) ? trim($_POST['reg_id']) : (
        isset($postJson['reg_id']) ? trim($postJson['reg_id']) : (
            isset($postJson['registration_id']) ? trim($postJson['registration_id']) : ''
        )
    )
);

$sendAllUnsent = isset($_GET['send_all_unsent']) && $_GET['send_all_unsent'] == '1';

// Function to dispatch notification for a given DB record
function dispatchNotificationForRecord($reg, $pdo) {
    $regId           = $reg['registration_id'];
    $title           = !empty($reg['title']) ? $reg['title'] : 'Dr.';
    $fullName        = !empty($reg['full_name']) ? $reg['full_name'] : 'Delegate Participant';
    $designation     = !empty($reg['designation']) ? $reg['designation'] : 'N/A';
    $gender          = !empty($reg['gender']) ? $reg['gender'] : 'N/A';
    $organization    = !empty($reg['organization']) ? $reg['organization'] : 'N/A';
    $discipline      = !empty($reg['discipline']) ? $reg['discipline'] : 'N/A';
    $address         = !empty($reg['address']) ? $reg['address'] : 'N/A';
    $pincode         = !empty($reg['pincode']) ? $reg['pincode'] : 'N/A';
    $phone           = !empty($reg['phone']) ? $reg['phone'] : 'N/A';
    $email           = !empty($reg['email']) ? $reg['email'] : '';
    $categoryLabel   = !empty($reg['registration_category']) ? $reg['registration_category'] : 'UG / PG Student';
    $amount          = !empty($reg['fee_amount']) ? $reg['fee_amount'] : '750';
    $currency        = !empty($reg['currency']) ? $reg['currency'] : 'INR';
    $paymentStatus   = strtoupper(!empty($reg['payment_status']) ? $reg['payment_status'] : 'SUCCESS');
    $vortexTxId      = !empty($reg['transaction_ref']) ? $reg['transaction_ref'] : (!empty($reg['payment_order_id']) ? $reg['payment_order_id'] : 'N/A');
    $dateTime        = !empty($reg['created_at']) ? $reg['created_at'] : date('Y-m-d H:i:s');
    $foodPref        = !empty($reg['food_preference']) ? $reg['food_preference'] : 'veg';
    $foodLabel       = (strtolower($foodPref) === 'non-veg') ? 'Non-Vegetarian' : 'Vegetarian';
    $requireAccom    = !empty($reg['require_accommodation']) ? $reg['require_accommodation'] : 'no';
    $accomLabel      = (strtolower($requireAccom) === 'yes') ? 'Yes (Moderate Accommodation requested)' : 'No (Arranging own stay)';
    $isPresenting    = !empty($reg['is_presenting_paper']) ? $reg['is_presenting_paper'] : 'no';
    $presentingLabel = (strtolower($isPresenting) === 'yes') ? 'Yes (Author / Presenter)' : 'No (Delegate / Attendee)';
    $paperTitle      = !empty($reg['paper_title']) ? $reg['paper_title'] : '';

    $subject = "DYUTI 2027 Registration Notification: {$title} {$fullName} [{$regId}]";

    $htmlBody = '
    <!DOCTYPE html><html><head><meta charset="UTF-8"><title>DYUTI 2027 Registration Notification</title></head>
    <body style="font-family:Arial,sans-serif;background:#f4f6f9;padding:20px;color:#1e293b;">
      <div style="max-width:640px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e2e8f0;box-shadow:0 4px 15px rgba(0,0,0,0.05);">
        <div style="background:linear-gradient(135deg,#071A33,#0c2b54);padding:24px;text-align:center;color:#fff;">
          <div style="color:#d4af37;font-size:12px;font-weight:bold;text-transform:uppercase;letter-spacing:1px;">DYUTI 2027 &bull; National Conference</div>
          <h2 style="margin:8px 0;font-size:20px;">Delegate Registration Details</h2>
          <div style="font-size:12px;color:#cbd5e1;">Rajagiri College of Social Sciences (Autonomous), Kalamassery, Kochi</div>
        </div>
        <div style="background:#ecfdf5;border-bottom:1px solid #a7f3d0;padding:10px 20px;text-align:center;color:#065f46;font-size:13px;font-weight:bold;">
          Registration ID: ' . htmlspecialchars($regId) . ' &bull; Status: ' . htmlspecialchars($paymentStatus) . '
        </div>
        <div style="padding:20px;">
          <table width="100%" cellpadding="6" style="border-collapse:collapse;font-size:13px;">
            <tr><td style="color:#64748b;font-weight:600;width:35%;border-bottom:1px solid #f1f5f9;">Full Name</td><td style="font-weight:bold;border-bottom:1px solid #f1f5f9;">' . htmlspecialchars($title . ' ' . $fullName) . '</td></tr>
            <tr><td style="color:#64748b;font-weight:600;border-bottom:1px solid #f1f5f9;">Email</td><td style="border-bottom:1px solid #f1f5f9;"><a href="mailto:' . htmlspecialchars($email) . '">' . htmlspecialchars($email) . '</a></td></tr>
            <tr><td style="color:#64748b;font-weight:600;border-bottom:1px solid #f1f5f9;">Phone</td><td style="border-bottom:1px solid #f1f5f9;">' . htmlspecialchars($phone) . '</td></tr>
            <tr><td style="color:#64748b;font-weight:600;border-bottom:1px solid #f1f5f9;">Designation</td><td style="border-bottom:1px solid #f1f5f9;">' . htmlspecialchars($designation) . '</td></tr>
            <tr><td style="color:#64748b;font-weight:600;border-bottom:1px solid #f1f5f9;">Organization</td><td style="border-bottom:1px solid #f1f5f9;">' . htmlspecialchars($organization) . '</td></tr>
            <tr><td style="color:#64748b;font-weight:600;border-bottom:1px solid #f1f5f9;">Discipline</td><td style="border-bottom:1px solid #f1f5f9;">' . htmlspecialchars($discipline) . '</td></tr>
            <tr><td style="color:#64748b;font-weight:600;border-bottom:1px solid #f1f5f9;">Category</td><td style="border-bottom:1px solid #f1f5f9;">' . htmlspecialchars($categoryLabel) . '</td></tr>
            <tr><td style="color:#64748b;font-weight:600;border-bottom:1px solid #f1f5f9;">Amount</td><td style="font-weight:bold;color:#071A33;border-bottom:1px solid #f1f5f9;">' . htmlspecialchars($currency . ' ' . $amount) . '</td></tr>
            <tr><td style="color:#64748b;font-weight:600;border-bottom:1px solid #f1f5f9;">Payment Ref / Txn ID</td><td style="font-family:monospace;font-weight:bold;color:#059669;border-bottom:1px solid #f1f5f9;">' . htmlspecialchars($vortexTxId) . '</td></tr>
            <tr><td style="color:#64748b;font-weight:600;border-bottom:1px solid #f1f5f9;">Food Preference</td><td style="border-bottom:1px solid #f1f5f9;">' . htmlspecialchars($foodLabel) . '</td></tr>
            <tr><td style="color:#64748b;font-weight:600;border-bottom:1px solid #f1f5f9;">Accommodation</td><td style="border-bottom:1px solid #f1f5f9;">' . htmlspecialchars($accomLabel) . '</td></tr>
            <tr><td style="color:#64748b;font-weight:600;border-bottom:1px solid #f1f5f9;">Paper Presenter</td><td style="border-bottom:1px solid #f1f5f9;">' . htmlspecialchars($presentingLabel) . '</td></tr>
            ' . (!empty($paperTitle) ? '<tr><td style="color:#64748b;font-weight:600;border-bottom:1px solid #f1f5f9;">Paper Title</td><td style="border-bottom:1px solid #f1f5f9;"><em>' . htmlspecialchars($paperTitle) . '</em></td></tr>' : '') . '
            <tr><td style="color:#64748b;font-weight:600;">Address</td><td>' . nl2br(htmlspecialchars($address)) . ' (PIN: ' . htmlspecialchars($pincode) . ')</td></tr>
          </table>
        </div>
        <div style="background:#071A33;color:#cbd5e1;text-align:center;padding:16px;font-size:11px;">
          DYUTI 2027 Secretariat &bull; dyuti@rajagiri.edu &bull; https://dyuti.in
        </div>
      </div>
    </body></html>';

    $plainBody = "DYUTI 2027 Registration Notification\n"
        . "Registration ID: {$regId}\n"
        . "Name: {$title} {$fullName}\n"
        . "Email: {$email} | Phone: {$phone}\n"
        . "Organization: {$organization} ({$designation})\n"
        . "Category: {$categoryLabel} | Fee: {$currency} {$amount}\n"
        . "Payment Ref: {$vortexTxId} | Status: {$paymentStatus}\n"
        . "Logistics: Food: {$foodLabel} | Accom: {$accomLabel} | Presenter: {$presentingLabel}\n";

    // Attempt to send to Secretariat (dyuti@rajagiri.edu)
    $secResult = dyutiSendMail('dyuti@rajagiri.edu', 'DYUTI Secretariat', $subject, $htmlBody, $plainBody);

    // Also send copy to delegate if email exists
    $delResult = array('sent' => false);
    if (!empty($email) && filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $delSubject = "Registration Confirmation: DYUTI 2027 [{$regId}]";
        $delResult = dyutiSendMail($email, $fullName, $delSubject, $htmlBody, $plainBody);
    }

    if ($secResult['sent']) {
        $upd = $pdo->prepare("UPDATE registrations SET email_sent = 1 WHERE registration_id = :id");
        $upd->execute([':id' => $regId]);
    }

    return array(
        'reg_id'            => $regId,
        'name'              => $fullName,
        'email'             => $email,
        'secretariat_sent'  => (bool)$secResult['sent'],
        'secretariat_error' => isset($secResult['error']) ? $secResult['error'] : null,
        'delegate_sent'     => (bool)$delResult['sent']
    );
}

// Case 1: Specific reg_id requested
if (!empty($targetRegId)) {
    $stmt = $pdo->prepare("SELECT * FROM registrations WHERE registration_id = :id LIMIT 1");
    $stmt->execute([':id' => $targetRegId]);
    $reg = $stmt->fetch();

    if (!$reg) {
        if (isset($_SERVER['HTTP_ACCEPT']) && strpos($_SERVER['HTTP_ACCEPT'], 'application/json') !== false) {
            echo json_encode(array('status' => 'error', 'message' => "Registration ID '{$targetRegId}' not found in database."));
            exit;
        }
        echo "<h3 style='color:red;'>Registration ID '{$targetRegId}' not found in database.</h3>";
        exit;
    }

    $result = dispatchNotificationForRecord($reg, $pdo);

    if (isset($_SERVER['HTTP_ACCEPT']) && strpos($_SERVER['HTTP_ACCEPT'], 'application/json') !== false) {
        echo json_encode(array('status' => 'success', 'result' => $result));
        exit;
    }

    echo "<!DOCTYPE html><html><head><meta charset='UTF-8'><title>Resend Notification Result</title><style>body{font-family:sans-serif;padding:30px;background:#f8fafc;}</style></head><body>";
    echo "<div style='max-width:600px;margin:0 auto;background:#fff;padding:24px;border-radius:12px;border:1px solid #e2e8f0;box-shadow:0 4px 12px rgba(0,0,0,0.05);'>";
    echo "<h2 style='color:#071A33;margin-top:0;'>Notification Dispatch Result</h2>";
    echo "<p><b>Registration ID:</b> <code>" . htmlspecialchars($result['reg_id']) . "</code></p>";
    echo "<p><b>Participant:</b> " . htmlspecialchars($result['name']) . " (" . htmlspecialchars($result['email']) . ")</p>";
    echo "<p><b>Sent to dyuti@rajagiri.edu:</b> " . ($result['secretariat_sent'] ? "<span style='color:green;font-weight:bold;'>YES &#x2714;</span>" : "<span style='color:red;font-weight:bold;'>NO &#x2718; (" . htmlspecialchars($result['secretariat_error']) . ")</span>") . "</p>";
    echo "<p><b>Sent to Delegate:</b> " . ($result['delegate_sent'] ? "<span style='color:green;font-weight:bold;'>YES &#x2714;</span>" : "<span style='color:gray;'>Not sent / not provided</span>") . "</p>";
    echo "<hr style='margin:20px 0;border:none;border-top:1px solid #e2e8f0;'>";
    echo "<a href='resend_notification.php' style='color:#0284c7;font-weight:bold;'>&larr; View All Registrations</a>";
    echo "</div></body></html>";
    exit;
}

// Case 2: Batch send all unsent
if ($sendAllUnsent) {
    $stmt = $pdo->query("SELECT * FROM registrations WHERE email_sent = 0 ORDER BY id DESC LIMIT 50");
    $unsentList = $stmt->fetchAll();
    $dispatched = array();

    foreach ($unsentList as $reg) {
        $dispatched[] = dispatchNotificationForRecord($reg, $pdo);
    }

    echo "<!DOCTYPE html><html><head><meta charset='UTF-8'><title>Batch Send Results</title><style>body{font-family:sans-serif;padding:30px;background:#f8fafc;}</style></head><body>";
    echo "<div style='max-width:700px;margin:0 auto;background:#fff;padding:24px;border-radius:12px;border:1px solid #e2e8f0;'>";
    echo "<h2 style='color:#071A33;'>Batch Notification Dispatch Results</h2>";
    echo "<p>Processed <b>" . count($dispatched) . "</b> unsent registration(s).</p>";
    echo "<table border='1' cellpadding='8' style='border-collapse:collapse;width:100%;font-size:13px;'>";
    echo "<tr style='background:#f1f5f9;'><th>Reg ID</th><th>Name</th><th>Sent to dyuti@rajagiri.edu</th></tr>";
    foreach ($dispatched as $d) {
        echo "<tr><td><code>" . htmlspecialchars($d['reg_id']) . "</code></td><td>" . htmlspecialchars($d['name']) . "</td><td>" . ($d['secretariat_sent'] ? "<span style='color:green;'>YES &#x2714;</span>" : "<span style='color:red;'>FAILED</span>") . "</td></tr>";
    }
    echo "</table>";
    echo "<br><a href='resend_notification.php'>&larr; Back to Registrations List</a>";
    echo "</div></body></html>";
    exit;
}

// Case 3: Display list of registrations with one-click "Send Notification" button
$stmt = $pdo->query("SELECT id, registration_id, title, full_name, email, phone, fee_amount, payment_mode, payment_status, email_sent, created_at FROM registrations ORDER BY id DESC LIMIT 100");
$registrations = $stmt->fetchAll();

echo "<!DOCTYPE html><html><head><meta charset='UTF-8'><title>DYUTI 2027 Registration Notifications Manager</title><style>
body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 24px; background: #f8fafc; color: #1e293b; }
.card { max-width: 960px; margin: 0 auto; background: #fff; padding: 24px; border-radius: 12px; border: 1px solid #e2e8f0; box-shadow: 0 4px 12px rgba(0,0,0,0.04); }
h1 { color: #071A33; font-size: 20px; margin-top: 0; }
table { width: 100%; border-collapse: collapse; margin-top: 16px; font-size: 13px; }
th, td { padding: 10px 12px; border-bottom: 1px solid #e2e8f0; text-align: left; }
th { background: #f1f5f9; color: #475569; font-weight: 700; }
.btn { display: inline-block; padding: 6px 14px; border-radius: 6px; font-size: 12px; font-weight: bold; text-decoration: none; cursor: pointer; }
.btn-primary { background: #071A33; color: #fff; }
.btn-primary:hover { background: #0c2b54; }
.badge { display: inline-block; padding: 2px 8px; border-radius: 10px; font-size: 11px; font-weight: bold; }
.badge-green { background: #dcfce7; color: #15803d; }
.badge-amber { background: #fef3c7; color: #b45309; }
.badge-blue { background: #e0f2fe; color: #0369a1; }
</style></head><body>";

echo "<div class='card'>";
echo "<div style='display:flex;justify-content:space-between;align-items:center;'>";
echo "<div><h1>DYUTI 2027 &mdash; Registration Notifications Manager</h1><p style='color:#64748b;font-size:13px;margin:0;'>Check and dispatch notification emails to <code>dyuti@rajagiri.edu</code> for any registration.</p></div>";
echo "<a href='resend_notification.php?send_all_unsent=1' class='btn btn-primary' onclick='return confirm(\"Send notifications for all unsent registrations?\");'>&#x2709; Send All Unsent</a>";
echo "</div>";

if (empty($registrations)) {
    echo "<p style='margin-top:20px;color:#64748b;'>No registrations found in the database yet.</p>";
} else {
    echo "<table><thead><tr><th>Date</th><th>Reg ID</th><th>Delegate</th><th>Amount</th><th>Status</th><th>Email Sent?</th><th>Action</th></tr></thead><tbody>";
    foreach ($registrations as $r) {
        $sentBadge = $r['email_sent']
            ? "<span class='badge badge-green'>&#x2714; Sent</span>"
            : "<span class='badge badge-amber'>&#x2718; Unsent</span>";
        $statusBadge = strtolower($r['payment_status']) === 'success'
            ? "<span class='badge badge-green'>Success</span>"
            : "<span class='badge badge-blue'>" . htmlspecialchars($r['payment_status']) . "</span>";

        echo "<tr>";
        echo "<td>" . date('d M, H:i', strtotime($r['created_at'])) . "</td>";
        echo "<td><code>" . htmlspecialchars($r['registration_id']) . "</code></td>";
        echo "<td><b>" . htmlspecialchars($r['title'] . ' ' . $r['full_name']) . "</b><br><span style='color:#64748b;font-size:11px;'>" . htmlspecialchars($r['email']) . "</span></td>";
        echo "<td>INR " . htmlspecialchars($r['fee_amount']) . "</td>";
        echo "<td>" . $statusBadge . "</td>";
        echo "<td>" . $sentBadge . "</td>";
        echo "<td><a href='resend_notification.php?reg_id=" . urlencode($r['registration_id']) . "' class='btn btn-primary'>Send Email</a></td>";
        echo "</tr>";
    }
    echo "</tbody></table>";
}

echo "</div></body></html>";
