import { Link } from 'react-router';
import { ArrowRight, CircuitBoard } from 'lucide-react';
import Layout from '@/components/Layout';
import Logo from '@/components/Logo';
import { usePageMeta } from '@/hooks/usePageMeta';

export default function NotFound() {
  usePageMeta(
    'Pagina non trovata | AF Elektra 2',
    'La pagina richiesta non esiste. Torna alla home o contatta AF Elektra 2.',
    '/404',
    { noindex: true },
  );

  return (
    <Layout>
      <section className="relative flex min-h-[78vh] flex-col items-center justify-center overflow-hidden px-5 pb-24 pt-32 text-center lg:px-10">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/3 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-elektra-accent/15 blur-[120px]"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-24 -translate-x-1/2 select-none font-display text-[22vw] font-medium leading-none text-white/[0.03]"
        >
          404
        </span>

        <div className="relative">
          <span className="logo-plate mb-10 inline-flex">
            <Logo className="h-14 w-auto" />
          </span>

          <p className="tech-label text-neon/70">Errore 404</p>
          <h1 className="mt-5 max-w-2xl font-display text-4xl font-medium leading-[1.02] tracking-tight text-white sm:text-5xl lg:text-6xl">
            Pagina non trovata.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/55">
            L&apos;indirizzo che hai inserito non esiste o è stato spostato. Torna
            alla home oppure scrivici: ti aiutiamo noi.
          </p>

          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link
              to="/"
              className="group inline-flex items-center gap-2.5 rounded-full bg-elektra-accent px-7 py-4 text-sm font-semibold text-white shadow-[0_0_40px_-10px_rgba(21,128,61,0.95)] transition-all duration-300 hover:bg-[#1a9c4c]"
            >
              Torna alla home
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
            <Link
              to="/contatti"
              className="inline-flex items-center gap-2.5 rounded-full border border-white/15 px-7 py-4 text-sm font-medium text-white/80 transition-all duration-300 hover:border-neon/40 hover:bg-white/[0.04] hover:text-white"
            >
              Contattaci
            </Link>
          </div>

          <p className="mt-10 flex items-center justify-center gap-2 font-mono-tech text-[10px] uppercase tracking-[0.18em] text-white/55">
            <CircuitBoard size={13} className="text-neon/60" aria-hidden="true" />
            AF Elektra 2 · Elettronica industriale
          </p>
        </div>
      </section>
    </Layout>
  );
}
