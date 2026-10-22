import { useId, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Reveal, { EASE } from "../components/Reveal";
import SectionLabel from "../components/SectionLabel";
import CTAButton from "../components/CTAButton";
import { FAQS } from "../lib/content";
import { whatsappLink } from "../lib/site";

// FAQPage structured data so search engines can show the answers.
const SCHEMA = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
});

/** Questions & answers: a large serif title on the left and an accordion on the right. */
export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const base = useId();

  return (
    <section id="faq" aria-labelledby="faq-title" className="border-t border-muted-border bg-off-white py-24 sm:py-32">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: SCHEMA }} />
      <div className="mx-auto grid max-w-[90rem] gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-8 lg:px-12">
        <Reveal className="lg:col-span-4">
          <SectionLabel>Questions</SectionLabel>
          <h2 id="faq-title" className="display mt-7 text-[2.9rem] sm:text-[4rem]">
            Before You <span className="italic">Order</span>
          </h2>
          <p className="mt-6 max-w-sm leading-relaxed text-charcoal/80">
            Can&rsquo;t see your question? Ask us on WhatsApp and we&rsquo;ll get back to you.
          </p>
          <div className="mt-8">
            <CTAButton href={whatsappLink("Hi Cake Fruition! I have a question about ordering a cake…")} icon="whatsapp">
              Ask a Question
            </CTAButton>
          </div>
        </Reveal>

        <Reveal className="lg:col-span-7 lg:col-start-6">
          <ul className="border-t border-ink/15">
            {FAQS.map((faq, i) => {
              const expanded = open === i;
              const panel = `${base}-panel-${i}`;
              const button = `${base}-button-${i}`;
              return (
                <li key={faq.question} className="border-b border-ink/15">
                  <h3>
                    <button
                      id={button}
                      type="button"
                      aria-expanded={expanded}
                      aria-controls={panel}
                      onClick={() => setOpen(expanded ? null : i)}
                      className="group flex w-full items-center justify-between gap-6 py-6 text-left"
                    >
                      <span className="font-serif text-[1.35rem] leading-snug text-ink sm:text-[1.6rem]">{faq.question}</span>
                      <span
                        aria-hidden
                        className={`relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 ${
                          expanded ? "border-ink bg-ink text-off-white" : "border-ink/20 text-ink group-hover:border-ink"
                        }`}
                      >
                        <span className="absolute h-px w-3.5 bg-current" />
                        <span
                          className={`absolute h-3.5 w-px bg-current transition-transform duration-300 ${expanded ? "scale-y-0" : ""}`}
                        />
                      </span>
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {expanded && (
                      <motion.div
                        id={panel}
                        role="region"
                        aria-labelledby={button}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-2xl pb-7 pr-14 leading-relaxed text-charcoal/85">{faq.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
