import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout({ children }: { children: React.ReactNode }) {
  useScrollReveal();
  const location = useLocation();

  useEffect(() => {
    // scroll to top when the route changes (smooth on modern browsers)
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
