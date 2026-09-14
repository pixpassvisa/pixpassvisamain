import mongoose, { Document, Schema } from 'mongoose';

export interface IReview extends Document {
  name: string;
  text: string;
  rating: number;
  country: string;
  isApproved: boolean;
  createdAt: Date;
}

const ReviewSchema: Schema = new Schema({
  name: { type: String, required: true },
  text: { type: String, required: true },
  rating: { type: Number, default: 5 },
  country: { type: String, default: 'USA' },
  isApproved: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Review || mongoose.model<IReview>('Review', ReviewSchema);
