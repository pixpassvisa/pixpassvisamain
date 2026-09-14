import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Target, Zap, Lock, CreditCard, Globe, Printer, ShieldCheck, FileCheck, Plane, Car, Check, X, Star } from "lucide-react";

/* ─────────────────────────────────────────────
   Metadata
───────────────────────────────────────────── */
export const metadata: Metadata = {
  title: "Passbild Online Erstellen 2026 | Biometrisches Passfoto 35x45 mm",
  description:
    "Passbild Deutschland online erstellen: biometrisches Passfoto nach BMI-Vorgabe (35×45 mm), automatische KI-Prüfung, Hintergrund entfernt, in 30 Sekunden fertig. Passfoto Generator ab 6.99 €.",

  alternates: {
    canonical: "https://www.pixpassvisa.com/de",
    languages: {
      de: "https://www.pixpassvisa.com/de",
      en: "https://www.pixpassvisa.com/",
      fr: "https://www.pixpassvisa.com/fr",
      "x-default": "https://www.pixpassvisa.com/",
    },
  },
  openGraph: {
    title: "PixPassVisa — Passbild Online in 30 Sekunden erstellen",
    description:
      "Biometrisches Passbild nach BMI-Vorgabe, automatische KI-Prüfung, Hintergrund entfernt, konform für 50+ Länder. Geld-zurück-Garantie.",
    url: "https://www.pixpassvisa.com/de",
    siteName: "PixPassVisa",
    locale: "de_DE",
    type: "website",
    images: [
      {
        url: "https://www.pixpassvisa.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "PixPassVisa — Passbild Online erstellen nach BMI-Vorgabe",
      },
    ],
  },
};

/* ─────────────────────────────────────────────
   Data
───────────────────────────────────────────── */
const steps = [
  {
    n: "01",
    title: "Foto aufnehmen oder hochladen",
    desc: "Nehmen Sie Ihr Foto mit dem Smartphone auf oder laden Sie ein vorhandenes Bild hoch. Sie brauchen kein Fotostudio und keine professionelle Kamera.",
  },
  {
    n: "02",
    title: "KI prüft Ihr Passbild automatisch",
    desc: "Unser Passfoto Generator entfernt den Hintergrund, schneidet das Bild zu und prüft über 50 biometrische Kriterien nach BMI-Standard in Echtzeit.",
  },
  {
    n: "03",
    title: "Passbild digital herunterladen",
    desc: "Sie erhalten sofort Ihr biometrisches Passfoto in hoher Auflösung — bereit für die Übermittlung an die Behörde oder zum Ausdrucken bei Rossmann oder dm.",
  },
];

const benefits = [
  {
    icon: Target,
    title: "Biometrische Konformität garantiert",
    desc: "Jedes Passbild erfüllt die offiziellen BMI- und ICAO-Kriterien für Deutschland, die EU und 50+ weitere Länder. Bei Ablehnung erstatten wir den vollen Preis.",
  },
  {
    icon: Zap,
    title: "Fertig in unter 30 Sekunden",
    desc: "Unser Passfoto Online-Tool arbeitet rund um die Uhr. Sie sparen sich die Fahrt und die Wartezeit beim Fotografen oder in der Apotheke.",
  },
  {
    icon: Lock,
    title: "Sichere Daten nach DSGVO",
    desc: "Wir übertragen Ihre Fotos verschlüsselt und löschen sie nach 24 Stunden automatisch. Wir geben Ihre Bilder niemals weiter.",
  },
  {
    icon: CreditCard,
    title: "Passfoto kostenlos testen, ab 5,99 € kaufen",
    desc: "Sie prüfen Ihr Ergebnis kostenlos, bevor Sie bezahlen. Kein Abonnement, keine versteckten Kosten — günstiger als die Behördengebühr von 6 € am PointID®-Terminal.",
  },
  {
    icon: Globe,
    title: "50+ Länder und Dokumente",
    desc: "Deutschland, USA, Kanada, Großbritannien, der gesamte Schengen-Raum: Unsere Formatdatenbank wird laufend aktualisiert.",
  },
  {
    icon: Printer,
    title: "Druckbogen inklusive",
    desc: "Sie erhalten zusätzlich ein druckfertiges Format für zu Hause oder für Rossmann und dm, das jede Behörde akzeptiert.",
  },
];

const docs = [
  {
    icon: ShieldCheck,
    name: "Deutscher Reisepass Passbild",
    detail: "ICAO-Format · hellgrauer Hintergrund · 35×45 mm",
  },
  {
    icon: FileCheck,
    name: "Personalausweis",
    detail: "Biometrische BMI-Standards 2025",
  },
  {
    icon: Plane,
    name: "Schengen-Visum",
    detail: "Passfoto Visum Deutschland und ganzer Schengen-Raum",
  },
  { icon: Car, name: "Führerschein", detail: "Neuantrag und Verlängerung" },
  { icon: Globe, name: "US-Dokumente", detail: "US-Pass · Visum DS-160" },
  {
    icon: Globe,
    name: "50+ weitere Länder",
    detail: "Aktuelle, weltweite Formatdatenbank",
  },
];

const reviews = [
  {
    name: "Michael S.",
    city: "München",
    stars: 5,
    text: "Mein Passbild wurde beim ersten Versuch für den Reisepass akzeptiert. Schnell und ohne Stress.",
  },
  {
    name: "Julia B.",
    city: "Berlin",
    stars: 5,
    text: "Ich war skeptisch, aber das Ergebnis war perfekt. Ich habe den Druckbogen bei Rossmann ausgedruckt, und alles hat sofort funktioniert.",
  },
  {
    name: "Andreas M.",
    city: "Hamburg",
    stars: 5,
    text: "Deutlich günstiger als beim Fotografen, und das Bild ist einwandfrei. Ich kann das Tool für die ganze Familie empfehlen.",
  },
];

const requirementsTable = [
  {
    param: "Format (B × H)",
    value: "35 × 45 mm",
    source: "BMI / Bundesdruckerei",
  },
  {
    param: "Gesichtshöhe",
    value: "32–36 mm (optimal)",
    source: "Lichtbild-Schablone BMI, Juli 2025",
  },
  {
    param: "Auflösung",
    value: "min. 600 dpi (827 × 1063 px)",
    source: "Auswärtiges Amt / ICAO",
  },
  {
    param: "Hintergrund",
    value: "Einfarbig, vorzugsweise hellgrau",
    source: "BMI Fotomustertafel, Juli 2025",
  },
  {
    param: "Gesichtsausdruck",
    value: "Neutral, Mund geschlossen",
    source: "ICAO Doc 9303 / BMI",
  },
  {
    param: "Kopfhaltung",
    value: "Frontal, gerade, kein Neigen",
    source: "Passverordnung (PassV)",
  },
  {
    param: "Augen",
    value: "Geöffnet, direkt zur Kamera, keine Tönung",
    source: "BMI",
  },
  {
    param: "Aktualität",
    value: "Nicht älter als 6 Monate",
    source: "Passverordnung",
  },
  {
    param: "Dateiformat",
    value: "JPG, PNG, PDF (digital)",
    source: "BMI, seit 1. Mai 2025",
  },
  {
    param: "Dateigröße",
    value: "Empfohlen unter 300 kB",
    source: "Auswärtiges Amt",
  },
];

const faqItems = [
  {
    q: "Was hat sich am 1. Mai 2025 bei Passbildern geändert?",
    a: "Seit dem 1. Mai 2025 akzeptieren deutsche Behörden für Reisepass, Personalausweis und Aufenthaltstitel ausschließlich digitale biometrische Lichtbilder. Bürgerämter nehmen keine Papierfotos mehr an. Sie übermitteln Ihr Foto entweder über einen registrierten Fotodienstleister per zertifizierter Cloud, oder Sie lassen es direkt im Amt am PointID®-Terminal aufnehmen.",
  },
  {
    q: "Welche Passbild Größe gilt in Deutschland?",
    a: "Das offizielle Format ist 35 × 45 mm. Die Gesichtshöhe von Kinn bis Haaransatz muss laut BMI-Lichtbild-Schablone zwischen 32 und 36 mm liegen. PixPassVisa stellt dieses Maß bei jedem Foto automatisch sicher.",
  },
  {
    q: "Welcher Hintergrund ist für ein biometrisches Passfoto vorgeschrieben?",
    a: "Die BMI-Fotomustertafel schreibt einen einfarbigen, vorzugsweise hellgrauen Hintergrund ohne Schatten oder Muster vor. Unser Tool entfernt Ihren echten Hintergrund automatisch und ersetzt ihn durch die korrekte Farbe.",
  },
  {
    q: "Kann ich mein Passbild online selbst erstellen?",
    a: "Ja. Sie nehmen das Foto einfach mit dem Smartphone auf, und unsere KI prüft automatisch alle relevanten biometrischen Kriterien — Gesichtshöhe, Auflösung, Hintergrund, Beleuchtung und Kopfhaltung — nach BMI-Standard.",
  },
  {
    q: "Was kostet ein Passbild beim Amt mit PointID®?",
    a: "Nutzt Ihr Amt das PointID®-System der Bundesdruckerei, kostet die Aufnahme vor Ort seit dem 1. Mai 2025 bundeseinheitlich 6,00 €. Mit PixPassVisa erhalten Sie Ihr konformes Passfoto schon ab 5,99 €, ohne Anfahrt und ohne Wartezeit.",
  },
  {
    q: "Darf ich auf dem Passbild lächeln?",
    a: "Nein. Die ICAO-Norm und die BMI-Vorgabe verlangen einen neutralen Gesichtsausdruck mit geschlossenem Mund. Ein Lächeln mit sichtbaren Zähnen führt zur Ablehnung.",
  },
  {
    q: "Für welche Dokumente kann ich diesen Passfoto Generator nutzen?",
    a: "Sie können das Tool für Reisepass, Personalausweis, Führerschein, Schengen-Visum, US-Visum (DS-160) und über 50 weitere internationale Dokumente verwenden. Wir aktualisieren die Formatdatenbank laufend.",
  },
  {
    q: "Was passiert, wenn mein Passbild abgelehnt wird?",
    a: "Lehnt eine deutsche Behörde Ihr mit PixPassVisa erstelltes Foto ab, erstatten wir den vollen Kaufpreis ohne Rückfragen. Unsere Akzeptanzrate liegt bei über 99 Prozent.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: "PixPassVisa",
      url: "https://www.pixpassvisa.com/de",
      applicationCategory: "PhotographyApplication",
      operatingSystem: "All",
      inLanguage: "de",
      offers: {
        "@type": "Offer",
        price: "6.99",
        priceCurrency: "EUR",
        priceValidUntil: "2027-12-31",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        ratingCount: "170",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: faqItems.map((f) => ({
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
      ],
    },
  ],
};

const ctaHref = "/de/passbild-online?type=germany-passport";

/* ─────────────────────────────────────────────
   Page
───────────────────────────────────────────── */
export default function DeHomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="bg-white text-slate-900">
        {/* ══════════════ HERO ══════════════ */}
        <section aria-labelledby="hero-h1" className="pt-8 md:pt-10">
          <div className="mx-auto max-w-7xl px-3 py-10 sm:px-4 md:py-10 lg:px-6">
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
              <div>
                <p className="mb-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-blue-700">
                  <span
                    className="h-2 w-2 rounded-full bg-blue-600"
                    aria-hidden="true"
                  />
                  Neu seit Mai 2025 · Digitales Passbild nach BMI-Vorgabe
                </p>

                <h1
                  id="hero-h1"
                  className="max-w-2xl text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl"
                >
                  Passbild Online für Deutschland
                </h1>

                <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
                  Erstellen Sie Ihr biometrisches Passbild in nur 30 Sekunden.
                  Automatische KI-Prüfung nach offiziellen deutschen
                  Anforderungen Hintergrund, Bildgröße 35×45 mm,
                  Gesichtsposition und Belichtung.
                </p>

                <div className="mt-8">
                  <Link
                    href={ctaHref}
                    className="inline-flex items-center justify-center bg-blue-700 hover:bg-blue-800 text-white text-sm font-semibold px-6 py-3 rounded transition-colors"
                  >
                    Jetzt Passbild erstellen
                    <ArrowRight />
                  </Link>
                </div>
              </div>

              <div className="flex justify-center">
                <Image
                  src="https://res.cloudinary.com/dipzpwbbk/image/upload/v1779008016/c24d89b1-ab0e-4f1d-9035-5814bc7b91ca_preview_ip9ogs.jpg"
                  alt="Biometrisches Passbild online per Smartphone erstellen"
                  width={700}
                  height={560}
                  className="w-full h-auto rounded-lg "
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════ STICKY CTA (mobile) ══════════════ */}
        <div className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-800 bg-slate-900 p-3 md:hidden">
          <Link
            href={ctaHref}
            className="flex w-full items-center justify-center gap-2 rounded-md bg-blue-600 py-3.5 text-sm font-bold text-white hover:bg-blue-700"
          >
            Jetzt Passbild erstellen
            <ArrowRight />
          </Link>
        </div>
        <div className="h-20 md:hidden" aria-hidden="true" />

        {/* ══════════════ STATS BAND ══════════════ */}
        <div className="bg-slate-900 py-6">
          <div className="mx-auto flex max-w-5xl flex-wrap justify-around gap-3 px-4 sm:px-6 lg:px-10">
            {[
              { v: "17.000+", l: "Zufriedene Nutzer" },
              { v: "4,9 / 5", l: "Verifizierte Bewertung" },
              { v: "99,8 %", l: "Akzeptanzrate" },
              { v: "< 30 s", l: "Bearbeitungszeit" },
              { v: "50+", l: "Länder unterstützt" },
            ].map((s) => (
              <div className="text-center" key={s.v}>
                <span className="block text-xl font-extrabold text-cyan-400 sm:text-2xl">
                  {s.v}
                </span>
                <span className="mt-1 block text-[11px] font-medium uppercase tracking-wide text-slate-400">
                  {s.l}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ══════════════ SO FUNKTIONIERT ES ══════════════ */}
        <section aria-labelledby="how-h2" className="py-14 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-10">
            <header className="mb-10 max-w-2xl">
              <span className="inline-block rounded-md border border-blue-200 bg-blue-50/70 px-3 py-1 text-xs font-bold uppercase tracking-wide text-blue-700">
                So funktioniert es
              </span>
              <h2
                id="how-h2"
                className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl"
              >
                In drei Schritten zum digitalen Passbild
              </h2>
              <p className="mt-3 text-base leading-relaxed text-slate-600">
                Kein Fotostudio, keine Wartezeit. Sie erstellen Ihr
                biometrisches Passbild online in unter einer Minute.
              </p>
            </header>

            <ol className="grid gap-5 sm:grid-cols-3">
              {steps.map((s) => (
                <li
                  key={s.n}
                  className="rounded-xl border-2 border-slate-200 p-6"
                >
                  <span className="inline-block rounded-md bg-blue-50/70 px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wide text-blue-700">
                    Schritt {s.n}
                  </span>
                  <h3 className="mt-4 text-base font-bold text-slate-900">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {s.desc}
                  </p>
                </li>
              ))}
            </ol>

            <div className="mt-10 text-center">
              <Link
                href={ctaHref}
                className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-7 py-3.5 text-base font-bold text-white hover:bg-blue-700"
              >
                Jetzt starten
                <ArrowRight />
              </Link>
            </div>
          </div>
        </section>

        {/* ══════════════ ANFORDERUNGEN ══════════════ */}
        <section
          aria-labelledby="req-h2"
          className="border-y-2 border-slate-200 bg-slate-50 py-14 sm:py-20"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-10">
            <span className="inline-block rounded-md border border-blue-200 bg-blue-50/70 px-3 py-1 text-xs font-bold uppercase tracking-wide text-blue-700">
              Offizielle Vorgaben
            </span>
            <h2
              id="req-h2"
              className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl"
            >
              Passbild Größe Deutschland: Alle Anforderungen im Überblick
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-700">
              Die folgenden Werte stammen aus der Lichtbild-Schablone des
              Bundesministeriums des Innern (BMI, Stand Juli 2025), der
              Passverordnung (PassV) sowie der internationalen ICAO-Norm 9303,
              die auch das Auswärtige Amt für Visa-Anträge anwendet.
            </p>

            <div className="mt-6 overflow-x-auto rounded-xl border-2 border-slate-200">
              <table className="w-full border-collapse text-left text-sm">
                <thead className="bg-slate-900 text-white">
                  <tr>
                    <th className="px-4 py-3 text-xs font-bold uppercase tracking-wide">
                      Parameter
                    </th>
                    <th className="px-4 py-3 text-xs font-bold uppercase tracking-wide">
                      Vorgeschriebener Wert
                    </th>
                    <th className="px-4 py-3 text-xs font-bold uppercase tracking-wide">
                      Quelle
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  {requirementsTable.map((r) => (
                    <tr key={r.param}>
                      <td className="px-4 py-3 font-semibold text-slate-800">
                        {r.param}
                      </td>
                      <td className="px-4 py-3 text-slate-700">{r.value}</td>
                      <td className="px-4 py-3 text-slate-500">{r.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h3 className="mt-8 text-lg font-bold text-slate-900">
              Diese Fehler führen zur Ablehnung
            </h3>
            <ul className="mt-4 space-y-3">
              {[
                {
                  t: "Lächeln mit sichtbaren Zähnen",
                  d: "Ist nicht erlaubt. Die ICAO-Norm verlangt einen neutralen Ausdruck mit geschlossenem Mund.",
                },
                {
                  t: "Getönte Brillengläser oder Reflexionen",
                  d: "Führen zur sofortigen Ablehnung durch die Behörde.",
                },
                {
                  t: "Geneigter oder gedrehter Kopf",
                  d: "Ihr Kopf muss gerade und frontal zur Kamera ausgerichtet sein.",
                },
                {
                  t: "Schatten im Gesicht oder im Hintergrund",
                  d: "Die Ausleuchtung muss gleichmäßig sein, ohne Über- oder Unterbelichtung.",
                },
                {
                  t: "Falscher Hintergrund",
                  d: "Muster, Farben und Verläufe sind nicht erlaubt, nur ein einfarbiger, hellgrauer Hintergrund.",
                },
                {
                  t: "Foto älter als 6 Monate",
                  d: "Ihr Passbild muss Ihr aktuelles Erscheinungsbild zeigen.",
                },
                {
                  t: "Papierfoto seit dem 1. Mai 2025",
                  d: "Ist im Inland für offizielle Ausweisdokumente nicht mehr zulässig.",
                },
              ].map((item) => (
                <li
                  key={item.t}
                  className="flex gap-2 text-sm leading-relaxed text-slate-700"
                >
                  <X className="mt-0.5 w-4 h-4 font-bold text-red-500 shrink-0" />
                  <span>
                    <strong className="text-slate-900">{item.t}:</strong>{" "}
                    {item.d}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm leading-relaxed text-slate-600">
              Unser Passfoto Generator prüft jeden dieser Punkte automatisch und
              zeigt Ihnen Probleme, bevor Sie bezahlen.
            </p>
          </div>
        </section>

        {/* ══════════════ WARUM WIR ══════════════ */}
        <section aria-labelledby="why-h2" className="py-14 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-10">
            <header className="mb-10 max-w-2xl">
              <span className="inline-block rounded-md border border-blue-200 bg-blue-50/70 px-3 py-1 text-xs font-bold uppercase tracking-wide text-blue-700">
                Warum wir
              </span>
              <h2
                id="why-h2"
                className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl"
              >
                Warum PixPassVisa der beste Passfoto Generator ist
              </h2>
              <p className="mt-3 text-base leading-relaxed text-slate-600">
                Jeden Monat vertrauen uns tausende Nutzer für ihren Pass-,
                Visum- und Ausweisantrag.
              </p>
            </header>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {benefits.map((b) => (
                <article
                  key={b.title}
                  className="rounded-xl border-2 border-slate-200 p-6"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 mb-3">
                    <b.icon className="w-5 h-5" />
                  </div>
                  <h3 className="mt-3 text-base font-bold text-slate-900">
                    {b.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {b.desc}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════ DOKUMENTE ══════════════ */}
        <section
          aria-labelledby="docs-h2"
          className="border-y-2 border-slate-200 bg-slate-50 py-14 sm:py-20"
        >
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-10">
            <header className="mb-10 max-w-2xl">
              <span className="inline-block rounded-md border border-blue-200 bg-blue-50/70 px-3 py-1 text-xs font-bold uppercase tracking-wide text-blue-700">
                Unterstützte Dokumente
              </span>
              <h2
                id="docs-h2"
                className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl"
              >
                Ein Passfoto Generator für alle Ausweisdokumente
              </h2>
              <p className="mt-3 text-base leading-relaxed text-slate-600">
                PixPassVisa deckt alle gängigen deutschen und internationalen
                Identitäts- und Reisedokumente ab — eine Plattform für jede
                Anforderung, immer nach aktuellem BMI- und ICAO-Standard.
              </p>
            </header>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {docs.map((d) => (
                <div
                  key={d.name}
                  className="flex flex-col items-center gap-1.5 rounded-xl border-2 border-slate-200 bg-white p-5 text-center shadow-xs"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 mb-1">
                    <d.icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">{d.name}</h3>
                  <p className="text-xs text-slate-500">{d.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════ SEO PROSE ══════════════ */}
        <section aria-labelledby="seo-prose-h2" className="py-14 sm:py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-10">
            <h2
              id="seo-prose-h2"
              className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl"
            >
              Biometrisches Passbild selbst erstellen: So gelingt es zu Hause
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-700">
              Seit der digitalen Passpflicht am 1. Mai 2025 fragen sich viele
              Bürgerinnen und Bürger, ob sie ihr Passbild noch selbst aufnehmen
              dürfen. Die Antwort lautet ja, solange das Ergebnis den
              offiziellen BMI-Vorgaben entspricht und digital über einen
              registrierten Fotodienstleister an das Bürgeramt geht. Mit dem
              richtigen Licht, dem richtigen Abstand und der richtigen Prüfung
              gelingt ein biometrisches Passfoto auch mit dem eigenen
              Smartphone.
            </p>

            <h3 className="mt-8 text-lg font-bold text-slate-900">
              Sieben Tipps für ein perfektes Passfoto online
            </h3>
            <ul className="mt-4 space-y-3">
              {[
                {
                  t: "Licht von vorn",
                  d: "Stellen Sie sich vor ein Fenster oder eine helle Lampe, damit Ihr Gesicht gleichmäßig ausgeleuchtet ist. Vermeiden Sie Gegenlicht.",
                },
                {
                  t: "Neutraler Hintergrund",
                  d: "Eine helle, einfarbige Wand reicht aus. PixPassVisa tauscht Ihren Hintergrund ohnehin automatisch gegen die korrekte Farbe aus.",
                },
                {
                  t: "Richtiger Abstand",
                  d: "Halten Sie das Smartphone etwa 40 bis 50 cm von Ihrem Gesicht entfernt. Kopf und Schultern müssen vollständig sichtbar sein.",
                },
                {
                  t: "Keine Filter",
                  d: "Verzichten Sie auf Schönheitsfilter, HDR und automatische Weichzeichnung im Portraitmodus.",
                },
                {
                  t: "Brille abnehmen, wenn möglich",
                  d: "Fotografieren Sie ohne Brille. Getönte Gläser und starke Reflexionen sind grundsätzlich nicht zulässig.",
                },
                {
                  t: "Neutraler Ausdruck",
                  d: "Blicken Sie direkt in die Kamera, halten Sie den Mund geschlossen und entspannen Sie Ihr Gesicht.",
                },
                {
                  t: "Sofort prüfen lassen",
                  d: "Laden Sie Ihr Foto hoch und lassen Sie unsere KI alle biometrischen Kriterien prüfen, bevor Sie es einreichen.",
                },
              ].map((item) => (
                <li
                  key={item.t}
                  className="flex gap-2 text-sm leading-relaxed text-slate-700"
                >
                  <Check className="mt-0.5 w-4 h-4 font-bold text-blue-600 shrink-0" />
                  <span>
                    <strong className="text-slate-900">{item.t}:</strong>{" "}
                    {item.d}
                  </span>
                </li>
              ))}
            </ul>

            <h3 className="mt-8 text-lg font-bold text-slate-900">
              Passbild für Kinder: Diese Regeln gelten
            </h3>
            <p className="mt-3 text-base leading-relaxed text-slate-700">
              Bei Kindern unter fünf Jahren verzichtet das BMI auf die volle
              Prüfung der Biometrietauglichkeit. Die Augen müssen trotzdem
              erkennbar geöffnet sein, und das Gesicht muss frontal sichtbar
              bleiben. Ab fünf Jahren gelten dieselben biometrischen
              Anforderungen wie für Erwachsene. PixPassVisa erkennt ein
              Kinderfoto automatisch und wendet die passenden Toleranzgrenzen
              an.
            </p>

            <h3 className="mt-8 text-lg font-bold text-slate-900">
              Passbild oder Bewerbungsfoto: Der Unterschied zählt
            </h3>
            <p className="mt-3 text-base leading-relaxed text-slate-700">
              Ein biometrisches Passbild folgt strengen staatlichen Normen: 35 ×
              45 mm, neutraler Ausdruck, hellgrauer Hintergrund. Ein
              Bewerbungsfoto ist freier gestaltet, darf ein leichtes Lächeln
              zeigen, professionell retuschiert sein und wird meist im
              Hochformat 4:5 oder 3:4 geliefert. PixPassVisa unterstützt beide
              Formate — wählen Sie beim Erstellen einfach den passenden
              Dokumenttyp aus.
            </p>
          </div>
        </section>

        {/* ══════════════ BEWERTUNGEN ══════════════ */}
        <section
          aria-labelledby="reviews-h2"
          className="border-y-2 border-slate-200 bg-slate-50 py-14 sm:py-20"
        >
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-10">
            <header className="mb-10 max-w-2xl">
              <span className="inline-block rounded-md border border-blue-200 bg-blue-50/70 px-3 py-1 text-xs font-bold uppercase tracking-wide text-blue-700">
                Kundenbewertungen
              </span>
              <h2
                id="reviews-h2"
                className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl"
              >
                Das sagen unsere Nutzer
              </h2>
              <p className="mt-3 text-base leading-relaxed text-slate-600">
                Über 17.000 Nutzer haben ihr biometrisches Passbild bereits mit
                PixPassVisa erstellt.
              </p>
            </header>
            <div className="grid gap-5 sm:grid-cols-3">
              {reviews.map((r) => (
                <figure
                  key={r.name}
                  className="flex flex-col gap-3 rounded-xl border-2 border-slate-200 bg-white p-6"
                >
                  <div
                    className="flex gap-0.5 text-amber-500"
                    aria-label={`${r.stars} von 5 Sternen`}
                  >
                    {[...Array(r.stars)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <blockquote className="text-sm italic leading-relaxed text-slate-700">
                    „{r.text}"
                  </blockquote>
                  <figcaption className="flex items-center gap-3 text-sm text-slate-500">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-blue-200 bg-blue-50/70 text-sm font-bold text-blue-700">
                      {r.name.charAt(0)}
                    </span>
                    <span>
                      <strong className="font-bold text-slate-900">
                        {r.name}
                      </strong>{" "}
                      · {r.city}
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════ FAQ ══════════════ */}
        <section aria-labelledby="faq-h2" className="py-14 sm:py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-10">
            <header className="mb-10">
              <span className="inline-block rounded-md border border-blue-200 bg-blue-50/70 px-3 py-1 text-xs font-bold uppercase tracking-wide text-blue-700">
                FAQ
              </span>
              <h2
                id="faq-h2"
                className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl"
              >
                Häufig gestellte Fragen zum Passbild online
              </h2>
              <p className="mt-3 text-base leading-relaxed text-slate-600">
                Alles Wichtige zur BMI-Vorgabe, zum Format und zur Nutzung von
                PixPassVisa.
              </p>
            </header>
            <div className="flex flex-col gap-3">
              {faqItems.map((f, i) => (
                <details
                  key={i}
                  className="group rounded-xl border-2 border-slate-200 open:border-blue-300"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 text-sm font-semibold text-slate-900 group-hover:bg-blue-50/70">
                    <span>{f.q}</span>
                    <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border border-blue-200 bg-blue-50/70 text-sm font-bold text-blue-700 group-open:rotate-45 group-open:bg-blue-600 group-open:text-white">
                      +
                    </span>
                  </summary>
                  <p className="border-t-2 border-slate-200 px-5 pb-5 pt-3 text-sm leading-relaxed text-slate-600">
                    {f.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════ DISCLAIMER ══════════════ */}
        <div
          role="note"
          aria-label="Wichtige Information"
          className="border-y border-slate-200 bg-slate-100 py-4"
        >
          <div className="mx-auto flex max-w-5xl items-start gap-3 px-4 sm:px-6 lg:px-10">
            <InfoIcon />
            <p className="text-xs leading-relaxed text-slate-500">
              <strong className="font-semibold text-slate-600">
                PixPassVisa
              </strong>{" "}
              ist ein unabhängiger Service zur Erstellung konformer Passbilder.
              Wir sind nicht mit dem BMI (Bundesministerium des Innern) oder
              anderen Behörden verbunden. Unser Service liefert Ihnen ein
              digital konformes Passbild nach biometrischen Vorgaben, das Sie
              für Ihre offiziellen Anträge nutzen können.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}

/* ─────────────────────────────────────────────
   Icons
───────────────────────────────────────────── */
function ArrowRight() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}
function ShieldIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  );
}
function InfoIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  );
}
