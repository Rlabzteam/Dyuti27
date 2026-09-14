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
$data = json_decode($rawInput, true) ?: $_POST;

if (empty($data['name']) || empty($data['email']) || empty($data['message'])) {
    echo json_encode([
        'success' => false,
        'message' => 'Please provide your full Name, Email Address, and Message.'
    ]);
    exit;
}

$name = htmlspecialchars(trim($data['name']));
$email = filter_var(trim($data['email']), FILTER_VALIDATE_EMAIL);
$phone = htmlspecialchars(trim($data['phone'] ?? ''));
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
$body .= "--\nSubmitted via DYUTI 2027 Web Portal\nIP: " . ($_SERVER['REMOTE_ADDR'] ?? 'Unknown');

$headers = "From: noreply@dyuti.in\r\n";
$headers .= "Reply-To: {$email}\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// Attempt to send email
@mail($to, $subject, $body, $headers);

echo json_encode([
    'success' => true,
    'message' => 'Thank you! Your message has been transmitted to the DYUTI 2027 Secretariat.'
]);
?>
