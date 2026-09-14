import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from "@/lib/mongodb";
import Photo from "@/models/Photo";
import Order from "@/models/Order";
import Payment from "@/models/Payment";
import crypto from "crypto";
import { sendEmail } from "@/lib/mail";
import { getSafeSpec } from "@/lib/specs";
import { logAuditEvent } from "@/lib/audit";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      photoId,
    } = await req.json();

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !photoId) {
      return NextResponse.json(
        { error: "Missing required payment verification parameters" },
        { status: 400 }
      );
    }

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET as string)
      .update(sign.toString())
      .digest("hex");

    const expectedSignBuf = Buffer.from(expectedSign, "hex");
    const signatureBuf = Buffer.from(razorpay_signature, "hex");

    if (
      expectedSignBuf.length !== signatureBuf.length ||
      !crypto.timingSafeEqual(expectedSignBuf, signatureBuf)
    ) {
      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 400 }
      );
    }

    // Payment signature is valid, fetch photo and verify order linkage
    await dbConnect();
    const photo = await Photo.findById(photoId);

    if (!photo) {
      return NextResponse.json({ error: "Photo not found" }, { status: 404 });
    }

    // Ensure the verified order ID matches the order created for this photo
    if (photo.razorpayOrderId && photo.razorpayOrderId !== razorpay_order_id) {
      return NextResponse.json(
        { error: "Payment does not correspond to this photo order" },
        { status: 400 }
      );
    }

    // Replay attack guard: Ensure this payment ID was not already redeemed for another photo
    const existingPhotoWithPayment = await Photo.findOne({
      razorpayPaymentId: razorpay_payment_id,
      _id: { $ne: photo._id },
    });
    if (existingPhotoWithPayment) {
      return NextResponse.json(
        { error: "This payment transaction has already been redeemed" },
        { status: 400 }
      );
    }

    const existingPaymentRecord = await Payment.findOne({
      razorpayPaymentId: razorpay_payment_id,
    });
    if (
      existingPaymentRecord &&
      existingPaymentRecord.photoId &&
      existingPaymentRecord.photoId.toString() !== photo._id.toString()
    ) {
      return NextResponse.json(
        { error: "This payment transaction has already been redeemed for another order" },
        { status: 400 }
      );
    }

    // If photo is linked to a user account, enforce access control
    if (photo.userId) {
      // @ts-ignore
      if (!session || !session.user || photo.userId.toString() !== session.user.id.toString()) {
        return NextResponse.json({ error: "Unauthorized photo access" }, { status: 403 });
      }
    }

    const alreadyPaid = photo.status === "paid";
    photo.status = "paid";
    photo.razorpayPaymentId = razorpay_payment_id;
    if (!photo.downloadToken) {
      photo.downloadToken = crypto.randomBytes(24).toString("hex");
    }
    await photo.save();

    const userEmail = session?.user?.email || (photo as any).guestEmail;

    // Update or create permanent Order & Payment records
    let permanentOrder = photo.orderId ? await Order.findById(photo.orderId) : null;
    if (!permanentOrder) {
      permanentOrder = await Order.findOne({
        $or: [
          { "metadata.razorpayOrderId": razorpay_order_id },
          { photoId: photo._id },
        ],
      });
    }

    if (permanentOrder) {
      permanentOrder.status = "paid";
      if (!permanentOrder.guestEmail && userEmail) {
        permanentOrder.guestEmail = userEmail;
      }
      await permanentOrder.save();
    } else {
      permanentOrder = await Order.create({
        orderNumber: `ORD-${Date.now()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`,
        userId: photo.userId || (session?.user as any)?.id || undefined,
        guestEmail: userEmail || "customer@pixpassvisa.com",
        documentType: photo.documentType,
        isExpert: Boolean(photo.isExpert),
        amount: photo.isExpert ? 9.99 : 6.99,
        currency: "USD",
        status: "paid",
        photoId: photo._id,
        metadata: { razorpayOrderId: razorpay_order_id },
      });
      photo.orderId = permanentOrder._id;
      await photo.save();
    }

    // Update or create permanent Payment record
    let permanentPayment = await Payment.findOne({
      $or: [
        { gatewayOrderId: razorpay_order_id },
        { orderId: permanentOrder._id },
        { gatewayPaymentId: razorpay_payment_id },
      ],
    });

    if (permanentPayment) {
      permanentPayment.status = "captured";
      permanentPayment.gatewayPaymentId = razorpay_payment_id;
      permanentPayment.orderId = permanentOrder._id;
      if (userEmail) permanentPayment.email = userEmail;
      await permanentPayment.save();
    } else {
      permanentPayment = await Payment.create({
        orderId: permanentOrder._id,
        photoId: photo._id,
        gateway: "razorpay",
        gatewayOrderId: razorpay_order_id,
        gatewayPaymentId: razorpay_payment_id,
        amount: permanentOrder.amount,
        currency: permanentOrder.currency,
        status: "captured",
        email: userEmail,
      });
    }

    // Idempotency check: if already paid (e.g., via webhook), skip sending duplicate emails
    if (alreadyPaid) {
      return NextResponse.json({ success: true, message: "Payment verified successfully" });
    }

    // Fire & forget delivery + testimonial email
    console.log(`[PAYMENT VERIFY] Attempting to send email for photo ${photoId} to: ${userEmail}`);

    if (userEmail) {
      const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.pixpassvisa.com';
      const photoDownloadUrl = photo.secureUrl || '';
      const printSheetDownloadUrl = photo.printSheetUrl || '';
      const previewLink = `${appUrl}/preview/${photoId}`;
      const spec = getSafeSpec(photo.documentType);
      const documentName = spec.name || "Passport Photo";
      const countryName = spec.country || spec.name || "Passport Photo";

      try {
        if (photo.isExpert) {
          const adminHtml = `
            <h2>New Expert Edit Order (Photo Upgrade)</h2>
            <p><strong>Photo ID:</strong> ${photo._id}</p>
            <p><strong>Customer Email:</strong> ${userEmail}</p>
            <p><strong>Selected Country:</strong> ${countryName}</p>
            <p><strong>Document Type:</strong> ${documentName}</p>
            <p><strong>Photos:</strong></p>
            <ul>
              ${photo.originalUrl ? `<li><strong>Original Image:</strong> <a href="${photo.originalUrl}">${photo.originalUrl}</a></li>` : ''}
              <li><strong>Processed Image:</strong> <a href="${photo.secureUrl}">${photo.secureUrl}</a></li>
            </ul>
          `;

          const adminEmail = process.env.ADMIN_EMAILS || process.env.RESEND_REPLY_TO;
          if (adminEmail) {
            await sendEmail({
              to: adminEmail,
              subject: `New Expert Edit Order: ${photo._id} (${countryName})`,
              html: adminHtml,
            });
          }

          await sendEmail({
            to: userEmail,
            bcc: 'usvisaphotoai@gmail.com',
            subject: "Your Expert Photo Edit Order is Confirmed - PixPassVisa",
            html: `<p>Hi there,</p><p>We have received your payment for the expert photo edit for your <strong>${countryName} (${documentName})</strong>.</p>${photo.originalUrl ? `<p><strong>Original Image:</strong> <a href="${photo.originalUrl}">${photo.originalUrl}</a></p>` : ''}<p>Our team is working on your photo now and will email it back to you when it is ready.</p><p>Thank you for choosing PixPassVisa!</p>`,
          });
          console.log(`[PAYMENT VERIFY] Expert emails sent successfully for photo ${photoId}`);
          await logAuditEvent({
            eventType: "email_sent",
            orderId: permanentOrder?._id,
            paymentId: permanentPayment?._id,
            photoId: photo._id,
            actor: "system",
            metadata: {
              recipient: userEmail,
              subject: `New Expert Edit Order: ${photo._id} (${countryName})`,
              template: "expert_order",
              status: "sent",
            },
          });
        } else {
          await sendEmail({
            to: userEmail,
            bcc: 'usvisaphotoai@gmail.com',
            subject: `Your ${countryName} (${documentName}) photo is ready — Download now! 🎉`,
            html: `
              <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; color: #1e293b; background: #f8fafc; padding: 32px; border-radius: 16px;">
                <div style="text-align: center; margin-bottom: 24px;">
                  <h1 style="font-size: 22px; color: #0f172a; margin: 0 0 8px;">Your ${countryName} (${documentName}) is Ready! ✅</h1>
                  <p style="color: #64748b; font-size: 14px; margin: 0;">Thank you for your purchase</p>
                </div>

                <div style="background: white; border-radius: 12px; padding: 24px; border: 1px solid #e2e8f0; margin-bottom: 20px;">
                  <h3 style="margin: 0 0 16px; font-size: 15px; color: #334155;">📸 Your Downloads</h3>

                  <div style="margin-bottom: 16px;">
                    <p style="margin: 0 0 6px; font-size: 13px; color: #64748b; font-weight: 600;">Digital Photo (${spec.width_px}×${spec.height_px}, ${countryName} ${documentName} Ready)</p>
                    <a href="${photoDownloadUrl}" style="display: inline-block; background: #0f172a; color: white; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-size: 13px; font-weight: 700;">⬇ Download Photo</a>
                  </div>

                  ${photo.originalUrl ? `
                  <div style="margin-bottom: 16px;">
                    <p style="margin: 0 0 6px; font-size: 13px; color: #64748b; font-weight: 600;">Original Uploaded Image</p>
                    <a href="${photo.originalUrl}" style="display: inline-block; background: #475569; color: white; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-size: 13px; font-weight: 700;">⬇ Download Original Image</a>
                  </div>
                  ` : ''}

                  ${printSheetDownloadUrl ? `
                  <div style="margin-bottom: 16px;">
                    <p style="margin: 0 0 6px; font-size: 13px; color: #64748b; font-weight: 600;">A4 Print Sheet (20 photos, ready to cut)</p>
                    <a href="${printSheetDownloadUrl}" style="display: inline-block; background: #166534; color: white; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-size: 13px; font-weight: 700;">⬇ Download Print Sheet</a>
                  </div>
                  ` : ''}

                  <div style="border-top: 1px solid #f1f5f9; margin-top: 16px; padding-top: 12px;">
                    <p style="margin: 0; font-size: 12px; color: #94a3b8;">You can also access your photo anytime at:<br/>
                    <a href="${previewLink}" style="color: #2563eb;">${previewLink}</a></p>
                  </div>
                </div>

                <div style="background: white; border-radius: 12px; padding: 20px; border: 1px solid #e2e8f0; margin-bottom: 20px;">
                  <h3 style="margin: 0 0 8px; font-size: 15px; color: #334155;">📋 Photo Specifications</h3>
                  <table style="width: 100%; font-size: 13px; color: #475569;">
                    <tr><td style="padding: 4px 0;">Selected Country</td><td style="text-align: right; font-weight: 600;">${countryName}</td></tr>
                    <tr><td style="padding: 4px 0;">Document Type</td><td style="text-align: right; font-weight: 600;">${documentName}</td></tr>
                    <tr><td style="padding: 4px 0;">Size</td><td style="text-align: right; font-weight: 600;">${spec.width_px}×${spec.height_px} px ${spec.width_mm !== "unspecified" ? `(${spec.width_mm}×${spec.height_mm} mm)` : ""}</td></tr>
                    <tr><td style="padding: 4px 0;">Resolution</td><td style="text-align: right; font-weight: 600;">${spec.dpi || 300} DPI</td></tr>
                    <tr><td style="padding: 4px 0;">Format</td><td style="text-align: right; font-weight: 600;">JPEG, sRGB</td></tr>
                    <tr><td style="padding: 4px 0;">Background</td><td style="text-align: right; font-weight: 600;">${spec.bg_color.charAt(0).toUpperCase() + spec.bg_color.slice(1)}</td></tr>
                  </table>
                </div>

                <div style="text-align: center; padding: 16px 0;">
                  <p style="font-size: 13px; color: #64748b; margin: 0 0 8px;"><strong>We'd love your feedback!</strong></p>
                  <p style="font-size: 12px; color: #94a3b8; margin: 0;">Reply to this email with a quick testimonial and we may feature it on our site!</p>
                </div>

                <div style="text-align: center; padding-top: 16px; border-top: 1px solid #e2e8f0;">
                  <p style="font-size: 11px; color: #cbd5e1; margin: 0;">PixPassVisa — Professional Visa Photo Processing</p>
                </div>
              </div>
            `
          });
          console.log(`[PAYMENT VERIFY] Email sent successfully for photo ${photoId}`);
          await logAuditEvent({
            eventType: "email_sent",
            orderId: permanentOrder?._id,
            paymentId: permanentPayment?._id,
            photoId: photo._id,
            actor: "system",
            metadata: {
              recipient: userEmail,
              subject: `Your ${countryName} (${documentName}) photo is ready — Download now! 🎉`,
              template: "delivery",
              status: "sent",
            },
          });
        }
      } catch (err) {
        console.error(`[PAYMENT VERIFY] Failed to send email for photo ${photoId}:`, err);
        await logAuditEvent({
          eventType: "email_sent",
          orderId: permanentOrder?._id,
          paymentId: permanentPayment?._id,
          photoId: photo._id,
          actor: "system",
          metadata: {
            recipient: userEmail,
            status: "failed",
            error: String(err),
          },
        });
      }
    } else {
      console.warn(`[PAYMENT VERIFY] No email found for photo ${photoId}, skipping gift delivery email.`);
    }

    return NextResponse.json({
      success: true,
      message: "Payment verified successfully",
      downloadToken: photo.downloadToken,
    });
  } catch (error: any) {
    console.error("Payment Verification Error:", error);
    return NextResponse.json(
      { error: "Failed to verify payment" },
      { status: 500 }
    );
  }
}
