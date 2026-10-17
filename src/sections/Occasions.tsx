import { motion } from "motion/react";
import Reveal, { stagger } from "../components/Reveal";
import SectionLabel from "../components/SectionLabel";
import ServiceCard from "../components/ServiceCard";
import { OCCASIONS } from "../lib/content";

export default function Occasions() {
  return (
    <section id="occasions" aria-labelledby="occasions-title" className="border-y border-muted-border bg-light-grey/40 py-24 sm:py-32">
      <div className="mx-auto max-w-[90rem] px-5 sm:px-8 lg:px-12">
        <Reveal className="mx-auto max-w-2xl text-center">
          <SectionLabel align="center">Occasions</SectionLabel>
          <h2 id="occasions-title" className="display mt-7 text-[2.9rem] sm:text-[4rem]">
            A Cake for <span className="italic">Every Celebration</span>
          </h2>
          <p className="mt-6 leading-relaxed text-charcoal/80">
            Whatever you&rsquo;re celebrating, we design around the moment. Tap any occasion to start a conversation.
          </p>
        </Reveal>

        <motion.ul
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5"
        >
          {OCCASIONS.map((occasion, i) => (
            <ServiceCard key={occasion.title} index={i + 1} {...occasion} />
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
