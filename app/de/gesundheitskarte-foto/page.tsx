import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

/* ─── Metadata ─── */
export const metadata: Metadata = {
  title: "Foto für Gesundheitskarte (eGK) Online Erstellen | PixPassVisa",
  description:
    "Foto für die elektronische Gesundheitskarte (eGK) online erstellen. 35×45 mm, frontal, für TK, AOK, Barmer, DAK & alle gesetzlichen Krankenkassen. Direkt hochladen – fertig in 30 Sekunden.",
  keywords: [
    "gesundheitskarte foto",
    "egk foto",
    "krankenkasse foto",
    "aok foto hochladen",
    "foto für krankenkassenkarte selber machen",
    "wie muss das foto für die gesundheitskarte aussehen",
    "selbstgemachte passbilder gesundheitskarte",
    "wie alt darf das foto für die krankenkasse sein",
  ],
  alternates: {
    canonical: "https://www.pixpassvisa.com/de/gesundheitskarte-foto",
    languages: {
      de: "https://www.pixpassvisa.com/de/gesundheitskarte-foto",
      "x-default": "https://www.pixpassvisa.com/de/gesundheitskarte-foto",
    },
  },
  openGraph: {
    title: "Foto für Gesundheitskarte (eGK) Online Erstellen | PixPassVisa",
    description:
      "Foto für die elektronische Gesundheitskarte (eGK) online erstellen. 35×45 mm, frontal, für TK, AOK, Barmer, DAK & alle gesetzlichen Krankenkassen.",
    url: "https://www.pixpassvisa.com/de/gesundheitskarte-foto",
    siteName: "PixPassVisa",
    locale: "de_DE",
    type: "website",
    images: [
      {
        url: "https://www.pixpassvisa.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Foto für Gesundheitskarte Online Erstellen - PixPassVisa",
      },
    ],
  },
};

/* ─── Constants ─── */
const ctaHref = "/de/passbild-online?type=germany-health-insurance";

/* ─── Icons ─── */
const ArrowRight = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);
const Check = ({ cls = "w-3.5 h-3.5 text-blue-600" }: { cls?: string }) => (
  <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);
const Cross = () => (
  <svg className="w-3.5 h-3.5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

/* ─── Data ─── */
const steps = [
  {
    n: "1",
    title: "Foto mit dem Smartphone aufnehmen",
    desc: "Stellen Sie sich vor eine helle Wand. Nutzen Sie Tageslicht aus einem Fenster. Halten Sie das Smartphone auf Augenhöhe und schauen Sie frontal in die Kamera.",
  },
  {
    n: "2",
    title: "Automatisch auf 35 × 45 mm zuschneiden",
    desc: "Unsere KI prüft Kopfposition, Hintergrund und Belichtung. Das Bild wird exakt auf das eGK-Format zugeschnitten und optimiert.",
  },
  {
    n: "3",
    title: "Download & direkt bei der Kasse einreichen",
    desc: "Laden Sie das fertige JPEG herunter und übermitteln Sie es über das Online-Portal Ihrer Krankenkasse – binnen Sekunden.",
  },
];

const specs = [
  {
    krit: "Format",
    vorschrift: "35 × 45 mm",
    hinweis: "Hochformat ohne Rand – entspricht dem gängigen Passfoto-Standard (AOK)",
  },
  {
    krit: "Kopfgröße",
    vorschrift: "70–80 % der Bildfläche",
    hinweis: "Kopf mittig, vollständig sichtbar von Scheitel bis Kinn",
  },
  {
    krit: "Blickrichtung",
    vorschrift: "Frontal, gerade",
    hinweis: "Direkt in die Kamera, keine Drehung oder Neigung",
  },
  {
    krit: "Hintergrund",
    vorschrift: "Neutral, hell",
    hinweis: "Kein Muster, keine Schatten, klarer Kontrast zur Kleidung",
  },
  {
    krit: "Augen",
    vorschrift: "Geöffnet, sichtbar",
    hinweis: "Auch bei Brillenträgern müssen die Augen klar erkennbar sein",
  },
  {
    krit: "Dateiformat",
    vorschrift: "JPEG oder PNG",
    hinweis: "Max. 5 MB beim digitalen Upload (VIACTIV); JPEG wird von allen Kassen akzeptiert",
  },
  {
    krit: "Kopfbedeckung",
    vorschrift: "Grundsätzlich verboten",
    hinweis: "Ausnahme: religiöse Gründe – Gesicht muss vollständig sichtbar bleiben",
  },
  {
    krit: "Alter des Fotos",
    vorschrift: "Max. 6 Monate",
    hinweis: "Wichtig: Sie müssen gut wiedererkennbar sein (AOK)",
  },
];

const kassen = [
  { name: "AOK", portal: "Meine AOK", pfad: "Gesundheitskarte → Foto hochladen" },
  { name: "Techniker Krankenkasse (TK)", portal: "Meine TK", pfad: "Versichertenkarte → Foto hinzufügen" },
  { name: "Barmer", portal: "Barmer-App / Online-Portal", pfad: "Meine Gesundheitskarte → Foto einreichen" },
  { name: "DAK-Gesundheit", portal: "Mein DAK", pfad: "eGK → Bild hochladen" },
  { name: "IKK / BKK / KKH / hkk", portal: "Jeweiliges Online-Portal", pfad: "Versichertenbereich → Gesundheitskarte" },
  { name: "Alle anderen GKV", portal: "Versichertenportal", pfad: "Benachrichtigungsschreiben beachten" },
];

const doList = [
  "Frontale Aufnahme, Kopf gerade und mittig positionieren",
  "Neutraler Gesichtsausdruck mit geschlossenem Mund",
  "Heller, einfarbiger Hintergrund ohne Muster oder Objekte",
  "Augen geöffnet und für den Betrachter klar erkennbar",
  "Gleichmäßige Beleuchtung ohne harte Schatten oder Gegenlicht",
  "Aktuelles Foto, das Ihr heutiges Erscheinungsbild zeigt",
];

const dontList = [
  "Sonnenbrillen oder stark getönte Brillengläser tragen",
  "Mützen, Caps oder Hüte aufsetzen (außer religiöse Kopfbedeckungen)",
  "Starke Schatten im Gesicht oder auf dem Hintergrund erzeugen",
  "Filter, Weichzeichner oder Bildbearbeitungseffekte anwenden",
  "Gemusterte Hintergründe oder andere Personen im Bild zeigen",
  "Veraltete Aufnahmen verwenden, die Ihr Aussehen nicht mehr widerspiegeln",
];

const faqs = [
  {
    q: "Wie muss das Foto für die Gesundheitskarte aussehen?",
    a: "Das Foto für die elektronische Gesundheitskarte entspricht dem gängigen Passbild-Format: 35 × 45 mm, Frontalaufnahme, Kopf füllt 70 bis 80 Prozent der Bildfläche. Der Hintergrund ist neutral und hell. Sie schauen direkt in die Kamera, Ihre Augen sind geöffnet und klar erkennbar. Streng biometrische Vorgaben wie beim Reisepass sind nicht erforderlich.",
  },
  {
    q: "Kann man ein Foto für die Krankenkassenkarte selber machen?",
    a: "Ja, Sie können das Foto selbst erstellen. Ein Smartphone oder eine Digitalkamera reicht vollkommen aus. Nehmen Sie das Bild bei Tageslicht vor einer hellen Wand auf. Halten Sie die Kamera auf Augenhöhe und schauen Sie frontal hinein. Mit einem Online-Tool schneiden Sie das Bild anschließend automatisch auf das korrekte Format zu.",
  },
  {
    q: "Werden selbstgemachte Passbilder von der Krankenkasse angenommen?",
    a: "Ja, selbstgemachte Passbilder werden angenommen, sofern sie die offiziellen Vorgaben erfüllen. AOK, TK, Barmer, DAK und alle anderen gesetzlichen Kassen akzeptieren selbst aufgenommene Fotos, wenn diese scharf, gut belichtet und frei von Filtern oder Effekten sind. Entscheidend ist die Einhaltung der Qualitätskriterien, nicht der Ort der Aufnahme.",
  },
  {
    q: "Wie alt darf das Foto für die Krankenkasse sein?",
    a: "Das Foto sollte idealerweise nicht älter als sechs Monate sein. Wichtig ist, dass Sie gut wiederzuerkennen sind. Die Krankenkassen dürfen das Lichtbild maximal zehn Jahre speichern. Danach erhalten Sie automatisch Post mit der Aufforderung, ein neues Bild einzureichen.",
  },
  {
    q: "Ist das Foto für die Gesundheitskarte Pflicht?",
    a: "Ja. Laut § 291 SGB V ist die elektronische Gesundheitskarte mit einem Lichtbild auszustatten. Das Foto dient der Identifizierung beim Arztbesuch und verhindert Kartenmissbrauch. Ab dem 15. Geburtstag ist ein Foto verpflichtend. Kinder unter 15 Jahren sowie pflegebedürftige Personen, die nicht an einer Aufnahme teilnehmen können, benötigen kein Bild.",
  },
  {
    q: "Wie reiche ich das Foto bei meiner Krankenkasse ein?",
    a: "Die meisten gesetzlichen Krankenkassen bieten einen digitalen Upload im Online-Portal oder per App an. Sie erhalten von Ihrer Kasse ein Schreiben mit einer Auftragsnummer, sobald ein neues Foto benötigt wird. Alternativ können Sie das Bild auch per Post einsenden. Papierabzüge werden nach der Digitalisierung datenschutzkonform vernichtet.",
  },
  {
    q: "Welches Dateiformat akzeptieren die Krankenkassen?",
    a: "Die meisten Kassen akzeptieren JPEG- und PNG-Dateien. VIACTIV gibt eine maximale Dateigröße von 5 MB vor. PixPassVisa liefert das fertige Foto in einem universell kompatiblen JPEG-Format – direkt bereit für den Upload in alle gängigen GKV-Portale.",
  },
  {
    q: "Kostet die neue Gesundheitskarte etwas?",
    a: "Nein, die Herstellung der Karte ist für Versicherte kostenlos. Die Kosten für die Fotoaufnahme selbst tragen Sie als Versicherter. PixPassVisa bietet eine günstige digitale Alternative zum Fotostudio, bei der Sie das Bild bequem von zu Hause aus erstellen.",
  },
];

/* ─── JSON-LD structured data ─── */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Startseite",
          item: "https://www.pixpassvisa.com/de",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Gesundheitskarte Foto",
          item: "https://www.pixpassvisa.com/de/gesundheitskarte-foto",
        },
      ],
    },
    {
      "@type": "Service",
      name: "Foto für Gesundheitskarte (eGK) Online Erstellen",
      provider: {
        "@type": "Organization",
        name: "PixPassVisa",
        url: "https://www.pixpassvisa.com/de",
      },
      areaServed: "DE",
      serviceType: "Health Insurance Card Photo Generator",
    },
  ],
};

/* ─── Page ─── */
export default function GesundheitskarteFotoPage() {
  return (
    <main className="bg-white text-slate-900 antialiased">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ══════════════ HERO 60/40 SPLIT ══════════════ */}
        <div className="h-1 bg-blue-700 w-full" />

      <section className=" pt-16 pb-20 px-4">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-5 gap-10 items-center">
          {/* Left: 60% */}
          <div className="lg:col-span-3 flex flex-col gap-5">
            <span className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full w-fit">
              Für TK · AOK · Barmer · DAK · alle GKV
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-black tracking-tight leading-[1.07] text-slate-900">
              Foto für{" "}
              <span className="text-blue-600">Gesundheitskarte</span>{" "}
              online erstellen
            </h1>

            <p className="max-w-xl text-lg text-slate-600 leading-relaxed">
              Erstellen Sie Ihr Foto für die <strong>elektronische Gesundheitskarte (eGK)</strong> direkt
              am Smartphone. Automatische Anpassung auf 35 × 45 mm, neutraler Hintergrund und
              korrekte Kopfposition – in unter 30 Sekunden, ohne Fotostudio.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mt-1">
              <Link
                href={ctaHref}
                className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-lg px-7 py-3  shadow-blue-500/20 transition-colors"
              >
                Foto für eGK erstellen <ArrowRight />
              </Link>
              <Link
                href="#anforderungen"
                className="inline-flex items-center gap-2 border border-slate-200 hover:border-slate-300 text-slate-700 font-semibold text-base px-6 py-4  bg-white transition-colors"
              >
                Alle Anforderungen ansehen
              </Link>
            </div>
          </div>

          {/* Right: 40% */}
          <div className="lg:col-span-2">
            <div className=" overflow-hidden">
              <Image
                src="https://res.cloudinary.com/dipzpwbbk/image/upload/v1779008016/c24d89b1-ab0e-4f1d-9035-5814bc7b91ca_preview_ip9ogs.jpg"
                alt="Foto für die elektronische Gesundheitskarte online erstellen – 35x45mm, für alle gesetzlichen Krankenkassen"
                width={480}
                height={640}
                priority
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ WIE MUSS DAS FOTO AUSSEHEN? ══════════════ */}
      <section id="anforderungen" className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <p className="text-blue-600 font-bold text-xs uppercase tracking-widest mb-2">Offizielle Vorgaben</p>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 mb-4">
            Wie muss das Foto für die Gesundheitskarte aussehen?
          </h2>
          <p className="text-slate-600 leading-relaxed text-lg mb-4">
            Das Foto für die <strong>elektronische Gesundheitskarte (eGK)</strong> folgt dem gängigen Passbild-Standard. Die Krankenkasse benötigt ein Frontalbild im Format <strong>35 × 45 mm</strong>. Ihr Kopf füllt 70 bis 80 Prozent der Bildfläche aus. Sie schauen direkt in die Kamera, der Kopf sitzt mittig und ist nicht geneigt.
          </p>
          <p className="text-slate-600 leading-relaxed text-lg mb-4">
            Der Hintergrund bleibt neutral und hell. Ein weißer oder hellgrauer Hintergrund ohne Muster, Schatten oder störende Elemente ist ideal. Ihre Augen sind geöffnet und klar erkennbar – auch als Brillenträger. Ein neutraler Gesichtsausdruck mit geschlossenem Mund ist ausreichend. Streng biometrische Vorgaben wie beim Reisepass verlangt die Krankenkasse nicht.
          </p>
          <p className="text-slate-600 leading-relaxed text-lg">
            Kopfbedeckungen sind grundsätzlich untersagt. Ausnahmen gelten aus religiösen Gründen, sofern das Gesicht vollständig sichtbar bleibt. Die Kassen akzeptieren digitale Uploads meist als JPEG oder PNG mit maximal 5 MB Dateigröße. Die Kosten für die Bildaufnahme tragen Sie selbst – die Herstellung der Karte ist kostenlos.
          </p>
        </div>
      </section>

      {/* ══════════════ SELBER MACHEN ══════════════ */}
      <section className="py-20 px-4 bg-slate-50 border-y border-slate-100">
        <div className="max-w-4xl mx-auto">
          <p className="text-blue-600 font-bold text-xs uppercase tracking-widest mb-2">Ohne Fotostudio</p>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 mb-4">
            Kann man ein Foto für die Krankenkassenkarte selber machen?
          </h2>
          <p className="text-slate-600 leading-relaxed text-lg mb-4">
            Ja, Sie können das Foto für Ihre Krankenkassenkarte selbst erstellen. Ein Smartphone oder eine Digitalkamera reicht vollkommen aus. Sie benötigen kein teures Fotostudio und keinen Termin. Die Aufnahme gelingt am besten bei Tageslicht vor einem neutralen Hintergrund.
          </p>
          <p className="text-slate-600 leading-relaxed text-lg mb-4">
            Stellen Sie sich vor eine helle Wand oder hängen ein einfarbiges Tuch auf. Tageslicht aus einem Fenster sorgt für eine gleichmäßige Ausleuchtung ohne harte Schatten. Halten Sie die Kamera auf Augenhöhe und schauen Sie frontal hinein. Beide Wangen müssen gleichermaßen sichtbar sein. Vermeiden Sie Gegenlicht und starke Schatten im Gesicht.
          </p>
          <p className="text-slate-600 leading-relaxed text-lg">
            Mit einem Online-Tool wie PixPassVisa schneiden Sie das Bild anschließend automatisch auf das korrekte Format zu. Die KI korrigiert Hintergrund, Belichtung und Kopfposition. So erhalten Sie ein konformes eGK-Foto in weniger als 30 Sekunden.
          </p>
        </div>
      </section>

      {/* ══════════════ SELBSTEMACHTE PASSBILDER ══════════════ */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <p className="text-blue-600 font-bold text-xs uppercase tracking-widest mb-2">Annahme & Qualität</p>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 mb-4">
            Werden selbstgemachte Passbilder angenommen?
          </h2>
          <p className="text-slate-600 leading-relaxed text-lg mb-4">
            Selbstgemachte Passbilder werden von den Krankenkassen angenommen, sofern sie die offiziellen Vorgaben erfüllen. Die AOK, Techniker Krankenkasse, Barmer, DAK und alle anderen gesetzlichen Kassen akzeptieren selbst aufgenommene Fotos, wenn diese die Qualitätskriterien treffen.
          </p>
          <p className="text-slate-600 leading-relaxed text-lg mb-4">
            Entscheidend ist nicht, wer das Foto aufnimmt, sondern ob das Ergebnis den Anforderungen entspricht. Das Bild muss scharf, gut belichtet und frei von Bildbearbeitungseffekten sein. Filter, Weichzeichner oder künstliche Effekte führen zur Ablehnung. Auch ein gemusterter Hintergrund oder andere Personen im Bild verhindern die Annahme.
          </p>
          <p className="text-slate-600 leading-relaxed text-lg">
            Wenn Sie das Foto über das Online-Portal Ihrer Kasse hochladen, prüft das System meist automatisch die grundlegenden Merkmale. Bei PixPassVisa validieren wir das Bild bereits vor dem Download auf Format, Hintergrund und Kopfgröße. So vermeiden Sie Ablehnungen und sparen Zeit.
          </p>
        </div>
      </section>

      {/* ══════════════ ALTER DES FOTOS ══════════════ */}
      <section className="py-20 px-4 bg-slate-50 border-y border-slate-100">
        <div className="max-w-4xl mx-auto">
          <p className="text-blue-600 font-bold text-xs uppercase tracking-widest mb-2">Gültigkeit & Aktualisierung</p>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 mb-4">
            Wie alt darf das Foto für die Krankenkasse sein?
          </h2>
          <p className="text-slate-600 leading-relaxed text-lg mb-4">
            Das Foto für die elektronische Gesundheitskarte sollte idealerweise <strong>nicht älter als sechs Monate</strong> sein. Wichtig ist, dass Sie auf dem Bild gut wiederzuerkennen sind. Die Krankenkasse nutzt das Lichtbild zur Identifizierung bei Arztbesuchen. Ein veraltetes Foto erschwert diesen Prozess und kann zur Anforderung eines neuen Bildes führen.
          </p>
          <p className="text-slate-600 leading-relaxed text-lg mb-4">
            Die gesetzlichen Krankenkassen dürfen Ihr Lichtbild maximal zehn Jahre speichern. Nach Ablauf dieser Frist oder bei deutlichen Änderungen Ihres Erscheinungsbildes erhalten Sie automatisch Post mit der Aufforderung, ein aktuelles Foto einzureichen. Das in Papierform eingereichte Foto wird nach der Übernahme in den Datenbestand datenschutzkonform vernichtet.
          </p>
          <p className="text-slate-600 leading-relaxed text-lg">
            Kinder unter 15 Jahren benötigen übrigens kein Foto auf der eGK. Erst mit Vollendung des 15. Lebensjahres wird ein Lichtbild verpflichtend. Die Kasse nimmt rechtzeitig zuvor Kontakt auf, um ein aktuelles Bild anzufordern.
          </p>
        </div>
      </section>

      {/* ══════════════ 3 SCHRITTE ══════════════ */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-blue-600 font-bold text-xs uppercase tracking-widest mb-2">So einfach geht&apos;s</p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">
              Gesundheitskarte Foto in 3 Schritten
            </h2>
            <p className="mt-3 text-slate-500 max-w-xl mx-auto">
              Vom Selfie zum hochladbaren Foto für Ihre Krankenkasse – direkt am Smartphone,
              ohne Termin.
            </p>
          </div>

          <ol className="grid sm:grid-cols-3 gap-6 list-none p-0">
            {steps.map((s) => (
              <li key={s.n} className="bg-white border border-slate-200 rounded-2xl p-7 flex flex-col gap-3">
                <span className="w-10 h-10 rounded-xl bg-blue-600 text-white font-black text-lg flex items-center justify-center  shadow-blue-500/20">
                  {s.n}
                </span>
                <h3 className="font-bold text-lg text-slate-900">{s.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ══════════════ ANFORDERUNGEN TABELLE ══════════════ */}
      <section className="py-20 px-4 bg-slate-50 border-y border-slate-100">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10">
            <p className="text-blue-600 font-bold text-xs uppercase tracking-widest mb-2">Offizielle Vorgaben (AOK, Barmer, VIACTIV)</p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 mb-3">
              Foto-Anforderungen für die eGK
            </h2>
            <p className="text-slate-500 leading-relaxed max-w-2xl">
              Die Anforderungen basieren auf den Vorgaben der gesetzlichen Krankenkassen sowie § 291 SGB V. Alle Punkte werden von PixPassVisa automatisch geprüft und angepasst.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200  bg-white">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-5 py-4 font-bold text-slate-700 w-1/4">Kriterium</th>
                  <th className="px-5 py-4 font-bold text-slate-700 w-1/3">Vorschrift</th>
                  <th className="px-5 py-4 font-bold text-slate-700">Hinweis</th>
                </tr>
              </thead>
              <tbody>
                {specs.map((s, i) => (
                  <tr key={s.krit} className={`border-b border-slate-100 ${i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}`}>
                    <td className="px-5 py-4 font-semibold text-slate-800">{s.krit}</td>
                    <td className="px-5 py-4">
                      <span className="inline-block bg-blue-50/70 text-blue-700 font-semibold px-2.5 py-0.5 rounded-md text-xs">
                        {s.vorschrift}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-slate-500">{s.hinweis}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-xs text-slate-400">
            Hinweis: Streng biometrische Anforderungen wie beim Reisepass (ICAO 9303) sind für
            die eGK nicht erforderlich – ein gut erkennbares Frontalfoto genügt (AOK).
          </p>
        </div>
      </section>

      {/* ══════════════ KRANKENKASSE UPLOAD TABELLE ══════════════ */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10">
            <p className="text-blue-600 font-bold text-xs uppercase tracking-widest mb-2">Foto einreichen</p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 mb-3">
              Foto hochladen: So geht&apos;s bei Ihrer Krankenkasse
            </h2>
            <p className="text-slate-500 leading-relaxed max-w-2xl">
              Nach dem Download bei PixPassVisa übermitteln Sie das Foto direkt im Online-Portal
              Ihrer Kasse. Sie benötigen in der Regel Ihre Versichertennummer und
              die Auftragsnummer aus dem Benachrichtigungsschreiben.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200  bg-white">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-5 py-4 font-bold text-slate-700 w-1/3">Krankenkasse</th>
                  <th className="px-5 py-4 font-bold text-slate-700 w-1/3">Portal / App</th>
                  <th className="px-5 py-4 font-bold text-slate-700">Upload-Pfad</th>
                </tr>
              </thead>
              <tbody>
                {kassen.map((k, i) => (
                  <tr key={k.name} className={`border-b border-slate-100 ${i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}`}>
                    <td className="px-5 py-4 font-semibold text-slate-800">{k.name}</td>
                    <td className="px-5 py-4 text-slate-600">{k.portal}</td>
                    <td className="px-5 py-4 text-slate-500">{k.pfad}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-xs text-slate-400">
            Alternativ ist bei allen Kassen der Postweg möglich. Papierabzüge werden vor
            der Kartenproduktion digitalisiert und nach Druck datenschutzgerecht vernichtet
            (Barmer/VIACTIV). Die Karte selbst ist für Versicherte kostenlos.
          </p>
        </div>
      </section>

      {/* ══════════════ DO / DON'T ══════════════ */}
      <section className="py-20 px-4 bg-slate-50 border-y border-slate-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-blue-600 font-bold text-xs uppercase tracking-widest mb-2">Checkliste</p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">
              Dos &amp; Don&apos;ts für das Gesundheitskarte Foto
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-7">
              <h3 className="font-bold text-lg text-slate-900 mb-5 flex items-center gap-2">
                <span className="w-7 h-7 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Check cls="w-4 h-4 text-blue-600" />
                </span>
                Das sollten Sie tun
              </h3>
              <ul className="flex flex-col gap-3">
                {doList.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-slate-700 leading-snug">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                      <Check />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-7">
              <h3 className="font-bold text-lg text-slate-900 mb-5 flex items-center gap-2">
                <span className="w-7 h-7 bg-red-50 rounded-lg flex items-center justify-center">
                  <Cross />
                </span>
                Das sollten Sie vermeiden
              </h3>
              <ul className="flex flex-col gap-3">
                {dontList.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-slate-700 leading-snug">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                      <Cross />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ VORTEILE ══════════════ */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-blue-600 font-bold text-xs uppercase tracking-widest mb-2">Warum PixPassVisa</p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 mb-4">
              Gesundheitskarte Foto – ohne Aufwand
            </h2>
            <p className="text-slate-500 leading-relaxed mb-6">
              Viele Versicherte werden unvorbereitet vom Schreiben ihrer Krankenkasse
              überrascht. PixPassVisa erstellt das Foto sofort, vollautomatisch und
              konform mit den Anforderungen aller gesetzlichen Krankenkassen.
            </p>
            <ul className="flex flex-col gap-3 mb-8">
              {[
                "Automatischer Zuschnitt auf 35×45 mm",
                "Hintergrundkorrektur auf Weiß/Hellgrau",
                "KI-Belichtungs- und Kontrastanpassung",
                "Sofort-Download als JPEG – direkt für den Upload",
                "Kompatibel mit allen GKV-Portalen (AOK, TK, Barmer, DAK …)",
                "Auch für Kinder ab 15 Jahren geeignet",
                "100 % datenschutzkonform – keine Speicherung Ihrer Fotos",
                "Alternative zum Fotostudio: schneller, günstiger, bequemer",
              ].map((f) => (
                <li key={f} className="flex items-start gap-3 text-slate-700 text-sm leading-snug">
                  <span className="mt-0.5 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                    <Check />
                  </span>
                  {f}
                </li>
              ))}
            </ul>
            <Link
              href={ctaHref}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-7 py-3.5 rounded-xl  shadow-blue-500/20 transition-colors"
            >
              Jetzt eGK Foto erstellen <ArrowRight />
            </Link>
          </div>

          <div className="bg-blue-50/70 border border-blue-200 rounded-2xl p-10 grid grid-cols-2 gap-8">
            {[
              { val: "35×45 mm", label: "Offizielles Fotoformat (eGK)" },
              { val: "< 30 Sek", label: "Bis zum fertigen Upload-Foto" },
              { val: "§ 291 SGB V", label: "Gesetzliche Grundlage" },
              { val: "10 Jahre", label: "Max. Speicherdauer bei der Kasse" },
            ].map((s) => (
              <div key={s.label} className="flex flex-col gap-1">
                <span className="text-3xl font-black text-blue-700 leading-none">{s.val}</span>
                <span className="text-slate-600 text-xs leading-tight">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ FAQ ══════════════ */}
      <section className="py-20 px-4 bg-slate-50 border-y border-slate-100">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-blue-600 font-bold text-xs uppercase tracking-widest mb-2">Häufige Fragen</p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">
              FAQ – Gesundheitskarte Foto
            </h2>
            <p className="mt-3 text-slate-500 max-w-xl mx-auto">
              Antworten auf die häufigsten Fragen zum Foto für die eGK – basierend auf
              offiziellen Angaben von AOK, Barmer, VIACTIV und § 291 SGB V.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {faqs.map((f) => (
              <details key={f.q} className="group bg-white border border-slate-200 rounded-xl overflow-hidden">
                <summary className="flex justify-between items-center px-6 py-5 cursor-pointer list-none select-none">
                  <h3 className="font-bold text-slate-900 text-base pr-4">{f.q}</h3>
                  <span className="text-blue-600 text-2xl font-light shrink-0 transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="px-6 pb-5 text-slate-500 text-sm leading-relaxed border-t border-slate-100 pt-4">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

    

    </main>
  );
}