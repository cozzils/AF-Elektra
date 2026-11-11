import rawProducts from './products.json';

export interface ProductDetail {
  label: string;
  value: string;
}

export interface ProductVariant {
  name: string;
  items: ProductDetail[];
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  code: string;
  category: string;
  voltage: string;
  mounting: string;
  image: string;
  tagline: string;
  description: string;
  specs: string[];
  details: ProductDetail[];
  variants?: ProductVariant[];
}

export const products = rawProducts as Product[];

export const CATEGORIES = [
  'Alimentatori switching',
  'Alimentatori lineari',
  'Schede interfaccia',
  'Schede tastatori',
  'Relè statici',
] as const;

export const categories = ['Tutti', ...CATEGORIES];

export const categoryCounts = new Map(
  categories.map((category) => [
    category,
    category === 'Tutti' ? products.length : products.filter((p) => p.category === category).length,
  ]),
);

export function getProduct(slug: string | undefined): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getRelatedProducts(product: Product, limit = 3): Product[] {
  const sameCategory = products.filter((p) => p.category === product.category && p.id !== product.id);
  const others = products.filter((p) => p.category !== product.category && p.id !== product.id);
  return [...sameCategory, ...others].slice(0, limit);
}

export function datasheetUrl(product: Product): string {
  return `/documenti/${product.slug}.pdf`;
}
