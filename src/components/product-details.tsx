"use client";

import { Check, Minus, Plus, ShoppingCart, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { ImageGallery } from "@/components/image-gallery";
import { ProductDetailsSkeleton } from "@/components/product/product-details-skeleton";
import { ReviewSummary } from "@/components/product/review-summary";
import { TrustInfo } from "@/components/product/trust-info";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { selectCartItem } from "@/features/cart/cartSelectors";
import { addItem } from "@/features/cart/cartSlice";
import { useProduct } from "@/hooks/useProduct";
import { categoryLabel } from "@/lib/categories";
import { formatPrice } from "@/lib/format";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

const LOW_STOCK_THRESHOLD = 5;
const MAX_PER_ORDER = 10;

/**
 * Product details.
 *
 * TanStack Query owns the product; Redux owns the cart. Nothing from the
 * product response is copied into Redux — the cart receives only the fields
 * it renders (id, slug, title, price, image, quantity).
 *
 * The handlers are arrow consts, not hoisted `function` declarations: a
 * hoisted function does not inherit the `!product` guard's narrowing, which
 * reintroduces `TS18048` on every `product.x` read inside it.
 */
export function ProductDetails({ slug }: { slug: string }) {
  const { data: product, isPending, isError, error } = useProduct(slug);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const cartItem = useAppSelector(selectCartItem(product?.id ?? ""));

  if (isPending) {
    return <ProductDetailsSkeleton />;
  }

  if (isError) {
    return (
      <div
        role="alert"
        className="flex flex-col items-center gap-4 rounded-xl border border-line bg-paper-raised px-6 py-16 text-center"
      >
        <h2 className="text-lg font-semibold text-ink">
          We couldn&apos;t load this product
        </h2>
        <p className="max-w-md text-sm text-ink-soft">
          {error instanceof Error
            ? error.message
            : "Something went wrong. Please try again."}
        </p>
      </div>
    );
  }

  if (!product) {
    return <ProductDetailsSkeleton />;
  }

  const inStock = product.stock > 0;
  const lowStock = inStock && product.stock <= LOW_STOCK_THRESHOLD;
  const maxQuantity = Math.max(1, Math.min(product.stock, MAX_PER_ORDER));
  const image = product.images[0] ?? "";

  const handleAddToCart = () => {
    if (!inStock || added) return;
    dispatch(
      addItem({
        productId: product.id,
        slug: product.slug,
        title: product.title,
        price: product.price,
        image,
        quantity,
      }),
    );
    setQuantity(1);
    setAdded(true);
    toast(
      quantity === 1
        ? "Added to cart"
        : `Added ${quantity} to cart`,
    );
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    if (!inStock) return;
    dispatch(
      addItem({
        productId: product.id,
        slug: product.slug,
        title: product.title,
        price: product.price,
        image,
        quantity,
      }),
    );
    router.push("/checkout");
  };

  const stepButton =
    "flex h-10 w-10 items-center justify-center text-ink transition-colors hover:bg-brand-soft hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand disabled:pointer-events-none disabled:opacity-40";

  return (
    <>
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        <ImageGallery images={product.images} title={product.title} />

        <div className="flex flex-col gap-5">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-xs font-medium tracking-wide text-ink-muted uppercase">
                {product.brand}
              </p>
              {lowStock && <Badge variant="warning">Only {product.stock} left</Badge>}
              {!inStock && <Badge variant="error">Out of stock</Badge>}
            </div>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              {product.title}
            </h1>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <span
              className="flex items-center gap-1"
              aria-label={`Rated ${product.rating} out of 5 from ${product.reviewCount} reviews`}
            >
              <Star
                className="h-4 w-4 fill-amber-400 text-amber-400"
                aria-hidden="true"
              />
              <span className="font-medium text-ink">
                {product.rating.toFixed(1)}
              </span>
            </span>
            <a
              href="#reviews"
              className="rounded text-ink-soft underline underline-offset-4 transition-colors hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            >
              {product.reviewCount}{" "}
              {product.reviewCount === 1 ? "review" : "reviews"}
            </a>
          </div>

          <p className="text-3xl font-bold tracking-tight text-brand">
            {formatPrice(product.price)}
          </p>

          <p className="text-sm leading-relaxed text-ink-soft">
            {product.description}
          </p>

          <dl className="grid grid-cols-2 gap-x-6 gap-y-2 border-y border-line py-4 text-sm">
            <dt className="text-ink-soft">Category</dt>
            <dd className="text-right font-medium text-ink">
              {categoryLabel(product.category)}
            </dd>
            <dt className="text-ink-soft">Availability</dt>
            <dd
              className={`text-right font-medium ${
                inStock ? "text-success" : "text-error"
              }`}
            >
              {inStock ? `${product.stock} in stock` : "Out of stock"}
            </dd>
          </dl>

          {inStock && (
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-ink">Quantity</span>
              <div className="flex items-center rounded-full border border-line-strong">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                  aria-label="Decrease quantity"
                  className={`${stepButton} rounded-l-full`}
                >
                  <Minus className="h-4 w-4" aria-hidden="true" />
                </button>
                <span
                  className="w-10 text-center text-sm font-medium text-ink"
                  aria-live="polite"
                >
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setQuantity((q) => Math.min(maxQuantity, q + 1))
                  }
                  disabled={quantity >= maxQuantity}
                  aria-label="Increase quantity"
                  className={`${stepButton} rounded-r-full`}
                >
                  <Plus className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
              {cartItem !== undefined && (
                <span className="text-xs text-ink-muted">
                  {cartItem.quantity} already in cart
                </span>
              )}
            </div>
          )}

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              type="button"
              size="lg"
              onClick={handleAddToCart}
              disabled={!inStock || added}
              className="flex-1"
            >
              {added ? (
                <>
                  <Check className="h-5 w-5" aria-hidden="true" />
                  Added to cart
                </>
              ) : (
                <>
                  <ShoppingCart className="h-5 w-5" aria-hidden="true" />
                  {inStock ? "Add to cart" : "Out of stock"}
                </>
              )}
            </Button>
            {inStock && (
              <Button
                type="button"
                size="lg"
                variant="outline"
                onClick={handleBuyNow}
                className="sm:w-40"
              >
                Buy now
              </Button>
            )}
          </div>

          <TrustInfo />
        </div>
      </div>

      <section
        id="reviews"
        className="mt-16 scroll-mt-24 border-t border-line pt-10"
      >
        <h2 className="text-2xl font-bold tracking-tight text-ink">
          Customer reviews
        </h2>

        <div className="mt-6">
          <ReviewSummary
            reviews={product.reviews}
            rating={product.rating}
            reviewCount={product.reviewCount}
          />
        </div>

        {product.reviews.length === 0 ? (
          <p className="mt-8 text-sm text-ink-soft">
            No written reviews for this product yet.
          </p>
        ) : (
          <ul className="mt-8 space-y-4">
            {product.reviews.map((review) => (
              <li
                key={review.id}
                className="rounded-xl border border-line bg-paper-raised p-5"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span
                      className="flex items-center gap-1"
                      aria-label={`${review.rating} out of 5 stars`}
                    >
                      <Star
                        className="h-3.5 w-3.5 fill-amber-400 text-amber-400"
                        aria-hidden="true"
                      />
                      <span className="text-sm font-medium text-ink">
                        {review.rating}
                      </span>
                    </span>
                    <span className="text-sm font-medium text-ink">
                      {review.author}
                    </span>
                  </div>
                  <time
                    dateTime={review.date}
                    className="text-xs text-ink-muted"
                  >
                    {new Date(review.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </time>
                </div>
                <h3 className="mt-3 font-semibold text-ink">{review.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                  {review.comment}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}