<?php
/**
 * DYUTI 2027 - Secure Administration Portal (admin/index.php)
 * Protected delegate viewer with role-based authentication, brute-force throttling, and Excel export.
 * Strictly 100% compatible with PHP 5.6, 7.x, and 8.x
 */

// Suppress raw error leakage in production
ini_set('display_errors', 0);
error_reporting(E_ALL & ~E_NOTICE & ~E_DEPRECATED);

// Security Headers
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');
header('X-XSS-Protection: 1; mode=block');
header('Referrer-Policy: strict-origin-when-cross-origin');
header('Cache-Control: no-cache, no-store, must-revalidate');
header('Pragma: no-cache');
header('Expires: 0');

// Secure Session Initialization
$isHttps = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') || (isset($_SERVER['SERVER_PORT']) && $_SERVER['SERVER_PORT'] == 443);
if (session_status() === PHP_SESSION_NONE) {
    if (PHP_VERSION_ID >= 70300) {
        session_start(array(
            'cookie_lifetime' => 0,
            'cookie_path'     => '/',
            'cookie_domain'   => '',
            'cookie_secure'   => $isHttps,
            'cookie_httponly' => true,
            'cookie_samesite' => 'Strict'
        ));
    } else {
        ini_set('session.cookie_httponly', 1);
        if ($isHttps) ini_set('session.cookie_secure', 1);
        session_start();
    }
}

// Generate or retain CSRF token
if (empty($_SESSION['dyuti_admin_csrf'])) {
    if (function_exists('random_bytes')) {
        $_SESSION['dyuti_admin_csrf'] = bin2hex(random_bytes(32));
    } else {
        $_SESSION['dyuti_admin_csrf'] = sha1(uniqid(mt_rand(), true));
    }
}
$csrfToken = $_SESSION['dyuti_admin_csrf'];

// Load database configuration
require_once __DIR__ . '/../api/db_config.php';

// Safe getter helper
function adminVal($arr, $key, $fallback = '') {
    return (is_array($arr) && isset($arr[$key]) && $arr[$key] !== '') ? $arr[$key] : $fallback;
}

// Client IP detection (safe with proxy headers)
function getClientIp() {
    $ip = isset($_SERVER['REMOTE_ADDR']) ? $_SERVER['REMOTE_ADDR'] : '0.0.0.0';
    if (!empty($_SERVER['HTTP_CF_CONNECTING_IP'])) {
        $ip = $_SERVER['HTTP_CF_CONNECTING_IP'];
    } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        $parts = explode(',', $_SERVER['HTTP_X_FORWARDED_FOR']);
        $ip = trim($parts[0]);
    }
    return preg_replace('/[^0-9a-fA-F:\.]/', '', $ip);
}
$clientIp = getClientIp();

// Rate limiter / brute force prevention store (using system temp directory)
$rateLimitFile = sys_get_temp_dir() . '/dyuti_admin_ratelimit_' . md5($clientIp) . '.json';
function checkRateLimit($file) {
    if (!file_exists($file)) return array('allowed' => true, 'remaining' => 0);
    $data = @json_decode(@file_get_contents($file), true);
    if (!is_array($data) || empty($data['attempts'])) return array('allowed' => true, 'remaining' => 0);
    
    // Purge attempts older than 15 minutes (900 seconds)
    $now = time();
    $validAttempts = array();
    foreach ($data['attempts'] as $ts) {
        if (($now - $ts) < 900) {
            $validAttempts[] = $ts;
        }
    }
    
    if (count($validAttempts) >= 5) {
        $oldest = min($validAttempts);
        $lockRemaining = 900 - ($now - $oldest);
        return array('allowed' => false, 'remaining' => max(1, $lockRemaining));
    }
    return array('allowed' => true, 'remaining' => 0);
}

function recordFailedAttempt($file) {
    $data = file_exists($file) ? @json_decode(@file_get_contents($file), true) : array();
    if (!is_array($data)) $data = array();
    $attempts = isset($data['attempts']) && is_array($data['attempts']) ? $data['attempts'] : array();
    $attempts[] = time();
    // Keep only last 10
    if (count($attempts) > 10) $attempts = array_slice($attempts, -10);
    @file_put_contents($file, json_encode(array('attempts' => $attempts)), LOCK_EX);
}

function clearFailedAttempts($file) {
    if (file_exists($file)) @unlink($file);
}

// Configured credentials from .env
$configuredUser = function_exists('getEnvVar') ? getEnvVar('ADMIN_USERNAME', 'dyuti_admin') : 'dyuti_admin';
$configuredHash = function_exists('getEnvVar') ? getEnvVar('ADMIN_PASSWORD_HASH', '') : '';
$configuredPass = function_exists('getEnvVar') ? getEnvVar('ADMIN_PASSWORD', '') : '';
// Fallback secure master password if not configured in .env: Dyuti2027@Admin#Rajagiri
$fallbackDefaultPass = 'Dyuti2027@Admin#Rajagiri';

function verifyPassword($passwordInput, $confHash, $confPass, $defaultPass) {
    if (!empty($confHash)) {
        return password_verify($passwordInput, $confHash);
    }
    if (!empty($confPass)) {
        return hash_equals($confPass, $passwordInput);
    }
    return hash_equals($defaultPass, $passwordInput);
}

$loginError = '';

// Handle Logout
if (isset($_GET['action']) && $_GET['action'] === 'logout') {
    $_SESSION = array();
    if (ini_get("session.use_cookies")) {
        $params = session_get_cookie_params();
        setcookie(session_name(), '', time() - 42000,
            $params["path"], $params["domain"],
            $params["secure"], $params["httponly"]
        );
    }
    session_destroy();
    header("Location: index.php");
    exit;
}

// Handle Login POST
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'login') {
    $postCsrf = isset($_POST['csrf_token']) ? $_POST['csrf_token'] : '';
    if (!hash_equals($csrfToken, $postCsrf)) {
        $loginError = 'Security validation failed (CSRF mismatch). Please reload the page.';
    } else {
        $rateCheck = checkRateLimit($rateLimitFile);
        if (!$rateCheck['allowed']) {
            $mins = ceil($rateCheck['remaining'] / 60);
            $loginError = "Too many failed attempts. Access temporarily locked for security. Please try again in {$mins} minutes.";
        } else {
            $userEntered = isset($_POST['username']) ? trim($_POST['username']) : '';
            $passEntered = isset($_POST['password']) ? (string)$_POST['password'] : '';
            
            // Constant-time username comparison
            $userMatches = hash_equals($configuredUser, $userEntered);
            $passMatches = verifyPassword($passEntered, $configuredHash, $configuredPass, $fallbackDefaultPass);
            
            if ($userMatches && $passMatches) {
                clearFailedAttempts($rateLimitFile);
                session_regenerate_id(true);
                $_SESSION['dyuti_admin_logged_in'] = true;
                $_SESSION['dyuti_admin_user'] = $configuredUser;
                $_SESSION['dyuti_admin_login_time'] = time();
                $_SESSION['dyuti_admin_user_agent'] = isset($_SERVER['HTTP_USER_AGENT']) ? $_SERVER['HTTP_USER_AGENT'] : '';
                header("Location: index.php");
                exit;
            } else {
                recordFailedAttempt($rateLimitFile);
                $loginError = 'Invalid administrative username or password.';
            }
        }
    }
}

// Check session validity & timeout (30-minute idle expiration)
$isLoggedIn = false;
if (!empty($_SESSION['dyuti_admin_logged_in']) && $_SESSION['dyuti_admin_logged_in'] === true) {
    $now = time();
    $loginTime = isset($_SESSION['dyuti_admin_last_activity']) ? $_SESSION['dyuti_admin_last_activity'] : (isset($_SESSION['dyuti_admin_login_time']) ? $_SESSION['dyuti_admin_login_time'] : $now);
    if (($now - $loginTime) > 1800) { // 30 minutes idle timeout
        $_SESSION = array();
        session_destroy();
        $isLoggedIn = false;
        $loginError = 'Session expired due to inactivity. Please sign in again.';
    } else {
        // Verify User-Agent has not changed mid-session
        $sessionUa = isset($_SESSION['dyuti_admin_user_agent']) ? $_SESSION['dyuti_admin_user_agent'] : '';
        $currentUa = isset($_SERVER['HTTP_USER_AGENT']) ? $_SERVER['HTTP_USER_AGENT'] : '';
        if ($sessionUa !== '' && $sessionUa !== $currentUa) {
            $_SESSION = array();
            session_destroy();
            $isLoggedIn = false;
            $loginError = 'Session invalidated due to network environment change.';
        } else {
            $_SESSION['dyuti_admin_last_activity'] = $now;
            $isLoggedIn = true;
        }
    }
}

// ─────────────────────────────────────────────────────────────
// VIEW 1: LOGIN FORM (If unauthenticated)
// ─────────────────────────────────────────────────────────────
if (!$isLoggedIn) {
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Admin Portal • DYUTI 2027 Secretariat</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Cinzel:wght@600;700;800&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Plus Jakarta Sans', sans-serif; background: #071326; }
    .font-cinzel { font-family: 'Cinzel', serif; }
  </style>
</head>
<body class="min-h-screen flex items-center justify-center p-4 bg-slate-950 text-slate-100">
  <div class="w-full max-w-md bg-slate-900/90 border border-slate-800 rounded-3xl p-8 sm:p-10 shadow-2xl backdrop-blur-xl relative overflow-hidden">
    
    <!-- Top Gold Glow Accent -->
    <div class="absolute -top-24 -right-24 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
    <div class="absolute -bottom-24 -left-24 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

    <div class="text-center mb-8 relative">
      <div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 mb-4 shadow-inner">
        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
        </svg>
      </div>
      <div class="text-xs uppercase font-extrabold tracking-widest text-amber-400 mb-1">DYUTI 2027 Secretariat</div>
      <h1 class="font-cinzel text-2xl font-bold text-white tracking-tight">Administrative Portal</h1>
      <p class="text-xs text-slate-400 mt-1">Authorized Conference Organizers Only</p>
    </div>

    <?php if (!empty($loginError)): ?>
      <div class="mb-6 p-4 rounded-xl bg-rose-950/70 border border-rose-800/80 text-rose-200 text-sm flex items-start gap-3 animate-shake">
        <svg class="w-5 h-5 text-rose-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        <span><?php echo htmlspecialchars($loginError); ?></span>
      </div>
    <?php endif; ?>

    <form method="POST" action="index.php" class="space-y-5 relative">
      <input type="hidden" name="action" value="login">
      <input type="hidden" name="csrf_token" value="<?php echo htmlspecialchars($csrfToken); ?>">

      <div>
        <label for="username" class="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">Username</label>
        <div class="relative">
          <input type="text" id="username" name="username" required autofocus autocomplete="username"
                 placeholder="dyuti_admin"
                 class="w-full px-4 py-3 bg-slate-950 border border-slate-700/80 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all text-sm font-medium">
        </div>
      </div>

      <div>
        <label for="password" class="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">Password</label>
        <div class="relative">
          <input type="password" id="password" name="password" required autocomplete="current-password"
                 placeholder="••••••••••••"
                 class="w-full px-4 py-3 bg-slate-950 border border-slate-700/80 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all text-sm font-medium pr-10">
          <button type="button" id="btnTogglePass" class="absolute right-3 top-3 text-slate-400 hover:text-white transition-colors" title="Toggle visibility">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </button>
        </div>
      </div>

      <div class="pt-2">
        <button type="submit"
                class="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm tracking-wide transition-all shadow-lg shadow-amber-500/20 active:scale-[0.99] flex items-center justify-center gap-2">
          <span>Authenticate &amp; Access Dashboard</span>
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
          </svg>
        </button>
      </div>
    </form>

    <div class="mt-8 pt-6 border-t border-slate-800 text-center text-xs text-slate-500">
      <span>Protected by Dynamic Rate Limiter &amp; Session Guard</span>
      <div class="mt-1">Rajagiri College of Social Sciences (Autonomous)</div>
    </div>
  </div>

  <script>
    const btnToggle = document.getElementById('btnTogglePass');
    const inputPass = document.getElementById('password');
    if (btnToggle && inputPass) {
      btnToggle.addEventListener('click', () => {
        const isPass = inputPass.type === 'password';
        inputPass.type = isPass ? 'text' : 'password';
      });
    }
  </script>
</body>
</html>
<?php
exit;
}

// ─────────────────────────────────────────────────────────────
// VIEW 2: AUTHENTICATED ADMIN DASHBOARD
// ─────────────────────────────────────────────────────────────

$pdo = getDbConnection();
if (!$pdo) {
    die("Database connection failed. Please verify .env settings in cPanel.");
}

// Parse Search & Filters
$search = isset($_GET['search']) ? trim($_GET['search']) : '';
$statusFilter = isset($_GET['status']) ? trim($_GET['status']) : 'all';
$categoryFilter = isset($_GET['category']) ? trim($_GET['category']) : 'all';
$partFilter = isset($_GET['part_type']) ? trim($_GET['part_type']) : 'all';

$where = array();
$params = array();

if ($search !== '') {
    $where[] = "(
        registration_id LIKE :s_reg 
        OR full_name LIKE :s_name 
        OR email LIKE :s_email 
        OR phone LIKE :s_phone 
        OR organization LIKE :s_org 
        OR transaction_ref LIKE :s_txn
        OR payment_order_id LIKE :s_order
    )";
    $like = '%' . $search . '%';
    $params[':s_reg']   = $like;
    $params[':s_name']  = $like;
    $params[':s_email'] = $like;
    $params[':s_phone'] = $like;
    $params[':s_org']   = $like;
    $params[':s_txn']   = $like;
    $params[':s_order'] = $like;
}

if ($statusFilter !== 'all' && $statusFilter !== '') {
    if ($statusFilter === 'success') {
        $where[] = "LOWER(payment_status) IN ('success', 'paid', 'captured', 'confirmed')";
    } elseif ($statusFilter === 'pending') {
        $where[] = "LOWER(payment_status) = 'pending'";
    } elseif ($statusFilter === 'failed') {
        $where[] = "LOWER(payment_status) IN ('failed', 'failure', 'cancelled', 'error')";
    }
}

if ($categoryFilter !== 'all' && $categoryFilter !== '') {
    $where[] = "registration_category = :cat";
    $params[':cat'] = $categoryFilter;
}

if ($partFilter !== 'all' && $partFilter !== '') {
    $where[] = "participation_type = :part";
    $params[':part'] = $partFilter;
}

// Fetch aggregate statistics across the entire database (independent of search filter)
$statsStmt = $pdo->query("
    SELECT 
        COUNT(*) AS total_count,
        SUM(CASE WHEN LOWER(payment_status) IN ('success', 'paid', 'captured', 'confirmed') THEN 1 ELSE 0 END) AS confirmed_count,
        SUM(CASE WHEN LOWER(payment_status) = 'pending' THEN 1 ELSE 0 END) AS pending_count,
        SUM(CASE WHEN LOWER(payment_status) IN ('failed', 'failure', 'cancelled', 'error') THEN 1 ELSE 0 END) AS failed_count,
        SUM(CASE WHEN LOWER(payment_status) IN ('success', 'paid', 'captured', 'confirmed') THEN fee_amount ELSE 0 END) AS total_revenue
    FROM registrations
");
$stats = $statsStmt ? $statsStmt->fetch(PDO::FETCH_ASSOC) : array();

$totalCount     = isset($stats['total_count']) ? (int)$stats['total_count'] : 0;
$confirmedCount = isset($stats['confirmed_count']) ? (int)$stats['confirmed_count'] : 0;
$pendingCount   = isset($stats['pending_count']) ? (int)$stats['pending_count'] : 0;
$failedCount    = isset($stats['failed_count']) ? (int)$stats['failed_count'] : 0;
$totalRevenue   = isset($stats['total_revenue']) ? (float)$stats['total_revenue'] : 0.0;

// Execute filtered query for display table
$sql = "SELECT * FROM registrations";
if (!empty($where)) {
    $sql .= " WHERE " . implode(' AND ', $where);
}
$sql .= " ORDER BY id DESC LIMIT 500";

$stmt = $pdo->prepare($sql);
$stmt->execute($params);
$registrations = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Export URL with current active filters
$exportQuery = http_build_query(array(
    'csrf'               => $csrfToken,
    'search'             => $search,
    'status'             => $statusFilter,
    'category'           => $categoryFilter,
    'participation_type' => $partFilter
));
$exportUrl = 'export.php?' . $exportQuery;
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Registrations Dashboard • DYUTI 2027 Admin</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Cinzel:wght@700&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Plus Jakarta Sans', sans-serif; background-color: #0b1526; }
    .font-cinzel { font-family: 'Cinzel', serif; }
    .font-mono { font-family: 'JetBrains Mono', monospace; }
  </style>
</head>
<body class="min-h-screen text-slate-100 flex flex-col">

  <!-- Top Navigation Header -->
  <header class="sticky top-0 z-40 bg-slate-900/95 border-b border-slate-800 backdrop-blur-md px-4 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4 shadow-xl">
    <div class="flex items-center gap-3">
      <div class="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center font-bold text-lg shadow-inner">
        D
      </div>
      <div>
        <div class="text-[10px] font-black uppercase tracking-widest text-amber-400">Secretariat Portal</div>
        <h1 class="text-base sm:text-lg font-bold font-cinzel text-white leading-none">DYUTI 2027 National Conference</h1>
      </div>
    </div>

    <div class="flex items-center gap-2.5 sm:gap-4">
      <!-- Direct Excel Export Button (Paid Only • Deduplicated) -->
      <a href="<?php echo htmlspecialchars($exportUrl); ?>"
         title="Download confirmed paid delegates only (duplicates excluded)"
         class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs tracking-wide transition-all shadow-md shadow-emerald-900/30 active:scale-95">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
        </svg>
        <span>Export Paid Delegates (Excel)</span>
      </a>

      <!-- Current Admin User Badge -->
      <div class="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700/80 text-xs text-slate-300">
        <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
        <span class="font-medium"><?php echo htmlspecialchars($_SESSION['dyuti_admin_user']); ?></span>
      </div>

      <!-- Secure Logout Link -->
      <a href="index.php?action=logout"
         class="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-rose-950/80 hover:text-rose-300 border border-slate-700 hover:border-rose-800 text-xs font-semibold text-slate-300 transition-all">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
        </svg>
        <span class="hidden sm:inline">Sign Out</span>
      </a>
    </div>
  </header>

  <!-- Main Content Area -->
  <main class="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-6 sm:py-8 space-y-6">

    <!-- KPI Metric Cards -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      
      <!-- Total Registrations -->
      <div class="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-5 shadow-lg relative overflow-hidden">
        <div class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Total Registrations</div>
        <div class="text-3xl font-extrabold text-white tracking-tight"><?php echo number_format($totalCount); ?></div>
        <div class="text-xs text-slate-500 mt-2 flex items-center gap-1">
          <span>All recorded submissions</span>
        </div>
      </div>

      <!-- Confirmed / Paid -->
      <div class="bg-slate-900/80 border border-emerald-900/40 rounded-2xl p-5 shadow-lg relative overflow-hidden">
        <div class="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1">Confirmed (Paid)</div>
        <div class="text-3xl font-extrabold text-emerald-400 tracking-tight"><?php echo number_format($confirmedCount); ?></div>
        <div class="text-xs text-emerald-500/80 mt-2 flex items-center gap-1">
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
          <span>Payment verified</span>
        </div>
      </div>

      <!-- Pending Payments -->
      <div class="bg-slate-900/80 border border-amber-900/40 rounded-2xl p-5 shadow-lg relative overflow-hidden">
        <div class="text-xs font-bold uppercase tracking-wider text-amber-400 mb-1">Payment Pending</div>
        <div class="text-3xl font-extrabold text-amber-400 tracking-tight"><?php echo number_format($pendingCount); ?></div>
        <div class="text-xs text-amber-500/80 mt-2 flex items-center gap-1">
          <span class="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
          <span>Awaiting completion</span>
        </div>
      </div>

      <!-- Total Revenue -->
      <div class="bg-slate-900/80 border border-amber-500/30 rounded-2xl p-5 shadow-lg relative overflow-hidden">
        <div class="text-xs font-bold uppercase tracking-wider text-amber-300 mb-1">Verified Revenue</div>
        <div class="text-3xl font-extrabold text-white tracking-tight">₹ <?php echo number_format($totalRevenue, 2); ?></div>
        <div class="text-xs text-amber-400/80 mt-2 flex items-center gap-1">
          <span>Confirmed fee collections</span>
        </div>
      </div>

    </div>

    <!-- Search & Filter Controls Card -->
    <div class="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg">
      <form method="GET" action="index.php" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 items-end">
        
        <!-- Search Keyword Input -->
        <div class="lg:col-span-2">
          <label for="search" class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Search Registrant</label>
          <div class="relative">
            <input type="text" id="search" name="search" value="<?php echo htmlspecialchars($search); ?>"
                   placeholder="Name, Email, Mobile, Reg ID, Txn..."
                   class="w-full pl-9 pr-4 py-2.5 bg-slate-950 border border-slate-700/80 rounded-xl text-white placeholder-slate-500 text-xs font-medium focus:outline-none focus:border-amber-400">
            <svg class="w-4 h-4 text-slate-500 absolute left-3 top-3 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
          </div>
        </div>

        <!-- Payment Status Filter -->
        <div>
          <label for="status" class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Payment Status</label>
          <select id="status" name="status"
                  class="w-full px-3 py-2.5 bg-slate-950 border border-slate-700/80 rounded-xl text-white text-xs font-medium focus:outline-none focus:border-amber-400">
            <option value="all" <?php echo ($statusFilter === 'all') ? 'selected' : ''; ?>>All Statuses</option>
            <option value="success" <?php echo ($statusFilter === 'success') ? 'selected' : ''; ?>>Confirmed / Paid</option>
            <option value="pending" <?php echo ($statusFilter === 'pending') ? 'selected' : ''; ?>>Pending</option>
            <option value="failed" <?php echo ($statusFilter === 'failed') ? 'selected' : ''; ?>>Failed / Cancelled</option>
          </select>
        </div>

        <!-- Category Filter -->
        <div>
          <label for="category" class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Category</label>
          <select id="category" name="category"
                  class="w-full px-3 py-2.5 bg-slate-950 border border-slate-700/80 rounded-xl text-white text-xs font-medium focus:outline-none focus:border-amber-400">
            <option value="all" <?php echo ($categoryFilter === 'all') ? 'selected' : ''; ?>>All Categories</option>
            <option value="UG / PG Student" <?php echo ($categoryFilter === 'UG / PG Student') ? 'selected' : ''; ?>>UG / PG Student (₹750)</option>
            <option value="M.Phil / Research Scholars" <?php echo ($categoryFilter === 'M.Phil / Research Scholars') ? 'selected' : ''; ?>>M.Phil / Research Scholars (₹1000)</option>
            <option value="Professionals / Academicians" <?php echo ($categoryFilter === 'Professionals / Academicians') ? 'selected' : ''; ?>>Professionals / Academicians (₹1000)</option>
            <option value="Stall / Exhibition Participant" <?php echo ($categoryFilter === 'Stall / Exhibition Participant') ? 'selected' : ''; ?>>Stall / Exhibition (₹1000)</option>
          </select>
        </div>

        <!-- Action Buttons -->
        <div class="flex items-center gap-2">
          <button type="submit"
                  class="flex-1 py-2.5 px-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl transition-all shadow-md active:scale-95 text-center">
            Apply Filters
          </button>
          <?php if ($search !== '' || $statusFilter !== 'all' || $categoryFilter !== 'all' || $partFilter !== 'all'): ?>
            <a href="index.php" title="Clear Filters"
               class="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition-colors border border-slate-700">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </a>
          <?php endif; ?>
        </div>

      </form>
    </div>

    <!-- Registrations Data Table -->
    <div class="bg-slate-900/90 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
      
      <!-- Table Header & Counter -->
      <div class="p-4 sm:p-5 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div class="flex items-center gap-2">
          <h2 class="text-sm sm:text-base font-bold text-white">Participant Registrations</h2>
          <span class="px-2.5 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-[11px] font-bold text-slate-300">
            Showing <?php echo count($registrations); ?> record<?php echo count($registrations) === 1 ? '' : 's'; ?>
          </span>
        </div>
        
        <div class="text-xs text-slate-400 flex items-center gap-2">
          <span class="inline-flex items-center gap-1 text-emerald-400 font-semibold"><span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Excel export auto-deduplicates &amp; exports paid delegates only</span>
        </div>
      </div>

      <!-- Responsive Table Container -->
      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs border-collapse">
          <thead>
            <tr class="bg-slate-950/70 border-b border-slate-800 text-slate-400 uppercase tracking-wider font-bold">
              <th class="py-3 px-4">#</th>
              <th class="py-3 px-4">Application ID</th>
              <th class="py-3 px-4">Date / Time</th>
              <th class="py-3 px-4">Delegate Name</th>
              <th class="py-3 px-4">Contact</th>
              <th class="py-3 px-4">Category &amp; Org</th>
              <th class="py-3 px-4">Fee (₹)</th>
              <th class="py-3 px-4">Payment Status</th>
              <th class="py-3 px-4">Transaction Ref</th>
              <th class="py-3 px-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-800/70 font-medium">
            <?php if (empty($registrations)): ?>
              <tr>
                <td colspan="10" class="py-12 text-center text-slate-400">
                  <div class="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-800 mb-3 text-slate-500">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/>
                    </svg>
                  </div>
                  <div class="text-sm font-bold text-slate-300">No registration records found</div>
                  <div class="text-xs text-slate-500 mt-1">Try adjusting your search criteria or filter options.</div>
                </td>
              </tr>
            <?php else: ?>
              <?php foreach ($registrations as $idx => $reg): 
                $pStatus = strtolower(trim($reg['payment_status']));
                $isPaid = in_array($pStatus, array('success', 'paid', 'captured', 'confirmed'));
                $isPending = ($pStatus === 'pending');
                $isFailed = in_array($pStatus, array('failed', 'failure', 'cancelled', 'error'));
                
                $regJson = htmlspecialchars(json_encode($reg), ENT_QUOTES, 'UTF-8');
              ?>
                <tr class="hover:bg-slate-800/40 transition-colors">
                  <td class="py-3.5 px-4 text-slate-500"><?php echo htmlspecialchars($reg['id']); ?></td>
                  <td class="py-3.5 px-4 font-mono font-bold text-white tracking-tight">
                    <?php echo htmlspecialchars($reg['registration_id']); ?>
                  </td>
                  <td class="py-3.5 px-4 text-slate-400 whitespace-nowrap">
                    <?php echo htmlspecialchars(substr($reg['created_at'], 0, 16)); ?>
                  </td>
                  <td class="py-3.5 px-4">
                    <div class="font-bold text-white"><?php echo htmlspecialchars($reg['title'] . ' ' . $reg['full_name']); ?></div>
                    <div class="text-[11px] text-slate-400 truncate max-w-xs"><?php echo htmlspecialchars($reg['designation'] ?: 'Participant'); ?></div>
                  </td>
                  <td class="py-3.5 px-4">
                    <div class="text-slate-300 truncate max-w-xs"><?php echo htmlspecialchars($reg['email']); ?></div>
                    <div class="text-slate-400 font-mono text-[11px]"><?php echo htmlspecialchars($reg['phone']); ?></div>
                  </td>
                  <td class="py-3.5 px-4">
                    <div class="text-white font-medium truncate max-w-xs"><?php echo htmlspecialchars($reg['registration_category']); ?></div>
                    <div class="text-[11px] text-slate-400 truncate max-w-xs"><?php echo htmlspecialchars($reg['organization'] ?: '—'); ?></div>
                  </td>
                  <td class="py-3.5 px-4 font-mono font-bold text-white">
                    ₹ <?php echo number_format((float)$reg['fee_amount'], 2); ?>
                  </td>
                  <td class="py-3.5 px-4">
                    <?php if ($isPaid): ?>
                      <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-950/80 text-emerald-300 border border-emerald-800">
                        <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Confirmed
                      </span>
                    <?php elseif ($isPending): ?>
                      <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-950/80 text-amber-300 border border-amber-800">
                        <span class="w-1.5 h-1.5 rounded-full bg-amber-400"></span> Pending
                      </span>
                    <?php else: ?>
                      <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-950/80 text-rose-300 border border-rose-800">
                        <span class="w-1.5 h-1.5 rounded-full bg-rose-400"></span> Failed
                      </span>
                    <?php endif; ?>
                  </td>
                  <td class="py-3.5 px-4 font-mono text-[11px] text-slate-400 truncate max-w-xs" title="<?php echo htmlspecialchars($reg['transaction_ref'] ?: 'N/A'); ?>">
                    <?php echo htmlspecialchars($reg['transaction_ref'] ?: '—'); ?>
                  </td>
                  <td class="py-3.5 px-4 text-center">
                    <button type="button"
                            onclick='openDetailModal(<?php echo $regJson; ?>)'
                            class="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 text-xs font-semibold transition-all">
                      View
                    </button>
                  </td>
                </tr>
              <?php endforeach; ?>
            <?php endif; ?>
          </tbody>
        </table>
      </div>

    </div>

  </main>

  <!-- Detailed Registrant Modal -->
  <div id="detailModal" class="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm hidden flex items-center justify-center p-4">
    <div class="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-fadeIn">
      
      <!-- Modal Header -->
      <div class="p-5 sm:p-6 border-b border-slate-800 flex items-center justify-between">
        <div>
          <div class="text-[10px] font-mono uppercase font-bold text-amber-400" id="modalRegId">DYUTI27-ONLINE-000000</div>
          <h3 class="text-lg font-bold text-white" id="modalFullName">Participant Details</h3>
        </div>
        <button type="button" onclick="closeDetailModal()" class="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
      </div>

      <!-- Modal Body (Scrollable) -->
      <div class="p-5 sm:p-6 space-y-6 overflow-y-auto text-xs" id="modalContent">
        <!-- Content injected dynamically via Javascript -->
      </div>

      <!-- Modal Footer -->
      <div class="p-4 border-t border-slate-800 bg-slate-950/50 flex justify-end">
        <button type="button" onclick="closeDetailModal()" class="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold transition-colors">
          Close Window
        </button>
      </div>

    </div>
  </div>

  <script>
    function openDetailModal(data) {
      document.getElementById('modalRegId').textContent = data.registration_id || 'N/A';
      document.getElementById('modalFullName').textContent = (data.title ? data.title + ' ' : '') + (data.full_name || 'Participant');
      
      const pStatus = (data.payment_status || 'pending').toLowerCase();
      const isPaid = ['success', 'paid', 'captured', 'confirmed'].includes(pStatus);
      const isPending = pStatus === 'pending';
      const statusBadge = isPaid
        ? '<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold">Confirmed / Paid</span>'
        : (isPending
            ? '<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-800 font-bold">Pending</span>'
            : '<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-950 text-rose-300 border border-rose-800 font-bold">Failed</span>');

      const html = `
        <div class="space-y-4">
          
          <!-- Category & Payment Banner -->
          <div class="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
            <div>
              <div class="text-[10px] uppercase font-bold text-slate-400">Category & Fee</div>
              <div class="text-sm font-bold text-white mt-0.5">${escapeHtml(data.registration_category || 'N/A')}</div>
            </div>
            <div class="text-right">
              <div class="text-[10px] uppercase font-bold text-slate-400">Payment Status</div>
              <div class="mt-0.5">${statusBadge} &bull; <strong class="text-white font-mono">₹ ${parseFloat(data.fee_amount || 0).toLocaleString()}</strong></div>
            </div>
          </div>

          <!-- Section: Personal Particulars -->
          <div class="border border-slate-800 rounded-xl p-4 bg-slate-950/40">
            <h4 class="text-xs font-bold uppercase tracking-wider text-amber-400 mb-3">1. Personal Particulars</h4>
            <div class="grid grid-cols-2 gap-3">
              <div><span class="text-slate-500">Full Name:</span> <strong class="text-white">${escapeHtml((data.title ? data.title + ' ' : '') + data.full_name)}</strong></div>
              <div><span class="text-slate-500">Gender:</span> <span class="text-white">${escapeHtml(data.gender || '—')}</span></div>
              <div><span class="text-slate-500">Designation:</span> <span class="text-white">${escapeHtml(data.designation || '—')}</span></div>
              <div><span class="text-slate-500">Organization:</span> <span class="text-white">${escapeHtml(data.organization || '—')}</span></div>
              <div><span class="text-slate-500">Discipline:</span> <span class="text-white">${escapeHtml(data.discipline || '—')}</span></div>
              <div><span class="text-slate-500">Pincode:</span> <span class="text-white font-mono">${escapeHtml(data.pincode || '—')}</span></div>
              <div class="col-span-2"><span class="text-slate-500">Postal Address:</span> <span class="text-white">${escapeHtml(data.address || '—')}</span></div>
            </div>
          </div>

          <!-- Section: Contact Details -->
          <div class="border border-slate-800 rounded-xl p-4 bg-slate-950/40">
            <h4 class="text-xs font-bold uppercase tracking-wider text-amber-400 mb-3">2. Contact Details</h4>
            <div class="grid grid-cols-2 gap-3">
              <div><span class="text-slate-500">Email:</span> <a href="mailto:${escapeHtml(data.email)}" class="text-blue-400 hover:underline">${escapeHtml(data.email)}</a></div>
              <div><span class="text-slate-500">Phone:</span> <a href="tel:${escapeHtml(data.phone)}" class="text-blue-400 font-mono hover:underline">${escapeHtml(data.phone)}</a></div>
            </div>
          </div>

          <!-- Section: Preferences & Hospitality -->
          <div class="border border-slate-800 rounded-xl p-4 bg-slate-950/40">
            <h4 class="text-xs font-bold uppercase tracking-wider text-amber-400 mb-3">3. Preferences &amp; Accommodation</h4>
            <div class="grid grid-cols-2 gap-3">
              <div><span class="text-slate-500">Food Preference:</span> <span class="text-white uppercase font-bold">${escapeHtml(data.food_preference || 'VEG')}</span></div>
              <div><span class="text-slate-500">Dietary Details:</span> <span class="text-white">${escapeHtml(data.food_details || 'None')}</span></div>
              <div><span class="text-slate-500">Requires Accommodation:</span> <span class="text-white uppercase font-bold">${escapeHtml(data.require_accommodation || 'NO')}</span></div>
              <div><span class="text-slate-500">Accommodation Notes:</span> <span class="text-white">${escapeHtml(data.accommodation_notes || 'None')}</span></div>
            </div>
          </div>

          <!-- Section: Paper Presentation -->
          <div class="border border-slate-800 rounded-xl p-4 bg-slate-950/40">
            <h4 class="text-xs font-bold uppercase tracking-wider text-amber-400 mb-3">4. Paper Presentation Details</h4>
            <div class="grid grid-cols-2 gap-3">
              <div><span class="text-slate-500">Is Presenting Paper:</span> <span class="text-white uppercase font-bold">${escapeHtml(data.is_presenting_paper || 'NO')}</span></div>
              <div><span class="text-slate-500">CMT Paper ID:</span> <span class="text-white font-mono font-bold">${escapeHtml(data.cmt_paper_id || 'N/A')}</span></div>
              <div class="col-span-2"><span class="text-slate-500">Paper Title:</span> <span class="text-white">${escapeHtml(data.paper_title || 'N/A')}</span></div>
              <div class="col-span-2"><span class="text-slate-500">Sub-theme Track:</span> <span class="text-white">${escapeHtml(data.paper_theme || 'N/A')}</span></div>
            </div>
          </div>

          <!-- Section: Payment & Audit Metadata -->
          <div class="border border-slate-800 rounded-xl p-4 bg-slate-950/40">
            <h4 class="text-xs font-bold uppercase tracking-wider text-amber-400 mb-3">5. Transaction &amp; Audit Metadata</h4>
            <div class="grid grid-cols-2 gap-3 font-mono text-[11px]">
              <div><span class="text-slate-500 font-sans">Payment Mode:</span> <span class="text-white">${escapeHtml(data.payment_mode || 'online')}</span></div>
              <div><span class="text-slate-500 font-sans">Registered At:</span> <span class="text-white">${escapeHtml(data.created_at || '—')}</span></div>
              <div class="col-span-2"><span class="text-slate-500 font-sans">Transaction Ref:</span> <span class="text-emerald-400 break-all font-bold">${escapeHtml(data.transaction_ref || '—')}</span></div>
              <div class="col-span-2"><span class="text-slate-500 font-sans">Payment Order ID:</span> <span class="text-slate-300 break-all">${escapeHtml(data.payment_order_id || '—')}</span></div>
              <div><span class="text-slate-500 font-sans">Client IP:</span> <span class="text-slate-400">${escapeHtml(data.ip_address || '—')}</span></div>
              <div><span class="text-slate-500 font-sans">Last Updated:</span> <span class="text-slate-400">${escapeHtml(data.updated_at || '—')}</span></div>
            </div>
          </div>

        </div>
      `;

      document.getElementById('modalContent').innerHTML = html;
      document.getElementById('detailModal').classList.remove('hidden');
    }

    function closeDetailModal() {
      document.getElementById('detailModal').classList.add('hidden');
    }

    function escapeHtml(text) {
      if (!text) return '';
      return String(text)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
    }

    // Close modal on Escape key
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeDetailModal();
    });
  </script>
</body>
</html>

