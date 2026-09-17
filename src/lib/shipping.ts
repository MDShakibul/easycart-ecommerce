export const FREE_SHIPPING_THRESHOLD = 50;
export const FLAT_SHIPPING_RATE = 4.95;

/**
 * Shipping cost for a cart subtotal — the single source of truth for the
 * store's shipping rule: free at or above the threshold, flat rate below.
 * Used by both the cart and checkout pages so the two never disagree.
 */
export function getShippingCost(subtotal: number): number {
  return Number.isFinite(subtotal) && subtotal >= FREE_SHIPPING_THRESHOLD
    ? 0
    : FLAT_SHIPPING_RATE;
}

/** How much more needs to be spent to unlock free shipping (0 if eligible). */
export function getAmountToFreeShipping(subtotal: number): number {
  if (!Number.isFinite(subtotal)) return FREE_SHIPPING_THRESHOLD;
  return Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
}
