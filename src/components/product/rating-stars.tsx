import { Star } from "lucide-react";

import { cn } from "@/lib/cn";

export type RatingStarsSize = "sm" | "md" | "lg";

const sizeStyles: Record<RatingStarsSize, string> = {
  sm: "h-3.5 w-3.5",
  md: "h-4 w-4",
  lg: "h-5 w-5",
};

function clampRating(value: number): number {
  return Number.isFinite(value) ? Math.min(5, Math.max(0, value)) : 0;
}

export interface RatingStarsProps {
  rating: number;
  reviewCount?: number;
  size?: RatingStarsSize;
  className?: string;
  showValue?: boolean;
}

/** Displays a decimal rating with a precise partial-star fill. */
export function RatingStars({
  rating,
  reviewCount,
  size = "md",
  className,
  showValue = true,
}: RatingStarsProps) {
  const value = clampRating(rating);
  const hasRating = Number.isFinite(rating) && rating > 0;
  const label = hasRating
    ? `Rated ${value.toFixed(1)} out of 5`
    : "Not yet rated";

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <span className="flex items-center gap-0.5" role="img" aria-label={label}>
        {Array.from({ length: 5 }, (_, index) => {
          const fill = Math.min(1, Math.max(0, value - index));

          return (
            <span
              key={index}
              className="relative block shrink-0"
              aria-hidden="true"
            >
              <Star
                className={cn(sizeStyles[size], "fill-transparent text-line-strong")}
              />
              {fill > 0 && (
                <span
                  className="absolute inset-y-0 left-0 overflow-hidden"
                  style={{ width: `${fill * 100}%` }}
                >
                  <Star
                    className={cn(sizeStyles[size], "fill-amber-400 text-amber-400")}
                  />
                </span>
              )}
            </span>
          );
        })}
      </span>

      {showValue && (
        <span className="font-medium text-ink">
          {hasRating ? value.toFixed(1) : "No rating"}
        </span>
      )}

      {reviewCount !== undefined && Number.isFinite(reviewCount) && (
        <span className="text-ink-soft">
          {Math.max(0, Math.floor(reviewCount))} {reviewCount === 1 ? "review" : "reviews"}
        </span>
      )}
    </div>
  );
}
