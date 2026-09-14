"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useTransition } from "react";

export default function AnalyticsPeriodFilter({
  currentPeriod = "all",
}: {
  currentPeriod?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const setPeriod = (period: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (period === "all") params.delete("period");
    else params.set("period", period);

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  const periods = [
    { id: "all", label: "All Time" },
    { id: "30d", label: "Last 30 Days" },
    { id: "7d", label: "Last 7 Days" },
    { id: "today", label: "Today" },
  ];

  return (
    <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200 w-fit">
      {periods.map((p) => {
        const isActive = currentPeriod === p.id;
        return (
          <button
            key={p.id}
            onClick={() => setPeriod(p.id)}
            disabled={isPending}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              isActive
                ? "bg-slate-900 text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
            }`}
          >
            {p.label}
          </button>
        );
      })}
    </div>
  );
}
