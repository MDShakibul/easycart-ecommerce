import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { CartItem, CartState } from "@/types/cart";

const initialState: CartState = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    /** Add an item or increase its quantity if it already exists. */
    addItem(
      state,
      action: PayloadAction<Omit<CartItem, "quantity"> & { quantity?: number }>,
    ) {
      const { productId, quantity = 1, ...rest } = action.payload;
      const existing = state.items.find((i) => i.productId === productId);
      if (existing) {
        existing.quantity += quantity;
      } else {
        state.items.push({ productId, quantity, ...rest });
      }
    },

    /** Remove an item from the cart entirely. */
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((i) => i.productId !== action.payload);
    },

    /** Increase an item's quantity by 1. */
    increaseQuantity(state, action: PayloadAction<string>) {
      const item = state.items.find((i) => i.productId === action.payload);
      if (item) item.quantity += 1;
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

    /** Remove all items from the cart. */
    clearCart(state) {
      state.items = [];
    },

    /** Replace the whole cart — used by localStorage rehydration (Phase 18). */
    hydrateCart(state, action: PayloadAction<CartItem[]>) {
      state.items = action.payload;
    },
  },
});

export const {
  addItem,
  removeItem,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
  hydrateCart,
} = cartSlice.actions;

export default cartSlice.reducer;