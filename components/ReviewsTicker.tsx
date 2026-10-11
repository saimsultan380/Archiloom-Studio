import { Star } from "lucide-react";
import { reviewSummary, reviews } from "@/data/reviews";

export function ReviewsTicker() {
  return (
    <section className="bg-charcoal text-white" aria-labelledby="reviews-heading">
      <div className="flex flex-col md:flex-row md:items-stretch">
        <div className="shrink-0 border-b border-white/10 px-6 py-5 md:max-w-xs md:border-r md:border-b-0">
          <h2 id="reviews-heading" className="font-display text-sm font-semibold tracking-wide">
            {reviewSummary.average} average rating · {reviewSummary.count} verified reviews
          </h2>
          <p className="mt-1 text-[12px] leading-snug text-white/65">Sample layout — not live testimonials.</p>
        </div>
        <div className="ticker min-w-0 flex-1 overflow-hidden py-4">
          <div className="ticker-track flex w-max">
            <ul className="flex">
              {reviews.map((review) => (
                <li key={review.id} className="mx-3 w-[280px] shrink-0 border border-white/10 px-4 py-3">
                  <span className="flex gap-0.5 text-action" aria-hidden>
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star key={index} className="h-3.5 w-3.5 fill-current" strokeWidth={0} />
                    ))}
                  </span>
                  <p className="mt-2 text-sm leading-relaxed text-white/85">{review.quote}</p>
                  <p className="mt-2 font-display text-[12px] font-medium text-white/60">
                    {review.name} · {review.country}
                  </p>
                </li>
              ))}
            </ul>
            <ul className="flex" aria-hidden>
              {reviews.map((review) => (
                <li key={`${review.id}-copy`} className="mx-3 w-[280px] shrink-0 border border-white/10 px-4 py-3">
                  <span className="flex gap-0.5 text-action">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star key={index} className="h-3.5 w-3.5 fill-current" strokeWidth={0} />
                    ))}
                  </span>
                  <p className="mt-2 text-sm leading-relaxed text-white/85">{review.quote}</p>
                  <p className="mt-2 font-display text-[12px] font-medium text-white/60">
                    {review.name} · {review.country}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
