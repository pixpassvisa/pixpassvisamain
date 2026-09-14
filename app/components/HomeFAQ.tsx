import HomeFaqList from "./HomeFaqList";

interface FAQ {
  q: string;
  a: string;
}

const defaultFaqs: FAQ[] = [
  {
    q: "Is the passport photo validation really free?",
    a: "Yes! Our online passport and visa photo checker is 100% free for all supported countries. You only pay a small fee if you want to download the processed, fully compliant photo and a home-printable sheet.",
  },
  {
    q: "What are ICAO standards for a passport photo?",
    a: "ICAO (International Civil Aviation Organization) sets the global biometric standard used by passport and visa authorities worldwide — covering head size, eye position, neutral background, lighting, and expression. We validate every upload against these ICAO standard photo rules automatically, so you know it will be accepted before you pay.",
  },
  {
    q: "Is there a free UK passport photo checker online?",
    a: "Yes. Upload your photo and our free UK passport photo checker instantly confirms it meets HMPO's 35x45mm size, background, and biometric requirements — so you can be confident before submitting to the gov.uk passport service.",
  },
  {
    q: "Can I print my passport photo on A4 paper at home?",
    a: "Yes. Once your photo passes validation, you can download a print-ready sheet with multiple copies of your passport photo arranged for standard A4 or Letter paper, ready to print at home or at any pharmacy or print shop.",
  },
  {
    q: "What is the passport photo size for Sri Lanka?",
    a: "The Sri Lanka passport photo size follows the standard ICAO format of 45x35mm, with a plain white background and a neutral expression. Select Sri Lanka in our tool and we'll automatically crop and scale your photo to the correct size.",
  },
  {
    q: "What size photo do I need for a New Zealand visa?",
    a: "New Zealand visa photos generally follow the standard ICAO passport photo dimensions with a plain white or light-colored background. Choose New Zealand in our tool and we'll size, crop, and check your photo against the current requirements automatically.",
  },
  {
    q: "What is the France visa photo size for 2026?",
    a: "France visa and Schengen visa photos require a 35x45mm size with a neutral, light-colored background, following the latest 2026 guidance. Our tool crops and validates your photo to this exact spec so it's accepted the first time.",
  },
  {
    q: "What size is a US passport photo?",
    a: "A US passport and visa photo (including DS-160 applications) must be 2x2 inches (600x600px) with a plain white background. Our US visa photo editor resizes and validates your photo to this exact specification automatically.",
  },
  {
    q: "How do I crop a photo for a China visa application?",
    a: "Chinese visa photos require a specific size and background that differ slightly from standard ICAO rules. Our China visa photo editor automatically crops, resizes, and checks your photo against these requirements, so there's no manual guesswork.",
  },
  {
    q: "Are my photos safe? What about privacy?",
    a: "Absolutely. All original photos are automatically and permanently deleted after 24 hours. Download links expire after 1 hour. We are fully GDPR and CCPA compliant.",
  },
];

const passportFaqs: FAQ[] = [
  {
    q: "What is a biometric passport photo?",
    a: "A biometric photo is designed for facial recognition systems. It requires specific head sizing (usually 70-80% of the frame), neutral expressions, and no shadows to ensure it can be digitally scanned by border control.",
  },
  {
    q: "Can I print these at home?",
    a: "Yes. Our tool generates a standard 4x6 inch (10x15cm) printable sheet containing multiple copies of your passport photo, perfectly sized and ready for any photo printer.",
  },
  ...defaultFaqs
];

const visaFaqs: FAQ[] = [
  {
    q: "Will this work for my DS-160 digital upload?",
    a: "Yes. Our tool is specifically optimized for US DS-160 and other global eVisa portals. We ensure the file size is under the KB limit and the resolution meets the mandatory pixel requirements.",
  },
  {
    q: "What is a 'Consular Quality Alert'?",
    a: "This is a warning given by embassy portals when a photo has poor lighting or incorrect background color. Our biometric checks pre-validate your photo to ensure you never see this alert.",
  },
  ...defaultFaqs
];

export default function HomeFAQ({ type, customFaqs }: { type?: "passport" | "visa", customFaqs?: FAQ[] }) {
  const displayFaqs = customFaqs || (type === "visa" ? visaFaqs : (type === "passport" ? passportFaqs : defaultFaqs));

  return (
    <section className="hc-sec">
      <div className="hc-sec-sm">
        <div className="hc-head text-center mb-10">
          <span className="hc-label">Common Questions</span>
          <h2 className="hc-h2">Frequently Asked Questions</h2>
        </div>
        <HomeFaqList faqs={displayFaqs} />
      </div>
    </section>
  );
}