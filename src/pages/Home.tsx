import { Link } from 'react-router';
import {
  Cpu,
  CircuitBoard,
  Factory,
  Settings,
  Code2,
  CheckCircle2,
  ArrowRight,
  Zap,
  ToggleRight,
  Wrench,
  Layers,
} from 'lucide-react';
import Layout from '@/components/Layout';
import SmartImage from '@/components/SmartImage';
import { usePageMeta } from '@/hooks/usePageMeta';

/* ─── Product Category Card ─── */
function CategoryCard({ title, image, icon }: { title: string; image: string; icon: React.ReactNode }) {
  return (
    <Link
      to="/catalogo"
      className="group relative block overflow-hidden rounded-2xl bg-white border border-black/5 hover:border-black/20 transition-all duration-500"
    >
      <div className="aspect-square overflow-hidden">
        <SmartImage
          src={image}
          alt={title}
          width={1024}
          height={1024}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out-circ"
        />
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gray-light flex items-center justify-center text-gray-dark group-hover:bg-elektra-accent group-hover:text-white transition-colors duration-300">
              {icon}
            </div>
            <h3 className="font-semibold text-lg text-black">{title}</h3>
          </div>
        </div>
      </div>
    </Link>
  );
}

/* ─── Approach Block ─── */
function ApproachBlock({ number, title, desc }: { number: string; title: string; desc: string }) {
  return (
    <div className="reveal flex items-start gap-6 py-8 border-b border-black/10 last:border-b-0">
      <span className="text-5xl lg:text-6xl font-light text-black/20 leading-none">{number}</span>
      <div>
        <h3 className="font-semibold text-lg text-black">{title}</h3>
        <p className="text-sm text-gray-medium mt-1">{desc}</p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════ */

export default function Home() {
  usePageMeta(
    'AF Elektra 2 | Elettronica Industriale Brescia',
    'AF Elektra 2 a Castenedolo (BS): progettazione PCB, montaggio SMT, quadristica e programmazione PLC. Partner B2B per elettronica industriale.',
    '/',
  );

  const services = [
    {
      icon: <CircuitBoard size={28} />,
      title: 'Progettazione PCB',
      desc: 'Schemi, layout e messa in produzione di schede elettroniche, dal concept alla documentazione tecnica.',
    },
    {
      icon: <Factory size={28} />,
      title: 'Montaggio SMT',
      desc: 'Assemblaggio automatizzato di componenti superficiali con controllo qualità e ispezione AOI.',
    },
    {
      icon: <Wrench size={28} />,
      title: 'Saldatura THT',
      desc: 'Saldatura through-hole e assemblaggio misto, con verifica visiva e controllo delle giunzioni.',
    },
    {
      icon: <CheckCircle2 size={28} />,
      title: 'Collaudo Elettrico',
      desc: 'Test funzionale, prove di isolamento e verifiche finali su ogni lotto prodotto.',
    },
    {
      icon: <Settings size={28} />,
      title: 'Quadristica',
      desc: 'Progettazione e cablaggio di quadri elettrici di comando e controllo per l’industria.',
    },
    {
      icon: <Code2 size={28} />,
      title: 'Programmazione PLC',
      desc: 'Sviluppo software per automazione industriale su piattaforme Siemens e Omron, HMI inclusa.',
    },
    {
      icon: <Layers size={28} />,
      title: 'Prototipazione',
      desc: 'Realizzazione di prototipi funzionanti e pre-serie per validare il progetto prima della produzione.',
    },
    {
      icon: <Cpu size={28} />,
      title: 'Consulenza Tecnica',
      desc: 'Supporto nella scelta dei componenti, nell’analisi dei costi e nell’industrializzazione del prodotto.',
    },
  ];

  return (
    <Layout>
      {/* ─── HERO ─── */}
      <section className="relative min-h-[100svh] flex flex-col items-center justify-center bg-black overflow-hidden px-6 lg:px-10">
        <div className="absolute inset-0 z-0">
          <SmartImage
            src="/images/pcb-closeup.jpg"
            alt=""
            aria-hidden="true"
            width={1024}
            height={1024}
            fetchPriority="high"
            className="w-full h-full object-cover grayscale"
          />
        </div>

        {/* Overlay per leggibilità */}
        <div className="absolute inset-0 z-10 bg-black/65" />

        {/* Contenuto hero */}
        <div className="relative z-20 w-full max-w-5xl mx-auto flex flex-col items-center text-center gap-8 pt-24 pb-16">
          <div className="flex flex-col items-center">
            <p className="text-xs lg:text-sm text-elektra-accent-light font-extrabold uppercase tracking-widest mb-4">
              Eccellenza nell&apos;elettronica industriale
            </p>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white uppercase tracking-tight leading-[1.05] max-w-4xl">
              Realizza con noi <br />
              la <span className="text-elektra-accent-light italic font-serif lowercase">tua</span> idea.
            </h1>

            <p className="text-base lg:text-lg text-white/90 font-medium mt-6 leading-relaxed max-w-2xl">
              Progettazione, sviluppo e produzione di sistemi elettronici industriali ad alta precisione. Affidabilità e competenza per il settore B2B.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-2 w-full sm:w-auto">
            <Link
              to="/catalogo"
              className="inline-flex items-center justify-center gap-2 bg-elektra-accent text-white text-sm font-bold px-8 py-4 rounded-xl hover:bg-elektra-accent/90 transition-all duration-300 shadow-lg shadow-black/20"
            >
              Esplora il catalogo <ArrowRight size={16} />
            </Link>
            <Link
              to="/contatti"
              className="inline-flex items-center justify-center gap-2 border-2 border-white/40 text-white text-sm font-bold px-8 py-4 rounded-xl hover:bg-white/10 hover:border-white/70 transition-all duration-300"
            >
              Contatta un esperto
            </Link>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-20" aria-hidden="true">
          <svg className="w-8 h-8 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* ─── INTRO / CHI SIAMO TEASER ─── */}
      <section className="py-16 lg:py-24 px-6 lg:px-10 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-5 reveal">
            <p className="text-xs uppercase tracking-widest text-gray-medium mb-4">Chi Siamo</p>
            <h2 className="text-4xl lg:text-5xl font-semibold text-black leading-tight tracking-tight">
              L&apos;ingegneria che fa la differenza.
            </h2>
            <p className="text-lg text-black mt-4 font-medium">
              Dal concept al collaudo finale, il partner giusto per le tue idee.
            </p>
            <p className="text-sm lg:text-base text-gray-medium mt-6 leading-relaxed">
              Con l&apos;esperienza dei fondatori — oltre 40 anni nel settore — AF Elektra 2 segue il cliente in ogni fase: progettazione, prototipazione, produzione e collaudo.
            </p>
            <Link
              to="/chi-siamo"
              className="inline-flex items-center gap-2 mt-8 bg-gray-dark text-white text-sm font-medium px-6 py-3 rounded-lg hover:bg-black transition-colors duration-300"
            >
              Scopri di più <ArrowRight size={16} />
            </Link>
          </div>

          <div className="lg:col-span-7 reveal">
            <div className="relative rounded-2xl overflow-hidden">
              <SmartImage
                src="/images/cablaggio.jpg"
                alt="Cablaggio di un quadro elettrico industriale"
                width={1184}
                height={864}
                loading="lazy"
                decoding="async"
                className="w-full h-[400px] lg:h-[520px] object-cover"
              />
              <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm rounded-xl px-5 py-3 shadow-panel">
                <p className="text-xs uppercase tracking-widest text-gray-medium">Sede</p>
                <p className="text-sm font-medium text-black mt-0.5">Castenedolo (BS), Italia</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SERVIZI CORE ─── */}
      <section className="py-16 lg:py-24 px-6 lg:px-10 bg-gray-light">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 lg:mb-16 reveal">
            <p className="text-xs uppercase tracking-widest text-gray-medium mb-3">Cosa Offriamo</p>
            <h2 className="text-4xl lg:text-5xl font-semibold text-black tracking-tight">
              Le nostre lavorazioni
            </h2>
            <p className="text-base text-gray-medium mt-4 max-w-2xl mx-auto">
              Dalla singola scheda al quadro completo: progettiamo, assembliamo e collaudiamo in casa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, i) => (
              <div
                key={i}
                className="opacity-0 animate-fade-in-up bg-white rounded-2xl p-7 border border-transparent hover:border-elektra-accent shadow-sm hover:shadow-panel transition-all duration-500 group flex flex-col h-full"
                style={{ animationDelay: `${i * 80}ms`, animationFillMode: 'forwards' }}
              >
                <div className="w-14 h-14 rounded-xl bg-elektra-accent flex items-center justify-center text-white flex-shrink-0">
                  {service.icon}
                </div>
                <h3 className="font-semibold text-lg text-black mt-5">{service.title}</h3>
                <p className="text-sm text-gray-medium mt-3 leading-relaxed flex-grow">{service.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/contatti"
              className="inline-flex items-center gap-2 text-sm font-bold text-black underline underline-offset-4 hover:text-elektra-accent transition-colors"
            >
              Parliamo del tuo progetto <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── CATEGORIE PRODOTTO ─── */}
      <section className="py-16 lg:py-24 px-6 lg:px-10 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 reveal">
            <div>
              <p className="text-xs uppercase tracking-widest text-gray-medium mb-3">Catalogo</p>
              <h2 className="text-4xl lg:text-5xl font-semibold text-black tracking-tight">
                Prodotti in evidenza
              </h2>
            </div>
            <Link
              to="/catalogo"
              className="inline-flex items-center gap-2 mt-4 lg:mt-0 text-sm font-medium text-black hover:text-elektra-accent transition-colors duration-300"
            >
              Vedi tutto il catalogo <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
            <CategoryCard
              title="Alimentatori"
              image="/images/alimentatore.jpg"
              icon={<Zap size={18} />}
            />
            <CategoryCard
              title="Schede Interfaccia"
              image="/images/scheda-interfaccia.jpg"
              icon={<CircuitBoard size={18} />}
            />
            <CategoryCard
              title="Relè Statici"
              image="/images/rele.jpg"
              icon={<ToggleRight size={18} />}
            />
          </div>
        </div>
      </section>

      {/* ─── APPROCCIO ─── */}
      <section className="py-16 lg:py-24 px-6 lg:px-10 bg-gray-light">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <div className="reveal">
            <p className="text-xs uppercase tracking-widest text-gray-medium mb-4">Il nostro approccio</p>
            <h2 className="text-4xl lg:text-6xl font-semibold text-black tracking-tight leading-tight">
              Dalla progettazione alla produzione.
            </h2>
            <p className="text-base text-gray-medium mt-6 leading-relaxed max-w-md">
              Un unico interlocutore per tutto il ciclo produttivo: meno passaggi, più controllo sulla qualità e tempi più prevedibili.
            </p>
            <Link
              to="/casi-studio"
              className="inline-flex items-center gap-2 mt-8 bg-gray-dark text-white text-sm font-medium px-6 py-3 rounded-lg hover:bg-black transition-colors duration-300"
            >
              Vedi i progetti <ArrowRight size={16} />
            </Link>
          </div>

          <div>
            <ApproachBlock
              number="01"
              title="Ingegneria di precisione"
              desc="L’esperienza dei fondatori, oltre 40 anni nel settore, applicata a ogni nuovo progetto."
            />
            <ApproachBlock
              number="02"
              title="Produzione flessibile"
              desc="Dal prototipo singolo alla pre-serie, con la stessa attenzione al dettaglio."
            />
            <ApproachBlock
              number="03"
              title="Qualità controllata"
              desc="Collaudo e verifica su ogni lotto, con documentazione tecnica di accompagnamento."
            />
          </div>
        </div>
      </section>
    </Layout>
  );
}
