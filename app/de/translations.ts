// ─── German Translations Dictionary ───────────────────────────────────────────
// All user-facing German strings for the /de section

export const de = {
  // ── Navigation ──────────────────────────────────────────────────────────────
  nav: {
    home: "Startseite",
    passportPhoto: "Passfoto",
    idPhoto: "Ausweisfoto",
    visaPhoto: "Visum Foto",
    guides: "Ratgeber",
    start: "Starten",
    getPhoto: "Foto erstellen",
    newPhoto: "Neues Foto",
    login: "Anmelden",
    signup: "Registrieren",
    dashboard: "Dashboard",
    logout: "Abmelden",
    faq: "FAQ",
  },

  // ── Buttons ─────────────────────────────────────────────────────────────────
  buttons: {
    upload: "Foto hochladen",
    selectCountry: "Land auswählen",
    continue: "Weiter",
    createNow: "Jetzt erstellen",
    download: "Herunterladen",
    checkout: "Zur Kasse",
    startNow: "Jetzt starten",
    uploadPhoto: "Laden Sie Ihr Foto hoch →",
    getApprovedPhoto: "Genehmigtes Foto erhalten →",
    tryFree: "Kostenlos testen →",
    loadMore: "Mehr anzeigen",
    clearSearch: "Suche löschen",
    startOver: "Von vorne beginnen",
    showGuide: "Anleitung anzeigen",
  },

  // ── Status Messages ─────────────────────────────────────────────────────────
  status: {
    uploading: "Wird hochgeladen...",
    processing: "Foto wird bearbeitet...",
    biometricCheck: "Biometrische Prüfung...",
    ready: "Ihr Foto ist fertig",
    redirecting: "Weiterleitung zu Ihrem Foto...",
    processingSteps: [
      "Belichtung und Helligkeit korrigieren...",
      "Hintergrund entfernen...",
      "Kopfgröße kalibrieren...",
      "Augenhöhe anpassen...",
      "Biometrische ICAO-Standards überprüfen...",
      "Gesichtsmerkmale analysieren...",
      "Hochauflösendes Bild finalisieren...",
    ],
  },

  // ── Error Messages ──────────────────────────────────────────────────────────
  errors: {
    unsupportedFormat: "Nicht unterstütztes Format",
    invalidImage: "Bitte wählen Sie ein gültiges Bild",
    genericError: "Ein Fehler ist aufgetreten",
    retry: "Bitte versuchen Sie es erneut",
    validationError: "Validierungsfehler",
    noDocuments: "Keine Dokumente gefunden",
  },

  // ── Preview Page ────────────────────────────────────────────────────────────
  preview: {
    title: "Ihr Foto ist fertig",
    aiVerification: "KI-Überprüfung",
    compliant: "Konformes Foto",
    downloadPreview: "Vorschau herunterladen",
    yourPhoto: "Ihr Foto",
    activeRequirement: "Aktive Anforderung",
    dimensions: "Maße",
    background: "Hintergrund",
    fullResolution: "Volle Auflösung",
    watermarkedPreview: "Vorschau mit Wasserzeichen",
    escToClose: "Esc zum Schließen",
    previewOnly: "Nur Vorschau",
    whatWeFixed: "Was wir korrigiert haben",
    faceDetection: "Gesichtserkennung",
    eyeLevel: "Augenhöhe",
    headSize: "Kopfgröße",
    backgroundCheck: "Hintergrund",
    oneFaceVerified: "1 Gesicht verifiziert",
    singleFaceDetected: "Nur ein Gesicht erkannt",
    corrected: "Korrigiert ✓",
    reviewNeeded: "Überprüfung erforderlich",
    autoCorrected: "Automatisch korrigiert auf Weiß",
    needsCorrection: "Benötigt Korrektur",
    target: "Ziel",
  },

  // ── Payment / Order ─────────────────────────────────────────────────────────
  payment: {
    orderSummary: "Bestellübersicht",
    acceptedFor: "Akzeptiert für Pass- und Visumanträge",
    standardPack: "Standard-Paket",
    premiumPack: "Premium-Paket",
    expertReview: "Expertenprüfung",
    mostPopular: "AM BELIEBTESTEN",
    emailForDelivery: "E-Mail für die Lieferung",
    enterEmail: "Geben Sie Ihre E-Mail ein",
    downloadNow: "Jetzt herunterladen",
    getExpertReview: "Expertenprüfung erhalten",
    secureCheckout: "Sichere Kasse",
    refundIfRejected: "Rückerstattung bei Ablehnung",
    ssl: "256-Bit SSL",
    noSubscription: "Kein Abonnement",
    standardFeatures: [
      "Biometrische Prüfung",
      "100% Akzeptanzgarantie",
      "Hintergrundentfernung",
      "Sofortiges digitales Foto",
      "A4-Druckbogen",
    ],
    premiumFeatures: [
      "Alles aus dem Standard-Paket enthalten",
      "Von einem Fotoexperten geprüft",
      "Zusätzliche Konformitätsprüfungen",
      "Verringertes Ablehnungsrisiko",
      "100% Akzeptanzgarantie",
      "Lieferung per E-Mail inklusive",
    ],
    moneyBack: "Volle Rückerstattung, falls Ihr Foto abgelehnt wird",
    whereToSend: "Wohin sollen wir es senden?",
    enterEmailForReceipt:
      "Geben Sie Ihre E-Mail ein, um Ihr bearbeitetes Foto und Ihre Quittung zu erhalten.",
    cancel: "Abbrechen",
  },

  // ── Result / Download ───────────────────────────────────────────────────────
  result: {
    paymentSuccess: "Zahlung erfolgreich!",
    photoReady: "Ihr Foto ist bereit zum Download.",
    downloadDigital: "Digitales Foto herunterladen",
    downloadPrintSheet: "Druckbogen herunterladen",
    emailMe: "Per E-Mail senden",
    rateUs: "Bewerten Sie uns",
    needAnother: "Benötigen Sie noch ein Foto?",
    uploadAgain: "Erneut hochladen →",
  },

  // ── Metric Fixes ────────────────────────────────────────────────────────────
  metricFixes: [
    "Hintergrund gemäß Regierungsstandard korrigiert",
    "Kopfgröße nach offiziellen Vorgaben optimiert",
    "Augenposition im erforderlichen Bereich ausgerichtet",
    "Oberer Abstand gemäß Konformitätsregeln angepasst",
    "Dateigröße innerhalb des zulässigen Limits komprimiert",
    "Auflösung für Botschaftsanforderungen verifiziert",
    "Standard-Druck-DPI für offiziellen Druck",
   
  ],

  // ── Hero Sections ───────────────────────────────────────────────────────────
  hero: {
    home: {
      title: "Biometrische Passbilder Online",
      subtitle: "Erhalten Sie ein konformes Ausweisfoto in 30 Sekunden",
      description:
        "Vermeiden Sie Ablehnungen, Verzögerungen und Neu-Einreichungen. Professionelle biometrische Prüfungen nach weltweiten offiziellen Standards — sofort.",
      cta: "Ihr Ausweisfoto erstellen →",
      animText: "Passfoto • Visum • Personalausweis • Führerschein",
    },
    passport: {
      title: "Biometrisches Passbild Online",
      subtitle: "Konform mit deutschen und internationalen offiziellen Standards",
      description:
        "Erstellen Sie ein perfekt konformes 35×45mm Passfoto mit KI-biometrischer Überprüfung. Einfacher Hintergrund, automatischer Zuschnitt, sofortiges Ergebnis.",
    },
    id: {
      title: "Personalausweis Foto Online",
      subtitle: "Konform mit deutschen Personalausweis-Standards",
      description:
        "Ausweisfoto nach deutschen Standards für den Personalausweis und alle offiziellen Dokumente. Sofortiges Ergebnis.",
    },
    visa: {
      title: "Visum Foto Online",
      subtitle: "Konform für alle Länder und Visumarten",
      description:
        "Erstellen Sie ein Visumfoto, das den Anforderungen des jeweiligen Landes entspricht. Schengen, USA, Kanada und über 50 weitere Länder.",
    },
    drivingLicense: {
      title: "Foto für den Führerschein",
      subtitle: "Konformes Foto für den deutschen Führerschein",
      description:
        "Erstellen Sie schnell und einfach ein biometrisches Passbild für Ihren neuen Führerschein.",
    },
    cv: {
      title: "Bewerbungsfoto Online Selber Machen",
      subtitle: "Professionelle Fotos für Lebenslauf & Online-Profile",
      description:
        "Erstellen Sie hochwertige Bewerbungsfotos und Bilder für LinkedIn oder Xing ganz einfach selbst.",
    },
    healthCard: {
      title: "Foto für Gesundheitskarte & Studentenausweis",
      subtitle: "Passend für elektronische Gesundheitskarte (eGK) und Uniausweis",
      description:
        "Laden Sie Ihr Foto hoch und wir passen es für Ihre Krankenkasse oder Universität perfekt an.",
    },
    biometric: {
      title: "Biometrische Passbilder",
      subtitle: "Konform nach ICAO-Standards",
      description:
        "Biometrisches Foto, das den ICAO-Standards für Pässe und Visa entspricht. Automatische Überprüfung von Augenposition, Kopfgröße und Hintergrund.",
    },
  },

  // ── Trust Badges ────────────────────────────────────────────────────────────
  trust: {
    badges: [
      { icon: "🔒", text: "Sicher & Privat" },
      { icon: "⚡", text: "Ergebnis in 30s" },
      { icon: "🌍", text: "Weltweite Konformität" },
      { icon: "🆓", text: "Kostenlose Prüfung" },
    ],
    trustedBy: "Von über 17.000 Nutzern verwendet",
    excellent: "Hervorragend",
    reviewsOn: "Bewertungen auf",
  },

  // ── Stats Strip ─────────────────────────────────────────────────────────────
  stats: [
    { stat: "12.000+", label: "Fotos verarbeitet" },
    { stat: "99,8%", label: "Akzeptanzrate" },
    { stat: "50+", label: "Unterstützte Länder" },
    { stat: "30s", label: "Fertig in Sekunden" },
    { stat: "Offiziell", label: "ICAO Konform" },
  ],

  // ── How It Works ────────────────────────────────────────────────────────────
  howItWorks: {
    sectionLabel: "Einfacher Prozess",
    title: "Wie man ein konformes Passfoto online erstellt",
    subtitle: "Vom Upload zum konformen Foto in weniger als einer Minute.",
    steps: [
      {
        num: "01",
        title: "Foto hochladen",
        desc: "Laden Sie Ihr Foto hoch. Wir akzeptieren JPEG, PNG und HEIC Formate von jedem Gerät.",
        icon: "📤",
      },
      {
        num: "02",
        title: "Sofortige Überprüfung",
        desc: "Ihr Foto wird in Sekundenschnelle automatisch nach den länderspezifischen Regeln geprüft.",
        icon: "⚡",
      },
      {
        num: "03",
        title: "Konformitätsbericht",
        desc: "Sehen Sie genau, welche Punkte konform sind oder nicht, mit klaren Gründen und Korrekturvorschlägen.",
        icon: "📋",
      },
      {
        num: "04",
        title: "Kleine Gebühr",
        desc: "Lokale Preisgestaltung je nach Land. Einmalige Zahlung für professionelle Ergebnisse.",
        icon: "💳",
      },
      {
        num: "05",
        title: "Herunterladen",
        desc: "Erhalten Sie sofort Ihr bearbeitetes konformes Foto und Ihren Druckbogen.",
        icon: "⬇️",
      },
    ],
    cta: "Starten — Foto hochladen →",
  },

  // ── Requirements (Provided Content) ─────────────────────────────────────────
  requirements: {
    sectionLabel: "Anforderungen",
    title: "Biometrische Passbilder müssen viele Anforderungen erfüllen",
    subtitle:
      "Damit sie der Biometrietauglichkeit entsprechen und als Passbilder für offizielle Dokumente anerkannt werden. Diese Voraussetzungen werden in Zusammenarbeit mit der EU und der Internationalen Zivilluftfahrtorganisation (ICAO) durch das Bundesministerium des Innern vorgegeben und werden auf einer Foto-Mustertafel definiert.",
    specs: [
      {
        label: "Format & Größe",
        value: "3,5 x 4,5 cm",
        detail: "Um den Anforderungen zu entsprechen, hat der Gesetzgeber eine einheitliche Größe von 35x45 mm festgelegt.",
      },
      {
        label: "Schärfe & Kontrast",
        value: "Hoch",
        detail: "Ein biometrisches Passbild erfüllt nur dann die Anforderungen, wenn es scharf und mit einem ausreichenden Kontrast aufgenommen wurde.",
      },
      {
        label: "Ausleuchtung",
        value: "Gleichmäßig",
        detail: "Vorgaben des Gesetzgebers müssen genau eingehalten werden, um als Passbild akzeptiert zu werden.",
      },
      {
        label: "Hintergrund",
        value: "Einfarbig",
        detail: "Der Bildhintergrund muss einfarbig sein und einen guten Kontrast zum Kopf und den Haaren aufweisen.",
      },
      {
        label: "Kopfposition & Gesichtsausdruck",
        value: "Zentriert & Neutral",
        detail: "Der Kopf darf nicht zur Seite gedreht sein, und der Gesichtsausdruck muss neutral sein (Mund geschlossen).",
      },
      {
        label: "Augen & Blickrichtung",
        value: "Direkt in die Kamera",
        detail: "Augen müssen geöffnet sein und direkt in die Kamera blicken, ohne rote Augen.",
      },
    ],
    note: {
      title: "Weitere Besonderheiten",
      text: "Brillenträger: Die Brille darf die Augen nicht verdecken. Kopfbedeckung: Grundsätzlich ohne, Ausnahmen aus religiösen oder medizinischen Gründen. Kinder & Babys: Für Kinder unter 10 Jahren gelten gelockerte Regeln bei der Kopfposition und dem Gesichtsausdruck.",
    },
  },

  // ── Tool Page ───────────────────────────────────────────────────────────────
  tool: {
    searchPlaceholder: "Land oder Dokumententyp suchen…",
    activeRequirement: "Aktive Anforderung",
    dimensions: "Maße",
    background: "Hintergrund",
    noAiDisclaimer:
      "Wir verwenden keine KI, um Gesichtszüge zu verändern, und erstellen keine synthetischen Bilder. Wir bieten lediglich Zuschneiden, Größenanpassung, Hintergrundnormalisierung und Konformitätsprüfung auf der Grundlage der Richtlinien von 2026 für Pass- und Visumfotos.",
    noAiBadge: "Keine KI für Gesichtsbearbeitung",
    expertReview: "Expertenprüfung verfügbar",
    biometricEngine: "Offizielle biometrische Engine",
    calibrating:
      "Kopfgröße kalibrieren, Beleuchtung korrigieren und biometrische ICAO-Standards überprüfen.",
  },

  // ── Guides / Tips ───────────────────────────────────────────────────────────
  guides: {
    index: {
      title: "Tipps & Tricks",
      subtitle: "Erfahren Sie hier viele Tipps & Tricks, Hilfestellungen und Neuigkeiten zu biometrischen Passbildern.",
    },
    fuehrerschein: {
      title: "Foto für den Führerschein",
      description: "Sie brauchen ein neues Foto für den Führerschein? Dann sind Sie hier genau richtig. Die Aufnahme soll schnell, preiswert und hochwertig sein.",
    },
    bewerbung: {
      title: "Bewerbungsfoto: Online selber machen & Tipps",
      description: "Der neue Traum-Job ist in Aussicht, die Bewerbung ist geschrieben und jetzt fehlt nur noch... das perfekte Bewerbungsfoto.",
    },
    rossmann: {
      title: "Passbilder bei Rossmann drucken lassen",
      description: "Sie haben Ihre Passbild-Vorlage erstellt und wissen nicht, wo Sie diese am besten ausdrucken können? Ein Rossmann in der Nähe ist perfekt.",
    },
    kinderausweis: {
      title: "Passfotos für den Kinderausweis oder Kinderreisepass selbst erstellen",
      description: "Schnuller raus, Kuscheltier weg – seit dem Jahr 2012 benötigen selbst Säuglinge ein eigenes Reisedokument mit einem biometrischen Passbild.",
    },
    kosten: {
      title: "Durchschnittliche Kosten für ein biometrisches Passbild",
      description: "Je nach Art der Aufnahme kosten biometrische Passbilder derzeit ungefähr ca. zwischen 5 und 20 Euro.",
    },
    babys: {
      title: "Besonderheiten bei biometrischen Passbildern für Babys",
      description: "Seit dem 26. Juni 2012 müssen auch Babys über einen Ausweis verfügen. Hier gelten allerdings oft gelockerte biometrische Vorgaben.",
    },
  },

  // ── FAQ Data ────────────────────────────────────────────────────────────────
  faq: {
    general: [
      {
        q: "Welche Größe hat ein biometrisches Passbild?",
        a: "In Deutschland hat ein biometrisches Passbild die offizielle Größe von 35 x 45 mm (ohne Rand).",
      },
      {
        q: "Darf ich auf einem biometrischen Passbild lächeln?",
        a: "Nein, ein leichtes Schmunzeln ist gerade noch erlaubt, aber ein breites Lächeln mit sichtbaren Zähnen führt zur Ablehnung. Der Gesichtsausdruck muss neutral sein, der Mund geschlossen.",
      },
      {
        q: "Welcher Hintergrund ist für Passbilder vorgeschrieben?",
        a: "Der Hintergrund muss einfarbig hell sein, idealerweise ein helles Grau, ohne Muster oder Schatten. Ein reines Weiß ist oft ungünstig, weil helle Haut oder Haare nicht genug Kontrast bilden.",
      },
      {
        q: "Werden Passbilder digital eingereicht?",
        a: "Künftig sollen Passfotos in Deutschland digital vorgelegt werden (laut Gesetzesentwurf von 2020), um Manipulationen vorzubeugen. Derzeit werden meist noch ausgedruckte Bilder auf Fotopapier akzeptiert.",
      },
      {
        q: "Welche Ausnahmen gelten für Babys und Kleinkinder?",
        a: "Bei Kindern unter 10 Jahren sind Abweichungen bei der Kopfgröße und -haltung zulässig. Babys unter 1 Jahr müssen nicht in die Kamera schauen oder den Kopf gerade halten. Der Hintergrund muss trotzdem einfarbig hell sein.",
      },
    ]
  },

  // ── Footer ──────────────────────────────────────────────────────────────────
  footer: {
    description:
      "Ihr weltweiter Begleiter für sichere und biometrische Pass- und Visumfotos. Wir garantieren 100% Konformität mit den offiziellen staatlichen Richtlinien für über 50 Länder.",
    sections: {
      popularServices: "Beliebte Services",
      tools: "Tools und Ressourcen",
      company: "Unternehmen",
    },
    badges: ["100% Privat", "Sofortige Überprüfung"],
    copyright: "Alle Rechte vorbehalten.",
    disclaimer:
      "PixPassVisa ist ein unabhängiger Fotobearbeitungsdienst. Wir sind mit keiner Regierungsbehörde verbunden.",
    aboutUs: "Über uns",
    contactUs: "Kontakt",
    privacyPolicy: "Datenschutzerklärung",
    terms: "Nutzungsbedingungen",
    refundPolicy: "Rückerstattungsrichtlinie",
    imprint: "Impressum",
  },
} as const;

export type DeTranslations = typeof de;
