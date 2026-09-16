<?php
/**
 * DYUTI 2027 Database Connection Helper (PDO)
 * Strictly loads credentials from the .env configuration file
 */

// Safe helper to read environment variable from getenv(), $_ENV, or $_SERVER
function getEnvVar($key, $default = '') {
    $val = getenv($key);
    if ($val !== false && $val !== '') return $val;
    if (isset($_ENV[$key]) && $_ENV[$key] !== '') return $_ENV[$key];
    if (isset($_SERVER[$key]) && $_SERVER[$key] !== '') return $_SERVER[$key];
    return $default;
}

// Automatically discover and load .env from parent directories or api directory
$envPaths = [
    __DIR__ . '/../../../.env', // Subfolder hosting (above public_html when hosted at /rcss/api/)
    __DIR__ . '/../../.env',    // cPanel recommended: one directory above public_html
    __DIR__ . '/../.env',       // Root directory (public_html/.env)
    __DIR__ . '/.env'           // api directory
];

$loadedEnvPath = null;
foreach ($envPaths as $envPath) {
    if (file_exists($envPath)) {
        $lines = @file($envPath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        if (is_array($lines)) {
            foreach ($lines as $line) {
                $line = trim($line);
                if ($line === '' || strpos($line, '#') === 0 || strpos($line, '=') === false) continue;
                list($key, $val) = explode('=', $line, 2);
                $key = trim($key);
                $val = trim($val, " \t\n\r\0\x0B\"'");
                putenv("{$key}={$val}");
                $_ENV[$key] = $val;
                $_SERVER[$key] = $val;
            }
            $loadedEnvPath = $envPath;
            break;
        }
    }
}

// Read database coordinates exclusively from .env
$dbHost = getEnvVar('DB_HOST', 'localhost');
if ($dbHost === 'dyuti.in' || $dbHost === 'www.dyuti.in') {
    $dbHost = 'localhost';
}
$dbPort = getEnvVar('DB_PORT', '3306');
$dbName = getEnvVar('DB_NAME', '');
$dbUser = getEnvVar('DB_USER', '');
$dbPass = getEnvVar('DB_PASS', '');

$GLOBALS['db_connection_error'] = null;
$GLOBALS['db_env_file_loaded'] = $loadedEnvPath;

function getDbConnection() {
    global $dbHost, $dbPort, $dbName, $dbUser, $dbPass;
    
    if (empty($dbName) || empty($dbUser)) {
        $GLOBALS['db_connection_error'] = 'Database credentials missing: DB_NAME or DB_USER not found in .env file.';
        error_log($GLOBALS['db_connection_error']);
        return null;
    }

    $dsn = "mysql:host={$dbHost};port={$dbPort};dbname={$dbName};charset=utf8mb4";
    $options = [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
        PDO::ATTR_TIMEOUT            => 5
    ];
    
    try {
        $pdo = new PDO($dsn, $dbUser, $dbPass, $options);
        
        // Ensure table exists (self-healing if schema wasn't manually imported into phpMyAdmin)
        static $checkedSchema = false;
        if (!$checkedSchema) {
            $checkedSchema = true;
            try {
                $pdo->exec("
                    CREATE TABLE IF NOT EXISTS `registrations` (
                        `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
                        `registration_id` VARCHAR(64) NOT NULL UNIQUE,
                        `title` VARCHAR(20) NOT NULL DEFAULT 'Dr.',
                        `full_name` VARCHAR(255) NOT NULL,
                        `designation` VARCHAR(255) NOT NULL,
                        `gender` VARCHAR(32) NOT NULL,
                        `organization` VARCHAR(255) NOT NULL,
                        `discipline` VARCHAR(255) NOT NULL,
                        `address` TEXT NOT NULL,
                        `pincode` VARCHAR(20) NOT NULL,
                        `phone` VARCHAR(32) NOT NULL,
                        `email` VARCHAR(255) NOT NULL,
                        `food_preference` VARCHAR(64) NOT NULL DEFAULT 'veg',
                        `food_details` TEXT NULL DEFAULT NULL,
                        `require_accommodation` ENUM('yes', 'no') NOT NULL DEFAULT 'no',
                        `accommodation_notes` TEXT NULL DEFAULT NULL,
                        `is_presenting_paper` ENUM('yes', 'no') NOT NULL DEFAULT 'no',
                        `registration_category` VARCHAR(64) NOT NULL,
                        `fee_amount` DECIMAL(10, 2) NOT NULL DEFAULT 750.00,
                        `currency` VARCHAR(10) NOT NULL DEFAULT 'INR',
                        `payment_mode` ENUM('online', 'bank_transfer') NOT NULL DEFAULT 'online',
                        `payment_status` ENUM('pending', 'success', 'failed', 'refunded', 'cancelled') NOT NULL DEFAULT 'pending',
                        `payment_order_id` VARCHAR(128) NULL DEFAULT NULL,
                        `razorpay_payment_id` VARCHAR(128) NULL DEFAULT NULL,
                        `razorpay_order_id` VARCHAR(128) NULL DEFAULT NULL,
                        `razorpay_signature` VARCHAR(255) NULL DEFAULT NULL,
                        `transaction_ref` VARCHAR(128) NULL DEFAULT NULL,
                        `ip_address` VARCHAR(64) NULL DEFAULT NULL,
                        `user_agent` TEXT NULL DEFAULT NULL,
                        `gateway_response` JSON NULL DEFAULT NULL,
                        `email_sent` TINYINT(1) NOT NULL DEFAULT 0,
                        `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                        `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                        INDEX `idx_email` (`email`),
                        INDEX `idx_phone` (`phone`),
                        INDEX `idx_regid` (`registration_id`),
                        INDEX `idx_payment_status` (`payment_status`)
                    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
                ");
            } catch (Exception $schemaEx) {
                // Table might already exist or user lacks CREATE TABLE privilege, continue safely
            }
        }
        
        return $pdo;
    } catch (PDOException $e) {
        $GLOBALS['db_connection_error'] = $e->getMessage();
        error_log("Database connection failed: " . $e->getMessage());
        return null;
    }
}
?>
