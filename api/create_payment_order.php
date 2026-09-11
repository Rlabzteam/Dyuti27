<?php
/**
 * Vortexx Payment Gateway - create_payment_order.php
 * Handles creating a payment order with Vortexx and redirecting / returning the checkout URL
 * Compatible with PHP 5.6, 7.x, and 8.x
 */

// Enable CORS for frontend clients
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Accept, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Automatically load .env if present in parent directories (supports outside public_html)
$envPaths = [
    __DIR__ . '/../../../.env', // Subfolder hosting (above public_html when hosted at /rcss/api/)
    __DIR__ . '/../../.env',    // cPanel recommended: one directory above public_html
    __DIR__ . '/../.env',       // Root directory
    __DIR__ . '/.env'           // api directory
];
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

$url = getenv('VORTEXX_API_URL') ?: (getenv('VORTEX_API_URL') ? rtrim(getenv('VORTEX_API_URL'), '/') . '/create_payment_order.php' : "https://icswhmh.com/vortex/api/create_payment_order.php");
if (substr($url, -4) !== '.php') {
    $url = rtrim($url, '/') . '/create_payment_order.php';
}

// Parse incoming input from JSON body, standard POST, or GET
$rawInput = file_get_contents('php://input');
$jsonInput = json_decode($rawInput, true);

$input = is_array($jsonInput) ? $jsonInput : $_POST;
if (empty($input)) {
    $input = $_GET;
}

// Prepare credentials strictly from .env / environment variables (no hardcoded keys in code)
$apiKey    = getenv('VORTEX_API_KEY') ?: getenv('VORTEXX_API_KEY');
$apiSecret = getenv('VORTEX_API_SECRET') ?: getenv('VORTEXX_API_SECRET');
$eventId   = getenv('VORTEX_EVENT_ID') ?: getenv('VORTEXX_EVENT_ID');

if (empty($apiKey) || empty($apiSecret) || empty($eventId)) {
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'message' => 'Payment gateway credentials are not configured in .env'
    ]);
    exit;
}

$customerName = !empty($input['name']) ? trim($input['name']) : (!empty($input['customer_name']) ? trim($input['customer_name']) : "Delegate Participant");

$rawEmail = !empty($input['email']) ? trim($input['email']) : (!empty($input['customer_email']) ? trim($input['customer_email']) : "delegate@rajagiri.edu");
$customerEmail = filter_var($rawEmail, FILTER_VALIDATE_EMAIL) ? $rawEmail : "delegate@rajagiri.edu";

$rawMobile = !empty($input['mobile']) ? $input['mobile'] : (!empty($input['customer_mobile']) ? $input['customer_mobile'] : (!empty($input['phone']) ? $input['phone'] : "9876543210"));
$cleanMobile = preg_replace('/\D/', '', $rawMobile);
if (strlen($cleanMobile) > 10) {
    $cleanMobile = substr($cleanMobile, -10);
}

$redirectUrl = !empty($input['redirect_url']) ? $input['redirect_url'] : "https://dyuti.in/rcss/registration.html";
$currency = !empty($input['currency']) ? strtoupper(trim($input['currency'])) : "INR";

// Production pricing: Dynamic amount from input with fallback to 750.00
$amount = isset($input['amount']) ? (float)$input['amount'] : 750.00;


$data = [
    "api_key"      => $apiKey,
    "api_secret"   => $apiSecret,
    "event_id"     => $eventId,
    "name"         => $customerName,
    "email"        => $customerEmail,
    "mobile"       => !empty($cleanMobile) ? $cleanMobile : $rawMobile,
    "amount"       => $amount,
    "currency"     => $currency,
    "redirect_url" => $redirectUrl
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

    $paymentUrl  = $result["data"]["payment_url"];
    $vortexTxnId = isset($result["data"]["vortex_transaction_id"]) ? $result["data"]["vortex_transaction_id"] : null;

    // Immediately link vortex_transaction_id to delegate registration in DB so webhook can match it
    if ($vortexTxnId) {
        require_once __DIR__ . '/db_config.php';
        $pdo = function_exists('getDbConnection') ? getDbConnection() : null;
        if ($pdo) {
            try {
                $orderId = !empty($input['order_id']) ? $input['order_id'] : (!empty($input['registration_id']) ? $input['registration_id'] : null);
                if ($orderId) {
                    $upStmt = $pdo->prepare("UPDATE registrations SET payment_order_id = :txn_id, updated_at = NOW() WHERE registration_id = :order_id");
                    $upStmt->execute([':txn_id' => $vortexTxnId, ':order_id' => $orderId]);
                } elseif (!empty($customerEmail)) {
                    $upStmt = $pdo->prepare("UPDATE registrations SET payment_order_id = :txn_id, updated_at = NOW() WHERE email = :email ORDER BY id DESC LIMIT 1");
                    $upStmt->execute([':txn_id' => $vortexTxnId, ':email' => $customerEmail]);
                }
            } catch (Exception $dbEx) {
                error_log("[RCSS_CREATE_ORDER] DB link error: " . $dbEx->getMessage());
            }
        }
    }

    // If request was initiated directly via browser form or redirect is requested
    if (!$isJsonClient || (isset($input['redirect']) && $input['redirect'] === 'true')) {
        header("Location: " . $paymentUrl);
        exit;
    }

    // If caller is frontend fetch/XHR, return JSON so client JS redirects cleanly without CORS issues
    header("Content-Type: application/json");
    echo json_encode([
        "status"                => "success",
        "success"               => true,
        "payment_url"           => $paymentUrl,
        "vortex_transaction_id" => $vortexTxnId,
        "data" => [
            "payment_url"           => $paymentUrl,
            "vortex_transaction_id" => $vortexTxnId
        ]
    ]);
    exit;
}

// Payment failed or unexpected response from gateway
$errMsg = isset($result["message"]) ? $result["message"] : "Payment initialization failed.";
if ($isJsonClient && (!isset($input['redirect']) || $input['redirect'] !== 'true')) {
    http_response_code(400);
    header("Content-Type: application/json");
    echo json_encode([
        "status" => "error",
        "message" => $errMsg,
        "gateway_response" => !empty($result) ? $result : $response
    ]);
    exit;
}

echo "Payment initialization failed: " . htmlspecialchars($errMsg);
?>
