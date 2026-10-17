import { motion } from "motion/react";
import { fadeUp } from "./Reveal";

type Props = { number: number; title: string; description: string; last?: boolean };

export default function ProcessStep({ number, title, description, last }: Props) {
  return (
    <motion.li variants={fadeUp} className="relative grid grid-cols-[3.5rem_1fr] gap-5 pb-10 sm:grid-cols-[4.5rem_1fr]">
      {!last && <span aria-hidden className="absolute bottom-0 left-7 top-14 w-px bg-muted-border sm:left-9 sm:top-[4.5rem]" />}
      <span className="flex h-14 w-14 items-center justify-center rounded-full border border-ink font-serif text-2xl sm:h-[4.5rem] sm:w-[4.5rem] sm:text-[1.7rem]">
        {number}
      </span>
      <div className="pt-2.5 sm:pt-4">
        <h3 className="font-serif text-[1.75rem] leading-tight">{title}</h3>
        <p className="mt-2 max-w-md leading-relaxed text-charcoal/80">{description}</p>
      </div>
    </motion.li>
  );
}
