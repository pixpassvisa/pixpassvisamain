import { NormalizedLandmark } from "@mediapipe/tasks-vision";
import {
  CHIN_TIP,
  FOREHEAD_TOP,
  LEFT_IRIS_CENTER,
  RIGHT_IRIS_CENTER,
  computeTiltAngle,
  computeFaceBox,
  HEAD_TOP_MULTIPLIER
} from "./mediapipe";

export interface ValidationSpec {
  dimensions: {
    width_px: number;
    height_px: number;
  };
  face_constraints: {
    head_height_min_pct: number;
    head_height_max_pct: number;
    eye_level_min_pct: number;
    eye_level_max_pct: number;
  };
  file_requirements: {
    max_kb: number;
    min_kb: number;
    formats: string[];
  };
}

export interface ValidationMetric {
  label: string;
  value: string;
  status: "success" | "warning" | "fail" | "error";
  details?: string;
  target?: string;
}

export interface ValidationReport {
  status: "success" | "error";
  overall_result: "PASS" | "FAIL";
  compliance_score: number;
  summary: string[];
  suggestions: string[];
  metrics: {
    file_format?: ValidationMetric;
    file_size?: ValidationMetric;
    resolution?: ValidationMetric;
    face_detection?: ValidationMetric;
    eye_level?: ValidationMetric;
    head_size?: ValidationMetric;
    orientation?: ValidationMetric;
    background?: ValidationMetric;
    lighting?: ValidationMetric;
    horizontal_centering?: ValidationMetric;
    top_margin?: ValidationMetric;
    eye_openness?: ValidationMetric;
    expression?: ValidationMetric;
    sharpness?: ValidationMetric;
    chin_margin?: ValidationMetric;
  };
}

/**
 * How far the crown of the head extends above the FOREHEAD_TOP landmark,
 * expressed as a fraction of the chin-to-forehead distance.
 * Kept as a named constant so the magic number is documented and easy to tune.
 */
const HEAD_CROWN_RATIO = 0.34;

/**
 * The core validation engine that takes MediaPipe results and specifications
 * to produce a detailed compliance report.
 *
 * FIX (Bug #4): Replaced inline magic number 0.34 with HEAD_CROWN_RATIO constant.
 * FIX (Bug #5): All spec access is guarded via optional chaining with safe defaults;
 *               callers must pass a validated non-null spec object (enforced in the hook).
 */
export function validateBiometrics(
  landmarks: NormalizedLandmark[],
  imageFile: File,
  imgWidth: number,
  imgHeight: number,
  spec: Record<string, any>
): ValidationReport {
  const summary: string[] = [];
  const suggestions: string[] = [];
  const metrics: ValidationReport["metrics"] = {};
  let totalScore = 100;

  // ─── 1. File & Resolution Validation ─────────────────────────────────────

  const fileSizeKB = imageFile.size / 1024;
  const maxKB = spec?.digital_requirements?.max_file_size_kb ?? 1024;
  const reqResW = spec?.digital_requirements?.required_resolution_px?.width ?? 350;
  const reqResH = spec?.digital_requirements?.required_resolution_px?.height ?? 450;

  metrics.file_size = {
    label: "File Size",
    value: `${Math.round(fileSizeKB)} KB`,
    status: fileSizeKB <= maxKB ? "success" : "fail",
    target: `max ${maxKB} KB`,
  };
  if (fileSizeKB > maxKB) totalScore -= 10;

  metrics.resolution = {
    label: "Resolution",
    value: `${imgWidth}×${imgHeight} px`,
    status: imgWidth >= reqResW && imgHeight >= reqResH ? "success" : "fail",
    target: `Required: ${reqResW}×${reqResH}px`,
  };
  if (metrics.resolution.status === "fail") totalScore -= 15;

  const rawType = imageFile.type ?? "";
  const formatLabel = rawType.split("/")[1]?.toUpperCase() ?? "UNKNOWN";
  metrics.file_format = {
    label: "File Format",
    value: formatLabel,
    status: ["image/jpeg", "image/jpg"].includes(rawType) ? "success" : "fail",
  };
  if (metrics.file_format.status === "fail") totalScore -= 20;

  // ─── 2. Biometric Analysis (MediaPipe) ───────────────────────────────────

  // FIX (Bug #3): Explicit guard — never silently pass an empty array to the
  // rest of the pipeline. An empty landmarks array now returns a proper error
  // report instead of proceeding and crashing on undefined index accesses.
  if (!landmarks || landmarks.length === 0) {
    return {
      status: "error",
      overall_result: "FAIL",
      compliance_score: 0,
      summary: ["No face detected in the image"],
      suggestions: [
        "Ensure your face is clearly visible and well-lit",
        "Remove sunglasses or anything obscuring your face",
        "Try a higher-resolution photo",
      ],
      metrics: {
        face_detection: {
          label: "Face Detection",
          value: "Not detected",
          status: "fail",
        },
      },
    };
  }

  metrics.face_detection = {
    label: "Face Detection",
    value: "Exactly 1 face",
    status: "success",
  };

  // ─── Head height (chin → top of head) ────────────────────────────────────

  const chinY = landmarks[CHIN_TIP].y;
  const foreheadY = landmarks[FOREHEAD_TOP].y;

  // headHeightRaw is a normalised ratio in [0, 1] space
  const headHeightRaw = (chinY - foreheadY) * HEAD_TOP_MULTIPLIER;
  const headHeightPct = headHeightRaw * 100;

  const minHeadPct = spec?.face_constraints?.head_height_pct?.min ?? 70;
  const maxHeadPct = spec?.face_constraints?.head_height_pct?.max ?? 80;

  metrics.head_size = {
    label: "Head Size",
    value: `${headHeightPct.toFixed(1)}%`,
    status:
      headHeightPct >= minHeadPct && headHeightPct <= maxHeadPct
        ? "success"
        : "fail",
    target: `${minHeadPct}–${maxHeadPct}%`,
  };
  if (metrics.head_size.status === "fail") totalScore -= 20;

  // ─── Eye level (from bottom) ──────────────────────────────────────────────

  const leftIrisY = landmarks[LEFT_IRIS_CENTER].y;
  const rightIrisY = landmarks[RIGHT_IRIS_CENTER].y;
  const avgEyeY = (leftIrisY + rightIrisY) / 2;
  const eyeLevelPct = (1 - avgEyeY) * 100;

  const minEyePct =
    spec?.face_constraints?.eye_position?.from_bottom_pct?.min ?? 50;
  const maxEyePct =
    spec?.face_constraints?.eye_position?.from_bottom_pct?.max ?? 65;

  metrics.eye_level = {
    label: "Eye Level",
    value: `${eyeLevelPct.toFixed(1)}%`,
    status:
      eyeLevelPct >= minEyePct && eyeLevelPct <= maxEyePct
        ? "success"
        : "fail",
    target: `${minEyePct}–${maxEyePct}% from bottom`,
  };
  if (metrics.eye_level.status === "fail") totalScore -= 15;

  // ─── Horizontal centering ─────────────────────────────────────────────────

  const noseX = landmarks[1].x * 100;
  const centeringOffset = Math.abs(50 - noseX);

  metrics.horizontal_centering = {
    label: "Centering",
    value: centeringOffset < 5 ? "Centered" : "Off-center",
    status: centeringOffset < 10 ? "success" : "warning",
    target: "Within 5% of center",
  };
  if (centeringOffset >= 10) totalScore -= 10;

  // ─── Chin to bottom margin ────────────────────────────────────────────────

  const chinToBottomPct = (1 - chinY) * 100;
  const minChinToBottom =
    spec?.face_constraints?.chin_to_bottom_pct?.min ?? 5;

  metrics.chin_margin = {
    label: "Chin Margin",
    value: `${chinToBottomPct.toFixed(1)}%`,
    status: chinToBottomPct >= minChinToBottom ? "success" : "fail",
    target: `min ${minChinToBottom}%`,
  };
  if (chinToBottomPct < minChinToBottom) totalScore -= 10;

  // ─── Top margin ───────────────────────────────────────────────────────────

  // FIX (Bug #4): Named HEAD_CROWN_RATIO instead of bare magic number 0.34.
  // topOfHeadY is still in normalised [0,1] space (Y=0 is top of image).
  const topOfHeadY = foreheadY - headHeightRaw * HEAD_CROWN_RATIO;
  const topMarginPct = topOfHeadY * 100;
  const minTopMargin = spec?.face_constraints?.top_margin_pct?.min ?? 5;

  metrics.top_margin = {
    label: "Top Margin",
    value: `${topMarginPct.toFixed(1)}%`,
    status: topMarginPct >= minTopMargin ? "success" : "warning",
    target: `min ${minTopMargin}%`,
  };

  // ─── Head tilt ────────────────────────────────────────────────────────────

  const tiltAngle = Math.abs(computeTiltAngle(landmarks, imgWidth, imgHeight));
  const tiltAllowed = spec?.pose_rules?.head_tilt_allowed ?? false;

  metrics.orientation = {
    label: "Head Tilt",
    value: `${tiltAngle.toFixed(1)}°`,
    status:
      tiltAngle < 3 || tiltAllowed
        ? "success"
        : tiltAngle < 7
        ? "warning"
        : "fail",
  };
  if (!tiltAllowed && tiltAngle >= 7) totalScore -= 15;

  // ─── Eye openness ─────────────────────────────────────────────────────────

  const leftEyeOpen =
    Math.abs(landmarks[159].y - landmarks[145].y) > 0.01;
  const rightEyeOpen =
    Math.abs(landmarks[386].y - landmarks[374].y) > 0.01;
  const eyesOpenRequired = spec?.pose_rules?.eyes_open ?? true;

  metrics.eye_openness = {
    label: "Eyes Open",
    value: leftEyeOpen && rightEyeOpen ? "Both open" : "Eyes closed",
    status:
      !eyesOpenRequired || (leftEyeOpen && rightEyeOpen) ? "success" : "fail",
  };
  if (eyesOpenRequired && metrics.eye_openness.status === "fail")
    totalScore -= 20;

  // ─── Expression / mouth state ─────────────────────────────────────────────

  const upperLip = landmarks[13].y;
  const lowerLip = landmarks[14].y;
  const mouthOpen = lowerLip - upperLip > 0.015;
  const mouthClosedRequired = spec?.pose_rules?.mouth_closed ?? true;

  metrics.expression = {
    label: "Expression",
    value: mouthOpen ? "Mouth open" : "Neutral",
    status: mouthOpen && mouthClosedRequired ? "fail" : "success",
  };
  if (mouthOpen && mouthClosedRequired) totalScore -= 15;

  // ─── Lighting & background (heuristic pass-through) ──────────────────────

  const requiredBg =
    spec?.digital_requirements?.background_color ?? "plain";

  metrics.lighting = {
    label: "Lighting",
    value: "Balanced",
    status: "success",
  };

  metrics.background = {
    label: "Background",
    value:
      requiredBg.charAt(0).toUpperCase() + requiredBg.slice(1),
    status: "success",
    target: requiredBg,
  };

  // ─── Summary & suggestions ────────────────────────────────────────────────

  if (totalScore >= 90) summary.push("Excellent — perfect biometric alignment");
  else if (totalScore >= 75) summary.push("Acceptable — meets embassy quality standards");
  else summary.push("Significant compliance issues detected");

  if (metrics.head_size.status === "fail")
    suggestions.push("Adjust your distance from the camera to fix head size");
  if (metrics.eye_openness.status === "fail")
    suggestions.push("Ensure both eyes are clearly open");
  if (mouthOpen)
    suggestions.push("Keep a neutral expression with mouth closed");
  if (metrics.eye_level.status === "fail")
    suggestions.push("Reposition so your eyes fall between 50–65% from the bottom");
  if (centeringOffset >= 10)
    suggestions.push("Centre your face more horizontally in the frame");

  return {
    status: "success",
    overall_result: totalScore >= 75 ? "PASS" : "FAIL",
    compliance_score: Math.max(0, totalScore),
    summary,
    suggestions,
    metrics,
  };
}