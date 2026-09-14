import { NextResponse } from "next/server";
import crypto from "crypto";
import dbConnect from "@/lib/mongodb";
import ExpertOrder from "@/models/ExpertOrder";
import { sendEmail } from "@/lib/mail";

export async function POST(req: Request) {
  try {
    const {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      expertOrderId,
    } = await req.json();

    const secret = process.env.RAZORPAY_KEY_SECRET;

    if (!secret) {
      return NextResponse.json({ error: "Server missing Razorpay secret" }, { status: 500 });
    }

    // Verify signature
    const hmac = crypto.createHmac("sha256", secret);
    hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const generated_signature = hmac.digest("hex");

    const expectedSignBuf = Buffer.from(generated_signature, "hex");
    const signatureBuf = Buffer.from(razorpay_signature, "hex");

    if (
      expectedSignBuf.length !== signatureBuf.length ||
      !crypto.timingSafeEqual(expectedSignBuf, signatureBuf)
    ) {
      return NextResponse.json({ error: "Invalid payment signature" }, { status: 400 });
    }

    await dbConnect();

    // Find the order
    const order = await ExpertOrder.findById(expertOrderId);

    if (!order) {
      return NextResponse.json({ error: "Expert Order not found" }, { status: 404 });
    }

    // Verify order linkage
    if (order.razorpayOrderId && order.razorpayOrderId !== razorpay_order_id) {
      return NextResponse.json({ error: "Payment does not match this expert order" }, { status: 400 });
    }

    // Replay attack guard
    const existingOrderWithPayment = await ExpertOrder.findOne({
      razorpayPaymentId: razorpay_payment_id,
      _id: { $ne: order._id },
    });
    if (existingOrderWithPayment) {
      return NextResponse.json({ error: "This payment has already been redeemed" }, { status: 400 });
    }

    // Idempotency check: if already paid (e.g., via webhook), skip sending emails again
    if (order.status === "paid") {
      return NextResponse.json({ success: true, message: "Payment verified successfully" });
    }

    // Update expert order record
    order.status = "paid";
    order.razorpayPaymentId = razorpay_payment_id;
    await order.save();

    // Send confirmation to admin and user via email
    try {
      const adminHtml = `
        <h2>New Expert Edit Order</h2>
        <p><strong>Order ID:</strong> ${order._id}</p>
        <p><strong>Customer Email:</strong> ${order.email}</p>
        <p><strong>Photos to Edit:</strong></p>
        <ul>
          ${order.photos.map((url: string) => `<li><a href="${url}">${url}</a></li>`).join("")}
        </ul>
      `;

      // Notify Admin
      const adminEmail = process.env.ADMIN_EMAILS || process.env.RESEND_REPLY_TO;
      if (adminEmail) {
        await sendEmail({
          to: adminEmail,
          subject: `New Expert Edit Order: ${order._id}`,
          html: adminHtml,
        });
      }

      // Notify Customer
      await sendEmail({
        to: order.email,
        bcc: 'usvisaphotoai@gmail.com',
        subject: "Your Expert Photo Edit Order is Confirmed - PixPassVisa",
        html: `<p>Hi there,</p><p>We have received your payment for the expert photo edit. Our team is working on your photos now and will email them back to you when they are ready.</p><p>Thank you for choosing PixPassVisa!</p>`,
      });
    } catch (mailError) {
      console.error("Failed to send emails for expert edit:", mailError);
      // We don't fail the complete verification request if the email fails, we still return success.
    }

    return NextResponse.json({ success: true, message: "Payment verified successfully" });
  } catch (error: any) {
    console.error("Expert Edit Verification Error:", error);
    return NextResponse.json(
      { error: "Payment verification failed" },
      { status: 500 }
    );
  }
}
