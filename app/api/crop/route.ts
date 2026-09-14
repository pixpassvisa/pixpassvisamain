import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import sharp from "sharp";
import { uploadBufferToCloudinary } from "@/lib/cloudinary";
import { HEAD_TOP_MULTIPLIER } from "@/lib/mediapipe";
import { getSafeSpec } from "@/lib/specs";

// ------------------------------------------------------------------
// CROP ENDPOINT — Uses client-provided face landmarks + Sharp
// to crop the image to the target country's passport/visa guidelines.
// ------------------------------------------------------------------

// ---------------------------------------------------------------
// NEW FIX — resolveHeadPct()
//
// Root cause: some country specs (e.g. Australia) express head size
// as physical millimetres (head_min_mm / head_max_mm) instead of
// percentages (head_min_pct / head_max_pct).
//
// Old code called toNum(spec.head_min_pct, 50) which silently fell
// back to the default 50 / 69 when those fields were undefined —
// a drastically wrong range that made the crop frame far too large
// (head appeared too small in the output photo).
//
// For Australia:
//   head_min_mm=32, head_max_mm=36, height_mm=45
//   → correct MIN_HEAD_PCT = 32/45*100 = 71.1%
//   → correct MAX_HEAD_PCT = 36/45*100 = 80.0%
//   → old default gave         50% / 69%  ← completely wrong
//
// Fix: resolveHeadPct() checks all three possible formats in priority
// order and converts whichever is present, so any spec works correctly:
//   1. head_min_pct / head_max_pct  (already a percentage)
//   2. head_min_mm  / head_max_mm   (convert via height_mm)
//   3. fallback 50 / 69             (only when spec has neither)
// ---------------------------------------------------------------
function resolveHeadPct(
  spec: any
): { minPct: number; maxPct: number } {
  const toN = (v: any) =>
    v != null && v !== "unspecified" && !isNaN(Number(v)) ? Number(v) : null;

  // Priority 1 — explicit percentage fields
  const minPct = toN(spec.head_min_pct);
  const maxPct = toN(spec.head_max_pct);
  if (minPct !== null && maxPct !== null) {
    return { minPct, maxPct };
  }

  // Priority 2 — millimetre fields; require height_mm to convert
  const minMm = toN(spec.head_min_mm);
  const maxMm = toN(spec.head_max_mm);
  const heightMm = toN(spec.height_mm);
  if (minMm !== null && maxMm !== null && heightMm !== null && heightMm > 0) {
    return {
      minPct: (minMm / heightMm) * 100,
      maxPct: (maxMm / heightMm) * 100,
    };
  }

  // Priority 3 — neither present; log a warning and use safe defaults
  console.warn(
    `[crop] spec "${spec.id}" has no head size constraints — falling back to 50–69%`
  );
  return { minPct: 50, maxPct: 69 };
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("image") as File;
    const faceDataRaw = formData.get("faceData") as string | null;

    if (!file) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    if (!faceDataRaw) {
      return NextResponse.json(
        { error: "Face detection data is required for cropping" },
        { status: 400 }
      );
    }

    let faceData: {
      faceBox: { x: number; y: number; width: number; height: number };
      eyeCenter: { x: number; y: number };
      chinY: number;
      topOfHeadY: number;
      imageDimensions: { width: number; height: number };
    };

    try {
      faceData = JSON.parse(faceDataRaw);
    } catch {
      return NextResponse.json(
        { error: "Invalid face data format" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const imagePipeline = sharp(buffer).rotate();
    const metadata = await imagePipeline.metadata();

    // ---- Image quality checks ----
    const stats = await sharp(buffer).stats();
    let totalStdDev = 0;
    let totalMean = 0;
    const colorChannels = Math.min(3, stats.channels.length);
    for (let i = 0; i < colorChannels; i++) {
      totalStdDev += stats.channels[i].stdev;
      totalMean += stats.channels[i].mean;
    }
    const avgStdDev = totalStdDev / colorChannels;
    const avgMean = totalMean / colorChannels;

    if (avgStdDev < 10) {
      return NextResponse.json(
        { error: "Image is too dull or lacks contrast. Please retake the photo in better lighting." },
        { status: 400 }
      );
    }
    if (avgMean < 30) {
      return NextResponse.json(
        { error: "Image is too dark. Please retake the photo in a well-lit area without shadows." },
        { status: 400 }
      );
    }
    if (avgMean > 245) {
      return NextResponse.json(
        { error: "Image is too bright or washed out. Please retake the photo with even lighting." },
        { status: 400 }
      );
    }

    // ---------------------------------------------------------------
    // FIX 1 — EXIF orientation swap BEFORE scale computation.
    // ---------------------------------------------------------------
    let imgW = metadata.width ?? faceData.imageDimensions.width;
    let imgH = metadata.height ?? faceData.imageDimensions.height;

    if (metadata.orientation && metadata.orientation >= 5) {
      [imgW, imgH] = [imgH, imgW];
    }

    const scaleX = imgW / faceData.imageDimensions.width;
    const scaleY = imgH / faceData.imageDimensions.height;

    if (Math.abs(scaleX - 1) > 0.01 || Math.abs(scaleY - 1) > 0.01) {
      console.log(`[crop] Scaling face coordinates: image ${imgW}x${imgH} vs faceData ${faceData.imageDimensions.width}x${faceData.imageDimensions.height} (scale: ${scaleX.toFixed(3)}, ${scaleY.toFixed(3)})`);
      faceData.faceBox.x *= scaleX;
      faceData.faceBox.y *= scaleY;
      faceData.faceBox.width *= scaleX;
      faceData.faceBox.height *= scaleY;
      faceData.eyeCenter.x *= scaleX;
      faceData.eyeCenter.y *= scaleY;
      faceData.chinY *= scaleY;
      faceData.topOfHeadY *= scaleY;
      faceData.imageDimensions.width = imgW;
      faceData.imageDimensions.height = imgH;
    }

    const documentType = formData.get("type") as string || "general";
    const spec = getSafeSpec(documentType);

    const targetBgRaw = formData.get("targetBackground") as string || spec.bg_color || "white";
    const filenameExt = targetBgRaw === "transparent" ? "png" : "jpg";

    // ---- Validate face data ----
    if (
      !faceData.faceBox || !faceData.eyeCenter ||
      faceData.chinY == null || faceData.topOfHeadY == null ||
      !faceData.imageDimensions?.width || !faceData.imageDimensions?.height
    ) {
      return NextResponse.json(
        { error: "Incomplete face data — faceBox, eyeCenter, chinY, topOfHeadY, and imageDimensions are required" },
        { status: 400 }
      );
    }

    const faceAreaPct = (faceData.faceBox.width * faceData.faceBox.height) / (imgW * imgH) * 100;
    if (faceAreaPct < 3) {
      return NextResponse.json(
        { error: "Face is too small in the image. Please take a closer photo where your face fills more of the frame." },
        { status: 400 }
      );
    }

    const headHeight = faceData.chinY - faceData.topOfHeadY;
    if (headHeight <= 0 || headHeight < imgH * 0.05) {
      return NextResponse.json(
        { error: "Face landmarks appear invalid — chin is above forehead, or face is too small. Please try a clearer photo." },
        { status: 400 }
      );
    }

    const headTopMultiplier = (spec as any)?.head_top_multiplier ?? HEAD_TOP_MULTIPLIER;
    const fullHeadHeight = headHeight * headTopMultiplier;

    // ---------------------------------------------------------------
    // FIX 2 — Use client-detected topOfHeadY (MediaPipe crown landmark).
    // Take the higher of formula estimate vs actual landmark so curly/
    // tall hair is always protected.
    // ---------------------------------------------------------------
    const formulaTopOfHead = faceData.chinY - fullHeadHeight;
    const trueTopOfHead = Math.min(formulaTopOfHead, faceData.topOfHeadY);

    const toNum = (v: number | string, def: number) =>
      v != null && v !== "unspecified" ? Number(v) : def;

    // ---------------------------------------------------------------
    // NEW FIX — resolve head bounds from whichever format the spec uses
    // (head_min_pct / head_max_pct  OR  head_min_mm / head_max_mm).
    // This is the primary bug causing wrong crop for Australia and any
    // other spec that stores head size in mm instead of percent.
    // ---------------------------------------------------------------
    const { minPct: MIN_HEAD_PCT_RAW, maxPct: MAX_HEAD_PCT_RAW } = resolveHeadPct(spec);
    const MIN_HEAD_PCT = MIN_HEAD_PCT_RAW / 100;
    const MAX_HEAD_PCT = MAX_HEAD_PCT_RAW / 100;

    console.log(`[crop] head bounds: min=${MIN_HEAD_PCT_RAW.toFixed(1)}% max=${MAX_HEAD_PCT_RAW.toFixed(1)}% (spec="${spec.id}")`);

    const TARGET_HEAD_PCT = (MIN_HEAD_PCT + MAX_HEAD_PCT) / 2;

    // ---------------------------------------------------------------
    // FIX 3 — True arithmetic midpoint for eye target (unbiased).
    // ---------------------------------------------------------------
    const MIN_EYE_PCT = toNum(spec.eye_min_pct, 56) / 100;
    const MAX_EYE_PCT = toNum(spec.eye_max_pct, 69) / 100;

    const TARGET_EYE_PCT = (MIN_EYE_PCT + MAX_EYE_PCT) / 2;
    const TARGET_EYE_TOP_PCT = 1 - TARGET_EYE_PCT;
    const MIN_EYE_TOP_PCT = 1 - MAX_EYE_PCT;
    const MAX_EYE_TOP_PCT = 1 - MIN_EYE_PCT;

    const targetW = toNum(spec.width_px, 600);
    const targetH = toNum(spec.height_px, 600);
    const targetAspectRatio = targetW / targetH;

    // ---------------------------------------------------------------
    // FIX A — Adaptive caution margin that scales with how low the
    // eye spec pushes cropTop, so specs like Australia always protect
    // the crown even when the eye range sits low in the frame.
    // ---------------------------------------------------------------
    const initialCropHeight = fullHeadHeight / TARGET_HEAD_PCT;
    const initialCropTop = faceData.eyeCenter.y - (initialCropHeight * TARGET_EYE_TOP_PCT);
    const crownGap = initialCropTop - trueTopOfHead;
    const adaptivePad = fullHeadHeight * 0.09;
    const CAUTION_MARGIN = Math.max(
      fullHeadHeight * 0.11,
      crownGap > 0 ? crownGap + adaptivePad : fullHeadHeight * 0.11
    );

    let cropHeight = initialCropHeight;
    let cropWidth = cropHeight * targetAspectRatio;
    let cropTop = initialCropTop;

    // 1. DYNAMIC HAIR SOLVER (Crown Protection)
    if (cropTop > trueTopOfHead - CAUTION_MARGIN) {
      cropTop = trueTopOfHead - CAUTION_MARGIN;

      const eyeOffset = faceData.eyeCenter.y - cropTop;
      if ((eyeOffset / cropHeight) > MAX_EYE_TOP_PCT) {
        cropHeight = eyeOffset / MAX_EYE_TOP_PCT;
        cropWidth = cropHeight * targetAspectRatio;
        cropTop = faceData.eyeCenter.y - (cropHeight * MAX_EYE_TOP_PCT);
      }
    }

    // 2. BOUNDARY CLAMPING: Legal head sizes
    const maxCropHeightAllowed = fullHeadHeight / MIN_HEAD_PCT;
    const minCropHeightAllowed = fullHeadHeight / MAX_HEAD_PCT;

    if (cropHeight < minCropHeightAllowed) {
      cropHeight = minCropHeightAllowed;
      cropWidth = cropHeight * targetAspectRatio;
    }
    if (cropHeight > maxCropHeightAllowed) {
      cropHeight = maxCropHeightAllowed;
      cropWidth = cropHeight * targetAspectRatio;
    }

    // ---------------------------------------------------------------
    // FIX 5 — Eye revalidation must NOT undo the crown solver.
    // Re-enforce crown margin immediately after eye revalidation.
    // ---------------------------------------------------------------
    const revalidatedEyeTopPct = (faceData.eyeCenter.y - cropTop) / cropHeight;
    if (revalidatedEyeTopPct > MAX_EYE_TOP_PCT) {
      cropTop = faceData.eyeCenter.y - (cropHeight * MAX_EYE_TOP_PCT);
    } else if (revalidatedEyeTopPct < MIN_EYE_TOP_PCT) {
      cropTop = faceData.eyeCenter.y - (cropHeight * MIN_EYE_TOP_PCT);
    }

    // Re-enforce crown margin after eye revalidation (FIX 5 continued)
    if (cropTop > trueTopOfHead - CAUTION_MARGIN) {
      cropTop = trueTopOfHead - CAUTION_MARGIN;
    }

    // FIX 6: Removed duplicate minCropHeightAllowed check that sat
    // after eye revalidation and silently re-inflated cropHeight
    // without adjusting cropTop.

    // 3. Overflow logging
    if (cropTop + cropHeight > imgH) {
      console.log(`[crop] Bottom overflow: cropTop=${cropTop.toFixed(0)} + cropHeight=${cropHeight.toFixed(0)} > imgH=${imgH}, will pad bottom`);
    }
    if (cropTop < 0) {
      console.log(`[crop] Top overflow: cropTop=${cropTop.toFixed(0)}, will pad top`);
    }

    const maxAllowedCropHeight = Math.max(imgW, imgH) * 2;
    if (cropHeight > maxAllowedCropHeight) {
      console.warn(`[crop] cropHeight ${cropHeight.toFixed(0)} exceeded 2× image bounds, clamping`);
      cropHeight = maxAllowedCropHeight;
      cropWidth = cropHeight * targetAspectRatio;
    }

    if (cropHeight < 200) {
      cropHeight = 200;
      cropWidth = cropHeight * targetAspectRatio;
    }

    // Post-clamp compliance validation
    const postClampHeadPct = (fullHeadHeight / cropHeight) * 100;
    if (postClampHeadPct < MIN_HEAD_PCT * 100 || postClampHeadPct > MAX_HEAD_PCT * 100) {
      console.warn(`[crop] Non-compliant head%: ${postClampHeadPct.toFixed(1)}% (allowed ${MIN_HEAD_PCT_RAW.toFixed(1)}–${MAX_HEAD_PCT_RAW.toFixed(1)}%)`);
      return NextResponse.json(
        { error: `Head size (${postClampHeadPct.toFixed(0)}%) is outside the allowed ${MIN_HEAD_PCT_RAW.toFixed(0)}–${MAX_HEAD_PCT_RAW.toFixed(0)}% range. Please retake the photo with your face closer to or further from the camera.` },
        { status: 400 }
      );
    }

    // ---------------------------------------------------------------
    // FIX 4 — cropLeft computed LAST from the final rounded cropWidth.
    // ---------------------------------------------------------------
    cropHeight = Math.round(cropHeight);
    cropWidth = Math.round(cropWidth);
    cropTop = Math.round(cropTop);

    const faceCenterX = faceData.faceBox.x + (faceData.faceBox.width / 2);
    const cropLeft = Math.round(faceCenterX - cropWidth / 2); // always last

    console.log(`[crop] spec="${spec.id}" headPct=${postClampHeadPct.toFixed(1)}% (${MIN_HEAD_PCT_RAW.toFixed(1)}–${MAX_HEAD_PCT_RAW.toFixed(1)}%), cropH=${cropHeight}, cropW=${cropWidth}, cropTop=${cropTop}, cropLeft=${cropLeft}, trueTopOfHead=${trueTopOfHead.toFixed(0)}, CAUTION_MARGIN=${CAUTION_MARGIN.toFixed(0)}, imgW=${imgW}, imgH=${imgH}`);

    const extractLeft = Math.max(0, cropLeft);
    const extractTop = Math.max(0, cropTop);
    const extractRight = Math.min(imgW, cropLeft + cropWidth);
    const extractBottom = Math.min(imgH, cropTop + cropHeight);

    const extractW = extractRight - extractLeft;
    const extractH = extractBottom - extractTop;

    // ---------------------------------------------------------------
    // FIX 7 — Hard error if extraction region is too small.
    // ---------------------------------------------------------------
    const MIN_EXTRACT_PX = 50;
    if (extractW < MIN_EXTRACT_PX || extractH < MIN_EXTRACT_PX) {
      return NextResponse.json(
        { error: "Face is too close to the image edge or out of frame. Please retake the photo with your face centred." },
        { status: 400 }
      );
    }

    const paddingTop = Math.max(0, -cropTop);
    const paddingLeft = Math.max(0, -cropLeft);
    const paddingBottom = Math.max(0, (cropTop + cropHeight) - imgH);
    const paddingRight = Math.max(0, (cropLeft + cropWidth) - imgW);

    const intermediateW = extractW + paddingLeft + paddingRight;
    const intermediateH = extractH + paddingTop + paddingBottom;
    console.log(`[crop] extract=${extractW}x${extractH}, padding T=${paddingTop} B=${paddingBottom} L=${paddingLeft} R=${paddingRight}, intermediate=${intermediateW}x${intermediateH}`);

    // ---- Background ----
    let bgRgb = { r: 255, g: 255, b: 255, alpha: 1 };
    switch (targetBgRaw.toLowerCase()) {
      case "transparent": bgRgb = { r: 255, g: 255, b: 255, alpha: 0 }; break;
      case "light-gray": bgRgb = { r: 243, g: 244, b: 246, alpha: 1 }; break;
      case "light-blue": bgRgb = { r: 239, g: 246, b: 255, alpha: 1 }; break;
      case "blue": bgRgb = { r: 0, g: 71, b: 171, alpha: 1 }; break;
      default: bgRgb = { r: 255, g: 255, b: 255, alpha: 1 }; break;
    }

    let cropChain = imagePipeline
      .extract({ left: extractLeft, top: extractTop, width: extractW, height: extractH })
      .extend({ top: paddingTop, bottom: paddingBottom, left: paddingLeft, right: paddingRight, background: bgRgb });

    if (filenameExt !== "png") {
      cropChain = cropChain.flatten({ background: { r: 255, g: 255, b: 255 } });
    }

    const targetDPI = toNum((spec as any).dpi, 300);

    cropChain = cropChain
      .toColorspace("srgb")
      .resize(targetW, targetH, { fit: "fill" })
      .withMetadata({ density: targetDPI });

    cropChain = filenameExt === "png"
      ? cropChain.png()
      : cropChain.jpeg({ quality: 100, chromaSubsampling: "4:4:4" });

    let processedBuffer = await cropChain.toBuffer();

    // ---- Safety: guarantee output is exactly targetW×targetH ----
    const finalMeta = await sharp(processedBuffer).metadata();
    if (finalMeta.width !== targetW || finalMeta.height !== targetH) {
      console.warn(`[crop] Output was ${finalMeta.width}x${finalMeta.height}, forcing to ${targetW}x${targetH}`);
      processedBuffer = await sharp(processedBuffer)
        .resize(targetW, targetH, { fit: "fill" })
        .toBuffer();
    }

    // ---- Binary-search JPEG compression (DS-160 240 KB limit) ----
    if (filenameExt === "jpg") {
      const MAX_SIZE_BYTES = 240 * 1024;
      if (processedBuffer.length > MAX_SIZE_BYTES) {
        const referenceBuffer = processedBuffer;
        let low = 1, high = 100;
        let bestBuffer: Buffer | null = null;
        let bestQuality = -1;

        while (low <= high) {
          const mid = Math.floor((low + high) / 2);
          const testBuffer = await sharp(referenceBuffer)
            .jpeg({ quality: mid, chromaSubsampling: "4:4:4" })
            .toBuffer();

          if (testBuffer.length <= MAX_SIZE_BYTES) {
            bestBuffer = testBuffer;
            bestQuality = mid;
            low = mid + 1;
          } else {
            high = mid - 1;
          }
        }

        if (!bestBuffer) {
          return NextResponse.json(
            { error: "Image cannot be compressed to meet the 240KB DS-160 limit. Please try a photo with a simpler background." },
            { status: 400 }
          );
        }

        processedBuffer = bestBuffer;
        console.log(`[crop] Compressed to quality=${bestQuality}, size=${Math.round(processedBuffer.length / 1024)}KB`);
      }
    }

    // Apply visible semi-transparent watermark grid to watermarkedBuffer for preview
    const watermarkSvg = `<svg width="${targetW}" height="${targetH}">
      <style>
        .watermark-text {
          fill: rgba(0, 0, 0, 0.35);
          font-family: Arial, sans-serif;
          font-size: ${Math.max(18, Math.round(targetW / 16))}px;
          font-weight: bold;
          letter-spacing: 2px;
        }
      </style>
      <g transform="rotate(-30 ${targetW / 2} ${targetH / 2})">
        <text x="-20%" y="20%" class="watermark-text">PIXPASSVISA PREVIEW • NOT PAID</text>
        <text x="-20%" y="50%" class="watermark-text">PIXPASSVISA PREVIEW • NOT PAID</text>
        <text x="-20%" y="80%" class="watermark-text">PIXPASSVISA PREVIEW • NOT PAID</text>
      </g>
    </svg>`;

    const watermarkedBuffer = await sharp(processedBuffer)
      .composite([{ input: Buffer.from(watermarkSvg), blend: "over" }])
      .toBuffer();

    // ---- Print sheet ----
    const svgBorder = `<svg width="${targetW}" height="${targetH}"><rect x="1" y="1" width="${targetW - 2}" height="${targetH - 2}" fill="none" stroke="black" stroke-width="2"/></svg>`;
    const borderedBuffer = await sharp(processedBuffer)
      .composite([{ input: Buffer.from(svgBorder), blend: "over" }])
      .toBuffer();

    const isA4 = spec.print_size !== "Letter";
    const sheetW = isA4 ? 2480 : 2550;
    const sheetH = isA4 ? 3508 : 3300;
    const PHOTO_GAP = 12;
    const cols = Math.floor((sheetW - 40) / (targetW + PHOTO_GAP));
    const rows = Math.floor((sheetH - 40) / (targetH + PHOTO_GAP));
    const marginX = Math.floor((sheetW - (cols * targetW + (cols - 1) * PHOTO_GAP)) / 2);
    const marginY = Math.floor((sheetH - (rows * targetH + (rows - 1) * PHOTO_GAP)) / 2);

    const composites = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        composites.push({
          input: borderedBuffer,
          top: marginY + r * (targetH + PHOTO_GAP),
          left: marginX + c * (targetW + PHOTO_GAP),
        });
      }
    }

    const printSheetBuffer = await sharp({
      create: { width: sheetW, height: sheetH, channels: 4, background: { r: 255, g: 255, b: 255, alpha: 1 } },
    })
      .composite(composites)
      .jpeg({ quality: 100 })
      .toBuffer();

    const [secureUrl, previewUrl, printSheetUrl, originalUrl] = await Promise.all([
      uploadBufferToCloudinary(processedBuffer, "visa-photos-pixpassvisa", ["secure"]),
      uploadBufferToCloudinary(watermarkedBuffer, "visa-photos-pixpassvisa", ["preview"]),
      uploadBufferToCloudinary(printSheetBuffer, "visa-photos-pixpassvisa", ["print-sheet"]),
      uploadBufferToCloudinary(buffer, "visa-photos-pixpassvisa", ["original"]).catch((err) => {
        console.warn("[crop] Failed to upload original image to Cloudinary:", err);
        return undefined;
      }),
    ]);

    // ---- Metrics ----
    const outputScale = targetH / cropHeight;
    const scaledFullHeadHeight = fullHeadHeight * outputScale;
    const effectiveEyeY = faceData.eyeCenter.y - extractTop + paddingTop;
    const scaledEyeY = effectiveEyeY * (targetH / cropHeight);
    const finalHeadPct = (scaledFullHeadHeight / targetH) * 100;
    const finalEyeFromBottomPct = ((targetH - scaledEyeY) / targetH) * 100;

    console.log(`[crop] Final metrics — headPct=${finalHeadPct.toFixed(1)}% (target ${MIN_HEAD_PCT_RAW.toFixed(1)}–${MAX_HEAD_PCT_RAW.toFixed(1)}%), eyeFromBottom=${finalEyeFromBottomPct.toFixed(1)}%`);

    const dbConnect = (await import("@/lib/mongodb")).default;
    const Photo = (await import("@/models/Photo")).default;
    await dbConnect();

    const downloadToken = crypto.randomBytes(24).toString("hex");

    const photoRecord = await Photo.create({
      documentType: formData.get("type") as string || "general",
      secureUrl,
      previewUrl,
      printSheetUrl,
      originalUrl,
      downloadToken,
      metrics: {
        headSizePct: finalHeadPct.toFixed(1),
        eyeLevelPct: finalEyeFromBottomPct.toFixed(1),
      },
    });

    console.log("Saved photoRecord:", photoRecord._id);

    const { logAuditEvent, getClientMetadata } = await import("@/lib/audit");
    const clientMeta = getClientMetadata(req);
    await logAuditEvent({
      eventType: "processing",
      photoId: photoRecord._id,
      actor: "user",
      ipAddress: clientMeta.ipAddress,
      userAgent: clientMeta.userAgent,
      metadata: {
        engine: "internal_sharp_mediapipe",
        documentType: photoRecord.documentType,
        dimensions: `${targetW}×${targetH}`,
        format: filenameExt.toUpperCase(),
        sizeKb: Math.round(processedBuffer.length / 1024),
        headSizePct: finalHeadPct.toFixed(1),
        eyeLevelPct: finalEyeFromBottomPct.toFixed(1),
        status: "success",
      },
    });

    return NextResponse.json({
      success: true,
      photoId: photoRecord._id.toString(),
      downloadToken,
      processedImageUrl: previewUrl,
      dimensions: `${targetW}×${targetH}`,
      format: filenameExt.toUpperCase(),
      sizeKb: Math.round(processedBuffer.length / 1024),
    });

  } catch (error: any) {
    console.error("Crop Error:", error);
    return NextResponse.json(
      { error: "Crop failed", details: error.message },
      { status: 500 }
    );
  }
}