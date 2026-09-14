"use client";

import { useState, useEffect } from "react";

export default function LiveActivityChip() {
  const [count, setCount] = useState(85432);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const storedCount = localStorage.getItem("globalLiveCount");
    if (storedCount) {
      setCount(parseInt(storedCount, 10));
    }

    const updateCounter = () => {
      setCount((prev) => {
        const next = prev + Math.floor(Math.random() * 3) + 1;
        localStorage.setItem("globalLiveCount", next.toString());
        return next;
      });
      const nextInterval = Math.floor(Math.random() * 4000) + 2000;
      setTimeout(updateCounter, nextInterval);
    };

    const initialTimeout = setTimeout(updateCounter, 2000);
    return () => clearTimeout(initialTimeout);
  }, []);

  if (!isClient) {
    return (
      <div className="bg-slate-900 text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-center py-2 md:py-1.5 gap-2 md:gap-6 text-[10px] sm:text-xs font-medium">
            <div className="flex items-center gap-2 shrink-0 opacity-0">
              <span className="relative flex h-2 w-2"></span>
              <span className="font-bold uppercase tracking-wider text-[11px] sm:text-xs">
                Live: 12,000+ photos processed
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-center py-2 md:py-1.5 gap-2 md:gap-6 text-[10px] sm:text-xs font-medium">
          {/* Live Activity Section */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
            </span>
            <span className="font-bold uppercase tracking-wider text-[11px] sm:text-xs text-slate-300">
              Live: <span className="text-cyan-400 font-extrabold tabular-nums">{count.toLocaleString()}</span> photos processed
            </span>
          </div>

          {/* Divider (Desktop only) */}
        
        </div>
      </div>
    </div>
  );
}
