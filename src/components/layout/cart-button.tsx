"use client";

import { ShoppingCart } from "lucide-react";

import { useCartDrawer } from "@/features/cart/cart-drawer-context";
import { selectCartItemCount } from "@/features/cart/cartSelectors";
import { useAppSelector } from "@/store/hooks";

/**
 * Header cart trigger. Opens the drawer rather than navigating — the drawer
 * links through to the full `/cart` page, so both paths stay reachable.
 */
export function CartButton() {
  const itemCount = useAppSelector(selectCartItemCount);
  const { open } = useCartDrawer();

  return (
    <button
      type="button"
      onClick={open}
      aria-label={
        itemCount > 0 ? `Open cart, ${itemCount} items` : "Open cart"
      }
      className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-surface hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
    >
      <ShoppingCart className="h-5 w-5" aria-hidden="true" />
      {itemCount > 0 && (
        <span
          aria-hidden="true"
          className="absolute top-0.5 right-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-brand px-1 text-[10px] font-bold text-brand-ink"
        >
          {itemCount > 99 ? "99+" : itemCount}
        </span>
      )}
    </button>
  );
}