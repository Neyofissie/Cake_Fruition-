import { BrandPillar, MenuItem, OccasionCard, GalleryItem, ProcessStep } from "./types";

// Occasion Images
import oc1Img from "./assets/images/regenerated_image_1780490001786.jpg";
import oc2Img from "./assets/images/regenerated_image_1780490002381.jpg";
import oc3Img from "./assets/images/regenerated_image_1780490002811.jpg";
import oc4Img from "./assets/images/regenerated_image_1780490003634.jpg";
import oc5Img from "./assets/images/regenerated_image_1780490004098.jpg";
import oc6Img from "./assets/images/regenerated_image_1780490004599.jpg";

// Gallery Images
import g1Img from "./assets/images/regenerated_image_1780490004970.jpg";
import g2Img from "./assets/images/regenerated_image_1780490005556.jpg";
import g3Img from "./assets/images/regenerated_image_1780490006000.jpg";
import g4Img from "./assets/images/regenerated_image_1780490006579.jpg";
import g5Img from "./assets/images/regenerated_image_1780490006960.jpg";
import g6Img from "./assets/images/regenerated_image_1780490007309.jpg";

export const BRAND_PILLARS: BrandPillar[] = [
  {
    title: "Freshly Baked",
    description: "Every sponge layer is freshly baked to order using authentic, premium ingredients—never frozen or pre-manufactured.",
    iconName: "Cake"
  },
  {
    title: "Custom Designed",
    description: "Tailored visually to match your exact color scheme, thematic motifs, and high-fashion celebration preferences.",
    iconName: "Palette"
  },
  {
    title: "Made for Your Moment",
    description: "We orchestrate our baking, icing, and design schedule around your event timeline for pristine freshness and delivery.",
    iconName: "Clock"
  }
];

export const POPULAR_FLAVORS: MenuItem[] = [
  { id: "p1", name: "Vanilla Cream Sponge", description: "Bespoke classic vanilla bean cake layered with luxurious Madagascar whipped pastry cream.", type: "popular" },
  { id: "p2", name: "Chocolate Delight", description: "Rich, fine Belgian cocoa sponge with velvety dark or milk chocolate ganache cream.", type: "popular" },
  { id: "p3", name: "Cookies & Cream", description: "Crushed Oreo infusion baked into soft buttermilk sponge with silk cream-cheese alignment.", type: "popular" },
  { id: "p4", name: "Red Velvet", description: "Classic delicate crimson layers with a light cocoa undertone and smooth cultured cream cheese frosting.", type: "popular" }
];

export const SPECIAL_FLAVORS: MenuItem[] = [
  { id: "s1", name: "Carrot Cake", description: "Finely spiced brown-butter cake with fresh organic carrots, toasted walnuts, and signature whipped frosting.", type: "special" },
  { id: "s2", name: "Lemon & Blueberry", description: "Zesty freshly-grated lemon zest cake packed with organic blueberries and refreshing tart lemon curd cream.", type: "special" },
  { id: "s3", name: "Orange & Cinnamon", description: "Warm, sophisticated aromatic spice sponge paired with candied blood-orange glaze layers.", type: "special" },
  { id: "s4", name: "Peanut Cake", description: "Toasted roasted peanut sponge packed with caramel drizzle and silky peanut-butter buttercream.", type: "special" },
  { id: "s5", name: "Biscoff / Lotus Cake", description: "Belgian caramelized Speculoos cookie crunch layers with melted Biscoff cookie butter whipped mousse.", type: "special" }
];

export const FINISHING_OPTIONS = [
  { name: "Buttercream frosting", desc: "Silky Swiss Meringue or American buttercream with textured, minimal, or rustic styling." },
  { name: "Chocolate Ganache casing", desc: "A sleek, luxurious satin casing of white, milk, or decadent dark Belgian chocolate." },
  { name: "Fondant tailoring", desc: "A flawless, satin-strained structural aesthetic for sharp modern edges and structural figures." }
];

export const OCCASIONS: OccasionCard[] = [
  {
    id: "oc1",
    title: "Birthday Cakes",
    description: "Playful yet deeply refined custom age and theme statements, designed to be the ultimate culinary highlight.",
    imageUrl: oc1Img
  },
  {
    id: "oc2",
    title: "Wedding Cakes",
    description: "Breathtaking multi-tiered masterpieces reflecting your romantic palette, styled with fresh floral patterns or sculptural elements.",
    imageUrl: oc2Img
  },
  {
    id: "oc3",
    title: "Baby Shower Cakes",
    description: "Charming, elegant creations featuring soft neutral palettes, minimalist styling, or adorable customized custom detailing.",
    imageUrl: oc3Img
  },
  {
    id: "oc4",
    title: "Cupcakes & Dessert Tables",
    description: "Beautifully coordinated custom-iced cupcakes, cake pops, and geometric dessert pairings made to elevate host tables.",
    imageUrl: oc4Img
  },
  {
    id: "oc5",
    title: "Corporate Event Cakes",
    description: "Sleek, brand-aligned custom cakes with perfect color matching, architectural design, and serving size scaling.",
    imageUrl: oc5Img
  },
  {
    id: "oc6",
    title: "Custom Celebration Cakes",
    description: "From cozy anniversaries to giant graduation soirées—bespoke creations tailored to echo your specific life milestone.",
    imageUrl: oc6Img
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "g1",
    title: "The Textured Pearl Trio",
    category: "Wedding",
    imageUrl: g1Img,
    dimensions: "3 Tiers — 120 Servings"
  },
  {
    id: "g2",
    title: "Salted Caramel Velvet",
    category: "Celebration",
    imageUrl: g2Img,
    dimensions: "Single Tier — 25 Servings"
  },
  {
    id: "g3",
    title: "Minimal Classic Rosebud",
    category: "Wedding",
    imageUrl: g3Img,
    dimensions: "2 Tiers — 65 Servings"
  },
  {
    id: "g4",
    title: "Artisanal Speculoos Cupcake Flight",
    category: "Cupcakes",
    imageUrl: g4Img,
    dimensions: "Tray of 24 Custom Cupcakes"
  },
  {
    id: "g5",
    title: "Bespoke White Chocolate Lattice",
    category: "Celebration",
    imageUrl: g5Img,
    dimensions: "Single Tall Tier — 30 Servings"
  },
  {
    id: "g6",
    title: "Classic Gold Leaf Cascade",
    category: "Wedding",
    imageUrl: g6Img,
    dimensions: "3 Tiers — 90 Servings"
  }
];

export const ORDER_STEPS: ProcessStep[] = [
  {
    number: 1,
    title: "Share Your Idea",
    description: "Send us your layout inspiration, cake shape, expected serving size, event date, and initial flavor combinations."
  },
  {
    number: 2,
    title: "Receive a Quotation",
    description: "We determine custom pricing immediately based on cake size complexity, filling profiles, and finishing styles."
  },
  {
    number: 3,
    title: "Confirm Your Baking Slot",
    description: "Once deposit or full booking is agreed, your slot is secured and our bakers source fresh local ingredients."
  },
  {
    number: 4,
    title: "Collect & Celebrate",
    description: "Pick up your stunning, freshly boxed centerpiece at our studio or arrange delicate delivery for a perfect party reveal."
  }
];

export const LUXURY_FEATURES = [
  "100% freshly baked custom celebration cakes made strictly to order",
  "Remarkable moist texture with luxurious dairy-matching cream fillings",
  "Tailor-made structural aesthetic tailored for birthday, baby shower, and wedding themes",
  "Wide array of premium natural options, including special spiced Orange-Cinnamon & Peanut profiles",
  "Marbled combination choices—allowing you to mix any two layers in one cake",
  "Uncompromising, elegant, friendly, and deeply reliable studio client service",
  "Delicately packed in premium windowed boxes, designed to stun on entry"
];
