/**
 * lib/mediapipe.ts
 * ─────────────────────────────────────────────────────
 * Shared MediaPipe Face Landmarker singleton + helpers.
 * Replaces all @vladmandic/face-api usage across the app.
 * ─────────────────────────────────────────────────────
 */

import {
  FaceLandmarker,
  PoseLandmarker,
  FilesetResolver,
  type FaceLandmarkerResult,
  type PoseLandmarkerResult,
  type NormalizedLandmark,
} from "@mediapipe/tasks-vision";

/* ─── Biometric Constants ─── */
export const HEAD_TOP_MULTIPLIER = 1.34;
export const CENTERING_THRESHOLD = 8;
export const TILT_WARN_THRESHOLD = 3;
export const TILT_FAIL_THRESHOLD = 8;

/* ─── Singleton cache ─── */

let landmarkerPromise: Promise<FaceLandmarker> | null = null;

/**
 * Returns a cached FaceLandmarker instance.
 * Uses IMAGE running mode for static photo analysis.
 * Model is loaded from Google's CDN (~2 MB, cached by browser).
 */
export async function getMediaPipeLandmarker(): Promise<FaceLandmarker> {
  if (!landmarkerPromise) {
    landmarkerPromise = (async () => {
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.34/wasm"
      );

      // Console capture handles to ensure they're always restorable
      const _info = console.info;
      const _warn = console.warn;
      try {
        // Suppress the internal WASM "INFO: Created TensorFlow Lite XNNPACK
        // delegate for CPU" log — it's emitted by the TFLite binary.
        const suppress = (origFn: Function) => (...args: unknown[]) => {
          const msg = String(args[0] ?? "");
          if (msg.includes("TensorFlow Lite") || msg.includes("XNNPACK")) return;
          origFn.apply(console, args);
        };
        console.info = suppress(_info) as typeof console.info;
        console.warn = suppress(_warn) as typeof console.warn;

        const landmarkerInstPromise = FaceLandmarker.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath:
              "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
            delegate: "CPU",
          },
          runningMode: "IMAGE",
          numFaces: 5, // detect up to 5 to catch multi-face cases
          outputFaceBlendshapes: false,
          outputFacialTransformationMatrixes: false,
        });

        // 45s timeout for mobile/slow networks
        const INIT_TIMEOUT_MS = 45000;
        const timeoutPromise = new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error("MediaPipe initialization timed out")), INIT_TIMEOUT_MS)
        );

        return await Promise.race([landmarkerInstPromise, timeoutPromise]);
      } finally {
        // Always restore original console methods
        console.info = _info;
        console.warn = _warn;
      }
    })().catch((err) => {
      landmarkerPromise = null;
      throw err;
    });
  }
  return landmarkerPromise;
}



/* ─── MediaPipe Landmark Indices (478-point mesh) ─── */

// Left eye contour (viewer's right, person's left)
export const LEFT_EYE_INDICES = [33, 160, 158, 133, 153, 144];
// Right eye contour (viewer's left, person's right)
export const RIGHT_EYE_INDICES = [362, 385, 387, 263, 373, 380];
// Left iris center
export const LEFT_IRIS_CENTER = 468;
// Right iris center
export const RIGHT_IRIS_CENTER = 473;
// Chin tip (bottom of jaw)
export const CHIN_TIP = 152;
// Nose tip
export const NOSE_TIP = 1;
// Forehead top
export const FOREHEAD_TOP = 10;
// Mouth key points (for overlay drawing)
export const MOUTH_INDICES = [61, 291, 0, 17, 13, 14, 78, 308];
// Nose key points (for overlay drawing)
export const NOSE_INDICES = [1, 2, 98, 327, 168];

// Full jaw outline — 17 points matching face-api's getJawOutline()
// MediaPipe silhouette contour mapped to approximate 68-landmark jaw order
export const JAW_OUTLINE_INDICES = [
  10, 338, 297, 332, 284, 251, 389, 356, 454,   // right side (person's left)
  152,                                             // chin center
  234, 127, 162, 21, 54, 103, 67,                 // left side (person's right)
];

/* ─── Helper: Convert normalized landmarks to pixel coordinates ─── */

export interface PixelPoint {
  x: number;
  y: number;
}

/**
 * Convert normalized (0-1) landmark to pixel coordinates.
 */
export function toPixel(
  lm: NormalizedLandmark,
  w: number,
  h: number,
): PixelPoint {
  return { x: lm.x * w, y: lm.y * h };
}

/**
 * Get an array of pixel‐coordinate points for given indices.
 */
export function getPoints(
  landmarks: NormalizedLandmark[],
  indices: number[],
  w: number,
  h: number,
): PixelPoint[] {
  return indices.map((i) => toPixel(landmarks[i], w, h));
}

/**
 * Compute the average center of a set of pixel points.
 */
export function centerOfPoints(points: PixelPoint[]): PixelPoint {
  const sum = points.reduce(
    (acc, p) => ({ x: acc.x + p.x, y: acc.y + p.y }),
    { x: 0, y: 0 },
  );
  return { x: sum.x / points.length, y: sum.y / points.length };
}

/* ─── Tilt angle calculation ─── */

/**
 * Compute head tilt angle in degrees using eye centers.
 * Positive = tilted clockwise, negative = counter-clockwise.
 * Uses atan2(dy, dx) with smoothing-ready output.
 */
export function computeTiltAngle(
  landmarks: NormalizedLandmark[],
  w: number,
  h: number,
): number {
  const leftEyePoints = getPoints(landmarks, LEFT_EYE_INDICES, w, h);
  const rightEyePoints = getPoints(landmarks, RIGHT_EYE_INDICES, w, h);
  const leftCenter = centerOfPoints(leftEyePoints);
  const rightCenter = centerOfPoints(rightEyePoints);

  const dy = rightCenter.y - leftCenter.y;
  const dx = rightCenter.x - leftCenter.x;
  const angleRad = Math.atan2(dy, dx);
  return (angleRad * 180) / Math.PI; // degrees
}

/* ─── Face bounding box from landmarks ─── */

export interface FaceBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

/**
 * Compute a tight bounding box from all 478 face landmarks.
 */
export function computeFaceBox(
  landmarks: NormalizedLandmark[],
  w: number,
  h: number,
): FaceBox {
  let minX = Infinity,
    minY = Infinity,
    maxX = -Infinity,
    maxY = -Infinity;

  for (const lm of landmarks) {
    const px = lm.x * w;
    const py = lm.y * h;
    if (px < minX) minX = px;
    if (py < minY) minY = py;
    if (px > maxX) maxX = px;
    if (py > maxY) maxY = py;
  }

  return {
    x: minX,
    y: minY,
    width: maxX - minX,
    height: maxY - minY,
  };
}

/* ─── Body / shoulder tilt detection ─── */

/**
 * Detect if the body/shoulders appear tilted by checking the 
 * vertical symmetry of the face bounding box relative to image center,
 * combined with face mesh asymmetry.
 * Returns a human-readable assessment.
 */
export function detectBodyTilt(
  landmarks: NormalizedLandmark[],
  w: number,
  h: number,
): { isTilted: boolean; description: string; angleDeg: number } {
  // Use the face contour (jaw outline) to detect head/body rotation
  const jawPoints = getPoints(landmarks, JAW_OUTLINE_INDICES, w, h);
  const leftJaw = jawPoints.slice(0, 8);   // right side of face (person's left)
  const rightJaw = jawPoints.slice(9, 17);  // left side of face (person's right)

  // Compute average width from center to each side
  const chin = jawPoints[9]; // chin center point
  const avgLeftDist = leftJaw.reduce((s, p) => s + Math.abs(p.x - chin.x), 0) / leftJaw.length;
  const avgRightDist = rightJaw.reduce((s, p) => s + Math.abs(p.x - chin.x), 0) / rightJaw.length;

  const ratio = Math.min(avgLeftDist, avgRightDist) > 0
    ? Math.max(avgLeftDist, avgRightDist) / Math.min(avgLeftDist, avgRightDist)
    : 999;

  // Also compute the head tilt angle
  const tiltAngle = computeTiltAngle(landmarks, w, h);
  const absTilt = Math.abs(tiltAngle);

  const isTilted = ratio > 1.8 || absTilt > 5;

  let description = "Face is straight and centered";
  if (ratio > 2.5) description = "Face appears significantly rotated to one side";
  else if (ratio > 1.8) description = "Face may not be directly facing camera";

  if (absTilt > 5) {
    description += absTilt > 10
      ? ` — head tilted ${absTilt.toFixed(1)}°`
      : ` — slight head tilt (${absTilt.toFixed(1)}°)`;
  }

  return { isTilted, description, angleDeg: tiltAngle };
}

/* ─── Angle smoothing (reduces jitter for real-time use) ─── */

const SMOOTHING_WINDOW = 5;
const angleHistory: number[] = [];

/**
 * Smooth tilt angle using a rolling average.
 * Useful for camera/video mode to reduce jitter.
 */
export function smoothAngle(rawAngle: number): number {
  angleHistory.push(rawAngle);
  if (angleHistory.length > SMOOTHING_WINDOW) {
    angleHistory.shift();
  }
  return angleHistory.reduce((a, b) => a + b, 0) / angleHistory.length;
}

/**
 * Reset the smoothing history (e.g., when switching photos).
 */
export function resetSmoothing(): void {
  angleHistory.length = 0;
}

/* ─── Re-export types for consumers ─── */

export { FaceLandmarker, PoseLandmarker };
export type { FaceLandmarkerResult, PoseLandmarkerResult, NormalizedLandmark };
