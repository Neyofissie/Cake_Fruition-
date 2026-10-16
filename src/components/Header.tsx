import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Logo from "./Logo";
import CTAButton from "./CTAButton";
import { EASE } from "./Reveal";
import { FacebookIcon, InstagramIcon } from "./Icons";
import { DEFAULT_ENQUIRY, NAV_LINKS, SITE, whatsappLink } from "../lib/site";

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);
  return active;
}

const SECTION_IDS = NAV_LINKS.map((l) => l.href.slice(1));
const LEFT = NAV_LINKS.slice(0, 3);
const RIGHT = NAV_LINKS.slice(3);

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(SECTION_IDS);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock scroll, close on Escape, and keep focus inside the drawer while it is open.
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    drawerRef.current?.querySelector<HTMLElement>("a")?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key !== "Tab" || !drawerRef.current) return;
      const focusable = [toggleRef.current, ...drawerRef.current.querySelectorAll<HTMLElement>("a")].filter(
        Boolean,
      ) as HTMLElement[];
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      toggleRef.current?.focus();
    };
  }, [open]);

  const linkClass = (href: string) =>
    `eyebrow relative py-2 transition-colors hover:text-ink after:absolute after:bottom-0 after:left-0 after:h-px after:bg-ink after:transition-all after:duration-500 after:ease-luxe ${
      active === href.slice(1) ? "text-ink after:w-full" : "text-stone after:w-0 hover:after:w-full"
    }`;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
          scrolled || open
            ? "border-b border-muted-border/70 bg-off-white/90 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto grid h-[4.75rem] max-w-[90rem] grid-cols-[1fr_auto_1fr] items-center px-4 sm:h-[5.25rem] sm:px-8 lg:px-12">
          <nav aria-label="Primary" className="hidden xl:block">
            <ul className="flex items-center gap-9">
              {LEFT.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className={linkClass(link.href)}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <a
            href="#home"
            aria-label="Cake Fruition — back to top"
            className="col-start-1 justify-self-start xl:col-start-2 xl:justify-self-center"
          >
            <Logo />
          </a>

          <div className="col-start-3 flex items-center justify-end gap-9">
            <nav aria-label="Secondary" className="hidden xl:block">
              <ul className="flex items-center gap-9">
                {RIGHT.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className={linkClass(link.href)}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <span className="hidden sm:block">
              <CTAButton href={whatsappLink(DEFAULT_ENQUIRY)} icon="none" className="!min-h-11 !px-6">
                Order Now
              </CTAButton>
            </span>

            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="relative -mr-2 flex h-12 w-12 items-center justify-center xl:hidden"
            >
              <span className="sr-only">Menu</span>
              <span
                aria-hidden
                className={`absolute h-px w-7 bg-ink transition-transform duration-500 ease-luxe ${open ? "rotate-45" : "-translate-y-[5px]"}`}
              />
              <span
                aria-hidden
                className={`absolute h-px w-7 bg-ink transition-transform duration-500 ease-luxe ${open ? "-rotate-45" : "translate-y-[5px]"}`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Rendered outside <header>: its backdrop-filter would otherwise trap this fixed drawer. */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="fixed inset-x-0 bottom-0 top-[4.75rem] z-40 overflow-y-auto bg-off-white sm:top-[5.25rem] xl:hidden"
          >
            <nav aria-label="Mobile" className="flex min-h-full flex-col px-6 pb-10 pt-6 sm:px-10">
              <ul className="border-t border-muted-border">
                {NAV_LINKS.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.05, duration: 0.6, ease: EASE }}
                    className="border-b border-muted-border"
                  >
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="flex items-baseline justify-between py-4 font-serif text-[2.1rem] leading-none text-ink"
                    >
                      {link.label}
                      <span className="eyebrow text-stone">0{i + 1}</span>
                    </a>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-auto pt-10">
                <p className="font-script text-3xl text-stone">Let&rsquo;s bake your moment</p>
                <CTAButton
                  href={whatsappLink(DEFAULT_ENQUIRY)}
                  icon="whatsapp"
                  className="mt-5 w-full"
                  onClick={() => setOpen(false)}
                >
                  Order on WhatsApp
                </CTAButton>
                <div className="mt-6 flex items-center justify-center gap-3">
                  <a
                    href={SITE.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Cake Fruition on Instagram"
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-muted-border"
                  >
                    <InstagramIcon />
                  </a>
                  <a
                    href={SITE.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Cake Fruition on Facebook"
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-muted-border"
                  >
                    <FacebookIcon />
                  </a>
                </div>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
