import { motion } from 'framer-motion';
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
} from 'lucide-react';
import Layout from '@/components/Layout';

const processSteps = [
  {
    icon: <Lightbulb size={28} />,
    phase: 'Fase 1',
    title: 'Consulenza & Idea',
    desc: 'Analizziamo le tue esigenze e trasformiamo le tue idee in specifiche tecniche dettagliate. Il nostro team di ingegneri ti affianca fin dal primo concept.',
  },
  {
    icon: <FlaskConical size={28} />,
    phase: 'Fase 2',
    title: 'Prototipazione',
    desc: 'Realizziamo prototipi funzionanti per validare ogni aspetto del progetto. Test approfonditi garantiscono che il prodotto soddisfi tutti i requisiti.',
  },
  {
    icon: <Factory size={28} />,
    phase: 'Fase 3',
    title: 'Produzione & Collaudo',
    desc: 'Produzione in serie con controlli qualitativi ad ogni stadio. Collaudo finale rigoroso e consegna puntuale del prodotto finito.',
  },
];

export default function ChiSiamo() {
  return (
    <Layout>
      {/* ─── HERO ─── */}
      <section className="relative min-h-[70vh] flex items-end bg-gray-light pt-32 pb-16 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.075, 0.82, 0.165, 1] }}
          >
            <p className="text-xs uppercase tracking-widest text-gray-medium mb-4">Chi Siamo</p>
            <h1 className="text-5xl lg:text-7xl font-semibold text-black tracking-tight leading-none">
              Ingegneria di precisione,<br />
              <span className="text-gray-medium font-light">dal 2019.</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* ─── STATS BAR ─── */}
      <section className="bg-black text-white py-12 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { label: 'Anni di Competenza', value: '40+' },
            { label: 'Fondazione', value: '2019' },
            { label: 'Sede', value: 'Brescia' },
            { label: 'Prodotti', value: '148' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1, ease: [0.075, 0.82, 0.165, 1] }}
              className="text-center lg:text-left"
            >
              <p className="text-3xl lg:text-4xl font-light">{stat.value}</p>
              <p className="text-xs uppercase tracking-widest text-white/50 mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── ABOUT ─── */}
      <section className="py-24 lg:py-32 px-6 lg:px-10 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5 reveal">
            <p className="text-xs uppercase tracking-widest text-gray-medium mb-4">La Nostra Storia</p>
            <h2 className="text-3xl lg:text-4xl font-semibold text-black tracking-tight leading-tight">
              Partner tecnologici, non semplici esecutori.
            </h2>
            <div className="mt-8 space-y-4">
              <p className="text-sm lg:text-base text-gray-medium leading-relaxed">
                AF Elektra 2 nasce nel 2019, ereditando oltre 40 anni di know-how dei suoi fondatori nel settore dell&apos;elettronica industriale. Situata nel cuore produttivo del nord Italia, a Castenedolo in provincia di Brescia, l&apos;azienda rappresenta un punto di riferimento per la progettazione e produzione di sistemi elettronici ad alta precisione.
              </p>
              <p className="text-sm lg:text-base text-gray-medium leading-relaxed">
                Il nostro approccio si distingue per la capacita di affiancare il cliente in ogni fase del processo produttivo: dalla consulenza iniziale alla progettazione, dalla realizzazione del prototipo fino alla produzione di serie e al collaudo finale.
              </p>
            </div>

            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3">
                <MapPin size={16} className="text-gray-medium" />
                <span className="text-sm text-black">Via Artigiani, 19 — 25014 Castenedolo (BS)</span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar size={16} className="text-gray-medium" />
                <span className="text-sm text-black">Fondata nel 2019</span>
              </div>
              <div className="flex items-center gap-3">
                <Award size={16} className="text-gray-medium" />
                <span className="text-sm text-black">P.IVA / C.F.: 03286600980</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 reveal">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-2xl overflow-hidden">
                <img
                  src="/images/cablaggio.jpg"
                  alt="Cablaggio quadri elettrici"
                  className="w-full h-[300px] lg:h-full object-cover"
                />
              </div>
              <div className="rounded-2xl overflow-hidden">
                <img
                  src="/images/pcb-closeup.jpg"
                  alt="Circuito stampato"
                  className="w-full h-[300px] object-cover"
                />
              </div>
              <div className="sm:col-span-2 rounded-2xl overflow-hidden">
                <img
                  src="/images/stabilimento.jpg"
                  alt="Stabilimento AF Elektra 2"
                  className="w-full h-[250px] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SPECIALIZZAZIONI ─── */}
      <section className="py-24 lg:py-32 px-6 lg:px-10 bg-gray-light">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 reveal">
            <p className="text-xs uppercase tracking-widest text-gray-medium mb-3">Competenze</p>
            <h2 className="text-4xl lg:text-5xl font-semibold text-black tracking-tight">
              Le Nostre Specializzazioni
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 stagger-children">
            {[
              {
                icon: <Settings size={32} />,
                title: 'Quadristica',
                desc: 'Progettazione e realizzazione di quadri elettrici di comando e controllo per applicazioni industriali. Dallo schema elettrico al cablaggio finale.',
              },
              {
                icon: <Cpu size={32} />,
                title: 'Programmazione PLC',
                desc: 'Sviluppo software per automazione industriale con piattaforme Siemens e Omron. Programmazione ladder, structured text e HMI.',
              },
              {
                icon: <CircuitBoard size={32} />,
                title: 'Progettazione PCB',
                desc: 'Design di schede elettroniche multistrato con strumenti CAD professionali. Simulazione, sbrogliatura e ottimizzazione del layout.',
              },
            ].map((spec, i) => (
              <div
                key={i}
                className="reveal bg-white rounded-2xl p-8 border border-black/5 hover:border-black/15 hover:shadow-panel transition-all duration-500 group"
              >
                <div className="w-16 h-16 rounded-xl bg-gray-light flex items-center justify-center text-gray-dark group-hover:bg-elektra-accent group-hover:text-black transition-colors duration-300">
                  {spec.icon}
                </div>
                <h3 className="font-semibold text-xl text-black mt-6">{spec.title}</h3>
                <p className="text-sm text-gray-medium mt-3 leading-relaxed">{spec.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PROCESSO 3 FASI ─── */}
      <section className="py-24 lg:py-32 px-6 lg:px-10 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 reveal">
            <p className="text-xs uppercase tracking-widest text-gray-medium mb-3">Come Lavoriamo</p>
            <h2 className="text-4xl lg:text-5xl font-semibold text-black tracking-tight">
              Il Nostro Processo
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {processSteps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, delay: i * 0.15, ease: [0.075, 0.82, 0.165, 1] }}
                className="relative"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-xl bg-elektra-accent flex items-center justify-center text-black">
                    {step.icon}
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-gray-medium">{step.phase}</p>
                    <h3 className="font-semibold text-lg text-black">{step.title}</h3>
                  </div>
                </div>
                <p className="text-sm text-gray-medium leading-relaxed">{step.desc}</p>

                {i < processSteps.length - 1 && (
                  <div className="hidden md:block absolute top-7 right-0 translate-x-1/2">
                    <ArrowRight size={20} className="text-gray-medium/30" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
