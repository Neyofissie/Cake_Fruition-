import { motion } from "motion/react";
import { fadeUp } from "./Reveal";
import { ArrowIcon } from "./Icons";
import { whatsappLink } from "../lib/site";

type Props = { index: number; title: string; description: string };

export default function ServiceCard({ index, title, description }: Props) {
  const message = `Hi Cake Fruition! I'd love to enquire about ${title.toLowerCase()}.`;
  return (
    <motion.li variants={fadeUp} className="h-full">
      <motion.a
        href={whatsappLink(message)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Enquire about ${title} on WhatsApp`}
        initial="rest"
        whileHover="hover"
        animate="rest"
        className="group relative flex h-full flex-col overflow-hidden border border-muted-border bg-warm-white p-7 transition-colors duration-500 hover:border-ink sm:p-8"
      >
        {/* Ink wash that rises on hover */}
        <motion.span
          aria-hidden
          variants={{ rest: { scaleY: 0 }, hover: { scaleY: 1 } }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 origin-bottom bg-ink"
        />
        <span className="relative flex items-center justify-between">
          <span className="font-serif text-lg italic text-stone transition-colors duration-500 group-hover:text-off-white/60">
            {String(index).padStart(2, "0")}
          </span>
          <ArrowIcon
            size={20}
            className="-rotate-45 text-ink transition-all duration-500 ease-luxe group-hover:rotate-0 group-hover:text-off-white"
          />
        </span>
        <span className="relative mt-14 font-serif text-[1.85rem] leading-tight text-ink transition-colors duration-500 group-hover:text-off-white">
          {title}
        </span>
        <span className="relative mt-3 text-[0.95rem] leading-relaxed text-charcoal/80 transition-colors duration-500 group-hover:text-off-white/75">
          {description}
        </span>
      </motion.a>
    </motion.li>
  );
}
