import { NextResponse } from "next/server";
import crypto from "crypto";
import dbConnect from "@/lib/mongodb";
import Photo from "@/models/Photo";
import ExpertOrder from "@/models/ExpertOrder";
import Order from "@/models/Order";
import Payment from "@/models/Payment";
import Dispute from "@/models/Dispute";
import { sendEmail } from "@/lib/mail";
import { getSafeSpec } from "@/lib/specs";
import { sendGA4PurchaseEvent } from "@/lib/ga4";
import { logAuditEvent } from "@/lib/audit";

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get("x-razorpay-signature");

    if (!signature) {
      return NextResponse.json({ error: "Missing signature" }, { status: 400 });
    }

    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
    if (!secret) {
      console.error("Missing RAZORPAY_WEBHOOK_SECRET");
      return NextResponse.json({ error: "Webhook secret not configured" }, { status: 500 });
    }

    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(rawBody)
      .digest("hex");

    const expectedSigBuf = Buffer.from(expectedSignature, "hex");
    const signatureBuf = Buffer.from(signature, "hex");

    if (
      expectedSigBuf.length !== signatureBuf.length ||
      !crypto.timingSafeEqual(expectedSigBuf, signatureBuf)
    ) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    const event = JSON.parse(rawBody);

    // Handle payment.captured or order.paid
    // Razorpay often sends order.paid which contains order and payment entities
    if (event.event === "order.paid" || event.event === "payment.captured") {
      const paymentEntity = event.payload?.payment?.entity || {};
      const notes = paymentEntity.notes || {};
      const { photoId, expertOrderId } = notes;

      await dbConnect();

      if (photoId) {
        const photo = await Photo.findById(photoId);
        if (photo && photo.status !== "paid") {
          photo.status = "paid";
          photo.razorpayPaymentId = paymentEntity.id;

          const userEmail = (photo as any).guestEmail || paymentEntity.email;

          // Update or create permanent Order record
          let permanentOrder = photo.orderId ? await Order.findById(photo.orderId) : null;
          if (!permanentOrder) {
            permanentOrder = await Order.findOne({
              $or: [
                { "metadata.razorpayOrderId": paymentEntity.order_id },
                { photoId: photo._id },
              ],
            });
          }

          if (permanentOrder) {
            permanentOrder.status = "paid";
            await permanentOrder.save();
          } else {
            permanentOrder = await Order.create({
              orderNumber: `ORD-${Date.now()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`,
              userId: photo.userId,
              guestEmail: userEmail || paymentEntity.email || "customer@pixpassvisa.com",
              documentType: photo.documentType,
              isExpert: Boolean(photo.isExpert),
              amount: paymentEntity.amount ? paymentEntity.amount / 100 : (photo.isExpert ? 9.99 : 6.99),
              currency: paymentEntity.currency || "USD",
              status: "paid",
              photoId: photo._id,
              metadata: { razorpayOrderId: paymentEntity.order_id },
            });
          }

          photo.orderId = permanentOrder._id;
          await photo.save();

          // Update or create permanent Payment record
          let permanentPayment = await Payment.findOne({ gatewayPaymentId: paymentEntity.id });
          if (!permanentPayment && paymentEntity.order_id) {
            permanentPayment = await Payment.findOne({ gatewayOrderId: paymentEntity.order_id });
          }

          if (permanentPayment) {
            permanentPayment.status = "captured";
            permanentPayment.gatewayPaymentId = paymentEntity.id;
            permanentPayment.orderId = permanentOrder._id;
            if (paymentEntity.method) permanentPayment.method = paymentEntity.method;
            if (userEmail) permanentPayment.email = userEmail;
            await permanentPayment.save();
          } else {
            permanentPayment = await Payment.create({
              orderId: permanentOrder._id,
              photoId: photo._id,
              gateway: "razorpay",
              gatewayOrderId: paymentEntity.order_id || `order_${photo._id}`,
              gatewayPaymentId: paymentEntity.id,
              amount: paymentEntity.amount ? paymentEntity.amount / 100 : permanentOrder.amount,
              currency: paymentEntity.currency || permanentOrder.currency,
              status: "captured",
              method: paymentEntity.method,
              email: userEmail || paymentEntity.email,
              metadata: paymentEntity,
            });
          }

          // Fire GA4 Purchase Event
          if (notes.gaClientId) {
            const spec = getSafeSpec(photo.documentType);
            await sendGA4PurchaseEvent({
              clientId: notes.gaClientId,
              transactionId: paymentEntity.id,
              amount: paymentEntity.amount / 100,
              currency: paymentEntity.currency,
              items: [
                {
                  item_id: photoId,
                  item_name: `${spec.name || "Passport Photo"} ${photo.isExpert ? "(Expert Review)" : "(Standard)"}`,
                  price: paymentEntity.amount / 100,
                  quantity: 1,
                  item_category: photo.isExpert ? "Expert Edit" : "Standard Photo",
                },
              ],
            });
          }

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
                  <h2>New Expert Edit Order (Photo Upgrade - Webhook)</h2>
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
                console.log(`[WEBHOOK] Expert emails sent successfully for photo ${photoId}`);
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
                          <p style="margin: 0 0 6px; font-size: 13px; color: #64748b; font-weight: 600;">A4 Print Sheet (ready to cut)</p>
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
                  console.log(`[WEBHOOK] Email sent successfully for photo ${photoId}`);
                  await logAuditEvent({
                    eventType: "email_sent",
                    orderId: permanentOrder?._id,
                    paymentId: permanentPayment?._id,
                    photoId: photo._id,
                    actor: "webhook",
                    metadata: {
                      recipient: userEmail,
                      subject: `Your ${countryName} (${documentName}) photo is ready — Download now! 🎉`,
                      template: "delivery",
                      status: "sent",
                    },
                  });
                }
              } catch (err) {
                console.error(`[WEBHOOK] Failed to send email for photo ${photoId}:`, err);
              await logAuditEvent({
                eventType: "email_sent",
                orderId: permanentOrder?._id,
                paymentId: permanentPayment?._id,
                photoId: photo._id,
                actor: "webhook",
                metadata: {
                  recipient: userEmail,
                  status: "failed",
                  error: String(err),
                },
              });
            }
          }
        }
      } else if (expertOrderId) {
        const order = await ExpertOrder.findById(expertOrderId);
        if (order && order.status !== "paid") {
          order.status = "paid";
          order.razorpayPaymentId = paymentEntity.id;
          await order.save();

          const customerEmail = order.email || paymentEntity.email || "customer@pixpassvisa.com";

          // Permanent Order record for Expert Order
          let permanentOrder = await Order.findOne({
            $or: [
              { "metadata.expertOrderId": expertOrderId },
              { "metadata.razorpayOrderId": paymentEntity.order_id },
            ],
          });

          if (permanentOrder) {
            permanentOrder.status = "paid";
            await permanentOrder.save();
          } else {
            permanentOrder = await Order.create({
              orderNumber: `ORD-${Date.now()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`,
              guestEmail: customerEmail,
              documentType: "expert-photo-edit",
              isExpert: true,
              amount: paymentEntity.amount ? paymentEntity.amount / 100 : 9.99,
              currency: paymentEntity.currency || "USD",
              status: "paid",
              metadata: {
                expertOrderId,
                razorpayOrderId: paymentEntity.order_id,
              },
            });
          }

          // Permanent Payment record
          let permanentPayment = await Payment.findOne({ gatewayPaymentId: paymentEntity.id });
          if (permanentPayment) {
            permanentPayment.status = "captured";
            permanentPayment.orderId = permanentOrder._id;
            await permanentPayment.save();
          } else {
            permanentPayment = await Payment.create({
              orderId: permanentOrder._id,
              gateway: "razorpay",
              gatewayOrderId: paymentEntity.order_id || `expert_${expertOrderId}`,
              gatewayPaymentId: paymentEntity.id,
              amount: paymentEntity.amount ? paymentEntity.amount / 100 : permanentOrder.amount,
              currency: paymentEntity.currency || permanentOrder.currency,
              status: "captured",
              method: paymentEntity.method,
              email: customerEmail,
              metadata: paymentEntity,
            });
          }

          // Fire GA4 Purchase Event
          if (notes.gaClientId) {
            await sendGA4PurchaseEvent({
              clientId: notes.gaClientId,
              transactionId: paymentEntity.id,
              amount: paymentEntity.amount / 100,
              currency: paymentEntity.currency,
              items: [
                {
                  item_id: expertOrderId,
                  item_name: "Expert Manual Photo Edit",
                  price: paymentEntity.amount / 100,
                  quantity: 1,
                  item_category: "Expert Edit",
                },
              ],
            });
          }

          try {
            const adminHtml = `
              <h2>New Expert Edit Order (Webhook Verified)</h2>
              <p><strong>Order ID:</strong> ${order._id}</p>
              <p><strong>Customer Email:</strong> ${customerEmail}</p>
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
              to: customerEmail,
              bcc: 'usvisaphotoai@gmail.com',
              subject: "Your Expert Photo Edit Order is Confirmed - PixPassVisa",
              html: `<p>Hi there,</p><p>We have received your payment for the expert photo edit. Our team is working on your photos now and will email them back to you when they are ready.</p><p>Thank you for choosing PixPassVisa!</p>`,
            });
            console.log(`[WEBHOOK] Emails sent successfully for expert order ${expertOrderId}`);

            await logAuditEvent({
              eventType: "email_sent",
              orderId: permanentOrder._id,
              paymentId: permanentPayment._id,
              actor: "webhook",
              metadata: {
                recipient: customerEmail,
                subject: "Your Expert Photo Edit Order is Confirmed - PixPassVisa",
                template: "expert_confirmation",
                status: "sent",
              },
            });
          } catch (mailError) {
            console.error(`[WEBHOOK] Failed to send emails for expert edit ${expertOrderId}:`, mailError);
            await logAuditEvent({
              eventType: "email_sent",
              orderId: permanentOrder._id,
              paymentId: permanentPayment._id,
              actor: "webhook",
              metadata: {
                recipient: customerEmail,
                status: "failed",
                error: String(mailError),
              },
            });
          }
        }
      }
    } else if (event.event === "payment.failed") {
      const paymentEntity = event.payload?.payment?.entity || {};
      const notes = paymentEntity.notes || {};
      const { photoId, expertOrderId } = notes;

      await dbConnect();

      if (photoId) {
        const photo = await Photo.findById(photoId);
        if (photo && photo.status !== "paid") {
          photo.status = "payment_failed";
          await photo.save();

          const userEmail = (photo as any).guestEmail || paymentEntity.email;
          if (userEmail) {
            const spec = getSafeSpec(photo.documentType);
            const documentName = spec.name || "Passport Photo";
            const countryName = spec.country || spec.name || "Passport Photo";
            const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.pixpassvisa.com';
            const previewLink = `${appUrl}/preview/${photoId}`;
            const previewImageUrl = photo.secureUrl || photo.previewUrl || '';

            // Update permanent Order & Payment status
            if (photo.orderId) {
              await Order.findByIdAndUpdate(photo.orderId, { status: "failed" });
            }
            if (paymentEntity.order_id) {
              await Payment.findOneAndUpdate({ gatewayOrderId: paymentEntity.order_id }, { status: "failed" });
            }

            try {
              await sendEmail({
                to: userEmail,
                bcc: 'usvisaphotoai@gmail.com',
                subject: `Payment Failed — Your ${countryName} Photo is Waiting! 📸`,
                html: `
                  <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; color: #1e293b; background: #f8fafc; padding: 32px; border-radius: 16px;">
                    <div style="text-align: center; margin-bottom: 24px;">
                      <div style="display: inline-block; background: #fef2f2; border-radius: 50%; width: 56px; height: 56px; line-height: 56px; font-size: 28px; margin-bottom: 12px;">⚠️</div>
                      <h1 style="font-size: 22px; color: #0f172a; margin: 0 0 8px;">Payment Could Not Be Processed</h1>
                      <p style="color: #64748b; font-size: 14px; margin: 0;">Don't worry — your photo is saved and ready!</p>
                    </div>

                    ${previewImageUrl ? `
                    <div style="background: white; border-radius: 12px; padding: 16px; border: 1px solid #e2e8f0; margin-bottom: 20px; text-align: center;">
                      <p style="margin: 0 0 12px; font-size: 13px; color: #64748b; font-weight: 600;">Your Processed ${countryName} ${documentName}</p>
                      <img src="${previewImageUrl}" alt="${countryName} ${documentName} Preview" style="max-width: 180px; height: auto; border-radius: 8px; border: 2px solid #e2e8f0; box-shadow: 0 2px 8px rgba(0,0,0,0.08);" />
                    </div>
                    ` : ''}

                    <div style="background: white; border-radius: 12px; padding: 24px; border: 1px solid #e2e8f0; margin-bottom: 20px;">
                      <p style="margin: 0 0 12px; font-size: 15px; color: #334155;">Hi there,</p>
                      <p style="margin: 0 0 12px; font-size: 14px; color: #475569; line-height: 1.6;">We noticed your recent payment for your <strong>${countryName} (${documentName})</strong> could not be completed. Your photo has been processed and is waiting for you!</p>
                      <p style="margin: 0 0 20px; font-size: 14px; color: #475569; line-height: 1.6;">Click below to return to your photo and complete your purchase:</p>
                      
                      <div style="text-align: center; margin: 24px 0;">
                        <a href="${previewLink}" style="display: inline-block; background: linear-gradient(135deg, #0f172a 0%, #1e40af 100%); color: white; padding: 14px 32px; border-radius: 10px; text-decoration: none; font-size: 15px; font-weight: 700; box-shadow: 0 4px 14px rgba(15,23,42,0.25);">Complete Your Purchase →</a>
                      </div>
                    </div>

                    <div style="background: white; border-radius: 12px; padding: 20px; border: 1px solid #e2e8f0; margin-bottom: 20px;">
                      <h3 style="margin: 0 0 8px; font-size: 15px; color: #334155;">📋 Your Photo Details</h3>
                      <table style="width: 100%; font-size: 13px; color: #475569;">
                        <tr><td style="padding: 4px 0;">Country</td><td style="text-align: right; font-weight: 600;">${countryName}</td></tr>
                        <tr><td style="padding: 4px 0;">Document</td><td style="text-align: right; font-weight: 600;">${documentName}</td></tr>
                        <tr><td style="padding: 4px 0;">Size</td><td style="text-align: right; font-weight: 600;">${spec.width_px}×${spec.height_px} px</td></tr>
                        <tr><td style="padding: 4px 0;">Status</td><td style="text-align: right; font-weight: 600; color: #f59e0b;">⏳ Awaiting Payment</td></tr>
                      </table>
                    </div>

                    <div style="text-align: center; padding: 12px 0;">
                      <p style="font-size: 12px; color: #94a3b8; margin: 0 0 4px;">Direct link to your photo:</p>
                      <a href="${previewLink}" style="font-size: 12px; color: #2563eb;">${previewLink}</a>
                    </div>

                    <div style="text-align: center; padding-top: 16px; border-top: 1px solid #e2e8f0;">
                      <p style="font-size: 11px; color: #cbd5e1; margin: 0;">PixPassVisa — Professional Visa Photo Processing</p>
                    </div>
                  </div>
                `
              });
              console.log(`[WEBHOOK] Payment failed email sent for photo ${photoId}`);
              await logAuditEvent({
                eventType: "email_sent",
                photoId: photo._id,
                orderId: photo.orderId,
                actor: "webhook",
                metadata: {
                  recipient: userEmail,
                  subject: `Payment Failed — Your ${countryName} Photo is Waiting! 📸`,
                  template: "payment_failed",
                  status: "sent",
                },
              });
            } catch (err) {
              console.error(`[WEBHOOK] Failed to send payment failed email for photo ${photoId}:`, err);
            }
          }
        }
      } else if (expertOrderId) {
        const order = await ExpertOrder.findById(expertOrderId);
        if (order && order.status !== "paid") {
          order.status = "payment_failed";
          await order.save();

          await Order.findOneAndUpdate({ "metadata.expertOrderId": expertOrderId }, { status: "failed" });
          if (paymentEntity.order_id) {
            await Payment.findOneAndUpdate({ gatewayOrderId: paymentEntity.order_id }, { status: "failed" });
          }

          const userEmail = order.email || paymentEntity.email;
          if (userEmail) {
            const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.pixpassvisa.com';
            const retryLink = `${appUrl}/expert-edit`;

            try {
              await sendEmail({
                to: userEmail,
                bcc: 'usvisaphotoai@gmail.com',
                subject: "Payment Failed for Expert Edit — Your Photos Are Waiting! 📸",
                html: `
                  <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; color: #1e293b; background: #f8fafc; padding: 32px; border-radius: 16px;">
                    <div style="text-align: center; margin-bottom: 24px;">
                      <div style="display: inline-block; background: #fef2f2; border-radius: 50%; width: 56px; height: 56px; line-height: 56px; font-size: 28px; margin-bottom: 12px;">⚠️</div>
                      <h1 style="font-size: 22px; color: #0f172a; margin: 0 0 8px;">Expert Edit Payment Failed</h1>
                      <p style="color: #64748b; font-size: 14px; margin: 0;">Don't worry — your photos are saved!</p>
                    </div>

                    ${order.photos && order.photos.length > 0 ? `
                    <div style="background: white; border-radius: 12px; padding: 16px; border: 1px solid #e2e8f0; margin-bottom: 20px; text-align: center;">
                      <p style="margin: 0 0 12px; font-size: 13px; color: #64748b; font-weight: 600;">Your Uploaded Photos</p>
                      <div style="display: flex; gap: 8px; justify-content: center; flex-wrap: wrap;">
                        ${order.photos.slice(0, 3).map((url: string) => `<img src="${url}" alt="Uploaded Photo" style="max-width: 120px; height: auto; border-radius: 8px; border: 2px solid #e2e8f0; box-shadow: 0 2px 8px rgba(0,0,0,0.08);" />`).join('')}
                      </div>
                    </div>
                    ` : ''}

                    <div style="background: white; border-radius: 12px; padding: 24px; border: 1px solid #e2e8f0; margin-bottom: 20px;">
                      <p style="margin: 0 0 12px; font-size: 15px; color: #334155;">Hi there,</p>
                      <p style="margin: 0 0 12px; font-size: 14px; color: #475569; line-height: 1.6;">Unfortunately, your payment for the <strong>Expert Photo Edit</strong> could not be processed. Your edit request is currently on hold.</p>
                      <p style="margin: 0 0 20px; font-size: 14px; color: #475569; line-height: 1.6;">Please try again so our team can get started on your photos right away!</p>
                      
                      <div style="text-align: center; margin: 24px 0;">
                        <a href="${retryLink}" style="display: inline-block; background: linear-gradient(135deg, #0f172a 0%, #1e40af 100%); color: white; padding: 14px 32px; border-radius: 10px; text-decoration: none; font-size: 15px; font-weight: 700; box-shadow: 0 4px 14px rgba(15,23,42,0.25);">Retry Payment →</a>
                      </div>
                    </div>

                    <div style="background: white; border-radius: 12px; padding: 20px; border: 1px solid #e2e8f0; margin-bottom: 20px;">
                      <h3 style="margin: 0 0 8px; font-size: 15px; color: #334155;">📋 Order Details</h3>
                      <table style="width: 100%; font-size: 13px; color: #475569;">
                        <tr><td style="padding: 4px 0;">Order ID</td><td style="text-align: right; font-weight: 600;">${order._id}</td></tr>
                        <tr><td style="padding: 4px 0;">Photos</td><td style="text-align: right; font-weight: 600;">${order.photos?.length || 0} uploaded</td></tr>
                        <tr><td style="padding: 4px 0;">Status</td><td style="text-align: right; font-weight: 600; color: #f59e0b;">⏳ Awaiting Payment</td></tr>
                      </table>
                    </div>

                    <div style="text-align: center; padding-top: 16px; border-top: 1px solid #e2e8f0;">
                      <p style="font-size: 11px; color: #cbd5e1; margin: 0;">PixPassVisa — Professional Visa Photo Processing</p>
                    </div>
                  </div>
                `
              });
              console.log(`[WEBHOOK] Payment failed email sent for expert order ${expertOrderId}`);
              await logAuditEvent({
                eventType: "email_sent",
                actor: "webhook",
                metadata: {
                  recipient: userEmail,
                  expertOrderId,
                  subject: "Payment Failed for Expert Edit — Your Photos Are Waiting! 📸",
                  template: "expert_payment_failed",
                  status: "sent",
                },
              });
            } catch (err) {
              console.error(`[WEBHOOK] Failed to send payment failed email for expert order ${expertOrderId}:`, err);
            }
          }
        }
      }
    } else if (event.event === "refund.created" || event.event === "refund.processed" || event.event === "payment.refunded") {
      const refundEntity = event.payload?.refund?.entity || {};
      const paymentEntity = event.payload?.payment?.entity || {};
      const paymentId = refundEntity.payment_id || paymentEntity.id;

      await dbConnect();
      if (paymentId) {
        const payment = await Payment.findOne({ gatewayPaymentId: paymentId });
        if (payment) {
          payment.status = "refunded";
          await payment.save();

          if (payment.orderId) {
            await Order.findByIdAndUpdate(payment.orderId, { status: "refunded" });
          }
        }

        // Permanent Audit Event for Refund
        await logAuditEvent({
          eventType: "refund",
          paymentId: payment?._id,
          orderId: payment?.orderId,
          photoId: payment?.photoId,
          actor: "webhook",
          metadata: {
            gatewayRefundId: refundEntity.id,
            gatewayPaymentId: paymentId,
            amount: refundEntity.amount ? refundEntity.amount / 100 : undefined,
            currency: refundEntity.currency,
            reason: refundEntity.notes?.reason || "Refund processed via Razorpay",
            status: refundEntity.status || "processed",
          },
        });
        console.log(`[WEBHOOK] Processed refund for payment ${paymentId}`);
      }
    } else if (event.event?.startsWith("dispute.")) {
      const disputeEntity = event.payload?.dispute?.entity || {};
      const paymentId = disputeEntity.payment_id;

      await dbConnect();
      let payment = null;
      let order = null;
      if (paymentId) {
        payment = await Payment.findOne({ gatewayPaymentId: paymentId });
        if (payment && payment.orderId) {
          order = await Order.findById(payment.orderId);
          if (order) {
            order.status = "disputed";
            await order.save();
          }
        }
      }

      const disputeStatus = event.event === "dispute.won" ? "won" : event.event === "dispute.lost" ? "lost" : event.event === "dispute.closed" ? "closed" : "open";

      // Permanent Dispute record
      const dispute = await Dispute.create({
        orderId: order?._id,
        paymentId: payment?._id,
        gatewayDisputeId: disputeEntity.id,
        amount: disputeEntity.amount ? disputeEntity.amount / 100 : 0,
        currency: disputeEntity.currency || "USD",
        reason: disputeEntity.reason_code || disputeEntity.reason_description || "Dispute received",
        status: disputeStatus,
        evidence: disputeEntity,
      });

      // Permanent Audit Event for Dispute
      await logAuditEvent({
        eventType: "dispute",
        disputeId: dispute._id,
        orderId: order?._id,
        paymentId: payment?._id,
        photoId: payment?.photoId,
        actor: "webhook",
        metadata: {
          gatewayDisputeId: disputeEntity.id,
          event: event.event,
          status: disputeStatus,
          amount: disputeEntity.amount ? disputeEntity.amount / 100 : undefined,
          reason: disputeEntity.reason_code || disputeEntity.reason_description,
        },
      });
      console.log(`[WEBHOOK] Processed dispute ${disputeEntity.id} for payment ${paymentId}`);
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Razorpay Webhook Error:", error);
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
  }
}
