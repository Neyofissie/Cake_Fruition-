import { useRef } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import Reveal, { EASE, fadeUp, stagger } from "../components/Reveal";
import { ArrowIcon, SparkleIcon } from "../components/Icons";
import { PILLARS, SPOTLIGHT_CAKES } from "../lib/content";
import { useRotation } from "../lib/useRotation";
import { useMediaQuery } from "../lib/useMediaQuery";

// The cakes the About scene floats, picked from the thumbnails at the bottom left.
const ABOUT_CAKES = ["Ivory Drape & Roses", "Noir & Gold Fiftieth", "Blush Cascade Fiftieth"].map(
  (title) => SPOTLIGHT_CAKES.find((c) => c.title === title)!,
);

// Line icons on a 24px grid, one per pillar.
const PILLAR_ICONS = [
  <g key="0"><path d="M4 20h16M6 20v-7h12v7M6 16.5h12" /><path d="M10 10c-1.2-1.2 1.2-2.4 0-3.6M14 10c-1.2-1.2 1.2-2.4 0-3.6" /></g>,
  <g key="1"><path d="M5 20h14M7 20v-6h10v6" /><path d="m14 3 3 3-6 6H8V9l6-6Z" /></g>,
  <g key="2"><rect x="4" y="5" width="16" height="15" rx="2" /><path d="M4 10h16M9 3v4M15 3v4" /><path d="m10 15 1.5 1.5L15 13" /></g>,
];

/** A small floating sugar pearl that drifts at its own pace. */
function Pearl({ className, delay = 0 }: { className: string; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.span
      aria-hidden
      className={`absolute rounded-full bg-[radial-gradient(circle_at_35%_30%,#ffffff,#e8e3dc_55%,#9a948c)] shadow-[0_14px_24px_-10px_rgba(11,11,11,0.45)] ${className}`}
      animate={reduce ? undefined : { y: [0, -14, 0] }}
      transition={{ duration: 6, delay, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const desktop = useMediaQuery("(min-width: 1024px)");
  const drift = reduce ? 0 : desktop ? 1 : 0.3;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const cakeY = useTransform(scrollYProgress, (v) => (0.5 - v) * 140 * drift);
  const cakeRotate = useTransform(scrollYProgress, (v) => (v - 0.5) * 8 * drift);
  const wordX = useTransform(scrollYProgress, (v) => (reduce ? 0 : (0.5 - v) * 160));

  const { index, setIndex, handlers } = useRotation(ABOUT_CAKES.length, 4500);
  const cake = ABOUT_CAKES[index];

  return (
    <section
      id="about"
      ref={ref}
      aria-labelledby="about-title"
      className="relative overflow-hidden border-t border-muted-border bg-[radial-gradient(ellipse_at_68%_45%,#ffffff_0%,#faf8f4_45%,#ece6dd_100%)]"
    >
      {/* Oversized word drifting behind the cake */}
      <motion.p
        aria-hidden
        style={{ x: wordX }}
        className="pointer-events-none absolute right-[-4%] top-[8%] select-none font-serif text-[22vw] italic leading-none text-ink/[0.04]"
      >
        Studio
      </motion.p>

      <div className="relative mx-auto grid max-w-[90rem] items-center gap-10 px-5 pb-16 pt-24 sm:px-8 sm:pt-28 lg:min-h-[100svh] lg:grid-cols-12 lg:gap-6 lg:px-12 lg:pb-12">
        {/* Copy */}
        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "0px 0px -15% 0px" }}
          className="relative z-10 order-2 lg:order-none lg:col-span-6"
        >
          <motion.p
            variants={fadeUp}
            className="inline-flex items-center gap-3 rounded-full border border-ink/10 bg-white/60 py-1.5 pl-2 pr-4 backdrop-blur-md"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-ink text-off-white">
              <SparkleIcon size={11} />
            </span>
            <span className="eyebrow text-[0.6rem] text-ink">About the Studio</span>
          </motion.p>

          <motion.h2
            id="about-title"
            variants={fadeUp}
            className="display mt-6 text-[3rem] text-ink sm:text-[4.4rem] lg:text-[clamp(4rem,9vh,5.8rem)]"
          >
            Baked with Love,
            <span className="block italic text-charcoal/75">Designed to Impress</span>
          </motion.h2>

          <motion.p variants={fadeUp} className="mt-6 max-w-lg leading-[1.8] text-charcoal/85">
            Cake Fruition brings creativity, quality, and passion together to create unforgettable cakes and desserts.
            Every cake is freshly baked to order using quality ingredients, soft moist sponge layers, and delicious
            flavour-matching cream fillings. From elegant wedding cakes to joyful birthday centrepieces, every design is
            tailored to your celebration.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-5">
            <a
              href="#menu"
              className="eyebrow group inline-flex min-h-12 items-center gap-3 rounded-full bg-ink px-6 text-[0.68rem] text-off-white shadow-[0_14px_34px_-14px_rgba(11,11,11,0.7)] transition-transform hover:-translate-y-0.5"
            >
              Explore the Menu
              <ArrowIcon size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a href="#gallery" className="group inline-flex min-h-12 items-center gap-3 text-ink">
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-ink/25 bg-white/60 backdrop-blur-md transition-colors duration-300 group-hover:bg-ink group-hover:text-off-white">
                <svg viewBox="0 0 24 24" className="ml-0.5 h-4 w-4" fill="currentColor" aria-hidden>
                  <path d="M8 5.5v13l10.5-6.5L8 5.5Z" />
                </svg>
              </span>
              <span className="eyebrow text-[0.68rem]">See Our Work</span>
            </a>
          </motion.div>

          {/* Pillars as an icon row */}
          <motion.ul
            variants={fadeUp}
            className="mt-12 grid grid-cols-1 gap-5 border-t border-ink/10 pt-7 sm:grid-cols-3 sm:gap-6"
          >
            {PILLARS.map((pillar, i) => (
              <li key={pillar.title} className="flex items-start gap-3 sm:flex-col">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ink/15 bg-white/70">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-[18px] w-[18px] text-ink"
                    aria-hidden
                  >
                    {PILLAR_ICONS[i]}
                  </svg>
                </span>
                <span>
                  <span className="block text-[0.85rem] font-medium text-ink">{pillar.title}</span>
                  <span className="mt-1 block text-[0.78rem] leading-relaxed text-stone">{pillar.description}</span>
                </span>
              </li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Floating cake */}
        <div className="relative order-1 h-[110vw] max-h-[44rem] sm:h-[80vw] lg:order-none lg:col-span-6 lg:h-[82svh]">
          {/* Orbit rings */}
          <div aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="aspect-square h-[78%] rounded-full border border-ink/10" />
            <div className="absolute aspect-[2.6/1] w-[92%] -rotate-12 rounded-[50%] border border-ink/10" />
          </div>

          <Pearl className="left-[8%] top-[14%] h-9 w-9" />
          <Pearl className="right-[10%] top-[52%] h-5 w-5" delay={1.2} />
          <Pearl className="bottom-[16%] left-[16%] h-4 w-4" delay={2.4} />
          <Pearl className="left-[24%] top-[34%] h-2.5 w-2.5" delay={0.6} />

          <motion.div
            style={{ y: cakeY, rotate: cakeRotate }}
            className="absolute inset-x-[8%] bottom-[6%] top-[4%] cursor-pointer select-none [-webkit-touch-callout:none]"
            {...handlers}
          >
            <motion.div
              className="absolute inset-0"
              animate={reduce ? undefined : { y: [0, -16, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            >
              <AnimatePresence initial={false}>
                <motion.img
                  key={cake.title}
                  src={cake.cutout.large}
                  alt={cake.alt}
                  draggable={false}
                  loading="lazy"
                  decoding="async"
                  initial={{ opacity: 0, x: 60, scale: 0.92 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -60, scale: 0.92 }}
                  transition={{ duration: 0.9, ease: EASE }}
                  className="absolute inset-0 h-full w-full object-contain drop-shadow-[0_40px_40px_rgba(11,11,11,0.22)]"
                />
              </AnimatePresence>
            </motion.div>
          </motion.div>
          {/* Soft shadow the floating cake casts */}
          <motion.div
            aria-hidden
            className="absolute bottom-[2%] left-1/2 h-6 w-[40%] -translate-x-1/2 rounded-[50%] bg-ink/15 blur-xl"
            animate={reduce ? undefined : { scaleX: [1, 0.85, 1], opacity: [0.8, 0.55, 0.8] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Glass card */}
          <Reveal delay={0.2} className="absolute right-0 top-[10%] hidden w-[16.5rem] sm:block">
            <a
              href="#order"
              className="group flex items-start gap-3 rounded-2xl border border-white/80 bg-white/55 p-4 shadow-[0_24px_60px_-28px_rgba(11,11,11,0.45)] backdrop-blur-xl"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink text-off-white">
                <SparkleIcon size={15} />
              </span>
              <span className="flex-1">
                <span className="block font-serif text-[1.25rem] leading-tight text-ink">Made to Order</span>
                <span className="mt-1 block text-[0.78rem] leading-relaxed text-stone">
                  Freshly baked for your date, never from stock.
                </span>
              </span>
              <ArrowIcon size={16} className="mt-1 text-ink transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </Reveal>

          {/* Thumbnail picker */}
          <Reveal
            delay={0.3}
            className="absolute bottom-0 left-0 flex items-center gap-3 rounded-2xl border border-white/80 bg-white/55 p-2.5 pr-4 shadow-[0_24px_60px_-28px_rgba(11,11,11,0.45)] backdrop-blur-xl"
          >
            <div role="group" aria-label="Choose a cake" className="flex gap-2">
              {ABOUT_CAKES.map((c, i) => (
                <button
                  key={c.title}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Show ${c.title}`}
                  aria-pressed={i === index}
                  className={`relative h-14 w-14 overflow-hidden rounded-xl border bg-off-white transition-all duration-300 sm:h-16 sm:w-16 ${
                    i === index ? "border-ink shadow-[0_8px_20px_-10px_rgba(11,11,11,0.6)]" : "border-ink/10 opacity-70 hover:opacity-100"
                  }`}
                >
                  <img src={c.cutout.src} alt="" className="absolute inset-1 h-[calc(100%-0.5rem)] w-[calc(100%-0.5rem)] object-contain" />
                </button>
              ))}
            </div>
            <div className="hidden sm:block">
              <p className="eyebrow text-[0.55rem] text-stone">{ABOUT_CAKES.length} Signatures</p>
              <AnimatePresence mode="wait" initial={false}>
                <motion.p
                  key={cake.title}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.3 }}
                  className="mt-1 max-w-[9rem] font-serif text-[1rem] leading-tight text-ink"
                >
                  {cake.title}
                </motion.p>
              </AnimatePresence>
            </div>
          </Reveal>

          <a
            href="#menu"
            aria-label="Scroll down to the menu"
            className="group absolute bottom-2 right-0 hidden flex-col items-center gap-2 lg:flex"
          >
            <span className="relative block h-10 w-6 rounded-full border border-ink/45 transition-colors group-hover:border-ink">
              <motion.span
                aria-hidden
                className="absolute left-1/2 top-2 h-2 w-[3px] -translate-x-1/2 rounded-full bg-ink"
                animate={reduce ? undefined : { y: [0, 12, 0], opacity: [1, 0.15, 1] }}
                transition={{ duration: 1.8, ease: "easeInOut", repeat: Infinity }}
              />
            </span>
            <span className="eyebrow text-[0.55rem] text-charcoal">Scroll down</span>
          </a>
        </div>
      </div>
    </section>
  );
}
