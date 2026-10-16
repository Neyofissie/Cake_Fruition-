import { motion } from "motion/react";
import Reveal, { fadeUp, stagger } from "../components/Reveal";
import SectionLabel from "../components/SectionLabel";
import CTAButton from "../components/CTAButton";
import { RotatingBadge } from "../components/Motifs";
import { cake } from "../lib/images";
import { whatsappLink } from "../lib/site";

const PORTRAIT = cake("architect");

const PRINCIPLES = [
  { title: "Designed from your story", text: "Every design starts with the person, the occasion and the details that make it yours." },
  { title: "Structured to stand tall", text: "Tiers, supports and proportions are planned so the cake looks as good at the end as at the reveal." },
  { title: "Finished by hand", text: "Sugar flowers, sculpted folds and toppers are shaped and placed by hand, one by one." },
];

export default function MeetTheArchitect() {
  return (
    <section id="architect" aria-labelledby="architect-title" className="relative overflow-hidden bg-ink py-24 text-off-white sm:py-32">
      <div className="mx-auto grid max-w-[90rem] items-center gap-16 px-5 sm:px-8 lg:grid-cols-12 lg:gap-12 lg:px-12">
        <Reveal className="relative mx-auto w-full max-w-[25rem] lg:col-span-5 lg:max-w-none">
          <div className="relative mx-auto aspect-[4/5] w-[86%]">
            <div aria-hidden className="absolute inset-0 -translate-x-4 translate-y-4 rounded-t-full border border-off-white/30 sm:-translate-x-5 sm:translate-y-5" />
            <div className="relative h-full overflow-hidden rounded-t-full bg-charcoal">
              <motion.img
                src={PORTRAIT.src}
                srcSet={PORTRAIT.srcSet}
                sizes="(min-width: 1024px) 34vw, 86vw"
                alt="Portrait of the founder and cake architect of Cake Fruition, smiling with arms folded"
                loading="lazy"
                decoding="async"
                initial={{ scale: 1.12 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
                className="h-full w-full object-cover object-[50%_25%]"
              />
            </div>
          </div>
          <div className="absolute -right-1 bottom-[12%] h-24 w-24 rounded-full bg-ink sm:h-28 sm:w-28">
            <RotatingBadge tone="light" text="Founder · Cake architect · " className="h-full w-full p-1" />
          </div>
          <p className="eyebrow mt-10 text-center text-off-white/60">Founder &amp; Cake Architect</p>
        </Reveal>

        <div className="lg:col-span-6 lg:col-start-7">
          <Reveal>
            <SectionLabel tone="light">Meet the Architect</SectionLabel>
            <h2 id="architect-title" className="display mt-7 text-[3rem] sm:text-[4.4rem]">
              The Hands Behind <span className="italic text-off-white/80">Every Layer</span>
            </h2>
            <p className="mt-7 max-w-xl text-[1.05rem] leading-[1.8] text-off-white/75">
              Every Cake Fruition cake is designed and built by our founder and cake architect. Each one is planned like a
              small piece of architecture, from the structure of the tiers to the last sugar petal, so it looks beautiful on
              the table and tastes even better on the plate.
            </p>
          </Reveal>

          <motion.ul
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            className="mt-10 border-b border-off-white/15"
          >
            {PRINCIPLES.map((p) => (
              <motion.li key={p.title} variants={fadeUp} className="grid gap-1 border-t border-off-white/15 py-5 sm:grid-cols-[14rem_1fr] sm:gap-8">
                <h3 className="font-serif text-[1.45rem] leading-snug">{p.title}</h3>
                <p className="leading-relaxed text-off-white/65">{p.text}</p>
              </motion.li>
            ))}
          </motion.ul>

          <Reveal className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <CTAButton
              href={whatsappLink("Hi Cake Fruition! I'd love to talk through a cake design with you.")}
              variant="light"
              icon="whatsapp"
            >
              Talk to the Architect
            </CTAButton>
            <p aria-hidden className="font-script text-4xl text-off-white/80">
              Cake Fruition
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
