import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { join } from 'node:path';

const SITE = 'https://www.afelektra.com';

const routes = [
  {
    path: '/chi-siamo',
    title: 'Chi Siamo | AF Elektra 2',
    description:
      'AF Elektra 2 nasce nel 2019 a Castenedolo (BS) e porta avanti oltre 40 anni di know-how nell’elettronica industriale: progettazione, prototipazione, produzione e collaudo.',
  },
  {
    path: '/catalogo',
    title: 'Catalogo Prodotti | AF Elektra 2',
    description:
      'Alimentatori, schede interfaccia e relè statici per l’elettronica industriale. Scopri il catalogo AF Elektra 2 e richiedi un preventivo.',
  },
  {
    path: '/casi-studio',
    title: 'Progetti e Applicazioni | AF Elektra 2',
    description:
      'Tipologie di progetto seguite da AF Elektra 2: automazione PLC, quadristica e progettazione PCB per l’industria. Referenze disponibili su richiesta.',
  },
  {
    path: '/contatti',
    title: 'Contatti | AF Elektra 2',
    description:
      'Contatta AF Elektra 2 a Castenedolo (BS): modulo online, telefono 030 2130630 ed email per richieste di preventivo su elettronica industriale.',
  },
  {
    path: '/privacy',
    title: 'Privacy Policy | AF Elektra 2',
    description:
      'Informativa sul trattamento dei dati personali ai sensi dell’art. 13 del Regolamento UE 2016/679 (GDPR) di AF Elektra 2.',
  },
  {
    path: '/cookie-policy',
    title: 'Cookie Policy | AF Elektra 2',
    description:
      'Informativa sull’uso dei cookie del sito AF Elektra 2: nessun cookie di profilazione, mappa OpenStreetMap caricata solo su azione dell’utente.',
  },
];

function replaceMeta(html, title, description, path) {
  const url = `${SITE}${path}`;
  return html
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`)
    .replace(/(<meta\s+name="description"\s+content=")[^"]*(")/, `$1${description}$2`)
    .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`)
    .replace(/(<meta\s+property="og:title"\s+content=")[^"]*(")/, `$1${title}$2`)
    .replace(/(<meta\s+property="og:description"\s+content=")[^"]*(")/, `$1${description}$2`)
    .replace(/(<meta\s+property="og:url"\s+content=")[^"]*(")/, `$1${url}$2`)
    .replace(/(<meta\s+name="twitter:title"\s+content=")[^"]*(")/, `$1${title}$2`)
    .replace(/(<meta\s+name="twitter:description"\s+content=")[^"]*(")/, `$1${description}$2`);
}

const dist = 'dist';
const template = await readFile(join(dist, 'index.html'), 'utf8');

for (const route of routes) {
  const dir = join(dist, route.path.replace(/^\//, ''));
  await mkdir(dir, { recursive: true });
  await writeFile(join(dir, 'index.html'), replaceMeta(template, route.title, route.description, route.path), 'utf8');
}

console.log(`[prerender] generate ${routes.length} pagine con meta dedicati`);
