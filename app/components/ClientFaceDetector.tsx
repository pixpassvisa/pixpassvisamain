"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  FaceLandmarker,
  getMediaPipeLandmarker,
  computeFaceBox,
  computeTiltAngle,
  detectBodyTilt,
  getPoints,
  centerOfPoints,
  toPixel,
  LEFT_EYE_INDICES,
  RIGHT_EYE_INDICES,
  NOSE_INDICES,
  MOUTH_INDICES,
  CHIN_TIP,
  FOREHEAD_TOP,
  HEAD_TOP_MULTIPLIER,
  type NormalizedLandmark,
} from "@/lib/mediapipe";
import { getSafeSpec } from "@/lib/specs";

/* ----------------------------------------------------------------------- */

export interface ClientDetectionResult {
  faceBox: { x: number; y: number; width: number; height: number } | null;
  eyeCenter: { x: number; y: number } | null;
  chinY: number | null;
  topOfHeadY: number | null;
  imageDimensions: { width: number; height: number };
  faceCount: number;
  eyeLevelPct: number | null;
  headSizePct: number | null;
  orientationRatio: number | null;
  brightness: number;
}

interface Feedback {
  type: "success" | "warning" | "error";
  message: string;
}

interface Props {
  file: File;
  documentType: string;
  targetBackground: string;
  onDetectionComplete: (
    file: File,
    detection: ClientDetectionResult,
    feedbacks: Feedback[],
  ) => void;
  onCancel: () => void;
}

const STEP_LABELS = [
  "Loading image...",
  "Loading face AI...",
  "Detecting face...",
  "Analyzing results...",
  "Done!",
];

export default function ClientFaceDetector({
  file,
  documentType,
  targetBackground,
  onDetectionComplete,
  onCancel,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayCanvasRef = useRef<HTMLCanvasElement>(null);

  const [loading, setLoading] = useState(true);
  const [stepIndex, setStepIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [showCancel, setShowCancel] = useState(false);

  const animFrameRef = useRef<number | null>(null);
  const isMountedRef = useRef(true);

  useEffect(() => {
    const t = setTimeout(() => setShowCancel(true), 2000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      if (animFrameRef.current !== null) {
        cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = null;
      }
    };
  }, []);

  /* ======================= FAST BRIGHTNESS SAMPLER ====================== */

  function fastBrightness(ctx: CanvasRenderingContext2D, w: number, h: number) {
    const data = ctx.getImageData(0, 0, w, h).data;
    let sum = 0;
    let count = 0;
    for (let i = 0; i < data.length; i += 40) {
      sum += (data[i] + data[i + 1] + data[i + 2]) / 3;
      count++;
    }
    return sum / count;
  }

  /* ========================== MAIN PIPELINE ============================= */

  const runDetection = useCallback(async () => {
    try {
      if (!isMountedRef.current) return;

      setLoading(true);
      setStepIndex(0);
      setProgress(5);

      const img = new Image();
      const objectUrl = URL.createObjectURL(file);
      img.src = objectUrl;
      await img.decode();
      URL.revokeObjectURL(objectUrl);

      if (!isMountedRef.current) return;

      const canvas = canvasRef.current!;
      const overlay = overlayCanvasRef.current!;
      const ctx = canvas.getContext("2d", { willReadFrequently: true })!;

      const max = 560;
      const scale = Math.min(max / img.width, max / img.height, 1);

      const drawW = Math.round(img.width * scale);
      const drawH = Math.round(img.height * scale);

      canvas.width = overlay.width = drawW;
      canvas.height = overlay.height = drawH;

      ctx.drawImage(img, 0, 0, drawW, drawH);

      await new Promise((r) => setTimeout(r, 100));

      if (!isMountedRef.current) return;

      setProgress(20);
      setStepIndex(1);

      const avgBrightness = fastBrightness(ctx, drawW, drawH);

      const landmarker = await getMediaPipeLandmarker();

      if (!isMountedRef.current) return;

      setProgress(45);
      setStepIndex(2);

      if (canvas.width === 0 || canvas.height === 0) {
        throw new Error("Canvas preparation failed - zero dimensions");
      }

      const result = landmarker.detect(canvas);
      const detections = result.faceLandmarks;

      if (!isMountedRef.current) return;

      setProgress(75);
      setStepIndex(3);

      const localFeedbacks: Feedback[] = [];

      if (avgBrightness < 80)
        localFeedbacks.push({ type: "warning", message: "Image appears too dark" });
      else if (avgBrightness > 230)
        localFeedbacks.push({ type: "warning", message: "Image appears overexposed" });
      else
        localFeedbacks.push({ type: "success", message: "Good lighting detected" });

      let faceBox = null,
        eyeCenter = null,
        chinY = null,
        topOfHeadY = null;
      let eyeLevelPct = null,
        headSizePct = null,
        orientationRatio = null;

      if (detections.length === 0) {
        localFeedbacks.push({ type: "error", message: "No face detected — try a clearer photo" });
      } else if (detections.length > 1) {
        localFeedbacks.push({ type: "error", message: `${detections.length} faces detected — only 1 allowed` });
      }

      if (detections.length === 1) {
        const landmarks = detections[0];
        const box = computeFaceBox(landmarks, drawW, drawH);

        faceBox = {
          x: box.x / scale,
          y: box.y / scale,
          width: box.width / scale,
          height: box.height / scale,
        };

        const leftEyePoints = getPoints(landmarks, LEFT_EYE_INDICES, drawW, drawH);
        const rightEyePoints = getPoints(landmarks, RIGHT_EYE_INDICES, drawW, drawH);
        const leftCenter = centerOfPoints(leftEyePoints);
        const rightCenter = centerOfPoints(rightEyePoints);

        const eyeY = (leftCenter.y + rightCenter.y) / 2;
        const eyeX = (leftCenter.x + rightCenter.x) / 2;

        eyeCenter = { x: eyeX / scale, y: eyeY / scale };

        const chinPt = toPixel(landmarks[CHIN_TIP], drawW, drawH);
        const foreheadPt = toPixel(landmarks[FOREHEAD_TOP], drawW, drawH);

        chinY = chinPt.y / scale;
        topOfHeadY = foreheadPt.y / scale;

        const faceH = chinY - topOfHeadY;
        const estimatedFullHeadH = faceH * HEAD_TOP_MULTIPLIER;

        eyeLevelPct = ((img.height - eyeY / scale) / img.height) * 100;
        headSizePct = (estimatedFullHeadH / img.height) * 100;

        const leftDist = leftCenter.x - box.x;
        const rightDist = box.x + box.width - rightCenter.x;
        const minDist = Math.min(leftDist, rightDist);
        orientationRatio = minDist > 0 ? Math.max(leftDist, rightDist) / minDist : 999;

        const headTilt = computeTiltAngle(landmarks, drawW, drawH);
        const absHeadTilt = Math.abs(headTilt);

        if (absHeadTilt > 3) {
          localFeedbacks.push({
            type: "warning",
            message: `Head tilt detected (${absHeadTilt.toFixed(1)}°)`,
          });
        }

        const bodyTilt = detectBodyTilt(landmarks, drawW, drawH);
        if (bodyTilt.isTilted) {
          localFeedbacks.push({ type: "warning", message: bodyTilt.description });
        }

        localFeedbacks.push({ type: "success", message: "Face detected successfully" });

        const spec = getSafeSpec(documentType);
        const minEye = Number(spec.eye_min_pct) || 56;
        const maxEye = Number(spec.eye_max_pct) || 69;
        const minHead = Number(spec.head_min_pct) || 50;
        const maxHead = Number(spec.head_max_pct) || 69;

        if (eyeLevelPct >= minEye && eyeLevelPct <= maxEye)
          localFeedbacks.push({ type: "success", message: `Eye level: ${eyeLevelPct.toFixed(1)}% ✓` });
        else
          localFeedbacks.push({ type: "warning", message: `Eye level: ${eyeLevelPct.toFixed(1)}% (target: ${minEye}–${maxEye}%)` });

        if (headSizePct >= minHead && headSizePct <= maxHead)
          localFeedbacks.push({ type: "success", message: `Head size: ${headSizePct.toFixed(1)}% ✓` });
        else
          localFeedbacks.push({ type: "warning", message: `Head size: ${headSizePct.toFixed(1)}% (target: ${minHead}–${maxHead}%)` });

        if (orientationRatio <= 2.0)
          localFeedbacks.push({ type: "success", message: "Frontal orientation ✓" });
        else
          localFeedbacks.push({ type: "warning", message: "Face may not be facing camera directly" });

        setFeedbacks(localFeedbacks);
        setProgress(90);

        const tesselation = FaceLandmarker.FACE_LANDMARKS_TESSELATION ?? [];
        const startTime = performance.now();
        const duration = 3000;

        const animateMesh = (now: number) => {
          if (!isMountedRef.current) return;
          const elapsed = now - startTime;
          const animProgress = Math.min(elapsed / duration, 1);

          if (overlayCanvasRef.current && box && landmarks) {
            drawOverlay(overlayCanvasRef.current, box, landmarks, drawW, drawH, animProgress, tesselation);
          }

          if (animProgress < 1) {
            animFrameRef.current = requestAnimationFrame(animateMesh);
          }
        };
        animFrameRef.current = requestAnimationFrame(animateMesh);

        await new Promise<void>((resolve) => {
          const timeout = setTimeout(resolve, duration);
          void timeout;
        });

        if (!isMountedRef.current) return;
      } else {
        await new Promise<void>((r) => setTimeout(r, 1000));
        if (!isMountedRef.current) return;
      }

      setFeedbacks(localFeedbacks);
      setProgress(100);
      setStepIndex(4);
      setLoading(false);

      const detectionResult: ClientDetectionResult = {
        faceBox,
        eyeCenter,
        chinY,
        topOfHeadY,
        imageDimensions: { width: img.width, height: img.height },
        faceCount: detections.length,
        eyeLevelPct,
        headSizePct,
        orientationRatio,
        brightness: avgBrightness,
      };

      await new Promise<void>((r) => setTimeout(r, 500));
      if (!isMountedRef.current) return;

      onDetectionComplete(file, detectionResult, localFeedbacks);
    } catch (err: any) {
      console.error(err);
      if (!isMountedRef.current) return;

      const errorMessage = err?.message || "Processing failed — please try again";

      setFeedbacks([{ type: "error", message: errorMessage }]);
      onDetectionComplete(
        file,
        {
          faceBox: null,
          eyeCenter: null,
          chinY: null,
          topOfHeadY: null,
          imageDimensions: { width: 0, height: 0 },
          faceCount: 0,
          eyeLevelPct: null,
          headSizePct: null,
          orientationRatio: null,
          brightness: 0,
        },
        [{ type: "error", message: errorMessage }],
      );
    } finally {
      if (isMountedRef.current) {
        setLoading(false);
      }
    }
  }, [file, documentType, onDetectionComplete]);

  /* ========================= OVERLAY DRAWING =========================== */

  function drawOverlay(
    canvasEl: HTMLCanvasElement,
    box: { x: number; y: number; width: number; height: number },
    landmarks: NormalizedLandmark[],
    w: number,
    h: number,
    animProgress: number = 1,
    tesselation: ReadonlyArray<{ start: number; end: number }>,
  ) {
    if (!box || !landmarks || !canvasEl) return;
    const ctx = canvasEl.getContext("2d", { willReadFrequently: true })!;
    ctx.clearRect(0, 0, w, h);

    ctx.save();
    ctx.strokeStyle = "rgba(163, 230, 53, 0.45)";
    ctx.lineWidth = 0.8;
    ctx.setLineDash([1, 2.5]);
    ctx.beginPath();

    const countToDraw = Math.floor(tesselation.length * animProgress);
    for (let i = 0; i < countToDraw; i++) {
      const conn = tesselation[i];
      const p1 = landmarks[conn.start];
      const p2 = landmarks[conn.end];
      if (p1 && p2) {
        ctx.moveTo(p1.x * w, p1.y * h);
        ctx.lineTo(p2.x * w, p2.y * h);
      }
    }
    ctx.stroke();
    ctx.restore();

    const allPointIndices = [
      ...LEFT_EYE_INDICES,
      ...RIGHT_EYE_INDICES,
      ...NOSE_INDICES,
      ...MOUTH_INDICES,
    ];
    const subsetCount = Math.floor(allPointIndices.length * animProgress);
    const subsetIndices = allPointIndices.slice(0, subsetCount);
    const allPoints = getPoints(landmarks, subsetIndices, w, h);

    ctx.save();
    for (const pt of allPoints) {
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, 1.5, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(163, 230, 53, 0.9)";
      ctx.fill();
    }
    ctx.restore();

    if (animProgress > 0.6) {
      const guideAlpha = Math.min((animProgress - 0.6) * 2.5, 1);

      const leftEyePoints = getPoints(landmarks, LEFT_EYE_INDICES, w, h);
      const rightEyePoints = getPoints(landmarks, RIGHT_EYE_INDICES, w, h);
      const leftCenter = centerOfPoints(leftEyePoints);
      const rightCenter = centerOfPoints(rightEyePoints);
      const eyeY = (leftCenter.y + rightCenter.y) / 2;

      ctx.save();
      ctx.setLineDash([5, 3]);
      ctx.strokeStyle = `rgba(37, 99, 235, ${guideAlpha})`;
      ctx.lineWidth = 3.0;
      ctx.shadowBlur = 8;
      ctx.shadowColor = `rgba(0,0,0,${0.6 * guideAlpha})`;
      ctx.beginPath();
      ctx.moveTo(0, eyeY);
      ctx.lineTo(w, eyeY);
      ctx.stroke();

      ctx.fillStyle = `rgba(37, 99, 235, ${guideAlpha})`;
      ctx.font = "bold 14px system-ui, -apple-system, sans-serif";
      ctx.fillText("EYE LEVEL", 12, eyeY - 10);
      ctx.restore();

      ctx.save();
      ctx.setLineDash([4, 4]);
      ctx.strokeStyle = `rgba(37, 99, 235, ${0.8 * guideAlpha})`;
      ctx.lineWidth = 2.0;
      ctx.shadowBlur = 6;
      ctx.shadowColor = `rgba(0,0,0,${0.5 * guideAlpha})`;
      ctx.strokeRect(box.x, box.y, box.width, box.height);
      ctx.restore();
    }

    const currentLeftEye = getPoints(landmarks, LEFT_EYE_INDICES, w, h);
    const currentRightEye = getPoints(landmarks, RIGHT_EYE_INDICES, w, h);
    const lCenter = centerOfPoints(currentLeftEye);
    const rCenter = centerOfPoints(currentRightEye);
    const tiltAngle = computeTiltAngle(landmarks, w, h);

    if (Math.abs(tiltAngle) > 2) {
      ctx.save();
      ctx.strokeStyle = "rgba(251, 191, 36, 0.8)";
      ctx.lineWidth = 1.5;
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.moveTo(lCenter.x, lCenter.y);
      ctx.lineTo(rCenter.x, rCenter.y);
      ctx.stroke();
      ctx.fillStyle = "rgba(251, 191, 36, 0.9)";
      ctx.font = "bold 9px system-ui";
      ctx.fillText(`TILT: ${Math.abs(tiltAngle).toFixed(1)}°`, rCenter.x + 6, rCenter.y - 4);
      ctx.restore();
    }
  }

  useEffect(() => {
    runDetection();
    return () => {
      if (animFrameRef.current !== null) {
        cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = null;
      }
    };
  }, [runDetection]);

  /* ============================== RENDER =============================== */

  return (
    <div className="flex flex-col md:flex-row gap-3 items-stretch">

      {/* ── Canvas (image + overlay) ── */}
      <div className="relative bg-gray-900 rounded-2xl overflow-hidden flex items-center justify-center min-h-[260px] md:min-h-[300px] flex-1">

        {/* Loading overlay */}
        {loading && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-gray-900/85 backdrop-blur-sm">

            {/* Spinner */}
            <div className="relative w-12 h-12 mb-4">
              <div className="absolute inset-0 border-[3px] border-white/10 rounded-full" />
              <div className="absolute inset-0 border-[3px] border-transparent border-t-blue-500 rounded-full animate-spin" />
              <div
                className="absolute inset-2 border-[3px] border-transparent border-b-indigo-400 rounded-full animate-spin"
                style={{ animationDirection: "reverse", animationDuration: "0.8s" }}
              />
            </div>

            {/* Step label */}
            <p className="text-white text-[13px] font-semibold tracking-wide mb-3">
              {STEP_LABELS[stepIndex]}
            </p>

            {/* Step dots */}
            <div className="flex items-center gap-1.5 mb-3">
              {STEP_LABELS.slice(0, 4).map((_, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <div
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                      i < stepIndex
                        ? "bg-blue-400"
                        : i === stepIndex
                          ? "bg-blue-500 scale-125 animate-pulse"
                          : "bg-gray-600"
                    }`}
                  />
                  {i < 3 && (
                    <div
                      className={`w-4 h-px transition-colors duration-300 ${
                        i < stepIndex ? "bg-blue-400/50" : "bg-gray-700"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Progress bar */}
            <div className="w-48 h-1 bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-600 to-indigo-500 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Canvases */}
        <div className="relative inline-block">
          <canvas
            ref={canvasRef}
            className="max-w-full h-auto object-contain shadow-2xl"
          />
          <canvas
            ref={overlayCanvasRef}
            className="absolute top-0 left-0 max-w-full h-auto object-contain pointer-events-none"
          />
        </div>
      </div>

      {/* ── Feedback panel ── */}
      <div className="flex flex-col md:w-60 lg:w-64 shrink-0 bg-white/90 backdrop-blur-xl border border-slate-200/80 rounded-2xl overflow-hidden shadow-md">

        {/* Panel header */}
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-100">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest">
            Analysis
          </span>
          {loading ? (
            <span className="flex items-center gap-1.5 text-[10px] font-semibold px-2.5 py-1 bg-blue-50 text-blue-600 rounded-full">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse inline-block" />
              Scanning
            </span>
          ) : (
            <span className="flex items-center gap-1.5 text-[10px] font-semibold px-2.5 py-1 bg-emerald-50 text-emerald-600 rounded-full">
              <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              Complete
            </span>
          )}
        </div>

        {/* Feedback rows — compact, no heavy per-item cards */}
        <div className="flex flex-col p-2.5 gap-0.5 flex-1 overflow-y-auto">
          {feedbacks.length > 0 ? (
            feedbacks.map((fb, i) => (
              <div
                key={i}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-[12px] font-medium leading-snug ${
                  fb.type === "success"
                    ? "bg-emerald-50 text-emerald-800"
                    : fb.type === "warning"
                      ? "bg-amber-50 text-amber-800"
                      : "bg-red-50 text-red-800"
                }`}
                style={{
                  animationFillMode: "both",
                  animationDelay: `${i * 80}ms`,
                }}
              >
                {/* Status icon */}
                <div className="shrink-0">
                  {fb.type === "success" ? (
                    <svg className="w-3.5 h-3.5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ) : fb.type === "warning" ? (
                    <svg className="w-3.5 h-3.5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  ) : (
                    <svg className="w-3.5 h-3.5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  )}
                </div>
                <span>{fb.message}</span>
              </div>
            ))
          ) : (
            /* Empty / waiting state */
            <div className="flex flex-col items-center justify-center flex-1 min-h-[100px] opacity-50">
              <div className="w-6 h-6 border-2 border-slate-200 border-t-slate-400 rounded-full animate-spin mb-2" />
              <p className="text-[11px] text-slate-400 font-medium">Waiting for AI...</p>
            </div>
          )}
        </div>

        {/* Cancel button — only while loading and after delay */}
        {loading && showCancel && (
          <div className="px-3 pb-3 pt-1">
            <button
              onClick={onCancel}
              className="w-full px-4 py-2 text-[12px] font-semibold text-slate-400 hover:text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-xl transition-all"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}