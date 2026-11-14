import type { Metadata } from "next";
import UKDocumentClient from "./UKDocumentClient";
import CountryServiceOptions from '@/app/components/CountryServiceOptions';
import UKPassportGuide, { UKPassportIntro } from "./UKPassportGuide";
import { ukPassportFaqs } from "@/lib/uk-passport-content";

const pageUrl = "https://www.pixpassvisa.com/uk-passport-size-photo-maker";
export const metadata: Metadata = {
  title: { absolute: "UK Passport Size Photo Maker (2026) – 35×45 mm & Digital Specs | PixPassVisa" },
  description: "Create UK passport photos online: 35×45 mm (3.5×4.5 cm) prints and 600×750 px digital upload requirements. Free biometric compliance check, auto-crop & print templates for 2026.",
  alternates: { canonical: pageUrl, languages: { en: pageUrl, "x-default": pageUrl } },
  openGraph: { title: "UK Passport Size Photo Maker & Requirements (2026) | PixPassVisa", description: "Create compliant UK passport photos: 35×45 mm print and 600×750 px digital photo requirements.", url: pageUrl, siteName: "PixPassVisa", locale: "en_GB", type: "website", images: [{ url: "/images/uk-passport-photo-size-guide.png", width: 1200, height: 1000, alt: "PixPassVisa UK printed and digital passport photo size guide" }] },
  twitter: { card: "summary_large_image", title: "UK Passport Size Photo Maker (2026) | PixPassVisa", description: "Printed and digital UK passport photo rules and online maker.", images: ["/images/uk-passport-photo-size-guide.png"] },
};

export default function UKPage() {
  const schemas = [
    { "@context": "https://schema.org", "@type": "WebPage", "@id": `${pageUrl}#webpage`, url: pageUrl, name: "UK passport photo size: printed and digital requirements", inLanguage: "en-GB", description: metadata.description, publisher: { "@type": "Organization", name: "PixPassVisa", url: "https://www.pixpassvisa.com/" }, image: "https://www.pixpassvisa.com/images/uk-passport-photo-size-guide.png" },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: ukPassportFaqs.map(({q,a}) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://www.pixpassvisa.com/" }, { "@type": "ListItem", position: 2, name: "Passport photo guides", item: "https://www.pixpassvisa.com/passport-photos" }, { "@type": "ListItem", position: 3, name: "UK passport photo size", item: pageUrl }] },
  ];
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas).replace(/</g, "\\u003c") }} /><UKPassportIntro /><div className="mx-auto max-w-6xl px-4"><CountryServiceOptions country="UK" /></div><UKDocumentClient /><UKPassportGuide /></>;
}
