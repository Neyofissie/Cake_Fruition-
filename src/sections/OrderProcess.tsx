import { useId, useMemo, useState } from "react";
import { motion } from "motion/react";
import Reveal, { stagger } from "../components/Reveal";
import SectionLabel from "../components/SectionLabel";
import ProcessStep from "../components/ProcessStep";
import CTAButton from "../components/CTAButton";
import { ENQUIRY_OCCASIONS, FINISHES, ORDER_IMAGE, ORDER_STEPS, POPULAR_FLAVOURS, SPECIAL_FLAVOURS } from "../lib/content";
import { whatsappLink } from "../lib/site";

const FLAVOUR_OPTIONS = [
  ...POPULAR_FLAVOURS.map((f) => f.name),
  ...SPECIAL_FLAVOURS.map((f) => f.name),
  "Marbled (two flavours)",
  "Not sure yet",
];

type Enquiry = { occasion: string; date: string; servings: string; flavour: string; finish: string; idea: string };

function buildMessage(e: Enquiry) {
  const lines = ["Hi Cake Fruition! I'd love to order a custom cake."];
  if (e.occasion) lines.push(`Occasion: ${e.occasion}`);
  if (e.date) {
    const pretty = new Date(`${e.date}T12:00:00`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
    lines.push(`Date: ${pretty}`);
  }
  if (e.servings) lines.push(`Servings: about ${e.servings}`);
  if (e.flavour) lines.push(`Flavour: ${e.flavour}`);
  if (e.finish) lines.push(`Finish: ${e.finish}`);
  if (e.idea.trim()) lines.push(`Design idea: ${e.idea.trim()}`);
  return lines.join("\n");
}

const fieldClass =
  "mt-2 block min-h-12 w-full rounded-none border-0 border-b border-muted-border bg-transparent px-0 py-2 font-sans text-base normal-case tracking-normal text-ink placeholder:text-medium-grey focus:border-ink focus:outline-none focus:ring-0";

export default function OrderProcess() {
  const id = useId();
  const [enquiry, setEnquiry] = useState<Enquiry>({ occasion: "", date: "", servings: "", flavour: "", finish: "", idea: "" });
  const message = useMemo(() => buildMessage(enquiry), [enquiry]);
  const set = (key: keyof Enquiry) => (e: { target: { value: string } }) => setEnquiry((prev) => ({ ...prev, [key]: e.target.value }));
  const today = new Date().toISOString().slice(0, 10);

  return (
    <section id="order" aria-labelledby="order-title" className="bg-warm-white py-24 sm:py-32">
      <div className="mx-auto grid max-w-[90rem] gap-16 px-5 sm:px-8 lg:grid-cols-12 lg:gap-12 lg:px-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <SectionLabel>Ordering</SectionLabel>
              <h2 id="order-title" className="display mt-7 text-[3.2rem] sm:text-[4.4rem]">
                How to <span className="italic">Order</span>
              </h2>
              <p className="mt-6 max-w-md leading-relaxed text-charcoal/80">
                Ordering is simple and personal &mdash; everything happens in one friendly WhatsApp conversation.
              </p>
            </Reveal>
            <Reveal delay={0.1} className="relative mt-12 hidden aspect-[4/5] max-w-sm lg:block">
              <div aria-hidden className="absolute inset-0 -translate-x-4 translate-y-4 rounded-t-full border border-ink/25" />
              <img
                src={ORDER_IMAGE.image.src}
                srcSet={ORDER_IMAGE.image.srcSet}
                sizes="24rem"
                alt={ORDER_IMAGE.alt}
                loading="lazy"
                decoding="async"
                className="relative h-full w-full rounded-t-full object-cover"
              />
            </Reveal>
          </div>
        </div>

        <div className="lg:col-span-7 lg:pt-6">
          <motion.ol
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          >
            {ORDER_STEPS.map((step, i) => (
              <ProcessStep key={step.title} number={i + 1} last={i === ORDER_STEPS.length - 1} {...step} />
            ))}
          </motion.ol>

          <Reveal className="mt-6 border border-muted-border bg-off-white p-2">
            <form
              className="border border-muted-border/70 p-6 sm:p-10"
              aria-labelledby={`${id}-title`}
              onSubmit={(e) => {
                e.preventDefault();
                window.open(whatsappLink(message), "_blank", "noopener,noreferrer");
              }}
            >
              <p className="eyebrow text-stone">Optional &middot; 30 seconds</p>
              <h3 id={`${id}-title`} className="mt-3 font-serif text-[2rem] leading-tight">
                Plan your message
              </h3>
              <p className="mt-2 max-w-lg text-[0.95rem] leading-relaxed text-charcoal/75">
                Fill in what you know and we&rsquo;ll pre-write your WhatsApp message. Every field is optional.
              </p>

              <div className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2">
                <label className="eyebrow block text-charcoal">
                  Occasion
                  <select value={enquiry.occasion} onChange={set("occasion")} className={fieldClass}>
                    <option value="">Choose an occasion</option>
                    {ENQUIRY_OCCASIONS.map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                </label>
                <label className="eyebrow block text-charcoal">
                  Celebration date
                  <input type="date" min={today} value={enquiry.date} onChange={set("date")} className={fieldClass} />
                </label>
                <label className="eyebrow block text-charcoal">
                  Servings
                  <input
                    type="number"
                    inputMode="numeric"
                    min={1}
                    placeholder="e.g. 20"
                    value={enquiry.servings}
                    onChange={set("servings")}
                    className={fieldClass}
                  />
                </label>
                <label className="eyebrow block text-charcoal">
                  Flavour
                  <select value={enquiry.flavour} onChange={set("flavour")} className={fieldClass}>
                    <option value="">Choose a flavour</option>
                    {FLAVOUR_OPTIONS.map((f) => (
                      <option key={f}>{f}</option>
                    ))}
                  </select>
                </label>
                <label className="eyebrow block text-charcoal">
                  Finish
                  <select value={enquiry.finish} onChange={set("finish")} className={fieldClass}>
                    <option value="">Choose a finish</option>
                    {FINISHES.map((f) => (
                      <option key={f.name}>{f.name}</option>
                    ))}
                  </select>
                </label>
                <label className="eyebrow block text-charcoal sm:col-span-2">
                  Design idea
                  <textarea
                    rows={2}
                    placeholder="Colours, theme, name or message on the cake…"
                    value={enquiry.idea}
                    onChange={set("idea")}
                    className={`${fieldClass} resize-none`}
                  />
                </label>
              </div>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <CTAButton href={whatsappLink(message)} icon="whatsapp">
                  Start Your Cake Order
                </CTAButton>
                <p className="text-sm text-stone">Opens WhatsApp with your details filled in.</p>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
