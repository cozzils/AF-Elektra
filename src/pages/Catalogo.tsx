import { useState } from 'react';
import { Link, useSearchParams } from 'react-router';
import { motion } from 'framer-motion';
import {
  Search,
  X,
  ChevronDown,
  FileText,
  Plus,
  Zap,
  ToggleRight,
  CircuitBoard,
  Puzzle,
  Waves,
  ArrowRight,
  Package,
} from 'lucide-react';
import Layout from '@/components/Layout';
import SmartImage from '@/components/SmartImage';
import { usePageMeta } from '@/hooks/usePageMeta';

import { products, categories, categoryCounts, datasheetUrl, type Product } from '@/data/products';

const categoryIcons: Record<string, React.ReactNode> = {
  'Alimentatori switching': <Zap size={16} />,
  'Alimentatori lineari': <Zap size={16} />,
  'Schede interfaccia': <CircuitBoard size={16} />,
  'Schede tastatori': <Waves size={16} />,
  'Relè statici': <ToggleRight size={16} />,
};

/* ─── Product Card ─── */
function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group flex h-full flex-col bg-white rounded-2xl border border-black/5 overflow-hidden hover:border-black/15 hover:shadow-panel transition-all duration-500">
      {/* Image */}
      <Link
        to={`/catalogo/${product.slug}`}
        aria-label={`Vedi la scheda di ${product.name}`}
        className="relative block aspect-square bg-gray-light overflow-hidden"
      >
        {product.image ? (
          <SmartImage
            src={product.image}
            alt={product.name}
            width={1024}
            height={1024}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out-circ"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-6 text-center">
            <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center text-elektra-accent">
              {categoryIcons[product.category] || <Puzzle size={24} />}
            </div>
            <p className="text-xs uppercase tracking-widest text-gray-medium">Foto in aggiornamento</p>
            <p className="text-xs font-mono text-gray-medium">{product.code}</p>
          </div>
        )}
        {/* Badge */}
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center gap-1 bg-elektra-accent text-white text-xs font-medium px-2.5 py-1 rounded-full">
            A magazzino
          </span>
        </div>
        {/* Category icon */}
        <div className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-white/90 backdrop-blur-sm flex items-center justify-center text-gray-dark">
          {categoryIcons[product.category] || <Puzzle size={14} />}
        </div>
        {/* Hover affordance */}
        <span className="pointer-events-none absolute inset-x-0 bottom-4 flex justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <span className="bg-black/80 text-white text-xs font-medium px-3 py-1.5 rounded-full backdrop-blur-sm">
            Vedi i dettagli
          </span>
        </span>
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-xs text-gray-medium font-mono">{product.code}</p>
            <h3 className="font-semibold text-base text-black mt-0.5">
              <Link
                to={`/catalogo/${product.slug}`}
                className="hover:text-elektra-accent transition-colors duration-300"
              >
                {product.name}
              </Link>
            </h3>
          </div>
        </div>

        <p className="text-sm text-gray-medium mt-2 leading-relaxed">{product.tagline}</p>

        {/* Specs */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {product.specs.map((spec, i) => (
            <span key={i} className="text-xs text-gray-medium bg-gray-light px-2 py-0.5 rounded-md">
              {spec}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-auto pt-4">
          <a
            href={datasheetUrl(product)}
            target="_blank"
            rel="noreferrer"
            aria-label={`Scarica la scheda tecnica PDF di ${product.name}`}
            className="flex-1 flex items-center justify-center gap-1.5 text-xs font-medium bg-gray-light text-gray-dark px-3 py-2.5 rounded-lg hover:bg-gray-dark hover:text-white transition-colors duration-300"
          >
            <FileText size={14} />
            Scheda PDF
          </a>
          <Link
            to={`/contatti?prodotto=${encodeURIComponent(product.name)}`}
            className="flex items-center justify-center gap-1.5 text-xs font-medium bg-elektra-accent text-white px-3 py-2.5 rounded-lg hover:bg-black transition-colors duration-300"
          >
            <Plus size={14} />
            Preventivo
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ─── Facet Select ─── */
interface FacetOption {
  value: string;
  count: number;
}

function FacetSelect({
  id,
  label,
  value,
  options,
  onChange,
  anyLabel = 'Tutte',
}: {
  id: string;
  label: string;
  value: string;
  options: FacetOption[];
  onChange: (value: string) => void;
  anyLabel?: string;
}) {
  return (
    <div className="min-w-0">
      <label htmlFor={id} className="block text-[11px] uppercase tracking-widest text-gray-medium mb-2">
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="appearance-none w-full bg-white border border-black/10 rounded-xl pl-3.5 pr-9 py-2.5 text-sm text-black hover:border-black/25 focus:outline-none focus:border-elektra-accent focus:ring-2 focus:ring-elektra-accent/20 transition-colors duration-200 cursor-pointer"
        >
          <option value="Tutti">{anyLabel}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.value} ({option.count})
            </option>
          ))}
        </select>
        <ChevronDown
          size={15}
          aria-hidden="true"
          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-medium pointer-events-none"
        />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════ */

export default function Catalogo() {
  usePageMeta(
    'Catalogo Prodotti | AF Elektra 2',
    'Alimentatori switching e lineari, schede interfaccia e tastatori, relè statici: il catalogo AF Elektra 2 per l’elettronica industriale.',
    '/catalogo',
  );

  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('categoria');
  const selectedCategory = categoryParam && categories.includes(categoryParam) ? categoryParam : 'Tutti';
  const [selectedVoltage, setSelectedVoltage] = useState('Tutti');
  const [selectedMounting, setSelectedMounting] = useState('Tutti');
  const [query, setQuery] = useState('');

  const setSelectedCategory = (category: string) => {
    const next = new URLSearchParams(searchParams);
    if (category === 'Tutti') next.delete('categoria');
    else next.set('categoria', category);
    setSearchParams(next, { replace: true });

    // Scarta subito i filtri che non hanno prodotti nella nuova categoria.
    const nextProducts = category === 'Tutti' ? products : products.filter((p) => p.category === category);
    let voltage = selectedVoltage;
    if (voltage !== 'Tutti' && !nextProducts.some((p) => p.voltage === voltage)) {
      voltage = 'Tutti';
      setSelectedVoltage('Tutti');
    }
    if (
      selectedMounting !== 'Tutti'
      && !nextProducts.some((p) => p.mounting === selectedMounting && (voltage === 'Tutti' || p.voltage === voltage))
    ) {
      setSelectedMounting('Tutti');
    }
  };

  // Valori effettivi: se la categoria cambia da URL o con back/forward, i filtri
  // rimasti senza prodotti tornano automaticamente a "Tutti".
  const categoryProducts = selectedCategory === 'Tutti'
    ? products
    : products.filter((p) => p.category === selectedCategory);
  const effectiveVoltage = selectedVoltage !== 'Tutti'
    && !categoryProducts.some((p) => p.voltage === selectedVoltage)
    ? 'Tutti'
    : selectedVoltage;
  const effectiveMounting = selectedMounting !== 'Tutti'
    && !categoryProducts.some(
      (p) => p.mounting === selectedMounting && (effectiveVoltage === 'Tutti' || p.voltage === effectiveVoltage),
    )
    ? 'Tutti'
    : selectedMounting;

  const normalizedQuery = query.trim().toLowerCase();

  // Filtri "a faccette": ogni gruppo ignora se stesso, così ogni opzione
  // mostrata corrisponde sempre ad almeno un prodotto.
  const matchesFilters = (p: Product, ignore?: 'category' | 'voltage' | 'mounting') => {
    if (ignore !== 'category' && selectedCategory !== 'Tutti' && p.category !== selectedCategory) return false;
    if (ignore !== 'voltage' && effectiveVoltage !== 'Tutti' && p.voltage !== effectiveVoltage) return false;
    if (ignore !== 'mounting' && effectiveMounting !== 'Tutti' && p.mounting !== effectiveMounting) return false;
    return true;
  };

  const matchesQuery = (p: Product) => {
    if (!normalizedQuery) return true;
    const haystack = `${p.name} ${p.code} ${p.category} ${p.voltage} ${p.mounting} ${p.tagline} ${p.specs.join(' ')}`.toLowerCase();
    return haystack.includes(normalizedQuery);
  };

  const buildFacet = (key: 'voltage' | 'mounting'): FacetOption[] => {
    const counts = new Map<string, number>();
    products
      .filter((p) => matchesFilters(p, key))
      .forEach((p) => counts.set(p[key], (counts.get(p[key]) ?? 0) + 1));
    return Array.from(counts, ([value, count]) => ({ value, count }));
  };

  const voltageOptions = buildFacet('voltage');
  const mountingOptions = buildFacet('mounting');
  const filteredProducts = products.filter((p) => matchesFilters(p) && matchesQuery(p));

  // Un filtro si mostra solo se ci sono alternative reali tra cui scegliere.
  const showVoltageFilter = voltageOptions.length > 1;
  const showMountingFilter = mountingOptions.length > 1;

  const filtersActive = selectedCategory !== 'Tutti'
    || effectiveVoltage !== 'Tutti'
    || effectiveMounting !== 'Tutti'
    || normalizedQuery.length > 0;

  const resetFilters = () => {
    setSelectedCategory('Tutti');
    setSelectedVoltage('Tutti');
    setSelectedMounting('Tutti');
    setQuery('');
  };

  return (
    <Layout>
      {/* ─── HERO ─── */}
      <section className="bg-gray-light pt-32 pb-16 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.075, 0.82, 0.165, 1] }}
          >
            <p className="text-xs uppercase tracking-widest text-gray-medium mb-4">Prodotti</p>
            <h1 className="text-5xl lg:text-6xl font-semibold text-black tracking-tight">
              Catalogo Prodotti
            </h1>
            <p className="text-base text-gray-medium mt-4 max-w-xl">
              Alimentatori switching e lineari, schede interfaccia e tastatori, relè statici. Prodotti normalmente disponibili a magazzino, personalizzabili su richiesta.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── CATALOG CONTENT ─── */}
      <section className="py-12 lg:py-16 px-6 lg:px-10 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* ─── Toolbar filtri ─── */}
          <div className="rounded-2xl border border-black/10 bg-white p-4 lg:p-5 mb-8">
            <div className="flex flex-col lg:flex-row lg:items-end gap-4">
              <div className="flex-1 min-w-0">
                <label
                  htmlFor="catalogo-search"
                  className="block text-[11px] uppercase tracking-widest text-gray-medium mb-2"
                >
                  Cerca
                </label>
                <div className="relative">
                  <Search
                    size={16}
                    aria-hidden="true"
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-medium"
                  />
                  <input
                    id="catalogo-search"
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Nome, codice o caratteristica"
                    autoComplete="off"
                    className="w-full bg-white border border-black/10 rounded-xl pl-10 pr-10 py-2.5 text-sm text-black placeholder:text-gray-medium/70 hover:border-black/25 focus:outline-none focus:border-elektra-accent focus:ring-2 focus:ring-elektra-accent/20 transition-colors duration-200"
                  />
                  {query && (
                    <button
                      type="button"
                      onClick={() => setQuery('')}
                      aria-label="Cancella la ricerca"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-medium hover:text-black transition-colors"
                    >
                      <X size={15} />
                    </button>
                  )}
                </div>
              </div>

              {(showVoltageFilter || showMountingFilter) && (
                <div className="grid grid-cols-2 gap-4 lg:flex lg:w-auto">
                  {showVoltageFilter && (
                    <FacetSelect
                      id="filtro-tensione"
                      label="Tensione ingresso"
                      value={effectiveVoltage}
                      options={voltageOptions}
                      onChange={setSelectedVoltage}
                    />
                  )}
                  {showMountingFilter && (
                    <FacetSelect
                      id="filtro-montaggio"
                      label="Montaggio"
                      value={effectiveMounting}
                      options={mountingOptions}
                      onChange={setSelectedMounting}
                      anyLabel="Tutti"
                    />
                  )}
                </div>
              )}
            </div>

            {/* Categorie */}
            <div className="mt-4 pt-4 border-t border-black/10 flex flex-wrap items-center gap-2">
              {categories.map((cat) => {
                const active = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setSelectedCategory(cat)}
                    className={`inline-flex shrink-0 items-center gap-2 text-sm px-4 py-2 rounded-full border transition-colors duration-300 ${
                      active
                        ? 'bg-elektra-accent border-elektra-accent text-white font-medium'
                        : 'border-black/10 text-gray-medium hover:border-black/30 hover:text-black'
                    }`}
                  >
                    {cat === 'Tutti' ? 'Tutti i prodotti' : cat}
                    <span className={`text-xs tabular-nums ${active ? 'text-white/75' : 'text-gray-medium/70'}`}>
                      {categoryCounts.get(cat)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ─── Riepilogo ─── */}
          <div className="flex items-center justify-between gap-4 mb-5">
            <p className="text-sm text-gray-medium" aria-live="polite">
              {filteredProducts.length}{' '}
              {filteredProducts.length === 1 ? 'prodotto trovato' : 'prodotti trovati'}
            </p>
            {filtersActive && (
              <button
                type="button"
                onClick={resetFilters}
                className="text-xs font-medium text-black underline hover:no-underline"
              >
                Azzera filtri
              </button>
            )}
          </div>

          {/* ─── Prodotti ─── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProducts.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.075, 0.82, 0.165, 1] }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-medium text-lg">Nessun prodotto trovato.</p>
              <button
                type="button"
                onClick={resetFilters}
                className="mt-4 text-sm font-medium text-black underline hover:no-underline"
              >
                Azzera filtri e ricerca
              </button>
            </div>
          )}

          <p className="text-xs text-gray-medium mt-10 max-w-2xl">
            Immagini dei prodotti reali. Caratteristiche, tensioni e configurazioni possono essere personalizzate su richiesta: per varianti, disponibilità aggiornata e codici alternativi scrivici.
          </p>
        </div>
      </section>

      {/* ─── COMPONENTISTICA ─── */}
      <section className="py-16 lg:py-20 px-6 lg:px-10 bg-gray-light">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-5">
            <p className="text-xs uppercase tracking-widest text-gray-medium mb-4">Oltre il catalogo</p>
            <h2 className="text-3xl lg:text-4xl font-semibold text-black tracking-tight">
              Componentistica a magazzino
            </h2>
            <p className="text-base text-gray-medium mt-5 leading-relaxed">
              Per la nostra clientela è sempre possibile reperire la componentistica necessaria per le sostituzioni e le riparazioni. Se non trovi un codice, scrivici: verifichiamo disponibilità e alternative.
            </p>
            <Link
              to="/contatti"
              className="inline-flex items-center gap-2 mt-7 bg-gray-dark text-white text-sm font-medium px-6 py-3 rounded-lg hover:bg-black transition-colors duration-300"
            >
              Chiedi disponibilità <ArrowRight size={16} />
            </Link>
          </div>

          <div className="lg:col-span-7">
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { title: 'Resistenze', desc: 'Valori e tolleranze per sostituzioni e prototipi.' },
                { title: 'Condensatori', desc: 'Componenti di filtro e alimentazione.' },
                { title: 'Circuiti integrati', desc: 'Logica, driver e regolatori.' },
                { title: 'LED e segnalazioni', desc: 'Indicatori di stato per schede e quadri.' },
                { title: 'Morsettiere e connettori', desc: 'Fissi ed estraibili, passo standard.' },
                { title: 'Fusibili', desc: 'Protezione di schede e apparecchiature.' },
              ].map((item) => (
                <li
                  key={item.title}
                  className="flex items-start gap-3 bg-white rounded-xl border border-black/5 px-4 py-3.5"
                >
                  <Package size={16} className="mt-0.5 flex-shrink-0 text-elektra-accent" />
                  <div>
                    <p className="text-sm font-medium text-black">{item.title}</p>
                    <p className="text-xs text-gray-medium mt-0.5 leading-relaxed">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
            <p className="text-xs text-gray-medium mt-4">
              …e molto altro ancora. Disponibilità e codici si confermano su richiesta.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
