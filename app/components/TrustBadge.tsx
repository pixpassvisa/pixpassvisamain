import React from 'react';

const TrustBadge: React.FC = () => {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-3 mt-8">
      <div className="flex items-center gap-1">
        <span className="text-sm font-bold text-slate-900">Excellent</span>
        <div className="flex items-center gap-0.5 ml-1">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-5 h-5 bg-[#00b67a] flex items-center justify-center rounded-sm">
              <svg className="w-3.5 h-3.5 text-white fill-current" viewBox="0 0 20 20">
                <path d="M10 15.27L16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19z" />
              </svg>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
        <span>17,860 reviews on</span>
        <div className="flex items-center gap-1">
          <svg className="w-5 h-5 text-[#00b67a] fill-current" viewBox="0 0 24 24">
            <path d="M23.954 9.47L15.347 8.785 12 1 8.653 8.785 0 9.47l6.533 5.66L4.747 23 12 18.73 19.253 23l-1.786-7.87 6.487-5.66z" />
          </svg>
          <span className="font-bold text-slate-900 tracking-tight">Trustpilot</span>
        </div>
      </div>
    </div>
  );
};

export default TrustBadge;
