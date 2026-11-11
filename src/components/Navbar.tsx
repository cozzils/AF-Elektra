import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Menu, Phone, X } from 'lucide-react';
import Logo from '@/components/Logo';

const navLinks = [
  { label: 'Servizi', to: '/#servizi', hash: '#servizi' },
  { label: 'Processo', to: '/#processo', hash: '#processo' },
  { label: 'Catalogo', to: '/catalogo', hash: null },
  { label: 'Progetti', to: '/casi-studio', hash: null },
  { label: 'Chi siamo', to: '/chi-siamo', hash: null },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const [menuPath, setMenuPath] = useState(location.pathname);
  if (location.pathname !== menuPath) {
    setMenuPath(location.pathname);
    setMobileOpen(false);
  }

  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [mobileOpen]);

  const isActive = (link: (typeof navLinks)[number]) => {
    if (link.hash) {
      return location.pathname === '/' && location.hash === link.hash;
    }
    if (link.to === '/catalogo') return location.pathname.startsWith('/catalogo');
    return location.pathname === link.to;
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled || mobileOpen
            ? 'border-b border-white/[0.07] bg-[#070908]/80 backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <div
          className={`mx-auto flex max-w-[1440px] items-center justify-between px-5 transition-all duration-500 lg:px-10 ${
            scrolled ? 'h-16' : 'h-20 lg:h-24'
          }`}
        >
          <Link
            to="/"
            className="group flex items-center gap-3"
            aria-label="AF Elektra 2 — torna alla home"
          >
            <span className="logo-plate transition-transform duration-500 group-hover:-translate-y-0.5">
              <Logo className="h-8 w-auto lg:h-9" />
            </span>
            <span className="hidden flex-col leading-none xl:flex">
              <span className="font-mono-tech text-[10px] uppercase tracking-[0.22em] text-white/55">
                Elettronica industriale
              </span>
              <span className="mt-1 font-mono-tech text-[10px] uppercase tracking-[0.22em] text-neon/80">
                Castenedolo · Brescia
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Navigazione principale">
            {navLinks.map((link) => {
              const active = isActive(link);
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  aria-current={active ? 'page' : undefined}
                  className={`group relative py-2 font-mono-tech text-[11px] uppercase tracking-[0.18em] transition-colors duration-300 ${
                    active ? 'text-white' : 'text-white/55 hover:text-white'
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-0.5 left-0 h-px bg-neon transition-all duration-300 ${
                      active ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-5 lg:flex">
            <a
              href="tel:+390302130630"
              className="hidden items-center gap-2 font-mono-tech text-[11px] tracking-[0.08em] text-white/55 transition-colors hover:text-white xl:flex"
            >
              <Phone size={13} className="text-neon" />
              030 2130630
            </a>
            <Link
              to="/contatti"
              className="group inline-flex items-center gap-2 rounded-full bg-elektra-accent px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_30px_-8px_rgba(21,128,61,0.9)] transition-all duration-300 hover:bg-[#1a9c4c] hover:shadow-[0_0_40px_-6px_rgba(110,245,155,0.5)]"
            >
              Richiedi preventivo
              <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>

          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white transition-colors hover:border-neon/40 lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Chiudi menu' : 'Apri menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 overflow-y-auto bg-[#070908]/98 pt-24 backdrop-blur-2xl lg:hidden"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_80%_0%,rgba(21,128,61,0.22),transparent_70%)]" />
            <div className="relative flex min-h-full flex-col px-6 pb-10">
              <nav className="flex flex-col" aria-label="Navigazione mobile">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.04 * index, duration: 0.4 }}
                  >
                    <Link
                      to={link.to}
                      onClick={() => setMobileOpen(false)}
                      className="group flex items-baseline justify-between border-b border-white/[0.07] py-5"
                    >
                      <span className="font-display text-3xl font-medium tracking-tight text-white">
                        {link.label}
                      </span>
                      <span className="font-mono-tech text-[10px] text-neon/70">
                        0{index + 1}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="mt-10 flex flex-col gap-3">
                <Link
                  to="/contatti"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between rounded-2xl bg-elektra-accent px-6 py-4 text-base font-semibold text-white"
                >
                  Richiedi preventivo
                  <ArrowUpRight size={18} />
                </Link>
                <a
                  href="tel:+390302130630"
                  className="flex items-center justify-between rounded-2xl border border-white/10 px-6 py-4 text-base text-white/80"
                >
                  <span className="flex items-center gap-3">
                    <Phone size={16} className="text-neon" />
                    030 2130630
                  </span>
                  <span className="font-mono-tech text-[10px] uppercase tracking-widest text-white/55">
                    Chiama
                  </span>
                </a>
              </div>

              <p className="mt-auto pt-10 font-mono-tech text-[10px] uppercase leading-relaxed tracking-[0.18em] text-white/55">
                AF Elektra 2 · Via Artigiani 19<br />
                25014 Castenedolo (BS)
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
