"use client";

import { Check, Heart, Share2, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { ImageGallery } from "@/components/image-gallery";
import { RatingStars } from "@/components/product/rating-stars";
import { ProductDetailsSkeleton } from "@/components/product/product-details-skeleton";
import { ReviewSummary } from "@/components/product/review-summary";
import { TrustInfo } from "@/components/product/trust-info";
import { QuantityStepper } from "@/components/ui/quantity-stepper";
import { useToast } from "@/components/ui/toast";
import { selectCartItem } from "@/features/cart/cartSelectors";
import { addItem } from "@/features/cart/cartSlice";
import { useProduct } from "@/hooks/useProduct";
import { useProductVariants } from "@/hooks/useProductVariants";
import { categoryLabel } from "@/lib/categories";
import { cn } from "@/lib/cn";
import { getProductVariantLabel } from "@/lib/product-family";
import { formatPrice } from "@/lib/format";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

const LOW_STOCK_THRESHOLD = 10;

type DetailSection = "description" | "details" | "reviews";

function formatDate(value: string): string {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Not available";
  }

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

/**
 * Product details powered by the existing product query and Redux cart.
 * Product metadata is rendered from the response; no catalog values are
 * hardcoded here.
 */
export function ProductDetails({ slug }: { slug: string }) {
  const { data: product, isPending, isError, error } = useProduct(slug);
  const { data: variants } = useProductVariants(slug);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [addedProductId, setAddedProductId] = useState<string | null>(null);
  const [wishlistedProductId, setWishlistedProductId] = useState<string | null>(
    null,
  );
  const [activeSection, setActiveSection] =
    useState<DetailSection>("description");

  const cartItem = useAppSelector(
    selectCartItem(product?.id?.trim() || slug),
  );

  if (isPending) {
    return <ProductDetailsSkeleton />;
  }

  if (isError) {
    return (
      <div
        role="alert"
        className="flex flex-col items-center gap-4 rounded-2xl border border-line bg-paper-raised px-6 py-16 text-center"
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

  const title = product.title?.trim() || "Product";
  const brand = product.brand?.trim() || "Unbranded";
  const category = product.category?.trim() || "";
  const displayCategory = category ? categoryLabel(category) : "Uncategorized";
  const productId = product.id?.trim() || slug;
  const productSlug = product.slug?.trim() || slug;
  const images = Array.isArray(product.images)
    ? product.images.filter(
        (image): image is string =>
          typeof image === "string" && image.trim().length > 0,
      )
    : [];
  const reviews = Array.isArray(product.reviews) ? product.reviews : [];
  const price =
    Number.isFinite(product.price) && product.price >= 0 ? product.price : 0;
  const rating = Number.isFinite(product.rating)
    ? Math.min(5, Math.max(0, product.rating))
    : 0;
  const reviewCount =
    Number.isFinite(product.reviewCount) && product.reviewCount >= 0
      ? Math.floor(product.reviewCount)
      : 0;
  const stock =
    Number.isFinite(product.stock) && product.stock >= 0
      ? Math.floor(product.stock)
      : 0;
  const inCartQuantity = cartItem?.quantity ?? 0;
  const remaining = Math.max(0, stock - inCartQuantity);
  const maxQuantity = Math.max(1, remaining);
  const selectedQuantity = Math.min(Math.max(1, quantity), maxQuantity);
  const canPurchase = stock > 0 && remaining > 0;
  const stockLabel =
    stock === 0
      ? "Out of stock"
      : stock <= LOW_STOCK_THRESHOLD
        ? `Only ${stock} left`
        : "In stock";
  const stockDetail = stock === 0 ? "Currently unavailable" : `${stock} units available`;
  const variantProducts = (variants ?? []).filter(
    (variant) => variant.id && variant.slug,
  );
  const added = addedProductId === productId;
  const isWishlisted = wishlistedProductId === productId;

  const handleAddToCart = () => {
    if (!canPurchase || added) return;

    dispatch(
      addItem({
        productId,
        slug: productSlug,
        title,
        price,
        image: images[0] ?? "",
        stock,
        quantity: Math.min(selectedQuantity, remaining),
      }),
    );
    setQuantity(1);
    setAddedProductId(productId);
    toast(
      selectedQuantity === 1
        ? "Added to cart"
        : `Added ${selectedQuantity} to cart`,
    );
    window.setTimeout(() => {
      setAddedProductId((current) =>
        current === productId ? null : current,
      );
    }, 2000);
  };

  const handleBuyNow = () => {
    if (!canPurchase) return;

    dispatch(
      addItem({
        productId,
        slug: productSlug,
        title,
        price,
        image: images[0] ?? "",
        stock,
        quantity: Math.min(selectedQuantity, remaining),
      }),
    );
    router.push("/checkout");
  };

  const jumpToSection = (section: DetailSection) => {
    setActiveSection(section);
    requestAnimationFrame(() => {
      document
        .getElementById("product-information")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const toggleWishlist = () => {
    const nextValue = !isWishlisted;
    setWishlistedProductId(nextValue ? productId : null);
    toast(nextValue ? "Saved to your wishlist" : "Removed from your wishlist");
  };

  const shareProduct = async () => {
    const url = window.location.href;

    if (typeof navigator.share === "function") {
      try {
        await navigator.share({ title, url });
      } catch {
        // A cancelled native share should not show an error toast.
      }
      return;
    }

    try {
      await navigator.clipboard.writeText(url);
      toast("Product link copied");
    } catch {
      toast("Unable to copy product link");
    }
  };

  return (
    <>
      <section
        aria-label="Product purchase information"
        className="grid gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(22rem,0.92fr)] lg:items-start lg:gap-14"
      >
        <div>
          <ImageGallery images={images} title={title} />
          <p className="mt-3 text-center text-xs text-ink-muted sm:text-left">
            {images.length > 0
              ? `${images.length} product ${images.length === 1 ? "image" : "images"}`
              : "Product images unavailable"}
          </p>
        </div>

        <div className="lg:sticky lg:top-28">
          <p className="text-xs font-semibold tracking-[0.16em] text-ink-muted uppercase">
            {brand}
          </p>
          <h1 className="mt-3 text-3xl leading-tight font-semibold tracking-tight text-ink sm:text-4xl">
            {title}
          </h1>

          <button
            type="button"
            onClick={() => jumpToSection("reviews")}
            className="mt-4 inline-flex rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
            aria-label={`View ${reviewCount} product reviews`}
          >
            <RatingStars
              rating={rating}
              reviewCount={reviewCount}
              size="sm"
              className="text-sm"
            />
          </button>

          <p className="mt-6 text-3xl font-semibold tracking-tight text-ink">
            {formatPrice(price)}
          </p>

          <div className="mt-5 flex items-start gap-3 border-y border-line py-4">
            <span
              className={cn(
                "mt-1 h-2.5 w-2.5 shrink-0 rounded-full",
                stock === 0 ? "bg-error" : "bg-success",
              )}
              aria-hidden="true"
            />
            <div>
              <p
                className={cn(
                  "text-sm font-semibold",
                  stock === 0 ? "text-error" : "text-success",
                )}
              >
                {stockLabel}
              </p>
              <p className="mt-0.5 text-xs text-ink-soft">{stockDetail}</p>
            </div>
          </div>

          {variantProducts.length > 1 && (
            <fieldset className="mt-6">
              <legend className="text-sm font-semibold text-ink">Variant</legend>
              <div
                className="mt-3 flex flex-wrap gap-2"
                role="radiogroup"
                aria-label="Product variants"
              >
                {variantProducts.map((variant) => {
                  const selected = variant.id === product.id;
                  const option =
                    getProductVariantLabel(variant) ?? variant.title ?? "Option";

                  return (
                    <button
                      key={variant.id}
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      onClick={() => {
                        if (!selected) router.push(`/products/${variant.slug}`);
                      }}
                      className={cn(
                        "max-w-full rounded-lg border px-3 py-2 text-left text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2",
                        selected
                          ? "border-ink bg-ink font-medium text-white"
                          : "border-line-strong bg-paper-raised text-ink hover:border-ink",
                      )}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            </fieldset>
          )}

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
            {canPurchase && (
              <QuantityStepper
                value={selectedQuantity}
                max={maxQuantity}
                onDecrement={() =>
                  setQuantity((current) => Math.max(1, current - 1))
                }
                onIncrement={() =>
                  setQuantity((current) =>
                    Math.min(maxQuantity, current + 1),
                  )
                }
                onCommit={setQuantity}
                itemLabel={title}
                size="md"
                className="self-start bg-paper-raised"
              />
            )}
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={!canPurchase || added}
              className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-brand px-6 text-sm font-semibold text-white shadow-sm shadow-indigo-600/20 transition-colors hover:bg-brand-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            >
              {added ? (
                <>
                  <Check className="h-4 w-4" aria-hidden="true" />
                  Added to cart
                </>
              ) : (
                <>
                  <ShoppingCart className="h-4 w-4" aria-hidden="true" />
                  {stock === 0
                    ? "Out of stock"
                    : remaining === 0
                      ? "Maximum in cart"
                      : "Add to cart"}
                </>
              )}
            </button>
            <button
              type="button"
              onClick={handleBuyNow}
              disabled={!canPurchase}
              className="inline-flex h-12 items-center justify-center rounded-full border border-line-strong bg-paper-raised px-6 text-sm font-semibold text-ink transition-colors hover:border-ink hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            >
              Buy now
            </button>
          </div>

          {cartItem !== undefined && remaining > 0 && (
            <p className="mt-2 text-xs text-ink-muted">
              {cartItem.quantity} already in your cart · {remaining} more available
            </p>
          )}
          {stock > 0 && remaining === 0 && (
            <p className="mt-3 text-xs font-medium text-ink-soft">
              All available units are already in your cart.
            </p>
          )}

          <div className="mt-5 flex flex-wrap items-center gap-4 border-t border-line pt-4">
            <button
              type="button"
              onClick={toggleWishlist}
              aria-pressed={isWishlisted}
              className="inline-flex items-center gap-2 text-sm text-ink-soft transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
            >
              <Heart
                className={cn(
                  "h-4 w-4",
                  isWishlisted && "fill-sale text-sale",
                )}
                aria-hidden="true"
              />
              {isWishlisted ? "Saved to wishlist" : "Add to wishlist"}
            </button>
            <button
              type="button"
              onClick={shareProduct}
              className="inline-flex items-center gap-2 text-sm text-ink-soft transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
            >
              <Share2 className="h-4 w-4" aria-hidden="true" />
              Share product
            </button>
          </div>

          <div className="mt-6 rounded-2xl border border-line bg-paper-raised p-4 sm:p-5">
            <TrustInfo />
          </div>
        </div>
      </section>

      <section
        id="product-information"
        className="mt-16 scroll-mt-28 border-t border-line pt-10 sm:mt-20"
      >
        <div
          role="tablist"
          aria-label="Product information"
          className="flex gap-6 overflow-x-auto border-b border-line"
        >
          {(
            [
              { id: "description", label: "Description" },
              { id: "details", label: "Product details" },
              { id: "reviews", label: "Reviews" },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeSection === tab.id}
              aria-controls={`product-${tab.id}`}
              onClick={() => setActiveSection(tab.id)}
              className={cn(
                "-mb-px border-b-2 px-1 pb-3 text-sm font-medium whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2",
                activeSection === tab.id
                  ? "border-ink font-semibold text-ink"
                  : "border-transparent text-ink-soft hover:text-ink",
              )}
            >
              {tab.label}
              {tab.id === "reviews" && (
                <span className="ml-1 text-ink-muted">({reviewCount})</span>
              )}
            </button>
          ))}
        </div>

        <div className="py-8">
          {activeSection === "description" && (
            <div id="product-description" role="tabpanel" className="max-w-3xl">
              <h2 className="text-xl font-semibold tracking-tight text-ink">
                Product description
              </h2>
              <p className="mt-4 whitespace-pre-line text-sm leading-7 text-ink-soft">
                {product.description?.trim() ||
                  "No description is available for this product."}
              </p>
            </div>
          )}

          {activeSection === "details" && (
            <div id="product-details" role="tabpanel" className="max-w-3xl">
              <h2 className="text-xl font-semibold tracking-tight text-ink">
                Product details
              </h2>
              <dl className="mt-5 divide-y divide-line rounded-2xl border border-line bg-paper-raised">
                {[
                  ["Brand", brand],
                  ["Category", displayCategory],
                  ["Product ID", productId],
                  ["Stock", stock === 0 ? "Out of stock" : `${stock} units`],
                  ["Added", formatDate(product.createdAt)],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="grid gap-1 px-4 py-3 text-sm sm:grid-cols-[10rem_1fr] sm:gap-4"
                  >
                    <dt className="text-ink-muted">{label}</dt>
                    <dd className="font-medium text-ink">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          {activeSection === "reviews" && (
            <div id="product-reviews" role="tabpanel" className="max-w-4xl">
              <h2 className="text-xl font-semibold tracking-tight text-ink">
                Customer reviews
              </h2>
              <div className="mt-6 rounded-2xl border border-line bg-paper-raised p-5 sm:p-6">
                <ReviewSummary
                  reviews={reviews}
                  rating={rating}
                  reviewCount={reviewCount}
                />
              </div>

              {reviews.length === 0 ? (
                <p className="mt-6 text-sm text-ink-soft">
                  No written reviews are available for this product yet.
                </p>
              ) : (
                <ul className="mt-6 grid gap-4 md:grid-cols-2">
                  {reviews.map((review) => {
                    const reviewRating = Number.isFinite(review.rating)
                      ? Math.min(5, Math.max(0, review.rating))
                      : 0;

                    return (
                      <li
                        key={review.id}
                        className="rounded-2xl border border-line bg-paper-raised p-5"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <RatingStars rating={reviewRating} size="sm" showValue={false} />
                          <time
                            dateTime={review.date}
                            className="text-xs text-ink-muted"
                          >
                            {formatDate(review.date)}
                          </time>
                        </div>
                        <p className="mt-3 text-sm font-semibold text-ink">
                          {review.author?.trim() || "Customer"}
                        </p>
                        <h3 className="mt-2 text-sm font-semibold text-ink">
                          {review.title?.trim() || "Review"}
                        </h3>
                        <p className="mt-2 text-sm leading-6 text-ink-soft">
                          {review.comment?.trim() || "No written comment provided."}
                        </p>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
