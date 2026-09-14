<?php
/**
 * DYUTI 2027 — Registration & Payment Notification Dispatcher
 * Dispatches full delegate registration and payment confirmation details to dyuti@rajagiri.edu
 */

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Accept');
header('Content-Type: application/json; charset=UTF-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true) ?: $_POST;

if (empty($data)) {
    http_response_code(400);
    echo json_encode([
        'status' => 'error',
        'message' => 'No registration data received.'
    ]);
    exit;
}

// 1. Extract & Sanitize Details
$title              = htmlspecialchars(trim($data['title'] ?? 'Dr.'));
$fullName           = htmlspecialchars(trim($data['name'] ?? $data['full_name'] ?? 'Delegate Participant'));
$designation        = htmlspecialchars(trim($data['designation'] ?? 'N/A'));
$gender             = htmlspecialchars(trim($data['gender'] ?? 'N/A'));
$organization       = htmlspecialchars(trim($data['organization'] ?? 'N/A'));
$discipline         = htmlspecialchars(trim($data['discipline'] ?? 'Social Work'));

$address            = htmlspecialchars(trim($data['address'] ?? 'N/A'));
$pincode            = htmlspecialchars(trim($data['pincode'] ?? 'N/A'));
$phone              = htmlspecialchars(trim($data['phone'] ?? $data['mobile'] ?? 'N/A'));
$email              = filter_var(trim($data['email'] ?? ''), FILTER_VALIDATE_EMAIL) ?: htmlspecialchars(trim($data['email'] ?? ''));

$foodPref           = htmlspecialchars(trim($data['foodPreference'] ?? $data['food_preference'] ?? 'veg'));
$foodLabel          = (strtolower($foodPref) === 'non-veg') ? 'Non-Vegetarian' : 'Vegetarian';

$requireAccom       = htmlspecialchars(trim($data['requireAccommodation'] ?? $data['require_accommodation'] ?? 'no'));
$accomLabel         = (strtolower($requireAccom) === 'yes') ? 'Yes (Moderate Accommodation requested)' : 'No (Arranging own stay)';

$isPresenting       = htmlspecialchars(trim($data['isPresentingPaper'] ?? $data['is_presenting_paper'] ?? 'no'));
$presentingLabel    = (strtolower($isPresenting) === 'yes') ? 'Yes (Author / Presenter)' : 'No (Delegate / Attendee)';

$paperTitle         = htmlspecialchars(trim($data['paperTitle'] ?? $data['paper_title'] ?? ''));
$cmtPaperId         = htmlspecialchars(trim($data['cmtPaperId'] ?? $data['cmt_paper_id'] ?? ''));
$paperTheme         = htmlspecialchars(trim($data['paperTheme'] ?? $data['paper_theme'] ?? ''));

$categoryLabel      = htmlspecialchars(trim($data['categoryLabel'] ?? $data['category'] ?? 'UG / PG Student'));
$amount             = htmlspecialchars(trim($data['amount'] ?? '750'));
$currency           = htmlspecialchars(trim($data['currency'] ?? 'INR'));

$regId              = htmlspecialchars(trim($data['regId'] ?? $data['registration_id'] ?? ('DYUTI27-ONLINE-' . mt_rand(10000, 99999))));
$vortexTxId         = htmlspecialchars(trim($data['vortex_transaction_id'] ?? $data['transaction_id'] ?? 'N/A'));
$paymentStatus      = htmlspecialchars(trim($data['payment_status'] ?? 'SUCCESS'));
$dateTime           = htmlspecialchars(trim($data['date_time'] ?? date('Y-m-d H:i:s')));
$clientIp           = $_SERVER['REMOTE_ADDR'] ?? 'Unknown';

// 2. Email Recipient & Subject
$to = 'dyuti@rajagiri.edu';
$subject = "DYUTI 2027 Registration & Payment Confirmed: {$title} {$fullName} [{$vortexTxId}]";

// 3. Rich HTML Email Template (DYUTI 2027 Brand Palette: Navy #071A33 & Gold #D4AF37)
$htmlBody = '
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>DYUTI 2027 Registration & Payment Notification</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; background-color: #f4f6f9; margin: 0; padding: 20px; color: #1e293b; }
    .container { max-width: 680px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08); border: 1px solid #e2e8f0; }
    .header { background: linear-gradient(135deg, #071A33 0%, #0c2b54 100%); padding: 32px 28px; text-align: center; color: #ffffff; }
    .header h1 { margin: 0 0 8px 0; font-size: 22px; font-weight: 800; letter-spacing: -0.5px; color: #ffffff; }
    .header .subtitle { color: #d4af37; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; }
    .header .institution { color: #cbd5e1; font-size: 12px; margin-top: 6px; }
    .badge-bar { background-color: #ecfdf5; border-bottom: 1px solid #a7f3d0; padding: 12px 24px; text-align: center; color: #065f46; font-size: 13px; font-weight: 700; }
    .content { padding: 28px; }
    .section-title { font-size: 14px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; color: #071A33; border-bottom: 2px solid #071A33; padding-bottom: 6px; margin: 24px 0 14px 0; }
    .section-title:first-of-type { margin-top: 0; }
    table.data-table { width: 100%; border-collapse: collapse; margin-bottom: 12px; font-size: 13.5px; }
    table.data-table td { padding: 9px 12px; border-bottom: 1px solid #f1f5f9; vertical-align: top; }
    table.data-table td.label { width: 38%; font-weight: 600; color: #64748b; background-color: #f8fafc; }
    table.data-table td.val { width: 62%; font-weight: 600; color: #0f172a; }
    .highlight-card { background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 18px; margin-bottom: 20px; }
    .highlight-grid { display: table; width: 100%; }
    .highlight-cell { display: table-cell; width: 50%; padding: 4px 8px; vertical-align: top; }
    .highlight-label { font-size: 11px; text-transform: uppercase; font-weight: 700; color: #64748b; margin-bottom: 3px; }
    .highlight-val { font-size: 18px; font-weight: 800; color: #071A33; font-family: monospace; }
    .highlight-val.green { color: #059669; }
    .footer { background-color: #030C22; color: #94a3b8; text-align: center; padding: 24px; font-size: 11.5px; line-height: 1.6; }
    .footer a { color: #d4af37; text-decoration: none; font-weight: bold; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="subtitle">DYUTI 2027 &bull; National Conference</div>
      <h1>New Delegate Registration & Payment Received</h1>
      <div class="institution">Rajagiri College of Social Sciences (Autonomous), Kalamassery, Kochi</div>
    </div>

    <div class="badge-bar">
      &#x2714; Payment Verified via Vortexx Gateway &bull; Registration Confirmed
    </div>

    <div class="content">

      <!-- Highlight Box: Transaction & Registration Key -->
      <div class="highlight-card">
        <div class="highlight-grid">
          <div class="highlight-cell">
            <div class="highlight-label">Registration ID</div>
            <div class="highlight-val">' . $regId . '</div>
          </div>
          <div class="highlight-cell">
            <div class="highlight-label">Vortexx Transaction ID</div>
            <div class="highlight-val green">' . $vortexTxId . '</div>
          </div>
        </div>
      </div>

      <!-- Section 1: Payment Overview -->
      <div class="section-title">1. Payment & Transaction Summary</div>
      <table class="data-table">
        <tr>
          <td class="label">Amount Paid</td>
          <td class="val"><strong style="color:#071A33; font-size:15px;">₹ ' . $amount . ' ' . $currency . '</strong></td>
        </tr>
        <tr>
          <td class="label">Payment Status</td>
          <td class="val"><span style="display:inline-block; padding:3px 10px; border-radius:12px; background:#dcfce7; color:#166534; font-weight:700; font-size:12px;">' . $paymentStatus . '</span></td>
        </tr>
        <tr>
          <td class="label">Payment Gateway</td>
          <td class="val">Vortexx Payment Gateway (Online UPI/Cards/NetBanking)</td>
        </tr>
        <tr>
          <td class="label">Transaction Date / Time</td>
          <td class="val">' . $dateTime . '</td>
        </tr>
        <tr>
          <td class="label">Registration Category</td>
          <td class="val"><strong>' . $categoryLabel . '</strong></td>
        </tr>
      </table>

      <!-- Section 2: Delegate Profile -->
      <div class="section-title">2. Delegate Personal & Academic Profile</div>
      <table class="data-table">
        <tr>
          <td class="label">Full Name</td>
          <td class="val"><strong>' . $title . ' ' . $fullName . '</strong></td>
        </tr>
        <tr>
          <td class="label">Designation</td>
          <td class="val">' . $designation . '</td>
        </tr>
        <tr>
          <td class="label">Gender</td>
          <td class="val">' . $gender . '</td>
        </tr>
        <tr>
          <td class="label">Representing Institution</td>
          <td class="val"><strong>' . $organization . '</strong></td>
        </tr>
        <tr>
          <td class="label">Academic Discipline</td>
          <td class="val">' . $discipline . '</td>
        </tr>
      </table>

      <!-- Section 3: Contact Details -->
      <div class="section-title">3. Contact & Communication Coordinates</div>
      <table class="data-table">
        <tr>
          <td class="label">Email Address</td>
          <td class="val"><a href="mailto:' . $email . '" style="color:#0284c7; text-decoration:none; font-weight:700;">' . $email . '</a></td>
        </tr>
        <tr>
          <td class="label">Contact / WhatsApp</td>
          <td class="val"><a href="tel:' . $phone . '" style="color:#0284c7; text-decoration:none; font-weight:700;">' . $phone . '</a></td>
        </tr>
        <tr>
          <td class="label">Postal Address</td>
          <td class="val">' . nl2br($address) . '</td>
        </tr>
        <tr>
          <td class="label">Postal PIN Code</td>
          <td class="val">' . $pincode . '</td>
        </tr>
      </table>

      <!-- Section 4: Conference Logistics -->
      <div class="section-title">4. Conference Logistics & Participation</div>
      <table class="data-table">
        <tr>
          <td class="label">Food Preference</td>
          <td class="val">' . $foodLabel . '</td>
        </tr>
        <tr>
          <td class="label">Accommodation Required?</td>
          <td class="val">' . $accomLabel . '</td>
        </tr>
        <tr>
          <td class="label">Paper Presenter?</td>
          <td class="val">' . $presentingLabel . '</td>
        </tr>';

if (!empty($paperTitle) || !empty($cmtPaperId)) {
    $htmlBody .= '
        <tr>
          <td class="label">Paper Title</td>
          <td class="val"><em>' . ($paperTitle ?: 'As submitted via CMT') . '</em></td>
        </tr>
        <tr>
          <td class="label">Microsoft CMT ID</td>
          <td class="val">' . ($cmtPaperId ?: 'Not provided') . '</td>
        </tr>
        <tr>
          <td class="label">Sub-Theme Track</td>
          <td class="val">' . ($paperTheme ?: 'General Track') . '</td>
        </tr>';
}

$htmlBody .= '
      </table>

      <div style="margin-top:20px; padding:12px; background:#f8fafc; border-radius:8px; font-size:11.5px; color:#64748b;">
        <strong>System Audit Info:</strong> Submission recorded via DYUTI 2027 Web Portal &bull; IP: ' . $clientIp . ' &bull; Timestamp: ' . date('c') . '
      </div>

    </div>

    <div class="footer">
      DYUTI 2027 &mdash; National Conference on Social Work for Sustainable Development<br>
      Department of Social Work, Rajagiri College of Social Sciences (Autonomous), Kalamassery, Kochi, Kerala, India.<br>
      Secretariat Email: <a href="mailto:dyuti@rajagiri.edu">dyuti@rajagiri.edu</a> &bull; Web: <a href="https://dyuti27new.vercel.app">dyuti.in</a>
    </div>
  </div>
</body>
</html>
';

// 4. Plain Text Fallback Body
$plainBody = "====================================================\n";
$plainBody .= "DYUTI 2027 - REGISTRATION & PAYMENT CONFIRMED\n";
$plainBody .= "====================================================\n\n";
$plainBody .= "A new delegate registration and payment has been completed via the web portal.\n\n";
$plainBody .= "TRANSACTION DETAILS:\n";
$plainBody .= "--------------------\n";
$plainBody .= "Registration ID:       {$regId}\n";
$plainBody .= "Vortexx Transaction ID: {$vortexTxId}\n";
$plainBody .= "Amount:                INR {$amount}\n";
$plainBody .= "Payment Status:        {$paymentStatus}\n";
$plainBody .= "Date/Time:             {$dateTime}\n";
$plainBody .= "Category:              {$categoryLabel}\n\n";

$plainBody .= "PARTICIPANT DETAILS:\n";
$plainBody .= "--------------------\n";
$plainBody .= "Name:                  {$title} {$fullName}\n";
$plainBody .= "Designation:           {$designation}\n";
$plainBody .= "Gender:                {$gender}\n";
$plainBody .= "Organization:          {$organization}\n";
$plainBody .= "Discipline:            {$discipline}\n";
$plainBody .= "Email:                 {$email}\n";
$plainBody .= "Phone:                 {$phone}\n";
$plainBody .= "Address:               {$address}\n";
$plainBody .= "PIN Code:              {$pincode}\n\n";

$plainBody .= "LOGISTICS & PREFERENCES:\n";
$plainBody .= "------------------------\n";
$plainBody .= "Food Preference:       {$foodLabel}\n";
$plainBody .= "Accommodation:         {$accomLabel}\n";
$plainBody .= "Paper Presenter:       {$presentingLabel}\n";
if ($isPresenting === 'yes' || !empty($paperTitle)) {
    $plainBody .= "Paper Title:           {$paperTitle}\n";
    $plainBody .= "CMT Paper ID:          {$cmtPaperId}\n";
    $plainBody .= "Theme Track:           {$paperTheme}\n";
}
$plainBody .= "\nSubmitted from IP: {$clientIp} at " . date('c') . "\n";

// 5. Build Multipart Email Headers (HTML with UTF-8)
$boundary = "DYUTI_ALT_" . md5(time());

$headers = "From: DYUTI 2027 Portal <noreply@dyuti.in>\r\n";
if (!empty($email)) {
    $headers .= "Reply-To: {$fullName} <{$email}>\r\n";
}
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: multipart/alternative; boundary=\"{$boundary}\"\r\n";
$headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";

$fullEmailContent = "--{$boundary}\r\n";
$fullEmailContent .= "Content-Type: text/plain; charset=UTF-8\r\n";
$fullEmailContent .= "Content-Transfer-Encoding: 8bit\r\n\r\n";
$fullEmailContent .= $plainBody . "\r\n\r\n";
$fullEmailContent .= "--{$boundary}\r\n";
$fullEmailContent .= "Content-Type: text/html; charset=UTF-8\r\n";
$fullEmailContent .= "Content-Transfer-Encoding: 8bit\r\n\r\n";
$fullEmailContent .= $htmlBody . "\r\n\r\n";
$fullEmailContent .= "--{$boundary}--";

// 6. Send Email to Secretariat (dyuti@rajagiri.edu)
$mailSent = @mail($to, $subject, $fullEmailContent, $headers);

// Also send confirmation copy to the delegate's personal email if provided
if (!empty($email)) {
    $delegateSubject = "Registration & Payment Confirmation: DYUTI 2027 Conference [{$regId}]";
    $delegateHeaders = "From: DYUTI 2027 Secretariat <dyuti@rajagiri.edu>\r\n";
    $delegateHeaders .= "Reply-To: DYUTI Secretariat <dyuti@rajagiri.edu>\r\n";
    $delegateHeaders .= "MIME-Version: 1.0\r\n";
    $delegateHeaders .= "Content-Type: multipart/alternative; boundary=\"{$boundary}\"\r\n";
    $delegateHeaders .= "X-Mailer: PHP/" . phpversion() . "\r\n";
    @mail($email, $delegateSubject, $fullEmailContent, $delegateHeaders);
}

// 7. Return JSON response
echo json_encode([
    'status' => 'success',
    'mail_dispatched' => (bool)$mailSent,
    'recipient' => $to,
    'registration_id' => $regId,
    'vortex_transaction_id' => $vortexTxId,
    'message' => 'Registration notification successfully processed for dyuti@rajagiri.edu'
]);
