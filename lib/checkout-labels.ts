export const stageLabels: Record<string, string> = {
  initiated: "Pay clicked", order_creating: "Creating gateway order", order_created: "Gateway order created",
  order_error: "Could not prepare checkout", sdk_failed: "Checkout script blocked or unavailable",
  checkout_opened: "Checkout opened", checkout_closed: "Closed without confirmation",
  client_payment_failed: "Failure reported by browser", request_failed: "Request interrupted",
  verification_pending: "Confirmation pending", gateway_failed: "Gateway confirmed failure",
  captured: "Gateway confirmed payment", verified: "Signed payment verified",
};
export function attemptLabel(attempt: any) {
  if (attempt.outcome === "captured") return stageLabels[attempt.stage] || "Payment confirmed";
  if (attempt.outcome === "failed") return "Gateway confirmed failure";
  return stageLabels[attempt.stage] || "Unconfirmed";
}
