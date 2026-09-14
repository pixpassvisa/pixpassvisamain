import mongoose, { Schema, Document, Model } from "mongoose";

export interface IOrder extends Document {
  orderNumber: string;
  userId?: string;
  guestEmail: string;
  documentType: string;
  countryCode?: string;
  isExpert: boolean;
  amount: number;
  currency: string;
  status: "pending" | "paid" | "failed" | "refunded" | "partially_refunded" | "disputed";
  photoId?: mongoose.Types.ObjectId | string;
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema: Schema = new Schema(
  {
    orderNumber: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    userId: {
      type: String,
      required: false,
      index: true,
    },
    guestEmail: {
      type: String,
      required: true,
      index: true,
    },
    documentType: {
      type: String,
      required: true,
      index: true,
    },
    countryCode: {
      type: String,
      required: false,
    },
    isExpert: {
      type: Boolean,
      default: false,
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
      enum: ["pending", "paid", "failed", "refunded", "partially_refunded", "disputed"],
      default: "pending",
      index: true,
    },
    photoId: {
      type: Schema.Types.Mixed, // Can be ObjectId or string ID
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
const Order: Model<IOrder> =
  mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema);

export default Order;
