import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import dbConnect from "@/lib/mongodb";
import ExpertOrder from "@/models/ExpertOrder";
import { uploadBufferToCloudinary } from "@/lib/cloudinary";

export async function POST(req: NextRequest) {
  try {
    const razorpayKeyId = process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET;
    
    if (!razorpayKeyId || !razorpayKeySecret) {
      console.error("Missing Razorpay Keys");
      return NextResponse.json({ error: "Server configuration error: Missing payment keys" }, { status: 500 });
    }

    const razorpay = new Razorpay({
      key_id: razorpayKeyId,
      key_secret: razorpayKeySecret,
    });

    const formData = await req.formData();
    const email = formData.get("email") as string;
    const images = formData.getAll("image") as File[];
    const gaClientId = formData.get("gaClientId") as string;

    if (!email || images.length === 0) {
      return NextResponse.json({ error: "Email and at least one image are required" }, { status: 400 });
    }

    // Convert local price $10 USD (we'll just use currency logic similar to the preview page, or fixed $10)
    const { getLocalPrice } = await import("@/lib/currency");
    // $10 fixed price for expert edit
    const localPrice = await getLocalPrice(10.00, undefined);
    
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
        expertOrderId: expertOrder._id.toString(),
        email: email,
        ...(gaClientId ? { gaClientId } : {}),
      },
    };

    const order = await razorpay.orders.create(options);

    expertOrder.razorpayOrderId = order.id;
    await expertOrder.save();

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      expertOrderId: expertOrder._id.toString(),
    });
  } catch (error: any) {
    console.error("Expert Edit Order Error:", error);
    return NextResponse.json(
      { error: "Failed to create order", details: error.message },
      { status: 500 }
    );
  }
}
