<?php
/**
 * DYUTI 2027 Database Column Migration Script
 * Drops `paper_title`, `cmt_paper_id`, and `paper_theme` from the `registrations` table.
 * 100% PHP 5.6 Compatible
 */

header('Content-Type: application/json; charset=utf-8');

require_once __DIR__ . '/db_config.php';

try {
    $pdo = getDbConnection();
    
    // Find current columns in registrations table
    $stmt = $pdo->prepare("
        SELECT COLUMN_NAME 
        FROM information_schema.COLUMNS 
        WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'registrations'
    ");
    $stmt->execute();
    $existingCols = $stmt->fetchAll(PDO::FETCH_COLUMN);

    if (empty($existingCols)) {
        echo json_encode(array(
            'status' => 'notice',
            'message' => 'Table `registrations` not found in current database or not yet initialized.'
        ));
        exit;
    }

    $targets = array('paper_title', 'cmt_paper_id', 'paper_theme');
    $dropped = array();
    $alreadyAbsent = array();

    foreach ($targets as $col) {
        if (in_array($col, $existingCols)) {
            $pdo->exec("ALTER TABLE `registrations` DROP COLUMN `{$col}`");
            $dropped[] = $col;
        } else {
            $alreadyAbsent[] = $col;
        }
    }

    echo json_encode(array(
        'status' => 'success',
        'dropped_columns' => $dropped,
        'already_absent' => $alreadyAbsent,
        'message' => 'Database migration completed. Paper title, theme, and CMT ID columns are removed.'
    ));
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(array(
        'status' => 'error',
        'message' => $e->getMessage()
    ));
}
