import crypto from "crypto";
import dbConnect from "@/lib/mongodb";
import CheckoutAttempt from "@/models/CheckoutAttempt";

export const clientEvents = ["sdk_failed", "checkout_opened", "checkout_closed", "client_payment_failed", "verification_pending", "request_failed"];
export function safeError(input: any) {
  const error = input?.error || input || {};
  const result: Record<string, string> = {};
  // Never store raw gateway payloads, card/bank data, signatures, or browser error stacks.
  for (const key of ["code", "source", "step", "reason"]) {
    const value = error[key] || error[`error_${key}`];
    if (typeof value === "string" && /^[a-zA-Z0-9_. -]{1,100}$/.test(value)) result[key] = value;
  }
  return result;
}
export async function newAttempt(input: Record<string, unknown>) {
  await dbConnect();
  const token = crypto.randomBytes(32).toString("hex");
  const attempt = await CheckoutAttempt.create({ ...input,
    reference: `CHK-${crypto.randomBytes(10).toString("hex").toUpperCase()}`,
    tokenHash: crypto.createHash("sha256").update(token).digest("hex"),
    events: [{ type: "initiated", source: "server", at: new Date() }],
  });
  return { attempt, token };
}
export async function authenticatedAttempt(reference: unknown, token: unknown) {
  if (typeof reference !== "string" || !/^CHK-[A-F0-9]{20}$/.test(reference) || typeof token !== "string" || !/^[a-f0-9]{64}$/.test(token)) return null;
  await dbConnect();
  return CheckoutAttempt.findOne({ reference, tokenHash: crypto.createHash("sha256").update(token).digest("hex"), createdAt: { $gt: new Date(Date.now() - 86400000) } });
}
export async function recordAttempt(reference: string, type: string, source = "server", fields: Record<string, unknown> = {}) {
  await dbConnect();
  const filter: any = { reference };
  if (source === "browser") {
    filter.outcome = { $nin: ["captured", "failed"] };
    filter.stage = { $ne: "order_error" };
  }
  if (source !== "browser" && !["captured", "verified"].includes(type)) filter.outcome = { $ne: "captured" };
  await CheckoutAttempt.updateOne(filter, {
    $set: { ...fields, stage: type },
    $push: { events: { $each: [{ type, source, at: new Date(), detail: fields.error }], $slice: -40 } },
  });
}
export async function gatewayAttempt(orderId: string, type: string, fields: Record<string, unknown> = {}) {
  await dbConnect();
  const attempt = await CheckoutAttempt.findOne({ gatewayOrderId: orderId });
  if (attempt) await recordAttempt(attempt.reference, type, "gateway", fields);
}
export async function beginGatewayOrder(reference: unknown, token: unknown, input: Record<string, unknown>) {
  const attempt = reference ? await authenticatedAttempt(reference, token) : (await newAttempt(input)).attempt;
  if (!attempt || attempt.kind !== input.kind || attempt.email !== input.email || (input.photoId && attempt.photoId !== input.photoId)) throw new Error("Invalid checkout reference");
  const claimed = await CheckoutAttempt.findOneAndUpdate({ _id: attempt._id, stage: "initiated" }, { $set: { stage: "order_creating" } }, { new: true });
  if (!claimed) throw new Error("Checkout already started. Please check its status before retrying.");
  return claimed.reference as string;
}
