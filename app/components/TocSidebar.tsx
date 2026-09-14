"use client";

import { useEffect, useState } from "react";

interface TOCPageHeading {
  id: string;
  text: string;
  level: number;
}

export default function TocSidebar({ headings }: { headings: TOCPageHeading[] }) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-10% 0% -80% 0%" }
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100, // Offset for sticky headers
        behavior: "smooth",
      });
    }
  };

  if (!headings.length) return null;

  return (
    <div className="sticky top-24 lg:top-28 space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-4 sm:mb-6">
          <div className="w-1 h-5 sm:h-6 bg-blue-600 rounded-full" />
          <h4 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-widest">
            On This Page
          </h4>
        </div>
        <nav className="space-y-0.5 sm:space-y-1">
          {headings.map((heading) => (
            <a
              key={heading.id}
              href={`#${heading.id}`}
              onClick={(e) => handleClick(e, heading.id)}
              className={`block py-1.5 px-2.5 rounded-lg transition-all border-l-2 ${
                activeId === heading.id
                  ? "text-blue-700 bg-blue-50/70 border-blue-600 font-bold"
                  : "text-slate-500 border-transparent hover:text-slate-900 hover:bg-slate-50"
              } ${
                heading.level === 4
                  ? "ml-6 text-[11px] sm:text-xs"
                  : heading.level === 3
                  ? "ml-3 text-xs sm:text-sm font-medium"
                  : "text-xs sm:text-sm font-semibold"
              }`}
            >
              {heading.text}
            </a>
          ))}
        </nav>
      </div>

      <div className="p-4 sm:p-5 lg:p-6 bg-slate-950 rounded-2xl sm:rounded-3xl text-white shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 lg:w-32 lg:h-32 bg-blue-600/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
        <h4 className="font-bold text-base sm:text-lg lg:text-xl mb-2 sm:mb-3 relative z-10">Create passport Size photo </h4>
        <p className="text-slate-400 text-xs sm:text-sm mb-4 sm:mb-6 leading-relaxed relative z-10 font-medium">
          Fix hair edges, remove background shadows, and validate 600x600 size instantly.
        </p>
        <a
          href="/passport-photo-online"
          className="relative z-10 flex items-center justify-center w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-2.5 sm:py-3 lg:py-3.5 rounded-xl sm:rounded-2xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg shadow-blue-600/30 text-xs sm:text-sm hover:-translate-y-0.5 active:scale-[0.98]"
        >
          Make Photo Now →
        </a>
      </div>
    </div>
  );
}
