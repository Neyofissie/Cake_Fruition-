import React from "react";
import { motion } from "motion/react";
import { OccasionCard } from "../types";
import { ArrowUpRight } from "lucide-react";

interface ServiceCardProps {
  card: OccasionCard;
  index: number;
  onExplore: (title: string) => void;
}

export default function ServiceCard({ card, index, onExplore }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.05 }}
      whileHover={{ y: -6 }}
      className="group cursor-pointer bg-white border border-muted-border/60 overflow-hidden flex flex-col justify-between h-full relative p-4 transition-all duration-500 hover:border-primary-black hover:shadow-[0_20px_40px_rgba(0,0,0,0.03)]"
      onClick={() => onExplore(card.title)}
    >
      <div className="space-y-4">
        {/* Zoom animation hover with full rich colors */}
        <div className="overflow-hidden w-full aspect-[4/3] bg-off-white border border-muted-border/35 relative">
          <img
            src={card.imageUrl}
            alt={card.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
          />
          {/* Accent Line motif on card */}
          <div className="absolute top-2 left-2 bottom-2 right-2 border border-white/20 pointer-events-none transition-all duration-500 group-hover:border-white/50"></div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="font-sans text-[10px] tracking-widest text-medium-grey">
              OCCASION 0{index + 1}
            </span>
          </div>
          <h4 className="font-serif text-xl sm:text-2xl font-light tracking-tight text-primary-black group-hover:text-medium-grey transition-colors">
            {card.title}
          </h4>
          <p className="font-sans text-xs sm:text-sm text-charcoal/85 leading-relaxed mt-2">
            {card.description}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between pt-6 mt-4 border-t border-muted-border/40">
        <span className="font-sans text-[10px] tracking-widest uppercase font-medium text-primary-black group-hover:translate-x-1.5 transition-transform duration-300">
          Design Concept
        </span>
        <div className="w-8 h-8 rounded-full border border-muted-border/60 flex items-center justify-center text-primary-black group-hover:bg-primary-black group-hover:text-white group-hover:border-primary-black transition-all duration-300">
          <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-45" />
        </div>
      </div>
    </motion.div>
  );
}
