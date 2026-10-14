import Link from 'next/link';
import { reviewedPhotoGuides } from '@/lib/reviewed-photo-guides';
export default function ReviewedGuideLinks({document}:{document:'passport'|'visa'}) {
  return <section className="mx-auto max-w-6xl px-6 py-10"><h2 className="text-2xl font-semibold text-slate-900">Photo capture and submission guides</h2><p className="mt-3 text-slate-600">Start with the application workflow. These guides distinguish authority instructions from available tool presets.</p><div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{Object.entries(reviewedPhotoGuides).filter(([,guide])=>guide.document===document).map(([slug,guide])=><Link key={slug} href={`/${slug}`} className="rounded-xl border border-slate-200 p-5 hover:bg-emerald-50"><h3 className="font-semibold">{guide.country}: {guide.document} photos</h3><p className="mt-2 text-sm text-slate-600">{guide.description}</p></Link>)}</div></section>;
}
