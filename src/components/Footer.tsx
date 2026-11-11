import { Link } from 'react-router';
import { ArrowUpRight, Clock, Mail, MapPin, Phone } from 'lucide-react';
import Logo from '@/components/Logo';

const navigation = [
  { label: 'Home', path: '/' },
  { label: 'Chi siamo', path: '/chi-siamo' },
  { label: 'Catalogo prodotti', path: '/catalogo' },
  { label: 'Progetti', path: '/casi-studio' },
  { label: 'Contatti', path: '/contatti' },
];

const information = [
  { label: 'Privacy Policy', path: '/privacy' },
  { label: 'Cookie Policy', path: '/cookie-policy' },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.07] bg-[#060807]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_15%_0%,rgba(21,128,61,0.14),transparent_70%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:linear-gradient(rgba(110,245,155,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(110,245,155,0.05)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_100%,#000_10%,transparent_75%)]"
      />

      <div className="relative mx-auto max-w-[1440px] px-5 py-14 lg:px-10 lg:py-20">
        {/* CTA */}
        <div className="flex flex-col gap-6 border-b border-white/[0.07] pb-12 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="tech-label text-neon/80">AF Elektra 2 · Castenedolo (BS)</p>
            <h2 className="mt-4 max-w-2xl font-display text-3xl font-medium leading-[1.05] tracking-tight text-white sm:text-4xl lg:text-5xl">
              Hai un progetto elettronico da sviluppare?
            </h2>
          </div>
          <Link
            to="/contatti"
            className="group inline-flex w-fit items-center gap-3 rounded-full bg-elektra-accent px-6 py-3.5 text-sm font-semibold text-white shadow-[0_0_35px_-10px_rgba(21,128,61,0.95)] transition-all duration-300 hover:bg-[#1a9c4c] hover:shadow-[0_0_45px_-6px_rgba(110,245,155,0.5)]"
          >
            Richiedi un preventivo
            <ArrowUpRight
              size={17}
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-12 pt-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-5">
            <Link to="/" aria-label="AF Elektra 2 — torna alla home" className="inline-flex">
              <span className="logo-plate">
                <Logo className="h-11 w-auto" />
              </span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/60">
              Progettazione e produzione di elettronica industriale. Dal concept al
              collaudo finale, un unico partner tecnico per schede, quadri e
              automazione.
            </p>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 font-mono-tech text-[10px] uppercase tracking-[0.16em] text-white/55">
              <span>Fondata nel 2019</span>
              <span>40+ anni di esperienza</span>
            </div>
          </div>

          {/* Navigazione */}
          <nav className="lg:col-span-2" aria-label="Navigazione footer">
            <h3 className="tech-label mb-5 text-white/45">Navigazione</h3>
            <ul className="flex flex-col gap-3">
              {navigation.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-white/60 transition-colors duration-300 hover:text-neon"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Informazioni */}
          <div className="lg:col-span-2">
            <h3 className="tech-label mb-5 text-white/45">Informazioni</h3>
            <ul className="flex flex-col gap-3">
              {information.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-white/60 transition-colors duration-300 hover:text-neon"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/contatti"
                  className="text-sm text-white/60 transition-colors duration-300 hover:text-neon"
                >
                  Richiedi un preventivo
                </Link>
              </li>
            </ul>
          </div>

          {/* Contatti */}
          <div className="lg:col-span-3">
            <h3 className="tech-label mb-5 text-white/45">Contatti</h3>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="mt-0.5 flex-shrink-0 text-neon/70" aria-hidden="true" />
                <span className="text-sm leading-relaxed text-white/60">
                  Via Artigiani, 19
                  <br />
                  25014 Castenedolo (BS), Italia
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="flex-shrink-0 text-neon/70" aria-hidden="true" />
                <a
                  href="tel:+390302130630"
                  className="text-sm text-white/60 transition-colors duration-300 hover:text-neon"
                >
                  030 2130630
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="flex-shrink-0 text-neon/70" aria-hidden="true" />
                <a
                  href="mailto:afelektra2@afelektra.com"
                  className="break-all text-sm text-white/60 transition-colors duration-300 hover:text-neon"
                >
                  afelektra2@afelektra.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock size={16} className="mt-0.5 flex-shrink-0 text-neon/70" aria-hidden="true" />
                <span className="text-sm leading-relaxed text-white/60">
                  Lun–Ven, su appuntamento
                  <br />
                  <span className="text-xs text-white/55">
                    Chiamaci per fissare un incontro.
                  </span>
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col gap-4 border-t border-white/[0.07] pt-7 md:flex-row md:items-center md:justify-between">
          <p className="text-xs leading-relaxed text-white/55">
            &copy; {new Date().getFullYear()} AF Elektra 2 &bull; P.IVA / C.F. 03286600980
            &bull; Via Artigiani 19, Castenedolo (BS)
          </p>
          <p className="font-mono-tech text-[10px] uppercase tracking-[0.18em] text-white/55">
            Ingegneria di precisione, dal 2019.
          </p>
        </div>
      </div>
    </footer>
  );
}
