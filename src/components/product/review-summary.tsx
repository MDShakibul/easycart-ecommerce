import { RatingStars } from "@/components/product/rating-stars";
import type { ProductReview } from "@/types/product";

export interface ReviewSummaryProps {
  reviews: ProductReview[];
  rating: number;
  reviewCount: number;
}


export function ReviewSummary({
  reviews,
  rating,
  reviewCount,
}: ReviewSummaryProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-5xl font-semibold tracking-tight text-ink">
          {Number.isFinite(rating) ? rating.toFixed(1) : "—"}
        </p>
        <RatingStars rating={rating} size="md" showValue={false} className="mt-2" />
      </div>
      <div className="text-sm text-ink-soft sm:text-right">
        <p className="font-medium text-ink">
          {reviewCount} {reviewCount === 1 ? "review" : "reviews"}
        </p>
        <p className="mt-1">
          {reviews.length > 0
            ? `${reviews.length} written ${reviews.length === 1 ? "review" : "reviews"} shown`
            : "No written reviews yet"}
        </p>
      </div>
    </div>
  );
}
