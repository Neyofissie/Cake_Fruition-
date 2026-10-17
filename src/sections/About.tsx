import { motion } from "motion/react";
import Reveal, { fadeUp, stagger } from "../components/Reveal";
import SectionLabel from "../components/SectionLabel";
import { Sprig } from "../components/Motifs";
import { ABOUT_IMAGE, PILLARS } from "../lib/content";

export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="border-t border-muted-border bg-warm-white">
      <div className="mx-auto grid max-w-[90rem] lg:grid-cols-12">
        <div className="flex flex-col justify-center px-5 py-20 sm:px-8 lg:col-span-5 lg:py-28 lg:pl-12 lg:pr-14">
          <Reveal>
            <SectionLabel>About the Studio</SectionLabel>
            <h2 id="about-title" className="display mt-7 text-[2.9rem] sm:text-[3.6rem] xl:text-[4rem]">
              Baked with Love, <span className="italic">Designed to Impress</span>
            </h2>
            <p className="mt-7 max-w-lg leading-[1.8] text-charcoal/85">
              Cake Fruition brings creativity, quality, and passion together to create unforgettable cakes and desserts.
              Every cake is freshly baked to order using quality ingredients, soft moist sponge layers, and delicious
              flavour-matching cream fillings. From elegant wedding cakes to joyful birthday centrepieces, every design is
              tailored to your celebration.
            </p>
            <a
              href="#menu"
              className="eyebrow group mt-10 inline-flex items-center gap-4 text-ink"
            >
              <span aria-hidden className="h-px w-12 bg-ink transition-all duration-500 ease-luxe group-hover:w-20" />
              Explore the menu
            </a>
          </Reveal>
        </div>

        <div className="relative min-h-[26rem] overflow-hidden sm:min-h-[34rem] lg:col-span-5">
          <motion.img
            src={ABOUT_IMAGE.image.src}
            srcSet={ABOUT_IMAGE.image.srcSet}
            sizes="(min-width: 1024px) 40vw, 100vw"
            alt={ABOUT_IMAGE.alt}
            loading="lazy"
            decoding="async"
            initial={{ scale: 1.15 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 h-full w-full object-cover object-[50%_30%]"
          />
        </div>

        <div className="flex flex-row items-center justify-between gap-6 bg-ink px-6 py-8 text-off-white sm:px-8 lg:col-span-2 lg:flex-col lg:items-start lg:px-8 lg:py-12">
          <p className="eyebrow leading-[2.2] text-off-white/80">
            Art
            <br />
            in every
            <br />
            layer
          </p>
          <span aria-hidden className="hidden h-px flex-1 bg-off-white/25 sm:block lg:h-auto lg:w-px lg:flex-1" />
          <p className="font-script text-4xl text-off-white/90">Handmade</p>
        </div>
      </div>

      <div className="border-t border-muted-border">
        <motion.ul
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          className="mx-auto grid max-w-[90rem] md:grid-cols-3"
        >
          {PILLARS.map((pillar, i) => (
            <motion.li
              key={pillar.title}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
              className="group relative border-b border-muted-border px-5 py-12 transition-colors duration-500 hover:bg-off-white sm:px-8 md:border-b-0 md:border-r md:last:border-r-0 lg:px-12 lg:py-16"
            >
              <p className="font-serif text-lg italic text-stone">0{i + 1}</p>
              <h3 className="display mt-5 text-[2.2rem]">{pillar.title}</h3>
              <p className="mt-4 max-w-sm leading-relaxed text-charcoal/80">{pillar.description}</p>
              <Sprig className="mt-8 w-28 text-ink/30 transition-all duration-700 ease-luxe group-hover:w-36 group-hover:text-ink/60" />
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
