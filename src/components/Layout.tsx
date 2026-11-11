import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout({ children }: { children: React.ReactNode }) {
  useScrollReveal();
  const location = useLocation();
  const mainRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);

  useEffect(() => {
    // Nelle SPA il focus resta sul link appena cliccato: spostarlo sul
    // contenuto fa ripartire la lettura dello screen reader dalla nuova pagina.
    if (firstRender.current) {
      firstRender.current = false;
    } else {
      mainRef.current?.focus({ preventScroll: true });
    }

    const target = location.hash ? document.getElementById(location.hash.slice(1)) : null;

    // Con un hash (es. /#servizi) raggiungiamo la sezione dopo il render.
    // Due frame assicurano che il layout sia già stabile.
    if (target) {
      let second = 0;
      const first = window.requestAnimationFrame(() => {
        second = window.requestAnimationFrame(() => {
          const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
          target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
        });
      });
      return () => {
        window.cancelAnimationFrame(first);
        window.cancelAnimationFrame(second);
      };
    }

    // Cambio rotta senza hash: torna in cima senza animazione, per non
    // rendere la navigazione lenta e disorientante.
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const bar = progressRef.current;
    if (!bar) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
      bar.style.transform = `scaleX(${progress})`;
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <div
        ref={progressRef}
        aria-hidden="true"
        className="fixed inset-x-0 top-0 z-[60] h-px origin-left scale-x-0 bg-gradient-to-r from-elektra-accent via-neon to-elektra-accent-light"
      />
      <a
        href="#contenuto"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:border focus:border-neon/40 focus:bg-[#0b0f0c] focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-white focus:shadow-glow"
      >
        Vai al contenuto
      </a>
      <Navbar />
      <main id="contenuto" ref={mainRef} tabIndex={-1} className="flex-1 outline-none">
        {children}
      </main>
      <Footer />
    </div>
  );
}
