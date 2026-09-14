import React from "react";
import { DocumentType } from "../types";
import { CheckIcon, WarnIcon, CrossIcon } from "./Icons";

interface ValidationReportProps {
  report: any;
  activeDoc: DocumentType;
  selectedDoc: string;
  canCrop: boolean;
  isCropping: boolean;
  cropMsg: string;
  handleCrop: () => void;
  handleReset: () => void;
}

const ValidationReport: React.FC<ValidationReportProps> = ({
  report,
  activeDoc,
  selectedDoc,
  canCrop,
  isCropping,
  cropMsg,
  handleCrop,
  handleReset,
}) => {
  return (
    <div className="animate-scale-in">
      {/* Header */}
      <div
        className={`p-3 rounded-xl flex items-center gap-3 mb-3 border relative overflow-hidden shadow-md ${
          report.overallStatus === "PASS"
            ? "bg-white border-blue-300 shadow-blue-500/20/20"
            : report.overallStatus === "WARN"
            ? "bg-white border-amber-300 shadow-amber-500/20"
            : "bg-white border-red-300 shadow-red-500/20"
        }`}
      >
        {/* Vibrant background accent bar */}
        <div
          className={`absolute left-0 top-0 bottom-0 w-1.5 ${
            report.overallStatus === "PASS" 
              ? "bg-blue-600" 
              : report.overallStatus === "WARN"
              ? "bg-amber-500"
              : "bg-red-500"
          }`}
        />
        {report.overallStatus === "PASS" ? (
          <>
            <div className="w-10 h-10 bg-blue-100/80 text-blue-600 rounded-full flex items-center justify-center shrink-0 shadow-sm border border-blue-200 ml-2">
              <CheckIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900 tracking-tight">
                Photo Compliant
              </h3>
              <p className="text-xs font-semibold text-blue-600 mt-0.5">
                Meets requirements for {activeDoc.label}
              </p>
            </div>
          </>
        ) : (
          <>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-sm border ml-2 ${
              report.overallStatus === "WARN" 
                ? "bg-amber-100/80 text-amber-600 border-amber-200" 
                : "bg-red-100/80 text-red-600 border-red-200"
            }`}>
              {report.overallStatus === "WARN" ? (
                <WarnIcon className="w-5 h-5" />
              ) : (
                <CrossIcon className="w-5 h-5" />
              )}
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900 tracking-tight">
                Action Required
              </h3>
              <p className={`text-xs font-semibold mt-0.5 ${
                report.overallStatus === "WARN" ? "text-amber-600" : "text-red-600"
              }`}>
                {report.overallStatus === "WARN" 
                  ? "Minor adjustments needed for best results." 
                  : "Please review the critical issues below."}
              </p>
            </div>
          </>
        )}
      </div>

      {/* Checks list */}
      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-2 gap-1.5 mb-3">
        {report.checks.map((check: any, idx: number) => (
          <div
            key={idx}
            className={`p-2 rounded-lg border flex items-start gap-2 shadow-sm transition-all hover:shadow-md bg-white ${
              check.status === "PASS"
                ? "border-slate-200"
                : check.status === "WARN"
                ? "border-amber-400 ring-1 ring-amber-400"
                : "border-red-400 ring-1 ring-red-400"
            }`}
          >
            {check.status === "PASS" ? (
              <CheckIcon className="w-5 h-5 text-blue-600 shrink-0 mt-[2px]" />
            ) : check.status === "WARN" ? (
              <WarnIcon className="w-5 h-5 text-amber-500 shrink-0 mt-[2px]" />
            ) : (
              <CrossIcon className="w-5 h-5 text-red-500 shrink-0 mt-[2px]" />
            )}
            <div className="min-w-0">
              <h4 className="text-xs font-bold text-slate-900 truncate">
                {check.name}
              </h4>
              <p
                className={`text-[11px] leading-tight mt-0.5 ${
                  check.status === "PASS"
                    ? "text-gray-500"
                    : check.status === "WARN"
                    ? "text-amber-700"
                    : "text-red-700"
                }`}
              >
                {check.detail}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Crop & Resize Section */}
      <div className="mt-2">
        <div
          className={`bg-white shadow-lg shadow-slate-200/50 p-3 sm:p-4 rounded-xl border ${
            report.overallStatus === "PASS" ? "border-blue-200" : "border-slate-200"
          } relative overflow-hidden flex flex-col md:flex-row items-center gap-4 justify-between`}
        >
          {report.overallStatus === "PASS" && (
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-blue-600"></div>
          )}

          <div className="flex-1 text-center md:text-left min-w-0">
            <h3 className="font-black text-sm md:text-base text-slate-900 mb-0.5">
              Proceed to Crop & Resize
            </h3>
            <p className="text-xs text-gray-500 leading-snug">
              We will crop to exactly {activeDoc.label} metrics and
              replace the background.
              {report.overallStatus !== "PASS" && (
                <span className="block mt-1.5 font-semibold text-amber-600">
                  Note: You are proceeding with a photo that did not pass all checks.
                </span>
              )}
            </p>
          </div>

          {!canCrop ? (
            <div className="flex flex-col items-center md:items-end gap-2 shrink-0">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-amber-100 text-amber-800 text-[10px] font-bold uppercase tracking-wider">
                <WarnIcon className="w-3.5 h-3.5" />
                Needs better face detection
              </span>
            </div>
          ) : (
            <div className="flex flex-col items-center md:items-end gap-2 shrink-0 w-full md:w-auto mt-2 md:mt-0">
              <button
                onClick={handleCrop}
                disabled={isCropping}
                className="w-full md:w-auto px-5 py-3 bg-[#3b5bdb] hover:bg-[#2f4ac7] text-white font-bold tracking-wide rounded-xl shadow-[0_3px_0_0_rgb(47,74,199)] hover:shadow-[0_1px_0_0_rgb(47,74,199)] hover:translate-y-[2px] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none text-sm"
              >
                {isCropping ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-slate-900/30 border-t-slate-900 rounded-full animate-spin" />
                    {cropMsg || "Processing..."}
                  </span>
                ) : (
                  "Crop & Finalize Photo"
                )}
              </button>
              <button
                onClick={handleReset}
                className="text-[11px] font-medium text-slate-400 hover:text-slate-600 underline mt-1"
              >
                Upload a different photo
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ValidationReport;
