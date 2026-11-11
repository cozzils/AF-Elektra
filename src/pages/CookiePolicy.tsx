import { Link } from 'react-router';
import Layout from '@/components/Layout';
import { usePageMeta } from '@/hooks/usePageMeta';
import { Cookie, ShieldAlert, CheckCircle2, ExternalLink } from 'lucide-react';

export default function CookiePolicy() {
  usePageMeta(
    'Cookie Policy | AF Elektra 2',
    'Informativa sull’uso dei cookie del sito AF Elektra 2: nessun cookie di profilazione, mappa OpenStreetMap caricata solo su azione dell’utente.',
    '/cookie-policy',
  );

  return (
    <Layout>
      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden pb-14 pt-32 lg:pb-20 lg:pt-40">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 top-10 h-[380px] w-[380px] rounded-full bg-elektra-accent/15 blur-[120px]"
        />
        <div className="relative mx-auto max-w-7xl px-5 lg:px-10">
          <p className="tech-label text-white/55">
            Informativa sull&apos;Uso dei Cookie
          </p>
          <h1 className="mt-5 font-display text-4xl font-medium tracking-tight text-white sm:text-5xl lg:text-6xl">
            Cookie Policy
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/55">
            Informativa redatta in conformità alle Linee Guida del Garante per la Protezione dei Dati Personali del 10 giugno 2021 e all&apos;art. 122 del Codice Privacy (D.Lgs. 196/2003 s.m.i.).
          </p>
        </div>
      </section>

      {/* ─── CONTENT ─── */}
      <section className="px-5 pb-20 lg:px-10 lg:pb-28">
        <div className="mx-auto max-w-7xl">
          <div className="space-y-10 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8 leading-relaxed text-white/70 lg:p-12">

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
              <div className="space-y-2 rounded-xl border border-emerald-500/25 bg-emerald-500/10 p-4 text-sm text-emerald-100/85">
                <div className="flex items-center gap-2 font-semibold text-emerald-300">
                  <CheckCircle2 size={18} className="text-emerald-400" />
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
              <div className="overflow-hidden rounded-xl border border-white/[0.12]">
                <table className="w-full border-collapse text-left text-sm">
                  <thead className="hidden sm:table-header-group">
                    <tr className="bg-white/[0.06] text-white">
                      <th className="border border-white/[0.1] p-3 font-semibold">Nome</th>
                      <th className="border border-white/[0.1] p-3 font-semibold">Tipologia / Fornitore</th>
                      <th className="border border-white/[0.1] p-3 font-semibold">Finalità</th>
                      <th className="border border-white/[0.1] p-3 font-semibold">Durata</th>
                    </tr>
                  </thead>
                  <tbody className="block sm:table-row-group">
                    <tr className="block sm:table-row">
                      <td
                        data-label="Nome"
                        className="block border-b border-white/[0.1] p-4 font-mono text-xs before:mb-1 before:block before:font-mono-tech before:text-[10px] before:uppercase before:tracking-[0.14em] before:text-neon/60 before:content-[attr(data-label)] sm:table-cell sm:border sm:p-3 sm:before:hidden"
                      >
                        —
                      </td>
                      <td
                        data-label="Tipologia / Fornitore"
                        className="block border-b border-white/[0.1] p-4 before:mb-1 before:block before:font-mono-tech before:text-[10px] before:uppercase before:tracking-[0.14em] before:text-neon/60 before:content-[attr(data-label)] sm:table-cell sm:border sm:p-3 sm:before:hidden"
                      >
                        Nessun cookie installato dal sito
                      </td>
                      <td
                        data-label="Finalità"
                        className="block border-b border-white/[0.1] p-4 before:mb-1 before:block before:font-mono-tech before:text-[10px] before:uppercase before:tracking-[0.14em] before:text-neon/60 before:content-[attr(data-label)] sm:table-cell sm:border sm:p-3 sm:before:hidden"
                      >
                        Il sito non utilizza cookie propri di prima parte, né <em>localStorage</em> o <em>sessionStorage</em> per finalità di tracciamento. L&apos;infrastruttura di hosting può registrare log tecnici di sicurezza, che non sono cookie.
                      </td>
                      <td
                        data-label="Durata"
                        className="block p-4 before:mb-1 before:block before:font-mono-tech before:text-[10px] before:uppercase before:tracking-[0.14em] before:text-neon/60 before:content-[attr(data-label)] sm:table-cell sm:border sm:p-3 sm:before:hidden"
                      >
                        —
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-white/55">
                Il sito non installa cookie propri di prima parte e non utilizza <em>localStorage</em> o <em>sessionStorage</em> per finalità di tracciamento.
              </p>
            </section>

            {/* 4. Servizi di terze parti e mappe interattive (OpenStreetMap) */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-black">4. Servizi di Terze Parti e Mappa Interattiva (OpenStreetMap)</h2>
              <p className="text-sm">
                Per visualizzare la sede aziendale nella pagina <Link to="/contatti" className="text-elektra-accent underline">Contatti</Link>, il sito mette a disposizione una mappa geografica fornita da <strong>OpenStreetMap Foundation (OSMF)</strong>.
              </p>
              <div className="space-y-2 rounded-xl border border-white/[0.07] bg-white/[0.04] p-4 text-sm">
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
              <p className="text-xs text-white/55">
                Nota: La disabilitazione completa dei cookie tecnici potrebbe compromettere alcune funzionalità basilari di navigazione dell&apos;interfaccia.
              </p>
            </section>

            {/* 6. Link a Privacy Policy e Aggiornamenti */}
            <section className="space-y-4 border-t border-white/[0.08] pt-4">
              <h2 className="text-xl font-bold text-black">6. Ulteriori Informazioni</h2>
              <p className="text-sm">
                Per informazioni complete sul Titolare del trattamento, sulle modalità di esercizio dei diritti dell&apos;interessato e sulle misure di protezione dei dati, si invita a consultare la nostra{' '}
                <Link to="/privacy" className="text-elektra-accent underline font-semibold">
                  Privacy Policy
                </Link>.
              </p>
              <div className="space-y-1 pt-2 text-xs text-white/55">
                <p><strong>Ultimo aggiornamento:</strong> Novembre 2026</p>
              </div>
            </section>

          </div>
        </div>
      </section>
    </Layout>
  );
}
