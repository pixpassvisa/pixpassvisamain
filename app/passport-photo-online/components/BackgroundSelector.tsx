import React from "react";
import { BgColor } from "../types";

interface BackgroundSelectorProps {
  selectedBg: string;
  setSelectedBg: (id: string) => void;
  bgColors: BgColor[];
}

const BackgroundSelector: React.FC<BackgroundSelectorProps> = ({
  selectedBg,
  setSelectedBg,
  bgColors,
}) => {
  return (
    <div>
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] mb-3">
        Output Background
      </p>
      <div className="grid grid-cols-2 gap-2">
        {bgColors.map((bg) => (
          <button
            key={bg.id}
            onClick={() => setSelectedBg(bg.id)}
            className={`flex flex-col items-center gap-2 p-2 rounded-xl border transition-all ${
              selectedBg === bg.id
                ? "bg-white border-blue-400 shadow-sm ring-1 ring-blue-500/10"
                : "bg-transparent border-slate-200 hover:bg-white"
            }`}
          >
            <div className={`w-6 h-6 rounded-lg border shadow-inner ${bg.swatch}`} />
            <span
              className={`text-[10px] font-bold ${
                selectedBg === bg.id ? "text-slate-900" : "text-slate-500"
              }`}
            >
              {bg.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BackgroundSelector;
