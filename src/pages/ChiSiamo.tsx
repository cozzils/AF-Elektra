import { motion } from 'framer-motion';
import { Link } from 'react-router';
import {
  Award,
  MapPin,
  Calendar,
  Cpu,
  Settings,
  CircuitBoard,
  Lightbulb,
  FlaskConical,
  Factory,
  ArrowRight,
  ArrowUpRight,
} from 'lucide-react';
import Layout from '@/components/Layout';
import SmartImage from '@/components/SmartImage';
import TiltCard from '@/components/ui/TiltCard';
import { usePageMeta } from '@/hooks/usePageMeta';

const stats = [
  { value: '40+', label: 'Anni di esperienza dei fondatori' },
  { value: '2019', label: 'Anno di fondazione' },
  { value: 'Brescia', label: 'Sede a Castenedolo (BS)' },
];

const processSteps = [
  {
    icon: <Lightbulb size={28} />,
    phase: 'Fase 1',
    title: 'Consulenza & Idea',
    desc: 'Analizziamo le tue esigenze e trasformiamo le idee in specifiche tecniche dettagliate. Il team di ingegneri ti affianca fin dal primo concept.',
  },
  {
    icon: <FlaskConical size={28} />,
    phase: 'Fase 2',
    title: 'Prototipazione',
    desc: 'Realizziamo prototipi funzionanti per validare ogni aspetto del progetto. Test approfonditi verificano che il prodotto soddisfi i requisiti.',
  },
  {
    icon: <Factory size={28} />,
    phase: 'Fase 3',
    title: 'Produzione & Collaudo',
    desc: 'Produzione in serie con controlli qualitativi in ogni fase, fino al collaudo finale e alla documentazione di accompagnamento.',
  },
];

const specializations = [
  {
    icon: <Settings size={24} />,
    title: 'Quadristica',
    desc: 'Progettazione e realizzazione di quadri elettrici di comando e controllo per applicazioni industriali. Dallo schema elettrico al cablaggio finale.',
  },
  {
    icon: <Cpu size={24} />,
    title: 'Programmazione PLC',
    desc: 'Sviluppo software per automazione industriale con piattaforme Siemens e Omron. Programmazione ladder, structured text e HMI.',
  },
  {
    icon: <CircuitBoard size={24} />,
    title: 'Progettazione PCB',
    desc: 'Design di schede elettroniche multistrato con strumenti CAD professionali. Simulazione, sbrogliatura e ottimizzazione del layout.',
  },
];

export default function ChiSiamo() {
  usePageMeta(
    'Chi Siamo | AF Elektra 2',
    'AF Elektra 2, fondata nel 2019 a Castenedolo (BS): oltre 40 anni di esperienza dei fondatori nella progettazione e produzione di elettronica industriale.',
    '/chi-siamo',
  );

  return (
    <Layout>
      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden pb-14 pt-32 lg:pb-20 lg:pt-40">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 top-10 h-[420px] w-[420px] rounded-full bg-elektra-accent/15 blur-[120px]"
        />
        <div className="relative mx-auto max-w-[1440px] px-5 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.075, 0.82, 0.165, 1] }}
          >
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-neon/40" aria-hidden="true" />
              <p className="tech-label text-white/45">Chi siamo</p>
            </div>
            <h1 className="mt-6 max-w-4xl font-display text-4xl font-medium leading-[0.98] tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl">
              Ingegneria di precisione,
              <br />
              <span className="text-gradient">dal 2019.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-relaxed text-white/55 sm:text-lg">
              Un’azienda tecnica, una sede produttiva a Castenedolo e oltre 40 anni
              di esperienza dei fondatori nell’elettronica industriale.
            </p>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 font-mono-tech text-[10px] uppercase tracking-[0.16em] text-white/55">
              <span className="flex items-center gap-2">
                <MapPin size={13} className="text-neon/70" aria-hidden="true" />
                Castenedolo (BS)
              </span>
              <span className="flex items-center gap-2">
                <Calendar size={13} className="text-neon/70" aria-hidden="true" />
                Fondata nel 2019
              </span>
              <span className="flex items-center gap-2">
                <Award size={13} className="text-neon/70" aria-hidden="true" />
                P.IVA 03286600980
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── NUMERI ─── */}
      <section aria-label="AF Elektra 2 in sintesi" className="border-y border-white/[0.07] bg-[#080b09]/70">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 px-5 sm:grid-cols-3 lg:px-10">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`py-8 lg:py-10 ${
                index > 0 ? 'border-t border-white/[0.07] sm:border-l sm:border-t-0 sm:pl-8 lg:pl-12' : ''
              }`}
            >
              <p className="font-display text-3xl font-medium tracking-tight text-white lg:text-4xl">
                {stat.value}
              </p>
              <p className="tech-label mt-2 text-white/40">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── STORIA ─── */}
      <section className="px-5 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="reveal lg:col-span-5">
            <p className="tech-label text-white/45">La nostra storia</p>
            <h2 className="mt-5 font-display text-3xl font-medium leading-[1.02] tracking-tight text-white sm:text-4xl">
              Partner tecnologici,
              <br />
              <span className="text-white/45">non semplici esecutori.</span>
            </h2>
            <div className="mt-7 space-y-4 text-sm leading-relaxed text-white/55 lg:text-base">
              <p>
                AF Elektra 2 nasce nel 2019, ereditando oltre 40 anni di know-how dei
                suoi fondatori nel settore dell’elettronica industriale. Situata nel
                cuore produttivo del nord Italia, a Castenedolo in provincia di
                Brescia, l’azienda rappresenta un punto di riferimento per la
                progettazione e produzione di sistemi elettronici ad alta precisione.
              </p>
              <p>
                Il nostro approccio si distingue per la capacità di affiancare il
                cliente in ogni fase del processo produttivo: dalla consulenza
                iniziale alla progettazione, dalla realizzazione del prototipo fino
                alla produzione di serie e al collaudo finale.
              </p>
            </div>

            <div className="mt-8 space-y-4 border-t border-white/[0.07] pt-6">
              <div className="flex items-center gap-3">
                <MapPin size={16} className="text-neon/70" aria-hidden="true" />
                <span className="text-sm text-white/70">
                  Via Artigiani, 19 — 25014 Castenedolo (BS)
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar size={16} className="text-neon/70" aria-hidden="true" />
                <span className="text-sm text-white/70">Fondata nel 2019</span>
              </div>
              <div className="flex items-center gap-3">
                <Award size={16} className="text-neon/70" aria-hidden="true" />
                <span className="text-sm text-white/70">P.IVA / C.F.: 03286600980</span>
              </div>
            </div>
          </div>

          <div className="reveal lg:col-span-7">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="overflow-hidden rounded-2xl border border-white/[0.08]">
                <SmartImage
                  src="/images/sede-ingresso.jpg"
                  alt="Ingresso della sede AF Elektra 2 a Castenedolo"
                  width={265}
                  height={277}
                  loading="lazy"
                  decoding="async"
                  className="h-[280px] w-full object-cover sm:h-full"
                />
              </div>
              <div className="overflow-hidden rounded-2xl border border-white/[0.08]">
                <SmartImage
                  src="/images/pcb-closeup.jpg"
                  alt="Circuito stampato realizzato da AF Elektra 2"
                  width={1024}
                  height={1024}
                  loading="lazy"
                  decoding="async"
                  className="h-[280px] w-full object-cover"
                />
              </div>
              <div className="overflow-hidden rounded-2xl border border-white/[0.08] sm:col-span-2">
                <SmartImage
                  src="/images/capannone-sede.jpg"
                  alt="Capannone della sede AF Elektra 2 a Castenedolo"
                  width={710}
                  height={176}
                  loading="lazy"
                  decoding="async"
                  className="h-[190px] w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SPECIALIZZAZIONI ─── */}
      <section id="competenze" className="border-y border-white/[0.07] bg-[#080b09]/70 px-5 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-[1440px]">
          <div className="reveal max-w-2xl">
            <p className="tech-label text-white/45">Competenze</p>
            <h2 className="mt-5 font-display text-3xl font-medium leading-[1.02] tracking-tight text-white sm:text-4xl">
              Le nostre specializzazioni.
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
            {specializations.map((spec) => (
              <div key={spec.title} className="reveal h-full">
                <TiltCard className="group h-full rounded-3xl" intensity={5}>
                  <div className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.03] p-7 transition-colors duration-500 group-hover:border-neon/25">
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute -right-14 -top-14 h-40 w-40 rounded-full bg-elektra-accent/25 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                    />
                    <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-neon/20 bg-neon/10 text-neon">
                      {spec.icon}
                    </span>
                    <h3 className="relative mt-6 font-display text-xl font-medium tracking-tight text-white">
                      {spec.title}
                    </h3>
                    <p className="relative mt-3 text-sm leading-relaxed text-white/50">
                      {spec.desc}
                    </p>
                  </div>
                </TiltCard>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PROCESSO 3 FASI ─── */}
      <section className="px-5 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-[1440px]">
          <div className="reveal max-w-2xl">
            <p className="tech-label text-white/45">Come lavoriamo</p>
            <h2 className="mt-5 font-display text-3xl font-medium leading-[1.02] tracking-tight text-white sm:text-4xl">
              Il nostro processo.
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            {processSteps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, delay: i * 0.12, ease: [0.075, 0.82, 0.165, 1] }}
                className="relative"
              >
                <div className="flex items-center gap-4">
                  <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl border border-neon/20 bg-neon/10 text-neon">
                    {step.icon}
                  </span>
                  <div>
                    <p className="font-mono-tech text-[10px] uppercase tracking-[0.18em] text-neon/70">
                      {step.phase}
                    </p>
                    <h3 className="mt-1 font-display text-lg font-medium text-white">
                      {step.title}
                    </h3>
                  </div>
                </div>
                <p className="mt-5 text-sm leading-relaxed text-white/50">{step.desc}</p>

                {i < processSteps.length - 1 && (
                  <div className="absolute right-0 top-6 hidden translate-x-1/2 md:block" aria-hidden="true">
                    <ArrowRight size={18} className="text-neon/30" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="px-5 pb-20 lg:px-10 lg:pb-28">
        <div className="mx-auto max-w-[1440px]">
          <div className="relative overflow-hidden rounded-[28px] border border-neon/15 bg-gradient-to-br from-[#0c130e] via-[#080b09] to-[#0b150f] px-6 py-12 lg:px-14 lg:py-16">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-20 -top-24 h-80 w-80 rounded-full bg-elektra-accent/25 blur-[110px]"
            />
            <div className="relative grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <h2 className="max-w-2xl font-display text-3xl font-medium leading-[1.02] tracking-tight text-white sm:text-4xl">
                  Vuoi conoscere meglio come lavoriamo?
                </h2>
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/55">
                  Raccontaci il tuo progetto: ti spieghiamo come possiamo intervenire,
                  dalla progettazione alla produzione.
                </p>
              </div>
              <div className="lg:col-span-4 lg:text-right">
                <Link
                  to="/contatti"
                  className="group inline-flex items-center gap-2.5 rounded-full bg-elektra-accent px-7 py-4 text-sm font-semibold text-white shadow-[0_0_40px_-10px_rgba(21,128,61,0.95)] transition-all duration-300 hover:bg-[#1a9c4c] hover:shadow-[0_0_50px_-6px_rgba(110,245,155,0.5)]"
                >
                  Parla con noi
                  <ArrowUpRight
                    size={17}
                    className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
