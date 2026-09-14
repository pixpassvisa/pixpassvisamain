import type { Metadata } from "next";
import Link from "next/link";
import Head from "next/head";
import { Camera, Globe, Zap, FileCheck, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title:
    "Passport Photo Resizer & Visa Photo Maker Online | PixPassVisa",

  description:
    "AI-powered passport photo resizer and visa photo maker for 50+ countries. Resize to 2x2 in, 35x45 mm, 600x600 px, or compress to 20KB, 50KB, 100KB, 200KB with 100% biometric compliance.",

  alternates: {
    canonical: "https://www.pixpassvisa.com/",
    languages: {
      en: "https://www.pixpassvisa.com/",
      fr: "https://www.pixpassvisa.com/fr",
      de: "https://www.pixpassvisa.com/de",
      "x-default": "https://www.pixpassvisa.com/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "PixPassVisa",
      "url": "https://www.pixpassvisa.com/",
      "applicationCategory": "UtilitiesApplication",
      "operatingSystem": "All",
      "offers": {
        "@type": "Offer",
        "price": "6.99",
        "priceCurrency": "USD",
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "ratingCount": "170"
      }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What are the common passport photo requirements?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Requirements vary by country. Common standards include specific dimensions (e.g., 35x45mm or 2x2in), a plain white or light-colored background, a neutral expression, and specific head-to-image ratios for biometric scanning."
          }
        },
        {
          "@type": "Question",
          "name": "How does this tool validate my photo?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We use AI to run automated checks against official government specifications for over 50 countries: dimensions, file size, background uniformity, face detection, eye position, and sharp focus — all in under 5 seconds."
          }
        },
        {
          "@type": "Question",
          "name": "Is the validation really free?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes! Photo validation is 100% free for all countries. You only pay a small fee (starting at $2.99) if you want to download a processed, fully compliant photo and print sheet."
          }
        },
        {
          "@type": "Question",
          "name": "Are my photos safe?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Absolutely. All original photos are auto-deleted after 24 hours. We are fully GDPR and CCPA compliant. We never store or share your personal photos permanently."
          }
        }
      ]
    }
  ]
};

import HomeHero from "./components/HomeHero";
import HomeSections from "./components/HomeSections";
import HomeFAQ from "./components/HomeFAQ";
import toolPages from "../data/tool-seo-pages.json";
import "./home.css";

import { getLocalPrice } from "@/lib/currency";

export default async function Home() {
  // Use skipHeaders: true to keep the page static
  // We no longer need the full localPrice object here for display, 
  // as HomeSections will handle it via PriceDisplay client component.
  const basePrice = 6.99;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="hcr">
        <HomeHero />
        
        {/* Master Directory Entry Points */}
        <section className="bg-white py-12 border-y border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8 text-center sm:text-left">
              <div className="bg-gradient-to-br from-blue-50/70 via-indigo-50/40 to-white p-8 rounded-2xl border border-blue-100/80 group hover:shadow-xl hover:shadow-blue-500/5 transition-all">
                <h3 className="text-xl font-bold text-slate-900 mb-2">Passport Photo Directory</h3>
                <p className="text-sm text-slate-600 mb-6">Browse official 2026 passport photo requirements for 50+ countries. Find the exact size for your application.</p>
                <Link href="/passport-photos" className="inline-flex items-center text-blue-600 font-bold hover:underline">
                  View All Countries <span className="ml-2">→</span>
                </Link>
              </div>
              <div className="bg-gradient-to-br from-cyan-50/70 via-blue-50/40 to-white p-8 rounded-2xl border border-cyan-100/80 group hover:shadow-xl hover:shadow-cyan-500/5 transition-all">
                <h3 className="text-xl font-bold text-slate-900 mb-2">Visa Photo Directory</h3>
                <p className="text-sm text-slate-600 mb-6">Database of international visa photo specifications. Support for US Visa, UK Visa, Schengen, and more.</p>
                <Link href="/visa-photo" className="inline-flex items-center text-emerald-600 font-bold hover:underline">
                  Browse Visa Specs <span className="ml-2">→</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Dynamic Tool SEO Pages Section */}
        <section className="bg-slate-50 py-10 sm:py-12 border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-2">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Popular Photo Tools &amp; Guides</h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">Instant biometric photo creation and government requirement checkers.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {toolPages.map((tool) => (
                <Link 
                  key={tool.slug}
                  href={`/${tool.slug}`}
                  className="group bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200 hover:border-blue-500 hover:shadow-md hover:-translate-y-0.5 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-50 border border-blue-100 rounded-lg flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-blue-600 group-hover:text-white transition-all text-blue-600">
                        <Camera className="w-4 h-4" />
                      </div>
                      <h3 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-blue-700 transition-colors line-clamp-1 leading-snug">
                        {tool.h1.split("—")[0].trim()}
                      </h3>
                    </div>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {tool.metaDescription}
                    </p>
                  </div>
                </Link>
              ))}
              <Link 
                href="/america-visa-size-photo"
                className="group bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200 hover:border-blue-500 hover:shadow-md hover:-translate-y-0.5 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-50 border border-blue-100 rounded-lg flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-blue-600 group-hover:text-white transition-all text-blue-600">
                      <Camera className="w-4 h-4" />
                    </div>
                    <h3 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-blue-700 transition-colors line-clamp-1 leading-snug">
                      America Visa Size Photo
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    Upload a selfie and get a properly sized America visa photo — 2 × 2 inches with a white background.
                  </p>
                </div>
              </Link>
              <Link 
                href="/uk-passport-size-photo-maker"
                className="group bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200 hover:border-blue-500 hover:shadow-md hover:-translate-y-0.5 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-50 border border-blue-100 rounded-lg flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-blue-600 group-hover:text-white transition-all text-blue-600">
                      <Camera className="w-4 h-4" />
                    </div>
                    <h3 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-blue-700 transition-colors line-clamp-1 leading-snug">
                      UK Passport Size Photo Maker
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    Create a compliant UK passport or visa photo online. Automatic biometric checks and background removal.
                  </p>
                </div>
              </Link>
              <Link 
                href="/passport-photo-checker"
                className="group bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200 hover:border-blue-500 hover:shadow-md hover:-translate-y-0.5 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 bg-cyan-50 border border-cyan-100 rounded-lg flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-cyan-600 group-hover:text-white transition-all text-cyan-600">
                      <Globe className="w-4 h-4" />
                    </div>
                    <h3 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-blue-700 transition-colors line-clamp-1 leading-snug">
                      Passport Photo Checker
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    Universal compliance validator for 50+ countries. Instant biometric PASS/FAIL report.
                  </p>
                </div>
              </Link>
              <Link 
                href="/online-passport-photo-checker"
                className="group bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200 hover:border-blue-500 hover:shadow-md hover:-translate-y-0.5 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-50 border border-blue-100 rounded-lg flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-blue-600 group-hover:text-white transition-all text-blue-600">
                      <Zap className="w-4 h-4" />
                    </div>
                    <h3 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-blue-700 transition-colors line-clamp-1 leading-snug">
                      Online Passport Photo Checker
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    Test your photo in-browser in under 3 seconds. No app download or account registration needed.
                  </p>
                </div>
              </Link>
              <Link 
                href="/australian-passport-photo-checker"
                className="group bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200 hover:border-blue-500 hover:shadow-md hover:-translate-y-0.5 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-50 border border-blue-100 rounded-lg flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-blue-600 group-hover:text-white transition-all text-blue-600">
                      <FileCheck className="w-4 h-4" />
                    </div>
                    <h3 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-blue-700 transition-colors line-clamp-1 leading-snug">
                      Australian Passport Photo Checker
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    Verify DFAT &amp; APO rules: 35×45mm, 32–36mm face height, plain white background, and no glasses.
                  </p>
                </div>
              </Link>
              <Link 
                href="/diversity-visa-lottery-photo-checker"
                className="group bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200 hover:border-blue-500 hover:shadow-md hover:-translate-y-0.5 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 bg-emerald-50 border border-emerald-100 rounded-lg flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-emerald-600 group-hover:text-white transition-all text-emerald-600">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <h3 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-blue-700 transition-colors line-clamp-1 leading-snug">
                      DV Lottery Photo Checker
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    Official US Green Card lottery 600×600 px photo validation: 50–69% head ratio, zero eyewear.
                  </p>
                </div>
              </Link>
              <Link 
                href="/indian-passport-size-photograph"
                className="group bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200 hover:border-blue-500 hover:shadow-md hover:-translate-y-0.5 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-50 border border-blue-100 rounded-lg flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-blue-600 group-hover:text-white transition-all text-blue-600">
                      <Camera className="w-4 h-4" />
                    </div>
                    <h3 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-blue-700 transition-colors line-clamp-1 leading-snug">
                      Indian Passport Size Photograph
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    Official 45 × 35 mm (630 × 810 px) ICAO compliant photo tool for Indian passport applications.
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </section>

        <HomeSections basePrice={basePrice} />
        <HomeFAQ />
      </div>
    </>
  );
}
