"use client";

import { useEffect } from "react";

import { hydrateCart } from "@/features/cart/cartSlice";
import { store } from "@/store";
import type { CartItem } from "@/types/cart";


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
        ((item as CartItem).stock === undefined ||
          typeof (item as CartItem).stock === "number"),
    )
  );
}


export function CartPersistence() {
  useEffect(() => {
    
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
      
    }
    store.dispatch(hydrateCart(initial));

    
    const unsubscribe = store.subscribe(() => {
      try {
        window.localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(store.getState().cart.items),
        );
      } catch {
        
      }
    });

    return unsubscribe;
  }, []);

  return null;
}