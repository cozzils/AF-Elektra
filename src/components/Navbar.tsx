import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Chi Siamo', path: '/chi-siamo' },
  { label: 'Catalogo', path: '/catalogo' },
  { label: 'Casi di Studio', path: '/casi-studio' },
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

  const closeMobileMenu = () => setMobileOpen(false);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-white/90 backdrop-blur-md border-b border-black/5 shadow-xs'
            : 'bg-transparent'
        }`}
      >
        <div className="flex items-center justify-between px-6 lg:px-10 h-16 lg:h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 font-bold text-lg lg:text-xl tracking-tight text-black hover:opacity-75 transition-opacity duration-300"
          >
            <svg className="w-7 h-7 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="2" ry="2"></rect>
              <path d="M2 12h4"></path>
              <path d="M18 12h4"></path>
              <path d="M12 2v4"></path>
              <path d="M12 18v4"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
            AF Elektra 2
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
                    ? 'text-black'
                    : 'text-gray-medium hover:text-black'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-4 text-black">
            <Link
              to="/contatti"
              className="ml-2 bg-black text-white text-sm font-bold px-5 py-2.5 rounded-lg hover:bg-black/80 transition-all duration-300 shadow-sm"
            >
              Richiedi Preventivo
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden p-2 text-black"
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
