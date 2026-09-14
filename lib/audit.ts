import dbConnect from "@/lib/mongodb";
import AuditEvent, { AuditEventType } from "@/models/AuditEvent";

export interface LogAuditParams {
  eventType: AuditEventType;
  orderId?: any;
  paymentId?: any;
  photoId?: any;
  disputeId?: any;
  actor?: string;
  ipAddress?: string;
  userAgent?: string;
  metadata?: Record<string, any>;
}

/**
 * Log an immutable audit event to the permanent AuditEvent collection.
 * Non-blocking safe execution to prevent audit logging failures from interrupting primary flows.
 */
export async function logAuditEvent(params: LogAuditParams) {
  try {
    await dbConnect();
    const event = await AuditEvent.create({
      eventType: params.eventType,
      orderId: params.orderId,
      paymentId: params.paymentId,
      photoId: params.photoId ? params.photoId.toString() : undefined,
      disputeId: params.disputeId,
      actor: params.actor || "system",
      ipAddress: params.ipAddress,
      userAgent: params.userAgent,
      metadata: params.metadata || {},
    });
    return event;
  } catch (error) {
    console.error(`[AUDIT] Failed to record audit event (${params.eventType}):`, error);
    return null;
  }
}

/**
 * Extract client IP and User-Agent from Request headers
 */
export function getClientMetadata(req: Request): { ipAddress?: string; userAgent?: string } {
  const forwardedFor = req.headers.get("x-forwarded-for");
  const realIp = req.headers.get("x-real-ip");
  const ipAddress = forwardedFor ? forwardedFor.split(",")[0].trim() : realIp || undefined;
  const userAgent = req.headers.get("user-agent") || undefined;
  return { ipAddress, userAgent };
}
