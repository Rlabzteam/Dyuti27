// api/send_registration_notification.js
// Vercel Serverless Function & Node.js Endpoint for DYUTI 2027 Registration Notifications

export default async function handler(req, res) {
  // 1. CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ status: 'error', message: 'Method not allowed' });
  }

  try {
    const data = req.body || {};

    const title              = String(data.title || 'Dr.').trim();
    const fullName           = String(data.name || data.full_name || 'Participant').trim();
    const designation        = String(data.designation || 'N/A').trim();
    const gender             = String(data.gender || 'N/A').trim();
    const organization       = String(data.organization || 'N/A').trim();
    const discipline         = String(data.discipline || 'Social Work').trim();

    const address            = String(data.address || 'N/A').trim();
    const pincode            = String(data.pincode || 'N/A').trim();
    const phone              = String(data.phone || data.mobile || 'N/A').trim();
    const email              = String(data.email || '').trim();

    const foodPref           = String(data.foodPreference || data.food_preference || 'veg').toLowerCase();
    const foodLabel          = foodPref === 'non-veg' ? 'Non-Vegetarian' : 'Vegetarian';

    const requireAccom       = String(data.requireAccommodation || data.require_accommodation || 'no').toLowerCase();
    const accomLabel         = requireAccom === 'yes' ? 'Yes (Moderate Accommodation requested)' : 'No (Arranging own stay)';

    const isPresenting       = String(data.isPresentingPaper || data.is_presenting_paper || 'no').toLowerCase();
    const presentingLabel    = isPresenting === 'yes' ? 'Yes (Author / Presenter)' : 'No (Delegate / Attendee)';

    const paperTitle         = String(data.paperTitle || data.paper_title || '').trim();
    const cmtPaperId         = String(data.cmtPaperId || data.cmt_paper_id || '').trim();
    const paperTheme         = String(data.paperTheme || data.paper_theme || '').trim();

    const categoryLabel      = String(data.categoryLabel || data.category || 'UG / PG Student').trim();
    const amount             = String(data.amount || '750').trim();
    const currency           = String(data.currency || 'INR').trim().toUpperCase();

    const regId              = String(data.regId || data.registration_id || `DYUTI27-ONLINE-${Math.floor(10000 + Math.random() * 90000)}`);
    const vortexTxId         = String(data.vortex_transaction_id || data.transaction_id || 'N/A');
    const paymentStatus      = String(data.payment_status || 'SUCCESS').toUpperCase();
    const dateTime           = String(data.date_time || new Date().toISOString().replace('T', ' ').substring(0, 19));

    const to = 'dyuti@rajagiri.edu';
    const subject = `DYUTI 2027 Registration & Payment Confirmed: ${title} ${fullName} [${vortexTxId}]`;

    // Plain text summary for email/logging
    const textSummary = `
====================================================
DYUTI 2027 - REGISTRATION & PAYMENT CONFIRMED
====================================================

New delegate registration and verified payment received via Vortexx Payment Gateway.

TRANSACTION DETAILS:
--------------------
Registration ID:        ${regId}
Vortexx Transaction ID: ${vortexTxId}
Amount:                 INR ${amount}
Payment Status:         ${paymentStatus}
Date/Time:              ${dateTime}
Registration Category:  ${categoryLabel}

PARTICIPANT DETAILS:
--------------------
Name:                   ${title} ${fullName}
Designation:            ${designation}
Gender:                 ${gender}
Organization:           ${organization}
Discipline:             ${discipline}
Email:                  ${email}
Phone:                  ${phone}
Address:                ${address}
PIN Code:               ${pincode}

LOGISTICS & PREFERENCES:
------------------------
Food Preference:        ${foodLabel}
Accommodation:          ${accomLabel}
Paper Presenter:        ${presentingLabel}
${isPresenting === 'yes' || paperTitle ? `Paper Title:            ${paperTitle}\nCMT Paper ID:           ${cmtPaperId}\nTheme Track:            ${paperTheme}\n` : ''}
--
DYUTI 2027 Conference Secretariat, Rajagiri College of Social Sciences
dyuti@rajagiri.edu
`;

    console.log(`[DYUTI Notification Dispatch] Email queued for ${to} regarding ${fullName} (${vortexTxId})`);

    // If an external email provider API key is provided (e.g. RESEND_API_KEY), send via standard REST API
    if (process.env.RESEND_API_KEY) {
      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            from: 'DYUTI 2027 Portal <noreply@dyuti.in>',
            to: [to],
            reply_to: email || undefined,
            subject: subject,
            text: textSummary
          })
        });
      } catch (err) {
        console.warn('Resend email API delivery error:', err);
      }
    }

    return res.status(200).json({
      status: 'success',
      recipient: to,
      registration_id: regId,
      vortex_transaction_id: vortexTxId,
      message: `Registration notification acknowledged for Secretariat at ${to}`
    });

  } catch (error) {
    console.error('send_registration_notification error:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Failed to process registration notification: ' + error.message
    });
  }
}
