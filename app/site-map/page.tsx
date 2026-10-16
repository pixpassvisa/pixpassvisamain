import type { Metadata } from "next";
import Link from "next/link";
import PageDirectory from "../components/PageDirectory";

export const metadata: Metadata = {
  openGraph: { title: "All Photo Tools & Country Guides | PixPassVisa", description: "Browse PixPassVisa’s passport and visa photo tools, country guides, photo advice, and help pages in English, French, and German.", url: "https://www.pixpassvisa.com/site-map", siteName: "PixPassVisa", type: "website", images: ["https://www.pixpassvisa.com/opengraph-image"] },
  twitter: { card: "summary_large_image", title: "All Photo Tools & Country Guides | PixPassVisa", description: "Browse PixPassVisa’s passport and visa photo tools, country guides, photo advice, and help pages in English, French, and German.", images: ["https://www.pixpassvisa.com/opengraph-image"] },
  title: "All Photo Tools & Country Guides | PixPassVisa",
  description: "Browse PixPassVisa’s passport and visa photo tools, country guides, photo advice, and help pages in English, French, and German.",
  alternates: { canonical: "https://www.pixpassvisa.com/site-map" },
};
export const revalidate = 3600;
export default function SiteMap() {
  return <div className="directory-page">
    <nav aria-label="Breadcrumb"><Link href="/">Home</Link> / All pages</nav>
    <h1>Find the right photo guide.</h1>
    <p>Browse by document, task, or language. Start with your country’s passport or visa guide, then choose a checker or photo preparation tool for your application.</p>
    <PageDirectory expanded />
  </div>;
}
