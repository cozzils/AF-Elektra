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
npm run typecheck  # tsc -b
npm run lint       # eslint
npm run build      # typecheck + build in dist/
npm run preview    # anteprima della build
```

## Deploy (hosting Aruba / Apache + PHP)

1. Esegui `npm run build`.
2. Carica il **contenuto** di `dist/` nella docroot del sito (`public_html/`).
3. Assicurati che `send.php` sia eseguibile da PHP e che `mod_rewrite`, `mod_headers` e `mod_deflate` siano attivi (Aruba li abilita di default).
4. Il file `dist/.htaccess` gestisce i deep link di React Router, gli header di sicurezza e la cache. Senza `mod_rewrite`, URL come `/chi-siamo` restituiscono 404.

Il modulo contatti invia un POST JSON a `/send.php`, che recapita l'email a `afelektra2@afelektra.com` tramite `mail()`. In `npm run dev` l'endpoint PHP non è disponibile: per provare il form serve un server PHP (es. `php -S localhost:8080 -t public`) oppure il deploy di test.

## Note

- `package.json` → `build` esegue prima il type-check, così un errore TypeScript blocca il deploy.
- `dist/` è ignorata da git: pubblica l'artefatto generato, non la cartella di lavoro.
- I contenuti legali (Privacy Policy, Cookie Policy) sono in `src/pages/` e vanno rivisti con il consulente privacy a ogni modifica dei servizi.
