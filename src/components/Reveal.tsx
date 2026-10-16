import type { ReactNode } from "react";
import { motion, type Variants } from "motion/react";

export const EASE = [0.22, 1, 0.36, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
};

export const stagger = (gap = 0.1, delay = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: gap, delayChildren: delay } },
});

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li" | "article";
};

/** Fades and lifts its children into view once, as they scroll on screen. */
export default function Reveal({ children, className, delay = 0, as = "div" }: Props) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      variants={{
        hidden: fadeUp.hidden,
        show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE, delay } },
      }}
    >
      {children}
    </Tag>
  );
}
