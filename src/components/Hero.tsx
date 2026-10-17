import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import CTAButton from "./CTAButton";
import { EASE, fadeUp, stagger } from "./Reveal";
import { RotatingBadge, Sprig } from "./Motifs";
import { HERO_SLIDES } from "../lib/content";
import { DEFAULT_ENQUIRY, whatsappLink } from "../lib/site";

const POINTS = ["Freshly baked to order", "Designed around you", "Marbled flavours available"];
const SLIDE_MS = 5000;
const IMAGE_SIZES = "(min-width: 1024px) 34vw, 80vw";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "12%"]);
  const wordY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-30%"]);

  // Rotate the cakes in the arch; paused for reduced motion and while the visitor hovers or focuses it.
  const [slide, setSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (reduce || paused) return;
    const id = window.setTimeout(() => setSlide((s) => (s + 1) % HERO_SLIDES.length), SLIDE_MS);
    return () => window.clearTimeout(id);
  }, [slide, reduce, paused]);
  // Warm the cache for the next cake so the crossfade never shows an empty arch.
  useEffect(() => {
    const next = HERO_SLIDES[(slide + 1) % HERO_SLIDES.length].image;
    const img = new Image();
    img.sizes = IMAGE_SIZES;
    img.srcset = next.srcSet;
  }, [slide]);
  const current = HERO_SLIDES[slide];

  return (
    <section
      id="home"
      ref={ref}
      aria-labelledby="hero-title"
      className="relative overflow-hidden bg-off-white pb-16 pt-24 sm:pt-32 lg:min-h-[100svh] lg:pb-20 lg:pt-36"
    >
      {/* Oversized background wordmark, as in an editorial cover */}
      <motion.p
        aria-hidden
        style={{ y: wordY }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, ease: EASE }}
        className="pointer-events-none absolute inset-x-0 top-24 select-none text-center font-serif text-[29vw] leading-none tracking-[-0.04em] text-ink/[0.045] sm:top-20 lg:top-16 lg:text-[21vw]"
      >
        Fruition
      </motion.p>

      <div className="relative mx-auto grid max-w-[90rem] items-center gap-10 px-5 sm:gap-14 sm:px-8 lg:grid-cols-12 lg:gap-8 lg:px-12">
        <motion.div variants={stagger(0.12, 0.15)} initial="hidden" animate="show" className="order-2 text-center lg:order-none lg:col-span-6 lg:text-left xl:col-span-5">
          <motion.p variants={fadeUp} className="eyebrow flex items-center justify-center gap-4 text-stone lg:justify-start">
            <span aria-hidden className="h-px w-10 bg-ink/30" />
            Bespoke Cake Studio
            <span aria-hidden className="h-px w-10 bg-ink/30 lg:hidden" />
          </motion.p>

          <motion.h1
            id="hero-title"
            variants={fadeUp}
            className="display mt-6 text-[3.3rem] text-ink sm:text-[4.6rem] lg:text-[5.1rem] xl:text-[5.6rem]"
          >
            Custom Cakes
            <span className="block italic text-charcoal">for Beautiful</span>
            Celebrations
          </motion.h1>

          <motion.p variants={fadeUp} className="mx-auto mt-7 max-w-md text-[1.02rem] lg:mx-0 leading-relaxed text-charcoal/85">
            Freshly baked, beautifully designed cakes made to order for birthdays, weddings, events, and life&rsquo;s
            sweetest moments.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center sm:gap-4 lg:justify-start">
            <CTAButton href={whatsappLink(DEFAULT_ENQUIRY)} icon="whatsapp">
              Order on WhatsApp
            </CTAButton>
            <CTAButton href="#menu" variant="outline">
              View Cake Menu
            </CTAButton>
          </motion.div>

          <motion.ul variants={fadeUp} className="mt-12 grid gap-2.5 border-t border-muted-border pt-6 sm:grid-cols-3 sm:gap-4">
            {POINTS.map((point) => (
              <li key={point} className="eyebrow !tracking-[0.2em] text-[0.62rem] leading-relaxed text-stone">
                {point}
              </li>
            ))}
          </motion.ul>
        </motion.div>

        <div className="relative order-1 mx-auto w-full max-w-[26rem] sm:max-w-[30rem] lg:order-none lg:col-span-6 lg:max-w-none xl:col-span-6 xl:col-start-7">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.3, ease: EASE, delay: 0.2 }}
            className="relative mx-auto aspect-[4/5] w-[82%] lg:w-[72%]"
          >
            {/* Offset hairline arch behind the photo */}
            <div aria-hidden className="absolute -inset-3 translate-x-5 translate-y-5 rounded-t-full border border-ink/25 sm:-inset-4" />
            <div
              className="relative h-full overflow-hidden rounded-t-full bg-light-grey"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              <motion.div style={{ y: imageY, scale: 1.12 }} className="absolute inset-0">
                <AnimatePresence initial={false}>
                  <motion.img
                    key={current.title}
                    src={current.image.src}
                    srcSet={current.image.srcSet}
                    sizes={IMAGE_SIZES}
                    alt={current.alt}
                    fetchPriority={slide === 0 ? "high" : "auto"}
                    width={1024}
                    height={1280}
                    initial={{ opacity: 0, scale: 1.06 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.4, ease: EASE }}
                    className="absolute inset-0 h-full w-full object-cover object-[50%_35%]"
                  />
                </AnimatePresence>
              </motion.div>
            </div>
          </motion.div>

          <div
            role="group"
            aria-label="Choose a featured cake"
            className="relative mt-10 flex items-center justify-center gap-2"
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
          >
            {HERO_SLIDES.map((s, i) => (
              <button
                key={s.title}
                type="button"
                onClick={() => setSlide(i)}
                aria-label={`Show ${s.title}`}
                aria-pressed={i === slide}
                className="group flex h-8 items-center px-1"
              >
                <span
                  className={`block h-px transition-all duration-700 ease-luxe ${
                    i === slide ? "w-10 bg-ink" : "w-4 bg-ink/30 group-hover:bg-ink/60"
                  }`}
                />
              </button>
            ))}
          </div>

          <motion.p
            aria-hidden
            initial={{ opacity: 0, rotate: -8, y: 12 }}
            animate={{ opacity: 1, rotate: -8, y: 0 }}
            transition={{ duration: 1.2, ease: EASE, delay: 0.9 }}
            className="absolute -left-1 bottom-[14%] font-script text-[2.4rem] leading-none text-ink sm:-left-4 sm:text-5xl lg:left-0"
          >
            Sweet moments
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: EASE, delay: 1.1 }}
            className="absolute -right-1 top-[6%] h-24 w-24 rounded-full bg-off-white/85 backdrop-blur-sm sm:h-32 sm:w-32 lg:right-[2%]"
          >
            <RotatingBadge text="Freshly baked · Made to order · " className="h-full w-full p-1" />
          </motion.div>

          <Sprig className="absolute -bottom-6 right-[4%] w-32 text-ink/45 sm:w-40" />
        </div>
      </div>
    </section>
  );
}
