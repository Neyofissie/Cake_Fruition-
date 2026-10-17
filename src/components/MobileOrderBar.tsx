import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { WhatsAppIcon } from "./Icons";
import { DEFAULT_ENQUIRY, whatsappLink } from "../lib/site";

/** Sticky WhatsApp button on small screens, shown once the hero CTA has scrolled away. */
export default function MobileOrderBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const nearBottom = window.innerHeight + window.scrollY > document.body.scrollHeight - 160;
      setShow(window.scrollY > window.innerHeight * 0.8 && !nearBottom);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 sm:hidden"
        >
          <a
            href={whatsappLink(DEFAULT_ENQUIRY)}
            target="_blank"
            rel="noopener noreferrer"
            className="eyebrow flex min-h-14 items-center justify-center gap-3 rounded-full bg-ink text-off-white shadow-[0_18px_40px_-14px_rgba(11,11,11,0.7)]"
          >
            <WhatsAppIcon size={19} />
            Order on WhatsApp
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
