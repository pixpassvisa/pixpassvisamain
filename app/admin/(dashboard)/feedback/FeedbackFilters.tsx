"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { Search, X, RotateCw } from "lucide-react";

interface FeedbackFiltersProps {
  currentSearch?: string;
  currentFilter?: string;
  counts: {
    all: number;
    withEmail: number;
    withPhoto: number;
  };
}

export default function FeedbackFilters({
  currentSearch = "",
  currentFilter = "all",
  counts,
}: FeedbackFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [search, setSearch] = useState(currentSearch);

  const applyFilters = (updates: { q?: string; filter?: string }) => {
    const params = new URLSearchParams(searchParams.toString());

    if (updates.filter !== undefined) {
      if (!updates.filter || updates.filter === "all") params.delete("filter");
      else params.set("filter", updates.filter);
    }

    if (updates.q !== undefined) {
      if (!updates.q.trim()) params.delete("q");
      else params.set("q", updates.q.trim());
    }

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    applyFilters({ q: search });
  };

  const handleClear = () => {
    setSearch("");
    startTransition(() => {
      router.push(pathname);
    });
  };

  const hasActiveFilters = Boolean(currentSearch) || currentFilter !== "all";

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs space-y-4">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <form onSubmit={handleSearchSubmit} className="flex-1 relative flex items-center">
          <span className="absolute left-3.5 text-slate-400">
            <Search className="w-4 h-4 text-slate-400" />
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search feedback by customer email or message keyword..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-24 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-medium transition-all"
          />
          <button
            type="submit"
            className="absolute right-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
          >
            Search
          </button>
        </form>

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

      <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 border-t border-slate-100">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap mr-1">
          Filter:
        </span>
        <button
          type="button"
          onClick={() => applyFilters({ filter: "all" })}
          className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
            currentFilter === "all"
              ? "bg-slate-900 text-white shadow-xs"
              : "bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
          }`}
        >
          <span>All Feedback</span>
          <span
            className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
              currentFilter === "all" ? "bg-slate-800 text-slate-300" : "bg-slate-200 text-slate-600"
            }`}
          >
            {counts.all}
          </span>
        </button>

        <button
          type="button"
          onClick={() => applyFilters({ filter: "email" })}
          className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
            currentFilter === "email"
              ? "bg-slate-900 text-white shadow-xs"
              : "bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
          }`}
        >
          <span>With Email</span>
          <span
            className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
              currentFilter === "email" ? "bg-slate-800 text-slate-300" : "bg-slate-200 text-slate-600"
            }`}
          >
            {counts.withEmail}
          </span>
        </button>

        <button
          type="button"
          onClick={() => applyFilters({ filter: "photo" })}
          className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
            currentFilter === "photo"
              ? "bg-slate-900 text-white shadow-xs"
              : "bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
          }`}
        >
          <span>Linked to Photo ID</span>
          <span
            className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
              currentFilter === "photo" ? "bg-slate-800 text-slate-300" : "bg-slate-200 text-slate-600"
            }`}
          >
            {counts.withPhoto}
          </span>
        </button>

        {isPending && (
          <span className="ml-auto text-[11px] font-medium text-blue-600 flex items-center gap-1.5">
            <RotateCw className="w-3.5 h-3.5 animate-spin text-blue-600" />
            <span>Filtering...</span>
          </span>
        )}
      </div>
    </div>
  );
}
