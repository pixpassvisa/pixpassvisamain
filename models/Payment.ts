import mongoose, { Schema, Document, Model } from "mongoose";

export interface IPayment extends Document {
  orderId?: mongoose.Types.ObjectId | string;
  photoId?: mongoose.Types.ObjectId | string;
  gateway: "razorpay" | "stripe";
  gatewayOrderId: string;
  gatewayPaymentId?: string;
  amount: number;
  currency: string;
  status: "created" | "captured" | "failed" | "refunded" | "partially_refunded";
  method?: string;
  email?: string;
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

const PaymentSchema: Schema = new Schema(
  {
    orderId: {
      type: Schema.Types.Mixed,
      required: false,
      index: true,
    },
    photoId: {
      type: Schema.Types.Mixed,
      required: false,
      index: true,
    },
    gateway: {
      type: String,
      enum: ["razorpay", "stripe"],
      default: "razorpay",
      index: true,
    },
    gatewayOrderId: {
      type: String,
      required: true,
      index: true,
    },
    gatewayPaymentId: {
      type: String,
      required: false,
      index: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      required: true,
      default: "USD",
    },
    status: {
      type: String,
      enum: ["created", "captured", "failed", "refunded", "partially_refunded"],
      default: "created",
      index: true,
    },
    method: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: false,
      index: true,
    },
    metadata: {
      type: Schema.Types.Mixed,
      required: false,
    },
  },
  { timestamps: true }
);

// Permanent collection - no TTL expiration index
const Payment: Model<IPayment> =
  mongoose.models.Payment || mongoose.model<IPayment>("Payment", PaymentSchema);

export default Payment;
