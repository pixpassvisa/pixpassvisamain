import mongoose, { Schema } from "mongoose";
const schema = new Schema({
  reference: { type: String, required: true, unique: true },
  email: { type: String, required: true }, topic: String, message: String, checkoutReference: String,
  delivery: { type: String, enum: ["pending", "accepted", "failed"], default: "pending" },
}, { timestamps: true });
schema.index({ createdAt: -1 });
schema.index({ createdAt: 1 }, { expireAfterSeconds: 90 * 86400 });
export default mongoose.models.SupportRequest || mongoose.model("SupportRequest", schema);
