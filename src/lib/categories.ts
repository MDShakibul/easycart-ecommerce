/** Product categories present in the dataset. */
export const PRODUCT_CATEGORIES = [
  "electronics",
  "fashion",
  "home decoration",
  "beauty",
  "sports",
  "books",
  "toys",
  "grocery",
] as const;

export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number];

export const CATEGORY_IMAGES: Record<ProductCategory, string> = {
  electronics: "/images/categories/electronics.jpg",
  fashion: "/images/categories/fashion.jpg",
  "home decoration": "/images/categories/home-decoration.jpg",
  beauty: "/images/categories/beauty.jpg",
  sports: "/images/categories/sports.jpg",
  books: "/images/categories/books.jpg",
  toys: "/images/categories/toys.jpg",
  grocery: "/images/categories/grocery.jpg",
};


export function categoryLabel(category: string): string {
   return category
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
