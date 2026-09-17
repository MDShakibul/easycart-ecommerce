export interface CartItem {
  productId: string;
  slug: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
  /** Units available when the item was added — the cap for quantity. */
  stock: number;
}

export interface CartState {
  items: CartItem[];
  /** True once the persisted cart has been rehydrated on the client. */
  isHydrated: boolean;
}