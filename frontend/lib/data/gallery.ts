/**
 * GALLERY PAGE DATA
 * ==================
 * Centralized data for the Gallery page
 *
 * REDESIGN: Update content here to change Gallery page data
 */

// ============================================
// CATEGORIES
// ============================================
export interface GalleryCategory {
  id: string;
  name: string;
}

export const galleryCategories: GalleryCategory[] = [
  { id: "all", name: "All" },
  { id: "rooms", name: "Rooms & Suites" },
  { id: "wellness", name: "Wellness" },
  { id: "restaurant", name: "Restaurant" },
  { id: "texel", name: "Texel Island" },
];

// ============================================
// GALLERY IMAGES
// ============================================
export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  caption: string;
  category: string;
  featured?: boolean;
}

export const galleryImages: GalleryImage[] = [
  // Rooms
  {
    id: "r1",
    src: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1200",
    alt: "Dune Suite with panoramic views",
    caption: "Dune Suite",
    category: "rooms",
    featured: true,
  },
  {
    id: "r2",
    src: "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=800",
    alt: "Sea View Room",
    caption: "Sea View Room",
    category: "rooms",
  },
  {
    id: "r3",
    src: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800",
    alt: "Garden Retreat",
    caption: "Garden Retreat",
    category: "rooms",
  },
  {
    id: "r4",
    src: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800",
    alt: "Family Suite",
    caption: "Family Suite",
    category: "rooms",
  },

  // Wellness
  {
    id: "w1",
    src: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=1200",
    alt: "Indoor pool with dune views",
    caption: "Infinity Pool",
    category: "wellness",
    featured: true,
  },
  {
    id: "w2",
    src: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800",
    alt: "Spa treatment room",
    caption: "Spa Treatment",
    category: "wellness",
  },
  {
    id: "w3",
    src: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800",
    alt: "Finnish sauna",
    caption: "Finnish Sauna",
    category: "wellness",
  },

  // Restaurant
  {
    id: "d1",
    src: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200",
    alt: "Restaurant interior",
    caption: "Restaurant Opduin",
    category: "restaurant",
    featured: true,
  },
  {
    id: "d2",
    src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800",
    alt: "Signature seafood dish",
    caption: "Culinary Delights",
    category: "restaurant",
  },
  {
    id: "d3",
    src: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800",
    alt: "Chef at work",
    caption: "Our Chef",
    category: "restaurant",
  },

  // Texel
  {
    id: "t1",
    src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200",
    alt: "Texel beach",
    caption: "Pristine Beaches",
    category: "texel",
    featured: true,
  },
  {
    id: "t2",
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    alt: "Rolling dunes",
    caption: "The Dunes",
    category: "texel",
  },
  {
    id: "t3",
    src: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800",
    alt: "Texel farmland",
    caption: "Island Beauty",
    category: "texel",
  },
  {
    id: "t4",
    src: "https://images.unsplash.com/photo-1534670007418-fbb7f6cf32c3?w=800",
    alt: "Lighthouse",
    caption: "Texel Lighthouse",
    category: "texel",
  },
];
