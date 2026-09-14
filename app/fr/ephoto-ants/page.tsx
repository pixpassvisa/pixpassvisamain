import type { Metadata } from "next";
import Link from "next/link";
import HeroSectionFr from "../components/HeroSectionFr";
import TrustStripFr from "../components/TrustStripFr";
import HowItWorksFr from "../components/HowItWorksFr";
import RequirementsFr from "../components/RequirementsFr";
import StickyCTAFr from "../components/StickyCTAFr";
import BreadcrumbsFr from "../components/BreadcrumbsFr";
import {
  Eye,
  Ruler,
  ImageIcon,
  Sun,
  Smile,
  Glasses,
  Search,
  Building2,
  Smartphone,
  Zap,
  CheckCircle2,
  Camera,
  Upload,
  Bot,
  Download,
  Globe,
  FileText,
  Check,
  X,
  ShieldCheck,
  CreditCard,
  ChevronDown,
} from "lucide-react";

// ─── METADATA ────────────────────────────────────────────────
export const metadata: Metadata = {
  title: "ePhoto ANTS en Ligne — Code Photo Numérique Passeport & CNI 2026",
  description:
    "Obtenez votre ePhoto ANTS avec code numérique officiel en 30 secondes. Photo biométrique conforme pour passeport, carte d'identité et permis de conduire. Accepté par l'ANTS — sans photomaton.",
  keywords: [
    "code ephoto ants",
    "ephoto ants en ligne",
    "photo numérique ants",
  ],
  alternates: {
    canonical: "https://www.pixpassvisa.com/fr/ephoto-ants",
    languages: {
      fr: "https://www.pixpassvisa.com/fr/ephoto-ants",
      "x-default": "https://www.pixpassvisa.com/fr/ephoto-ants",
    },
  },
  openGraph: {
    title: "ePhoto ANTS en Ligne — Photo & Code Numérique | PixPassVisa",
    description:
      "Créez votre ePhoto ANTS conforme en 30s. Photo biométrique + code numérique pour passeport, CNI et permis. Sans déplacement.",
    url: "https://www.pixpassvisa.com/fr/ephoto-ants",
    siteName: "PixPassVisa",
    locale: "fr_FR",
    type: "website",
    images: [{ url: "https://www.pixpassvisa.com/og-image.jpg", width: 1200, height: 630, alt: "ePhoto ANTS en Ligne" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ePhoto ANTS en Ligne | PixPassVisa",
    description:
      "Créez votre ePhoto ANTS conforme en 30s. Photo biométrique pour passeport, CNI et permis.",
    images: ["https://www.pixpassvisa.com/og-image.jpg"],
  },
};

// ─── FAQ DATA ────────────────────────────────────────────────
const ephotoFaqs = [
  {
    q: "Qu'est-ce qu'une ePhoto ANTS et à quoi sert-elle ?",
    a: "L'ePhoto ANTS est une photo d'identité numérique requise pour toute demande de passeport ou carte nationale d'identité (CNI) effectuée en ligne sur le portail officiel de l'ANTS. Elle remplace la photo papier et doit respecter les normes biométriques ISO/IEC 19794-5 : dimensions 35×45 mm, fond blanc uni, visage centré entre 32 et 36 mm.",
  },
  {
    q: "Comment obtenir un code ePhoto ANTS en ligne ?",
    a: "Le code ePhoto à 22 caractères est exclusivement délivré par un photographe agréé ou un photomaton homologué par l'ANTS. PixPassVisa ne fournit pas ce code. En revanche, nous vous permettons de créer une photo parfaitement conforme aux normes biométriques ANTS — que vous pouvez ensuite présenter à un photographe agréé ou utiliser dans une cabine pour obtenir votre code rapidement et sans risque de refus.",
  },
  {
    q: "PixPassVisa est-il affilié à l'ANTS ou à une autorité gouvernementale ?",
    a: "Non. PixPassVisa est un service privé et indépendant, non affilié à l'ANTS (Agence Nationale des Titres Sécurisés) ni à aucune autorité gouvernementale. Notre expertise est la création de photos d'identité conformes aux normes biométriques officielles, que vous pouvez ensuite utiliser pour vos démarches administratives en toute confiance.",
  },
  {
    q: "L'ePhoto PixPassVisa est-elle garantie acceptée par l'ANTS ?",
    a: "Oui. Notre algorithme vérifie plus de 15 points de contrôle biométrique (cadrage, fond, éclairage, expression, yeux visibles). Si votre photo est validée par notre outil, elle respecte 100 % des critères officiels exigés pour la pré-demande de titre sécurisé.",
  },
  {
    q: "Puis-je utiliser un simple selfie pris avec mon smartphone ?",
    a: "Absolument. Prenez une photo face à une source de lumière naturelle (fenêtre), le regard droit vers l'objectif, avec une expression neutre. PixPassVisa se charge du reste : recadrage automatique au format 35×45 mm, ajustement du visage (32–36 mm) et remplacement de l'arrière-plan par un fond blanc conforme.",
  },
];

// ─── FEATURES DATA ───────────────────────────────────────────
const features = [
  {
    icon: ShieldCheck,
    label: "Conformité ANTS garantie",
    detail: "Vérification selon les critères officiels ISO/IEC 19794-5",
  },
  {
    icon: Zap,
    label: "Résultat en 30 secondes",
    detail: "Traitement IA instantané, sans attente",
  },
  {
    icon: Smartphone,
    label: "Depuis votre smartphone",
    detail: "Aucun photomaton ni photographe nécessaire",
  },
  {
    icon: Download,
    label: "Planche d'impression offerte",
    detail: "Format JPEG haute résolution + PDF 4 photos",
  },
  {
    icon: CheckCircle2,
    label: "Rapport de conformité complet",
    detail: "Visualisez chaque critère vérifié par l'IA",
  },
  {
    icon: Globe,
    label: "Support client réactif",
    detail: "Assistance en français si besoin",
  },
];

// ─── JSON-LD ─────────────────────────────────────────────────
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: ephotoFaqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

// ─── REJECTION ERRORS DATA ───────────────────────────────────
const rejectionErrors = [
  {
    icon: Eye,
    error: "Yeux non visibles ou regard non frontal",
    fix: "Notre IA vérifie l'axe du regard",
  },
  {
    icon: Ruler,
    error: "Visage hors des 32–36 mm requis",
    fix: "Recadrage automatique et précis",
  },
  {
    icon: ImageIcon,
    error: "Arrière-plan coloré ou texturé",
    fix: "Suppression et remplacement fond blanc",
  },
  {
    icon: Sun,
    error: "Ombres sur le visage ou le fond",
    fix: "Détection et alerte instantanée",
  },
  {
    icon: Smile,
    error: "Expression non neutre ou bouche ouverte",
    fix: "Analyse biométrique du visage",
  },
  {
    icon: Glasses,
    error: "Lunettes portées sur la photo",
    fix: "Détection et signalement obligatoire",
  },
  {
    icon: Search,
    error: "Photo floue ou sous-exposée",
    fix: "Contrôle qualité image automatique",
  },
];

// ─── DOCUMENTS DATA ──────────────────────────────────────────
const documents = [
  {
    title: "Passeport biométrique",
    href: "/fr/photo-passeport",
    description:
      "Renouvellement ou première demande. La photo numérique conforme remplace la photo papier dans votre dossier en ligne.",
  },
  {
    title: "Carte nationale d'identité (CNI)",
    href: "/fr/photo-carte-identite",
    description:
      "Valable 10 ans pour les adultes. Mêmes normes que le passeport : 35×45 mm, fond blanc, expression neutre.",
  },
  {
    title: "Permis de conduire",
    href: "/fr/photo-identite",
    description:
      "Première obtention ou échange de permis étranger. La même photo biométrique est acceptée via l'ANTS.",
  },
  {
    title: "Titre de séjour",
    href: "/fr/photo-visa",
    description:
      "Certaines démarches préfectorales dématérialisées requièrent également une photo numérique conforme ANTS.",
  },
];

// ─── PAGE ────────────────────────────────────────────────────
export default function EphotoAntsPage() {
  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumbs */}
      <BreadcrumbsFr
        items={[{ label: "ePhoto ANTS", href: "/fr/ephoto-ants" }]}
      />

      {/* Hero */}
      <HeroSectionFr
        title="Code ePhoto ANTS en Ligne — Passeport & CNI 2026"
        subtitle="Photo numérique biométrique + code conforme ANTS en 30 secondes"
        description="Créez votre ePhoto ANTS sans photomaton ni rendez-vous. Notre IA vérifie automatiquement le cadrage, le fond et la conformité ISO — pour votre passeport, carte d'identité ou permis de conduire."
        ctaHref="/fr/passport-photo-online?type=france-passport"
        ctaText="Obtenir mon ePhoto ANTS →"
        showImage={true}
      />

      {/* Trust strip */}
      <TrustStripFr />

      {/* ── SECTION 1 : Qu'est-ce que l'ePhoto ANTS ? ── */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-extrabold text-slate-900 mb-4">
            Qu&apos;est-ce que l&apos;ePhoto ANTS ?
          </h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            L&apos;ePhoto ANTS est la photo d&apos;identité numérique officielle
            exigée par l&apos;Agence Nationale des Titres Sécurisés pour toute
            demande en ligne de{" "}
            <Link href="/fr/photo-passeport" className="text-blue-600 hover:underline">
              passeport
            </Link>{" "}
            ou de{" "}
            <Link href="/fr/photo-carte-identite" className="text-blue-600 hover:underline">
              carte nationale d&apos;identité
            </Link>
            . Contrairement à une photo papier classique, l&apos;ePhoto est un
            fichier numérique conforme aux normes biométriques internationales
            (ISO/IEC 19794-5).
          </p>
          <p className="text-slate-600 leading-relaxed mb-8">
            Depuis 2021, la dématérialisation des démarches ANTS rend cette
            photo indispensable. Elle s&apos;accompagne d&apos;un code unique
            transmis lors de votre dépôt de dossier. Avec PixPassVisa, vous
            générez une photo aux normes exactes en moins de 30 secondes — sans
            vous déplacer en photomaton, sans attente, depuis n&apos;importe
            quel appareil.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Building2, label: "Conforme ANTS" },
              { icon: Smartphone, label: "Depuis votre téléphone" },
              { icon: Zap, label: "Prêt en 30 secondes" },
              { icon: CheckCircle2, label: "Normes ISO respectées" },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className="bg-slate-50 rounded-2xl p-4 border border-slate-100 flex flex-col items-center text-center"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center mb-2 text-blue-600">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-slate-700">
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SECTION 2 : Exigences officielles ── */}
      <RequirementsFr
        countryName="France (ANTS)"
        specs={[
          { label: "Dimensions", value: "35 × 45 mm", detail: "Norme ANTS officielle" },
          { label: "Format", value: "JPEG", detail: "Qualité haute résolution" },
          { label: "Arrière-plan", value: "Blanc uni", detail: "Sans ombre ni motif" },
          { label: "Visage", value: "32–36 mm", detail: "Du menton au sommet" },
          { label: "Résolution", value: "300+ DPI", detail: "Qualité d'impression" },
          { label: "Norme", value: "ISO 19794-5", detail: "Standard biométrique" },
        ]}
      />

      {/* ── SECTION 3 : Comment obtenir votre code ePhoto ── */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl font-extrabold text-slate-900 mb-4">
            Comment obtenir votre code ePhoto ANTS en ligne ?
          </h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            Le code ePhoto est normalement délivré par un photomaton agréé ANTS
            ou un photographe professionnel habilité. Ce processus implique un
            déplacement, une attente, et un coût souvent supérieur à 6&nbsp;€.
          </p>
          <p className="text-slate-600 leading-relaxed mb-6">
            PixPassVisa simplifie cette démarche&nbsp;: notre outil utilise une
            intelligence artificielle avancée pour analyser votre photo, ajuster
            automatiquement le cadrage{" "}
            <Link href="/fr/photo-passeport-biometrique" className="text-blue-600 hover:underline">
              biométrique
            </Link>
            , supprimer l&apos;arrière-plan et générer un fichier JPEG conforme
            aux exigences ANTS — le tout en moins d&apos;une minute.
          </p>

          <h3 className="text-lg font-bold text-slate-900 mb-4">
            Étapes pour créer votre ePhoto ANTS en ligne
          </h3>
          <ol className="space-y-3">
            {[
              {
                icon: Camera,
                step: "Prenez une photo avec votre téléphone",
                detail: "Fond clair, bonne lumière naturelle, regard direct vers l'objectif.",
              },
              {
                icon: Upload,
                step: "Téléchargez-la sur PixPassVisa",
                detail: "Formats JPEG, PNG et HEIC acceptés depuis n'importe quel appareil.",
              },
              {
                icon: Bot,
                step: "Vérification et ajustement automatiques",
                detail: "Notre IA corrige le cadrage, le fond blanc et la luminosité en temps réel.",
              },
              {
                icon: CheckCircle2,
                step: "Recevez votre rapport de conformité",
                detail: "Visualisez exactement quels points sont conformes ou à corriger.",
              },
              {
                icon: Download,
                step: "Téléchargez votre ePhoto prête à l'emploi",
                detail: "Fichier JPEG + planche d'impression pour vos démarches ANTS.",
              },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <li
                  key={i}
                  className="flex gap-4 p-4 bg-white rounded-xl border border-slate-100 items-start"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 text-blue-600 mt-0.5">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 text-sm">{item.step}</p>
                    <p className="text-slate-500 text-sm mt-0.5">{item.detail}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* ── SECTION 4 : Pour quels documents ── */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-extrabold text-slate-900 mb-2 text-center">
            Pour quels documents utiliser une ePhoto ANTS ?
          </h2>
          <p className="text-center text-slate-500 text-sm mb-8">
            Valable pour l&apos;ensemble des titres traités via{" "}
            <span className="font-medium">predemande.service-public.fr</span>
          </p>
          <div className="grid md:grid-cols-2 gap-5">
            {documents.map((doc, i) => (
              <Link
                key={i}
                href={doc.href}
                className="group p-5 border border-slate-200 rounded-xl hover:border-blue-400 hover:shadow-sm transition-all"
              >
                <h3 className="font-bold text-slate-900 mb-2 group-hover:text-blue-700 transition-colors">
                  {doc.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {doc.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 5 : Erreurs courantes ── */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl font-extrabold text-slate-900 mb-2 text-center">
            Erreurs courantes qui causent un refus ANTS
          </h2>
          <p className="text-center text-slate-500 text-sm mb-8">
            80&nbsp;% des rejets sont dus à des erreurs évitables. PixPassVisa
            les détecte toutes automatiquement.
          </p>
          <div className="space-y-3">
            {rejectionErrors.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className="flex items-start gap-4 p-4 bg-white rounded-xl border border-slate-100"
                >
                  <div className="w-9 h-9 rounded-lg bg-red-50 flex items-center justify-center shrink-0 text-red-600 mt-0.5">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-red-600 flex items-center gap-1.5">
                      <X className="w-4 h-4 shrink-0" />
                      <span>{item.error}</span>
                    </p>
                    <p className="text-sm text-emerald-700 mt-0.5 flex items-center gap-1.5">
                      <Check className="w-4 h-4 shrink-0 text-emerald-600" />
                      <span>{item.fix}</span>
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <p className="text-center text-slate-500 text-sm mt-6">
            Taux d&apos;acceptation ANTS constaté avec PixPassVisa&nbsp;:{" "}
            <span className="font-bold text-slate-800">99,8 %</span>
          </p>
        </div>
      </section>

      {/* ── SECTION 6 : Pourquoi PixPassVisa ── */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-extrabold text-slate-900 mb-2 text-center">
            Pourquoi choisir PixPassVisa pour votre ePhoto ANTS ?
          </h2>
          <p className="text-center text-slate-500 text-sm mb-8">
            Utilisé par plus de 17&nbsp;000 personnes pour leurs démarches
            officielles en France et dans 120+ pays.
          </p>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <div
                  key={i}
                  className="flex gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100 items-start"
                >
                  <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center shrink-0 text-blue-600 mt-0.5">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 text-sm">{f.label}</p>
                    <p className="text-slate-500 text-xs mt-0.5">{f.detail}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SECTION 7 : How it works (existing component) ── */}
      <HowItWorksFr />

      {/* ── SECTION 8 : FAQ ── */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl font-extrabold text-slate-900 mb-8 text-center">
            Questions fréquentes — ePhoto ANTS
          </h2>
          <div className="space-y-4">
            {ephotoFaqs.map((faq, i) => (
              <details
                key={i}
                className="group bg-white rounded-xl border border-slate-200 overflow-hidden"
              >
                <summary className="flex items-center justify-between gap-4 px-5 py-4 cursor-pointer font-semibold text-slate-800 text-sm list-none">
                  {faq.q}
                  <ChevronDown className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform shrink-0" />
                </summary>
                <p className="px-5 pb-5 text-slate-600 text-sm leading-relaxed">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── DISCLAIMER ── */}
      <div className="bg-slate-100 border-y border-slate-200 py-4">
        <div className="max-w-3xl mx-auto px-4 flex items-start gap-3">
          <svg className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
          <p className="text-xs text-slate-500 leading-relaxed">
            <strong className="text-slate-600">PixPassVisa</strong> est un service indépendant de création de photos d&apos;identité conformes.
            Nous ne sommes <strong className="text-slate-600">pas affiliés</strong> à l&apos;ANTS (Agence Nationale des Titres Sécurisés)
            ni à aucune autorité gouvernementale et ne délivrons pas le <strong className="text-slate-600">code ePhoto à 22 caractères</strong>.
            Notre service vous fournit une photo parfaitement conforme aux normes biométriques officielles,
            que vous pouvez ensuite utiliser pour obtenir votre code ePhoto via un photographe agréé ou une cabine homologuée.
          </p>
        </div>
      </div>

      {/* ── SECTION 9 : Internal link hub ── */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-lg font-bold text-slate-900 mb-5 text-center">
            Guides et ressources associés
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {[
              { icon: FileText, label: "Photo Passeport", href: "/fr/photo-passeport" },
              { icon: CreditCard, label: "Photo CNI", href: "/fr/photo-carte-identite" },
              { icon: Globe, label: "Photo Visa", href: "/fr/photo-visa" },
              { icon: Camera, label: "Photo Biométrique", href: "/fr/photo-passeport-biometrique" },
              { icon: Ruler, label: "Taille photo", href: "/fr/guides/passport-photo-size" },
              { icon: ImageIcon, label: "Fond photo", href: "/fr/guides/passport-photo-background" },
            ].map((link, i) => {
              const Icon = link.icon;
              return (
                <Link
                  key={i}
                  href={link.href}
                  className="flex flex-col items-center gap-2 p-3 rounded-xl border border-slate-100 hover:border-blue-400 hover:bg-blue-50/70 transition-all text-center"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-semibold text-slate-700">
                    {link.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Sticky CTA */}
      <StickyCTAFr
        ctaHref="/fr/passport-photo-online?type=france-passport"
        ctaText="Créer votre ePhoto ANTS"
      />
    </>
  );
}