import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from "@/lib/mongodb";
import Photo from "@/models/Photo";

export async function GET(
  req: Request,
  props: { params: Promise<{ id: string }> }
) {
  const { id } = await props.params;
  try {
    const session = await getServerSession(authOptions);

    await dbConnect();
    const photo = await Photo.findById(id);

    if (!photo) {
      return new NextResponse("Photo not found", { status: 404 });
    }

    const { searchParams } = new URL(req.url);
    const providedToken = searchParams.get("token");

    // Access Control: Protect against IDOR
    if (photo.userId) {
      const isOwnerSession = session?.user && photo.userId.toString() === (session.user as any).id;
      const isValidToken = photo.downloadToken && providedToken === photo.downloadToken;
      if (!isOwnerSession && !isValidToken) {
        return new NextResponse("Unauthorized photo access", { status: 403 });
      }
    } else {
      // Guest order access control
      const isOwnerEmail = session?.user?.email && photo.guestEmail && session.user.email.toLowerCase() === photo.guestEmail.toLowerCase();
      const isValidToken = photo.downloadToken && providedToken === photo.downloadToken;
      if (!isOwnerEmail && !isValidToken) {
        return new NextResponse("Unauthorized photo access: valid download token required", { status: 403 });
      }
    }

    if (photo.status !== "paid") {
      return new NextResponse("Payment required", { status: 402 });
    }

    // Check 24-hour ephemeral retention expiry
    const isExpired = photo.isExpired || (Date.now() - new Date(photo.createdAt).getTime() > 24 * 60 * 60 * 1000);
    if (isExpired || !photo.secureUrl || !photo.secureUrl.startsWith("http")) {
      return new NextResponse(
        "This photo has expired. Under our privacy protection policy, biometric photos are permanently deleted after 24 hours.",
        { status: 410 }
      );
    }

    try {
      const response = await fetch(photo.secureUrl);
      if (!response.ok) throw new Error("Failed to fetch image from Cloudinary");
      
      const buffer = await response.arrayBuffer();
      const contentType = response.headers.get('content-type') || 'image/jpeg';
      const ext = contentType === 'image/png' ? '.png' : '.jpeg';
      const fileName = `studio-photo-${photo.documentType}${ext}`;

      const customerEmail = session?.user?.email || (photo as any).guestEmail || "";

      const { logAuditEvent, getClientMetadata } = await import("@/lib/audit");
      const clientMeta = getClientMetadata(req);
      await logAuditEvent({
        eventType: "download",
        photoId: photo._id,
        orderId: photo.orderId,
        actor: customerEmail || (session?.user ? "user" : "guest"),
        ipAddress: clientMeta.ipAddress,
        userAgent: clientMeta.userAgent,
        metadata: {
          fileType: "high_res_photo",
          email: customerEmail || undefined,
          documentType: photo.documentType,
          fileName,
          fileSizeBytes: buffer.byteLength,
        },
      });

      return new NextResponse(buffer, {
        headers: {
          "Content-Type": contentType,
          "Content-Disposition": `attachment; filename="${fileName}"`,
        },
      });
    } catch (fetchError) {
      console.error("Fetch Error:", fetchError);
      return new NextResponse("Failed to download image", { status: 500 });
    }
  } catch (error: any) {
    console.error("Download Error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
