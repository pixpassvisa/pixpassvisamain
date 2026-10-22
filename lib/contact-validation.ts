import { normalizedEmail } from "@/lib/request-protection";
export const contactTopics = ["Payment did not start", "Payment failed", "Charged but no download", "Photo or download help", "Other"];
export function validateContact(body: any) {
  const email = normalizedEmail(body.email);
  const message = typeof body.message === "string" ? body.message.trim() : "";
  const checkoutReference = typeof body.reference === "string" ? body.reference.trim() : "";
  if (!email || !contactTopics.includes(body.topic) || message.length < 10 || message.length > 1500 || !/^[A-Za-z0-9_-]{0,80}$/.test(checkoutReference)) return null;
  return { email, message, topic: body.topic as string, checkoutReference };
}
export async function verifyContactChallenge(token: unknown, hostname: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret || typeof token !== "string" || !token || token.length > 2048) return false;
  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ secret, response: token }), signal: AbortSignal.timeout(10000),
  });
  if (!response.ok) return false;
  const result = await response.json();
  return result.success === true && result.hostname === hostname && result.action === "contact";
}
