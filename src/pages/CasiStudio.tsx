import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Settings,
  Cpu,
  CircuitBoard,
  ArrowRight,
  X,
} from 'lucide-react';
import Layout from '@/components/Layout';

/* ─── Types ─── */
interface CaseStudy {
  id: string;
  title: string;
  category: string;
  client: string;
  year: string;
  image: string;
  description: string;
  results: string[];
}

/* ─── Data ─── */
const caseStudies: CaseStudy[] = [
  {
    id: '1',
    title: 'Automazione Linea Assemblaggio',
    category: 'PLC',
    client: 'Industria Automobilistica',
    year: '2024',
    image: '/images/caso-plc.jpg',
    description: 'Progettazione e implementazione di un sistema di controllo PLC Siemens S7-1500 per una linea di assemblaggio automatico. Il sistema gestisce 12 stazioni di lavoro con sincronizzazione precisione millisecondi.',
    results: [
      'Aumento produzione del 35%',
      'Riduzione scarti del 60%',
      'Integrazione sistema HMI touchscreen',
    ],
  },
  {
    id: '2',
    title: 'Quadro Comando Centrale Termica',
    category: 'Quadristica',
    client: 'Centrale Energetica',
    year: '2023',
    image: '/images/caso-quadristica.jpg',
    description: 'Realizzazione completa di un quadro elettrico di comando e controllo per una centrale termica di medie dimensioni. Progettazione schemi elettrici, selezione componenti, cablaggio e collaudo.',
    results: [
      '48 moduli I/O installati',
      'Conforme normativa CEI 17-13',
      'Tempo realizzazione: 3 settimane',
    ],
  },
  {
    id: '3',
    title: 'Scheda Controllo Motore Brushless',
    category: 'PCB',
    client: 'Settore Aerospaziale',
    year: '2024',
    image: '/images/caso-pcb.jpg',
    description: 'Progettazione di una scheda elettronica a 6 strati per il controllo di motori brushless in applicazioni ad alta affidabilita. Design del layout, routing differenziale e gestione termica.',
    results: [
      '6 strati PCB con impedenza controllata',
      'Testing burn-in 72 ore',
      'Conforme standard IPC-A-610',
    ],
  },
  {
    id: '4',
    title: 'Retrofit Impianto Produttivo',
    category: 'PLC',
    client: 'Manifattura Ceramica',
    year: '2023',
    image: '/images/caso-plc.jpg',
    description: 'Modernizzazione del sistema di controllo di un impianto produttivo con sostituzione dei PLC obsoleti con nuova piattaforma Omron NJ-Series, inclusa riconfigurazione completa dei processi.',
    results: [
      'Riduzione consumi energetici del 25%',
      'Manutenzione predittiva implementata',
      'Connettivita Industry 4.0',
    ],
  },
  {
    id: '5',
    title: 'Quadri Distribuzione IT Industrial',
    category: 'Quadristica',
    client: 'Data Center Provider',
    year: '2024',
    image: '/images/caso-quadristica.jpg',
    description: 'Produzione in serie di 24 quadri elettrici di distribuzione per un data center industriale. Ogni quadro include protezione ridondata e monitoraggio remoto delle grandezze elettriche.',
    results: [
      '24 quadri consegnati in 4 settimane',
      'Monitoraggio remoto integrato',
      'UPS bypass manuale/automatico',
    ],
  },
  {
    id: '6',
    title: 'Sistema Acquisizione Dati Industriali',
    category: 'PCB',
    client: 'Settore Farmaceutico',
    year: '2023',
    image: '/images/caso-pcb.jpg',
    description: 'Sviluppo di un sistema embedded per l&apos;acquisizione e trasmissione dati da sensori di processo in ambiente GMP. Scheda con connettivita Ethernet, convertitori ADC 24bit e isolamento galvanico.',
    results: [
      '16 canali ADC 24bit simultanei',
      'Isolamento galvanico 2.5kV',
      'Conforme 21 CFR Part 11',
    ],
  },
];

const filters = ['Tutti', 'Quadristica', 'PLC', 'PCB'];

const categoryIcons: Record<string, React.ReactNode> = {
  'Quadristica': <Settings size={16} />,
  'PLC': <Cpu size={16} />,
  'PCB': <CircuitBoard size={16} />,
};

/* ═══════════════════════════════════════════════════════════ */

export default function CasiStudio() {
  const [activeFilter, setActiveFilter] = useState('Tutti');
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);

  const filtered = activeFilter === 'Tutti'
    ? caseStudies
    : caseStudies.filter((c) => c.category === activeFilter);

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
            <p className="text-xs uppercase tracking-widest text-gray-medium mb-4">Portfolio</p>
            <h1 className="text-5xl lg:text-7xl font-semibold text-black tracking-tight">
              Casi di Studio
            </h1>
            <p className="text-base text-gray-medium mt-4 max-w-xl">
              Progetti realizzati per clienti in diversi settori industriali. Ogni caso e una testimonianza della nostra competenza.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── GALLERY ─── */}
      <section className="py-16 lg:py-24 px-6 lg:px-10 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-12 reveal">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`text-sm font-medium px-5 py-2.5 rounded-lg transition-all duration-300 ${
                  activeFilter === f
                    ? 'bg-elektra-accent text-black'
                    : 'bg-gray-light text-gray-medium hover:bg-gray-dark hover:text-white'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Grid */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((c, i) => (
                <motion.div
                  key={c.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: i * 0.06, ease: [0.075, 0.82, 0.165, 1] }}
                  onClick={() => setSelectedCase(c)}
                  className="group cursor-pointer"
                >
                  <div className="relative rounded-2xl overflow-hidden bg-gray-light border border-black/5 hover:border-black/15 hover:shadow-panel transition-all duration-500">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={c.image}
                        alt={c.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.075,0.820,0.165,1)]"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.075,0.820,0.165,1)]">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="w-7 h-7 rounded-md bg-elektra-accent flex items-center justify-center text-black">
                          {categoryIcons[c.category]}
                        </span>
                        <span className="text-xs text-white/70 uppercase tracking-wider">{c.category}</span>
                      </div>
                      <h3 className="font-semibold text-lg text-white">{c.title}</h3>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs text-white/60">{c.client}</span>
                        <span className="text-white/30">&middot;</span>
                        <span className="text-xs text-white/60">{c.year}</span>
                      </div>
                    </div>
                    {/* Always visible tag */}
                    <div className="absolute top-4 left-4 group-hover:opacity-0 transition-opacity duration-300">
                      <span className="inline-flex items-center gap-1.5 bg-white/90 backdrop-blur-sm text-black text-xs font-medium px-3 py-1.5 rounded-full">
                        {categoryIcons[c.category]}
                        {c.category}
                      </span>
                    </div>
                  </div>
                  <h3 className="font-semibold text-base text-black mt-4 group-hover:text-gray-dark transition-colors duration-300 lg:hidden">
                    {c.title}
                  </h3>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ─── MODAL ─── */}
      <AnimatePresence>
        {selectedCase && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 lg:p-8"
            onClick={() => setSelectedCase(null)}
          >
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.97 }}
              transition={{ duration: 0.5, ease: [0.075, 0.82, 0.165, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-white rounded-2xl shadow-panel w-full max-w-4xl max-h-[90vh] overflow-y-auto"
            >
              {/* Close */}
              <button
                onClick={() => setSelectedCase(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-gray-light transition-colors duration-300"
              >
                <X size={18} />
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Image */}
                <div className="aspect-[4/3] lg:aspect-auto lg:h-full">
                  <img
                    src={selectedCase.image}
                    alt={selectedCase.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="p-8 lg:p-10">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-8 h-8 rounded-lg bg-elektra-accent flex items-center justify-center text-black">
                      {categoryIcons[selectedCase.category]}
                    </span>
                    <span className="text-xs uppercase tracking-widest text-gray-medium">{selectedCase.category}</span>
                  </div>

                  <h2 className="text-2xl lg:text-3xl font-semibold text-black tracking-tight">
                    {selectedCase.title}
                  </h2>

                  <div className="flex items-center gap-3 mt-3 text-sm text-gray-medium">
                    <span>{selectedCase.client}</span>
                    <span>&middot;</span>
                    <span>{selectedCase.year}</span>
                  </div>

                  <p className="text-sm text-gray-medium leading-relaxed mt-6">
                    {selectedCase.description}
                  </p>

                  <div className="mt-8">
                    <h4 className="text-xs uppercase tracking-widest text-gray-medium mb-4">Risultati</h4>
                    <ul className="space-y-2">
                      {selectedCase.results.map((r, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-black">
                          <ArrowRight size={14} className="mt-0.5 text-elektra-accent flex-shrink-0" />
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button className="mt-8 w-full bg-gray-dark text-white text-sm font-medium px-6 py-3 rounded-lg hover:bg-black transition-colors duration-300">
                    Richiedi Informazioni
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
}
