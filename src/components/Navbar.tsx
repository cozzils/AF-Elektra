import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { Menu, X } from 'lucide-react';
import Logo from '@/components/Logo';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Chi Siamo', path: '/chi-siamo' },
  { label: 'Catalogo', path: '/catalogo' },
  { label: 'Progetti', path: '/casi-studio' },
  { label: 'Contatti', path: '/contatti' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  // Se la rotta cambia (link, back/forward del browser), il menu mobile
  // non deve restare aperto sopra la nuova pagina. Adeguiamo lo stato
  // durante il render invece di usare un effect con setState.
  const [menuPath, setMenuPath] = useState(location.pathname);
  if (location.pathname !== menuPath) {
    setMenuPath(location.pathname);
    setMobileOpen(false);
  }

  // Esc chiude il menu, come ci si aspetta da un overlay a tutto schermo.
  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [mobileOpen]);

  const closeMobileMenu = () => setMobileOpen(false);

  // Sulla home l'header è sopra la foto scura: finché non si scrolla (o non si
  // apre il menu) serve la variante chiara, altrimenti il contrasto crolla.
  const solidHeader = scrolled || mobileOpen || location.pathname !== '/';
  const darkHeader = !solidHeader;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          solidHeader
            ? 'bg-white/95 backdrop-blur-md border-b border-black/5 shadow-xs'
            : 'bg-gradient-to-b from-black/60 via-black/25 to-transparent'
        }`}
      >
        <div className="flex items-center justify-between px-6 lg:px-10 h-16 lg:h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center hover:opacity-80 transition-opacity duration-300"
            aria-label="AF Elektra 2 — torna alla home"
          >
            <Logo className="h-10 lg:h-12 w-auto" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                aria-current={location.pathname === link.path ? 'page' : undefined}
                className={`text-sm font-semibold tracking-wide uppercase transition-colors duration-300 ${
                  location.pathname === link.path
                    ? darkHeader ? 'text-white' : 'text-black'
                    : darkHeader ? 'text-white/80 hover:text-white' : 'text-gray-medium hover:text-black'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              to="/contatti"
              className={`ml-2 text-sm font-bold px-5 py-2.5 rounded-lg transition-all duration-300 shadow-sm ${
                darkHeader
                  ? 'bg-white text-black hover:bg-white/90'
                  : 'bg-black text-white hover:bg-black/80'
              }`}
            >
              Richiedi Preventivo
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className={`lg:hidden p-2 ${darkHeader ? 'text-white' : 'text-black'}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Chiudi menu' : 'Apri menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        id="mobile-menu"
        aria-hidden={!mobileOpen}
        inert={!mobileOpen}
        className={`fixed inset-0 z-40 bg-white transition-transform duration-500 ease-out-circ lg:hidden overflow-y-auto ${
          mobileOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="flex flex-col items-start justify-center h-full px-8 pt-20">
          <nav className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={closeMobileMenu}
                aria-current={location.pathname === link.path ? 'page' : undefined}
                className="text-4xl font-bold text-black hover:text-gray-medium transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-12 flex flex-col gap-4 w-full max-w-xs">
            <Link
              to="/contatti"
              onClick={closeMobileMenu}
              className="bg-black text-white text-lg font-semibold px-8 py-4 rounded-lg text-center hover:bg-black/80 transition-colors duration-300"
            >
              Richiedi Preventivo
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
