import { motion } from "motion/react";
import Reveal, { fadeUp, stagger } from "../components/Reveal";
import SectionLabel from "../components/SectionLabel";
import { REVIEWS } from "../lib/content";

function Stars({ className = "" }: { className?: string }) {
  return (
    <span role="img" aria-label="5 out of 5 stars" className={`flex gap-1 ${className}`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} viewBox="0 0 20 20" className="h-3.5 w-3.5 fill-current" aria-hidden>
          <path d="m10 1.5 2.6 5.4 5.9.8-4.3 4.1 1 5.8L10 14.8l-5.2 2.8 1-5.8L1.5 7.7l5.9-.8L10 1.5Z" />
        </svg>
      ))}
    </span>
  );
}

/** Customer reviews: photo-topped quote cards, every third one in ink; a swipeable row on phones. */
export default function Reviews() {
  return (
    <section id="reviews" aria-labelledby="reviews-title" className="border-t border-muted-border bg-warm-white py-24 sm:py-32">
      <div className="mx-auto max-w-[90rem] px-5 sm:px-8 lg:px-12">
        <Reveal className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <SectionLabel>Kind Words</SectionLabel>
            <h2 id="reviews-title" className="display mt-7 text-[2.9rem] sm:text-[4rem]">
              Loved at Every <span className="italic">Celebration</span>
            </h2>
          </div>
          <p className="max-w-sm leading-relaxed text-charcoal/80">
            A few words from the people we&rsquo;ve baked for, and the cakes that made their day.
          </p>
        </Reveal>

        <motion.ul
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          className="no-scrollbar -mx-5 mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 sm:-mx-8 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-6 lg:overflow-visible lg:px-0"
        >
          {REVIEWS.map((review, i) => {
            const dark = i % 3 === 1;
            return (
              <motion.li
                key={review.cake.title}
                variants={fadeUp}
                className={`flex w-[82%] shrink-0 snap-center flex-col overflow-hidden rounded-2xl sm:w-[55%] lg:w-auto ${
                  dark ? "bg-ink text-off-white" : "border border-muted-border bg-off-white text-ink"
                }`}
              >
                <figure className="flex flex-1 flex-col">
                  <div className="relative aspect-[5/4] overflow-hidden">
                    <img
                      src={review.cake.image.src}
                      srcSet={review.cake.image.srcSet}
                      sizes="(min-width: 1024px) 30vw, 82vw"
                      alt={review.cake.alt}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover"
                    />
                    {review.sample && (
                      <span className="eyebrow absolute left-3 top-3 rounded-full bg-off-white/90 px-3 py-1 text-[0.55rem] text-ink">
                        Sample review
                      </span>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-6 sm:p-7">
                    <Stars className={dark ? "text-off-white" : "text-ink"} />
                    <blockquote className="mt-4 flex-1 font-serif text-[1.3rem] leading-snug">
                      &ldquo;{review.quote}&rdquo;
                    </blockquote>
                    <figcaption className="mt-6 flex items-end justify-between gap-4 border-t border-current/15 pt-4">
                      <span>
                        <span className="block text-[0.9rem] font-medium">{review.name}</span>
                        <span className={`mt-0.5 block text-[0.75rem] ${dark ? "text-off-white/60" : "text-stone"}`}>
                          {review.occasion}
                        </span>
                      </span>
                      <span className={`text-right text-[0.72rem] ${dark ? "text-off-white/60" : "text-stone"}`}>
                        {review.cake.title}
                      </span>
                    </figcaption>
                  </div>
                </figure>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}
