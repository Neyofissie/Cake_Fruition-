import { motion } from "motion/react";
import { fadeUp } from "./Reveal";

// Minimal line symbols, one per feature, drawn on a 32px grid.
const SYMBOLS = [
  // Oven-fresh: rising steam over a cake
  <g key="0"><path d="M6 26h20M8 26V17h16v9M8 21h16" /><path d="M13 13c-1.5-1.5 1.5-3 0-5M19 13c-1.5-1.5 1.5-3 0-5" /></g>,
  // Layers: stacked sponge
  <g key="1"><rect x="6" y="9" width="20" height="5" rx="1" /><rect x="6" y="15.5" width="20" height="5" rx="1" /><rect x="6" y="22" width="20" height="5" rx="1" /></g>,
  // Design: pencil over a tier
  <g key="2"><path d="M7 27h18M9 27v-8h14v8" /><path d="m18 5 4 4-8 8h-4v-4l8-8Z" /></g>,
  // Range: fanned swatches
  <g key="3"><circle cx="11" cy="12" r="5" /><circle cx="21" cy="12" r="5" /><circle cx="16" cy="21" r="5" /></g>,
  // Marbled: two interlocking halves
  <g key="4"><circle cx="16" cy="16" r="10" /><path d="M16 6c-5 3-5 7 0 10s5 7 0 10" /></g>,
  // Service: hand-held heart
  <g key="5"><path d="M16 14.5c-1.6-3-6-2.4-6 .8 0 2.7 3.3 4.6 6 7 2.7-2.4 6-4.3 6-7 0-3.2-4.4-3.8-6-.8Z" /><path d="M4 26c4-2 7-2 12 0s8 2 12 0" /></g>,
  // Celebrate: sparkle
  <g key="6"><path d="M16 4c.6 6 2 9.4 3.8 10.4 1.4.8 3.8 1.2 8.2 1.6-4.4.4-6.8.8-8.2 1.6C18 18.6 16.6 22 16 28c-.6-6-2-9.4-3.8-10.4C10.8 16.8 8.4 16.4 4 16c4.4-.4 6.8-.8 8.2-1.6C14 13.4 15.4 10 16 4Z" /></g>,
];

type Props = { index: number; text: string };

export default function FeatureCard({ index, text }: Props) {
  return (
    <motion.li
      variants={fadeUp}
      whileHover={{ y: -3 }}
      className="group flex items-start gap-5 border-t border-off-white/15 py-6 sm:py-7"
    >
      <svg
        viewBox="0 0 32 32"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.1}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-10 w-10 shrink-0 text-off-white/80 transition-transform duration-700 ease-luxe group-hover:rotate-[8deg] group-hover:scale-110"
        aria-hidden
      >
        {SYMBOLS[index % SYMBOLS.length]}
      </svg>
      <p className="pt-1 font-serif text-[1.45rem] leading-snug text-off-white sm:text-[1.6rem]">{text}</p>
    </motion.li>
  );
}
