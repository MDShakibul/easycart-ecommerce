"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

interface CartDrawerValue {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const CartDrawerContext = createContext<CartDrawerValue | null>(null);

/**
 * Drawer visibility is local UI state, not URL state and not Redux.
 *
 * Adding `?cart=open` would pollute the listing param contract and force a
 * Suspense boundary onto every statically-rendered page; Redux is reserved
 * for cart contents. A context keeps it scoped and lets both the header
 * button and the drawer act on it.
 */
export function CartDrawerProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <CartDrawerContext.Provider
      value={{
        isOpen,
        open: () => setIsOpen(true),
        close: () => setIsOpen(false),
      }}
    >
      {children}
    </CartDrawerContext.Provider>
  );
}

export function useCartDrawer(): CartDrawerValue {
  const value = useContext(CartDrawerContext);
  if (value === null) {
    throw new Error("useCartDrawer must be used within CartDrawerProvider");
  }
  return value;
}