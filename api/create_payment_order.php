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
$url = getenv('VORTEXX_API_URL') ?: "https://icswhmh.com/vortex/api/create_payment_order.php";

// Parse incoming input from JSON body, standard POST, or GET
$rawInput = file_get_contents('php://input');
$jsonInput = json_decode($rawInput, true);

$input = is_array($jsonInput) ? $jsonInput : $_POST;
if (empty($input)) {
    $input = $_GET;
}

// Prepare credentials & payload with fallbacks to defaults or env
$apiKey    = !empty($input['api_key']) && $input['api_key'] !== 'YOUR_API_KEY' ? $input['api_key'] : (getenv('VORTEXX_API_KEY') ?: "51e60f98b5b217688d0fe537a1a58033");
$apiSecret = !empty($input['api_secret']) && $input['api_secret'] !== 'YOUR_API_SECRET' ? $input['api_secret'] : (getenv('VORTEXX_API_SECRET') ?: "e605e71a192a6eba29416f3931e5abf3");
$eventId   = !empty($input['event_id']) && $input['event_id'] !== 'youEventId' ? $input['event_id'] : (getenv('VORTEXX_EVENT_ID') ?: "DYUT20260913MU01TMQ67BK");

$customerName   = $input['customer_name'] ?? $input['name'] ?? "Delegate Participant";
$customerEmail  = $input['customer_email'] ?? $input['email'] ?? "delegate@rajagiri.edu";
$rawMobile      = $input['customer_mobile'] ?? $input['mobile'] ?? $input['phone'] ?? "9876543210";
$cleanMobile    = preg_replace('/\D/', '', $rawMobile);
if (strlen($cleanMobile) > 10) {
    $cleanMobile = substr($cleanMobile, -10);
}

$data = [
    "api_key"         => $apiKey,
    "api_secret"      => $apiSecret,
    "event_id"        => $eventId,

    "customer_name"   => $customerName,
    "name"            => $customerName,
    "customer_email"  => $customerEmail,
    "email"           => $customerEmail,
    "customer_mobile" => $cleanMobile ?: $rawMobile,
    "mobile"          => $cleanMobile ?: $rawMobile,

    "amount"          => isset($input['amount']) ? (int)$input['amount'] : 750,
    "currency"        => $input['currency'] ?? "INR",

    "redirect_url"    => $input['redirect_url'] ?? "https://dyuti27new.vercel.app/registration.html"
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
curl_setopt($ch, CURLOPT_IPRESOLVE, CURL_IPRESOLVE_V4);
curl_setopt($ch, CURLOPT_TCP_NODELAY, 1);

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
