import type { ReactNode } from "react";
import { motion } from "motion/react";
import { fadeUp } from "./Reveal";

type Props = {
  index: string;
  label: string;
  title: string;
  badge?: string;
  tone?: "dark" | "light";
  className?: string;
  children: ReactNode;
};

/** Bordered menu card with an inner hairline frame, like a printed patisserie menu. */
export default function CakeMenuCard({ index, label, title, badge, tone = "light", className = "", children }: Props) {
  const dark = tone === "dark";
  return (
    <motion.article
      variants={fadeUp}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 260, damping: 26 }}
      className={`relative p-2 ${dark ? "bg-ink text-off-white" : "border border-muted-border bg-warm-white text-ink"} ${className}`}
    >
      <div className={`flex h-full flex-col border p-7 sm:p-9 ${dark ? "border-off-white/20" : "border-muted-border/70"}`}>
        <div className="flex items-start justify-between gap-4">
          <p className={`eyebrow ${dark ? "text-off-white/60" : "text-stone"}`}>
            <span className="mr-3 font-serif text-base normal-case tracking-normal">{index}</span>
            {label}
          </p>
          {badge && (
            <span
              className={`shrink-0 rounded-full border px-3 py-1 text-[0.6rem] uppercase tracking-[0.2em] ${
                dark ? "border-off-white/35 text-off-white/80" : "border-ink/30 text-charcoal"
              }`}
            >
              {badge}
            </span>
          )}
        </div>
        <h3 className="display mt-6 text-[2.3rem] sm:text-[2.6rem]">{title}</h3>
        <div className="mt-8 flex-1">{children}</div>
      </div>
    </motion.article>
  );
}
