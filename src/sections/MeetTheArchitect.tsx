import { motion } from "motion/react";
import Reveal, { fadeUp, stagger } from "../components/Reveal";
import SectionLabel from "../components/SectionLabel";
import CTAButton from "../components/CTAButton";
import { SparkleIcon } from "../components/Icons";
import { RotatingBadge } from "../components/Motifs";
import { FEATURES } from "../lib/content";
import { cake } from "../lib/images";
import { whatsappLink } from "../lib/site";

const PORTRAIT = cake("architect");

/** Meet the Architect, with the reasons to choose Cake Fruition; one screen tall on desktop. */
export default function MeetTheArchitect() {
  return (
    <section
      id="architect"
      aria-labelledby="architect-title"
      className="relative overflow-hidden bg-ink py-24 text-off-white sm:py-28 lg:flex lg:h-[100svh] lg:min-h-[42rem] lg:items-center lg:pb-10 lg:pt-[6.5rem]"
    >
      <div className="mx-auto grid w-full max-w-[90rem] items-center gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-12 lg:px-12">
        {/* Portrait */}
        <Reveal className="relative mx-auto w-full max-w-[22rem] lg:col-span-4 lg:max-w-none">
          <div className="relative mx-auto aspect-[4/5] w-[86%] lg:h-[min(58vh,34rem)] lg:w-auto">
            <div aria-hidden className="absolute inset-0 -translate-x-4 translate-y-4 rounded-t-full border border-off-white/30" />
            <div className="relative h-full overflow-hidden rounded-t-full bg-charcoal">
              <motion.img
                src={PORTRAIT.src}
                srcSet={PORTRAIT.srcSet}
                sizes="(min-width: 1024px) 28vw, 86vw"
                alt="Mopelola Babalola, founder and cake architect of Cake Fruition, smiling with arms folded"
                loading="lazy"
                decoding="async"
                initial={{ scale: 1.12 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
                className="h-full w-full object-cover object-[50%_25%]"
              />
            </div>
            <div className="absolute -right-8 bottom-[10%] h-24 w-24 rounded-full bg-ink">
              <RotatingBadge tone="light" text="Mopelola · Cake architect · " className="h-full w-full p-1" />
            </div>
          </div>
          <div className="mt-8 text-center">
            <p className="font-serif text-[1.8rem] leading-tight">Mopelola Babalola</p>
            <p className="eyebrow mt-2 text-off-white/60">Founder &amp; Cake Architect</p>
          </div>
        </Reveal>

        {/* Story and why choose us */}
        <div className="lg:col-span-7 lg:col-start-6">
          <Reveal>
            <SectionLabel tone="light">Meet the Architect</SectionLabel>
            <h2 id="architect-title" className="display mt-5 text-[2.8rem] sm:text-[3.8rem] lg:text-[clamp(2.6rem,6.4vh,4rem)]">
              The Hands Behind <span className="italic text-off-white/80">Every Layer</span>
            </h2>
            <p className="mt-5 max-w-2xl leading-[1.75] text-off-white/75 lg:text-[0.95rem]">
              Every Cake Fruition cake is designed and built by Mopelola Babalola, our founder and cake architect. She plans each
              one like a small piece of architecture, from the structure of the tiers to the last sugar petal, so it looks
              beautiful on the table and tastes even better on the plate.
            </p>
          </Reveal>

          <p className="eyebrow mt-8 text-off-white/55 lg:mt-7">Why choose Cake Fruition</p>
          <motion.ul
            variants={stagger(0.06)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            className="mt-3 grid border-t border-off-white/15 sm:grid-cols-2 sm:gap-x-8"
          >
            {FEATURES.map((feature) => (
              <motion.li
                key={feature}
                variants={fadeUp}
                className="flex items-start gap-3 border-b border-off-white/15 py-3 lg:py-[min(1.6vh,0.85rem)]"
              >
                <SparkleIcon size={13} className="mt-1.5 shrink-0 text-off-white/60" />
                <span className="font-serif text-[1.2rem] leading-snug text-off-white/90 lg:text-[clamp(1rem,2.2vh,1.25rem)]">
                  {feature}
                </span>
              </motion.li>
            ))}
          </motion.ul>

          <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between lg:mt-7">
            <CTAButton
              href={whatsappLink("Hi Mopelola! I'd love to talk through a cake design with you.")}
              variant="light"
              icon="whatsapp"
            >
              Talk to Mopelola
            </CTAButton>
            <p aria-hidden className="font-script text-4xl text-off-white/80">
              Cake Fruition
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
