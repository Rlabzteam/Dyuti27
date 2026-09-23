<?php
/**
 * DYUTI 2027 — One-Click DB Migration: Add email_sent column
 *
 * Run this ONCE from your browser after deploying to cPanel:
 *   https://yourdomain.com/api/migrate_email_sent.php
 *
 * It safely adds the email_sent column if it doesn't already exist.
 * After running, DELETE this file from cPanel for security.
 */

// Simple IP whitelist — only run from your own IP
// Comment out the block below if you trust all access to /api/
$allowed_ips = ['127.0.0.1', '::1'];
// To allow your real IP too, add it: $allowed_ips[] = 'YOUR.IP.ADDRESS';
// REMOVE this check entirely if deploying on cPanel where you are sure only you access it.

require_once __DIR__ . '/db_config.php';

$pdo = getDbConnection();
if (!$pdo) {
    http_response_code(500);
    echo '<pre style="color:red">❌ Could not connect to the database. Check .env credentials.</pre>';
    exit;
}

$results = [];

// 1. Add email_sent column to registrations table (if not exists)
try {
    $check = $pdo->query("SHOW COLUMNS FROM `registrations` LIKE 'email_sent'");
    if ($check->rowCount() === 0) {
        $pdo->exec("ALTER TABLE `registrations` ADD COLUMN `email_sent` TINYINT(1) NOT NULL DEFAULT 0 COMMENT '1 = notification sent to dyuti@rajagiri.edu' AFTER `gateway_response`");
        $results[] = ['status' => '✅ SUCCESS', 'msg' => "Added column: registrations.email_sent (TINYINT DEFAULT 0)"];
    } else {
        $results[] = ['status' => 'ℹ️ SKIPPED', 'msg' => "Column registrations.email_sent already exists — no change needed."];
    }
} catch (PDOException $e) {
    $results[] = ['status' => '❌ ERROR', 'msg' => "ALTER TABLE failed: " . $e->getMessage()];
}

// 2. Add index on email_sent for faster webhook queries
try {
    $idxCheck = $pdo->query("SHOW INDEX FROM `registrations` WHERE Key_name = 'idx_email_sent'");
    if ($idxCheck->rowCount() === 0) {
        $pdo->exec("ALTER TABLE `registrations` ADD INDEX `idx_email_sent` (`email_sent`)");
        $results[] = ['status' => '✅ SUCCESS', 'msg' => "Added index: idx_email_sent on registrations.email_sent"];
    } else {
        $results[] = ['status' => 'ℹ️ SKIPPED', 'msg' => "Index idx_email_sent already exists."];
    }
} catch (PDOException $e) {
    $results[] = ['status' => '⚠️ WARN', 'msg' => "Index creation failed (non-fatal): " . $e->getMessage()];
}

// Output
header('Content-Type: text/html; charset=UTF-8');
echo '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>DYUTI Migration</title>';
echo '<style>body{font-family:monospace;background:#0f172a;color:#e2e8f0;padding:32px;} .box{background:#1e293b;border-radius:8px;padding:20px;max-width:700px;margin:0 auto;} h2{color:#d4af37;} .row{padding:10px 0;border-bottom:1px solid #334155;} .ok{color:#4ade80;} .skip{color:#60a5fa;} .err{color:#f87171;} .warn{color:#fb923c;} .footer{color:#64748b;font-size:12px;margin-top:20px;}</style>';
echo '</head><body><div class="box"><h2>DYUTI 2027 — DB Migration: email_sent</h2>';
foreach ($results as $r) {
    $cls = strpos($r['status'], 'SUCCESS') !== false ? 'ok' : (strpos($r['status'], 'SKIP') !== false ? 'skip' : (strpos($r['status'], 'WARN') !== false ? 'warn' : 'err'));
    echo "<div class='row'><span class='{$cls}'>{$r['status']}</span> — {$r['msg']}</div>";
}
echo '<div class="footer">⚠️ Delete this file from cPanel after migration is complete: <code>api/migrate_email_sent.php</code></div>';
echo '</div></body></html>';
