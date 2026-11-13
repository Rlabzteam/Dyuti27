<?php
/**
 * DYUTI 2027 Admin Portal - Secure Excel / CSV Export (export.php)
 * Strictly requires active administrator session.
 * 
 * STRICT RULES:
 * 1. ONLY individuals who have successfully paid are exported.
 * 2. ZERO duplicate entries allowed (each person appears exactly once).
 * 3. Blank or ghost entries are completely excluded.
 * 4. Formatted with UTF-8 BOM for Microsoft Excel.
 * 5. Sanitized against CSV / Formula Injection (CWE-1236).
 *
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

// Parse optional search and category filters
$search   = isset($_GET['search']) ? trim($_GET['search']) : '';
$category = isset($_GET['category']) ? trim($_GET['category']) : '';
$partType = isset($_GET['participation_type']) ? trim($_GET['participation_type']) : '';

$whereClauses = array();
$params = array();

// STRICT RULE 1: Only successfully paid / confirmed delegates are eligible for export
$whereClauses[] = "LOWER(payment_status) IN ('success', 'paid', 'captured', 'confirmed')";
$whereClauses[] = "full_name IS NOT NULL AND TRIM(full_name) != ''";
$whereClauses[] = "email IS NOT NULL AND TRIM(email) != ''";

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

if ($category !== '' && $category !== 'all') {
    $whereClauses[] = "registration_category = :cat";
    $params[':cat'] = $category;
}

if ($partType !== '' && $partType !== 'all') {
    $whereClauses[] = "participation_type = :part";
    $params[':part'] = $partType;
}

// Order by ID DESC so the newest verified record for each individual is processed first
$sql = "SELECT * FROM registrations WHERE " . implode(' AND ', $whereClauses) . " ORDER BY id DESC";

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

$filename = 'DYUTI_2027_Confirmed_Paid_Delegates_' . date('Y-m-d_His') . '.csv';

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
    'Sl. No.',
    'Registration ID',
    'Payment Status',
    'Amount Paid (INR)',
    'Payment Mode',
    'Transaction Reference',
    'Gateway Order ID',
    'Registration Category',
    'Purpose of Participation',
    'Title',
    'Full Name',
    'Designation',
    'Gender',
    'Organization',
    'Discipline',
    'Postal Address',
    'Pincode',
    'Mobile Phone',
    'Email Address',
    'Food Preference',
    'Dietary Details',
    'Accommodation Required',
    'Accommodation Notes',
    'Presenting Paper',
    'CMT Paper ID',
    'Paper Title',
    'Sub-theme Track',
    'Registered Date & Time',
    'Last Updated'
));

$serialNo = 0;
$seenEmails = array();
$seenPhones = array();

while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    // 1. Strict Payment Status Check
    $pStatus = strtolower(trim($row['payment_status']));
    if (!in_array($pStatus, array('success', 'paid', 'captured', 'confirmed'))) {
        continue;
    }

    // 2. Strict Data Integrity Check: Ignore blank/ghost records
    $name = trim($row['full_name']);
    $email = strtolower(trim($row['email']));
    if ($name === '' || $email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        continue;
    }

    // 3. Strict Deduplication Check: Prevent duplicate entries for the same individual
    if (isset($seenEmails[$email])) {
        continue; // Skip duplicate email (already exported this person's latest verified record)
    }

    $phoneDigits = preg_replace('/\D/', '', $row['phone']);
    $phoneLast10 = strlen($phoneDigits) >= 10 ? substr($phoneDigits, -10) : '';
    if (!empty($phoneLast10) && isset($seenPhones[$phoneLast10])) {
        continue; // Skip duplicate phone number
    }

    // Mark email and phone as exported
    $seenEmails[$email] = true;
    if (!empty($phoneLast10)) {
        $seenPhones[$phoneLast10] = true;
    }

    $serialNo++;

    fputcsv($output, array(
        $serialNo,
        sanitizeCsvValue($row['registration_id']),
        'CONFIRMED (PAID)',
        sanitizeCsvValue(number_format((float)$row['fee_amount'], 2, '.', '')),
        sanitizeCsvValue(strtoupper($row['payment_mode'])),
        sanitizeCsvValue($row['transaction_ref']),
        sanitizeCsvValue($row['payment_order_id']),
        sanitizeCsvValue($row['registration_category']),
        sanitizeCsvValue(isset($row['participation_type']) ? $row['participation_type'] : 'regular'),
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
        sanitizeCsvValue($row['created_at']),
        sanitizeCsvValue($row['updated_at'])
    ));
}

fclose($output);
exit;
