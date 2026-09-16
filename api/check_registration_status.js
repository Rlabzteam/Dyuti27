// api/check_registration_status.js
// Node.js endpoint for checking registration status in local dev and serverless environments

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbFilePath = path.join(__dirname, '..', 'scratch', 'registrations_db.json');

export function getLocalRegistrations() {
  try {
    if (fs.existsSync(dbFilePath)) {
      const data = fs.readFileSync(dbFilePath, 'utf8');
      return JSON.parse(data) || [];
    }
  } catch (e) {
    console.warn('Could not read registrations_db.json:', e);
  }
  return [];
}

export function saveLocalRegistration(record) {
  try {
    const dir = path.dirname(dbFilePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    const list = getLocalRegistrations();
    const targetRegId = record.registration_id || record.regId;
    const email = (record.email || '').toLowerCase().trim();

    // Prevent duplicate entry if email is already registered with confirmed payment
    if (email) {
      const alreadyConfirmed = list.find(r => 
        (r.email || '').toLowerCase().trim() === email &&
        ['success', 'paid', 'captured'].includes((r.payment_status || '').toLowerCase()) &&
        (r.registration_id !== targetRegId)
      );
      if (alreadyConfirmed) {
        return {
          error: true,
          already_registered: true,
          registration_id: alreadyConfirmed.registration_id,
          message: `The email "${email}" is already registered (Registration ID: ${alreadyConfirmed.registration_id}). Duplicate entries are not permitted.`
        };
      }
    }

    let existingIdx = list.findIndex(r => 
      (record.registration_id && r.registration_id === record.registration_id) ||
      (record.regId && (r.registration_id === record.regId || r.regId === record.regId))
    );

    // If ID didn't match directly, check if this user already has an existing pending/failed registration
    if (existingIdx === -1) {
      const pClean = (record.phone || '').replace(/\D/g, '');
      const pLast10 = pClean.length >= 10 ? pClean.slice(-10) : pClean;
      existingIdx = list.findIndex(r => {
        const rEmail = (r.email || '').toLowerCase().trim();
        const rPhone = (r.phone || '').replace(/\D/g, '');
        const rStatus = (r.payment_status || '').toLowerCase();
        const matchesContact = (email && rEmail === email) || (pLast10 && rPhone.endsWith(pLast10));
        return matchesContact && ['pending', 'failed'].includes(rStatus);
      });
      if (existingIdx !== -1) {
        // Reuse the existing registration_id
        record.registration_id = list[existingIdx].registration_id;
        record.regId = list[existingIdx].registration_id;
      }
    }

    const now = new Date().toISOString();
    const normalized = {
      ...record,
      registration_id: record.registration_id || record.regId,
      full_name: record.full_name || record.name,
      updated_at: now,
      updated_ts: Math.floor(Date.now() / 1000)
    };

    if (existingIdx !== -1) {
      list[existingIdx] = { ...list[existingIdx], ...normalized };
    } else {
      normalized.created_at = normalized.created_at || now;
      list.unshift(normalized);
    }

    fs.writeFileSync(dbFilePath, JSON.stringify(list, null, 2), 'utf8');
    return normalized;
  } catch (e) {
    console.warn('Could not write registrations_db.json:', e);
    return record;
  }
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const input = req.method === 'POST' ? (req.body || {}) : (req.query || {});
  const appId = (input.registration_id || input.app_id || input.application_id || '').trim().toLowerCase();
  const inputPhone = (input.phone || input.mobile || '').trim().toLowerCase();
  const query = (input.query || input.q || input.search || input.term || input.email || appId || inputPhone || '').trim().toLowerCase();

  if (!query && !appId && !inputPhone) {
    return res.status(400).json({
      status: 'error',
      message: 'Please provide an Application ID or registered Mobile Number.'
    });
  }

  const list = getLocalRegistrations();
  const cleanDigits = (inputPhone || query).replace(/\D/g, '');
  const last10 = cleanDigits.length >= 10 ? cleanDigits.slice(-10) : cleanDigits;

  const appClean = (appId || '').toLowerCase().trim();
  const appSuffixMatch = appClean.match(/(\d{4,})$/);
  const appSuffix = appSuffixMatch ? appSuffixMatch[1] : '';

  const matched = list.filter(item => {
    const regId = (item.registration_id || item.regId || '').toLowerCase().trim();
    const email = (item.email || '').toLowerCase().trim();
    const phone = (item.phone || '').toLowerCase().replace(/\D/g, '');
    
    const matchApp = appClean && (
      regId === appClean || 
      regId.includes(appClean) || 
      (appSuffix && regId.includes(appSuffix)) ||
      email === appClean
    );

    const matchPhone = last10 && (
      phone.endsWith(last10) || 
      last10.endsWith(phone) ||
      (phone.length >= 7 && last10.includes(phone))
    );

    const matchQuery = query && (
      regId === query || 
      email === query || 
      regId.includes(query) || 
      email.includes(query) ||
      (last10 && phone.endsWith(last10))
    );

    return matchApp || matchPhone || matchQuery;
  });

  // Sort so that records matching BOTH appId and phone appear first
  if (appClean && last10) {
    matched.sort((a, b) => {
      const aReg = (a.registration_id || a.regId || '').toLowerCase().trim();
      const aPhone = (a.phone || '').replace(/\D/g, '');
      const aBoth = (aReg === appClean || aReg.includes(appClean) || (appSuffix && aReg.includes(appSuffix))) && aPhone.endsWith(last10);

      const bReg = (b.registration_id || b.regId || '').toLowerCase().trim();
      const bPhone = (b.phone || '').replace(/\D/g, '');
      const bBoth = (bReg === appClean || bReg.includes(appClean) || (appSuffix && bReg.includes(appSuffix))) && bPhone.endsWith(last10);

      if (aBoth && !bBoth) return -1;
      if (!aBoth && bBoth) return 1;
      return 0;
    });
  }

  if (matched.length === 0) {
    const display = appId && inputPhone ? `${appId} / ${inputPhone}` : (appId || inputPhone || query);
    return res.json({
      status: 'success',
      found: false,
      count: 0,
      message: `No registration records found matching "${display}".`
    });
  }

  // Priority Rule:
  // 1. If payment is success/confirmed: DO NOT show pending status! Show ONLY the confirmed record.
  // 2. If payment is pending: show that pending status only (latest active attempt).
  const confirmedRecords = matched.filter(r => ['success', 'captured', 'paid', 'confirmed'].includes((r.payment_status || '').toLowerCase()));
  const pendingRecords   = matched.filter(r => (r.payment_status || '').toLowerCase() === 'pending');
  const failedRecords    = matched.filter(r => (r.payment_status || '').toLowerCase() === 'failed');

  let finalRecords = matched;
  if (confirmedRecords.length > 0) {
    // Confirmed exists: hide pending and failed records
    finalRecords = confirmedRecords;
  } else if (pendingRecords.length > 0) {
    // Only pending: show single latest pending record
    finalRecords = [pendingRecords[0]];
  } else if (failedRecords.length > 0) {
    finalRecords = [failedRecords[0]];
  }

  const activeRec = finalRecords[0];
  let cooloffActive = false;
  let remainingSeconds = 0;

  if (activeRec.payment_status === 'failed' && activeRec.updated_ts) {
    const elapsed = Math.floor(Date.now() / 1000) - Number(activeRec.updated_ts);
    if (elapsed < 900) {
      cooloffActive = true;
      remainingSeconds = 900 - elapsed;
    }
  }

  const hasSuccessful = confirmedRecords.length > 0;
  const hasPending = confirmedRecords.length === 0 && pendingRecords.length > 0;

  return res.json({
    status: 'success',
    found: true,
    already_registered: hasSuccessful || hasPending,
    is_confirmed: hasSuccessful,
    count: finalRecords.length,
    records: finalRecords,
    cooloff: {
      active: cooloffActive,
      remaining_seconds: remainingSeconds
    }
  });
}
