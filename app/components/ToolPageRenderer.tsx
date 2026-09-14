"use client";

import Link from "next/link";
import TocSidebar from "./TocSidebar";
import FaqAccordion from "./FaqAccordion";
import { ShieldCheck, FileCheck, Globe, HelpCircle } from "lucide-react";

// Dynamic FAQ Extractor: Parses FAQs directly from tool content HTML
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

  // Pattern 1: <h3> or <h4> Question </h3> <p> Answer </p>
  const headingRegex = /<h[34][^>]*>([\s\S]*?)<\/h[34]>\s*<p[^>]*>([\s\S]*?)<\/p>/g;
  let match;
  while ((match = headingRegex.exec(faqHtml)) !== null) {
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

  // Pattern 4: <table> <tr> <td>Question</td> <td>Answer</td> </tr> </table>
  if (faqs.length === 0) {
    const trRegex = /<tr[^>]*>\s*<td[^>]*>([\s\S]*?)<\/td>\s*<td[^>]*>([\s\S]*?)<\/td>\s*<\/tr>/g;
    while ((match = trRegex.exec(faqHtml)) !== null) {
      const q = match[1].replace(/<[^>]*>/g, '').trim();
      const a = match[2].replace(/<[^>]*>/g, '').trim();
      if (q && a && q.toLowerCase() !== 'question') {
        faqs.push({ question: q, answer: a });
      }
    }
  }

  // Clean raw FAQ block out of content to prevent duplicate display
  const cleanContent = content.slice(0, faqStartIndex) + content.slice(faqEndIndex);
  return { faqs, cleanContent };
}

export default function ToolPageRenderer({ html }: { html: string }) {
  if (!html) return null;

  // Extract FAQs directly from content
  const { faqs, cleanContent } = extractFaqsFromContent(html);

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

  // Wrap tables in single clean responsive div wrapper if not already wrapped
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 xl:gap-20 justify-center">
        {/* Desktop TOC Sidebar */}
        {headings.length > 0 && (
          <aside className="hidden lg:block w-72 shrink-0">
            <TocSidebar headings={headings} />
          </aside>
        )}

        {/* Mobile TOC Accordion */}
        {headings.length > 0 && (
          <div className="lg:hidden mb-6 w-full">
            <details className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
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
              className="inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-base sm:text-lg py-3.5 px-8 sm:px-10 rounded-2xl transition-all shadow-xl shadow-blue-600/30 group/btn relative z-10 hover:-translate-y-0.5 active:scale-[0.98]"
            >
              Create & Fix My Photo Now
              <svg className="w-5 h-5 ml-2 group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
            <div className="mt-8 flex items-center justify-center gap-4 text-slate-400 text-xs font-bold opacity-80 flex-wrap">
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
              <Link href="/visa-photo-validator" className="group flex items-center gap-4 p-5 bg-white rounded-2xl border border-slate-200/90 hover:border-blue-400 hover:shadow-md transition-all">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-sm font-bold text-slate-900 group-hover:text-blue-600 block">Free Photo Validator</span>
                  <p className="text-xs text-slate-500 mt-0.5">Instant compliance check for 600x600 size & ratio</p>
                </div>
              </Link>
              <Link href="/passport-photos" className="group flex items-center gap-4 p-5 bg-white rounded-2xl border border-slate-200/90 hover:border-blue-400 hover:shadow-md transition-all">
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                  <FileCheck className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-sm font-bold text-slate-900 group-hover:text-blue-600 block">Passport Photo Specs</span>
                  <p className="text-xs text-slate-500 mt-0.5">Official requirements for 50+ countries</p>
                </div>
              </Link>
              <Link href="/visa-photo" className="group flex items-center gap-4 p-5 bg-white rounded-2xl border border-slate-200/90 hover:border-blue-400 hover:shadow-md transition-all">
                <div className="w-10 h-10 rounded-xl bg-cyan-50 border border-cyan-100 flex items-center justify-center text-cyan-600 shrink-0">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-sm font-bold text-slate-900 group-hover:text-blue-600 block">Visa Photo Directory</span>
                  <p className="text-xs text-slate-500 mt-0.5">International visa photo size guidelines</p>
                </div>
              </Link>
              <Link href="/faq" className="group flex items-center gap-4 p-5 bg-white rounded-2xl border border-slate-200/90 hover:border-blue-400 hover:shadow-md transition-all">
                <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 shrink-0">
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
    </div>
  );
}
