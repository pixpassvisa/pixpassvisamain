# Checkout branding and PayPal investigation

Removed fixed checkout colour and logo from standard and expert checkout, allowing Razorpay merchant branding to apply. Prices, origin-based currency selection, order creation and payment verification are unchanged. No client-side payment-method filters are supplied.

Validation: all 44 existing tests and the production build pass.

The public expert-checkout JavaScript served by pixpassport.com uses Standard Checkout and does not include a special PayPal enablement option. Its completed customer checkout was not accessed. The user reports PayPal appears inside its INR Razorpay popup.

Razorpay documents PayPal currency conversion for INR orders, while its FAQ also says PayPal requires non-INR currency. The supplied merchant screenshot confirms PayPal activation but states international currencies only. This discrepancy requires account-specific confirmation; INR alone is not a conclusive diagnosis.

Outstanding checks in the live Razorpay account:
- Confirm the website's live API key belongs to the merchant account where PayPal is activated (do not share secret keys).
- Inspect Account & Settings > Payment Configuration and its default configuration for excluded wallets/PayPal.
- Ask Razorpay to confirm PayPal INR currency conversion and method eligibility for this merchant account. International-card rejection is a separate account status and is not changed by this release.

Suggested support request (not sent):
"PayPal is Activated for our live merchant account, but does not appear in Standard Checkout on pixpassvisa.com for INR orders. Please confirm whether PayPal INR-to-supported-currency conversion is enabled for our MID and whether the default Payment Configuration or an account eligibility rule excludes PayPal. Please also confirm availability for USD, GBP, EUR and AUD orders. Our integration does not supply payment-method filters."

References:
- https://razorpay.com/docs/payments/payment-methods/wallets/paypal/
- https://razorpay.com/docs/payments/dashboard/account-settings/payment-configuration/
- https://razorpay.com/docs/payments/dashboard/account-settings/checkout-styling/
