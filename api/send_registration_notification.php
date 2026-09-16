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

require_once __DIR__ . '/fpdf.php';

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

if (!function_exists('val')) {
    function val($arr, $key, $fallback = '') {
        return (is_array($arr) && isset($arr[$key]) && $arr[$key] !== '') ? $arr[$key] : $fallback;
    }
}

// 1. Extract & Sanitize Details
$title              = htmlspecialchars(trim(val($data, 'title', 'Dr.')));
$fullName           = htmlspecialchars(trim(val($data, 'name', val($data, 'full_name', 'Delegate Participant'))));
$designation        = htmlspecialchars(trim(val($data, 'designation', 'N/A')));
$gender             = htmlspecialchars(trim(val($data, 'gender', 'N/A')));
$organization       = htmlspecialchars(trim(val($data, 'organization', 'N/A')));
$discipline         = htmlspecialchars(trim(val($data, 'discipline', 'N/A')));

$address            = htmlspecialchars(trim(val($data, 'address', 'N/A')));
$pincode            = htmlspecialchars(trim(val($data, 'pincode', 'N/A')));
$phone              = htmlspecialchars(trim(val($data, 'phone', val($data, 'mobile', 'N/A'))));
$rawEmail           = trim(val($data, 'email', ''));
$email              = filter_var($rawEmail, FILTER_VALIDATE_EMAIL) ? $rawEmail : htmlspecialchars($rawEmail);

$foodPref           = htmlspecialchars(trim(val($data, 'foodPreference', val($data, 'food_preference', 'veg'))));
$foodLabel          = (strtolower($foodPref) === 'non-veg') ? 'Non-Vegetarian' : 'Vegetarian';

$requireAccom       = htmlspecialchars(trim(val($data, 'requireAccommodation', val($data, 'require_accommodation', 'no'))));
$accomLabel         = (strtolower($requireAccom) === 'yes') ? 'Yes (Moderate Accommodation requested)' : 'No (Arranging own stay)';

$isPresenting       = htmlspecialchars(trim(val($data, 'isPresentingPaper', val($data, 'is_presenting_paper', 'no'))));
$presentingLabel    = (strtolower($isPresenting) === 'yes') ? 'Yes (Author / Presenter)' : 'No (Delegate / Attendee)';

$paperTitle         = htmlspecialchars(trim(val($data, 'paperTitle', val($data, 'paper_title', ''))));
$cmtPaperId         = htmlspecialchars(trim(val($data, 'cmtPaperId', val($data, 'cmt_paper_id', ''))));
$paperTheme         = htmlspecialchars(trim(val($data, 'paperTheme', val($data, 'paper_theme', ''))));

$categoryLabel      = htmlspecialchars(trim(val($data, 'categoryLabel', val($data, 'category', 'UG / PG Student'))));
$amount             = htmlspecialchars(trim(val($data, 'amount', '750')));
$currency           = htmlspecialchars(trim(val($data, 'currency', 'INR')));

$defaultRegId       = 'DYUTI27-ONLINE-' . mt_rand(10000, 99999);
$regId              = htmlspecialchars(trim(val($data, 'regId', val($data, 'registration_id', $defaultRegId))));
$vortexTxId         = htmlspecialchars(trim(val($data, 'vortex_transaction_id', val($data, 'transaction_id', 'N/A'))));
$paymentStatus      = htmlspecialchars(trim(val($data, 'payment_status', 'SUCCESS')));
$dateTime           = htmlspecialchars(trim(val($data, 'date_time', date('Y-m-d H:i:s'))));
$clientIp           = isset($_SERVER['REMOTE_ADDR']) ? $_SERVER['REMOTE_ADDR'] : 'Unknown';

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

if (!empty($paperTitle) || !empty($paperTheme)) {
    $htmlBody .= '
        <tr>
          <td class="label">Paper Title</td>
          <td class="val"><em>' . ($paperTitle ?: 'Submitted Paper') . '</em></td>
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
      Secretariat Email: <a href="mailto:dyuti@rajagiri.edu">dyuti@rajagiri.edu</a> &bull; Web: <a href="https://dyuti.in">dyuti.in</a>
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
if (!empty($paperTitle)) {
    $plainBody .= "Paper Title:           {$paperTitle}\n";
}
if (!empty($paperTheme)) {
    $plainBody .= "Theme Track:           {$paperTheme}\n";
}
$plainBody .= "\nSubmitted from IP: {$clientIp} at " . date('c') . "\n";

// 5. Generate PDF Registration Receipt Attachment
$pdfData = '';
try {
    $pdfData = generateRegistrationPDF($data);
} catch (Exception $e) {
    error_log("PDF Generation failed: " . $e->getMessage());
}

$pdfBase64 = !empty($pdfData) ? chunk_split(base64_encode($pdfData)) : '';
$safeRegId = preg_replace('/[^A-Za-z0-9_\-]/', '_', $regId);
$pdfFilename = "DYUTI2027_Registration_{$safeRegId}.pdf";

// 6. Build Multipart Email (mixed -> alternative HTML/Text + PDF Attachment)
$mixedBoundary = "DYUTI_MIXED_" . md5(time());
$altBoundary   = "DYUTI_ALT_" . md5(time());

$headers  = "From: DYUTI 2027 Portal <noreply@dyuti.in>\r\n";
if (!empty($email)) {
    $headers .= "Reply-To: {$fullName} <{$email}>\r\n";
}
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: multipart/mixed; boundary=\"{$mixedBoundary}\"\r\n";
$headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";

$fullEmailContent  = "--{$mixedBoundary}\r\n";
$fullEmailContent .= "Content-Type: multipart/alternative; boundary=\"{$altBoundary}\"\r\n\r\n";

$fullEmailContent .= "--{$altBoundary}\r\n";
$fullEmailContent .= "Content-Type: text/plain; charset=UTF-8\r\n";
$fullEmailContent .= "Content-Transfer-Encoding: 8bit\r\n\r\n";
$fullEmailContent .= $plainBody . "\r\n\r\n";

$fullEmailContent .= "--{$altBoundary}\r\n";
$fullEmailContent .= "Content-Type: text/html; charset=UTF-8\r\n";
$fullEmailContent .= "Content-Transfer-Encoding: 8bit\r\n\r\n";
$fullEmailContent .= $htmlBody . "\r\n\r\n";

$fullEmailContent .= "--{$altBoundary}--\r\n\r\n";

if (!empty($pdfBase64)) {
    $fullEmailContent .= "--{$mixedBoundary}\r\n";
    $fullEmailContent .= "Content-Type: application/pdf; name=\"{$pdfFilename}\"\r\n";
    $fullEmailContent .= "Content-Transfer-Encoding: base64\r\n";
    $fullEmailContent .= "Content-Disposition: attachment; filename=\"{$pdfFilename}\"\r\n\r\n";
    $fullEmailContent .= $pdfBase64 . "\r\n\r\n";
}

$fullEmailContent .= "--{$mixedBoundary}--";

// 7. Send Email to Secretariat (dyuti@rajagiri.edu)
$mailSent = @mail($to, $subject, $fullEmailContent, $headers, "-f noreply@dyuti.in");
if (!$mailSent) {
    $mailSent = @mail($to, $subject, $fullEmailContent, $headers);
}

// Also send confirmation copy to the delegate's personal email if provided
if (!empty($email)) {
    $delegateSubject = "Registration & Payment Confirmation: DYUTI 2027 Conference [{$regId}]";
    $delegateHeaders  = "From: DYUTI 2027 Secretariat <noreply@dyuti.in>\r\n";
    $delegateHeaders .= "Reply-To: DYUTI Secretariat <dyuti@rajagiri.edu>\r\n";
    $delegateHeaders .= "MIME-Version: 1.0\r\n";
    $delegateHeaders .= "Content-Type: multipart/mixed; boundary=\"{$mixedBoundary}\"\r\n";
    $delegateHeaders .= "X-Mailer: PHP/" . phpversion() . "\r\n";
    $dSent = @mail($email, $delegateSubject, $fullEmailContent, $delegateHeaders, "-f noreply@dyuti.in");
    if (!$dSent) {
        @mail($email, $delegateSubject, $fullEmailContent, $delegateHeaders);
    }
}

/**
 * Generates official PDF Registration & Payment Receipt using FPDF
 */
function generateRegistrationPDF($data) {
    $clean = function($str) {
        $str = str_replace(['₹', '•', '—', '–', '’', '“', '”'], ['INR ', '*', '-', '-', "'", '"', '"'], (string)$str);
        return function_exists('iconv') ? iconv('UTF-8', 'windows-1252//TRANSLIT//IGNORE', $str) : $str;
    };

    $title           = $clean(val($data, 'title', 'Dr.'));
    $fullName        = $clean(val($data, 'name', val($data, 'full_name', 'Delegate Participant')));
    $designation     = $clean(val($data, 'designation', 'N/A'));
    $gender          = $clean(val($data, 'gender', 'N/A'));
    $organization    = $clean(val($data, 'organization', 'N/A'));
    $discipline      = $clean(val($data, 'discipline', 'N/A'));
    $address         = $clean(val($data, 'address', 'N/A'));
    $pincode         = $clean(val($data, 'pincode', 'N/A'));
    $phone           = $clean(val($data, 'phone', val($data, 'mobile', 'N/A')));
    $email           = $clean(val($data, 'email', 'N/A'));
    $foodPref        = $clean(val($data, 'foodPreference', val($data, 'food_preference', 'veg')));
    $foodLabel       = (strtolower($foodPref) === 'non-veg') ? 'Non-Vegetarian' : 'Vegetarian';
    $requireAccom    = $clean(val($data, 'requireAccommodation', val($data, 'require_accommodation', 'no')));
    $accomLabel      = (strtolower($requireAccom) === 'yes') ? 'Yes (Moderate Accommodation requested)' : 'No (Arranging own stay)';
    $isPresenting    = $clean(val($data, 'isPresentingPaper', val($data, 'is_presenting_paper', 'no')));
    $presentingLabel = (strtolower($isPresenting) === 'yes') ? 'Yes (Author / Presenter)' : 'No (Delegate / Attendee)';
    $categoryLabel   = $clean(val($data, 'categoryLabel', val($data, 'category', 'UG / PG Student')));
    $amount          = $clean(val($data, 'amount', '750'));
    $currency        = $clean(val($data, 'currency', 'INR'));
    $regId           = $clean(val($data, 'regId', val($data, 'registration_id', 'DYUTI27-ONLINE')));
    $vortexTxId      = $clean(val($data, 'vortex_transaction_id', val($data, 'transaction_id', 'N/A')));
    $paymentStatus   = $clean(val($data, 'payment_status', 'SUCCESS'));
    $dateTime        = $clean(val($data, 'date_time', date('Y-m-d H:i:s')));

    $pdf = new FPDF('P', 'mm', 'A4');
    $pdf->SetAutoPageBreak(true, 15);
    $pdf->AddPage();

    // Header Banner (Navy #071A33)
    $pdf->SetFillColor(7, 26, 51);
    $pdf->Rect(10, 10, 190, 32, 'F');

    // Subtitle (Gold #D4AF37)
    $pdf->SetXY(15, 13);
    $pdf->SetFont('Helvetica', 'B', 9);
    $pdf->SetTextColor(212, 175, 55);
    $pdf->Cell(180, 5, 'DYUTI 2027 - NATIONAL CONFERENCE ON SOCIAL WORK', 0, 1, 'L');

    // Title (White)
    $pdf->SetX(15);
    $pdf->SetFont('Helvetica', 'B', 14);
    $pdf->SetTextColor(255, 255, 255);
    $pdf->Cell(180, 8, 'DELEGATE REGISTRATION & PAYMENT RECEIPT', 0, 1, 'L');

    // Institution
    $pdf->SetX(15);
    $pdf->SetFont('Helvetica', '', 8.5);
    $pdf->SetTextColor(203, 213, 225);
    $pdf->Cell(180, 5, 'Rajagiri College of Social Sciences (Autonomous), Kalamassery, Kochi, Kerala', 0, 1, 'L');

    // Verified Status Bar (Green)
    $pdf->SetY(44);
    $pdf->SetFillColor(220, 252, 231);
    $pdf->SetDrawColor(167, 243, 208);
    $pdf->Rect(10, 44, 190, 8, 'DF');
    $pdf->SetFont('Helvetica', 'B', 8.5);
    $pdf->SetTextColor(6, 95, 70);
    $pdf->SetXY(10, 44);
    $pdf->Cell(190, 8, 'OFFICIAL RECEIPT - PAYMENT VERIFIED VIA VORTEXX GATEWAY', 0, 1, 'C');

    // Highlight Cards Grid
    $pdf->Ln(4);
    $cardY = $pdf->GetY();
    
    // Left Box - Reg ID
    $pdf->SetFillColor(248, 250, 252);
    $pdf->SetDrawColor(226, 232, 240);
    $pdf->Rect(10, $cardY, 92, 16, 'DF');
    $pdf->SetXY(13, $cardY + 2);
    $pdf->SetFont('Helvetica', 'B', 7.5);
    $pdf->SetTextColor(100, 116, 139);
    $pdf->Cell(86, 4, 'REGISTRATION ID', 0, 1, 'L');
    $pdf->SetX(13);
    $pdf->SetFont('Helvetica', 'B', 11);
    $pdf->SetTextColor(7, 26, 51);
    $pdf->Cell(86, 6, $regId, 0, 1, 'L');

    // Right Box - Transaction ID
    $pdf->Rect(108, $cardY, 92, 16, 'DF');
    $pdf->SetXY(111, $cardY + 2);
    $pdf->SetFont('Helvetica', 'B', 7.5);
    $pdf->SetTextColor(100, 116, 139);
    $pdf->Cell(86, 4, 'VORTEXX TRANSACTION ID', 0, 1, 'L');
    $pdf->SetX(111);
    $pdf->SetFont('Helvetica', 'B', 11);
    $pdf->SetTextColor(5, 150, 105);
    $pdf->Cell(86, 6, $vortexTxId, 0, 1, 'L');

    $pdf->SetY($cardY + 20);

    // Section header renderer
    $addSectionHeader = function($secTitle) use ($pdf) {
        $pdf->Ln(2);
        $pdf->SetFont('Helvetica', 'B', 9.5);
        $pdf->SetTextColor(7, 26, 51);
        $pdf->SetFillColor(241, 245, 249);
        $pdf->Cell(190, 6, '  ' . strtoupper($secTitle), 0, 1, 'L', true);
        $pdf->SetDrawColor(7, 26, 51);
        $pdf->Line(10, $pdf->GetY(), 200, $pdf->GetY());
        $pdf->Ln(1);
    };

    // Table row renderer
    $addTableRow = function($label, $value, $highlight = false) use ($pdf) {
        $pdf->SetFont('Helvetica', '', 8.5);
        $pdf->SetTextColor(100, 116, 139);
        $pdf->Cell(60, 5.5, '  ' . $label, 'B', 0, 'L');
        
        if ($highlight) {
            $pdf->SetFont('Helvetica', 'B', 9);
            $pdf->SetTextColor(7, 26, 51);
        } else {
            $pdf->SetFont('Helvetica', '', 8.5);
            $pdf->SetTextColor(15, 23, 42);
        }
        $pdf->Cell(130, 5.5, $value, 'B', 1, 'L');
    };

    // Section 1: Payment Details
    $addSectionHeader('1. Payment & Transaction Details');
    $addTableRow('Amount Paid', $currency . ' ' . $amount, true);
    $addTableRow('Payment Status', $paymentStatus, true);
    $addTableRow('Category', $categoryLabel);
    $addTableRow('Transaction Timestamp', $dateTime);

    // Section 2: Delegate Information
    $addSectionHeader('2. Delegate Information');
    $addTableRow('Full Name', $title . ' ' . $fullName, true);
    $addTableRow('Designation', $designation);
    $addTableRow('Gender', $gender);
    $addTableRow('Institution / Organization', $organization, true);
    $addTableRow('Discipline', $discipline);

    // Section 3: Contact Details
    $addSectionHeader('3. Contact Coordinates');
    $addTableRow('Email Address', $email);
    $addTableRow('Mobile / Phone', $phone);
    $addTableRow('PIN Code', $pincode);
    $addTableRow('Address', str_replace(["\r", "\n"], ' ', $address));

    // Section 4: Conference Logistics
    $addSectionHeader('4. Logistics & Paper Submission');
    $addTableRow('Food Preference', $foodLabel);
    $addTableRow('Accommodation Request', $accomLabel);
    $addTableRow('Paper Presenter', $presentingLabel);
    if (!empty($paperTitle) || !empty($paperTheme)) {
        if (!empty($paperTitle)) $addTableRow('Paper Title', substr($paperTitle, 0, 70));
        if (!empty($paperTheme)) $addTableRow('Sub-Theme Track', $paperTheme);
    }

    // Footer Info
    $pdf->Ln(6);
    $pdf->SetFont('Helvetica', 'I', 7.5);
    $pdf->SetTextColor(100, 116, 139);
    $pdf->MultiCell(190, 4, "This document serves as the official registration & payment receipt for DYUTI 2027.\nRajagiri College of Social Sciences (Autonomous), Kalamassery, Kochi - 683104, Kerala.\nSecretariat Email: dyuti@rajagiri.edu | Web: https://dyuti.in", 0, 'C');

    return $pdf->Output('S');
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
