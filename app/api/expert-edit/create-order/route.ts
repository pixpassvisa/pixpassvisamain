import { beginGatewayOrder, recordAttempt, safeError } from "@/lib/checkout-diagnostics";
import { normalizedEmail } from "@/lib/request-protection";
import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import dbConnect from "@/lib/mongodb";
import ExpertOrder from "@/models/ExpertOrder";
import { uploadBufferToCloudinary } from "@/lib/cloudinary";

export async function POST(req: NextRequest) {
  let reference = "";
  try {
    const razorpayKeyId = process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET;
    
    const formData = await req.formData();
    const email = normalizedEmail(formData.get("email"));
    const images = formData.getAll("image") as File[];
    const gaClientId = formData.get("gaClientId") as string;

    if (!email || images.length === 0) {
      return NextResponse.json({ error: "Email and at least one image are required" }, { status: 400 });
    }

    reference = await beginGatewayOrder(formData.get("reference"), formData.get("token"), { kind: "expert", email });
    if (!razorpayKeyId || !razorpayKeySecret) throw { error: { code: "CONFIGURATION_ERROR", reason: "payment_keys_missing" } };
    const razorpay = new Razorpay({ key_id: razorpayKeyId, key_secret: razorpayKeySecret });
    const { getLocalPrice } = await import("@/lib/currency");
    const requestedCurrency = formData.get("currencyOverride");
    const currencyOverride = typeof requestedCurrency === "string" && /^[A-Za-z]{3}$/.test(requestedCurrency) ? requestedCurrency.toUpperCase() : undefined;
    const localPrice = await getLocalPrice(6.99, currencyOverride, true);
    
    let amountUnit = 100;
    if (localPrice.currency === 'JPY') amountUnit = 1;
    const amount = Math.round(localPrice.amount * amountUnit);
    const currency = localPrice.currency;

    // Upload photos to cloudinary
    const photoUrls = [];
    for (const img of images.slice(0, 3)) {
      const buffer = Buffer.from(await img.arrayBuffer());
      const url = await uploadBufferToCloudinary(buffer, 'expert-edits');
      photoUrls.push(url);
    }

    await dbConnect();
    
    const expertOrder = await ExpertOrder.create({
      email,
      photos: photoUrls,
      status: "pending_payment"
    });

    const options = {
      amount,
      currency,
      receipt: `expert_${expertOrder._id.toString()}`,
      notes: {
        checkoutReference: reference,
        expertOrderId: expertOrder._id.toString(),
        email: email,
        ...(gaClientId ? { gaClientId } : {}),
      },
    };

    const order = await razorpay.orders.create(options);

    await recordAttempt(reference, "order_created", "server", { gatewayOrderId: order.id, expertOrderId: expertOrder._id.toString(), amount: amount / amountUnit, currency, gatewayMode: razorpayKeyId.startsWith("rzp_live_") ? "live" : "test" });
    expertOrder.razorpayOrderId = order.id;
    await expertOrder.save();

    return NextResponse.json({
      reference,
      keyId: razorpayKeyId,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      expertOrderId: expertOrder._id.toString(),
    });
  } catch (error: any) {
    if (reference) await recordAttempt(reference, "order_error", "server", { error: safeError(error) }).catch(() => {});
    return NextResponse.json(
      { error: "Checkout could not be prepared. Contact support@pixpassvisa.com with your reference.", reference },
      { status: 500 }
    );
  }
}
