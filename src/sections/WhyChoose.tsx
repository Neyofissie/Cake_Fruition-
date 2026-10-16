import { motion } from "motion/react";
import Reveal, { stagger } from "../components/Reveal";
import SectionLabel from "../components/SectionLabel";
import FeatureCard from "../components/FeatureCard";
import { RotatingBadge } from "../components/Motifs";
import { FEATURES } from "../lib/content";

export default function WhyChoose() {
  return (
    <section aria-labelledby="why-title" className="relative overflow-hidden bg-soft-black py-24 text-off-white sm:py-32">
      <div className="mx-auto grid max-w-[90rem] gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:px-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <SectionLabel tone="light">Why Cake Fruition</SectionLabel>
              <h2 id="why-title" className="display mt-7 text-[3rem] sm:text-[4.2rem]">
                Why Choose <span className="block italic text-off-white/80">Cake Fruition</span>
              </h2>
              <p className="mt-6 max-w-md leading-relaxed text-off-white/70">
                Thoughtful design, generous flavour and a warm, reliable service from first message to final slice.
              </p>
            </Reveal>
            <Reveal delay={0.15} className="mt-12 hidden h-36 w-36 lg:block">
              <RotatingBadge tone="light" text="Made to be enjoyed · Made to impress · " className="h-full w-full" />
            </Reveal>
          </div>
        </div>

        <motion.ul
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          className="border-b border-off-white/15 lg:col-span-7"
        >
          {FEATURES.map((feature, i) => (
            <FeatureCard key={feature} index={i} text={feature} />
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
