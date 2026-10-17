import { motion } from "motion/react";
import Logo from "./Logo";
import { ArrowIcon, FacebookIcon, InstagramIcon, WhatsAppIcon } from "./Icons";
import { DEFAULT_ENQUIRY, NAV_LINKS, SITE, whatsappLink } from "../lib/site";
import { FINISHES, POPULAR_FLAVOURS, SPECIAL_FLAVOURS } from "../lib/content";

const STATS = [
  { value: String(POPULAR_FLAVOURS.length + SPECIAL_FLAVOURS.length), label: "Signature flavours" },
  { value: String(FINISHES.length), label: "Finishing options" },
  { value: "2", label: "Flavours per marbled cake" },
  { value: "100%", label: "Baked to order" },
];

export default function Footer() {
  return (
    <footer className="bg-off-white pb-24 sm:pb-0">
      {/* Stats band */}
      <div className="bg-ink text-off-white">
        <div className="mx-auto grid max-w-[90rem] gap-10 px-5 py-12 sm:px-8 lg:grid-cols-12 lg:items-center lg:px-12">
          <dl className="grid grid-cols-2 gap-y-8 sm:grid-cols-4 lg:col-span-7">
            {STATS.map((stat, i) => (
              <div key={stat.label} className={`px-1 sm:px-6 ${i > 0 ? "sm:border-l sm:border-off-white/20" : "sm:pl-0"}`}>
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-serif text-[2.6rem] leading-none">{stat.value}</dd>
                <dd className="eyebrow mt-3 text-[0.6rem] leading-relaxed text-off-white/60">{stat.label}</dd>
              </div>
            ))}
          </dl>
          <motion.a
            href={whatsappLink(DEFAULT_ENQUIRY)}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between gap-6 border-t border-off-white/20 pt-8 lg:col-span-5 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0"
          >
            <span className="font-serif text-[2rem] leading-tight sm:text-[2.4rem]">
              Let&rsquo;s make your <span className="italic">moment special</span>
            </span>
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-off-white/40 transition-all duration-500 ease-luxe group-hover:bg-off-white group-hover:text-ink">
              <ArrowIcon size={20} />
            </span>
          </motion.a>
        </div>
      </div>

      <div className="mx-auto max-w-[90rem] px-5 py-14 sm:px-8 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo />
            <p className="mt-6 max-w-xs font-serif text-xl italic leading-snug text-charcoal">{SITE.tagline}</p>
          </div>

          <nav aria-label="Footer" className="lg:col-span-4">
            <p className="eyebrow text-stone">Explore</p>
            <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-[0.95rem] text-charcoal transition-colors hover:text-ink hover:underline hover:underline-offset-4">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-4">
            <p className="eyebrow text-stone">Order &amp; Follow</p>
            <ul className="mt-5 space-y-3">
              <li>
                <a href={whatsappLink(DEFAULT_ENQUIRY)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 text-charcoal hover:text-ink">
                  <WhatsAppIcon size={18} /> Order on WhatsApp
                </a>
              </li>
              <li>
                <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 text-charcoal hover:text-ink">
                  <InstagramIcon size={18} /> Instagram
                </a>
              </li>
              <li>
                <a href={SITE.facebook} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 text-charcoal hover:text-ink">
                  <FacebookIcon size={18} /> Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-muted-border pt-6 text-sm text-stone sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} Cake Fruition. All rights reserved.</p>
          <p className="eyebrow text-[0.6rem]">Freshly baked &middot; Made to order</p>
        </div>
      </div>
    </footer>
  );
}
