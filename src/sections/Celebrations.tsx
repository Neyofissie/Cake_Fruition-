import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Reveal, { EASE } from "../components/Reveal";
import { ArrowIcon, WhatsAppIcon } from "../components/Icons";
import { GALLERY, OCCASIONS, ORDER_STEPS, withCutout } from "../lib/content";
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

/** Occasions and how to order, in one section: pick an occasion card and the large cake and its write-up change. */
export default function Celebrations() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const item = ITEMS[active];
  const message = `Hi Cake Fruition! I'd love to order ${item.title.toLowerCase()}. My date is… and I'm thinking of…`;

  return (
    <section id="order" aria-labelledby="celebrations-title" className="relative overflow-hidden bg-warm-white py-24 sm:py-28">
      <span id="occasions" className="absolute -top-24" aria-hidden />
      <div className="mx-auto max-w-[90rem] px-5 sm:px-8 lg:px-12">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* The four ordering steps as vertical labels, like a side index */}
          <ol aria-label="How to order" className="hidden flex-col items-center justify-center gap-8 lg:col-span-1 lg:flex">
            {ORDER_STEPS.map((step, i) => (
              <li key={step.title} className="eyebrow rotate-180 whitespace-nowrap text-[0.6rem] text-stone [writing-mode:vertical-rl]">
                <span className="me-3 font-serif text-sm normal-case tracking-normal text-ink">0{i + 1}</span>
                {step.title}
              </li>
            ))}
          </ol>

          {/* Black block with the large cake overlapping its edge */}
          <div className="relative mx-auto h-[118vw] max-h-[40rem] w-full max-w-md sm:h-[34rem] lg:col-span-5 lg:mx-0 lg:h-[38rem] lg:max-w-none">
            <div className="absolute inset-y-0 left-[10%] right-[22%] rounded-t-[3rem] bg-ink lg:left-0 lg:right-[30%]">
              <p className="absolute inset-x-0 top-8 text-center font-serif text-[1.9rem] text-off-white sm:text-[2.2rem]">
                Cake Fruition
              </p>
            </div>
            <div aria-hidden className="absolute bottom-[3%] left-1/2 h-8 w-[55%] -translate-x-1/2 lg:left-[61%] rounded-[50%] bg-ink/30 blur-xl" />
            <AnimatePresence initial={false}>
              <motion.img
                key={item.title}
                src={item.cake.cutout.large}
                alt={item.cake.alt}
                initial={{ opacity: 0, x: reduce ? 0 : 60, rotate: reduce ? 0 : 8, scale: 0.92 }}
                animate={{ opacity: 1, x: 0, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, x: reduce ? 0 : -60, rotate: reduce ? 0 : -8, scale: 0.92 }}
                transition={{ duration: 0.8, ease: EASE }}
                className="absolute inset-x-0 bottom-[4%] top-[14%] h-[82%] w-full object-contain lg:left-[16%] lg:w-[90%] drop-shadow-[0_40px_40px_rgba(11,11,11,0.35)]"
              />
            </AnimatePresence>
          </div>

          {/* Write-up */}
          <div className="lg:col-span-6 lg:pl-8">
            <p className="eyebrow text-stone">Occasions &amp; ordering</p>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.45, ease: EASE }}
              >
                <h2 id="celebrations-title" className="display mt-5 text-[3rem] text-ink sm:text-[4.2rem] xl:text-[4.8rem]">
                  {item.title}
                </h2>
                <p className="mt-5 max-w-lg text-[1.02rem] leading-relaxed text-charcoal/85">{item.description}</p>
              </motion.div>
            </AnimatePresence>

            <div className="mt-8 flex flex-wrap items-center gap-5">
              <div className="leading-tight">
                <p className="font-serif text-[1.8rem] text-ink">Made to order</p>
                <p className="text-[0.75rem] text-stone">Priced by size, design and finish</p>
              </div>
              <a
                href={whatsappLink(message)}
                target="_blank"
                rel="noopener noreferrer"
                className="eyebrow inline-flex min-h-12 items-center gap-3 bg-ink px-6 text-[0.66rem] text-off-white transition-transform hover:-translate-y-0.5"
              >
                <WhatsAppIcon size={16} />
                Order now
              </a>
            </div>

            {/* How to order, compact */}
            <ol className="mt-10 grid gap-x-6 gap-y-5 border-t border-ink/10 pt-7 sm:grid-cols-2">
              {ORDER_STEPS.map((step, i) => (
                <li key={step.title} className="flex gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-ink font-serif text-base">
                    {i + 1}
                  </span>
                  <span>
                    <span className="block text-[0.88rem] font-medium text-ink">{step.title}</span>
                    <span className="mt-1 block text-[0.8rem] leading-relaxed text-stone">{step.description}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Occasion cards */}
        <Reveal className="mt-20">
          <div
            role="tablist"
            aria-label="Choose an occasion"
            className="no-scrollbar -mx-5 flex gap-5 overflow-x-auto px-5 pb-6 pt-10 sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-x-6 sm:gap-y-14 sm:overflow-visible sm:px-0 xl:grid-cols-6 xl:gap-5"
          >
            {ITEMS.map((o, i) => {
              const selected = i === active;
              return (
                <button
                  key={o.title}
                  role="tab"
                  type="button"
                  aria-selected={selected}
                  onClick={() => setActive(i)}
                  className={`group relative w-44 shrink-0 rounded-2xl p-4 pt-14 text-left shadow-[0_24px_40px_-24px_rgba(11,11,11,0.6)] transition-all duration-500 ease-luxe sm:w-auto ${
                    selected ? "-translate-y-2 bg-ink" : "bg-soft-black/90 hover:-translate-y-1 hover:bg-ink"
                  }`}
                >
                  <span
                    className={`absolute -left-3 -top-9 flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border-4 bg-off-white transition-transform duration-500 ease-luxe group-hover:rotate-6 ${
                      selected ? "border-off-white" : "border-light-grey"
                    }`}
                  >
                    <img src={o.cake.cutout.src} alt="" loading="lazy" className="h-[85%] w-[85%] object-contain" />
                  </span>
                  <span className="absolute right-4 top-4 font-serif text-sm italic text-off-white/50">0{i + 1}</span>
                  <span className="block font-serif text-[1.25rem] leading-tight text-off-white">{o.short}</span>
                  <span className="mt-1 block text-[0.68rem] text-off-white/55">{selected ? "Showing now" : "Tap to view"}</span>
                  <span className="mt-4 flex items-center justify-between text-off-white/70">
                    <span className="eyebrow text-[0.5rem]">Occasion</span>
                    <ArrowIcon size={14} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </button>
              );
            })}
          </div>
          <div aria-hidden className="mt-4 flex justify-center gap-2">
            {ITEMS.map((o, i) => (
              <span key={o.title} className={`h-2 w-2 rounded-full transition-colors ${i === active ? "bg-ink" : i < active ? "bg-ink/40" : "bg-ink/15"}`} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
