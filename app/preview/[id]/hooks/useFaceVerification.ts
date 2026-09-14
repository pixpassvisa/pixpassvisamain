import { useState, useCallback, useRef, useEffect } from "react";
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
  JAW_OUTLINE_INDICES,
  CHIN_TIP,
  FOREHEAD_TOP,
  HEAD_TOP_MULTIPLIER,
  TILT_WARN_THRESHOLD,
  TILT_FAIL_THRESHOLD,
  type NormalizedLandmark,
} from "@/lib/mediapipe";
import { getSpecById, type CountrySpec } from "@/lib/specs";

export interface ComplianceCheck {
  name: string;
  status: "PASS" | "WARN" | "FAIL";
  value: string;
  detail: string;
}

/* ── Overlay drawing ── */
export function drawOverlay(
  canvas: HTMLCanvasElement,
  box: { x: number; y: number; width: number; height: number },
  landmarks: NormalizedLandmark[],
  imgW: number,
  imgH: number,
  spec?: CountrySpec | undefined,
  PAD = 60,
) {
  const W = imgW + PAD * 2;
  const H = imgH + PAD * 2;
  canvas.width = W;
  canvas.height = H;

  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return;
  const _ctx: CanvasRenderingContext2D = ctx;
  _ctx.clearRect(0, 0, W, H);

  const PRIMARY = "rgba(20, 184, 166, 0.95)";
  const PRIMARY_DASH = "rgba(20, 184, 166, 0.5)";
  const FONT_B = "bold 18px system-ui, -apple-system, sans-serif";
  const FONT_S = "10px system-ui, -apple-system, sans-serif";
  const TICK = 6;
  const ARROW_SZ = 5;

  // ── Translate all landmark coords by PAD offset ──
  const tx = (x: number) => x + PAD;
  const ty = (y: number) => y + PAD;

  // ── Landmark positions ──
  const leftEyePoints  = getPoints(landmarks, LEFT_EYE_INDICES,  imgW, imgH);
  const rightEyePoints = getPoints(landmarks, RIGHT_EYE_INDICES, imgW, imgH);
  const leftCenter  = centerOfPoints(leftEyePoints);
  const rightCenter = centerOfPoints(rightEyePoints);
  const eyeY = ty((leftCenter.y + rightCenter.y) / 2);

  const chinPt     = toPixel(landmarks[CHIN_TIP],     imgW, imgH);
  const foreheadPt = toPixel(landmarks[FOREHEAD_TOP], imgW, imgH);
  const chinY  = ty(chinPt.y);
  const faceH  = chinPt.y - foreheadPt.y;

  // ── CountrySpec-aware multiplier & target ranges ──
  const multiplier        = Number(spec?.head_top_multiplier) || HEAD_TOP_MULTIPLIER;
  const estimatedFullHeadH = faceH * multiplier;
  const trueTopOfHead     = ty(Math.max(0, chinPt.y - estimatedFullHeadH));

  const targetH_mm = Number(spec?.height_mm) || 51;
  const targetW_mm = Number(spec?.width_mm)  || 51;

  // Per-axis pixels-per-mm so non-square specs work correctly
  const PPM_H = imgH / targetH_mm;
  const PPM_W = imgW / targetW_mm;

  const faceHeightMm   = estimatedFullHeadH / PPM_H;
  const headHeightPct  = (estimatedFullHeadH / imgH) * 100;
  const eyeFromBotPx   = imgH - (eyeY - PAD);
  const eyeFromBotMm   = eyeFromBotPx / PPM_H;
  const eyeFromBotPct  = (eyeFromBotPx / imgH) * 100;
  const frameWidthMm   = imgW / PPM_W;

  const minEye  = Number(spec?.eye_min_pct)  || 56;
  const maxEye  = Number(spec?.eye_max_pct)  || 69;
  const minHead = Number(spec?.head_min_pct) || 50;
  const maxHead = Number(spec?.head_max_pct) || 69;

  const boxX = tx(box.x);

  // ────────────────────────────────────────
  // Helpers
  // ────────────────────────────────────────
  function arrow(x1: number, y1: number, x2: number, y2: number) {
    const ang = Math.atan2(y2 - y1, x2 - x1);
    _ctx.beginPath();
    _ctx.moveTo(x1, y1);
    _ctx.lineTo(x2, y2);
    _ctx.stroke();
    for (const [px, py] of [[x2, y2], [x1, y1]] as [number, number][]) {
      const a = px === x2 ? ang : ang + Math.PI;
      _ctx.beginPath();
      _ctx.moveTo(px, py);
      _ctx.lineTo(px - ARROW_SZ * Math.cos(a - Math.PI / 6), py - ARROW_SZ * Math.sin(a - Math.PI / 6));
      _ctx.moveTo(px, py);
      _ctx.lineTo(px - ARROW_SZ * Math.cos(a + Math.PI / 6), py - ARROW_SZ * Math.sin(a + Math.PI / 6));
      _ctx.stroke();
    }
  }

  function tick(x: number, y: number, horiz = true) {
    _ctx.beginPath();
    if (horiz) { _ctx.moveTo(x - TICK / 2, y); _ctx.lineTo(x + TICK / 2, y); }
    else       { _ctx.moveTo(x, y - TICK / 2); _ctx.lineTo(x, y + TICK / 2); }
    _ctx.stroke();
  }

  function label(
    cx: number,
    cy: number,
    lines: string[],
    angle = 0,
    bg = "rgba(255,255,255,0.97)",
  ) {
    _ctx.save();
    _ctx.translate(cx, cy);
    _ctx.rotate(angle);
    _ctx.font = FONT_B;

    const LH = 14;
    const PADx = 5, PADy = 3;
    const maxW = Math.max(...lines.map((l, i) => {
      _ctx.font = i === 0 ? FONT_B : FONT_S;
      return _ctx.measureText(l).width;
    }));
    const totalH = lines.length * LH;
    const bx = -maxW / 2 - PADx;
    const by = -totalH / 2 - PADy;
    const bw = maxW + PADx * 2;
    const bh = totalH + PADy * 2;

    _ctx.fillStyle = bg;
    _ctx.shadowColor = "rgba(0,0,0,0.12)";
    _ctx.shadowBlur = 4;
    _ctx.beginPath();
    _ctx.roundRect(bx, by, bw, bh, 3);
    _ctx.fill();
    _ctx.shadowBlur = 0;

    _ctx.strokeStyle = "rgba(37,99,235,0.25)";
    _ctx.lineWidth = 1.5;
    _ctx.setLineDash([]);
    _ctx.beginPath();
    _ctx.roundRect(bx, by, bw, bh, 3);
    _ctx.stroke();

    lines.forEach((line, i) => {
      _ctx.font = i === 0 ? FONT_B : FONT_S;
      _ctx.fillStyle = i === 0 ? "#1a1a1a" : "#666";
      _ctx.textAlign = "center";
      _ctx.textBaseline = "middle";
      _ctx.fillText(line, 0, (i - (lines.length - 1) / 2) * LH);
    });
    _ctx.restore();
  }

  function dashed(x1: number, y1: number, x2: number, y2: number) {
    _ctx.save();
    _ctx.setLineDash([3, 3]);
    _ctx.strokeStyle = PRIMARY_DASH;
    _ctx.lineWidth = 0.8;
    _ctx.beginPath();
    _ctx.moveTo(x1, y1);
    _ctx.lineTo(x2, y2);
    _ctx.stroke();
    _ctx.restore();
  }

  // ────────────────────────────────────────
  // Target zones (drawn first, behind everything)
  // ────────────────────────────────────────

  // Eye target zone — shaded band inside photo area
  const eyeZoneYMin = PAD + imgH * (1 - maxEye / 100);
  const eyeZoneYMax = PAD + imgH * (1 - minEye / 100);
  _ctx.fillStyle = "rgba(16, 185, 129, 0.07)";
  _ctx.fillRect(PAD, eyeZoneYMin, imgW, eyeZoneYMax - eyeZoneYMin);
  _ctx.fillStyle = "rgba(16, 185, 129, 0.5)";
  _ctx.font = "bold 9px system-ui";
  _ctx.textAlign = "left";
  _ctx.fillText("EYE TARGET", PAD + 6, eyeZoneYMin + 11);

  // Head height target zone — right edge indicator bar
  const headBarX    = PAD + imgW - 5;
  const headZoneTop = PAD + imgH - imgH * (maxHead / 100);
  const headZoneBot = PAD + imgH - imgH * (minHead / 100);
  _ctx.strokeStyle = "rgba(245, 158, 11, 0.35)";
  _ctx.lineWidth = 4;
  _ctx.setLineDash([]);
  _ctx.beginPath();
  _ctx.moveTo(headBarX, headZoneTop);
  _ctx.lineTo(headBarX, headZoneBot);
  _ctx.stroke();
  _ctx.fillStyle = "rgba(245, 158, 11, 0.85)";
  _ctx.font = "bold 9px system-ui";
  _ctx.textAlign = "right";
  _ctx.fillText("HEAD", PAD + imgW - 8, headZoneTop - 4);

  // ────────────────────────────────────────
  // Thin border around photo area
  // ────────────────────────────────────────
  _ctx.strokeStyle = "rgba(200,200,200,0.6)";
  _ctx.lineWidth = 0.5;
  _ctx.setLineDash([]);
  _ctx.strokeRect(PAD, PAD, imgW, imgH);

  // ────────────────────────────────────────
  // 1. TOP — frame width arrow
  // ────────────────────────────────────────
  const TOP_Y = PAD / 2;
  _ctx.strokeStyle = PRIMARY;
  _ctx.lineWidth = 1.3;
  _ctx.setLineDash([]);

  tick(PAD, TOP_Y, false);
  tick(PAD + imgW, TOP_Y, false);
  arrow(PAD, TOP_Y, PAD + imgW, TOP_Y);
  label(W / 2, TOP_Y, [
    `${Math.round(frameWidthMm)} mm (${imgW} px)`,
    `Target: ${targetW_mm} mm`,
  ]);

  // ────────────────────────────────────────
  // 2. RIGHT — face / head height arrow
  // ────────────────────────────────────────
  const RIGHT_X = PAD + imgW + PAD / 4;
  _ctx.strokeStyle = PRIMARY;
  _ctx.lineWidth = 1.3;
  _ctx.setLineDash([]);

  dashed(PAD + imgW, trueTopOfHead, RIGHT_X - 4, trueTopOfHead);
  dashed(PAD + imgW, chinY, RIGHT_X - 4, chinY);

  tick(RIGHT_X, trueTopOfHead);
  tick(RIGHT_X, chinY);
  arrow(RIGHT_X, trueTopOfHead, RIGHT_X, chinY);
  label(
    RIGHT_X + PAD * 0.45,
    (trueTopOfHead + chinY) / 2,
    [
      `${faceHeightMm.toFixed(1)} mm`,
      `${Math.round(headHeightPct)}% (${minHead}–${maxHead}%)`,
    ],
    -Math.PI / 2,
  );

  // ────────────────────────────────────────
  // 3. LEFT — eye-line height arrow
  // ────────────────────────────────────────
  const LEFT_X = PAD / 1.2;
  _ctx.strokeStyle = PRIMARY;
  _ctx.lineWidth = 1.3;
  _ctx.setLineDash([]);

  dashed(PAD, eyeY, LEFT_X + 4, eyeY);

  tick(LEFT_X, eyeY);
  tick(LEFT_X, PAD + imgH);
  arrow(LEFT_X, eyeY, LEFT_X, PAD + imgH);
  label(
    LEFT_X - PAD * 0.45,
    (eyeY + PAD + imgH) / 2,
    [
      `${eyeFromBotMm.toFixed(1)} mm`,
      `${Math.round(eyeFromBotPct)}% (${minEye}–${maxEye}%)`,
    ],
    -Math.PI / 2,
  );

  // ────────────────────────────────────────
  // 4. Dashed crosshairs inside photo
  // ────────────────────────────────────────
  _ctx.save();
  _ctx.setLineDash([5, 4]);
  _ctx.strokeStyle = PRIMARY_DASH;
  _ctx.lineWidth = 0.9;
  // Vertical center
  _ctx.beginPath();
  _ctx.moveTo(W / 2, PAD);
  _ctx.lineTo(W / 2, PAD + imgH);
  _ctx.stroke();
  // Eye line
  _ctx.beginPath();
  _ctx.moveTo(PAD, eyeY);
  _ctx.lineTo(PAD + imgW, eyeY);
  _ctx.stroke();
  // Chin line
  _ctx.beginPath();
  _ctx.moveTo(PAD, chinY);
  _ctx.lineTo(PAD + imgW, chinY);
  _ctx.stroke();
  _ctx.restore();

  // ────────────────────────────────────────
  // 5. Head bounding box
  // ────────────────────────────────────────
  _ctx.save();
  _ctx.setLineDash([5, 4]);
  _ctx.strokeStyle = PRIMARY_DASH;
  _ctx.lineWidth = 1;
  _ctx.strokeRect(boxX - 4, trueTopOfHead, box.width + 8, chinY - trueTopOfHead);
  _ctx.restore();

  // ────────────────────────────────────────
  // 6. Eye dots
  // ────────────────────────────────────────
  // _ctx.fillStyle = PRIMARY;
  // for (const pt of [...leftEyePoints, ...rightEyePoints]) {
  //   _ctx.beginPath();
  //   _ctx.arc(tx(pt.x), ty(pt.y), 1.8, 0, Math.PI * 2);
  //   _ctx.fill();
  // }

  // ────────────────────────────────────────
  // 7. Tilt warning
  // ────────────────────────────────────────
  const tiltAngle = computeTiltAngle(landmarks, imgW, imgH);
  if (Math.abs(tiltAngle) > 2) {
    _ctx.save();
    _ctx.strokeStyle = "rgba(251,191,36,0.9)";
    _ctx.lineWidth = 1.5;
    _ctx.setLineDash([3, 3]);
    _ctx.beginPath();
    _ctx.moveTo(tx(leftCenter.x),  ty(leftCenter.y));
    _ctx.lineTo(tx(rightCenter.x), ty(rightCenter.y));
    _ctx.stroke();
    _ctx.fillStyle = "rgba(180,120,0,0.95)";
    _ctx.font = "bold 9px system-ui";
    _ctx.setLineDash([]);
    _ctx.fillText(
      `TILT: ${Math.abs(tiltAngle).toFixed(1)}°`,
      tx(rightCenter.x) + 6,
      ty(rightCenter.y) - 4,
    );
    _ctx.restore();
  }
}

/* ── Hook ── */
export function useFaceVerification(previewUrl: string, documentType: string) {
  const [verifying, setVerifying] = useState(true);
  const [checks, setChecks] = useState<ComplianceCheck[]>([]);
  const [overallPass, setOverallPass] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<HTMLCanvasElement>(null);
  const isMountedRef = useRef(true);

  // BUG FIX #6 — isMounted lifecycle
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const runVerification = useCallback(async () => {
    try {
      if (!isMountedRef.current) return;
      setVerifying(true);

      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = previewUrl;
      await img.decode();

      // BUG FIX #5 — check refs *and* mount status right after the first
      // async yield (img.decode). If the component unmounted during decode
      // the refs will be null; throwing here would land in the catch block
      // and silently set overallPass=true. We return cleanly instead.
      if (!isMountedRef.current) return;

      const canvas = canvasRef.current;
      const overlay = overlayRef.current;

      if (!canvas || !overlay) {
        // Refs are null — component likely unmounted; bail silently.
        return;
      }

      const ctx = canvas.getContext("2d", { willReadFrequently: true })!;
      canvas.width = overlay.width = img.width;
      canvas.height = overlay.height = img.height;
      ctx.drawImage(img, 0, 0);

      // BUG FIX #8 — detect a null landmarker explicitly and surface a
      // meaningful error rather than silently reporting "No face detected".
      const landmarker = await getMediaPipeLandmarker();
      if (!isMountedRef.current) return;

      if (!landmarker) {
        throw new Error("MediaPipe FaceLandmarker failed to initialise");
      }

      const result = landmarker.detect(canvas);
      if (!isMountedRef.current) return;

      const detections = result?.faceLandmarks ?? [];

      const results: ComplianceCheck[] = [];

      // BUG FIX #4 — track WARN separately so the overall result is
      // accurate: a photo with only warnings is NOT a clean pass.
      let hasFail = false;
      let hasWarn = false;

      const push = (
        name: string,
        status: "PASS" | "WARN" | "FAIL",
        value: string,
        detail: string,
      ) => {
        results.push({ name, status, value, detail });
        if (status === "FAIL") hasFail = true;
        if (status === "WARN") hasWarn = true;
      };

      const spec = getSpecById(documentType);
      const targetW = Number(spec?.width_px) || 600;
      const targetH = Number(spec?.height_px) || 600;

      const dimPass = img.width === targetW && img.height === targetH;
      push(
        "Dimensions",
        dimPass ? "PASS" : "FAIL",
        `${img.width}×${img.height}`,
        dimPass
          ? `Perfect ${targetW}×${targetH} pixels`
          : `Expected ${targetW}×${targetH}, got ${img.width}×${img.height}`,
      );

      if (detections.length !== 1) {
        push(
          "Face Detection",
          "FAIL",
          `${detections.length} faces`,
          detections.length === 0
            ? "No face detected"
            : "Multiple faces found",
        );
      } else {
        push("Face Detection", "PASS", "1 face", "Single face verified");

        const landmarks = detections[0];
        const box = computeFaceBox(landmarks, img.width, img.height);
        const h = img.height;

        // Eye centers
        const leftEyePoints = getPoints(landmarks, LEFT_EYE_INDICES, img.width, img.height);
        const rightEyePoints = getPoints(landmarks, RIGHT_EYE_INDICES, img.width, img.height);
        const leftCenter = centerOfPoints(leftEyePoints);
        const rightCenter = centerOfPoints(rightEyePoints);
        const eyeY = (leftCenter.y + rightCenter.y) / 2;
        const eyePct = ((h - eyeY) / h) * 100;

        const minEye = Number(spec?.eye_min_pct) || 56;
        const maxEye = Number(spec?.eye_max_pct) || 69;
        // TOLERANCE: Add 0.2% padding to account for rounding and AI landmark variations
        const eyePass = eyePct >= (minEye - 0.2) && eyePct <= (maxEye + 0.2);
        push(
          "Eye Level",
          eyePass ? "PASS" : "WARN",
          `${eyePct.toFixed(1)}%`,
          eyePass
            ? `Within ${minEye}–${maxEye}% range from bottom`
            : `Target: ${minEye}–${maxEye}% — ${eyePct < minEye ? "eyes too low" : "eyes too high"}`,
        );

        // Head size
        const chinPt = toPixel(landmarks[CHIN_TIP], img.width, img.height);
        const foreheadPt = toPixel(landmarks[FOREHEAD_TOP], img.width, img.height);
        const chinY = chinPt.y;
        const faceH = chinY - foreheadPt.y;
        const multiplier = Number(spec?.head_top_multiplier) || HEAD_TOP_MULTIPLIER;
        const estimatedFullHeadH = faceH * multiplier;
        const headPct = (estimatedFullHeadH / h) * 100;

        const minHead = Number(spec?.head_min_pct) || 50;
        const maxHead = Number(spec?.head_max_pct) || 69;
        // TOLERANCE: Add 0.2% padding to account for rounding and AI landmark variations
        const headPass = headPct >= (minHead - 0.2) && headPct <= (maxHead + 0.2);
        push(
          "Head Size",
          headPass ? "PASS" : "WARN",
          `${headPct.toFixed(1)}%`,
          headPass
            ? `Within ${minHead}–${maxHead}% range`
            : `Target: ${minHead}–${maxHead}% — ${headPct < minHead ? "too small" : "too large"}`,
        );

        // Orientation
        const lDist = leftCenter.x - box.x;
        const rDist = box.x + box.width - rightCenter.x;
        const ratio =
          Math.min(lDist, rDist) > 0
            ? Math.max(lDist, rDist) / Math.min(lDist, rDist)
            : 999;
        push(
          "Orientation",
          ratio <= 2.0 ? "PASS" : "WARN",
          ratio <= 2.0 ? "Frontal" : "Tilted",
          ratio <= 2.0
            ? "Face is directly facing camera"
            : "Face may not be directly centered",
        );

        // Head tilt
        const tiltAngle = computeTiltAngle(landmarks, img.width, img.height);
        const absTilt = Math.abs(tiltAngle);
        push(
          "Head Tilt",
          absTilt <= TILT_WARN_THRESHOLD
            ? "PASS"
            : absTilt <= TILT_FAIL_THRESHOLD
              ? "WARN"
              : "FAIL",
          `${absTilt.toFixed(1)}°`,
          absTilt <= TILT_WARN_THRESHOLD
            ? "Head is level"
            : absTilt <= TILT_FAIL_THRESHOLD
              ? `Slight tilt detected (${absTilt.toFixed(1)}°)`
              : `Head is tilted ${absTilt.toFixed(1)}° — retake recommended`,
        );

        // Body alignment
        const bodyTilt = detectBodyTilt(landmarks, img.width, img.height);
        push(
          "Body Alignment",
          !bodyTilt.isTilted ? "PASS" : "WARN",
          !bodyTilt.isTilted ? "Straight" : "Tilted",
          bodyTilt.description,
        );

        // Centering
        const centeringThreshold = 8;
        const offset =
          (Math.abs(box.x + box.width / 2 - img.width / 2) / img.width) * 100;
        push(
          "Centering",
          offset <= centeringThreshold ? "PASS" : "WARN",
          offset <= centeringThreshold ? "Centered" : `${offset.toFixed(1)}% off`,
          offset <= centeringThreshold
            ? "Face is horizontally centered"
            : "Face slightly off-center",
        );

        // Lighting
        const pixels = ctx.getImageData(0, 0, img.width, img.height).data;
        let sum = 0, count = 0;
        for (let i = 0; i < pixels.length; i += 40) {
          sum += (pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3;
          count++;
        }
        const brightness = sum / count;
        const lightOk = brightness > 80 && brightness < 230;
        push(
          "Lighting",
          lightOk ? "PASS" : "WARN",
          lightOk ? "Good" : brightness < 80 ? "Dark" : "Bright",
          lightOk
            ? "Even, well-lit exposure"
            : brightness < 80
              ? "Image may be too dark"
              : "Image may be overexposed",
        );

        drawOverlay(overlay, box, landmarks, img.width, img.height, spec);
      }

      if (!isMountedRef.current) return;

      setChecks(results);
      // BUG FIX #4 — overall pass requires zero FAILs AND zero WARNs.
      // Previously WARNs were ignored, letting substandard photos "pass".
      setOverallPass(!hasFail && !hasWarn);

    } catch (err) {
      console.error("Preview verification failed:", err);

      if (!isMountedRef.current) return; // BUG FIX #6 — guard in catch path too

      setChecks([
        {
          name: "Verification",
          status: "WARN",
          value: "Skipped",
          detail: "Could not verify — visual check recommended",
        },
      ]);
      // BUG FIX #5 — do NOT silently set overallPass=true when refs are
      // null due to unmount; the early return above handles that case.
      // Here we only reach this point for genuine errors, so keep false.
      setOverallPass(false);
    } finally {
      if (isMountedRef.current) {
        setVerifying(false);
      }
    }
  }, [previewUrl, documentType]);

  useEffect(() => {
    runVerification();
  }, [runVerification]);

  return {
    verifying,
    checks,
    overallPass,
    canvasRef,
    overlayRef,
    runVerification,
  };
}