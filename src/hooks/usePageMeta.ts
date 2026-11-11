import { useEffect } from 'react';

const SITE_URL = 'https://www.afelektra.com';

function upsertMeta(attribute: 'name' | 'property', key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function upsertCanonical(href: string) {
  let element = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!element) {
    element = document.createElement('link');
    element.rel = 'canonical';
    document.head.appendChild(element);
  }
  element.href = href;
}

/**
 * Aggiorna title, meta description, Open Graph, Twitter e canonical per la rotta corrente.
 * Il sito è una SPA: senza questo tutte le pagine condividono i meta della home.
 */
export function usePageMeta(
  title: string,
  description: string,
  path: string,
  options: { noindex?: boolean; jsonLd?: Record<string, unknown> | Record<string, unknown>[] } = {},
) {
  const noindex = options.noindex === true;
  const jsonLdString = options.jsonLd ? JSON.stringify(options.jsonLd) : '';

  useEffect(() => {
    document.title = title;
    upsertMeta('name', 'description', description);
    upsertMeta('name', 'robots', noindex ? 'noindex,follow' : 'index,follow,max-image-preview:large');
    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:url', `${SITE_URL}${path}`);
    upsertMeta('name', 'twitter:title', title);
    upsertMeta('name', 'twitter:description', description);
    upsertCanonical(`${SITE_URL}${path}`);
  }, [title, description, path, noindex]);

  // Dati strutturati specifici della pagina (Product, BreadcrumbList, …).
  useEffect(() => {
    const id = 'page-jsonld';
    document.getElementById(id)?.remove();
    if (!jsonLdString) return;

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = id;
    script.textContent = jsonLdString;
    document.head.appendChild(script);

    return () => {
      document.getElementById(id)?.remove();
    };
  }, [jsonLdString]);
}
