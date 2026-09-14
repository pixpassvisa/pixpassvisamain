import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import dbConnect from "@/lib/mongodb";
import Feedback from "@/models/Feedback";
import Link from "next/link";
import FeedbackFilters from "./FeedbackFilters";
import { MessageSquare, ExternalLink } from "lucide-react";

export const dynamic = "force-dynamic";

interface Props {
  searchParams: Promise<{ q?: string; filter?: string }>;
}

export default async function FeedbackPage(props: Props) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin/login");

  const searchParams = await props.searchParams;
  const filterSearch = (searchParams?.q || "").trim().toLowerCase();
  const filterType = (searchParams?.filter || "all").toLowerCase();

  await dbConnect();

  // Parse all feedbacks
  const allFeedbacks = await Feedback.find().sort({ createdAt: -1 }).lean();

  const counts = {
    all: allFeedbacks.length,
    withEmail: allFeedbacks.filter((f: any) => Boolean(f.userEmail)).length,
    withPhoto: allFeedbacks.filter((f: any) => Boolean(f.photoId)).length,
  };

  const filteredFeedbacks = allFeedbacks.filter((fb: any) => {
    if (filterType === "email" && !fb.userEmail) return false;
    if (filterType === "photo" && !fb.photoId) return false;

    if (filterSearch) {
      const email = (fb.userEmail || "").toLowerCase();
      const message = (fb.message || "").toLowerCase();
      const photoId = (fb.photoId || "").toLowerCase();

      return (
        email.includes(filterSearch) ||
        message.includes(filterSearch) ||
        photoId.includes(filterSearch)
      );
    }

    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1.5">
            <div className="w-10 h-10 rounded-2xl bg-blue-600/10 border border-blue-500/30 flex items-center justify-center text-blue-600 shadow-xs">
              <MessageSquare className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Customer Reviews &amp; Feedback
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Direct testimonials, user experience reports, and checkout feedback
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl px-4 py-2 text-center shadow-xs">
          <div className="text-[10px] uppercase font-bold text-slate-400">Total Submissions</div>
          <div className="text-base font-black text-slate-900">{allFeedbacks.length}</div>
        </div>
      </header>

      {/* Filter Bar */}
      <FeedbackFilters
        currentSearch={filterSearch}
        currentFilter={filterType}
        counts={counts}
      />

      {/* Feedbacks Grid */}
      {filteredFeedbacks.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-3xl p-16 text-center text-slate-400 shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-3 text-slate-400">
            <MessageSquare className="w-6 h-6 text-slate-400" />
          </div>
          <div className="font-bold text-slate-700">No feedback submissions found</div>
          <p className="text-xs text-slate-400 mt-1">Try changing your search query or reset filters.</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredFeedbacks.map((fb: any) => {
            const initial = fb.userEmail ? fb.userEmail[0].toUpperCase() : "G";

            return (
              <div
                key={fb._id.toString()}
                className="bg-white p-5 rounded-3xl shadow-xs border border-slate-200/90 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-3 gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 font-black text-xs flex items-center justify-center border border-blue-200">
                        {initial}
                      </div>
                      <div className="overflow-hidden">
                        <span className="text-xs font-bold text-slate-800 truncate block max-w-[150px]" title={fb.userEmail || "Anonymous User"}>
                          {fb.userEmail || "Anonymous User"}
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] font-semibold text-slate-400 whitespace-nowrap bg-slate-100 px-2 py-0.5 rounded-full">
                      {new Date(fb.createdAt).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
                    </span>
                  </div>

                  <p className="text-slate-700 text-xs leading-relaxed italic bg-slate-50/60 p-3.5 rounded-2xl border border-slate-100 mb-3">
                    &quot;{fb.message}&quot;
                  </p>
                </div>

                {fb.photoId && (
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Related Photo
                    </span>
                    <Link
                      href={`/preview/${fb.photoId}`}
                      target="_blank"
                      className="text-xs font-bold text-blue-700 hover:text-blue-800 bg-blue-50/70 hover:bg-blue-100 px-2.5 py-1 rounded-lg transition-colors inline-flex items-center gap-1"
                    >
                      <span>Photo #{fb.photoId.slice(-6)}</span>
                      <ExternalLink className="w-3 h-3 text-blue-600" />
                    </Link>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
