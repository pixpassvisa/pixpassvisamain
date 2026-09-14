"use client";

import React, { useState, useRef, useEffect } from "react";
import jsPDF from "jspdf";
import { useSearchParams } from "next/navigation";
import { AlertTriangle, RefreshCw, Camera, Check } from "lucide-react";

const PAPER_SIZES = {
  "4x6": { name: "4×6 inch", width: 101.6, height: 152.4 }, // mm
  "5x7": { name: "5×7 inch", width: 127, height: 177.8 },
  A4: { name: "A4", width: 210, height: 297 },
  Letter: { name: "Letter", width: 215.9, height: 279.4 },
};

const PHOTO_SIZES = {
  "2x2": { name: "2×2 inch (US)", width: 51, height: 51 },
  "35x45": { name: "35×45 mm (Europe/UK/Aus/India)", width: 35, height: 45 },
};

export default function PrintTemplateApp() {
  const searchParams = useSearchParams();
  const imageUrl =
    searchParams.get("imageUrl") ||
    searchParams.get("image") ||
    searchParams.get("photoUrl") ||
    searchParams.get("photo");
  const customWidth = searchParams.get("width");
  const customHeight = searchParams.get("height");
  const customName = searchParams.get("name");

  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [imageObj, setImageObj] = useState<HTMLImageElement | null>(null);
  const [imageLoadError, setImageLoadError] = useState<string | null>(null);

  const [paperSize, setPaperSize] = useState<keyof typeof PAPER_SIZES>("5x7");

  const [photoSizes, setPhotoSizes] = useState({
    "2x2": { name: "2×2 inch (US)", width: 51, height: 51 },
    "35x45": { name: "35×45 mm (Europe/UK/Aus)", width: 35, height: 45 },
  });
  const [photoSize, setPhotoSize] = useState<string>("2x2");

  const [layoutCount, setLayoutCount] = useState<number>(6);

  const [cropLines, setCropLines] = useState<boolean>(true);
  const [margin, setMargin] = useState<number>(5); // mm
  const [spacing, setSpacing] = useState<number>(0); // mm

  // Load initial image if passed in query params
  useEffect(() => {
    if (imageUrl) {
      const decodedUrl = decodeURIComponent(imageUrl);
      setImageSrc(decodedUrl);
      setImageLoadError(null);
      const img = new Image();
      img.onload = () => {
        setImageObj(img);
        setImageLoadError(null);
      };
      img.onerror = () => {
        setImageObj(null);
        setImageSrc(null);
        setImageLoadError(
          "Failed to load your photo. Please try again or upload a new photo.",
        );
      };
      img.src = decodedUrl;
    }
  }, [imageUrl]);

  // Load custom size if passed in query params
  useEffect(() => {
    if (customWidth && customHeight) {
      const w = parseFloat(customWidth);
      const h = parseFloat(customHeight);
      if (!isNaN(w) && !isNaN(h)) {
        // Check if it already matches one of the existing keys
        const is2x2 = Math.abs(w - 51) <= 1 && Math.abs(h - 51) <= 1;
        const is35x45 = Math.abs(w - 35) <= 1 && Math.abs(h - 45) <= 1;

        if (is2x2) {
          setPhotoSize("2x2");
        } else if (is35x45) {
          setPhotoSize("35x45");
        } else {
          // Dynamic custom size option matching the user's document type spec
          const label = customName
            ? decodeURIComponent(customName)
            : `${w}×${h} mm`;
          setPhotoSizes((prev) => ({
            ...prev,
            custom: { name: `${label} (${w}×${h} mm)`, width: w, height: h },
          }));
          setPhotoSize("custom");
        }
      }
    }
  }, [customWidth, customHeight, customName]);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle Image Upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const src = event.target?.result as string;
      setImageSrc(src);
      const img = new Image();
      img.onload = () => setImageObj(img);
      img.src = src;
    };
    reader.readAsDataURL(file);
  };

  // Drag and Drop
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const src = event.target?.result as string;
        setImageSrc(src);
        const img = new Image();
        img.onload = () => setImageObj(img);
        img.src = src;
      };
      reader.readAsDataURL(file);
    }
  };

  // Draw Canvas
  useEffect(() => {
    if (!imageObj || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const DPI = 300;
    const mmToPx = (mm: number) => (mm * DPI) / 25.4;

    const paper = PAPER_SIZES[paperSize];
    const photo = (photoSizes as any)[photoSize] || PHOTO_SIZES["2x2"];

    // Set canvas dimensions
    const cWidth = mmToPx(paper.width);
    const cHeight = mmToPx(paper.height);
    canvas.width = cWidth;
    canvas.height = cHeight;

    // Fill white background
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, cWidth, cHeight);

    const marginPx = mmToPx(margin);
    const spacingPx = mmToPx(spacing);
    const photoWPx = mmToPx(photo.width);
    const photoHPx = mmToPx(photo.height);

    // Calculate Grid
    const availableW = cWidth - 2 * marginPx;
    const availableH = cHeight - 2 * marginPx;

    const cols = Math.floor((availableW + spacingPx) / (photoWPx + spacingPx));
    const rows = Math.floor((availableH + spacingPx) / (photoHPx + spacingPx));

    const maxPhotos = cols * rows;
    const actualCount = Math.min(layoutCount, maxPhotos);

    // Center grid
    const gridW = cols * photoWPx + (cols - 1) * spacingPx;
    const gridH = rows * photoHPx + (rows - 1) * spacingPx;
    const startX = marginPx + (availableW - gridW) / 2;
    const startY = marginPx + (availableH - gridH) / 2;

    let count = 0;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (count >= actualCount) break;

        const x = startX + c * (photoWPx + spacingPx);
        const y = startY + r * (photoHPx + spacingPx);

        // Draw Image
        ctx.drawImage(imageObj, x, y, photoWPx, photoHPx);

        // Draw crop lines (thin black lines) around the image
        if (cropLines) {
          ctx.strokeStyle = "#000000";
          ctx.lineWidth = mmToPx(0.2); // ~0.2mm thin line
          ctx.strokeRect(x, y, photoWPx, photoHPx);
        }

        count++;
      }
    }
    const printDate = new Date().toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
    ctx.fillStyle = "#0e7b07ff";
    ctx.font = `${mmToPx(2.8)}px Arial`;
    ctx.textBaseline = "bottom";

    // Website (left)
    ctx.textAlign = "left";
    ctx.fillText("pixpassvisa.com", marginPx, cHeight - mmToPx(2));

    // Date (right)
    ctx.textAlign = "right";
    ctx.fillText(
      `Printed: ${printDate}`,
      cWidth - marginPx,
      cHeight - mmToPx(2),
    );
  }, [
    imageObj,
    paperSize,
    photoSize,
    photoSizes,
    layoutCount,
    cropLines,
    margin,
    spacing,
  ]);

  // Download timer & processing state
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadFormat, setDownloadFormat] = useState<"jpg" | "pdf" | null>(null);
  const [downloadSecondsLeft, setDownloadSecondsLeft] = useState(6);
  const [downloadProgress, setDownloadProgress] = useState(0);

  // Execute actual file download
  const executeDownload = (format: "jpg" | "pdf") => {
    if (!canvasRef.current) return;

    if (format === "jpg") {
      const link = document.createElement("a");
      link.download = `pixpassvisa.com_dimensions_${paperSize}.jpg`;
      link.href = canvasRef.current.toDataURL("image/jpeg", 1.0);
      link.click();
    } else if (format === "pdf") {
      const imgData = canvasRef.current.toDataURL("image/jpeg", 1.0);
      const paper = PAPER_SIZES[paperSize];
      const pdf = new jsPDF({
        orientation: paper.width > paper.height ? "landscape" : "portrait",
        unit: "mm",
        format: [paper.width, paper.height],
      });

      pdf.addImage(imgData, "JPEG", 0, 0, paper.width, paper.height);
      pdf.save(`pixpassvisa.com_dimensions_${paperSize}.pdf`);
    }
  };

  // Upload final image to Cloudinary
  const uploadFinalImageToCloudinary = async (format: "jpg" | "pdf") => {
    try {
      if (!canvasRef.current) return;
      const dataUrl = canvasRef.current.toDataURL("image/jpeg", 0.95);

      await fetch("/api/upload-template", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image: dataUrl,
          paperSize,
          photoSize,
          format,
        }),
      });
    } catch (err) {
      console.warn("[Cloudinary] Upload error:", err);
    }
  };

  // Start 6-second processing timer before download & upload to Cloudinary
  const startDownloadWithTimer = (format: "jpg" | "pdf") => {
    if (isDownloading || !canvasRef.current) return;
    setDownloadFormat(format);
    setDownloadSecondsLeft(6);
    setDownloadProgress(0);
    setIsDownloading(true);

    // Trigger Cloudinary upload in parallel during the 6s countdown
    uploadFinalImageToCloudinary(format);
  };

  // 6-second timer effect
  useEffect(() => {
    if (!isDownloading || !downloadFormat) return;

    const DURATION_MS = 6000;
    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progressPercent = Math.min(100, (elapsed / DURATION_MS) * 100);
      const remainingSeconds = Math.max(0, Math.ceil((DURATION_MS - elapsed) / 1000));

      setDownloadProgress(progressPercent);
      setDownloadSecondsLeft(remainingSeconds);

      if (elapsed >= DURATION_MS) {
        clearInterval(interval);
        executeDownload(downloadFormat);

        // Brief delay before closing modal so user sees 100% completion
        setTimeout(() => {
          setIsDownloading(false);
          setDownloadFormat(null);
          setDownloadProgress(0);
          setDownloadSecondsLeft(6);
        }, 500);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [isDownloading, downloadFormat, paperSize]);

  const getProcessingMessage = () => {
    if (downloadSecondsLeft >= 5) return "Preparing 300 DPI high-resolution canvas...";
    if (downloadSecondsLeft >= 3) return "Optimizing print grid & syncing to cloud...";
    if (downloadSecondsLeft >= 1) return "Calibrating print quality & layout dimensions...";
    return "Generating final file & starting download...";
  };

  // Error Dialog Component
  const ErrorDialog = ({
    message,
    onRetry,
    onBack,
  }: {
    message: string;
    onRetry: () => void;
    onBack: () => void;
  }) => (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center">
        <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 text-red-600">
          <AlertTriangle className="w-7 h-7" />
        </div>
        <h3 className="text-lg font-bold text-slate-900 mb-2">
          Something went wrong
        </h3>
        <p className="text-sm text-slate-500 mb-6">{message}</p>
        <div className="flex gap-3">
          <button
            onClick={onBack}
            className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 rounded-xl text-sm transition-all"
          >
            ← Back
          </button>
          <button
            onClick={onRetry}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl text-sm transition-all inline-flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Retry</span>
          </button>
        </div>
      </div>
    </div>
  );

  // Retry handler - reload the image
  const handleRetry = () => {
    if (imageUrl) {
      const decodedUrl = decodeURIComponent(imageUrl);
      setImageLoadError(null);
      setImageSrc(decodedUrl);
      const img = new Image();
      img.onload = () => {
        setImageObj(img);
        setImageLoadError(null);
      };
      img.onerror = () => {
        setImageObj(null);
        setImageSrc(null);
        setImageLoadError(
          "Failed to load your photo. Please try again or upload a new photo.",
        );
      };
      img.src = decodedUrl;
    }
  };

  // Back handler - go to previous page
  const handleBack = () => {
    if (typeof window !== "undefined") {
      window.history.back();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Download Processing Modal (6-second timer) */}
      {isDownloading && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 sm:p-8 text-center border border-slate-100 relative overflow-hidden">
            {/* Top gradient accent line */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 via-emerald-500 to-teal-500" />

            {/* Circular Timer & Spinner */}
            <div className="relative w-20 h-20 mx-auto mb-5 flex items-center justify-center">
              <div className="absolute inset-0 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
              <div className="w-14 h-14 bg-blue-50/70 rounded-full flex flex-col items-center justify-center shadow-inner">
                <span className="text-xl font-black text-blue-700 leading-none">
                  {downloadSecondsLeft}s
                </span>
              </div>
            </div>

            <h3 className="text-xl font-bold text-slate-800 mb-2">
              Preparing {downloadFormat?.toUpperCase()} Template
            </h3>

            <p className="text-sm text-slate-600 mb-5 font-medium min-h-[1.5rem] transition-all duration-300">
              {getProcessingMessage()}
            </p>

            {/* Progress Bar */}
            <div className="w-full bg-slate-100 rounded-full h-3 mb-2.5 overflow-hidden p-0.5 border border-slate-200">
              <div
                className="bg-gradient-to-r from-blue-600 to-emerald-600 h-full rounded-full transition-all duration-75 ease-out"
                style={{ width: `${downloadProgress}%` }}
              />
            </div>

            <div className="flex justify-between text-xs text-slate-400 font-semibold mb-5">
              <span>Rendering 300 DPI layout</span>
              <span>{Math.round(downloadProgress)}%</span>
            </div>

            {/* Details Badge */}
            <div className="bg-slate-50 rounded-xl p-3 text-xs text-slate-600 flex items-center justify-center gap-2 border border-slate-100">
              <Check className="w-4 h-4 text-blue-600 shrink-0" />
              <span>
                Ready for print on {PAPER_SIZES[paperSize].name} ({PAPER_SIZES[paperSize].width}×{PAPER_SIZES[paperSize].height} mm)
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Error Dialog */}
      {imageLoadError && (
        <ErrorDialog
          message={imageLoadError}
          onRetry={handleRetry}
          onBack={handleBack}
        />
      )}
      {!imageSrc ? (
        <div
          className="border-2 border-dashed border-slate-300 rounded-2xl p-6 sm:p-12 text-center bg-white hover:bg-slate-50 transition-colors cursor-pointer"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          onClick={() => document.getElementById("photo-upload")?.click()}
        >
          <div className="mx-auto w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-4 border border-blue-100">
            <Camera className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">
            Upload your passport photo
          </h3>
          <p className="text-slate-500 mb-6">
            Drag and drop your image here, or click to browse.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold  transition-colors">
            Select Photo
          </button>
          <input
            type="file"
            id="photo-upload"
            accept="image/jpeg, image/png, image/webp"
            className="hidden"
            onChange={handleFileUpload}
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 flex-col-reverse lg:flex-row">
          {/* Controls Sidebar */}
          <div className="lg:col-span-4 bg-white p-4 sm:p-6 rounded-sm  border border-slate-200 order-2 lg:order-1">
            <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
              <h2 className="text-xl font-bold text-slate-800">
                Layout Settings
              </h2>
              <button
                onClick={() => {
                  setImageSrc(null);
                  setImageObj(null);
                }}
                className="text-sm text-slate-500 hover:text-slate-800 underline"
              >
                Change Photo
              </button>
            </div>

            <div className="space-y-6">
              {/* Paper Size */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Paper Size
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(PAPER_SIZES).map(([key, val]) => (
                    <button
                      key={key}
                      onClick={() => setPaperSize(key as any)}
                      className={`py-2 px-3 border rounded-lg text-sm font-medium transition-colors ${
                        paperSize === key
                          ? "bg-blue-50/70 border-blue-600 text-blue-700"
                          : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {val.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Photo Size */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Target Photo Size
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {Object.entries(photoSizes).map(([key, val]) => (
                    <button
                      key={key}
                      onClick={() => setPhotoSize(key)}
                      className={`py-2 px-3 border rounded-lg text-sm font-medium transition-colors ${
                        photoSize === key
                          ? "bg-blue-50/70 border-blue-600 text-blue-700"
                          : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {val.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Number of Photos */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Number of Copies
                </label>
                <select
                  value={layoutCount}
                  onChange={(e) => setLayoutCount(Number(e.target.value))}
                  className="w-full border border-slate-200 rounded-lg p-2.5 text-slate-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  {[2, 4, 6, 8, 10, 12, 16, 20].map((num) => (
                    <option key={num} value={num}>
                      {num} Photos
                    </option>
                  ))}
                  <option value={99}>Fill Entire Page</option>
                </select>
              </div>

              {/* Options */}
              {/* <div className="space-y-3 pt-2">
                <label className="flex items-center space-x-3">
                  <input 
                    type="checkbox" 
                    checked={cropLines} 
                    onChange={(e) => setCropLines(e.target.checked)}
                    className="h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-slate-700 font-medium">Add black crop lines</span>
                </label>
                
                <div>
                  <label className="block text-sm text-slate-600 mb-1 flex justify-between">
                    <span>Spacing between photos</span>
                    <span>{spacing} mm</span>
                  </label>
                  <input 
                    type="range" 
                    min="0" max="10" step="1"
                    value={spacing}
                    onChange={(e) => setSpacing(Number(e.target.value))}
                    className="w-full accent-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-sm text-slate-600 mb-1 flex justify-between">
                    <span>Page Margins</span>
                    <span>{margin} mm</span>
                  </label>
                  <input 
                    type="range" 
                    min="5" max="30" step="1"
                    value={margin}
                    onChange={(e) => setMargin(Number(e.target.value))}
                    className="w-full accent-blue-600"
                  />
                </div>
              </div> */}
            </div>

            {/* Download Buttons */}
            <div className="mt-8 pt-6 border-t border-slate-100 space-y-3">
              <button
                onClick={() => startDownloadWithTimer("jpg")}
                disabled={isDownloading}
                className={`w-full py-3 px-4 rounded-lg font-bold shadow-md transition-all flex items-center justify-center gap-2 ${
                  isDownloading && downloadFormat === "jpg"
                    ? "bg-blue-700 text-white cursor-wait opacity-90"
                    : isDownloading
                      ? "bg-slate-300 text-slate-500 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
                }`}
              >
                {isDownloading && downloadFormat === "jpg" ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    <span>Processing JPG ({downloadSecondsLeft}s)...</span>
                  </>
                ) : (
                  <span>Download as JPG</span>
                )}
              </button>
              <button
                onClick={() => startDownloadWithTimer("pdf")}
                disabled={isDownloading}
                className={`w-full py-3 px-4 rounded-lg font-bold shadow-md transition-all flex items-center justify-center gap-2 ${
                  isDownloading && downloadFormat === "pdf"
                    ? "bg-slate-900 text-white cursor-wait opacity-90"
                    : isDownloading
                      ? "bg-slate-300 text-slate-500 cursor-not-allowed"
                      : "bg-slate-800 hover:bg-slate-900 text-white cursor-pointer"
                }`}
              >
                {isDownloading && downloadFormat === "pdf" ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    <span>Processing PDF ({downloadSecondsLeft}s)...</span>
                  </>
                ) : (
                  <span>Download as PDF</span>
                )}
              </button>
              <p className="text-xs text-center text-slate-500 mt-2">
                High resolution 300 DPI ready for printing
              </p>
            </div>
          </div>

          {/* Canvas Preview Area */}
          <div
            className="lg:col-span-8 bg-slate-200 rounded-sm p-2 sm:p-6 flex items-center justify-center  border border-slate-300  order-1 lg:order-2"
            ref={containerRef}
          >
            {/* Note: The canvas draws at 300DPI which is huge, we use CSS to scale it down for preview */}
            <canvas
              ref={canvasRef}
              className="w-auto h-auto max-w-full max-h-[70vh] object-contain transition-transform duration-300 group-hover:scale-[1.02]"
            />
          </div>
        </div>
      )}
    </div>
  );
}
