import { readFile, writeFile } from 'node:fs/promises';

const SITE = 'https://www.afelektra.com';
const products = JSON.parse(await readFile('src/data/products.json', 'utf8'));
const today = new Date().toISOString().slice(0, 10);

const routes = [
  { path: '/', changefreq: 'monthly', priority: '1.0' },
  { path: '/chi-siamo', changefreq: 'yearly', priority: '0.8' },
  { path: '/catalogo', changefreq: 'monthly', priority: '0.9' },
  { path: '/casi-studio', changefreq: 'monthly', priority: '0.8' },
  { path: '/contatti', changefreq: 'yearly', priority: '0.9' },
  { path: '/privacy', changefreq: 'yearly', priority: '0.3' },
  { path: '/cookie-policy', changefreq: 'yearly', priority: '0.3' },
  ...products.map((product) => ({
    path: `/catalogo/${product.slug}`,
    changefreq: 'monthly',
    priority: '0.7',
  })),
];

const urls = routes
  .map(
    (route) => `  <url>
    <loc>${SITE}${route.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`,
  )
  .join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

await writeFile('public/sitemap.xml', xml, 'utf8');
console.log(`[sitemap] ${routes.length} URL`);
