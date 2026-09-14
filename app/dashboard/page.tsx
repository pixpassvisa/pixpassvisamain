import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import dbConnect from "@/lib/mongodb";
import Photo from "@/models/Photo";
import Link from "next/link";
import LogoutButton from "./LogoutButton";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/login");
  }

  await dbConnect();
  
  // @ts-ignore
  const photos = await Photo.find({ userId: session.user.id }).sort({ createdAt: -1 }).lean();

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-black text-slate-900">My Dashboard</h1>
            <p className="text-slate-500 mt-1">Welcome back, {session.user.name || session.user.email}</p>
          </div>
          <div className="flex gap-4">
            <Link 
              href="/passport-photo-online" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-md transition-colors"
            >
              + New Photo
            </Link>
            <LogoutButton />
          </div>
        </div>

        {photos.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center shadow-sm">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25H12m0 0v-1.5m0 1.5v1.5m0-1.5h1.5" /></svg>
            </div>
            <h2 className="text-xl font-bold text-slate-900">No photos yet</h2>
            <p className="text-slate-500 mt-2 mb-6">Create your first compliant passport photo.</p>
            <Link href="/passport-photo-online" className="text-blue-600 font-bold hover:underline">Start Studio Room &rarr;</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {photos.map((photo) => {
              const date = new Date(photo.createdAt).toLocaleDateString();
              const isPaid = photo.status === "paid";
              return (
                <div key={photo._id.toString()} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-shadow">
                  <div className="aspect-square bg-slate-100 relative group overflow-hidden">
                    <img 
                      src={photo.previewUrl} 
                      alt="Photo Thumbnail" 
                      className={`w-full h-full object-cover select-none pointer-events-none ${isPaid ? "" : "blur-sm opacity-80"}`}
                    />
                    {!isPaid && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[2px]">
                        <span className="bg-slate-900 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">UNPAID</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-slate-900 leading-tight">{photo.documentType.replace(/-/g, " ").toUpperCase()}</h3>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isPaid ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'}`}>
                        {isPaid ? "PAID" : "PENDING"}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">{date}</p>
                    
                    <div className="mt-auto pt-4 border-t border-slate-100">
                      {isPaid ? (
                        <div className="flex flex-col gap-2 w-full">
                          <a 
                            href={`/api/download/${photo._id}`}
                            className="w-full flex justify-center items-center gap-2 bg-slate-900 hover:bg-blue-600 text-white py-2 rounded-lg text-xs font-bold transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>
                            Download High-Res Photo
                          </a>
                          {photo.printSheetUrl && (
                            <a 
                              href={`/api/download-sheet/${photo._id}`}
                              className="w-full flex justify-center items-center gap-2 border-2 border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white py-1.5 rounded-lg text-xs font-bold transition-colors"
                            >
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0v3.398c0 .596.237 1.17.659 1.591l.841.841a4.5 4.5 0 003.182 1.318h3.636a4.5 4.5 0 003.182-1.318l.841-.841a2.25 2.25 0 00.659-1.591v-3.398z" /></svg>
                              Print Sheet A4 (20 Photos)
                            </a>
                          )}
                        </div>
                      ) : (
                        <Link 
                          href={`/preview/${photo._id}`}
                          className="w-full flex justify-center items-center bg-white border-2 border-slate-200 hover:border-blue-500 text-slate-700 py-2 rounded-lg text-xs font-bold transition-all"
                        >
                          Complete Payment
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
