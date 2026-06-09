import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { GalleryItem } from "../types";
import { Search, X, MessageSquare, ChevronLeft, ChevronRight } from "lucide-react";
import CTAButton from "./CTAButton";

interface GalleryGridProps {
  items: GalleryItem[];
}

export default function GalleryGrid({ items }: GalleryGridProps) {
  const [activeFilter, setActiveFilter] = useState<"All" | "Wedding" | "Celebration" | "Cupcakes">("All");
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);

  const filteredItems = items.filter(
    (item) => activeFilter === "All" || item.category === activeFilter
  );

  const openLightbox = (item: GalleryItem) => {
    const idx = items.findIndex((i) => i.id === item.id);
    setSelectedItem(item);
    setCurrentIndex(idx);
  };

  const closeLightbox = () => {
    setSelectedItem(null);
    setCurrentIndex(-1);
  };

  const navigateLightbox = (direction: "prev" | "next") => {
    if (currentIndex === -1) return;
    let nextIdx = direction === "prev" ? currentIndex - 1 : currentIndex + 1;
    if (nextIdx < 0) nextIdx = items.length - 1;
    if (nextIdx >= items.length) nextIdx = 0;
    setSelectedItem(items[nextIdx]);
    setCurrentIndex(nextIdx);
  };

  return (
    <div className="max-w-6xl mx-auto px-4">
      {/* Category Filter Nav */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-12 border-b border-muted-border/30 pb-6">
        {(["All", "Wedding", "Celebration", "Cupcakes"] as const).map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-5 py-2 font-sans text-xs tracking-widest uppercase transition-all duration-300 rounded-none border ${
              activeFilter === filter
                ? "bg-primary-black text-white border-primary-black"
                : "bg-transparent text-charcoal border-transparent hover:border-muted-border/65"
            }`}
          >
            {filter} {filter !== "All" && `Cakes`}
          </button>
        ))}
      </div>

      {/* Grid Display */}
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item, index) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.4 }}
              key={item.id}
              className="group cursor-pointer relative bg-white border border-muted-border/40 p-3 flex flex-col justify-between"
              onClick={() => openLightbox(item)}
            >
              <div className="overflow-hidden aspect-video bg-off-white relative border border-muted-border/20 mb-3">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                />

                {/* Darken overlay slide up on hover */}
                <div className="absolute inset-0 bg-primary-black/35 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-white text-primary-black flex items-center justify-center shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    <Search className="w-4 h-4" />
                  </div>
                </div>

                <div className="absolute top-2 left-2 bg-primary-black text-white px-2 py-0.5 text-[8px] font-sans uppercase tracking-[0.15em]">
                  {item.category}
                </div>
              </div>

              <div className="pt-2 pb-1 flex items-baseline justify-between select-none">
                <div>
                  <h4 className="font-serif text-lg font-light tracking-tight text-primary-black">
                    {item.title}
                  </h4>
                  {item.dimensions && (
                    <span className="font-sans text-[10px] text-medium-grey block mt-0.5">
                      {item.dimensions}
                    </span>
                  )}
                </div>
                <span className="font-sans text-[9px] uppercase tracking-widest text-[#447847] font-semibold">
                  Custom Order
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* LIGHTBOX MODAL */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-primary-black/95 backdrop-blur-sm flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
          >
            {/* Click backdrop to exit */}
            <div className="absolute inset-0 cursor-zoom-out" onClick={closeLightbox}></div>

            {/* Modal Body */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="bg-off-white rounded-none border border-muted-border max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 relative z-50 overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-primary-black text-white border border-muted-border/20 flex items-center justify-center hover:bg-white hover:text-primary-black transition-all duration-300 z-50"
                aria-label="Close Lightbox"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Box Image */}
              <div className="aspect-square bg-black flex items-center justify-center relative">
                <img
                  src={selectedItem.imageUrl}
                  alt={selectedItem.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />

                {/* Left Arrow */}
                <button
                  onClick={() => navigateLightbox("prev")}
                  className="absolute left-3 w-8 h-8 rounded-full bg-primary-black/60 hover:bg-primary-black text-white flex items-center justify-center transition-colors"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-4.5 h-4.5" />
                </button>

                {/* Right Arrow */}
                <button
                  onClick={() => navigateLightbox("next")}
                  className="absolute right-3 w-8 h-8 rounded-full bg-primary-black/60 hover:bg-primary-black text-white flex items-center justify-center transition-colors"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-4.5 h-4.5" />
                </button>
              </div>

              {/* Box Details */}
              <div className="p-8 sm:p-12 flex flex-col justify-between bg-[#FAF8F4] relative">
                <div className="space-y-6">
                  <div>
                    <span className="font-sans text-[10px] tracking-[0.25em] text-medium-grey uppercase block mb-1">
                      Cake Fruition Showcase / {selectedItem.category}
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl font-light tracking-tight text-primary-black">
                      {selectedItem.title}
                    </h3>
                  </div>

                  <div className="border-t border-b border-muted-border/50 py-4 space-y-3">
                    <div className="flex justify-between text-xs font-sans">
                      <span className="text-medium-grey">Servings:</span>
                      <span className="text-primary-black font-semibold">{selectedItem.dimensions || "Bespoke Scale"}</span>
                    </div>
                    <div className="flex justify-between text-xs font-sans">
                      <span className="text-medium-grey">Style Category:</span>
                      <span className="text-primary-black font-semibold">{selectedItem.category} Design</span>
                    </div>
                    <div className="flex justify-between text-xs font-sans">
                      <span className="text-medium-grey">Order Timeframe:</span>
                      <span className="text-primary-black font-semibold">Minimum 5-7 days slot advance</span>
                    </div>
                  </div>

                  <div className="text-xs text-charcoal/85 leading-relaxed">
                    Designed with pristine geometry, organic textures, and elegant monochrome visual elements. Like all of our cakes, this creation is custom-curated specifically based on chosen flavor depths and themes.
                  </div>
                </div>

                <div className="pt-8">
                  <CTAButton
                    href={`https://wa.me/447847996397?text=Hi%20Cake%20Fruition!%20I'm%20very%20interested%20in%20ordering%20a%20cake%20similar%20to%20your%20design%20"${encodeURIComponent(selectedItem.title)}"%20(${selectedItem.category}).%20Could%20we%20discuss%20pricing%20and%20slot%20availability%3F`}
                    label="Order This Cake"
                    icon={MessageSquare}
                    variant="primary"
                    className="w-full"
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
