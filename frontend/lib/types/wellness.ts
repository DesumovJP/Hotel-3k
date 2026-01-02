/**
 * Wellness Types for Grand Hotel Opduin
 * TypeScript interfaces matching Strapi v5 schemas
 */

// ============================================
// TREATMENT TYPES
// ============================================

export type TreatmentCategory =
  | "massage"
  | "facial_women"
  | "facial_men"
  | "body"
  | "texel_specials"
  | "hands_feet"
  | "waxing"
  | "pmu"
  | "kids";

export interface WellnessTreatment {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  category: TreatmentCategory;
  description: string;
  shortDescription?: string;
  duration: number; // minutes
  price: number;
  priceNote?: string;
  image?: StrapiMedia;
  gallery?: StrapiMedia[];
  isSignature: boolean;
  isPopular: boolean;
  isNew: boolean;
  tags: string[];
  benefits: string[];
  contraindications?: string;
  bookingUrl?: string;
  sortOrder: number;
  seo?: SEOComponent;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
}

// ============================================
// FACILITY TYPES
// ============================================

export type FacilityIcon =
  | "pool"
  | "sauna"
  | "steam"
  | "solarium"
  | "jacuzzi"
  | "gym"
  | "yoga"
  | "meditation";

export type PriceType =
  | "free"
  | "included"
  | "per_hour"
  | "per_session"
  | "per_day";

export interface OpeningHours {
  mondayToFriday: string;
  saturday: string;
  sunday: string;
  holidays?: string;
  notes?: string;
}

export interface WellnessFacility {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  description: string;
  shortDescription?: string;
  icon: FacilityIcon;
  image: StrapiMedia;
  gallery?: StrapiMedia[];
  price: number;
  priceType: PriceType;
  availability?: OpeningHours;
  capacity?: number;
  temperature?: string;
  features: string[];
  restrictions?: string;
  isHighlighted: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
}

// ============================================
// TESTIMONIAL TYPES (Extended for Wellness)
// ============================================

export type TestimonialSource =
  | "direct"
  | "booking"
  | "tripadvisor"
  | "google"
  | "spa_finder";

export interface WellnessTestimonial {
  id: number;
  documentId: string;
  quote: string;
  guestName: string;
  guestLocation?: string;
  rating: number;
  source: TestimonialSource;
  treatment?: string;
  stayDate?: string;
  avatar?: StrapiMedia;
  isHighlighted: boolean;
  tags: string[];
  createdAt: string;
  publishedAt: string;
}

// ============================================
// SALON INFO
// ============================================

export interface SalonContact {
  phone: string;
  email: string;
  whatsapp?: string;
}

export interface SalonInfo {
  name: string;
  tagline: string;
  description: string;
  openingHours: OpeningHours;
  contact: SalonContact;
  address: string;
  bookingUrl: string;
  policies: string[];
}

// ============================================
// SHARED TYPES
// ============================================

export interface StrapiMedia {
  id: number;
  url: string;
  alternativeText?: string;
  caption?: string;
  width: number;
  height: number;
  formats?: {
    thumbnail?: StrapiMediaFormat;
    small?: StrapiMediaFormat;
    medium?: StrapiMediaFormat;
    large?: StrapiMediaFormat;
  };
}

export interface StrapiMediaFormat {
  url: string;
  width: number;
  height: number;
}

export interface SEOComponent {
  metaTitle: string;
  metaDescription: string;
  keywords?: string;
  canonicalURL?: string;
  metaImage?: StrapiMedia;
  metaRobots?: string;
  structuredData?: Record<string, unknown>;
}

// ============================================
// FILTER & SORT TYPES
// ============================================

export interface TreatmentFilters {
  category?: TreatmentCategory | null;
  minPrice?: number;
  maxPrice?: number;
  minDuration?: number;
  maxDuration?: number;
  isSignature?: boolean;
  tags?: string[];
}

export type TreatmentSortField = "price" | "duration" | "name" | "sortOrder";
export type SortDirection = "asc" | "desc";

export interface TreatmentSort {
  field: TreatmentSortField;
  direction: SortDirection;
}

// ============================================
// API RESPONSE TYPES
// ============================================

export interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface WellnessPageData {
  treatments: WellnessTreatment[];
  facilities: WellnessFacility[];
  testimonials: WellnessTestimonial[];
  salonInfo: SalonInfo;
}

// ============================================
// COMPONENT PROP TYPES
// ============================================

export interface WellnessHeroProps {
  title?: string;
  tagline?: string;
  backgroundImage?: string;
  backgroundVideo?: string;
  youtubeId?: string;
  ctaText?: string;
  ctaHref?: string;
}

export interface FacilitiesGridProps {
  facilities: WellnessFacility[];
  title?: string;
  subtitle?: string;
  variant?: "grid" | "carousel" | "bento";
}

export interface TreatmentCatalogProps {
  treatments: WellnessTreatment[];
  categories?: TreatmentCategory[];
  title?: string;
  subtitle?: string;
  showFilters?: boolean;
  onBook?: (treatment: WellnessTreatment) => void;
}

export interface SalonInfoProps {
  info: SalonInfo;
  variant?: "compact" | "full";
}

export interface WellnessTestimonialsProps {
  testimonials: WellnessTestimonial[];
  title?: string;
  subtitle?: string;
  variant?: "carousel" | "grid" | "featured";
  autoplay?: boolean;
}

// ============================================
// CATEGORY DISPLAY MAPPING
// ============================================

export const TREATMENT_CATEGORY_LABELS: Record<TreatmentCategory, string> = {
  massage: "Massage",
  facial_women: "Facial (Women)",
  facial_men: "Facial (Men)",
  body: "Body Treatments",
  texel_specials: "Texel Specials",
  hands_feet: "Hands & Feet",
  waxing: "Waxing",
  pmu: "Permanent Makeup",
  kids: "Kids",
};

export const FACILITY_ICON_LABELS: Record<FacilityIcon, string> = {
  pool: "Swimming Pool",
  sauna: "Sauna",
  steam: "Steam Bath",
  solarium: "Solarium",
  jacuzzi: "Jacuzzi",
  gym: "Fitness",
  yoga: "Yoga Studio",
  meditation: "Meditation Room",
};

export const PRICE_TYPE_LABELS: Record<PriceType, string> = {
  free: "Free",
  included: "Included",
  per_hour: "/hour",
  per_session: "/session",
  per_day: "/day",
};
