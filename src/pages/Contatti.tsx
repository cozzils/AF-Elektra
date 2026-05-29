import { useState } from 'react';
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
  Briefcase,
  MessageSquare,
} from 'lucide-react';
import Layout from '@/components/Layout';

export default function Contatti() {
  const [formData, setFormData] = useState({
    nome: '',
    azienda: '',
    email: '',
    telefono: '',
    area: '',
    messaggio: '',
    privacy: false,
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.privacy) return;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
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
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-12 text-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-elektra-accent flex items-center justify-center text-black mb-4">
                      <CheckCircle2 size={32} />
                    </div>
                    <h3 className="text-lg font-semibold text-black">Richiesta Inviata!</h3>
                    <p className="text-sm text-gray-medium mt-2">Ti risponderemo al piu presto.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="flex items-center gap-1.5 text-sm font-medium text-black mb-2">
                          <User size={14} className="text-gray-medium" />
                          Nome / Azienda *
                        </label>
                        <input
                          type="text"
                          name="nome"
                          required
                          value={formData.nome}
                          onChange={handleChange}
                          className="w-full bg-white border border-black/10 rounded-lg px-4 py-3 text-sm text-black placeholder:text-gray-medium focus:outline-none focus:border-elektra-accent focus:ring-1 focus:ring-elektra-accent transition-all duration-300"
                          placeholder="Mario Rossi Srl"
                        />
                      </div>
                      <div>
                        <label className="flex items-center gap-1.5 text-sm font-medium text-black mb-2">
                          <Briefcase size={14} className="text-gray-medium" />
                          Email *
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full bg-white border border-black/10 rounded-lg px-4 py-3 text-sm text-black placeholder:text-gray-medium focus:outline-none focus:border-elektra-accent focus:ring-1 focus:ring-elektra-accent transition-all duration-300"
                          placeholder="email@azienda.it"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="flex items-center gap-1.5 text-sm font-medium text-black mb-2">
                          <Phone size={14} className="text-gray-medium" />
                          Telefono
                        </label>
                        <input
                          type="tel"
                          name="telefono"
                          value={formData.telefono}
                          onChange={handleChange}
                          className="w-full bg-white border border-black/10 rounded-lg px-4 py-3 text-sm text-black placeholder:text-gray-medium focus:outline-none focus:border-elektra-accent focus:ring-1 focus:ring-elektra-accent transition-all duration-300"
                          placeholder="+39 030 1234567"
                        />
                      </div>
                      <div>
                        <label className="flex items-center gap-1.5 text-sm font-medium text-black mb-2">
                          <FileText size={14} className="text-gray-medium" />
                          Area di Interesse
                        </label>
                        <select
                          name="area"
                          value={formData.area}
                          onChange={handleChange}
                          className="w-full bg-white border border-black/10 rounded-lg px-4 py-3 text-sm text-black focus:outline-none focus:border-elektra-accent focus:ring-1 focus:ring-elektra-accent transition-all duration-300 appearance-none"
                        >
                          <option value="">Seleziona...</option>
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
                      <label className="flex items-center gap-1.5 text-sm font-medium text-black mb-2">
                        <MessageSquare size={14} className="text-gray-medium" />
                        Messaggio *
                      </label>
                      <textarea
                        name="messaggio"
                        required
                        rows={5}
                        value={formData.messaggio}
                        onChange={handleChange}
                        className="w-full bg-white border border-black/10 rounded-lg px-4 py-3 text-sm text-black placeholder:text-gray-medium focus:outline-none focus:border-elektra-accent focus:ring-1 focus:ring-elektra-accent transition-all duration-300 resize-none"
                        placeholder="Descrivi la tua richiesta..."
                      />
                    </div>

                    {/* Privacy */}
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <div
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors duration-300 ${
                          formData.privacy
                            ? 'bg-elektra-accent border-elektra-accent'
                            : 'border-gray-medium/30 group-hover:border-gray-medium'
                        }`}
                        onClick={() => setFormData((p) => ({ ...p, privacy: !p.privacy }))}
                      >
                        {formData.privacy && <CheckCircle2 size={14} className="text-black" />}
                      </div>
                      <span className="text-xs text-gray-medium leading-relaxed">
                        Dichiaro di aver letto e accettato la Privacy Policy e acconsento al trattamento dei dati personali per le finalita indicate. *
                      </span>
                    </label>

                    <button
                      type="submit"
                      disabled={!formData.privacy}
                      className={`w-full flex items-center justify-center gap-2 text-sm font-medium px-6 py-3.5 rounded-lg transition-all duration-300 ${
                        formData.privacy
                          ? 'bg-gray-dark text-white hover:bg-black'
                          : 'bg-gray-light text-gray-medium cursor-not-allowed'
                      }`}
                    >
                      <Send size={16} />
                      Invia Richiesta
                    </button>
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
                  <div className="w-10 h-10 rounded-xl bg-elektra-accent flex items-center justify-center text-black mb-4">
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
                  <div className="w-10 h-10 rounded-xl bg-elektra-accent flex items-center justify-center text-black mb-4">
                    <Phone size={18} />
                  </div>
                  <h3 className="font-semibold text-sm text-black mb-1">Telefono</h3>
                  <p className="text-sm text-gray-medium">030 2130630</p>
                </div>

                <div className="bg-white border border-black/5 rounded-2xl p-6 hover:border-black/15 hover:shadow-panel transition-all duration-500">
                  <div className="w-10 h-10 rounded-xl bg-elektra-accent flex items-center justify-center text-black mb-4">
                    <Mail size={18} />
                  </div>
                  <h3 className="font-semibold text-sm text-black mb-1">Email Commerciale</h3>
                  <p className="text-sm text-gray-medium">afelektra2@afelektra.com</p>
                </div>

                <div className="bg-white border border-black/5 rounded-2xl p-6 hover:border-black/15 hover:shadow-panel transition-all duration-500">
                  <div className="w-10 h-10 rounded-xl bg-elektra-accent flex items-center justify-center text-black mb-4">
                    <Building2 size={18} />
                  </div>
                  <h3 className="font-semibold text-sm text-black mb-1">P.IVA / C.F.</h3>
                  <p className="text-sm text-gray-medium">03286600980</p>
                </div>
              </div>

              {/* Map */}
              <div className="rounded-2xl overflow-hidden border border-black/5 h-[350px]">
                <iframe
                  src="https://www.openstreetmap.org/export/embed.html?bbox=10.265%2C45.475%2C10.315%2C45.505&layer=mapnik&marker=45.49%2C10.29"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'grayscale(1) contrast(1.1)' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Mappa AF Elektra 2"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
