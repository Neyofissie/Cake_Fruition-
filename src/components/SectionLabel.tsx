import { motion } from "motion/react";

interface SectionLabelProps {
  label: string;
  title: string;
  subtitle?: string;
  dark?: boolean;
}

export default function SectionLabel({ label, title, subtitle, dark = false }: SectionLabelProps) {
  return (
    <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-12 sm:mb-16 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-2 mb-3"
      >
        <span className={`w-1.5 h-1.5 rotated-square rotate-45 ${dark ? 'bg-medium-grey' : 'bg-charcoal'}`}></span>
        <span className={`font-sans text-xs tracking-[0.25em] h-4 uppercase ${dark ? 'text-medium-grey' : 'text-medium-grey'}`}>
          {label}
        </span>
        <span className={`w-1.5 h-1.5 rotated-square rotate-45 ${dark ? 'bg-medium-grey' : 'bg-charcoal'}`}></span>
      </motion.div>

      <motion.h2 
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className={`font-serif text-3xl sm:text-4xl md:text-5xl font-light tracking-tight mb-4 ${dark ? 'text-white' : 'text-primary-black'}`}
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className={`font-sans text-base leading-relaxed ${dark ? 'text-light-grey' : 'text-charcoal'}`}
        >
          {subtitle}
        </motion.p>
      )}

      <motion.div 
        initial={{ width: 0 }}
        whileInView={{ width: "40px" }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className={`h-[1px] mt-6 ${dark ? 'bg-medium-grey/40' : 'bg-muted-border'}`}
      ></motion.div>
    </div>
  );
}
