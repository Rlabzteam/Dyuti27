<?php
/**
 * DYUTI 2027 - Raw SMTP Mailer (PHP 5.6+ compatible)
 * Sends via fsockopen to localhost:25 (Exim on cPanel)
 * Strictly RFC 5321 & RFC 2045 compliant:
 * - quoted-printable encoding for text & HTML (never exceeds 76 chars/line)
 * - CRLF (\r\n) line endings everywhere
 * - chunk_split base64 attachments at 76 chars
 * - RFC 5321 dot-stuffing
 * - RFC 2047 MIME header encoding
 * - Chunked socket writes to prevent buffer truncation
 */

function dyutiSendMail($toEmail, $toName, $subject, $htmlBody, $plainBody = '', $attachments = array()) {
    $fromEmail = 'noreply@dyuti.in';
    $fromName  = 'DYUTI 2027 Portal';
    $smtpHost  = 'localhost';
    $smtpPort  = 25;

    if (empty($plainBody)) {
        $plainBody = strip_tags($htmlBody);
    }

    // Helper: Normalize any string's line breaks to standard CRLF (\r\n)
    $normalizeCrlf = function($str) {
        return str_replace("\n", "\r\n", str_replace(array("\r\n", "\r"), "\n", (string)$str));
    };

    // Helper: Encode text/html body as quoted-printable with <= 76 char lines
    $encodeQp = function($str) use ($normalizeCrlf) {
        $normalized = $normalizeCrlf($str);
        if (function_exists('quoted_printable_encode')) {
            $qp = quoted_printable_encode($normalized);
        } else {
            $qp = preg_replace_callback('/[^\x21-\x3C\x3E-\x7E\t ]/', function($m) {
                return sprintf('=%02X', ord($m[0]));
            }, $normalized);
        }
        return $normalizeCrlf($qp);
    };

    // Helper: RFC 2047 MIME-encode header strings (Subject, To name, From name)
    $encodeHeader = function($str) {
        $clean = preg_replace('/[\r\n]+/', ' ', (string)$str);
        if (preg_match('/^[\x20-\x7E]*$/', $clean)) {
            return $clean;
        }
        if (function_exists('mb_encode_mimeheader')) {
            return mb_encode_mimeheader($clean, 'UTF-8', 'B', "\r\n");
        }
        return '=?UTF-8?B?' . base64_encode($clean) . '?=';
    };

    // ── Build MIME message ────────────────────────────────────────────────────
    $mixedBoundary = 'DYUTI_MIX_' . md5(uniqid(time(), true));
    $altBoundary   = 'DYUTI_ALT_' . md5(uniqid(time() + 1, true));

    $hasAttachments = !empty($attachments);

    // Headers
    $msgHeaders  = 'Date: ' . date('r') . "\r\n";
    $msgHeaders .= 'From: ' . $encodeHeader($fromName) . ' <' . $fromEmail . ">\r\n";
    $msgHeaders .= 'To: ' . $encodeHeader($toName) . ' <' . $toEmail . ">\r\n";
    $msgHeaders .= 'Subject: ' . $encodeHeader($subject) . "\r\n";
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

    // Plain text part (quoted-printable ensures max 76 chars/line)
    $msgBody .= '--' . $altBoundary . "\r\n";
    $msgBody .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $msgBody .= "Content-Transfer-Encoding: quoted-printable\r\n\r\n";
    $msgBody .= $encodeQp($plainBody) . "\r\n\r\n";

    // HTML part (quoted-printable ensures max 76 chars/line)
    $msgBody .= '--' . $altBoundary . "\r\n";
    $msgBody .= "Content-Type: text/html; charset=UTF-8\r\n";
    $msgBody .= "Content-Transfer-Encoding: quoted-printable\r\n\r\n";
    $msgBody .= $encodeQp($htmlBody) . "\r\n\r\n";
    $msgBody .= '--' . $altBoundary . "--\r\n";

    // Attachments
    if ($hasAttachments) {
        foreach ($attachments as $att) {
            if (empty($att['data'])) continue;
            $filename = isset($att['filename']) ? basename($att['filename']) : 'attachment.pdf';
            $mime     = isset($att['type'])     ? $att['type']     : 'application/pdf';
            $b64      = chunk_split(base64_encode($att['data']), 76, "\r\n");
            $msgBody .= "\r\n--" . $mixedBoundary . "\r\n";
            $msgBody .= 'Content-Type: ' . $mime . '; name="' . $filename . '"' . "\r\n";
            $msgBody .= "Content-Transfer-Encoding: base64\r\n";
            $msgBody .= 'Content-Disposition: attachment; filename="' . $filename . '"' . "\r\n\r\n";
            $msgBody .= $b64;
        }
        $msgBody .= "\r\n--" . $mixedBoundary . "--\r\n";
    }

    // Dot-stuffing: Any line starting with '.' must be prepended with another '.' per RFC 5321 Section 4.5.2
    $msgBody = preg_replace('/^\./m', '..', $msgBody);

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

    // Send headers + blank line + body + end marker using chunked writes
    $payload = $msgHeaders . "\r\n" . $msgBody . "\r\n.\r\n";
    $payloadLen = strlen($payload);
    $written = 0;
    while ($written < $payloadLen) {
        $chunk = substr($payload, $written, 8192);
        $n = fwrite($fp, $chunk);
        if ($n === false || $n === 0) {
            fclose($fp);
            $err = 'Socket write error during DATA transmission';
            error_log('[DYUTI Mailer] ' . $err);
            return array('sent' => false, 'error' => $err);
        }
        $written += $n;
    }

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
