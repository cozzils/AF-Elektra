import { useEffect } from 'react';
import { Link, useParams } from 'react-router';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ChevronRight, FileText, Plus, CheckCircle2 } from 'lucide-react';
import Layout from '@/components/Layout';
import SmartImage from '@/components/SmartImage';
import { usePageMeta } from '@/hooks/usePageMeta';
import { datasheetUrl, getProduct, getRelatedProducts } from '@/data/products';

const SITE_URL = 'https://www.afelektra.com';

export default function Prodotto() {
  const { slug } = useParams<{ slug: string }>();
  const product = getProduct(slug);

  usePageMeta(
    product ? `${product.name} | ${product.category} | AF Elektra 2` : 'Prodotto non trovato | AF Elektra 2',
    product
      ? `${product.tagline} Caratteristiche tecniche, versioni disponibili e scheda PDF di ${product.name}.`
      : 'Il prodotto richiesto non è disponibile.',
    product ? `/catalogo/${product.slug}` : '/catalogo',
    {
      noindex: !product,
      jsonLd: product
        ? [
            {
              '@context': 'https://schema.org',
              '@type': 'Product',
              name: product.name,
              sku: product.code,
              description: product.tagline,
              image: [`${SITE_URL}${product.image}`],
              category: product.category,
              brand: { '@type': 'Brand', name: 'AF Elektra 2' },
              manufacturer: { '@type': 'Organization', name: 'AF Elektra 2' },
            },
            {
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
                { '@type': 'ListItem', position: 2, name: 'Catalogo', item: `${SITE_URL}/catalogo` },
                {
                  '@type': 'ListItem',
                  position: 3,
                  name: product.category,
                  item: `${SITE_URL}/catalogo?categoria=${encodeURIComponent(product.category)}`,
                },
                { '@type': 'ListItem', position: 4, name: product.name },
              ],
            },
          ]
        : undefined,
    },
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!product) {
    return (
      <Layout>
        <section className="pt-40 pb-24 px-6 lg:px-10 bg-white">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xs uppercase tracking-widest text-white/55 mb-4">Catalogo</p>
            <h1 className="text-4xl lg:text-5xl font-semibold text-black tracking-tight">
              Prodotto non trovato
            </h1>
            <p className="text-base text-white/55 mt-4">
              Il prodotto che stai cercando non è più disponibile o il link non è corretto.
            </p>
            <Link
              to="/catalogo"
              className="inline-flex items-center gap-2 mt-8 bg-elektra-accent text-white text-sm font-medium px-6 py-3 rounded-lg hover:bg-black transition-colors duration-300"
            >
              <ArrowLeft size={16} />
              Torna al catalogo
            </Link>
          </div>
        </section>
      </Layout>
    );
  }

  const related = getRelatedProducts(product);

  return (
    <Layout>
      {/* ─── BREADCRUMB ─── */}
      <section className="bg-gray-light pt-28 pb-8 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <nav aria-label="Percorso di navigazione">
            <ol className="flex flex-wrap items-center gap-1.5 text-xs text-white/55">
              <li>
                <Link to="/" className="hover:text-black transition-colors">Home</Link>
              </li>
              <li aria-hidden="true"><ChevronRight size={12} /></li>
              <li>
                <Link to="/catalogo" className="hover:text-black transition-colors">Catalogo</Link>
              </li>
              <li aria-hidden="true"><ChevronRight size={12} /></li>
              <li>
                <Link
                  to={`/catalogo?categoria=${encodeURIComponent(product.category)}`}
                  className="hover:text-black transition-colors"
                >
                  {product.category}
                </Link>
              </li>
              <li aria-hidden="true"><ChevronRight size={12} /></li>
              <li aria-current="page" className="text-black font-medium">{product.name}</li>
            </ol>
          </nav>
        </div>
      </section>

      {/* ─── PRODOTTO ─── */}
      <section className="bg-white px-6 lg:px-10">
        <div className="max-w-7xl mx-auto py-10 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Immagine */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.075, 0.82, 0.165, 1] }}
              className="lg:sticky lg:top-28 self-start"
            >
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#F5F6F7] border border-black/5">
                <SmartImage
                  src={product.image}
                  alt={product.name}
                  width={1024}
                  height={1024}
                  fetchPriority="high"
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 bg-elektra-accent text-white text-xs font-medium px-3 py-1.5 rounded-full">
                  <CheckCircle2 size={13} /> A magazzino
                </span>
              </div>
            </motion.div>

            {/* Dettagli */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.075, 0.82, 0.165, 1] }}
            >
              <p className="text-xs uppercase tracking-widest text-white/55">{product.category}</p>
              <p className="text-xs font-mono text-white/55 mt-3">{product.code}</p>
              <h1 className="text-4xl lg:text-5xl font-semibold text-black tracking-tight mt-1">
                {product.name}
              </h1>
              <p className="text-lg text-white/55 mt-4 leading-relaxed">{product.tagline}</p>

              <div className="flex flex-wrap gap-2 mt-6">
                {product.specs.map((spec) => (
                  <span key={spec} className="text-xs text-white/70 bg-gray-light px-2.5 py-1 rounded-md">
                    {spec}
                  </span>
                ))}
              </div>

              <p className="text-sm text-white/55 mt-6 leading-relaxed">{product.description}</p>

              <div className="flex flex-col sm:flex-row gap-3 mt-8">
                <a
                  href={datasheetUrl(product)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-gray-dark text-white text-sm font-medium px-6 py-3.5 rounded-lg hover:bg-black transition-colors duration-300"
                >
                  <FileText size={16} />
                  Scarica scheda PDF
                </a>
                <Link
                  to={`/contatti?prodotto=${encodeURIComponent(product.name)}`}
                  className="inline-flex items-center justify-center gap-2 bg-elektra-accent text-white text-sm font-medium px-6 py-3.5 rounded-lg hover:bg-elektra-accent/90 transition-colors duration-300"
                >
                  <Plus size={16} />
                  Richiedi preventivo
                </Link>
              </div>

              <p className="text-xs text-white/55 mt-4">
                Prezzi e disponibilità aggiornata su richiesta. Tensioni, contatti e configurazioni possono essere personalizzati.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── CARATTERISTICHE ─── */}
      <section className="py-16 lg:py-20 px-6 lg:px-10 bg-gray-light/60">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-8">
            <h2 className="text-2xl lg:text-3xl font-semibold text-black tracking-tight">
              Caratteristiche tecniche
            </h2>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 mt-6">
              {product.details.map((detail) => (
                <div
                  key={detail.label}
                  className="flex items-baseline justify-between gap-6 py-3 border-b border-black/10"
                >
                  <dt className="text-sm text-white/55">{detail.label}</dt>
                  <dd className="text-sm font-medium text-black text-right">{detail.value}</dd>
                </div>
              ))}
            </dl>

            {product.variants && product.variants.length > 0 && (
              <div className="mt-12">
                <h2 className="text-2xl lg:text-3xl font-semibold text-black tracking-tight">
                  Versioni disponibili
                </h2>
                <div className="mt-6 overflow-x-auto rounded-xl border border-black/10 bg-white">
                  <table className="w-full text-sm text-left">
                    <thead>
                      <tr className="border-b border-black/10">
                        <th scope="col" className="px-4 py-3 font-medium text-white/55">Modello</th>
                        {Array.from(
                          new Set(product.variants.flatMap((variant) => variant.items.map((item) => item.label))),
                        ).map((label) => (
                          <th key={label} scope="col" className="px-4 py-3 font-medium text-white/55">
                            {label}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {product.variants.map((variant) => (
                        <tr key={variant.name} className="border-b border-black/5 last:border-0">
                          <th scope="row" className="px-4 py-3 font-semibold text-black whitespace-nowrap">
                            {variant.name}
                          </th>
                          {Array.from(
                            new Set(product.variants!.flatMap((v) => v.items.map((item) => item.label))),
                          ).map((label) => (
                            <td key={label} className="px-4 py-3 text-white/55 whitespace-nowrap">
                              {variant.items.find((item) => item.label === label)?.value ?? '—'}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          <aside className="lg:col-span-4">
            <div className="bg-white rounded-2xl border border-black/5 p-6 lg:p-7">
              <h3 className="font-semibold text-base text-black">Hai bisogno di una variante?</h3>
              <p className="text-sm text-white/55 mt-2 leading-relaxed">
                Molti dei nostri prodotti possono essere adattati per tensione, corrente, contatti e formato. Raccontaci l’applicazione e ti proponiamo la configurazione corretta.
              </p>
              <Link
                to={`/contatti?prodotto=${encodeURIComponent(product.name)}`}
                className="inline-flex items-center gap-2 mt-5 text-sm font-medium text-black underline underline-offset-4 hover:text-elektra-accent transition-colors"
              >
                Parla con l’ufficio tecnico <ArrowRight size={15} />
              </Link>
            </div>
            <div className="mt-4 bg-white rounded-2xl border border-black/5 p-6 lg:p-7">
              <h3 className="font-semibold text-base text-black">Consegna</h3>
              <p className="text-sm text-white/55 mt-2 leading-relaxed">
                Prodotto normalmente disponibile a magazzino. Per quantità, tempi e condizioni di fornitura richiedi un preventivo.
              </p>
            </div>
          </aside>
        </div>
      </section>

      {/* ─── CORRELATI ─── */}
      {related.length > 0 && (
        <section className="py-16 lg:py-20 px-6 lg:px-10 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between gap-4 mb-8">
              <h2 className="text-2xl lg:text-3xl font-semibold text-black tracking-tight">
                Altri prodotti
              </h2>
              <Link
                to={`/catalogo?categoria=${encodeURIComponent(product.category)}`}
                className="text-sm font-medium text-white/55 hover:text-black transition-colors"
              >
                Vedi la categoria
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((item) => (
                <Link
                  key={item.id}
                  to={`/catalogo/${item.slug}`}
                  className="group flex gap-4 items-center bg-white rounded-xl border border-black/5 p-4 hover:border-black/20 hover:shadow-panel transition-all duration-300"
                >
                  <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-[#F5F6F7]">
                    <SmartImage
                      src={item.image}
                      alt={item.name}
                      width={192}
                      height={192}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-mono text-white/55 truncate">{item.code}</p>
                    <p className="font-semibold text-sm text-black mt-0.5">{item.name}</p>
                    <p className="text-xs text-white/55 mt-1 line-clamp-2">{item.tagline}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
}
