import { motion } from "motion/react";
import { LucideIcon } from "lucide-react";

interface CTAButtonProps {
  id?: string;
  label: string;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline" | "white";
  icon?: LucideIcon;
  className?: string;
  disabled?: boolean;
}

export default function CTAButton({
  id,
  label,
  href,
  onClick,
  variant = "primary",
  icon: Icon,
  className = "",
  disabled = false
}: CTAButtonProps) {
  const baseStyle = "inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-xs font-sans tracking-[0.2em] uppercase transition-all duration-300 rounded-none focus:outline-none focus:ring-1 focus:ring-medium-grey active:scale-98 relative group overflow-hidden select-none border";
  
  const variants = {
    primary: "bg-primary-black text-white border-primary-black hover:bg-transparent hover:text-primary-black",
    secondary: "bg-soft-black text-white border-soft-black hover:bg-primary-black",
    outline: "bg-transparent text-primary-black border-muted-border hover:border-primary-black hover:bg-primary-black hover:text-white",
    white: "bg-white text-primary-black border-white hover:bg-transparent hover:text-white",
  };

  const buttonContent = (
    <>
      {/* Background slide animation background overlay */}
      <span className="absolute inset-0 w-full h-full bg-primary-black/5 scale-x-0 origin-left transition-transform duration-500 ease-out group-hover:scale-x-100 dark:bg-white/5"></span>
      <span className="relative z-10 flex items-center gap-2">
        {label}
        {Icon && <Icon className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />}
      </span>
    </>
  );

  if (href) {
    return (
      <motion.a
        id={id}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
        className={`${baseStyle} ${variants[variant]} ${className}`}
        aria-label={label}
      >
        {buttonContent}
      </motion.a>
    );
  }

  return (
    <motion.button
      id={id}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ y: disabled ? 0 : -2 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={`${baseStyle} ${variants[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      aria-label={label}
    >
      {buttonContent}
    </motion.button>
  );
}
