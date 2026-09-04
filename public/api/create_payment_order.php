<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Accept');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Read JSON input from frontend
$rawInput = file_get_contents('php://input');
$inputData = json_decode($rawInput, true);

if (!$inputData) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Invalid JSON payload received.'
    ]);
    exit;
}

$url = "http://vortexx/api/create_payment_order.php";

$apiKey = isset($inputData['api_key']) && $inputData['api_key'] !== 'YOUR_API_KEY'
    ? $inputData['api_key'] 
    : "YOUR_API_KEY";

$apiSecret = isset($inputData['api_secret']) && $inputData['api_secret'] !== 'YOUR_API_SECRET'
    ? $inputData['api_secret'] 
    : "YOUR_API_SECRET";

$eventId = isset($inputData['event_id']) 
    ? $inputData['event_id'] 
    : "youEventId";

$data = [
    "api_key"         => $apiKey,
    "api_secret"      => $apiSecret,
    "event_id"        => $eventId,
    "customer_name"   => $inputData['customer_name'] ?? 'Delegate',
    "customer_email"  => $inputData['customer_email'] ?? 'delegate@example.com',
    "customer_mobile" => $inputData['customer_mobile'] ?? '9876543210',
    "amount"          => (int)($inputData['amount'] ?? 750),
    "currency"        => $inputData['currency'] ?? 'INR',
    "redirect_url"    => $inputData['redirect_url'] ?? 'https://dyuti.in/register?payment_status=success'
];

$ch = curl_init($url);

curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Content-Type: application/json",
    "Accept: application/json"
]);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 15);

$response = curl_exec($ch);

if ($response === false) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Vortex connection failed: ' . curl_error($ch)
    ]);
    curl_close($ch);
    exit;
}

curl_close($ch);

$result = json_decode($response, true);

if ($result && isset($result['status']) && $result['status'] === 'success') {
    echo json_encode($result);
    exit;
}

// If direct response format
if ($result) {
    echo json_encode($result);
} else {
    echo json_encode([
        'status' => 'error',
        'message' => 'Payment initialization failed from gateway response.',
        'raw_response' => $response
    ]);
}
?>
