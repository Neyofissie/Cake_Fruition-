import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import CTAButton from "./CTAButton";
import { EASE, fadeUp, stagger } from "./Reveal";
import { ArrowIcon, SparkleIcon } from "./Icons";
import { HERO_FRAMES, HERO_SLIDES } from "../lib/content";
import { DEFAULT_ENQUIRY, whatsappLink } from "../lib/site";

const SLIDE_MS = 3500;

/** 0 before `a`, 1 after `b`, linear between. Function-form transforms keep the frames in their final
 * state past the end of the scroll range (the array form can be handed to a native scroll timeline,
 * which snaps back to the start once the range is passed). */
const ramp = (v: number, a: number, b: number) => Math.min(1, Math.max(0, (v - a) / (b - a)));

// Line icons on a 24px grid for the feature row.
const FEATURES = [
  {
    title: "Freshly Baked",
    note: "Made to order",
    icon: (
      <>
        <path d="M4 20h16M6 20v-7h12v7M6 16.5h12" />
        <path d="M10 10c-1.2-1.2 1.2-2.4 0-3.6M14 10c-1.2-1.2 1.2-2.4 0-3.6" />
      </>
    ),
  },
  {
    title: "Custom Designed",
    note: "Your theme",
    icon: (
      <>
        <path d="M5 20h14M7 20v-6h10v6" />
        <path d="m14 3 3 3-6 6H8V9l6-6Z" />
      </>
    ),
  },
  {
    title: "Marbled Flavours",
    note: "Mix any two",
    icon: (
      <>
        <circle cx="12" cy="12" r="8" />
        <path d="M12 4c-4 2.4-4 5.6 0 8s4 5.6 0 8" />
      </>
    ),
  },
  {
    title: "Three Finishes",
    note: "Cream to fondant",
    icon: (
      <>
        <path d="M12 3c.5 4.5 1.6 7 3 7.8 1 .6 2.8.9 6 1.2-3.2.3-5 .6-6 1.2-1.4.8-2.5 3.3-3 7.8-.5-4.5-1.6-7-3-7.8-1-.6-2.8-.9-6-1.2 3.2-.3 5-.6 6-1.2 1.4-.8 2.5-3.3 3-7.8Z" />
      </>
    ),
  },
];

/** Mouse with a falling scroll-wheel dot, plus a track that fills as the hero moves from start to finish frame. */
function ScrollCue({ progress, className = "" }: { progress: MotionValue<number>; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <a href="#gallery" aria-label="Scroll down to the gallery" className={`group flex items-center gap-3 ${className}`}>
      <span className="relative block h-10 w-6 rounded-full border border-ink/45 bg-off-white/40 backdrop-blur-sm transition-colors group-hover:border-ink">
        <motion.span
          aria-hidden
          className="absolute left-1/2 top-2 h-2 w-[3px] -translate-x-1/2 rounded-full bg-ink"
          animate={reduce ? undefined : { y: [0, 12, 0], opacity: [1, 0.15, 1] }}
          transition={{ duration: 1.8, ease: "easeInOut", repeat: Infinity }}
        />
      </span>
      <span className="flex flex-col gap-2">
        <span className="eyebrow text-[0.58rem] text-charcoal">Scroll down</span>
        <span aria-hidden className="relative block h-px w-16 overflow-hidden bg-ink/15">
          <motion.span style={{ scaleX: progress }} className="absolute inset-0 origin-left bg-ink" />
        </span>
      </span>
    </a>
  );
}

/** "01 Freshly baked ——— 02 Beautifully finished", filled by scroll progress. */
function StageTrack({ progress, className = "" }: { progress: MotionValue<number>; className?: string }) {
  const startTone = useTransform(progress, (v) => 1 - 0.6 * ramp(v, 0.35, 0.65));
  const endTone = useTransform(progress, (v) => 0.4 + 0.6 * ramp(v, 0.35, 0.65));
  return (
    <div aria-hidden className={`flex items-center gap-4 ${className}`}>
      <motion.span style={{ opacity: startTone }} className="eyebrow text-[0.58rem] text-ink">
        <span className="mr-2 font-serif text-sm normal-case tracking-normal">01</span>Freshly baked
      </motion.span>
      <span className="relative block h-px w-14 overflow-hidden bg-ink/15 sm:w-20">
        <motion.span style={{ scaleX: progress }} className="absolute inset-0 origin-left bg-ink" />
      </span>
      <motion.span style={{ opacity: endTone }} className="eyebrow text-[0.58rem] text-ink">
        <span className="mr-2 font-serif text-sm normal-case tracking-normal">02</span>Finished
      </motion.span>
    </div>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  // On large screens the hero is pinned for one extra screen of scroll while the start frame dissolves into
  // the finished one. On phones it scrolls normally and the same change plays as it passes.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const startOpacity = useTransform(scrollYProgress, (v) => 1 - ramp(v, 0.25, 0.7));
  const startScale = useTransform(scrollYProgress, (v) => 1 - 0.06 * ramp(v, 0, 1));
  const endOpacity = useTransform(scrollYProgress, (v) => ramp(v, 0.3, 0.75));
  const endScale = useTransform(scrollYProgress, (v) => 1.08 - 0.08 * ramp(v, 0, 1));
  const contentY = useTransform(scrollYProgress, (v) => (reduce ? 0 : -36 * ramp(v, 0, 1)));

  // Featured cake in the glass card. Auto-advances; a quick tap moves on, holding keeps it, hover pauses.
  const [slide, setSlide] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [held, setHeld] = useState(false);
  const paused = hovered || held;
  const press = useRef<{ x: number; y: number; t: number } | null>(null);
  const next = () => setSlide((s) => (s + 1) % HERO_SLIDES.length);
  useEffect(() => {
    if (reduce || paused) return;
    const id = window.setTimeout(next, SLIDE_MS);
    return () => window.clearTimeout(id);
  }, [slide, reduce, paused]);
  const current = HERO_SLIDES[slide];

  const { start, end, fullBleed } = HERO_FRAMES;
  const frameFit = fullBleed ? "object-cover" : "object-contain object-[42%_60%] mix-blend-multiply";

  const featuredCard = (
    <div className="flex items-center gap-4 rounded-2xl border border-white/80 bg-white/55 p-3 pr-4 shadow-[0_24px_60px_-28px_rgba(11,11,11,0.45)] backdrop-blur-xl">
      <div
        className="relative h-20 w-16 shrink-0 cursor-pointer select-none overflow-hidden rounded-xl bg-light-grey [-webkit-touch-callout:none]"
        onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(true)}
        onPointerLeave={(e) => {
          if (e.pointerType === "mouse") setHovered(false);
          press.current = null;
          setHeld(false);
        }}
        onPointerDown={(e) => {
          press.current = { x: e.clientX, y: e.clientY, t: e.timeStamp };
          setHeld(true);
        }}
        onPointerUp={(e) => {
          const p = press.current;
          press.current = null;
          setHeld(false);
          // A short press that barely moved is a tap; anything longer was a hold.
          if (p && e.timeStamp - p.t < 350 && Math.hypot(e.clientX - p.x, e.clientY - p.y) < 10) next();
        }}
        onPointerCancel={() => {
          press.current = null;
          setHeld(false);
        }}
        onContextMenu={(e) => e.preventDefault()}
      >
        <AnimatePresence initial={false}>
          <motion.img
            key={current.title}
            draggable={false}
            src={current.image.src}
            alt={current.alt}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: EASE }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </AnimatePresence>
      </div>
      <div className="min-w-0 flex-1">
        <p className="eyebrow text-[0.55rem] text-stone">Featured cake</p>
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={current.title}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.35 }}
            className="mt-1 truncate font-serif text-[1.3rem] leading-tight text-ink"
          >
            {current.title}
          </motion.p>
        </AnimatePresence>
        <div role="group" aria-label="Choose a featured cake" className="mt-2 flex gap-1.5">
          {HERO_SLIDES.map((s, i) => (
            <button
              key={s.title}
              type="button"
              onClick={() => setSlide(i)}
              aria-label={`Show ${s.title}`}
              aria-pressed={i === slide}
              className="group flex h-6 items-center"
            >
              <span
                className={`block h-[3px] rounded-full transition-all duration-500 ease-luxe ${
                  i === slide ? "w-6 bg-ink" : "w-2.5 bg-ink/25 group-hover:bg-ink/50"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
      <a
        href={whatsappLink(`Hi Cake Fruition! I love the "${current.title}" cake — could I get a quote for something similar?`)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Ask about a cake like ${current.title} on WhatsApp`}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ink/20 text-ink transition-colors hover:bg-ink hover:text-off-white"
      >
        <ArrowIcon size={16} />
      </a>
    </div>
  );

  return (
    <section id="home" ref={ref} aria-labelledby="hero-title" className="relative bg-off-white lg:h-[200vh]">
      <div className="relative overflow-hidden lg:sticky lg:top-0 lg:h-[100svh]">
        {/* Studio light: a soft glow behind the cake fading to warm grey at the edges */}
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_72%_48%,#ffffff_0%,#faf8f4_42%,#ece6dd_100%)]"
        />

        <div className="relative mx-auto flex max-w-[90rem] flex-col px-5 pt-[5.5rem] sm:px-8 lg:h-full lg:flex-row lg:items-center lg:px-12 lg:pt-16">
          {/* Start and finish frames */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.3, ease: EASE, delay: 0.15 }}
            className={
              fullBleed
                ? "relative -mx-5 h-[58svh] sm:-mx-8 lg:absolute lg:inset-0 lg:mx-0 lg:h-auto"
                : "relative h-[56svh] lg:absolute lg:inset-y-0 lg:right-12 lg:h-auto lg:w-[56%]"
            }
          >
            {/* Thin orbit rings around the cake */}
            {!fullBleed && (
              <div aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={reduce ? undefined : { rotate: 360 }}
                  transition={{ duration: 90, ease: "linear", repeat: Infinity }}
                  className="aspect-square h-[78%] rounded-full border border-ink/10 lg:-translate-x-[8%]"
                />
                <div className="absolute aspect-[2.6/1] w-[86%] -rotate-12 rounded-[50%] border border-ink/10 lg:-translate-x-[8%]" />
              </div>
            )}

            <div className={`absolute inset-0 ${fullBleed ? "" : "lg:inset-x-0 lg:bottom-24 lg:top-24"}`}>
              {!reduce && (
                <motion.img
                  src={start.image.large}
                  alt=""
                  aria-hidden
                  style={{ opacity: startOpacity, scale: startScale }}
                  fetchPriority="high"
                  className={`absolute inset-0 h-full w-full ${frameFit}`}
                />
              )}
              <motion.img
                src={end.image.large}
                alt={end.alt}
                style={reduce ? undefined : { opacity: endOpacity, scale: endScale }}
                className={`absolute inset-0 h-full w-full ${frameFit}`}
              />
            </div>

            {fullBleed && (
              <div
                aria-hidden
                className="absolute inset-0 hidden bg-gradient-to-r from-off-white via-off-white/70 to-transparent lg:block"
              />
            )}

            {/* Floating sparkles */}
            {[
              { c: "left-[14%] top-[22%]", s: 14, d: 0 },
              { c: "right-[18%] top-[58%]", s: 10, d: 1.4 },
              { c: "left-[30%] bottom-[18%]", s: 8, d: 2.2 },
            ].map((p, i) => (
              <motion.span
                key={i}
                aria-hidden
                className={`absolute text-ink/50 ${p.c}`}
                animate={reduce ? undefined : { y: [0, -10, 0], rotate: [0, 30, 0], opacity: [0.35, 0.9, 0.35] }}
                transition={{ duration: 5, delay: p.d, repeat: Infinity, ease: "easeInOut" }}
              >
                <SparkleIcon size={p.s} />
              </motion.span>
            ))}

            <motion.p
              aria-hidden
              initial={{ opacity: 0, rotate: -10, y: 12 }}
              animate={{ opacity: 1, rotate: -10, y: 0 }}
              transition={{ duration: 1.2, ease: EASE, delay: 0.9 }}
              className="absolute bottom-[16%] left-[4%] hidden font-script text-6xl leading-[0.9] text-ink min-[1400px]:block"
            >
              Sweet
              <br />
              <span className="ml-10">moments</span>
            </motion.p>

            {/* Featured cake card (desktop) */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 0.8 }}
              className="absolute right-0 top-28 hidden w-[19rem] lg:block xl:right-4"
            >
              {featuredCard}
            </motion.div>

            {/* Stage track and mouse cue: inside the frame on phones, along the bottom edge on desktop */}
            <div className="absolute inset-x-0 bottom-3 flex items-end justify-end gap-10 lg:bottom-8">
              <StageTrack progress={scrollYProgress} className="hidden sm:flex" />
              <ScrollCue progress={scrollYProgress} />
            </div>
          </motion.div>

          {/* Copy */}
          <motion.div
            variants={stagger(0.1, 0.1)}
            initial="hidden"
            animate="show"
            style={{ y: contentY }}
            className="relative z-10 pb-14 pt-8 text-center lg:w-[46%] lg:p-0 lg:text-left"
          >
            <motion.p
              variants={fadeUp}
              className="inline-flex items-center gap-3 rounded-full border border-ink/10 bg-white/60 py-1.5 pl-2 pr-4 backdrop-blur-md"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-ink text-off-white">
                <SparkleIcon size={11} />
              </span>
              <span className="eyebrow text-[0.6rem] text-ink">Bespoke Cake Studio</span>
            </motion.p>

            <motion.h1
              id="hero-title"
              variants={fadeUp}
              className="display mt-6 text-[2.9rem] text-ink sm:text-[4.2rem] lg:text-[clamp(3.9rem,9.6vh,6.3rem)]"
            >
              Custom Cakes
              <span className="block italic text-charcoal/80">for Beautiful</span>
              Celebrations
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mx-auto mt-6 max-w-md text-[1.02rem] leading-relaxed text-charcoal/85 lg:mx-0"
            >
              Freshly baked, beautifully designed cakes made to order for birthdays, weddings, events, and life&rsquo;s
              sweetest moments.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start"
            >
              <CTAButton href={whatsappLink(DEFAULT_ENQUIRY)} icon="whatsapp" className="w-full sm:w-auto">
                Order on WhatsApp
              </CTAButton>
              <a href="#menu" className="group inline-flex min-h-12 items-center gap-3 text-ink">
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-ink/25 bg-white/60 backdrop-blur-md transition-colors duration-300 group-hover:bg-ink group-hover:text-off-white">
                  <ArrowIcon size={16} className="rotate-90" />
                </span>
                <span className="eyebrow text-[0.68rem]">View Cake Menu</span>
              </a>
            </motion.div>

            <motion.ul
              variants={fadeUp}
              className="mx-auto mt-10 grid max-w-md grid-cols-2 gap-x-4 gap-y-5 border-t border-ink/10 pt-6 text-left sm:max-w-none sm:grid-cols-4 lg:mx-0"
            >
              {FEATURES.map((f) => (
                <li key={f.title} className="flex items-start gap-3 sm:flex-col sm:gap-2.5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-ink/15 bg-white/60">
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
                      {f.icon}
                    </svg>
                  </span>
                  <span>
                    <span className="block text-[0.8rem] font-medium leading-tight text-ink">{f.title}</span>
                    <span className="mt-0.5 block text-[0.72rem] text-stone">{f.note}</span>
                  </span>
                </li>
              ))}
            </motion.ul>

            {/* Featured cake card (phones and tablets) */}
            <motion.div variants={fadeUp} className="mx-auto mt-8 max-w-sm text-left lg:hidden">
              {featuredCard}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
