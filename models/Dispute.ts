import mongoose, { Schema, Document, Model } from "mongoose";

export interface IDispute extends Document {
  orderId?: mongoose.Types.ObjectId | string;
  paymentId?: mongoose.Types.ObjectId | string;
  gatewayDisputeId?: string;
  amount: number;
  currency: string;
  reason: string;
  status: "open" | "under_review" | "won" | "lost" | "closed";
  evidence?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

const DisputeSchema: Schema = new Schema(
  {
    orderId: {
      type: Schema.Types.Mixed,
      required: false,
      index: true,
    },
    paymentId: {
      type: Schema.Types.Mixed,
      required: false,
      index: true,
    },
    gatewayDisputeId: {
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
    reason: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["open", "under_review", "won", "lost", "closed"],
      default: "open",
      index: true,
    },
    evidence: {
      type: Schema.Types.Mixed,
      required: false,
    },
  },
  { timestamps: true }
);

// Permanent collection - no TTL expiration index
const Dispute: Model<IDispute> =
  mongoose.models.Dispute || mongoose.model<IDispute>("Dispute", DisputeSchema);

export default Dispute;
