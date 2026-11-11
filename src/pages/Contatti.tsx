import { useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router';
import { motion } from 'framer-motion';
import {
  MapPin,
  Phone,
  Mail,
  Building2,
  FileText,
  Send,
  CheckCircle2,
  User,
  MessageSquare,
  Clock,
} from 'lucide-react';
import Layout from '@/components/Layout';
import { usePageMeta } from '@/hooks/usePageMeta';

// Su Vercel la funzione serverless è /api/contact. Per un hosting PHP si può
// impostare VITE_CONTACT_ENDPOINT (es. /send.php) in fase di build.
const CONTACT_ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT || '/api/contact';

export default function Contatti() {
  usePageMeta(
    'Contatti | AF Elektra 2',
    'Contatta AF Elektra 2 a Castenedolo (BS): modulo online, telefono 030 2130630 ed email per richieste di preventivo su elettronica industriale.',
    '/contatti',
  );

  const [searchParams] = useSearchParams();
  const richiestoProdotto = (searchParams.get('prodotto') ?? '').slice(0, 120);
  const messaggioIniziale = richiestoProdotto
    ? `Sono interessato al prodotto ${richiestoProdotto}. Vorrei ricevere un preventivo e maggiori informazioni.`
    : '';

  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefono: '',
    area: richiestoProdotto ? 'prodotti' : '',
    messaggio: messaggioIniziale,
    privacy: false,
    website: '', // honeypot anti-bot: deve restare vuoto
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState('');
  const [privacyError, setPrivacyError] = useState('');
  const [mapLoaded, setMapLoaded] = useState(false);
  const privacyRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sending) return;

    if (!formData.privacy) {
      setPrivacyError('Per inviare la richiesta devi accettare la Privacy Policy.');
      privacyRef.current?.focus();
      return;
    }

    setPrivacyError('');
    setSending(true);
    setSendError('');
    try {
      const res = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: formData.nome,
          email: formData.email,
          telefono: formData.telefono,
          area: formData.area,
          messaggio: formData.messaggio,
          privacy: formData.privacy,
          website: formData.website,
        }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.ok) {
        throw new Error(data?.error || 'Invio non riuscito. Riprova tra poco.');
      }
      setSubmitted(true);
    } catch (err) {
      setSendError(err instanceof Error ? err.message : 'Invio non riuscito. Riprova tra poco.');
    } finally {
      setSending(false);
    }
  };

  const handleNewRequest = () => {
    setSubmitted(false);
    setSendError('');
    setPrivacyError('');
    setFormData({
      nome: '',
      email: '',
      telefono: '',
      area: richiestoProdotto ? 'prodotti' : '',
      messaggio: messaggioIniziale,
      privacy: false,
      website: '',
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (name === 'privacy') setPrivacyError('');
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  return (
    <Layout>
      {/* ─── HERO ─── */}
      <section className="bg-gray-light pt-32 pb-16 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.075, 0.82, 0.165, 1] }}
          >
            <p className="text-xs uppercase tracking-widest text-gray-medium mb-4">Contatti</p>
            <h1 className="text-5xl lg:text-7xl font-semibold text-black tracking-tight">
              Contattaci
            </h1>
            <p className="text-base text-gray-medium mt-4 max-w-xl">
              Siamo a disposizione per ogni richiesta. Compila il modulo o utilizza i recapiti qui sotto.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── CONTACT SECTION ─── */}
      <section className="py-16 lg:py-24 px-6 lg:px-10 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: [0.075, 0.82, 0.165, 1] }}
            >
              <div className="bg-gray-light rounded-2xl p-8 lg:p-10">
                <h2 className="text-xl font-semibold text-black mb-6">Invia una Richiesta</h2>

                {submitted ? (
                  <motion.div
                    role="status"
                    aria-live="polite"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-12 text-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-elektra-accent flex items-center justify-center text-white mb-4">
                      <CheckCircle2 size={32} />
                    </div>
                    <h3 className="text-lg font-semibold text-black">Richiesta Inviata!</h3>
                    <p className="text-sm text-gray-medium mt-2">Ti risponderemo al più presto all&apos;indirizzo indicato.</p>
                    <button
                      type="button"
                      onClick={handleNewRequest}
                      className="mt-6 text-sm font-medium text-black underline hover:no-underline"
                    >
                      Invia un&apos;altra richiesta
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Honeypot anti-bot: fuori schermo per gli umani, i bot lo compilano */}
                    <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
                      <label htmlFor="website">Non compilare questo campo</label>
                      <input
                        type="text"
                        id="website"
                        name="website"
                        value={formData.website}
                        onChange={handleChange}
                        tabIndex={-1}
                        autoComplete="off"
                        data-lpignore="true"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="nome" className="flex items-center gap-1.5 text-sm font-medium text-black mb-2">
                          <User size={14} className="text-gray-medium" />
                          Nome / Azienda *
                        </label>
                        <input
                          id="nome"
                          type="text"
                          name="nome"
                          required
                          maxLength={120}
                          autoComplete="name"
                          value={formData.nome}
                          onChange={handleChange}
                          className="w-full bg-white border border-black/10 rounded-lg px-4 py-3 text-sm text-black placeholder:text-gray-medium focus:outline-none focus:border-elektra-accent focus:ring-1 focus:ring-elektra-accent transition-all duration-300"
                          placeholder="Mario Rossi Srl"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="flex items-center gap-1.5 text-sm font-medium text-black mb-2">
                          <Mail size={14} className="text-gray-medium" />
                          Email *
                        </label>
                        <input
                          id="email"
                          type="email"
                          name="email"
                          required
                          maxLength={254}
                          autoComplete="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full bg-white border border-black/10 rounded-lg px-4 py-3 text-sm text-black placeholder:text-gray-medium focus:outline-none focus:border-elektra-accent focus:ring-1 focus:ring-elektra-accent transition-all duration-300"
                          placeholder="email@azienda.it"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="telefono" className="flex items-center gap-1.5 text-sm font-medium text-black mb-2">
                          <Phone size={14} className="text-gray-medium" />
                          Telefono
                        </label>
                        <input
                          id="telefono"
                          type="tel"
                          name="telefono"
                          maxLength={40}
                          autoComplete="tel"
                          value={formData.telefono}
                          onChange={handleChange}
                          className="w-full bg-white border border-black/10 rounded-lg px-4 py-3 text-sm text-black placeholder:text-gray-medium focus:outline-none focus:border-elektra-accent focus:ring-1 focus:ring-elektra-accent transition-all duration-300"
                          placeholder="+39 030 1234567"
                        />
                      </div>
                      <div>
                        <label htmlFor="area" className="flex items-center gap-1.5 text-sm font-medium text-black mb-2">
                          <FileText size={14} className="text-gray-medium" />
                          Area di Interesse
                        </label>
                        <select
                          id="area"
                          name="area"
                          value={formData.area}
                          onChange={handleChange}
                          className="w-full bg-white border border-black/10 rounded-lg px-4 py-3 text-sm text-black focus:outline-none focus:border-elektra-accent focus:ring-1 focus:ring-elektra-accent transition-all duration-300 appearance-none"
                        >
                          <option value="">Seleziona...</option>
                          <option value="prodotti">Prodotti e preventivi</option>
                          <option value="progettazione">Progettazione Schede</option>
                          <option value="pcb">Realizzazione Master PCB</option>
                          <option value="smt">Montaggio SMT</option>
                          <option value="quadristica">Quadristica</option>
                          <option value="plc">Programmazione PLC</option>
                          <option value="collaudo">Saldatura/Collaudo</option>
                          <option value="altro">Altro</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="messaggio" className="flex items-center gap-1.5 text-sm font-medium text-black mb-2">
                        <MessageSquare size={14} className="text-gray-medium" />
                        Messaggio *
                      </label>
                      <textarea
                        id="messaggio"
                        name="messaggio"
                        required
                        minLength={10}
                        maxLength={5000}
                        rows={5}
                        value={formData.messaggio}
                        onChange={handleChange}
                        className="w-full bg-white border border-black/10 rounded-lg px-4 py-3 text-sm text-black placeholder:text-gray-medium focus:outline-none focus:border-elektra-accent focus:ring-1 focus:ring-elektra-accent transition-all duration-300 resize-none"
                        placeholder="Descrivi la tua richiesta..."
                      />
                    </div>

                    {/* Privacy */}
                    <label htmlFor="privacy" className="flex items-start gap-3 cursor-pointer group">
                      <input
                        id="privacy"
                        ref={privacyRef}
                        name="privacy"
                        type="checkbox"
                        checked={formData.privacy}
                        onChange={handleChange}
                        aria-required="true"
                        aria-invalid={privacyError ? 'true' : undefined}
                        aria-describedby={privacyError ? 'privacy-error' : undefined}
                        className="peer sr-only"
                      />
                      <span
                        aria-hidden="true"
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors duration-300 peer-focus-visible:ring-2 peer-focus-visible:ring-black/40 peer-focus-visible:ring-offset-2 ${
                          formData.privacy
                            ? 'bg-elektra-accent border-elektra-accent'
                            : 'border-gray-medium/30 group-hover:border-gray-medium'
                        }`}
                      >
                        {formData.privacy && <CheckCircle2 size={14} className="text-white" />}
                      </span>
                      <span className="text-xs text-gray-medium leading-relaxed">
                        Dichiaro di aver letto e compreso la{' '}
                        <Link to="/privacy" className="text-black underline font-medium hover:text-elektra-accent">
                          Privacy Policy
                        </Link>{' '}
                        e acconsento a essere ricontattato in merito alla richiesta inoltrata. *
                      </span>
                    </label>

                    {privacyError && (
                      <p id="privacy-error" role="alert" className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
                        {privacyError}
                      </p>
                    )}

                    {sendError && (
                      <p role="alert" className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
                        {sendError}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={sending}
                      className={`w-full flex items-center justify-center gap-2 text-sm font-medium px-6 py-3.5 rounded-lg transition-all duration-300 ${
                        sending
                          ? 'bg-gray-light text-gray-medium cursor-wait'
                          : 'bg-elektra-accent text-white hover:bg-elektra-accent/90'
                      }`}
                    >
                      <Send size={16} />
                      {sending ? 'Invio in corso...' : 'Invia Richiesta'}
                    </button>

                    {/* Testo informativo art. 13 */}
                    <p className="text-[11px] text-gray-medium leading-relaxed pt-2">
                      Inviando questo modulo accetti di essere ricontattato via email o telefono per la gestione delle informazioni richieste. I dati non saranno ceduti a terzi né utilizzati per scopi promozionali. Leggi l&apos;informativa completa sulla nostra{' '}
                      <Link to="/privacy" className="text-black underline hover:text-elektra-accent font-medium">
                        Privacy Policy
                      </Link>.
                    </p>
                  </form>
                )}
              </div>
            </motion.div>

            {/* Info + Map */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: [0.075, 0.82, 0.165, 1] }}
              className="space-y-8"
            >
              {/* Contact Info Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white border border-black/5 rounded-2xl p-6 hover:border-black/15 hover:shadow-panel transition-all duration-500">
                  <div className="w-10 h-10 rounded-xl bg-elektra-accent flex items-center justify-center text-white mb-4">
                    <MapPin size={18} />
                  </div>
                  <h3 className="font-semibold text-sm text-black mb-1">Indirizzo</h3>
                  <p className="text-sm text-gray-medium leading-relaxed">
                    Via Artigiani, 19<br />
                    25014 Castenedolo (BS)<br />
                    Italia
                  </p>
                </div>

                <div className="bg-white border border-black/5 rounded-2xl p-6 hover:border-black/15 hover:shadow-panel transition-all duration-500">
                  <div className="w-10 h-10 rounded-xl bg-elektra-accent flex items-center justify-center text-white mb-4">
                    <Phone size={18} />
                  </div>
                  <h3 className="font-semibold text-sm text-black mb-1">Telefono</h3>
                  <a href="tel:+390302130630" className="text-sm text-gray-medium hover:text-black transition-colors duration-300">030 2130630</a>
                </div>

                <div className="bg-white border border-black/5 rounded-2xl p-6 hover:border-black/15 hover:shadow-panel transition-all duration-500">
                  <div className="w-10 h-10 rounded-xl bg-elektra-accent flex items-center justify-center text-white mb-4">
                    <Mail size={18} />
                  </div>
                  <h3 className="font-semibold text-sm text-black mb-1">Email Commerciale</h3>
                  <a href="mailto:afelektra2@afelektra.com" className="text-sm text-gray-medium hover:text-black transition-colors duration-300 break-all">afelektra2@afelektra.com</a>
                </div>

                <div className="bg-white border border-black/5 rounded-2xl p-6 hover:border-black/15 hover:shadow-panel transition-all duration-500">
                  <div className="w-10 h-10 rounded-xl bg-elektra-accent flex items-center justify-center text-white mb-4">
                    <Building2 size={18} />
                  </div>
                  <h3 className="font-semibold text-sm text-black mb-1">P.IVA / C.F.</h3>
                  <p className="text-sm text-gray-medium">03286600980</p>
                </div>

                <div className="bg-white border border-black/5 rounded-2xl p-6 hover:border-black/15 hover:shadow-panel transition-all duration-500">
                  <div className="w-10 h-10 rounded-xl bg-elektra-accent flex items-center justify-center text-white mb-4">
                    <Clock size={18} />
                  </div>
                  <h3 className="font-semibold text-sm text-black mb-1">Orari</h3>
                  <p className="text-sm text-gray-medium leading-relaxed">
                    Lun–Ven, su appuntamento<br />
                    <span className="text-xs">Chiamaci per fissare un incontro.</span>
                  </p>
                </div>
              </div>

              {/* Map Facade (No third-party load without user interaction) */}
              <div className="rounded-2xl overflow-hidden border border-black/5 h-[350px]">
                {mapLoaded ? (
                  <iframe
                    src="https://www.openstreetmap.org/export/embed.html?bbox=10.2705%2C45.4764%2C10.2867%2C45.4864&layer=mapnik&marker=45.4814%2C10.2786"
                    width="100%"
                    height="100%"
                    style={{ border: 0, filter: 'grayscale(1) contrast(1.1)' }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Mappa AF Elektra 2"
                  />
                ) : (
                  <div className="h-[350px] rounded-2xl border bg-gray-light flex flex-col items-center justify-center p-6 text-center">
                    <MapPin size={32} className="text-elektra-accent mb-3" />
                    <p className="font-semibold text-sm text-black mb-1">
                      Mappa di Castenedolo (BS) - Via Artigiani 19
                    </p>
                    <p className="text-xs text-gray-medium max-w-sm mb-4">
                      Per visualizzare la mappa interattiva della nostra sede, clicca sul pulsante qui sotto.
                    </p>
                    <button
                      type="button"
                      onClick={() => setMapLoaded(true)}
                      className="bg-black text-white hover:bg-black/80 text-xs font-semibold px-5 py-2.5 rounded-lg transition-colors duration-300"
                    >
                      Carica mappa interattiva
                    </button>
                    <p className="text-[11px] text-gray-medium/80 mt-3">
                      Caricando la mappa contatti OpenStreetMap (terza parte - OSM Foundation).
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
