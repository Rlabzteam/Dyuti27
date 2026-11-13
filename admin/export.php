<?php
/**
 * DYUTI 2027 Admin Portal - Secure Excel / CSV Export (export.php)
 * Strictly requires active administrator session.
 * 100% compatible with PHP 5.6, 7.x, and 8.x
 */

// Prevent all output buffering and error leaks
ini_set('display_errors', 0);
error_reporting(0);

// Secure Session Initialization
if (session_status() === PHP_SESSION_NONE) {
    $secure = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') || (isset($_SERVER['SERVER_PORT']) && $_SERVER['SERVER_PORT'] == 443);
    if (PHP_VERSION_ID >= 70300) {
        session_start(array(
            'cookie_lifetime' => 0,
            'cookie_path'     => '/',
            'cookie_domain'   => '',
            'cookie_secure'   => $secure,
            'cookie_httponly' => true,
            'cookie_samesite' => 'Strict'
        ));
    } else {
        ini_set('session.cookie_httponly', 1);
        if ($secure) ini_set('session.cookie_secure', 1);
        session_start();
    }
}

// Security Check: Must be authenticated
if (empty($_SESSION['dyuti_admin_logged_in']) || $_SESSION['dyuti_admin_logged_in'] !== true) {
    http_response_code(403);
    header('Content-Type: text/plain; charset=utf-8');
    die("Access Denied: You must be logged in as an administrator to export data.");
}

// Verify CSRF token if provided
if (!empty($_GET['csrf'])) {
    if (empty($_SESSION['dyuti_admin_csrf']) || !hash_equals($_SESSION['dyuti_admin_csrf'], $_GET['csrf'])) {
        http_response_code(403);
        die("Security validation failed (CSRF token mismatch).");
    }
}

require_once __DIR__ . '/../api/db_config.php';
$pdo = getDbConnection();

if (!$pdo) {
    http_response_code(500);
    die("Database connection failed. Unable to generate export.");
}

// Parse optional filter parameters from query
$search = isset($_GET['search']) ? trim($_GET['search']) : '';
$status = isset($_GET['status']) ? trim($_GET['status']) : '';
$category = isset($_GET['category']) ? trim($_GET['category']) : '';
$partType = isset($_GET['participation_type']) ? trim($_GET['participation_type']) : '';

$whereClauses = array();
$params = array();

if ($search !== '') {
    $whereClauses[] = "(
        registration_id LIKE :s_reg 
        OR full_name LIKE :s_name 
        OR email LIKE :s_email 
        OR phone LIKE :s_phone 
        OR organization LIKE :s_org 
        OR transaction_ref LIKE :s_txn
        OR payment_order_id LIKE :s_order
    )";
    $likeSearch = '%' . $search . '%';
    $params[':s_reg']   = $likeSearch;
    $params[':s_name']  = $likeSearch;
    $params[':s_email'] = $likeSearch;
    $params[':s_phone'] = $likeSearch;
    $params[':s_org']   = $likeSearch;
    $params[':s_txn']   = $likeSearch;
    $params[':s_order'] = $likeSearch;
}

if ($status !== '' && $status !== 'all') {
    if ($status === 'success') {
        $whereClauses[] = "LOWER(payment_status) IN ('success', 'paid', 'captured', 'confirmed')";
    } elseif ($status === 'pending') {
        $whereClauses[] = "LOWER(payment_status) = 'pending'";
    } elseif ($status === 'failed') {
        $whereClauses[] = "LOWER(payment_status) IN ('failed', 'failure', 'cancelled', 'error')";
    }
}

if ($category !== '' && $category !== 'all') {
    $whereClauses[] = "registration_category = :cat";
    $params[':cat'] = $category;
}

if ($partType !== '' && $partType !== 'all') {
    $whereClauses[] = "participation_type = :part";
    $params[':part'] = $partType;
}

$sql = "SELECT * FROM registrations";
if (!empty($whereClauses)) {
    $sql .= " WHERE " . implode(' AND ', $whereClauses);
}
$sql .= " ORDER BY id DESC";

$stmt = $pdo->prepare($sql);
$stmt->execute($params);

// Sanitize cell values against CSV / Excel Formula Injection (CWE-1236)
function sanitizeCsvValue($val) {
    if ($val === null) return '';
    $str = (string)$val;
    // Prepend single quote if string begins with formula triggers
    if (strlen($str) > 0 && in_array($str[0], array('=', '+', '-', '@', "\t", "\r"))) {
        return "'" . $str;
    }
    return $str;
}

$filename = 'DYUTI_2027_Registrations_' . date('Y-m-d_His') . '.csv';

// Send streaming download headers
header('Content-Type: text/csv; charset=UTF-8');
header('Content-Disposition: attachment; filename="' . $filename . '"');
header('Cache-Control: max-age=0, no-cache, no-store, must-revalidate');
header('Pragma: no-cache');
header('Expires: 0');

$output = fopen('php://output', 'w');

// UTF-8 BOM so Microsoft Excel automatically recognizes Unicode / ₹ symbols
fprintf($output, chr(0xEF) . chr(0xBB) . chr(0xBF));

// CSV Header Row
fputcsv($output, array(
    'ID',
    'Registration ID',
    'Registered Date & Time',
    'Title',
    'Full Name',
    'Designation',
    'Gender',
    'Organization',
    'Discipline',
    'Address',
    'Pincode',
    'Phone',
    'Email',
    'Food Preference',
    'Dietary Details',
    'Accommodation Required',
    'Accommodation Notes',
    'Presenting Paper',
    'CMT Paper ID',
    'Paper Title',
    'Sub-theme Track',
    'Participation Type',
    'Registration Category',
    'Fee Amount (INR)',
    'Payment Mode',
    'Payment Status',
    'Transaction Reference',
    'Gateway Order ID',
    'Razorpay Payment ID',
    'IP Address',
    'Last Updated'
));

while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    fputcsv($output, array(
        sanitizeCsvValue($row['id']),
        sanitizeCsvValue($row['registration_id']),
        sanitizeCsvValue($row['created_at']),
        sanitizeCsvValue($row['title']),
        sanitizeCsvValue($row['full_name']),
        sanitizeCsvValue($row['designation']),
        sanitizeCsvValue($row['gender']),
        sanitizeCsvValue($row['organization']),
        sanitizeCsvValue($row['discipline']),
        sanitizeCsvValue($row['address']),
        sanitizeCsvValue($row['pincode']),
        sanitizeCsvValue($row['phone']),
        sanitizeCsvValue($row['email']),
        sanitizeCsvValue($row['food_preference']),
        sanitizeCsvValue(isset($row['food_details']) ? $row['food_details'] : ''),
        sanitizeCsvValue($row['require_accommodation']),
        sanitizeCsvValue(isset($row['accommodation_notes']) ? $row['accommodation_notes'] : ''),
        sanitizeCsvValue($row['is_presenting_paper']),
        sanitizeCsvValue(isset($row['cmt_paper_id']) ? $row['cmt_paper_id'] : ''),
        sanitizeCsvValue(isset($row['paper_title']) ? $row['paper_title'] : ''),
        sanitizeCsvValue(isset($row['paper_theme']) ? $row['paper_theme'] : ''),
        sanitizeCsvValue(isset($row['participation_type']) ? $row['participation_type'] : 'regular'),
        sanitizeCsvValue($row['registration_category']),
        sanitizeCsvValue(number_format((float)$row['fee_amount'], 2, '.', '')),
        sanitizeCsvValue($row['payment_mode']),
        sanitizeCsvValue(strtoupper($row['payment_status'])),
        sanitizeCsvValue($row['transaction_ref']),
        sanitizeCsvValue($row['payment_order_id']),
        sanitizeCsvValue($row['razorpay_payment_id']),
        sanitizeCsvValue(isset($row['ip_address']) ? $row['ip_address'] : ''),
        sanitizeCsvValue($row['updated_at'])
    ));
}

fclose($output);
exit;

