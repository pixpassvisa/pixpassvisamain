import { getFilteredSpecs } from "@/lib/specs";
import MasterDirectory from "../components/MasterDirectory";
import { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "../components/Breadcrumbs";
import { FileCheck, Camera, ShieldCheck, BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "Official Visa Photo Requirements & Sizes | International Visa Portal",
  description: "Explore official visa photo specifications for over 50 countries. Our database includes technical requirements for DS-160, eVisas, and consular submissions.",
  keywords: ["visa photo requirements", "visa photo size index", "ds-160 photo standards", "eVisa photo database"],
  alternates: {
    canonical: "https://www.pixpassvisa.com/visa-photo",
    languages: {
      en: "https://www.pixpassvisa.com/visa-photo",
      fr: "https://www.pixpassvisa.com/fr/photo-visa",
      de: "https://www.pixpassvisa.com/de/visum-foto",
      "x-default": "https://www.pixpassvisa.com/visa-photo",
    },
  },
  openGraph: {
    title: "Official Visa Photo Requirements & Sizes | International Visa Portal",
    description: "Explore official visa photo specifications for over 50 countries. Our database includes technical requirements for DS-160, eVisas, and consular submissions.",
    url: "https://www.pixpassvisa.com/visa-photo",
    siteName: "PixPassVisa",
    images: [
      {
        url: "https://www.pixpassvisa.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "PixPassVisa - Visa Photo Requirements",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function VisaDirectoryPage() {
  // Show ALL countries, but de-duplicate by country name so we have 1 entry per nation
  const uniqueSpecs = Array.from(new Map(getFilteredSpecs().map(s => [s.country, s])).values());
  const displaySpecs = uniqueSpecs;

  return (
    <div className="min-h-screen bg-white">
      <Breadcrumbs />
      <main>
        <MasterDirectory 
          title="Visa Photo Directory"
        subtitle="Technical photo specifications for international visas. Select your country to ensure your digital upload or consular photo is 100% compliant."
        specs={displaySpecs}
        type="visa"
      />

      {/* Cross-Links & Special Guides Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-8 border-t border-slate-100 mb-12">
          <Link href="/passport-photos" className="group p-6 bg-blue-50/70 rounded-2xl border border-blue-100 hover:shadow-lg hover:border-blue-300 transition-all">
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 mb-3">
              <FileCheck className="w-5 h-5" />
            </div>
            <span className="text-sm font-bold text-slate-900 group-hover:text-blue-700 block mb-1">Passport Photo Directory</span>
            <p className="text-xs text-slate-500">Looking for passport photos? View all passport specs</p>
          </Link>
          <Link href="/passport-photo-online" className="group p-6 bg-emerald-50/70 rounded-2xl border border-emerald-100 hover:shadow-lg hover:border-emerald-300 transition-all">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600 mb-3">
              <Camera className="w-5 h-5" />
            </div>
            <span className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 block mb-1">Create Photo Now</span>
            <p className="text-xs text-slate-500">Upload & get a compliant visa photo instantly</p>
          </Link>
          <Link href="/visa-photo-validator" className="group p-6 bg-purple-50/70 rounded-2xl border border-purple-100 hover:shadow-lg hover:border-purple-300 transition-all">
            <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600 mb-3">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <span className="text-sm font-bold text-slate-900 group-hover:text-purple-700 block mb-1">Free Validator</span>
            <p className="text-xs text-slate-500">Check your photo for free before you pay</p>
          </Link>
          <Link href="/blog" className="group p-6 bg-amber-50/70 rounded-2xl border border-amber-100 hover:shadow-lg hover:border-amber-300 transition-all">
            <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600 mb-3">
              <BookOpen className="w-5 h-5" />
            </div>
            <span className="text-sm font-bold text-slate-900 group-hover:text-amber-700 block mb-1">Photo Guides</span>
            <p className="text-xs text-slate-500">Expert tips and compliance guides</p>
          </Link>
        </div>

        <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200">
          <h3 className="text-xl font-bold text-slate-900 mb-6">Popular Visa & Passport Sizing Tools</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            <Link href="/us-visa-photo-editor" className="text-xs font-semibold text-slate-700 hover:text-emerald-600 bg-white p-3 rounded-xl border border-slate-200 shadow-xs transition-colors">
              US Visa Photo Editor
            </Link>
            <Link href="/us-passport-photo-editor" className="text-xs font-semibold text-slate-700 hover:text-emerald-600 bg-white p-3 rounded-xl border border-slate-200 shadow-xs transition-colors">
              US Passport Photo Editor
            </Link>
            <Link href="/ca" className="text-xs font-semibold text-slate-700 hover:text-emerald-600 bg-white p-3 rounded-xl border border-slate-200 shadow-xs transition-colors">
              Canada Visa Size Photo
            </Link>
            <Link href="/indian-passport-size-photograph" className="text-xs font-semibold text-slate-700 hover:text-emerald-600 bg-white p-3 rounded-xl border border-slate-200 shadow-xs transition-colors">
              India ICAO Standard Photo
            </Link>
            <Link href="/digital-visa-photo-specs-2026" className="text-xs font-semibold text-slate-700 hover:text-emerald-600 bg-white p-3 rounded-xl border border-slate-200 shadow-xs transition-colors">
              Digital Visa Specs 2026
            </Link>
            <Link href="/uk-passport-photo-checker-online-free" className="text-xs font-semibold text-slate-700 hover:text-emerald-600 bg-white p-3 rounded-xl border border-slate-200 shadow-xs transition-colors">
              UK Photo Checker
            </Link>
            <Link href="/diversity-visa-lottery-photo-checker" className="text-xs font-semibold text-slate-700 hover:text-emerald-600 bg-white p-3 rounded-xl border border-slate-200 shadow-xs transition-colors">
              DV Lottery Checker
            </Link>
            <Link href="/australian-passport-photo-checker" className="text-xs font-semibold text-slate-700 hover:text-emerald-600 bg-white p-3 rounded-xl border border-slate-200 shadow-xs transition-colors">
              Australian Photo Checker
            </Link>
            <Link href="/online-passport-photo-checker" className="text-xs font-semibold text-slate-700 hover:text-emerald-600 bg-white p-3 rounded-xl border border-slate-200 shadow-xs transition-colors">
              Online Photo Checker
            </Link>
            <Link href="/passport-photo-checker" className="text-xs font-semibold text-slate-700 hover:text-emerald-600 bg-white p-3 rounded-xl border border-slate-200 shadow-xs transition-colors">
              Passport Photo Checker
            </Link>
          </div>
        </div>
      </section>
      </main>
    </div>
  );
}
