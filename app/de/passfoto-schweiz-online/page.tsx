import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import passportPhotoHero from "./schweizer-passfoto-beispiel.png";

const ctaHref = "/de/passbild-online?type=switzerland-passport";

export const metadata: Metadata = {
  title: "Passfoto Schweiz: Format, Anforderungen & online vorbereiten",
  description:
    "Passfoto Schweiz vorbereiten: 35 × 45 mm, biometrische Anforderungen und praktische Tipps für ein Schweizer Passfoto mit dem Smartphone.",
  alternates: {
    canonical: "https://www.pixpassvisa.com/de/passfoto-schweiz-online",
    languages: {
      de: "https://www.pixpassvisa.com/de/passfoto-schweiz-online",
      "de-CH": "https://www.pixpassvisa.com/de/passfoto-schweiz-online",
      "x-default": "https://www.pixpassvisa.com/de/passfoto-schweiz-online",
    },
  },
  openGraph: {
    title: "Passfoto Schweiz: Format & Anforderungen",
    description:
      "35 × 45 mm, 29–34 mm Gesichtshöhe und die wichtigsten Aufnahmehinweise für Schweizer Passfotos.",
    url: "https://www.pixpassvisa.com/de/passfoto-schweiz-online",
    locale: "de_CH",
    type: "website",
    images: [
      {
        url: "/de/passfoto-schweiz-online/schweizer-passfoto-beispiel.png",
        width: 1024,
        height: 1536,
        alt: "Beispiel eines hell und gleichmässig ausgeleuchteten Schweizer Passfotos",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Passfoto Schweiz: Format & Anforderungen",
    description:
      "Die wichtigsten Anforderungen für ein Schweizer Passfoto, einfach erklärt.",
    images: ["/de/passfoto-schweiz-online/schweizer-passfoto-beispiel.png"],
  },
};

const specifications = [
  ["Format", "35 × 45 mm", "Hochformat und ohne Rand"],
  ["Gesichtshöhe", "29–34 mm", "Von Kinn bis Schädeldecke"],
  ["Hintergrund", "Neutral", "Einfarbig und ohne Schatten"],
  ["Alter des Fotos", "Max. 1 Jahr", "Soll das aktuelle Aussehen zeigen"],
];

const requirements = [
  {
    title: "Gerade & frontal",
    text: "Schultern und Kopf stehen gerade. Blicken Sie direkt in die Kamera; beide Augen sind offen und auf gleicher Höhe sichtbar.",
  },
  {
    title: "Neutraler Ausdruck",
    text: "Der Mund bleibt geschlossen. Ein natürlicher, ruhiger Ausdruck hilft, die Gesichtsmerkmale klar erkennbar zu halten.",
  },
  {
    title: "Gleichmässiges Licht",
    text: "Vermeiden Sie Schatten im Gesicht und auf dem Hintergrund, Hautreflexionen sowie rote Augen. Weiches Licht von vorne ist ideal.",
  },
  {
    title: "Scharf & unverfälscht",
    text: "Nutzen Sie das hochauflösende Original ohne Filter. Das Foto muss scharf, kontrastreich und frei von sichtbarer Pixelstruktur sein.",
  },
  {
    title: "Augen frei sichtbar",
    text: "Haare oder Accessoires dürfen die Augen nicht verdecken. Bei Brillen dürfen Fassung und Spiegelung die Augen nicht beeinträchtigen.",
  },
  {
    title: "Ruhiger Hintergrund",
    text: "Wählen Sie einen einfarbigen, neutralen Hintergrund mit klarer Trennung zwischen Kopf und Hintergrund – ohne Gegenstände oder Muster.",
  },
];

const steps = [
  ["Kamera aufstellen", "Stellen Sie das Handy auf Augenhöhe. Für eine natürliche Perspektive eignet sich ein Stativ oder eine zweite Person besser als ein nahes Selfie."],
  ["Ruhig positionieren", "Treten Sie mit etwas Abstand vor eine helle, ungemusterte Wand. Lassen Sie oberhalb des Kopfes und um die Schultern genug Platz."],
  ["Bei weichem Licht aufnehmen", "Nutzen Sie Licht von vorne und prüfen Sie die Aufnahme auf harte Schatten, Spiegelungen und Unschärfe."],
  ["Format prüfen", "Bereiten Sie das Originalfoto im gewünschten Seitenverhältnis vor und vergleichen Sie es vor der Einreichung mit den zuständigen Vorgaben."],
];

const faqs = [
  {
    q: "Wie gross muss ein Passfoto in der Schweiz sein?",
    a: "Für Schweizer Pässe und Identitätskarten beträgt das Fotoformat 35 × 45 mm ohne Rand. Die Gesichtshöhe von der Kinnspitze bis zur Schädeldecke liegt bei Erwachsenen zwischen 29 und 34 mm. Für Kinder gelten teils abweichende Werte.",
  },
  {
    q: "Kann ich das Schweizer Passfoto online vorbereiten?",
    a: "Sie können eine geeignete Datei online aus einem sauberen Originalfoto vorbereiten. Ob ein eigenes Foto für Ihren Antrag akzeptiert wird, hängt jedoch von Dokument und Kanton ab. Bei biometrischen Terminen wird das Foto häufig vor Ort erfasst.",
  },
  {
    q: "Welcher Hintergrund ist für ein Schweizer Passfoto geeignet?",
    a: "Der Hintergrund soll einfarbig, einheitlich und neutral sein. Er darf keine Schatten oder Gegenstände enthalten und muss sich klar von Kopf und Haaren abheben.",
  },
  {
    q: "Darf ich auf dem Schweizer Passfoto eine Brille tragen?",
    a: "Die Augen müssen vollständig sichtbar sein. Die Fassung darf sie nicht verdecken und die Gläser dürfen nicht spiegeln; getönte Gläser und Sonnenbrillen sind nicht zulässig. Bei Unsicherheit ist ein Foto ohne Brille meist die unkompliziertere Wahl.",
  },
  {
    q: "Wie aktuell muss das Passfoto sein?",
    a: "Die fedpol-Fotomustertafel nennt ein Höchstalter von einem Jahr. Praktisch sollte das Foto Ihr aktuelles Erscheinungsbild eindeutig zeigen.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      name: "Passfoto Schweiz: Format, Anforderungen & online vorbereiten",
      description:
        "Leitfaden zu Format und Fotoanforderungen für Schweizer Passfotos.",
      inLanguage: "de-CH",
      url: "https://www.pixpassvisa.com/de/passfoto-schweiz-online",
      primaryImageOfPage: {
        "@type": "ImageObject",
        contentUrl: "https://www.pixpassvisa.com/de/passfoto-schweiz-online/schweizer-passfoto-beispiel.png",
        caption: "Beispiel eines neutral ausgeleuchteten Schweizer Passfotos",
      },
    },
    {
      "@type": "HowTo",
      name: "Schweizer Passfoto mit dem Smartphone vorbereiten",
      description:
        "Vier Schritte für eine geeignete Ausgangsaufnahme vor der Prüfung durch die zuständige Stelle.",
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
        { "@type": "ListItem", position: 2, name: "Passfoto Schweiz", item: "https://www.pixpassvisa.com/de/passfoto-schweiz-online" },
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

function Tick() {
  return (
    <svg aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-red-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="m5 12 4 4L19 6" />
    </svg>
  );
}

export default function PassfotoSchweizPage() {
  return (
    <div className="bg-[#fcfcfb] text-slate-950 selection:bg-red-100 selection:text-red-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <header className="border-b border-slate-200 bg-white">
        <div className="h-1 bg-red-700" />
        <div className="mx-auto max-w-6xl px-4 pb-12 pt-5 sm:px-6 sm:pb-16 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-9 text-xs text-slate-500">
            <Link href="/de" className="hover:text-red-800">Startseite</Link>
            <span className="mx-2 text-slate-300">/</span>
            <span>Passfoto Schweiz</span>
          </nav>

          <div className="grid items-center gap-10 lg:grid-cols-[1.07fr_.93fr] lg:gap-16">
            <div>
              <p className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-red-800">
                <span className="h-2 w-2 bg-red-700" /> Schweizer Passfoto-Guide
              </p>
              <h1 className="max-w-3xl text-4xl font-semibold leading-[1.04] tracking-[-0.045em] text-slate-950 sm:text-5xl lg:text-6xl">
                Passfoto Schweiz: richtiges Format, klarer Ablauf.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
                Die wichtigsten Anforderungen für ein Schweizer Passfoto – <strong className="font-semibold text-slate-900">35 × 45 mm, frontal, scharf und neutral ausgeleuchtet</strong>. Bereiten Sie eine saubere Ausgangsaufnahme vor und prüfen Sie den Einreichungsweg bei Ihrer kantonalen Stelle.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link href={ctaHref} className="inline-flex items-center justify-center gap-2 bg-red-700 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-800">
                  Passfoto vorbereiten <ArrowRight />
                </Link>
                <Link href="#anforderungen" className="inline-flex items-center justify-center border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 transition-colors hover:border-slate-900">
                  Anforderungen ansehen
                </Link>
              </div>

              <p className="mt-6 max-w-xl border-l-2 border-red-700 pl-4 text-sm leading-6 text-slate-600">
                Wichtig: Bei vielen biometrischen Pass-Terminen wird das Foto vor Ort aufgenommen. Eigene Fotos werden je nach Kanton und Dokument unterschiedlich behandelt.
              </p>
            </div>

            <figure className="mx-auto w-full max-w-sm border border-slate-300 bg-[#f3f5f5] p-3 sm:p-4">
              <div className="flex items-center justify-between border-b border-slate-300 pb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-600">
                <span>Passfoto-Beispiel</span>
                <span>35 × 45 mm</span>
              </div>
              <div className="relative mt-3 aspect-[35/45] overflow-hidden border border-slate-300 bg-slate-200">
                <Image
                  src='https://res.cloudinary.com/dipzpwbbk/image/upload/v1789271146/schweizer-passfoto-beispiel_car52l.webp'
                  alt="Beispiel eines Schweizer Passfotos mit gleichmässigem Licht und hellem Hintergrund"
                  fill
                  priority
                  sizes="(max-width: 640px) 88vw, (max-width: 1024px) 360px, 420px"
                  className="object-cover"
                />
                <span className="absolute left-2 top-2 border border-white/80 bg-white/90 px-2 py-1 font-mono text-[10px] font-semibold text-slate-700">35 × 45 mm</span>
                <span className="absolute bottom-2 right-2 border border-white/80 bg-white/90 px-2 py-1 text-[10px] font-semibold text-slate-700">gleichmässiges Licht</span>
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
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-red-800">Die Masse im Überblick</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.035em] text-slate-950 sm:text-4xl">Was Ihr Passfoto erfüllen muss.</h2>
              </div>
              <p className="border-l-2 border-red-700 pl-5 text-base leading-7 text-slate-700 sm:text-lg">Die Schweizer Fotomustertafel definiert Format, Grösse des Gesichts und die grundlegende Bildqualität. Bei Kindern sowie bei medizinischen oder religiösen Ausnahmen können besondere Regeln gelten.</p>
            </div>
            <dl className="mt-9 grid border-l border-t border-slate-300 sm:grid-cols-2 lg:grid-cols-4">
              {specifications.map(([label, value, detail]) => (
                <div key={label} className="border-b border-r border-slate-300 bg-white p-5">
                  <dt className="text-xs font-bold uppercase tracking-[0.14em] text-red-800">{label}</dt>
                  <dd className="mt-5 text-xl font-semibold tracking-[-0.02em] text-slate-950">{value}</dd>
                  <p className="mt-2 text-sm text-slate-600">{detail}</p>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section id="anforderungen" className="py-14 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-red-800">Biometrische Anforderungen</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.035em] text-slate-950 sm:text-4xl">Sechs Merkmale eines guten Ausgangsfotos.</h2>
              <p className="mt-4 text-base leading-7 text-slate-600">Diese Punkte helfen bei der Aufnahme zu Hause. Die zuständige Behörde entscheidet abschliessend über die Annahme.</p>
            </div>
            <div className="mt-9 grid border-l border-t border-slate-300 md:grid-cols-2 lg:grid-cols-3">
              {requirements.map((requirement, index) => (
                <article key={requirement.title} className="border-b border-r border-slate-300 bg-white p-5 sm:p-6">
                  <span className="font-mono text-xs font-semibold text-red-800">0{index + 1}</span>
                  <h3 className="mt-7 text-xl font-semibold tracking-[-0.02em] text-slate-950">{requirement.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{requirement.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-[#102331] py-14 text-white sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-[.72fr_1.28fr]">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-red-300">Mit dem Smartphone</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">In vier Schritten zur passenden Aufnahme.</h2>
                <p className="mt-4 max-w-md text-sm leading-6 text-slate-300">Ein einfacher Ablauf für zu Hause – ohne kompliziertes Setup und ohne das Original vorab zu verändern.</p>
              </div>
              <ol className="grid gap-px border border-slate-600 bg-slate-600 sm:grid-cols-2">
                {steps.map(([title, text], index) => (
                  <li key={title} className="bg-[#102331] p-5">
                    <div className="flex items-start gap-3">
                      <span className="font-mono text-xs font-semibold text-red-300">0{index + 1}</span>
                      <div>
                        <h3 className="font-semibold">{title}</h3>
                        <p className="mt-2 text-sm leading-6 text-slate-300">{text}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-20">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[.8fr_1.2fr] lg:px-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-red-800">Für die Einreichung</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.035em] text-slate-950 sm:text-4xl">Vor dem Termin prüfen.</h2>
              <p className="mt-4 text-base leading-7 text-slate-600">Speichern Sie Ihre Originaldatei. Prüfen Sie danach, ob Ihre Behörde einen Ausdruck, eine digitale Datei oder die Aufnahme vor Ort verlangt.</p>
              <Link href="/de/dokumentenfoto-schweiz" className="mt-6 inline-flex items-center gap-2 border-b-2 border-red-700 pb-1 text-sm font-semibold text-slate-900 hover:text-red-800">Guide für weitere Dokumentenfotos <ArrowRight /></Link>
            </div>
            <ul className="border-y border-slate-300">
              <li className="flex gap-3 border-b border-slate-300 py-4 text-sm leading-6 text-slate-700"><Tick /> Termin- oder Einreichungshinweise der zuständigen Stelle lesen.</li>
              <li className="flex gap-3 border-b border-slate-300 py-4 text-sm leading-6 text-slate-700"><Tick /> Nur die scharfe Originaldatei verwenden; nicht aus einem Messenger oder Screenshot weiterleiten.</li>
              <li className="flex gap-3 border-b border-slate-300 py-4 text-sm leading-6 text-slate-700"><Tick /> Bei Ausdruck: Papier, Anzahl der Bilder und ungerundete Ecken nach Vorgabe prüfen.</li>
              <li className="flex gap-3 py-4 text-sm leading-6 text-slate-700"><Tick /> Bei Unsicherheit vor dem Termin direkt beim Passbüro oder der Einwohnerstelle nachfragen.</li>
            </ul>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-[#f7f8f8] py-14 sm:py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-red-800">Häufige Fragen</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.035em] text-slate-950 sm:text-4xl">Passfoto Schweiz: FAQ</h2>
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
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-red-100">Starten Sie mit dem Originalfoto</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-[-0.025em] sm:text-3xl">Passfoto online vorbereiten.</h2>
            </div>
            <Link href={ctaHref} className="inline-flex items-center justify-center gap-2 border border-white bg-white px-5 py-3 text-sm font-semibold text-red-800 transition-colors hover:bg-red-50">
              Foto vorbereiten <ArrowRight />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
