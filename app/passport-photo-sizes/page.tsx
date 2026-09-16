import type { Metadata } from "next";
import Link from "next/link";
import { allSpecs } from "@/lib/specs";
import SizeChartClient from "./SizeChartClient";
import DirectAnswerBox from "@/app/components/DirectAnswerBox";
import OfficialSourceBadge from "@/app/components/OfficialSourceBadge";
import { ShieldCheck, ArrowRight, Printer, Sparkles, HelpCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Passport & Visa Photo Size Chart 2026 (50+ Countries) | PixPassVisa",
  description:
    "Comprehensive passport and visa photo size comparison chart for 50+ countries. Exact physical dimensions in mm and inches, pixel dimensions at 300 DPI, head height percentages, and official background colors.",
  alternates: {
    canonical: "https://www.pixpassvisa.com/passport-photo-sizes",
  },
  openGraph: {
    title: "Passport & Visa Photo Size Chart 2026 (50+ Countries) | PixPassVisa",
    description:
      "Exact passport and visa photo dimensions for US (2x2 in), UK (35x45 mm), Canada (50x70 mm), Schengen, India OCI, and 50+ nations.",
    url: "https://www.pixpassvisa.com/passport-photo-sizes",
    siteName: "PixPassVisa",
    locale: "en_US",
    type: "website",
  },
};

export default function PassportPhotoSizesPage() {
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Global Passport & Visa Photo Size Chart 2026",
      url: "https://www.pixpassvisa.com/passport-photo-sizes",
      description:
        "Official dimensions, digital pixel resolutions, and background requirements for biometric passport and visa photographs across 50+ countries.",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://www.pixpassvisa.com/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Passport & Visa Photo Size Chart",
          item: "https://www.pixpassvisa.com/passport-photo-sizes",
        },
      ],
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />

      <main className="min-h-screen bg-slate-50/50 pb-16">
        {/* Header Hero */}
        <section className="bg-white border-b border-slate-200 py-10 sm:py-14 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold mb-4 uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              Official Standards Database 2026/2027
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight mb-4">
              Passport &amp; Visa Photo Size Chart (50+ Countries)
            </h1>
            <p className="text-base sm:text-lg text-slate-600 max-w-3xl leading-relaxed">
              Find the exact millimeter, inch, and digital pixel requirements for your passport, visa, or identity document. All dimensions are verified against official government consular gazettes and ICAO Doc 9303.
            </p>

            {/* Direct Answer Box for AI & Featured Snippets */}
            <DirectAnswerBox
              question="What are the standard passport photo sizes worldwide?"
              answer="Passport and visa photo sizes vary by country, with three dominant global standards: (1) 2 × 2 inches (51 × 51 mm / 600 × 600 px) for the United States, India OCI, and US Visas; (2) 35 × 45 mm (413 × 531 px @ 300 DPI) used by the United Kingdom, European Union (Schengen), Australia, New Zealand, and most of Asia; and (3) 50 × 70 mm used exclusively for Canadian passports. All require a plain, shadow-free background and neutral facial expression."
              keyPoints={[
                "United States: 2 × 2 in (51 × 51 mm) — 50–69% head height — Plain white background — No glasses",
                "United Kingdom: 35 × 45 mm — 29–34 mm head height — Light grey/cream background — HMPO compliant",
                "European Union (Schengen): 35 × 45 mm — 70–80% (32–36 mm) head height — Light grey background",
                "Canada: 50 × 70 mm (Passport) / 35 × 45 mm (Visa) — 31–36 mm chin to crown — Pure white background",
              ]}
              lastReviewed="September 2026"
              sourceAuthority="ICAO Doc 9303 & National Consular Authorities"
            />
          </div>
        </section>

        {/* Content & Table Section */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          {/* Client-Side Interactive Table */}
          <SizeChartClient specs={allSpecs} />

          {/* Official Verification Layer */}
          <OfficialSourceBadge
            lastReviewedDate="September 2026"
            documentType="Multi-Country Biometric Specifications"
          />

          {/* Additional Guidance & Internal Linking Hub */}
          <div className="grid md:grid-cols-3 gap-6 mt-10">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold mb-3">
                  <Printer className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-1">Print Template Generator</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Arrange multiple 2×2 in or 35×45 mm photos onto a standard 4×6 inch (10×15 cm) print sheet for CVS, Walgreens, or home printing.
                </p>
              </div>
              <Link
                href="/passport-photo-print-template-generator"
                className="text-xs font-bold text-blue-700 hover:text-blue-800 inline-flex items-center gap-1"
              >
                Create Print Template &rarr;
              </Link>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold mb-3">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-1">Passport Photo Checker</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Run automated biometric pre-checks against lighting, head proportions, eye alignment, and background uniformity for 50+ countries.
                </p>
              </div>
              <Link
                href="/passport-photo-checker"
                className="text-xs font-bold text-blue-700 hover:text-blue-800 inline-flex items-center gap-1"
              >
                Run Free Photo Checker &rarr;
              </Link>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="h-10 w-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold mb-3">
                  <Sparkles className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-1">DV Lottery Photo Validator</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Validate your 600×600 px square photo for the US Diversity Visa Green Card lottery with strict 240KB ceiling checks.
                </p>
              </div>
              <Link
                href="/diversity-visa-lottery-photo-checker"
                className="text-xs font-bold text-blue-700 hover:text-blue-800 inline-flex items-center gap-1"
              >
                Check DV Lottery Photo &rarr;
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
