import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import Reveal, { fadeUp, stagger } from "../components/Reveal";
import SectionLabel from "../components/SectionLabel";
import { ArrowIcon } from "../components/Icons";
import { ABOUT_IMAGE, PILLARS } from "../lib/content";

// Where each pillar's round button leads.
const PILLAR_LINKS = ["#menu", "#gallery", "#order"];

/** A soft sugar "stone": an organic rounded blob shaded like a pebble. */
function Stone({ id, className = "", d }: { id: string; className?: string; d: string }) {
  return (
    <svg viewBox="0 0 300 220" className={className} aria-hidden>
      <defs>
        <radialGradient id={id} cx="38%" cy="30%" r="80%">
          <stop offset="0%" stopColor="#c9d1cb" />
          <stop offset="55%" stopColor="#8e9a92" />
          <stop offset="100%" stopColor="#56615a" />
        </radialGradient>
      </defs>
      <path d={d} fill={`url(#${id})`} />
    </svg>
  );
}

/** A curling fondant ribbon, echoing the sculpted drapes on the cakes. */
function Ribbon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 420 260" className={className} aria-hidden>
      <defs>
        <linearGradient id="ribbon-outer" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8fac9c" />
          <stop offset="100%" stopColor="#3f5a4e" />
        </linearGradient>
        <linearGradient id="ribbon-inner" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dfe6e0" />
          <stop offset="100%" stopColor="#8fac9c" />
        </linearGradient>
      </defs>
      <path d="M12 214 C 70 70, 210 8, 336 40 C 392 54, 418 96, 404 132 C 360 92, 262 82, 182 128 C 120 164, 70 214, 12 214 Z" fill="url(#ribbon-outer)" />
      <path d="M70 200 C 128 120, 226 86, 318 104 C 352 110, 378 124, 392 140 C 330 118, 250 124, 190 156 C 148 178, 110 200, 70 200 Z" fill="url(#ribbon-inner)" opacity="0.9" />
    </svg>
  );
}

/** A floating sphere or pebble that drifts with the scroll at its own speed. */
function Float({ progress, speed, className }: { progress: MotionValue<number>; speed: number; className: string }) {
  const reduce = useReducedMotion();
  const y = useTransform(progress, (v) => (reduce ? 0 : (v - 0.5) * speed));
  return <motion.span aria-hidden style={{ y }} className={`absolute rounded-full ${className}`} />;
}

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const cakeY = useTransform(scrollYProgress, (v) => (reduce ? 0 : (0.5 - v) * 120));
  const ribbonRotate = useTransform(scrollYProgress, (v) => (reduce ? 0 : (v - 0.5) * 16));

  return (
    <section id="about" ref={ref} aria-labelledby="about-title" className="relative overflow-hidden bg-sage-50">
      {/* ── Scene: a misty sage landscape with the cake floating above sugar stones ── */}
      <div className="relative bg-[linear-gradient(180deg,#d4ded6_0%,#e3eae4_55%,#d8e1da_100%)] pb-20 pt-24 sm:pt-32 lg:min-h-[88svh] lg:pb-28">
        {/* Distant hills and mist */}
        <svg viewBox="0 0 600 200" preserveAspectRatio="none" aria-hidden className="absolute bottom-[20%] left-0 h-[22%] w-[55%] text-sage-300/60 blur-[1.5px] [mask-image:linear-gradient(to_top,transparent,#000_55%)]">
          <path d="M0 200 L0 150 L110 60 L190 120 L260 90 L380 200 Z" fill="currentColor" />
        </svg>
        <div aria-hidden className="absolute bottom-[18%] left-[-5%] h-[18%] w-[70%] rounded-[50%] bg-white/70 blur-3xl" />
        <div aria-hidden className="absolute right-[8%] top-[18%] h-[14%] w-[22%] rounded-[50%] bg-white/80 blur-2xl" />

        {/* Floating sphere and pebbles, each drifting at its own pace */}
        <Float progress={scrollYProgress} speed={-160} className="right-[8%] top-[6%] h-12 w-12 lg:left-[46%] lg:right-auto lg:top-[9%] bg-[radial-gradient(circle_at_35%_30%,#eef1ec,#6f8f80_70%,#3f5a4e)] shadow-[0_18px_30px_-12px_rgba(34,48,42,0.6)] sm:h-16 sm:w-16" />
        <Float progress={scrollYProgress} speed={-260} className="hidden lg:block left-[41%] top-[24%] h-2.5 w-2.5 bg-sage-900/80" />
        <Float progress={scrollYProgress} speed={-200} className="hidden lg:block left-[44%] top-[31%] h-2 w-2 bg-sage-900/70" />
        <Float progress={scrollYProgress} speed={-320} className="right-[9%] top-[30%] h-3 w-3 bg-sage-900/70" />
        <Float progress={scrollYProgress} speed={-240} className="right-[6%] top-[38%] h-2 w-2 bg-sage-900/60" />
        <Float progress={scrollYProgress} speed={-180} className="right-[13%] top-[44%] h-1.5 w-1.5 bg-sage-900/60" />

        <div className="relative mx-auto grid max-w-[90rem] items-center gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:px-12">
          <Reveal className="relative z-10 lg:col-span-5">
            <SectionLabel>About the Studio</SectionLabel>
            <h2 id="about-title" className="display mt-7 text-[3rem] text-sage-900 sm:text-[4.2rem] xl:text-[4.8rem]">
              Baked with Love,
              <span className="block italic text-sage-700">Designed</span>
              to Impress
            </h2>
            <p className="mt-7 max-w-md leading-[1.8] text-charcoal/85">
              Cake Fruition brings creativity, quality, and passion together to create unforgettable cakes and desserts.
              Every cake is freshly baked to order using quality ingredients, soft moist sponge layers, and delicious
              flavour-matching cream fillings. From elegant wedding cakes to joyful birthday centrepieces, every design is
              tailored to your celebration.
            </p>
            <a href="#menu" className="eyebrow group mt-10 inline-flex items-center gap-4 text-sage-900">
              <span aria-hidden className="h-px w-12 bg-sage-900 transition-all duration-500 ease-luxe group-hover:w-20" />
              Explore the menu
            </a>
          </Reveal>

          {/* The cake, rising out of the mist between two stones */}
          <div className="relative h-[62vw] max-h-[38rem] min-h-[22rem] lg:col-span-7 lg:h-[72svh]">
            <motion.img
              src={ABOUT_IMAGE.image.large}
              srcSet={ABOUT_IMAGE.image.srcSet}
              sizes="(min-width: 1024px) 45vw, 90vw"
              alt={ABOUT_IMAGE.alt}
              loading="lazy"
              decoding="async"
              style={{ y: cakeY }}
              className="absolute bottom-0 left-1/2 aspect-[3/4] h-full max-w-full -translate-x-1/2 object-cover mix-blend-multiply [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_58%,transparent_100%)]"
            />
            {/* Mist rolling in front of the cake's base */}
            <motion.div
              aria-hidden
              className="absolute bottom-[2%] left-[12%] h-[16%] w-[76%] rounded-[50%] bg-white/80 blur-2xl"
              animate={reduce ? undefined : { x: [0, 24, 0], opacity: [0.75, 1, 0.75] }}
              transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            />
            <Stone
              id="stone-a"
              d="M14 170 C 6 112, 52 58, 116 48 C 188 38, 262 72, 288 132 C 304 170, 270 206, 210 210 C 140 214, 24 214, 14 170 Z"
              className="absolute -bottom-6 -left-4 w-[34%] drop-shadow-[0_24px_24px_rgba(34,48,42,0.35)]"
            />
            <Stone
              id="stone-b"
              d="M20 160 C 18 96, 74 32, 150 26 C 222 20, 290 70, 292 140 C 294 192, 230 214, 156 212 C 80 210, 22 206, 20 160 Z"
              className="absolute -bottom-10 right-[-2%] w-[42%] drop-shadow-[0_24px_24px_rgba(34,48,42,0.35)]"
            />
            <motion.div style={{ rotate: ribbonRotate }} className="absolute bottom-[14%] right-[-6%] w-[46%] origin-bottom-left lg:right-[-10%]">
              <Ribbon className="w-full drop-shadow-[0_20px_24px_rgba(34,48,42,0.3)]" />
            </motion.div>
            <p aria-hidden className="absolute right-[6%] top-[4%] hidden font-script text-5xl text-sage-700 sm:block">
              Handmade
            </p>
          </div>
        </div>
      </div>

      {/* ── Wave into the second half ── */}
      <svg viewBox="0 0 1440 160" preserveAspectRatio="none" aria-hidden className="relative -mt-[8vw] block h-[10vw] min-h-16 w-full text-sage-50">
        <path d="M0 160 L0 70 C 260 150 520 -10 860 50 C 1120 96 1300 30 1440 70 L1440 160 Z" fill="currentColor" />
      </svg>

      {/* ── Promise panel and pillars ── */}
      <div className="relative -mt-px bg-sage-50 pb-24 lg:pb-28">
        <div className="mx-auto grid max-w-[90rem] gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:items-stretch lg:gap-10 lg:px-12">
          {/* Curved panel */}
          <div className="relative overflow-hidden rounded-[2.5rem] rounded-tr-[45%] bg-[linear-gradient(160deg,#6f8f80_0%,#3f5a4e_70%,#22302a_100%)] px-7 pb-44 pt-14 text-sage-50 sm:px-12 lg:col-span-5 lg:rounded-tr-[60%] lg:pb-52">
            <Reveal>
              <p className="eyebrow text-[0.62rem] text-sage-100/75">Our promise</p>
              <p className="display mt-5 text-[2.6rem] sm:text-[3.2rem]">
                Three things
                <span className="block italic text-sage-100/85">every cake gets</span>
              </p>
              <p className="mt-5 max-w-xs text-[0.95rem] leading-relaxed text-sage-100/80">
                However big or small the celebration, these never change.
              </p>
            </Reveal>
            <motion.div style={{ rotate: ribbonRotate }} className="absolute -bottom-8 -right-6 w-[78%] max-w-[26rem] origin-bottom-right">
              <Ribbon className="w-full opacity-95" />
            </motion.div>
            <Stone
              id="stone-c"
              d="M18 150 C 8 96, 60 40, 130 36 C 204 32, 278 82, 282 140 C 286 192, 220 212, 146 210 C 70 208, 26 196, 18 150 Z"
              className="absolute -bottom-4 left-4 w-[34%] max-w-[10rem] drop-shadow-[0_18px_20px_rgba(0,0,0,0.35)]"
            />
          </div>

          {/* Pillars */}
          <motion.ul
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            className="grid content-center gap-y-12 sm:grid-cols-3 sm:gap-x-0 lg:col-span-7"
          >
            {PILLARS.map((pillar, i) => (
              <motion.li
                key={pillar.title}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 260, damping: 24 }}
                className="flex flex-col sm:border-l sm:border-sage-300/60 sm:px-7 sm:first:border-l-0 sm:first:pl-0 lg:first:border-l lg:first:pl-7"
              >
                <p className="font-serif text-lg italic text-sage-500">0{i + 1}</p>
                <h3 className="mt-3 font-serif text-[1.85rem] leading-tight text-sage-900">{pillar.title}</h3>
                <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-charcoal/80">{pillar.description}</p>
                <a
                  href={PILLAR_LINKS[i]}
                  aria-label={`${pillar.title}: find out more`}
                  className={`mt-8 flex h-14 w-14 items-center justify-center rounded-full shadow-[0_14px_30px_-12px_rgba(34,48,42,0.55)] transition-transform duration-300 hover:scale-105 ${
                    i === 1 ? "bg-ink text-off-white" : "bg-sage-500 text-sage-50"
                  }`}
                >
                  <ArrowIcon size={18} />
                </a>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
