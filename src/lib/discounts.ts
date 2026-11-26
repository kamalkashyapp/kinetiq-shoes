// KINETIQ Discount & Promotional Codes Engine
// Server-safe shared definition (consumed by both API Route Handlers and Client Stores)

export interface PromoRule {
  code: string;
  kind: 'percent' | 'flat';
  value: number; // Percentage (e.g. 10 = 10%) or Flat INR amount (e.g. 1000 = ₹1,000)
  minSubtotal: number; // Minimum order subtotal required in INR
  description: string;
  isActive: boolean;
}

export const PROMO_CODES: Record<string, PromoRule> = {
  KINETIQ10: {
    code: 'KINETIQ10',
    kind: 'percent',
    value: 10,
    minSubtotal: 0,
    description: '10% off entire order',
    isActive: true,
  },
  FIRSTDROP: {
    code: 'FIRSTDROP',
    kind: 'flat',
    value: 1000,
    minSubtotal: 8000,
    description: '₹1,000 off orders over ₹8,000',
    isActive: true,
  },
  SPEED20: {
    code: 'SPEED20',
    kind: 'percent',
    value: 20,
    minSubtotal: 12000,
    description: '20% off technical orders over ₹12,000',
    isActive: true,
  },
  TEST50: {
    code: 'TEST50',
    kind: 'percent',
    value: 50,
    minSubtotal: 0,
    description: '50% off developer testing discount',
    isActive: true,
  },
};

export function validateAndCalculateDiscount(
  code: string,
  subtotalInr: number
): { valid: boolean; discountAmount: number; message: string; rule?: PromoRule } {
  const cleanCode = code.trim().toUpperCase();
  const rule = PROMO_CODES[cleanCode];

  if (!rule || !rule.isActive) {
    return {
      valid: false,
      discountAmount: 0,
      message: 'Invalid or expired promotional code.',
    };
  }

  if (subtotalInr < rule.minSubtotal) {
    return {
      valid: false,
      discountAmount: 0,
      message: `Order subtotal must be at least ₹${rule.minSubtotal.toLocaleString('en-IN')} to activate code ${cleanCode}.`,
    };
  }

  const discountAmount =
    rule.kind === 'percent'
      ? Math.round((subtotalInr * rule.value) / 100)
      : Math.min(rule.value, subtotalInr);

  return {
    valid: true,
    discountAmount,
    message: `Promo code ${cleanCode} applied: ${rule.description}`,
    rule,
  };
}
