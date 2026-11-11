import { useRef } from 'react';
import { Link } from 'react-router';
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
} from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  CircuitBoard,
  Cpu,
  Code2,
  Boxes,
  Wrench,
  CheckCircle2,
  Layers,
  Zap,
  ToggleRight,
  Waves,
  Lightbulb,
  ShieldCheck,
  Gauge,
  Phone,
  Mail,
  MapPin,
} from 'lucide-react';
import Layout from '@/components/Layout';
import SmartImage from '@/components/SmartImage';
import HeroVisual from '@/components/hero/HeroVisual';
import TiltCard from '@/components/ui/TiltCard';
import Counter from '@/components/ui/Counter';
import { usePageMeta } from '@/hooks/usePageMeta';
import { categoryCounts } from '@/data/products';

const EASE: [number, number, number, number] = [0.075, 0.82, 0.165, 1];

/* ─── Servizi ─── */

const coreServices = [
  {
    index: '01',
    icon: CircuitBoard,
    title: 'Progettazione PCB',
    desc: 'Schemi elettrici, layout, scelta dei componenti e documentazione tecnica per la produzione.',
    points: ['Schema e layout', 'Scelta componenti', 'Documentazione tecnica'],
  },
  {
    index: '02',
    icon: Cpu,
    title: 'Montaggio SMT',
    desc: 'Assemblaggio automatizzato di componenti a montaggio superficiale, con controllo qualità in linea.',
    points: ['Pick & place', 'Saldatura reflow', 'Ispezione e controllo'],
  },
  {
    index: '03',
    icon: Boxes,
    title: 'Quadristica',
    desc: 'Progettazione e cablaggio di quadri elettrici di comando e controllo per l’industria.',
    points: ['Quadri di comando', 'Cablaggio', 'Verifica funzionale'],
  },
  {
    index: '04',
    icon: Code2,
    title: 'Programmazione PLC',
    desc: 'Sviluppo software per automazione industriale su piattaforme Siemens e Omron, HMI inclusa.',
    points: ['Logica di controllo', 'Interfacce HMI', 'Messa in servizio'],
  },
];

const secondaryServices = [
  {
    icon: Wrench,
    title: 'Saldatura THT',
    desc: 'Saldatura through-hole e assemblaggio misto.',
  },
  {
    icon: Gauge,
    title: 'Collaudo elettrico',
    desc: 'Test funzionale e verifiche finali su ogni lotto.',
  },
  {
    icon: Layers,
    title: 'Prototipazione',
    desc: 'Prototipi funzionanti e pre-serie prima della produzione.',
  },
  {
    icon: CheckCircle2,
    title: 'Consulenza tecnica',
    desc: 'Componenti, costi e industrializzazione del prodotto.',
  },
];

/* ─── Processo ─── */

const processSteps = [
  {
    number: '01',
    title: 'Analisi delle esigenze',
    desc: 'Raccogliamo requisiti, vincoli e obiettivi del progetto e definiamo le specifiche tecniche.',
  },
  {
    number: '02',
    title: 'Progettazione',
    desc: 'Schema elettrico, layout della scheda e selezione dei componenti più adatti all’applicazione.',
  },
  {
    number: '03',
    title: 'Prototipo',
    desc: 'Realizziamo il primo esemplare e lo validiamo con prove funzionali mirate.',
  },
  {
    number: '04',
    title: 'Produzione',
    desc: 'Montaggio SMT e THT, assemblaggio dei quadri e gestione della pre-serie o del lotto.',
  },
  {
    number: '05',
    title: 'Collaudo',
    desc: 'Test funzionali, verifiche di isolamento e controllo qualità su ogni unità prodotta.',
  },
  {
    number: '06',
    title: 'Consegna',
    desc: 'Documentazione tecnica di accompagnamento e supporto alla messa in servizio.',
  },
];

/* ─── Numeri reali ─── */

const stats = [
  { value: 40, suffix: '+', label: 'Anni di esperienza dei fondatori' },
  { value: 2019, suffix: '', label: 'Anno di fondazione' },
  { value: 13, suffix: '', label: 'Prodotti a catalogo' },
  { value: 22, suffix: '', label: 'Realizzazioni documentate' },
];

/* ─── Settori (derivati dalle realizzazioni pubblicate) ─── */

const sectors = [
  {
    icon: Cpu,
    title: 'Automazione e PLC',
    desc: 'Controllori programmabili, schede I/O e interfacce di processo.',
  },
  {
    icon: CircuitBoard,
    title: 'Schede di comando',
    desc: 'Elettronica dedicata per macchine e apparecchiature.',
  },
  {
    icon: Waves,
    title: 'Interfaccia e segnale',
    desc: 'Condizionamento, isolamento e adattamento dei segnali.',
  },
  {
    icon: Zap,
    title: 'Alimentazione',
    desc: 'Alimentatori lineari, switching e versioni di potenza su specifica.',
  },
  {
    icon: Lightbulb,
    title: 'Illuminazione tecnica',
    desc: 'Driver e controllo per strisce LED e lampade multicolor.',
  },
  {
    icon: ShieldCheck,
    title: 'Sicurezza e accessi',
    desc: 'Comandi per cancelli, persiane motorizzate e segnalazioni.',
  },
];

/* ─── Catalogo ─── */

const productFamilies = [
  {
    title: 'Alimentatori switching',
    category: 'Alimentatori switching',
    image: '/images/prodotti/asg-05-asg-10.jpg',
    icon: Zap,
  },
  {
    title: 'Alimentatori lineari',
    category: 'Alimentatori lineari',
    image: '/images/prodotti/al-00.jpg',
    icon: Gauge,
  },
  {
    title: 'Schede interfaccia',
    category: 'Schede interfaccia',
    image: '/images/prodotti/ge-34.jpg',
    icon: CircuitBoard,
  },
  {
    title: 'Schede tastatori',
    category: 'Schede tastatori',
    image: '/images/prodotti/af-t02-cs.jpg',
    icon: Waves,
  },
  {
    title: 'Relè statici',
    category: 'Relè statici',
    image: '/images/prodotti/rele-statico-dc-af-60v.jpg',
    icon: ToggleRight,
  },
];

/* ─── Sottocomponenti ─── */

function SectionTag({ index, label }: { index: string; label: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="font-mono-tech text-[10px] text-neon/80">{index}</span>
      <span className="h-px w-8 bg-neon/30" aria-hidden="true" />
      <span className="tech-label text-white/45">{label}</span>
    </div>
  );
}

function ServiceCard({ service }: { service: (typeof coreServices)[number] }) {
  const Icon = service.icon;
  return (
    <TiltCard className="group h-full rounded-3xl" intensity={5}>
      <div className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-b from-white/[0.055] to-white/[0.015] p-7 transition-colors duration-500 group-hover:border-neon/30">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-elektra-accent/25 opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100"
        />
        <div className="relative flex items-start justify-between">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-neon/20 bg-neon/10 text-neon">
            <Icon size={22} strokeWidth={1.6} />
          </span>
          <span className="font-mono-tech text-[11px] tracking-[0.15em] text-white/50">
            {service.index}
          </span>
        </div>

        <h3 className="relative mt-7 font-display text-xl font-medium tracking-tight text-white">
          {service.title}
        </h3>
        <p className="relative mt-3 flex-1 text-sm leading-relaxed text-white/55">
          {service.desc}
        </p>

        <ul className="relative mt-6 space-y-2 border-t border-white/[0.07] pt-5">
          {service.points.map((point) => (
            <li key={point} className="flex items-center gap-2.5 text-xs text-white/55">
              <span className="h-1 w-1 rounded-full bg-neon/70" aria-hidden="true" />
              {point}
            </li>
          ))}
        </ul>

        <Link
          to="/contatti"
          className="relative mt-6 inline-flex items-center gap-2 text-xs font-medium text-white/65 transition-colors duration-300 hover:text-neon"
        >
          Parliamo del progetto
          <ArrowRight
            size={14}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>
      </div>
    </TiltCard>
  );
}

function ProcessStep({ step }: { step: (typeof processSteps)[number] }) {
  return (
    <div className="reveal relative grid grid-cols-[56px_1fr] gap-5 pb-10 last:pb-0 sm:gap-7">
      <span className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-[#0a0e0b] font-mono-tech text-xs text-neon/80 transition-colors duration-300 group-hover:border-neon/40">
        {step.number}
      </span>
      <div className="pt-1">
        <h3 className="font-display text-lg font-medium tracking-tight text-white">
          {step.title}
        </h3>
        <p className="mt-1.5 max-w-md text-sm leading-relaxed text-white/50">{step.desc}</p>
      </div>
    </div>
  );
}

function SectorCard({ sector }: { sector: (typeof sectors)[number] }) {
  const Icon = sector.icon;
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.025] p-6 transition-all duration-500 hover:border-neon/25 hover:bg-white/[0.045]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-12 -right-12 h-32 w-32 rounded-full bg-elektra-accent/20 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
      />
      <Icon
        size={22}
        strokeWidth={1.5}
        className="relative text-neon/80 transition-transform duration-500 group-hover:-translate-y-0.5"
      />
      <h3 className="relative mt-5 font-display text-base font-medium tracking-tight text-white">
        {sector.title}
      </h3>
      <p className="relative mt-2 text-xs leading-relaxed text-white/55">{sector.desc}</p>
    </div>
  );
}

function ProductFamilyCard({ family }: { family: (typeof productFamilies)[number] }) {
  const Icon = family.icon;
  const count = categoryCounts.get(family.category) ?? 0;
  return (
    <Link
      to={`/catalogo?categoria=${encodeURIComponent(family.category)}`}
      className="group relative block overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.025] transition-all duration-500 hover:border-neon/30 hover:bg-white/[0.045]"
    >
      <div className="product-plate relative aspect-[4/3] overflow-hidden">
        <SmartImage
          src={family.image}
          alt={family.title}
          width={1024}
          height={1024}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-contain p-3 transition-transform duration-700 ease-out-circ group-hover:scale-[1.04]"
        />
        <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-black/75 px-2.5 py-1 font-mono-tech text-[9px] uppercase tracking-[0.12em] text-white/80 backdrop-blur">
          <Icon size={11} className="text-neon" aria-hidden="true" />
          {count} {count === 1 ? 'prodotto' : 'prodotti'}
        </span>
      </div>
      <div className="flex items-center justify-between gap-3 p-4">
        <h3 className="text-sm font-medium leading-snug text-white/85 transition-colors duration-300 group-hover:text-white">
          {family.title}
        </h3>
        <ArrowUpRight
          size={15}
          className="flex-shrink-0 text-white/30 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-neon"
          aria-hidden="true"
        />
      </div>
    </Link>
  );
}

/* ═══════════════════════════════════════════════════════════ */

export default function Home() {
  usePageMeta(
    'AF Elektra 2 | Elettronica Industriale Brescia',
    'AF Elektra 2 a Castenedolo (BS): progettazione PCB, montaggio SMT, quadristica e programmazione PLC. Partner B2B per elettronica industriale.',
    '/',
  );

  const reduced = useReducedMotion();
  const timelineRef = useRef<HTMLDivElement>(null);
  const numbersRef = useRef<HTMLDListElement>(null);
  const numbersInView = useInView(numbersRef, { once: true, amount: 0.35 });
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 75%', 'end 65%'],
  });
  const lineScale = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    mass: 0.4,
  });

  return (
    <Layout>
      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden pb-10 pt-28 lg:pb-16 lg:pt-32">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-40 top-1/4 h-[520px] w-[520px] rounded-full bg-elektra-accent/15 blur-[140px]"
        />

        <div className="relative mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-10 px-5 lg:grid-cols-12 lg:gap-6 lg:px-10">
          {/* Copy */}
          <div className="lg:col-span-6 xl:col-span-6">
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE }}
              className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 backdrop-blur"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon opacity-70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-neon" />
              </span>
              <span className="font-mono-tech text-[10px] uppercase tracking-[0.2em] text-white/60">
                Elettronica industriale · Castenedolo (BS)
              </span>
            </motion.div>

            <h1 className="mt-7 font-display text-4xl font-medium leading-[0.98] tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-[4.4rem]">
              <span className="block overflow-hidden pb-1">
                <motion.span
                  className="block"
                  initial={reduced ? false : { y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: 0.08, ease: EASE }}
                >
                  L&apos;elettronica
                </motion.span>
              </span>
              <span className="block overflow-hidden pb-1">
                <motion.span
                  className="block"
                  initial={reduced ? false : { y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: 0.18, ease: EASE }}
                >
                  industriale,
                </motion.span>
              </span>
              <span className="block overflow-hidden pb-2">
                <motion.span
                  className="text-gradient block"
                  initial={reduced ? false : { y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.95, delay: 0.28, ease: EASE }}
                >
                  dall&apos;idea al prodotto.
                </motion.span>
              </span>
            </h1>

            <motion.p
              initial={reduced ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.42, ease: EASE }}
              className="mt-7 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg"
            >
              Progettiamo, assembliamo e collaudiamo schede e quadri elettrici per
              l’industria. Un unico partner tecnico, dal concept alla messa in servizio.
            </motion.p>

            <motion.div
              initial={reduced ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.52, ease: EASE }}
              className="mt-9 flex flex-col gap-3 sm:flex-row"
            >
              <Link
                to="/contatti"
                className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-elektra-accent px-7 py-4 text-sm font-semibold text-white shadow-[0_0_40px_-10px_rgba(21,128,61,0.95)] transition-all duration-300 hover:bg-[#1a9c4c] hover:shadow-[0_0_50px_-6px_rgba(110,245,155,0.5)]"
              >
                Richiedi un preventivo
                <ArrowUpRight
                  size={17}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
              <a
                href="#servizi"
                className="group inline-flex items-center justify-center gap-2.5 rounded-full border border-white/15 px-7 py-4 text-sm font-medium text-white/80 transition-all duration-300 hover:border-neon/40 hover:bg-white/[0.04] hover:text-white"
              >
                Scopri i servizi
                <ArrowRight
                  size={16}
                  className="text-neon transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>
            </motion.div>

            <motion.p
              initial={reduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.7 }}
              className="mt-8 font-mono-tech text-[10px] uppercase tracking-[0.16em] text-white/55"
            >
              PCB <span className="text-neon/50">·</span> SMT{' '}
              <span className="text-neon/50">·</span> Quadristica{' '}
              <span className="text-neon/50">·</span> PLC
            </motion.p>
          </div>

          {/* Visual */}
          <motion.div
            initial={reduced ? false : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: EASE }}
            className="relative lg:col-span-6 xl:col-span-6"
          >
            <div className="relative mx-auto h-[330px] w-full max-w-[620px] sm:h-[420px] lg:h-[540px] xl:h-[580px]">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-6 rounded-full bg-elektra-accent/20 blur-[90px]"
              />
              <div className="relative h-full w-full">
                <HeroVisual />
              </div>

              {/* Cornice tecnica */}
              <div aria-hidden="true" className="pointer-events-none absolute inset-0">
                <span className="absolute left-0 top-0 h-8 w-8 border-l border-t border-neon/30" />
                <span className="absolute right-0 top-0 h-8 w-8 border-r border-t border-neon/30" />
                <span className="absolute bottom-0 left-0 h-8 w-8 border-b border-l border-neon/30" />
                <span className="absolute bottom-0 right-0 h-8 w-8 border-b border-r border-neon/30" />
              </div>

              <div className="pointer-events-none absolute left-3 top-2 hidden font-mono-tech text-[9px] uppercase tracking-[0.18em] text-white/50 sm:block">
                AF-E2 / PCB-01
              </div>
              <div className="pointer-events-none absolute right-3 top-2 hidden font-mono-tech text-[9px] uppercase tracking-[0.18em] text-white/50 sm:block">
                Rev. 2.6
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <div className="mx-auto mt-8 flex max-w-[1440px] items-center gap-3 px-5 lg:mt-4 lg:px-10">
          <span className="h-px w-12 bg-gradient-to-r from-neon/60 to-transparent" aria-hidden="true" />
          <span className="font-mono-tech text-[9px] uppercase tracking-[0.24em] text-white/50">
            Scorri per esplorare
          </span>
        </div>
      </section>

      {/* ─── MARQUEE CAPABILITIES ─── */}
      <div className="relative overflow-hidden border-y border-white/[0.07] bg-white/[0.02] py-4">
        <div className="flex w-max animate-marquee">
          {[0, 1].map((copy) => (
            <ul
              key={copy}
              aria-hidden={copy === 1 ? 'true' : undefined}
              className="flex items-center gap-8 pr-8 font-mono-tech text-[10px] uppercase tracking-[0.22em] text-white/55"
            >
              {[
                'Progettazione PCB',
                'Montaggio SMT',
                'Saldatura THT',
                'Quadristica',
                'Programmazione PLC',
                'Collaudo elettrico',
                'Prototipazione',
              ].map((item) => (
                <li key={item} className="flex items-center gap-8 whitespace-nowrap">
                  {item}
                  <span className="h-1 w-1 rounded-full bg-neon/40" aria-hidden="true" />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      {/* ─── SERVIZI ─── */}
      <section id="servizi" className="scroll-mt-24 px-5 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-[1440px]">
          <div className="reveal grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <SectionTag index="01" label="Servizi" />
              <h2 className="mt-5 max-w-2xl font-display text-3xl font-medium leading-[1.02] tracking-tight text-white sm:text-4xl lg:text-5xl">
                Quattro competenze,{' '}
                <span className="text-white/45">un unico interlocutore.</span>
              </h2>
            </div>
            <div className="lg:col-span-5">
              <p className="max-w-md text-sm leading-relaxed text-white/50 lg:ml-auto">
                Dalla scheda singola al quadro completo: progettazione, assemblaggio,
                cablaggio e programmazione restano sotto lo stesso tetto, con un
                controllo diretto su qualità e tempi.
              </p>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {coreServices.map((service) => (
              <ServiceCard key={service.title} service={service} />
            ))}
          </div>

          {/* Servizi secondari */}
          <div className="reveal mt-5 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.08] sm:grid-cols-2 xl:grid-cols-4">
            {secondaryServices.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.title}
                  className="group flex items-start gap-4 bg-[#080b09] p-5 transition-colors duration-300 hover:bg-[#0c110d]"
                >
                  <Icon
                    size={18}
                    strokeWidth={1.5}
                    className="mt-0.5 flex-shrink-0 text-neon/70"
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="text-sm font-medium text-white/85">{service.title}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-white/55">{service.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── PROCESSO ─── */}
      <section
        id="processo"
        className="scroll-mt-24 border-y border-white/[0.07] bg-[#080b09]/70 px-5 py-20 lg:px-10 lg:py-28"
      >
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <SectionTag index="02" label="Processo" />
              <h2 className="mt-5 font-display text-3xl font-medium leading-[1.02] tracking-tight text-white sm:text-4xl lg:text-5xl">
                Dall&apos;idea al prodotto finito, in sei passaggi.
              </h2>
              <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/50">
                Un percorso chiaro, con verifiche in ogni fase. Sai sempre a che punto
                è il progetto e chi sta lavorando alla tua scheda.
              </p>
              <Link
                to="/contatti"
                className="group mt-8 inline-flex items-center gap-2 border-b border-neon/30 pb-1.5 text-sm font-medium text-white/80 transition-colors duration-300 hover:text-neon"
              >
                Raccontaci il tuo progetto
                <ArrowRight
                  size={15}
                  className="text-neon transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>

          <div ref={timelineRef} className="relative lg:col-span-8">
            {/* Linea */}
            <div
              aria-hidden="true"
              className="absolute bottom-6 left-[27px] top-6 w-px bg-white/[0.08]"
            />
            <motion.div
              aria-hidden="true"
              style={{ scaleY: reduced ? 1 : lineScale }}
              className="absolute bottom-6 left-[27px] top-6 w-px origin-top bg-gradient-to-b from-neon via-elektra-accent to-elektra-accent/20"
            />

            <div className="relative">
              {processSteps.map((step) => (
                <ProcessStep key={step.number} step={step} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── NUMERI ─── */}
      <section id="numeri" className="scroll-mt-24 px-5 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-[1440px]">
          <div className="relative overflow-hidden rounded-[28px] border border-white/[0.08] bg-[#0a0e0b]/80 px-6 py-12 lg:px-14 lg:py-16">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-elektra-accent/20 blur-[100px]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-[0.4] [background-image:linear-gradient(rgba(110,245,155,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(110,245,155,0.05)_1px,transparent_1px)] [background-size:40px_40px] [mask-image:radial-gradient(ellipse_60%_70%_at_80%_20%,#000,transparent_75%)]"
            />

            <div className="relative">
              <SectionTag index="03" label="Numeri" />
              <h2 className="mt-5 max-w-2xl font-display text-3xl font-medium leading-[1.02] tracking-tight text-white sm:text-4xl">
                Esperienza concreta, misurata sul lavoro.
              </h2>

              <dl ref={numbersRef} className="mt-12 grid grid-cols-2 gap-y-10 sm:gap-y-12 lg:grid-cols-4">
                {stats.map((stat) => (
                  <div key={stat.label} className="border-l border-white/10 pl-5 lg:pl-7">
                    <dd className="font-display text-4xl font-medium tracking-tight text-white sm:text-5xl lg:text-6xl">
                      <Counter
                        value={stat.value}
                        suffix={stat.suffix}
                        start={numbersInView}
                        className="tabular-nums"
                      />
                    </dd>
                    <dt className="mt-3 max-w-[13rem] text-xs leading-relaxed text-white/55">
                      {stat.label}
                    </dt>
                  </div>
                ))}
              </dl>

              <p className="mt-10 font-mono-tech text-[9px] uppercase tracking-[0.18em] text-white/50">
                Dati riferiti al catalogo e alle realizzazioni pubblicate
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SETTORI ─── */}
      <section id="settori" className="scroll-mt-24 border-y border-white/[0.07] bg-[#080b09]/70 px-5 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-[1440px]">
          <div className="reveal flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <SectionTag index="04" label="Ambiti di applicazione" />
              <h2 className="mt-5 max-w-xl font-display text-3xl font-medium leading-[1.02] tracking-tight text-white sm:text-4xl">
                Dove lavorano le nostre schede.
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-white/50">
              Ambiti ricavati dalle realizzazioni documentate: macchine, impianti,
              accessi e illuminazione tecnica.
            </p>
          </div>

          <div className="reveal mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sectors.map((sector) => (
              <SectorCard key={sector.title} sector={sector} />
            ))}
          </div>

          <div className="reveal mt-10">
            <Link
              to="/casi-studio"
              className="group inline-flex items-center gap-2 text-sm font-medium text-white/70 transition-colors duration-300 hover:text-neon"
            >
              Vedi tutte le realizzazioni
              <ArrowRight
                size={15}
                className="text-neon transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── CHI SIAMO ─── */}
      <section id="azienda" className="scroll-mt-24 px-5 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="reveal lg:col-span-5">
            <SectionTag index="05" label="Chi siamo" />
            <h2 className="mt-5 font-display text-3xl font-medium leading-[1.02] tracking-tight text-white sm:text-4xl lg:text-5xl">
              Un team tecnico,
              <br />
              <span className="text-white/45">una sede produttiva.</span>
            </h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-white/55">
              AF Elektra 2 nasce nel 2019 a Castenedolo, in provincia di Brescia. I
              fondatori portano oltre 40 anni di esperienza nell’elettronica
              industriale e seguono ogni progetto in prima persona.
            </p>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-white/55">
              Progettiamo, montiamo e collaudiamo in casa: meno passaggi tra chi
              progetta e chi produce, più controllo sul risultato.
            </p>

            <div className="mt-8 flex flex-wrap gap-6 font-mono-tech text-[10px] uppercase tracking-[0.16em] text-white/55">
              <span className="flex items-center gap-2">
                <MapPin size={13} className="text-neon/70" aria-hidden="true" />
                Castenedolo (BS)
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 size={13} className="text-neon/70" aria-hidden="true" />
                Dal 2019
              </span>
            </div>

            <Link
              to="/chi-siamo"
              className="group mt-8 inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white/80 transition-all duration-300 hover:border-neon/40 hover:bg-white/[0.04] hover:text-white"
            >
              Conosci l’azienda
              <ArrowRight
                size={15}
                className="text-neon transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>

          <div className="reveal lg:col-span-7">
            <div className="relative overflow-hidden rounded-[24px] border border-white/10">
              <SmartImage
                src="/images/cablaggio.jpg"
                alt="Cablaggio di un quadro elettrico industriale nella sede AF Elektra 2"
                width={1184}
                height={864}
                loading="lazy"
                decoding="async"
                className="h-[320px] w-full object-cover sm:h-[420px] lg:h-[520px]"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#070908]/80 via-transparent to-transparent"
              />
              <div className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-[#070908]/80 px-4 py-3 backdrop-blur-xl">
                <div>
                  <p className="font-mono-tech text-[9px] uppercase tracking-[0.18em] text-white/55">
                    Sede operativa
                  </p>
                  <p className="mt-1 text-sm font-medium text-white">
                    Via Artigiani 19, Castenedolo (BS)
                  </p>
                </div>
                <a
                  href="https://www.openstreetmap.org/?mlat=45.4814&mlon=10.2786#map=16/45.4814/10.2786"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-shrink-0 items-center gap-1.5 rounded-full border border-white/15 px-3.5 py-2 text-[11px] text-white/70 transition-colors hover:border-neon/40 hover:text-neon"
                >
                  Mappa
                  <ArrowUpRight size={12} aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CATALOGO ─── */}
      <section id="catalogo" className="scroll-mt-24 border-y border-white/[0.07] bg-[#080b09]/70 px-5 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-[1440px]">
          <div className="reveal flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <SectionTag index="06" label="Catalogo" />
              <h2 className="mt-5 max-w-xl font-display text-3xl font-medium leading-[1.02] tracking-tight text-white sm:text-4xl lg:text-5xl">
                Le famiglie di prodotto.
              </h2>
            </div>
            <Link
              to="/catalogo"
              className="group inline-flex w-fit items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white/80 transition-all duration-300 hover:border-neon/40 hover:bg-white/[0.04] hover:text-white"
            >
              Tutto il catalogo
              <ArrowRight
                size={15}
                className="text-neon transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>

          <div className="reveal mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {productFamilies.map((family) => (
              <ProductFamilyCard key={family.category} family={family} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── CONTATTI CTA ─── */}
      <section id="contatti" className="scroll-mt-24 px-5 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-[1440px]">
          <div className="relative overflow-hidden rounded-[28px] border border-neon/15 bg-gradient-to-br from-[#0c130e] via-[#080b09] to-[#0b150f] px-6 py-12 lg:px-14 lg:py-16">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-20 -top-24 h-80 w-80 rounded-full bg-elektra-accent/25 blur-[110px]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-32 right-0 h-80 w-80 rounded-full bg-neon/10 blur-[120px]"
            />

            <div className="relative grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-7">
                <SectionTag index="07" label="Contatti" />
                <h2 className="mt-5 max-w-2xl font-display text-3xl font-medium leading-[1.02] tracking-tight text-white sm:text-4xl lg:text-5xl">
                  Parliamo del tuo prossimo progetto.
                </h2>
                <p className="mt-5 max-w-lg text-sm leading-relaxed text-white/55 sm:text-base">
                  Raccontaci cosa devi realizzare. Ti rispondiamo con una valutazione
                  tecnica e un preventivo, senza impegno.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    to="/contatti"
                    className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-elektra-accent px-7 py-4 text-sm font-semibold text-white shadow-[0_0_40px_-10px_rgba(21,128,61,0.95)] transition-all duration-300 hover:bg-[#1a9c4c] hover:shadow-[0_0_50px_-6px_rgba(110,245,155,0.5)]"
                  >
                    Richiedi un preventivo
                    <ArrowUpRight
                      size={17}
                      className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </Link>
                  <a
                    href="tel:+390302130630"
                    className="inline-flex items-center justify-center gap-2.5 rounded-full border border-white/15 px-7 py-4 text-sm font-medium text-white/80 transition-all duration-300 hover:border-neon/40 hover:bg-white/[0.04] hover:text-white"
                  >
                    <Phone size={15} className="text-neon" aria-hidden="true" />
                    030 2130630
                  </a>
                </div>
              </div>

              <div className="lg:col-span-5">
                <ul className="space-y-4 rounded-2xl border border-white/[0.08] bg-white/[0.025] p-6 backdrop-blur">
                  <li className="flex items-start gap-3">
                    <MapPin
                      size={16}
                      className="mt-0.5 flex-shrink-0 text-neon/70"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="font-mono-tech text-[9px] uppercase tracking-[0.18em] text-white/55">
                        Sede
                      </p>
                      <p className="mt-1 text-sm text-white/70">
                        Via Artigiani 19, 25014 Castenedolo (BS)
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Phone
                      size={16}
                      className="mt-0.5 flex-shrink-0 text-neon/70"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="font-mono-tech text-[9px] uppercase tracking-[0.18em] text-white/55">
                        Telefono
                      </p>
                      <a
                        href="tel:+390302130630"
                        className="mt-1 block text-sm text-white/70 transition-colors hover:text-neon"
                      >
                        030 2130630
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Mail
                      size={16}
                      className="mt-0.5 flex-shrink-0 text-neon/70"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="font-mono-tech text-[9px] uppercase tracking-[0.18em] text-white/55">
                        Email
                      </p>
                      <a
                        href="mailto:afelektra2@afelektra.com"
                        className="mt-1 block break-all text-sm text-white/70 transition-colors hover:text-neon"
                      >
                        afelektra2@afelektra.com
                      </a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
