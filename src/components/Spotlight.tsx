import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { EASE } from "./Reveal";
import { ArrowIcon } from "./Icons";
import { SPOTLIGHT_CAKES, type GalleryItem } from "../lib/content";
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

/** One cut-out cake on the phone stage; glides sideways, shrinks and fades with the scroll position. */
function StageCake({ index, position, active }: { index: number; position: MotionValue<number>; active: boolean }) {
  const reduce = useReducedMotion();
  const cake = SPOTLIGHT_CAKES[index];
  const x = useTransform(position, (v) => (reduce ? "0vw" : `${(index - v) * 70}vw`));
  const opacity = useTransform(position, (v) => Math.max(0, 1 - Math.abs(index - v) * 1.2));
  const scale = useTransform(position, (v) => 1 - 0.12 * Math.min(1, Math.abs(index - v)));
  return (
    <motion.img
      src={cake.cutout.large}
      alt={active ? cake.alt : ""}
      aria-hidden={!active}
      decoding="async"
      draggable={false}
      style={{ x, opacity, scale }}
      className="absolute inset-0 h-full w-full origin-bottom object-contain object-bottom drop-shadow-[0_24px_24px_rgba(34,30,26,0.18)]"
    />
  );
}

/** Screens of scroll each cake holds the pinned phone stage for. */
const STEP = 0.6;

/**
 * Phones and tablets: the spotlight as its own section right after the hero. The stage pins to the
 * screen and each stretch of scroll glides in the next featured cake; the page only moves on once
 * every cake has been shown.
 */
export default function SpotlightSection() {
  const track = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: track, offset: ["start start", "end end"] });
  const last = SPOTLIGHT_CAKES.length - 1;
  // A short rest at each end so the first and last cakes sit still for a moment.
  const position = useTransform(scrollYProgress, (v) => last * Math.min(1, Math.max(0, (v - 0.06) / 0.88)));
  const [index, setIndex] = useState(0);
  useMotionValueEvent(position, "change", (v) => setIndex(Math.round(v)));

  // Picking a bar scrolls to that cake's point on the track.
  const select = (i: number) => {
    const el = track.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const range = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + range * (0.06 + (0.88 * i) / last), behavior: "smooth" });
  };

  return (
    <section aria-labelledby="spotlight-title-mobile" className="bg-off-white px-3 pb-6 sm:px-6 lg:hidden">
      <div ref={track} style={{ height: `${100 + last * STEP * 100}svh` }} className="relative">
        <div className="sticky top-0 flex h-[100svh] flex-col pb-[5.75rem] pt-[5.25rem] sm:pt-[5.75rem]">
          <div className="relative flex flex-1 flex-col items-center overflow-hidden rounded-[2rem] px-5 pb-6 pt-8 text-center">
            <SpotlightBackdrop className="absolute inset-0" />
            <SpotlightWord className="relative text-[23vw] sm:text-[19vw]" />
            <div className="relative -mt-[10vw] min-h-0 w-full flex-1">
              <div aria-hidden className="absolute -bottom-1 left-1/2 h-6 w-[60%] -translate-x-1/2 rounded-[50%] bg-ink/20 blur-xl" />
              {SPOTLIGHT_CAKES.map((c, i) => (
                <StageCake key={c.title} index={i} position={position} active={i === index} />
              ))}
            </div>
            <FeaturedReadout index={index} onSelect={select} className="relative mt-5 flex flex-col items-center" />
          </div>
        </div>
      </div>
      <div className="relative overflow-hidden rounded-[2rem]">
        <SpotlightBackdrop className="absolute inset-0" />
        <div className="relative flex flex-col items-center gap-6 px-5 py-10 text-center">
          <SpotlightDetails layout="stacked" titleId="spotlight-title-mobile" />
        </div>
      </div>
    </section>
  );
}
