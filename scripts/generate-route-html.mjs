import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { join } from 'node:path';

const SITE = 'https://www.afelektra.com';
const products = JSON.parse(await readFile('src/data/products.json', 'utf8'));

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
      'Alimentatori, schede interfaccia, tastatori e relè statici per l’elettronica industriale. Scopri il catalogo AF Elektra 2 e scarica le schede tecniche.',
  },
  {
    path: '/casi-studio',
    title: 'Progetti e Realizzazioni | AF Elektra 2',
    description:
      'Schede di comando, interfacce di segnale, alimentatori e automazione PLC: le realizzazioni AF Elektra 2 progettate e prodotte a Castenedolo (BS).',
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
  ...products.map((product) => ({
    path: `/catalogo/${product.slug}`,
    title: `${product.name} | ${product.category} | AF Elektra 2`,
    description: `${product.tagline} Caratteristiche tecniche, versioni disponibili e scheda PDF di ${product.name}.`,
    image: `${SITE}${product.image}`,
    imageAlt: product.name,
    imageWidth: 1024,
    imageHeight: 1024,
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.name,
        sku: product.code,
        description: product.tagline,
        image: [`${SITE}${product.image}`],
        category: product.category,
        brand: { '@type': 'Brand', name: 'AF Elektra 2' },
        manufacturer: { '@type': 'Organization', name: 'AF Elektra 2' },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
          { '@type': 'ListItem', position: 2, name: 'Catalogo', item: `${SITE}/catalogo` },
          {
            '@type': 'ListItem',
            position: 3,
            name: product.category,
            item: `${SITE}/catalogo?categoria=${encodeURIComponent(product.category)}`,
          },
          { '@type': 'ListItem', position: 4, name: product.name },
        ],
      },
    ],
  })),
];

function replaceMeta(html, route) {
  const url = `${SITE}${route.path}`;
  const image = route.image ?? `${SITE}/images/og-af-elektra.jpg`;

  let result = html
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${route.title}</title>`)
    .replace(/(<meta\s+name="description"\s+content=")[^"]*(")/, `$1${route.description}$2`)
    .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`)
    .replace(/(<meta\s+property="og:title"\s+content=")[^"]*(")/, `$1${route.title}$2`)
    .replace(/(<meta\s+property="og:description"\s+content=")[^"]*(")/, `$1${route.description}$2`)
    .replace(/(<meta\s+property="og:url"\s+content=")[^"]*(")/, `$1${url}$2`)
    .replace(/(<meta\s+property="og:image"\s+content=")[^"]*(")/, `$1${image}$2`)
    .replace(/(<meta\s+name="twitter:title"\s+content=")[^"]*(")/, `$1${route.title}$2`)
    .replace(/(<meta\s+name="twitter:description"\s+content=")[^"]*(")/, `$1${route.description}$2`)
    .replace(/(<meta\s+name="twitter:image"\s+content=")[^"]*(")/, `$1${image}$2`);

  if (route.image) {
    result = result
      .replace(/(<meta\s+property="og:image:width"\s+content=")[^"]*(")/, `$1${route.imageWidth ?? 1200}$2`)
      .replace(/(<meta\s+property="og:image:height"\s+content=")[^"]*(")/, `$1${route.imageHeight ?? 630}$2`)
      .replace(/(<meta\s+property="og:image:alt"\s+content=")[^"]*(")/, `$1${route.imageAlt ?? 'AF Elektra 2'}$2`);
  }

  if (route.jsonLd) {
    const payload = JSON.stringify(route.jsonLd).replace(/</g, '\\u003c');
    result = result.replace(
      '</head>',
      `    <script type="application/ld+json" id="page-jsonld">${payload}</script>\n  </head>`,
    );
  }

  return result;
}

const dist = 'dist';
const template = await readFile(join(dist, 'index.html'), 'utf8');

for (const route of routes) {
  const dir = join(dist, route.path.replace(/^\//, ''));
  await mkdir(dir, { recursive: true });
  await writeFile(join(dir, 'index.html'), replaceMeta(template, route), 'utf8');
}

console.log(`[prerender] generate ${routes.length} pagine con meta dedicati`);
