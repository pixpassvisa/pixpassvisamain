import Link from "next/link";

export default function ExpertEditChip() {
  return (
    <div className="flex justify-center w-full my-4">
      <Link href="/expert-edit">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 border border-amber-200 shadow-sm hover:shadow-md hover:bg-amber-100 transition-all cursor-pointer group">
          <div className="w-6 h-6 rounded-full bg-amber-100/80 text-amber-600 flex items-center justify-center shrink-0 border border-amber-200 group-hover:bg-amber-200">
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </div>
          <span className="text-xs font-bold text-amber-800">
            Need Help? 
          </span>
          <svg className="w-3.5 h-3.5 text-amber-600 ml-1 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
          </svg>
        </div>
      </Link>
    </div>
  );
}
