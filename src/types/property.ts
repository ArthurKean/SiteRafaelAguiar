export type PropertyStatus = "Lançamento" | "Em construção" | "Na planta";
export interface PropertyImage {
  src: string;
  alt: string;
}
export interface PropertyPlan {
  id: string;
  area: number;
  bedrooms: number;
  suites: number;
  bathrooms: number;
  price: number;
  image?: PropertyImage;
}
export interface Property {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  priceFrom: number;
  priceTo: number;
  areaMin: number;
  areaMax: number;
  bedrooms: number;
  suites: number;
  bathrooms: number;
  parkingSpaces: number;
  type: "Apartamento" | "Cobertura";
  status: PropertyStatus;
  deliveryDate?: string;
  city: string;
  neighborhood: string;
  featured: boolean;
  images: PropertyImage[];
  features: string[];
  plans: PropertyPlan[];
  latitude?: number;
  longitude?: number;
  createdAt: string;
  isDemo: boolean;
}
export interface PropertyFilters {
  query?: string;
  city?: string;
  neighborhood?: string;
  type?: string;
  minPrice?: string;
  maxPrice?: string;
  bedrooms?: string;
  minArea?: string;
  status?: string;
  sort?: string;
}
