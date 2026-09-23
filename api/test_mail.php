<?php
require_once __DIR__ . '/mailer_helper.php';

$result = dyutiSendMail(
    'dyuti@rajagiri.edu',
    'DYUTI Secretariat',
    'DYUTI 2027 - Test Registration Notification ' . date('H:i:s'),
    '<h2 style="color:#071A33;">Test Email</h2><p>PHPMailer via raw SMTP is working!</p><p>Time: ' . date('Y-m-d H:i:s') . '</p>',
    'Test Email - Raw SMTP working. Time: ' . date('Y-m-d H:i:s')
);

echo "<b>Sent:</b> " . ($result['sent'] ? "<span style='color:green'>YES!</span>" : "<span style='color:red'>NO</span>") . "<br>";
echo "<b>Error:</b> " . ($result['error'] ? htmlspecialchars($result['error']) : "none") . "<br>";
echo "<b>Time:</b> " . date('Y-m-d H:i:s') . "<br>";
echo "<br>Check cPanel → Email → Track Delivery for result.";
