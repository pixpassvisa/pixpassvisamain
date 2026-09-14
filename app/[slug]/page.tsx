import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllSlugs } from "../../lib/slug-utils";
import { getRouteBySlug, createMetadata } from "../../lib/slug-router";
import ProgrammaticLandingPage from "../components/ProgrammaticLandingPage";
import PassportMakerApp from "../passport-size-photo-maker/PassportMakerApp";
import SpecialPhotoPageClient from "../components/SpecialPhotoPageClient";
import { getLocalPrice } from "@/lib/currency";
import Breadcrumbs from "../components/Breadcrumbs";
import ToolPageRenderer from "../components/ToolPageRenderer";

interface PageProps {
  params: Promise<{ slug: string }>;
}

import { ShieldCheck, FileCheck, Zap, Sparkles } from "lucide-react";

// ─── Shared stat items ────────────────────────────────────────────────────────
const STATS = [
  { value: "100+", label: "Countries" },
  { value: "30+", label: "Compliance checks" },
  { value: "< 2 min", label: "Processing time" },
  { value: "100%", label: "Compliance rate" },
];

// ─── Shared trust badges ──────────────────────────────────────────────────────
const TRUST_ITEMS = [
  { icon: <ShieldCheck className="w-5 h-5 text-blue-600" />, title: "Privacy first", desc: "Photos never stored on our servers" },
  { icon: <FileCheck className="w-5 h-5 text-blue-600" />, title: "ISO compliant", desc: "Meets ICAO 9303 biometric standards" },
  { icon: <Zap className="w-5 h-5 text-blue-600" />, title: "Instant result", desc: "AI processing in under 10 seconds" },
  { icon: <Sparkles className="w-5 h-5 text-blue-600" />, title: "Free preview", desc: "Check before you pay anything" },
];

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const route = getRouteBySlug(slug);
  if (!route) return {};

  switch (route.type) {
    case "tool": {
      const toolPage = route.data;
      return createMetadata({
        title: toolPage.title,
        description: toolPage.metaDescription,
        canonical: `https://www.pixpassvisa.com/${slug}`,
      });
    }

    case "money": {
      const moneyPage = route.data;
      return createMetadata({
        title: moneyPage.title,
        description: moneyPage.metaDescription,
        canonical: `https://www.pixpassvisa.com/${slug}`,
      });
    }

    case "special": {
      const specialPage = route.data;
      return createMetadata({
        title: specialPage.title,
        description: specialPage.metaDescription,
        canonical: `https://www.pixpassvisa.com/${slug}`,
        openGraph: specialPage.openGraph,
      });
    }

    case "spec": {
      const { data: spec, canonicalSlug, isVisaUrl } = route;
      const intentLabel = isVisaUrl ? "Visa" : "Passport";
      const baseUrl = `https://www.pixpassvisa.com/${canonicalSlug}`;

      const title = isVisaUrl
        ? `${spec.country} Visa Photo Online (2026) | ${spec.width_mm}x${spec.height_mm}mm`
        : `${spec.country} Passport Photo Maker (2026) | 100% Approved`;

      const description = `Create your ${spec.country} ${intentLabel.toLowerCase()} photo online in 2 mins. ${spec.width_mm}x${spec.height_mm}mm with automatic cropping and background checks.`;

      return createMetadata({
        title,
        description,
        canonical: baseUrl,
        keywords: [
          `${spec.country} ${intentLabel.toLowerCase()} photo online`,
          `${intentLabel} photo editor`,
          `online ${spec.country} ${intentLabel.toLowerCase()} maker`,
          `${spec.width_mm}x${spec.height_mm}mm photo online`,
        ],
      });
    }
  }
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const route = getRouteBySlug(slug);

  if (!route) {
    notFound();
  }

  switch (route.type) {
    case "tool": {
      const toolPage = route.data;
      const isIcaoPage = slug.startsWith("icao-");
      let defaultDoc = (toolPage as any).defaultDoc;
      if (!defaultDoc) {
        if (isIcaoPage) defaultDoc = "icao-passport";
        else if (slug.includes("china")) defaultDoc = "china-passport";
        else if (slug.includes("dubai")) defaultDoc = "uae-passport";
        else if (slug.includes("uk")) defaultDoc = "uk-passport";
        else defaultDoc = "uk-passport";
      }

      return (
        <div className="bg-slate-50 min-h-screen">
          <Breadcrumbs />

          {/* Tool */}
          <PassportMakerApp
            title={toolPage.h1}
            subtitle={toolPage.metaDescription}
            img={(toolPage as any).img}
            defaultDoc={defaultDoc}
            hideDocSelector={isIcaoPage}
            isIcaoPage={isIcaoPage}
          />

          {/* Hero */}
          <div className="bg-white border-b border-slate-200">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-14 text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                Official Standards · Free to try
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 mt-8 max-w-sm mx-auto sm:max-w-none">
                {STATS.map(({ value, label }) => (
                  <div key={label} className="bg-slate-50 rounded-xl px-3 py-3 sm:py-4 border border-slate-100">
                    <p className="text-xl sm:text-2xl font-black text-blue-600 leading-none">{value}</p>
                    <p className="text-xs text-slate-500 font-medium mt-1">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        

          {/* SEO rich content */}
          <div className="bg-white border-t border-slate-200/80 py-12 sm:py-16 mt-6 sm:mt-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="text-center mb-8 sm:mb-12">
                <span className="inline-block px-3.5 py-1.5 rounded-full bg-blue-50/70 border border-blue-200 text-blue-700 text-xs font-extrabold uppercase tracking-wider mb-3">
                  Complete Biometric Guide
                </span>
                <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
                  Detailed Guide &amp; Frequently Asked Questions
                </h2>
                <p className="text-slate-500 mt-2 text-sm sm:text-base max-w-md mx-auto font-medium">
                  Everything you need to know about creating a compliant passport photo.
                </p>
              </div>

              <ToolPageRenderer html={toolPage.content} />
            </div>
          </div>
        </div>
      );
    }

    case "spec": {
      const spec = route.data;
      const localPrice = await getLocalPrice(spec.price, undefined, false, true);
      const enrichedSpec = { ...spec, local_price: localPrice };
      const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: `Official ${spec.country} ${spec.name} Photo Maker`,
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "All",
        description: `Online biometric tool for ${spec.country} ${spec.name} requirements.`,
      };

      return (
        <>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
          <ProgrammaticLandingPage spec={enrichedSpec} slug={slug} />
        </>
      );
    }

    case "money": {
      const moneyPage = route.data;
      return (
        <div className="bg-white min-h-screen">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-8 tracking-tight leading-tight">
              {moneyPage.title}
            </h1>
            <div
              className="rich-content"
              dangerouslySetInnerHTML={{ __html: moneyPage.content }}
            />
          </div>
        </div>
      );
    }

    case "special": {
      const specialPage = route.data;
      return (
        <>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(specialPage.jsonLd) }}
          />
          <SpecialPhotoPageClient {...specialPage} />
        </>
      );
    }
  }
}