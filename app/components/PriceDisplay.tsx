"use client";

import { useEffect, useState } from "react";
import { getClientTimezoneCurrency } from "@/lib/currency";
import { FIXED_PRICES, EXPERT_PRICES } from "@/lib/currency";

interface PriceDisplayProps {
  basePrice: number;
  isExpert?: boolean;
  className?: string;
}

export default function PriceDisplay({ basePrice, isExpert = false, className }: PriceDisplayProps) {
  const defaultPrice = (isExpert ? EXPERT_PRICES : FIXED_PRICES).USD;
  const [formattedPrice, setFormattedPrice] = useState<string>(`${defaultPrice.symbol}${defaultPrice.amount.toFixed(defaultPrice.decimals)}`);

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
