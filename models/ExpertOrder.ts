import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IExpertOrder extends Document {
  email: string;
  photos: string[]; // URLs or base64 strings
  status: 'pending_payment' | 'paid' | 'completed' | 'payment_failed';
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ExpertOrderSchema: Schema = new Schema(
  {
    email: { type: String, required: true },
    photos: { type: [String], required: true },
    status: {
      type: String,
      enum: ['pending_payment', 'paid', 'completed', 'payment_failed'],
      default: 'pending_payment',
    },
    razorpayOrderId: { type: String },
    razorpayPaymentId: { type: String },
  },
  { timestamps: true }
);

const ExpertOrder: Model<IExpertOrder> =
  mongoose.models.ExpertOrder || mongoose.model<IExpertOrder>('ExpertOrder', ExpertOrderSchema);

export default ExpertOrder;
