import { motion, useReducedMotion } from "motion/react";
import { SparkleIcon } from "./Icons";

/** Circular badge with text running around a sparkle; slowly rotates. */
export function RotatingBadge({ text, className = "", tone = "dark" }: { text: string; className?: string; tone?: "dark" | "light" }) {
  const reduce = useReducedMotion();
  const fill = tone === "dark" ? "fill-ink" : "fill-off-white";
  return (
    <div className={`relative ${className}`} aria-hidden>
      <motion.svg
        viewBox="0 0 120 120"
        className="h-full w-full"
        animate={reduce ? undefined : { rotate: 360 }}
        transition={{ duration: 40, ease: "linear", repeat: Infinity }}
      >
        <defs>
          <path id="badge-circle" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" />
        </defs>
        <text className={`${fill} font-sans text-[9.2px] uppercase tracking-[0.32em]`}>
          <textPath href="#badge-circle">{text}</textPath>
        </text>
      </motion.svg>
      <SparkleIcon
        size={22}
        className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ${tone === "dark" ? "text-ink" : "text-off-white"}`}
      />
    </div>
  );
}

/** A loose field of twinkling four-point stars for dark sections. */
export function SparkleField({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();
  const stars = [
    { x: "8%", y: "18%", s: 14, d: 0 },
    { x: "22%", y: "78%", s: 9, d: 1.2 },
    { x: "47%", y: "10%", s: 7, d: 2.1 },
    { x: "71%", y: "84%", s: 12, d: 0.6 },
    { x: "88%", y: "22%", s: 18, d: 1.7 },
    { x: "94%", y: "64%", s: 8, d: 2.6 },
    { x: "36%", y: "56%", s: 6, d: 3.1 },
  ];
  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden>
      {stars.map((star, i) => (
        <motion.span
          key={i}
          className="absolute text-off-white"
          style={{ left: star.x, top: star.y }}
          initial={{ opacity: 0.15, scale: 0.7 }}
          animate={reduce ? { opacity: 0.35 } : { opacity: [0.12, 0.7, 0.12], scale: [0.7, 1, 0.7], rotate: [0, 45, 0] }}
          transition={{ duration: 5, delay: star.d, repeat: Infinity, ease: "easeInOut" }}
        >
          <SparkleIcon size={star.s} />
        </motion.span>
      ))}
    </div>
  );
}

/** Thin botanical sprig drawn as a single line, echoing the logo's wreath. */
export function Sprig({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 40" fill="none" stroke="currentColor" strokeWidth={0.9} strokeLinecap="round" className={className} aria-hidden>
      <path d="M4 30 C 40 30, 90 26, 156 10" />
      {[24, 48, 72, 96, 120].map((x, i) => {
        const y = 30 - i * 3.6;
        return (
          <g key={x}>
            <path d={`M${x} ${y} q 6 -12 16 -13 q -4 10 -16 13`} />
            <path d={`M${x + 4} ${y - 0.5} q 8 8 18 6 q -8 -8 -18 -6`} />
          </g>
        );
      })}
      <circle cx="150" cy="8" r="2" fill="currentColor" />
    </svg>
  );
}
