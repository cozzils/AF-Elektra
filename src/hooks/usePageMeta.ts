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
 * Aggiorna title, meta description, Open Graph e canonical per la rotta corrente.
 * Il sito è una SPA: senza questo tutte le pagine condividono i meta della home.
 */
export function usePageMeta(title: string, description: string, path: string) {
  useEffect(() => {
    document.title = title;
    upsertMeta('name', 'description', description);
    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:url', `${SITE_URL}${path}`);
    upsertCanonical(`${SITE_URL}${path}`);
  }, [title, description, path]);
}
