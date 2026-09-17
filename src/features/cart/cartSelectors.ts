import type { RootState } from "@/store";

/** All items currently in the cart. */
export const selectCartItems = (state: RootState) => state.cart.items;

/** Total number of individual units across all cart items. */
export const selectCartItemCount = (state: RootState) =>
  state.cart.items.reduce((sum, item) => sum + item.quantity, 0);

/** Grand total price of all cart items. */
export const selectCartTotal = (state: RootState) =>
  state.cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

/** Find a single cart item by productId (undefined if not in cart). */
export const selectCartItem = (productId: string) => (state: RootState) =>
  state.cart.items.find((i) => i.productId === productId);
