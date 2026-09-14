import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import documentPhotoHero from "./schweizer-dokumentenfoto-beispiel.png";

const ctaHref = "/de/passbild-online?type=switzerland-passport";

export const metadata: Metadata = {
  title: "Dokumentenfoto Schweiz: online für ID, Führerausweis & Visum",
  description:
    "Dokumentenfoto für die Schweiz online vorbereiten: Anforderungen, Formate und Tipps für ID, Führerausweis, Aufenthaltsbewilligung und Visum.",
  alternates: {
    canonical: "https://www.pixpassvisa.com/de/dokumentenfoto-schweiz",
    languages: {
      de: "https://www.pixpassvisa.com/de/dokumentenfoto-schweiz",
      "de-CH": "https://www.pixpassvisa.com/de/dokumentenfoto-schweiz",
      "x-default": "https://www.pixpassvisa.com/de/dokumentenfoto-schweiz",
    },
  },
  openGraph: {
    title: "Dokumentenfoto Schweiz: online vorbereiten",
    description:
      "Die wichtigsten Fotoanforderungen für Schweizer Dokumente – verständlich erklärt und mobil umsetzbar.",
    url: "https://www.pixpassvisa.com/de/dokumentenfoto-schweiz",
    locale: "de_CH",
    type: "website",
    images: [
      {
        url: "/de/dokumentenfoto-schweiz/schweizer-dokumentenfoto-beispiel.png",
        width: 1024,
        height: 1536,
        alt: "Beispiel eines neutral ausgeleuchteten Schweizer Dokumentenfotos",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dokumentenfoto Schweiz: online vorbereiten",
    description:
      "Anforderungen und Tipps für Dokumentenfotos in der Schweiz.",
    images: ["/de/dokumentenfoto-schweiz/schweizer-dokumentenfoto-beispiel.png"],
  },
};

const documents = [
  {
    code: "01",
    title: "Identitätskarte",
    format: "Meist 35 × 45 mm",
    text: "Für eine Identitätskarte kann je nach Kanton ein eigenes Foto möglich sein. Klären Sie die Annahme vor dem Termin mit Ihrer zuständigen Stelle.",
  },
  {
    code: "02",
    title: "Führerausweis",
    format: "Kantonale Vorgaben",
    text: "Strassenverkehrsämter können eigene Anforderungen an Format, Alter und Einreichung festlegen. Prüfen Sie deshalb die Vorgaben Ihres Wohnkantons.",
  },
  {
    code: "03",
    title: "Aufenthaltsbewilligung",
    format: "Biometrisch, häufig 35 × 45 mm",
    text: "Für Ausländerausweise zählt eine klare, aktuelle und biometrisch verwertbare Aufnahme. Das Migrationsamt gibt den verbindlichen Weg vor.",
  },
  {
    code: "04",
    title: "Visumfoto",
    format: "Je nach Zielland",
    text: "Schengen, USA und weitere Zielländer verwenden unterschiedliche Masse. Wählen Sie immer die Anforderungen der Botschaft oder des Konsulats.",
  },
];

const checklist = [
  ["Frontal aufnehmen", "Kopf gerade, Schultern gerade und Blick direkt in die Kamera."],
  ["Neutral ausleuchten", "Weiches Licht von vorne; keine Schatten, Reflexionen oder roten Augen."],
  ["Hintergrund ruhig halten", "Einfarbig, neutral und klar vom Kopf getrennt – ohne Muster oder Gegenstände."],
  ["Ohne Filter speichern", "Verwenden Sie das scharfe Original ohne Beauty-Filter, digitale Retusche oder Screenshot."],
];

const steps = [
  ["Aufnehmen", "Stellen Sie das Smartphone auf Augenhöhe. Bitten Sie möglichst eine zweite Person um das Foto oder verwenden Sie ein Stativ."],
  ["Dokument wählen", "Wählen Sie ID, Führerausweis, Aufenthalt oder ein bestimmtes Visum, bevor Sie die Masse prüfen."],
  ["Ausgerichtet vorbereiten", "Laden Sie das Original hoch und richten Sie den Bildausschnitt nachvollziehbar auf das benötigte Format aus."],
  ["Stelle prüfen", "Vergleichen Sie Datei, Ausdruck und Einreichung mit den aktuellen Hinweisen der zuständigen Behörde."],
];

const faqs = [
  {
    q: "Was ist ein Dokumentenfoto?",
    a: "Ein Dokumentenfoto ist ein Porträt für einen Ausweis, einen Führerausweis, eine Bewilligung oder ein Visum. Je nach Dokument gelten Vorgaben zu Format, Blickrichtung, Bildqualität, Hintergrund und Einreichungsweg.",
  },
  {
    q: "Kann ich ein Dokumentenfoto mit dem Handy machen?",
    a: "Ja. Mit einer aktuellen Smartphone-Kamera gelingt eine scharfe Ausgangsaufnahme, wenn die Kamera auf Augenhöhe steht und das Licht gleichmässig von vorne kommt. Verwenden Sie die Originaldatei statt eines Screenshots und verzichten Sie auf Filter.",
  },
  {
    q: "Gilt 35 × 45 mm für jedes Schweizer Dokument?",
    a: "Nein. 35 × 45 mm ist ein häufiges Format für Schweizer Ausweisfotos, aber Dokumente und Stellen können abweichende oder zusätzliche Anforderungen haben. Für Visa gelten insbesondere die Regeln des Ziellands.",
  },
  {
    q: "Darf ich ein selbst erstelltes Foto für den Schweizer Pass einreichen?",
    a: "Die biometrischen Daten und das Foto werden häufig beim Termin erfasst. Ob ein eigenes Foto angenommen wird, unterscheidet sich nach Kanton und Dokument. Prüfen Sie dies vor dem Termin direkt bei der zuständigen Pass- oder Einwohnerstelle.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      name: "Dokumentenfoto Schweiz: online für ID, Führerausweis & Visum",
      description:
        "Anforderungen und mobile Anleitung für Dokumentenfotos in der Schweiz.",
      inLanguage: "de-CH",
      url: "https://www.pixpassvisa.com/de/dokumentenfoto-schweiz",
    },
    {
      "@type": "HowTo",
      name: "Dokumentenfoto mit dem Smartphone vorbereiten",
      description:
        "Eine kompakte Anleitung zur Vorbereitung eines Dokumentenfotos für Schweizer Stellen.",
      step: steps.map(([name, text], position) => ({
        "@type": "HowToStep",
        position: position + 1,
        name,
        text,
      })),
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map(({ q, a }) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Startseite", item: "https://www.pixpassvisa.com/de" },
        { "@type": "ListItem", position: 2, name: "Dokumentenfoto Schweiz", item: "https://www.pixpassvisa.com/de/dokumentenfoto-schweiz" },
      ],
    },
  ],
};

function ArrowRight() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6 6 6-6 6" />
    </svg>
  );
}

function Check() {
  return (
    <svg aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-red-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="m5 12 4 4L19 6" />
    </svg>
  );
}

export default function DokumentenfotoSchweizPage() {
  return (
    <div className="bg-[#fcfcfb] text-slate-950 selection:bg-red-100 selection:text-red-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <header className="border-b border-slate-200 bg-white">
        <div className="h-1 bg-red-700" />
        <div className="mx-auto max-w-6xl px-4 pb-12 pt-5 sm:px-6 sm:pb-16 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-9 text-xs text-slate-500">
            <Link href="/de" className="hover:text-red-800">Startseite</Link>
            <span className="mx-2 text-slate-300">/</span>
            <span>Dokumentenfoto Schweiz</span>
          </nav>

          <div className="grid items-center gap-10 lg:grid-cols-[1.07fr_.93fr] lg:gap-16">
            <div>
              <p className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-red-800">
                <span className="h-2 w-2 bg-red-700" /> Foto-Guide Schweiz
              </p>
              <h1 className="max-w-3xl text-4xl font-semibold leading-[1.04] tracking-[-0.045em] text-slate-950 sm:text-5xl lg:text-6xl">
                Dokumentenfoto Schweiz, klar vorbereitet.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
                Bereiten Sie ein passendes Foto für <strong className="font-semibold text-slate-900">ID, Führerausweis, Aufenthaltsbewilligung oder Visum</strong> direkt mit dem Smartphone vor. Die verbindlichen Anforderungen kommen immer von der ausstellenden Stelle.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link href={ctaHref} className="inline-flex items-center justify-center gap-2 bg-red-700 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-800">
                  Foto vorbereiten <ArrowRight />
                </Link>
                <Link href="#dokumente" className="inline-flex items-center justify-center border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 transition-colors hover:border-slate-900">
                  Dokument auswählen
                </Link>
              </div>

              <dl className="mt-9 grid grid-cols-3 border-y border-slate-200 text-sm">
                <div className="py-3 pr-3">
                  <dt className="text-slate-500">Für</dt>
                  <dd className="mt-1 font-semibold text-slate-900">4 Fotoarten</dd>
                </div>
                <div className="border-l border-slate-200 px-3 py-3">
                  <dt className="text-slate-500">Aufnahme</dt>
                  <dd className="mt-1 font-semibold text-slate-900">mobil möglich</dd>
                </div>
                <div className="border-l border-slate-200 pl-3 py-3">
                  <dt className="text-slate-500">Wichtig</dt>
                  <dd className="mt-1 font-semibold text-slate-900">Stelle prüfen</dd>
                </div>
              </dl>
            </div>

            <figure className="mx-auto w-full max-w-sm border border-slate-300 bg-[#f3f5f5] p-3 sm:p-4">
              <div className="flex items-center justify-between border-b border-slate-300 pb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-600">
                <span>Beispielaufnahme</span>
                <span>Porträt · frontal</span>
              </div>
              <div className="relative mt-3 aspect-[35/45] overflow-hidden border border-slate-300 bg-slate-200">
                <Image
                  src='https://res.cloudinary.com/dipzpwbbk/image/upload/v1789271072/schweizer-dokumentenfoto-beispiel_q1biiv.webp'
                  alt="Beispiel eines neutral ausgeleuchteten Schweizer Dokumentenfotos mit geradem Blick"
                  fill
                  priority
                  sizes="(max-width: 640px) 88vw, (max-width: 1024px) 360px, 420px"
                  className="object-cover"
                />
                <span className="absolute left-2 top-2 border border-white/80 bg-white/90 px-2 py-1 text-[10px] font-semibold text-slate-700">ruhiger Hintergrund</span>
                <span className="absolute bottom-2 right-2 border border-white/80 bg-white/90 px-2 py-1 text-[10px] font-semibold text-slate-700">Augen sichtbar</span>
              </div>
              <figcaption className="pt-3 text-xs leading-5 text-slate-600">Beispiel einer Aufnahme zur Orientierung, kein amtliches Musterfoto.</figcaption>
            </figure>
          </div>
        </div>
      </header>

      <main>
        <section className="border-b border-slate-200 bg-[#f7f8f8] py-12 sm:py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-7 lg:grid-cols-[.8fr_1.2fr] lg:items-start">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-red-800">Die kurze Antwort</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.035em] text-slate-950 sm:text-4xl">Ein Foto, mehrere Regeln.</h2>
              </div>
              <div className="border-l-2 border-red-700 pl-5 text-base leading-7 text-slate-700 sm:text-lg">
                Ein Dokumentenfoto ist keine Einheitslösung: Format, Dateivorgaben und Annahmeprozess richten sich nach Dokument, Kanton oder Botschaft. Mit einer sauberen Ausgangsaufnahme sparen Sie Zeit bei der Vorbereitung – die finale Prüfung liegt bei der zuständigen Behörde.
              </div>
            </div>
          </div>
        </section>

        <section id="dokumente" className="py-14 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-red-800">Dokument wählen</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.035em] text-slate-950 sm:text-4xl">Welches Foto benötigen Sie?</h2>
              <p className="mt-4 text-base leading-7 text-slate-600">Starten Sie mit dem Verwendungszweck. So vermeiden Sie ein passendes Foto im falschen Format.</p>
            </div>
            <div className="mt-9 grid border-l border-t border-slate-300 sm:grid-cols-2">
              {documents.map((document) => (
                <article key={document.title} className="border-b border-r border-slate-300 bg-white p-5 sm:p-7">
                  <div className="flex items-start justify-between gap-4">
                    <span className="font-mono text-xs font-semibold text-red-800">{document.code}</span>
                    <span className="border border-slate-300 px-2 py-1 text-[11px] font-semibold text-slate-600">{document.format}</span>
                  </div>
                  <h3 className="mt-8 text-xl font-semibold tracking-[-0.02em] text-slate-950">{document.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{document.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-[#102331] py-14 text-white sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-[.7fr_1.3fr]">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-red-300">Vor der Aufnahme</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">Vier Punkte, die fast immer zählen.</h2>
                <p className="mt-4 max-w-md text-sm leading-6 text-slate-300">Diese Grundregeln helfen bei einer brauchbaren Ausgangsaufnahme. Spezifische Vorgaben haben immer Vorrang.</p>
              </div>
              <ul className="grid gap-px border border-slate-600 bg-slate-600 sm:grid-cols-2">
                {checklist.map(([title, text]) => (
                  <li key={title} className="bg-[#102331] p-5">
                    <div className="flex items-start gap-3">
                      <Check />
                      <div>
                        <h3 className="font-semibold">{title}</h3>
                        <p className="mt-2 text-sm leading-6 text-slate-300">{text}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <div className="max-w-2xl">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-red-800">Mobil vorbereitet</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.035em] text-slate-950 sm:text-4xl">Vom Handy zur sauberen Datei.</h2>
              </div>
              <Link href={ctaHref} className="inline-flex items-center gap-2 self-start border-b-2 border-red-700 pb-1 text-sm font-semibold text-slate-900 hover:text-red-800 sm:self-auto">Foto starten <ArrowRight /></Link>
            </div>
            <ol className="mt-9 grid gap-0 border-l border-t border-slate-300 md:grid-cols-4">
              {steps.map(([title, text], index) => (
                <li key={title} className="border-b border-r border-slate-300 bg-[#fcfcfb] p-5 sm:p-6">
                  <span className="font-mono text-xs font-semibold text-red-800">0{index + 1}</span>
                  <h3 className="mt-7 text-lg font-semibold text-slate-950">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-[#f7f8f8] py-14 sm:py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-red-800">Häufige Fragen</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.035em] text-slate-950 sm:text-4xl">Dokumentenfoto Schweiz: FAQ</h2>
            <div className="mt-8 border-t border-slate-300">
              {faqs.map((faq) => (
                <details key={faq.q} className="group border-b border-slate-300 py-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-base font-semibold text-slate-900 marker:content-none">
                    {faq.q}
                    <span className="text-xl font-normal text-red-800 transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="max-w-2xl pt-3 text-sm leading-6 text-slate-600">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-red-700 py-12 text-white sm:py-16">
          <div className="mx-auto flex max-w-6xl flex-col justify-between gap-6 px-4 sm:flex-row sm:items-center sm:px-6 lg:px-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-red-100">Nächster Schritt</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-[-0.025em] sm:text-3xl">Mit einer klaren Aufnahme beginnen.</h2>
            </div>
            <Link href={ctaHref} className="inline-flex items-center justify-center gap-2 border border-white bg-white px-5 py-3 text-sm font-semibold text-red-800 transition-colors hover:bg-red-50">
              Dokumentenfoto vorbereiten <ArrowRight />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
