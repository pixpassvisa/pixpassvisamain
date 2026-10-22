import { beginGatewayOrder, recordAttempt, safeError } from "@/lib/checkout-diagnostics";
import { normalizedEmail } from "@/lib/request-protection";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import Razorpay from "razorpay";
import dbConnect from "@/lib/mongodb";
import Photo from "@/models/Photo";
import Order from "@/models/Order";
import Payment from "@/models/Payment";

export async function POST(req: Request) {
  let reference = "";
  try {
    const razorpayKeyId = process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET;
    
    const session = await getServerSession(authOptions);

    const { photoId, currencyOverride, isExpert, guestEmail, gaClientId, reference: attemptReference, token: attemptToken } = await req.json();

    if (!photoId) {
      return NextResponse.json({ error: "Missing photoId" }, { status: 400 });
    }

    await dbConnect();
    const photo = await Photo.findById(photoId);

    if (!photo) {
      return NextResponse.json({ error: "Photo not found" }, { status: 404 });
    }

    if (photo.userId && photo.userId.toString() !== (session?.user as any)?.id) {
      return NextResponse.json({ error: "Unauthorized photo access" }, { status: 403 });
    }

    if (photo.status === "paid") {
      return NextResponse.json({ error: "Photo is already paid for" }, { status: 400 });
    }

    const customerEmail = normalizedEmail(session?.user?.email || guestEmail);
    if (!customerEmail) return NextResponse.json({ error: "Enter a valid receipt email." }, { status: 400 });
    reference = await beginGatewayOrder(attemptReference, attemptToken, { kind: "photo", photoId: photo._id.toString(), email: customerEmail, documentType: photo.documentType });
    if (!razorpayKeyId || !razorpayKeySecret) throw { error: { code: "CONFIGURATION_ERROR", reason: "payment_keys_missing" } };
    const razorpay = new Razorpay({ key_id: razorpayKeyId, key_secret: razorpayKeySecret });
    const { getSpecById } = await import("@/lib/specs");
    const spec = getSpecById(photo.documentType);
    const basePrice = isExpert ? 6.99 : (spec?.price || 4.99);

    // Get localized price (Allows validated client override for currency)
    const { getLocalPrice } = await import("@/lib/currency");
    const validatedOverride = typeof currencyOverride === "string" && currencyOverride.trim().length === 3
      ? currencyOverride.trim().toUpperCase()
      : undefined;
    const localPrice = await getLocalPrice(basePrice, validatedOverride, isExpert);

    // Razorpay expects amount in smallest currency unit (e.g. cents, paise)
    // Most currencies use 2 decimal places, but some like JPY don't.
    // Setting amount to Math.round(amount * 100) covers USD, EUR, GBP, INR safely.
    let amountUnit = 100;
    if (localPrice.currency === 'JPY') amountUnit = 1;
    
    const amount = Math.round(localPrice.amount * amountUnit);
    const currency = localPrice.currency;

    const options = {
      amount,
      currency,
      receipt: `receipt_${photoId}`,
      notes: {
        photoId,
        checkoutReference: reference,
        ...((session?.user as any)?.id ? { userId: (session?.user as any).id } : {}),
        ...(guestEmail ? { guestEmail } : {}),
        ...(gaClientId ? { gaClientId } : {}),
      },
    };

    const order = await razorpay.orders.create(options);

    await recordAttempt(reference, "order_created", "server", { gatewayOrderId: order.id, amount: amount / amountUnit, currency, gatewayMode: razorpayKeyId.startsWith("rzp_live_") ? "live" : "test" });

    // Create permanent Order record
    const permanentOrder = await Order.create({
      orderNumber: `ORD-${Date.now()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`,
      userId: (session?.user as any)?.id || undefined,
      guestEmail: customerEmail || "guest@pixpassvisa.com",
      documentType: photo.documentType,
      isExpert: Boolean(isExpert),
      amount: amount / amountUnit,
      currency: currency,
      status: "pending",
      photoId: photo._id,
      metadata: {
        razorpayOrderId: order.id,
        receipt: options.receipt,
        gaClientId,
      },
    });

    // Create permanent Payment record
    await Payment.create({
      orderId: permanentOrder._id,
      photoId: photo._id,
      gateway: "razorpay",
      gatewayOrderId: order.id,
      amount: amount / amountUnit,
      currency: currency,
      status: "created",
      email: customerEmail,
      metadata: {
        notes: options.notes,
      },
    });

    // Update photo with order ID and link to user or email
    photo.razorpayOrderId = order.id;
    photo.orderId = permanentOrder._id;
    if (session && session.user) {
      // @ts-ignore
      photo.userId = session.user.id;
      if (session.user.email) {
        photo.guestEmail = session.user.email;
      }
    } else if (guestEmail) {
      photo.guestEmail = guestEmail;
    }
    photo.isExpert = isExpert;
    await photo.save();

    return NextResponse.json({
      reference,
      keyId: razorpayKeyId,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (error: any) {
    console.error("Payment order could not be prepared");
    if (reference) await recordAttempt(reference, "order_error", "server", { error: safeError(error) }).catch(() => {});
    return NextResponse.json(
      { error: "Checkout could not be prepared. Please contact support@pixpassvisa.com with the reference below.", reference },
      { status: 500 }
    );
  }
}
