<?php
/**
 * DYUTI 2027 Registration Status Lookup API (check_registration_status.php)
 * Looks up delegate registration status by Application ID, Phone, or Email
 * Strictly 100% compatible with PHP 5.6, 7.x, and 8.x
 */

ini_set('display_errors', 0);
error_reporting(E_ALL & ~E_NOTICE & ~E_DEPRECATED);

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Accept');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once __DIR__ . '/db_config.php';

// Safe getter helper compatible with PHP 5.6+
function val($arr, $key, $fallback = '') {
    return (is_array($arr) && isset($arr[$key]) && $arr[$key] !== '') ? $arr[$key] : $fallback;
}

// Read input from GET or POST JSON body
$rawInput = file_get_contents('php://input');
$jsonInput = json_decode($rawInput, true);
$input = is_array($jsonInput) ? $jsonInput : $_GET;
if (empty($input)) {
    $input = $_POST;
}

$appId = trim(val($input, 'registration_id', val($input, 'app_id', val($input, 'application_id', ''))));
$phone = trim(val($input, 'phone', val($input, 'mobile', '')));
$email = trim(val($input, 'email', ''));
$query = trim(val($input, 'query', val($input, 'q', val($input, 'search', val($input, 'term', '')))));

if (empty($query)) {
    $query = !empty($appId) ? $appId : (!empty($phone) ? $phone : $email);
}

if (empty($query) && empty($appId) && empty($phone) && empty($email)) {
    http_response_code(400);
    echo json_encode(array(
        'status' => 'error',
        'message' => 'Please enter your Application ID or Contact / Mobile Number to check status.'
    ));
    exit;
}

$pdo = getDbConnection();

if (!$pdo) {
    http_response_code(500);
    echo json_encode(array(
        'status' => 'error',
        'message' => 'Database connection unavailable. Please verify .env settings or check api/db_test.php.'
    ));
    exit;
}

try {
    // Enable emulated prepares to allow repeating named placeholders in PHP 5.6 & 7.x
    $pdo->setAttribute(PDO::ATTR_EMULATE_PREPARES, true);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // 1. Prepare search tokens
    $appClean = trim($appId);
    $appSuffix = '';
    if (preg_match('/(\d{4,})$/', $appClean, $m)) {
        $appSuffix = $m[1];
    }

    $rawPhone = trim($phone);
    $phoneDigits = preg_replace('/\D/', '', !empty($rawPhone) ? $rawPhone : $query);
    $phoneLast10 = strlen($phoneDigits) >= 10 ? substr($phoneDigits, -10) : $phoneDigits;
    $phoneLast7  = strlen($phoneDigits) >= 7  ? substr($phoneDigits, -7)  : $phoneDigits;

    $hasApp = (!empty($appClean)) ? 1 : 0;
    $hasPhone = (!empty($phoneLast7) && strlen($phoneLast7) >= 4) ? 1 : 0;
    $hasQuery = (!empty($query)) ? 1 : 0;
    $hasBoth = ($hasApp && $hasPhone) ? 1 : 0;

    $cleanQuery = trim($query);
    $queryDigits = preg_replace('/\D/', '', $cleanQuery);
    $queryLast10 = strlen($queryDigits) >= 10 ? substr($queryDigits, -10) : $queryDigits;

    // Expression that normalizes phone numbers in database by stripping spaces, hyphens, and plus signs
    $phoneNormalizeExpr = "RIGHT(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(phone, ' ', ''), '-', ''), '+', ''), '(', ''), ')', ''), 10)";

    $stmt = $pdo->prepare("
        SELECT 
            id,
            registration_id,
            title,
            full_name,
            designation,
            gender,
            organization,
            discipline,
            address,
            pincode,
            phone,
            email,
            food_preference,
            require_accommodation,
            is_presenting_paper,
            registration_category,
            fee_amount,
            currency,
            payment_mode,
            payment_status,
            payment_order_id,
            razorpay_payment_id,
            transaction_ref,
            created_at,
            updated_at,
            UNIX_TIMESTAMP(updated_at) AS updated_ts
        FROM registrations
        WHERE 
            -- A. Match by Application ID (exact, lower, wildcard, or numeric suffix)
            (:has_app = 1 AND (
                registration_id = :app_raw
                OR LOWER(registration_id) = LOWER(:app_raw)
                OR registration_id LIKE :app_like
                OR (:has_app_suffix = 1 AND registration_id LIKE :app_suffix_like)
                OR email = :app_raw
            ))
            -- B. Match by Phone Number (normalized 10-digits, 7-digits, or raw)
            OR (:has_phone = 1 AND (
                phone = :phone_raw
                OR phone LIKE :phone_like
                OR ({$phoneNormalizeExpr} = :phone_last10)
                OR ({$phoneNormalizeExpr} LIKE :phone_last7_like)
                OR email = :phone_raw
            ))
            -- C. General fallback query
            OR (:has_query = 1 AND (
                registration_id = :q_raw
                OR LOWER(registration_id) = LOWER(:q_raw)
                OR email = :q_raw
                OR email LIKE :q_like
                OR registration_id LIKE :q_like
                OR ({$phoneNormalizeExpr} = :q_last10)
            ))
        ORDER BY 
            -- Prioritize records matching both Application ID and Phone Number
            (CASE WHEN 
                :has_both = 1 
                AND (registration_id = :app_raw OR registration_id LIKE :app_like OR (:has_app_suffix = 1 AND registration_id LIKE :app_suffix_like))
                AND ({$phoneNormalizeExpr} = :phone_last10)
            THEN 1 ELSE 0 END) DESC,
            -- Prioritize confirmed / success payments
            (CASE WHEN LOWER(payment_status) IN ('success', 'paid', 'captured', 'confirmed') THEN 1 ELSE 0 END) DESC,
            id DESC
        LIMIT 5
    ");

    $stmt->execute(array(
        ':has_app'           => $hasApp,
        ':app_raw'           => $appClean,
        ':app_like'          => '%' . $appClean . '%',
        ':has_app_suffix'    => (!empty($appSuffix) ? 1 : 0),
        ':app_suffix_like'   => (!empty($appSuffix) ? ('%' . $appSuffix) : '%---%'),

        ':has_phone'         => $hasPhone,
        ':phone_raw'         => $rawPhone,
        ':phone_like'        => '%' . $phoneLast7 . '%',
        ':phone_last10'      => $phoneLast10,
        ':phone_last7_like'  => '%' . $phoneLast7,

        ':has_query'         => $hasQuery,
        ':q_raw'             => $cleanQuery,
        ':q_like'            => '%' . $cleanQuery . '%',
        ':q_last10'          => $queryLast10,

        ':has_both'          => $hasBoth
    ));

    $records = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if (empty($records)) {
        $display = !empty($appClean) && !empty($rawPhone) ? ($appClean . ' / ' . $rawPhone) : (!empty($appClean) ? $appClean : (!empty($rawPhone) ? $rawPhone : $cleanQuery));
        echo json_encode(array(
            'status' => 'success',
            'found' => false,
            'count' => 0,
            'message' => 'No registration records found matching "' . htmlspecialchars($display) . '".'
        ));
        exit;
    }

    // Priority Rule:
    // 1. If payment is success/confirmed: DO NOT show pending status! Show only the confirmed record.
    // 2. If payment is pending: show that pending status only (latest active attempt).
    $confirmedRecords = array();
    $pendingRecords   = array();
    $failedRecords    = array();

    foreach ($records as $r) {
        $st = strtolower(isset($r['payment_status']) ? $r['payment_status'] : '');
        if (in_array($st, array('success', 'captured', 'paid', 'confirmed'))) {
            $confirmedRecords[] = $r;
        } elseif ($st === 'failed') {
            $failedRecords[] = $r;
        } else {
            $pendingRecords[] = $r;
        }
    }

    if (!empty($confirmedRecords)) {
        // Confirmed payment exists: hide all pending and failed attempts
        $finalRecords = $confirmedRecords;
    } elseif (!empty($pendingRecords)) {
        // Only pending payments exist: show only the most recent pending record
        $finalRecords = array($pendingRecords[0]);
    } else {
        $finalRecords = !empty($failedRecords) ? array($failedRecords[0]) : array($records[0]);
    }

    // Check cool-off on the active record
    $activeRec = $finalRecords[0];
    $cooloffActive = false;
    $remainingSeconds = 0;

    $activeStatus = strtolower(isset($activeRec['payment_status']) ? $activeRec['payment_status'] : '');
    $activeUpdatedTs = isset($activeRec['updated_ts']) ? (int)$activeRec['updated_ts'] : 0;

    if ($activeStatus === 'failed' && $activeUpdatedTs > 0) {
        $elapsed = time() - $activeUpdatedTs;
        if ($elapsed < 900) { // 15 minutes = 900 seconds
            $cooloffActive = true;
            $remainingSeconds = 900 - $elapsed;
        }
    }

    $hasSuccessful = !empty($confirmedRecords);
    $hasPending    = empty($confirmedRecords) && !empty($pendingRecords);

    echo json_encode(array(
        'status' => 'success',
        'found' => true,
        'already_registered' => ($hasSuccessful || $hasPending),
        'is_confirmed' => $hasSuccessful,
        'count' => count($finalRecords),
        'records' => $finalRecords,
        'cooloff' => array(
            'active' => $cooloffActive,
            'remaining_seconds' => $remainingSeconds
        )
    ));

} catch (Exception $e) {
    error_log("Status check query error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(array(
        'status' => 'error',
        'message' => 'Database error while querying registration status: ' . $e->getMessage()
    ));
}
?>
