import { NextRequest, NextResponse } from "next/server";
import { processExternalPhoto } from "@/lib/external-api";
import dbConnect from "@/lib/mongodb";
import Photo from "@/models/Photo";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const image = formData.get("image") as File;
    const countryCode = formData.get("country_code") as string;
    const documentType = formData.get("document_type") as string || "passport";

    if (!image || !countryCode) {
      return NextResponse.json(
        { error: "Image and country_code are required" },
        { status: 400 }
      );
    }

    // Extract any extra fields
    const extraFields: Record<string, string> = {};
    formData.forEach((value, key) => {
      if (!["image", "country_code", "document_type"].includes(key) && typeof value === "string") {
        extraFields[key] = value;
      }
    });

    // Call external API
    const result = await processExternalPhoto(image, countryCode, documentType, extraFields);

    if (result.status !== "success") {
      return NextResponse.json(
        { error: "External processing failed", details: result },
        { status: 500 }
      );
    }

    // Upload original image to Cloudinary
    let originalUrl: string | undefined;
    try {
      const { uploadBufferToCloudinary } = await import("@/lib/cloudinary");
      const imageBuffer = Buffer.from(await image.arrayBuffer());
      originalUrl = await uploadBufferToCloudinary(imageBuffer, "visa-photos-pixpassvisa", ["original"]);
    } catch (err) {
      console.warn("[external-process] Failed to upload original image to Cloudinary:", err);
    }

    // Save to database
    await dbConnect();

    const fullDocId = formData.get("full_doc_id") as string;
    const crypto = await import("crypto");
    const downloadToken = crypto.randomBytes(24).toString("hex");
    
    const photoRecord = await Photo.create({
      documentType: fullDocId || `${countryCode}-${documentType}`,
      secureUrl: result.image_url,
      previewUrl: result.preview_url,
      printSheetUrl: result.print_sheet_url,
      originalUrl,
      downloadToken,
      externalResultId: result.result_id,
      metrics: {
        headSizePct: result.metrics.head_height_pct,
        eyeLevelPct: result.metrics.eye_position_pct,
        topMarginPct: result.metrics.top_margin_pct,
        backgroundValid: result.metrics.background_valid,
        backgroundCorrected: result.metrics.background_corrected,
      },
    });

    const { logAuditEvent, getClientMetadata } = await import("@/lib/audit");
    const clientMeta = getClientMetadata(req);
    await logAuditEvent({
      eventType: "processing",
      photoId: photoRecord._id,
      actor: "user",
      ipAddress: clientMeta.ipAddress,
      userAgent: clientMeta.userAgent,
      metadata: {
        engine: "external_api",
        documentType: photoRecord.documentType,
        externalResultId: result.result_id,
        dimensions: result.dimensions,
        format: result.format,
        sizeKb: result.size_kb,
        headSizePct: result.metrics.head_height_pct,
        eyeLevelPct: result.metrics.eye_position_pct,
        status: "success",
      },
    });

    return NextResponse.json({
      success: true,
      photoId: photoRecord._id.toString(),
      downloadToken,
      processedImageUrl: result.preview_url,
      dimensions: result.dimensions,
      format: result.format,
      sizeKb: result.size_kb,
    });
  } catch (error: any) {
    console.error("External Processing Error:", error);
    return NextResponse.json(
      { error: "Processing failed", details: error.message },
      { status: 500 }
    );
  }
}
