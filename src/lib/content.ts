import { cake, type CakeImage } from "./images";

export const PILLARS = [
  {
    title: "Freshly Baked",
    description:
      "Every cake is baked to order with quality ingredients, so it reaches your table soft, moist and full of flavour.",
  },
  {
    title: "Custom Designed",
    description:
      "Colours, textures, toppers and tiers are shaped around your theme, your guests and your celebration.",
  },
  {
    title: "Made for Your Moment",
    description:
      "From intimate birthdays to grand weddings, each design is planned around your date and your story.",
  },
];

export type Flavour = { name: string; note?: string };

export const POPULAR_FLAVOURS: Flavour[] = [
  { name: "Vanilla Cream Sponge", note: "Classic & light" },
  { name: "Chocolate Delight", note: "Rich cocoa" },
  { name: "Cookies & Cream", note: "Crowd favourite" },
  { name: "Red Velvet", note: "Velvety & smooth" },
];

export const SPECIAL_FLAVOURS: Flavour[] = [
  { name: "Carrot Cake", note: "Warmly spiced" },
  { name: "Lemon & Blueberry", note: "Bright & fresh" },
  { name: "Orange & Cinnamon", note: "Citrus spice" },
  { name: "Peanut Cake", note: "Nutty & rich" },
  { name: "Biscoff or Lotus Cake", note: "Caramelised biscuit" },
];

export const FINISHES: Flavour[] = [
  { name: "Buttercream", note: "Soft, textured or smooth" },
  { name: "Chocolate Ganache", note: "Sleek & indulgent" },
  { name: "Fondant", note: "Sharp, sculpted detail" },
];

export const OCCASIONS = [
  {
    title: "Birthday Cakes",
    description: "Playful or polished — personalised centrepieces with names, ages and themes your guest of honour will love.",
  },
  {
    title: "Wedding Cakes",
    description: "Elegant tiered cakes designed around your colours, florals and venue for the most memorable slice of the day.",
  },
  {
    title: "Baby Shower Cakes",
    description: "Soft, sweet designs to welcome a little one, finished with delicate details and gentle palettes.",
  },
  {
    title: "Corporate Event Cakes",
    description: "Refined cakes for launches, milestones and team celebrations, styled to suit your brand and occasion.",
  },
  {
    title: "Cupcakes & Dessert Tables",
    description: "Coordinated cupcakes and sweet treats that dress the table and keep every guest happy.",
  },
  {
    title: "Custom Celebration Cakes",
    description: "Anniversaries, graduations, christenings and everything in between — if you can imagine it, we'll bake it.",
  },
];

export type GalleryCategory = "Tiered" | "Birthday" | "Celebration";

export type GalleryItem = {
  title: string;
  category: GalleryCategory;
  alt: string;
  image: CakeImage;
};

export const GALLERY: GalleryItem[] = [
  {
    title: "Blush Cascade Fiftieth",
    category: "Celebration",
    alt: "Tall two-tier blush pink 50th birthday cake with sculpted fondant waves, a cascade of pink, burgundy and gold sugar roses and a gold monogram topper, styled on a marble table with baby's breath and gold accents",
    image: cake("blush-cascade-fifty"),
  },
  {
    title: "Rose Relief Three-Tier",
    category: "Tiered",
    alt: "Three-tier cake with a sculpted chocolate rose top tier, blush pink middle tier with a red rose, and a burgundy rosette base",
    image: cake("tiered-rose"),
  },
  {
    title: "Monochrome Fourteen",
    category: "Birthday",
    alt: "Black and white patterned birthday cake with a large quilted number 14 and a name topper",
    image: cake("monochrome-fourteen"),
  },
  {
    title: "Ivory Drape & Roses",
    category: "Tiered",
    alt: "Two-tier ivory cake with a draped fondant panel, lace texture and deep magenta roses",
    image: cake("ivory-drape"),
  },
  {
    title: "Emerald Fiftieth",
    category: "Celebration",
    alt: "Tall emerald green 50th birthday cake with gold script topper and red and orange roses",
    image: cake("emerald-fiftieth"),
  },
  {
    title: "Jessica Fortieth",
    category: "Birthday",
    alt: "Tall ivory buttercream 40th birthday cake with a sloped top, gold name and number, painted pink and teal accents, pink gerberas and dark green feathers",
    image: cake("jessica-forty"),
  },
  {
    title: "Plum, Gold & Sage",
    category: "Tiered",
    alt: "Three-tier cake with a plum top tier covered in relief flowers, a metallic gold middle tier, and a sage green base with vines, plum roses and gold fan accents",
    image: cake("plum-gold-tiers"),
  },
  {
    title: "Noir & Gold Fiftieth",
    category: "Celebration",
    alt: "Tall black two-tier 50th birthday cake with gold lettering, a gold crest monogram, black fondant fans with gold damask and a gold sports-themed topper, styled on a marble table with baby's breath and gold accents",
    image: cake("noir-gold-fifty"),
  },
  {
    title: "Storybook Stack",
    category: "Celebration",
    alt: "Cake sculpted as a stack of vintage books with a terracotta cover and red roses",
    image: cake("storybook"),
  },
  {
    title: "Sage Garden Fifteen",
    category: "Birthday",
    alt: "Sage green buttercream 15th birthday cake with piped wave texture, a gold name topper and number 15, gold pearls and pink daisies",
    image: cake("sage-fifteen"),
  },
  {
    title: "Happy Eighteenth Bloom",
    category: "Birthday",
    alt: "Tall naked sponge 18th birthday cake with cream layers, cascading peonies, lavender and blue poppies, and a gold Happy 18th topper",
    image: cake("happy-eighteenth-bloom"),
  },
  {
    title: "Lavender Column",
    category: "Tiered",
    alt: "Tall lavender cake with a ruffled watercolour band and a crown of dried flowers",
    image: cake("lavender-column"),
  },
  {
    title: "Autumn Harvest",
    category: "Celebration",
    alt: "Two-tier autumn cake with a chocolate woodgrain base, an ivory top tier scattered with orange and brown sugar leaves, and sugar pumpkins, pomegranates and berries on top",
    image: cake("autumn-harvest"),
  },
  {
    title: "Ice Princess",
    category: "Birthday",
    alt: "Pink princess-themed birthday cake with a character print, butterflies and a name topper",
    image: cake("princess-gracie"),
  },
  {
    title: "Cobalt Seventeen",
    category: "Birthday",
    alt: "Cobalt blue cake with a mirrored silver number 17 and a script name plaque",
    image: cake("cobalt-seventeen"),
  },
  {
    title: "Sweet Shop Ten",
    category: "Birthday",
    alt: "Pastel blue birthday cake covered in lollipops, meringues, doughnuts and an ice-cream cone",
    image: cake("sweet-shop-ten"),
  },
  {
    title: "Blush Birthday Bloom",
    category: "Celebration",
    alt: "Round ivory cake with a gold Happy Birthday plaque and an arrangement of dried and fresh flowers",
    image: cake("birthday-round"),
  },
];

const byTitle = (title: string) => GALLERY.find((g) => g.title === title)!;

/** Cakes that rotate through the hero arch, in order. */
export const HERO_SLIDES = [
  "Rose Relief Three-Tier",
  "Blush Cascade Fiftieth",
  "Noir & Gold Fiftieth",
  "Ivory Drape & Roses",
  "Plum, Gold & Sage",
  "Emerald Fiftieth",
].map(byTitle);
/**
 * The two frames the hero scrubs between as the visitor scrolls. Until the generated start/finish scene
 * images are added, two white-background cake photos stand in and float on the page (fullBleed: false).
 */
export const HERO_FRAMES = {
  start: byTitle("Happy Eighteenth Bloom"),
  end: byTitle("Plum, Gold & Sage"),
  fullBleed: false,
};
// Background-free versions of the spotlight cakes, so they can glide over the stage without a frame.
const CUTOUTS: Record<string, string> = {
  "Plum, Gold & Sage": "plum-gold-tiers",
  "Rose Relief Three-Tier": "tiered-rose",
  "Blush Cascade Fiftieth": "blush-cascade-fifty",
  "Noir & Gold Fiftieth": "noir-gold-fifty",
  "Ivory Drape & Roses": "ivory-drape",
  "Emerald Fiftieth": "emerald-fiftieth",
};

/** Cakes the signature spotlight scrolls through, starting with the hero's finished cake for continuity. */
export const SPOTLIGHT_CAKES = [HERO_FRAMES.end, ...HERO_SLIDES.filter((c) => c !== HERO_FRAMES.end)].map((item) => ({
  ...item,
  cutout: cake(`${CUTOUTS[item.title]}-cutout`),
}));
export const ABOUT_IMAGE = GALLERY.find((g) => g.title === "Sage Garden Fifteen")!;
export const ORDER_IMAGE = GALLERY.find((g) => g.title === "Emerald Fiftieth")!;

export const ORDER_STEPS = [
  {
    title: "Share Your Idea",
    description: "Send your cake inspiration, occasion date, flavour choice, and serving size.",
  },
  {
    title: "Receive a Quote",
    description: "Prices vary depending on size, design, filling, and decoration preferences.",
  },
  {
    title: "Confirm Your Order",
    description: "Once confirmed, your cake is freshly baked and designed for your celebration.",
  },
  {
    title: "Collect & Celebrate",
    description: "Enjoy a beautiful custom cake created specially for your moment.",
  },
];

export const FEATURES = [
  "Freshly baked cakes made to order",
  "Soft, moist sponge with delicious cream fillings",
  "Custom designs for birthdays, weddings, and celebrations",
  "Wide range of flavours and finishing options",
  "Marbled cakes available with two flavour combinations",
  "Friendly, professional, and reliable service",
  "Beautiful cakes designed to impress and made to be enjoyed",
];

export const ENQUIRY_OCCASIONS = [
  "Birthday",
  "Wedding",
  "Baby shower",
  "Corporate event",
  "Cupcakes / dessert table",
  "Other celebration",
];
