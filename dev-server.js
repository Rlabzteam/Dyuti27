// dev-server.js - Local dev server supporting static files & /api/create_payment_order
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import createPaymentOrderHandler from './api/create_payment_order.js';
import sendNotificationHandler from './api/send_registration_notification.js';
import checkStatusHandler, { saveLocalRegistration } from './api/check_registration_status.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env variables into process.env for local development
const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  for (const line of envContent.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#') || !trimmed.includes('=')) continue;
    const [k, ...vParts] = trimmed.split('=');
    const key = k.trim();
    const val = vParts.join('=').trim().replace(/^['"]|['"]$/g, '');
    if (!process.env[key]) {
      process.env[key] = val;
    }
  }
}

const PORT = process.env.PORT || 3000;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.pdf': 'application/pdf'
};

const server = http.createServer(async (req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  const pathname = parsedUrl.pathname;

  // Handle API routes (supports /api/..., /rcss/api/..., with or without .php)
  if (pathname.includes('/api/create_payment_order') ||
      pathname.includes('/api/send_registration_notification') ||
      pathname.includes('/api/save_registration') ||
      pathname.includes('/api/check_registration_status')) {

    // Global CORS for development server
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept, Authorization, X-Requested-With');

    if (req.method === 'OPTIONS') {
      res.statusCode = 200;
      res.end();
      return;
    }

    let bodyStr = '';
    req.on('data', chunk => { bodyStr += chunk; });
    req.on('end', async () => {
      console.log(`[API DEV-SERVER] ${req.method} ${pathname}`);
      try {
        req.body = bodyStr ? JSON.parse(bodyStr) : {};
      } catch (e) {
        req.body = {};
      }
      req.query = Object.fromEntries(parsedUrl.searchParams.entries());

      // Mock Express/Vercel res methods
      res.status = (code) => { res.statusCode = code; return res; };
      res.json = (data) => {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(data));
        return res;
      };

      try {
        if (pathname.includes('create_payment_order')) {
          await createPaymentOrderHandler(req, res);
        } else if (pathname.includes('send_registration_notification')) {
          await sendNotificationHandler(req, res);
        } else if (pathname.includes('save_registration')) {
          const saved = saveLocalRegistration(req.body);
          if (saved && saved.error && saved.already_registered) {
            res.status(409).json({
              status: 'error',
              already_registered: true,
              registration_id: saved.registration_id,
              message: saved.message
            });
          } else {
            res.json({
              status: 'success',
              message: 'Registration recorded (local development).',
              registration_id: saved.registration_id
            });
          }
        } else if (pathname.includes('check_registration_status')) {
          await checkStatusHandler(req, res);
        }
      } catch (err) {
        console.error('API Error:', err);
        res.statusCode = 500;
        res.end(JSON.stringify({ status: 'error', message: err.message }));
      }
    });
    return;
  }

  let decodedPathname;
  try {
    decodedPathname = decodeURIComponent(pathname);
  } catch (e) {
    decodedPathname = pathname;
  }

  // Handle clean URLs rewrite
  let filePath = path.join(__dirname, decodedPathname === '/' ? 'index.html' : decodedPathname);
  if (decodedPathname === '/register') filePath = path.join(__dirname, 'registration.html');
  if (decodedPathname === '/contactus') filePath = path.join(__dirname, 'contact.html');

  if (!path.extname(filePath) && fs.existsSync(filePath + '.html')) {
    filePath += '.html';
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.statusCode = 404;
      const notFoundPath = path.join(__dirname, '404.html');
      if (fs.existsSync(notFoundPath)) {
        res.setHeader('Content-Type', 'text/html');
        fs.createReadStream(notFoundPath).pipe(res);
      } else {
        res.end('404 Not Found');
      }
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    res.setHeader('Content-Type', contentType);
    res.setHeader('Accept-Ranges', 'bytes');

    const range = req.headers.range;
    if (range) {
      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : stats.size - 1;

      if (start >= stats.size || end >= stats.size) {
        res.statusCode = 416;
        res.setHeader('Content-Range', `bytes */${stats.size}`);
        res.end();
        return;
      }

      const chunksize = (end - start) + 1;
      res.statusCode = 206;
      res.setHeader('Content-Range', `bytes ${start}-${end}/${stats.size}`);
      res.setHeader('Content-Length', chunksize);
      fs.createReadStream(filePath, { start, end }).pipe(res);
    } else {
      res.setHeader('Content-Length', stats.size);
      fs.createReadStream(filePath).pipe(res);
    }
  });
});

function startServer(port) {
  server.listen(port, () => {
    console.log(`\n=================================================`);
    console.log(` DYUTI 2027 Server with Payment API Ready!`);
    console.log(` Local URL: http://localhost:${port}`);
    console.log(` Registration: http://localhost:${port}/registration.html`);
    console.log(` Payment API: http://localhost:${port}/api/create_payment_order`);
    console.log(`=================================================\n`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.warn(`Port ${port} is currently busy, trying port ${port + 1}...`);
      startServer(port + 1);
    } else {
      console.error('Server error:', err);
    }
  });
}

startServer(Number(PORT));
