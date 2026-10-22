import mongoose, { Schema } from "mongoose";

const eventSchema = new Schema({
  type: { type: String, required: true }, source: String, at: Date, detail: Schema.Types.Mixed,
}, { _id: false });

const schema = new Schema({
  reference: { type: String, required: true, unique: true },
  tokenHash: { type: String, required: true, select: false },
  kind: { type: String, enum: ["photo", "expert"], required: true },
  photoId: String, expertOrderId: String, email: String, documentType: String,
  amount: Number, currency: String, gatewayOrderId: { type: String, index: true }, gatewayPaymentId: String,
  gatewayMode: String,
  stage: { type: String, default: "initiated", index: true },
  outcome: { type: String, default: "unconfirmed", index: true },
  error: Schema.Types.Mixed,
  events: [eventSchema],
}, { timestamps: true });
schema.index({ createdAt: -1 });
// Operational diagnostics expire after 90 days; permanent financial records remain in Order/Payment.
schema.index({ createdAt: 1 }, { expireAfterSeconds: 90 * 86400 });
export default mongoose.models.CheckoutAttempt || mongoose.model("CheckoutAttempt", schema);
