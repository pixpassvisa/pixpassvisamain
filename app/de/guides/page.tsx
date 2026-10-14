import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getAllGermanGuides } from '@/lib/de-guides';
import styles from '@/app/components/ReviewedPhotoGuide.module.css';

const title = 'Passbild-Ratgeber: Aufnahme & digitale Abgabe | PixPassVisa';
const description = 'PixPassVisa erklärt Bildqualität und digitale Abgabe für deutsche Pass- und Ausweisanträge. Finden Sie den passenden Ratgeber vor Ihrem Behördentermin.';
const url = 'https://www.pixpassvisa.com/de/guides';
const image = 'https://www.pixpassvisa.com/images/guides/de-guides.png';
export const metadata: Metadata = {
  title, description, alternates:{canonical:url},
  openGraph:{title,description,url,siteName:'PixPassVisa',locale:'de_DE',type:'website',images:[{url:image,width:1200,height:630,alt:'PixPassVisa: Dokument wählen, Aufnahme klären und Abgabe prüfen'}]},
  twitter:{card:'summary_large_image',title,description,images:[image]},
};
export default function GermanGuidesHubPage() {
  const guides = getAllGermanGuides();
  const schema = {'@context':'https://schema.org','@type':'CollectionPage',name:title,description,url,inLanguage:'de',dateModified:'2026-10-14',publisher:{'@type':'Organization',name:'PixPassVisa',url:'https://www.pixpassvisa.com'},mainEntity:{'@type':'ItemList',itemListElement:guides.map((guide,index)=>({'@type':'ListItem',position:index+1,name:guide.title,url:`${url}/${guide.slug}`}))}};
  return <div lang="de" className={styles.page}><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema).replace(/</g,'\\u003c')}}/><div className={styles.shell}>
    <nav aria-label="Brotkrumennavigation" className={styles.breadcrumb}><Link href="/de">Startseite</Link><span>/</span><span>Passbild-Ratgeber</span></nav>
    <header className={styles.hero}><div><p className={styles.eyebrow}>PIXPassVisa · WISSEN VOR DEM TERMIN</p><h1>Das richtige Passbild beginnt mit dem richtigen Verfahren.</h1><p className={styles.intro}>Bildqualität und Einreichung sind zwei verschiedene Fragen. Unsere deutschsprachigen Ratgeber helfen Ihnen, Aufnahme, Dokument und Abgabeweg getrennt zu prüfen – bevor Sie ein Foto bearbeiten oder einen Download kaufen.</p><p className={styles.reviewed}>Stand: <time dateTime="2026-10-14">14. Oktober 2026</time> · PixPassVisa Redaktion</p></div><Image src="/images/guides/de-guides.png" alt="PixPassVisa Orientierung: Dokument wählen, Aufnahme klären, Abgabe prüfen" width={1200} height={630} priority sizes="(max-width:800px) 92vw, 480px"/></header>
    <section className={styles.next}><h2>Welcher Ratgeber passt zu Ihrer Frage?</h2><div>{guides.map(guide=><Link key={guide.slug} href={`/de/guides/${guide.slug}`}><h3>{guide.title} ↗</h3><p>{guide.description}</p><p>{guide.readingTime}</p></Link>)}</div></section>
    <div className={styles.content} style={{marginTop:40}}><nav aria-label="Auf dieser Seite" className={styles.toc}><h2>Ihr nächster Schritt</h2><a href="#verfahren">Digitale Abgabe</a><a href="#bildqualitaet">Bildqualität</a><a href="#pixpassvisa">Was PixPassVisa leistet</a></nav><div>
      <section id="verfahren" className={styles.section}><h2>Für Pass und Ausweis zählt auch der Abgabeweg</h2><p>Für inländische Pass- und Ausweisanträge müssen die Lichtbilder digital eingereicht werden. Bürgerbüros und Fotodienstleister bieten die digitale Aufnahme an. Ein selbst heruntergeladenes JPG ersetzt nicht automatisch das Verfahren Ihrer Behörde.</p><p>Fragen Sie vor dem Termin, wo die Aufnahme möglich ist und wie das Bild an die zuständige Stelle gelangt. Übertragen Sie die Regeln nicht ungeprüft auf Führerschein, Visum oder Bewerbungsfoto.</p><p className={styles.source}>Quelle: <a href="https://www.bundesregierung.de/breg-de/aktuelles/neuregelungen-mai-2025-2344002">Bundesregierung: digitale Passbilder seit Mai 2025 ↗</a></p></section>
      <section id="bildqualitaet" className={styles.section}><h2>Ein Bildformat allein beantwortet nicht alle Fragen</h2><p>Prüfen Sie, ob die Aufnahme scharf ist, das Gesicht deutlich erkennbar bleibt und Licht sowie Hintergrund zur Vorgabe passen. Die konkreten Beispiele und Maße finden Sie im Ratgeber zur Bildqualität. Nutzen Sie daneben die Anweisungen für das tatsächlich beantragte Dokument.</p><p>Wenn eine Aufnahme ungeeignet ist, ist ein neues Foto häufig der sinnvollere Ausgangspunkt. Bewahren Sie das Original auf und klären Sie, ob digitale Veränderungen für Ihren Antrag zulässig sind.</p></section>
      <section id="pixpassvisa" className={styles.sources}><h2>Unabhängige Orientierung von PixPassVisa</h2><p>Unsere Anleitungen und automatischen Bildprüfungen sind keine behördliche Freigabe. PixPassVisa stellt hier keinen behördlichen Übermittlungscode aus und ersetzt keine Aufnahme beim Fotodienstleister oder Bürgeramt.</p><p>Ein kostenpflichtiger Download ist eine Datei, keine Zusage der Annahme. Lesen Sie vor einer Bearbeitung die passende Anleitung. Bei Fragen zum Antrag entscheidet die zuständige Behörde.</p><p><Link href="/editorial-methodology">So prüfen wir unsere Inhalte (Englisch)</Link> · <Link href="/de/biometrisches-passbild">Biometrische Bildanforderungen ansehen</Link></p></section>
    </div></div>
  </div></div>;
}
