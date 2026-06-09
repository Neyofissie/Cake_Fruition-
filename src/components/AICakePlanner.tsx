import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CakePlannerParams, CakePlannerResponse } from "../types";
import { Sparkles, Cake, MessageSquare, Copy, Check, Info, Loader2 } from "lucide-react";
import CTAButton from "./CTAButton";

export default function AICakePlanner() {
  const [params, setParams] = useState<CakePlannerParams>({
    occasion: "Birthday",
    servings: 25,
    flavors: "Vanilla Cream Sponge",
    style: "Minimalist Luxury",
    additionalInfo: ""
  });

  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [proposal, setProposal] = useState<CakePlannerResponse | null>(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadingPhrases = [
    "Opening the Cake Fruition sketchbook...",
    "Calculating physical structural ratios...",
    "Formulating flavor pairing enhancements...",
    "Drafting modern monochrome textures...",
    "Polishing the final luxury bespoke presentation..."
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (loading) {
      interval = setInterval(() => {
        setLoadingStep((prev) => (prev + 1) % loadingPhrases.length);
      }, 2000);
    } else {
      setLoadingStep(0);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setProposal(null);
    setError(null);

    try {
      const res = await fetch("/api/cake-planner", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(params)
      });
      if (!res.ok) {
        throw new Error("Our digital bakers are currently busy. Please check your secrets are active, or try again later.");
      }
      const data = await res.json();
      setProposal(data);
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "Failed to reach AI Cake Designer. Ensure your environment has GEMINI_API_KEY set.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!proposal) return;
    navigator.clipboard.writeText(proposal.whatsappSummary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const occasionOptions = [
    "Birthday",
    "Wedding",
    "Baby Shower",
    "Anniversary",
    "Corporate Event",
    "Custom Celebration"
  ];

  const flavorOptions = [
    "Vanilla Cream Sponge",
    "Chocolate Delight",
    "Cookies & Cream",
    "Red Velvet",
    "Carrot Cake & Spices",
    "Lemon & Blueberry Fresh",
    "Orange & Cinnamon Infused",
    "Caramel Peanut Delight",
    "Biscoff or Lotus Cookie Crumble"
  ];

  const styleOptions = [
    "Minimalist Luxury (Sleek monochrome, raw stone, clean ridges)",
    "Rustic Buttercream (Naked, soft palette, floral details)",
    "Drip Elegant (Modern drizzles, glossy, chocolate curls)",
    "Fondant Sleek (Prestige corners, sculptural folds, geometric details)",
    "Floral Artisan (Botanical highlights, detailed piping, romantic accents)"
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white border border-muted-border p-6 sm:p-10 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.02)] relative overflow-hidden">
        
        {/* Motif background corner lines */}
        <div className="absolute top-0 right-0 w-32 h-32 border-b border-l border-muted-border/30 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 border-t border-r border-muted-border/30 pointer-events-none"></div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 pb-6 border-b border-muted-border/40 relative z-10">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-medium-grey">
              <Sparkles className="w-4.5 h-4.5 grayscale" />
              <span className="text-[10px] sm:text-xs tracking-[0.25em] uppercase font-sans">Interactive Custom Experience</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3.5xl font-light tracking-tight text-primary-black">
              Bespoke AI Cake Planner
            </h3>
            <p className="font-sans text-xs text-charcoal max-w-lg leading-relaxed">
              Design a masterpiece with professional assistance. Enter your occasion specifications below and watch the artificial design engine outline perfect sizing, tier geometry, flavor palettes, and a direct WhatsApp quote script.
            </p>
          </div>
          <div className="flex-shrink-0">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary-black text-white text-[10px] uppercase tracking-widest font-sans font-medium">
              Live AI Assist
            </span>
          </div>
        </div>

        {/* Form to submit to AI */}
        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Occasion Selection */}
            <div className="space-y-2">
              <label className="block text-[11px] uppercase tracking-[0.15em] font-sans font-medium text-primary-black">
                Occasion Celebration
              </label>
              <select
                value={params.occasion}
                onChange={(e) => setParams({ ...params, occasion: e.target.value })}
                className="w-full bg-off-white border border-muted-border p-3 text-xs sm:text-sm text-primary-black focus:outline-none focus:border-primary-black rounded-none appearance-none"
                style={{ backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none' stroke='black' stroke-width='1.5' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5'/></svg>")`, backgroundPosition: "calc(100% - 12px) center", backgroundRepeat: "no-repeat", backgroundSize: "12px" }}
              >
                {occasionOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            {/* Serving Size Selection */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="block text-[11px] uppercase tracking-[0.15em] font-sans font-medium text-primary-black">
                  Serving Count Scale
                </label>
                <span className="text-xs font-sans font-semibold text-primary-black">
                  {params.servings} guests
                </span>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="10"
                  max="250"
                  step="5"
                  value={params.servings}
                  onChange={(e) => setParams({ ...params, servings: parseInt(e.target.value) })}
                  className="w-full accent-primary-black border-none"
                />
                <span className="font-sans text-[10px] text-medium-grey bg-light-grey/40 px-2 py-1 select-none">
                  {params.servings <= 30 ? "Single Tier" : params.servings <= 65 ? "Double Tiers" : "Prestige 3+ Tiers"}
                </span>
              </div>
            </div>

            {/* Flavor selection */}
            <div className="space-y-2">
              <label className="block text-[11px] uppercase tracking-[0.15em] font-sans font-medium text-primary-black">
                Preferred Flavor Base
              </label>
              <select
                value={params.flavors}
                onChange={(e) => setParams({ ...params, flavors: e.target.value })}
                className="w-full bg-off-white border border-muted-border p-3 text-xs sm:text-sm text-primary-black focus:outline-none focus:border-primary-black rounded-none appearance-none"
                style={{ backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none' stroke='black' stroke-width='1.5' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5'/></svg>")`, backgroundPosition: "calc(100% - 12px) center", backgroundRepeat: "no-repeat", backgroundSize: "12px" }}
              >
                {flavorOptions.map((f) => (
                  <option key={f} value={f}>{f}</option>
                ))}
              </select>
            </div>

            {/* Design Style Selector */}
            <div className="space-y-2">
              <label className="block text-[11px] uppercase tracking-[0.15em] font-sans font-medium text-primary-black">
                Visual Aesthetic Style
              </label>
              <select
                value={params.style}
                onChange={(e) => setParams({ ...params, style: e.target.value })}
                className="w-full bg-off-white border border-muted-border p-3 text-xs sm:text-sm text-primary-black focus:outline-none focus:border-primary-black rounded-none appearance-none"
                style={{ backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none' stroke='black' stroke-width='1.5' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5'/></svg>")`, backgroundPosition: "calc(100% - 12px) center", backgroundRepeat: "no-repeat", backgroundSize: "12px" }}
              >
                {styleOptions.map((st) => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
            </div>

          </div>

          {/* Additions Text Area */}
          <div className="space-y-2">
            <label className="block text-[11px] uppercase tracking-[0.15em] font-sans font-medium text-primary-black">
              Special Theme Requirements & Notes (Optional)
            </label>
            <textarea
              rows={3}
              placeholder="E.g., I'm designing a baby shower with a white and gold neutral cloud theme. High contrast accents, maybe edible gold leaf cascades on the borders."
              value={params.additionalInfo}
              onChange={(e) => setParams({ ...params, additionalInfo: e.target.value })}
              className="w-full bg-off-white border border-muted-border p-3 text-xs sm:text-sm text-primary-black focus:outline-none focus:border-primary-black rounded-none resize-none"
            />
          </div>

          <div className="flex items-center justify-between pt-4">
            <span className="text-[10px] text-medium-grey flex items-center gap-1 select-none">
              <Info className="w-3 h-3 text-charcoal" />
              Saves choices instantly to clipboard summaries
            </span>
            <CTAButton
              disabled={loading}
              label={loading ? "Drafting Design Idea..." : "Formulate Bespoke Cake Idea"}
              icon={Sparkles}
              variant="primary"
            />
          </div>
        </form>

        {/* LOADING ANIMATED OVERLAY */}
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-white/95 z-50 flex flex-col items-center justify-center text-center p-6"
            >
              <div className="w-20 h-20 relative flex items-center justify-center">
                <div className="absolute inset-0 border-2 border-dashed border-medium-grey/25 rounded-full animate-[spin_12s_linear_infinite]"></div>
                <Loader2 className="w-8 h-8 text-primary-black animate-spin" />
              </div>
              <motion.p
                key={loadingStep}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="font-serif text-lg tracking-wide text-primary-black italic mt-6"
              >
                {loadingPhrases[loadingStep]}
              </motion.p>
              <p className="font-sans text-[10px] text-medium-grey tracking-widest uppercase mt-2">
                Crafting Culinary Geometry
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ERROR STATE */}
        {error && (
          <div className="bg-red-50/50 border border-red-200 p-4 mt-8 flex items-start gap-3">
            <Info className="w-4 h-4 text-red-600 mt-0.5" />
            <div className="text-xs text-red-700 leading-relaxed">
              <p className="font-semibold">Bespoke Design Channel Temporarily Closed</p>
              <p>{error}</p>
            </div>
          </div>
        )}

        {/* GENERATED RESULTS SHEET */}
        <AnimatePresence>
          {proposal && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mt-12 pt-10 border-t border-muted-border relative"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                
                {/* Result Card Grid Column left */}
                <div className="md:col-span-7 space-y-6">
                  <div className="border border-muted-border/60 bg-off-white/40 p-6 sm:p-8 space-y-5">
                    <div>
                      <span className="font-sans text-[9px] tracking-[0.25em] text-medium-grey uppercase font-medium">Bespoke Proposal</span>
                      <h4 className="font-serif text-2xl sm:text-3xl font-light text-primary-black tracking-tight mt-1">
                        {proposal.designName}
                      </h4>
                    </div>

                    <p className="font-sans text-xs sm:text-sm text-charcoal/95 italic leading-relaxed border-l-2 border-primary-black pl-4">
                      "{proposal.conceptDescription}"
                    </p>

                    <div className="space-y-4 pt-2">
                      <div className="space-y-1">
                        <h5 className="font-sans text-[10px] tracking-widest uppercase text-medium-grey font-semibold">Recommended Geometry & Tiers</h5>
                        <p className="font-serif text-sm text-primary-black">{proposal.sizingTiering}</p>
                      </div>
                      <div className="space-y-1">
                        <h5 className="font-sans text-[10px] tracking-widest uppercase text-medium-grey font-semibold">Flavor Harmony Alignments</h5>
                        <p className="font-sans text-xs text-charcoal/95 leading-relaxed">{proposal.flavorHarmony}</p>
                      </div>
                      <div className="space-y-1">
                        <h5 className="font-sans text-[10px] tracking-widest uppercase text-medium-grey font-semibold">Luxury Finishes & Accents</h5>
                        <p className="font-sans text-xs text-charcoal/95 leading-relaxed">{proposal.finishingDetails}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* WhatsApp Text block column right */}
                <div className="md:col-span-5 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <span className="font-sans text-[10px] tracking-[0.2em] text-medium-grey uppercase font-semibold block">
                      Enquiry Messenger Script
                    </span>
                    <p className="font-sans text-xs text-charcoal leading-relaxed">
                      We've formatted the perfect reservation brief detailing ingredients, sizes, and decorations. Copy this text block or click the direct launch button to message Cake Fruition on WhatsApp!
                    </p>

                    {/* Pre-written message scroll box */}
                    <div className="border border-muted-border bg-[#FDFDFD] p-4 font-mono text-[10px] text-charcoal/80 h-44 overflow-y-auto leading-relaxed relative">
                      {proposal.whatsappSummary}
                      <button
                        onClick={handleCopy}
                        className="absolute bottom-2 right-2 bg-white border border-muted-border/70 p-2 text-primary-black hover:bg-primary-black hover:text-white transition-all cursor-pointer"
                        title="Copy Summary"
                      >
                        {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <CTAButton
                      href={`https://wa.me/447847996397?text=${encodeURIComponent(proposal.whatsappSummary)}`}
                      label="Launch WhatsApp Order"
                      icon={MessageSquare}
                      variant="primary"
                      className="w-full text-center"
                    />
                    <button
                      onClick={handleCopy}
                      className="w-full text-center py-2 text-[10px] tracking-[0.15em] font-sans font-medium uppercase text-medium-grey hover:text-primary-black transition-colors border border-dashed border-muted-border hover:border-primary-black"
                    >
                      {copied ? "Copied to Clipboard!" : "Copy Full Details Only"}
                    </button>
                  </div>

                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
