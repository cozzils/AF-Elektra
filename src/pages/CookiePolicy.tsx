import { Link } from 'react-router';
import Layout from '@/components/Layout';
import { Cookie, ShieldAlert, CheckCircle2, ExternalLink, AlertCircle } from 'lucide-react';

export default function CookiePolicy() {
  return (
    <Layout>
      {/* ─── HERO ─── */}
      <section className="bg-gray-light pt-32 pb-16 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-gray-medium mb-4">
            Informativa sull&apos;Uso dei Cookie
          </p>
          <h1 className="text-4xl lg:text-6xl font-semibold text-black tracking-tight">
            Cookie Policy
          </h1>
          <p className="text-base text-gray-medium mt-4 max-w-2xl">
            Informativa redatta in conformità alle Linee Guida del Garante per la Protezione dei Dati Personali del 10 giugno 2021 e all&apos;art. 122 del Codice Privacy (D.Lgs. 196/2003 s.m.i.).
          </p>
        </div>
      </section>

      {/* ─── CONTENT ─── */}
      <section className="py-16 px-6 lg:px-10 bg-gray-light/40">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-sm border border-black/5 space-y-10 text-gray-dark leading-relaxed">

            {/* Nota validazione legale */}
            <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-sm">
              <AlertCircle size={20} className="flex-shrink-0 mt-0.5 text-amber-700" />
              <div>
                <p className="font-medium">Avvertenza di trasparenza:</p>
                <p className="text-amber-800 text-xs mt-1">
                  Questo sito adotta una configurazione &ldquo;Privacy by Design&rdquo; esente da obbligo di cookie banner preventivo poiché non impiega alcun cookie di profilazione, marketing o analytics di terze parti. Testo da far validare al legale del Titolare.
                </p>
              </div>
            </div>

            {/* 1. Cosa sono i cookie */}
            <section className="space-y-4">
              <div className="flex items-center gap-2">
                <Cookie className="text-elektra-accent" size={24} />
                <h2 className="text-2xl font-bold text-black">1. Cosa sono i Cookie</h2>
              </div>
              <p>
                I cookie sono piccoli file di testo che i siti web visitati inviano al terminale dell&apos;utente (computer, tablet, smartphone), dove vengono memorizzati per essere poi ritrasmessi agli stessi siti alla successiva visita del medesimo utente.
              </p>
              <p>
                La normativa distingue tra:
              </p>
              <ul className="list-disc list-inside text-sm space-y-1.5 pl-2">
                <li>
                  <strong>Cookie tecnici:</strong> utilizzati al solo fine di effettuare la trasmissione di una comunicazione su una rete di comunicazione elettronica o nella misura strettamente necessaria al fornitore di un servizio telematico esplicitamente richiesto dall&apos;utente. Per questi cookie <em>non è richiesto il preventivo consenso dell&apos;utente</em> (Linee Guida Garante Privacy 10 giugno 2021).
                </li>
                <li>
                  <strong>Cookie di profilazione / marketing / tracciamento:</strong> impiegati per ricondurre a soggetti determinati, identificati o identificabili, specifiche azioni o schemi comportamentali ricorrenti, al fine di inviare messaggi pubblicitari mirati. Per tali cookie è obbligatorio il consenso preventivo tramite banner.
                </li>
              </ul>
            </section>

            {/* 2. Tipologie di cookie utilizzate dal nostro sito */}
            <section className="space-y-4">
              <div className="flex items-center gap-2">
                <ShieldAlert className="text-elektra-accent" size={24} />
                <h2 className="text-2xl font-bold text-black">2. Cookie Utilizzati da questo Sito</h2>
              </div>
              <p>
                Il sito web di <strong>AF Elektra 2</strong> adotta una politica rigorosa di minimizzazione:
              </p>
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-950 text-sm space-y-2">
                <div className="flex items-center gap-2 font-semibold text-emerald-800">
                  <CheckCircle2 size={18} className="text-emerald-600" />
                  Assenza di cookie di profilazione o tracciamento pubblicitario
                </div>
                <p>
                  Sul presente sito <strong>NON</strong> sono installati strumenti di Google Analytics (GA4), Meta/Facebook Pixel, tag manager di profilazione o circuiti di tracciamento commerciale.
                </p>
                <p>
                  In conformità alle Linee Guida del Garante Privacy del 10/06/2021, per la navigazione su questo sito <strong>non è richiesta la comparsa di un banner di consenso</strong>, essendo utilizzati unicamente strumenti tecnici indispensabili all&apos;erogazione del servizio.
                </p>
              </div>
            </section>

            {/* 3. Elenco dei cookie tecnici */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-black">3. Elenco degli Strumenti Tecnici Utilizzati</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm border-collapse border border-black/10 rounded-xl overflow-hidden">
                  <thead>
                    <tr className="bg-gray-light text-black">
                      <th className="p-3 border border-black/10 font-semibold">Nome</th>
                      <th className="p-3 border border-black/10 font-semibold">Tipologia / Fornitore</th>
                      <th className="p-3 border border-black/10 font-semibold">Finalità</th>
                      <th className="p-3 border border-black/10 font-semibold">Durata</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-3 border border-black/10 font-mono text-xs">sidebar_state</td>
                      <td className="p-3 border border-black/10">Tecnico funzionale (Prima Parte)</td>
                      <td className="p-3 border border-black/10">
                        Memorizza lo stato di apertura o chiusura dei menu laterali e dell&apos;interfaccia utente (componente UI).
                      </td>
                      <td className="p-3 border border-black/10">7 giorni</td>
                    </tr>
                    <tr className="bg-gray-50/50">
                      <td className="p-3 border border-black/10 font-mono text-xs">next-themes / theme</td>
                      <td className="p-3 border border-black/10">Archiviazione locale (localStorage)</td>
                      <td className="p-3 border border-black/10">
                        Memorizza la preferenza visuale dell&apos;utente (tema chiaro/sistema) direttamente nel browser.
                      </td>
                      <td className="p-3 border border-black/10">Persistente fino a pulizia browser</td>
                    </tr>
                    <tr>
                      <td className="p-3 border border-black/10 font-mono text-xs">Cookie tecnici di hosting Aruba</td>
                      <td className="p-3 border border-black/10">Tecnico di sistema (Aruba S.p.A.)</td>
                      <td className="p-3 border border-black/10">
                        Gestione del bilanciamento di carico, sicurezza dell&apos;infrastruttura di rete e routing delle richieste HTTP/HTTPS.
                      </td>
                      <td className="p-3 border border-black/10">Sessione</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* 4. Servizi di terze parti e mappe interattive (OpenStreetMap) */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-black">4. Servizi di Terze Parti e Mappa Interattiva (OpenStreetMap)</h2>
              <p className="text-sm">
                Per visualizzare la sede aziendale nella pagina <Link to="/contatti" className="text-elektra-accent underline">Contatti</Link>, il sito mette a disposizione una mappa geografica fornita da <strong>OpenStreetMap Foundation (OSMF)</strong>.
              </p>
              <div className="p-4 bg-gray-light rounded-xl space-y-2 text-sm">
                <p className="font-semibold text-black">Meccanismo di protezione preventiva (Facade):</p>
                <p>
                  Per proteggere la tua privacy, la mappa <strong>non viene caricata automaticamente all&apos;apertura della pagina</strong>. Non viene stabilita alcuna connessione preventiva verso i server di OpenStreetMap né vengono trasmessi cookie di terze parti finché l&apos;utente non clicca espressamente sul pulsante <em>&ldquo;Carica mappa interattiva&rdquo;</em>.
                </p>
                <p>
                  Solo a seguito di tale azione volontaria viene caricato l&apos;elemento interattivo. Per maggiori dettagli sul trattamento dei dati operato da OpenStreetMap Foundation, puoi consultare l&apos;informativa di terze parti:
                </p>
                <a
                  href="https://wiki.osmfoundation.org/wiki/Privacy_Policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-elektra-accent font-semibold hover:underline"
                >
                  Informativa Privacy OpenStreetMap Foundation (OSMF) <ExternalLink size={12} />
                </a>
              </div>
            </section>

            {/* 5. Come gestire e disabilitare i cookie */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-black">5. Come Gestire o Disabilitare i Cookie dal Browser</h2>
              <p className="text-sm">
                L&apos;utente può gestire, disabilitare o cancellare i cookie in qualsiasi momento modificando le impostazioni del proprio browser. Di seguito i collegamenti alle guide ufficiali dei principali browser:
              </p>
              <ul className="list-disc list-inside text-sm space-y-1.5 pl-2">
                <li>
                  <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-elektra-accent hover:underline">Google Chrome</a>
                </li>
                <li>
                  <a href="https://support.mozilla.org/it/kb/protezione-antitracciamento-avanzata-firefox-desktop" target="_blank" rel="noopener noreferrer" className="text-elektra-accent hover:underline">Mozilla Firefox</a>
                </li>
                <li>
                  <a href="https://support.apple.com/it-it/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-elektra-accent hover:underline">Apple Safari</a>
                </li>
                <li>
                  <a href="https://support.microsoft.com/it-it/windows/gestire-i-cookie-in-microsoft-edge-eliminare-o-consentire-i-cookie-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-elektra-accent hover:underline">Microsoft Edge</a>
                </li>
              </ul>
              <p className="text-xs text-gray-medium">
                Nota: La disabilitazione completa dei cookie tecnici potrebbe compromettere alcune funzionalità basilari di navigazione dell&apos;interfaccia.
              </p>
            </section>

            {/* 6. Link a Privacy Policy e Aggiornamenti */}
            <section className="space-y-4 pt-4 border-t border-black/10">
              <h2 className="text-xl font-bold text-black">6. Ulteriori Informazioni</h2>
              <p className="text-sm">
                Per informazioni complete sul Titolare del trattamento, sulle modalità di esercizio dei diritti dell&apos;interessato e sulle misure di protezione dei dati, si invita a consultare la nostra{' '}
                <Link to="/privacy" className="text-elektra-accent underline font-semibold">
                  Privacy Policy
                </Link>.
              </p>
              <div className="text-xs text-gray-medium space-y-1 pt-2">
                <p><strong>Ultimo aggiornamento:</strong> Ottobre 2026</p>
                <p>Testo da far validare al legale o consulente privacy del Titolare prima della messa in produzione definitiva.</p>
              </div>
            </section>

          </div>
        </div>
      </section>
    </Layout>
  );
}
