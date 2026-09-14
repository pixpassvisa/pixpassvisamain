import mongoose, { Schema, Document, Model } from "mongoose";

export type AuditEventType =
  | "processing"
  | "email_sent"
  | "download"
  | "refund"
  | "dispute";

export interface IAuditEvent extends Document {
  eventType: AuditEventType;
  orderId?: mongoose.Types.ObjectId | string;
  paymentId?: mongoose.Types.ObjectId | string;
  photoId?: mongoose.Types.ObjectId | string;
  disputeId?: mongoose.Types.ObjectId | string;
  actor: string; // e.g. 'system', 'user', 'guest', 'webhook', 'admin'
  ipAddress?: string;
  userAgent?: string;
  metadata?: Record<string, any>;
  createdAt: Date;
}

const AuditEventSchema: Schema = new Schema(
  {
    eventType: {
      type: String,
      enum: ["processing", "email_sent", "download", "refund", "dispute"],
      required: true,
      index: true,
    },
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
    photoId: {
      type: Schema.Types.Mixed,
      required: false,
      index: true,
    },
    disputeId: {
      type: Schema.Types.Mixed,
      required: false,
      index: true,
    },
    actor: {
      type: String,
      required: true,
      default: "system",
      index: true,
    },
    ipAddress: {
      type: String,
      required: false,
    },
    userAgent: {
      type: String,
      required: false,
    },
    metadata: {
      type: Schema.Types.Mixed,
      required: false,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false }, // Append-only immutable log
  }
);

// Permanent collection - no TTL expiration index
const AuditEvent: Model<IAuditEvent> =
  mongoose.models.AuditEvent ||
  mongoose.model<IAuditEvent>("AuditEvent", AuditEventSchema);

export default AuditEvent;
