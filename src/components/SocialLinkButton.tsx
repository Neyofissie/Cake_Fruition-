import { motion } from "motion/react";
import type { ComponentType } from "react";
import { ArrowIcon } from "./Icons";

type Props = {
  href: string;
  label: string;
  handle: string;
  Icon: ComponentType<{ size?: number; className?: string }>;
};

export default function SocialLinkButton({ href, label, handle, Icon }: Props) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Follow Cake Fruition on ${label}`}
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 320, damping: 26 }}
      className="group flex items-center gap-5 border border-muted-border bg-warm-white p-5 transition-colors duration-500 hover:border-ink hover:bg-ink sm:p-6"
    >
      <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-ink/20 text-ink transition-colors duration-500 group-hover:border-off-white/30 group-hover:text-off-white">
        <Icon size={22} />
      </span>
      <span className="flex-1 text-left">
        <span className="eyebrow block text-stone transition-colors duration-500 group-hover:text-off-white/60">{label}</span>
        <span className="mt-1 block font-serif text-2xl text-ink transition-colors duration-500 group-hover:text-off-white">
          {handle}
        </span>
      </span>
      <ArrowIcon size={20} className="-rotate-45 text-ink transition-all duration-500 ease-luxe group-hover:rotate-0 group-hover:text-off-white" />
    </motion.a>
  );
}
