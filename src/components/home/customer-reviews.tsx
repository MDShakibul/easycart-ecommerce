import Link from "next/link";
import { Star } from "lucide-react";

import { SectionHeading } from "@/components/ui/section-heading";
import { getShowcasedReviews } from "@/lib/home";

export function CustomerReviews() {
  const reviews = getShowcasedReviews(3);

  if (reviews.length === 0) {
    return null;
  }

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading
        title="What customers say"
        description="Verified reviews from the catalogue."
      />

      <ul className="grid gap-6 md:grid-cols-3">
        {reviews.map((review) => (
          <li
            key={review.id}
            className="flex flex-col rounded-xl border border-line bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.05)] transition-shadow hover:shadow-[0_12px_32px_-12px_rgba(79,70,229,0.2)]"
          >
            <div className="flex items-center gap-1" aria-label={`${review.rating} out of 5 stars`}>
              {Array.from({ length: 5 }, (_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < review.rating
                      ? "fill-amber-400 text-amber-400"
                      : "text-line-strong"
                  }`}
                  aria-hidden="true"
                />
              ))}
            </div>
            <h3 className="mt-4 font-semibold text-ink">{review.title}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">
              {review.comment}
            </p>
            <div className="mt-4 border-t border-line pt-4">
              <p className="text-sm font-medium text-ink">{review.author}</p>
              <Link
                href={`/products/${review.productSlug}`}
                className="mt-0.5 line-clamp-1 text-xs text-ink-muted transition-colors hover:text-brand"
              >
                on {review.productTitle}
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}