import React from "react";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "light" | "dark";
}

export default function Logo({ className = "", size = "md", variant = "dark" }: LogoProps) {
  const iconSizes = {
    sm: "w-7 h-7",
    md: "w-9 h-9",
    lg: "w-11 h-11",
  };

  const textSizes = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  };

  return (
    <div className={`flex items-center gap-2.5 shrink-0 select-none ${className}`}>
      {/* Biometric Scan Emblem */}
      <div
        className={`${iconSizes[size]} relative rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-cyan-500 p-0.5 shadow-md shadow-blue-600/25 flex items-center justify-center transition-transform duration-200 group-hover:scale-105`}
      >
        <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center p-1.5 overflow-hidden relative">
          {/* Subtle grid background */}
          <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:6px_6px] opacity-20" />
          
          {/* Biometric Passport Frame Icon */}
          <svg
            className="w-full h-full text-cyan-400 relative z-10"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            {/* Outer ID frame with corner guides */}
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 8V6a2 2 0 012-2h2M16 4h2a2 2 0 012 2v2M20 16v2a2 2 0 01-2 2h-2M8 20H6a2 2 0 01-2-2v-2"
            />
            {/* Biometric face silhouette */}
            <circle cx="12" cy="10" r="3" strokeWidth={2} />
            <path
              strokeLinecap="round"
              d="M7.5 18a4.5 4.5 0 019 0"
            />
            {/* AI verification check badge */}
            <circle cx="18" cy="7" r="2.5" fill="#10B981" stroke="#0F172A" strokeWidth="1" />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.8 7l.8.8 1.4-1.4"
              stroke="#ffffff"
              strokeWidth="1.2"
            />
          </svg>
        </div>
      </div>

      {/* Brand Wordmark */}
      <span
        className={`${textSizes[size]} font-black tracking-tight flex items-center ${
          variant === "light" ? "text-white" : "text-slate-900"
        }`}
      >
        <span>PixPass</span>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 font-extrabold ml-0.5">
          Visa
        </span>
      </span>
    </div>
  );
}
