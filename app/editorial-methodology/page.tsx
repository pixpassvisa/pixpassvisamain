import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, BookOpen, Clock, Lock, CheckCircle2, ArrowRight, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Editorial & Verification Methodology | PixPassVisa",
  description:
    "Learn how PixPassVisa independently researches, verifies, and updates biometric passport and visa photo requirements against official government and ICAO standards.",
  alternates: {
    canonical: "https://www.pixpassvisa.com/editorial-methodology",
  },
  openGraph: {
    title: "Editorial & Verification Methodology | PixPassVisa",
    description:
      "Our 5-step process for verifying passport and visa photo requirements against official ICAO and government publications.",
    url: "https://www.pixpassvisa.com/editorial-methodology",
    siteName: "PixPassVisa",
    locale: "en_US",
    type: "website",
  },
};

export default function EditorialMethodologyPage() {
  const authorities = [
    {
      country: "United States",
      agency: "U.S. Department of State — Bureau of Consular Affairs",
      specs: "2×2 inches (51×51 mm), 600×600 px digital, 50–69% head height, no glasses since 2016.",
      link: "https://travel.state.gov/content/travel/en/us-visas/visa-information-resources/photos.html",
    },
    {
      country: "United Kingdom",
      agency: "HM Passport Office (HMPO) & GOV.UK",
      specs: "35×45 mm, light grey/cream background, 29–34 mm head height, digital photo codes.",
      link: "https://www.gov.uk/photos-for-passports",
    },
    {
      country: "Canada",
      agency: "Immigration, Refugees and Citizenship Canada (IRCC)",
      specs: "50×70 mm (passport), 35×45 mm (visa), 31–36 mm chin-to-crown, pure white background.",
      link: "https://www.canada.ca/en/immigration-refugees-citizenship/services/canadian-passports/photos.html",
    },
    {
      country: "European Union / Schengen",
      agency: "European Commission & National Consular Authorities",
      specs: "35×45 mm, light grey background, 70–80% (32–36 mm) head height, ICAO Doc 9303 compliance.",
      link: "https://home-affairs.ec.europa.eu/policies/schengen-borders-and-visa/visa-policy_en",
    },
    {
      country: "India",
      agency: "Ministry of External Affairs & Passport Seva",
      specs: "35×45 mm (standard passport) / 51×51 mm (OCI & Visa), white background, 70–80% face coverage.",
      link: "https://www.passportindia.gov.in/",
    },
    {
      country: "Australia",
      agency: "Australian Passport Office (DFAT)",
      specs: "35×45 mm, 32–36 mm head height, plain light grey/white background, strict neutral expression.",
      link: "https://www.passports.gov.au/getting-passport-how-it-works/photo-guidelines",
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/30 text-cyan-400 text-xs font-semibold mb-4">
            <ShieldCheck className="w-4 h-4" />
            E-E-A-T &amp; Research Standards
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4">
            Editorial &amp; Verification Methodology
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            How PixPassVisa verifies, cross-checks, and updates photo compliance rules across 50+ countries against official government specifications.
          </p>
        </div>
      </section>

      {/* Core Principles */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="prose prose-slate max-w-none">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Independent Verification Principle</h2>
          <p className="text-slate-600 leading-relaxed">
            PixPassVisa is an <strong>independent technology platform</strong>. We are not affiliated with, authorized by, or endorsed by any government agency or passport office. Our algorithms and content are built to assist applicants in identifying common framing, sizing, lighting, and background defects before submitting their applications to official channels.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">2. Our 5-Step Requirements Verification Process</h2>
          <div className="grid gap-4 my-6 not-prose">
            {[
              {
                step: "01",
                title: "Primary Government Source Research",
                desc: "Every country specification in our database is compiled directly from primary statutory regulations (e.g., U.S. Code of Federal Regulations, UK HMPO Gazettes, Canada IRCC specifications, German Bundesdruckerei norms).",
              },
              {
                step: "02",
                title: "ICAO Doc 9303 Alignment",
                desc: "We align all specifications with the International Civil Aviation Organization (ICAO) Doc 9303 Part 3 standard, which governs biometric data interchange across 193 member nations.",
              },
              {
                step: "03",
                title: "Quarterly Regulatory Audits",
                desc: "Our editorial team audits government consulate updates every quarter. When a rule changes (such as the UK digital photo code system or biometric changes), our database updates in real time.",
              },
              {
                step: "04",
                title: "AI & Rule Validation Engine Testing",
                desc: "Changes are tested across real portrait test datasets using MediaPipe landmarking and MODNet matting models to ensure accurate pixel tolerances.",
              },
              {
                step: "05",
                title: "Transparent Source Attribution",
                desc: "Every tool and guide page displays the exact primary authority citation and the last date the requirements were verified by our team.",
              },
            ].map((s) => (
              <div key={s.step} className="flex gap-4 p-5 rounded-2xl border border-slate-200 bg-slate-50/50">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white font-black text-sm shrink-0">
                  {s.step}
                </span>
                <div>
                  <h3 className="text-base font-bold text-slate-900 mb-1">{s.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">3. Primary Authority Reference Matrix</h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            Below are the primary official sources our system monitors to maintain 100% up-to-date compliance standards:
          </p>

          <div className="not-prose grid sm:grid-cols-2 gap-3 mb-10">
            {authorities.map((a) => (
              <div key={a.country} className="p-4 rounded-xl border border-slate-200 bg-white shadow-2xs">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-xs font-black uppercase text-blue-700 tracking-wider">
                    {a.country}
                  </span>
                  <a
                    href={a.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-blue-600"
                    title="Visit Official Source"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
                <div className="text-xs font-bold text-slate-900 mb-1">{a.agency}</div>
                <div className="text-[11px] text-slate-600 leading-snug">{a.specs}</div>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">4. Privacy &amp; Data Protection Protocol</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            Biometric images are sensitive personal data. PixPassVisa operates under a strict privacy-first architecture:
          </p>
          <ul className="text-sm text-slate-600 space-y-2">
            <li><strong>Zero AI Training on User Images:</strong> User uploads are never used to train machine learning models.</li>
            <li><strong>Automated Deletion:</strong> Temporary processing files are automatically cleared by automated cleanup routines.</li>
            <li><strong>Encrypted Transmission:</strong> All uploads and downloads occur over 256-bit TLS/HTTPS encrypted connections.</li>
          </ul>

          <div className="mt-12 p-6 rounded-2xl bg-blue-50 border border-blue-200 not-prose flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">Explore Passport &amp; Visa Photo Sizes</h3>
              <p className="text-xs text-slate-600 mt-0.5">
                Browse our comprehensive database of specifications for 50+ countries.
              </p>
            </div>
            <Link
              href="/passport-photo-sizes"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors shrink-0"
            >
              View Global Size Chart <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
