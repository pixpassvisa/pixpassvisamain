import Link from "next/link";
import Image from "next/image";
import HomeSections from "./HomeSections";
import HomeFAQ from "./HomeFAQ";
import LongformSection from "./LongformSection";      // ← NEW
import { FileCheck, Globe, ShieldCheck, BookOpen } from "lucide-react";
import { SpecEntry } from "../../lib/slug-utils";
import "../home.css";
import { generateLongformContent } from "@/lib/content-weaver";
import Breadcrumbs from "./Breadcrumbs";

interface Props {
  spec: SpecEntry;
  slug: string;
}

export default function ProgrammaticLandingPage({ spec, slug }: Props) {
  const isVisaIntent = slug.includes("visa");
  const docName = isVisaIntent ? "Visa" : "Passport";
  const countryName = spec.country;

  const countrySlug = slug.replace("-passport-photo-editor", "").replace("-visa-photo-editor", "");
  const siblingLabel = isVisaIntent ? "Passport" : "Visa";
  const siblingHref = `/${countrySlug}-${isVisaIntent ? "passport" : "visa"}-photo-editor`;
  const siblingLink = { label: `${spec.country} ${siblingLabel}`, href: siblingHref };

  const customContent = isVisaIntent ? spec.visacontent : spec.passportcontent;
  const longformContent = generateLongformContent(spec, isVisaIntent);

  // Extract TOC from custom HTML or generated blocks
  let tableOfContents: { id: string; text: string }[] = [];
  let processedCustomContent = customContent;

  if (customContent) {
    let index = 0;
    const h2Regex = /<h2(.*?)>(.*?)<\/h2>/g;
    let match;
    while ((match = h2Regex.exec(customContent)) !== null) {
      const text = match[2].replace(/<[^>]*>?/gm, "").trim();
      tableOfContents.push({ id: `custom-section-${index++}`, text });
    }
    index = 0;
    processedCustomContent = customContent.replace(
      /<h2(.*?)>(.*?)<\/h2>/g,
      (_, attrs, content) => `<h2 id="custom-section-${index++}"${attrs}>${content}</h2>`
    );
  } else {
    tableOfContents = longformContent
      .filter((block) => block.type === "h2")
      .map((block, i) => ({ id: `section-${i}`, text: block.text || "" }));
  }

  return (
    <main className="min-h-screen bg-white hcr">
        <div className="h-1 bg-blue-700 w-full" />

      <Breadcrumbs 
        items={[
          { label: `${docName} Photos`, href: isVisaIntent ? "/visa-photo" : "/passport-photos" },
          { label: spec.country, href: `/${slug}` }
        ]} 
      />
      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-10 pb-16 lg:pt-10 lg:pb-24 ">
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <div className="inline-flex items-center space-x-2 bg-blue-50/70 border border-emerald-100 px-3 py-1 rounded-sm">
                  <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse"></span>
                  <span className="text-sm font-semibold text-blue-700 tracking-wide uppercase">AI Compliance Check</span>
                </div>
                <Link
                  href={siblingLink.href}
                  className="inline-flex items-center space-x-2 bg-white border border-slate-200 hover:border-blue-300 hover:bg-blue-50 px-3 py-1 rounded-sm transition-all group "
                >
                  <span className="text-sm font-semibold text-slate-500 group-hover:text-blue-600">Switch to {siblingLink.label}</span>
                  <svg className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                  </svg>
                </Link>
              </div>

                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight tracking-tight mb-3">

                 {spec.country} {docName} Photo Editor Online 2026
              </h1>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-7 max-w-lg">
                Create a 100% compliant {docName} photo in seconds. Our biometric checks ensure the correct {spec.width_mm}x{spec.height_mm}mm size, background color, and biometric alignment for {countryName}.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link
                  href={`/passport-photo-online?type=${spec.id}`}
                  className="inline-flex items-center justify-center bg-blue-700 hover:bg-blue-800 text-white text-sm font-semibold px-6 py-3 rounded transition-colors"
    
                >
                  <span className="relative z-10 flex items-center">
                    Upload Your Photo Now
                    <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                  <span className="absolute -top-1 -right-1 flex h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-indigo-500"></span>
                  </span>
                </Link>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {["Biometric Validation", "Background Removal", "Instant Download", "Print-Ready Sheets"].map((item, i) => (
                  <div key={i} className="flex items-center space-x-2 text-sm text-slate-500 font-medium">
                    <svg className="w-5 h-5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full lg:w-auto flex flex-col items-center gap-3">
          
              <Image
                src={spec.hero_photo || "/us_non_imigrant.png"}
                alt={`Official ${countryName} ${docName} photo compliance example`}
                width={400}
                height={400}
                className="rounded-2xl w-full h-auto shadow-inner"
                priority
              />
              <div className="absolute inset-0 border-2 border-white/60 rounded-3xl pointer-events-none mix-blend-overlay"></div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRODUCT SPECS ─────────────────────────────────── */}
      <section className="py-16 bg-[#f8faf9] border-y border-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-slate-900">Official {countryName} Technical Requirements</h2>
            <p className="text-slate-500 mt-2">Validated against {countryName} government standards</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "Dimensions", val: `${spec.width_mm} × ${spec.height_mm} mm` },
              { label: "Background", val: spec.bg_color },
              { label: "Head Size", val: `${spec.head_min_pct}% - ${spec.head_max_pct}%` },
              { label: "Resolution", val: `${spec.width_px} × ${spec.height_px} px` },
            ].map((s, i) => (
              <div key={i} className="bg-white p-6 rounded-xl border border-blue-400 text-center ">
                <div className="w-10 h-10 mx-auto rounded-full bg-indigo-50 flex items-center justify-center mb-4">
                  <div className="w-4 h-4 rounded-full bg-indigo-500 opacity-20"></div>
                </div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">{s.label}</p>
                <p className="text-lg md:text-xl font-black text-slate-900">{s.val}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LONGFORM CONTENT — now uses the new component ── */}
      <LongformSection
        tableOfContents={tableOfContents}
        processedCustomContent={processedCustomContent}
        longformContent={longformContent as any}
        countryName={countryName}
        docName={docName}
      />

      {/* ── RELATED RESOURCES ─────────────────────────────── */}
      <section className="py-16 bg-[#f8faf9] border-y border-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 text-center mb-10">Explore More Resources</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
            <Link href="/passport-photos" className="group bg-white p-6 rounded-2xl border border-slate-100 text-center hover:shadow-lg hover:border-blue-200 transition-all">
              <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 mx-auto mb-3">
                <FileCheck className="w-6 h-6" />
              </div>
              <span className="text-sm font-bold text-slate-900 group-hover:text-blue-600 block">Passport Directory</span>
              <p className="text-xs text-slate-500 mt-1">50+ country specs</p>
            </Link>
            <Link href="/visa-photo" className="group bg-white p-6 rounded-2xl border border-slate-100 text-center hover:shadow-lg hover:border-cyan-200 transition-all">
              <div className="w-12 h-12 rounded-xl bg-cyan-50 border border-cyan-100 flex items-center justify-center text-cyan-600 mx-auto mb-3">
                <Globe className="w-6 h-6" />
              </div>
              <span className="text-sm font-bold text-slate-900 group-hover:text-cyan-600 block">Visa Directory</span>
              <p className="text-xs text-slate-500 mt-1">International visa specs</p>
            </Link>
            <Link href="/visa-photo-validator" className="group bg-white p-6 rounded-2xl border border-slate-100 text-center hover:shadow-lg hover:border-emerald-200 transition-all">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 mx-auto mb-3">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <span className="text-sm font-bold text-slate-900 group-hover:text-emerald-600 block">Free Validator</span>
              <p className="text-xs text-slate-500 mt-1">Instant PASS/FAIL</p>
            </Link>
            <Link href="/blog" className="group bg-white p-6 rounded-2xl border border-slate-100 text-center hover:shadow-lg hover:border-purple-200 transition-all">
              <div className="w-12 h-12 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 mx-auto mb-3">
                <BookOpen className="w-6 h-6" />
              </div>
              <span className="text-sm font-bold text-slate-900 group-hover:text-purple-600 block">Blog & Guides</span>
              <p className="text-xs text-slate-500 mt-1">Expert advice</p>
            </Link>
          </div>

          <div className="pt-8 border-t border-slate-200">
            <h3 className="text-sm font-bold text-slate-700 mb-4 text-center">Popular Sizing & Photo Checker Tools</h3>
            <div className="flex flex-wrap justify-center gap-2">
              <Link href="/us-passport-photo-editor" className="text-xs text-slate-600 hover:text-blue-600 bg-white px-3 py-1.5 rounded-lg border border-slate-200 font-medium">US Passport Photo Editor</Link>
              <Link href="/us-visa-photo-editor" className="text-xs text-slate-600 hover:text-blue-600 bg-white px-3 py-1.5 rounded-lg border border-slate-200 font-medium">US Visa Photo Editor</Link>
              <Link href="/ca" className="text-xs text-slate-600 hover:text-blue-600 bg-white px-3 py-1.5 rounded-lg border border-slate-200 font-medium">Canada Visa Size Photo</Link>
              <Link href="/uk-passport-photo-checker-online-free" className="text-xs text-slate-600 hover:text-blue-600 bg-white px-3 py-1.5 rounded-lg border border-slate-200 font-medium">UK Passport Photo Checker</Link>
              <Link href="/digital-visa-photo-specs-2026" className="text-xs text-slate-600 hover:text-blue-600 bg-white px-3 py-1.5 rounded-lg border border-slate-200 font-medium">Digital Visa Specs 2026</Link>
              <Link href="/indian-passport-size-photograph" className="text-xs text-slate-600 hover:text-blue-600 bg-white px-3 py-1.5 rounded-lg border border-slate-200 font-medium">
                Create inda icao standard photograph
              </Link>
            </div>
          </div>
        </div>
      </section>

   

      {/* ── STICKY CTA ────────────────────────────────────── */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md px-4 pointer-events-none">
        <Link
          href={`/passport-photo-online?type=${spec.id}`}
          className="pointer-events-auto flex items-center justify-between w-full bg-slate-900 text-white p-2.5 pl-6 rounded-2xl shadow-2xl hover:bg-slate-800 transition-all border border-slate-700 hover:-translate-y-1 transform group"
        >
          <div className="flex flex-col">
            <span className="font-bold text-sm">  Create {countryName} Passport size Photo</span>
            <span className="text-[10px] text-slate-400 font-medium animate-pulse">No signup required</span>
          </div>
          <span className="relative bg-indigo-600 group-hover:bg-indigo-500 transition-colors px-5 py-2.5 rounded-xl text-sm font-black shadow-[0_4px_14px_0_rgb(79,70,229,0.39)] overflow-hidden">
            <span className="relative z-10">Upload photo</span>
            <span className="absolute inset-0 bg-white/10 animate-pulse"></span>
          </span>
        </Link>
      </div>
    </main>
  );
}