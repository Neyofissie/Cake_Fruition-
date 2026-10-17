import type { ReactNode } from "react";
import { motion } from "motion/react";
import { ArrowIcon, WhatsAppIcon } from "./Icons";

type Variant = "solid" | "light" | "outline" | "outline-light";

const VARIANTS: Record<Variant, string> = {
  solid: "bg-ink text-off-white hover:bg-charcoal shadow-[0_10px_30px_-12px_rgba(11,11,11,0.55)]",
  light: "bg-off-white text-ink hover:bg-warm-white shadow-[0_10px_30px_-12px_rgba(0,0,0,0.6)]",
  outline: "border border-ink/80 text-ink hover:bg-ink hover:text-off-white",
  "outline-light": "border border-off-white/50 text-off-white hover:bg-off-white hover:text-ink",
};

type Props = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  icon?: "whatsapp" | "arrow" | "none";
  className?: string;
  ariaLabel?: string;
  onClick?: () => void;
};

export default function CTAButton({
  href,
  children,
  variant = "solid",
  icon = "arrow",
  className = "",
  ariaLabel,
  onClick,
}: Props) {
  const external = /^https?:/.test(href);

  return (
    <motion.a
      href={href}
      onClick={onClick}
      aria-label={ariaLabel}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
      className={`group inline-flex min-h-12 items-center justify-center gap-3 rounded-full px-7 py-3 text-[0.72rem] font-medium uppercase tracking-[0.22em] transition-colors duration-300 ${VARIANTS[variant]} ${className}`}
    >
      {icon === "whatsapp" && <WhatsAppIcon size={17} className="shrink-0" />}
      <span>{children}</span>
      {icon === "arrow" && (
        <ArrowIcon size={17} className="shrink-0 transition-transform duration-300 ease-luxe group-hover:translate-x-1" />
      )}
    </motion.a>
  );
}
