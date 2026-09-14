// ─── French Translations Dictionary ───────────────────────────────────────────
// All user-facing French strings for the /fr section

export const fr = {
  // ── Navigation ──────────────────────────────────────────────────────────────
  nav: {
    home: "Accueil",
    passportPhoto: "Photo Passeport",
    idPhoto: "Photo d'identité",
    visaPhoto: "Photo Visa",
    guides: "Guides",
    start: "Commencer",
    getPhoto: "Obtenir ma photo",
    newPhoto: "Nouvelle photo",
    login: "Connexion",
    signup: "Inscription",
    dashboard: "Tableau de bord",
    logout: "Déconnexion",
    faq: "FAQ",
  },

  // ── Buttons ─────────────────────────────────────────────────────────────────
  buttons: {
    upload: "Télécharger une photo",
    selectCountry: "Choisir un pays",
    continue: "Continuer",
    createNow: "Créer maintenant",
    download: "Télécharger",
    checkout: "Procéder au paiement",
    startNow: "Commencer maintenant",
    uploadPhoto: "Télécharger votre photo →",
    getApprovedPhoto: "Obtenir ma photo conforme →",
    tryFree: "Essai gratuit →",
    loadMore: "Voir plus",
    clearSearch: "Effacer la recherche",
    startOver: "Recommencer",
    showGuide: "Voir le guide",
  },

  // ── Status Messages ─────────────────────────────────────────────────────────
  status: {
    uploading: "Téléchargement en cours...",
    processing: "Traitement de votre photo...",
    biometricCheck: "Vérification biométrique...",
    ready: "Votre photo est prête",
    redirecting: "Redirection vers votre photo...",
    processingSteps: [
      "Correction de l'éclairage et de l'exposition...",
      "Suppression de l'arrière-plan...",
      "Calibrage de la taille de la tête...",
      "Alignement du niveau des yeux...",
      "Vérification des normes biométriques OACI...",
      "Analyse des points faciaux...",
      "Finalisation de la sortie haute résolution...",
    ],
  },

  // ── Error Messages ──────────────────────────────────────────────────────────
  errors: {
    unsupportedFormat: "Format non pris en charge",
    invalidImage: "Veuillez sélectionner une image valide",
    genericError: "Une erreur est survenue",
    retry: "Veuillez réessayer",
    validationError: "Erreur de validation",
    noDocuments: "Aucun document trouvé",
  },

  // ── Preview Page ────────────────────────────────────────────────────────────
  preview: {
    title: "Votre photo est prête",
    aiVerification: "Vérification IA",
    compliant: "Photo conforme",
    downloadPreview: "Télécharger l'aperçu",
    yourPhoto: "Votre photo",
    activeRequirement: "Exigence active",
    dimensions: "Dimensions",
    background: "Arrière-plan",
    fullResolution: "Pleine résolution",
    watermarkedPreview: "Aperçu avec filigrane",
    escToClose: "Échap pour fermer",
    previewOnly: "Aperçu uniquement",
    whatWeFixed: "Ce que nous avons corrigé",
    faceDetection: "Détection du visage",
    eyeLevel: "Niveau des yeux",
    headSize: "Taille de la tête",
    backgroundCheck: "Arrière-plan",
    oneFaceVerified: "1 visage vérifié",
    singleFaceDetected: "Un seul visage détecté",
    corrected: "Corrigé ✓",
    reviewNeeded: "Vérification nécessaire",
    autoCorrected: "Auto-corrigé en blanc",
    needsCorrection: "Nécessite une correction",
    target: "Cible",
  },

  // ── Payment / Order ─────────────────────────────────────────────────────────
  payment: {
    orderSummary: "Résumé de la commande",
    acceptedFor: "Acceptée pour les demandes de passeport et visa",
    standardPack: "Pack Standard",
    premiumPack: "Pack Premium",
    expertReview: "Révision Expert",
    mostPopular: "LE PLUS POPULAIRE",
    emailForDelivery: "Email pour la livraison",
    enterEmail: "Entrez votre email",
    downloadNow: "Télécharger maintenant",
    getExpertReview: "Obtenir la révision expert",
    secureCheckout: "Paiement sécurisé",
    refundIfRejected: "Remboursement si rejetée",
    ssl: "SSL 256-bit",
    noSubscription: "Sans abonnement",
    standardFeatures: [
      "Vérification biométrique",
      "Acceptation 100% garantie",
      "Suppression de l'arrière-plan",
      "Photo numérique instantanée",
      "Planche d'impression A4",
    ],
    premiumFeatures: [
      "Tout le pack Standard inclus",
      "Révisée par un expert photo",
      "Vérifications de conformité supplémentaires",
      "Réduction des risques de rejet",
      "Acceptation 100% garantie",
      "Livraison par email incluse",
    ],
    moneyBack: "Remboursement intégral si votre photo est rejetée",
    whereToSend: "Où devons-nous l'envoyer ?",
    enterEmailForReceipt:
      "Entrez votre email pour recevoir votre photo traitée et votre reçu.",
    cancel: "Annuler",
  },

  // ── Result / Download ───────────────────────────────────────────────────────
  result: {
    paymentSuccess: "Paiement réussi !",
    photoReady: "Votre photo est prête à télécharger.",
    downloadDigital: "Télécharger la photo numérique",
    downloadPrintSheet: "Télécharger la planche d'impression",
    emailMe: "M'envoyer par email",
    rateUs: "Évaluez-nous",
    needAnother: "Besoin d'une autre photo ?",
    uploadAgain: "Télécharger à nouveau →",
  },

  // ── Metric Fixes ────────────────────────────────────────────────────────────
  metricFixes: [
    "Arrière-plan corrigé selon la norme gouvernementale",
    "Taille de la tête optimisée selon les spécifications officielles",
    "Position des yeux alignée dans la zone requise",
    "Espacement supérieur ajusté selon les règles de conformité",
    "Taille du fichier compressée dans la limite autorisée",
    "Résolution vérifiée pour les exigences de l'ambassade",
    "DPI d'impression standardisé pour l'impression officielle",

  
  ],

  // ── Hero Sections ───────────────────────────────────────────────────────────
  hero: {
    home: {
      title: "Photo Passeport en Ligne",
      subtitle: "Obtenez une photo d'identité conforme en 30 secondes",
      description:
        "Évitez les rejets, les retards et les resoumissions. Vérifications biométriques professionnelles conformes aux normes officielles mondiales — instantanément.",
      cta: "Obtenir votre photo d'identité →",
      animText: "Passeport • Visa • Carte d'identité • Permis de conduire",
    },
    passport: {
      title: "Photo Passeport en Ligne",
      subtitle: "Conforme aux normes officielles françaises et internationales",
      description:
        "Créez une photo passeport 35×45mm parfaitement conforme avec vérification biométrique IA. Fond blanc, cadrage automatique, résultat instantané.",
    },
    id: {
      title: "Photo d'Identité en Ligne",
      subtitle: "Conforme aux normes ANTS et préfecture",
      description:
        "Photo d'identité aux normes françaises pour CNI, permis de conduire et tous documents officiels. Résultat instantané.",
    },
    visa: {
      title: "Photo Visa en Ligne",
      subtitle: "Conforme pour tous les pays et types de visa",
      description:
        "Créez une photo visa conforme aux exigences de chaque pays. Schengen, États-Unis, Canada, et plus de 50 pays supportés.",
    },
    ephoto: {
      title: "ePhoto ANTS en Ligne",
      subtitle: "Photo numérique pour vos démarches ANTS",
      description:
        "Générez une ePhoto conforme pour soumettre votre demande de passeport ou carte d'identité sur le site ANTS.",
    },
    cni: {
      title: "Photo Carte d'Identité en Ligne",
      subtitle: "Aux normes de la carte nationale d'identité française",
      description:
        "Photo conforme aux exigences de la CNI française. Format 35×45mm, fond blanc uni, cadrage biométrique automatique.",
    },
    biometric: {
      title: "Photo Passeport Biométrique",
      subtitle: "Conforme aux normes OACI internationales",
      description:
        "Photo biométrique conforme aux standards OACI pour passeports et visas. Vérification automatique de la position des yeux, taille de la tête et arrière-plan.",
    },
  },

  // ── Trust Badges ────────────────────────────────────────────────────────────
  trust: {
    badges: [
      { icon: "🔒", text: "Sécurisé et privé" },
      { icon: "⚡", text: "Résultat en 30s" },
      { icon: "🌍", text: "Conformité mondiale" },
      { icon: "🆓", text: "Validation gratuite" },
    ],
    trustedBy: "Utilisé par plus de 17 000 utilisateurs",
    excellent: "Excellent",
    reviewsOn: "avis sur",
  },

  // ── Stats Strip ─────────────────────────────────────────────────────────────
  stats: [
    { stat: "12 000+", label: "Photos traitées" },
    { stat: "99,8%", label: "Taux d'acceptation" },
    { stat: "50+", label: "Pays supportés" },
    { stat: "30s", label: "Prêt en secondes" },
    { stat: "Officiel", label: "Conforme OACI" },
  ],

  // ── How It Works ────────────────────────────────────────────────────────────
  howItWorks: {
    sectionLabel: "Processus simple",
    title: "Comment créer une photo d'identité conforme en ligne",
    subtitle: "De l'envoi à la photo conforme en moins d'une minute.",
    steps: [
      {
        num: "01",
        title: "Télécharger votre photo",
        desc: "Envoyez votre photo. Nous acceptons les formats JPEG, PNG et HEIC depuis n'importe quel appareil.",
        icon: "📤",
      },
      {
        num: "02",
        title: "Validation instantanée",
        desc: "Votre photo est automatiquement vérifiée selon les règles spécifiques de chaque pays en quelques secondes.",
        icon: "⚡",
      },
      {
        num: "03",
        title: "Rapport de conformité",
        desc: "Visualisez exactement quels points sont conformes ou non, avec des raisons claires et des suggestions de correction.",
        icon: "📋",
      },
      {
        num: "04",
        title: "Petit frais",
        desc: "Tarification locale selon votre pays. Paiement unique pour des résultats professionnels.",
        icon: "💳",
      },
      {
        num: "05",
        title: "Télécharger",
        desc: "Obtenez votre photo conforme traitée et votre planche d'impression instantanément.",
        icon: "⬇️",
      },
    ],
    cta: "Commencer — Télécharger votre photo →",
  },

  // ── Requirements ────────────────────────────────────────────────────────────
  requirements: {
    sectionLabel: "Exigences officielles",
    title: "Spécifications techniques officielles 2026",
    subtitle:
      "Chaque photo est validée selon les exigences biométriques officielles des gouvernements et de l'OACI.",
    specs: [
      {
        label: "Dimensions",
        value: "35×45mm / 2×2in",
        detail: "Toutes tailles mondiales supportées",
      },
      {
        label: "Format",
        value: "JPEG / PNG",
        detail: "Optimisé pour la qualité",
      },
      {
        label: "Arrière-plan",
        value: "Dynamique",
        detail: "Blanc, gris clair, gris",
      },
      {
        label: "Position des yeux",
        value: "Biométrique",
        detail: "Centré selon les règles locales",
      },
      {
        label: "Taille de la tête",
        value: "Calibrée",
        detail: "Automatique du sommet au menton",
      },
      {
        label: "Expression",
        value: "Neutre",
        detail: "Bouche fermée, yeux ouverts",
      },
    ],
    note: {
      title: "Les exigences biométriques sont essentielles",
      text: "Les raisons de rejet les plus courantes sont une position incorrecte des yeux et une taille de tête inadaptée. Votre visage doit être centré, regardant directement l'objectif avec une expression neutre. Pas de lunettes, couvre-chefs (sauf religieux/médicaux), ni d'ombres sur le visage.",
    },
  },

  // ── FAQ Data ────────────────────────────────────────────────────────────────
  faq: {
    passport: [
      {
        q: "Quelle est la taille standard d'une photo passeport en 2026 ?",
        a: "En France, la taille officielle reste 35×45 mm (format portrait), conforme aux normes OACI mises à jour en 2025. Aux États-Unis, c'est 51×51 mm (2×2 pouces). Au Royaume-Uni, 35×45 mm. Notre outil détecte automatiquement votre pays et applique les dimensions exactes requises — aucun réglage manuel nécessaire.",
      },
      {
        q: "Puis-je prendre ma photo avec un smartphone en 2026 ?",
        a: "Absolument. Les smartphones récents (iPhone 15/16, Samsung Galaxy S24/S25, Pixel 8/9) offrent une qualité largement suffisante. Utilisez le capteur principal, désactivez les modes 'portrait' et 'beautification', et placez-vous face à une fenêtre pour un éclairage naturel diffus. Notre algorithme IA analyse et corrige la mise en page automatiquement.",
      },
      {
        q: "Les lunettes sont-elles autorisées sur une photo passeport ?",
        a: "Non. Depuis la directive OACI 2021, maintenue en 2026, les lunettes (de vue, de soleil, progressives) sont interdites sur toutes les photos d'identité biométriques. Notre système de détection IA repère automatiquement les lunettes et vous en informe avant traitement, vous évitant un refus à guichet.",
      },
      {
        q: "Quel fond dois-je utiliser pour ma photo passeport ?",
        a: "Un fond blanc uni ou très légèrement gris clair est exigé par la majorité des pays en 2026. Positionnez-vous à 80 cm à 1 mètre du fond pour éviter les ombres portées. Si votre fond n'est pas parfait, notre technologie de suppression d'arrière-plan par IA le corrige automatiquement avec un résultat naturel et conforme.",
      },
      {
        q: "Comment notre système garantit-il la conformité biométrique ?",
        a: "Notre moteur d'analyse biométrique vérifie plus de 30 critères OACI : position du visage, ouverture des yeux, expression neutre, éclairage uniforme, absence de reflets, résolution minimale, profondeur de champ, et bien d'autres. Chaque photo reçoit un score de conformité avant livraison. Nous garantissons le remboursement si votre photo est refusée.",
      },
      {
        q: "Combien coûte le service et que comprend le tarif ?",
        a: "La validation et l'analyse biométrique sont entièrement gratuites. Le téléchargement de la photo haute résolution traitée, prête à l'impression, est disponible à partir de 2,99 € (tarif unique, sans abonnement). Vous obtenez : le fichier numérique optimisé, la planche d'impression 10×15 cm, et le certificat de conformité OACI téléchargeable.",
      },
      {
        q: "Mes données biométriques et photos sont-elles protégées ?",
        a: "Oui, entièrement. Nous appliquons le RGPD et le Digital Services Act (DSA) européen de 2024. Vos photos originales sont supprimées automatiquement après 24 heures. Les fichiers traités sont chiffrés (AES-256) et les liens d'accès expirent après 1 heure. Aucune image faciale n'est utilisée pour entraîner nos modèles IA.",
      },
      {
        q: "Puis-je utiliser ma photo pour un renouvellement de passeport en ligne ?",
        a: "Oui. En 2026, de nombreux pays (France, Royaume-Uni, États-Unis, Canada, Australie…) permettent le dépôt de photo en ligne lors du renouvellement de passeport. Notre format de sortie (JPEG, fond blanc, 600×800 px min.) est compatible avec les portails officiels France Connect, GOV.UK, TravelDocs et USCIS.",
      },
      {
        q: "Combien de temps faut-il pour obtenir ma photo conforme ?",
        a: "Moins de 60 secondes pour la majorité des photos. Notre pipeline IA traite l'image, corrige le fond, centre le visage, calibre les dimensions et génère la planche d'impression en temps réel. Si une correction manuelle est nécessaire (flou, contre-jour excessif), le délai est de 5 à 10 minutes maximum.",
      },
      {
        q: "Puis-je porter un hijab, turban ou autre couvre-chef religieux ?",
        a: "Oui, sous conditions. Les couvre-chefs d'ordre religieux ou médical sont acceptés dans la plupart des pays à condition que le visage (front, joues, menton) reste entièrement visible. Notre système vérifie automatiquement que ces critères sont respectés pour chaque pays sélectionné et vous guide si des ajustements sont nécessaires.",
      },
      {
        q: "La photo est-elle acceptée pour les passeports de mes enfants ou nourrissons ?",
        a: "Oui. Nous gérons les photos pour tous les âges, y compris les nourrissons dès la naissance. Pour les bébés, placez l'enfant allongé sur un drap blanc et photographiez de dessus. Notre outil adapte automatiquement les critères biométriques selon l'âge (0–5 ans : règles assouplies sur l'expression et l'ouverture des yeux).",
      },
      {
        q: "Quels formats de sortie sont disponibles pour l'impression ou le dépôt numérique ?",
        a: "Nous fournissons : JPEG haute résolution (300 DPI) pour impression professionnelle, PNG transparent sur demande, planche 10×15 cm prête à imprimer chez tout photographe ou pharmacie, et fichier numérique optimisé pour les portails gouvernementaux en ligne. Tous les fichiers sont livrés par lien sécurisé téléchargeable pendant 1 heure.",
      },
    ],

    visa: [
      {
        q: "Quelles sont les dimensions requises pour une photo visa en 2026 ?",
        a: "Les dimensions varient selon le pays et le type de visa. Visa Schengen : 35×45 mm, fond blanc. Visa américain (DS-160) : 51×51 mm (600×600 px, 150 DPI min.). Visa indien (e-Visa) : 51×51 mm, fond blanc, fichier JPEG < 1 Mo. Notre outil sélectionne et applique automatiquement le bon format selon votre destination.",
      },
      {
        q: "Ma photo est-elle compatible avec le formulaire DS-160 pour le visa américain ?",
        a: "Oui. Notre outil génère des photos 100 % conformes aux exigences du DS-160 (édition 2025) : 600×600 pixels, fond blanc ou blanc cassé, visage occupant 50 à 69 % de la surface, yeux entre 56 et 69 % de hauteur totale, JPEG < 240 Ko. Le fichier est directement importable dans le portail CEAC du Département d'État américain.",
      },
      {
        q: "Puis-je utiliser la même photo pour mon passeport et mon visa Schengen ?",
        a: "Techniquement les dimensions sont identiques (35×45 mm pour la France), mais les exigences de date de validité diffèrent : certaines ambassades exigent une photo datant de moins de 6 mois. Nous vous recommandons de créer une photo spécifique pour chaque demande et d'indiquer la date dans le certificat de conformité que nous fournissons.",
      },
      {
        q: "Quels visas e-Visa et visas en ligne acceptent vos photos en 2026 ?",
        a: "Nous sommes compatibles avec plus de 60 portails e-Visa en 2026 : India e-Visa, Kenya ETA, Rwanda e-Visa, Saudi Arabia eVisa, UAE e-Visa, UK eVisa (remplaçant la vignette depuis 2024), ETIAS européen (ouverture 2026), Canada eTA, Australia ETA et bien d'autres. Chaque format est optimisé selon les spécifications techniques officielles.",
      },
      {
        q: "L'ETIAS européen est-il lancé en 2026 ? Vos photos sont-elles compatibles ?",
        a: "L'ETIAS (Système Européen d'Information et d'Autorisation de Voyage) est entré en phase opérationnelle progressive début 2026. Notre outil génère des photos conformes aux spécifications ETIAS : 35×45 mm, fond blanc, résolution 600 DPI, profil biométrique OACI. Nous mettons à jour nos paramètres en temps réel selon les directives de l'Agence de l'UE pour la gestion opérationnelle des systèmes.",
      },
      {
        q: "Puis-je porter des lunettes sur une photo visa ?",
        a: "Non. Conformément aux directives OACI adoptées par l'ensemble des pays délivrant des visas biométriques, les lunettes sont interdites depuis 2021. Cette règle s'applique également aux verres correcteurs transparents. Notre système détecte automatiquement la présence de lunettes et vous demande de retirer la photo avant traitement.",
      },
      {
        q: "La photo est-elle valable pour un visa de travail ou un visa long séjour ?",
        a: "Oui. Nos photos sont valables pour tous types de visas : tourisme, affaires, travail, études, regroupement familial, visa long séjour (VLS-TS), carte de séjour, et titre de voyage. Sélectionnez le type de document lors de votre commande pour recevoir le format et le certificat appropriés à la démarche administrative.",
      },
      {
        q: "Comment préparer ma photo pour un visa indien e-Visa 2026 ?",
        a: "Le e-Visa indien exige : photo JPEG, fond blanc uni, visage centré et occupant 70–80 % du cadre, taille 51×51 mm, fichier entre 10 Ko et 1 Mo, et prise datant de moins de 6 mois. Notre outil optimise automatiquement ces paramètres. Le fichier généré est directement importable sur le portail indianvisaonline.gov.in.",
      },
      {
        q: "Proposez-vous des photos pour les visas de pays africains ?",
        a: "Oui. En 2026, nous couvrons les visas de 38 pays africains dont le Kenya (ETA), l'Éthiopie (e-Visa), le Rwanda (e-Visa), le Maroc (consulaire), la Tanzanie (ETA), le Nigeria (consulaire) et l'Égypte (e-Visa). Les spécifications sont régulièrement synchronisées avec les portails officiels de chaque pays.",
      },
      {
        q: "Quelle est la durée de validité d'une photo pour un dossier visa ?",
        a: "La plupart des pays exigent une photo datant de moins de 6 mois au moment du dépôt du dossier. Certains pays (États-Unis, Inde) exigent une photo de moins de 6 mois à la date de l'entretien, pas du dépôt. Notre certificat de conformité inclut la date de création de la photo, ce qui est accepté par les consulats comme preuve de fraîcheur.",
      },
      {
        q: "Puis-je commander plusieurs photos pour différents pays en une seule session ?",
        a: "Oui. Notre fonction multi-pays vous permet de générer jusqu'à 5 formats différents à partir d'une seule photo téléchargée. Sélectionnez tous les pays et types de documents dans le panier, réglez une fois, et recevez tous les fichiers dans un zip sécurisé. Idéal pour un tour du monde ou des démarches consulaires multiples.",
      },
      {
        q: "Que faire si ma photo visa est refusée par l'ambassade ou le portail en ligne ?",
        a: "Notre garantie Conformité 100 % couvre tous les rejets liés aux critères biométriques ou techniques. En cas de refus, envoyez-nous le motif indiqué par le consulat ou le portail, et nous traitons une nouvelle photo sans frais supplémentaires dans les 2 heures. Si le problème vient de notre traitement, nous remboursons intégralement.",
      },
    ],

    home: [
      {
        q: "Qu'est-ce que PixPassVisa et en quoi est-il différent des photographes traditionnels ?",
        a: "PixPassVisa est une plateforme professionnelle d'identité photographique pilotée par l'IA, disponible 24h/24, 7j/7. Contrairement à un photographe traditionnel (délai de rendez-vous, tarif 10–25 €, déplacement), PixPassVisa livre votre photo conforme en moins de 60 secondes, depuis votre domicile, pour moins de 3 €. Nous couvrons plus de 50 pays et 10 types de documents.",
      },
      {
        q: "Comment fonctionne le service de A à Z ?",
        a: "1) Téléchargez votre selfie ou photo existante. 2) Sélectionnez votre pays et type de document (passeport, visa, carte d'identité…). 3) Notre IA analyse la conformité biométrique, corrige le fond, centre le visage et calibre les dimensions. 4) Vous recevez un aperçu avec score de conformité. 5) Téléchargez la photo haute résolution et la planche d'impression. Durée totale : moins de 2 minutes.",
      },
      {
        q: "La validation biométrique est-elle vraiment gratuite ?",
        a: "Oui, à 100 %. L'analyse biométrique, le score de conformité et l'aperçu de votre photo traitée sont entièrement gratuits, sans compte requis. Vous ne payez (tarif unique à partir de 2,99 €) que si vous souhaitez télécharger le fichier haute résolution et la planche d'impression prête à commander chez un imprimeur.",
      },
      {
        q: "Quels pays et documents sont supportés en 2026 ?",
        a: "Nous supportons 54 pays et 10 types de documents en 2026 : passeports (France, USA, UK, Inde, Canada, Allemagne, Australie, Espagne, Italie, Brésil, Japon, Corée du Sud…), visas Schengen, DS-160, e-Visas, cartes d'identité nationales, permis de conduire internationaux, titres de séjour, ETIAS, et photos pour cartes de transport sécurisées.",
      },
      {
        q: "Mon téléphone est-il suffisant pour obtenir une photo de qualité professionnelle ?",
        a: "Oui. Tout smartphone équipé d'un appareil photo de 12 Mpx ou plus (la majorité des modèles depuis 2020) est largement suffisant. Notre algorithme compense les imperfections courantes : légère surexposition, bruit numérique, distorsion grand-angle. Nous vous guidons pas à pas avec des conseils de prise de vue adaptés à l'éclairage détecté dans votre photo.",
      },
      {
        q: "Quelle technologie IA utilisez-vous pour traiter les photos ?",
        a: "Nous combinons plusieurs modèles spécialisés : détection faciale biométrique (landmarks 468 points), segmentation de fond par diffusion latente, super-résolution neuronale pour l'upscaling, et classification multiclasse pour la détection des lunettes, accessoires et expressions. Nos modèles sont entraînés sur des données anonymisées conformes RGPD et audités trimestriellement.",
      },
      {
        q: "Puis-je obtenir une photo conforme pour toute ma famille en une seule session ?",
        a: "Oui. Notre fonction Famille vous permet de traiter jusqu'à 6 photos individuelles (adultes, enfants, nourrissons) en une session unique. Chaque photo est analysée et traitée indépendamment. Un tarif famille dégressif s'applique à partir de 3 photos. Les planches d'impression peuvent être combinées sur une feuille 10×15 cm pour réduire les coûts d'impression.",
      },
      {
        q: "Puis-je imprimer moi-même la photo ou dois-je passer par un professionnel ?",
        a: "Les deux options fonctionnent. Vous pouvez imprimer chez vous sur papier photo glacé 300 DPI (résultat professionnel), ou envoyer notre fichier à une pharmacie, un laboratoire photo, ou un service d'impression en ligne. Nous fournissons également un bon de commande compatible avec les principales chaînes d'impression européennes (Fujifilm, Cewe, PhotoService).",
      },
      {
        q: "Mes données personnelles et photos sont-elles protégées et jamais revendues ?",
        a: "Vos données ne sont jamais vendues, partagées ou utilisées à des fins commerciales. Nous appliquons le RGPD, le DSA (Digital Services Act 2024) et la Loi 25 québécoise. Photos supprimées après 24h, liens expirés après 1h, chiffrement AES-256 en transit et au repos, zéro tracking publicitaire. Rapport de transparence publié semestriellement.",
      },
      {
        q: "PixPassVisa est-il accessible sur mobile et tablette ?",
        a: "Oui, PixPassVisa est une Progressive Web App (PWA) entièrement responsive, optimisée pour iOS et Android. Elle fonctionne directement dans votre navigateur (Safari, Chrome, Firefox) sans installation. Une application native iOS et Android est disponible sur l'App Store et le Google Play Store pour une expérience encore plus fluide avec accès à la caméra intégrée.",
      },
      {
        q: "Proposez-vous un service B2B pour les entreprises et administrations ?",
        a: "Oui. Notre offre PixPassVisa Business est disponible depuis 2025 : API RESTful pour intégration dans vos workflows RH ou consulaires, traitement en lot jusqu'à 500 photos/jour, tableau de bord administrateur avec historique et exports, facturation mensuelle, et support dédié SLA 4h. Contactez notre équipe commerciale pour un devis sur mesure.",
      },
      {
        q: "Que faire si je ne suis pas satisfait du résultat ?",
        a: "Si votre photo traitée ne vous convient pas ou est refusée par une autorité, notre garantie Conformité 100 % s'applique : nouveau traitement gratuit dans les 2 heures ou remboursement intégral sans condition. En 2025, notre taux de satisfaction client était de 98,7 % et notre taux de refus documentaire inférieur à 0,3 % sur plus de 2 millions de photos traitées.",
      },
    ],
  },

  // ── Testimonials ────────────────────────────────────────────────────────────
  testimonials: [
    {
      name: "Marie Dupont",
      text: "Service incroyable ! La suppression de l'arrière-plan était parfaite pour ma demande de visa. Économie d'un déplacement au studio.",
      country: "France",
      date: "Il y a 2 jours",
    },
    {
      name: "Jean-Pierre Martin",
      text: "Très rapide et précis. Les vérifications automatiques m'ont donné confiance que ma photo serait acceptée.",
      country: "France",
      date: "Il y a 3 jours",
    },
    {
      name: "Chloé Laurent",
      text: "C'est parfait ! L'outil a très bien géré mes cheveux bouclés lors de la suppression de l'arrière-plan.",
      country: "France",
      date: "Il y a 1 semaine",
    },
    {
      name: "Marc Lefèvre",
      text: "Outil excellent pour les photos passeport de toute la famille. Fait en moins de 10 minutes.",
      country: "Belgique",
      date: "Il y a 1 semaine",
    },
    {
      name: "Sophie Berger",
      text: "Interface claire et résultats excellents. Téléchargement du fichier haute résolution immédiat.",
      country: "Suisse",
      date: "Il y a 2 semaines",
    },
    {
      name: "Karim Benali",
      text: "Précis et abordable. Les instructions étaient très claires.",
      country: "Maroc",
      date: "Il y a 3 semaines",
    },
    {
      name: "Isabelle Roy",
      text: "Un sauveur ! J'avais besoin d'une photo visa urgente tard le soir et ça a fonctionné.",
      country: "Canada",
      date: "Il y a 1 mois",
    },
    {
      name: "Thomas Petit",
      text: "Résultat parfait directement depuis le navigateur du téléphone.",
      country: "France",
      date: "Il y a 1 mois",
    },
  ],

  // ── Tool Page ───────────────────────────────────────────────────────────────
  tool: {
    searchPlaceholder: "Rechercher un pays ou type de document…",
    activeRequirement: "Exigence active",
    dimensions: "Dimensions",
    background: "Arrière-plan",
    noAiDisclaimer:
      "Nous n'utilisons pas l'IA pour modifier les traits du visage et ne créons pas d'images synthétiques. Nous fournissons uniquement le recadrage, le redimensionnement, la normalisation de l'arrière-plan et la validation de conformité basés sur les directives 2026 pour photos passeport et visa.",
    noAiBadge: "Pas d'IA pour l'édition faciale",
    expertReview: "Révision expert disponible",
    biometricEngine: "Moteur biométrique officiel",
    calibrating:
      "Calibrage de la taille de la tête, correction de l'éclairage et vérification des normes biométriques OACI.",
  },

  // ── Guides ──────────────────────────────────────────────────────────────────
  guides: {
    index: {
      title: "Guides Photo d'Identité",
      subtitle: "Tout ce que vous devez savoir pour des photos conformes",
    },
    size: {
      title: "Taille Photo Passeport : Guide Complet 2026",
      description:
        "Découvrez les dimensions exactes requises pour les photos passeport dans chaque pays. Guide complet avec tableaux de tailles et conseils pratiques.",
    },
    background: {
      title: "Fond Photo Passeport : Règles et Astuces",
      description:
        "Apprenez les règles d'arrière-plan pour les photos passeport. Couleur, éclairage, ombres — tout ce qu'il faut savoir pour un fond conforme.",
    },
    howTo: {
      title: "Comment Prendre une Photo Passeport à la Maison",
      description:
        "Guide étape par étape pour prendre une photo passeport professionnelle chez vous avec votre téléphone. Conseils d'éclairage, position et cadrage.",
    },
    franceGuide: {
      title: "Photo d'Identité Officielle en France (2026)",
      description:
        "Comment créer une photo d'identité officielle en ligne en France : Passeport, CNI, ePhoto Permis, Visa, Titre de Séjour et Plus.",
    },
  },

  // ── Footer ──────────────────────────────────────────────────────────────────
  footer: {
    description:
      "Votre compagnon mondial pour des photos passeport et visa sécurisées et biométriques. Nous garantissons une conformité à 100% avec les directives officielles gouvernementales pour plus de 50 pays.",
    sections: {
      popularServices: "Services populaires",
      tools: "Outils et ressources",
      company: "Entreprise",
    },
    badges: ["100% Privé", "Vérification instantanée"],
    copyright: "Tous droits réservés.",
    disclaimer:
      "PixPassVisa est un service indépendant de retouche photo. Nous ne sommes pas affiliés à l'ANTS (Agence Nationale des Titres Sécurisés) ni à aucune agence gouvernementale et ne fournissons pas le code ePhoto à 22 caractères.",
    aboutUs: "À propos",
    contactUs: "Nous contacter",
    privacyPolicy: "Politique de confidentialité",
    terms: "Conditions d'utilisation",
    refundPolicy: "Politique de remboursement",
  },
} as const;

export type FrTranslations = typeof fr;
