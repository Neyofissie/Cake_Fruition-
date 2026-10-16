import Reveal from "../components/Reveal";
import CTAButton from "../components/CTAButton";
import { SparkleField } from "../components/Motifs";
import { SparkleIcon } from "../components/Icons";
import { whatsappLink } from "../lib/site";

export default function QuoteCTA() {
  return (
    <section id="contact" aria-labelledby="quote-title" className="relative overflow-hidden bg-ink py-28 text-off-white sm:py-36">
      <SparkleField />
      <div className="relative mx-auto max-w-4xl px-5 text-center sm:px-8">
        <Reveal>
          <div aria-hidden className="mx-auto flex max-w-md items-center gap-5 text-off-white/50">
            <span className="h-px flex-1 bg-off-white/25" />
            <SparkleIcon size={16} />
            <span className="h-px flex-1 bg-off-white/25" />
          </div>
          <p className="eyebrow mt-8 text-off-white/60">Get a Quote</p>
          <h2 id="quote-title" className="display mt-6 text-[3.2rem] sm:text-[5rem] lg:text-[5.8rem]">
            Ready to Create Your <span className="italic">Dream Cake?</span>
          </h2>
          <p className="mx-auto mt-8 max-w-2xl text-[1.05rem] leading-relaxed text-off-white/75">
            Tell us your occasion, preferred flavour, date, and design idea. We will help you create a beautiful custom
            cake made just for your celebration.
          </p>
          <div className="mt-12 flex justify-center">
            <CTAButton
              href={whatsappLink("Hi Cake Fruition! I'd love a quote for a custom cake. My occasion is…")}
              variant="light"
              icon="whatsapp"
            >
              Get a Quote on WhatsApp
            </CTAButton>
          </div>
          <div aria-hidden className="mx-auto mt-16 flex max-w-md items-center gap-5 text-off-white/50">
            <span className="h-px flex-1 bg-off-white/25" />
            <span className="font-script text-3xl normal-case">Cake Fruition</span>
            <span className="h-px flex-1 bg-off-white/25" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
