import { useEffect, useRef, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { EASE } from "./Reveal";
import { ChevronIcon, CloseIcon, WhatsAppIcon } from "./Icons";
import type { GalleryCategory, GalleryItem } from "../lib/content";
import { whatsappLink } from "../lib/site";

const FILTERS: Array<"All" | GalleryCategory> = ["All", "Tiered", "Birthday", "Celebration"];

export default function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const visible = filter === "All" ? items : items.filter((item) => item.category === filter);

  return (
    <>
      <div role="group" aria-label="Filter gallery" className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:px-0">
        <LayoutGroup>
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              aria-pressed={filter === f}
              onClick={() => setFilter(f)}
              className={`eyebrow relative min-h-11 shrink-0 rounded-full border px-5 transition-colors duration-300 ${
                filter === f ? "border-ink text-off-white" : "border-muted-border text-stone hover:border-ink hover:text-ink"
              }`}
            >
              {filter === f && (
                <motion.span layoutId="gallery-filter" className="absolute inset-0 rounded-full bg-ink" transition={{ duration: 0.5, ease: EASE }} />
              )}
              <span className="relative">{f}</span>
            </button>
          ))}
        </LayoutGroup>
      </div>

      <ul className="mt-10 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
        <AnimatePresence initial={false}>
          {visible.map((item, i) => (
            <motion.li
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              transition={{ duration: 0.6, ease: EASE, delay: (i % 4) * 0.05 }}
              
            >
              <button
                type="button"
                onClick={() => setOpenIndex(i)}
                aria-label={`View larger: ${item.title}`}
                className="group relative block w-full overflow-hidden rounded-[2px] bg-light-grey text-left"
              >
                <img
                  src={item.image.src}
                  srcSet={item.image.srcSet}
                  sizes="(min-width: 1280px) 22vw, (min-width: 1024px) 30vw, 48vw"
                  alt={item.alt}
                  loading="lazy"
                  decoding="async"
                  width={640}
                  height={800}
                  className="aspect-[4/5] w-full object-cover object-[50%_40%] transition-transform duration-[1.2s] ease-luxe group-hover:scale-[1.06]"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/0 to-transparent opacity-80 transition-opacity duration-500 sm:opacity-0 sm:group-hover:opacity-100" />
                <span className="absolute inset-x-0 bottom-0 p-3 text-off-white sm:translate-y-2 sm:p-5 sm:opacity-0 sm:transition-all sm:duration-500 sm:group-hover:translate-y-0 sm:group-hover:opacity-100">
                  <span className="eyebrow block text-[0.58rem] text-off-white/70">{item.category}</span>
                  <span className="mt-1 block font-serif text-lg leading-tight sm:text-2xl">{item.title}</span>
                </span>
              </button>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      <AnimatePresence>
        {openIndex !== null && (
          <Lightbox
            items={visible}
            index={openIndex}
            onIndex={setOpenIndex}
            onClose={() => setOpenIndex(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

type LightboxProps = {
  items: GalleryItem[];
  index: number;
  onIndex: (i: number) => void;
  onClose: () => void;
};

function Lightbox({ items, index, onIndex, onClose }: LightboxProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const item = items[index];
  const go = (step: number) => onIndex((index + step + items.length) % items.length);

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
      opener?.focus();
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "Tab" && dialogRef.current) {
        const nodes = [...dialogRef.current.querySelectorAll<HTMLElement>("button, a")];
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  return (
    <motion.div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-[60] flex flex-col bg-ink/95 text-off-white backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="flex items-center justify-between px-5 py-4 sm:px-8" onClick={(e) => e.stopPropagation()}>
        <p className="eyebrow text-off-white/60" aria-live="polite">
          {String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
        </p>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close gallery"
          className="flex h-12 w-12 items-center justify-center rounded-full border border-off-white/25 transition-colors hover:bg-off-white hover:text-ink"
        >
          <CloseIcon size={20} />
        </button>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 sm:px-20">
        <AnimatePresence mode="wait" initial={false}>
          <motion.img
            key={item.title}
            src={item.image.large}
            alt={item.alt}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.45, ease: EASE }}
            onClick={(e) => e.stopPropagation()}
            className="max-h-full max-w-full object-contain"
          />
        </AnimatePresence>

        {items.length > 1 && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                go(-1);
              }}
              aria-label="Previous cake"
              className="absolute left-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-off-white/25 bg-ink/40 transition-colors hover:bg-off-white hover:text-ink sm:left-6"
            >
              <ChevronIcon size={20} className="rotate-180" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                go(1);
              }}
              aria-label="Next cake"
              className="absolute right-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-off-white/25 bg-ink/40 transition-colors hover:bg-off-white hover:text-ink sm:right-6"
            >
              <ChevronIcon size={20} />
            </button>
          </>
        )}
      </div>

      <div
        className="flex flex-col items-center gap-4 px-5 pb-6 pt-5 text-center sm:flex-row sm:justify-between sm:px-8 sm:text-left"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <p className="eyebrow text-off-white/55">{item.category}</p>
          <p className="mt-1 font-serif text-3xl">{item.title}</p>
        </div>
        <a
          href={whatsappLink(`Hi Cake Fruition! I love the "${item.title}" cake in your gallery — could I get a quote for something similar?`)}
          target="_blank"
          rel="noopener noreferrer"
          className="eyebrow inline-flex min-h-12 items-center gap-3 rounded-full bg-off-white px-6 text-ink transition-transform hover:-translate-y-0.5"
        >
          <WhatsAppIcon size={17} />
          Ask for something similar
        </a>
      </div>
    </motion.div>
  );
}
