<?php
/**
 * DYUTI 2027 - Raw SMTP Mailer (PHP 5.6 compatible)
 * Sends via fsockopen to localhost:25 (Exim on cPanel)
 * No PHPMailer or mail() needed — raw SMTP confirmed working.
 */

function dyutiSendMail($toEmail, $toName, $subject, $htmlBody, $plainBody = '', $attachments = array()) {
    $fromEmail = 'noreply@dyuti.in';
    $fromName  = 'DYUTI 2027 Portal';
    $smtpHost  = 'localhost';
    $smtpPort  = 25;

    if (empty($plainBody)) {
        $plainBody = strip_tags($htmlBody);
    }

    // ── Build MIME message ────────────────────────────────────────────────────
    $mixedBoundary = 'DYUTI_MIX_' . md5(uniqid(time(), true));
    $altBoundary   = 'DYUTI_ALT_' . md5(uniqid(time() + 1, true));

    $hasAttachments = !empty($attachments);

    // Headers
    $msgHeaders  = 'Date: ' . date('r') . "\r\n";
    $msgHeaders .= 'From: ' . $fromName . ' <' . $fromEmail . ">\r\n";
    $msgHeaders .= 'To: ' . $toName . ' <' . $toEmail . ">\r\n";
    $msgHeaders .= 'Subject: ' . $subject . "\r\n";
    $msgHeaders .= 'MIME-Version: 1.0' . "\r\n";
    $msgHeaders .= 'X-Mailer: DYUTI-RawSMTP/1.0' . "\r\n";

    if ($hasAttachments) {
        $msgHeaders .= 'Content-Type: multipart/mixed; boundary="' . $mixedBoundary . '"' . "\r\n";
    } else {
        $msgHeaders .= 'Content-Type: multipart/alternative; boundary="' . $altBoundary . '"' . "\r\n";
    }

    // Body
    $msgBody = '';

    if ($hasAttachments) {
        $msgBody .= '--' . $mixedBoundary . "\r\n";
        $msgBody .= 'Content-Type: multipart/alternative; boundary="' . $altBoundary . '"' . "\r\n\r\n";
    }

    // Plain text part
    $msgBody .= '--' . $altBoundary . "\r\n";
    $msgBody .= 'Content-Type: text/plain; charset=UTF-8' . "\r\n";
    $msgBody .= 'Content-Transfer-Encoding: 8bit' . "\r\n\r\n";
    $msgBody .= $plainBody . "\r\n\r\n";

    // HTML part
    $msgBody .= '--' . $altBoundary . "\r\n";
    $msgBody .= 'Content-Type: text/html; charset=UTF-8' . "\r\n";
    $msgBody .= 'Content-Transfer-Encoding: 8bit' . "\r\n\r\n";
    $msgBody .= $htmlBody . "\r\n\r\n";
    $msgBody .= '--' . $altBoundary . "--\r\n";

    // Attachments
    if ($hasAttachments) {
        foreach ($attachments as $att) {
            if (empty($att['data'])) continue;
            $filename = isset($att['filename']) ? $att['filename'] : 'attachment.pdf';
            $mime     = isset($att['type'])     ? $att['type']     : 'application/pdf';
            $b64      = chunk_split(base64_encode($att['data']));
            $msgBody .= "\r\n--" . $mixedBoundary . "\r\n";
            $msgBody .= 'Content-Type: ' . $mime . '; name="' . $filename . '"' . "\r\n";
            $msgBody .= 'Content-Transfer-Encoding: base64' . "\r\n";
            $msgBody .= 'Content-Disposition: attachment; filename="' . $filename . '"' . "\r\n\r\n";
            $msgBody .= $b64 . "\r\n";
        }
        $msgBody .= '--' . $mixedBoundary . "--\r\n";
    }

    // Dot-stuffing: lines starting with '.' must be doubled per RFC 5321
    $msgBody = preg_replace('/^\.$/m', '..', $msgBody);

    // ── SMTP conversation ─────────────────────────────────────────────────────
    $fp = @fsockopen($smtpHost, $smtpPort, $errno, $errstr, 15);
    if (!$fp) {
        $err = 'Cannot connect to ' . $smtpHost . ':' . $smtpPort . ' — ' . $errstr;
        error_log('[DYUTI Mailer] ' . $err);
        return array('sent' => false, 'error' => $err);
    }

    stream_set_timeout($fp, 15);

    $smtpRead = function() use ($fp) {
        $response = '';
        while ($line = fgets($fp, 512)) {
            $response .= $line;
            if (substr($line, 3, 1) === ' ') break;
        }
        return $response;
    };

    $smtpSend = function($cmd) use ($fp) {
        fputs($fp, $cmd . "\r\n");
    };

    $smtpOk = function($response) {
        $code = (int)substr($response, 0, 3);
        return ($code >= 200 && $code < 400);
    };

    $smtpRead(); // banner

    $smtpSend('EHLO dyuti.in');
    $smtpRead();

    $smtpSend('MAIL FROM: <' . $fromEmail . '>');
    $r = $smtpRead();
    if (!$smtpOk($r)) {
        fclose($fp);
        $err = 'MAIL FROM rejected: ' . trim($r);
        error_log('[DYUTI Mailer] ' . $err);
        return array('sent' => false, 'error' => $err);
    }

    $smtpSend('RCPT TO: <' . $toEmail . '>');
    $r = $smtpRead();
    if (!$smtpOk($r)) {
        fclose($fp);
        $err = 'RCPT TO rejected: ' . trim($r);
        error_log('[DYUTI Mailer] ' . $err);
        return array('sent' => false, 'error' => $err);
    }

    $smtpSend('DATA');
    $r = $smtpRead();
    if (!$smtpOk($r)) {
        fclose($fp);
        $err = 'DATA rejected: ' . trim($r);
        error_log('[DYUTI Mailer] ' . $err);
        return array('sent' => false, 'error' => $err);
    }

    // Send headers + blank line + body + end marker
    fputs($fp, $msgHeaders . "\r\n" . $msgBody . "\r\n.\r\n");
    $r = $smtpRead();

    $smtpSend('QUIT');
    fclose($fp);

    if (!$smtpOk($r)) {
        $err = 'Message rejected: ' . trim($r);
        error_log('[DYUTI Mailer] ' . $err . ' | To: ' . $toEmail);
        return array('sent' => false, 'error' => $err);
    }

    error_log('[DYUTI Mailer] Sent to ' . $toEmail . ' | Subject: ' . $subject);
    return array('sent' => true, 'error' => null);
}
