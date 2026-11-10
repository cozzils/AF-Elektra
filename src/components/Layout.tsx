import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout({ children }: { children: React.ReactNode }) {
  useScrollReveal();
  const location = useLocation();

  useEffect(() => {
    // riporta in cima alla pagina a ogni cambio rotta (senza animazione:
    // lo scroll fluido renderebbe la navigazione lenta e disorientante)
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <a
        href="#contenuto"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[60] focus:bg-white focus:text-black focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm focus:font-medium focus:shadow-panel"
      >
        Vai al contenuto
      </a>
      <Navbar />
      <main id="contenuto" className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
