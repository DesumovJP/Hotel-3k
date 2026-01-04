// Package deals data from opduin.nl

export interface Offer {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  image: string;
  imageLarge: string;
  category: string;
  badge: string;
  nights: number;
  includes: string[];
  highlights: string[];
  conditions: string[];
  idealFor: string;
}

export const offers: Offer[] = [
  {
    id: "warm-winter",
    slug: "warm-winter-offer",
    title: "Warm Winter Offer",
    subtitle: "Cozy escape with wellness included",
    description: "Escape the winter cold with our warming package. Enjoy a cozy stay with breakfast, afternoon coffee and cake, and full access to our wellness facilities.",
    longDescription: "A perfect winter getaway at Grand Hotel Opduin. This package offers an overnight stay with our typical Texel breakfast buffet, afternoon coffee or tea with a piece of homemade pie, and complete access to all our Health & Wellness facilities including the heated indoor pool, Finnish sauna, Turkish steam bath, massage chair and solarium.",
    image: "/offers/warm-winteraanbieding-400x300_2.jpg",
    imageLarge: "/offers/warm-winteraanbieding-600x400_1.jpg",
    category: "Seasonal",
    badge: "Winter Special",
    nights: 1,
    includes: [
      "1 night accommodation",
      "Typical Texel breakfast buffet",
      "Coffee or tea with a piece of pie",
      "Access to Health & Wellness facilities",
      "Free use of massage chair and solarium",
      "Free parking",
    ],
    highlights: [
      "Heated indoor pool",
      "Finnish sauna & Turkish steam bath",
      "Homemade pie selection",
    ],
    conditions: [
      "Price varies per day",
      "Free cancellation until 3 days before arrival",
      "Price is per 2 persons for the whole package",
    ],
    idealFor: "Weekend getaways, wellness seekers, couples",
  },
  {
    id: "early-spring",
    slug: "early-spring-week",
    title: "Early Spring Week",
    subtitle: "Up to 50% discount for returning guests",
    description: "Book early and save big on your spring holiday. Returning guests receive up to 50% discount on overnight stays with breakfast.",
    longDescription: "A special offer exclusively for returning guests at Grand Hotel Opduin. Previous guests receive 25% discount, and those who visited in 2025 get an incredible 50% off their accommodation. The week concludes with a festive 3-course dinner menu with beverages and live music on January 31st.",
    image: "/offers/vroege-voorjaars-week-400x300.jpg",
    imageLarge: "/offers/vroege-voorjaars-week-600x400.jpg",
    category: "Seasonal",
    badge: "Up to 50% Off",
    nights: 1,
    includes: [
      "Overnight accommodation with breakfast",
      "25% discount for previous guests",
      "50% discount for guests who visited in 2025",
      "3-course dinner with beverages (Jan 31)",
      "Live music during dinner service",
      "Option to reserve additional room",
    ],
    highlights: [
      "Exclusive returning guest discounts",
      "Festive closing dinner with live music",
      "Early bird spring rates",
    ],
    conditions: [
      "January 25-31, 2026",
      "Direct booking only (phone or email)",
      "Cash or PIN payment only, no credit cards",
      "Discounts exclude food, drinks, taxes, beauty treatments",
      "Free cancellation until 1 day before arrival",
    ],
    idealFor: "Returning guests, early bookers, budget-conscious travelers",
  },
  {
    id: "opduin-relax",
    slug: "opduin-relax-deal",
    title: "Opduin Relax Deal",
    subtitle: "3 nights of pure relaxation",
    description: "Unwind completely with our 3-night relaxation package. Includes dinner, wellness access, and 25% discount on all beauty treatments.",
    longDescription: "The ultimate wellness retreat at Grand Hotel Opduin. This 3-night package includes daily breakfast buffet, one 3-course dinner, complete access to our Health & Wellness facilities with private sauna reservation availability, complimentary bathrobes and flip-flops, and a generous 25% discount on all beauty and wellness treatments. Book your spa appointments before arrival to secure your preferred times.",
    image: "/offers/opduin-verwenaanbieding-400x300_2.jpg",
    imageLarge: "/offers/opduin-verwenaanbieding-600x400_2.jpg",
    category: "Wellness",
    badge: "3 Nights",
    nights: 3,
    includes: [
      "3 nights accommodation",
      "Daily Texel breakfast buffet",
      "1 three-course dinner",
      "Complete Health & Wellness access",
      "Private sauna reservation available",
      "Massage chair and solarium access",
      "Bathrobes and flip-flops",
      "25% discount on beauty & wellness treatments",
    ],
    highlights: [
      "25% off all spa treatments",
      "Private sauna sessions available",
      "Complimentary bathrobes",
    ],
    conditions: [
      "Price varies per day",
      "Book spa appointments before arrival",
      "Free cancellation until 1 day before arrival",
      "Price is per 2 persons for the whole package",
    ],
    idealFor: "Couples, wellness retreats, relaxation seekers",
  },
  {
    id: "explore-texel",
    slug: "explore-texel-deal",
    title: "Explore Texel Deal",
    subtitle: "2 nights discovering the island",
    description: "The perfect package for those who want to discover all that Texel has to offer. Includes Ecomare entrance, picnic bag, and trail maps.",
    longDescription: "Discover the beauty of Texel with this curated 2-night adventure package. Enjoy comfortable accommodation with daily breakfast, one 3-course dinner, entrance tickets to Ecomare seal rescue centre, a filled picnic bag for your explorations, and detailed maps with hiking and biking trails. Complete wellness facility access included for relaxation after your island adventures.",
    image: "/offers/ontdek-texel-aanbieding-400x300_1.jpg",
    imageLarge: "/offers/ontdek-texel-aanbieding-600x400_1.jpg",
    category: "Adventure",
    badge: "2 Nights",
    nights: 2,
    includes: [
      "2 nights accommodation",
      "2 days Texel breakfast buffet",
      "1 three-course dinner",
      "Entrance to Ecomare seal sanctuary",
      "Filled picnic bag",
      "Map with hiking and biking trails",
      "Health & Wellness facility access",
    ],
    highlights: [
      "Ecomare seal rescue centre tickets",
      "Picnic bag for island exploration",
      "Trail maps included",
    ],
    conditions: [
      "Price varies per day",
      "Sauna access requires advance reservation",
      "Free cancellation until 1 day before arrival",
      "Price is per 2 persons for the whole package",
    ],
    idealFor: "Families, nature lovers, first-time visitors",
  },
  {
    id: "taste-of-texel",
    slug: "taste-of-texel-deal",
    title: "Taste of Texel Deal",
    subtitle: "2 nights of culinary delight",
    description: "Experience the best flavors Texel has to offer. This culinary package includes two dinners and local Texel products in your room.",
    longDescription: "A gastronomic journey through Texel's finest flavors. This 2-night package includes daily breakfast buffet, afternoon tea or coffee with homemade cake (choose from apple pie, carrot cake, or chocolate cake), two 3-course dinners featuring local Texel ingredients, and a complimentary bottle of Texel liquor with chocolates waiting in your room. The perfect package for food lovers.",
    image: "/offers/smaak-van-texel-aanbieding-400x300_1.jpg",
    imageLarge: "/offers/smaak-van-texel-aanbieding-600x400_1.jpg",
    category: "Culinary",
    badge: "2 Dinners",
    nights: 2,
    includes: [
      "2 nights accommodation",
      "Daily Texel breakfast buffet",
      "Tea/coffee with homemade cake",
      "2 three-course dinners",
      "Bottle of Texel liquor in room",
      "Texel chocolates in room",
      "Health & Wellness facility access",
    ],
    highlights: [
      "2 gourmet dinners included",
      "Texel liquor & chocolates welcome",
      "Homemade cake selection",
    ],
    conditions: [
      "Price varies per day",
      "Cake choice: apple pie, carrot cake, or chocolate cake",
      "Free cancellation until 1 day before arrival",
      "Price is per 2 persons for the whole package",
    ],
    idealFor: "Foodies, couples, culinary enthusiasts",
  },
];

export function getOfferBySlug(slug: string): Offer | undefined {
  return offers.find((offer) => offer.slug === slug);
}

export function getAllOfferSlugs(): string[] {
  return offers.map((offer) => offer.slug);
}
