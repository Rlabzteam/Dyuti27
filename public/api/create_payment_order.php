<?php
/**
 * Vortexx Payment Gateway - create_payment_order.php
 * Handles creating a payment order with Vortexx and redirecting / returning the checkout URL
 */

// Enable CORS for frontend clients
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Accept, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Vortexx API Gateway endpoint
$url = getenv('VORTEXX_API_URL') ?: "http://vortexx/api/create_payment_order.php";

// Parse incoming input from JSON body, standard POST, or GET
$rawInput = file_get_contents('php://input');
$jsonInput = json_decode($rawInput, true);

$input = is_array($jsonInput) ? $jsonInput : $_POST;
if (empty($input)) {
    $input = $_GET;
}

// Prepare credentials & payload with fallbacks to defaults or env
$apiKey    = !empty($input['api_key']) && $input['api_key'] !== 'YOUR_API_KEY' ? $input['api_key'] : (getenv('VORTEXX_API_KEY') ?: "YOUR_API_KEY");
$apiSecret = !empty($input['api_secret']) && $input['api_secret'] !== 'YOUR_API_SECRET' ? $input['api_secret'] : (getenv('VORTEXX_API_SECRET') ?: "YOUR_API_SECRET");
$eventId   = !empty($input['event_id']) ? $input['event_id'] : (getenv('VORTEXX_EVENT_ID') ?: "youEventId");

$data = [
    "api_key"         => $apiKey,
    "api_secret"      => $apiSecret,
    "event_id"        => $eventId,

    "customer_name"   => $input['customer_name']   ?? "Test Customer",
    "customer_email"  => $input['customer_email']  ?? "test@example.com",
    "customer_mobile" => $input['customer_mobile'] ?? "9876543210",

    "amount"          => isset($input['amount']) ? (int)$input['amount'] : 100,
    "currency"        => $input['currency'] ?? "INR",

    "redirect_url"    => $input['redirect_url'] ?? "your redirection url"
];

$ch = curl_init($url);

curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));

curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Content-Type: application/json",
    "Accept: application/json"
]);

curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 20);

$response = curl_exec($ch);

// Detect if caller wants JSON (e.g. from fetch() / Axios in frontend)
$isJsonClient = (isset($_SERVER['HTTP_ACCEPT']) && strpos($_SERVER['HTTP_ACCEPT'], 'application/json') !== false)
             || (isset($_SERVER['CONTENT_TYPE']) && strpos($_SERVER['CONTENT_TYPE'], 'application/json') !== false)
             || (!empty($rawInput) && is_array($jsonInput) && empty($_POST));

if ($response === false) {
    $error = "Vortex connection failed: " . curl_error($ch);
    curl_close($ch);

    if ($isJsonClient && (!isset($input['redirect']) || $input['redirect'] !== 'true')) {
        http_response_code(502);
        header("Content-Type: application/json");
        echo json_encode([
            "status" => "error",
            "message" => $error
        ]);
        exit;
    } else {
        die($error);
    }
}

curl_close($ch);

$result = json_decode($response, true);

if (isset($result["status"]) && $result["status"] === "success") {

    $paymentUrl = $result["data"]["payment_url"];

    // If request was initiated directly via browser form or redirect is requested
    if (!$isJsonClient || (isset($input['redirect']) && $input['redirect'] === 'true')) {
        header("Location: " . $paymentUrl);
        exit;
    }

    // If caller is frontend fetch/XHR, return JSON so client JS redirects cleanly without CORS issues
    header("Content-Type: application/json");
    echo json_encode([
        "status" => "success",
        "data" => [
            "payment_url" => $paymentUrl
        ]
    ]);
    exit;
}

// Payment failed or unexpected response
if ($isJsonClient && (!isset($input['redirect']) || $input['redirect'] !== 'true')) {
    http_response_code(400);
    header("Content-Type: application/json");
    echo json_encode([
        "status" => "error",
        "message" => "Payment initialization failed.",
        "gateway_response" => $result ?? $response
    ]);
    exit;
}

echo "Payment initialization failed.";
