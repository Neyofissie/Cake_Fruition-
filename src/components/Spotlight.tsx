import type { HTMLAttributes } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { EASE } from "./Reveal";
import { ArrowIcon } from "./Icons";
import { SPOTLIGHT_CAKES, type GalleryItem } from "../lib/content";
import { useRotation } from "../lib/useRotation";
import { whatsappLink } from "../lib/site";

export const SPOTLIGHT_WORD = "Layers";

export function askAbout(cake: GalleryItem) {
  return whatsappLink(`Hi Cake Fruition! I love the "${cake.title}" cake — could I get a quote for something similar?`);
}

/** Pale dove-grey sky with a bank of soft clouds along the bottom, drawn with blurred ellipses. */
export function SpotlightBackdrop({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();
  const clouds = [
    "left-[-6%] bottom-[-10%] h-[38%] w-[34%]",
    "left-[20%] bottom-[-14%] h-[34%] w-[30%]",
    "left-[44%] bottom-[-12%] h-[40%] w-[30%]",
    "right-[-6%] bottom-[-10%] h-[42%] w-[34%]",
    "left-[8%] bottom-[2%] h-[20%] w-[22%]",
    "right-[12%] bottom-[4%] h-[18%] w-[22%]",
  ];
  return (
    <div aria-hidden className={`overflow-hidden bg-[linear-gradient(180deg,#d8d2c9_0%,#e9e5df_48%,#f6f3ee_100%)] ${className}`}>
      {/* A few high wisps */}
      <div className="absolute left-[8%] top-[14%] h-[10%] w-[18%] rounded-full bg-white/70 blur-2xl" />
      <div className="absolute right-[10%] top-[10%] h-[12%] w-[22%] rounded-full bg-white/60 blur-2xl" />
      {clouds.map((c, i) => (
        <motion.div
          key={c}
          className={`absolute rounded-[50%] bg-white blur-2xl ${c}`}
          animate={reduce ? undefined : { x: [0, i % 2 ? 14 : -14, 0] }}
          transition={{ duration: 14 + i * 2, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
      {/* Orbit ring the cake sits in, as in a product stage */}
      <div className="absolute bottom-[9%] left-1/2 h-[16%] w-[54%] -translate-x-1/2 rounded-[50%] border border-ink/15" />
    </div>
  );
}

/** The giant word behind the cake, fading from ink to nothing so the cake reads in front of it. */
export function SpotlightWord({ className = "" }: { className?: string }) {
  return (
    <p
      aria-hidden
      className={`select-none bg-gradient-to-b from-ink/30 via-ink/15 to-ink/0 bg-clip-text text-center font-serif uppercase leading-[0.8] tracking-[0.02em] text-transparent ${className}`}
    >
      {SPOTLIGHT_WORD}
    </p>
  );
}

/** "Featured cake 02 / 06", the cake's name, a row of position bars and a link to ask about it. */
export function FeaturedReadout({
  index,
  onSelect,
  className = "",
}: {
  index: number;
  onSelect?: (i: number) => void;
  className?: string;
}) {
  const cake = SPOTLIGHT_CAKES[index];
  const total = String(SPOTLIGHT_CAKES.length).padStart(2, "0");
  return (
    <div className={className}>
      <p className="eyebrow text-[0.6rem] text-stone">
        Featured cake <span className="ml-2 text-ink">{String(index + 1).padStart(2, "0")}</span> / {total}
      </p>
      <AnimatePresence mode="wait" initial={false}>
        <motion.p
          key={cake.title}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: EASE }}
          className="mt-2 font-serif text-[1.65rem] leading-tight text-ink"
        >
          {cake.title}
        </motion.p>
      </AnimatePresence>
      <div
        role={onSelect ? "group" : undefined}
        aria-label={onSelect ? "Choose a featured cake" : undefined}
        className="mt-2 flex gap-1.5"
      >
        {SPOTLIGHT_CAKES.map((c, i) => {
          const bar = (
            <span
              className={`block h-[3px] rounded-full transition-all duration-500 ease-luxe ${
                i === index ? "w-7 bg-ink" : "w-3 bg-ink/25"
              }`}
            />
          );
          return onSelect ? (
            <button
              key={c.title}
              type="button"
              onClick={() => onSelect(i)}
              aria-label={`Show ${c.title}`}
              aria-pressed={i === index}
              className="flex h-6 items-center"
            >
              {bar}
            </button>
          ) : (
            <span key={c.title} aria-hidden className="flex h-6 items-center">
              {bar}
            </span>
          );
        })}
      </div>
      <a
        href={askAbout(cake)}
        target="_blank"
        rel="noopener noreferrer"
        className="eyebrow mt-2 inline-block text-[0.6rem] text-ink underline decoration-ink/30 underline-offset-4 hover:decoration-ink"
      >
        Ask about this cake
      </a>
    </div>
  );
}

/** The arched photo frame the spotlight cakes sit in, with an offset hairline arch behind it. */
export function SpotlightArch({ children, className = "", ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`relative aspect-[4/5] ${className}`}>
      <div aria-hidden className="absolute inset-0 translate-x-4 translate-y-4 rounded-t-full border border-ink/25" />
      <div
        className="relative h-full overflow-hidden rounded-t-full bg-light-grey shadow-[0_40px_80px_-40px_rgba(11,11,11,0.55)]"
        {...rest}
      >
        {children}
      </div>
    </div>
  );
}

/** Caption block, menu button and scroll button laid around the cake. */
export function SpotlightDetails({ layout, titleId }: { layout: "overlay" | "stacked"; titleId: string }) {
  const overlay = layout === "overlay";
  return (
    <>
      <div className={overlay ? "absolute left-[6%] top-[46%] max-w-[15rem]" : "max-w-xs"}>
        <p className="eyebrow text-[0.62rem] text-stone">Signature collection</p>
        <h2 id={titleId} className="mt-3 font-serif text-[2rem] leading-[1.05] text-ink">
          Every layer, <span className="italic">made to order</span>
        </h2>
        <p className="mt-3 text-[0.9rem] leading-relaxed text-charcoal/80">
          Freshly baked sponge, flavour-matched cream fillings and hand-finished detail, tier by tier.
        </p>
      </div>

      <a
        href="#menu"
        className={`eyebrow group inline-flex min-h-12 items-center gap-3 rounded-full bg-ink px-6 text-[0.66rem] text-off-white shadow-[0_14px_34px_-14px_rgba(11,11,11,0.7)] transition-transform hover:-translate-y-0.5 ${
          overlay ? "absolute right-[7%] top-[62%]" : ""
        }`}
      >
        Explore the Menu
        <ArrowIcon size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
      </a>

      <a
        href="#gallery"
        aria-label="Continue to the gallery"
        className={`flex h-12 w-12 items-center justify-center rounded-full bg-white text-ink shadow-[0_10px_30px_-12px_rgba(11,11,11,0.5)] transition-transform hover:scale-105 ${
          overlay ? "absolute bottom-[6%] left-1/2 -translate-x-1/2" : ""
        }`}
      >
        <ArrowIcon size={16} className="rotate-90" />
      </a>
    </>
  );
}

/** Phones and tablets: the spotlight as its own section right after the hero, rotating the featured cakes. */
export default function SpotlightSection() {
  const { index, setIndex, handlers } = useRotation(SPOTLIGHT_CAKES.length);
  const cake = SPOTLIGHT_CAKES[index];
  return (
    <section aria-labelledby="spotlight-title-mobile" className="bg-off-white px-3 pb-6 sm:px-6 lg:hidden">
      <div className="relative overflow-hidden rounded-[2rem]">
        <SpotlightBackdrop className="absolute inset-0" />
        <div className="relative flex flex-col items-center px-5 pb-8 pt-12 text-center">
          <SpotlightWord className="text-[23vw] sm:text-[19vw]" />
          <SpotlightArch
            className="-mt-[12vw] w-[68%] max-w-[22rem] cursor-pointer select-none [-webkit-touch-callout:none]"
            {...handlers}
          >
            <AnimatePresence initial={false}>
              <motion.img
                key={cake.title}
                draggable={false}
                src={cake.image.src}
                srcSet={cake.image.srcSet}
                sizes="70vw"
                alt={cake.alt}
                loading="lazy"
                decoding="async"
                initial={{ opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.9, ease: EASE }}
                className="absolute inset-0 h-full w-full object-cover object-[50%_35%]"
              />
            </AnimatePresence>
          </SpotlightArch>
          <FeaturedReadout index={index} onSelect={setIndex} className="mt-8 flex flex-col items-center" />
          <div className="relative mt-8 flex flex-col items-center gap-6">
            <SpotlightDetails layout="stacked" titleId="spotlight-title-mobile" />
          </div>
        </div>
      </div>
    </section>
  );
}
