export const GA4_MEASUREMENT_ID = "G-RJFKP2ZXNX";
export const GA4_API_SECRET = process.env.GA4_API_SECRET || "";

interface GA4Item {
  item_id: string;
  item_name: string;
  price: number;
  quantity: number;
  item_category?: string;
}

interface GA4PurchaseParams {
  clientId: string;
  transactionId: string;
  amount: number;
  currency: string;
  items: GA4Item[];
}

/**
 * Sends a purchase event to GA4 via the Measurement Protocol.
 */
export async function sendGA4PurchaseEvent({
  clientId,
  transactionId,
  amount,
  currency,
  items,
}: GA4PurchaseParams) {
  if (!clientId) {
    console.warn("[GA4] No client ID provided, skipping event.");
    return;
  }

  const url = `https://www.google-analytics.com/mp/collect?measurement_id=${GA4_MEASUREMENT_ID}&api_secret=${GA4_API_SECRET}`;

  const payload = {
    client_id: clientId,
    events: [
      {
        name: "purchase",
        params: {
          transaction_id: transactionId,
          value: amount,
          currency: currency,
          items: items,
        },
      },
    ],
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[GA4] Failed to send event: ${response.status} ${errorText}`);
    } else {
      console.log(`[GA4] Purchase event sent for transaction ${transactionId}`);
    }
  } catch (error) {
    console.error("[GA4] Network error sending event:", error);
  }
}
