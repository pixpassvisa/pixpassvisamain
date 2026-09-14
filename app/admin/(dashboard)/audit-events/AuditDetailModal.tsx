"use client";

import { useState } from "react";
import { Search, X, Check, Copy, LucideIcon } from "lucide-react";

export default function AuditDetailModal({
  event,
  email,
  conf,
}: {
  event: any;
  email: string | null;
  conf: { badge: string; icon: LucideIcon; label: string };
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const Icon = conf.icon;

  const fullData = {
    _id: event._id,
    eventType: event.eventType,
    actor: event.actor,
    customerEmail: email,
    ipAddress: event.ipAddress,
    userAgent: event.userAgent,
    photoId: event.photoId,
    orderId: event.orderId,
    paymentId: event.paymentId,
    disputeId: event.disputeId,
    metadata: {
      ...(email ? { email } : {}),
      ...(event.metadata || {}),
    },
    createdAt: event.createdAt,
  };

  const copyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(fullData, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-2.5 py-1 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
        title="Inspect Audit Metadata"
      >
        <Search className="w-3.5 h-3.5 text-slate-500" />
        <span>Inspect</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/65 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
                  <Icon className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900 leading-tight flex items-center gap-2">
                    <span>Audit Event:</span>
                    <span className={`text-xs px-2.5 py-0.5 rounded-full border ${conf.badge}`}>
                      {conf.label}
                    </span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Immutable event ID: <span className="font-mono">{event._id.toString()}</span>
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-200/70 hover:bg-slate-300 text-slate-600 font-bold flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4 text-slate-600" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-4">
              <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Actor / Email</span>
                  <span className="font-bold text-slate-900">{email || event.actor || "system"}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">IP Address</span>
                  <code className="font-mono text-slate-700">{event.ipAddress || "Internal"}</code>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Timestamp</span>
                  <span className="text-slate-800">
                    {new Date(event.createdAt).toLocaleString()}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">References</span>
                  <div className="font-mono text-[11px] text-slate-600">
                    {event.photoId && <div>Photo: {event.photoId.toString().slice(-8)}</div>}
                    {event.orderId && <div>Order: {event.orderId.toString().slice(-8)}</div>}
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Event Details &amp; Payload JSON
                  </span>
                  <button
                    onClick={copyJson}
                    className="text-xs text-blue-700 hover:text-blue-800 font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-blue-600" />
                        <span>Copy Payload</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="bg-slate-900 text-slate-200 p-4 rounded-2xl text-[11px] font-mono overflow-x-auto max-h-64 leading-relaxed">
                  {JSON.stringify(fullData, null, 2)}
                </pre>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end">
              <button
                onClick={() => setIsOpen(false)}
                className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
