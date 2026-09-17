const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

/** Format a price as USD, e.g. 19.99 -> "$19.99". */
export function formatPrice(value: number): string {
  return priceFormatter.format(value);
}
