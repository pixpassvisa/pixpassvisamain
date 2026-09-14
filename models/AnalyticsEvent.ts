import mongoose, { Schema } from "mongoose";

const AnalyticsEventSchema = new Schema(
  {
    sessionId: {
      type: String,
      required: true,
      index: true,
    },
    eventType: {
      type: String, // e.g., 'page_view', 'razorpay_open', 'download_clicked'
      required: true,
      index: true,
    },
    url: String, // Which page triggered it
    metadata: {
      type: Schema.Types.Mixed, // Optional deeply nested JSON for custom event parameters
    },
  },
  { timestamps: true }
);

export default mongoose.models.AnalyticsEvent ||
  mongoose.model("AnalyticsEvent", AnalyticsEventSchema);
