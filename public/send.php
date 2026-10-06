<?php
declare(strict_types=1);

/*
 * AF Elektra 2 — endpoint form contatti
 * Deploy: questo file va pubblicato su Aruba nella stessa origine del frontend
 *         es. https://www.afelektra.com/send.php  (il frontend fa fetch a "/send.php")
 * Flusso: browser --POST JSON--> send.php --mail()--> afelektra2@afelektra.com
 * Il browser da solo NON può inviare email: serve questo ponte server-side.
 */

header('Content-Type: application/json; charset=UTF-8');
header('X-Content-Type-Options: nosniff');

// ---------------------------------------------------------------- Config
const DESTINATARIO = 'afelektra2@afelektra.com';   // dove arrivano i preventivi
const MITTENTE_ADDR = 'afelektra2@afelektra.com';  // DEVE esistere come casella su Aruba (SPF/DKIM passano solo così)
const MITTENTE_NOME = 'Sito AF Elektra 2';

const MAX_PER_ORA = 5;     // max invii per IP per ora
const MIN_INTERVALLO = 30; // secondi minimi tra un invio e l'altro dallo stesso IP

const AREE_AMMESSE = ['', 'progettazione', 'pcb', 'smt', 'quadristica', 'plc', 'collaudo', 'altro'];
const AREE_LABEL = [
  'progettazione' => 'Progettazione Schede',
  'pcb'           => 'Realizzazione Master PCB',
  'smt'           => 'Montaggio SMT',
  'quadristica'   => 'Quadristica',
  'plc'           => 'Programmazione PLC',
  'collaudo'      => 'Saldatura/Collaudo',
  'altro'         => 'Altro',
];

// ------------------------------------------------------------ Helpers
function rispondi(bool $ok, string $msg = '', int $code = 200, array $extra = []): void
{
    http_response_code($code);
    echo json_encode(['ok' => $ok] + ($msg !== '' ? ['error' => $msg] : []) + $extra, JSON_UNESCAPED_UNICODE);
    exit;
}

function pulisci(string $s, int $max): string
{
    $s = trim(strip_tags($s));
    // normalizza spazi, rimuove caratteri di controllo (anti header-injection)
    $s = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]+/u', '', $s);
    $s = preg_replace('/[ \t]{2,}/u', ' ', $s);
    return mb_substr($s, 0, $max, 'UTF-8');
}

function haACapo(string $s): bool
{
    return (bool) preg_match("/[\r\n]/", $s);
}

// Preflight (innocuo in same-origin, utile se un giorno sposti il frontend)
if (($_SERVER['REQUEST_METHOD'] ?? '') === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    rispondi(false, 'Metodo non consentito.', 405);
}

// ------------------------------------------------------------ Lettura input (JSON o form)
$dati = [];
$contentType = $_SERVER['CONTENT_TYPE'] ?? '';
if (stripos($contentType, 'application/json') !== false) {
    $raw = file_get_contents('php://input');
    $decoded = json_decode($raw ?: '', true);
    if (is_array($decoded)) {
        $dati = $decoded;
    }
} else {
    $dati = $_POST;
}
if (!is_array($dati) || $dati === []) {
    // fallback: prova comunque a decodificare il body come JSON
    $raw = file_get_contents('php://input');
    $decoded = json_decode($raw ?: '', true);
    if (is_array($decoded) && $decoded !== []) {
        $dati = $decoded;
    }
}

// ------------------------------------------------------------ Honeypot anti-bot
// Campo invisibile "website": gli umani lo lasciano vuoto, i bot lo riempiono.
// Se pieno -> finto successo (il bot crede di avercela fatta, tu non ricevi spam).
$honeypot = trim((string) ($dati['website'] ?? $dati['azienda_website'] ?? $dati['company'] ?? ''));
if ($honeypot !== '') {
    rispondi(true); // 200 ok, nessuna email inviata
}

// ------------------------------------------------------------ Validazione server
$nome      = pulisci((string) ($dati['nome'] ?? ''), 120);
$emailRaw  = trim((string) ($dati['email'] ?? ''));
$telefono  = pulisci((string) ($dati['telefono'] ?? ''), 40);
$area      = trim((string) ($dati['area'] ?? ''));
$messaggio = pulisci((string) ($dati['messaggio'] ?? ''), 5000);
$privacy   = $dati['privacy'] ?? false;
$privacyOk = $privacy === true || $privacy === 1 || $privacy === '1' || $privacy === 'true' || $privacy === 'on';

if (mb_strlen($nome, 'UTF-8') < 2) {
    rispondi(false, 'Inserisci il tuo nome o la ragione sociale.', 400);
}
if (haACapo($nome) || haACapo($emailRaw)) {
    rispondi(false, 'Dati non validi.', 400);
}
$email = filter_var(mb_substr($emailRaw, 0, 254), FILTER_VALIDATE_EMAIL);
if ($email === false) {
    rispondi(false, 'Inserisci un indirizzo email valido.', 400);
}
if ($telefono !== '' && !preg_match('/^[\d\s+\-().\/]{3,40}$/', $telefono)) {
    rispondi(false, 'Numero di telefono non valido.', 400);
}
if (!in_array($area, AREE_AMMESSE, true)) {
    rispondi(false, 'Area di interesse non valida.', 400);
}
if (mb_strlen($messaggio, 'UTF-8') < 10) {
    rispondi(false, 'Descrivi la richiesta in almeno 10 caratteri.', 400);
}
if (!$privacyOk) {
    rispondi(false, 'Devi accettare la Privacy Policy per inviare la richiesta.', 400);
}

// ------------------------------------------------------------ Rate-limit per IP (file-based, funziona su hosting condiviso)
$ip = $_SERVER['REMOTE_ADDR'] ?? 'sconosciuto';
$dir = rtrim(sys_get_temp_dir(), '/\\') . '/af_elektra_ratelimit';
if (!is_dir($dir)) {
    @mkdir($dir, 0700, true);
}
$rateFile = $dir . '/rl_' . md5($ip) . '.json';
$ora = time();
$stato = ['count' => 0, 'window_start' => $ora, 'last' => 0];
if (is_file($rateFile)) {
    $letto = json_decode(@file_get_contents($rateFile) ?: '', true);
    if (is_array($letto)) {
        $stato = [
            'count'        => (int) ($letto['count'] ?? 0),
            'window_start' => (int) ($letto['window_start'] ?? $ora),
            'last'         => (int) ($letto['last'] ?? 0),
        ];
    }
}
if ($ora - $stato['window_start'] > 3600) {
    $stato = ['count' => 0, 'window_start' => $ora, 'last' => $stato['last']];
}
if ($ora - $stato['last'] < MIN_INTERVALLO) {
    rispondi(false, 'Attendi qualche secondo prima di inviare un\'altra richiesta.', 429);
}
if ($stato['count'] >= MAX_PER_ORA) {
    rispondi(false, 'Hai inviato troppe richieste. Riprova tra un po\' oppure chiamaci allo 030 2130630.', 429);
}
$stato['count']++;
$stato['last'] = $ora;
@file_put_contents($rateFile, json_encode($stato), LOCK_EX);

// ------------------------------------------------------------ Composizione email
$areaLabel = $area !== '' ? ($AREE_LABEL[$area] ?? $area) : 'Non specificata';
$oggetto = '[Sito AF Elektra] Nuova richiesta da ' . mb_substr($nome, 0, 80, 'UTF-8');
if ($area !== '') {
    $oggetto .= ' — ' . $areaLabel;
}
$oggetto = str_replace(["\r", "\n"], ' ', $oggetto);

$dataInvio = date('d/m/Y H:i:s');
$userAgent = mb_substr($_SERVER['HTTP_USER_AGENT'] ?? 'n/d', 0, 200);

$corpo = "Nuova richiesta dal sito AF Elektra 2\n"
    . "----------------------------------------\n"
    . "Nome / Azienda: {$nome}\n"
    . "Email: {$email}\n"
    . "Telefono: " . ($telefono !== '' ? $telefono : 'Non indicato') . "\n"
    . "Area di interesse: {$areaLabel}\n"
    . "Consenso privacy: sì (checkbox informativa art. 13)\n"
    . "Data invio: {$dataInvio}\n"
    . "IP mittente: {$ip}\n"
    . "User-Agent: {$userAgent}\n"
    . "----------------------------------------\n"
    . "Messaggio:\n{$messaggio}\n";

// Mittente del dominio (altrimenti Aruba/SPF scarta o va in spam).
// Reply-To = utente, così rispondi alla richiesta con un click.
$headers = [];
$headers[] = 'From: ' . MITTENTE_NOME . ' <' . MITTENTE_ADDR . '>';
$headers[] = 'Reply-To: ' . $nome . ' <' . $email . '>';
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-Type: text/plain; charset=UTF-8';
$headers[] = 'Content-Transfer-Encoding: 8bit';
$headers[] = 'X-Mailer: AF-Elektra-PHP/' . phpversion();

$inviata = @mail(DESTINATARIO, $oggetto, $corpo, implode("\r\n", $headers));

if (!$inviata) {
    error_log('[AF Elektra] mail() fallita da ' . $ip . ' per ' . $email);
    rispondi(false, 'Invio non riuscito. Riprova tra poco oppure scrivici a ' . DESTINATARIO . '.', 500);
}

rispondi(true);
