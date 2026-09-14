import mongoose from "mongoose";

const FeedbackSchema = new mongoose.Schema({
  message: { type: String, required: true },
  photoId: { type: String, required: false },
  userEmail: { type: String, required: false }, // If authenticated or provided
  rating: { type: Number, required: false },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Feedback || mongoose.model("Feedback", FeedbackSchema);
