import { motion } from "motion/react";
import Reveal, { fadeUp, stagger } from "../components/Reveal";
import SectionLabel from "../components/SectionLabel";
import SocialLinkButton from "../components/SocialLinkButton";
import { FacebookIcon, InstagramIcon } from "../components/Icons";
import { GALLERY } from "../lib/content";
import { SITE } from "../lib/site";

const FEED = [GALLERY[1], GALLERY[4], GALLERY[6], GALLERY[9]];

export default function Social() {
  return (
    <section aria-labelledby="social-title" className="bg-off-white py-24 sm:py-32">
      <div className="mx-auto grid max-w-[90rem] gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:items-center lg:px-12">
        <div className="lg:col-span-5">
          <Reveal>
            <SectionLabel>Social</SectionLabel>
            <h2 id="social-title" className="display mt-7 text-[2.9rem] sm:text-[4rem]">
              Follow <span className="italic">Cake Fruition</span>
            </h2>
            <p className="mt-6 max-w-md leading-relaxed text-charcoal/80">
              See our latest cakes, customer orders, behind-the-scenes moments, and sweet creations on social media.
            </p>
          </Reveal>
          <motion.div
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mt-10 grid gap-4"
          >
            <motion.div variants={fadeUp}>
              <SocialLinkButton href={SITE.instagram} label="Instagram" handle="@cakefruition" Icon={InstagramIcon} />
            </motion.div>
            <motion.div variants={fadeUp}>
              <SocialLinkButton href={SITE.facebook} label="Facebook" handle="Cake Fruition" Icon={FacebookIcon} />
            </motion.div>
          </motion.div>
        </div>

        <motion.ul
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          className="grid grid-cols-2 gap-3 sm:gap-4 lg:col-span-7"
        >
          {FEED.map((item, i) => (
            <motion.li key={item.title} variants={fadeUp} className={i % 2 === 1 ? "sm:translate-y-10" : ""}>
              <a
                href={SITE.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${item.title} — see more on Instagram`}
                className="group relative block aspect-square overflow-hidden bg-light-grey"
              >
                <img
                  src={item.image.src}
                  alt={item.alt}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover object-[50%_35%] transition-transform duration-[1.2s] ease-luxe group-hover:scale-[1.06]"
                />
                <span className="absolute inset-0 flex items-center justify-center bg-ink/0 text-off-white opacity-0 transition-all duration-500 group-hover:bg-ink/45 group-hover:opacity-100">
                  <InstagramIcon size={28} />
                </span>
              </a>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
