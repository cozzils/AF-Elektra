# AGENTS.md

Sito vetrina B2B in italiano per AF Elektra 2. React 19 + TypeScript + Vite 7 + Tailwind 3 + React Router 7. SPA senza SSR e senza test suite.

## Comandi

- `npm ci` poi `npm run dev` — Vite su porta 3000.
- `npm run typecheck` — `tsc -b` + `tsc -p tsconfig.api.json` (quest'ultimo copre `api/`).
- `npm run lint` — ESLint flat config.
- `npm run build` — pipeline completa: `sitemap` → `datasheets` → typecheck → `vite build` → `generate-route-html`.
- `npm run preview` — anteprima della build.
- Verifica prima di consegnare: `npm run typecheck && npm run lint && npm run build`.
- Usa npm (`package-lock.json`); non ci sono test, non inventare `npm test`.

## Effetti collaterali del build

- `npm run build` riscrive file **committati** in `public/`: `sitemap.xml` e `documenti/*.pdf`, generati da `src/data/products.json`. Dopo un build il working tree può risultare sporco: non committare churn se non hai cambiato contenuti.
- `scripts/generate-route-html.mjs` crea `dist/<rotta>/index.html` copiando `dist/index.html` e sostituendo i meta. Il body resta vuoto: il contenuto è client-side; crawler social e bot leggono solo i meta.
- `dist/` è gitignored: si committa il sorgente, non il build.

## Architettura

- `src/App.tsx` definisce le rotte; `src/components/Layout.tsx` fornisce navbar, footer, skip-link, scroll restore e focus management.
- Ogni pagina deve chiamare `usePageMeta` (`src/hooks/usePageMeta.ts`) per title, description, canonical, OG/Twitter e JSON-LD.
- Alias `@` → `src` (sia Vite sia tsconfig).
- `src/data/products.json` è la fonte unica del catalogo; `src/data/products.ts` espone tipi e helper.
- Nessun CMS: prodotti, testi e pagine si modificano da codice/JSON, non da un pannello.

## Aggiungere rotte o prodotti

- Nuova rotta statica: aggiorna **tre** punti — `src/App.tsx`, `scripts/generate-route-html.mjs` (meta prerenderizzati) e `scripts/generate-sitemap.mjs` (sitemap). Dimenticarne uno significa niente meta o niente URL in sitemap.
- Nuovo prodotto: aggiungi l'oggetto in `src/data/products.json`, la coppia `public/images/prodotti/<slug>.jpg` + `.webp`, poi ribuilda (genera PDF e pagina).
- `SmartImage` cambia solo l'estensione da jpg/png a webp: per ogni immagine **deve** esistere il `.webp` omonimo, altrimenti l'immagine si rompe (nessun fallback). Immagini prodotto 800×800, OG 1200×630.

## Dominio e deploy

- `https://www.afelektra.com` è hardcoded in `index.html`, `src/hooks/usePageMeta.ts`, `src/pages/Prodotto.tsx`, `scripts/generate-route-html.mjs`, `scripts/generate-sitemap.mjs` e `public/robots.txt`. Un cambio dominio richiede di aggiornarli tutti.
- Vercel è staging/demo (`af-elektra.vercel.app`); la produzione andrà su hosting statico Aruba. `vercel.json` non vale su Aruba: rewrite, header e redirect di produzione vanno in `public/.htaccess` (copiato in `dist/.htaccess`, file nascosto da caricare).
- Su Vercel le rotte sconosciute rispondono **200** (fallback SPA), non 404 reali. I 301 delle vecchie URL WordPress non sono ancora implementati.

## Form contatti: due backend

- Vercel: `api/contact.ts` (Resend o webhook; senza provider risponde 503 di proposito).
- Aruba: `server/send.php` (richiede PHP 8.0+ per `mixed` e `mbstring`), da copiare a mano nella docroot: non finisce in `dist`.
- L'endpoint è scelto **a build time** da `VITE_CONTACT_ENDPOINT` (default `/api/contact`). Per Aruba serve `VITE_CONTACT_ENDPOINT=/send.php`, altrimenti il form chiama `/api/contact` e fallisce. Non esiste ancora uno script `build:aruba`.
- Le due validazioni devono restare allineate: il form può inviare `area=prodotti`, quindi entrambi i backend devono accettarlo.
- Variabili: `RESEND_API_KEY`, `CONTACT_TO`, `CONTACT_FROM`, `CONTACT_WEBHOOK_URL`, `CONTACT_DEBUG=1` (vedi `.env.example`). Le `VITE_*` finiscono nel bundle e sono pubbliche.

## Vincoli da non rompere

- Tutti i testi sono in italiano, tono B2B. Non inventare certificazioni, numeri, referenze o claim tecnici (AOI, “a magazzino”, anni di esperienza): vanno confermati dal cliente.
- Il sito dichiara zero cookie di profilazione e nessun banner: font Inter self-hosted, mappa OpenStreetMap caricata solo al click. Non aggiungere analytics, font o embed di terze parti senza aggiornare `src/pages/Privacy.tsx` e `src/pages/CookiePolicy.tsx`.
- La privacy cita Vercel come hosting: passando ad Aruba va aggiornata.
- Le immagini hero/quadro/OG attuali sono sintetiche (non foto reali) e le foto sede sono a bassa risoluzione: non presentarle come definitive.
- `README.md` resta il riferimento per deploy e contenuti da completare.

## Git e CI

- `.github/workflows/ci.yml` esegue su push/PR: `npm ci` → typecheck → lint → build. Node 22.
- HEAD (`79abe6ff`) è un revert di un redesign scuro/3D: `three` e `@react-three/fiber` sono stati rimossi. La versione corrente è quella chiara; non reintrodurli senza richiesta esplicita.
