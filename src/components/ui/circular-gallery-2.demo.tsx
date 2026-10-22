import { CircularGallery, type GalleryItem } from "@/components/ui/circular-gallery-2";
import { GALLERY } from "@/lib/content";

// The original demo, filled with Cake Fruition cakes instead of stock photos.
const galleryItems: GalleryItem[] = GALLERY.slice(0, 12).map((item) => ({ image: item.image.large, text: item.title }));

/** Default demo for the CircularGallery. */
export default function CircularGalleryDemo() {
  return (
    // A container is needed to define the gallery's size
    <div className="relative h-[600px] w-full rounded-lg">
      <CircularGallery items={galleryItems} bend={3} borderRadius={0.05} scrollEase={0.02} />
    </div>
  );
}
