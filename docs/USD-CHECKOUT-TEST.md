# Live USD checkout check

Create a new unpaid photo and open its preview. Append `?currency=USD` to the preview URL (or `&currency=USD` if a query string already exists), then reload. Keep any existing token intact. The standard price must be $4.99 and premium $6.99. This override disables browser timezone repricing; normal URLs retain location-based pricing.

Open checkout using your real email. This creates a real unpaid order, not a sandbox payment. Confirm USD and the expected total in Razorpay. Stop before paying if only checking available methods.

For technical verification, inspect the browser Network response for `/api/payment/create-order`: `currency` must be `USD`, and `amount` 499 for standard or 699 for premium. An `orderId` proves order creation only, not payment acceptance. The public `keyId` should belong to the same live Razorpay merchant account with PayPal activated. Never share the secret key.

To prove actual collection, an eligible independent international buyer must complete a genuine purchase using their own PayPal account. Confirm the payment in the merchant dashboard/PayPal, application paid status, download unlock, and paid preview after refresh. Do not pay yourself or use fake account details. A test-mode transaction does not prove live PayPal eligibility. No real payment was made by this agent.

If PayPal is absent on an actual USD order, provide Razorpay support the order ID and merchant ID privately and ask them to inspect PayPal eligibility and the default Payment Configuration. The screenshot's closed Wallets section does not show which providers are enabled. International card approval was previously rejected and is separate from PayPal activation.

USD checkout is not USD bank settlement. Razorpay's PayPal documentation says payments go to the PayPal wallet and settlement is in INR: https://razorpay.com/docs/payments/payment-methods/wallets/paypal/
