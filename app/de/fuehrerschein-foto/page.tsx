import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, X as Cross, Clock, ShieldCheck as Shield, Euro, Car } from "lucide-react";

/* ─── Constants ─── */
const ctaHref = "/de/passbild-online?type=germany-driving-licence";

/* ─── Data ─── */
const steps = [
  {
    n: "1",
    title: "Foto hochladen",
    desc: "Laden Sie ein aktuelles Selfie oder Porträtfoto hoch. Ein Smartphone genügt vollständig – kein Fotostudio nötig.",
  },
  {
    n: "2",
    title: "Automatische KI-Prüfung",
    desc: "Die KI prüft Maße, Kopfposition, Belichtung und Hintergrundfarbe nach EU-Richtlinie 2006/126/EG und korrigiert automatisch.",
  },
  {
    n: "3",
    title: "Download & Druck",
    desc: "Sofort-Download als JPEG oder druckfertiges PDF – direkt für die Führerscheinstelle oder zum Ausdrucken bei dm/Rossmann.",
  },
];

const specs = [
  { krit: "Format", vorschrift: "35 × 45 mm", hinweis: "Hochformat, exakt – nicht größer, nicht kleiner" },
  { krit: "Kopfgröße", vorschrift: "32–35 mm", hinweis: "Scheitel bis Kinn, ca. 70–80 % der Bildfläche" },
  { krit: "Hintergrund", vorschrift: "Weiß oder Hellgrau", hinweis: "Einfarbig, keine Muster, klarer Kontrast zur Kleidung" },
  { krit: "Auflösung", vorschrift: "Min. 600 dpi", hinweis: "Digital: JPEG-Format vorgeschrieben" },
  { krit: "Gesichtsausdruck", vorschrift: "Neutral, Mund geschlossen", hinweis: "Kein Lächeln, keine sichtbaren Zähne" },
  { krit: "Augen", vorschrift: "Geöffnet, gut erkennbar", hinweis: "Keine Sonnenbrille; Korrektionsbrille erlaubt (kein Blendreflex)" },
  { krit: "Kopfbedeckung", vorschrift: "Grundsätzlich verboten", hinweis: "Ausnahme: religiöse Kopfbedeckung, Gesicht vollständig sichtbar" },
  { krit: "Alter des Fotos", vorschrift: "Max. 6 Monate", hinweis: "Aktuelles Erscheinungsbild muss erkennbar sein" },
];

const umtauschFristen = [
  { gruppe: "Jahrgänge 1953–1958 (Papierführerschein bis 31.12.1998)", frist: "19. Juli 2022 (Erledigt)", status: "done" },
  { gruppe: "Jahrgänge 1959–1964 (Papierführerschein bis 31.12.1998)", frist: "19. Januar 2023 (Erledigt)", status: "done" },
  { gruppe: "Jahrgänge 1965–1970 (Papierführerschein bis 31.12.1998)", frist: "19. Januar 2024 (Erledigt)", status: "done" },
  { gruppe: "Jahrgänge ab 1971 (Papierführerschein bis 31.12.1998)", frist: "19. Januar 2025 (Erledigt)", status: "done" },
  { gruppe: "Scheckkarte ausgestellt 2002–2004 (ab 1.1.1999)", frist: "19. Januar 2027", status: "active" },
  { gruppe: "Alle vor 19.1.2013 ausgestellten Führerscheine", frist: "Spätestens 19. Januar 2033", status: "future" },
];

const doList = [
  "Neutrale Mimik – entspannt, Mund geschlossen",
  "Gleichmäßige Frontalansicht, Kopf gerade",
  "Heller, einfarbiger Hintergrund (Weiß oder Hellgrau)",
  "Gleichmäßige Beleuchtung ohne Schatten im Gesicht",
  "Scharfes, unverwackeltes Foto mit ausreichend Auflösung",
  "Aktuelles Foto (nicht älter als 6 Monate)",
];

const dontList = [
  "Sonnenbrillen oder getönte Gläser",
  "Kopfbedeckungen (außer aus religiösen Gründen)",
  "Starke Schatten, Überbelichtung oder Blendreflexe",
  "Filter, Weichzeichner oder Bildbearbeitungseffekte",
  "Gemusterter Hintergrund oder Personen/Objekte im Bild",
  "Lächeln oder geöffneter Mund",
];

const vergleich = [
  { kriterium: "Format", fuehrerschein: "35 × 45 mm", reisepass: "35 × 45 mm" },
  { kriterium: "Kopfgröße", fuehrerschein: "32–35 mm", reisepass: "27–36 mm" },
  { kriterium: "Brille erlaubt", fuehrerschein: "Ja, Korrektionsbrille", reisepass: "Nein, seit 2017 verboten" },
  { kriterium: "Rechtsgrundlage", fuehrerschein: "EU-Richtlinie 2006/126/EG", reisepass: "ICAO-Norm 9303" },
  { kriterium: "Gültigkeitsdauer", fuehrerschein: "Max. 6 Monate", reisepass: "Max. 6 Monate" },
];

const kosten = [
  { label: "Foto bei PixPassVisa", value: "ab 7,99 €", icon: "euro" },
  { label: "Foto beim Fotografen", value: "8–15 €", icon: "euro" },
  { label: "Umtauschgebühr (GebOSt)", value: "25,30 €", icon: "shield" },
  { label: "Direktversand (optional)", value: "5,10 €", icon: "clock" },
];

const faqs = [
  {
    q: "Welche Maße muss ein Führerschein Foto haben?",
    a: "Ein Führerschein Foto muss in Deutschland exakt 35 × 45 mm groß sein und im Hochformat vorliegen. Die Kopfgröße, gemessen von Scheitel bis Kinn, soll zwischen 32 und 35 mm liegen und etwa 70 bis 80 Prozent der Bildfläche einnehmen. Diese Vorgaben basieren auf der EU-Führerscheinrichtlinie 2006/126/EG und werden von jeder Führerscheinstelle in Deutschland einheitlich angewendet.",
  },
  {
    q: "Darf ich für den Führerschein eine Brille tragen?",
    a: "Im Gegensatz zum Reisepass ist eine Korrektionsbrille für das Führerschein Foto in Deutschland grundsätzlich erlaubt, sofern die Augen klar und ohne Blendreflexe erkennbar bleiben. Sonnenbrillen und stark getönte Gläser sind dagegen verboten, da sie die Identifizierung erschweren.",
  },
  {
    q: "Brauche ich für den Führerscheinumtausch ein neues Foto?",
    a: "Ja, für den Umtausch des alten Papier- oder Scheckkartenführerscheins in den neuen EU-Kartenführerschein benötigen Sie ein aktuelles biometrisches Passfoto. Zusätzlich verlangt die Behörde üblicherweise den Personalausweis oder Reisepass sowie den bisherigen Führerschein im Original.",
  },
  {
    q: "Bis wann muss ich meinen Führerschein umtauschen?",
    a: "Der Stichtag hängt vom Ausstellungsdatum und teilweise vom Geburtsjahr ab. Die nächste relevante Frist betrifft Scheckkartenführerscheine aus den Jahren 2002 bis 2004 und läuft am 19. Januar 2027 ab. Alle vor dem 19. Januar 2013 ausgestellten Führerscheine müssen spätestens bis zum 19. Januar 2033 umgetauscht werden.",
  },
  {
    q: "Was kostet der Führerscheinumtausch?",
    a: "Die amtliche Gebühr für den Umtausch beträgt nach der Gebührenordnung für Maßnahmen im Straßenverkehr (GebOSt) 25,30 Euro. Wer den neuen Führerschein direkt per Post erhalten möchte, zahlt zusätzlich 5,10 Euro. Hinzu kommen die Kosten für das biometrische Passfoto, das Sie mit PixPassVisa deutlich günstiger als beim klassischen Fotografen erstellen.",
  },
  {
    q: "Kann ich das Foto selbst machen oder muss ich zum Fotografen?",
    a: "Ein selbst aufgenommenes Foto ist grundsätzlich zulässig, solange es alle amtlichen Vorgaben exakt erfüllt. Führerscheinstellen lehnen Fotos häufig wegen falscher Maße, eines ungeeigneten Hintergrunds oder unzureichender Bildschärfe ab. PixPassVisa prüft und optimiert Ihr Foto automatisch nach allen offiziellen Kriterien, sodass es bereits beim ersten Versuch akzeptiert wird.",
  },
  {
    q: "Worin unterscheidet sich das Führerschein Foto vom Passbild für den Reisepass?",
    a: "Beide Fotos teilen dasselbe Format von 35 × 45 mm, unterscheiden sich aber in wichtigen Details. Beim Führerschein ist eine Korrektionsbrille erlaubt, beim Reisepass nicht. Außerdem gilt für den Führerschein die EU-Richtlinie 2006/126/EG, während der Reisepass der internationalen ICAO-Norm 9303 folgt. PixPassVisa erkennt automatisch, welches Dokument Sie auswählen, und passt die Prüfkriterien entsprechend an.",
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
          name: "Führerschein Foto",
          item: "https://www.pixpassvisa.com/de/fuehrerschein-foto",
        },
      ],
    },
    {
      "@type": "Service",
      name: "Führerschein Foto Online Erstellen",
      provider: {
        "@type": "Organization",
        name: "PixPassVisa",
        url: "https://www.pixpassvisa.com/de",
      },
      areaServed: "DE",
      serviceType: "Driving License Photo Generator",
    },
  ],
};

/* ─── Page ─── */
export default function FuehrerscheinFotoPage() {
  return (
    <main className="bg-white text-slate-900  antialiased">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ══════════════ HERO ══════════════ */}
      <section className="relative overflow-hidden bg-slate-900 pt-16 pb-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-slate-900 to-slate-900" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />
        <div className="relative max-w-5xl mx-auto flex flex-col items-center text-center gap-5">
          <span className="inline-flex items-center gap-2 bg-blue-600/15 text-cyan-300 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full ring-1 ring-blue-500/30">
            <Car className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>EU-konform · Biometrisch · Führerscheinstelle-geprüft</span>
          </span>

          <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-black tracking-tight leading-[1.07] text-white max-w-3xl">
            <span className="text-cyan-400">Führerschein Foto</span>{" "}
            Online Erstellen
          </h1>

          <p className="max-w-2xl text-lg text-slate-300 leading-relaxed">
            Erstellen Sie Ihr biometrisches Passbild <strong className="text-white">35 × 45 mm</strong> für den
            EU-Führerschein, Erstantrag oder den Pflichtumtausch bis 2027/2033. Unsere KI prüft jedes Detail
            nach der EU-Richtlinie 2006/126/EG – fertig in unter 30 Sekunden, ohne Fotostudio.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mt-2">
            <Link
              href={ctaHref}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-600 text-slate-900 font-bold text-lg px-8 py-4 rounded-xl shadow-lg shadow-blue-500/20/30 transition-colors"
            >
              Führerschein Foto erstellen <ArrowRight />
            </Link>
            <Link
              href="#anforderungen"
              className="inline-flex items-center gap-2 border border-white/20 hover:border-white/40 text-white font-semibold text-base px-6 py-4 rounded-xl bg-white/5 backdrop-blur transition-colors"
            >
              Alle Anforderungen ansehen
            </Link>
          </div>

          <div className="w-full mt-4 rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10">
            <Image
              src="/photo_officielle passeport.jpg"
              alt="Biometrisches Führerschein Foto online erstellen – 35x45mm, EU-konform"
              width={1120}
              height={480}
              priority
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </section>

      {/* ══════════════ WARUM JETZT ══════════════ */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 mb-4">
            Führerscheinumtausch: Warum Sie jetzt ein neues Foto brauchen
          </h2>
          <p className="text-slate-600 leading-relaxed text-lg mb-4">
            Seit dem 19. Januar 2013 gilt in Deutschland die Pflicht, alle älteren Führerscheine in den
            neuen <strong>EU-Kartenführerschein</strong> im Scheckkartenformat umzutauschen. Grundlage dafür
            bildet die EU-Richtlinie 2006/126/EG, die der Gesetzgeber über die Fahrerlaubnis-Verordnung
            (FeV) in deutsches Recht umgesetzt hat.
          </p>
          <p className="text-slate-600 leading-relaxed text-lg mb-4">
            Das Kraftfahrt-Bundesamt (KBA) meldet, dass Behörden bis Ende 2024 bereits rund{" "}
            <strong>8,1 Millionen Papierführerscheine</strong> in EU-Kartenführerscheine umgetauscht haben.
            Trotzdem müssen noch Millionen Inhaberinnen und Inhaber aktiv werden, denn die nächste
            wichtige Frist rückt näher: der <strong>19. Januar 2027</strong>.
          </p>
          <p className="text-slate-600 leading-relaxed text-lg mb-4">
            Wichtig zu wissen: Der Umtausch betrifft ausschließlich das physische Dokument. Ihre
            Fahrerlaubnis als solche bleibt vollständig gültig und erlischt durch den fälligen
            Kartentausch nicht. Wer die Frist verpasst, riskiert dennoch ein Verwarngeld, da das
            mitgeführte Dokument dann formal ungültig ist.
          </p>
          <p className="text-slate-600 leading-relaxed text-lg">
            Für jeden Umtausch und jeden Erstantrag verlangt die Führerscheinstelle ein <strong>aktuelles
            biometrisches Passfoto</strong>. PixPassVisa erstellt dieses Foto in unter 30 Sekunden,
            vollständig behördenkonform und ohne Termin beim Fotografen.
          </p>
        </div>
      </section>

      {/* ══════════════ 3 SCHRITTE ══════════════ */}
      <section className="py-20 px-4 bg-slate-50 border-y border-slate-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-blue-600 font-bold text-xs uppercase tracking-widest mb-2">So funktioniert es</p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">
              Führerschein Foto in 3 Schritten
            </h2>
            <p className="mt-3 text-slate-500 max-w-xl mx-auto">
              Kein Termin, kein Fotostudio, kein Aufwand. Alles online, direkt am Smartphone.
            </p>
          </div>

          <ol className="grid sm:grid-cols-3 gap-6 list-none p-0">
            {steps.map((s) => (
              <li key={s.n} className="bg-white border border-slate-200 rounded-2xl p-7 flex flex-col gap-3 hover:shadow-lg hover:-translate-y-0.5 transition-all">
                <span className="w-10 h-10 rounded-xl bg-blue-600 text-white font-black text-lg flex items-center justify-center shadow-md shadow-blue-500/20">
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
      <section id="anforderungen" className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10">
            <p className="text-blue-600 font-bold text-xs uppercase tracking-widest mb-2">Offizielle Vorgaben</p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 mb-3">
              Führerschein Foto Anforderungen (EU-Norm)
            </h2>
            <p className="text-slate-500 leading-relaxed max-w-2xl">
              Die folgenden Kriterien basieren auf der EU-Führerscheinrichtlinie 2006/126/EG sowie den
              deutschen Vorgaben der Fahrerlaubnis-Verordnung (FeV). PixPassVisa prüft jeden dieser Punkte
              automatisch und passt das Foto bei Bedarf direkt an.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th className="px-5 py-4 font-bold w-1/4">Kriterium</th>
                  <th className="px-5 py-4 font-bold w-1/3">Vorschrift</th>
                  <th className="px-5 py-4 font-bold">Hinweis</th>
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
        </div>
      </section>

      {/* ══════════════ VERGLEICH FÜHRERSCHEIN VS REISEPASS ══════════════ */}
      <section className="py-20 px-4 bg-slate-50 border-y border-slate-100">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10">
            <p className="text-blue-600 font-bold text-xs uppercase tracking-widest mb-2">Direktvergleich</p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 mb-3">
              Führerschein Foto vs. Reisepass Foto
            </h2>
            <p className="text-slate-500 leading-relaxed max-w-2xl">
              Beide Fotos wirken auf den ersten Blick gleich, folgen aber unterschiedlichen
              Rechtsgrundlagen. PixPassVisa berücksichtigt diese Unterschiede automatisch,
              sobald Sie das passende Dokument auswählen.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm bg-white">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-5 py-4 font-bold text-slate-700">Kriterium</th>
                  <th className="px-5 py-4 font-bold text-blue-700">Führerschein</th>
                  <th className="px-5 py-4 font-bold text-slate-700">Reisepass</th>
                </tr>
              </thead>
              <tbody>
                {vergleich.map((v, i) => (
                  <tr key={v.kriterium} className={`border-b border-slate-100 ${i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}`}>
                    <td className="px-5 py-4 font-semibold text-slate-800">{v.kriterium}</td>
                    <td className="px-5 py-4 text-blue-700 font-medium">{v.fuehrerschein}</td>
                    <td className="px-5 py-4 text-slate-500">{v.reisepass}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ══════════════ UMTAUSCHFRISTEN TABELLE ══════════════ */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10">
            <p className="text-blue-600 font-bold text-xs uppercase tracking-widest mb-2">Quelle: KBA / Bundesregierung</p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 mb-3">
              Führerscheinumtausch: Fristen auf einen Blick
            </h2>
            <p className="text-slate-500 leading-relaxed max-w-2xl">
              Der Stufenplan basiert auf der Fahrerlaubnis-Verordnung (FeV) und wird vom
              Kraftfahrt-Bundesamt (KBA) koordiniert. Nur das Dokument läuft ab – die
              Fahrerlaubnis selbst bleibt weiterhin gültig.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-5 py-4 font-bold text-slate-700">Betroffene Gruppe</th>
                  <th className="px-5 py-4 font-bold text-slate-700 w-1/3">Umtauschfrist</th>
                </tr>
              </thead>
              <tbody>
                {umtauschFristen.map((f, i) => (
                  <tr key={f.gruppe} className={`border-b border-slate-100 ${i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}`}>
                    <td className="px-5 py-4 text-slate-700">{f.gruppe}</td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-block font-semibold px-2.5 py-0.5 rounded-md text-xs ${
                          f.status === "done"
                            ? "bg-slate-100 text-slate-400"
                            : f.status === "active"
                            ? "bg-amber-50 text-amber-700"
                            : "bg-blue-50 text-blue-700"
                        }`}
                      >
                        {f.frist}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-xs text-slate-400">
            Quellen: Kraftfahrt-Bundesamt (KBA), Bundesregierung, ADAC – Stand Januar 2025.
            Die Fahrerlaubnis (Recht zu fahren) bleibt unberührt; nur das physische Dokument
            muss erneuert werden.
          </p>
        </div>
      </section>

      {/* ══════════════ KOSTENÜBERSICHT ══════════════ */}
      <section className="py-20 px-4 bg-slate-50 border-y border-slate-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-blue-600 font-bold text-xs uppercase tracking-widest mb-2">Transparente Kosten</p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">
              Was kostet Foto und Umtausch insgesamt?
            </h2>
            <p className="mt-3 text-slate-500 max-w-xl mx-auto">
              Ein Überblick über alle Posten, mit denen Sie beim Führerscheinumtausch rechnen sollten.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {kosten.map((k) => (
              <div key={k.label} className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col gap-3">
                <span className="w-10 h-10 rounded-xl bg-blue-50/70 flex items-center justify-center">
                  {k.icon === "euro" ? <Euro /> : k.icon === "shield" ? <Shield /> : <Clock />}
                </span>
                <span className="text-2xl font-black text-slate-900">{k.value}</span>
                <span className="text-slate-500 text-sm leading-snug">{k.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ DO / DON'T ══════════════ */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-blue-600 font-bold text-xs uppercase tracking-widest mb-2">Checkliste</p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">
              Dos &amp; Don&apos;ts für das Führerschein Foto
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-blue-50/70/50 border border-blue-200 rounded-2xl p-7">
              <h3 className="font-bold text-lg text-slate-900 mb-5 flex items-center gap-2">
                <span className="w-7 h-7 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Check className="w-4 h-4 text-blue-600" />
                </span>
                Das sollten Sie tun
              </h3>
              <ul className="flex flex-col gap-3">
                {doList.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-slate-700 leading-snug">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-blue-600" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-red-50/40 border border-red-100 rounded-2xl p-7">
              <h3 className="font-bold text-lg text-slate-900 mb-5 flex items-center gap-2">
                <span className="w-7 h-7 bg-red-50 rounded-lg flex items-center justify-center">
                  <Cross className="w-4 h-4 text-red-600" />
                </span>
                Das sollten Sie vermeiden
              </h3>
              <ul className="flex flex-col gap-3">
                {dontList.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-slate-700 leading-snug">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                      <Cross className="w-3 h-3 text-red-600" />
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
      <section className="py-20 px-4 bg-slate-50 border-y border-slate-100">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-blue-600 font-bold text-xs uppercase tracking-widest mb-2">Warum PixPassVisa</p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 mb-4">
              Führerschein Foto ohne Fotostudio
            </h2>
            <p className="text-slate-500 leading-relaxed mb-6">
              Ein Termin beim Fotografen kostet Zeit und meist mehr Geld als nötig. PixPassVisa
              liefert dieselbe behördliche Qualität vollautomatisch und in Sekunden – direkt vom
              Smartphone aus, ohne Wartezeit und ohne Anfahrt.
            </p>
            <ul className="flex flex-col gap-3 mb-8">
              {[
                "Automatischer Zuschnitt auf exakt 35 × 45 mm",
                "KI-gestützter Hintergrundwechsel auf Weiß/Hellgrau",
                "Belichtungs- und Kontrastkorrektur inklusive",
                "Prüfung nach EU-Richtlinie 2006/126/EG (FeV)",
                "Sofort-Download als JPEG oder druckfertiges PDF",
                "Druckbogen für dm, Rossmann und CEWE verfügbar",
                "Geeignet für Erstantrag, Umtausch und Verlängerung",
                "100 % datenschutzkonform – keine Speicherung Ihrer Fotos",
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
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-7 py-3.5 rounded-xl shadow-md shadow-blue-500/20 transition-colors"
            >
              Jetzt Foto erstellen <ArrowRight />
            </Link>
          </div>

          <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-2xl p-10 grid grid-cols-2 gap-8">
            {[
              { val: "35×45 mm", label: "Offizielle Führerschein-Fotomaße" },
              { val: "< 30 Sek", label: "Bis zum fertigen Foto" },
              { val: "EU 2006/126", label: "Richtlinie erfüllt" },
              { val: "25,30 €", label: "Gebühr Führerscheinumtausch (GebOSt)" },
            ].map((s) => (
              <div key={s.label} className="flex flex-col gap-1">
                <span className="text-3xl font-black text-cyan-400 leading-none">{s.val}</span>
                <span className="text-slate-300 text-xs leading-tight">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ FAQ ══════════════ */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-blue-600 font-bold text-xs uppercase tracking-widest mb-2">Häufige Fragen</p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">
              FAQ – Führerschein Foto
            </h2>
            <p className="mt-3 text-slate-500 max-w-xl mx-auto">
              Alle wichtigen Fragen zu Maßen, Anforderungen und Umtauschfristen, beantwortet auf
              Basis offizieller Quellen wie KBA, Bundesregierung und FeV.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {faqs.map((f) => (
              <details key={f.q} className="group bg-white border border-slate-200 rounded-xl overflow-hidden open:border-blue-300 open:shadow-md transition-all">
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

      {/* ══════════════ FINAL CTA ══════════════ */}
      <section className="relative overflow-hidden py-20 px-4 bg-slate-900">
        <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-blue-600/15 rounded-full blur-3xl" />
        <div className="relative max-w-3xl mx-auto text-center flex flex-col items-center gap-5">
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Führerschein Foto jetzt online erstellen
          </h2>
          <p className="text-slate-300 text-lg max-w-xl leading-relaxed">
            Kein Termin, kein Fotostudio. Laden Sie einfach ein Foto hoch und erhalten Sie in
            Sekunden ein EU-konformes Führerscheinfoto (35 × 45 mm) für den Umtausch oder
            Erstantrag.
          </p>
          <Link
            href={ctaHref}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg px-9 py-4 rounded-xl shadow-lg transition-colors"
          >
            Jetzt Foto hochladen <ArrowRight />
          </Link>
        </div>
      </section>

    </main>
  );
}