import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { useMediaQuery } from "../lib/useMediaQuery";
import { EASE } from "../components/Reveal";
import { WhatsAppIcon } from "../components/Icons";
import { GALLERY, OCCASIONS, withCutout } from "../lib/content";
import { whatsappLink } from "../lib/site";

// The cake shown large for each occasion.
const OCCASION_CAKES: Record<string, string> = {
  "Birthday Cakes": "Blush Cascade Fiftieth",
  "Wedding Cakes": "Ivory Drape & Roses",
  "Baby Shower Cakes": "Rose Relief Three-Tier",
  "Corporate Event Cakes": "Noir & Gold Fiftieth",
  "Cupcakes & Dessert Tables": "Emerald Fiftieth",
  "Custom Celebration Cakes": "Plum, Gold & Sage",
};

const ITEMS = OCCASIONS.map((o) => ({
  ...o,
  cake: withCutout(GALLERY.find((g) => g.title === OCCASION_CAKES[o.title])!),
  short: o.title.replace(/ Cakes$/, ""),
}));

// How ordering works, as short side labels.
const STEPS = ["Share your idea", "Get a quote", "Collect & enjoy"];

/** Occasions and ordering on one screen: a large cake on a black block, a short write-up, and occasion cards. */
export default function Celebrations() {
  const reduce = useReducedMotion();
  const desktop = useMediaQuery("(min-width: 1024px)");
  const [active, setActive] = useState(0);

  // On desktop the section stays pinned while scrolling steps through every occasion, then releases.
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (desktop) setActive(Math.min(ITEMS.length - 1, Math.floor(v * ITEMS.length)));
  });
  const choose = (i: number) => {
    setActive(i);
    const el = ref.current;
    if (!desktop || !el) return;
    const travel = el.offsetHeight - window.innerHeight;
    const top = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + ((i + 0.5) / ITEMS.length) * travel, behavior: reduce ? "auto" : "smooth" });
  };
  const item = ITEMS[active];
  const message = `Hi Cake Fruition! I'd love to order ${item.title.toLowerCase()}. My date is…`;

  return (
    <section id="order" ref={ref} aria-labelledby="celebrations-title" className="relative bg-warm-white lg:h-[420svh]">
      <span id="occasions" className="absolute -top-24" aria-hidden />
      <div className="overflow-hidden pb-20 pt-24 lg:sticky lg:top-0 lg:flex lg:h-[100svh] lg:min-h-[40rem] lg:flex-col lg:pb-8 lg:pt-[6.5rem]">
      <div className="mx-auto flex w-full max-w-[90rem] flex-col px-5 sm:px-8 lg:min-h-0 lg:flex-1 lg:px-12">
        <div className="grid items-center gap-10 lg:min-h-0 lg:flex-1 lg:grid-cols-12 lg:grid-rows-[minmax(0,1fr)] lg:gap-8">
          {/* Side labels: how ordering works */}
          <ol aria-label="How to order" className="hidden h-full flex-col justify-center gap-12 lg:col-span-1 lg:flex">
            {STEPS.map((step) => (
              <li key={step} className="rotate-180 whitespace-nowrap text-[0.85rem] text-charcoal [writing-mode:vertical-rl]">
                {step}
              </li>
            ))}
          </ol>

          {/* Black block with the cake overlapping its edge */}
          <div className="relative mx-auto h-[110vw] max-h-[34rem] w-full max-w-md lg:col-span-5 lg:mx-0 lg:h-full lg:max-h-none lg:max-w-none">
            <div className="absolute inset-y-0 left-[12%] right-[22%] bg-ink lg:left-[6%] lg:right-[30%]">
              <p className="absolute inset-x-0 top-6 text-center font-serif text-[1.8rem] text-off-white">Cake Fruition</p>
            </div>
            <AnimatePresence initial={false}>
              <motion.img
                key={item.title}
                src={item.cake.cutout.large}
                alt={item.cake.alt}
                initial={{ opacity: 0, x: reduce ? 0 : 50, rotate: reduce ? 0 : 6 }}
                animate={{ opacity: 1, x: 0, rotate: 0 }}
                exit={{ opacity: 0, x: reduce ? 0 : -50, rotate: reduce ? 0 : -6 }}
                transition={{ duration: 0.7, ease: EASE }}
                className="absolute bottom-[2%] left-[8%] top-[16%] h-[82%] w-[92%] object-contain drop-shadow-[0_36px_36px_rgba(11,11,11,0.35)] lg:left-[18%]"
              />
            </AnimatePresence>
          </div>

          {/* Write-up */}
          <div className="lg:col-span-5 lg:col-start-8">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                <h2 id="celebrations-title" className="font-serif text-[3rem] font-medium leading-none text-ink sm:text-[4rem] lg:text-[clamp(3rem,8vh,4.6rem)]">
                  {item.title}
                </h2>
                <p className="mt-4 max-w-md leading-relaxed text-charcoal/85">{item.description}</p>
              </motion.div>
            </AnimatePresence>
            <div className="mt-7 flex items-center gap-10">
              <p className="leading-none">
                <span className="block font-serif text-[1.7rem] text-ink">Made to order</span>
                <span className="mt-1 block text-[0.68rem] text-stone">priced by size &amp; design</span>
              </p>
              <a
                href={whatsappLink(message)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 bg-ink px-6 text-[0.95rem] font-medium text-off-white transition-transform hover:-translate-y-0.5"
              >
                <WhatsAppIcon size={16} />
                Order now
              </a>
            </div>
          </div>
        </div>

        {/* Occasion cards */}
        <div
          role="tablist"
          aria-label="Choose an occasion"
          className="no-scrollbar -mx-5 mt-14 flex gap-6 overflow-x-auto px-5 pb-4 pt-8 lg:mx-0 lg:mt-6 lg:grid lg:shrink-0 lg:grid-cols-6 lg:gap-6 lg:overflow-visible lg:px-0 lg:pb-2"
        >
          {ITEMS.map((o, i) => {
            const selected = i === active;
            return (
              <button
                key={o.title}
                role="tab"
                type="button"
                aria-selected={selected}
                onClick={() => choose(i)}
                className={`relative w-40 shrink-0 rounded-lg p-4 pt-12 text-left shadow-[0_20px_30px_-18px_rgba(11,11,11,0.55)] transition-all duration-300 lg:w-auto ${
                  selected ? "-translate-y-1.5 bg-ink" : "bg-charcoal hover:-translate-y-1"
                }`}
              >
                <span className="absolute -left-3 -top-7 flex h-16 w-16 items-center justify-center rounded-full bg-off-white shadow-[0_8px_16px_-8px_rgba(11,11,11,0.5)]">
                  <img src={o.cake.cutout.src} alt="" loading="lazy" className="h-[82%] w-[82%] object-contain" />
                </span>
                <span className="block truncate text-[0.92rem] font-medium text-off-white">{o.short}</span>
                <span className="mt-0.5 block text-[0.65rem] text-off-white/55">Made to order</span>
              </button>
            );
          })}
        </div>
        <div aria-hidden className="mt-4 flex justify-center gap-2">
          {ITEMS.map((o, i) => (
            <span key={o.title} className={`h-2 w-2 rounded-full ${i === active ? "bg-ink" : "bg-ink/20"}`} />
          ))}
        </div>
      </div>
      </div>
    </section>
  );
}
