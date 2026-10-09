import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found | PixPassVisa",
  description:
    "Find passport and visa photo tools and country-specific photo guides on PixPassVisa.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24 text-center">
      <p className="text-sm font-semibold text-slate-500">404 — Page not found</p>
      <h1 className="mt-4 text-4xl font-bold">Let’s get you to the right place.</h1>
      <p className="mt-6 text-lg text-slate-600">This address may have changed. Choose a photo tool or browse our country guides.</p>
      <nav aria-label="Page recovery" className="mt-8 flex flex-wrap justify-center gap-6">
        <Link prefetch={false} href="/" className="underline">Home</Link>
        <Link prefetch={false} href="/passport-photo-online" className="underline">Create a photo</Link>
        <Link prefetch={false} href="/passport-photo-sizes" className="underline">Photo size guides</Link>
      </nav>
    </main>
  );
}
