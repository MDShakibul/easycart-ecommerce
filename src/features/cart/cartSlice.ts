import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { CartItem, CartState } from "@/types/cart";

const initialState: CartState = {
  items: [],
};

/** Clamp a quantity into 1..stock (stock is always at least 1). */
function clampQuantity(quantity: number, stock: number): number {
  const cap = Number.isFinite(stock) ? Math.max(1, Math.floor(stock)) : 1;
  if (!Number.isFinite(quantity)) return 1;
  return Math.min(Math.max(1, Math.floor(quantity)), cap);
}

/** Stock stored on an item; legacy items may not have one. */
function itemCap(item: CartItem): number {
  return Number.isFinite(item.stock) && item.stock >= 1
    ? Math.floor(item.stock)
    : Number.MAX_SAFE_INTEGER;
}

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    /** Add an item or increase its quantity, never exceeding stock. */
    addItem(
      state,
      action: PayloadAction<Omit<CartItem, "quantity"> & { quantity?: number }>,
    ) {
      const { productId, quantity = 1, stock, ...rest } = action.payload;
      const existing = state.items.find((i) => i.productId === productId);
      if (existing) {
        // Refresh the cap with the latest known stock, then clamp the total.
        existing.stock = stock;
        existing.quantity = clampQuantity(
          existing.quantity + quantity,
          existing.stock,
        );
      } else {
        state.items.push({
          productId,
          quantity: clampQuantity(quantity, stock),
          stock,
          ...rest,
        });
      }
    },

    /** Remove an item from the cart entirely. */
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((i) => i.productId !== action.payload);
    },

    /** Increase an item's quantity by 1, never exceeding stock. */
    increaseQuantity(state, action: PayloadAction<string>) {
      const item = state.items.find((i) => i.productId === action.payload);
      if (item && item.quantity < itemCap(item)) item.quantity += 1;
    },

    /** Decrease an item's quantity by 1; removes it when it hits 0. */
    decreaseQuantity(state, action: PayloadAction<string>) {
      const item = state.items.find((i) => i.productId === action.payload);
      if (!item) return;
      if (item.quantity <= 1) {
        state.items = state.items.filter((i) => i.productId !== action.payload);
      } else {
        item.quantity -= 1;
      }
    },

    /** Set an exact quantity (typed input), clamped to 1..stock. */
    setQuantity(
      state,
      action: PayloadAction<{ productId: string; quantity: number }>,
    ) {
      const item = state.items.find(
        (i) => i.productId === action.payload.productId,
      );
      if (!item) return;
      item.quantity = clampQuantity(action.payload.quantity, itemCap(item));
    },

    /** Remove all items from the cart. */
    clearCart(state) {
      state.items = [];
    },

    /**
     * Replace the whole cart — used by localStorage rehydration (Phase 18).
     * Normalizes legacy items (missing stock) and clamps anything that no
     * longer fits availability.
     */
    hydrateCart(state, action: PayloadAction<CartItem[]>) {
      state.items = action.payload
        .filter(
          (item) =>
            item !== null &&
            typeof item === "object" &&
            typeof item.productId === "string" &&
            Number.isFinite(item.quantity),
        )
        .map((item) => {
          const stock =
            Number.isFinite(item.stock) && (item.stock as number) >= 1
              ? Math.floor(item.stock as number)
              : Math.max(1, Math.floor(item.quantity));
          return { ...item, stock, quantity: clampQuantity(item.quantity, stock) };
        });
    },
  },
});

export const {
  addItem,
  removeItem,
  increaseQuantity,
  decreaseQuantity,
  setQuantity,
  clearCart,
  hydrateCart,
} = cartSlice.actions;

export default cartSlice.reducer;