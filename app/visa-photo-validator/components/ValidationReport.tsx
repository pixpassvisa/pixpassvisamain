"use client";

import React, { useRef } from "react";
import { motion, AnimatePresence, useInView, Variants } from "framer-motion";
import { ValidationReport, ValidationMetric } from "@/lib/validation-engine";

// ─── Types ─────────────────────────────────────────────────────────────────────

interface Props {
  report: ValidationReport;
  onReset: () => void;
  selectedDocId?: string;
  selectedDocPrice?: number;
}

import PriceDisplay from "@/app/components/PriceDisplay";

// ─── Animation Variants ────────────────────────────────────────────────────────

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.45, 
      ease: [0.22, 1, 0.36, 1] 
    } 
  },
};

// ─── Animated Score Ring ───────────────────────────────────────────────────────

function ScoreRing({ score, pass }: { score: number; pass: boolean }) {
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / 100) * circumference;

  const ringColor = score >= 90 ? "#10b981" : score >= 75 ? "#f59e0b" : "#ef4444";
  const textColor = score >= 90 ? "text-emerald-600" : score >= 75 ? "text-amber-600" : "text-red-600";
  const bgColor = score >= 90 ? "bg-emerald-50" : score >= 75 ? "bg-amber-50" : "bg-red-50";

  return (
    <div className="flex flex-col items-center gap-3">
      <div className={`relative w-28 h-28 rounded-full flex items-center justify-center ${bgColor}`}>
        {/* SVG ring */}
        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
          {/* Track */}
          <circle cx="50" cy="50" r={radius} fill="none" stroke="#e2e8f0" strokeWidth="6" />
          {/* Animated fill */}
          <motion.circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke={ringColor}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: circumference - progress }}
            transition={{ duration: 1.2, ease: [0.34, 1.4, 0.64, 1], delay: 0.3 }}
          />
        </svg>
        {/* Score text */}
        <div className="relative z-10 text-center">
          <motion.span
            className={`block text-3xl font-black leading-none ${textColor}`}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {score}
          </motion.span>
          <span className={`text-[9px] font-bold uppercase tracking-wider ${textColor} opacity-70`}>Score</span>
        </div>
      </div>

      {/* Quality label */}
      <span className={`text-xs font-bold ${textColor}`}>
        {score >= 90 ? "Excellent Quality" : score >= 75 ? "Acceptable Quality" : "Requirements Failed"}
      </span>
    </div>
  );
}

// ─── Metric Card ───────────────────────────────────────────────────────────────

function MetricCard({ metric }: { metric: ValidationMetric }) {
  const statusConfig: Record<string, any> = {
    success: {
      bg: "bg-emerald-50",
      border: "border-emerald-100",
      icon: "text-emerald-600",
      iconBg: "bg-emerald-100",
      text: "text-emerald-700",
      dot: "bg-emerald-400",
      badge: "bg-emerald-100 text-emerald-700",
      label: "Pass",
    },
    warning: {
      bg: "bg-amber-50",
      border: "border-amber-100",
      icon: "text-amber-600",
      iconBg: "bg-amber-100",
      text: "text-amber-700",
      dot: "bg-amber-400",
      badge: "bg-amber-100 text-amber-700",
      label: "Warning",
    },
    fail: {
      bg: "bg-red-50",
      border: "border-red-100",
      icon: "text-red-600",
      iconBg: "bg-red-100",
      text: "text-red-700",
      dot: "bg-red-400",
      badge: "bg-red-100 text-red-700",
      label: "Fail",
    },
    error: {
      bg: "bg-red-50",
      border: "border-red-100",
      icon: "text-red-600",
      iconBg: "bg-red-100",
      text: "text-red-700",
      dot: "bg-red-400",
      badge: "bg-red-100 text-red-700",
      label: "Error",
    },
  };

  const normalizedStatus = metric.status?.toLowerCase() || "warning";
  const cfg = statusConfig[normalizedStatus] || statusConfig.warning;

  const StatusIcon = () => {
    if (normalizedStatus === "success")
      return (
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      );
    if (normalizedStatus === "warning")
      return (
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      );
    return (
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    );
  };

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      className={`rounded-xl p-4 border ${cfg.bg} ${cfg.border} transition-shadow hover:shadow-md`}
    >
      <div className="flex items-start justify-between mb-3">
        <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.15em] leading-tight max-w-[80%]">
          {metric.label}
        </span>
        <div className={`w-5 h-5 rounded-full flex items-center justify-center ${cfg.iconBg} ${cfg.icon} shrink-0`}>
          <StatusIcon />
        </div>
      </div>
      <div className="space-y-1">
        <p className={`text-sm font-black ${cfg.text} leading-snug`}>{metric.value}</p>
        {metric.details && (
          <p className="text-[11px] text-slate-500 font-medium leading-tight mt-1">
            {metric.details}
          </p>
        )}
        {metric.target && (
          <p className="text-[10px] text-slate-400 font-semibold mt-1">
            Target: <span className="text-slate-500">{metric.target}</span>
          </p>
        )}
      </div>
    </motion.div>
  );
}

// ─── Summary List ──────────────────────────────────────────────────────────────

function SummaryList({ items, title, dark = false }: { items: string[]; title: string; dark?: boolean }) {
  const icon = dark ? (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ) : (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );

  return (
    <motion.div
      variants={itemVariants}
      className={`rounded-xl p-6 ${dark ? "bg-slate-900 shadow-xl" : "bg-white border border-slate-100 shadow-lg shadow-slate-200/40"}`}
    >
      <h3 className={`text-sm font-black mb-4 flex items-center gap-2 ${dark ? "text-white" : "text-slate-900"}`}>
        <span
          className={`w-6 h-6 rounded flex items-center justify-center ${
            dark ? "bg-amber-400/20 text-amber-400" : "bg-emerald-50 text-emerald-600"
          }`}
        >
          {icon}
        </span>
        {title}
      </h3>

      {items.length === 0 ? (
        <p className={`text-xs italic ${dark ? "text-slate-500" : "text-slate-400"}`}>
          No items to show.
        </p>
      ) : (
        <ul className="space-y-2.5">
          {items.map((item, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06, duration: 0.35 }}
              className={`flex items-start gap-2.5 text-xs leading-relaxed font-medium ${
                dark ? "text-slate-300" : "text-slate-600"
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full shrink-0 mt-1.5 ${dark ? "bg-amber-400" : "bg-emerald-400"}`}
              />
              {item}
            </motion.li>
          ))}
        </ul>
      )}
    </motion.div>
  );
}

// ─── Main Report Component ─────────────────────────────────────────────────────

export default function ValidationReportView({ report, onReset, selectedDocId, selectedDocPrice }: Props) {
  const { overall_result, compliance_score, summary, suggestions, metrics } = report;
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const isPass = overall_result === "PASS";
  const metricEntries = Object.entries(metrics).filter(([, m]) => m != null) as [string, ValidationMetric][];

  // Group metrics for visual hierarchy
  const failedMetrics = metricEntries.filter(([, m]) => {
    const s = m.status?.toLowerCase();
    return s === "fail" || s === "error";
  });
  const warningMetrics = metricEntries.filter(([, m]) => m.status?.toLowerCase() === "warning");
  const successMetrics = metricEntries.filter(([, m]) => m.status?.toLowerCase() === "success");
  const orderedMetrics: [string, ValidationMetric][] = [...failedMetrics, ...warningMetrics, ...successMetrics];

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="space-y-5"
      aria-label="Validation report"
    >
      {/* ── Header Card ──────────────────────────────────────────── */}
      <motion.div
        variants={itemVariants}
        className="bg-white rounded-xl p-6 sm:p-8 border border-slate-100 shadow-xl shadow-slate-200/40"
      >
        <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8 justify-between">
          {/* Pass / Fail badge */}
          <div className="flex flex-col items-center sm:items-start gap-3">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.18em]">Compliance Result</p>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2, type: "spring", stiffness: 250 }}
              className={`flex items-center gap-2.5 px-5 py-2.5 rounded-full font-black text-sm tracking-widest uppercase ${
                isPass
                  ? "bg-emerald-500 text-white shadow-lg shadow-emerald-200"
                  : "bg-red-500 text-white shadow-lg shadow-red-200"
              }`}
            >
              {isPass ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              )}
              {overall_result}
            </motion.div>

            {/* Counts summary */}
            <div className="flex items-center gap-3 flex-wrap">
              {failedMetrics.length > 0 && (
                <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-red-600 bg-red-50 px-2.5 py-1 rounded-full border border-red-100">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                  {failedMetrics.length} Failed
                </span>
              )}
              {warningMetrics.length > 0 && (
                <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-100">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  {warningMetrics.length} Warnings
                </span>
              )}
              {successMetrics.length > 0 && (
                <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  {successMetrics.length} Passed
                </span>
              )}
            </div>
          </div>

          {/* Score ring */}
          <ScoreRing score={compliance_score} pass={isPass} />
        </div>

        {overall_result === "FAIL" && (
          <div className="mt-6 border-t border-slate-100 pt-6">
            <button
              onClick={() => {
                const url = selectedDocId ? `/passport-photo-online?type=${selectedDocId}` : '/passport-photo-online';
                window.location.href = url;
              }}
              className="w-full h-14 rounded-xl bg-blue-600 text-white font-bold text-sm uppercase tracking-widest hover:bg-blue-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 shadow-lg shadow-blue-500/20/30"
            >
              Create your ID photo
            </button>
          </div>
        )}
      </motion.div>

      {/* ── Metric Cards Grid ─────────────────────────────────────── */}
      {orderedMetrics.length > 0 && (
        <motion.div variants={itemVariants}>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.18em] mb-3 px-1">
            Metric Breakdown
          </p>
          <div className="grid grid-cols-2 gap-3">
            {orderedMetrics.map(([key, metric]) => (
              <MetricCard key={key} metric={metric} />
            ))}
          </div>
        </motion.div>
      )}

      {/* ── Summary & Suggestions ─────────────────────────────────── */}
      <div className="grid sm:grid-cols-2 gap-4">
        <SummaryList items={summary} title="Compliance Summary" />
        <SummaryList items={suggestions} title="Improvement Actions" dark />
      </div>

      {/* ── Action Footer ─────────────────────────────────────────── */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col sm:flex-row gap-4 pt-2"
      >
        <button
          onClick={onReset}
          className="w-full sm:flex-1 h-14 rounded-xl bg-blue-600 text-white font-bold text-sm uppercase tracking-widest hover:bg-blue-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 shadow-lg shadow-blue-500/30"
          aria-label="Validate another photo"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="1 4 1 10 7 10" /><path d="M3.51 15a9 9 0 102.13-9.36L1 10" />
          </svg>
          Validate Another
        </button>
      </motion.div>
      <motion.p
        variants={itemVariants}
        className="text-[10px] text-slate-400 font-medium text-center leading-relaxed px-2"
      >
        This  analysis is for guidance only. Always verify requirements on your target country's official embassy website before submitting your application.
      </motion.p>
    </motion.div>
  );
}