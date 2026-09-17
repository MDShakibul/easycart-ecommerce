"use client";

import { useEffect } from "react";

import { hydrateCart } from "@/features/cart/cartSlice";
import { store } from "@/store";
import type { CartItem } from "@/types/cart";

const STORAGE_KEY = "xm-store-cart";

function isCartItemArray(value: unknown): value is CartItem[] {
  return (
    Array.isArray(value) &&
    value.every(
      (item) =>
        item !== null &&
        typeof item === "object" &&
        typeof (item as CartItem).productId === "string" &&
        typeof (item as CartItem).quantity === "number",
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
    // 1. Rehydrate from storage (guarded — corrupt data is discarded).
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw !== null) {
        const parsed: unknown = JSON.parse(raw);
        if (isCartItemArray(parsed)) {
          store.dispatch(hydrateCart(parsed));
        }
      }
    } catch {
      // Unreadable / corrupt storage — start from an empty cart.
    }

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