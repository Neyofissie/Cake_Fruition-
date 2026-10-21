import { motion, useReducedMotion } from "motion/react";
import { ArrowIcon } from "./Icons";
import { HERO_FRAMES } from "../lib/content";

export const SPOTLIGHT_WORD = "Layers";

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

/** Labels and buttons laid around the cake: eyebrow left, label top-right, button right, scroll button bottom. */
export function SpotlightDetails({ layout, titleId }: { layout: "overlay" | "stacked"; titleId: string }) {
  const cake = HERO_FRAMES.end;
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

      <p className={`eyebrow text-[0.6rem] text-ink ${overlay ? "absolute right-[8%] top-[17%]" : ""}`}>
        Featured: {cake.title}
      </p>

      <a
        href="#menu"
        className={`eyebrow group inline-flex min-h-12 items-center gap-3 rounded-full bg-ink px-6 text-[0.66rem] text-off-white shadow-[0_14px_34px_-14px_rgba(11,11,11,0.7)] transition-transform hover:-translate-y-0.5 ${
          overlay ? "absolute right-[7%] top-[46%]" : ""
        }`}
      >
        Explore the Menu
        <ArrowIcon size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
      </a>

      <a
        href="#gallery"
        aria-label="Continue to the gallery"
        className={`flex h-12 w-12 items-center justify-center rounded-full bg-white text-ink shadow-[0_10px_30px_-12px_rgba(11,11,11,0.5)] transition-transform hover:scale-105 ${
          overlay ? "absolute bottom-[10%] left-1/2 -translate-x-1/2" : ""
        }`}
      >
        <ArrowIcon size={16} className="rotate-90" />
      </a>
    </>
  );
}

/** Phones and tablets: the spotlight as its own section right after the hero. */
export default function SpotlightSection() {
  const cake = HERO_FRAMES.end;
  return (
    <section aria-labelledby="spotlight-title-mobile" className="bg-off-white px-3 pb-6 sm:px-6 lg:hidden">
      <div className="relative overflow-hidden rounded-[2rem]">
        <SpotlightBackdrop className="absolute inset-0" />
        <div className="relative flex flex-col items-center px-5 pb-8 pt-12 text-center">
          <SpotlightWord className="text-[23vw] sm:text-[19vw]" />
          <img
            src={cake.image.src}
            srcSet={cake.image.srcSet}
            sizes="80vw"
            alt={cake.alt}
            loading="lazy"
            decoding="async"
            className="relative -mt-[13vw] h-[92vw] max-h-[34rem] w-auto object-contain mix-blend-multiply"
          />
          <div className="relative mt-6 flex flex-col items-center gap-6">
            <SpotlightDetails layout="stacked" titleId="spotlight-title-mobile" />
          </div>
        </div>
      </div>
    </section>
  );
}
