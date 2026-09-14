// dev-server.js - Local dev server supporting static files & /api/create_payment_order
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import createPaymentOrderHandler from './api/create_payment_order.js';
import sendNotificationHandler from './api/send_registration_notification.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
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
  '.woff2': 'font/woff2'
};

const server = http.createServer(async (req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  const pathname = parsedUrl.pathname;

  // Handle API routes
  if (pathname === '/api/create_payment_order' || pathname === '/api/create_payment_order.php' ||
      pathname === '/api/send_registration_notification' || pathname === '/api/send_registration_notification.php' ||
      pathname === '/api/save_registration.php') {
    let bodyStr = '';
    req.on('data', chunk => { bodyStr += chunk; });
    req.on('end', async () => {
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
          res.json({ status: 'success', message: 'Registration recorded (local development).' });
        }
      } catch (err) {
        console.error('API Error:', err);
        res.statusCode = 500;
        res.end(JSON.stringify({ status: 'error', message: err.message }));
      }
    });
    return;
  }

  // Handle clean URLs rewrite
  let filePath = path.join(__dirname, pathname === '/' ? 'index.html' : pathname);
  if (pathname === '/register') filePath = path.join(__dirname, 'registration.html');
  if (pathname === '/contactus') filePath = path.join(__dirname, 'contact.html');

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
    fs.createReadStream(filePath).pipe(res);
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
