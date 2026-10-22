import { cn } from "@/lib/utils";
import { useRef, useState } from "react";
import { GALLERY } from "@/lib/content";

export type GalleryImage = {
  src: string;
  srcSet?: string;
  alt: string;
  /** Small uppercase label shown on the open strip, e.g. a category. */
  label?: string;
  /** Larger caption shown on the open strip, e.g. the cake's name. */
  caption?: string;
};

type ImageGalleryProps = {
  images: GalleryImage[];
  /** Called when an open strip is clicked or tapped (e.g. to show a lightbox). */
  onOpen?: (index: number) => void;
  className?: string;
  /** Tailwind height class for the row; the strips fill it. */
  heightClassName?: string;
};

/**
 * A row of image strips; the one under the pointer (or focused, or tapped on touch screens) widens to
 * show the full photo. Adapted from the 21st.dev "image gallery" component.
 */
export function ImageGallery({ images, onOpen, className, heightClassName = "h-[400px]" }: ImageGalleryProps) {
  // Touch screens have no hover: the first tap opens a strip, a second tap on the open strip calls onOpen.
  // Keyboard focus opens a strip through :focus-visible.
  const [active, setActive] = useState<number | null>(null);
  const pointer = useRef<string>("mouse");

  return (
    <div className={cn("flex w-full items-center gap-2", heightClassName, className)}>
      {images.map((image, idx) => {
        const open = active === idx;
        return (
          <button
            key={image.src}
            type="button"
            aria-label={image.caption ? `View ${image.caption}` : `View image ${idx + 1}`}
            onPointerDown={(e) => (pointer.current = e.pointerType)}
            onClick={() => {
              if (pointer.current !== "mouse" && !open) setActive(idx);
              else onOpen?.(idx);
            }}
            className={cn(
              "group relative h-full w-14 min-w-0 flex-grow sm:w-56 overflow-hidden rounded-lg text-left transition-all duration-500 ease-luxe hover:w-full focus-visible:w-full",
              open && "w-full",
            )}
          >
            <img
              className="h-full w-full object-cover object-center transition-transform duration-700 ease-luxe group-hover:scale-[1.03]"
              src={image.src}
              srcSet={image.srcSet}
              sizes="(min-width: 1024px) 50vw, 90vw"
              alt={image.alt}
              loading="lazy"
              decoding="async"
            />
            {(image.label || image.caption) && (
              <span
                className={cn(
                  "pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/75 to-transparent p-4 pt-12 text-off-white opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100",
                  open && "opacity-100",
                )}
              >
                {image.label && <span className="eyebrow block text-[0.58rem] text-off-white/70">{image.label}</span>}
                {image.caption && (
                  <span className="mt-1 block whitespace-nowrap font-serif text-xl leading-tight">{image.caption}</span>
                )}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

/** The original demo layout: a heading and one row of six strips, here filled with Cake Fruition cakes. */
export default function Example() {
  const images = GALLERY.slice(0, 6).map((item) => ({
    src: item.image.large,
    srcSet: item.image.srcSet,
    alt: item.alt,
    label: item.category,
    caption: item.title,
  }));

  return (
    <section className="flex w-full flex-col items-center justify-start py-12">
      <div className="max-w-3xl px-4 text-center">
        <h1 className="text-3xl font-semibold">Our Latest Creations</h1>
        <p className="mt-2 text-sm text-slate-500">
          A visual collection of our most recent works – each piece crafted with intention, emotion, and style.
        </p>
      </div>

      <div className="mt-10 w-full max-w-5xl px-4">
        <ImageGallery images={images} />
      </div>
    </section>
  );
}
