import crypto from "crypto";
import { isIP } from "net";
import dbConnect from "@/lib/mongodb";
import RequestLimit from "@/models/RequestLimit";

export function sameOrigin(req: Request) {
  const allowed = new URL(process.env.NEXT_PUBLIC_APP_URL || req.url).origin;
  const origin = req.headers.get("origin");
  return origin === allowed;
}
export async function smallJson(req: Request, max = 8192) {
  if (!req.headers.get("content-type")?.includes("application/json")) throw new Error("Expected JSON");
  const reader = req.body?.getReader();
  if (!reader) throw new Error("Missing body");
  const chunks: Uint8Array[] = [];
  let size = 0;
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    size += value.length;
    if (size > max) { await reader.cancel(); throw new Error("Request too large"); }
    chunks.push(value);
  }
  const value = JSON.parse(Buffer.concat(chunks).toString("utf8"));
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error("Invalid request");
  return value;
}
export function normalizedEmail(value: unknown) {
  if (typeof value !== "string") return "";
  const email = value.trim().toLowerCase();
  return email.length <= 254 && /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email) ? email : "";
}
export function clientAddress(req: Request) {
  // Only trust forwarding headers when our function is behind Vercel's sanitizing proxy.
  if (process.env.VERCEL === "1") {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "";
    if (isIP(ip)) return ip;
    throw new Error("Trusted client address unavailable");
  }
  if (["localhost", "127.0.0.1"].includes(new URL(req.url).hostname)) return "local-preview";
  throw new Error("Configure a trusted proxy before accepting public requests");
}
export function privateKey(value: string) {
  const secret = process.env.CONTACT_RATE_LIMIT_SECRET || process.env.NEXTAUTH_SECRET;
  if (!secret) throw new Error("Rate limit secret missing");
  return crypto.createHmac("sha256", secret).update(value).digest("hex");
}
export async function reserveWindow(scope: string, value: string, seconds: number) {
  await dbConnect();
  const now = new Date();
  try {
    // Unique _id serializes concurrent/serverless requests. TTL deletion is only cleanup.
    await RequestLimit.findOneAndUpdate(
      { _id: privateKey(`${scope}:${value}`), until: { $lte: now } },
      { $set: { until: new Date(now.getTime() + seconds * 1000) } },
      { upsert: true, new: true },
    );
    return true;
  } catch (error: any) {
    if (error?.code === 11000) return false;
    throw error; // Fail closed if the shared limiter is unavailable.
  }
}
