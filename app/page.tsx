import type { Metadata } from "next";
import HomeHero from "./components/HomeHero";
import HomeSections from "./components/HomeSections";
import HomeFAQ from "./components/HomeFAQ";
import { homeFaqs } from "@/lib/home-content";
import "./home.css";

export const metadata: Metadata = {
  title: { absolute: "Passport & Visa Photo Maker Online | pixpassvisa.com" },
  description: "Prepare passport, visa, and ID photos online for 50+ countries. Check your photo for free, review the country-specific crop, and buy a high-resolution digital photo and print sheet with fixed one-time pricing.",
  keywords: ["passport photo maker", "passport photo online", "visa photo maker", "visa photo online", "passport photo checker", "passport photo requirements", "passport photo size", "visa photo requirements by country", "passport photo background checker", "DS-160 photo", "DV lottery photo checker", "UK digital passport photo", "Schengen visa photo", "passport photo print template"],
  alternates: { canonical: "https://www.pixpassvisa.com/", languages: { en: "https://www.pixpassvisa.com/", fr: "https://www.pixpassvisa.com/fr", de: "https://www.pixpassvisa.com/de", "x-default": "https://www.pixpassvisa.com/" } },
};
export default function Home() {
  const schema = { "@context": "https://schema.org", "@graph": [
    { "@type": "WebApplication", name: "PixPassVisa", url: "https://www.pixpassvisa.com/", applicationCategory: "PhotographyApplication", operatingSystem: "Web browser", description: "Passport and visa photo preparation for 50+ countries with a free automated photo checker and fixed one-time download pricing.", featureList: ["Country-specific biometric cropping", "Background and lighting checks", "High-resolution JPEG download", "Printable photo sheet"], offers: { "@type": "Offer", price: "7.99", priceCurrency: "USD", availability: "https://schema.org/InStock" } },
    { "@type": "HowTo", name: "How to make a passport or visa photo online", description: "Choose the document, check the photo, preview the result, and purchase the final download.", step: [
      { "@type": "HowToStep", position: 1, name: "Choose your document", text: "Select the country and passport, visa, or ID document you are applying for." },
      { "@type": "HowToStep", position: 2, name: "Upload and check your photo", text: "Upload a recent portrait and review the free automated checks for framing, background, lighting, and file requirements." },
      { "@type": "HowToStep", position: 3, name: "Preview and download", text: "Review the crop and fixed one-time price, then purchase the high-resolution photo and printable sheet if you are ready." },
    ] },
    { "@type": "FAQPage", mainEntity: homeFaqs.map(({ q, a }) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) },
  ] };
  return <div className="studio-home"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} /><HomeHero /><HomeSections basePrice={7.99} /><HomeFAQ /></div>;
}
