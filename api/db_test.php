<?php
/**
 * DYUTI 2027 Database Connection Diagnostic Tool (api/db_test.php)
 * Accessible via browser to verify MySQL connection, inspect table records, and test search queries.
 * Strictly compatible with PHP 5.6, 7.x, and 8.x
 */

header('Content-Type: text/html; charset=utf-8');
header('Access-Control-Allow-Origin: *');

require_once __DIR__ . '/db_config.php';

$pdo = getDbConnection();
$dbErr = isset($GLOBALS['db_connection_error']) ? $GLOBALS['db_connection_error'] : null;

$searchTerm = isset($_GET['q']) ? trim($_GET['q']) : '';

?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>DYUTI 2027 &mdash; Database Diagnostic Test</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #071A33; color: #f8fafc; padding: 24px; margin: 0; }
    .card { background: #0d2342; border: 1px solid #1e3a61; border-radius: 16px; padding: 24px; max-width: 900px; margin: 0 auto; box-shadow: 0 10px 25px rgba(0,0,0,0.5); }
    h1 { color: #facc15; font-size: 24px; margin-top: 0; }
    .badge { display: inline-block; padding: 6px 14px; border-radius: 9999px; font-weight: bold; font-size: 13px; text-transform: uppercase; }
    .badge-ok { background: #059669; color: white; }
    .badge-fail { background: #dc2626; color: white; }
    table { width: 100%; border-collapse: collapse; margin-top: 16px; font-size: 13px; }
    th, td { text-align: left; padding: 10px 12px; border-bottom: 1px solid #1e3a61; }
    th { background: #071A33; color: #94a3b8; }
    .code { font-family: monospace; background: #051326; padding: 2px 6px; border-radius: 4px; color: #38bdf8; }
    .notice { background: rgba(234, 179, 8, 0.15); border-left: 4px solid #eab308; padding: 12px 16px; border-radius: 6px; margin: 16px 0; font-size: 14px; }
    .search-box { display: flex; gap: 8px; margin: 20px 0; }
    .search-input { flex: 1; padding: 10px 14px; background: #051326; border: 1px solid #1e3a61; border-radius: 8px; color: #f8fafc; font-size: 14px; }
    .search-btn { padding: 10px 20px; background: #2563eb; color: #fff; border: none; border-radius: 8px; font-weight: bold; cursor: pointer; }
    .search-btn:hover { background: #1d4ed8; }
    .clear-link { color: #94a3b8; font-size: 13px; align-self: center; text-decoration: none; }
    .clear-link:hover { color: #f8fafc; text-decoration: underline; }
  </style>
</head>
<body>
  <div class="card">
    <h1>DYUTI 2027 Database Health Check</h1>
    
    <div style="margin-bottom: 20px;">
      Status: 
      <?php if ($pdo): ?>
        <span class="badge badge-ok">Connected to MySQL Database</span>
      <?php else: ?>
        <span class="badge badge-fail">Database Connection Failed</span>
      <?php endif; ?>
    </div>

    <table>
      <tr>
        <th>Configuration Parameter</th>
        <th>Configured Value</th>
      </tr>
      <tr>
        <td>PHP Version</td>
        <td><span class="code"><?php echo phpversion(); ?></span></td>
      </tr>
      <tr>
        <td>.env File Status</td>
        <td>
          <?php if (!empty($GLOBALS['db_env_file_loaded'])): ?>
            <span style="color: #4ade80; font-weight: bold;">Loaded from <?php echo htmlspecialchars($GLOBALS['db_env_file_loaded']); ?></span>
          <?php else: ?>
            <span style="color: #f87171; font-weight: bold;">Not Found (Please upload .env)</span>
          <?php endif; ?>
        </td>
      </tr>
      <tr>
        <td>Database Host</td>
        <td><span class="code"><?php echo htmlspecialchars($dbHost); ?>:<?php echo htmlspecialchars($dbPort); ?></span></td>
      </tr>
      <tr>
        <td>Database Name</td>
        <td><span class="code"><?php echo htmlspecialchars($dbName); ?></span></td>
      </tr>
      <tr>
        <td>Database User</td>
        <td><span class="code"><?php echo htmlspecialchars($dbUser); ?></span></td>
      </tr>
      <tr>
        <td>Connection Result</td>
        <td>
          <?php if ($pdo): ?>
            <strong style="color: #4ade80;">Success (PDO connection active)</strong>
          <?php else: ?>
            <strong style="color: #f87171;">Error: <?php echo htmlspecialchars($dbErr ? $dbErr : 'Unknown error'); ?></strong>
          <?php endif; ?>
        </td>
      </tr>
    </table>

    <?php if ($pdo): ?>
      <?php
        try {
          $countStmt = $pdo->query("SELECT COUNT(*) AS total FROM registrations");
          $total = $countStmt->fetchColumn();

          if (!empty($searchTerm)) {
            $pdo->setAttribute(PDO::ATTR_EMULATE_PREPARES, true);
            $digits = preg_replace('/\D/', '', $searchTerm);
            $last7 = strlen($digits) >= 7 ? substr($digits, -7) : $digits;

            $rowsStmt = $pdo->prepare("
              SELECT registration_id, full_name, phone, email, fee_amount, payment_status, created_at 
              FROM registrations 
              WHERE registration_id LIKE :term 
                 OR phone LIKE :term 
                 OR phone LIKE :last7
                 OR email LIKE :term 
                 OR full_name LIKE :term
              ORDER BY id DESC 
              LIMIT 50
            ");
            $rowsStmt->execute(array(
              ':term'  => '%' . $searchTerm . '%',
              ':last7' => '%' . $last7 . '%'
            ));
          } else {
            $rowsStmt = $pdo->query("SELECT registration_id, full_name, phone, email, fee_amount, payment_status, created_at FROM registrations ORDER BY id DESC LIMIT 50");
          }
          $rows = $rowsStmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (Exception $e) {
          $tableErr = $e->getMessage();
        }
      ?>

      <h2 style="color: #e2e8f0; font-size: 18px; margin-top: 32px; margin-bottom: 8px;">Table `registrations` Records</h2>
      <?php if (isset($tableErr)): ?>
        <div class="notice" style="border-left-color: #ef4444; background: rgba(239, 68, 68, 0.15); color: #fca5a5;">
          Table Error: <?php echo htmlspecialchars($tableErr); ?>
        </div>
      <?php else: ?>
        <p style="font-size: 14px; color: #94a3b8; margin: 4px 0 16px 0;">
          Total registered delegates in database: <strong style="color: #f8fafc; font-size: 16px;"><?php echo $total; ?></strong>
        </p>

        <form method="GET" class="search-box">
          <input type="text" name="q" value="<?php echo htmlspecialchars($searchTerm); ?>" placeholder="Search by Application ID, Phone, Name, or Email..." class="search-input" />
          <button type="submit" class="search-btn">Search Database</button>
          <?php if (!empty($searchTerm)): ?>
            <a href="db_test.php" class="clear-link">Show All</a>
          <?php endif; ?>
        </form>

        <?php if (!empty($searchTerm)): ?>
          <p style="font-size: 13px; color: #38bdf8;">Showing search results for: <strong><?php echo htmlspecialchars($searchTerm); ?></strong> (<?php echo count($rows); ?> matches)</p>
        <?php endif; ?>

        <?php if (!empty($rows)): ?>
          <table>
            <thead>
              <tr>
                <th>Registration ID</th>
                <th>Delegate Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Fee</th>
                <th>Status</th>
                <th>Created</th>
              </tr>
            </thead>
            <tbody>
              <?php foreach ($rows as $row): ?>
                <tr>
                  <td><span class="code"><?php echo htmlspecialchars($row['registration_id']); ?></span></td>
                  <td><?php echo htmlspecialchars($row['full_name']); ?></td>
                  <td><?php echo htmlspecialchars($row['phone']); ?></td>
                  <td><?php echo htmlspecialchars($row['email']); ?></td>
                  <td>₹ <?php echo htmlspecialchars($row['fee_amount']); ?></td>
                  <td>
                    <?php 
                      $ps = strtolower($row['payment_status']);
                      if (in_array($ps, array('success', 'confirmed', 'paid', 'captured'))): 
                    ?>
                      <span style="color: #4ade80; font-weight: bold;">Confirmed</span>
                    <?php else: ?>
                      <span style="color: #facc15;"><?php echo htmlspecialchars($row['payment_status']); ?></span>
                    <?php endif; ?>
                  </td>
                  <td style="color: #94a3b8; font-size: 11px;"><?php echo htmlspecialchars($row['created_at']); ?></td>
                </tr>
              <?php endforeach; ?>
            </tbody>
          </table>
        <?php else: ?>
          <div class="notice">
            <?php if (!empty($searchTerm)): ?>
              No delegate records found matching "<strong><?php echo htmlspecialchars($searchTerm); ?></strong>".
            <?php else: ?>
              The <span class="code">registrations</span> table is currently empty (0 records).
            <?php endif; ?>
          </div>
        <?php endif; ?>
      <?php endif; ?>

    <?php else: ?>
      <div class="notice" style="border-left-color: #ef4444; background: rgba(239, 68, 68, 0.15); color: #fca5a5;">
        <strong>How to fix:</strong> Please ensure your cPanel MySQL Database (<span class="code"><?php echo htmlspecialchars($dbName); ?></span>) and User (<span class="code"><?php echo htmlspecialchars($dbUser); ?></span>) are created in cPanel &rarr; <em>MySQL Databases</em>, and user has <strong>ALL PRIVILEGES</strong> granted to the database.
      </div>
    <?php endif; ?>
  </div>
</body>
</html>
