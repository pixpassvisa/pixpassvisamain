import Link from "next/link";
import { allSpecs, getFilteredSpecs } from "@/lib/specs";
import { getShortId } from "@/lib/slug-utils";

export default function AdditionalPhotoGuides({ type }: { type: "passport" | "visa" }) {
  const listed = new Set(getFilteredSpecs().map(spec => spec.country));
  const countries = [...new Set(allSpecs.map(spec => spec.country))]
    .filter(country => !listed.has(country)).sort();
  const tools = type === "passport" ? [
    ["Passport photo app guide", "/passport-photo-app"],
    ["Passport photo editing guide", "/passport-photo-editor"],
    ["Passport photo maker guide", "/passport-photo-maker"],
    ["UK passport requirements tool", "/uk-passport-photo-requirements-tool"],
  ] : [
    ["China visa photo tool", "/create-china-visa-photo"],
    ["Dubai visa photo tool", "/create-dubai-visa-photo"],
  ];

  return <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
    <h2 className="text-2xl font-bold text-slate-900 mb-4">More country photo guides</h2>
    <p className="text-slate-600 mb-6">These destinations have reference pages but are outside the current tool selection. Check the available presets and your application instructions before preparing a photo.</p>
    <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-10">
      {countries.map(country => {
        const base = getShortId(country.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, ""));
        return <li key={country}><Link prefetch={false} className="text-blue-700 underline underline-offset-4" href={`/${base}-${type}-photo-editor`}>{country} {type} photo guide</Link></li>;
      })}
    </ul>
    <p className="mb-6 text-slate-600">Before preparing your photo, use our <Link prefetch={false} className="text-blue-700 underline underline-offset-4" href="/passport-photo-checklist">passport and visa photo checklist</Link> to review capture, print and upload requirements.</p>
    <h2 className="text-xl font-bold text-slate-900 mb-4">More {type} photo tools and guides</h2>
    <ul className="grid sm:grid-cols-2 gap-3">{tools.map(([label, href]) => <li key={href}><Link prefetch={false} className="text-blue-700 underline underline-offset-4" href={href}>{label}</Link></li>)}</ul>
  </section>;
}
