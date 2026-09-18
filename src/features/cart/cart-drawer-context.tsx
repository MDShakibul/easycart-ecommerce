"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

interface CartDrawerValue {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const CartDrawerContext = createContext<CartDrawerValue | null>(null);


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