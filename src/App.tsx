import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Instagram, 
  Facebook, 
  Cake, 
  Palette, 
  Clock, 
  ArrowUpRight, 
  MessageSquare, 
  CornerDownRight,
  Star, 
  Sparkles, 
  ChefHat, 
  Check, 
  ArrowRight,
  ShieldCheck,
  ChevronDown,
  Info
} from "lucide-react";

import Header from "./components/Header";
import Logo from "./components/Logo";
import SectionLabel from "./components/SectionLabel";
import CTAButton from "./components/CTAButton";
import CakeMenuCard from "./components/CakeMenuCard";
import ServiceCard from "./components/ServiceCard";
import GalleryGrid from "./components/GalleryGrid";
import AICakePlanner from "./components/AICakePlanner";

// Image Imports
import heroImage from "./assets/images/regenerated_image_1780489996759.png";
import aboutImg1 from "./assets/images/regenerated_image_1780489999068.jpg";
import aboutImg2 from "./assets/images/regenerated_image_1780490000001.jpg";
import aboutImg3 from "./assets/images/regenerated_image_1780490000666.jpg";
import aboutImg4 from "./assets/images/regenerated_image_1780490001382.jpg";

// Data Imports
import { 
  BRAND_PILLARS, 
  POPULAR_FLAVORS, 
  SPECIAL_FLAVORS, 
  FINISHING_OPTIONS, 
  OCCASIONS, 
  GALLERY_ITEMS, 
  ORDER_STEPS, 
  LUXURY_FEATURES 
} from "./data";

export default function App() {
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  const handleExploreOccasion = (title: string) => {
    const aiPlannerElement = document.querySelector("#ai-planner");
    if (aiPlannerElement) {
      aiPlannerElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const faqs = [
    {
      q: "How far in advance should I place my cake order?",
      a: "We recommend booking at least 5 to 7 days in advance for custom celebration cakes, and 2 to 3 months for elaborate wedding masterpieces. This ensures we can secure your slot and prepare standard artisanal supplies."
    },
    {
      q: "Can I customize the flavor combinations of my cake tiers?",
      a: "Absolutely! We love bespoke crafting. You can mix and match any of our popular or special flavors, or specify Marble choices. Each tier of a multi-tiered cake can have entirely unique filling and flavor properties."
    },
    {
      q: "Do you offer delivery or just studio pick-up?",
      a: "We offer secure, hand-carried delivery for wedding cakes and large delicate multi-tiered celebrations across our standard region. For smaller custom cakes, studio pick-up is fully supported into signature high-end windowed carrier packaging."
    }
  ];

  return (
    <div className="bg-off-white min-h-screen text-primary-black selection:bg-primary-black selection:text-off-white antialiased">
      <Header />

      {/* 1. HERO SECTION */}
      <section id="home" className="relative pt-24 sm:pt-28 min-h-screen flex items-center overflow-hidden bg-off-white pb-16 sm:pb-24">
        {/* Subtle dot-pattern background */}
        <div className="absolute inset-0 opacity-[0.03] editorial-dot-divider pointer-events-none"></div>

        {/* Decorative thin aesthetic lines */}
        <div className="absolute top-0 left-1/4 h-full w-[1px] bg-muted-border/30 hidden md:block"></div>
        <div className="absolute top-0 left-3/4 h-full w-[1px] bg-muted-border/30 hidden md:block"></div>

        <div className="w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-center relative z-10">
          
          {/* Hero Left Column Text */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-left">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 border border-muted-border px-3.5 py-1 text-[10px] tracking-widest uppercase text-medium-grey bg-white/45"
            >
              <Sparkles className="w-3.5 h-3.5 grayscale" />
              <span>Creating Sweet Moments, One Cake at a Time</span>
            </motion.div>

            <div className="space-y-4">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="font-serif text-5xl sm:text-6xl md:text-7xl font-extralight tracking-tight leading-[1.08] text-primary-black"
              >
                Custom Cakes <br />
                <span className="font-light italic text-medium-grey">for Beautiful</span> <br />
                Celebrations
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.25 }}
                className="font-sans text-sm sm:text-base text-charcoal/90 leading-relaxed max-w-xl"
              >
                Freshly baked, beautifully designed cakes made to order for weddings, birthdays, baby showers, events, and life's sweetest custom moments.
              </motion.p>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 pt-2"
            >
              <CTAButton
                href="https://wa.me/447847996397"
                label="Order on WhatsApp"
                icon={MessageSquare}
                variant="primary"
              />
              <CTAButton
                onClick={() => {
                  const el = document.querySelector("#menu");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
                label="View Cake Menu"
                variant="outline"
              />
            </motion.div>

            {/* Quick Metrics display */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.65 }}
              className="grid grid-cols-3 gap-6 pt-10 sm:pt-14 border-t border-muted-border/55 max-w-lg"
            >
              <div>
                <span className="font-serif text-2xl sm:text-3xl font-light text-primary-black">100%</span>
                <span className="block font-sans text-[10px] tracking-wider uppercase text-medium-grey mt-1">Fresh Bake</span>
              </div>
              <div>
                <span className="font-serif text-2xl sm:text-3xl font-light text-primary-black">Bespoke</span>
                <span className="block font-sans text-[10px] tracking-wider uppercase text-medium-grey mt-1">Theme Designs</span>
              </div>
              <div>
                <span className="font-serif text-2xl sm:text-3xl font-light text-primary-black">4.9★</span>
                <span className="block font-sans text-[10px] tracking-wider uppercase text-medium-grey mt-1">Direct Love</span>
              </div>
            </motion.div>
          </div>

          {/* Hero Right Column Image display */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.0, ease: "easeOut", delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            {/* Elegant luxury background element */}
            <div className="absolute inset-4 border border-white/40 pointer-events-none z-10"></div>
            <div className="absolute -inset-2 border border-muted-border/40 pointer-events-none"></div>

            <div className="aspect-[3/4] overflow-hidden bg-off-white border border-muted-border">
              <img
                src={heroImage}
                alt="Bespoke luxury wedding cake creation"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover hover:scale-[1.02] transition-all duration-1000"
              />
            </div>

            {/* Floating stamp or label bottom-left */}
            <div className="absolute -bottom-6 -left-6 bg-soft-black text-white p-5 shadow-xl hidden sm:block pointer-events-none border border-muted-border/20">
              <span className="font-serif text-xs tracking-wider block italic font-light">"Handcrafted with passion"</span>
              <span className="block font-sans text-[8px] uppercase tracking-[0.3em] text-medium-grey mt-1">Cape Fruition Studio</span>
            </div>
          </motion.div>
          
        </div>
      </section>

      {/* 2. ABOUT OUR STUDIO SECTION */}
      <section id="about" className="py-20 sm:py-28 bg-white border-t border-b border-muted-border/40">
        <div className="max-w-7xl mx-auto px-6">
          <SectionLabel
            label="Since 2024 / Heritage"
            title="Baked with Love, Designed to Impress"
            subtitle="Cake Fruition brings creativity, quality, and passion together to create unforgettable cakes and premium desserts."
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 items-center">
            
            {/* Fine design grid illustrations */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="space-y-4">
                <div className="aspect-[4/5] overflow-hidden bg-off-white border border-muted-border">
                  <img
                    src={aboutImg1}
                    alt="Artisan baker decorating celebration cake layers"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-square overflow-hidden bg-off-white border border-muted-border">
                  <img
                    src={aboutImg2}
                    alt="Bespoke custom white chocolate gourmet cupcakes"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="pt-8 space-y-4">
                <div className="aspect-square overflow-hidden bg-off-white border border-muted-border">
                  <img
                    src={aboutImg3}
                    alt="Elegant handcrafted cakes with detailed frosting casing"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-[4/5] overflow-hidden bg-off-white border border-muted-border">
                  <img
                    src={aboutImg4}
                    alt="Artisan culinary designing workspace with gold leaf folds"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </motion.div>

            {/* Pillar Descriptions & Info */}
            <div className="space-y-8 sm:space-y-10">
              <div className="space-y-4 text-charcoal">
                <p className="font-sans text-sm sm:text-base leading-relaxed">
                  Every luxury cake is freshly baked to order using fine local ingredients, soft moist sponge layouts, and delicious flavour-matching cream fillings. From elegant sweeping multi-tiered wedding cakes to joyful birthday centerpieces, every design detail is tailored directly around your celebration.
                </p>
                <p className="font-sans text-xs sm:text-sm leading-relaxed text-medium-grey">
                  We believe that celebration centerpieces should taste as divine as they look. Our recipes contain low-sugar buttercream refinements, premium cocoa bean layers, and rich candied citrus pairings for a perfectly balanced slice of culinary luxury.
                </p>
              </div>

              {/* Pillars list layout */}
              <div className="space-y-6">
                {BRAND_PILLARS.map((pillar, idx) => (
                  <motion.div
                    key={pillar.title}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="flex gap-4 border border-muted-border/30 p-5 bg-off-white/40 group hover:border-primary-black hover:bg-white transition-all duration-300"
                  >
                    <div className="w-10 h-10 border border-muted-border bg-white text-primary-black flex items-center justify-center flex-shrink-0 group-hover:bg-primary-black group-hover:text-white group-hover:border-primary-black transition-all">
                      {idx === 0 && <ChefHat className="w-4.5 h-4.5" />}
                      {idx === 1 && <Palette className="w-4.5 h-4.5" />}
                      {idx === 2 && <Clock className="w-4.5 h-4.5" />}
                    </div>
                    <div>
                      <h4 className="font-sans text-xs font-semibold tracking-widest uppercase text-primary-black">
                        {pillar.title}
                      </h4>
                      <p className="font-sans text-xs text-charcoal/90 mt-1 leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. CAKE MENU SECTION */}
      <section id="menu" className="py-20 sm:py-28 bg-off-white relative">
        <div className="absolute inset-0 opacity-[0.015] editorial-dot-divider pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto">
          <SectionLabel
            label="Artisan Ingredients / Options"
            title="Our Curated Cake Menu"
            subtitle="Explore our catalog of popular layered flavors, custom seasonal specials, and beautiful structural details."
          />

          <CakeMenuCard
            popularFlavors={POPULAR_FLAVORS}
            specialFlavors={SPECIAL_FLAVORS}
            finishingOptions={FINISHING_OPTIONS}
          />

          {/* Prompt banner CTA direct ordering */}
          <div className="text-center mt-12 px-4 relative z-10">
            <span className="font-sans text-[10px] tracking-[0.2em] text-medium-grey uppercase block mb-3">
              Ready to construct your flavor profile?
            </span>
            <div className="flex justify-center gap-4">
              <CTAButton
                href="https://wa.me/447847996397?text=Hi%20Cake%20Fruition!%20I'm%20viewing%20your%20flavours%20menu%20and%20would%20love%20to%20discuss%20a%20custom%20order."
                label="Discuss Flavor Profiles"
                icon={MessageSquare}
                variant="primary"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 4. SERVICES / OCCASIONS SECTION */}
      <section id="occasions" className="py-20 sm:py-28 bg-white border-t border-b border-muted-border/40">
        <div className="max-w-7xl mx-auto px-6">
          <SectionLabel
            label="Tailored Experiences / Shapes"
            title="Life's Sweetest Milestones"
            subtitle="Every life milestone holds a signature visual identity. Discover how we tailor culinary aesthetics from weddings to intimate showers."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {OCCASIONS.map((card, idx) => (
              <ServiceCard
                key={card.id}
                card={card}
                index={idx}
                onExplore={handleExploreOccasion}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE FEATURE: AI Bespoke Cake Planner */}
      <section id="ai-planner" className="py-20 sm:py-28 bg-off-white/80 border-b border-muted-border/30 relative">
        <div className="absolute inset-0 opacity-[0.02] editorial-dot-divider pointer-events-none"></div>
        <div className="max-w-7xl mx-auto">
          <SectionLabel
            label="Luxury Digital Consultant"
            title="Bespoke Cake Configurator"
            subtitle="Collaborate on a custom creation. Formulate dimensions, flavor balance, and decorative elements with professional AI precision."
          />

          <AICakePlanner />
        </div>
      </section>

      {/* 6. GALLERY SHOWCASE SECTION */}
      <section id="gallery" className="py-20 sm:py-28 bg-white border-b border-muted-border/30">
        <div className="max-w-7xl mx-auto px-6">
          <SectionLabel
            label="Selected Portfolios / Studio Display"
            title="The Cake Fruition Gallery"
            subtitle="Peruse our signature showcase archives, capturing modern rustic geometry, pristine floral tiers, and whimsical birthday alignments."
          />

          <GalleryGrid items={GALLERY_ITEMS} />
        </div>
      </section>

      {/* 7. ORDER PROCESS SECTION */}
      <section id="order" className="py-20 sm:py-28 bg-off-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <SectionLabel
            label="Simplified Booking journey"
            title="How to Order Your Dream Cake"
            subtitle="We ensure that securing pristine celebration centerpieces is completely stress-free and highly predictable."
          />

          {/* Steps Timeline Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {ORDER_STEPS.map((step, idx) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="bg-white border border-muted-border p-6 relative flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-baseline justify-between mb-4 pb-3 border-b border-muted-border/30">
                    <span className="font-serif text-3xl font-light italic text-medium-grey">
                      0{step.number}
                    </span>
                    <span className="font-sans text-[8px] uppercase tracking-widest text-medium-grey">
                      Step {step.number}
                    </span>
                  </div>
                  <h4 className="font-sans text-sm font-semibold tracking-widest uppercase text-primary-black mb-2">
                    {step.title}
                  </h4>
                  <p className="font-sans text-xs text-charcoal/85 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="pt-6 mt-4 border-t border-muted-border/20 flex justify-end">
                  <CornerDownRight className="w-3.5 h-3.5 text-medium-grey" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Booking CTA Button Box */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.99 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="border border-muted-border bg-[#0B0B0B] text-[#FAF8F4] p-8 sm:p-12 md:p-14 mt-16 max-w-5xl mx-auto text-center space-y-6 relative overflow-hidden"
          >
            {/* Stamp / Decorative lines in Dark box */}
            <div className="absolute inset-2 border border-white/5 pointer-events-none"></div>

            <div className="flex justify-center text-medium-grey">
              <Star className="w-6 h-6 animate-[pulse_3s_infinite]" />
            </div>

            <h3 className="font-serif text-3xl sm:text-4.5xl font-light tracking-tight text-white max-w-xl mx-auto leading-tight">
              Start Your Custom Cake Order on WhatsApp
            </h3>

            <p className="font-sans text-xs sm:text-sm text-light-grey max-w-lg mx-auto leading-relaxed">
              Message us directly with your event date, serving guests, and theme ideas. We respond with pricing options and arrange custom design details immediately.
            </p>

            <div className="pt-2">
              <CTAButton
                href="https://wa.me/447847996397"
                label="Launch Instant Cake Enquiry"
                icon={MessageSquare}
                variant="white"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* 8. LUXURY WHY CHOOSE US FEATURES */}
      <section className="py-20 sm:py-28 bg-white border-t border-b border-muted-border/40">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-center">
          
          {/* Highlights Left text */}
          <div className="lg:col-span-5 space-y-6">
            <span className="font-sans text-[10px] tracking-[0.25em] text-medium-grey uppercase font-semibold block">
              Pure Uncompromising Quality
            </span>
            <h3 className="font-serif text-3.5xl sm:text-4.5xl font-light tracking-tight text-primary-black leading-tight">
              Why Discerning Clients Choose Cake Fruition
            </h3>
            <p className="font-sans text-xs sm:text-sm text-charcoal/95 leading-relaxed">
              We look beyond basic baking. At Cake Fruition, we view sugar, chocolate, and buttercream as premium sculptural layers. Every cake is crafted with structural precision, flavor integrity, and modern lifestyle concepts to ensure a luxurious addition to high-end celebrations.
            </p>
            <div className="pt-2">
              <CTAButton
                href="https://wa.me/447847996397?text=Hi%20Cake%20Fruition!%20I'm%20curious%20about%20booking%20a%20bespoke%20celebration%20with%20your%20bakery."
                label="Enquire on WhatsApp"
                icon={MessageSquare}
                variant="outline"
              />
            </div>
          </div>

          {/* Highlights Right bullet cards */}
          <div className="lg:col-span-7 space-y-4">
            {LUXURY_FEATURES.map((feat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="flex items-start gap-4 border-b border-muted-border/30 pb-4"
              >
                <div className="w-5 h-5 rounded-full border border-primary-black flex items-center justify-center flex-shrink-0 text-primary-black mt-0.5">
                  <Check className="w-3 h-3 stroke-[2.5]" />
                </div>
                <span className="font-sans text-xs sm:text-sm text-charcoal leading-relaxed">
                  {feat}
                </span>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 9. THEME FAQ SECTION */}
      <section className="py-20 sm:py-28 bg-[#FAF8F4] overflow-hidden">
        <div className="max-w-4xl mx-auto px-6">
          <SectionLabel
            label="Common Client Queries"
            title="Studio FAQs"
            subtitle="Answers to standard questions regarding cake preparation, customization, and slot scheduling."
          />

          <div className="border border-muted-border bg-white divide-y divide-muted-border">
            {faqs.map((faq, index) => (
              <div key={index} className="p-6">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between text-left font-sans font-semibold text-xs sm:text-sm uppercase tracking-wider text-primary-black focus:outline-none focus:text-medium-grey transition-colors"
                  aria-expanded={activeFAQ === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 ml-4 transition-transform duration-300 ${activeFAQ === index ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {activeFAQ === index && (
                    <motion.div
                      id={`faq-answer-${index}`}
                      initial={{ height: 0, opacity: 0, marginTop: 0 }}
                      animate={{ height: "auto", opacity: 1, marginTop: 12 }}
                      exit={{ height: 0, opacity: 0, marginTop: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="font-sans text-xs sm:text-sm text-charcoal/85 leading-relaxed pl-1">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. SOCIAL MEDIA SECTION */}
      <section className="py-20 sm:py-24 bg-white border-t border-muted-border/40 text-center">
        <div className="max-w-4xl mx-auto px-6 space-y-6">
          <span className="font-sans text-[10px] tracking-[0.25em] text-medium-grey uppercase font-semibold block">
            Digital Portfolios / Social Studio
          </span>
          <h3 className="font-serif text-3xl sm:text-4.5xl font-light tracking-tight text-primary-black">
            Follow Cake Fruition
          </h3>
          <p className="font-sans text-xs sm:text-sm text-charcoal/90 max-w-xl mx-auto leading-relaxed">
            See our newest custom creations, celebratory wedding cakes, customer reviews, and delightful behind-the-scenes moments from our design studio.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <CTAButton
              href="https://www.instagram.com/cakefruition/"
              label="Instagram"
              icon={Instagram}
              variant="outline"
            />
            <CTAButton
              href="https://www.facebook.com/profile.php?id=61573849115966&ref=PROFILE_EDIT_xav_ig_profile_page_web#"
              label="Facebook"
              icon={Facebook}
              variant="outline"
            />
          </div>
        </div>
      </section>

      {/* 11. FOOTER AND FINAL WORDMARK */}
      <footer className="bg-primary-black text-[#FAF8F4] pt-16 pb-8 border-t border-muted-border/10 relative overflow-hidden">
        {/* Subtle decorative background motif */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-medium-grey/40 to-transparent"></div>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-10 border-b border-muted-border/10 pb-12">
          
          {/* Logo tagline column */}
          <div className="md:col-span-5 space-y-4">
            <Logo variant="horizontal" theme="dark" size="md" />
            <p className="font-sans text-xs text-light-grey leading-relaxed max-w-sm">
              Creating Sweet Moments, One Cake at a Time. Freshly baked bespoke celebration cakes styled with luxury and passion.
            </p>
          </div>

          {/* Quick Indices column */}
          <div className="grid grid-cols-2 md:col-span-4 gap-6">
            <div className="space-y-3.5">
              <h5 className="font-sans text-[10px] tracking-widest uppercase text-medium-grey font-bold">
                Navigation
              </h5>
              <ul className="space-y-2 text-xs font-sans text-light-grey/85">
                <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
                <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#menu" className="hover:text-white transition-colors">Cake Menu</a></li>
                <li><a href="#gallery" className="hover:text-white transition-colors">Gallery</a></li>
              </ul>
            </div>
            <div className="space-y-3.5">
              <h5 className="font-sans text-[10px] tracking-widest uppercase text-medium-grey font-bold">
                Order Brief
              </h5>
              <ul className="space-y-2 text-xs font-sans text-light-grey/85">
                <li><a href="#order" className="hover:text-white transition-colors">How To Order</a></li>
                <li><a href="#ai-planner" className="hover:text-white transition-colors">AI Cake Planner</a></li>
                <li><a href="https://wa.me/447847996397" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">WhatsApp Direct</a></li>
              </ul>
            </div>
          </div>

          {/* Contact coordinates column */}
          <div className="md:col-span-3 space-y-3.5">
            <h5 className="font-sans text-[10px] tracking-widest uppercase text-medium-grey font-bold">
              WhatsApp Support
            </h5>
            <p className="font-sans text-xs text-light-grey leading-safe">
              Direct: +44 7847 996397 <br />
              Location: United Kingdom Studio
            </p>
            <div className="pt-2">
              <a
                href="https://wa.me/447847996397"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 border border-white text-[10px] uppercase tracking-widest text-white hover:bg-white hover:text-primary-black transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                Message Developer Channel
              </a>
            </div>
          </div>

        </div>

        {/* Lower copyright bar */}
        <div className="max-w-7xl mx-auto px-6 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-sans text-medium-grey">
          <p>© 2026 Cake Fruition. All rights reserved. Made for premium celebrations.</p>
          <div className="flex gap-6">
            <a href="https://www.instagram.com/cakefruition/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
              <Instagram className="w-3 h-3" />
              Instagram
            </a>
            <a href="https://www.facebook.com/profile.php?id=61573849115966&ref=PROFILE_EDIT_xav_ig_profile_page_web#" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
              <Facebook className="w-3 h-3" />
              Facebook
            </a>
          </div>
        </div>

      </footer>

    </div>
  );
}
