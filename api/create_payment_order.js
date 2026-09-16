// api/create_payment_order.js
// Serverless Function & Node.js ES Module for Vortexx Payment Gateway

import https from 'https';
import { URL } from 'url';
import { getLocalRegistrations } from './check_registration_status.js';

const VORTEXX_API_URL = process.env.VORTEX_API_URL || process.env.VORTEXX_API_URL || 'https://icswhmh.com/vortex/api/create_payment_order.php';
const VORTEXX_API_KEY = process.env.VORTEX_API_KEY || process.env.VORTEXX_API_KEY || '';
const VORTEXX_API_SECRET = process.env.VORTEX_API_SECRET || process.env.VORTEXX_API_SECRET || '';
const VORTEXX_EVENT_ID = process.env.VORTEX_EVENT_ID || process.env.VORTEXX_EVENT_ID || '';

// Shared HTTPS Agent for persistent TCP connection & TLS session reuse with IPv4
const httpsAgent = new https.Agent({
  keepAlive: true,
  family: 4,
  maxSockets: 50,
  keepAliveMsecs: 30000
});

export default async function handler(req, res) {
  // 1. Handle CORS Preflight and headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST' && req.method !== 'GET') {
    return res.status(405).json({ status: 'error', message: 'Method not allowed' });
  }

  try {
    // Parse payload from body or query
    const input = req.method === 'POST' ? (req.body || {}) : (req.query || {});

    const apiKey = process.env.VORTEX_API_KEY || process.env.VORTEXX_API_KEY || (input.api_key !== 'YOUR_API_KEY' ? input.api_key : '');
    const apiSecret = process.env.VORTEX_API_SECRET || process.env.VORTEXX_API_SECRET || (input.api_secret !== 'YOUR_API_SECRET' ? input.api_secret : '');
    const eventId = process.env.VORTEX_EVENT_ID || process.env.VORTEXX_EVENT_ID || (input.event_id !== 'youEventId' ? input.event_id : '');

    let targetUrl = process.env.VORTEXX_API_URL || process.env.VORTEX_API_URL || 'https://icswhmh.com/vortex/api/create_payment_order.php';
    if (!targetUrl.endsWith('.php')) {
      targetUrl = targetUrl.replace(/\/+$/, '') + '/create_payment_order.php';
    }

    const customerName = (input.customer_name || input.name || 'Delegate Participant').trim();
    const customerMobile = (input.customer_mobile || input.mobile || input.phone || '9876543210').trim().replace(/[^\d+]/g, '');
    const cleanMobile = customerMobile.replace(/^\+91/, '').replace(/\D/g, '').slice(-10);
    const customerEmail = (input.customer_email || input.email || (cleanMobile ? `${cleanMobile}@dyuti.in` : 'delegate@dyuti.in')).trim();
    const amount = Number(input.amount) || 750;
    const currency = (input.currency || 'INR').toUpperCase();
    const redirectUrl = input.redirect_url || 'https://dyuti.in/registration.html';
    const isRetry = input.is_retry === true || !!input.registration_id || !!input.order_id || amount === 1;
    const currentRegId = input.registration_id || input.order_id || '';

    // Check 15-minute cool-off period for failed attempts (bypassed on intentional retries & test amounts)
    if (!isRetry) {
      try {
        const existing = getLocalRegistrations();
        const failed = existing.find(r => {
          const matchesEmail = (r.email || '').toLowerCase() === customerEmail.toLowerCase();
          const rPhone = (r.phone || '').replace(/\D/g, '');
          const matchesPhone = cleanMobile && rPhone.endsWith(cleanMobile);
          return (matchesEmail || matchesPhone) && r.payment_status === 'failed';
        });

        if (failed && failed.updated_ts) {
          const elapsed = Math.floor(Date.now() / 1000) - Number(failed.updated_ts);
          if (elapsed < 900) {
            const remaining = 900 - elapsed;
            const mins = Math.floor(remaining / 60);
            const secs = remaining % 60;
            return res.status(429).json({
              status: 'error',
              cooloff: true,
              cooloff_remaining_seconds: remaining,
              message: `A recent registration attempt failed. In accordance with payment guidelines, please wait ${mins}m ${secs}s (15-minute cool-off period) before attempting registration again.`
            });
          }
        }

        // Check if email already has a successful registration (ignore if retrying same ID)
        const alreadyConfirmed = existing.find(r => 
          (r.email || '').toLowerCase().trim() === customerEmail.toLowerCase().trim() &&
          ['success', 'paid', 'captured'].includes((r.payment_status || '').toLowerCase()) &&
          (!currentRegId || (r.registration_id !== currentRegId && r.regId !== currentRegId))
        );

        if (alreadyConfirmed) {
          const regId = alreadyConfirmed.registration_id || alreadyConfirmed.regId;
          return res.status(409).json({
            status: 'error',
            already_registered: true,
            registration_id: regId,
            message: `The email "${customerEmail}" is already registered (Registration ID: ${regId}). Duplicate entries are not permitted. Please check your registration details in the Status tab.`
          });
        }
      } catch (e) {
        // Ignore
      }
    }

    // Payload formatted for Vortexx API with only the exact accepted fields
    const vortexPayload = {
      api_key: apiKey,
      api_secret: apiSecret,
      event_id: eventId,
      name: customerName,
      email: customerEmail,
      mobile: cleanMobile || customerMobile,
      amount: amount,
      currency: currency,
      redirect_url: redirectUrl
    };

    const postData = JSON.stringify(vortexPayload);

    // Forward to Vortexx API
    const responseData = await new Promise((resolve, reject) => {
      const parsedUrl = new URL(targetUrl);
      const options = {
        hostname: parsedUrl.hostname,
        port: parsedUrl.port || 443,
        path: parsedUrl.pathname + parsedUrl.search,
        method: 'POST',
        agent: httpsAgent,
        family: 4,
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(postData),
          'Accept': 'application/json'
        },
        timeout: 25000
      };

      const remoteReq = https.request(options, (remoteRes) => {
        let body = '';
        remoteRes.on('data', chunk => { body += chunk; });
        remoteRes.on('end', () => {
          try {
            const parsed = JSON.parse(body);
            resolve({ statusCode: remoteRes.statusCode, data: parsed, raw: body });
          } catch (e) {
            resolve({ statusCode: remoteRes.statusCode, data: null, raw: body });
          }
        });
      });

      remoteReq.on('error', err => reject(err));
      remoteReq.on('timeout', () => {
        remoteReq.destroy();
        reject(new Error('Vortex gateway request timed out.'));
      });

      remoteReq.write(postData);
      remoteReq.end();
    });

    if (responseData.data && responseData.data.status === 'success') {
      return res.status(200).json(responseData.data);
    } else {
      return res.status(responseData.statusCode || 400).json(
        responseData.data || {
          status: 'error',
          message: 'Failed to create payment order from gateway.',
          raw: responseData.raw
        }
      );
    }

  } catch (error) {
    console.error('Vortexx payment order error:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error while connecting to payment gateway: ' + error.message
    });
  }
}
