import type { Metadata } from "next";
import Link from "next/link";
import { getShortId } from "@/lib/country-slug";
import { allSpecs, getFilteredDocumentTypes } from "@/lib/specs";
import SizeChartClient from "./SizeChartClient";
import DirectAnswerBox from "@/app/components/DirectAnswerBox";

import { ShieldCheck, ArrowRight, Printer, Sparkles, HelpCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Passport Photo Sizes & Dimensions Guide 2026 (50+ Countries) | PixPassVisa",
  description:
    "Complete guide to official passport and visa photo sizes and dimensions for 50+ countries. Compare 2×2 inch, 35×45 mm, 50×70 mm, pixel requirements, and printable templates.",
  keywords: [
    "passport photo size",
    "passport size photo dimensions",
    "passport size picture dimensions",
    "passport photo dimensions",
    "uk passport photo size",
    "us passport photo size",
    "passport photo template",
    "passport photo size in mm",
    "passport photo size in inches",
    "passport size photo dimensions in pixels",
  ],
  alternates: {
    canonical: "https://www.pixpassvisa.com/passport-photo-sizes",
  },
  openGraph: {
    title: "Passport Photo Sizes & Dimensions Guide 2026 (50+ Countries) | PixPassVisa",
    description:
      "Complete guide to official passport and visa photo sizes and dimensions for 50+ countries. Compare 2×2 inch, 35×45 mm, 50×70 mm, and digital pixel specs.",
    url: "https://www.pixpassvisa.com/passport-photo-sizes",
    siteName: "PixPassVisa",
    locale: "en_US",
    type: "website",
  },
};

export default function PassportPhotoSizesPage() {
  const available = new Set(getFilteredDocumentTypes().map(doc => doc.id));
  const chartSpecs = allSpecs.map(spec => ({ ...spec, toolAvailable: available.has(spec.id), guideHref: `/${getShortId(spec.country.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, ""))}-${spec.id.endsWith("-visa") ? "visa" : "passport"}-photo-editor` }));
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Global Passport & Visa Photo Size Chart 2026",
      url: "https://www.pixpassvisa.com/passport-photo-sizes",
      description:
        "Configured photo dimensions and backgrounds for passport and visa preparation. Confirm the requirements for your application with its issuing authority.",
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

      <div className="min-h-screen bg-slate-50/50 pb-16">
        {/* Header Hero */}
        <section className="bg-white border-b border-slate-200 py-10 sm:py-14 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold mb-4 uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              Photo size reference
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight mb-4">
              Passport Photo Sizes &amp; Dimensions Guide 2026
            </h1>
            <p className="text-base sm:text-lg text-slate-600 max-w-3xl leading-relaxed">
              Complete official guide to passport and visa photo sizes across 50+ countries. Compare physical print measurements, pixel requirements, background colors, and biometric crop standards before creating your photo.
            </p>

            {/* Direct Answer Box for AI & Featured Snippets */}
            <DirectAnswerBox
              question="What are the standard passport photo sizes and dimensions worldwide?"
              answer="The two most common standard passport photo dimensions worldwide are 2×2 inches (51×51 mm / 600×600 px at 300 DPI) used in the United States and India, and 35×45 mm (413×531 px at 300 DPI) required across the United Kingdom, European Union (Schengen, Germany, France), and Australia. For Canada, the standard is 50×70 mm (2×2¾ in). Digital online applications also impose strict pixel dimensions, file size caps, and neutral background rules as detailed below."
              keyPoints={[
                "United States & India: 2 × 2 inches (51 × 51 mm) or 600 × 600 px digital square",
                "United Kingdom, EU & Australia: 35 × 45 mm (3.5 × 4.5 cm / 413 × 531 px at 300 DPI)",
                "Canada: 50 × 70 mm (2 × 2¾ inches) with 31–36 mm chin-to-crown height",
                "Print Resolution: Minimum 300 DPI (dots per inch) for all physical photographic prints",
                "Digital uploads require separate pixel specs and file-size ceilings (e.g., 240 KB for US DS-160/DV lottery)",
              ]}
              lastReviewed="October 2026"
              sourceAuthority="ICAO Doc 9303 & National Passport Issuing Authorities"
            />
          </div>
        </section>

        {/* Content & Table Section */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          {/* Client-Side Interactive Table */}
          <SizeChartClient specs={chartSpecs} />

          {/* Official Verification Layer */}
          <p className="my-6 text-sm text-slate-600">These presets are not government certification. Start with the <Link className="underline" href="/passport-photos">passport guides</Link> or <Link className="underline" href="/visa-photo">visa guides</Link> for your application.</p>

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
      </div>
    </>
  );
}
