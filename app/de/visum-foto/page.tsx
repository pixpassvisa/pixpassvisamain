import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

/* ─── Metadata ─── */
export const metadata: Metadata = {
  title: "Biometrisches Passbild online erstellen – ICAO-konform | PixPassVisa",
  description:
    "Biometrisches Passbild für Reisepass, Personalausweis und ePass online erstellen. KI prüft Größe, Hintergrund und Ausleuchtung nach ICAO-Norm. Fertig in 30 Sekunden.",
  keywords: [
    "biometrisches Passbild",
    "Passbild online erstellen",
    "biometrisches Foto",
    "Passfoto online",
    "Passbild Reisepass",
    "Passbild Personalausweis",
  ],
  alternates: {
    canonical: "https://www.pixpassvisa.com/de/visum-foto",
    languages: {
      en: "https://www.pixpassvisa.com/visa-photo",
      fr: "https://www.pixpassvisa.com/fr/photo-visa",
      de: "https://www.pixpassvisa.com/de/visum-foto",
      "x-default": "https://www.pixpassvisa.com/visa-photo",
    },
  },
  openGraph: {
    title:
      "Biometrisches Passbild online erstellen – ICAO-konform | PixPassVisa",
    description:
      "Biometrisches Passbild für Reisepass, Personalausweis und ePass online erstellen. Fertig in 30 Sekunden.",
    url: "https://www.pixpassvisa.com/de/visum-foto",
    type: "website",
    locale: "de_DE",
  },
};

/* ─── Constants ─── */
const ctaHref = "/de/passbild-online?type=germany-passport";

/* ─── Icons ─── */
const ArrowRight = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M14 5l7 7m0 0l-7 7m7-7H3"
    />
  </svg>
);
const Check = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2.5}
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);
const X = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2.5}
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

/* ─── Data ─── */
const steps = [
  {
    n: "1",
    title: "Foto hochladen",
    desc: "Laden Sie ein aktuelles Selfie oder Porträtfoto hoch. Smartphone-Qualität reicht vollkommen aus.",
  },
  {
    n: "2",
    title: "KI prüft und korrigiert",
    desc: "Die KI kontrolliert Ausleuchtung, Kopfgröße, Mimik und Hintergrund nach ICAO-Norm und korrigiert Abweichungen automatisch.",
  },
  {
    n: "3",
    title: "Foto herunterladen",
    desc: "Sie laden das fertige Passbild direkt herunter oder bestellen den Druckbogen für dm, Rossmann oder CEWE.",
  },
];

const specs = [
  {
    label: "Format",
    value: "35 × 45 mm",
    detail: "Hochformat nach ISO/IEC 19794-5",
  },
  {
    label: "Auflösung",
    value: "min. 600 dpi",
    detail: "Mindestens 600 × 800 Pixel",
  },
  {
    label: "Hintergrund",
    value: "Hellgrau oder Weiß",
    detail: "Einheitlich, ohne Muster oder Schatten",
  },
  {
    label: "Kopfgröße",
    value: "27–36 mm",
    detail: "Scheitel bis Kinn, 70–80 % des Bildausschnitts",
  },
  {
    label: "Augen",
    value: "Geöffnet und sichtbar",
    detail: "Keine Sonnenbrille, keine getönten Gläser",
  },
  {
    label: "Mimik",
    value: "Neutral",
    detail: "Mund geschlossen, keine sichtbaren Zähne",
  },
  {
    label: "Belichtung",
    value: "Gleichmäßig",
    detail: "Kein direkter Blitz, kein Gegenlicht",
  },
  {
    label: "Aktualität",
    value: "Max. 6 Monate",
    detail: "Zeigt Ihr aktuelles Erscheinungsbild",
  },
];

const doList = [
  "Halten Sie eine neutrale Mimik mit geschlossenem Mund.",
  "Blicken Sie frontal in die Kamera, ohne den Kopf zu neigen.",
  "Tragen Sie Kleidung, die sich vom hellen Hintergrund abhebt.",
  "Nutzen Sie Tageslicht oder eine gleichmäßige Innenbeleuchtung.",
  "Verwenden Sie eine aktuelle Aufnahme, die nicht älter als sechs Monate ist.",
];

const dontList = [
  "Vermeiden Sie Sonnenbrillen, getönte Gläser und Kopfbedeckungen.",
  "Vermeiden Sie Schatten im Gesicht oder auf dem Hintergrund.",
  "Vermeiden Sie ein Lächeln oder einen geöffneten Mund.",
  "Vermeiden Sie Filter und nachträgliche Bildbearbeitung.",
  "Vermeiden Sie unscharfe oder verpixelte Aufnahmen.",
];

const useCases = [
  {
    title: "Reisepass",
    desc: "PixPassVisa erfüllt die Vorgaben der Bundesdruckerei für den biometrischen Reisepass. Behörden akzeptieren das Foto ohne Rückfragen.",
  },
  {
    title: "Personalausweis",
    desc: "Da dieselbe ICAO-Norm gilt, nutzen Sie dasselbe Passbild auch für den Personalausweis mit elektronischem Chip.",
  },
  {
    title: "ePass und Visum",
    desc: "Auch der ePass sowie viele Visa-Anträge im Ausland verlangen dieselben internationalen biometrischen Standards.",
  },
  {
    title: "Baby- und Kinderpass",
    desc: "Das System erkennt Babygesichter zuverlässig und passt Zuschnitt sowie Bewertung an die Anforderungen für Kleinkinder an.",
  },
];

const benefits = [
  "Die Bildverarbeitung folgt der aktuellen ICAO-Norm.",
  "Der Hintergrund wechselt automatisch zu Weiß oder Hellgrau.",
  "Die KI schneidet das Bild exakt auf 35 × 45 mm zu.",
  "Belichtung und Kontrast werden automatisch korrigiert.",
  "Sie laden das Ergebnis sofort als JPEG oder druckfertiges PDF herunter.",
  "Sie bestellen wahlweise einen Druckbogen für dm, Rossmann oder CEWE.",
  "Ihre Fotos werden nach der Verarbeitung nicht gespeichert.",
  "Das Tool eignet sich für Babys, Kinder und Erwachsene.",
];

const stats = [
  { val: "35×45 mm", label: "Offizielle Passbildgröße in Deutschland" },
  { val: "< 30 Sek.", label: "Von der Aufnahme bis zum fertigen Foto" },
  { val: "ICAO 9303", label: "Zugrunde liegende internationale Norm" },
  { val: "0", label: "Gespeicherte Fotos nach der Verarbeitung" },
];

const faqs = [
  {
    q: "Was ist ein biometrisches Passbild?",
    a: "Ein biometrisches Passbild ist ein Lichtbild, das den internationalen ICAO-9303-Normen entspricht und die automatische Gesichtserkennung in Ausweisdokumenten mit Chip ermöglicht. Software vergleicht dabei charakteristische Punkte im Gesicht, etwa den Augenabstand oder die Kinnlinie, mit dem gespeicherten Datensatz. Die Norm schreibt deshalb exakte Maße, Kopfgröße, Hintergrundfarbe und eine neutrale Mimik vor.",
  },
  {
    q: "Welche Maße hat ein biometrisches Passbild in Deutschland?",
    a: "Ein biometrisches Passbild misst in Deutschland 35 × 45 mm. Die Kopfgröße vom Scheitel bis zum Kinn liegt zwischen 27 und 36 mm und nimmt etwa 70 bis 80 Prozent der Bildhöhe ein. Der Hintergrund muss hell und gleichmäßig ausgeleuchtet sein, ohne Schatten oder Farbverläufe.",
  },
  {
    q: "Kann ich das Passbild auch für den Personalausweis verwenden?",
    a: "Ja, denn Reisepass und Personalausweis folgen in Deutschland derselben ICAO-Norm. Ein mit PixPassVisa erstelltes Foto eignet sich daher für beide Dokumente, Sie müssen es nicht doppelt anfertigen lassen.",
  },
  {
    q: "Ist ein biometrisches Passbild für ein Baby gültig?",
    a: "Ja, auch Babys benötigen ab der Geburt ein eigenes biometrisches Passbild. Es muss grundsätzlich dieselben Vorgaben erfüllen wie bei Erwachsenen. Kriterien wie Blickrichtung oder Mimik beurteilen Behörden bei Kleinkindern jedoch nachsichtiger, da ein bewusstes Stillhalten kaum möglich ist.",
  },
  {
    q: "Darf ich eine Brille auf dem Passbild tragen?",
    a: "Nein, seit 2017 sind Brillen auf deutschen Passbildern nicht mehr erlaubt. Diese Regel betrifft Sonnenbrillen ebenso wie Korrektionsbrillen, da Reflexionen und Tönungen die biometrische Auswertung des Gesichts stören können. Sie gilt für Reisepass, Personalausweis und ePass gleichermaßen.",
  },
  {
    q: "Wie lange ist ein biometrisches Passbild gültig?",
    a: "Behörden akzeptieren ein Passbild, wenn es nicht älter als sechs Monate ist und Ihr aktuelles Erscheinungsbild zeigt. Da PixPassVisa das Bild digital erstellt, laden Sie es bei Bedarf jederzeit erneut herunter oder erstellen in Sekunden ein neues, aktuelles Foto.",
  },
];

/* ─── JSON-LD structured data ─── */
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

/* ─── Page ─── */
export default function BiometrischesPassbildPage() {
  return (
    <main className="bg-white text-slate-900 antialiased">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ══════════════ HERO ══════════════ */}

      <section aria-labelledby="hero-h1" className="pt-8 md:pt-10">
        <div className="mx-auto max-w-7xl px-3 py-10 sm:px-4 md:py-10 lg:px-6">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
            <div>
              <h1
                id="hero-h1"
                className="max-w-2xl text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl"
              >
                Biometrisches Passbild & Visumfoto online erstellen
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                Erstellen Sie Ihr biometrisches Passbild online in weniger als
                <strong className="text-slate-900"> 30 Sekunden.</strong> Unsere
                KI erstellt ein offizielles Passfoto nach den Vorgaben der
                Bundesdruckerei und der ICAO-Richtlinien – inklusive korrektem
                Hintergrund, 35 × 45 mm Zuschnitt und automatischer
                Qualitätsprüfung für Reisepass, Personalausweis, Visum und
                ePass.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href={ctaHref}
                  className="inline-flex items-center justify-center rounded-lg bg-blue-700 px-8 py-4 text-base font-bold text-white shadow-lg transition hover:bg-blue-800"
                >
                  Passbild jetzt erstellen
                  <ArrowRight />
                </Link>

                <Link
                  href="#anforderungen"
                  className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-8 py-4 text-base font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Offizielle Anforderungen
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
      {/* ══════════════ WAS IST EIN BIOMETRISCHES PASSBILD ══════════════ */}
      <section className="bg-white px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-4 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
            Was ist ein biometrisches Passbild?
          </h2>
          <p className="mb-4 text-base leading-relaxed text-slate-600 sm:text-lg">
            Ein <strong>biometrisches Passbild</strong> unterscheidet sich
            deutlich von einem gewöhnlichen Porträtfoto. Es folgt der
            internationalen ICAO-Norm 9303 und ermöglicht dadurch die
            automatische Gesichtserkennung in modernen Ausweisdokumenten mit
            elektronischem Chip.
          </p>
          <p className="mb-4 text-base leading-relaxed text-slate-600 sm:text-lg">
            In Deutschland gelten diese Vorgaben für alle hoheitlichen
            Dokumente: Reisepass, Personalausweis und ePass. Die Bundesdruckerei
            veröffentlicht konkrete Maßtabellen und Prüfkriterien, an denen sich
            Behörden bei der Annahme von Passbildern strikt orientieren. Schon
            kleine Abweichungen, etwa ein zu dunkler Hintergrund oder eine
            geneigte Kopfhaltung, führen häufig zur Ablehnung des Fotos.
          </p>
          <p className="mb-4 text-base leading-relaxed text-slate-600 sm:text-lg">
            PixPassVisa übernimmt die technische Prüfung automatisch. Die KI
            analysiert Bildgröße, Kopfposition, Belichtung, Hintergrundfarbe und
            Bildschärfe und korrigiert Abweichungen in Echtzeit. Sie benötigen
            weder ein Fotostudio noch einen Termin, denn ein gewöhnliches
            Smartphone-Foto reicht als Ausgangspunkt vollkommen aus.
          </p>
          <p className="text-base leading-relaxed text-slate-600 sm:text-lg">
            Das Ergebnis ist ein druckfertiges, behördlich anerkanntes Foto. Sie
            laden es sofort herunter und reichen es beim Bürgeramt, der
            Meldebehörde oder direkt online bei der Passbeantragung ein.
          </p>
        </div>
      </section>

      {/* ══════════════ 3 SCHRITTE ══════════════ */}
      <section className="border-y-2 border-slate-100 bg-slate-50 px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 text-center sm:mb-12">
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-blue-600">
              So funktioniert es
            </p>
            <h2 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
              Biometrisches Passbild in drei Schritten
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-slate-500">
              Kein Fotostudio nötig. Alles läuft online, direkt am Smartphone
              oder Computer.
            </p>
          </div>

          <ol className="grid list-none gap-6 p-0 sm:grid-cols-3">
            {steps.map((s) => (
              <li
                key={s.n}
                className="flex flex-col gap-3 rounded-2xl border-2 border-slate-200 bg-white p-6 sm:p-7"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-lg font-black text-white">
                  {s.n}
                </span>
                <h3 className="text-lg font-bold text-slate-900">{s.title}</h3>
                <p className="text-sm leading-relaxed text-slate-500">
                  {s.desc}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ══════════════ ANFORDERUNGEN TABELLE ══════════════ */}
      <section id="anforderungen" className="bg-white px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 sm:mb-10">
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-blue-600">
              Offizielle Vorgaben
            </p>
            <h2 className="mb-3 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
              Anforderungen an das biometrische Passbild
            </h2>
            <p className="max-w-2xl leading-relaxed text-slate-500">
              Diese Kriterien entsprechen den aktuellen Vorgaben der
              Bundesdruckerei und der ICAO-Norm 9303. PixPassVisa prüft jeden
              dieser Punkte automatisch, bevor Sie Ihr Foto herunterladen.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border-2 border-slate-200">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b-2 border-slate-200 bg-slate-50">
                  <th
                    scope="col"
                    className="w-1/4 px-5 py-4 font-bold text-slate-700"
                  >
                    Kriterium
                  </th>
                  <th
                    scope="col"
                    className="w-1/3 px-5 py-4 font-bold text-slate-700"
                  >
                    Vorschrift
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-4 font-bold text-slate-700"
                  >
                    Hinweis
                  </th>
                </tr>
              </thead>
              <tbody>
                {specs.map((s, i) => (
                  <tr
                    key={s.label}
                    className={`border-b border-slate-100 ${i % 2 === 0 ? "bg-white" : "bg-slate-50"}`}
                  >
                    <td className="px-5 py-4 font-semibold text-slate-800">
                      {s.label}
                    </td>
                    <td className="px-5 py-4">
                      <span className="inline-block rounded-md bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-700">
                        {s.value}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-slate-500">{s.detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ══════════════ DO / DON'T ══════════════ */}
      <section className="border-y-2 border-slate-100 bg-slate-50 px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 text-center sm:mb-12">
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-blue-600">
              Checkliste
            </p>
            <h2 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
              Das gehört auf ein gutes Passbild
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {/* DO */}
            <div className="rounded-2xl border-2 border-slate-200 bg-white p-6 sm:p-7">
              <h3 className="mb-5 flex items-center gap-2 text-lg font-bold text-slate-900">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-100">
                  <Check className="h-4 w-4 text-blue-600" />
                </span>
                Das sollten Sie tun
              </h3>
              <ul className="flex flex-col gap-3">
                {doList.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm leading-snug text-slate-700"
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100">
                      <Check className="h-3 w-3 text-blue-600" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* DON'T */}
            <div className="rounded-2xl border-2 border-slate-200 bg-white p-6 sm:p-7">
              <h3 className="mb-5 flex items-center gap-2 text-lg font-bold text-slate-900">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-100">
                  <X />
                </span>
                Das sollten Sie vermeiden
              </h3>
              <ul className="flex flex-col gap-3">
                {dontList.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm leading-snug text-slate-700"
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-100">
                      <X />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ ANWENDUNGSFÄLLE ══════════════ */}
      <section className="bg-white px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 text-center sm:mb-12">
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-blue-600">
              Einsatzbereiche
            </p>
            <h2 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
              Für diese Dokumente nutzen Sie das Foto
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-slate-500">
              Ein biometrisches Passbild von PixPassVisa gilt für mehrere
              amtliche Dokumente gleichzeitig.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {useCases.map((u) => (
              <div
                key={u.title}
                className="rounded-2xl border-2 border-slate-200 bg-slate-50 p-6"
              >
                <h3 className="mb-2 font-bold text-slate-900">{u.title}</h3>
                <p className="text-sm leading-relaxed text-slate-500">
                  {u.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ VORTEILE ══════════════ */}
      <section className="border-y-2 border-slate-100 bg-slate-50 px-4 py-16 sm:py-20">
        <div className="mx-auto grid max-w-5xl items-start gap-10 lg:grid-cols-2 lg:items-center lg:gap-12">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-blue-600">
              Warum PixPassVisa
            </p>
            <h2 className="mb-4 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
              Biometrisches Passbild ohne Fotostudio
            </h2>
            <p className="mb-6 leading-relaxed text-slate-500">
              Ein klassisches Passfoto beim Fotografen kostet Zeit, einen Termin
              und meist zwischen 8 und 15 Euro. PixPassVisa ersetzt diesen Weg
              durch eine automatisierte Lösung, die alle behördlichen
              Anforderungen zuverlässig erfüllt, bequem von zu Hause aus.
            </p>
            <ul className="mb-8 flex flex-col gap-3">
              {benefits.map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-3 text-sm leading-snug text-slate-700"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100">
                    <Check className="h-3 w-3 text-blue-600" />
                  </span>
                  {f}
                </li>
              ))}
            </ul>
            <Link
              href={ctaHref}
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-7 py-3.5 font-bold text-white transition-colors hover:bg-blue-700"
            >
              Jetzt Passbild erstellen <ArrowRight />
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-8 rounded-2xl border-2 border-blue-200 bg-blue-100 p-8 sm:p-10">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col gap-1">
                <span className="text-2xl font-black leading-none text-blue-700 sm:text-3xl">
                  {s.val}
                </span>
                <span className="text-xs leading-tight text-slate-600">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ FAQ ══════════════ */}
      <section className="bg-white px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <div className="mb-10 text-center sm:mb-12">
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-blue-600">
              Häufige Fragen
            </p>
            <h2 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
              FAQ zum biometrischen Passbild
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-slate-500">
              Alles Wichtige zu Maßen, Anforderungen und der Verwendung Ihres
              biometrischen Passbildes.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {faqs.map((f) => (
              <details
                key={f.q}
                className="group overflow-hidden rounded-xl border-2 border-slate-200 bg-white"
              >
                <summary className="flex cursor-pointer select-none list-none items-center justify-between gap-4 px-5 py-4 sm:px-6 sm:py-5">
                  <h3 className="text-base font-bold text-slate-900">{f.q}</h3>
                  <span className="shrink-0 text-2xl font-light text-blue-600 transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="border-t-2 border-slate-100 px-5 pb-5 pt-4 text-sm leading-relaxed text-slate-500 sm:px-6">
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
