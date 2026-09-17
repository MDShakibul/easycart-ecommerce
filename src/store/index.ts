import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "@/features/cart/cartSlice";

/**
 * Redux store — owns global client state only.
 *
 * Cart (Phase 17+):  cartReducer
 *
 * Server state (products) → TanStack Query
 * URL state (filters)     → search params
 * Form state (checkout)   → React Hook Form
 */
export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
