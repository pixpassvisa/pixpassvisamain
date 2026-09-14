import mongoose from "mongoose";

const CheckSchema = new mongoose.Schema({
  name: { type: String, required: true },
  status: { type: String, enum: ["PASS", "FAIL", "WARN"], required: true },
  detail: { type: String, required: true },
});

const ValidationRecordSchema = new mongoose.Schema(
  {
    documentType: { type: String, required: true },
    overallStatus: { type: String, enum: ["PASS", "FAIL", "WARN"], required: true },
    checks: [CheckSchema],
    // Store basic extracted metrics for analytics if needed
    metrics: {
      eyeLevelPct: { type: Number },
      headSizePct: { type: Number },
      faceCount: { type: Number },
      fileSizeKb: { type: Number },
      brightness: { type: Number },
    },
    // Optional: store a reference to the image if stored in S3/Cloudinary, 
    imageUrl: { type: String },
    // but the prompt said auto-delete after 24 hours, so we omit storing the binary here.
  },
  { 
    timestamps: true 
  }
);

// Add a TTL index to automatically delete records after 24 hours (86400 seconds)
ValidationRecordSchema.index({ createdAt: 1 }, { expireAfterSeconds: 86400 });

export default mongoose.models.ValidationRecord || mongoose.model("ValidationRecord", ValidationRecordSchema);
