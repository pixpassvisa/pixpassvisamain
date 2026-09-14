import mongoose, { Schema } from "mongoose";

const AnalyticsSessionSchema = new Schema(
  {
    sessionId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    ip: String,
    country: String,
    userAgent: String,
    deviceType: String, 
    pageViews: {
      type: Number,
      default: 0,
    },
    duration: {
      type: Number, // Time spent in seconds
      default: 0,
      index: true,
    },
    firstSeenAt: {
      type: Date,
      default: Date.now,
    },
    lastSeenAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.models.AnalyticsSession ||
  mongoose.model("AnalyticsSession", AnalyticsSessionSchema);
