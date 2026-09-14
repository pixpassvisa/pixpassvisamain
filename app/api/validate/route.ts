import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import ValidationRecord from "@/models/ValidationRecord";
import sharp from "sharp";
import { uploadBufferToCloudinary } from "@/lib/cloudinary";
import { getSpecById } from "@/lib/specs";

// RE-WATCH TRIGGER: 2026-04-11T13:25:00Z

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("image") as File;
    const documentType = (formData.get("type") as string) || "general";

    // Client-side face detection results (pre-computed in browser)
    const clientDataRaw = formData.get("clientData") as string | null;
    let clientData: {
      faceCount: number;
      eyeLevelPct: number | null;
      headSizePct: number | null;
      brightness: number;
      orientationRatio: number | null;
      faceBox: { x: number; y: number; width: number; height: number } | null;
    } | null = null;

    try {
      if (clientDataRaw) clientData = JSON.parse(clientDataRaw);
    } catch {
      // ignore malformed
    }

    if (!file) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    // --- SHARP QUALITY CHECKS ---
    const imagePipeline = sharp(buffer).rotate(); // Handle EXIF orientation
    let metadata;
    try {
      metadata = await imagePipeline.metadata();
    } catch (sharpErr: any) {
      console.error("Sharp metadata error:", sharpErr);
      return NextResponse.json(
        { error: "Could not read image", details: "The uploaded file could not be processed. Please upload a valid JPEG or PNG image." },
        { status: 400 }
      );
    }

    const isJpeg = metadata.format === "jpeg" || metadata.format === "jpg";
    const isPng = metadata.format === "png";
    const sizeKb = buffer.length / 1024;

    let brightness = 0;
    try {
      const stats = await sharp(buffer).stats();
      if (stats.channels.length >= 3) {
        brightness =
          (stats.channels[0].mean +
            stats.channels[1].mean +
            stats.channels[2].mean) /
          3;
      }
    } catch {
      // If stats fail, use client brightness as fallback
      brightness = clientData?.brightness ?? 128;
    }

    const checks: { name: string; status: string; detail: string }[] = [];
    
    // Get dynamic specifications
    const spec = getSpecById(documentType);
    const targetW = Number(spec?.width_px) || 600;
    const targetH = Number(spec?.height_px) || 600;
    const isStrict = true; 

    // 1. File Format
    if (isJpeg) {
      checks.push({
        name: "File Format",
        status: "PASS",
        detail: "Valid JPEG format",
      });
    } else if (isPng) {
      checks.push({
        name: "File Format",
        status: "WARN",
        detail: "PNG detected. JPEG is strictly recommended for official submissions.",
      });
    } else {
      checks.push({
        name: "File Format",
        status: "FAIL",
        detail: `Format is ${metadata.format}. JPEG required.`,
      });
    }

    // 2. File Size
    if (sizeKb <= 240) {
      checks.push({
        name: "File Size",
        status: "PASS",
        detail: `${Math.round(sizeKb)} KB (Under 240 KB limit)`,
      });
    } else {
      checks.push({
        name: "File Size",
        status: "WARN",
        detail: `${Math.round(sizeKb)} KB exceeds 240 KB (will be compressed during processing)`,
      });
    }

    // 3. Image Dimensions
    let imgW = metadata.width || 0;
    let imgH = metadata.height || 0;
    
    // sharp.metadata() returns unrotated dimensions. If .rotate() was called,
    // EXIF orientations >= 5 mean the image is natively rotated 90 or 270 degrees.
    if (metadata.orientation && metadata.orientation >= 5) {
      imgW = metadata.height || 0;
      imgH = metadata.width || 0;
    }
    
    if (imgW < targetW || imgH < targetH) {
      return NextResponse.json(
        { 
          error: "Low Resolution Error", 
          details: `The uploaded image is ${imgW}×${imgH} pixels. The minimum acceptable resolution for ${spec?.name || documentType} is ${targetW}×${targetH} pixels. Please upload a higher quality photo.` 
        },
        { status: 400 }
      );
    }

    if (Math.abs(imgW - targetW) < 2 && Math.abs(imgH - targetH) < 2) {
      checks.push({
        name: "Image Resolution",
        status: "PASS",
        detail: `Exactly ${targetW}×${targetH} px — target resolution matched`,
      });
    } else {
      checks.push({
        name: "Image Resolution",
        status: "WARN",
        detail: `${imgW}×${imgH} px — meets minimum, but will be perfectly cropped to ${targetW}×${targetH} on download`,
      });
    }

    // 4. Lighting / Brightness
    if (brightness > 80 && brightness < 230) {
      checks.push({
        name: "Lighting",
        status: "PASS",
        detail: "Good exposure detected",
      });
    } else {
      checks.push({
        name: "Lighting",
        status: "WARN",
        detail: brightness <= 80 ? "Image appears too dark" : "Image appears overexposed",
      });
    }

    // --- MERGE CLIENT-SIDE FACE DETECTION RESULTS ---
    if (clientData) {
      // Face count
      if (clientData.faceCount === 1) {
        checks.push({
          name: "Face Detection",
          status: "PASS",
          detail: "Exactly 1 face detected",
        });
      } else {
        checks.push({
          name: "Face Detection",
          status: "FAIL",
          detail: clientData.faceCount === 0 ? "No face detected" : "Multiple faces found",
        });
      }

      // Eye Level
      if (clientData.eyeLevelPct !== null) {
        const pct = clientData.eyeLevelPct;
        const min = Number(spec?.eye_min_pct) || 56;
        const max = Number(spec?.eye_max_pct) || 69;
        if (pct >= min && pct <= max) {
          checks.push({
            name: "Eye Level",
            status: "PASS",
            detail: `${pct.toFixed(1)}% from bottom (Target: ${min}–${max}%)`,
          });
        } else {
          checks.push({
            name: "Eye Level",
            status: isStrict ? "FAIL" : "WARN",
            detail: `${pct.toFixed(1)}% from bottom (Target: ${min}–${max}%) — ${pct < min ? "eyes too low" : "eyes too high"}`,
          });
        }
      }

      // Head Size
      if (clientData.headSizePct !== null) {
        const pct = clientData.headSizePct;
        const minHead = Number(spec?.head_min_pct) || 50;
        const maxHead = Number(spec?.head_max_pct) || 69;
        if (pct >= minHead && pct <= maxHead) {
          checks.push({
            name: "Head Size",
            status: "PASS",
            detail: `${pct.toFixed(1)}% of height (Target: ${minHead}–${maxHead}%)`,
          });
        } else {
          checks.push({
            name: "Head Size",
            status: isStrict ? "FAIL" : "WARN",
            detail: `${pct.toFixed(1)}% of height (Target: ${minHead}–${maxHead}%) — ${pct < minHead ? "head too small" : "head too large"}`,
          });
        }
      }

      // Orientation
      if (clientData.orientationRatio !== null) {
        checks.push({
          name: "Orientation",
          status: clientData.orientationRatio <= 2.0 ? "PASS" : "WARN",
          detail: clientData.orientationRatio <= 2.0 ? "Frontal orientation verified" : "Face may be slightly tilted",
        });
      }
    } else {
      checks.push({
        name: "Face Detection",
        status: "FAIL",
        detail: "Biometric analysis data is missing. This usually happens if the browser's face detection engine failed or timed out. Please try refreshing or using a different browser.",
      });
    }

    // --- DERIVE OVERALL STATUS ---
    let overallStatus = "PASS";
    if (checks.some((c) => c.status === "FAIL")) {
      overallStatus = "FAIL";
    } else if (checks.some((c) => c.status === "WARN")) {
      overallStatus = "WARN";
    }

    // --- SAVE TO MONGODB ---
    let reportId = null;
    try {
      await dbConnect();
      const validationImageUrl = await uploadBufferToCloudinary(buffer, 'validations', ['validation-raw']);
      const record = await ValidationRecord.create({
        documentType,
        overallStatus,
        checks,
        imageUrl: validationImageUrl,
        metrics: {
          eyeLevelPct: clientData?.eyeLevelPct ?? null,
          headSizePct: clientData?.headSizePct ?? null,
          faceCount: clientData?.faceCount ?? null,
          fileSizeKb: sizeKb,
          brightness,
        },
      });
      reportId = record._id;
    } catch (dbErr) {
      console.warn("MongoDB save failed (non-critical):", dbErr);
    }

    return NextResponse.json({
      success: true,
      reportId,
      documentType,
      overallStatus,
      checks,
      imageDimensions: { width: imgW, height: imgH },
    });
  } catch (error: any) {
    console.error("Validation Error:", error);
    return NextResponse.json(
      { error: "Validation failed", details: error.message },
      { status: 500 }
    );
  }
}
