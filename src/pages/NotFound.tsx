import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
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
      <section className="min-h-[70vh] flex flex-col items-center justify-center bg-white px-6 lg:px-10 pt-32 pb-24 text-center">
        <Logo className="h-16 w-auto mb-10" />
        <p className="text-xs uppercase tracking-widest text-gray-medium mb-4">Errore 404</p>
        <h1 className="text-5xl lg:text-7xl font-semibold text-black tracking-tight">
          Pagina non trovata
        </h1>
        <p className="text-base text-gray-medium mt-4 max-w-xl">
          L&apos;indirizzo che hai inserito non esiste o è stato spostato. Torna alla home oppure
          scrivici: ti aiutiamo noi.
        </p>
        <div className="flex flex-wrap gap-4 justify-center mt-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-gray-dark text-white text-sm font-medium px-6 py-3 rounded-lg hover:bg-black transition-colors duration-300"
          >
            Torna alla home <ArrowRight size={16} />
          </Link>
          <Link
            to="/contatti"
            className="inline-flex items-center gap-2 border border-black/20 text-black text-sm font-medium px-6 py-3 rounded-lg hover:bg-gray-light transition-colors duration-300"
          >
            Contattaci
          </Link>
        </div>
      </section>
    </Layout>
  );
}
