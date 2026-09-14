import React, { useRef, useEffect } from "react";
import { DocumentType } from "../types";
import { CheckIcon } from "./Icons";

interface DocumentSelectorProps {
  selectedDoc: string;
  setSelectedDoc: (id: string) => void;
  handleReset: () => void;
  documentTypes: DocumentType[];
}

const DocumentSelector: React.FC<DocumentSelectorProps> = ({
  selectedDoc,
  setSelectedDoc,
  handleReset,
  documentTypes,
}) => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredDocs = documentTypes.filter(
    (doc) =>
      doc.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.country?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeDoc = documentTypes.find((d) => d.id === selectedDoc);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  return (
    <div className="flex flex-col" ref={containerRef} style={{ position: "relative" }}>
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] mb-2">
       Select Country 
      </p>

      {/* Trigger Button — shows selected document */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-all duration-200 border bg-white ${
          isOpen
            ? "border-blue-400 ring-1 ring-blue-500/20 shadow-sm"
            : "border-slate-200 hover:border-slate-300"
        }`}
      >
        <div className="flex items-center gap-2 min-w-0">
          {activeDoc?.flag && (
            <span className="text-sm leading-none shrink-0">{activeDoc.flag}</span>
          )}
          <span className="text-xs font-bold text-slate-800 truncate">
            {activeDoc?.label || "Select document…"}
          </span>
        </div>
        <svg
          className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          className="absolute left-0 right-0 z-50 mt-1 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden"
          style={{ top: "100%" }}
        >
          {/* Search Input */}
          <div className="p-2 border-b border-slate-100">
            <div className="relative">
              <svg
                className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400"
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                ref={inputRef}
                type="text"
                placeholder="Search country or document type…"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-8 pr-8 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500/30 focus:border-blue-500 transition-all placeholder:text-slate-400"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                >
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Options List */}
          <nav className="flex flex-col overflow-y-auto max-h-64 custom-scrollbar">
            {filteredDocs.length > 0 ? (
              filteredDocs.map((doc) => (
                <button
                  key={doc.id}
                  onClick={() => {
                    setSelectedDoc(doc.id);
                    handleReset();
                    setIsOpen(false);
                    setSearchTerm("");
                  }}
                  className={`relative group w-full flex flex-col px-3 py-2.5 text-left transition-all duration-150 border-b border-slate-50 last:border-b-0 ${
                    selectedDoc === doc.id
                      ? "bg-blue-50/70/60"
                      : "bg-transparent hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {doc.flag && (
                        <span className="text-sm leading-none">{doc.flag}</span>
                      )}
                      <p
                        className={`text-xs font-bold leading-tight ${
                          selectedDoc === doc.id ? "text-slate-900" : "text-slate-600"
                        }`}
                      >
                        {doc.label}
                      </p>
                    </div>
                    {selectedDoc === doc.id && (
                      <CheckIcon className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    )}
                  </div>
                  <p className="text-[10px] text-slate-400 mt-0.5 font-medium ml-6">
                    {doc.size} · {doc.bg_color} bg
                  </p>
                </button>
              ))
            ) : (
              <div className="py-6 px-4 text-center">
                <p className="text-xs text-slate-400 font-medium">No documents found</p>
                <button
                  onClick={() => setSearchTerm("")}
                  className="text-[10px] text-blue-600 font-bold uppercase tracking-wider mt-2 hover:text-blue-700"
                >
                  Clear Search
                </button>
              </div>
            )}
          </nav>
        </div>
      )}
    </div>
  );
};

export default DocumentSelector;
