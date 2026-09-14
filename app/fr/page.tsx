import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Target, Zap, Lock, CreditCard, Globe, Printer, ShieldCheck, FileCheck, Plane, Sparkles, Camera } from "lucide-react";

/* ─────────────────────────────────────────────
   Metadata
───────────────────────────────────────────── */
export const metadata: Metadata = {
  title: "Photo Passeport, Visa & Carte d'Identité en Ligne | PixPassVisa",
  description:
    "Créez votre photo passeport, photo visa ou photo d'identité conforme en 30 secondes. Photo biométrique vérifiée par IA, fond conforme, 50+ pays. Garanti ou remboursé.",

  alternates: {
    canonical: "https://www.pixpassvisa.com/fr",
    languages: {
      en: "https://www.pixpassvisa.com/",
      fr: "https://www.pixpassvisa.com/fr",
      de: "https://www.pixpassvisa.com/de",

      "x-default": "https://www.pixpassvisa.com/",
    },
  },
  openGraph: {
    title: "PixPassVisa — Photo Passeport Conforme en 30 Secondes",
    description:
      "Photo passeport, visa et carte d'identité conformes, vérifiées par IA. Fond conforme, conforme pour 50+ pays. Garanti ou remboursé.",
    url: "https://www.pixpassvisa.com/fr",
    siteName: "PixPassVisa",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "https://www.pixpassvisa.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "PixPassVisa — Photo passeport biométrique en ligne",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Photo Passeport, Visa & Carte d'Identité en Ligne | PixPassVisa",
    description:
      "Créez votre photo passeport, visa ou carte d'identité conforme en 30 secondes. Vérification biométrique IA.",
    images: ["https://www.pixpassvisa.com/og-image.jpg"],
  },
};

/* ─────────────────────────────────────────────
   Data
───────────────────────────────────────────── */
const faqs = [
  {
    q: "Ma photo passeport en ligne sera-t-elle acceptée par les autorités françaises ?",
    a: "Oui. Chaque photo passeport générée respecte les normes biométriques officielles de l'ANTS (Agence Nationale des Titres Sécurisés). Notre taux d'acceptation dépasse 99 %. En cas de refus, nous remboursons intégralement sur présentation de la preuve.",
  },
  {
    q: "Combien de temps faut-il pour obtenir ma photo d'identité numérique ?",
    a: "Moins de 30 secondes. Téléversez votre selfie : notre système supprime l'arrière-plan, recadre l'image et vérifie la conformité biométrique instantanément. Vous téléchargez ensuite votre photo d'identité numérique.",
  },
  {
    q: "Puis-je créer ma photo passeport avec mon smartphone ?",
    a: "Oui. Un selfie de bonne qualité pris avec n'importe quel smartphone suffit. Notre générateur de photo passeport corrige automatiquement l'éclairage, l'angle et la netteté pour garantir la conformité aux normes officielles.",
  },
  {
    q: "Quels documents peut-on obtenir avec PixPassVisa ?",
    a: "Passeport, visa, carte nationale d'identité, permis de conduire international et tout document officiel pour plus de 50 pays : France, États-Unis, Canada, Royaume-Uni, espace Schengen, Chine et bien d'autres.",
  },
  {
    q: "Comment utiliser ma photo pour une démarche ANTS en ligne ?",
    a: "Vous recevez un fichier numérique haute résolution, compatible avec le format exigé par l'ANTS. Pour une e-photo ANTS (le code à 22 caractères requis pour certaines démarches), vous devrez passer par un photographe agréé ou une cabine partenaire : PixPassVisa fournit la photo conforme, pas ce code officiel.",
  },
  {
    q: "PixPassVisa est-il affilié à l'ANTS ou à une autorité gouvernementale ?",
    a: "Non. PixPassVisa est un service privé et indépendant, non affilié à l'ANTS ni à aucune autorité gouvernementale. Nous vous fournissons une photo d'identité conforme aux normes biométriques officielles, que vous utilisez ensuite pour vos démarches administratives.",
  },
  {
    q: "Mes données personnelles sont-elles protégées ?",
    a: "Vos photos sont chiffrées de bout en bout, jamais revendues ni partagées avec des tiers, et supprimées automatiquement après 24 heures, conformément au RGPD.",
  },
  {
    q: "Que faire si ma photo est refusée par les autorités ?",
    a: "PixPassVisa rembourse intégralement toute photo refusée par une autorité officielle. Contactez notre support avec la preuve de refus pour être remboursé sans condition.",
  },
  {
    q: "Puis-je aussi imprimer ma photo d'identité ?",
    a: "Oui. PixPassVisa fournit un fichier numérique pour les démarches en ligne et une planche d'impression prête à tirer en pharmacie, en mairie ou chez vous.",
  },
];

const steps = [
  {
    n: "01",
    title: "Prenez ou importez votre photo",
    desc: "Utilisez votre smartphone ou une photo existante. Aucun studio ni équipement professionnel n'est nécessaire.",
  },
  {
    n: "02",
    title: "Vérification biométrique automatique",
    desc: "Notre outil supprime l'arrière-plan, recadre l'image et contrôle plus de 50 critères biométriques officiels en temps réel.",
  },
  {
    n: "03",
    title: "Téléchargez et soumettez votre dossier",
    desc: "Recevez votre photo passeport conforme en haute résolution, plus une planche d'impression prête à l'emploi.",
  },
];

const benefits = [
  { icon: Target, title: "Conformité biométrique garantie", desc: "Photo validée selon les critères ANTS et les autorités de 50+ pays. Taux d'acceptation supérieur à 99 %, remboursé si refusée." },
  { icon: Zap, title: "Résultat en moins de 30 secondes", desc: "Disponible 24h/24 et 7j/7, sans déplacement ni attente en pharmacie ou en studio photo." },
  { icon: Lock, title: "Données protégées et conformes RGPD", desc: "Chiffrement de bout en bout. Vos photos sont supprimées après 24 heures, sans revente ni partage." },
  { icon: CreditCard, title: "À partir de 6,99 € seulement", desc: "Économisez sur les frais de studio et sur les resoumissions en cas de refus. Tarif unique, sans abonnement." },
  { icon: Globe, title: "50+ pays et documents couverts", desc: "France, États-Unis, Canada, Royaume-Uni, espace Schengen, Chine — base mise à jour en continu." },
  { icon: Printer, title: "Planche d'impression incluse", desc: "Format prêt à imprimer, accepté dans toutes les pharmacies, mairies et bureaux de poste français." },
];

const docs = [
  { icon: ShieldCheck, name: "Photo passeport français", detail: "35×45 mm · normes ANTS" },
  { icon: FileCheck, name: "Photo carte d'identité (CNI)", detail: "Même norme que le passeport" },
  { icon: Plane, name: "Photo visa Schengen", detail: "Tous pays de l'espace Schengen" },
  { icon: Globe, name: "Photo visa américain", detail: "Passeport US · formulaire DS-160" },
  { icon: Sparkles, name: "Photo carte verte / loterie DV", detail: "Green Card · DV Lottery" },
  { icon: Camera, name: "Photo visa chinois", detail: "Format et fond dédiés" },
];

const reviews = [
  { name: "Marie L.", city: "Paris", stars: 5, text: "Photo acceptée du premier coup pour mon renouvellement de passeport. Rapide et sans prise de tête." },
  { name: "Thomas B.", city: "Lyon", stars: 5, text: "J'étais sceptique, mais le résultat est parfait : l'ANTS a validé ma photo en ligne sans problème." },
  { name: "Isabelle M.", city: "Bordeaux", stars: 5, text: "Bien moins cher qu'en pharmacie et la photo est nickel. Je recommande à toute la famille." },
];

const checklist = [
  "Fond gris clair ou bleu-gris uni, sans ombre",
  "Dimensions exactes 35×45 mm (norme France)",
  "Expression neutre, bouche fermée",
  "Yeux ouverts, regard vers l'objectif",
  "Visage centré, dégagé, sans couvre-chef",
  "Photo de moins de six mois",
  "Résolution minimale 413×531 px à 300 DPI",
  "Format numérique compatible ANTS pour la soumission en ligne",
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: "PixPassVisa",
      url: "https://www.pixpassvisa.com",
      logo: "https://www.pixpassvisa.com/logo.png",
    },
    {
      "@type": "WebPage",
      "@id": "https://www.pixpassvisa.com/fr/#webpage",
      url: "https://www.pixpassvisa.com/fr",
      name: "Photo Passeport, Visa & Carte d'Identité en Ligne | PixPassVisa",
      inLanguage: "fr",
      description: "Créez votre photo passeport, visa ou carte d'identité conforme en 30 secondes.",
    },
    {
      "@type": "SoftwareApplication",
      name: "PixPassVisa",
      url: "https://www.pixpassvisa.com/fr",
      applicationCategory: "PhotographyApplication",
      operatingSystem: "All",
      inLanguage: "fr",
      offers: { "@type": "Offer", price: "6.99", priceCurrency: "EUR" },
      aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", ratingCount: "170" },
    },
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
        { "@type": "ListItem", position: 1, name: "Accueil", item: "https://www.pixpassvisa.com/fr" },
      ],
    },
  ],
};

const ctaHref = "/fr/passport-photo-online?type=france-passport";

/* ─────────────────────────────────────────────
   Page
───────────────────────────────────────────── */
export default function FrHomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="pb-20 md:pb-0">
          <section aria-labelledby="hero-h1" className="pt-8 md:pt-10">
          <div className="mx-auto max-w-7xl px-3 py-10 sm:px-4 md:py-10 lg:px-6">
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
              <div>
                <p className="mb-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-blue-700">
                  <span
                    className="h-2 w-2 rounded-full bg-blue-600"
                    aria-hidden="true"
                  />
                              Passeport · Visa · Carte d&apos;identité · Permis de conduire

                </p>

                <h1
                  id="hero-h1"
                  className="max-w-2xl text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl"
                >
                 Photo passeport et photo visa en ligne,{" "}
              <span className="text-blue-700">conformes en 30 secondes</span>
                </h1>

                <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
                Créez une photo d&apos;identité 100&nbsp;% conforme aux normes biométriques officielles, sans vous
              déplacer. Notre générateur de photo passeport supprime l&apos;arrière-plan, recadre votre visage et
              vérifie chaque critère ANTS avant que vous ne téléchargiez le fichier — accepté par les autorités de
              plus de 50 pays.
                </p>

                <div className="mt-8 flex gap-2">
                  <Link
                    href={ctaHref}
                    className="inline-flex items-center justify-center bg-blue-700 hover:bg-blue-800 text-white text-sm font-semibold px-6 py-3 rounded transition-colors"
                  >
                         Créer ma photo passeport
                    <ArrowRight />
                  </Link>
              
                   <Link href="/fr/photo-identite-en-ligne" className="inline-flex items-center justify-center text-blue-700 hover:text-blue-800 text-sm font-semibold px-6 py-3 rounded transition-colors" >
                Photo d&apos;identité en ligne
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
      

        {/* ══════════════ STICKY CTA — mobile only ══════════════ */}
        <div className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-slate-900/97 border-t border-white/10 px-4 py-3">
          <Link
            href={ctaHref}
            className="flex items-center justify-center gap-2 w-full bg-blue-600 text-white font-bold rounded-xl py-4 shadow-lg"
          >
            Créer ma photo
            <ArrowRight />
          </Link>
        </div>

        {/* ══════════════ STATS BAND ══════════════ */}
        <div className="bg-slate-900 py-6">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap justify-around gap-x-8 gap-y-4">
            {[
              { v: "17 000+", l: "utilisateurs satisfaits" },
              { v: "4,9 / 5", l: "note moyenne vérifiée" },
              { v: "99 %", l: "taux d'acceptation" },
              { v: "< 30 s", l: "délai de traitement" },
              { v: "50+", l: "pays couverts" },
            ].map((s) => (
              <div className="text-center" key={s.v}>
                <span className="block text-xl md:text-2xl font-extrabold text-cyan-400 leading-none">{s.v}</span>
                <span className="block text-[11px] font-medium text-white/50 mt-1 uppercase tracking-wide">{s.l}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ══════════════ HOW IT WORKS — timeline ══════════════ */}
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <header className="mb-12 text-center">
              <span className="inline-block bg-blue-50/70 text-blue-700 border border-blue-200 rounded-full text-[11px] font-bold uppercase tracking-wide px-3 py-1 mb-4">
                Processus simple
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-3">
                Comment obtenir votre photo passeport conforme en 3 étapes
              </h2>
              <p className="text-slate-600 max-w-xl mx-auto">
                Aucun logiciel à installer, aucune expérience requise : juste votre téléphone et 30 secondes.
              </p>
            </header>

            <ol className="relative">
              {steps.map((s, i) => (
                <li key={s.n} className="relative pl-16 pb-10 last:pb-0">
                  {i !== steps.length - 1 && (
                    <span className="absolute left-[23px] top-12 bottom-0 w-px bg-blue-200" aria-hidden="true" />
                  )}
                  <span className="absolute left-0 top-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {s.n}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mb-1 pt-1">{s.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{s.desc}</p>
                </li>
              ))}
            </ol>

            <div className="text-center mt-4">
              <Link href={ctaHref} className="inline-flex items-center gap-2 bg-blue-600 text-white font-bold rounded-xl px-8 py-4 shadow-lg hover:bg-blue-700 transition-colors">
                Commencer maintenant
                <ArrowRight />
              </Link>
            </div>
          </div>
        </section>

        {/* ══════════════ SEO — What is a conforming photo ══════════════ */}
        <section className="py-16 md:py-20 bg-slate-50 border-y border-slate-200">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="inline-block bg-blue-50/70 text-blue-700 border border-blue-200 rounded-full text-[11px] font-bold uppercase tracking-wide px-3 py-1 mb-4">
              Normes officielles
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-6">
              Qu&apos;est-ce qu&apos;une photo d&apos;identité conforme aux normes biométriques ?
            </h2>
            <div className="space-y-4 text-slate-600 leading-relaxed mb-10">
              <p>
                Une <strong className="text-slate-800">photo passeport conforme</strong> répond à des critères
                précis fixés par l&apos;<Link href="/fr/ephoto-ants" className="text-blue-700 underline hover:text-blue-800">ANTS (Agence Nationale des Titres Sécurisés)</Link> pour la France,
                et par les standards biométriques ICAO pour les documents de voyage internationaux. Ces exigences
                couvrent le fond (gris clair ou bleu-gris uni, le blanc pur étant aujourd&apos;hui déconseillé),
                les dimensions (35×45 mm), l&apos;expression neutre, les yeux ouverts, l&apos;absence
                d&apos;accessoires sur le visage, et la qualité de l&apos;image.
              </p>
              <p>
                Une photo non conforme entraîne le rejet automatique de votre dossier : délais supplémentaires,
                frais de resoumission et rendez-vous en préfecture perdus. PixPassVisa élimine ce risque en
                vérifiant chaque critère avant que vous ne soumettiez votre demande.
              </p>
              <p>
                Notre générateur de photo passeport produit des fichiers conformes pour le{" "}
                <Link href="/fr/photo-passeport" className="text-blue-700 underline hover:text-blue-800">passeport biométrique français</Link>,
                la <Link href="/fr/photo-carte-identite" className="text-blue-700 underline hover:text-blue-800">carte nationale d&apos;identité</Link>,
                les <Link href="/fr/photo-visa" className="text-blue-700 underline hover:text-blue-800">visas Schengen</Link>, le permis de
                conduire international, ainsi que les visas américain et chinois, la carte verte américaine et la
                loterie DV, dans plus de 50 pays au total.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
              {checklist.map((c) => (
                <div className="flex items-center gap-2.5 text-sm font-medium text-slate-700" key={c}>
                  <span className="text-blue-600 flex-shrink-0"><CheckIcon /></span>
                  <span>{c}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════ WHY PIXPASSVISA — flat list, no card boxes ══════════════ */}
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <header className="mb-12 text-center">
              <span className="inline-block bg-blue-50/70 text-blue-700 border border-blue-200 rounded-full text-[11px] font-bold uppercase tracking-wide px-3 py-1 mb-4">
                Pourquoi nous choisir
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-3">
                Pourquoi PixPassVisa est la référence pour votre photo d&apos;identité en ligne
              </h2>
              <p className="text-slate-600 max-w-xl mx-auto">
                Des milliers de Français nous font confiance chaque mois pour leurs demandes de passeport, de visa
                et de carte d&apos;identité.
              </p>
            </header>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-8">
              {benefits.map((b) => (
                <article key={b.title}>
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 mb-3">
                    <b.icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-1.5">{b.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{b.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════ DOCUMENTS — chip grid, not cards ══════════════ */}
        <section className="py-16 md:py-20 bg-slate-50 border-y border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <header className="mb-10 text-center">
              <span className="inline-block bg-blue-50/70 text-blue-700 border border-blue-200 rounded-full text-[11px] font-bold uppercase tracking-wide px-3 py-1 mb-4">
                Documents supportés
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-3">
                Une photo conforme pour tous vos documents officiels
              </h2>
              <p className="text-slate-600 max-w-xl mx-auto">
                Passeport, visa, carte d&apos;identité ou carte verte : une seule plateforme pour tous vos besoins.
              </p>
            </header>
            <div className="flex flex-wrap justify-center gap-3">
              {docs.map((d) => (
                <div key={d.name} className="inline-flex items-center gap-2.5 bg-white border border-slate-200 rounded-full pl-3 pr-5 py-2.5 shadow-xs">
                  <div className="w-7 h-7 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                    <d.icon className="w-4 h-4" />
                  </div>
                  <span>
                    <span className="block text-sm font-bold text-slate-900 leading-tight">{d.name}</span>
                    <span className="block text-xs text-slate-500 leading-tight">{d.detail}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════ COMPARISON — table, not duplicated cards ══════════════ */}
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="inline-block bg-blue-50/70 text-blue-700 border border-blue-200 rounded-full text-[11px] font-bold uppercase tracking-wide px-3 py-1 mb-4">
              Comparaison
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-8">
              Photo passeport en ligne vs photo en pharmacie : quelle différence ?
            </h2>

            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="py-3 pl-4 pr-4 text-slate-500 font-semibold text-sm uppercase">Critère</th>
                    <th className="py-3 pr-4 text-blue-700 font-bold bg-blue-50/70">PixPassVisa</th>
                    <th className="py-3 pr-4 text-slate-700 font-semibold">Pharmacie / Studio</th>
                  </tr>
                </thead>
                <tbody className="text-slate-600">
                  {[
                    ["Disponibilité", "24h/24, depuis chez vous", "Horaires limités, déplacement requis"],
                    ["Délai", "Moins de 30 secondes", "Attente sur place"],
                    ["Prix moyen", "À partir de 6,99 €", "8 € à 15 €"],
                    ["Garantie", "Remboursé si refusé", "Résultat non garanti"],
                    ["Format numérique ANTS", "Inclus", "Rarement proposé"],
                  ].map((row) => (
                    <tr key={row[0]} className="border-b border-slate-100 last:border-0">
                      <td className="py-3 pl-4 pr-4 font-medium">{row[0]}</td>
                      <td className="py-3 pr-4 bg-blue-50/70/50 font-medium">{row[1]}</td>
                      <td className="py-3 pr-4">{row[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="text-center mt-8">
              <Link href={ctaHref} className="inline-flex items-center gap-2 bg-blue-600 text-white font-bold rounded-xl px-8 py-4 shadow-lg hover:bg-blue-700 transition-colors">
                Essayer PixPassVisa maintenant
                <ArrowRight />
              </Link>
            </div>
          </div>
        </section>

        {/* ══════════════ REVIEWS — quote blocks, not boxed cards ══════════════ */}
        <section className="py-16 md:py-20 bg-slate-50 border-y border-slate-200">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <header className="mb-12 text-center">
              <span className="inline-block bg-blue-50/70 text-blue-700 border border-blue-200 rounded-full text-[11px] font-bold uppercase tracking-wide px-3 py-1 mb-4">
                Avis clients
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-3">Ce que disent nos utilisateurs</h2>
              <p className="text-slate-600 max-w-xl mx-auto">
                Plus de 17 000 utilisateurs ont déjà obtenu leur photo d&apos;identité conforme avec PixPassVisa.
              </p>
            </header>
            <div className="grid md:grid-cols-3 gap-8">
              {reviews.map((r) => (
                <figure key={r.name} className="border-l-2 border-blue-500 pl-5">
                  <div className="text-amber-500 text-sm tracking-wide mb-2" aria-label={`${r.stars} étoiles sur 5`}>
                    {"★".repeat(r.stars)}
                  </div>
                  <blockquote className="text-sm text-slate-600 leading-relaxed italic mb-3">
                    &ldquo;{r.text}&rdquo;
                  </blockquote>
                  <figcaption className="text-sm text-slate-500">
                    <strong className="text-slate-800">{r.name}</strong> · {r.city}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════ FAQ — native accordion ══════════════ */}
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <header className="mb-10 text-center">
              <span className="inline-block bg-blue-50/70 text-blue-700 border border-blue-200 rounded-full text-[11px] font-bold uppercase tracking-wide px-3 py-1 mb-4">
                FAQ
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-3">
                Questions fréquentes sur la photo passeport en ligne
              </h2>
              <p className="text-slate-600">
                Tout ce qu&apos;il faut savoir avant de créer votre photo d&apos;identité numérique.
              </p>
            </header>
            <div className="space-y-3">
              {faqs.map((f, i) => (
                <details key={i} className="group bg-white border border-slate-200 rounded-xl overflow-hidden open:border-blue-200 open:shadow-sm">
                  <summary className="flex justify-between items-center gap-3 px-5 py-4 text-sm font-semibold text-slate-900 cursor-pointer list-none hover:bg-blue-50/70 [&::-webkit-details-marker]:hidden">
                    <span>{f.q}</span>
                    <span className="flex-shrink-0 w-6 h-6 bg-blue-50/70 border border-blue-200 rounded-full flex items-center justify-center text-blue-700 text-sm font-bold group-open:rotate-45 group-open:bg-blue-600 group-open:text-white group-open:border-blue-600 transition-transform">
                      +
                    </span>
                  </summary>
                  <p className="px-5 pb-4 pt-1 text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                    {f.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════ DISCLAIMER ══════════════ */}
        <div className="bg-slate-100 border-y border-slate-200 py-4">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex items-start gap-3">
            <span className="text-slate-400 flex-shrink-0 mt-0.5"><InfoIcon /></span>
            <p className="text-xs text-slate-500 leading-relaxed">
              <strong className="text-slate-700 font-semibold">PixPassVisa</strong> est un service indépendant de
              création de photos d&apos;identité conformes. Nous ne sommes <strong className="text-slate-700 font-semibold">pas affiliés</strong> à
              l&apos;ANTS (Agence Nationale des Titres Sécurisés) ni à aucune autorité gouvernementale. Nous ne
              fournissons pas le <strong className="text-slate-700 font-semibold">code e-photo à 22 caractères</strong> délivré
              par les photographes agréés et cabines homologuées : notre service vous fournit une photo conforme
              aux normes biométriques officielles, que vous utilisez ensuite pour obtenir ce code via les canaux
              officiels.
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
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}
function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
function ShieldIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  );
}
function InfoIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  );
}