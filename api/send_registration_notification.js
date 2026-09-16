// api/send_registration_notification.js
// DYUTI 2027 — Registration Notification Handler
// Generates a PDF registration slip and emails it to dyuti@rajagiri.edu
// Uses Nodemailer (Gmail SMTP) — no external service account needed
//
// Required .env variables:
//   SMTP_USER=yourgmail@gmail.com
//   SMTP_PASS=your-gmail-app-password   (16-char App Password from Google Account)
//
// Optional (defaults to Gmail):
//   SMTP_HOST=smtp.gmail.com
//   SMTP_PORT=465
//   SMTP_FROM=DYUTI 2027 <yourgmail@gmail.com>

import { createRequire } from 'module';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const require = createRequire(import.meta.url);
const PDFDocument  = require('pdfkit');
const nodemailer   = require('nodemailer');

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ── PDF Generator ─────────────────────────────────────────────────────────────
function generateRegistrationPdf(fields) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    const doc = new PDFDocument({ size: 'A4', margin: 50, compress: false });
    doc.on('data', c => chunks.push(c));
    doc.on('end',  () => resolve(Buffer.concat(chunks)));
    doc.on('error', reject);

    const {
      regId, vortexTxId, amount, currency, paymentStatus, dateTime,
      title, fullName, designation, gender, organization, discipline,
      email, phone, address, pincode,
      categoryLabel, foodLabel, accomLabel, presentingLabel,
      paperTitle, cmtPaperId, paperTheme
    } = fields;

    const PRIMARY = '#071A33';
    const ACCENT  = '#1E4FA0';
    const GREEN   = '#16A34A';
    const GRAY    = '#64748B';
    const LIGHT   = '#F1F5F9';
    const WHITE   = '#FFFFFF';

    // Header band
    doc.rect(0, 0, doc.page.width, 120).fill(PRIMARY);
    doc.fontSize(22).fillColor(WHITE).font('Helvetica-Bold').text('DYUTI 2027', 50, 28);
    doc.fontSize(9).fillColor('#94A3B8').font('Helvetica')
       .text('International Conference on Transcending Boundaries', 50, 54)
       .text('Rajagiri College of Social Sciences, Kochi', 50, 66);
    doc.fontSize(10).fillColor('#FCD34D').font('Helvetica-Bold').text('OFFICIAL REGISTRATION SLIP', 50, 88);

    // Payment badge (top right)
    doc.roundedRect(doc.page.width - 200, 28, 155, 70, 8).fill(GREEN);
    doc.fontSize(11).fillColor(WHITE).font('Helvetica-Bold')
       .text('PAYMENT VERIFIED', doc.page.width - 200, 40, { width: 155, align: 'center' });
    doc.fontSize(8).fillColor(WHITE).font('Helvetica')
       .text(paymentStatus, doc.page.width - 200, 56, { width: 155, align: 'center' })
       .text(dateTime, doc.page.width - 200, 68, { width: 155, align: 'center' });

    // IDs + Amount bar
    const y1 = 140;
    doc.rect(50, y1, doc.page.width - 100, 60).fill(LIGHT);
    doc.fontSize(8).fillColor(GRAY).font('Helvetica')
       .text('REGISTRATION ID', 70, y1 + 10)
       .text('TRANSACTION ID', 310, y1 + 10)
       .text('AMOUNT PAID', doc.page.width - 160, y1 + 10);
    doc.fontSize(12).fillColor(PRIMARY).font('Helvetica-Bold')
       .text(regId, 70, y1 + 26)
       .text(vortexTxId, 310, y1 + 26);
    doc.fontSize(16).fillColor(GREEN).font('Helvetica-Bold')
       .text(`${currency} ${parseFloat(amount).toLocaleString('en-IN')}`, doc.page.width - 160, y1 + 22, { width: 110, align: 'right' });
    doc.rect(50, y1 + 60, doc.page.width - 100, 1).fill('#CBD5E1');

    // Section helpers
    function sectionHeader(label, yPos) {
      doc.rect(50, yPos, doc.page.width - 100, 22).fill(ACCENT);
      doc.fontSize(9).fillColor(WHITE).font('Helvetica-Bold').text(label, 60, yPos + 6);
      return yPos + 22;
    }
    function row(label, value, yPos) {
      doc.fontSize(8).fillColor(GRAY).font('Helvetica').text(label, 60, yPos);
      doc.fontSize(9).fillColor(PRIMARY).font('Helvetica-Bold').text(value || 'N/A', 210, yPos, { width: doc.page.width - 270 });
      return yPos + 17;
    }

    // Participant Details
    let y = sectionHeader('PARTICIPANT DETAILS', 218);
    y = row('Full Name',                 `${title} ${fullName}`,  y + 5);
    y = row('Designation',               designation,             y);
    y = row('Gender',                    gender,                  y);
    y = row('Organization / Institution', organization,           y);
    y = row('Discipline / Department',   discipline,              y);
    y = row('Email Address',             email,                   y);
    y = row('Contact Number',            phone,                   y);
    y = row('Address',                   address,                 y);
    y = row('PIN Code',                  pincode,                 y);

    // Registration Category
    y += 8; y = sectionHeader('REGISTRATION CATEGORY', y);
    y = row('Category',        categoryLabel,                              y + 5);
    y = row('Fee Paid',        `${currency} ${parseFloat(amount).toLocaleString('en-IN')}`, y);

    // Logistics
    y += 8; y = sectionHeader('LOGISTICS & PREFERENCES', y);
    y = row('Food Preference',       foodLabel,       y + 5);
    y = row('Accommodation',         accomLabel,      y);
    y = row('Presenting a Paper',    presentingLabel, y);
    if (paperTitle)  y = row('Paper Title',   paperTitle,  y);
    if (cmtPaperId)  y = row('CMT Paper ID',  cmtPaperId,  y);
    if (paperTheme)  y = row('Theme Track',   paperTheme,  y);

    // Notes
    y += 12;
    doc.rect(50, y, doc.page.width - 100, 1).fill('#CBD5E1');
    y += 10;
    doc.fontSize(8).fillColor(GRAY).font('Helvetica-Bold').text('IMPORTANT NOTES', 60, y);
    y += 13;
    [
      '• Please carry this receipt to the conference check-in desk (digital or printed).',
      '• Conference kits, lunch, and tea will be provided as per registration.',
      '• Certificate of participation will be issued on the final day of the conference.',
      '• For queries, contact the secretariat at dyuti@rajagiri.edu'
    ].forEach(note => {
      doc.fontSize(8).fillColor('#475569').font('Helvetica').text(note, 60, y, { width: doc.page.width - 120 });
      y += 14;
    });

    // Footer band
    const footerY = doc.page.height - 58;
    doc.rect(0, footerY, doc.page.width, 58).fill(PRIMARY);
    doc.fontSize(8).fillColor('#94A3B8').font('Helvetica')
       .text('DYUTI 2027 Conference Secretariat  |  Rajagiri College of Social Sciences, Kalamassery, Kochi — 683104', 50, footerY + 12, { align: 'center', width: doc.page.width - 100 })
       .text('dyuti@rajagiri.edu  |  www.rajagiritech.edu.in', 50, footerY + 26, { align: 'center', width: doc.page.width - 100 });
    doc.fontSize(7).fillColor('#475569')
       .text(`Generated: ${new Date().toLocaleString('en-IN')}  |  Reg: ${regId}`, 50, footerY + 40, { align: 'center', width: doc.page.width - 100 });

    doc.end();
  });
}

// ── Create SMTP transporter ───────────────────────────────────────────────────
function createTransporter() {
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!user || !pass) return null;

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '465'),
    secure: true,  // SSL — port 465
    auth: { user, pass },
    tls: { rejectUnauthorized: false }
  });
}

// ── Main Handler ──────────────────────────────────────────────────────────────
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ status: 'error', message: 'Method not allowed' });

  try {
    const data = req.body || {};

    // Parse all fields
    const title           = String(data.title || 'Dr.').trim();
    const fullName        = String(data.name || data.full_name || 'Participant').trim();
    const designation     = String(data.designation || 'N/A').trim();
    const gender          = String(data.gender || 'N/A').trim();
    const organization    = String(data.organization || 'N/A').trim();
    const discipline      = String(data.discipline || 'Social Work').trim();
    const address         = String(data.address || 'N/A').trim();
    const pincode         = String(data.pincode || 'N/A').trim();
    const phone           = String(data.phone || data.mobile || 'N/A').trim();
    const email           = String(data.email || '').trim();
    const foodPref        = String(data.foodPreference || 'veg').toLowerCase();
    const foodLabel       = foodPref === 'non-veg' ? 'Non-Vegetarian' : 'Vegetarian';
    const requireAccom    = String(data.requireAccommodation || 'no').toLowerCase();
    const accomLabel      = requireAccom === 'yes' ? 'Yes (Moderate Accommodation requested)' : 'No (Arranging own stay)';
    const isPresenting    = String(data.isPresentingPaper || 'no').toLowerCase();
    const presentingLabel = isPresenting === 'yes' ? 'Yes (Author / Presenter)' : 'No (Delegate / Attendee)';
    const paperTitle      = String(data.paperTitle || '').trim();
    const cmtPaperId      = String(data.cmtPaperId || '').trim();
    const paperTheme      = String(data.paperTheme || '').trim();
    const categoryLabel   = String(data.categoryLabel || 'UG / PG Student').trim();
    const amount          = String(data.amount || '750').trim();
    const currency        = String(data.currency || 'INR').trim().toUpperCase();
    const regId           = String(data.regId || `DYUTI27-ONLINE-${Math.floor(10000 + Math.random() * 90000)}`);
    const vortexTxId      = String(data.vortex_transaction_id || data.transaction_id || 'N/A');
    const paymentStatus   = String(data.payment_status || 'SUCCESS').toUpperCase();
    const dateTime        = String(data.date_time || new Date().toISOString().replace('T', ' ').substring(0, 19));

    console.log(`[DYUTI] Processing notification for ${fullName} (${vortexTxId})`);

    // ── Generate PDF ──────────────────────────────────────────────────────────
    let pdfBuffer = null;
    let pdfSavePath = null;
    try {
      pdfBuffer = await generateRegistrationPdf({
        regId, vortexTxId, amount, currency, paymentStatus, dateTime,
        title, fullName, designation, gender, organization, discipline,
        email, phone, address, pincode,
        categoryLabel, foodLabel, accomLabel, presentingLabel,
        paperTitle, cmtPaperId, paperTheme
      });

      // Save to disk (works in local dev; on Vercel use just as in-memory buffer)
      try {
        const registrationsDir = path.join(__dirname, '..', 'registrations');
        if (!existsSync(registrationsDir)) mkdirSync(registrationsDir, { recursive: true });
        const fname = `${regId}-${vortexTxId.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`;
        pdfSavePath = path.join(registrationsDir, fname);
        writeFileSync(pdfSavePath, pdfBuffer);
        console.log(`[DYUTI] PDF saved: ${pdfSavePath}`);
      } catch (saveErr) {
        // Vercel has read-only filesystem outside /tmp — non-fatal
        console.warn('[DYUTI] Could not save PDF to disk (expected on Vercel):', saveErr.message);
      }
    } catch (pdfErr) {
      console.error('[DYUTI] PDF generation failed:', pdfErr.message);
    }

    // ── Send email via Gmail SMTP (Nodemailer) ────────────────────────────────
    const to = 'dyuti@rajagiri.edu';
    const subject = `DYUTI 2027 Registration Confirmed: ${title} ${fullName} [${regId}]`;

    const textBody = [
      '====================================================',
      'DYUTI 2027 - REGISTRATION & PAYMENT CONFIRMED',
      '====================================================',
      `Registration ID:        ${regId}`,
      `Vortexx Transaction ID: ${vortexTxId}`,
      `Amount:                 ${currency} ${amount}`,
      `Payment Status:         ${paymentStatus}`,
      `Date/Time:              ${dateTime}`,
      '',
      'PARTICIPANT DETAILS',
      `Name:            ${title} ${fullName}`,
      `Designation:     ${designation}`,
      `Organization:    ${organization}`,
      `Email:           ${email}`,
      `Phone:           ${phone}`,
      `Address:         ${address}, PIN: ${pincode}`,
      '',
      'LOGISTICS',
      `Category:        ${categoryLabel}`,
      `Food:            ${foodLabel}`,
      `Accommodation:   ${accomLabel}`,
      `Paper Presenter: ${presentingLabel}`,
      paperTitle ? `Paper Title:     ${paperTitle}` : '',
      '',
      '--',
      'DYUTI 2027 Secretariat | dyuti@rajagiri.edu'
    ].filter(Boolean).join('\n');

    let emailSent = false;
    const transporter = createTransporter();

    if (transporter) {
      try {
        const mailOptions = {
          from: process.env.SMTP_FROM || `DYUTI 2027 <${process.env.SMTP_USER}>`,
          to: email ? `${to}, ${email}` : to,
          subject,
          text: textBody,
          attachments: pdfBuffer ? [{
            filename: `DYUTI2027-Registration-${regId}.pdf`,
            content:  pdfBuffer,
            contentType: 'application/pdf'
          }] : []
        };

        await transporter.sendMail(mailOptions);
        emailSent = true;
        console.log(`[DYUTI] Email sent via Gmail SMTP to ${to}${email ? ` + ${email}` : ''}${pdfBuffer ? ' [with PDF]' : ''}`);
      } catch (smtpErr) {
        console.error('[DYUTI] SMTP send error:', smtpErr.message);
      }
    } else {
      // No SMTP credentials set — log the full summary locally
      console.log('[DYUTI] No SMTP_USER/SMTP_PASS set. Email skipped. Summary:');
      console.log(textBody);
    }

    return res.status(200).json({
      status: 'success',
      recipient: to,
      registration_id: regId,
      vortex_transaction_id: vortexTxId,
      pdf_generated: !!pdfBuffer,
      email_sent: emailSent,
      message: [
        `Notification processed for ${title} ${fullName}.`,
        pdfBuffer   ? 'PDF generated.' : 'PDF skipped.',
        emailSent   ? `Email with PDF sent to ${to}.` : 'Email skipped — add SMTP_USER and SMTP_PASS to .env.'
      ].join(' ')
    });

  } catch (error) {
    console.error('[DYUTI] Unhandled error:', error);
    return res.status(500).json({ status: 'error', message: 'Notification error: ' + error.message });
  }
}
