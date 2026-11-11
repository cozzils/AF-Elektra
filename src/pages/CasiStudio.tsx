import { useState } from 'react';
import { Link } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check, ExternalLink } from 'lucide-react';
import Layout from '@/components/Layout';
import { usePageMeta } from '@/hooks/usePageMeta';

interface Realizzazione {
  id: string;
  title: string;
  category: string;
  description: string;
  scope: string[];
}

/*
 * Elenco delle realizzazioni documentate dall'azienda (sito 2018, pagina
 * "Realizzazioni e novità"). Non pubblichiamo referenze, numeri o dati di
 * progetto che non siano confermati: per approfondimenti si contatta l'ufficio
 * tecnico.
 */
const realizzazioni: Realizzazione[] = [
  {
    id: 'soft-start',
    title: 'Relè soft start',
    category: 'Schede di comando',
    description: 'Modulo di avvio controllato per carichi elettrici, sviluppato su specifica del cliente.',
    scope: ['Sezione di potenza e comando', 'Sviluppo firmware', 'Collaudo su banco'],
  },
  {
    id: 'cancello',
    title: 'Scheda comando cancello elettronico',
    category: 'Schede di comando',
    description: 'Elettronica di comando per automazioni di cancelli, con gestione degli ingressi di comando e di sicurezza.',
    scope: ['Schema e layout PCB', 'Logica di movimentazione', 'Montaggio e collaudo'],
  },
  {
    id: 'banco-cassa',
    title: 'Scheda per banchi cassa con display o LED',
    category: 'Schede di comando',
    description: 'Elettronica di comando e visualizzazione per banchi cassa, con uscite per display o indicatori LED.',
    scope: ['Gestione display e LED', 'Interfaccia verso periferiche', 'Produzione e test'],
  },
  {
    id: 'allarmi',
    title: 'Allarmi acustici e luminosi',
    category: 'Schede di comando',
    description: 'Schede di attivazione e pilotaggio per segnalazioni acustiche e luminose.',
    scope: ['Pilotaggio buzzer e LED', 'Gestione temporizzazioni', 'Test funzionale'],
  },
  {
    id: 'strisce-led',
    title: 'Strisce LED per impiego industriale',
    category: 'Schede di comando',
    description: 'Elettronica di controllo per strisce LED destinate all’illuminazione industriale.',
    scope: ['Driver di corrente', 'Regolazione dell’intensità', 'Affidabilità in funzionamento continuo'],
  },
  {
    id: 'videocamere',
    title: 'Scheda comando videocamere',
    category: 'Schede di comando',
    description: 'Scheda di comando e selezione per videocamere in installazioni professionali.',
    scope: ['Commutazione dei segnali', 'Alimentazione dedicata', 'Interfaccia di comando'],
  },
  {
    id: 'termocircolatore',
    title: 'Scheda controllo termocircolatore',
    category: 'Schede di comando',
    description: 'Elettronica di controllo per termocircolatori, con gestione di sensori e attuatori.',
    scope: ['Lettura sonde', 'Controllo pompa e riscaldatore', 'Logiche di sicurezza'],
  },
  {
    id: 'persiane',
    title: 'Scheda comando persiane motorizzate',
    category: 'Schede di comando',
    description: 'Scheda di comando per persiane motorizzate, con gestione della salita, della discesa e dei finecorsa.',
    scope: ['Logica di movimento', 'Ingressi finecorsa', 'Protezioni motore'],
  },
  {
    id: 'cassetto',
    title: 'Scheda apertura temporizzata cassetto',
    category: 'Schede di comando',
    description: 'Scheda per l’apertura temporizzata di cassetti, con gestione dei tempi e del consenso di apertura.',
    scope: ['Temporizzazioni', 'Attuazione', 'Sicurezza del meccanismo'],
  },
  {
    id: 'lampade-multicolor',
    title: 'Scheda comando lampade multicolor',
    category: 'Schede di comando',
    description: 'Scheda di comando per lampade multicolor, con gestione dei colori e delle sequenze luminose.',
    scope: ['Pilotaggio dei canali', 'Sequenze e scenari', 'Interfaccia di comando'],
  },
  {
    id: 'encoder',
    title: 'Scheda interfaccia segnali encoder',
    category: 'Interfaccia e segnale',
    description: 'Interfaccia per l’acquisizione e la conversione dei segnali provenienti da encoder.',
    scope: ['Condizionamento dei segnali', 'Isolamento', 'Trasmissione al controllo'],
  },
  {
    id: 'interfaccia-dc',
    title: 'Scheda interfaccia in corrente continua',
    category: 'Interfaccia e segnale',
    description: 'Interfaccia per segnali in corrente continua, con adattamento e isolamento verso il sistema di controllo.',
    scope: ['Adattamento dei livelli', 'Isolamento galvanico', 'Protezioni d’ingresso'],
  },
  {
    id: 'sonda-ntc',
    title: 'Scheda per sonda NTC',
    category: 'Interfaccia e segnale',
    description: 'Scheda di condizionamento per sonde NTC, per la lettura della temperatura e l’invio del dato al controllo.',
    scope: ['Linearizzazione', 'Filtraggio del segnale', 'Uscita verso PLC'],
  },
  {
    id: 'variatore',
    title: 'Scheda variatore di potenza',
    category: 'Interfaccia e segnale',
    description: 'Variatore elettronico di potenza per il controllo progressivo di carichi elettrici.',
    scope: ['Sezione di potenza', 'Comando del carico', 'Gestione termica'],
  },
  {
    id: 'alimentatori-potenza',
    title: 'Alimentatori di potenza',
    category: 'Alimentazione',
    description: 'Alimentatori progettati su specifica per applicazioni che richiedono potenze superiori ai modelli di catalogo.',
    scope: ['Dimensionamento', 'Protezioni', 'Collaudo sotto carico'],
  },
  {
    id: 'plc-visual-30',
    title: 'PLC Visual 30',
    category: 'Automazione e PLC',
    description: 'Controllore programmabile con visualizzatore integrato, sviluppato per applicazioni di automazione compatta.',
    scope: ['Hardware di controllo', 'Firmware', 'Visualizzazione di processo'],
  },
  {
    id: 'plc-16-24',
    title: 'Scheda PLC 16 outputs / 24 inputs',
    category: 'Automazione e PLC',
    description: 'Scheda PLC con 16 uscite e 24 ingressi per il controllo di impianti e macchine.',
    scope: ['Gestione I/O', 'Isolamento', 'Programmazione applicativa'],
  },
  {
    id: 'plc-vari',
    title: 'PLC VARI',
    category: 'Automazione e PLC',
    description: 'Controllore programmabile sviluppato su specifica, con varianti hardware e software.',
    scope: ['Progettazione hardware', 'Sviluppo firmware', 'Collaudo funzionale'],
  },
  {
    id: 'modem',
    title: 'Scheda modem',
    category: 'Automazione e PLC',
    description: 'Scheda modem per la connettività delle apparecchiature di automazione.',
    scope: ['Comunicazione', 'Integrazione nel sistema', 'Test di trasmissione'],
  },
  {
    id: 'microprocessore-display',
    title: 'Schede a microprocessore con visualizzatore',
    category: 'Automazione e PLC',
    description: 'Schede a microprocessore con display integrato per il controllo e la visualizzazione di processo.',
    scope: ['Hardware', 'Firmware', 'Interfaccia utente'],
  },
  {
    id: 'dosaggio-colla',
    title: 'Apparecchiatura dosaggio colla',
    category: 'Automazione e PLC',
    description: 'Apparecchiatura per il dosaggio controllato di colla nei processi produttivi.',
    scope: ['Controllo del dosaggio', 'Temporizzazioni', 'Integrazione in linea'],
  },
  {
    id: 'elettrovalvola',
    title: 'Apparecchiatura controllo elettrovalvola proporzionale',
    category: 'Interfaccia e segnale',
    description: 'Elettronica di controllo per elettrovalvole proporzionali, con regolazione del segnale di comando.',
    scope: ['Pilotaggio proporzionale', 'Feedback', 'Taratura'],
  },
];

const categories = [
  'Tutti',
  'Schede di comando',
  'Interfaccia e segnale',
  'Alimentazione',
  'Automazione e PLC',
];

const categoryCounts = new Map(
  categories.map((category) => [
    category,
    category === 'Tutti'
      ? realizzazioni.length
      : realizzazioni.filter((item) => item.category === category).length,
  ]),
);

export default function CasiStudio() {
  usePageMeta(
    'Progetti e Realizzazioni | AF Elektra 2',
    'Le realizzazioni AF Elektra 2: schede di comando, interfacce di segnale, alimentatori e automazione PLC progettati e prodotti a Castenedolo (BS).',
    '/casi-studio',
  );

  const [activeFilter, setActiveFilter] = useState('Tutti');

  const filtered = activeFilter === 'Tutti'
    ? realizzazioni
    : realizzazioni.filter((item) => item.category === activeFilter);

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
            <p className="text-xs uppercase tracking-widest text-white/55 mb-4">Progetti</p>
            <h1 className="text-5xl lg:text-7xl font-semibold text-black tracking-tight">
              Progetti e realizzazioni
            </h1>
            <p className="text-base text-white/55 mt-4 max-w-2xl">
              Le nostre creazioni sono pensate innanzitutto per un impiego facile: morsetti estraibili o a pressione, fusibili verticali e componentistica miniaturizzata per contenere le dimensioni, perché il cablaggio sia rapido e senza esitazioni durante il montaggio.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── ELENCO ─── */}
      <section className="py-12 lg:py-20 px-6 lg:px-10 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-10">
            <div>
              <p className="text-xs uppercase tracking-widest text-white/55 mb-2">Ambiti</p>
              <h2 className="text-2xl lg:text-3xl font-semibold text-black tracking-tight">
                Progettate e prodotte in casa
              </h2>
            </div>
            <p className="text-sm text-white/55 max-w-md">
              Una selezione delle applicazioni sviluppate su richiesta, dal singolo circuito alla macchina completa.
            </p>
          </div>

          {/* Filtri */}
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map((category) => {
              const active = activeFilter === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveFilter(category)}
                  aria-pressed={active}
                  className={`inline-flex items-center gap-2 text-sm px-4 py-2 rounded-full border transition-colors duration-300 ${
                    active
                      ? 'bg-elektra-accent border-elektra-accent text-white font-medium'
                      : 'border-black/10 text-white/55 hover:border-black/30 hover:text-black'
                  }`}
                >
                  {category === 'Tutti' ? 'Tutte le realizzazioni' : category}
                  <span className={`text-xs tabular-nums ${active ? 'text-white/75' : 'text-white/55'}`}>
                    {categoryCounts.get(category)}
                  </span>
                </button>
              );
            })}
          </div>

          <p className="text-sm text-white/55 mb-6" aria-live="polite">
            {filtered.length} {filtered.length === 1 ? 'realizzazione' : 'realizzazioni'}
          </p>

          {/* Griglia */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            <AnimatePresence mode="popLayout">
              {filtered.map((item, index) => (
                <motion.article
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.35, delay: index * 0.04, ease: [0.075, 0.82, 0.165, 1] }}
                  className="flex flex-col bg-white rounded-2xl border border-black/5 p-6 hover:border-elektra-accent/50 hover:shadow-panel transition-all duration-500"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[11px] uppercase tracking-widest text-white/55">
                      {item.category}
                    </span>
                    <span className="text-xs font-mono text-white/50">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-black mt-3 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-sm text-white/55 mt-2 leading-relaxed flex-1">
                    {item.description}
                  </p>

                  <div className="mt-5 pt-4 border-t border-black/5">
                    <p className="text-[11px] uppercase tracking-widest text-white/55 mb-2">
                      Ambito
                    </p>
                    <ul className="space-y-1.5">
                      {item.scope.map((scope) => (
                        <li key={scope} className="flex items-start gap-2 text-xs text-white/65">
                          <Check size={12} className="mt-0.5 flex-shrink-0 text-neon" />
                          {scope}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-16 lg:py-24 px-6 lg:px-10 bg-gray-light">
        <div className="max-w-7xl mx-auto bg-black rounded-2xl px-8 py-12 lg:px-16 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8">
            <p className="text-xs uppercase tracking-widest text-elektra-accent-light mb-3">Su misura</p>
            <h2 className="text-3xl lg:text-4xl font-semibold text-white tracking-tight">
              Hai un’applicazione da sviluppare?
            </h2>
            <p className="text-base text-white/70 mt-4 max-w-xl">
              Progettiamo la scheda, realizziamo i master, montiamo e collaudiamo. Raccontaci il problema da risolvere: ti diciamo come possiamo intervenire.
            </p>
          </div>
          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
            <Link
              to="/contatti"
              className="inline-flex items-center justify-center gap-2 bg-elektra-accent text-white text-sm font-semibold px-6 py-3.5 rounded-lg hover:bg-elektra-accent/90 transition-colors duration-300"
            >
              Parla con noi <ArrowRight size={16} />
            </Link>
            <Link
              to="/catalogo"
              className="inline-flex items-center justify-center gap-2 border border-white/25 text-white text-sm font-medium px-6 py-3.5 rounded-lg hover:bg-white/10 transition-colors duration-300"
            >
              Vedi il catalogo <ExternalLink size={15} />
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
