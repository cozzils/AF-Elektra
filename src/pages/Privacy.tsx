import Layout from '@/components/Layout';
import { ShieldCheck, Mail, Phone, MapPin, Building2 } from 'lucide-react';

export default function Privacy() {
  return (
    <Layout>
      {/* ─── HERO ─── */}
      <section className="bg-gray-light pt-32 pb-16 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-gray-medium mb-4">
            Informativa sul Trattamento dei Dati Personali
          </p>
          <h1 className="text-4xl lg:text-6xl font-semibold text-black tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-base text-gray-medium mt-4 max-w-2xl">
            Informativa resa ai sensi dell&apos;art. 13 del Regolamento UE 2016/679 (GDPR) e della normativa italiana vigente.
          </p>
        </div>
      </section>

      {/* ─── CONTENT ─── */}
      <section className="py-16 px-6 lg:px-10 bg-gray-light/40">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-sm border border-black/5 space-y-10 text-gray-dark leading-relaxed">

            {/* 1. Titolare del Trattamento */}
            <section className="space-y-4">
              <div className="flex items-center gap-2">
                <Building2 className="text-elektra-accent" size={24} />
                <h2 className="text-2xl font-bold text-black">1. Titolare del Trattamento</h2>
              </div>
              <p>
                Il Titolare del trattamento dei dati personali è <strong>AF Elektra 2</strong>, con sede legale e operativa in:
              </p>
              <div className="bg-gray-light p-6 rounded-xl space-y-2 text-sm">
                <p><strong>Ragione sociale:</strong> AF Elektra 2</p>
                <p className="flex items-center gap-2">
                  <MapPin size={16} className="text-gray-medium" />
                  <strong>Sede:</strong> Via Artigiani 19, 25014 Castenedolo (BS), Italia
                </p>
                <p><strong>Codice Fiscale e Partita IVA:</strong> 03286600980</p>
                <p className="flex items-center gap-2">
                  <Phone size={16} className="text-gray-medium" />
                  <strong>Telefono:</strong> 030 2130630
                </p>
                <p className="flex items-center gap-2">
                  <Mail size={16} className="text-gray-medium" />
                  <strong>Email:</strong> afelektra2@afelektra.com
                </p>
                <p><strong>PEC:</strong> monica.romano@pec.it</p>
              </div>
              <p>
                Per qualsiasi richiesta relativa all&apos;esercizio dei diritti previsti dal GDPR o per chiarimenti in merito al trattamento dei dati, l&apos;interessato può rivolgersi direttamente al Titolare inviando una comunicazione via email all&apos;indirizzo <strong>afelektra2@afelektra.com</strong>.
              </p>
            </section>

            {/* 2. Tipologia di Dati Trattati */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-black">2. Tipologia di Dati Trattati</h2>
              <div className="space-y-3">
                <div>
                  <h3 className="text-lg font-semibold text-black">A. Dati forniti volontariamente dall&apos;interessato</h3>
                  <p className="text-sm mt-1">
                    Attraverso il modulo di contatto o tramite invio spontaneo di posta elettronica ai recapiti indicati sul sito, vengono raccolti i seguenti dati identificativi e di contatto:
                  </p>
                  <ul className="list-disc list-inside text-sm mt-2 space-y-1 pl-2">
                    <li>Nome e/o ragione sociale dell&apos;azienda;</li>
                    <li>Indirizzo di posta elettronica aziendale o personale;</li>
                    <li>Numero di telefono (facoltativo);</li>
                    <li>Area di interesse tecnico/produttivo selezionata (facoltativa);</li>
                    <li>Eventuali ulteriori dati personali inseriti spontaneamente nel corpo del messaggio.</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-black">B. Dati tecnici di navigazione e log di sicurezza dell&apos;hosting</h3>
                  <p className="text-sm mt-1">
                    I sistemi informatici e le procedure software preposte al funzionamento di questo sito acquisiscono, nel corso del loro normale esercizio, alcuni dati di traffico la cui trasmissione è implicita nell&apos;uso dei protocolli di comunicazione di Internet.
                  </p>
                  <p className="text-sm mt-2">
                    Tra questi rientrano: indirizzi IP o nomi a dominio dei computer utilizzati dagli utenti, orario della richiesta, metodo utilizzato nel sottoporre la richiesta al server, codice numerico indicante lo stato della risposta e altri parametri relativi al sistema operativo e all&apos;ambiente informatico dell&apos;utente. Questi dati vengono registrati nei file di log dell&apos;infrastruttura di hosting fornita da Aruba S.p.A. per fini esclusivamente tecnici di sicurezza, prevenzione di attacchi o accessi abusivi e corretto funzionamento del servizio.
                  </p>
                </div>
              </div>
            </section>

            {/* 3. Finalità del Trattamento */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-black">3. Finalità del Trattamento</h2>
              <p>I dati personali sono trattati per le seguenti finalità:</p>
              <ul className="list-disc list-inside text-sm space-y-2 pl-2">
                <li>
                  <strong>Riscontro a richieste di contatto e preventivo:</strong> dare seguito alle richieste informative, tecniche o commerciali inoltrate dall&apos;interessato, organizzare eventuali incontri o sopralluoghi tecnici e formulare preventivi di fornitura/servizio.
                </li>
                <li>
                  <strong>Sicurezza informatica e tutela legale:</strong> monitorare il corretto funzionamento del server web, prevenire violazioni della sicurezza informatica o difendere un diritto del Titolare in sede giudiziaria.
                </li>
              </ul>
              <p className="text-sm italic">
                Non viene svolta alcuna attività di profilazione, invio di newsletter non richieste, remarketing o cessione dei dati per fini pubblicitari.
              </p>
            </section>

            {/* 4. Base Giuridica del Trattamento */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-black">4. Base Giuridica del Trattamento</h2>
              <p>
                Il trattamento dei dati per la gestione delle richieste inoltrate dall&apos;utente si fonda <strong>esclusivamente sull&apos;art. 6, par. 1, lett. b) del GDPR</strong>: <em>&ldquo;il trattamento è necessario all&apos;esecuzione di un contratto di cui l&apos;interessato è parte o all&apos;esecuzione di misure precontrattuali adottate su richiesta dello stesso&rdquo;</em>.
              </p>
              <p className="text-sm">
                La casella di spunta presente nel modulo di contatto ha valore di attestazione di presa visione della presente informativa e di conferma della richiesta di contatto. La casella non è mai pre-selezionata. Il conferimento dei dati contrassegnati con asterisco è facoltativo ma indispensabile per consentire ad AF Elektra 2 di formulare una risposta al messaggio.
              </p>
              <p className="text-sm">
                Per i log tecnici di hosting, la base giuridica è il legittimo interesse del Titolare e del provider alla sicurezza dei sistemi (art. 6, par. 1, lett. f) GDPR).
              </p>
            </section>

            {/* 5. Periodo di Conservazione dei Dati */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-black">5. Periodo di Conservazione dei Dati</h2>
              <p>
                I dati raccolti tramite il form di contatto o via posta elettronica saranno conservati per il tempo strettamente necessario a gestire ed evadere compiutamente la richiesta dell&apos;interessato, e comunque per un periodo non superiore a <strong>12 mesi</strong> dalla conclusione dello scambio, a meno che l&apos;interazione non si traduca in un rapporto contrattuale formale (nel qual caso i dati fiscali e contrattuali saranno conservati per i termini di legge, pari a 10 anni).
              </p>
              <p className="text-sm">
                I log tecnici di sicurezza registrati a livello server da Aruba S.p.A. vengono conservati secondo le tempistiche standard dell&apos;infrastruttura di hosting, di norma stimate in 6-12 mesi.
              </p>
            </section>

            {/* 6. Destinatari e Trasferimento dei Dati */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-black">6. Destinatari e Trasferimento verso Paesi Terzi</h2>
              <p>
                I dati personali potranno essere trattati da personale interno autorizzato di AF Elektra 2 vincolato alla riservatezza.
              </p>
              <p>
                I dati possono essere comunicati a soggetti esterni che operano in qualità di <strong>Responsabili del trattamento</strong> ai sensi dell&apos;art. 28 GDPR:
              </p>
              <ul className="list-disc list-inside text-sm space-y-1 pl-2">
                <li>
                  <strong>Aruba S.p.A.</strong> (con sede in Italia e datacenter situati nel territorio dell&apos;Unione Europea), fornitore dei servizi di web hosting, posta elettronica e infrastruttura server.
                </li>
              </ul>
              <p className="text-sm">
                <strong>Nessun trasferimento extra-UE:</strong> Nessun dato personale raccolto tramite il sito viene trasferito al di fuori dello Spazio Economico Europeo (SEE). I dati non vengono ceduti, venduti o diffusi a terzi per finalità proprie di questi ultimi.
              </p>
              <p className="text-sm">
                <strong>Servizi di terze parti opzionali (OpenStreetMap):</strong> Nel sito è presente una mappa interattiva fornita da OpenStreetMap Foundation (OSMF). Tale mappa non viene caricata all&apos;avvio della pagina (nessuna connessione automatica né cookie di terze parti), bensì è protetta da un meccanismo di &ldquo;click attivo&rdquo; (facade): l&apos;utente può scegliere autonomamente se caricare il riquadro interattivo, instaurando una connessione diretta con i server della fondazione OSM.
              </p>
            </section>

            {/* 7. Diritti dell'Interessato */}
            <section className="space-y-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="text-elektra-accent" size={24} />
                <h2 className="text-2xl font-bold text-black">7. Diritti dell&apos;Interessato (Artt. 15-22 GDPR)</h2>
              </div>
              <p>
                In conformità agli articoli da 15 a 22 del GDPR, l&apos;interessato ha il diritto di esercitare in qualsiasi momento i seguenti diritti:
              </p>
              <ul className="list-disc list-inside text-sm space-y-1.5 pl-2">
                <li><strong>Diritto di accesso:</strong> ottenere la conferma che sia o meno in corso un trattamento di dati personali e riceverne copia;</li>
                <li><strong>Diritto di rettifica:</strong> chiedere la correzione di dati inesatti o l&apos;integrazione di quelli incompleti;</li>
                <li><strong>Diritto alla cancellazione (&ldquo;diritto all&apos;oblio&rdquo;):</strong> richiedere la cancellazione dei dati quando non siano più necessari per le finalità per cui sono stati raccolti;</li>
                <li><strong>Diritto di limitazione:</strong> richiedere la limitazione del trattamento nelle ipotesi contemplate dall&apos;art. 18 GDPR;</li>
                <li><strong>Diritto alla portabilità:</strong> ricevere i dati forniti in formato strutturato, di uso comune e leggibile da dispositivo automatico;</li>
                <li><strong>Diritto di opposizione:</strong> opporsi in qualsiasi momento, per motivi connessi alla propria situazione particolare, al trattamento dei dati personali.</li>
              </ul>
              <p className="text-sm">
                Le richieste possono essere inviate senza formalità al Titolare all&apos;indirizzo email: <strong>afelektra2@afelektra.com</strong>. Il Titolare fornirà riscontro entro 30 giorni.
              </p>
              <p className="text-sm">
                L&apos;interessato ha inoltre il diritto di proporre reclamo all&apos;autorità di controllo competente ai sensi dell&apos;art. 77 GDPR, ossia al <strong>Garante per la Protezione dei Dati Personali</strong> (Piazza Venezia 11, 00187 Roma, sito web: <a href="https://www.garanteprivacy.it" target="_blank" rel="noopener noreferrer" className="text-elektra-accent hover:underline font-medium">www.garanteprivacy.it</a>).
              </p>
            </section>

            {/* 8. Responsabile della Protezione dei Dati */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-black">8. Responsabile della Protezione dei Dati (DPO)</h2>
              <p className="text-sm">
                Il Titolare non ha nominato un Responsabile della Protezione dei Dati (DPO / RPD), non rientrando nelle condizioni di obbligatorietà previste dall&apos;art. 37 del Regolamento UE 2016/679 (mancanza di trattamenti su larga scala di dati sensibili o monitoraggio sistematico degli utenti).
              </p>
            </section>

            {/* 9. Aggiornamento dell'Informativa */}
            <section className="pt-6 border-t border-black/10 text-xs text-gray-medium space-y-1">
              <p><strong>Ultimo aggiornamento:</strong> Ottobre 2026</p>
            </section>

          </div>
        </div>
      </section>
    </Layout>
  );
}
