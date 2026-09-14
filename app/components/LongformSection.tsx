"use client";

import { useEffect, useRef, useState } from "react";

interface TocItem {
    id: string;
    text: string;
    level?: "h2" | "h3";
}

interface LongformBlock {
    type: "h2" | "h3" | "h4" | "p" | "ul";
    text?: string;
    items?: string[];
}

interface LongformSectionProps {
    tableOfContents: TocItem[];
    processedCustomContent?: string | null;
    longformContent?: LongformBlock[];
    countryName: string;
    docName: string;
}

export default function LongformSection({
    tableOfContents,
    processedCustomContent,
    longformContent = [],
    countryName,
    docName,
}: LongformSectionProps) {
    const [activeId, setActiveId] = useState<string>("");
    const [readProgress, setReadProgress] = useState(0);
    const articleRef = useRef<HTMLElement>(null);

    // Reading progress tracker
    useEffect(() => {
        const handleScroll = () => {
            const article = articleRef.current;
            if (!article) return;
            const { top, height } = article.getBoundingClientRect();
            const windowH = window.innerHeight;
            const progress = Math.min(
                100,
                Math.max(0, ((windowH - top) / (height + windowH)) * 100)
            );
            setReadProgress(progress);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Active TOC item via IntersectionObserver
    useEffect(() => {
        if (!tableOfContents.length) return;
        const ids = tableOfContents.map((t) => t.id);
        const observers: IntersectionObserver[] = [];

        ids.forEach((id) => {
            const el = document.getElementById(id);
            if (!el) return;
            const obs = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) setActiveId(id);
                },
                { rootMargin: "-30% 0px -60% 0px" }
            );
            obs.observe(el);
            observers.push(obs);
        });

        return () => observers.forEach((o) => o.disconnect());
    }, [tableOfContents]);

    return (
        <section className="relative bg-white py-20 overflow-hidden">
            {/* Reading progress bar */}
            <div
                className="fixed top-0 left-0 z-50 h-[3px] bg-gradient-to-r from-indigo-500 via-violet-500 to-indigo-400 transition-all duration-150 shadow-[0_0_8px_rgba(99,102,241,0.6)]"
                style={{ width: `${readProgress}%` }}
            />

            {/* Subtle background grid */}
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.025]"
                style={{
                    backgroundImage:
                        "linear-gradient(#6366f1 1px, transparent 1px), linear-gradient(90deg, #6366f1 1px, transparent 1px)",
                    backgroundSize: "60px 60px",
                }}
            />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               

                <div className="lg:grid lg:grid-cols-[260px_1fr] lg:gap-14 items-start">
                    {/* ── Sidebar TOC ───────────────────────── */}
                    <aside className="hidden lg:block">
                        <div className="sticky top-24">
                            {/* Card */}
                            <div className="rounded-2xl border border-slate-100 bg-slate-50/80 backdrop-blur-sm overflow-hidden shadow-sm">
                                <div className="px-6 py-4 border-b border-slate-100 bg-white">
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                                        In this guide
                                    </p>
                                </div>
                                <nav className="px-4 py-4 space-y-0.5">
                                    {tableOfContents.map((item, i) => {
                                        const isActive = activeId === item.id;
                                        return (
                                            <a
                                                key={item.id}
                                                href={`#${item.id}`}
                                                className={`
                          group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200
                          ${isActive
                                                        ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/30"
                                                        : "text-slate-500 hover:text-slate-900 hover:bg-white hover:shadow-sm"
                                                    }
                        `}
                                            >
                                                <span
                                                    className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black
                            ${isActive ? "bg-white/20 text-white" : "bg-slate-200 text-slate-500 group-hover:bg-indigo-100 group-hover:text-indigo-600"}
                          `}
                                                >
                                                    {i + 1}
                                                </span>
                                                <span className="leading-tight">{item.text}</span>
                                            </a>
                                        );
                                    })}
                                </nav>

                                {/* Progress pill */}
                                <div className="px-6 py-4 border-t border-slate-100 bg-white">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                                            Reading progress
                                        </span>
                                        <span className="text-[10px] font-black text-indigo-600">
                                            {Math.round(readProgress)}%
                                        </span>
                                    </div>
                                    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full transition-all duration-300"
                                            style={{ width: `${readProgress}%` }}
                                        />
                                    </div>
                                </div>
                            </div>


                        </div>
                    </aside>

                    {/* ── Main Article ─────────────────────── */}
                    <article ref={articleRef} className="min-w-0">
                        {processedCustomContent ? (
                            <div
                                className="longform-prose"
                                dangerouslySetInnerHTML={{ __html: processedCustomContent }}
                            />
                        ) : (
                            <div className="longform-prose">
                                {longformContent.map((block, i) => {
                                    if (block.type === "h2") {
                                        const toc = tableOfContents.find((t) => t.text === block.text);
                                        return (
                                            <h2 key={i} id={toc?.id} className="scroll-mt-24">
                                                {block.text}
                                            </h2>
                                        );
                                    }
                                    if (block.type === "h3") return <h3 key={i}>{block.text}</h3>;
                                    if (block.type === "h4") return <h4 key={i}>{block.text}</h4>;
                                    if (block.type === "p") return <p key={i}>{block.text}</p>;
                                    if (block.type === "ul")
                                        return (
                                            <ul key={i}>
                                                {block.items?.map((li, j) => (
                                                    <li key={j}>{li}</li>
                                                ))}
                                            </ul>
                                        );
                                    return null;
                                })}
                            </div>
                        )}
                    </article>
                </div>
            </div>

            {/* Prose styles scoped to this section */}
            <style>{`
        /* ── Base prose ──────────────────────────────── */
        .longform-prose {
          color: #475569;
          font-size: 1.0625rem;
          line-height: 1.8;
          font-family: 'Georgia', 'Cambria', serif;
        }

        /* ── Headings ──────────────────────────────── */
        .longform-prose h2 {
          font-family: system-ui, -apple-system, sans-serif;
          font-size: 1.75rem;
          font-weight: 800;
          color: #0f172a;
          margin-top: 3.5rem;
          margin-bottom: 1.25rem;
          line-height: 1.25;
          letter-spacing: -0.02em;
          padding-bottom: 0.75rem;
          border-bottom: 2px solid #e2e8f0;
          scroll-margin-top: 6rem;
        }
        .longform-prose h2:first-child {
          margin-top: 0;
        }

        .longform-prose h3 {
          font-family: system-ui, -apple-system, sans-serif;
          font-size: 1.25rem;
          font-weight: 700;
          color: #1e293b;
          margin-top: 2.5rem;
          margin-bottom: 0.75rem;
          letter-spacing: -0.015em;
        }
        .longform-prose h4 {
          font-family: system-ui, -apple-system, sans-serif;
          font-size: 1rem;
          font-weight: 700;
          color: #1e293b;
          margin-top: 2rem;
          margin-bottom: 0.5rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          font-size: 0.75rem;
        }

        /* ── Paragraphs ──────────────────────────────── */
        .longform-prose p {
          margin-bottom: 1.5rem;
          color: #475569;
        }

        /* ── Strong ──────────────────────────────── */
        .longform-prose strong {
          color: #1e293b;
          font-weight: 700;
          font-family: system-ui, -apple-system, sans-serif;
        }

        /* ── Lists ──────────────────────────────── */
        .longform-prose ul {
          list-style: none;
          padding: 0;
          margin: 0 0 2rem 0;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .longform-prose ul li {
          display: flex;
          align-items: flex-start;
          gap: 0.875rem;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 1rem;
          padding: 0.875rem 1rem;
          font-size: 0.9375rem;
          line-height: 1.6;
          color: #475569;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .longform-prose ul li:hover {
          border-color: #c7d2fe;
          box-shadow: 0 2px 12px rgba(99, 102, 241, 0.08);
        }
        .longform-prose ul li::before {
          content: "✓";
          flex-shrink: 0;
          width: 1.25rem;
          height: 1.25rem;
          border-radius: 50%;
          background: #eef2ff;
          color: #6366f1;
          font-size: 0.65rem;
          font-weight: 900;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 0.1rem;
        }

        /* ── Inline spec grid cards (dark) ──────────── */
        .longform-prose .my-8.bg-slate-900 {
          border-radius: 1.5rem;
          margin: 2.5rem 0;
          box-shadow: 0 20px 60px rgba(15, 23, 42, 0.25);
        }

        /* ── Callout box ──────────────────────────── */
        .longform-prose .my-10.border-2 {
          border-radius: 1.5rem;
          border-color: #e0e7ff !important;
          background: linear-gradient(135deg, #f8f9ff 0%, #f0f4ff 100%) !important;
          margin: 2.5rem 0;
          position: relative;
          overflow: hidden;
        }
        .longform-prose .my-10.border-2::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 4px;
          height: 100%;
          background: linear-gradient(to bottom, #6366f1, #818cf8);
          border-radius: 4px 0 0 4px;
        }
        .longform-prose .my-10.border-2 h4 {
          color: #4338ca !important;
          font-size: 0.7rem !important;
        }
        .longform-prose .my-10.border-2 p {
          color: #4b5563 !important;
          margin-bottom: 0 !important;
          font-size: 0.9375rem;
        }

        /* ── Tables ──────────────────────────────── */
        .longform-prose .overflow-x-auto {
          margin: 2rem 0;
          border-radius: 1.25rem;
          border: 1px solid #e2e8f0;
          box-shadow: 0 4px 20px -2px rgba(15, 23, 42, 0.04);
          overflow: hidden;
          background: #ffffff;
        }
        .longform-prose table {
          width: 100%;
          border-collapse: collapse;
          margin: 1.5rem 0;
          font-family: system-ui, -apple-system, sans-serif;
          font-size: 0.9375rem;
          background: #ffffff;
        }
        .longform-prose .overflow-x-auto table {
          margin: 0;
          border: none;
          box-shadow: none;
        }
        .longform-prose thead {
          background: #f8fafc;
          border-bottom: 1px solid #e2e8f0;
        }
        .longform-prose th {
          padding: 1rem 1.25rem;
          font-weight: 700;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #0f172a;
          text-align: left;
        }
        .longform-prose td {
          padding: 1rem 1.25rem;
          color: #334155;
          border-bottom: 1px solid #f1f5f9;
          line-height: 1.6;
        }
        .longform-prose tr:last-child td {
          border-bottom: none;
        }
        .longform-prose tbody tr {
          transition: background-color 0.15s ease;
        }
        .longform-prose tbody tr:hover td {
          background-color: #f8fafc;
        }
      `}</style>
        </section>
    );
}