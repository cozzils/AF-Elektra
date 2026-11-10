import { useState } from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import {
  Filter,
  X,
  ChevronDown,
  FileText,
  Plus,
  Zap,
  ToggleRight,
  CircuitBoard,
  Puzzle,
} from 'lucide-react';
import Layout from '@/components/Layout';
import { usePageMeta } from '@/hooks/usePageMeta';

/* ─── Types ─── */
interface Product {
  id: string;
  name: string;
  code: string;
  category: string;
  voltage: string;
  mounting: string;
  available: boolean;
  delivery?: string;
  image: string;
  specs: string[];
}

/* ─── Demo Data ─── */
const products: Product[] = [
  {
    id: '1',
    name: 'Alimentatore Switching Din',
    code: 'PWR-SW-24V-5A',
    category: 'Alimentatori',
    voltage: '85-264 VAC',
    mounting: 'DIN Rail',
    available: true,
    image: '/images/alimentatore.jpg',
    specs: ['85-264 VAC in', '24VDC 5A out', 'DIN 35mm'],
  },
  {
    id: '2',
    name: 'Relè Statico Monofase',
    code: 'RLY-ST-AC-40A',
    category: 'Relè Statici',
    voltage: '4-32 VDC',
    mounting: 'DIN Rail',
    available: true,
    image: '/images/rele.jpg',
    specs: ['4-32 VDC ctrl', '24-480 VAC', '40A max'],
  },
  {
    id: '3',
    name: 'Scheda Interfaccia 8 Relè',
    code: 'INT-BRD-8R-24V',
    category: 'Schede Interfaccia',
    voltage: '24 VDC',
    mounting: 'DIN Rail',
    available: false,
    delivery: '2 settimane',
    image: '/images/scheda-interfaccia.jpg',
    specs: ['8 canali SPDT', '24VDC', '10A@250VAC'],
  },
  {
    id: '4',
    name: 'Alimentatore Lineare Aperto',
    code: 'PWR-LIN-12V-1A',
    category: 'Alimentatori',
    voltage: '230 VAC',
    mounting: 'Aperto',
    available: true,
    image: '/images/alimentatore-lineare.jpg',
    specs: ['230 VAC in', '12VDC 1A', '<2mV ripple'],
  },
  {
    id: '5',
    name: 'Relè Statico Trifase',
    code: 'RLY-ST-3PH-25A',
    category: 'Relè Statici',
    voltage: '4-32 VDC',
    mounting: 'DIN Rail',
    available: true,
    image: '/images/rele.jpg',
    specs: ['4-32 VDC ctrl', '24-600 VAC', '25A max'],
  },
  {
    id: '6',
    name: 'Scheda I/O Analogica 4ch',
    code: 'INT-BRD-4A-10V',
    category: 'Schede Interfaccia',
    voltage: '24 VDC',
    mounting: 'DIN Rail',
    available: true,
    image: '/images/pcb-closeup.jpg',
    specs: ['4 canali', '0-10V / 4-20mA', 'Isolata'],
  },
  {
    id: '7',
    name: 'Alimentatore UPS 24V 10A',
    code: 'PWR-UPS-24V-10A',
    category: 'Alimentatori',
    voltage: '85-264 VAC',
    mounting: 'DIN Rail',
    available: false,
    delivery: '3 settimane',
    image: '/images/alimentatore.jpg',
    specs: ['85-264 VAC in', '24VDC 10A', 'Backup batteria'],
  },
  {
    id: '8',
    name: 'Relè Statico DC-DC 100A',
    code: 'RLY-ST-DC-100A',
    category: 'Relè Statici',
    voltage: '3-32 VDC',
    mounting: 'Panel',
    available: true,
    image: '/images/rele.jpg',
    specs: ['3-32 VDC ctrl', '12-120 VDC', '100A max'],
  },
];

const categories = ['Tutti', 'Alimentatori', 'Schede Interfaccia', 'Relè Statici', 'Componenti'];
const voltages = ['Tutti', '85-264 VAC', '230 VAC', '4-32 VDC', '24 VDC', '3-32 VDC'];
const mountings = ['Tutti', 'DIN Rail', 'Aperto', 'Panel'];

const categoryIcons: Record<string, React.ReactNode> = {
  'Alimentatori': <Zap size={16} />,
  'Relè Statici': <ToggleRight size={16} />,
  'Schede Interfaccia': <CircuitBoard size={16} />,
  'Componenti': <Puzzle size={16} />,
};

/* ─── Product Card ─── */
function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group bg-white rounded-2xl border border-black/5 overflow-hidden hover:border-black/15 hover:shadow-panel transition-all duration-500">
      {/* Image */}
      <div className="relative aspect-square bg-gray-light overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out-circ"
        />
        {/* Badge */}
        <div className="absolute top-3 left-3">
          {product.available ? (
            <span className="inline-flex items-center gap-1 bg-elektra-accent text-white text-xs font-medium px-2.5 py-1 rounded-full">
              Disponibile
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 bg-orange-100 text-orange-700 text-xs font-medium px-2.5 py-1 rounded-full">
              Consegna {product.delivery}
            </span>
          )}
        </div>
        {/* Category icon */}
        <div className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-white/90 backdrop-blur-sm flex items-center justify-center text-gray-dark">
          {categoryIcons[product.category] || <Puzzle size={14} />}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-xs text-gray-medium font-mono">{product.code}</p>
            <h3 className="font-semibold text-base text-black mt-0.5 group-hover:text-gray-dark transition-colors duration-300">
              {product.name}
            </h3>
          </div>
        </div>

        {/* Specs */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {product.specs.map((spec, i) => (
            <span key={i} className="text-xs text-gray-medium bg-gray-light px-2 py-0.5 rounded-md">
              {spec}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-4">
          <a
            href={`mailto:afelektra2@afelektra.com?subject=${encodeURIComponent(`Richiesta scheda tecnica ${product.code}`)}`}
            className="flex-1 flex items-center justify-center gap-1.5 text-xs font-medium bg-gray-light text-gray-dark px-3 py-2.5 rounded-lg hover:bg-gray-dark hover:text-white transition-colors duration-300"
          >
            <FileText size={14} />
            Scheda Tecnica
          </a>
          <Link
            to="/contatti"
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

/* ─── Filter Panel ─── */
interface FilterPanelProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  selectedVoltage: string;
  onVoltageChange: (voltage: string) => void;
  selectedMounting: string;
  onMountingChange: (mounting: string) => void;
  onlyAvailable: boolean;
  onOnlyAvailableChange: (value: boolean) => void;
}

function FilterPanel({
  selectedCategory,
  onCategoryChange,
  selectedVoltage,
  onVoltageChange,
  selectedMounting,
  onMountingChange,
  onlyAvailable,
  onOnlyAvailableChange,
}: FilterPanelProps) {
  return (
    <div className="space-y-8">
      {/* Category */}
      <div>
        <h4 className="text-xs uppercase tracking-widest text-gray-medium mb-4">Categoria</h4>
        <div className="space-y-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              aria-pressed={selectedCategory === cat}
              onClick={() => onCategoryChange(cat)}
              className={`block w-full text-left text-sm px-3 py-2 rounded-lg transition-colors duration-300 ${
                selectedCategory === cat
                  ? 'bg-elektra-accent text-white font-medium'
                  : 'text-gray-medium hover:bg-gray-light hover:text-black'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Voltage */}
      <div>
        <h4 className="text-xs uppercase tracking-widest text-gray-medium mb-4">Tensione Ingresso</h4>
        <div className="space-y-1.5">
          {voltages.map((v) => (
            <button
              key={v}
              type="button"
              aria-pressed={selectedVoltage === v}
              onClick={() => onVoltageChange(v)}
              className={`block w-full text-left text-sm px-3 py-2 rounded-lg transition-colors duration-300 ${
                selectedVoltage === v
                  ? 'bg-elektra-accent text-white font-medium'
                  : 'text-gray-medium hover:bg-gray-light hover:text-black'
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      {/* Mounting */}
      <div>
        <h4 className="text-xs uppercase tracking-widest text-gray-medium mb-4">Tipo Montaggio</h4>
        <div className="space-y-1.5">
          {mountings.map((m) => (
            <button
              key={m}
              type="button"
              aria-pressed={selectedMounting === m}
              onClick={() => onMountingChange(m)}
              className={`block w-full text-left text-sm px-3 py-2 rounded-lg transition-colors duration-300 ${
                selectedMounting === m
                  ? 'bg-elektra-accent text-white font-medium'
                  : 'text-gray-medium hover:bg-gray-light hover:text-black'
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* Availability */}
      <div>
        <button
          type="button"
          role="switch"
          aria-checked={onlyAvailable}
          onClick={() => onOnlyAvailableChange(!onlyAvailable)}
          className="flex items-center gap-3 cursor-pointer group w-full text-left"
        >
          <span
            aria-hidden="true"
            className={`w-10 h-6 rounded-full transition-colors duration-300 flex items-center flex-shrink-0 ${
              onlyAvailable ? 'bg-elektra-accent' : 'bg-gray-medium/30'
            }`}
          >
            <span
              className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-300 ${
                onlyAvailable ? 'translate-x-5' : 'translate-x-0.5'
              }`}
            />
          </span>
          <span className="text-sm text-gray-medium group-hover:text-black transition-colors duration-300">
            Solo disponibili
          </span>
        </button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════ */

export default function Catalogo() {
  usePageMeta(
    'Catalogo Prodotti | AF Elektra 2',
    'Alimentatori, schede interfaccia, relè statici e componenti per l’elettronica industriale. Scopri il catalogo AF Elektra 2 e richiedi un preventivo.',
    '/catalogo',
  );

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Tutti');
  const [selectedVoltage, setSelectedVoltage] = useState('Tutti');
  const [selectedMounting, setSelectedMounting] = useState('Tutti');
  const [onlyAvailable, setOnlyAvailable] = useState(false);

  const filteredProducts = products.filter((p) => {
    if (selectedCategory !== 'Tutti' && p.category !== selectedCategory) return false;
    if (selectedVoltage !== 'Tutti' && p.voltage !== selectedVoltage) return false;
    if (selectedMounting !== 'Tutti' && p.mounting !== selectedMounting) return false;
    if (onlyAvailable && !p.available) return false;
    return true;
  });

  const filtersActive = selectedCategory !== 'Tutti'
    || selectedVoltage !== 'Tutti'
    || selectedMounting !== 'Tutti'
    || onlyAvailable;

  const resetFilters = () => {
    setSelectedCategory('Tutti');
    setSelectedVoltage('Tutti');
    setSelectedMounting('Tutti');
    setOnlyAvailable(false);
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
              Selezione di prodotti per l&apos;elettronica industriale. Alimentatori, schede interfaccia, relè statici e componenti.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── CATALOG CONTENT ─── */}
      <section className="py-12 lg:py-16 px-6 lg:px-10 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Sidebar Filters - Desktop */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-24">
                <h3 className="font-semibold text-sm text-black mb-6">Filtri</h3>
                <FilterPanel
                  selectedCategory={selectedCategory}
                  onCategoryChange={setSelectedCategory}
                  selectedVoltage={selectedVoltage}
                  onVoltageChange={setSelectedVoltage}
                  selectedMounting={selectedMounting}
                  onMountingChange={setSelectedMounting}
                  onlyAvailable={onlyAvailable}
                  onOnlyAvailableChange={setOnlyAvailable}
                />
              </div>
            </aside>

            {/* Mobile Filter Toggle */}
            <div className="lg:hidden w-full mb-6">
              <button
                type="button"
                onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
                aria-expanded={mobileFilterOpen}
                aria-controls="mobile-filter-panel"
                className="flex items-center gap-2 bg-gray-light text-black text-sm font-medium px-4 py-2.5 rounded-lg"
              >
                <Filter size={16} />
                Filtri
                <ChevronDown size={14} className={`transition-transform duration-300 ${mobileFilterOpen ? 'rotate-180' : ''}`} />
              </button>

              {mobileFilterOpen && (
                <div id="mobile-filter-panel" className="mt-4 bg-gray-light rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-sm">Filtri</h3>
                    <button type="button" onClick={() => setMobileFilterOpen(false)} aria-label="Chiudi i filtri">
                      <X size={18} />
                    </button>
                  </div>
                  <FilterPanel
                  selectedCategory={selectedCategory}
                  onCategoryChange={setSelectedCategory}
                  selectedVoltage={selectedVoltage}
                  onVoltageChange={setSelectedVoltage}
                  selectedMounting={selectedMounting}
                  onMountingChange={setSelectedMounting}
                  onlyAvailable={onlyAvailable}
                  onOnlyAvailableChange={setOnlyAvailable}
                />
                </div>
              )}
            </div>

            {/* Products Grid */}
            <div className="flex-1">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-6">
                <p className="text-sm text-gray-medium">
                  {filteredProducts.length} prodott{filteredProducts.length === 1 ? 'o' : 'i'} trovat{filteredProducts.length === 1 ? 'o' : 'i'}
                </p>
                {/* Active filter pills */}
                <div className="flex items-center gap-2 flex-wrap">
                  {selectedCategory !== 'Tutti' && (
                    <span className="inline-flex items-center gap-1 text-xs bg-elektra-accent text-white px-2.5 py-1 rounded-full">
                      {selectedCategory}
                      <button type="button" onClick={() => setSelectedCategory('Tutti')} aria-label={`Rimuovi il filtro ${selectedCategory}`}>
                        <X size={12} />
                      </button>
                    </span>
                  )}
                  {selectedVoltage !== 'Tutti' && (
                    <span className="inline-flex items-center gap-1 text-xs bg-elektra-accent text-white px-2.5 py-1 rounded-full">
                      {selectedVoltage}
                      <button type="button" onClick={() => setSelectedVoltage('Tutti')} aria-label={`Rimuovi il filtro ${selectedVoltage}`}>
                        <X size={12} />
                      </button>
                    </span>
                  )}
                  {selectedMounting !== 'Tutti' && (
                    <span className="inline-flex items-center gap-1 text-xs bg-elektra-accent text-white px-2.5 py-1 rounded-full">
                      {selectedMounting}
                      <button type="button" onClick={() => setSelectedMounting('Tutti')} aria-label={`Rimuovi il filtro ${selectedMounting}`}>
                        <X size={12} />
                      </button>
                    </span>
                  )}
                  {onlyAvailable && (
                    <span className="inline-flex items-center gap-1 text-xs bg-elektra-accent text-white px-2.5 py-1 rounded-full">
                      Solo disponibili
                      <button type="button" onClick={() => setOnlyAvailable(false)} aria-label="Rimuovi il filtro Solo disponibili">
                        <X size={12} />
                      </button>
                    </span>
                  )}
                  {filtersActive && (
                    <button
                      type="button"
                      onClick={resetFilters}
                      className="text-xs font-medium text-black underline hover:no-underline px-1"
                    >
                      Azzera filtri
                    </button>
                  )}
                </div>
              </div>

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
                  <p className="text-gray-medium text-lg">Nessun prodotto trovato con i filtri selezionati.</p>
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="mt-4 text-sm font-medium text-black underline hover:no-underline"
                  >
                    Resetta filtri
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
