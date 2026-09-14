"use client";

import { useState, useEffect } from "react";

export default function LiveCounter() {
  const [count, setCount] = useState(85432);

  useEffect(() => {
    const updateCounter = () => {
      // Randomly increase by 1 to 3
      setCount((prev) => prev + Math.floor(Math.random() * 3) + 1);

      // Schedule next update between 2 to 6 seconds
      const nextInterval = Math.floor(Math.random() * 4000) + 2000;
      setTimeout(updateCounter, nextInterval);
    };

    const initialTimeout = setTimeout(updateCounter, 2000);

    return () => clearTimeout(initialTimeout);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white/80 backdrop-blur-sm shadow-xl rounded-3xl border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="flex items-center gap-2 text-sm font-semibold text-emerald-600 mb-3 uppercase tracking-wider">
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
        </span>
        Live Activity Update
      </div>
      <div
        className="text-5xl md:text-6xl font-black text-gray-900 tracking-tighter tabular-nums"
        style={{ fontVariantNumeric: "tabular-nums" }}
      >
        {count.toLocaleString()}
      </div>
      <div className="text-gray-500 font-medium mt-2 text-lg">
        Successfully Edited Photos
      </div>
    </div>
  );
}
