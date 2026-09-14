import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getGermanGuideBySlug,
  getAllGermanGuideSlugs,
  getAllGermanGuides,
} from "@/lib/de-guides";
import { Clock, ChevronDown, ArrowRight } from "lucide-react";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getAllGermanGuideSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGermanGuideBySlug(slug);

  if (!guide) {
    return {
      title: "Ratgeber nicht gefunden | PixPassVisa",
    };
  }

  const canonicalUrl = `https://www.pixpassvisa.com/de/guides/${guide.slug}`;

  return {
    title: guide.title,
    description: guide.description,
    keywords: guide.keywords ? guide.keywords.split(",").map((k) => k.trim()) : [],
    alternates: {
      canonical: canonicalUrl,
      languages: {
        de: canonicalUrl,
      },
    },
    openGraph: {
      title: `${guide.title} | PixPassVisa`,
      description: guide.description,
      url: canonicalUrl,
      siteName: "PixPassVisa",
      locale: "de_DE",
      type: "article",
      publishedTime: guide.date,
      modifiedTime: guide.updatedAt || guide.date,
      authors: [guide.author],
      images: [
        {
          url: guide.image,
          width: 1200,
          height: 630,
          alt: guide.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: guide.title,
      description: guide.description,
      images: [guide.image],
    },
  };
}

export default async function GermanGuideDetailPage({ params }: Props) {
  const { slug } = await params;
  const guide = getGermanGuideBySlug(slug);

  if (!guide) {
    notFound();
  }

  const allGuides = getAllGermanGuides();
  const relatedGuides = allGuides.filter((g) => g.slug !== guide.slug).slice(0, 3);

  // Article JSON-LD Schema
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.description,
    image: [guide.image],
    datePublished: guide.date,
    dateModified: guide.updatedAt || guide.date,
    author: {
      "@type": "Organization",
      name: guide.author,
      url: "https://www.pixpassvisa.com/de",
    },
    publisher: {
      "@type": "Organization",
      name: "PixPassVisa",
      logo: {
        "@type": "ImageObject",
        url: "https://res.cloudinary.com/dipzpwbbk/image/upload/v1779008016/c24d89b1-ab0e-4f1d-9035-5814bc7b91ca_preview_ip9ogs.jpg",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.pixpassvisa.com/de/guides/${guide.slug}`,
    },
  };

  // FAQPage JSON-LD Schema (if available)
  const faqJsonLd =
    guide.faq && guide.faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: guide.faq.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer,
            },
          })),
        }
      : null;

  // Breadcrumb JSON-LD
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Startseite",
        item: "https://www.pixpassvisa.com/de",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Ratgeber",
        item: "https://www.pixpassvisa.com/de/guides",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: guide.title,
        item: `https://www.pixpassvisa.com/de/guides/${guide.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      <div className="bg-white text-slate-900 min-h-screen pt-4 sm:pt-8 pb-16 sm:pb-24 relative overflow-x-hidden">
        {/* Glow backdrop accent */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-blue-100/40 blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-1.5 sm:gap-2 text-xs font-semibold text-slate-500 mb-6 sm:mb-8 overflow-x-auto whitespace-nowrap py-1">
            <Link href="/de" className="hover:text-blue-700 transition-colors shrink-0">
              Startseite
            </Link>
            <span className="text-slate-300 shrink-0">/</span>
            <Link href="/de/guides" className="hover:text-blue-700 transition-colors shrink-0">
              Ratgeber
            </Link>
            <span className="text-slate-300 shrink-0">/</span>
            <span className="text-slate-900 font-bold truncate max-w-[180px] sm:max-w-xs">{guide.title}</span>
          </nav>

          {/* Article Header */}
          <header className="max-w-4xl mx-auto text-center mb-8 sm:mb-12">
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <span className="bg-blue-50/70 border border-blue-200 text-blue-800 px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider">
                {guide.category}
              </span>
              <span className="text-[11px] sm:text-xs text-slate-500 font-semibold flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>{guide.readingTime}</span>
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight sm:leading-tight mb-4 sm:mb-6 break-words">
              {guide.title}
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-6 sm:mb-8 max-w-3xl mx-auto font-normal break-words">
              {guide.description}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 text-xs font-semibold text-slate-500 border-y border-slate-200 py-3 sm:py-4 px-2">
              <span>Autor: <strong className="text-slate-900 font-bold">{guide.author}</strong></span>
              <span className="hidden sm:inline">•</span>
              <span>Veröffentlicht: <strong className="text-slate-900 font-bold">{guide.date}</strong></span>
              {guide.updatedAt && (
                <>
                  <span className="hidden sm:inline">•</span>
                  <span>Aktualisiert: <strong className="text-slate-900 font-bold">{guide.updatedAt}</strong></span>
                </>
              )}
            </div>
          </header>

          {/* Featured Image - Fully Responsive on PC and Mobile */}
          <div className="max-w-4xl mx-auto mb-10 sm:mb-16 rounded-xl sm:rounded-2xl overflow-hidden border border-slate-200  bg-slate-100 relative aspect-[16/9] sm:aspect-[21/9] md:aspect-[16/9]">
            <img
              src={guide.image}
              alt={guide.title}
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Content Layout with Sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 max-w-6xl mx-auto">
            {/* Table of Contents (Sticky Desktop Sidebar) */}
            {guide.toc.length > 0 && (
              <aside className="hidden lg:block lg:col-span-4">
                <div className="sticky top-28 bg-slate-50 border border-slate-200/90 rounded-2xl p-6">
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                    Inhaltsverzeichnis
                  </h3>
                  <nav className="space-y-2 text-xs">
                    {guide.toc.map((item) => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        className={`block text-slate-600 hover:text-blue-700 transition-colors leading-normal ${
                          item.level === 3 ? "pl-4 text-[11px]" : "font-semibold"
                        }`}
                      >
                        {item.text}
                      </a>
                    ))}
                  </nav>

                  {/* Sidebar CTA */}
                  <div className="mt-8 pt-6 border-t border-slate-200 text-center">
                    <p className="text-xs text-slate-700 font-bold mb-3">
                      Passfoto jetzt online erstellen
                    </p>
                    <Link
                      href="/de/passbild-online"
                      className="inline-flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl text-xs transition-all"
                    >
                      <span>Foto umwandeln</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </aside>
            )}

            {/* Main Article Body */}
            <main
              className={`w-full min-w-0 ${
                guide.toc.length > 0 ? "lg:col-span-8" : "lg:col-span-12 max-w-3xl mx-auto"
              }`}
            >
              {/* Mobile Table of Contents */}
              {guide.toc.length > 0 && (
                <details className="lg:hidden mb-8 bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 group [&[open]]:bg-blue-50/70/30 [&[open]]:border-blue-300">
                  <summary className="font-bold text-slate-900 text-sm sm:text-base cursor-pointer list-none flex items-center justify-between gap-3">
                    <span className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                      Inhaltsverzeichnis
                    </span>
                    <ChevronDown className="w-4 h-4 text-blue-600 group-open:rotate-180 transition-transform shrink-0" />
                  </summary>
                  <nav className="mt-4 pt-4 border-t border-slate-200/80 space-y-2 text-xs sm:text-sm">
                    {guide.toc.map((item) => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        className={`block text-slate-700 hover:text-blue-700 transition-colors leading-relaxed ${
                          item.level === 3 ? "pl-4 text-xs text-slate-600" : "font-semibold"
                        }`}
                      >
                        {item.text}
                      </a>
                    ))}
                  </nav>
                </details>
              )}

              <article
                className="prose prose-base sm:prose-lg max-w-none prose-slate min-w-0 break-words
                  prose-headings:text-slate-900 prose-headings:font-extrabold prose-headings:tracking-tight prose-headings:break-words
                  prose-h2:text-xl prose-h2:sm:text-3xl prose-h2:mt-10 prose-h2:sm:mt-12 prose-h2:mb-4 prose-h2:sm:mb-6 prose-h2:border-b prose-h2:border-slate-200 prose-h2:pb-3 prose-h2:text-blue-700
                  prose-h3:text-lg prose-h3:sm:text-xl prose-h3:mt-6 prose-h3:sm:mt-8 prose-h3:mb-3 prose-h3:sm:mb-4 prose-h3:text-slate-900
                  prose-p:text-slate-700 prose-p:leading-relaxed prose-p:mb-4 prose-p:sm:mb-6 prose-p:text-sm prose-p:sm:text-base prose-p:break-words
                  prose-li:text-slate-700 prose-li:my-1 prose-li:text-sm prose-li:sm:text-base
                  prose-strong:text-slate-900 prose-strong:font-bold
                  prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50/70/50 prose-blockquote:p-4 prose-blockquote:rounded-r-xl prose-blockquote:text-slate-800 prose-blockquote:my-6
                  [&_table]:block [&_table]:w-full [&_table]:overflow-x-auto [&_table]:my-6 [&_table]:border-collapse
                  [&_th]:bg-slate-100 [&_th]:text-slate-900 [&_th]:p-2.5 [&_th]:sm:p-3 [&_th]:text-left [&_th]:border [&_th]:border-slate-200 [&_th]:text-xs [&_th]:sm:text-sm [&_th]:font-bold [&_th]:whitespace-nowrap
                  [&_td]:p-2.5 [&_td]:sm:p-3 [&_td]:border [&_td]:border-slate-200 [&_td]:text-xs [&_td]:sm:text-sm [&_td]:text-slate-700
                  [&_img]:rounded-2xl [&_img]:max-w-full [&_img]:h-auto [&_img]:mx-auto [&_img]:my-6 [&_img]:shadow-sm
                  [&_pre]:overflow-x-auto [&_pre]:max-w-full [&_pre]:p-4 [&_pre]:rounded-xl
                  [&_code]:break-all"
                dangerouslySetInnerHTML={{ __html: guide.contentHtml }}
              />

              {/* FAQ Section */}
              {guide.faq && guide.faq.length > 0 && (
                <section className="mt-12 sm:mt-16 pt-8 sm:pt-12 border-t border-slate-200">
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6 sm:mb-8 flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full bg-blue-600 shrink-0" />
                    Häufig gestellte Fragen (FAQ)
                  </h2>
                  <div className="space-y-3 sm:space-y-4">
                    {guide.faq.map((item, idx) => (
                      <details
                        key={idx}
                        className="group bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-6 transition-all duration-200 [&[open]]:border-blue-500 [&[open]]:bg-blue-50/70/30"
                      >
                        <summary className="font-bold text-slate-900 text-sm sm:text-lg cursor-pointer list-none flex items-center justify-between gap-3">
                          <span className="leading-snug">{item.question}</span>
                          <ChevronDown className="w-5 h-5 text-blue-600 group-open:rotate-180 transition-transform shrink-0" />
                        </summary>
                        <p className="mt-3 sm:mt-4 text-slate-700 text-xs sm:text-base leading-relaxed border-t border-slate-200/80 pt-3 sm:pt-4">
                          {item.answer}
                        </p>
                      </details>
                    ))}
                  </div>
                </section>
              )}

              {/* Conversion CTA Footer Box */}
              <div className="mt-12 sm:mt-16 bg-slate-900 rounded-2xl sm:rounded-3xl p-6 sm:p-10 text-white flex flex-col sm:flex-row items-center sm:items-start md:items-center justify-between gap-6">
                <div className="text-center sm:text-left">
                  <h3 className="text-xl sm:text-2xl font-black mb-2">
                    Passfoto nach offiziellen Richtlinien
                  </h3>
                  <p className="text-slate-300 font-medium text-xs sm:text-base">
                    Laden Sie Ihr Foto jetzt hoch und lassen Sie es KI-gestützt biometrisch prüfen.
                  </p>
                </div>
                <Link
                  href="/de/passbild-online"
                  className="w-full sm:w-auto text-center bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3.5 rounded-xl sm:rounded-2xl text-sm transition-all whitespace-nowrap shrink-0"
                >
                  Passfoto erstellen →
                </Link>
              </div>
            </main>
          </div>

          {/* Related Guides */}
          {relatedGuides.length > 0 && (
            <div className="mt-16 sm:mt-24 pt-12 sm:pt-16 border-t border-slate-200">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6 sm:mb-8">
                Ähnliche Ratgeber & Artikel
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {relatedGuides.map((rel) => (
                  <div
                    key={rel.slug}
                    className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 hover:border-blue-500 transition-all group flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-xs font-bold text-blue-700 uppercase tracking-wider block mb-2">
                        {rel.category}
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-3 line-clamp-2">
                        <Link href={`/de/guides/${rel.slug}`}>{rel.title}</Link>
                      </h3>
                      <p className="text-slate-600 text-xs line-clamp-3 leading-relaxed mb-4">
                        {rel.description}
                      </p>
                    </div>
                    <Link
                      href={`/de/guides/${rel.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      <span>Jetzt lesen</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

