import Link from 'next/link';
import Image from 'next/image';
import { Camera, CheckCircle2, FileCheck, Globe, Zap } from 'lucide-react';
import connectToDatabase from '@/lib/mongodb';
import BlogModel from '@/models/Blog';
import fs from 'fs';
import path from 'path';

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

// Helper function to read the blog posts directly from DB with fallback to JSON
export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    await connectToDatabase();
    const posts = await BlogModel.find({ isPublished: true }).sort({ date: -1 }).lean() as BlogPost[];
    if (posts && posts.length > 0) return JSON.parse(JSON.stringify(posts)) as BlogPost[];
  } catch (error) {
    console.error("Error reading blog posts from DB:", error);
  }

  const filePath = path.join(process.cwd(), 'data', 'blog-posts.json');
  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const posts = JSON.parse(fileContents) as BlogPost[];
    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error("Error reading blog posts:", error);
    return [];
  }
}

// Helper to compute reading time dynamically from word count
function getReadingTime(content: string): string {
  const words = content.replace(/<[^>]*>/g, '').trim().split(/\s+/).length;
  const minutes = Math.max(3, Math.ceil(words / 225));
  return `${minutes} min read`;
}

// Helper to determine category tag
function getPostCategory(slug: string, title: string): string {
  const lower = (slug + ' ' + title).toLowerCase();
  if (lower.includes('us-visa') || lower.includes('us visa') || lower.includes('ds-160') || lower.includes('green card') || lower.includes('dv-lottery') || lower.includes('h1b')) return 'US Visas & Passports';
  if (lower.includes('schengen') || lower.includes('france') || lower.includes('germany') || lower.includes('europe')) return 'Schengen & Europe';
  if (lower.includes('uk-') || lower.includes('uk visa') || lower.includes('uk digital')) return 'UK Visas & Passports';
  if (lower.includes('australia') || lower.includes('new zealand') || lower.includes('zealand')) return 'Australia & Pacific';
  if (lower.includes('india')) return 'India e-Visa';
  if (lower.includes('baby') || lower.includes('infant') || lower.includes('child')) return 'Baby & Child Photos';
  return 'Compliance Guides';
}

const APP_URL = 'https://www.pixpassvisa.com';

export const revalidate = 3600;

export const metadata = {
  title: 'Passport & Visa Photo Requirements Blog | Expert Guides 2026',
  description: 'Expert advice on global passport, visa, and ID photo requirements. Get 2026 compliance guidelines, biometric tips, and step-by-step guides for 50+ countries including US, UK, India, and Schengen.',
  keywords: ['passport photo requirements', 'visa photo guide', 'biometric photo tips', 'passport photo compliance', 'global visa photo requirements', 'UK passport photo', 'India passport photo', 'Schengen visa photo'],
  alternates: {
    canonical: `${APP_URL}/blog`,
    languages: {
      en: `${APP_URL}/blog`,
      fr: `${APP_URL}/fr/guides`,
      de: `${APP_URL}/de/guides`,
      "x-default": `${APP_URL}/blog`,
    },
  },
  openGraph: {
    title: 'Global Passport & Visa Photo Guides | PixPassVisa Blog',
    description: 'Expert advice on passport, visa, and ID photo requirements for 50+ countries. 2026 compliance guidelines and step-by-step guides.',
    url: `${APP_URL}/blog`,
    type: 'website',
  },
};

export default async function BlogIndex() {
  const posts = await getBlogPosts();
  const featuredPost = posts[0];
  const remainingPosts = posts.slice(1);

  // JSON-LD: CollectionPage schema
  const collectionPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Global Passport & Visa Photo Requirements Blog',
    description: 'Expert advice on passport, visa, and ID photo requirements for 50+ countries. 2026 compliance guidelines and step-by-step guides.',
    url: `${APP_URL}/blog`,
    publisher: {
      '@type': 'Organization',
      name: 'PixPassVisa',
      url: APP_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${APP_URL}/icon.png`,
      },
    },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: posts.map((post, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `${APP_URL}/blog/${post.slug}`,
        name: post.title,
      })),
    },
  };

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
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="min-h-screen bg-slate-50/50">
        {/* Compact Dark Hero Header */}
        <header className="relative bg-slate-950 pt-20 pb-10 sm:pt-24 sm:pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-slate-800">
          <div className="absolute inset-0 z-0 opacity-25 pointer-events-none">
            <div className="absolute top-0 left-1/4 w-60 h-60 sm:w-96 sm:h-96 bg-blue-600 rounded-full blur-[100px] animate-pulse" />
            <div className="absolute bottom-0 right-1/4 w-60 h-60 sm:w-96 sm:h-96 bg-emerald-600 rounded-full blur-[120px] animate-pulse delay-700" />
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            <nav aria-label="Breadcrumb" className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4">
              <ol className="flex items-center space-x-2">
                <li>
                  <Link href="/" className="hover:text-cyan-400 transition-colors">Home</Link>
                </li>
                <li aria-hidden="true" className="opacity-40">/</li>
                <li className="text-slate-200 font-black">Blog</li>
              </ol>
            </nav>

            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/10 border border-blue-500/20 text-cyan-400 text-[10px] sm:text-xs font-extrabold uppercase tracking-wider mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                2026 Biometric Photo Knowledge Hub
              </div>
              <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight mb-3">
                Official Photo <span className="bg-gradient-to-r from-cyan-400 via-emerald-400 to-teal-300 bg-clip-text text-transparent">Compliance Guides</span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal max-w-xl">
                Expert advice, government-verified specifications, and step-by-step guides for passport, visa, and ID photographs across 50+ countries.
              </p>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* Compact Featured Article */}
          {featuredPost && (
            <section aria-label="Featured Article" className="mb-10 sm:mb-12">
              <Link
                href={`/blog/${featuredPost.slug}`}
                className="group relative block bg-white rounded-xl sm:rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                  <div className="lg:col-span-5 aspect-[16/9] lg:aspect-auto relative min-h-[180px] sm:min-h-[220px] overflow-hidden bg-slate-900 flex items-center justify-center">
                    {featuredPost.featuredImage ? (
                      <Image
                        src={featuredPost.featuredImage}
                        alt={featuredPost.title}
                        fill
                        priority
                        sizes="(max-width: 1024px) 100vw, 40vw"
                        className="object-contain p-3 transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-800 flex flex-col items-center justify-center p-4 text-center">
                        <span className="text-cyan-400 font-bold text-xl tracking-tight mb-1">PixPassVisa</span>
                        <span className="text-slate-400 text-xs font-medium">Official Biometric Guide</span>
                      </div>
                    )}
                    <div className="absolute top-3 left-3 z-10 flex items-center gap-2">
                      <span className="bg-blue-600 text-slate-950 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                        Featured Guide
                      </span>
                    </div>
                  </div>
                  
                  <div className="lg:col-span-7 p-5 sm:p-6 lg:p-7 flex flex-col justify-between bg-white">
                    <div>
                      <div className="flex items-center gap-2 text-slate-500 text-xs font-semibold mb-2.5 flex-wrap">
                        <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-bold text-[11px]">
                          {getPostCategory(featuredPost.slug, featuredPost.title)}
                        </span>
                        <span className="w-1 h-1 bg-slate-300 rounded-full" />
                        <time dateTime={featuredPost.date} className="text-slate-400">
                          {new Date(featuredPost.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </time>
                        <span className="w-1 h-1 bg-slate-300 rounded-full" />
                        <span className="text-blue-700 font-bold">{getReadingTime(featuredPost.content)}</span>
                      </div>
                      
                      <h2 className="text-lg sm:text-xl font-black text-slate-900 mb-2 group-hover:text-blue-600 transition-colors leading-snug tracking-tight">
                        {featuredPost.title}
                      </h2>
                      
                      <p className="text-slate-600 text-xs sm:text-sm mb-4 line-clamp-2 font-normal leading-relaxed">
                        {featuredPost.description}
                      </p>
                    </div>
                    
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-slate-600 text-xs font-semibold">
                        <div className="w-6 h-6 rounded-full bg-slate-900 text-cyan-400 flex items-center justify-center font-bold text-[10px]">
                          {featuredPost.author.charAt(0)}
                        </div>
                        <span>{featuredPost.author}</span>
                      </div>
                      <span className="inline-flex items-center text-blue-600 font-bold text-xs uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                        Read Guide →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </section>
          )}

          {/* Section Divider & Compact Grid Title */}
          <div className="flex items-center justify-between gap-3 mb-6 pb-3 border-b border-slate-200">
            <div className="flex items-center gap-2.5">
              <div className="w-1 h-5 bg-blue-600 rounded-full" />
              <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight uppercase">
                All Published Guides
              </h2>
            </div>
            <span className="text-xs font-semibold text-slate-500">
              {remainingPosts.length + (featuredPost ? 1 : 0)} Articles
            </span>
          </div>

          {/* Compact Articles Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {remainingPosts.map((post) => {
              const category = getPostCategory(post.slug, post.title);
              const readTime = getReadingTime(post.content);
              return (
                <article key={post.slug} className="group flex flex-col">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="flex flex-col h-full bg-white rounded-xl overflow-hidden border border-slate-200/90 shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="aspect-[16/9] relative overflow-hidden bg-slate-900 border-b border-slate-100 flex items-center justify-center">
                      {post.featuredImage ? (
                        <Image
                          src={post.featuredImage}
                          alt={post.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-contain p-2 transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4 text-center">
                          <span className="text-cyan-400 font-bold text-sm tracking-tight">PixPassVisa Guide</span>
                        </div>
                      )}
                      <div className="absolute top-3 left-3 z-10">
                        <span className="bg-slate-950/85 backdrop-blur-md text-white text-[9px] font-bold px-2.5 py-0.5 rounded-md uppercase tracking-wider border border-white/10 shadow-xs">
                          {category}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-4 sm:p-5 flex flex-col flex-grow">
                      <div className="flex items-center gap-2 text-slate-400 text-[11px] font-semibold uppercase tracking-wider mb-2">
                        <time dateTime={post.date}>
                          {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </time>
                        <span className="w-1 h-1 bg-slate-300 rounded-full" />
                        <span className="text-blue-700">{readTime}</span>
                      </div>
                      
                      <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug tracking-tight">
                        {post.title}
                      </h3>
                      
                      <p className="text-slate-600 text-xs mb-4 line-clamp-2 font-normal leading-relaxed">
                        {post.description}
                      </p>
                      
                      <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold">
                        <span className="text-slate-500">By {post.author}</span>
                        <span className="text-blue-600 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                          Read
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </Link>
                </article>
              );
            })}
          </div>

          {/* Compact Photo Tool CTA Banner */}
          <section aria-label="Photo Creation CTA" className="mt-12 sm:mt-16 p-6 sm:p-8 lg:p-10 bg-slate-950 rounded-2xl text-center relative overflow-hidden group border border-blue-500/20 shadow-xl">
            <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/10 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-700" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-600/10 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-700" />

            <div className="relative z-10 max-w-xl mx-auto">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-600/10 text-cyan-400 text-[10px] font-bold uppercase tracking-wider mb-3 border border-blue-500/20">
                <Zap className="w-3 h-3 text-cyan-400" />
                Instant Biometric Tool
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white mb-2 leading-tight tracking-tight">
                Need a Compliant Passport or Visa Photo?
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6 font-normal">
                Upload your selfie. Our AI crops to exact millimeter size, removes background shadows, and guarantees 100% acceptance.
              </p>
              <Link
                href="/passport-photo-online"
                className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-black text-xs sm:text-sm py-3 px-6 sm:px-8 rounded-xl transition-all shadow-lg shadow-blue-500/20/20 group/btn"
              >
                Create My Photo Now
                <svg className="w-4 h-4 ml-1.5 group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </section>

          {/* Compact Directory Links Footer Section */}
          <section aria-label="Official Tools and Resources" className="mt-12 sm:mt-16 pt-12 border-t border-slate-200">
            <div className="text-center max-w-xl mx-auto mb-8">
              <h2 className="text-xl font-black text-slate-900 tracking-tight mb-2">
                Official Photo Tools & Directories
              </h2>
              <p className="text-slate-600 text-xs font-medium">
                Verify compliance or generate ready-to-print photos instantly using our online tools.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link href="/passport-photo-online" className="group bg-white rounded-xl border border-slate-200/90 p-4 hover:border-blue-400 hover:shadow-sm transition-all">
                <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform border border-blue-100">
                  <Camera className="w-5 h-5" />
                </div>
                <span className="text-sm font-bold text-slate-900 group-hover:text-blue-600 block mb-1">Create Photo Online</span>
                <p className="text-[11px] text-slate-500 leading-relaxed">Upload selfie & get 2026 biometric photo</p>
              </Link>

              <Link href="/visa-photo-validator" className="group bg-white rounded-xl border border-slate-200/90 p-4 hover:border-blue-400 hover:shadow-sm transition-all">
                <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform border border-emerald-100">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <span className="text-sm font-bold text-slate-900 group-hover:text-blue-600 block mb-1">Free Photo Validator</span>
                <p className="text-[11px] text-slate-500 leading-relaxed">Check size, head ratio, & background rules</p>
              </Link>

              <Link href="/passport-photos" className="group bg-white rounded-xl border border-slate-200/90 p-4 hover:border-blue-400 hover:shadow-sm transition-all">
                <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform border border-blue-100">
                  <FileCheck className="w-5 h-5" />
                </div>
                <span className="text-sm font-bold text-slate-900 group-hover:text-blue-600 block mb-1">Passport Specs Directory</span>
                <p className="text-[11px] text-slate-500 leading-relaxed">Official photo sizes for 50+ countries</p>
              </Link>

              <Link href="/visa-photo" className="group bg-white rounded-xl border border-slate-200/90 p-4 hover:border-blue-400 hover:shadow-sm transition-all">
                <div className="w-9 h-9 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform border border-teal-100">
                  <Globe className="w-5 h-5" />
                </div>
                <span className="text-sm font-bold text-slate-900 group-hover:text-blue-600 block mb-1">Visa Specs Directory</span>
                <p className="text-[11px] text-slate-500 leading-relaxed">International visa photo specifications</p>
              </Link>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}

