import type { Metadata } from "next";
import Link from "next/link";
import BreadcrumbsFr from "../../components/BreadcrumbsFr";
import FaqSectionFr from "../../components/FaqSectionFr";
import StickyCTAFr from "../../components/StickyCTAFr";
import {
  FolderArchive,
  Ruler,
  FileText,
  Car,
  Globe,
  Zap,
  AlertTriangle,
  Smile,
  Sun,
  Square,
  Glasses,
  Sparkles,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Photo d'Identité France 2026 : Passeport, CNI, ePhoto Permis, Visa | PixPassVisa",
  description: "Photo identité France 2026 : créez une photo passeport en ligne, une photo CNI en ligne ou une ePhoto ANTS conforme pour le permis, le visa et plus.",
  keywords: [
    "photo identite france",
    "photo passeport en ligne",
    "photo cni en ligne",
    "ephoto ants",
    "photo d'identité",
    "photo biométrique",
  ],
  alternates: {
    canonical: "https://www.pixpassvisa.com/fr/guides/photo-identite-france-passeport-cni-ephoto-permis-visa",
    languages: {
      fr: "https://www.pixpassvisa.com/fr/guides/photo-identite-france-passeport-cni-ephoto-permis-visa",
      "x-default": "https://www.pixpassvisa.com/fr/guides/photo-identite-france-passeport-cni-ephoto-permis-visa",
    },
  },
  openGraph: {
    title: "Photo d'Identité France 2026 : Passeport, CNI, ePhoto Permis, Visa | PixPassVisa",
    url: "https://www.pixpassvisa.com/fr/guides/photo-identite-france-passeport-cni-ephoto-permis-visa",
    locale: "fr_FR",
    type: "article",
    images: [{ url: "https://www.pixpassvisa.com/og-image.jpg", width: 1200, height: 630, alt: "Photo d'Identité France 2026" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Photo d'Identité France 2026 | PixPassVisa",
    description: "Guide pour la photo passeport en ligne, la photo CNI en ligne et l'ePhoto ANTS en France.",
    images: ["https://www.pixpassvisa.com/og-image.jpg"],
  },
};

const guideFaqs = [
  {
    q: "Peut-on sourire sur une photo d'identité française ?",
    a: "Non. Même un léger sourire entraîne un rejet. Les documents officiels (passeport, CNI, visa) exigent une expression neutre, bouche fermée et sourcils détendus.",
  },
  {
    q: "Puis-je porter des lunettes sur ma photo d'identité ?",
    a: "Oui, à condition que les verres soient transparents, sans reflet, et que la monture ne cache aucune partie des yeux. En cas de doute, retirez-les avant la prise de vue.",
  },
  {
    q: "Puis-je créer ma photo d'identité avec mon smartphone ?",
    a: "Oui. Avec PixPassVisa, une photo prise au smartphone suffit : notre IA ajuste automatiquement le cadrage, le fond et la conformité aux normes biométriques de l'ANTS.",
  },
  {
    q: "Combien de temps une photo d'identité reste-t-elle valide ?",
    a: "Pour la plupart des démarches administratives françaises, la photo doit dater de moins de six mois au moment du dépôt.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      headline: "Photo d'Identité France 2026 : Passeport, CNI, ePhoto Permis, Visa",
      description: "Guide pour créer une photo passeport en ligne, une photo CNI en ligne ou une ePhoto ANTS conforme en France.",
      inLanguage: "fr",
      author: { "@type": "Organization", name: "PixPassVisa" },
    },
    {
      "@type": "FAQPage",
      mainEntity: guideFaqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  ],
};

export default function FranceGuidePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BreadcrumbsFr
        items={[
          { label: "Guides", href: "/fr/guides" },
          { label: "Photo d'identité France", href: "/fr/guides/photo-identite-france-passeport-cni-ephoto-permis-visa" },
        ]}
      />
      <article className="py-16 lg:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-6 leading-tight">
            Photo d&apos;Identité France 2026 : Passeport, CNI, ePhoto Permis, Visa
          </h1>
          <p className="text-lg text-slate-600 mb-4 leading-relaxed">
            En France, la photo identité conditionne l&apos;acceptation de la plupart des démarches administratives.
            Une photo non conforme entraîne un rejet de dossier, un retard, voire l&apos;obligation de reprendre
            rendez-vous. Ce guide 2026 explique quels documents exigent une photo biométrique, quelles normes
            respecter, et comment créer une photo passeport en ligne ou une photo CNI en ligne sans vous déplacer.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4 flex items-center gap-2.5">
            <FolderArchive className="w-6 h-6 text-blue-600 shrink-0" />
            <span>Quels documents exigent une photo d&apos;identité ?</span>
          </h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            En France, une photo biométrique récente reste obligatoire pour le passeport, la carte nationale
            d&apos;identité (CNI), le visa et la naturalisation. Elle l&apos;est également pour le titre de séjour,
            la carte de résident et le permis de travail des ressortissants étrangers, ainsi que pour le permis de
            conduire (via l&apos;ePhoto ANTS) et le permis de chasse. Au quotidien, la carte Vitale, la carte
            étudiante, le badge professionnel et certaines cartes de transport comme Navigo la demandent aussi.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-6 flex items-center gap-2.5">
            <Ruler className="w-6 h-6 text-blue-600 shrink-0" />
            <span>Normes officielles 2026 pour une photo d&apos;identité</span>
          </h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            La France applique des règles biométriques strictes pour garantir une identification fiable :
          </p>
          <div className="space-y-4 mb-10">
            {[
              { title: "Dimensions", desc: "Format unique de 35 × 45 mm, avec une résolution numérique d'au moins 413 × 531 pixels (300 DPI)." },
              { title: "Taille du visage", desc: "Entre 32 et 36 mm, mesurés du menton au sommet du crâne." },
              { title: "Arrière-plan", desc: "Uni et clair — gris clair ou bleu très pâle. Le blanc pur est formellement déconseillé par l'administration." },
              { title: "Position et expression", desc: "Regard droit vers l'objectif, tête parfaitement droite, expression neutre, bouche fermée, yeux bien ouverts." },
              { title: "Lunettes", desc: "Autorisées seulement si les verres sont transparents, sans reflet, et si la monture ne masque aucune partie des yeux." },
            ].map((norm, i) => (
              <div key={i} className="flex gap-4 p-5 bg-white border border-slate-200/80 rounded-2xl">
                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 font-bold text-sm">{i + 1}</div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm mb-1">{norm.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{norm.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4 flex items-center gap-2.5">
            <FileText className="w-6 h-6 text-blue-600 shrink-0" />
            <span>Photo passeport et CNI : la même norme</span>
          </h2>
          <p className="text-slate-600 leading-relaxed mb-8">
            La photo pour le passeport et la carte nationale d&apos;identité suit précisément les mêmes critères
            biométriques, qu&apos;il s&apos;agisse d&apos;une première demande, d&apos;un renouvellement, ou d&apos;un
            dossier pour un enfant. Une seule photo conforme sert généralement pour les deux titres si vous les
            demandez ensemble, à condition qu&apos;elle date de moins de six mois.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4 flex items-center gap-2.5">
            <Car className="w-6 h-6 text-blue-600 shrink-0" />
            <span>ePhoto ANTS pour le permis de conduire : la différence</span>
          </h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            L&apos;ePhoto ANTS n&apos;est pas une simple photo d&apos;identité : elle associe un cliché biométrique à
            une signature numérique et à un code de transfert unique, transmis directement au système de l&apos;ANTS.
            Ce format est exigé pour la création, le renouvellement, le duplicata ou le changement d&apos;adresse
            d&apos;un permis de conduire en ligne.
          </p>
          <div className="overflow-x-auto rounded-2xl border border-slate-200 mb-12">
            <table className="w-full text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-left font-bold text-slate-700">Élément</th>
                  <th className="px-4 py-3 text-left font-bold text-slate-700">Photo classique</th>
                  <th className="px-4 py-3 text-left font-bold text-slate-700">ePhoto ANTS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  { name: "Photo imprimée", classic: "Oui", ephoto: "Oui" },
                  { name: "Signature numérique", classic: "Non", ephoto: "Oui" },
                  { name: "Code de transfert unique", classic: "Non", ephoto: "Oui" },
                  { name: "Transmission directe à l'ANTS", classic: "Non", ephoto: "Oui" },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 font-semibold text-slate-800">{row.name}</td>
                    <td className="px-4 py-3 text-slate-500">{row.classic}</td>
                    <td className="px-4 py-3 font-bold text-blue-600">{row.ephoto}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4 flex items-center gap-2.5">
            <Globe className="w-6 h-6 text-blue-600 shrink-0" />
            <span>Visa, titre de séjour et naturalisation</span>
          </h2>
          <p className="text-slate-600 leading-relaxed mb-10">
            Les ressortissants étrangers vivant en France ou souhaitant s&apos;y installer doivent aussi fournir une
            photo d&apos;identité conforme aux normes biométriques françaises, que ce soit pour un visa touristique,
            d&apos;études ou de travail, ou pour une demande de naturalisation. La photo doit rester nette et fidèle
            aux traits du visage, sans retouche ni filtre.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-6 flex items-center gap-2.5">
            <Zap className="w-6 h-6 text-blue-600 shrink-0" />
            <span>Comment créer votre photo d&apos;identité en ligne</span>
          </h2>
          <p className="text-slate-600 leading-relaxed mb-8">
            Créer une photo passeport en ligne ou une photo CNI en ligne prend quelques minutes, sans cabine photo
            ni déplacement :
          </p>
          <div className="space-y-6 mb-12">
            {[
              { step: "01", title: "Prenez une photo", desc: "Placez-vous face à une fenêtre pour une lumière naturelle, à environ 1,5 m de l'appareil, en regardant droit devant vous." },
              { step: "02", title: "Importez l'image", desc: "Téléversez votre photo sur PixPassVisa : notre IA détecte le visage et ajuste le centrage automatiquement." },
              { step: "03", title: "Choisissez le document", desc: "Sélectionnez passeport, CNI, visa, ePhoto ou carte Vitale pour appliquer le recadrage biométrique correspondant." },
              { step: "04", title: "Téléchargez votre photo conforme", desc: "Récupérez un fichier numérique haute résolution, prêt pour l'ANTS, ou une planche d'impression à faire tirer en pharmacie." },
            ].map((step, idx) => (
              <div key={idx} className="flex gap-5 items-start bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <div className="shrink-0 w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center font-black text-blue-700 text-lg">{step.step}</div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">{step.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-6 flex items-center gap-2.5">
            <AlertTriangle className="w-6 h-6 text-amber-500 shrink-0" />
            <span>Erreurs fréquentes à éviter</span>
          </h2>
          <div className="grid sm:grid-cols-2 gap-4 mb-12">
            {[
              { icon: Smile, title: "Sourire, même léger", desc: "Toute expression autre que neutre entraîne un rejet. Gardez la bouche fermée et les sourcils détendus." },
              { icon: Sun, title: "Ombre sur le visage", desc: "Un éclairage asymétrique crée des ombres. Privilégiez une lumière de face, douce et naturelle." },
              { icon: Square, title: "Fond blanc pur", desc: "Le blanc écrase le contraste avec la peau. Utilisez un fond gris clair ou bleu très pâle." },
              { icon: Glasses, title: "Accessoires non autorisés", desc: "Chapeaux, casquettes et lunettes teintées sont refusés ; les cheveux ne doivent pas couvrir le visage." },
            ].map((err, i) => {
              const Icon = err.icon;
              return (
                <div key={i} className="bg-red-50/50 border border-red-100 rounded-2xl p-5 flex gap-3.5 items-start">
                  <div className="w-8 h-8 rounded-lg bg-red-100 text-red-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-red-950 text-base mb-1">{err.title}</h3>
                    <p className="text-xs text-red-700/90 leading-relaxed">{err.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4 flex items-center gap-2.5">
            <Sparkles className="w-6 h-6 text-blue-600 shrink-0" />
            <span>Pourquoi utiliser un générateur de photo passeport en ligne</span>
          </h2>
          <p className="text-slate-600 leading-relaxed mb-10">
            Un générateur de photo passeport en ligne évite tout déplacement et reste disponible 24h/24, à un tarif
            bien inférieur à celui d&apos;un studio ou d&apos;une cabine photo. Le double contrôle IA et humain
            vérifie la taille du visage, l&apos;alignement des yeux et la conformité du fond avant que vous ne
            soumettiez votre photo d&apos;identité, ce qui réduit fortement le risque de refus.
          </p>

          <div className="bg-blue-50/70 border border-blue-200 rounded-3xl p-8 text-center mt-4 shadow-sm">
            <h3 className="text-xl font-bold text-slate-950 mb-2">Créez votre photo d&apos;identité conforme dès aujourd&apos;hui</h3>
            <p className="text-sm text-slate-600 mb-6 max-w-lg mx-auto">
              Générez votre photo passeport, CNI, visa ou ePhoto conforme en quelques secondes, directement en ligne.
            </p>
            <Link
              href="/fr/passport-photo-online"
              className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold text-base hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/20 active:scale-95 duration-200"
            >
              <span>Commencer gratuitement</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </article>

      <FaqSectionFr faqs={guideFaqs} title="Questions fréquentes — Photos d'identité en France" />
      <StickyCTAFr />
    </>
  );
}