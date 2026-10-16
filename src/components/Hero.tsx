import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import CTAButton from "./CTAButton";
import { EASE, fadeUp, stagger } from "./Reveal";
import { RotatingBadge, Sprig } from "./Motifs";
import { HERO_IMAGE } from "../lib/content";
import { DEFAULT_ENQUIRY, whatsappLink } from "../lib/site";

const POINTS = ["Freshly baked to order", "Designed around you", "Marbled flavours available"];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "12%"]);
  const wordY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-30%"]);

  return (
    <section
      id="home"
      ref={ref}
      aria-labelledby="hero-title"
      className="relative overflow-hidden bg-off-white pb-16 pt-28 sm:pt-32 lg:min-h-[100svh] lg:pb-20 lg:pt-36"
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

      <div className="relative mx-auto grid max-w-[90rem] items-center gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-8 lg:px-12">
        <motion.div variants={stagger(0.12, 0.15)} initial="hidden" animate="show" className="lg:col-span-6 xl:col-span-5">
          <motion.p variants={fadeUp} className="eyebrow flex items-center gap-4 text-stone">
            <span aria-hidden className="h-px w-10 bg-ink/30" />
            Bespoke Cake Studio
          </motion.p>

          <motion.h1
            id="hero-title"
            variants={fadeUp}
            className="display mt-7 text-[3.3rem] text-ink sm:text-[4.6rem] lg:text-[5.1rem] xl:text-[5.6rem]"
          >
            Custom Cakes
            <span className="block italic text-charcoal">for Beautiful</span>
            Celebrations
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-7 max-w-md text-[1.02rem] leading-relaxed text-charcoal/85">
            Freshly baked, beautifully designed cakes made to order for birthdays, weddings, events, and life&rsquo;s
            sweetest moments.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
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

        <div className="relative mx-auto w-full max-w-[26rem] sm:max-w-[30rem] lg:col-span-6 lg:max-w-none xl:col-span-6 xl:col-start-7">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.3, ease: EASE, delay: 0.2 }}
            className="relative mx-auto aspect-[4/5] w-[82%] lg:w-[72%]"
          >
            {/* Offset hairline arch behind the photo */}
            <div aria-hidden className="absolute -inset-3 translate-x-5 translate-y-5 rounded-t-full border border-ink/25 sm:-inset-4" />
            <div className="relative h-full overflow-hidden rounded-t-full bg-light-grey">
              <motion.img
                style={{ y: imageY, scale: 1.12 }}
                src={HERO_IMAGE.image.src}
                srcSet={HERO_IMAGE.image.srcSet}
                sizes="(min-width: 1024px) 34vw, 80vw"
                alt={HERO_IMAGE.alt}
                fetchPriority="high"
                width={1024}
                height={1536}
                className="h-full w-full object-cover object-[50%_35%]"
              />
            </div>
          </motion.div>

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
