import type { ComponentType } from "react";
import { motion } from "motion/react";
import Reveal, { fadeUp, stagger } from "../components/Reveal";
import { FacebookIcon, InstagramIcon, WhatsAppIcon } from "../components/Icons";
import { SITE, WHATSAPP_URL } from "../lib/site";

type Tile = {
  name: string;
  note: string;
  href: string;
  Icon: ComponentType<{ size?: number; className?: string }>;
  /** Card surface, icon chip and text colours. */
  card: string;
  chip: string;
  muted: string;
};

// One card per channel, in each platform's own colours, after Craft's "Follow our story" tiles.
const TILES: Tile[] = [
  {
    name: "WhatsApp",
    note: "Orders, quotes and quick questions",
    href: WHATSAPP_URL,
    Icon: WhatsAppIcon,
    card: "bg-white text-ink",
    chip: "border-ink/10 bg-white text-[#25d366] shadow-[0_6px_16px_-8px_rgba(11,11,11,0.35)]",
    muted: "text-stone",
  },
  {
    name: "@cakefruition",
    note: "New cakes and behind-the-scenes moments",
    href: SITE.instagram,
    Icon: InstagramIcon,
    card: "bg-[radial-gradient(circle_at_50%_115%,#fdd36b_0%,#fd7f3c_22%,#f0377f_48%,#b82fd1_76%,#7b2ff7_100%)] text-white",
    chip: "border-white/35 bg-white/15 text-white backdrop-blur-sm",
    muted: "text-white/80",
  },
  {
    name: "Facebook",
    note: "Celebrations, news and customer stories",
    href: SITE.facebook,
    Icon: FacebookIcon,
    card: "bg-[#1877f2] text-white",
    chip: "border-white/35 bg-white/15 text-white backdrop-blur-sm",
    muted: "text-white/80",
  },
];

/** "Follow our story": a centred heading and a card for each place to find Cake Fruition. */
export default function Social() {
  return (
    <section aria-labelledby="social-title" className="bg-off-white py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="text-center">
          <h2 id="social-title" className="display text-[2.9rem] sm:text-[4.2rem]">
            Follow Our <span className="italic">Story</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl leading-relaxed text-charcoal/80">
            From fresh bakes to finished centrepieces, see the cakes and the moments behind them, or message us to start
            your own.
          </p>
        </Reveal>

        <motion.ul
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          className="mx-auto mt-16 grid max-w-sm gap-6 sm:max-w-none sm:grid-cols-3 lg:gap-10"
        >
          {TILES.map(({ name, note, href, Icon, card, chip, muted }) => (
            <motion.li key={name} variants={fadeUp}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex aspect-[5/4] flex-col items-center justify-center rounded-3xl px-6 text-center sm:aspect-square shadow-[0_30px_60px_-30px_rgba(11,11,11,0.45)] transition-transform duration-500 ease-luxe hover:-translate-y-1.5 ${card}`}
              >
                <span className={`flex h-20 w-20 items-center justify-center rounded-[1.4rem] border ${chip}`}>
                  <Icon size={38} />
                </span>
                <span className="mt-7 text-[0.95rem] font-medium uppercase tracking-[0.08em]">{name}</span>
                <span className={`mt-2 max-w-[14rem] text-[0.92rem] leading-relaxed ${muted}`}>{note}</span>
              </a>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
