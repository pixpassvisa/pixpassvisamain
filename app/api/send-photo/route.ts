import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { sendEmail } from "@/lib/mail";
import dbConnect from "@/lib/mongodb";
import Photo from "@/models/Photo";
import { getSafeSpec } from "@/lib/specs";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const { email, photoUrl, documentType, photoId } = await req.json();

    if (!email || !photoId) {
      return NextResponse.json({ error: "Email and photoId are required" }, { status: 400 });
    }

    await dbConnect();
    const photo = await Photo.findById(photoId);

    if (!photo) {
      return NextResponse.json({ error: "Photo record not found" }, { status: 404 });
    }

    if (photo.status !== "paid") {
      return NextResponse.json({ error: "Payment required before sending photo" }, { status: 402 });
    }

    const requestedEmail = email.trim().toLowerCase();
    const photoGuestEmail = photo.guestEmail ? photo.guestEmail.trim().toLowerCase() : "";
    const sessionEmail = session?.user?.email ? session.user.email.trim().toLowerCase() : "";

    // Security check: email must match photo's registered guest email OR logged-in user email
    const isAuthorizedRecipient = (photoGuestEmail && requestedEmail === photoGuestEmail) ||
      (sessionEmail && requestedEmail === sessionEmail);

    if (!isAuthorizedRecipient && (photoGuestEmail || sessionEmail)) {
      return NextResponse.json(
        { error: "Photos can only be delivered to the verified email address associated with the order." },
        { status: 403 }
      );
    }

    const verifiedPhotoUrl = photo.secureUrl || photo.previewUrl;
    const printSheetUrl = photo.printSheetUrl || "";

    const spec = getSafeSpec(documentType || 'us-passport');
    const docName = spec.name || 'Photo';
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.pixpassvisa.com';

    const htmlContent = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; color: #1e293b; background: #f8fafc; padding: 32px; border-radius: 16px;">
        <div style="text-align: center; margin-bottom: 24px;">
          <h1 style="font-size: 22px; color: #0f172a; margin: 0 0 8px;">Your Photo is Ready! ✅</h1>
          <p style="color: #64748b; font-size: 14px; margin: 0;">Processed by PixPassVisa</p>
        </div>

        <div style="background: white; border-radius: 12px; padding: 24px; border: 1px solid #e2e8f0; margin-bottom: 20px;">
          <h3 style="margin: 0 0 16px; font-size: 15px; color: #334155;">📸 Your Downloads</h3>

          <div style="margin-bottom: 16px;">
           
            <a href="${verifiedPhotoUrl}" style="display: inline-block; background: #0f172a; color: white; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-size: 13px; font-weight: 700;">⬇ Download Photo</a>
          </div>

          ${printSheetUrl ? `
          <div style="margin-bottom: 16px;">
            <p style="margin: 0 0 6px; font-size: 13px; color: #64748b; font-weight: 600;">A4 Print Sheet (20 photos, ready to cut)</p>
            <a href="${printSheetUrl}" style="display: inline-block; background: #166534; color: white; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-size: 13px; font-weight: 700;">⬇ Download Print Sheet</a>
          </div>
          ` : ''}

          ${photoId ? `
          <div style="border-top: 1px solid #f1f5f9; margin-top: 16px; padding-top: 12px;">
            <p style="margin: 0; font-size: 12px; color: #94a3b8;">You can also access your photo anytime at:<br/>
            <a href="${appUrl}/preview/${photoId}${photo.downloadToken ? `?token=${photo.downloadToken}` : ''}" style="color: #2563eb;">${appUrl}/preview/${photoId}</a></p>
          </div>
          ` : ''}
        </div>

      

        <div style="text-align: center; padding: 16px 0; border-top: 1px solid #e2e8f0;">
          <p style="font-size: 11px; color: #cbd5e1; margin: 0;">PixPassVisa — Professional Visa Photo Processing</p>
        </div>
      </div>
    `;

    const result = await sendEmail({
      to: email,
      subject: `Your ${docName} Delivery - PixPassVisa`,
      html: htmlContent,
    });

    const { logAuditEvent } = await import("@/lib/audit");
    await logAuditEvent({
      eventType: "email_sent",
      photoId: photo._id,
      orderId: photo.orderId,
      actor: "user",
      metadata: {
        recipient: email,
        subject: `Your ${docName} Delivery - PixPassVisa`,
        template: "direct_delivery",
        status: result.success ? "sent" : "failed",
      },
    });

    if (result.success) {
      return NextResponse.json({ success: true });
    } else {
      throw new Error("Email sending failed");
    }
  } catch (error: any) {
    console.error("Failed to send photo via email:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
