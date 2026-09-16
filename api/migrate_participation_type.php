<?php
/**
 * DYUTI 2027 — Database Migration: Add Purpose of Participation Column
 *
 * Adds:
 *   - participation_type VARCHAR(64) NOT NULL DEFAULT 'regular' COMMENT 'regular, idea_pitch, stall'
 *   - INDEX idx_participation_type (participation_type)
 *
 * Compatible with PHP 5.6, 7.x, 8.x and MySQL 5.7+ / 8.0+ / MariaDB
 */

require_once __DIR__ . '/db_config.php';

$pdo = getDbConnection();
if (!$pdo) {
    http_response_code(500);
    header('Content-Type: application/json; charset=UTF-8');
    echo json_encode([
        'status' => 'error',
        'message' => 'Could not connect to database. Check .env database settings.'
    ]);
    exit;
}

$results = [];

// 1. Check & Add participation_type column
try {
    $check = $pdo->query("SHOW COLUMNS FROM `registrations` LIKE 'participation_type'");
    if ($check->rowCount() === 0) {
        $pdo->exec("ALTER TABLE `registrations` ADD COLUMN `participation_type` VARCHAR(64) NOT NULL DEFAULT 'regular' COMMENT 'regular, idea_pitch, stall' AFTER `is_presenting_paper`");
        $results[] = ['status' => '✅ SUCCESS', 'msg' => "Added column: registrations.participation_type (VARCHAR(64) DEFAULT 'regular')"];
    } else {
        $results[] = ['status' => 'ℹ️ SKIPPED', 'msg' => "Column registrations.participation_type already exists."];
    }
} catch (PDOException $e) {
    $results[] = ['status' => '❌ ERROR', 'msg' => "Adding participation_type failed: " . $e->getMessage()];
}

// 2. Check & Add index on participation_type
try {
    $idxCheck = $pdo->query("SHOW INDEX FROM `registrations` WHERE Key_name = 'idx_participation_type'");
    if ($idxCheck->rowCount() === 0) {
        $pdo->exec("ALTER TABLE `registrations` ADD INDEX `idx_participation_type` (`participation_type`)");
        $results[] = ['status' => '✅ SUCCESS', 'msg' => "Added index: idx_participation_type on registrations.participation_type"];
    } else {
        $results[] = ['status' => 'ℹ️ SKIPPED', 'msg' => "Index idx_participation_type already exists."];
    }
} catch (PDOException $e) {
    $results[] = ['status' => '⚠️ WARN', 'msg' => "Index creation failed (non-fatal): " . $e->getMessage()];
}

// Output HTML or JSON
$isJson = isset($_SERVER['HTTP_ACCEPT']) && strpos($_SERVER['HTTP_ACCEPT'], 'application/json') !== false;

if ($isJson) {
    header('Content-Type: application/json; charset=UTF-8');
    echo json_encode([
        'status' => 'success',
        'results' => $results
    ]);
    exit;
}

header('Content-Type: text/html; charset=UTF-8');
echo '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>DYUTI 2027 Migration — Participation Type</title>';
echo '<style>body{font-family:monospace;background:#0f172a;color:#e2e8f0;padding:32px;} .box{background:#1e293b;border-radius:12px;padding:24px;max-width:720px;margin:0 auto;box-shadow:0 10px 25px rgba(0,0,0,0.5);} h2{color:#d4af37;margin-top:0;} .row{padding:12px 0;border-bottom:1px solid #334155;line-height:1.5;} .ok{color:#4ade80;font-weight:bold;} .skip{color:#60a5fa;} .err{color:#f87171;} .warn{color:#fb923c;} .footer{color:#94a3b8;font-size:12px;margin-top:20px;line-height:1.6;}</style>';
echo '</head><body><div class="box"><h2>DYUTI 2027 — DB Migration: Participation Type Column</h2>';
foreach ($results as $r) {
    $cls = strpos($r['status'], 'SUCCESS') !== false ? 'ok' : (strpos($r['status'], 'SKIP') !== false ? 'skip' : (strpos($r['status'], 'WARN') !== false ? 'warn' : 'err'));
    echo "<div class='row'><span class='{$cls}'>{$r['status']}</span> — {$r['msg']}</div>";
}
echo '<div class="footer">Migration successfully completed.<br>The <code>registrations</code> table can now track Participation Purpose: Regular Participant, Idea Pitch Participant, and Stall / Exhibition Participant.</div>';
echo '</div></body></html>';

