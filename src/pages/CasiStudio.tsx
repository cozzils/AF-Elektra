import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Settings,
  Cpu,
  CircuitBoard,
  ArrowRight,
  X,
  Info,
} from 'lucide-react';
import Layout from '@/components/Layout';
import SmartImage from '@/components/SmartImage';
import { usePageMeta } from '@/hooks/usePageMeta';

/* ─── Types ─── */
interface CaseStudy {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  scope: string[];
}

/*
 * Scenari applicativi descritti in forma tecnica e anonimizzata.
 * Non pubblichiamo percentuali, tempi o certificazioni che non siano
 * documentabili: referenze e dati di progetto si forniscono su richiesta.
 */
const caseStudies: CaseStudy[] = [
  {
    id: '1',
    title: 'Automazione linea assemblaggio',
    category: 'PLC',
    image: '/images/caso-plc.jpg',
    description: 'Sistema di controllo PLC Siemens S7-1500 per una linea di assemblaggio automatico, con gestione sincronizzata delle stazioni di lavoro e interfaccia HMI.',
    scope: [
      'Programmazione PLC e logica di sequenza',
      'Integrazione HMI touchscreen',
      'Diagnostica di linea e allarmi',
    ],
  },
  {
    id: '2',
    title: 'Quadro comando centrale termica',
    category: 'Quadristica',
    image: '/images/caso-quadristica.jpg',
    description: 'Quadro elettrico di comando e controllo per una centrale termica: schemi elettrici, selezione componenti, cablaggio e collaudo funzionale.',
    scope: [
      'Progettazione degli schemi elettrici',
      'Cablaggio e marcatura dei conduttori',
      'Collaudo e verifica delle protezioni',
    ],
  },
  {
    id: '3',
    title: 'Scheda controllo motore brushless',
    category: 'PCB',
    image: '/images/caso-pcb.jpg',
    description: 'Scheda elettronica multistrato per il controllo di motori brushless in applicazioni ad alta affidabilità, con particolare attenzione a routing e gestione termica.',
    scope: [
      'Layout PCB multistrato',
      'Routing differenziale e impedenza controllata',
      'Documentazione per la produzione',
    ],
  },
  {
    id: '4',
    title: 'Retrofit impianto produttivo',
    category: 'PLC',
    image: '/images/cablaggio.jpg',
    description: 'Modernizzazione del sistema di controllo di un impianto esistente, con sostituzione della piattaforma PLC e riconfigurazione dei processi.',
    scope: [
      'Analisi dello stato di fatto',
      'Sostituzione PLC e aggiornamento I/O',
      'Test di riavvio e messa in servizio',
    ],
  },
  {
    id: '5',
    title: 'Acquisizione dati da sensori',
    category: 'PCB',
    image: '/images/pcb-closeup.jpg',
    description: 'Sistema embedded per l’acquisizione e la trasmissione di dati da sensori di processo, con connettività Ethernet e isolamento galvanico.',
    scope: [
      'Progettazione hardware e firmware',
      'Convertitori ADC e isolamento galvanico',
      'Protocolli di comunicazione industriale',
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
  usePageMeta(
    'Progetti e Applicazioni | AF Elektra 2',
    'Tipologie di progetto seguite da AF Elektra 2: automazione PLC, quadristica e progettazione PCB per l’industria. Referenze disponibili su richiesta.',
    '/casi-studio',
  );

  const [activeFilter, setActiveFilter] = useState('Tutti');
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const lastFocusedElement = useRef<HTMLElement | null>(null);

  const openCase = (study: CaseStudy) => {
    lastFocusedElement.current = document.activeElement as HTMLElement | null;
    setSelectedCase(study);
  };

  // Esc, blocco scroll e focus trap mentre il modale è aperto
  useEffect(() => {
    if (!selectedCase) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedCase(null);
        return;
      }
      if (event.key !== 'Tab' || !dialogRef.current) return;

      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      lastFocusedElement.current?.focus();
    };
  }, [selectedCase]);

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
            <p className="text-xs uppercase tracking-widest text-gray-medium mb-4">Progetti</p>
            <h1 className="text-5xl lg:text-7xl font-semibold text-black tracking-tight">
              Progetti e applicazioni
            </h1>
            <p className="text-base text-gray-medium mt-4 max-w-2xl">
              Una selezione delle tipologie di intervento che seguiamo: automazione PLC, quadristica e progettazione di schede elettroniche.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── GALLERY ─── */}
      <section className="py-12 lg:py-20 px-6 lg:px-10 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-start gap-3 rounded-xl bg-gray-light border border-black/5 p-4 mb-10 text-sm text-gray-medium">
            <Info size={18} className="mt-0.5 flex-shrink-0 text-elektra-accent" />
            <p>
              Gli scenari sono descritti in forma tecnica e anonimizzata. Referenze, specifiche complete e dati di progetto sono disponibili su richiesta.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-10">
            {filters.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setActiveFilter(f)}
                aria-pressed={activeFilter === f}
                className={`text-sm font-medium px-5 py-2.5 rounded-lg transition-all duration-300 ${
                  activeFilter === f
                    ? 'bg-elektra-accent text-white'
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
                  onClick={() => openCase(c)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      openCase(c);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-haspopup="dialog"
                  aria-label={`Apri il progetto ${c.title}`}
                  className="group cursor-pointer rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-elektra-accent focus-visible:ring-offset-2"
                >
                  <div className="relative rounded-2xl overflow-hidden bg-gray-light border border-black/5 hover:border-black/15 hover:shadow-panel transition-all duration-500">
                    <div className="aspect-[4/3] overflow-hidden relative group-hover:scale-[1.03] transition-transform duration-500">
                      <div className="w-full h-full relative flex flex-col items-center justify-center p-6 text-center">
                        <SmartImage
                          src={c.image}
                          alt={c.title}
                          width={1344}
                          height={768}
                          loading="lazy"
                          decoding="async"
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/55" />
                        <h3 className="text-white font-bold text-lg md:text-xl z-10 drop-shadow-md px-4">{c.title}</h3>
                      </div>
                      <div className="absolute inset-0 bg-elektra-accent/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
                        <span className="text-white font-bold text-xl flex items-center gap-2">Dettagli <ArrowRight size={24} /></span>
                      </div>
                    </div>
                    <div className="absolute top-4 left-4 z-30">
                      <span className="inline-flex items-center gap-1.5 bg-white/90 backdrop-blur-sm text-black text-xs font-medium px-3 py-1.5 rounded-full shadow-sm">
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
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div
              ref={dialogRef}
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.97 }}
              transition={{ duration: 0.5, ease: [0.075, 0.82, 0.165, 1] }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="case-study-title"
              className="relative bg-white rounded-2xl shadow-panel w-full max-w-4xl max-h-[90vh] overflow-y-auto"
            >
              <button
                type="button"
                onClick={() => setSelectedCase(null)}
                aria-label="Chiudi il progetto"
                autoFocus
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-gray-light transition-colors duration-300"
              >
                <X size={18} />
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="aspect-[4/3] lg:aspect-auto lg:h-full">
                  <SmartImage
                    src={selectedCase.image}
                    alt={selectedCase.title}
                    width={1344}
                    height={768}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-8 lg:p-10">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-8 h-8 rounded-lg bg-elektra-accent flex items-center justify-center text-white">
                      {categoryIcons[selectedCase.category]}
                    </span>
                    <span className="text-xs uppercase tracking-widest text-gray-medium">{selectedCase.category}</span>
                  </div>

                  <h2 id="case-study-title" className="text-2xl lg:text-3xl font-semibold text-black tracking-tight">
                    {selectedCase.title}
                  </h2>

                  <p className="text-sm text-gray-medium leading-relaxed mt-6">
                    {selectedCase.description}
                  </p>

                  <div className="mt-8">
                    <h4 className="text-xs uppercase tracking-widest text-gray-medium mb-4">Ambito del progetto</h4>
                    <ul className="space-y-2">
                      {selectedCase.scope.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-black">
                          <ArrowRight size={14} className="mt-0.5 text-elektra-accent flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    to="/contatti"
                    className="mt-8 flex w-full items-center justify-center bg-gray-dark text-white text-sm font-medium px-6 py-3 rounded-lg hover:bg-black transition-colors duration-300"
                  >
                    Richiedi informazioni
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
}
