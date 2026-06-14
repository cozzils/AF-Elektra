import { Link } from 'react-router';
import { MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-dark text-white">
      <div className="px-6 lg:px-10 py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="text-2xl font-semibold tracking-tight">
              AF Elektra 2
            </Link>
            <p className="mt-2 text-xs text-elektra-accent font-semibold uppercase tracking-wider">
              Membro Confindustria Brescia
            </p>
            <p className="mt-4 text-sm text-white/60 leading-relaxed max-w-xs">
              Eccellenza nell&apos;Elettronica Industriale. Dal concept al collaudo finale, il partner tecnologico per le tue idee.
            </p>
            <p className="mt-6 text-xs text-white/40 uppercase tracking-wider">
              P.IVA 03286600980
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-medium uppercase tracking-widest text-white/40 mb-6">
              Navigazione
            </h4>
            <nav className="flex flex-col gap-3">
              {[
                { label: 'Home', path: '/' },
                { label: 'Chi Siamo', path: '/chi-siamo' },
                { label: 'Catalogo Prodotti', path: '/catalogo' },
                { label: 'Casi di Studio', path: '/casi-studio' },
                { label: 'Contatti', path: '/contatti' },
              ].map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-sm text-white/70 hover:text-elektra-accent transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-xs font-medium uppercase tracking-widest text-white/40 mb-6">
              Informazioni
            </h4>
            <nav className="flex flex-col gap-3">
              {['Privacy Policy', 'Termini e Condizioni', 'Supporto Tecnico', 'Certificazioni ISO'].map((label) => (
                <span
                  key={label}
                  className="text-sm text-white/70 hover:text-elektra-accent transition-colors duration-300 cursor-pointer"
                >
                  {label}
                </span>
              ))}
              <a href="#" className="text-sm text-white/70 hover:text-elektra-accent transition-colors duration-300">
                LinkedIn
              </a>
              <a href="mailto:afelektra2@afelektra.com" className="text-sm text-white/70 hover:text-elektra-accent transition-colors duration-300">
                Email
              </a>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-medium uppercase tracking-widest text-white/40 mb-6">
              Contatti
            </h4>
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <MapPin size={16} className="mt-0.5 text-white/40 flex-shrink-0" />
                <span className="text-sm text-white/70">
                  Via Artigiani, 19<br />
                  25014 Castenedolo (BS)<br />
                  Italia
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-white/40 flex-shrink-0" />
                <span className="text-sm text-white/70">030 2130630</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-white/40 flex-shrink-0" />
                <span className="text-sm text-white/70">afelektra2@afelektra.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} AF Elektra 2. P.IVA 03286600980. Eccellenza nell&apos;Elettronica Industriale.
          </p>
          <p className="text-xs text-white/40">
            Ingegneria di precisione, dal 2019.
          </p>
        </div>
      </div>
    </footer>
  );
}
