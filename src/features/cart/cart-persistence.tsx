"use client";

import { useEffect } from "react";

import { hydrateCart } from "@/features/cart/cartSlice";
import { store } from "@/store";
import type { CartItem } from "@/types/cart";

// Bumped when the catalogue was replaced (v4): old carts reference product
// IDs that no longer exist, so they must not rehydrate as ghost items.
const STORAGE_KEY = "xm-store-cart-v4";

function isCartItemArray(value: unknown): value is CartItem[] {
  return (
    Array.isArray(value) &&
    value.every(
      (item) =>
        item !== null &&
        typeof item === "object" &&
        typeof (item as CartItem).productId === "string" &&
        typeof (item as CartItem).quantity === "number" &&
        // Stock is required for new carts; legacy carts without it are
        // accepted and normalized (capped) by hydrateCart.
        ((item as CartItem).stock === undefined ||
          typeof (item as CartItem).stock === "number"),
    )
  );
}

/**
 * Persists the Redux cart to localStorage (Phase 18).
 *
 * Runs entirely on the client: the store is hydrated after mount, so the
 * server and first client render both see an empty cart and hydration
 * never mismatches. Writes are driven by a store subscription, so the
 * initial empty state is never written over a previously saved cart.
 */
export function CartPersistence() {
  useEffect(() => {
    // 1. Rehydrate from storage (guarded — missing/corrupt data = empty cart).
    // Always dispatched so `isHydrated` flips even for first-time visitors
    // with nothing stored; otherwise cart/checkout stay on their loading
    // skeletons forever until a refresh.
    let initial: CartItem[] = [];
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw !== null) {
        const parsed: unknown = JSON.parse(raw);
        if (isCartItemArray(parsed)) {
          initial = parsed;
        }
      }
    } catch {
      // Unreadable / corrupt storage — start from an empty cart.
    }
    store.dispatch(hydrateCart(initial));

    // 2. Persist on every subsequent cart change.
    const unsubscribe = store.subscribe(() => {
      try {
        window.localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(store.getState().cart.items),
        );
      } catch {
        // Storage unavailable or full — cart still works in memory.
      }
    });

    return unsubscribe;
  }, []);

  return null;
}