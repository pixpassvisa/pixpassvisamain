"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { Search, X, Calendar, RotateCw } from "lucide-react";

interface OrderFiltersProps {
  documentTypes: { id: string; name: string }[];
  currentStatus?: string;
  currentSearch?: string;
  currentDocType?: string;
  currentDatePreset?: string;
  currentStartDate?: string;
  currentEndDate?: string;
  counts: {
    all: number;
    paid: number;
    pending: number;
    refunded: number;
    disputed: number;
  };
}

export default function OrderFilters({
  documentTypes,
  currentStatus = "all",
  currentSearch = "",
  currentDocType = "all",
  currentDatePreset = "all",
  currentStartDate = "",
  currentEndDate = "",
  counts,
}: OrderFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [search, setSearch] = useState(currentSearch);
  const [startDate, setStartDate] = useState(currentStartDate);
  const [endDate, setEndDate] = useState(currentEndDate);
  const [showCustomDate, setShowCustomDate] = useState(currentDatePreset === "custom");

  const applyFilters = (updates: {
    status?: string;
    q?: string;
    docType?: string;
    datePreset?: string;
    startDate?: string;
    endDate?: string;
  }) => {
    const params = new URLSearchParams(searchParams.toString());

    if (updates.status !== undefined) {
      if (updates.status === "all") params.delete("status");
      else params.set("status", updates.status);
    }

    if (updates.q !== undefined) {
      if (!updates.q.trim()) params.delete("q");
      else params.set("q", updates.q.trim());
    }

    if (updates.docType !== undefined) {
      if (updates.docType === "all") params.delete("docType");
      else params.set("docType", updates.docType);
    }

    if (updates.datePreset !== undefined) {
      if (updates.datePreset === "all") {
        params.delete("datePreset");
        params.delete("startDate");
        params.delete("endDate");
      } else {
        params.set("datePreset", updates.datePreset);
        if (updates.datePreset !== "custom") {
          params.delete("startDate");
          params.delete("endDate");
        }
      }
    }

    if (updates.startDate !== undefined) {
      if (!updates.startDate) params.delete("startDate");
      else params.set("startDate", updates.startDate);
    }

    if (updates.endDate !== undefined) {
      if (!updates.endDate) params.delete("endDate");
      else params.set("endDate", updates.endDate);
    }

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    applyFilters({ q: search });
  };

  const handleCustomDateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    applyFilters({
      datePreset: "custom",
      startDate,
      endDate,
    });
  };

  const handleDatePresetChange = (preset: string) => {
    if (preset === "custom") {
      setShowCustomDate(true);
    } else {
      setShowCustomDate(false);
      setStartDate("");
      setEndDate("");
      applyFilters({ datePreset: preset });
    }
  };

  const handleClear = () => {
    setSearch("");
    setStartDate("");
    setEndDate("");
    setShowCustomDate(false);
    startTransition(() => {
      router.push(pathname);
    });
  };

  const hasActiveFilters =
    currentStatus !== "all" ||
    currentDocType !== "all" ||
    currentDatePreset !== "all" ||
    Boolean(currentSearch) ||
    Boolean(currentStartDate) ||
    Boolean(currentEndDate);

  const statusTabs = [
    { id: "all", label: "All Orders", count: counts.all },
    { id: "paid", label: "Paid", count: counts.paid, color: "text-emerald-700 bg-emerald-50" },
    { id: "pending", label: "Pending", count: counts.pending, color: "text-amber-700 bg-amber-50" },
    { id: "refunded", label: "Refunded", count: counts.refunded, color: "text-purple-700 bg-purple-50" },
    { id: "disputed", label: "Disputed", count: counts.disputed, color: "text-red-700 bg-red-50" },
  ];

  const datePresets = [
    { id: "all", label: "All Time" },
    { id: "today", label: "Today" },
    { id: "yesterday", label: "Yesterday" },
    { id: "7d", label: "Last 7 Days" },
    { id: "30d", label: "Last 30 Days" },
    { id: "custom", label: "Custom Range" },
  ];

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs space-y-3.5">
      {/* Top Row: Search Input + Country Select + Clear */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3">
        <form onSubmit={handleSearchSubmit} className="flex-1 relative flex items-center">
          <span className="absolute left-3.5 text-slate-400">
            <Search className="w-4 h-4 text-slate-400" />
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by customer email, order number (ORD-...), or payment ID (pay_...)"
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-24 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-medium transition-all"
          />
          <button
            type="submit"
            className="absolute right-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
          >
            Search
          </button>
        </form>

        {/* Document Type / Country Filter */}
        <div className="w-full lg:w-64">
          <select
            value={currentDocType}
            onChange={(e) => applyFilters({ docType: e.target.value })}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-medium transition-all cursor-pointer"
          >
            <option value="all">All Documents &amp; Countries</option>
            {documentTypes.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>
        </div>

        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <button
            type="button"
            onClick={handleClear}
            className="px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-xs font-bold transition-colors whitespace-nowrap cursor-pointer flex items-center justify-center gap-1.5"
          >
            <X className="w-3.5 h-3.5 text-slate-500" />
            <span>Reset Filters</span>
          </button>
        )}
      </div>

      {/* Middle Row: Date Range Filter Suite */}
      <div className="pt-2 border-t border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap mr-1 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>Date:</span>
          </span>
          {datePresets.map((p) => {
            const isActive = (currentDatePreset === p.id && !showCustomDate) || (p.id === "custom" && showCustomDate);
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => handleDatePresetChange(p.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1 ${
                  isActive
                    ? "bg-slate-900 text-white shadow-xs"
                    : "bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                {p.id === "custom" && <Calendar className="w-3 h-3 text-slate-400" />}
                <span>{p.label}</span>
              </button>
            );
          })}
        </div>

        {/* Custom Date Picker Inputs if Custom Selected */}
        {showCustomDate && (
          <form onSubmit={handleCustomDateSubmit} className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-xl border border-slate-200">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="bg-white border border-slate-200 rounded-lg px-2 py-1 text-xs text-slate-800 font-medium cursor-pointer focus:outline-none focus:border-blue-500"
              title="Start Date"
            />
            <span className="text-xs text-slate-400">to</span>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="bg-white border border-slate-200 rounded-lg px-2 py-1 text-xs text-slate-800 font-medium cursor-pointer focus:outline-none focus:border-blue-500"
              title="End Date"
            />
            <button
              type="submit"
              className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
            >
              Apply Date
            </button>
          </form>
        )}
      </div>

      {/* Bottom Row: Status Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-2 border-t border-slate-100">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap mr-1">
          Status:
        </span>
        {statusTabs.map((tab) => {
          const isActive = currentStatus === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => applyFilters({ status: tab.id })}
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? "bg-slate-900 text-white shadow-xs"
                  : "bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  isActive ? "bg-slate-800 text-slate-300" : tab.color || "bg-slate-200 text-slate-600"
                }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}

        {isPending && (
          <span className="ml-auto text-[11px] font-medium text-blue-600 flex items-center gap-1.5">
            <RotateCw className="w-3.5 h-3.5 animate-spin text-blue-600" />
            <span>Updating...</span>
          </span>
        )}
      </div>
    </div>
  );
}
