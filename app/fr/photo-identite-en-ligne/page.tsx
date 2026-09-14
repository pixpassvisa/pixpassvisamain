import type { Metadata } from "next";
import Link from "next/link";
import HeroSectionFr from "../components/HeroSectionFr";

import FaqSectionFr from "../components/FaqSectionFr";
import StickyCTAFr from "../components/StickyCTAFr";
import BreadcrumbsFr from "../components/BreadcrumbsFr";
import { fr } from "../translations";

export const metadata: Metadata = {
  title: "Photo d'Identité en Ligne — Passeport, Visa & CNI | PixPassVisa",
  description:
    "Faites votre photo d'identité en ligne depuis chez vous : fond conforme, recadrage biométrique IA, formats adaptés à chaque pays pour passeport, visa et CNI.",
 
  alternates: {
    canonical: "https://www.pixpassvisa.com/fr/photo-identite-en-ligne",
    languages: {
      en: "https://www.pixpassvisa.com/passport-photo-online",
      fr: "https://www.pixpassvisa.com/fr/photo-identite-en-ligne",
      de: "https://www.pixpassvisa.com/de/passbild-online",
      "x-default": "https://www.pixpassvisa.com/passport-photo-online",
    },
  },
  openGraph: {
    title: "Photo d'Identité en Ligne — Passeport, Visa & CNI | PixPassVisa",
    description:
      "Faites votre photo d'identité en ligne : fond conforme, recadrage biométrique IA, formats adaptés à chaque pays.",
    url: "https://www.pixpassvisa.com/fr/photo-identite-en-ligne",
    siteName: "PixPassVisa",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "https://www.pixpassvisa.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Photo d'Identité en Ligne",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Photo d'Identité en Ligne | PixPassVisa",
    description:
      "Faites votre photo d'identité en ligne : fond conforme, recadrage biométrique IA, formats adaptés à chaque pays.",
    images: ["https://www.pixpassvisa.com/og-image.jpg"],
  },
};

const onlineFaqs = [
  {
    q: "Une photo prise chez moi peut-elle remplacer le photomaton ?",
    a: "Oui pour la plupart des usages numériques et impressions à domicile. Certaines démarches ANTS exigent toutefois une e-photo délivrée par un professionnel agréé : vérifiez cette exigence sur votre espace ants.gouv.fr avant de déposer votre dossier.",
  },
  {
    q: "Le format change-t-il selon le pays de destination ?",
    a: "Oui. La France, le Canada, l'Inde et l'espace Schengen imposent chacun des dimensions et des fonds différents. PixPassVisa détecte le pays choisi et adapte automatiquement le format, la résolution et la couleur de fond.",
  },
  {
    q: "Quel fichier reçois-je après le traitement ?",
    a: "Un fichier JPEG haute résolution (413 × 531 px minimum, 300 DPI) optimisé pour l'impression et le téléversement en ligne, accompagné d'une planche d'impression prête pour un tirage en pharmacie ou chez un imprimeur.",
  },
  {
    q: "Combien de temps prend le traitement en ligne ?",
    a: "Moins de 30 secondes entre le téléversement de votre photo et la réception du fichier conforme, contre 10 à 20 minutes en moyenne dans un photomaton en libre-service.",
  },
  {
    q: "Que se passe-t-il si ma photo est refusée malgré tout ?",
    a: "PixPassVisa propose une garantie satisfait ou remboursé. Si votre dossier est rejeté pour un motif lié à la photo, contactez notre support avec la notification de refus pour obtenir un remboursement ou une nouvelle photo gratuite.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: "PixPassVisa — Photo d'Identité en Ligne",
      applicationCategory: "PhotographyApplication",
      operatingSystem: "All",
      inLanguage: "fr",
      offers: { "@type": "Offer", price: "6.99", priceCurrency: "EUR" },
    },
    {
      "@type": "FAQPage",
      mainEntity: onlineFaqs.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
  ],
};

export default function PhotoIdentiteEnLignePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BreadcrumbsFr
        items={[
          {
            label: "Photo d'identité en ligne",
            href: "/fr/photo-identite-en-ligne",
          },
        ]}
      />
      <HeroSectionFr
        title="Photo d'identité en ligne pour passeport, visa et carte d'identité"
        subtitle="Un fichier conforme en 30 secondes, sans déplacement"
        description="Téléversez une photo prise depuis votre smartphone : notre IA ajuste le fond, le cadrage et la luminosité selon les normes du document et du pays choisis."
        ctaHref="/fr/passport-photo-online"
        showImage={true}
      />
      <main className="mx-auto max-w-6xl px-6 py-16 text-slate-800">
        <article>
          <header className="mb-10">
            <p className="mt-6 text-lg leading-relaxed text-slate-600">
              Faire une <strong>photo d&apos;identité en ligne</strong> remplace
              aujourd&apos;hui la majorité des usages du photomaton. Notre outil
              transforme une photo prise au smartphone en portrait officiel,
              accepté par les administrations françaises et par de nombreuses
              ambassades. Vous évitez le déplacement en cabine ou en studio et
              recevez un fichier numérique prêt à imprimer ou à téléverser sur
              les portails officiels, en quelques clics.
            </p>
          </header>

          <section className="mb-10">
            <h2 className="mb-4 text-2xl font-semibold text-slate-900">
              Comment faire une photo d&apos;identité en ligne en 3 étapes
            </h2>
            <p className="mb-4 leading-relaxed">
              Notre algorithme analyse votre visage, ajuste le cadrage et
              corrige la luminosité pour respecter les exigences officielles du
              document choisi.
            </p>
            <ol className="mb-4 list-decimal space-y-2 pl-6 leading-relaxed">
              <li>
                Prenez une photo avec votre téléphone, sur un fond neutre et
                sous une lumière naturelle diffuse.
              </li>
              <li>
                Téléversez le cliché sur notre plateforme : le recadrage et le
                fond conforme s&apos;appliquent automatiquement.
              </li>
              <li>
                Téléchargez votre photo d&apos;identité numérique, prête à
                imprimer chez vous, en pharmacie, ou à intégrer directement dans
                un formulaire en ligne.
              </li>
            </ol>
            <p className="leading-relaxed">
              Le résultat respecte des dimensions exactes (35 × 45 mm pour la
              France), sans reflet, sans ombre et sans accessoire non
              autorisé.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="mb-4 text-2xl font-semibold text-slate-900">
              Ce qui a changé dans les normes ANTS
            </h2>
            <p className="mb-4 leading-relaxed">
              Les règles de l&apos;ANTS (Agence Nationale des Titres Sécurisés)
              évoluent régulièrement. Le fond blanc pur, longtemps toléré, est
              aujourd&apos;hui déconseillé : il réduit le contraste avec la
              peau et perturbe la détection automatique du visage lors des
              contrôles en préfecture. Utilisez un <strong>gris clair ou un
              bleu-gris neutre</strong>, sans motif ni ombre portée. PixPassVisa
              applique désormais ce fond par défaut sur chaque photo générée.
            </p>
            <p className="mb-4 leading-relaxed">
              Autre point souvent négligé : certaines démarches en ligne sur
              ants.gouv.fr exigent une <strong>e-photo</strong>, un code
              numérique délivré par un photographe agréé ou une cabine
              partenaire, distinct d&apos;une simple photo numérique. Vérifiez
              cette exigence sur votre espace personnel avant le dépôt, car elle
              varie selon la démarche et la mairie concernée.
            </p>
            <p className="leading-relaxed">
              Pour une carte nationale d&apos;identité, les mêmes règles de
              cadrage s&apos;appliquent : distance interoculaire correcte,
              menton dégagé, absence de verres teintés et arrière-plan
              homogène. Contrairement à un photomaton classique, dont le
              résultat dépend de la luminosité de la cabine, un traitement
              numérique applique un correctif identique à chaque photo, ce qui
              réduit nettement le taux de rejet en préfecture.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="mb-4 text-2xl font-semibold text-slate-900">
              Photo passeport biométrique : ce que la puce vérifie
            </h2>
            <p className="mb-4 leading-relaxed">
              Depuis l&apos;introduction des passeports électroniques, la photo
              passeport biométrique répond à des critères liés à la
              reconnaissance faciale. L&apos;image est encodée dans une puce et
              comparée automatiquement au visage du voyageur lors des contrôles
              aux frontières.
            </p>
            <p className="leading-relaxed">
              Une photo biométrique valide exige une netteté parfaite, une
              absence totale d&apos;ombre sur le visage et un contraste
              suffisant entre le sujet et l&apos;arrière-plan. Notre traitement
              d&apos;image ajuste ces paramètres pour que la photo passe les
              systèmes de lecture automatique, en France comme à
              l&apos;étranger.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="mb-4 text-2xl font-semibold text-slate-900">
              Photo visa : les exigences varient selon le pays
            </h2>
            <p className="mb-4 leading-relaxed">
              Chaque pays impose ses propres critères pour une photo visa.
              Voici les formats les plus recherchés :
            </p>
            <ul className="mb-4 space-y-3 leading-relaxed">
              <li>
                <strong>Visa Inde</strong> : format 2 × 2 pouces (51 × 51 mm),
                fond blanc pur exigé (contrairement à la France) et visage
                occupant 60 % du cadre. Les autorités indiennes contrôlent
                strictement la luminosité et la netteté.
              </li>
              <li>
                <strong>Visa Canada</strong> : format 50 × 70 mm, fond clair
                uni, photo de moins de six mois. Notre outil génère
                automatiquement les bonnes dimensions et peut ajouter le nom et
                la date de naissance si le formulaire l&apos;exige.
              </li>
              <li>
                <strong>Visa Schengen</strong> : format 35 × 45 mm, identique à
                la photo passeport français, avec un fond gris clair ou bleu
                pâle et une expression neutre obligatoire.
              </li>
            </ul>
            <p className="leading-relaxed">
              Un sélecteur de pays intégré ajuste automatiquement le format, la
              résolution et la couleur de fond attendue, qu&apos;il
              s&apos;agisse d&apos;un visa touristique, étudiant ou
              professionnel.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="mb-4 text-2xl font-semibold text-slate-900">
              Photo en ligne ou photomaton : ce qui différencie les deux
            </h2>
            <p className="mb-4 leading-relaxed">
              Le traitement en ligne présente des avantages concrets face au
              photomaton traditionnel :
            </p>
            <ul className="mb-4 list-disc space-y-2 pl-6 leading-relaxed">
              <li>
                Disponibilité immédiate, 24 heures sur 24, sans file
                d&apos;attente.
              </li>
              <li>
                Coût réduit par rapport à une cabine photo ou à un studio.
              </li>
              <li>
                Contrôle qualité automatique qui détecte les photos non
                conformes avant impression.
              </li>
              <li>
                Fichier réutilisable pour plusieurs démarches : passeport,
                visa, permis de conduire ou carte d&apos;identité.
              </li>
            </ul>
            <p className="leading-relaxed">
              Un photomaton reste dépendant de l&apos;éclairage de la cabine et
              de la qualité de l&apos;appareil installé. Un traitement
              numérique applique un correctif homogène à chaque photo, ce qui
              réduit le taux de rejet en préfecture ou en ambassade — sauf pour
              les démarches exigeant spécifiquement une e-photo d&apos;un
              professionnel agréé.
            </p>
          </section>
        </article>
      </main>
      <FaqSectionFr
        faqs={onlineFaqs}
        title="Questions fréquentes — Photo d'identité en ligne"
      />
      <StickyCTAFr ctaText="Créer votre photo d'identité en ligne" />
    </>
  );
}