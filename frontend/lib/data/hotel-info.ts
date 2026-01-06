/**
 * CENTRALIZED HOTEL INFORMATION
 * ==============================
 * Single source of truth for all hotel contact info, hours, and settings.
 *
 * USAGE: Import and use throughout the site
 * import { hotelInfo, contact, hours, social } from "@/lib/data/hotel-info";
 *
 * REDESIGN NOTE: When redesigning, only this file needs updating for contact changes.
 */

// ============================================
// CORE HOTEL INFO
// ============================================
export const hotelInfo = {
  name: "Grand Hotel Opduin",
  shortName: "Opduin",
  tagline: "The Hamptons of the Wadden",
  established: 1932,

  // Location
  location: {
    island: "Texel",
    village: "De Koog",
    region: "North Holland",
    country: "Netherlands",
  },

  // Coordinates for maps
  coordinates: {
    lat: 53.0928,
    lng: 4.7583,
  },

  // Key stats for display
  stats: {
    rooms: 22,
    roomTypes: 6,
    maxGuests: 200,
    ferryTime: 20, // minutes from Den Helder
  },
} as const;

// ============================================
// CONTACT INFORMATION
// ============================================
export const contact = {
  // Address
  address: {
    street: "Ruijslaan 22",
    postalCode: "1796 AD",
    city: "De Koog",
    region: "Texel",
    country: "Netherlands",
    full: "Ruijslaan 22, 1796 AD De Koog, Texel",
  },

  // Phone numbers
  phone: {
    main: "+31 222 317 445",
    mainRaw: "+31222317445", // For tel: links
    reservations: "+31 222 317 445",
    banqueting: "+31 222 317 446",
    wellness: "+31 222 317 445",
  },

  // Email addresses
  email: {
    main: "info@opduin.nl",
    reservations: "reservations@opduin.nl",
    banqueting: "banqueting@opduin.nl",
    restaurant: "restaurant@opduin.nl",
    wellness: "wellness@opduin.nl",
    events: "events@opduin.nl",
    weddings: "weddings@opduin.nl",
    privacy: "privacy@opduin.nl",
  },

  // External links
  links: {
    googleMaps: "https://www.google.com/maps/dir/?api=1&destination=53.0928,4.7583",
    weddingPlanner: {
      name: "Sophie - Trouwen Texel",
      website: "https://www.trouwen-texel.nl",
      email: "info@trouwentexel.com",
      phone: "+31 6 57186156",
    },
  },
} as const;

// ============================================
// OPENING HOURS
// ============================================
export const hours = {
  reception: {
    label: "Reception",
    hours: "24 hours",
    display: "24h",
  },
  restaurant: {
    label: "Restaurant",
    lunch: { start: "12:00", end: "14:30", display: "12:00–14:30" },
    dinner: { start: "18:00", end: "22:00", display: "18:00–22:00" },
    full: "12:00 – 22:00",
  },
  pool: {
    label: "Swimming Pool",
    hours: "9:00 – 21:00",
    display: "9:00–21:00",
  },
  sauna: {
    label: "Sauna",
    freeHours: "16:30 – 19:00",
    note: "Free for guests 16:30-19:00",
  },
  spa: {
    label: "Beauty Salon",
    hours: "By appointment",
    display: "By appointment",
  },
  reservationsTeam: {
    label: "Reservations Team",
    days: "Mon-Sun",
    hours: "9:00 – 18:00",
    display: "Mon-Sun 9:00-18:00",
  },
} as const;

// ============================================
// SOCIAL MEDIA
// ============================================
export const social = {
  facebook: {
    name: "Facebook",
    url: "https://facebook.com/grandhotelOpduin",
    handle: "@grandhotelOpduin",
  },
  instagram: {
    name: "Instagram",
    url: "https://instagram.com/grandhotelOpduin",
    handle: "@grandhotelOpduin",
  },
  // Add more as needed
} as const;

// ============================================
// BOOKING BENEFITS (Direct booking)
// ============================================
export const directBookingBenefits = [
  "Free sauna access",
  "€5 off per night",
  "Texel gift on departure",
  "Flexible cancellation",
  "Best rate guarantee",
] as const;

// ============================================
// TRUST INDICATORS
// ============================================
export const trustIndicators = [
  { label: "Secure Booking", key: "secure" },
  { label: "Instant Confirmation", key: "instant" },
  { label: "No Payment Now", key: "nopayment" },
  { label: "Best Rate Guarantee", key: "bestrate" },
] as const;

// ============================================
// PRICING INFO
// ============================================
export const pricing = {
  wellness: {
    poolNonGuest: { adult: 9, child: 5 },
    saunaPrivate: 12.50, // per person per hour
    solarium: 11, // per session
  },
} as const;

// ============================================
// MENU PDFs
// ============================================
export const menuLinks = {
  dinner: "https://www.opduin.nl/upload/files/opduin_menukaart%20EN%20vanaf%2012%20dec.pdf",
  lunch: "https://www.opduin.nl/upload/files/opduin_lunchkaart_A5%20(2).pdf",
} as const;

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get formatted phone link
 */
export function getPhoneLink(type: keyof typeof contact.phone = "main"): string {
  return `tel:${contact.phone[type].replace(/\s/g, "")}`;
}

/**
 * Get formatted email link
 */
export function getEmailLink(type: keyof typeof contact.email = "main"): string {
  return `mailto:${contact.email[type]}`;
}

/**
 * Get Google Maps directions link
 */
export function getMapsLink(): string {
  return contact.links.googleMaps;
}

// ============================================
// TYPE EXPORTS
// ============================================
export type PhoneType = keyof typeof contact.phone;
export type EmailType = keyof typeof contact.email;
