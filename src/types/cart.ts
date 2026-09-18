export interface CartItem {
  productId: string;
  slug: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
  stock: number;
}

export interface CartState {
  items: CartItem[];
  isHydrated: boolean;
}