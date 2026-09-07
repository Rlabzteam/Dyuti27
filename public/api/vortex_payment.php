<?php
/**
 * Vortexx Payment Gateway Integration
 * Direct Payment Order Initialization Script
 */

// Vortex API Endpoint
$url = "http://vortexx/api/create_payment_order.php";

// Allow dynamic override from POST/GET, falling back to defaults
$data = [
    "api_key"         => $_POST["api_key"] ?? $_GET["api_key"] ?? "YOUR_API_KEY",
    "api_secret"      => $_POST["api_secret"] ?? $_GET["api_secret"] ?? "YOUR_API_SECRET",
    "event_id"        => $_POST["event_id"] ?? $_GET["event_id"] ?? "youEventId",

    "customer_name"   => $_POST["customer_name"] ?? $_GET["customer_name"] ?? "Test Customer",
    "customer_email"  => $_POST["customer_email"] ?? $_GET["customer_email"] ?? "test@example.com",
    "customer_mobile" => $_POST["customer_mobile"] ?? $_GET["customer_mobile"] ?? "9876543210",

    "amount"          => isset($_POST["amount"]) ? (int)$_POST["amount"] : (isset($_GET["amount"]) ? (int)$_GET["amount"] : 100),
    "currency"        => $_POST["currency"] ?? $_GET["currency"] ?? "INR",

    "redirect_url"    => $_POST["redirect_url"] ?? $_GET["redirect_url"] ?? "your redirection url"
];

$ch = curl_init($url);

curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));

curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Content-Type: application/json",
    "Accept: application/json"
]);

curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($ch);

if ($response === false) {
    die("Vortex connection failed: " . curl_error($ch));
}

curl_close($ch);

$result = json_decode($response, true);

if (isset($result["status"]) && $result["status"] === "success") {

    $paymentUrl = $result["data"]["payment_url"];

    header("Location: " . $paymentUrl);
    exit;

}

echo "Payment initialization failed.";
