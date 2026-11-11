import { useState } from 'react';
import { Link, useSearchParams } from 'react-router';
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
  Waves,
} from 'lucide-react';
import Layout from '@/components/Layout';
import SmartImage from '@/components/SmartImage';
import { usePageMeta } from '@/hooks/usePageMeta';

/* ─── Types ─── */
interface Product {
  id: string;
  name: string;
  code: string;
  category: string;
  voltage: string;
  mounting: string;
  image: string;
  tagline: string;
  specs: string[];
}

/* ─── Catalogo reale ─── */
const products: Product[] = [
  {
    id: 'rp-1035-d',
    name: 'RP 1035 D',
    code: 'RP1035D-24F',
    category: 'Alimentatori switching',
    voltage: '100–240 V AC',
    mounting: 'Contenitore metallico',
    image: '/images/prodotti/rp-1035-d.jpg',
    tagline: 'Alimentatore switching 24 V DC da 1,5 A, 35 W, in contenitore metallico.',
    specs: ['IN 100–240 V AC', 'OUT 24 V DC · 1,5 A', 'LED DC ON', 'Trimmer V adj'],
  },
  {
    id: 'asg-05-10',
    name: 'ASG 05 / ASG 10',
    code: 'ASG05 · ASG10',
    category: 'Alimentatori switching',
    voltage: '24 V AC ±15%',
    mounting: 'DIN Rail',
    image: '/images/prodotti/asg-05-asg-10.jpg',
    tagline: 'Alimentatori switching da 5 A e 10 A con ingresso 24 V AC.',
    specs: ['IN 24 V AC ±15%', 'OUT 24 V DC · 5/10 A', 'DIN Rail', 'Case metallico'],
  },
  {
    id: 'al-02',
    name: 'AL 02',
    code: 'AL02',
    category: 'Alimentatori switching',
    voltage: '26–32 V AC',
    mounting: 'DIN Rail',
    image: '/images/prodotti/al-02.jpg',
    tagline: 'Alimentatore switching 4 A con protezione da sovratensione, sovraccarico e cortocircuito.',
    specs: ['IN 26–32 V AC', 'OUT 5,1–26 V DC · 4 A', 'LED ingresso/uscita', 'Trimmer di regolazione'],
  },
  {
    id: 'al-1a',
    name: 'AL 1A',
    code: 'AL1A',
    category: 'Alimentatori lineari',
    voltage: '24 V AC',
    mounting: 'DIN Rail',
    image: '/images/prodotti/al-1a.jpg',
    tagline: 'Alimentatore lineare 24 V DC da 0,5 A, con ripple contenuto.',
    specs: ['IN 24 V AC', 'OUT 24 V DC · 0,5 A', 'Ripple 5 mVpp', 'LED ingresso/uscita'],
  },
  {
    id: 'al-00',
    name: 'AL 00',
    code: 'AL00',
    category: 'Alimentatori lineari',
    voltage: '24 V AC',
    mounting: 'DIN Rail',
    image: '/images/prodotti/al-00.jpg',
    tagline: 'Alimentatore lineare 24 V DC da 1,5 A, con regolazione della limitazione di corrente.',
    specs: ['IN 24 V AC', 'OUT 24 V DC · 1,5 A', 'Ripple 5 mVpp', 'Limite corrente'],
  },
  {
    id: 'ge-34',
    name: 'GE 34',
    code: 'GE34',
    category: 'Schede interfaccia',
    voltage: '24 V DC',
    mounting: 'Open frame',
    image: '/images/prodotti/ge-34.jpg',
    tagline: 'Scheda interfaccia a relè, 24 V DC, in versione open frame.',
    specs: ['Ingresso 24 V DC', 'Open frame', 'Uscita a relè', 'LED di stato'],
  },
  {
    id: 'af-4-6-8-rele',
    name: 'AF 4 / 6 / 8 RELÈ',
    code: 'AF 4 · AF 6 · AF 8',
    category: 'Schede interfaccia',
    voltage: '24 V DC',
    mounting: 'DIN Rail',
    image: '/images/prodotti/af-4-6-8-rele.jpg',
    tagline: 'Schede interfaccia a 4, 6 o 8 relè in contenitore per barra DIN.',
    specs: ['4 / 6 / 8 canali', '24 V DC', 'Contatti in scambio o NO', 'Connettori estraibili'],
  },
  {
    id: 'el2',
    name: 'EL2',
    code: 'EL2',
    category: 'Schede interfaccia',
    voltage: '24 V DC',
    mounting: 'DIN Rail',
    image: '/images/prodotti/el2.jpg',
    tagline: 'Scheda interfaccia a 4 transistor, con LED di segnalazione per ogni canale.',
    specs: ['4 canali', 'IN 24 V DC · 10 mA', 'OUT 60 V · 2 A', 'LED per canale'],
  },
  {
    id: 'ge-34-t',
    name: 'GE 34/T',
    code: 'GE34/T',
    category: 'Schede tastatori',
    voltage: '24 V DC',
    mounting: 'Open frame',
    image: '/images/prodotti/ge-34-t.jpg',
    tagline: 'Scheda tastatore a 2 relè per sonda a bagno con principio resistivo.',
    specs: ['2 relè', '24 V DC', 'Sonda resistiva', 'Open frame'],
  },
  {
    id: 'af-t02-of',
    name: 'AF-T02/OF',
    code: 'AF-T02/OF',
    category: 'Schede tastatori',
    voltage: '230 V AC',
    mounting: 'Open frame',
    image: '/images/prodotti/af-t02-of.jpg',
    tagline: 'Tastatore elettronico open frame per 2 sonde, STOP e SAFETY.',
    specs: ['2 sonde', 'STOP + SAFETY', '230 V AC · 50 Hz', 'LED di stato'],
  },
  {
    id: 'af-t02-cs',
    name: 'AF-T02/CS',
    code: 'AF-T02/CS',
    category: 'Schede tastatori',
    voltage: '230 V AC',
    mounting: 'DIN Rail',
    image: '/images/prodotti/af-t02-cs.jpg',
    tagline: 'Tastatore elettronico in contenitore chiuso per barra DIN, per 2 sonde.',
    specs: ['2 sonde', 'STOP + SAFETY', '230 V AC · 50 Hz', 'Contenitore DIN'],
  },
  {
    id: 'rele-statico-dc',
    name: 'Relè statici DC AF-60V',
    code: 'AF-60VDC-2A · -4A',
    category: 'Relè statici',
    voltage: '10–30 V DC',
    mounting: 'Circuito stampato',
    image: '/images/prodotti/rele-statico-dc-af-60v.jpg',
    tagline: 'Relè a stato solido DC da 2 A o 4 A, pin-to-pin con relè elettromeccanici.',
    specs: ['60 V DC', '2 A / 4 A', 'Controllo 10–30 V DC', 'Commutazione istantanea'],
  },
  {
    id: 'rele-statico-ac',
    name: 'Relè statici AC AF-230V',
    code: 'AF-230V/A2 · A2-5 · A2-3.5',
    category: 'Relè statici',
    voltage: '10–30 V DC',
    mounting: 'Circuito stampato',
    image: '/images/prodotti/rele-statico-ac-af-230v.jpg',
    tagline: 'Relè a stato solido AC con commutazione a zero crossing, corrente nominale 2 A.',
    specs: ['240 V AC', '2 A', 'Controllo 10–30 V DC', 'Zero crossing'],
  },
];

const categories = [
  'Tutti',
  'Alimentatori switching',
  'Alimentatori lineari',
  'Schede interfaccia',
  'Schede tastatori',
  'Relè statici',
];
const voltages = ['Tutti', ...Array.from(new Set(products.map((p) => p.voltage)))];
const mountings = ['Tutti', ...Array.from(new Set(products.map((p) => p.mounting)))];

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
    <div className="group bg-white rounded-2xl border border-black/5 overflow-hidden hover:border-black/15 hover:shadow-panel transition-all duration-500">
      {/* Image */}
      <div className="relative aspect-square bg-gray-light overflow-hidden">
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
        <div className="flex gap-2 mt-4">
          <a
            href={`mailto:uff.tecnico@afelektra.com?subject=${encodeURIComponent(`Richiesta scheda tecnica ${product.code}`)}`}
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
}

function FilterPanel({
  selectedCategory,
  onCategoryChange,
  selectedVoltage,
  onVoltageChange,
  selectedMounting,
  onMountingChange,
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

      <p className="text-xs text-gray-medium leading-relaxed border-t border-black/10 pt-6">
        Tutti i prodotti sono normalmente disponibili a magazzino. Tensioni, contatti e configurazioni possono essere personalizzati su richiesta.
      </p>
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

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('categoria');
  const selectedCategory = categoryParam && categories.includes(categoryParam) ? categoryParam : 'Tutti';
  const [selectedVoltage, setSelectedVoltage] = useState('Tutti');
  const [selectedMounting, setSelectedMounting] = useState('Tutti');

  const setSelectedCategory = (category: string) => {
    const next = new URLSearchParams(searchParams);
    if (category === 'Tutti') next.delete('categoria');
    else next.set('categoria', category);
    setSearchParams(next, { replace: true });
  };

  const filteredProducts = products.filter((p) => {
    if (selectedCategory !== 'Tutti' && p.category !== selectedCategory) return false;
    if (selectedVoltage !== 'Tutti' && p.voltage !== selectedVoltage) return false;
    if (selectedMounting !== 'Tutti' && p.mounting !== selectedMounting) return false;
    return true;
  });

  const filtersActive = selectedCategory !== 'Tutti'
    || selectedVoltage !== 'Tutti'
    || selectedMounting !== 'Tutti';

  const resetFilters = () => {
    setSelectedCategory('Tutti');
    setSelectedVoltage('Tutti');
    setSelectedMounting('Tutti');
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
                  />
                </div>
              )}
            </div>

            {/* Products Grid */}
            <div className="flex-1">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-6">
                <p className="text-sm text-gray-medium" aria-live="polite">
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

              <p className="text-xs text-gray-medium mt-10 max-w-2xl">
                Immagini dei prodotti reali. Caratteristiche, tensioni e configurazioni possono essere personalizzate su richiesta. Per schede tecniche, disponibilità aggiornata e codici alternativi scrivici: ti rispondiamo con la documentazione del prodotto.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
