"use client";

import { ShoppingCart } from "lucide-react";

import { useCartDrawer } from "@/features/cart/cart-drawer-context";
import {
  selectCartItemCount,
  selectCartTotal,
} from "@/features/cart/cartSelectors";
import { formatPrice } from "@/lib/format";
import { useAppSelector } from "@/store/hooks";

/**
 * Header cart trigger — always renders as a pill showing item count + total.
 * Opens the cart drawer; the drawer links through to the full `/cart` page.
 */
export function CartButton() {
  const itemCount = useAppSelector(selectCartItemCount);
  const total = useAppSelector(selectCartTotal);
  const { open } = useCartDrawer();

  return (
    <button
      type="button"
      onClick={open}
      aria-label={`Open cart, ${itemCount} ${itemCount === 1 ? "item" : "items"}, total ${formatPrice(total)}`}
      className="flex h-9 shrink-0 items-center gap-2.5 rounded-full border border-slate-400/40 bg-white/10 px-3.5 text-sm font-medium text-white backdrop-blur-sm transition-all hover:border-slate-300/60 hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
    >
      <span className="whitespace-nowrap">
        {itemCount} {itemCount === 1 ? "item" : "item(s)"} &mdash;{" "}
        {formatPrice(total)}
      </span>
      <ShoppingCart className="h-4 w-4 shrink-0" aria-hidden="true" />
    </button>
  );
}