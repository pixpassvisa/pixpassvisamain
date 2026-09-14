import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Photo from "@/models/Photo";

export async function GET(
  req: Request,
  props: { params: Promise<{ id: string }> }
) {
  const { id } = await props.params;
  try {
    await dbConnect();
    const photo = await Photo.findById(id);

    if (!photo) {
      return new NextResponse("Photo not found", { status: 404 });
    }

    // Check 24-hour ephemeral retention expiry
    const isExpired = photo.isExpired || (Date.now() - new Date(photo.createdAt).getTime() > 24 * 60 * 60 * 1000);
    if (isExpired || !photo.previewUrl || !photo.previewUrl.startsWith("http")) {
      return new NextResponse(
        "This preview has expired. Under our privacy protection policy, biometric photos are permanently deleted after 24 hours.",
        { status: 410 }
      );
    }

    try {
      const response = await fetch(photo.previewUrl);
      if (!response.ok) throw new Error("Failed to fetch image from Cloudinary");
      
      const buffer = await response.arrayBuffer();
      const contentType = response.headers.get('content-type') || 'image/jpeg';
      const ext = contentType === 'image/png' ? '.png' : '.jpeg';
      const fileName = `preview-studio-photo-${photo.documentType}${ext}`;

      const customerEmail = (photo as any).guestEmail || "";

      const { logAuditEvent, getClientMetadata } = await import("@/lib/audit");
      const clientMeta = getClientMetadata(req);
      await logAuditEvent({
        eventType: "download",
        photoId: photo._id,
        orderId: photo.orderId,
        actor: customerEmail || "guest",
        ipAddress: clientMeta.ipAddress,
        userAgent: clientMeta.userAgent,
        metadata: {
          fileType: "preview",
          email: customerEmail || undefined,
          documentType: photo.documentType,
          fileName,
          fileSizeBytes: buffer.byteLength,
        },
      });

      return new NextResponse(buffer, {
        status: 200,
        headers: {
          "Content-Type": contentType,
          "Content-Disposition": `attachment; filename="${fileName}"`,
        },
      });
    } catch (fetchError) {
      console.error("Fetch Error:", fetchError);
      return new NextResponse("Failed to download preview image", { status: 500 });
    }
  } catch (error: any) {
    console.error("Download Error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
