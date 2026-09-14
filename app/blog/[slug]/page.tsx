import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { CheckCircle2, FileCheck, Globe, HelpCircle } from 'lucide-react';
import connectToDatabase from '@/lib/mongodb';
import BlogModel from '@/models/Blog';
import ReadingProgressBar from '@/app/components/ReadingProgressBar';
import TocSidebar from '@/app/components/TocSidebar';
import FaqAccordion from '@/app/components/FaqAccordion';

// Define the Blog Post type
export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  content: string;
  featuredImage?: string;
}

const APP_URL = 'https://www.pixpassvisa.com';

export const revalidate = 3600;

// Helper to get ALL posts
async function getAllPosts(): Promise<BlogPost[]> {
  try {
    await connectToDatabase();
    const posts = await BlogModel.find({ isPublished: true }).sort({ date: -1 }).lean() as BlogPost[];
    if (posts && posts.length > 0) return posts;
  } catch (error) {
    console.error("Error reading blog posts from DB:", error);
  }

  const filePath = path.join(process.cwd(), 'data', 'blog-posts.json');
  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents) as BlogPost[];
  } catch (error) {
    console.error("Error reading blog posts:", error);
    return [];
  }
}

// Compute reading time dynamically from word count
function getReadingTime(content: string): string {
  const words = content.replace(/<[^>]*>/g, '').trim().split(/\s+/).length;
  const minutes = Math.max(3, Math.ceil(words / 225));
  return `${minutes} min read`;
}

// Category identifier
function getPostCategory(slug: string, title: string): string {
  const lower = (slug + ' ' + title).toLowerCase();
  if (lower.includes('us-visa') || lower.includes('us visa') || lower.includes('ds-160') || lower.includes('green card') || lower.includes('dv-lottery') || lower.includes('h1b')) return 'US Visas & Passports';
  if (lower.includes('schengen') || lower.includes('france') || lower.includes('germany') || lower.includes('europe')) return 'Schengen & Europe';
  if (lower.includes('uk-') || lower.includes('uk visa') || lower.includes('uk digital')) return 'UK Visas & Passports';
  if (lower.includes('australia') || lower.includes('new zealand') || lower.includes('zealand')) return 'Australia & Pacific';
  if (lower.includes('india')) return 'India e-Visa';
  if (lower.includes('baby') || lower.includes('infant') || lower.includes('child')) return 'Baby & Child Photos';
  return 'Compliance Guide';
}

// Dynamic FAQ Extractor: Parses FAQs directly from each blog post's content
function extractFaqsFromContent(content: string): { faqs: { question: string; answer: string }[]; cleanContent: string } {
  const faqs: { question: string; answer: string }[] = [];
  const faqMatch = content.match(/<h2[^>]*>.*?(faq|frequently asked questions).*?<\/h2>/i);
  if (!faqMatch) return { faqs, cleanContent: content };

  const faqStartIndex = content.indexOf(faqMatch[0]);
  const contentAfterFaqHeader = content.slice(faqStartIndex + faqMatch[0].length);
  const nextH2Match = contentAfterFaqHeader.match(/<h2[^>]*>/i);
  const faqEndIndex = nextH2Match
    ? (faqStartIndex + faqMatch[0].length + contentAfterFaqHeader.indexOf(nextH2Match[0]))
    : content.length;
  
  const faqHtml = content.slice(faqStartIndex + faqMatch[0].length, faqEndIndex);

  // Pattern 1: <h3>Question</h3> <p>Answer</p>
  const h3Regex = /<h3[^>]*>([\s\S]*?)<\/h3>\s*<p[^>]*>([\s\S]*?)<\/p>/g;
  let match;
  while ((match = h3Regex.exec(faqHtml)) !== null) {
    const q = match[1].replace(/<[^>]*>/g, '').trim();
    const a = match[2].replace(/<[^>]*>/g, '').trim();
    if (q && a) faqs.push({ question: q, answer: a });
  }

  // Pattern 2: Cards with font-bold
  if (faqs.length === 0) {
    const cardRegex = /<p[^>]*class=\"[^\"]*font-bold[^\"]*\"[^>]*>(?:Q:\s*)?([\s\S]*?)<\/p>\s*<p[^>]*>([\s\S]*?)<\/p>/g;
    while ((match = cardRegex.exec(faqHtml)) !== null) {
      const q = match[1].replace(/<[^>]*>/g, '').trim().replace(/^Q:\s*/i, '');
      const a = match[2].replace(/<[^>]*>/g, '').trim();
      if (q && a) faqs.push({ question: q, answer: a });
    }
  }

  // Pattern 3: <p><strong>Question</strong><br>Answer</p>
  if (faqs.length === 0) {
    const pRegex = /<p[^>]*>\s*<strong[^>]*>(?:Q:\s*)?([\s\S]*?)<\/strong>\s*(?:<br\s*\/?>)?\s*([\s\S]*?)<\/p>/g;
    while ((match = pRegex.exec(faqHtml)) !== null) {
      const q = match[1].replace(/<[^>]*>/g, '').trim().replace(/^Q:\s*/i, '');
      const a = match[2].replace(/<[^>]*>/g, '').trim();
      if (q && a) faqs.push({ question: q, answer: a });
    }
  }

  // Clean raw FAQ block out of content to prevent duplicate display
  const cleanContent = content.slice(0, faqStartIndex) + content.slice(faqEndIndex);
  return { faqs, cleanContent };
}

// 1. Tell Next.js to Statically Generate exactly these slugs at build time
export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// 2. Generate dynamic SEO Meta Tags based on the specific post
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const posts = await getAllPosts();
  const post = posts.find((p) => p.slug === slug);
  
  if (!post) {
    return { title: 'Post Not Found | PixPassVisa' };
  }

  return {
    title: `${post.title} | PixPassVisa`,
    description: post.description,
    alternates: {
      canonical: `${APP_URL}/blog/${post.slug}`,
      languages: {
        en: `${APP_URL}/blog/${post.slug}`,
        "x-default": `${APP_URL}/blog/${post.slug}`,
      },
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${APP_URL}/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.date,
      authors: [post.author],
      siteName: 'PixPassVisa',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      ...(post.featuredImage && { images: [post.featuredImage] }),
    },
    ...(post.featuredImage && {
      openGraphImages: [{ url: post.featuredImage, width: 1200, height: 630, alt: post.title }],
    }),
  };
}

// 3. The actual Server Component that renders the page
export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const posts = await getAllPosts();
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const category = getPostCategory(post.slug, post.title);
  const readTime = getReadingTime(post.content);

  // Extract FAQs directly from this blog post's content (no static FAQ_MAP used)
  const { faqs, cleanContent } = extractFaqsFromContent(post.content);

  // Extract headings for Table of Contents (H2, H3, H4)
  const headingMatches = cleanContent.match(/<h[234][^>]*>(.*?)<\/h[234]>/gi) || [];
  const headings = headingMatches.map((h) => {
    const level = h.toLowerCase().startsWith('<h2') ? 2 : h.toLowerCase().startsWith('<h3') ? 3 : 4;
    const rawText = h.replace(/<[^>]*>/g, '').trim();
    const id = rawText.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-');
    return { id, text: rawText, level };
  }).filter(h => h.id && h.text);

  // Process content: inject heading IDs for TOC and wrap tables in responsive scroll containers
  let processedContent = cleanContent;

  // Wrap tables in single clean responsive div wrapper
  processedContent = processedContent.replace(/<table[^>]*>([\s\S]*?)<\/table>/gi, (match) => {
    return `<div class="table-wrapper"><table class="w-full text-left font-medium border-collapse">${match.replace(/<table[^>]*>/i, '').replace(/<\/table>/i, '')}</table></div>`;
  });

  // Inject unique heading IDs
  headings.forEach((h) => {
    const tag = h.level === 2 ? 'h2' : h.level === 3 ? 'h3' : 'h4';
    const regex = new RegExp(`<${tag}([^>]*)>(.*?)<\/${tag}>`, 'gi');
    processedContent = processedContent.replace(regex, (match, attrs, innerText) => {
      const plainInner = innerText.replace(/<[^>]*>/g, '').trim();
      if (plainInner === h.text && !attrs.includes('id=')) {
        return `<${tag}${attrs} id="${h.id}">${innerText}</${tag}>`;
      }
      return match;
    });
  });

  // JSON-LD: Article schema (BlogPosting)
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Organization',
      name: post.author,
      url: APP_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'PixPassVisa',
      url: APP_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${APP_URL}/icon.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${APP_URL}/blog/${post.slug}`,
    },
    url: `${APP_URL}/blog/${post.slug}`,
    inLanguage: 'en-US',
    ...(post.featuredImage && {
      image: {
        '@type': 'ImageObject',
        url: post.featuredImage,
        width: 1200,
        height: 630,
      },
    }),
    isPartOf: {
      '@type': 'Blog',
      name: 'PixPassVisa Blog',
      url: `${APP_URL}/blog`,
    },
  };

  // JSON-LD: FAQ schema (only created if post has FAQs)
  const faqSchema = faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  } : null;

  // JSON-LD: BreadcrumbList schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: APP_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: `${APP_URL}/blog`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: `${APP_URL}/blog/${post.slug}`,
      },
    ],
  };

  return (
    <>
      <ReadingProgressBar />
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="min-h-screen bg-slate-50/40">
        {/* Article Hero Header */}
        <header className="relative bg-slate-950 pt-24 pb-14 sm:pt-28 sm:pb-18 md:pt-32 md:pb-24 px-4 overflow-hidden border-b border-slate-800">
          <div className="absolute inset-0 z-0 opacity-25 pointer-events-none">
            <div className="absolute top-0 left-1/4 w-72 h-72 sm:w-[480px] sm:h-[480px] bg-blue-600 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-0 right-1/4 w-72 h-72 sm:w-[480px] sm:h-[480px] bg-emerald-600 rounded-full blur-[140px] animate-pulse delay-700" />
          </div>

          <div className="max-w-4xl mx-auto relative z-10 text-center">
            {/* Breadcrumb Navigation */}
            <nav aria-label="Breadcrumb" className="mb-6 sm:mb-8 flex justify-center">
              <ol className="flex items-center space-x-2 text-xs sm:text-sm font-medium text-slate-400">
                <li>
                  <Link href="/" className="hover:text-cyan-400 transition-colors">Home</Link>
                </li>
                <li aria-hidden="true" className="opacity-30">/</li>
                <li>
                  <Link href="/blog" className="hover:text-cyan-400 transition-colors">Blog</Link>
                </li>
                <li aria-hidden="true" className="opacity-30">/</li>
                <li className="text-slate-300 truncate max-w-[140px] sm:max-w-[240px]" title={post.title}>
                  {post.title}
                </li>
              </ol>
            </nav>

            {/* Category Eyebrow Badge */}
            <div className="inline-flex items-center space-x-2 mb-4 sm:mb-6 bg-blue-600/10 border border-blue-500/20 px-3.5 py-1.5 rounded-full">
              <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
              <span className="text-cyan-400 text-[10px] sm:text-xs font-extrabold uppercase tracking-wider">
                {category} • 2026 Guidelines
              </span>
            </div>

            {/* Prominent Article H1 Title */}
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-5xl font-black text-white tracking-tight leading-[1.18] mb-6 sm:mb-8 text-pretty px-2">
              {post.title}
            </h1>

            {/* Metadata bar */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-slate-300 text-xs sm:text-sm font-medium px-4">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-slate-700 to-slate-800 border border-slate-600 flex items-center justify-center text-cyan-400 font-bold text-xs shadow-inner">
                  {post.author.charAt(0)}
                </div>
                <span>By {post.author}</span>
              </div>
              <span className="w-1 h-1 bg-slate-700 rounded-full hidden sm:block" />
              <time dateTime={post.date} className="text-slate-400">
                {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </time>
              <span className="w-1 h-1 bg-slate-700 rounded-full hidden sm:block" />
              <span className="text-cyan-400 font-semibold">{readTime}</span>
            </div>
          </div>
        </header>

        {/* Article Main Layout */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14 md:py-16 lg:py-20">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 xl:gap-20 justify-center">
            {/* Desktop TOC Sidebar */}
            {headings.length > 0 && (
              <aside className="hidden lg:block w-72 shrink-0">
                <TocSidebar headings={headings} />
              </aside>
            )}

            {/* Mobile TOC Accordion */}
            {headings.length > 0 && (
              <div className="lg:hidden mb-8">
                <details className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                  <summary className="flex items-center justify-between p-4 cursor-pointer list-none text-sm font-bold text-slate-800">
                    <span className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                      </svg>
                      Table of Contents ({headings.length} Sections)
                    </span>
                    <svg className="w-4 h-4 text-slate-400 transition-transform details-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </summary>
                  <nav className="px-4 pb-4 space-y-1.5 border-t border-slate-100 pt-3">
                    {headings.map((heading) => (
                      <a
                        key={heading.id}
                        href={`#${heading.id}`}
                        className={`block text-xs py-1.5 text-slate-600 hover:text-blue-600 ${
                          heading.level === 4 ? 'pl-6 text-[11px]' : heading.level === 3 ? 'pl-3 font-medium' : 'font-semibold'
                        }`}
                      >
                        {heading.text}
                      </a>
                    ))}
                  </nav>
                </details>
              </div>
            )}

            {/* Reading Content Area */}
            <div className="w-full max-w-3xl blog-content-wrapper">
              {/* Featured Image - Aligned with article column */}
              {post.featuredImage && (
                <div className="mb-10 overflow-hidden rounded-xl sm:rounded-2xl border border-slate-200/90 shadow-xs bg-slate-900">
                  <div className="relative aspect-[16/9] w-full">
                    <Image
                      src={post.featuredImage}
                      alt={post.title}
                      fill
                      priority
                      sizes="(max-width: 768px) 100vw, 768px"
                      className="object-contain p-2 sm:p-3 object-center"
                    />
                  </div>
                </div>
              )}

              <div
                className="prose-premium max-w-none"
                dangerouslySetInnerHTML={{ __html: processedContent }}
              />

              {/* Dynamic FAQ Section (Extracted from Post Content) */}
              {faqs.length > 0 && (
                <section className="mt-14 sm:mt-18 lg:mt-24 pt-12 border-t border-slate-200">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-1.5 h-8 bg-blue-600 rounded-full" />
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900 !m-0 !p-0 !border-0">
                      Frequently Asked Questions
                    </h2>
                  </div>
                  <div className="space-y-4">
                    <FaqAccordion faqs={faqs.map(f => ({ q: f.question, a: f.answer }))} />
                  </div>
                </section>
              )}

              {/* High-Impact CTA Box */}
              <section className="mt-14 sm:mt-18 lg:mt-24 p-6 sm:p-10 lg:p-14 bg-slate-950 rounded-3xl text-center relative overflow-hidden group border border-blue-500/20 shadow-2xl">
                <div className="absolute top-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-blue-600/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700" />
                <div className="absolute bottom-0 left-0 w-48 h-48 sm:w-64 sm:h-64 bg-emerald-600/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700" />

                <h3 className="text-xl sm:text-3xl font-black text-white mb-4 relative z-10 leading-tight">
                  Avoid Passport & Visa Photo Rejections
                </h3>
                <p className="text-slate-300 mb-8 max-w-xl mx-auto text-sm sm:text-base leading-relaxed relative z-10 font-normal">
                  Our automatic AI tool fixes background shadows, crops to exact millimeter specs (2x2" or 35x45mm), and guarantees 100% biometric compliance.
                </p>
                <Link
                  href="/passport-photo-online"
                  className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-black text-base sm:text-lg py-3.5 px-8 sm:px-10 rounded-2xl transition-all shadow-xl shadow-blue-500/20/20 group/btn relative z-10"
                >
                  Create & Fix My Photo Now
                  <svg className="w-5 h-5 ml-2 group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
                <div className="mt-8 flex items-center justify-center gap-4 text-slate-400 text-xs font-bold opacity-75 flex-wrap">
                  <span className="flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-cyan-400" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293l-4 4a1 1 0 01-1.414 0l-2-2a1 1 0 111.414-1.414L9 10.586l3.293-3.293a1 1 0 111.414 1.414z"/></svg>
                    Exact Country Sizes
                  </span>
                  <span className="w-1 h-1 bg-slate-700 rounded-full" />
                  <span className="flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-cyan-400" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293l-4 4a1 1 0 01-1.414 0l-2-2a1 1 0 111.414-1.414L9 10.586l3.293-3.293a1 1 0 111.414 1.414z"/></svg>
                    Biometric Check
                  </span>
                </div>
              </section>

              {/* Related Directory Resources */}
              <section className="mt-12 sm:mt-16">
                <h4 className="text-base sm:text-lg font-black text-slate-900 mb-5">Related Photo Resources</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Link href="/visa-photo-validator" className="group flex items-center gap-4 p-4.5 bg-white rounded-2xl border border-slate-200/90 hover:border-blue-400 hover:shadow-md transition-all">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100 group-hover:scale-105 transition-transform">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-sm font-bold text-slate-900 group-hover:text-blue-600 block">Free Photo Validator</span>
                      <p className="text-xs text-slate-500 mt-0.5">Instant compliance check for 600x600 size & ratio</p>
                    </div>
                  </Link>
                  <Link href="/passport-photos" className="group flex items-center gap-4 p-4.5 bg-white rounded-2xl border border-slate-200/90 hover:border-blue-400 hover:shadow-md transition-all">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100 group-hover:scale-105 transition-transform">
                      <FileCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-sm font-bold text-slate-900 group-hover:text-blue-600 block">Passport Photo Specs</span>
                      <p className="text-xs text-slate-500 mt-0.5">Official requirements for 50+ countries</p>
                    </div>
                  </Link>
                  <Link href="/visa-photo" className="group flex items-center gap-4 p-4.5 bg-white rounded-2xl border border-slate-200/90 hover:border-blue-400 hover:shadow-md transition-all">
                    <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0 border border-teal-100 group-hover:scale-105 transition-transform">
                      <Globe className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-sm font-bold text-slate-900 group-hover:text-blue-600 block">Visa Photo Directory</span>
                      <p className="text-xs text-slate-500 mt-0.5">International visa photo size guidelines</p>
                    </div>
                  </Link>
                  <Link href="/faq" className="group flex items-center gap-4 p-4.5 bg-white rounded-2xl border border-slate-200/90 hover:border-blue-400 hover:shadow-md transition-all">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100 group-hover:scale-105 transition-transform">
                      <HelpCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-sm font-bold text-slate-900 group-hover:text-blue-600 block">Biometric FAQ</span>
                      <p className="text-xs text-slate-500 mt-0.5">Answers to common photo rejection causes</p>
                    </div>
                  </Link>
                </div>
              </section>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
