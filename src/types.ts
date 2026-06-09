export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  type: "popular" | "special" | "marble" | "finishing";
}

export interface OccasionCard {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: "Wedding" | "Celebration" | "Cupcakes" | "All";
  imageUrl: string;
  dimensions?: string;
}

export interface ProcessStep {
  number: number;
  title: string;
  description: string;
}

export interface BrandPillar {
  title: string;
  description: string;
  iconName: string;
}

export interface CakePlannerParams {
  occasion: string;
  servings: number;
  flavors: string;
  style: string;
  additionalInfo: string;
}

export interface CakePlannerResponse {
  designName: string;
  conceptDescription: string;
  sizingTiering: string;
  flavorHarmony: string;
  finishingDetails: string;
  whatsappSummary: string;
}
