import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Reveal, { EASE } from "../components/Reveal";
import { ArrowIcon, ChevronIcon, WhatsAppIcon } from "../components/Icons";
import { FINISHES, GALLERY, POPULAR_FLAVOURS, SPECIAL_FLAVOURS, withCutout, type Flavour } from "../lib/content";
import { whatsappLink } from "../lib/site";

const byTitle = (title: string) => withCutout(GALLERY.find((g) => g.title === title)!);


type MenuCategory = {
  key: string;
  title: string;
  label: string;
  note: string;
  items: Flavour[];
  cake: ReturnType<typeof byTitle>;
};

const MARBLED: Flavour[] = [
  { name: "Any two flavours", note: "Swirled together" },
  { name: "Chocolate × Vanilla", note: "A classic pair" },
  { name: "Red Velvet × Cookies & Cream", note: "Rich & creamy" },
];

const CATEGORIES: MenuCategory[] = [
  { key: "popular", title: "Popular Flavours", label: "Classic favourites", note: "Most loved", items: POPULAR_FLAVOURS, cake: byTitle("Rose Relief Three-Tier") },
  { key: "special", title: "Special Flavours", label: "Indulgent specials", note: "Something different", items: SPECIAL_FLAVOURS, cake: byTitle("Plum, Gold & Sage") },
  { key: "marbled", title: "Marbled Cakes", label: "Two in one", note: "Mix any two flavours", items: MARBLED, cake: byTitle("Noir & Gold Fiftieth") },
  { key: "finishes", title: "Finishing Options", label: "The final touch", note: "Cream to fondant", items: FINISHES, cake: byTitle("Blush Cascade Fiftieth") },
];

const ALL_FLAVOURS = [...POPULAR_FLAVOURS, ...SPECIAL_FLAVOURS].map((f) => f.name);
const SERVINGS = ["Up to 12", "15 to 25", "30 to 50", "60+"];

/** Underlined select styled for the dark order card. */
function CardSelect({ id, label, value, options, onChange }: { id: string; label: string; value: string; options: string[]; onChange: (v: string) => void }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-off-white/25 py-2.5">
      <label htmlFor={id} className="font-serif text-[1.25rem] text-off-white/85">
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="min-h-9 max-w-[11rem] cursor-pointer appearance-none truncate rounded-full bg-transparent py-1 pl-3 pr-7 text-right text-[0.78rem] text-off-white focus:outline-none focus-visible:ring-1 focus-visible:ring-off-white/60 [&>option]:text-ink"
        >
          {options.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
        <ChevronIcon size={13} className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2 rotate-90 text-off-white/70" />
      </div>
    </div>
  );
}

/** The selected category: dark, raised, with order options. */
function ActiveCard({ category, onStep }: { category: MenuCategory; onStep: (d: number) => void }) {
  const firstFlavour = category.key === "special" ? SPECIAL_FLAVOURS[0].name : POPULAR_FLAVOURS[0].name;
  const [flavour, setFlavour] = useState(firstFlavour);
  const [second, setSecond] = useState(POPULAR_FLAVOURS[1].name);
  const [finish, setFinish] = useState(FINISHES[0].name);
  const [servings, setServings] = useState(SERVINGS[1]);
  const marbled = category.key === "marbled";

  const message = useMemo(() => {
    const cakeLine = marbled ? `a marbled ${flavour} and ${second} cake` : `a ${flavour} cake`;
    return `Hi Cake Fruition! I'd love to order ${cakeLine} with a ${finish.toLowerCase()} finish, serving ${servings.toLowerCase()} people.`;
  }, [marbled, flavour, second, finish, servings]);

  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-ink p-6 text-off-white shadow-[0_40px_80px_-30px_rgba(11,11,11,0.65)] sm:p-7">
      {/* The full cake photo fills the card, under a dark veil so the text stays readable */}
      <AnimatePresence initial={false}>
        <motion.img
          key={category.key}
          src={category.cake.image.large}
          alt=""
          aria-hidden
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="absolute inset-0 h-full w-full object-cover object-[50%_25%]"
        />
      </AnimatePresence>
      <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-ink/35 via-ink/70 to-ink/90" />
      <div className="relative flex items-center justify-between">
        <button type="button" onClick={() => onStep(-1)} aria-label="Previous menu card" className="flex h-11 w-11 items-center justify-center rounded-full bg-ink/30 text-off-white backdrop-blur-sm hover:bg-ink/60">
          <ChevronIcon size={22} className="rotate-180" />
        </button>
        <button type="button" onClick={() => onStep(1)} aria-label="Next menu card" className="flex h-11 w-11 items-center justify-center rounded-full bg-ink/30 text-off-white backdrop-blur-sm hover:bg-ink/60">
          <ChevronIcon size={22} />
        </button>
      </div>

      <p className="eyebrow relative mt-28 text-[0.58rem] text-off-white/75">{category.label}</p>
      <h3 className="relative mt-2 font-serif text-[2.1rem] leading-[1.02]">{category.title}</h3>
      <ul className="relative mt-3 flex flex-wrap gap-x-3 gap-y-1 text-[0.8rem] text-off-white/80">
        {category.items.map((item) => (
          <li key={item.name}>{item.name}</li>
        ))}
      </ul>

      <div className="relative mt-5">
        <CardSelect id={`${category.key}-flavour`} label={marbled ? "First" : "Flavour"} value={flavour} options={ALL_FLAVOURS} onChange={setFlavour} />
        {marbled && <CardSelect id={`${category.key}-second`} label="Second" value={second} options={ALL_FLAVOURS} onChange={setSecond} />}
        <CardSelect id={`${category.key}-finish`} label="Finish" value={finish} options={FINISHES.map((f) => f.name)} onChange={setFinish} />
        <CardSelect id={`${category.key}-servings`} label="Servings" value={servings} options={SERVINGS} onChange={setServings} />
      </div>

      <a
        href={whatsappLink(message)}
        target="_blank"
        rel="noopener noreferrer"
        className="eyebrow relative mx-auto mt-6 inline-flex min-h-12 items-center gap-3 rounded-full bg-off-white px-7 text-[0.62rem] text-ink transition-transform hover:-translate-y-0.5"
      >
        <WhatsAppIcon size={16} />
        Order on WhatsApp
      </a>
    </div>
  );
}

/** An unselected category: light, compact, click to bring forward. */
function RestingCard({ category, onSelect }: { category: MenuCategory; onSelect: () => void }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-label={`Open ${category.title}`}
      className="group flex h-full w-full flex-col rounded-[1.75rem] bg-light-grey/70 p-6 text-left transition-colors duration-300 hover:bg-light-grey"
    >
      <span className="relative mx-auto -mt-16 block h-40 w-32">
        <img src={category.cake.cutout.src} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-contain drop-shadow-[0_18px_18px_rgba(11,11,11,0.22)] transition-transform duration-500 ease-luxe group-hover:-translate-y-2" />
      </span>
      <span className="eyebrow mt-5 block text-[0.58rem] text-stone">{category.label}</span>
      <span className="mt-2 block font-serif text-[1.7rem] leading-tight text-charcoal/80">{category.title}</span>
      <span className="mt-5 block space-y-2 border-t border-ink/10 pt-4">
        {category.items.slice(0, 4).map((item) => (
          <span key={item.name} className="flex items-end text-[0.78rem] text-stone">
            <span>{item.name}</span>
            <span aria-hidden className="leader" />
            <span className="shrink-0 text-[0.68rem]">{item.note}</span>
          </span>
        ))}
        {category.items.length > 4 && <span className="block text-[0.72rem] text-stone">+{category.items.length - 4} more</span>}
      </span>
    </button>
  );
}

export default function Menu() {
  const [active, setActive] = useState(0);
  const step = (d: number) => setActive((a) => (a + d + CATEGORIES.length) % CATEGORIES.length);

  return (
    <section id="menu" aria-labelledby="menu-title" className="bg-off-white">
      {/* ── Cards: the selected category rises, dark, with order options ── */}
      <div className="relative overflow-hidden border-t border-muted-border pb-24 pt-24 sm:pb-28 sm:pt-28">
        <div aria-hidden className="absolute -top-40 left-1/2 aspect-square w-[60rem] -translate-x-[30%] rounded-full bg-light-grey/45" />
        <div className="relative mx-auto max-w-[90rem] px-5 sm:px-8 lg:px-12">
          <Reveal className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <p className="eyebrow text-stone">Cake Menu</p>
              <h2 id="menu-title" className="display mt-4 text-[2.8rem] sm:text-[4rem]">
                Build your <span className="italic">cake</span>
              </h2>
              <p className="mt-5 max-w-xl leading-relaxed text-charcoal/80">
                Choose from classic favourites, indulgent specials, and beautiful finishing options. Every cake is freshly
                baked, soft and moist, and served with delicious flavour-matching cream fillings.
              </p>
            </div>
            <p className="max-w-sm text-[0.95rem] leading-relaxed text-stone lg:text-right">
              Pick a card, choose your flavour, finish and size, and we&rsquo;ll pre-write your WhatsApp message. Marbled cakes
              can mix any two flavours. Prices vary with size, design and decoration.
            </p>
          </Reveal>

          {/* Phones and tablets: tabs and the active card */}
          <div className="mt-16 lg:hidden">
            <div role="tablist" aria-label="Menu categories" className="no-scrollbar -mx-5 mb-16 flex gap-2 overflow-x-auto px-5">
              {CATEGORIES.map((c, i) => (
                <button
                  key={c.key}
                  role="tab"
                  type="button"
                  aria-selected={i === active}
                  onClick={() => setActive(i)}
                  className={`eyebrow min-h-11 shrink-0 rounded-full border px-5 text-[0.6rem] ${i === active ? "border-ink bg-ink text-off-white" : "border-muted-border text-stone"}`}
                >
                  {c.title}
                </button>
              ))}
            </div>
            <div className="mx-auto max-w-sm">
              <ActiveCard key={CATEGORIES[active].key} category={CATEGORIES[active]} onStep={step} />
            </div>
          </div>

          {/* Desktop: four cards in a row, the active one raised */}
          <div className="mt-24 hidden grid-cols-4 items-start gap-5 lg:grid">
            {CATEGORIES.map((c, i) => (
              <motion.div
                key={c.key}
                layout
                transition={{ duration: 0.5, ease: EASE }}
                className={i === active ? "relative z-10 -mt-10 scale-[1.04]" : "pt-6"}
              >
                {i === active ? (
                  <ActiveCard key={c.key} category={c} onStep={step} />
                ) : (
                  <RestingCard category={c} onSelect={() => setActive(i)} />
                )}
              </motion.div>
            ))}
          </div>

          <Reveal className="mt-14 flex justify-center">
            <a href="#order" className="eyebrow group inline-flex items-center gap-3 text-ink">
              How ordering works
              <ArrowIcon size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
