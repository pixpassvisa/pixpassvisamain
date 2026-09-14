import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllUKPageSlugs, getUKPageBySlug } from "@/lib/uk-content";
import UKEmbeddedTool from "../components/UKEmbeddedTool";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import UKBeforeAfterSlider from "../components/UKBeforeAfterSlider";
import { CheckCircle2, Zap, Lock, HelpCircle } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllUKPageSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getUKPageBySlug(slug);

  if (!page) {
    return {
      title: "Page Not Found | PixPassVisa UK",
    };
  }

  const canonicalUrl = `https://www.pixpassvisa.com/uk/${page.slug}`;

  return {
    title: page.title,
    description: page.description,
    keywords: page.keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: page.title,
      description: page.description,
      url: canonicalUrl,
      siteName: "PixPassVisa UK",
      locale: "en_GB",
      type: "article",
      images: [
        {
          url: page.image,
          width: 1200,
          height: 630,
          alt: page.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: [page.image],
    },
  };
}

export default async function UKSlugPage({ params }: PageProps) {
  const { slug } = await params;
  const page = getUKPageBySlug(slug);

  if (!page) {
    notFound();
  }

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: page.title,
    url: `https://www.pixpassvisa.com/uk/${page.slug}`,
    description: page.description,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "6.99",
      priceCurrency: "GBP",
    },
  };

  const breadcrumbSchema = {
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
        name: "UK Photo Tools",
        item: "https://www.pixpassvisa.com/uk",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: page.h1 || page.title,
        item: `https://www.pixpassvisa.com/uk/${page.slug}`,
      },
    ],
  };

  const faqSchema =
    page.faq && page.faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: page.faq.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer,
            },
          })),
        }
      : null;

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      {/* Gov-style top accent bar */}
      <div className="h-1 bg-blue-700 w-full" />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      {/* Navigation */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-4 py-1">
          <Breadcrumbs />
        </div>
      </div>

      <section className="bg-white border-b border-slate-200 py-8 lg:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
            {/* Left Column: Headline & 2 CTAs */}
            <div className="flex-1 w-full text-left">
              <div className="inline-flex items-center gap-2 bg-blue-50/70 border border-blue-200 rounded-full px-3 py-1 mb-4">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                <span className="text-xs font-extrabold text-blue-800 tracking-wide uppercase">
                  UK Biometric Photo Tool · HMPO &amp; DVLA Compliant
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-4xl font-black text-slate-800 leading-tight tracking-tight mb-3">
                {page.h1 || page.title}
              </h1>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-7 max-w-lg">
                {page.description}
              </p>

              {/* 2 CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3.5 mb-7">
                <a
                  href="#uk-tool"
                  className="inline-flex items-center justify-center bg-blue-700 hover:bg-blue-800 text-white text-sm sm:text-base font-bold px-4 py-3  transition-all active:scale-95 gap-2"
                >
                  <span>Upload &amp; Create Photo</span>
                </a>
                <a
                  href="/uk-passport-photo-checker-online-free"
                  className="inline-flex items-center justify-center bg-white border-2 border-slate-300 hover:border-blue-600 hover:text-blue-700 text-slate-800 text-sm sm:text-base font-bold px-4 py-3  transition-all active:scale-95 gap-2"
                >
                  <span>Free Passport Photo Checker</span>
                </a>
              </div>

              {/* Star Rating */}
              <div className="flex flex-wrap   gap-3 text-xs font-semibold text-slate-500 mt-5">
                <span className="bg-slate-100 px-3 py-1 rounded-full">
                  By {page.author}
                </span>
                <span className="bg-slate-100 px-3 py-1 rounded-full">
                  Updated {page.date}
                </span>
              
              </div>
            </div>

            {/* Right Column: Before & After Slider */}
            <div className="w-full lg:w-auto flex justify-center">
              <UKBeforeAfterSlider />
            </div>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Interactive Embedded Tool */}
        <div
          className="max-w-7xl mx-auto px-1 sm:px-2 lg:px-4 py-2 scroll-mt-6"
          id="uk-tool"
        >
          <UKEmbeddedTool
            defaultDoc={page.defaultDoc}
            toolTitle={page.toolTitle}
            toolSubtitle={page.toolSubtitle}
          />
        </div>

        {/* Content & Sidebar Layout */}
        <div className="mt-12 max-w-6xl mx-auto grid lg:grid-cols-4 gap-8">
          {/* Table of Contents & Quick Badges Sidebar */}
          {page.toc.length > 0 && (
            <aside className="lg:col-span-1 hidden lg:block space-y-6">
              <div className="sticky top-24 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-3">
                  On this page
                </h3>
                <nav className="space-y-2 text-xs font-semibold">
                  {page.toc.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={`block text-slate-600 hover:text-blue-700 transition-colors ${
                        item.level === 3 ? "pl-3 border-l border-slate-200" : ""
                      }`}
                    >
                      {item.text}
                    </a>
                  ))}
                </nav>

                <div className="mt-6 pt-4 border-t border-slate-100 text-[11px] space-y-2 font-medium text-slate-500">
                  <div className="flex items-center gap-2 text-emerald-700 font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> HMPO Compliant
                  </div>
                  <div className="flex items-center gap-2 text-blue-700 font-bold">
                    <Zap className="w-4 h-4 text-blue-600" /> 30-Second Result
                  </div>
                  <div className="flex items-center gap-2 text-blue-700 font-bold">
                    <Lock className="w-4 h-4 text-blue-600" /> Deleted in 24 Hours
                  </div>
                </div>
              </div>
            </aside>
          )}

          {/* Rendered Markdown Article */}
          <main
            className={page.toc.length > 0 ? "lg:col-span-3" : "lg:col-span-4"}
          >
            <article className="bg-white p-6 sm:p-10 rounded-2xl border border-slate-200 shadow-xs prose prose-slate max-w-none prose-headings:font-black prose-headings:text-slate-900 prose-a:text-blue-700 prose-a:font-bold">
              <div
                className="rich-content"
                dangerouslySetInnerHTML={{ __html: page.contentHtml }}
              />
            </article>

            {/* FAQ Accordion Section */}
            {page.faq && page.faq.length > 0 && (
              <div className="mt-10 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs">
                <div className="flex items-center gap-3 mb-6">
                  <HelpCircle className="w-6 h-6 text-blue-600" />
                  <h2 className="text-2xl font-black text-slate-900">
                    Frequently Asked Questions
                  </h2>
                </div>
                <div className="divide-y divide-slate-100">
                  {page.faq.map((item, index) => (
                    <details key={index} className="group py-4">
                      <summary className="flex cursor-pointer items-center justify-between font-bold text-slate-900 list-none text-base sm:text-lg">
                        {item.question}
                        <span className="ml-4 text-blue-700 group-open:rotate-45 transition-transform text-xl">
                          +
                        </span>
                      </summary>
                      <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
                        {item.answer}
                      </p>
                    </details>
                  ))}
                </div>
              </div>
            )}

            {/* Return / Navigation Links */}
            <div className="mt-10 text-center">
              <Link
                href="/uk"
                className="inline-flex items-center gap-2 px-5 py-3 bg-white border border-slate-200 rounded-xl text-sm font-extrabold text-slate-800 hover:border-blue-500 hover:text-blue-700 transition-all shadow-xs"
              >
                ← Explore All UK Passport &amp; Visa Guides
              </Link>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
