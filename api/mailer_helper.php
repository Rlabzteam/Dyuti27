<?php
/**
 * DYUTI 2027 — Shared PHPMailer Helper
 * Sends via cPanel localhost:25 (most reliable on shared cPanel hosting).
 * No SMTP authentication needed — PHP runs on the same server as Exim.
 */

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception as PHPMailerException;

require_once __DIR__ . '/PHPMailer/Exception.php';
require_once __DIR__ . '/PHPMailer/PHPMailer.php';
require_once __DIR__ . '/PHPMailer/SMTP.php';

function dyutiSendMail($toEmail, $toName, $subject, $htmlBody, $plainBody = '', $attachments = []) {

    $fromEmail = 'noreply@dyuti.in';
    $fromName  = 'DYUTI 2027 Portal';

    $mail = new PHPMailer(true);
    try {
        // Use cPanel localhost SMTP — no auth needed, bypasses MX records
        $mail->isSMTP();
        $mail->Host       = 'localhost';
        $mail->Port       = 25;
        $mail->SMTPAuth   = false;          // No auth on localhost
        $mail->SMTPSecure = '';             // No SSL on localhost
        $mail->CharSet    = 'UTF-8';
        $mail->Timeout    = 30;

        $mail->setFrom($fromEmail, $fromName);
        $mail->addAddress($toEmail, $toName);
        $mail->addReplyTo($fromEmail, $fromName);

        $mail->isHTML(true);
        $mail->Subject = $subject;
        $mail->Body    = $htmlBody;
        $mail->AltBody = !empty($plainBody) ? $plainBody : strip_tags($htmlBody);

        foreach ($attachments as $att) {
            if (!empty($att['data'])) {
                $mail->addStringAttachment(
                    $att['data'],
                    $att['filename'],
                    PHPMailer::ENCODING_BASE64,
                    $att['type'] ?? 'application/pdf'
                );
            }
        }

        $mail->send();
        error_log('[DYUTI Mailer] Email sent to ' . $toEmail . ' via localhost:25');
        return ['sent' => true, 'error' => null];

    } catch (PHPMailerException $e) {
        error_log('[DYUTI Mailer] FAILED to ' . $toEmail . ': ' . $mail->ErrorInfo);
        return ['sent' => false, 'error' => $mail->ErrorInfo];
    } catch (Exception $e) {
        error_log('[DYUTI Mailer] Unexpected error: ' . $e->getMessage());
        return ['sent' => false, 'error' => $e->getMessage()];
    }
}
