import { useEffect, useRef, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { ImageGallery } from "@/components/ui/image-gallery";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { EASE } from "./Reveal";
import { ChevronIcon, CloseIcon, WhatsAppIcon } from "./Icons";
import type { GalleryCategory, GalleryItem } from "../lib/content";
import { whatsappLink } from "../lib/site";

const FILTERS: Array<"All" | GalleryCategory> = ["All", "Tiered", "Birthday", "Celebration"];

export default function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const visible = filter === "All" ? items : items.filter((item) => item.category === filter);
  // Split into balanced rows of expanding strips: up to six per row on desktop, four on smaller screens.
  const perRow = useMediaQuery("(min-width: 1024px)") ? 6 : 4;
  const rowCount = Math.max(1, Math.ceil(visible.length / perRow));
  const size = Math.ceil(visible.length / rowCount);
  const rows = Array.from({ length: rowCount }, (_, r) => ({
    start: r * size,
    items: visible.slice(r * size, (r + 1) * size),
  })).filter((row) => row.items.length > 0);

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

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={filter}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, transition: { duration: 0.15 } }}
          transition={{ duration: 0.5, ease: EASE }}
          className="mt-10 flex flex-col gap-2"
        >
          {rows.map((row) => (
            <ImageGallery
              key={row.start}
              images={row.items.map((item) => ({
                src: item.image.large,
                srcSet: item.image.srcSet,
                alt: item.alt,
                label: item.category,
                caption: item.title,
              }))}
              onOpen={(i) => setOpenIndex(row.start + i)}
              heightClassName="h-[300px] sm:h-[360px] lg:h-[420px]"
            />
          ))}
        </motion.div>
      </AnimatePresence>

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
