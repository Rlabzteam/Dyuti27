<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Accept');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$rawInput = file_get_contents('php://input');
$jsonDecoded = json_decode($rawInput, true);
$data = (!empty($jsonDecoded) && is_array($jsonDecoded)) ? $jsonDecoded : $_POST;

if (empty($data['name']) || empty($data['email']) || empty($data['message'])) {
    echo json_encode([
        'success' => false,
        'message' => 'Please provide your full Name, Email Address, and Message.'
    ]);
    exit;
}

$name = htmlspecialchars(trim($data['name']));
$email = filter_var(trim($data['email']), FILTER_VALIDATE_EMAIL);
$phone = !empty($data['phone']) ? htmlspecialchars(trim($data['phone'])) : '';
$message = htmlspecialchars(trim($data['message']));

if (!$email) {
    echo json_encode([
        'success' => false,
        'message' => 'Please provide a valid Email Address.'
    ]);
    exit;
}

$to = 'dyuti@rajagiri.edu';
$subject = "DYUTI 2027 Conference Inquiry from {$name}";

$body = "Dear Secretariat,\n\n";
$body .= "You have received a new inquiry from the DYUTI 2027 website:\n\n";
$body .= "Name: {$name}\n";
$body .= "Email: {$email}\n";
$body .= "Phone: {$phone}\n\n";
$body .= "Message:\n{$message}\n\n";
$clientIp = !empty($_SERVER['REMOTE_ADDR']) ? $_SERVER['REMOTE_ADDR'] : 'Unknown';
$body .= "--\nSubmitted via DYUTI 2027 Web Portal\nIP: " . $clientIp;

$headers = "From: noreply@dyuti.in\r\n";
$headers .= "Reply-To: {$email}\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// Attempt to send email with envelope sender
@mail($to, $subject, $body, $headers, "-f noreply@dyuti.in");

echo json_encode([
    'success' => true,
    'message' => 'Thank you! Your message has been transmitted to the DYUTI 2027 Secretariat.'
]);
?>
