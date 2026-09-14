"use client";

import { useEffect, useState } from "react";
import { getClientTimezoneCurrency } from "@/lib/currency";

interface PriceDisplayProps {
  basePrice: number;
  isExpert?: boolean;
  className?: string;
}

// Fixed price mapping for specific currencies (matching lib/currency.ts)
const FIXED_PRICES: Record<string, { amount: number; symbol: string; decimals: number }> = {
  USD: { amount: 6.99, symbol: "$", decimals: 2 },
  EUR: { amount: 6.99, symbol: "€", decimals: 2 },
  GBP: { amount: 6.99, symbol: "£", decimals: 2 },
  INR: { amount: 299, symbol: "₹", decimals: 0 },
  JPY: { amount: 799, symbol: "¥", decimals: 0 },
  BRL: { amount: 30, symbol: "R$", decimals: 0 },
  CAD: { amount: 6.99, symbol: "C$", decimals: 2 },
  AUD: { amount: 6.99, symbol: "A$", decimals: 2 },
  MXN: { amount: 99, symbol: "$", decimals: 0 },
  CNY: { amount: 29, symbol: "¥", decimals: 0 },
};

const EXPERT_PRICES: Record<string, { amount: number; symbol: string; decimals: number }> = {
  USD: { amount: 9.99, symbol: "$", decimals: 2 },
  EUR: { amount: 9.99, symbol: "€", decimals: 2 },
  GBP: { amount: 9.99, symbol: "£", decimals: 2 },
  INR: { amount: 399, symbol: "₹", decimals: 0 },
  JPY: { amount: 1299, symbol: "¥", decimals: 0 },
  BRL: { amount: 49, symbol: "R$", decimals: 0 },
  CAD: { amount: 9.99, symbol: "C$", decimals: 2 },
  AUD: { amount: 9.99, symbol: "A$", decimals: 2 },
  MXN: { amount: 149, symbol: "$", decimals: 0 },
  CNY: { amount: 49, symbol: "¥", decimals: 0 },
};

export default function PriceDisplay({ basePrice, isExpert = false, className }: PriceDisplayProps) {
  const [formattedPrice, setFormattedPrice] = useState<string>(`$${basePrice.toFixed(2)}`);

  useEffect(() => {
    // Detect currency from timezone on the client
    const currency = getClientTimezoneCurrency();
    const priceMap = isExpert ? EXPERT_PRICES : FIXED_PRICES;
    const fixed = priceMap[currency] || priceMap["USD"];
    
    const formatted = fixed.decimals === 0 
      ? `${fixed.symbol}${fixed.amount}`
      : `${fixed.symbol}${fixed.amount.toFixed(fixed.decimals)}`;
    
    setFormattedPrice(formatted);
  }, [basePrice, isExpert]);

  return <span className={className}>{formattedPrice}</span>;
}
