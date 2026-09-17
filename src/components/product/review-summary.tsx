import { Star } from "lucide-react";

import { cn } from "@/lib/cn";
import type { ProductReview } from "@/types/product";

const STAR_LEVELS = [5, 4, 3, 2, 1] as const;

export interface ReviewSummaryProps {
  reviews: ProductReview[];
  rating: number;
  reviewCount: number;
}

/**
 * Overall rating plus a per-star distribution. Bars are computed from the
 * reviews embedded on the product; `reviewCount` is the catalogue-wide count
 * and is labelled separately so the two numbers never look inconsistent.
 */
export function ReviewSummary({
  reviews,
  rating,
  reviewCount,
}: ReviewSummaryProps) {
  const listed = reviews.length;
  const distribution = STAR_LEVELS.map((stars) => ({
    stars,
    count: reviews.filter((review) => Math.round(review.rating) === stars).length,
  }));

  return (
    <div className="grid gap-6 sm:grid-cols-[minmax(0,180px)_1fr] sm:gap-10">
      <div className="text-center sm:text-left">
        <p className="text-5xl font-bold tracking-tight text-ink">
          {rating.toFixed(1)}
        </p>
        <div
          className="mt-2 flex items-center justify-center gap-0.5 sm:justify-start"
          role="img"
          aria-label={`${rating} out of 5 stars`}
        >
          {Array.from({ length: 5 }, (_, i) => (
            <Star
              key={i}
              className={cn(
                "h-4 w-4",
                i < Math.round(rating)
                  ? "fill-amber-400 text-amber-400"
                  : "text-line-strong",
              )}
              aria-hidden="true"
            />
          ))}
        </div>
        <p className="mt-2 text-sm text-ink-soft">
          {reviewCount} {reviewCount === 1 ? "review" : "reviews"}
        </p>
      </div>

      {listed > 0 && (
        <ul className="space-y-2">
          {distribution.map(({ stars, count }) => (
            <li key={stars} className="flex items-center gap-3">
              <span className="w-10 shrink-0 text-xs font-medium text-ink-soft">
                {stars}★
              </span>
              <span className="h-2 flex-1 overflow-hidden rounded-full bg-surface">
                <span
                  className="block h-full rounded-full bg-ink"
                  style={{ width: `${(count / listed) * 100}%` }}
                />
              </span>
              <span className="w-8 shrink-0 text-right text-xs text-ink-muted">
                {count}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}