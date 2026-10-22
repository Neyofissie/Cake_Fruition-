import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import CTAButton from "./CTAButton";
import { EASE, fadeUp, stagger } from "./Reveal";
import { ArrowIcon, SparkleIcon } from "./Icons";
import { FeaturedReadout, SpotlightBackdrop, SpotlightDetails, SpotlightWord } from "./Spotlight";
import { HERO_FRAMES, HERO_SLIDES, SPOTLIGHT_CAKES } from "../lib/content";
import { useRotation } from "../lib/useRotation";
import { useMediaQuery } from "../lib/useMediaQuery";
import { DEFAULT_ENQUIRY, whatsappLink } from "../lib/site";

/** Screens of scroll the pinned desktop hero plays over (the section is this many screens + 1 tall). */
const SCREENS = 5;

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

const STAGES = ["Freshly baked", "Finished", "Signature"];

/** "01 Freshly baked — 02 Finished — 03 Signature": the current stage is solid, the others faded. */
function StageTrack({ stage, className = "" }: { stage: MotionValue<number>; className?: string }) {
  return (
    <div aria-hidden className={`flex items-center gap-4 ${className}`}>
      {STAGES.map((label, i) => (
        <StageLabel key={label} index={i} label={label} stage={stage} last={i === STAGES.length - 1} />
      ))}
    </div>
  );
}

function StageLabel({ index, label, stage, last }: { index: number; label: string; stage: MotionValue<number>; last: boolean }) {
  const tone = useTransform(stage, (s) => Math.max(0.35, 1 - Math.abs(s - index)));
  const fill = useTransform(stage, (s) => ramp(s, index, index + 1));
  return (
    <>
      <motion.span style={{ opacity: tone }} className="eyebrow whitespace-nowrap text-[0.58rem] text-ink">
        <span className="mr-2 font-serif text-sm normal-case tracking-normal">0{index + 1}</span>
        {label}
      </motion.span>
      {!last && (
        <span className="relative block h-px w-10 overflow-hidden bg-ink/15 xl:w-14">
          <motion.span style={{ scaleX: fill }} className="absolute inset-0 origin-left bg-ink" />
        </span>
      )}
    </>
  );
}

/** One background-free cake on the spotlight stage; glides sideways, shrinks and fades with the carousel position. */
function CarouselSlide({
  index,
  position,
  cake,
  active,
}: {
  index: number;
  position: MotionValue<number>;
  cake: (typeof SPOTLIGHT_CAKES)[number];
  active: boolean;
}) {
  const x = useTransform(position, (v) => `${(index - v) * 22}vw`);
  const opacity = useTransform(position, (v) => Math.max(0, 1 - Math.abs(index - v)));
  const scale = useTransform(position, (v) => 1 - 0.14 * Math.min(1, Math.abs(index - v)));
  return (
    <motion.img
      src={cake.cutout.large}
      alt={active ? cake.alt : ""}
      aria-hidden={!active}
      decoding="async"
      draggable={false}
      style={{ x, opacity, scale }}
      className="absolute inset-0 h-full w-full origin-bottom object-contain object-bottom drop-shadow-[0_30px_30px_rgba(34,30,26,0.18)]"
    />
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  // Large screens pin the hero for five screens of scroll and play it as one continuous sequence:
  //   scene 1 (screens 0 → 0.8): the start frame dissolves into the finished cake;
  //   scene 2 (0.84 → 1.85): the copy lifts away, the cake glides to the centre and the signature
  //   spotlight (cloud stage, giant word, details) builds around it, then the cake settles into an arch;
  //   carousel (1.95 → 4.75): each further stretch of scroll turns to the next featured cake.
  // Phones scroll normally, play scene 1 as the hero passes, and get the spotlight as its own section.
  const desktop = useMediaQuery("(min-width: 1024px)");
  const innerRef = useRef<HTMLDivElement>(null);
  const [shift, setShift] = useState(0);
  useEffect(() => {
    // Distance from the frame box's centre to the page centre: the box is 56% wide, 48px from the right.
    const measure = () => {
      const w = innerRef.current?.clientWidth ?? 0;
      setShift(Math.max(0, w * 0.22 - 48));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const p = scrollYProgress;
  // Phones pin the photo and headline for a stretch of scroll while scene 1 plays, eased by a spring so
  // the change from start to finish frame stays smooth however jerky the touch scroll is.
  const pinRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: pinProgress } = useScroll({ target: pinRef, offset: ["start start", "end end"] });
  const frameProgress = useSpring(pinProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });
  // Desktop timings are in screens of scroll; on phones only scene 1 plays, over the pinned stretch.
  const at = (a: number, b: number) => (v: number) => (desktop ? ramp(v * SCREENS, a, b) : 0);
  const scene1Of = (v: number, f: number) => (desktop ? ramp(v * SCREENS, 0.16, 0.72) : ramp(f, 0.08, 0.86));
  const scene1EndOf = (v: number, f: number) => (desktop ? ramp(v * SCREENS, 0.24, 0.8) : ramp(f, 0.14, 0.92));
  const both = [p, frameProgress];
  // The finished-cake photo hands over to its background-free cut-out, which the carousel then moves.
  const toCutout = at(1.6, 1.8);

  const startOpacity = useTransform(both, ([v, f]: number[]) => 1 - scene1Of(v, f));
  const startScale = useTransform(both, ([v, f]: number[]) => 1 - 0.06 * scene1Of(v, f));
  const endOpacity = useTransform(both, ([v, f]: number[]) => scene1EndOf(v, f) * (1 - toCutout(v)));
  const endScale = useTransform(both, ([v, f]: number[]) => 1.08 - 0.08 * scene1EndOf(v, f));

  const copyOpacity = useTransform(p, (v) => 1 - at(0.84, 1.12)(v));
  const copyEvents = useTransform(p, (v) => (at(0.84, 1.12)(v) > 0.5 ? "none" : "auto"));
  const contentY = useTransform(p, (v) => (reduce || !desktop ? 0 : -36 * ramp(v * SCREENS, 0.16, 0.72)) - 70 * at(0.84, 1.16)(v));
  // The orbit rings and sparkles turn with the frames as they change.
  const ringTurn = useTransform(both, ([v, f]: number[]) => (reduce ? 0 : 140 * scene1Of(v, f)));
  const orbitTurn = useTransform(both, ([v, f]: number[]) => (reduce ? -12 : -12 + 40 * scene1Of(v, f)));
  const sparkTurn = useTransform(both, ([v, f]: number[]) => (reduce ? 0 : 220 * scene1Of(v, f)));
  const chromeOpacity = useTransform(p, (v) => 1 - at(0.84, 1.04)(v));
  const framesX = useTransform(p, (v) => -shift * at(0.9, 1.6)(v));
  const framesScale = useTransform(p, (v) => 1 - 0.1 * at(0.9, 1.6)(v));
  const framesY = useTransform(p, (v) => 28 * at(0.9, 1.6)(v));
  const stageOpacity = useTransform(p, (v) => at(0.9, 1.32)(v));
  const stageClip = useTransform(p, (v) => {
    const a = at(0.96, 1.6)(v);
    return `inset(${a * 11}% ${a * 2.2}% ${a * 3}% ${a * 2.2}% round ${a * 40}px)`;
  });
  const wordOpacity = useTransform(p, (v) => at(1.1, 1.6)(v));
  const wordY = useTransform(p, (v) => 80 * (1 - at(1.1, 1.7)(v)));
  const detailsOpacity = useTransform(p, (v) => at(1.36, 1.76)(v));
  const detailsY = useTransform(p, (v) => 24 * (1 - at(1.36, 1.76)(v)));
  const detailsEvents = useTransform(p, (v) => (at(1.36, 1.76)(v) > 0.5 ? "auto" : "none"));
  const carouselOpacity = useTransform(p, (v) => toCutout(v));
  const stage = useTransform(both, ([v, f]: number[]) => (desktop ? ramp(v * SCREENS, 0.16, 0.8) + at(0.84, 1.76)(v) : scene1Of(v, f)));

  // Carousel position: 0 → (cakes - 1) across the last stretch of the pinned scroll.
  const position = useTransform(p, (v) => (SPOTLIGHT_CAKES.length - 1) * at(1.95, 4.75)(v));
  const [spotlightIndex, setSpotlightIndex] = useState(0);
  useMotionValueEvent(position, "change", (v) => setSpotlightIndex(Math.round(v)));

  // Featured cake in the glass card: auto-advances; tap moves on, hold keeps it, hover pauses.
  const { index: slide, setIndex: setSlide, handlers } = useRotation(HERO_SLIDES.length);
  const current = HERO_SLIDES[slide];

  const { start, end, fullBleed } = HERO_FRAMES;
  const frameFit = fullBleed ? "object-cover" : "object-contain object-[50%_60%]";

  const featuredCard = (
    <div className="flex items-center gap-4 rounded-2xl border border-white/80 bg-white/55 p-3 pr-4 shadow-[0_24px_60px_-28px_rgba(11,11,11,0.45)] backdrop-blur-xl">
      <div
        className="relative h-20 w-16 shrink-0 cursor-pointer select-none overflow-hidden rounded-xl bg-light-grey [-webkit-touch-callout:none]"
        {...handlers}
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
    <section id="home" ref={ref} aria-labelledby="hero-title" className="relative bg-off-white lg:h-[600vh]">
      <div className="relative overflow-clip lg:sticky lg:top-0 lg:h-[100svh]">
        {/* Studio light: a soft glow behind the cake fading to warm grey at the edges */}
        <div
          aria-hidden
          className="absolute inset-0 hidden bg-[radial-gradient(ellipse_at_72%_48%,#ffffff_0%,#faf8f4_42%,#ece6dd_100%)] lg:block"
        />

        {/* Scene 2 (desktop): the cloud stage closes in to a rounded card and the giant word rises behind the cake */}
        <motion.div
          aria-hidden
          style={{ opacity: stageOpacity, clipPath: stageClip }}
          className="absolute inset-0 hidden lg:block"
        >
          <SpotlightBackdrop className="absolute inset-0" />
        </motion.div>
        <motion.div
          aria-hidden
          style={{ opacity: wordOpacity, y: wordY }}
          className="pointer-events-none absolute inset-x-0 top-[13%] hidden lg:block"
        >
          <SpotlightWord className="text-[16.5vw]" />
        </motion.div>

        <div ref={innerRef} className="relative mx-auto flex max-w-[90rem] flex-col px-5 pt-[5.5rem] sm:px-8 lg:h-full lg:flex-col lg:items-start lg:justify-center lg:px-12 lg:pt-16">
          {/* Phones: a track the photo and headline stay pinned over while the frames change */}
          <div ref={pinRef} className="relative h-[190svh] lg:contents">
            <div className="sticky top-[4.75rem] flex h-[calc(100svh-4.75rem)] flex-col pt-3 lg:contents sm:top-[5.25rem] sm:h-[calc(100svh-5.25rem)]">
              {/* The pin isolates blending, so on phones the photo melts into this backdrop instead */}
              <div
                aria-hidden
                className="absolute inset-y-0 -left-5 -right-5 bg-[radial-gradient(ellipse_at_50%_38%,#ffffff_0%,#faf8f4_70%)] sm:-left-8 sm:-right-8 lg:hidden"
              />
              {/* Start and finish frames */}
              <div
                className={
                  fullBleed
                    ? "relative -mx-5 min-h-0 flex-1 sm:-mx-8 lg:absolute lg:inset-0 lg:mx-0"
                    : "relative min-h-0 flex-1 lg:absolute lg:inset-y-0 lg:right-12 lg:w-[56%]"
                }
              >
                {/* The moving layer blends as a whole (multiply) so the photos' white studio backdrops melt into the stage */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.3, ease: EASE, delay: 0.15 }}
                  style={{ x: framesX, scale: framesScale, y: framesY }}
                  className={`absolute inset-0 ${fullBleed ? "" : "mix-blend-multiply"}`}
                >
                  {/* Thin orbit rings around the cake */}
                  {!fullBleed && (
                    <motion.div
                      aria-hidden
                      style={{ opacity: chromeOpacity }}
                      className="pointer-events-none absolute inset-0 flex items-center justify-center"
                    >
                      <motion.div style={{ rotate: ringTurn }} className="aspect-square h-[78%]">
                        <motion.div
                          animate={reduce ? undefined : { rotate: 360 }}
                          transition={{ duration: 90, ease: "linear", repeat: Infinity }}
                          className="relative h-full w-full rounded-full border border-ink/10"
                        >
                          <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-ink/40" />
                        </motion.div>
                      </motion.div>
                      <motion.div
                        style={{ rotate: orbitTurn }}
                        className="absolute aspect-[2.6/1] w-[86%] rounded-[50%] border border-ink/10"
                      >
                        <span className="absolute -right-1 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-ink/40" />
                      </motion.div>
                    </motion.div>
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

                </motion.div>

                {/* Floating sparkles, script accent and featured card fade out as scene 2 begins */}
                <motion.div style={{ opacity: chromeOpacity, pointerEvents: copyEvents }} className="absolute inset-0">
                  {[
                    { c: "left-[14%] top-[22%]", s: 14, d: 0 },
                    { c: "right-[18%] top-[58%]", s: 10, d: 1.4 },
                    { c: "left-[30%] bottom-[18%]", s: 8, d: 2.2 },
                  ].map((spark, i) => (
                    <motion.span key={i} aria-hidden style={{ rotate: sparkTurn }} className={`absolute text-ink/50 ${spark.c}`}>
                      <motion.span
                        className="block"
                        animate={reduce ? undefined : { y: [0, -10, 0], rotate: [0, 30, 0], opacity: [0.35, 0.9, 0.35] }}
                        transition={{ duration: 5, delay: spark.d, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <SparkleIcon size={spark.s} />
                      </motion.span>
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
                </motion.div>

                {/* Stage track and mouse cue inside the frame on phones and tablets */}
                <div className="absolute inset-x-0 bottom-3 flex items-end justify-end gap-8 lg:hidden">
                  <StageTrack stage={stage} className="hidden sm:flex" />
                  <ScrollCue progress={desktop ? p : pinProgress} />
                </div>
              </div>

              {/* Copy: the badge and headline stay pinned with the photo on phones */}
              <motion.div
                variants={stagger(0.1, 0.1)}
                initial="hidden"
                animate="show"
                style={{ y: contentY, opacity: copyOpacity, pointerEvents: copyEvents }}
                className="relative z-10 shrink-0 pb-6 pt-6 text-center lg:w-[46%] lg:p-0 lg:text-left"
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
              </motion.div>
            </div>
          </div>

          <motion.div
            variants={stagger(0.1, 0.3)}
            initial="hidden"
            animate="show"
            style={{ y: contentY, opacity: copyOpacity, pointerEvents: copyEvents }}
            className="relative z-10 pb-14 text-center lg:w-[46%] lg:text-left"
          >
            <motion.p
              variants={fadeUp}
              className="mx-auto mt-2 max-w-md text-[1.02rem] leading-relaxed text-charcoal/85 lg:mx-0 lg:mt-6"
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

        {/* Carousel: the centred cake swaps to its cut-out, then each stretch of scroll glides in the next cake.
            Sized to sit where the moved hero photo shows the cake, so the hand-over is seamless. */}
        <motion.div
          style={{ opacity: carouselOpacity }}
          className="pointer-events-none absolute inset-x-0 bottom-[6.4rem] z-10 hidden h-[calc((100svh-12rem)*0.87)] lg:block"
        >
          <div aria-hidden className="absolute -bottom-2 left-1/2 h-8 w-[26vw] -translate-x-1/2 rounded-[50%] bg-ink/20 blur-xl" />
          {SPOTLIGHT_CAKES.map((cake, i) => (
            <CarouselSlide key={cake.title} index={i} position={position} cake={cake} active={i === spotlightIndex} />
          ))}
        </motion.div>

        {/* Scene 2 details laid around the centred cake */}
        <motion.div
          style={{ opacity: detailsOpacity, y: detailsY, pointerEvents: detailsEvents }}
          className="absolute inset-0 z-20 hidden lg:block"
        >
          <SpotlightDetails layout="overlay" titleId="spotlight-title" />
          <FeaturedReadout index={spotlightIndex} className="absolute right-[7%] top-[30%] w-[17rem]" />
        </motion.div>

        {/* Stage track and mouse cue along the bottom edge on desktop, through both scenes */}
        <div className="absolute bottom-8 right-12 z-30 hidden items-end gap-10 lg:flex">
          <StageTrack stage={stage} />
          <ScrollCue progress={p} />
        </div>
      </div>
    </section>
  );
}

