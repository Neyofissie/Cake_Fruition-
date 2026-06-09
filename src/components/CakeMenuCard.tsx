import { motion } from "motion/react";
import { MenuItem } from "../types";
import { Award, Compass, Sparkles, Check } from "lucide-react";

// Directly import beautiful non-grayscale image assets to show culinary vibrancy
import classicCakeImg from "../assets/images/regenerated_image_1780490006000.jpg"; // g3Img (Minimal Classic Rosebud)
import specialtyCupcakeImg from "../assets/images/regenerated_image_1780490006579.jpg"; // g4Img (Speculoos cupcakes flight)
import finishingArtImg from "../assets/images/regenerated_image_1780490004970.jpg"; // g1Img (Textured Pearl Trio)

interface CakeMenuCardProps {
  popularFlavors: MenuItem[];
  specialFlavors: MenuItem[];
  finishingOptions: Array<{ name: string; desc: string }>;
}

export default function CakeMenuCard({ popularFlavors, specialFlavors, finishingOptions }: CakeMenuCardProps) {
  // Realistic premium prices to emulate the Dolcino layout
  const popularPrices: Record<string, string> = {
    p1: "£22",
    p2: "£24",
    p3: "£23",
    p4: "£25",
  };

  const specialPrices: Record<string, string> = {
    s1: "£24",
    s2: "£26",
    s3: "£27",
    s4: "£25",
    s5: "£28",
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 py-8">
      
      {/* SECTION 1: THE MONOGRAM & CLASSIC CAKES (Dolcino Pastries Luxury Layout) */}
      <div className="bg-white border border-muted-border/40 p-6 sm:p-12 lg:p-16 relative shadow-[0_16px_45px_rgba(0,0,0,0.01)] overflow-hidden">
        {/* Fine editorial layout frame accent */}
        <div className="absolute top-4 left-4 right-4 bottom-4 border border-muted-border/20 pointer-events-none"></div>

        {/* Haushalter-style Bold Serif Monogram Header */}
        <div className="flex flex-col items-center justify-center mb-14 text-center relative z-10 select-none group">
          <div className="flex items-center gap-5 w-full max-w-sm justify-center">
            <div className="h-[1px] bg-muted-border/30 flex-grow"></div>
            <span className="font-serif text-5xl md:text-6xl text-[#C29D53] font-extralight tracking-widest leading-none">
              C
            </span>
            <div className="h-[1px] bg-muted-border/30 flex-grow"></div>
          </div>
          <span className="font-sans text-[9px] tracking-[0.45em] uppercase text-medium-grey mt-2 block font-semibold">
            CAKE FRUITION STUDIO
          </span>
        </div>

        {/* Dolcino Split Menu View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-center relative z-10">
          
          {/* Left Column: Dotted Leader List */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[#C29D53]">
                <Award className="w-4 h-4" />
                <span className="font-sans text-[10px] tracking-[0.25em] uppercase font-bold">
                  01 / Signature Layering
                </span>
              </div>
              <h3 className="font-serif text-3xl sm:text-4xl font-light tracking-tight text-primary-black uppercase">
                THE CAKE MENU
              </h3>
              <p className="font-sans text-xs text-medium-grey max-w-md">
                Our classic freshly baked curation featuring soft moist sponges paired perfectly with luxurious, dairy-matching pastry whipped cream.
              </p>
            </div>

            <div className="space-y-7 pt-4">
              {popularFlavors.map((item, index) => {
                const priceValue = popularPrices[item.id] || "£24";
                return (
                  <motion.div 
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.08 }}
                    key={item.id} 
                    className="group"
                  >
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="font-serif text-xs sm:text-sm font-semibold tracking-widest uppercase text-primary-black group-hover:text-[#C29D53] transition-colors duration-300">
                        {item.name}
                      </span>
                      {/* Dotted leader lines mimicking Image 1 */}
                      <div className="flex-grow border-b border-dotted border-muted-border/80 mx-2 h-[1px] relative -bottom-1"></div>
                      <span className="font-serif text-sm font-medium text-[#C29D53] tracking-wide">
                        {priceValue}
                      </span>
                    </div>
                    {item.description && (
                      <p className="font-sans text-xs text-charcoal/80 mt-1 pl-1 leading-relaxed">
                        {item.description}
                      </p>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Subtle Marbled Banner Accent */}
            <div className="flex items-start gap-4 border-t border-muted-border/30 pt-6 mt-8">
              <Compass className="w-5 h-5 text-[#C29D53] flex-shrink-0 mt-0.5" />
              <p className="font-sans text-[11px] text-charcoal/85 leading-relaxed">
                <strong className="text-primary-black font-semibold uppercase tracking-wider text-[10px] block mb-0.5">Two-Layer Marbling Option</strong>
                All flavor combinations can be marbled and twisted together. Mix and match layers dynamically on consultation.
              </p>
            </div>

          </div>

          {/* Right Column: Premium Framed Product Showcase */}
          <div className="lg:col-span-5">
            <div className="relative p-2 border border-muted-border/40 bg-[#FAF8F4] overflow-hidden group shadow-sm">
              <div className="absolute inset-4 border border-[#C29D53]/15 pointer-events-none z-10"></div>
              <div className="aspect-[4/5] overflow-hidden bg-white relative">
                <img
                  src={classicCakeImg}
                  alt="Prestige white chocolate celebration cake"
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-1000"
                  referrerPolicy="no-referrer"
                />
                
                {/* Minimal label overlay */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 border border-muted-border/40 p-4 backdrop-blur-sm">
                  <span className="font-sans text-[9px] uppercase tracking-widest text-[#C29D53] block font-bold mb-0.5">Classic Style</span>
                  <span className="font-serif text-xs text-primary-black italic font-medium">"Minimal Classic Rosebud — Moist vanilla crumb layered with premium cream."</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* SECTION 2: SPECIALTY FRUITS & PRESTIGE SELECTION (Haushalter Bold Dark Contrast Layout) */}
      <div className="bg-[#111111] text-[#FAF8F4] p-8 sm:p-14 lg:p-20 relative overflow-hidden ring-1 ring-white/10 shadow-[0_24px_50px_rgba(0,0,0,0.15)] rounded-2xl">
        {/* Subtle angled/geometric light sweep in the corner mimicking Image 2 */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-white/3 rounded-full blur-3xl pointer-events-none"></div>

        {/* Fine framing line inside black box */}
        <div className="absolute inset-4 border border-white/5 pointer-events-none rounded-xl"></div>

        {/* Haushalter center stamp and title */}
        <div className="text-center max-w-xl mx-auto mb-16 relative z-10">
          <div className="flex justify-center mb-3">
            <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-[#E5C483] font-serif text-lg tracking-widest font-light">
              CF
            </div>
          </div>
          <span className="font-sans text-[9px] tracking-[0.3em] uppercase text-light-grey/65 block font-semibold mb-2">
            PRESIDENTIAL BAKERY
          </span>
          <h3 className="font-serif text-3xl sm:text-4xl font-light tracking-tight text-white uppercase">
            ARTISAN SPECIALS
          </h3>
          <div className="h-[1px] w-12 bg-[#E5C483]/60 mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-center relative z-10">
          
          {/* Left Side: Isolated closeups representing fruit toppings on standard doughs */}
          <div className="lg:col-span-5 space-y-4">
            <div className="aspect-[4/3] overflow-hidden bg-[#1C1C1C] border border-white/5 relative group rounded-lg">
              <img
                src={specialtyCupcakeImg}
                alt="Finely baked custom dessert slices with fruit segments"
                className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
              <span className="absolute bottom-3 left-4 font-sans text-[9px] uppercase tracking-[0.2em] text-[#E5C483] font-semibold">
                PREMIUM TOPPING ALIGNMENT
              </span>
            </div>
            <p className="font-sans text-xs text-light-grey/75 leading-relaxed">
              We bake our special series using whole, raw seasonal ingredients. Spanning natural organic blueberries, crushed blood orange glaze, and brown butter crusts.
            </p>
          </div>

          {/* Right Side: Perfectly aligned isolated rows (Haushalter visual pattern) */}
          <div className="lg:col-span-7 space-y-8">
            <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#E5C483] block font-bold border-b border-white/10 pb-2">
              Current Seasonal Batches
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {specialFlavors.map((item, index) => {
                const formattedPrice = specialPrices[item.id] ? `— ${specialPrices[item.id]} —` : "— Individual Quote —";
                return (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    key={item.id}
                    className="p-5 bg-white/[0.03] border border-white/5 hover:border-[#E5C483]/30 transition-all duration-300 flex flex-col justify-between text-center rounded-lg"
                  >
                    <div>
                      <h4 className="font-serif text-sm font-light tracking-widest text-[#E5C483] uppercase">
                        {item.name}
                      </h4>
                      <p className="font-sans text-[11px] text-light-grey/70 mt-2 leading-relaxed h-11 overflow-hidden line-clamp-2">
                        {item.description}
                      </p>
                    </div>

                    {/* Highly stylized Haushalter line prices */}
                    <div className="mt-4 pt-4 border-t border-white/5">
                      <span className="font-serif text-xs tracking-widest text-white/90 uppercase block">
                        {formattedPrice}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
      </div>

      {/* SECTION 3: THE FINISHING CONTROLS (Delight & Finishing Menu) */}
      <div className="bg-[#FAF8F4]/60 border border-muted-border/30 p-6 sm:p-12 lg:p-16 relative shadow-[0_8px_30px_rgba(0,0,0,0.015)]">
        <div className="absolute top-4 left-4 right-4 bottom-4 border border-muted-border/10 pointer-events-none"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-center relative z-10">
          
          {/* Left Column: List of 3 aesthetic procedures */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[#C29D53]">
                <Sparkles className="w-4 h-4" />
                <span className="font-sans text-[10px] tracking-[0.25em] uppercase font-bold">
                  03 / Aesthetic Finishings
                </span>
              </div>
              <h3 className="font-serif text-3xl sm:text-4xl font-light tracking-tight text-primary-black uppercase">
                CAKE FINISHING CONTROLS
              </h3>
              <p className="font-sans text-xs text-medium-grey max-w-md">
                We sculpture the structural outer walls of our celebration pieces in three professional formats tailored to your venue conditions.
              </p>
            </div>

            <div className="space-y-6 pt-4">
              {finishingOptions.map((opt, index) => (
                <div key={index} className="flex gap-4 border-b border-muted-border/20 pb-5 last:border-0 last:pb-0">
                  <span className="text-sm font-serif font-light text-[#C29D53] select-none mt-1">
                    0{index + 1}.
                  </span>
                  <div>
                    <h5 className="font-sans text-xs font-bold tracking-widest uppercase text-primary-black">
                      {opt.name}
                    </h5>
                    <p className="font-sans text-[11px] text-charcoal/85 leading-relaxed mt-1">
                      {opt.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Double Border Photo Frame */}
          <div className="lg:col-span-5">
            <div className="relative p-2 border border-muted-border/40 bg-white shadow-md group overflow-hidden">
              <div className="absolute inset-4 border border-[#C29D53]/15 pointer-events-none z-10"></div>
              <div className="aspect-square sm:aspect-[4/3] lg:aspect-[3/4] overflow-hidden bg-[#FAF8F4]">
                <img
                  src={finishingArtImg}
                  alt="Pastry designer piping premium frosting details"
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-1000"
                  referrerPolicy="no-referrer"
                />
                
                {/* Floating graphic insignia */}
                <div className="absolute top-4 right-4 bg-white border border-muted-border rounded-full w-14 h-14 flex items-center justify-center p-1 text-[#C29D53] rotate-12 group-hover:rotate-45 transition-transform duration-700">
                  <div className="border border-dashed border-[#C29D53]/40 rounded-full w-full h-full flex items-center justify-center">
                    <Check className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
