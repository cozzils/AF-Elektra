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
  Plug,
  ToggleRight,
  Puzzle,
} from 'lucide-react';
import Layout from '@/components/Layout';



/* ─── Service Row (horizontal scroll) ─── */
function ServiceRow({ items, direction = 'left' }: { items: { icon: React.ReactNode; label: string; desc: string }[]; direction?: 'left' | 'right' }) {
  const doubled = [...items, ...items, ...items, ...items];

  return (
    <div className="overflow-hidden py-4">
      <div className={`inline-flex gap-6 ${direction === 'left' ? 'animate-scroll-left' : 'animate-scroll-right'}`}>
        {doubled.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-4 bg-white border border-black/5 rounded-2xl px-6 py-4 min-w-[320px] flex-shrink-0 hover:border-black/20 hover:shadow-panel transition-all duration-300 group"
          >
            <div className="w-12 h-12 rounded-xl bg-gray-light flex items-center justify-center text-gray-dark group-hover:bg-elektra-accent group-hover:text-black transition-colors duration-300 flex-shrink-0">
              {item.icon}
            </div>
            <div>
              <p className="font-semibold text-sm text-black">{item.label}</p>
              <p className="text-xs text-gray-medium mt-0.5">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Product Category Card ─── */
function CategoryCard({ title, count, image, icon }: { title: string; count: number; image: string; icon: React.ReactNode }) {
  return (
    <Link
      to="/catalogo"
      className="group relative block overflow-hidden rounded-2xl bg-white border border-black/5 hover:border-black/20 transition-all duration-500"
    >
      <div className="aspect-square overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.075,0.820,0.165,1)]"
        />
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gray-light flex items-center justify-center text-gray-dark group-hover:bg-elektra-accent group-hover:text-black transition-colors duration-300">
              {icon}
            </div>
            <h3 className="font-semibold text-lg text-black">{title}</h3>
          </div>
          <span className="text-xs text-gray-medium bg-gray-light px-2.5 py-1 rounded-full">{count}</span>
        </div>
      </div>
    </Link>
  );
}

/* ─── Stat Block ─── */
function StatBlock({ number, title, desc }: { number: string; title: string; desc: string }) {
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
  const servicesRow1 = [
    { icon: <Cpu size={20} />, label: 'Elettrotecnica Generale', desc: 'Soluzioni complete per impianti' },
    { icon: <Zap size={20} />, label: 'Illuminazione', desc: 'Progetti luce su misura' },
    { icon: <Settings size={20} />, label: 'Risparmio Energetico', desc: 'Efficienza e sostenibilita' },
    { icon: <CircuitBoard size={20} />, label: 'Cablaggio Quadri', desc: 'Assemblaggio professionale' },
  ];

  const servicesRow2 = [
    { icon: <Factory size={20} />, label: 'Assemblaggio Schede', desc: 'SMT e through-hole' },
    { icon: <Code2 size={20} />, label: 'Dispositivi Elettronici', desc: 'Progettazione hardware' },
    { icon: <Plug size={20} />, label: 'Installazioni Civili', desc: 'Impianti residenziali' },
    { icon: <CheckCircle2 size={20} />, label: 'Rilevazione Fumi', desc: 'Sistemi di sicurezza' },
  ];

  return (
    <Layout>
      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center bg-black overflow-hidden px-6 lg:px-10">
        
        {/* Full-Screen Background Video */}
        <div className="absolute inset-0 z-0">
          <video 
            autoPlay 
            muted 
            loop 
            playsInline 
            className="w-full h-full object-cover grayscale"
            src="https://www.mpe-electronics.co.uk/wp-content/uploads/2024/02/contract-electronics-manufacture-mpe.mp4"
          />
        </div>
        
        {/* Dark Vignette Overlay for Premium Readability */}
        <div className="absolute inset-0 z-10 bg-black/60 backdrop-blur-[1px]" />
        
        {/* Hero Foreground Content Overlaid on Top */}
        <div className="relative z-20 w-full max-w-5xl mx-auto flex flex-col items-center text-center gap-8">
          
          <div className="flex flex-col items-center">
            <p className="text-xs lg:text-sm text-elektra-accent font-extrabold uppercase tracking-widest mb-4">
              ECCELLENZA NELL&apos;ELETTRONICA INDUSTRIALE
            </p>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white uppercase tracking-tight leading-[1.05] max-w-4xl select-none">
              Realizza con noi <br />
              la <span className="text-elektra-accent italic font-serif lowercase">tua</span> idea.
            </h1>
            
            <p className="text-base lg:text-lg text-white font-medium drop-shadow-md mt-6 leading-relaxed max-w-2xl bg-black/20 px-4 py-2 rounded-lg">
              Progettazione, sviluppo e produzione di sistemi elettronici industriali ad alta precisione. Affidabilità e competenza per il settore B2B.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 justify-center mt-2">
            <Link
              to="/catalogo"
              className="bg-elektra-accent text-white text-sm font-bold px-8 py-4 rounded-xl hover:bg-elektra-accent/90 transition-all duration-300 shadow-lg shadow-elektra-accent/20"
            >
              Esplora i Servizi &rarr;
            </Link>
            <Link
              to="/contatti"
              className="border-2 border-white/30 text-white text-sm font-bold px-8 py-4 rounded-xl hover:bg-white/10 hover:border-white/50 transition-all duration-300 bg-transparent"
            >
              Contatta un Esperto
            </Link>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-20">
          <svg className="w-8 h-8 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* ─── INTRO / CHI SIAMO TEASER ─── */}
      <section className="py-24 lg:py-32 px-6 lg:px-10 bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-5 reveal">
            <p className="text-xs uppercase tracking-widest text-gray-medium mb-4">Chi Siamo</p>
            <h2 className="text-4xl lg:text-5xl font-semibold text-black leading-tight tracking-tight">
              L&apos;INGEGNERIA CHE FA LA DIFFERENZA.
            </h2>
            <p className="text-lg text-black mt-4 font-medium">
              Dal concept al collaudo finale, il partner giusto per le tue idee.
            </p>
            <p className="text-sm lg:text-base text-gray-medium mt-6 leading-relaxed">
              Con oltre 40 anni di esperienza, AF Elektra 2 e il partner ideale per chi cerca un&apos;azienda affidabile e competente, in grado di seguire il cliente in ogni fase del processo, dalla progettazione alla realizzazione finale.
            </p>
            <Link
              to="/chi-siamo"
              className="inline-flex items-center gap-2 mt-8 bg-gray-dark text-white text-sm font-medium px-6 py-3 rounded-lg hover:bg-black transition-colors duration-300"
            >
              Scopri di Piu <ArrowRight size={16} />
            </Link>
          </div>

          <div className="lg:col-span-7 reveal">
            <div className="relative rounded-2xl overflow-hidden">
              <img
                src="/images/stabilimento.jpg"
                alt="Stabilimento AF Elektra 2"
                className="w-full h-[400px] lg:h-[550px] object-cover"
              />
              <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm rounded-xl px-5 py-3 shadow-panel">
                <p className="text-xs uppercase tracking-widest text-gray-medium">Sede</p>
                <p className="text-sm font-medium text-black mt-0.5">Castenedolo (BS), Italia</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 6 SERVIZI CORE ─── */}
      <section className="py-24 lg:py-32 px-6 lg:px-10 bg-gray-light">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 reveal">
            <p className="text-xs uppercase tracking-widest text-gray-medium mb-3">Cosa Offriamo</p>
            <h2 className="text-4xl lg:text-5xl font-semibold text-black tracking-tight">
              6 Servizi Core
            </h2>
          </div>


          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <CircuitBoard size={28} />,
                title: 'Progettazione Schede',
                desc: 'Architetture hardware personalizzate su specifiche tecniche rigorose. Dal concept al prototipo funzionante.',
              },
              {
                icon: <Cpu size={28} />,
                title: 'Realizzazione Master',
                desc: 'Sbrogliatura e ottimizzazione layout PCB per massimizzare le prestazioni elettriche e termiche.',
              },
              {
                icon: <Factory size={28} />,
                title: 'Montaggio SMT',
                desc: 'Assemblaggio automatizzato ad alta precisione per componenti superficiali con controllo qualita AOI.',
              },
              {
                icon: <Settings size={28} />,
                title: 'Quadristica',
                desc: 'Progettazione e cablaggio di quadri elettrici di comando e controllo industriale su misura.',
              },
              {
                icon: <Code2 size={28} />,
                title: 'Programmazione PLC',
                desc: 'Software logico per l\'automazione di macchinari e processi produttivi. Siemens e Omron.',
              },
              {
                icon: <CheckCircle2 size={28} />,
                title: 'Saldatura / Collaudo',
                desc: 'Verifica funzionale e testing finale per garantire standard qualitativi elevati su ogni lotto.',
              },
            ].map((service, i) => (
              <div
                key={i}
                className="opacity-0 animate-fade-in-up bg-white rounded-2xl p-8 border border-transparent hover:border-elektra-accent shadow-sm hover:shadow-panel transition-all duration-500 group flex flex-col h-full"
                style={{ animationDelay: `${i * 150}ms`, animationFillMode: 'forwards' }}
              >
                <div className="w-14 h-14 rounded-xl bg-elektra-accent flex items-center justify-center text-white flex-shrink-0">
                  {service.icon}
                </div>
                <h3 className="font-semibold text-xl text-black mt-6">{service.title}</h3>
                <p className="text-sm text-gray-medium mt-3 leading-relaxed flex-grow">{service.desc}</p>
                <Link to="/catalogo" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-elektra-accent hover:opacity-80 transition-opacity">
                  Scopri di più <ArrowRight size={16} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SERVIZI SCROLL ORIZZONTALE ─── */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="px-6 lg:px-10 mb-10 reveal">
          <p className="text-xs uppercase tracking-widest text-gray-medium mb-3">Aree di Competenza</p>
          <h2 className="text-3xl lg:text-4xl font-semibold text-black tracking-tight">
            Soluzioni per un Futuro Connesso
          </h2>
        </div>

        <ServiceRow items={servicesRow1} direction="left" />
        <ServiceRow items={servicesRow2} direction="right" />
      </section>

      {/* ─── CATEGORIE PRODOTTO ─── */}
      <section className="py-24 lg:py-32 px-6 lg:px-10 bg-gray-light">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 reveal">
            <div>
              <p className="text-xs uppercase tracking-widest text-gray-medium mb-3">Catalogo</p>
              <h2 className="text-4xl lg:text-5xl font-semibold text-black tracking-tight">
                Prodotti in Evidenza
              </h2>
            </div>
            <Link
              to="/catalogo"
              className="inline-flex items-center gap-2 mt-4 lg:mt-0 text-sm font-medium text-black hover:text-gray-medium transition-colors duration-300"
            >
              Vedi tutto il catalogo <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 stagger-children">
            <CategoryCard
              title="Alimentatori"
              count={42}
              image="/images/alimentatore.jpg"
              icon={<Zap size={18} />}
            />
            <CategoryCard
              title="Schede Interfaccia"
              count={35}
              image="/images/scheda-interfaccia.jpg"
              icon={<CircuitBoard size={18} />}
            />
            <CategoryCard
              title="Relè Statici"
              count={28}
              image="/images/rele.jpg"
              icon={<ToggleRight size={18} />}
            />
            <CategoryCard
              title="Componenti"
              count={43}
              image="/images/pcb-closeup.jpg"
              icon={<Puzzle size={18} />}
            />
          </div>
        </div>
      </section>

      {/* ─── STATISTICHE ─── */}
      <section className="py-24 lg:py-32 px-6 lg:px-10 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="reveal">
            <p className="text-xs uppercase tracking-widest text-gray-medium mb-4">I Nostri Numeri</p>
            <h2 className="text-4xl lg:text-6xl font-semibold text-black tracking-tight leading-tight">
              Dalla progettazione alla produzione.
            </h2>
            <p className="text-base text-gray-medium mt-6 leading-relaxed max-w-md">
              Numeri che parlano di competenza, flessibilita e qualita. Ogni progetto e una sfida che affrontiamo con precisione e passione.
            </p>
          </div>

          <div>
            <StatBlock
              number="01"
              title="Ingegneria di Precisione"
              desc="40 anni di competenza cumulativa nel settore dell'elettronica industriale."
            />
            <StatBlock
              number="02"
              title="Produzione Flessibile"
              desc="Quantita da 1 a 1000+ pezzi. Adattiamo la produzione alle tue esigenze."
            />
            <StatBlock
              number="03"
              title="Qualita Certificata"
              desc="ISO 9001. Ogni prodotto viene collaudato secondo rigorosi standard qualitativi."
            />
          </div>
        </div>
      </section>
    </Layout>
  );
}
