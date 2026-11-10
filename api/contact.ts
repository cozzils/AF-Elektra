/**
 * Vercel Serverless Function — invio modulo contatti.
 *
 * Variabili d'ambiente (Project → Settings → Environment Variables):
 *   RESEND_API_KEY   chiave Resend (consigliata)
 *   CONTACT_TO       destinatario (default: afelektra2@afelektra.com)
 *   CONTACT_FROM     mittente verificato su Resend (default: AF Elektra 2 <no-reply@afelektra.com>)
 *   CONTACT_WEBHOOK_URL  alternativa a Resend: inoltra il JSON a un webhook
 *   CONTACT_DEBUG=1  non invia nulla, scrive il payload nei log (solo per test)
 */

interface ApiRequest {
  method?: string;
  body?: unknown;
  headers: Record<string, string | string[] | undefined>;
  socket?: { remoteAddress?: string };
}

interface ApiResponse {
  statusCode: number;
  setHeader(name: string, value: string): void;
  end(chunk?: string): void;
}

interface ContactPayload {
  nome?: unknown;
  email?: unknown;
  telefono?: unknown;
  area?: unknown;
  messaggio?: unknown;
  privacy?: unknown;
  website?: unknown;
}

const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 6;
const buckets = new Map<string, number[]>();

function json(res: ApiResponse, status: number, body: Record<string, unknown>) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(body));
}

function text(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function singleLine(value: string): string {
  return value.replace(/[\r\n]+/g, ' ').trim();
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();

  // Evita che la mappa cresca senza limite in un'istanza "calda".
  if (buckets.size > 5000) {
    for (const [key, times] of buckets) {
      if (times.every((t) => now - t >= WINDOW_MS)) buckets.delete(key);
    }
  }

  const recent = (buckets.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    buckets.set(ip, recent);
    return true;
  }
  recent.push(now);
  buckets.set(ip, recent);
  return false;
}

function readBody(body: unknown): ContactPayload {
  if (body && typeof body === 'object') return body as ContactPayload;
  if (typeof body === 'string') {
    try {
      return JSON.parse(body) as ContactPayload;
    } catch {
      return {};
    }
  }
  return {};
}

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return json(res, 405, { ok: false, error: 'Metodo non consentito.' });
  }

  const ip = req.socket?.remoteAddress || text(req.headers['x-forwarded-for']).split(',')[0] || 'unknown';
  if (isRateLimited(ip)) {
    return json(res, 429, {
      ok: false,
      error: 'Hai inviato troppe richieste. Riprova tra un’ora oppure chiamaci allo 030 2130630.',
    });
  }

  const payload = readBody(req.body);

  // Honeypot: i bot lo compilano, gli umani no. Rispondiamo ok senza inviare.
  if (text(payload.website) !== '') {
    return json(res, 200, { ok: true });
  }

  const nome = singleLine(text(payload.nome));
  const email = singleLine(text(payload.email));
  const telefono = singleLine(text(payload.telefono));
  const area = singleLine(text(payload.area));
  const messaggio = text(payload.messaggio);
  const privacy = payload.privacy === true || payload.privacy === 'true';

  if (!privacy) {
    return json(res, 400, { ok: false, error: 'Devi accettare la Privacy Policy.' });
  }
  if (nome.length < 2 || nome.length > 120) {
    return json(res, 400, { ok: false, error: 'Inserisci un nome o una ragione sociale valida.' });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) || email.length > 254) {
    return json(res, 400, { ok: false, error: 'Inserisci un indirizzo email valido.' });
  }
  if (messaggio.length < 10 || messaggio.length > 5000) {
    return json(res, 400, { ok: false, error: 'Il messaggio deve contenere tra 10 e 5000 caratteri.' });
  }
  if (telefono.length > 40 || area.length > 80) {
    return json(res, 400, { ok: false, error: 'Dati non validi.' });
  }

  const to = process.env.CONTACT_TO || 'afelektra2@afelektra.com';
  const from = process.env.CONTACT_FROM || 'AF Elektra 2 <no-reply@afelektra.com>';
  const subject = `Nuova richiesta dal sito — ${nome}`;

  const righe = [
    `Nome / Azienda: ${nome}`,
    `Email: ${email}`,
    `Telefono: ${telefono || '—'}`,
    `Area di interesse: ${area || '—'}`,
    '',
    'Messaggio:',
    messaggio,
  ];
  const plain = righe.join('\n');
  const html = `
    <h2>Nuova richiesta dal sito</h2>
    <p><strong>Nome / Azienda:</strong> ${escapeHtml(nome)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Telefono:</strong> ${escapeHtml(telefono || '—')}</p>
    <p><strong>Area di interesse:</strong> ${escapeHtml(area || '—')}</p>
    <hr />
    <p style="white-space:pre-wrap">${escapeHtml(messaggio)}</p>
  `;

  try {
    if (process.env.RESEND_API_KEY) {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from,
          to: [to],
          reply_to: email,
          subject,
          text: plain,
          html,
        }),
      });

      if (!response.ok) {
        const detail = await response.text();
        console.error('[contact] Resend error', response.status, detail);
        return json(res, 502, {
          ok: false,
          error: 'Invio non riuscito. Riprova tra poco oppure scrivici a afelektra2@afelektra.com.',
        });
      }
      return json(res, 200, { ok: true });
    }

    if (process.env.CONTACT_WEBHOOK_URL) {
      const response = await fetch(process.env.CONTACT_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email, telefono, area, messaggio, subject }),
      });
      if (!response.ok) {
        console.error('[contact] webhook error', response.status, await response.text());
        return json(res, 502, { ok: false, error: 'Invio non riuscito. Riprova tra poco.' });
      }
      return json(res, 200, { ok: true });
    }

    if (process.env.CONTACT_DEBUG === '1') {
      console.log('[contact][debug]', { nome, email, telefono, area, messaggio });
      return json(res, 200, { ok: true });
    }

    console.error('[contact] nessun provider configurato: imposta RESEND_API_KEY o CONTACT_WEBHOOK_URL');
    return json(res, 503, {
      ok: false,
      error: 'Invio non ancora configurato su questo ambiente. Scrivici a afelektra2@afelektra.com.',
    });
  } catch (error) {
    console.error('[contact] unexpected error', error);
    return json(res, 500, {
      ok: false,
      error: 'Errore temporaneo. Riprova tra poco oppure scrivici a afelektra2@afelektra.com.',
    });
  }
}
