// api/create_payment_order.js
// Vercel Serverless Function & Node.js ES Module for Vortexx Payment Gateway

import https from 'https';
import { URL } from 'url';

const VORTEXX_API_URL = process.env.VORTEXX_API_URL || 'https://icswhmh.com/vortex/api/create_payment_order.php';
const VORTEXX_API_KEY = process.env.VORTEXX_API_KEY || '51e60f98b5b217688d0fe537a1a58033';
const VORTEXX_API_SECRET = process.env.VORTEXX_API_SECRET || 'e605e71a192a6eba29416f3931e5abf3';
const VORTEXX_EVENT_ID = process.env.VORTEXX_EVENT_ID || 'DYUT20260913MU01TMQ67BK';

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

    const apiKey = input.api_key && input.api_key !== 'YOUR_API_KEY' ? input.api_key : VORTEXX_API_KEY;
    const apiSecret = input.api_secret && input.api_secret !== 'YOUR_API_SECRET' ? input.api_secret : VORTEXX_API_SECRET;
    const eventId = input.event_id && input.event_id !== 'youEventId' ? input.event_id : VORTEXX_EVENT_ID;

    const customerName = (input.customer_name || input.name || 'Delegate Participant').trim();
    const customerEmail = (input.customer_email || input.email || '').trim();
    const customerMobile = (input.customer_mobile || input.mobile || input.phone || '').trim().replace(/[^\d+]/g, '');
    const amount = Number(input.amount) > 0 ? Number(input.amount) : 1;
    const currency = (input.currency || 'INR').toUpperCase();
    const redirectUrl = input.redirect_url || 'https://dyuti27new.vercel.app/registration.html';

    if (!customerEmail) {
      return res.status(400).json({ status: 'error', message: 'Valid customer email is required.' });
    }
    if (!customerMobile) {
      return res.status(400).json({ status: 'error', message: 'Valid customer mobile is required.' });
    }

    // Format phone: 10 digits
    const cleanMobile = customerMobile.replace(/^\+91/, '').replace(/\D/g, '').slice(-10);

    // Payload formatted for Vortexx API with aliases to support all parameter variants
    const vortexPayload = {
      api_key: apiKey,
      api_secret: apiSecret,
      event_id: eventId,
      customer_name: customerName,
      name: customerName,
      customer_email: customerEmail,
      email: customerEmail,
      customer_mobile: cleanMobile || customerMobile,
      mobile: cleanMobile || customerMobile,
      amount: amount,
      currency: currency,
      redirect_url: redirectUrl
    };

    const postData = JSON.stringify(vortexPayload);

    // Forward to Vortexx API
    const responseData = await new Promise((resolve, reject) => {
      const parsedUrl = new URL(VORTEXX_API_URL);
      const options = {
        hostname: parsedUrl.hostname,
        port: parsedUrl.port || 443,
        path: parsedUrl.pathname + parsedUrl.search,
        method: 'POST',
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
