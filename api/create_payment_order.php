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

// Automatically load .env if present in root or api directory
$envPaths = [__DIR__ . '/../.env', __DIR__ . '/.env'];
foreach ($envPaths as $envPath) {
    if (file_exists($envPath)) {
        $lines = file($envPath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        foreach ($lines as $line) {
            $line = trim($line);
            if ($line === '' || strpos($line, '#') === 0 || strpos($line, '=') === false) continue;
            list($k, $v) = explode('=', $line, 2);
            $k = trim($k);
            $v = trim($v, " \t\n\r\0\x0B\"'");
            if (!getenv($k)) {
                putenv("{$k}={$v}");
                $_ENV[$k] = $v;
            }
        }
        break;
    }
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

$customerName   = trim($input['name'] ?? $input['customer_name'] ?? "Delegate Participant");
$customerEmail  = filter_var(trim($input['email'] ?? $input['customer_email'] ?? ''), FILTER_VALIDATE_EMAIL) ?: trim($input['email'] ?? $input['customer_email'] ?? 'delegate@rajagiri.edu');
$rawMobile      = $input['mobile'] ?? $input['customer_mobile'] ?? $input['phone'] ?? "9876543210";
$cleanMobile    = preg_replace('/\D/', '', $rawMobile);
if (strlen($cleanMobile) > 10) {
    $cleanMobile = substr($cleanMobile, -10);
}

$data = [
    "api_key"      => $apiKey,
    "api_secret"   => $apiSecret,
    "event_id"     => $eventId,
    "name"         => $customerName,
    "email"        => $customerEmail,
    "mobile"       => $cleanMobile ?: $rawMobile,
    "amount"       => isset($input['amount']) ? (int)$input['amount'] : 750,
    "currency"     => !empty($input['currency']) ? strtoupper(trim($input['currency'])) : "INR",
    "redirect_url" => $input['redirect_url'] ?? "https://dyuti.in/registration.html"
];

$ch = curl_init($url);

curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));

curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Content-Type: application/json",
    "Accept: application/json"
]);

curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 25);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
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

if (isset($result["status"]) && $result["status"] === "success" && !empty($result["data"]["payment_url"])) {

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

// Payment failed or unexpected response from gateway
$errMsg = $result["message"] ?? "Payment initialization failed.";
if ($isJsonClient && (!isset($input['redirect']) || $input['redirect'] !== 'true')) {
    http_response_code(400);
    header("Content-Type: application/json");
    echo json_encode([
        "status" => "error",
        "message" => $errMsg,
        "gateway_response" => $result ?? $response
    ]);
    exit;
}

echo "Payment initialization failed: " . htmlspecialchars($errMsg);
