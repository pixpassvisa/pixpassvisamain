import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Photo from "@/models/Photo";

export async function GET(req: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;

  try {
    await dbConnect();
    const photoRecord = await Photo.findById(params.id);

    if (!photoRecord) {
      return NextResponse.json({ error: "Photo not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: {
        photoId: photoRecord._id.toString(),
        previewUrl: photoRecord.previewUrl,
        documentType: photoRecord.documentType,
        metrics: photoRecord.metrics ? JSON.parse(JSON.stringify(photoRecord.metrics)) : {},
        isPaid: photoRecord.status === "paid",
      }
    });
  } catch (error: any) {
    console.error("Error fetching photo:", error);
    return NextResponse.json({ error: "Invalid photo ID format or database error", details: error.message }, { status: 500 });
  }
}
