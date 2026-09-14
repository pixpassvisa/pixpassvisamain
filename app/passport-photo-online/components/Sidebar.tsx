import React from "react";
import Link from "next/link";
import { DocumentType, BgColor } from "../types";
import DocumentSelector from "./DocumentSelector";
import BackgroundSelector from "./BackgroundSelector";
import { WarnIcon, ArrowLeftIcon } from "./Icons";

interface SidebarProps {
  selectedDoc: string;
  setSelectedDoc: (id: string | ((prev: string) => string)) => void;
  selectedBg: string;
  setSelectedBg: (id: string | ((prev: string) => string)) => void;
  handleReset: () => void;
  documentTypes: DocumentType[];
  bgColors: BgColor[];
  activeDoc: DocumentType;
  isLocked?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({
  selectedDoc,
  setSelectedDoc,
  selectedBg,
  setSelectedBg,
  handleReset,
  documentTypes,
  bgColors,
  activeDoc,
  isLocked = false,
}) => {
  return (
    <div className="lg:w-64 shrink-0 flex flex-col space-y-6">
      {isLocked ? (
        <div className="bg-white rounded-2xl border border-blue-200 p-4 shadow-sm border-b-4 border-b-blue-600">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Pinned Requirement</span>
            <Link href="/tool" className="text-[10px] font-bold text-slate-400 hover:text-slate-600 underline">Change</Link>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-2xl leading-none">{activeDoc.flag}</span>
            <div className="min-w-0">
               <p className="text-sm font-bold text-slate-900 truncate">{activeDoc.label}</p>
               <p className="text-[10px] text-slate-500 font-medium">{activeDoc.size}</p>
            </div>
          </div>
        </div>
      ) : (
        <DocumentSelector
          selectedDoc={selectedDoc}
          setSelectedDoc={(id) => setSelectedDoc(id)}
          handleReset={handleReset}
          documentTypes={documentTypes}
        />
      )}

      <div className="h-px bg-slate-200" />

      <BackgroundSelector
        selectedBg={selectedBg}
        setSelectedBg={(id) => setSelectedBg(id)}
        bgColors={bgColors}
      />

      {selectedBg !== activeDoc.bg_color && (
        <div className="flex items-start gap-2 text-[10px] text-amber-800 bg-amber-50/80 backdrop-blur-sm border border-amber-200/50 rounded-xl px-3 py-2.5">
          <WarnIcon className="w-4 h-4 shrink-0 mt-px text-amber-500" />
          <span className="leading-relaxed font-medium">
            Standard {activeDoc.label} requirements typically dictate a {bgColors.find(b => b.id === activeDoc.bg_color)?.label.toLowerCase() || activeDoc.bg_color} background.
          </span>
        </div>
      )}

      <div className="hidden lg:block mt-auto">
        <Link
          href="/"
          className="group flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-slate-900 transition-colors"
        >
          <div className="w-6 h-6 flex items-center justify-center rounded-full bg-slate-100 group-hover:bg-blue-100 transition-colors">
            <ArrowLeftIcon className="w-3 h-3" />
          </div>
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
