import { motion } from "motion/react";
import Reveal, { stagger } from "../components/Reveal";
import SectionLabel from "../components/SectionLabel";
import CakeMenuCard from "../components/CakeMenuCard";
import FlavourList from "../components/FlavourList";
import CTAButton from "../components/CTAButton";
import { FINISHES, POPULAR_FLAVOURS, SPECIAL_FLAVOURS } from "../lib/content";
import { whatsappLink } from "../lib/site";

export default function Menu() {
  return (
    <section id="menu" aria-labelledby="menu-title" className="bg-off-white py-24 sm:py-32">
      <div className="mx-auto max-w-[90rem] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-7">
            <SectionLabel>The Menu</SectionLabel>
            <h2 id="menu-title" className="display mt-7 text-[3.4rem] sm:text-[4.6rem]">
              Cake Menu
            </h2>
            <p className="mt-6 max-w-xl text-[1.05rem] leading-relaxed text-charcoal/85">
              Choose from classic favourites, indulgent specials, and beautiful finishing options.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="border-l border-ink/20 pl-6 lg:col-span-5">
            <h3 className="font-serif text-[1.9rem] leading-tight">Custom Celebration Cakes</h3>
            <p className="mt-3 leading-relaxed text-charcoal/80">
              Freshly baked, soft and moist cakes made to order, served with delicious flavour-matching cream fillings.
            </p>
          </Reveal>
        </div>

        <motion.div
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          className="mt-16 grid gap-5 lg:grid-cols-12"
        >
          <CakeMenuCard index="i." label="Classic favourites" title="Popular Flavours" badge="Most loved" className="lg:col-span-6">
            <FlavourList items={POPULAR_FLAVOURS} />
          </CakeMenuCard>

          <CakeMenuCard index="ii." label="Indulgent specials" title="Special Flavours" className="lg:col-span-6">
            <FlavourList items={SPECIAL_FLAVOURS} />
          </CakeMenuCard>

          <CakeMenuCard index="iii." label="Two in one" title="Marbled Cakes" tone="dark" badge="Available" className="lg:col-span-5">
            <div className="flex h-full flex-col justify-between gap-8">
              <p className="font-serif text-[1.6rem] leading-snug text-off-white/90">
                Marbled cakes are available &mdash; <span className="italic">mix any two flavours.</span>
              </p>
              <svg viewBox="0 0 240 60" className="w-full text-off-white/40" fill="none" stroke="currentColor" strokeWidth={0.9} aria-hidden>
                <path d="M0 30 C 30 5, 50 55, 80 30 S 130 5, 160 30 S 210 55, 240 30" />
                <path d="M0 38 C 30 13, 50 63, 80 38 S 130 13, 160 38 S 210 63, 240 38" opacity={0.6} />
                <path d="M0 22 C 30 -3, 50 47, 80 22 S 130 -3, 160 22 S 210 47, 240 22" opacity={0.6} />
              </svg>
              <p className="eyebrow text-off-white/60">e.g. Chocolate Delight &times; Vanilla Cream</p>
            </div>
          </CakeMenuCard>

          <CakeMenuCard index="iv." label="The final touch" title="Finishing Options" className="lg:col-span-7">
            <FlavourList items={FINISHES} />
            <p className="mt-10 border-t border-muted-border pt-6 text-[0.95rem] leading-relaxed text-stone">
              Not sure which finish suits your design? Tell us your theme and we&rsquo;ll recommend the best option.
            </p>
          </CakeMenuCard>
        </motion.div>

        <Reveal className="mt-12 flex flex-col items-start justify-between gap-6 border-t border-muted-border pt-8 sm:flex-row sm:items-center">
          <p className="max-w-xl text-[0.95rem] leading-relaxed text-stone">
            Prices vary depending on size, design, filling and decoration. Message us for a personal quote.
          </p>
          <CTAButton
            href={whatsappLink("Hi Cake Fruition! I've looked at your menu and would love a quote for a custom cake.")}
            icon="whatsapp"
          >
            Ask for a Quote
          </CTAButton>
        </Reveal>
      </div>
    </section>
  );
}
