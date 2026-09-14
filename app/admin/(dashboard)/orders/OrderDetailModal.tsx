"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Eye,
  Package,
  Copy,
  Check,
  X,
  CreditCard,
  ImageIcon,
  Settings,
  Zap,
  ShieldCheck,
  User,
  Camera,
  Building2,
  Clock,
  FileText,
  ExternalLink,
} from "lucide-react";

interface OrderDetailModalProps {
  order: any;
  payment: any;
  photo: any;
  countryName: string;
  email: string;
  effectiveStatus: string;
  paymentId: string;
}

export default function OrderDetailModal({
  order,
  payment,
  photo,
  countryName,
  email,
  effectiveStatus,
  paymentId,
}: OrderDetailModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "payment" | "biometrics" | "json">("overview");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Close on escape key and lock body scroll
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const copyToClipboard = (text: string, key: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1800);
  };

  // Retention calculation
  const photoAgeMs = photo?.createdAt
    ? Date.now() - new Date(photo.createdAt).getTime()
    : order?.createdAt
    ? Date.now() - new Date(order.createdAt).getTime()
    : 25 * 60 * 60 * 1000;
  const photoAgeHours = photoAgeMs / (1000 * 60 * 60);
  const isPurged =
    photo?.isExpired || photoAgeHours >= 24 || (!photo?.secureUrl && !photo?.previewUrl);
  const hoursLeft = Math.max(0, Math.floor(24 - photoAgeHours));
  const minutesLeft = Math.max(0, Math.floor((24 - photoAgeHours) * 60) % 60);

  const fullData = {
    order,
    payment,
    photoSummary: photo
      ? {
          _id: photo._id,
          documentType: photo.documentType,
          status: photo.status,
          isExpired: photo.isExpired,
          metrics: photo.metrics,
          createdAt: photo.createdAt,
          urls: {
            previewUrl: photo.previewUrl,
            secureUrl: photo.secureUrl,
            printSheetUrl: photo.printSheetUrl,
          },
        }
      : null,
  };

  const statusBadgeClasses: Record<string, string> = {
    paid: "bg-emerald-50 text-emerald-700 border-emerald-200",
    pending: "bg-amber-50 text-amber-700 border-amber-200",
    failed: "bg-rose-50 text-rose-700 border-rose-200",
    refunded: "bg-purple-50 text-purple-700 border-purple-200",
    disputed: "bg-red-50 text-red-700 border-red-200",
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-3 py-1.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs hover:text-slate-900"
        title="View Detailed Order Record"
      >
        <Eye className="w-3.5 h-3.5 text-slate-500" />
        <span>Details</span>
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/65 backdrop-blur-xs animate-in fade-in duration-150"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsOpen(false);
          }}
        >
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-3xl w-full max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="px-6 py-4.5 border-b border-slate-100 bg-slate-50/80 flex items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-blue-600/10 border border-blue-500/30 flex items-center justify-center text-blue-600 shrink-0 shadow-2xs">
                  <Package className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-lg font-black text-slate-900 tracking-tight">
                      Order {order.orderNumber}
                    </h3>
                    <button
                      onClick={() => copyToClipboard(order.orderNumber, "orderNumber")}
                      className="text-[11px] px-2 py-0.5 rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-mono font-medium transition-colors cursor-pointer flex items-center gap-1"
                      title="Copy Order Number"
                    >
                      {copiedKey === "orderNumber" ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3 text-slate-400" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                    <span
                      className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border uppercase tracking-wider ${
                        statusBadgeClasses[effectiveStatus] || "bg-slate-100 text-slate-600 border-slate-200"
                      }`}
                    >
                      {effectiveStatus}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-2">
                    <span>
                      Created on{" "}
                      {new Date(order.createdAt).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}{" "}
                      at{" "}
                      {new Date(order.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="font-semibold text-slate-600">{order.userId ? "Registered Account" : "Guest Checkout"}</span>
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-200/70 hover:bg-slate-300 text-slate-600 font-bold flex items-center justify-center transition-colors cursor-pointer shrink-0"
                title="Close (Esc)"
              >
                <X className="w-4 h-4 text-slate-600" />
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-1.5 px-6 pt-3 pb-2 border-b border-slate-100 bg-white overflow-x-auto">
              <button
                onClick={() => setActiveTab("overview")}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                  activeTab === "overview"
                    ? "bg-slate-900 text-white shadow-xs"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Overview</span>
              </button>
              <button
                onClick={() => setActiveTab("payment")}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                  activeTab === "payment"
                    ? "bg-slate-900 text-white shadow-xs"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <CreditCard className="w-3.5 h-3.5" />
                <span>Payment &amp; Gateway</span>
              </button>
              <button
                onClick={() => setActiveTab("biometrics")}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                  activeTab === "biometrics"
                    ? "bg-slate-900 text-white shadow-xs"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Biometrics &amp; 24h Purge</span>
                {!isPurged && (
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                )}
              </button>
              <button
                onClick={() => setActiveTab("json")}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                  activeTab === "json"
                    ? "bg-slate-900 text-white shadow-xs"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <Settings className="w-3.5 h-3.5" />
                <span>Raw JSON</span>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-5">
              {/* TAB 1: OVERVIEW */}
              {activeTab === "overview" && (
                <div className="space-y-5 animate-in fade-in duration-100">
                  {/* Top Metric Cards Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="bg-slate-50 border border-slate-200/80 p-3.5 rounded-2xl">
                      <div className="text-[10px] uppercase font-bold text-slate-400">Total Charged</div>
                      <div className="text-base font-black text-slate-900 mt-1">
                        {order.currency || "USD"} {Number(order.amount).toFixed(2)}
                      </div>
                      <div className="text-[10px] text-slate-500 mt-0.5">
                        {effectiveStatus === "paid" ? "Captured Successfully" : "Pending Gateway Settlement"}
                      </div>
                    </div>

                    <div className="bg-slate-50 border border-slate-200/80 p-3.5 rounded-2xl">
                      <div className="text-[10px] uppercase font-bold text-slate-400">Document Spec</div>
                      <div className="text-xs font-bold text-slate-900 mt-1 truncate" title={countryName}>
                        {countryName}
                      </div>
                      <div className="text-[10px] font-mono text-slate-500 mt-0.5 truncate">
                        {order.documentType}
                      </div>
                    </div>

                    <div className="bg-slate-50 border border-slate-200/80 p-3.5 rounded-2xl">
                      <div className="text-[10px] uppercase font-bold text-slate-400">Service Tier</div>
                      <div className="mt-1">
                        {order.isExpert ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-700 bg-blue-50/70 border border-blue-200 px-2 py-0.5 rounded-md">
                            <Zap className="w-3 h-3 text-blue-600 fill-blue-600" />
                            <span>Expert Edit</span>
                          </span>
                        ) : (
                          <span className="text-xs font-bold text-slate-700">
                            Standard AI
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5">Automated compliance</div>
                    </div>

                    <div className="bg-slate-50 border border-slate-200/80 p-3.5 rounded-2xl">
                      <div className="text-[10px] uppercase font-bold text-slate-400">24h Privacy Purge</div>
                      <div className="mt-1">
                        {isPurged ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-500 bg-slate-200/60 px-2 py-0.5 rounded-md">
                            <ShieldCheck className="w-3 h-3 text-slate-400" />
                            <span>Purged</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                            Active ({hoursLeft}h left)
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5">Biometric file lifecycle</div>
                    </div>
                  </div>

                  {/* Customer Information Card */}
                  <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-2xs space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-slate-400" />
                        <span>Customer Identity &amp; Notification</span>
                      </span>
                      <button
                        onClick={() => copyToClipboard(email, "email")}
                        className="text-xs text-blue-700 hover:text-blue-800 font-bold transition-colors cursor-pointer flex items-center gap-1"
                      >
                        {copiedKey === "email" ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-600" />
                            <span>Copied Email</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy Email</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                        <span className="text-[10px] font-bold text-slate-400 uppercase block">Customer Email</span>
                        <span className="font-bold text-slate-900 mt-0.5 block break-all">{email}</span>
                      </div>
                      <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                        <span className="text-[10px] font-bold text-slate-400 uppercase block">User ID / Status</span>
                        <div className="flex items-center gap-2 mt-0.5">
                          {order.userId ? (
                            <code className="font-mono text-slate-700 text-[11px] bg-white px-1.5 py-0.5 rounded border border-slate-200">
                              {order.userId}
                            </code>
                          ) : (
                            <span className="text-slate-500 font-medium italic">Guest User (No Account)</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quick Payment & Photo Cross-References */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-2xs space-y-2">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                        <CreditCard className="w-3.5 h-3.5 text-slate-400" />
                        <span>Gateway Reference</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 font-bold uppercase block">Payment ID</span>
                        {paymentId ? (
                          <div className="flex items-center gap-1.5 mt-1">
                            <code className="font-mono text-xs text-slate-800 bg-slate-50 px-2 py-1 rounded-lg border border-slate-200 break-all">
                              {paymentId}
                            </code>
                            <button
                              onClick={() => copyToClipboard(paymentId, "paymentId")}
                              className="text-xs text-slate-500 hover:text-slate-800 p-1 rounded cursor-pointer"
                              title="Copy Payment ID"
                            >
                              {copiedKey === "paymentId" ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3 text-slate-400" />}
                            </button>
                          </div>
                        ) : (
                          <span className="text-xs text-slate-400 italic mt-1 block">Awaiting customer payment</span>
                        )}
                      </div>
                    </div>

                    <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-2xs space-y-2">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                        <Camera className="w-3.5 h-3.5 text-slate-400" />
                        <span>Biometric Photo Reference</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 font-bold uppercase block">Photo Document ID</span>
                        {order.photoId ? (
                          <div className="flex items-center gap-1.5 mt-1">
                            <code className="font-mono text-xs text-slate-800 bg-slate-50 px-2 py-1 rounded-lg border border-slate-200">
                              {order.photoId.toString()}
                            </code>
                            <button
                              onClick={() => copyToClipboard(order.photoId.toString(), "photoId")}
                              className="text-xs text-slate-500 hover:text-slate-800 p-1 rounded cursor-pointer"
                              title="Copy Photo ID"
                            >
                              {copiedKey === "photoId" ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3 text-slate-400" />}
                            </button>
                          </div>
                        ) : (
                          <span className="text-xs text-slate-400 italic mt-1 block">No linked photo document</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: PAYMENT & GATEWAY */}
              {activeTab === "payment" && (
                <div className="space-y-4 animate-in fade-in duration-100">
                  <div className="bg-slate-50 border border-slate-200/90 p-4.5 rounded-2xl space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-slate-600" />
                        <span>Razorpay / Gateway Records</span>
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border uppercase ${
                          payment.status === "captured"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : "bg-slate-100 text-slate-600 border-slate-200"
                        }`}
                      >
                        {payment.status || "created"}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
                      <div className="bg-white p-3 rounded-xl border border-slate-200">
                        <span className="text-slate-400 block text-[10px] font-bold uppercase">
                          Gateway Payment ID
                        </span>
                        <div className="flex items-center justify-between gap-2 mt-1">
                          <code className="font-mono text-slate-900 font-bold text-xs truncate">
                            {paymentId || "Pending Gateway Transaction"}
                          </code>
                          {paymentId && (
                            <button
                              onClick={() => copyToClipboard(paymentId, "payId")}
                              className="text-blue-700 font-bold text-[11px] hover:underline cursor-pointer shrink-0"
                            >
                              {copiedKey === "payId" ? "✓ Copied" : "Copy"}
                            </button>
                          )}
                        </div>
                      </div>

                      <div className="bg-white p-3 rounded-xl border border-slate-200">
                        <span className="text-slate-400 block text-[10px] font-bold uppercase">
                          Gateway Order ID
                        </span>
                        <div className="flex items-center justify-between gap-2 mt-1">
                          <code className="font-mono text-slate-900 font-bold text-xs truncate">
                            {order.metadata?.razorpayOrderId || payment.gatewayOrderId || photo?.razorpayOrderId || "N/A"}
                          </code>
                          {(order.metadata?.razorpayOrderId || payment.gatewayOrderId || photo?.razorpayOrderId) && (
                            <button
                              onClick={() =>
                                copyToClipboard(
                                  order.metadata?.razorpayOrderId || payment.gatewayOrderId || photo?.razorpayOrderId,
                                  "orderId"
                                )
                              }
                              className="text-blue-700 font-bold text-[11px] hover:underline cursor-pointer shrink-0"
                            >
                              {copiedKey === "orderId" ? "✓ Copied" : "Copy"}
                            </button>
                          )}
                        </div>
                      </div>

                      <div className="bg-white p-3 rounded-xl border border-slate-200">
                        <span className="text-slate-400 block text-[10px] font-bold uppercase">
                          Payment Method
                        </span>
                        <span className="font-bold text-slate-800 capitalize mt-1 block">
                          {payment.method || "card / upi / netbanking"}
                        </span>
                      </div>

                      <div className="bg-white p-3 rounded-xl border border-slate-200">
                        <span className="text-slate-400 block text-[10px] font-bold uppercase">
                          Currency &amp; Base Amount
                        </span>
                        <span className="font-bold text-slate-800 mt-1 block">
                          {payment.currency || order.currency || "USD"} {Number(payment.amount || order.amount).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Gateway Metadata Block if available */}
                  {(payment.metadata || order.metadata) && (
                    <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                        Gateway Verification &amp; Webhook Signatures
                      </span>
                      <pre className="bg-slate-900 text-slate-200 p-3.5 rounded-xl text-[11px] font-mono overflow-x-auto max-h-48 leading-relaxed">
                        {JSON.stringify(payment.metadata || order.metadata, null, 2)}
                      </pre>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: BIOMETRICS & 24H PURGE */}
              {activeTab === "biometrics" && (
                <div className="space-y-4 animate-in fade-in duration-100">
                  {/* 24-Hour Privacy Banner */}
                  <div
                    className={`p-4 rounded-2xl border flex items-start gap-3.5 ${
                      isPurged
                        ? "bg-slate-50 border-slate-200 text-slate-700"
                        : "bg-emerald-50/70 border-emerald-200/90 text-emerald-900"
                    }`}
                  >
                    <div className="p-2 rounded-xl bg-white/80 shrink-0">
                      {isPurged ? (
                        <ShieldCheck className="w-5 h-5 text-slate-500" />
                      ) : (
                        <Clock className="w-5 h-5 text-emerald-700" />
                      )}
                    </div>
                    <div className="text-xs space-y-1">
                      <div className="font-bold text-sm">
                        {isPurged
                          ? "Biometric Files Permanently Destroyed (24h Policy)"
                          : `Active Biometric Assets (${hoursLeft}h ${minutesLeft}m remaining)`}
                      </div>
                      <p className="text-slate-600 leading-relaxed">
                        {isPurged
                          ? "Uploaded facial photos, intermediate crop files, and downloadable sheets are automatically purged from Cloudinary 24 hours after creation for GDPR and biometric privacy compliance. All financial order and audit records remain permanently stored."
                          : "High-resolution passport photos and print templates are accessible for customer download during the 24-hour window. Once expired, all biometric image data will be deleted."}
                      </p>
                    </div>
                  </div>

                  {/* If photo is still active and has preview */}
                  {!isPurged && photo && (photo.previewUrl || photo.secureUrl) ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Processed Photo Preview */}
                        <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col items-center text-center">
                          <span className="text-[11px] font-bold text-slate-400 uppercase mb-3">
                            Biometric Single Photo
                          </span>
                          <div className="relative w-40 h-48 rounded-xl overflow-hidden border border-slate-200 bg-slate-100 shadow-sm">
                            <Image
                              src={photo.previewUrl || photo.secureUrl}
                              alt="Passport Photo Preview"
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="mt-3 flex gap-2">
                            <a
                              href={photo.secureUrl || photo.previewUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-xs font-bold text-blue-700 hover:text-blue-800 bg-blue-50/70 hover:bg-blue-100 border border-blue-200 px-3 py-1.5 rounded-lg transition-colors cursor-pointer inline-flex items-center gap-1.5"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                              <span>View Full Size</span>
                            </a>
                          </div>
                        </div>

                        {/* Print Sheet if available */}
                        {photo.printSheetUrl ? (
                          <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col items-center text-center">
                            <span className="text-[11px] font-bold text-slate-400 uppercase mb-3">
                              4×6″ Printable Sheet
                            </span>
                            <div className="relative w-48 h-36 rounded-xl overflow-hidden border border-slate-200 bg-slate-100 shadow-sm">
                              <Image
                                src={photo.printSheetUrl}
                                alt="Print Sheet Preview"
                                fill
                                className="object-contain"
                              />
                            </div>
                            <div className="mt-3 flex gap-2">
                              <a
                                href={photo.printSheetUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="text-xs font-bold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-200 px-3 py-1.5 rounded-lg transition-colors cursor-pointer inline-flex items-center gap-1.5"
                              >
                                <FileText className="w-3.5 h-3.5" />
                                <span>Download Sheet</span>
                              </a>
                            </div>
                          </div>
                        ) : (
                          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 flex flex-col items-center justify-center text-center text-slate-400 text-xs">
                            <FileText className="w-5 h-5 text-slate-400 mb-1" />
                            <span className="font-semibold text-slate-600 mt-1">Single Photo Order</span>
                            <p className="text-[11px] text-slate-400 mt-0.5">Print sheet was not requested for this order</p>
                          </div>
                        )}
                      </div>

                      {/* Biometric Validation Metrics */}
                      {photo.metrics && (
                        <div className="bg-white border border-slate-200/80 rounded-2xl p-4 space-y-3">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                            AI Biometric Compliance Analysis
                          </span>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                              <span className="text-[10px] text-slate-400 font-bold uppercase block">Head Size</span>
                              <span className="font-mono font-bold text-slate-800">
                                {photo.metrics.headSizePct ? `${Number(photo.metrics.headSizePct).toFixed(1)}%` : "N/A"}
                              </span>
                            </div>
                            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                              <span className="text-[10px] text-slate-400 font-bold uppercase block">Eye Level</span>
                              <span className="font-mono font-bold text-slate-800">
                                {photo.metrics.eyeLevelPct ? `${Number(photo.metrics.eyeLevelPct).toFixed(1)}%` : "N/A"}
                              </span>
                            </div>
                            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                              <span className="text-[10px] text-slate-400 font-bold uppercase block">Background</span>
                              <span className="font-bold text-emerald-700 flex items-center gap-1 mt-0.5">
                                <Check className="w-3.5 h-3.5 text-emerald-600" />
                                <span>{photo.metrics.backgroundValid ? "Valid" : "Cleaned"}</span>
                              </span>
                            </div>
                            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                              <span className="text-[10px] text-slate-400 font-bold uppercase block">AI Corrected</span>
                              <span className="font-bold text-slate-700 flex items-center gap-1 mt-0.5">
                                {photo.metrics.backgroundCorrected ? (
                                  <>
                                    <Check className="w-3.5 h-3.5 text-blue-600" />
                                    <span>Yes</span>
                                  </>
                                ) : (
                                  <span>Natural</span>
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-8 text-center text-slate-400">
                      <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-3 text-slate-400">
                        <ShieldCheck className="w-6 h-6 text-slate-400" />
                      </div>
                      <div className="font-bold text-slate-700 text-sm">Image Data Expired or Unavailable</div>
                      <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                        In accordance with data minimization policies, image binaries are purged 24 hours after generation.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 4: RAW JSON */}
              {activeTab === "json" && (
                <div className="space-y-3 animate-in fade-in duration-100">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                      Complete Document Payload
                    </span>
                    <button
                      onClick={() => copyToClipboard(JSON.stringify(fullData, null, 2), "json")}
                      className="text-xs font-bold text-blue-700 hover:text-blue-800 flex items-center gap-1.5 cursor-pointer bg-blue-50/70 hover:bg-blue-100 border border-blue-200 px-3 py-1.5 rounded-xl transition-colors"
                    >
                      {copiedKey === "json" ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Copied to Clipboard</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-blue-600" />
                          <span>Copy Full JSON</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="bg-slate-900 text-slate-200 p-4 rounded-2xl text-[11px] font-mono overflow-x-auto max-h-80 leading-relaxed border border-slate-800">
                    {JSON.stringify(fullData, null, 2)}
                  </pre>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3.5 border-t border-slate-100 bg-slate-50/80 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                <span>ID:</span>
                <span className="truncate max-w-[140px] sm:max-w-xs">{order._id.toString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => copyToClipboard(JSON.stringify(fullData, null, 2), "footerJson")}
                  className="px-3 py-1.5 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  {copiedKey === "footerJson" ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-500" />
                      <span>Copy JSON</span>
                    </>
                  )}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
