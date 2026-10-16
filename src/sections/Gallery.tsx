import Reveal from "../components/Reveal";
import SectionLabel from "../components/SectionLabel";
import GalleryGrid from "../components/GalleryGrid";
import { InstagramIcon } from "../components/Icons";
import { GALLERY } from "../lib/content";
import { SITE } from "../lib/site";

export default function Gallery() {
  return (
    <section id="gallery" aria-labelledby="gallery-title" className="bg-off-white py-24 sm:py-32">
      <div className="mx-auto max-w-[90rem] px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <Reveal className="max-w-2xl">
            <SectionLabel>Gallery</SectionLabel>
            <h2 id="gallery-title" className="display mt-7 text-[2.9rem] sm:text-[4rem]">
              Recent <span className="italic">Creations</span>
            </h2>
            <p className="mt-6 leading-relaxed text-charcoal/80">
              A few of the cakes we&rsquo;ve had the joy of creating. Every one is designed from scratch for its celebration.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <a
              href={SITE.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="eyebrow group inline-flex items-center gap-3 text-ink"
            >
              <InstagramIcon size={18} />
              <span className="border-b border-ink/30 pb-1 transition-colors group-hover:border-ink">More on Instagram</span>
            </a>
          </Reveal>
        </div>

        <div className="mt-12">
          <GalleryGrid items={GALLERY} />
        </div>
      </div>
    </section>
  );
}
