# AF Elektra 2 — sito web

Sito vetrina B2B per AF Elektra 2 (Castenedolo, BS): elettronica industriale, progettazione PCB, montaggio SMT, quadristica e programmazione PLC.

Stack: React 19 + TypeScript + Vite 7 + Tailwind CSS 3 + React Router 7.

## Sviluppo

```bash
npm install
npm run dev        # http://localhost:3000
```

## Build e verifica

```bash
npm run typecheck  # tsc -b + typecheck della funzione api/
npm run lint       # eslint
npm run build      # typecheck + build + meta per rotta
npm run preview    # anteprima della build
```

La build genera anche `dist/chi-siamo/index.html`, `dist/catalogo/index.html`, ecc. con title, description, canonical e Open Graph specifici: i crawler e le anteprime social ricevono i meta corretti anche prima dell'idratazione React.

## Deploy su Vercel

1. Importa il repository su Vercel (framework Vite, build command `npm run build`, output `dist`).
2. Aggiungi le variabili d'ambiente del modulo contatti (vedi `.env.example`):
   - `RESEND_API_KEY` — consigliata, invio tramite [Resend](https://resend.com)
   - `CONTACT_TO` — destinatario (default `afelektra2@afelektra.com`)
   - `CONTACT_FROM` — mittente con dominio verificato su Resend
   - `CONTACT_WEBHOOK_URL` — alternativa a Resend
   - `CONTACT_DEBUG=1` — solo per test: non invia, scrive nei log
3. `vercel.json` gestisce i deep link della SPA (`/chi-siamo`, `/catalogo`, …) e gli header di sicurezza. Senza rewrite, un reload o un link condiviso restituisce 404.
4. La funzione `api/contact.ts` valida e inoltra il form. Se non è configurato alcun provider risponde 503 con un messaggio esplicito: non simula un invio riuscito.

## Deploy su hosting Apache/PHP (alternativa Aruba)

1. `npm run build`.
2. Carica il contenuto di `dist/` in `public_html/`.
3. `dist/.htaccess` gestisce rewrite, header e cache. Servono `mod_rewrite`, `mod_headers`, `mod_deflate`.
4. Copia `server/send.php` nella docroot e compila con `VITE_CONTACT_ENDPOINT=/send.php`. Il file non è più dentro `public/`, quindi non viene pubblicato per errore su Vercel.

## Contenuti da completare con il cliente

Questi punti sono volutamente segnalati e non vanno considerati definitivi:

- **Logo**: `src/components/Logo.tsx` usa `public/logo.png`, ricavato dal logo ufficiale pubblicato sul sito aziendale (sfondo reso trasparente). Se il cliente fornisce l'SVG vettoriale originale, sostituire il PNG per la massima nitidezza.
- **Foto prodotto**: nel catalogo alcune schede mostrano un segnaposto “Foto in aggiornamento” invece di riusare la foto di un altro codice. Servono foto reali per ogni referenza.
- **Foto azienda**: l'hero usa una macro di PCB, non una foto della sede. Vanno caricate foto di capannone, linee SMT, quadri e banco collaudo.
- **Casi di studio**: sono scenari tecnici anonimizzati, senza percentuali o certificazioni non documentate. Sostituirli con referenze reali quando disponibili.
- **Certificazioni**: ISO, IPC-A-610 o altre certificazioni vanno inserite solo se possedute e documentabili.

## Note

- `dist/` è ignorata da git: pubblica l'artefatto generato, non la cartella di lavoro.
- I contenuti legali (Privacy Policy, Cookie Policy) vanno rivisti con il consulente privacy a ogni modifica dei servizi.
- La PEC personale è stata rimossa dal footer e dalla privacy policy: va inserita solo la PEC aziendale, se disponibile.
