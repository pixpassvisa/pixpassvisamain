export type AttemptReceipt = { reference: string; token: string };
export async function startCheckoutAttempt(input: { photoId?: string; kind?: string; email: string }) {
  const response = await fetch("/api/payment/attempt", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(input), signal: AbortSignal.timeout(15000) });
  const result = await response.json();
  if (!response.ok) throw new Error(result.error || "Checkout could not start. Email support@pixpassvisa.com for help.");
  return result as AttemptReceipt;
}
export async function reportCheckout(attempt: AttemptReceipt | null, type: string, error?: unknown) {
  if (!attempt) return;
  const detail = error && typeof error === "object" ? Object.fromEntries(["code", "reason", "source", "step"].map(key => [key, (error as Record<string, unknown>)[key]]).filter(([, value]) => typeof value === "string" && value.length <= 100)) : undefined;
  try {
    await fetch("/api/payment/attempt/event", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...attempt, type, error: detail }), keepalive: true, signal: AbortSignal.timeout(6000) });
  } catch { /* A lost connection is unknown, never evidence of a failed charge. */ }
}
export function paymentGuidance(reason?: string) {
  if (reason === "insufficient_funds") return "Your payment provider reported insufficient funds. Check your balance or choose another payment method.";
  if (reason === "payment_cancelled" || reason === "payment_timed_out") return "The payment was cancelled or timed out. Check its status before trying again.";
  if (reason === "international_transaction_not_allowed") return "Your bank may not allow this international transaction. Check with your bank or select another available method.";
  return "The payment could not be completed. Check the details in checkout or choose another available method. If money was debited, do not pay again until its status is confirmed.";
}
