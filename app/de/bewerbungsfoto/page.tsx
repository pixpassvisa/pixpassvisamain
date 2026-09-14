import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, User, Smile, Lightbulb, Ruler } from "lucide-react";

export const metadata: Metadata = {
  title:
    "Bewerbungsfoto Online Erstellen 2026 | Tipps & Vorschriften | PixPassVisa",
  description:
    "Professionelles Bewerbungsfoto online erstellen: Hintergrund wechseln, zuschneiden, optimieren. Mit offiziellen Tipps für das perfekte Lebenslauf-Foto. Ab 5,99 €.",
  keywords: [
    "bewerbungsfoto",
    "bewerbungsfoto online erstellen",
    "lebenslauf foto",
    "bewerbungsbild tipps",
  ],
  alternates: {
    canonical: "https://www.pixpassvisa.com/de/bewerbungsfoto",
    languages: {
      de: "https://www.pixpassvisa.com/de/bewerbungsfoto",
      "x-default": "https://www.pixpassvisa.com/de/bewerbungsfoto",
    },
  },
  openGraph: {
    title: "Bewerbungsfoto Online Erstellen 2026 | PixPassVisa",
    description:
      "Professionelles Bewerbungsfoto in Sekunden. Hintergrund entfernen, zuschneiden, KI-optimiert. Ab 5,99 €.",
    url: "https://www.pixpassvisa.com/de/bewerbungsfoto",
    siteName: "PixPassVisa",
    locale: "de_DE",
    type: "website",
    images: [
      {
        url: "https://www.pixpassvisa.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Bewerbungsfoto Online Erstellen - PixPassVisa",
      },
    ],
  },
};

const ctaHref = "/de/passbild-online?type=germany-cv";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Welche Größe sollte ein Bewerbungsfoto haben?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Das klassische Format für ein Bewerbungsfoto in Deutschland ist 4,5 × 6 cm (Hochformat). Für digitale Bewerbungen empfehlen Experten ein Seitenverhältnis von 2:3 oder 3:4 bei mindestens 300 dpi.",
          },
        },
        {
          "@type": "Question",
          name: "Ist ein Bewerbungsfoto in Deutschland Pflicht?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Nein. Das Allgemeine Gleichbehandlungsgesetz (AGG) verlangt kein Pflichtfoto. Trotzdem fügen viele Bewerber freiwillig ein professionelles Foto bei, da es in Deutschland weit verbreitet bleibt.",
          },
        },
        {
          "@type": "Question",
          name: "Was ist der Unterschied zwischen Passbild und Bewerbungsfoto?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Ein biometrisches Passbild (35×45 mm) folgt strengen staatlichen Normen: neutraler Ausdruck, hellgrauer Hintergrund, kein Lächeln. Ein Bewerbungsfoto erlaubt mehr Freiheit: leichtes Lächeln, professionelle Kleidung, freie Hintergrundwahl. PixPassVisa unterstützt beide Formate.",
          },
        },
      ],
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
          name: "Bewerbungsfoto",
          item: "https://www.pixpassvisa.com/de/bewerbungsfoto",
        },
      ],
    },
  ],
};

const tips = [
  {
    icon: User,
    title: "Kleidung und Erscheinungsbild",
    points: [
      "Wählen Sie Kleidung, die zur angestrebten Branche passt: Hemd oder Bluse für klassische Berufe, ein legerer, aber gepflegter Look für Kreativbranchen.",
      "Dezente Farben wie Dunkelblau, Grau oder Anthrazit wirken professionell und zeitlos.",
      "Vermeiden Sie auffällige Muster, Logos oder grelle Farben, denn sie lenken vom Gesicht ab.",
      "Halten Sie Schmuck dezent und tragen Sie höchstens ein auffälliges Accessoire.",
    ],
  },
  {
    icon: Smile,
    title: "Mimik und Ausdruck",
    points: [
      "Ein offenes, natürliches Lächeln wirkt sympathisch — anders als beim biometrischen Passbild ist es hier ausdrücklich erwünscht.",
      "Ein direkter Blick in die Kamera signalisiert Selbstbewusstsein.",
      "Entspannte Schultern und ein leicht nach vorne geneigter Kopf wirken einladend.",
      "Machen Sie mehrere Aufnahmen und wählen Sie das natürlichste Bild aus.",
    ],
  },
  {
    icon: Lightbulb,
    title: "Licht und Hintergrund",
    points: [
      "Nutzen Sie tagsüber natürliches Licht von der Seite oder schräg von vorne.",
      "Vermeiden Sie Gegenlicht und harte Schatten im Gesicht.",
      "PixPassVisa ersetzt den Hintergrund automatisch durch professionelles Neutralgrau oder Weiß.",
      "Ein unaufgeräumter oder farbiger Hintergrund lässt die Bewerbung schnell unprofessionell wirken.",
    ],
  },
  {
    icon: Ruler,
    title: "Format und Technik",
    points: [
      "Das Standardformat in Deutschland beträgt 4,5 × 6 cm im Hochformat, der Kopf sitzt mittig im oberen Bildbereich.",
      "Für digitale Bewerbungen gilt: mindestens 300 dpi, Seitenverhältnis 2:3 oder 3:4.",
      "Halten Sie die Dateigröße für E-Mail-Bewerbungen idealerweise unter 500 kB im JPG- oder PNG-Format.",
      "PixPassVisa liefert druckfertiges und digitales Format gleichzeitig.",
    ],
  },
];

const comparisonRows = [
  {
    param: "Format",
    passbild: "35 × 45 mm",
    bewerbung: "4,5 × 6 cm (oder individuell)",
  },
  {
    param: "Hintergrund",
    passbild: "Einfarbig hellgrau (Pflicht)",
    bewerbung: "Neutral: Grau, Weiß, dezentes Blau",
  },
  {
    param: "Gesichtsausdruck",
    passbild: "Neutral, Mund geschlossen",
    bewerbung: "Leichtes, natürliches Lächeln empfohlen",
  },
  {
    param: "Retusche",
    passbild: "Keine Retusche erlaubt",
    bewerbung: "Dezente Nachbearbeitung erlaubt",
  },
  {
    param: "Auflösung",
    passbild: "Mindestens 600 dpi",
    bewerbung: "Mindestens 300 dpi",
  },
  {
    param: "Rechtliche Pflicht",
    passbild: "Ja, laut Passverordnung",
    bewerbung: "Nein, laut AGG",
  },
  {
    param: "Aktualität",
    passbild: "Nicht älter als 6 Monate",
    bewerbung: "Nicht älter als 2 Jahre empfohlen",
  },
];

const faqItems = [
  {
    q: "Welche Größe sollte ein Bewerbungsfoto haben?",
    a: "Das klassische Format in Deutschland ist 4,5 × 6 cm im Hochformat. Für digitale Bewerbungen empfehlen Karriereexperten ein Seitenverhältnis von 2:3 oder 3:4 bei mindestens 300 dpi. PixPassVisa liefert automatisch das optimale Format für Print und digitale Bewerbungsportale.",
  },
  {
    q: "Ist ein Bewerbungsfoto in Deutschland Pflicht?",
    a: "Nein. Das Allgemeine Gleichbehandlungsgesetz (AGG) schreibt kein Pflichtfoto vor, und Arbeitgeber dürfen offiziell auch kein Foto verlangen. Trotzdem bleibt das Beifügen eines Fotos in Deutschland weit verbreitet und kann den ersten Eindruck positiv beeinflussen. Für internationale Bewerbungen, etwa in den USA oder Großbritannien, raten Experten eher davon ab.",
  },
  {
    q: "Was ist der Unterschied zwischen Passbild und Bewerbungsfoto?",
    a: "Ein biometrisches Passbild im Format 35 × 45 mm muss strengen staatlichen Normen genügen: neutraler Ausdruck, hellgrauer Hintergrund, kein Lächeln, keine Retusche. Ein Bewerbungsfoto erlaubt deutlich mehr Freiheit: natürliches Lächeln, professionelle Kleidung, dezente Nachbearbeitung und individuelle Hintergrundwahl. PixPassVisa unterstützt beide Formate — wählen Sie einfach den passenden Dokumenttyp.",
  },
  {
    q: "Kann ich ein Selfie als Bewerbungsfoto verwenden?",
    a: "Grundsätzlich ja, solange das Ergebnis professionell wirkt. Mit PixPassVisa laden Sie Ihr Selfie hoch, und unsere KI optimiert Beleuchtung, entfernt den Hintergrund und schneidet das Bild auf das korrekte Bewerbungsformat zu. Für Führungspositionen empfiehlt sich jedoch ein echtes Fotoshooting.",
  },
  {
    q: "Welcher Hintergrund eignet sich am besten für ein Bewerbungsfoto?",
    a: "Ein neutraler, einfarbiger Hintergrund in Hellgrau, Weiß oder dezentem Blau gilt als professionell und zeitlos. Ein bunter, unruhiger oder gemusterter Hintergrund wirkt schnell unprofessionell. PixPassVisa tauscht Ihren Hintergrund automatisch aus.",
  },
  {
    q: "Wie alt darf ein Bewerbungsfoto sein?",
    a: "Experten empfehlen, ein Bewerbungsfoto nicht älter als zwei Jahre zu verwenden, damit es Ihr aktuelles Erscheinungsbild widerspiegelt. Hat sich Ihr Aussehen stark verändert, etwa durch Frisur, Gewicht oder eine neue Brille, sollten Sie unbedingt ein neues Foto machen lassen.",
  },
];

export default function BewerbungsfotoPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className=" text-slate-900 antialiased">
        {/* HERO */}
        <section className="px-4 pt-6 sm:px-8 sm:pt-10">
          <div className="mx-auto max-w-6xl overflow-hidden rounded-2xl">
            <Image
              src="/photo_officielle passeport.jpg"
              alt="Professionelles Bewerbungsfoto online erstellen mit PixPassVisa"
              width={1440}
              height={620}
              priority
              className="h-auto w-full"
            />
          </div>
          <div className="mx-auto max-w-6xl">
            <div className="py-10 sm:py-16">
              <p className="mb-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-700">
                <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-blue-600" />
                Bewerbungsfoto — Professionell, schnell, online
              </p>
              <h1 className="mb-5 max-w-3xl text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                Professionelles{" "}
                <span className="text-blue-600">Bewerbungsfoto</span> online
                erstellen
              </h1>
              <p className="mb-7 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
                Überzeugen Sie beim ersten Eindruck. Laden Sie Ihr Selfie hoch —
                PixPassVisa optimiert die Beleuchtung, entfernt den Hintergrund
                und schneidet Ihr Foto perfekt für den Lebenslauf zu. In
                Sekunden, ab 5,99 €.
              </p>
              <ul className="mb-8 flex flex-wrap gap-2">
                {[
                  "Hintergrund automatisch entfernt",
                  "Format 4,5 × 6 cm (Print) + digital",
                  "KI-Bildoptimierung",
                  "DSGVO-konform",
                  "Ab 5,99 €",
                ].map((p) => (
                  <li
                    key={p}
                    className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50/70 px-3.5 py-1 text-xs font-semibold text-blue-700"
                  >
                    <Check className="w-3.5 h-3.5 text-blue-600 mr-1.5 shrink-0" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={ctaHref}
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-8 py-4 text-base font-bold text-white shadow-lg shadow-blue-500/20/30 transition hover:-translate-y-0.5 hover:bg-blue-700"
              >
                Bewerbungsfoto erstellen <ArrowRight />
              </Link>
            </div>
          </div>
        </section>

        {/* STATS BAND */}
        <div className="bg-slate-900 py-6">
          <div className="mx-auto flex max-w-6xl flex-wrap justify-around gap-4 px-4 sm:px-8">
            {[
              { v: "17.000+", l: "Zufriedene Nutzer" },
              { v: "4,9 / 5", l: "Verifizierte Bewertung" },
              { v: "< 60 s", l: "Bearbeitungszeit" },
              { v: "2-in-1", l: "Print & Digital" },
              { v: "5,99 €", l: "Startpreis" },
            ].map((s) => (
              <div className="text-center" key={s.v}>
                <span className="block text-xl font-extrabold text-cyan-400 sm:text-2xl">
                  {s.v}
                </span>
                <span className="mt-1 block text-[11px] font-medium uppercase tracking-wide text-white/50">
                  {s.l}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* TIPS SECTION */}
        <section
          className="px-4 py-16 sm:px-8 sm:py-24"
          aria-labelledby="tips-h2"
        >
          <div className="mx-auto max-w-6xl">
            <header className="mb-12">
              <span className="mb-5 inline-block rounded-full border border-blue-200 bg-blue-50/70 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-blue-700">
                Experten-Tipps
              </span>
              <h2
                id="tips-h2"
                className="mb-4 max-w-2xl text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl"
              >
                Das perfekte Bewerbungsfoto: So gelingt der erste Eindruck
              </h2>
              <p className="max-w-xl text-base leading-relaxed text-slate-500 sm:text-lg">
                Diese Empfehlungen basieren auf aktuellen
                Karriereberatungs-Standards und der Praxis deutscher
                HR-Abteilungen. Ein gutes Bewerbungsfoto erhöht Ihre Chancen
                messbar.
              </p>
            </header>

            <div className="grid gap-6 sm:grid-cols-2">
              {tips.map((t) => {
                const Icon = t.icon;
                return (
                  <article
                    key={t.title}
                    className="rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-7"
                  >
                    <div className="mb-4 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="text-lg font-extrabold">{t.title}</h3>
                    </div>
                    <ul className="flex flex-col gap-2.5">
                      {t.points.map((p) => (
                        <li
                          key={p}
                          className="relative pl-6 text-sm leading-relaxed text-slate-600"
                        >
                          <Check className="absolute left-0 top-0.5 w-4 h-4 text-emerald-600" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* COMPARISON TABLE */}
        <section
          className="border-y border-slate-200 bg-slate-50 px-4 py-16 sm:px-8 sm:py-24"
          aria-labelledby="compare-h2"
        >
          <div className="mx-auto max-w-3xl">
            <header className="mb-10">
              <span className="mb-5 inline-block rounded-full border border-blue-200 bg-blue-50/70 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-blue-700">
                Vergleich
              </span>
              <h2
                id="compare-h2"
                className="mb-4 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl"
              >
                Bewerbungsfoto oder biometrisches Passbild?
              </h2>
              <p className="text-base leading-relaxed text-slate-500 sm:text-lg">
                Beide Fotoarten folgen unterschiedlichen Anforderungen.
                PixPassVisa unterstützt beide — wählen Sie einfach den richtigen
                Dokumenttyp.
              </p>
            </header>

            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table
                className="w-full border-collapse bg-white text-sm"
                aria-label="Vergleich Bewerbungsfoto vs Passbild"
              >
                <thead className="bg-slate-900 text-white">
                  <tr>
                    <th className="px-4 py-3.5 text-left text-xs font-bold uppercase tracking-wide">
                      Kriterium
                    </th>
                    <th className="px-4 py-3.5 text-left text-xs font-bold uppercase tracking-wide">
                      Passbild
                    </th>
                    <th className="px-4 py-3.5 text-left text-xs font-bold uppercase tracking-wide">
                      Bewerbungsfoto
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((r) => (
                    <tr
                      key={r.param}
                      className="border-b border-slate-200 last:border-0 hover:bg-slate-50"
                    >
                      <td className="px-4 py-3 font-semibold">{r.param}</td>
                      <td className="px-4 py-3 text-slate-600">{r.passbild}</td>
                      <td className="px-4 py-3 text-slate-600">
                        {r.bewerbung}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* SEO PROSE BLOCK */}
        <section
          className="px-4 py-16 sm:px-8 sm:py-24"
          aria-labelledby="seo-h2"
        >
          <div className="mx-auto max-w-3xl">
            <h2
              id="seo-h2"
              className="mb-5 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl"
            >
              Bewerbungsfoto in Deutschland: Was HR-Experten wirklich sagen
            </h2>
            <p className="mb-4 text-base leading-relaxed text-slate-600">
              Anders als in englischsprachigen Ländern bleibt das Bewerbungsfoto
              in Deutschland ein fester Bestandteil vieler Bewerbungsunterlagen.
              Umfragen unter deutschen Personalverantwortlichen zeigen: Über 70
              % der Recruiter bevorzugen Bewerbungen mit professionellem Foto,
              besonders bei Stellen mit Kundenkontakt oder
              Führungsverantwortung. Ein gut gewähltes Foto vermittelt
              Seriosität, noch bevor der Personaler den Lebenslauf liest.
            </p>
            <p className="mb-4 text-base leading-relaxed text-slate-600">
              Gleichzeitig verändert sich die Erwartungshaltung: Start-ups und
              internationale Konzerne legen zunehmend Wert auf Chancengleichheit
              und verzichten bewusst auf das Foto im Auswahlprozess. Bewerber
              sollten deshalb genau hinschauen, welche Kultur im jeweiligen
              Unternehmen herrscht.
            </p>

            <h3 className="mb-3 mt-8 text-xl font-bold">
              Das AGG und Bewerbungsfotos
            </h3>
            <p className="mb-4 text-base leading-relaxed text-slate-600">
              Das{" "}
              <strong className="font-semibold text-slate-900">
                Allgemeine Gleichbehandlungsgesetz (AGG)
              </strong>{" "}
              schützt Bewerberinnen und Bewerber vor Diskriminierung aufgrund
              von Geschlecht, Herkunft, Alter oder Religion. Arbeitgeber dürfen
              daher offiziell kein Foto im Bewerbungsprozess verlangen. In der
              Praxis hat sich jedoch eine kulturelle Norm etabliert: Das
              freiwillige Beifügen eines professionellen Fotos wird in vielen
              Branchen weiterhin positiv wahrgenommen.
            </p>

            <h3 className="mb-3 mt-8 text-xl font-bold">
              Wann Sie auf ein Foto verzichten sollten
            </h3>
            <ul className="mb-4 flex flex-col gap-2.5">
              {[
                <>
                  <strong className="font-semibold text-slate-900">
                    Internationale Unternehmen:
                  </strong>{" "}
                  Viele globale Firmen mit Sitz in Deutschland setzen auf
                  Blind-Recruiting und wünschen kein Foto.
                </>,
                <>
                  <strong className="font-semibold text-slate-900">
                    US- oder UK-Bewerbungen:
                  </strong>{" "}
                  Hier gilt ein Foto als unüblich und kann sogar zur Ablehnung
                  führen.
                </>,
                <>
                  <strong className="font-semibold text-slate-900">
                    Portale ohne Foto-Feld:
                  </strong>{" "}
                  Erzwingen Sie kein Foto, wenn das Formular keinen Upload
                  vorsieht.
                </>,
                <>
                  <strong className="font-semibold text-slate-900">
                    Explizite Ausschreibung ohne Foto:
                  </strong>{" "}
                  Respektieren Sie den ausdrücklichen Wunsch des Arbeitgebers.
                </>,
              ].map((item, i) => (
                <li
                  key={i}
                  className="relative pl-6 text-sm leading-relaxed text-slate-600"
                >
                  <Check className="absolute left-0 top-0.5 w-4 h-4 text-emerald-600" />
                  {item}
                </li>
              ))}
            </ul>

            <h3 className="mb-3 mt-8 text-xl font-bold">
              Digitales Bewerbungsfoto für die E-Mail-Bewerbung
            </h3>
            <p className="text-base leading-relaxed text-slate-600">
              Für E-Mail-Bewerbungen und Online-Portale gelten besondere
              technische Anforderungen. Liefern Sie das Foto als separate Datei
              im Format JPG oder PNG mit maximal 500 kB, oder betten Sie es
              direkt in den Lebenslauf ein. Zu große Dateien blockieren manche
              E-Mail-Server. PixPassVisa liefert Ihr Bewerbungsfoto automatisch
              in optimierter Auflösung für beide Verwendungszwecke.
            </p>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section
          className="border-y border-slate-200 bg-slate-50 px-4 py-16 sm:px-8 sm:py-24"
          aria-labelledby="how-h2"
        >
          <div className="mx-auto max-w-6xl">
            <header className="mb-12">
              <span className="mb-5 inline-block rounded-full border border-blue-200 bg-blue-50/70 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-blue-700">
                So funktioniert es
              </span>
              <h2
                id="how-h2"
                className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl"
              >
                In drei Schritten zum professionellen Bewerbungsfoto
              </h2>
            </header>
            <ol className="mb-10 grid gap-6 sm:grid-cols-3">
              {[
                {
                  n: "01",
                  title: "Selfie oder Foto hochladen",
                  desc: "Laden Sie ein vorhandenes Foto hoch oder machen Sie direkt ein Selfie mit Ihrem Smartphone. Sie benötigen kein professionelles Equipment.",
                },
                {
                  n: "02",
                  title: "KI optimiert und tauscht den Hintergrund",
                  desc: "Unsere KI entfernt den Hintergrund, optimiert Beleuchtung und Schärfe und schneidet das Bild auf das perfekte Bewerbungsformat zu.",
                },
                {
                  n: "03",
                  title: "Download für Print und digital",
                  desc: "Sie erhalten Ihr Foto im druckfertigen Format 4,5 × 6 cm und als optimierte Digitaldatei für Online-Bewerbungen.",
                },
              ].map((s) => (
                <li
                  key={s.n}
                  className="rounded-2xl border border-slate-200 bg-white p-7"
                >
                  <span className="mb-4 inline-block rounded-md bg-blue-50/70 px-2 py-1 text-[11px] font-extrabold uppercase tracking-wide text-blue-700">
                    Schritt {s.n}
                  </span>
                  <h3 className="mb-2.5 text-lg font-extrabold">{s.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-500">
                    {s.desc}
                  </p>
                </li>
              ))}
            </ol>
            <Link
              href={ctaHref}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-500/20/30 transition hover:-translate-y-0.5 hover:bg-blue-700"
            >
              Jetzt Bewerbungsfoto erstellen <ArrowRight />
            </Link>
          </div>
        </section>

        {/* FAQ */}
        <section
          className="px-4 py-16 sm:px-8 sm:py-24"
          aria-labelledby="faq-h2"
        >
          <div className="mx-auto max-w-3xl">
            <header className="mb-12">
              <span className="mb-5 inline-block rounded-full border border-blue-200 bg-blue-50/70 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-blue-700">
                FAQ
              </span>
              <h2
                id="faq-h2"
                className="mb-4 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl"
              >
                Häufige Fragen zum Bewerbungsfoto
              </h2>
              <p className="text-base leading-relaxed text-slate-500 sm:text-lg">
                Alles, was Sie über Bewerbungsfotos in Deutschland wissen
                müssen.
              </p>
            </header>
            <div className="flex flex-col gap-3">
              {faqItems.map((f, i) => (
                <details
                  key={i}
                  className="group rounded-xl border border-slate-200 bg-white"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-6 py-5 text-base font-bold transition hover:bg-slate-50">
                    <span>{f.q}</span>
                    <span className="shrink-0 text-xl text-blue-600 transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="border-t border-slate-200 px-6 py-5 text-sm leading-relaxed text-slate-500">
                    {f.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* BOTTOM CTA */}
        <section
          className="bg-slate-900 px-4 py-20 text-center text-white sm:px-8 sm:py-28"
          aria-labelledby="bottom-h2"
        >
          <div className="mx-auto max-w-2xl">
            <span className="mb-4 inline-block text-xs font-extrabold uppercase tracking-widest text-cyan-400">
              Bereit für Ihre nächste Bewerbung?
            </span>
            <h2
              id="bottom-h2"
              className="mb-6 text-4xl font-black leading-tight tracking-tight sm:text-5xl"
            >
              Ihr professionelles Bewerbungsfoto{" "}
              <span className="text-cyan-400">in 60 Sekunden</span>
            </h2>
            <p className="mx-auto mb-10 max-w-lg text-lg leading-relaxed text-white/70">
              Kein Fotostudio, keine Wartezeit. Laden Sie Ihr Foto hoch, die KI
              optimiert alles — druckfertig und digital, ab 5,99 €.
            </p>
            <Link
              href={ctaHref}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-8 py-4 text-base font-bold text-white shadow-lg shadow-blue-500/20/30 transition hover:-translate-y-0.5 hover:bg-blue-700"
            >
              Bewerbungsfoto erstellen <ArrowRight />
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
