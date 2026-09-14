// Map country codes to currencies
const COUNTRY_TO_CURRENCY: Record<string, string> = {
  // North America
  US: "USD",
  CA: "CAD",
  MX: "MXN",
  
  // Europe
  GB: "GBP",
  EU: "EUR", // Europe generic
  DE: "EUR", FR: "EUR", IT: "EUR", ES: "EUR", NL: "EUR", BE: "EUR", AT: "EUR", PT: "EUR", IE: "EUR",
  CH: "CHF",
  SE: "SEK",
  NO: "NOK",
  DK: "DKK",
  PL: "PLN",
  TR: "TRY",
  CZ: "CZK",
  
  // Asia Pacific
  IN: "INR",
  JP: "JPY",
  CN: "CNY",
  AU: "AUD",
  NZ: "NZD",
  SG: "SGD",
  HK: "HKD",
  TW: "TWD",
  KR: "KRW",
  ID: "IDR",
  MY: "MYR",
  PH: "PHP",
  TH: "THB",
  VN: "VND",
  PK: "PKR",
  
  // Latin America
  BR: "BRL",
  CO: "COP",
  CL: "CLP",
  AR: "ARS",
  
  // Middle East & Africa
  AE: "AED",
  SA: "SAR",
  IL: "ILS",
  ZA: "ZAR",
  NG: "NGN",
  EG: "EGP",
};

// Fixed price mapping for specific currencies (PPP-adjusted)
const FIXED_PRICES: Record<string, { amount: number; symbol: string; decimals: number }> = {
  // Tier 1: Base ($6.99)
  USD: { amount: 7.99, symbol: "$", decimals: 2 },
  EUR: { amount: 6.99, symbol: "€", decimals: 2 },
  GBP: { amount: 6.99, symbol: "£", decimals: 2 },
  CHF: { amount: 15.99, symbol: "CHF", decimals: 2 },
  CAD: { amount: 8.99, symbol: "C$", decimals: 2 },
  AUD: { amount: 9.99, symbol: "A$", decimals: 2 },
  NZD: { amount: 9.99, symbol: "NZ$", decimals: 2 },
  JPY: { amount: 1100, symbol: "¥", decimals: 0 },
  SGD: { amount: 6.99, symbol: "S$", decimals: 2 },
  HKD: { amount: 49, symbol: "HK$", decimals: 0 },
  
  // Tier 2: ~20-30% Discount
  KRW: { amount: 6900, symbol: "₩", decimals: 0 },
  TWD: { amount: 159, symbol: "NT$", decimals: 0 },
  AED: { amount: 25, symbol: "AED", decimals: 0 },
  SAR: { amount: 22, symbol: "SAR", decimals: 0 },
  ILS: { amount: 22, symbol: "₪", decimals: 0 },
  PLN: { amount: 19.99, symbol: "zł", decimals: 2 },
  SEK: { amount: 59, symbol: "kr", decimals: 0 },
  NOK: { amount: 59, symbol: "kr", decimals: 0 },
  DKK: { amount: 39, symbol: "kr", decimals: 0 },
  
  // Tier 3: ~50% Discount
  INR: { amount: 599, symbol: "₹", decimals: 0 },
  CNY: { amount: 29, symbol: "¥", decimals: 0 },
  BRL: { amount: 24, symbol: "R$", decimals: 0 },
  MXN: { amount: 89, symbol: "$", decimals: 0 },
  TRY: { amount: 99, symbol: "₺", decimals: 0 },
  ZAR: { amount: 89, symbol: "R", decimals: 0 },
  MYR: { amount: 14.99, symbol: "RM", decimals: 2 },
  THB: { amount: 129, symbol: "฿", decimals: 0 },
  
  // Tier 4: ~70% Discount
  IDR: { amount: 49000, symbol: "Rp", decimals: 0 },
  PHP: { amount: 149, symbol: "₱", decimals: 0 },
  VND: { amount: 79000, symbol: "₫", decimals: 0 },
  PKR: { amount: 799, symbol: "Rs", decimals: 0 },
  NGN: { amount: 4900, symbol: "₦", decimals: 0 },
  EGP: { amount: 149, symbol: "E£", decimals: 0 },
  COP: { amount: 11900, symbol: "$", decimals: 0 },
};

export interface LocalPrice {
  currency: string;
  amount: number; 
  formatted: string; 
  symbol: string;
}

const EXPERT_PRICES: Record<string, { amount: number; symbol: string; decimals: number }> = {
  // Scaling roughly 1.6x - 2x from standard
  USD: { amount: 13.99, symbol: "$", decimals: 2 },
  EUR: { amount: 11.99, symbol: "€", decimals: 2 },
  GBP: { amount: 11.99, symbol: "£", decimals: 2 },
  CHF: { amount: 20.99, symbol: "CHF", decimals: 2 },
  CAD: { amount: 12.99, symbol: "C$", decimals: 2 },
  AUD: { amount: 12.99, symbol: "A$", decimals: 2 },
  NZD: { amount: 15.99, symbol: "NZ$", decimals: 2 },
  JPY: { amount: 1499, symbol: "¥", decimals: 0 },
  SGD: { amount: 13.99, symbol: "S$", decimals: 2 },
  HKD: { amount: 79, symbol: "HK$", decimals: 0 },
  
  KRW: { amount: 11900, symbol: "₩", decimals: 0 },
  TWD: { amount: 259, symbol: "NT$", decimals: 0 },
  AED: { amount: 39, symbol: "AED", decimals: 0 },
  SAR: { amount: 39, symbol: "SAR", decimals: 0 },
  ILS: { amount: 39, symbol: "₪", decimals: 0 },
  PLN: { amount: 34.99, symbol: "zł", decimals: 2 },
  SEK: { amount: 99, symbol: "kr", decimals: 0 },
  NOK: { amount: 99, symbol: "kr", decimals: 0 },
  DKK: { amount: 69, symbol: "kr", decimals: 0 },
  
  INR: { amount: 699, symbol: "₹", decimals: 0 },
  CNY: { amount: 49, symbol: "¥", decimals: 0 },
  BRL: { amount: 45, symbol: "R$", decimals: 0 },
  MXN: { amount: 149, symbol: "$", decimals: 0 },
  TRY: { amount: 169, symbol: "₺", decimals: 0 },
  ZAR: { amount: 149, symbol: "R", decimals: 0 },
  MYR: { amount: 24.99, symbol: "RM", decimals: 2 },
  THB: { amount: 229, symbol: "฿", decimals: 0 },
  
  IDR: { amount: 80000, symbol: "Rp", decimals: 0 },
  PHP: { amount: 249, symbol: "₱", decimals: 0 },
  VND: { amount: 129000, symbol: "₫", decimals: 0 },
  PKR: { amount: 1299, symbol: "Rs", decimals: 0 },
  NGN: { amount: 7900, symbol: "₦", decimals: 0 },
  EGP: { amount: 249, symbol: "E£", decimals: 0 },
  COP: { amount: 19900, symbol: "$", decimals: 0 },
};

export async function getLocalPrice(
  baseUsdPrice: number = 6.99,
  forcedCurrency?: string,
  isExpert: boolean = false,
  skipHeaders: boolean = false
): Promise<LocalPrice> {
  try {
    let currency = "USD";

    if (forcedCurrency) {
      currency = forcedCurrency.toUpperCase();
    } else if (!skipHeaders) {
      // 1. Try to detect country from Vercel header
      try {
        const { headers } = await import("next/headers");
        const headersList = await headers();
        const country = headersList.get("x-vercel-ip-country");
        if (country && COUNTRY_TO_CURRENCY[country]) {
          currency = COUNTRY_TO_CURRENCY[country];
        }
      } catch (e) {
        // Fallback to timezone check if header fails or not on Vercel
        currency = getClientTimezoneCurrency();
      }
    } else {
      // For static generation, skip headers and default to USD
      currency = "USD";
    }

    // Use fixed price if available, otherwise fallback to baseUsdPrice
    const priceMap = isExpert ? EXPERT_PRICES : FIXED_PRICES;
    const fixed = priceMap[currency] || priceMap["USD"];
    const amount = fixed.amount;
    const symbol = fixed.symbol;
    const decimals = fixed.decimals;

    // Format currency
    const formatted = decimals === 0 
      ? `${symbol}${amount}`
      : `${symbol}${amount.toFixed(decimals)}`;

    return {
      currency,
      amount,
      formatted,
      symbol,
    };
  } catch (error) {
    console.error("Failed to get local price, falling back to USD", error);
    return {
      currency: "USD",
      amount: 6.99,
      formatted: "$6.99",
      symbol: "$",
    };
  }
}

// Client-side utility to guess currency from timezone (100% free, no rate limits)
export function getClientTimezoneCurrency(): string {
  try {
    // Only run on client
    if (typeof window === 'undefined') return 'USD';

    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (tz.includes('Kolkata') || tz.includes('Calcutta')) return 'INR';
    if (tz.includes('London')) return 'GBP';
    if (tz.startsWith('Europe/')) {
      if (tz.includes('Zurich')) return 'CHF';
      if (tz.includes('Stockholm')) return 'SEK';
      if (tz.includes('Oslo')) return 'NOK';
      if (tz.includes('Copenhagen')) return 'DKK';
      if (tz.includes('Warsaw')) return 'PLN';
      if (tz.includes('Istanbul')) return 'TRY';
      if (tz.includes('Prague')) return 'CZK';
      return 'EUR';
    }
    if (tz.includes('Toronto') || tz.includes('Vancouver')) return 'CAD';
    if (tz.startsWith('Australia/')) return 'AUD';
    if (tz.includes('Auckland')) return 'NZD';
    if (tz.includes('Tokyo')) return 'JPY';
    if (tz.includes('Shanghai')) return 'CNY';
    if (tz.includes('Seoul')) return 'KRW';
    if (tz.includes('Taipei')) return 'TWD';
    if (tz.includes('Hong_Kong')) return 'HKD';
    if (tz.includes('Singapore')) return 'SGD';
    if (tz.includes('Jakarta')) return 'IDR';
    if (tz.includes('Kuala_Lumpur')) return 'MYR';
    if (tz.includes('Manila')) return 'PHP';
    if (tz.includes('Bangkok')) return 'THB';
    if (tz.includes('Ho_Chi_Minh')) return 'VND';
    if (tz.includes('Karachi')) return 'PKR';
    if (tz.includes('Mexico_City')) return 'MXN';
    if (tz.includes('Sao_Paulo')) return 'BRL';
    if (tz.includes('Dubai')) return 'AED';
    if (tz.includes('Riyadh')) return 'SAR';
    if (tz.includes('Jerusalem')) return 'ILS';
    if (tz.includes('Johannesburg')) return 'ZAR';
    if (tz.includes('Lagos')) return 'NGN';
    if (tz.includes('Cairo')) return 'EGP';
    return 'USD';
  } catch (e) {
    return 'USD';
  }
}
