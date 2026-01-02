/**
 * Structured Data (JSON-LD) Generators
 * Grand Hotel Opduin - Schema.org Implementation
 */

// ============================================
// BASE TYPES
// ============================================

export interface WithContext<T> {
  '@context': 'https://schema.org';
  '@type': string;
  [key: string]: unknown;
}

// ============================================
// HOTEL DATA
// ============================================

const HOTEL_INFO = {
  name: 'Grand Hotel Opduin',
  description: 'Luxury boutique hotel on the stunning island of Texel, where dunes meet the sea.',
  url: 'https://www.grandhoteloduin.nl',
  logo: 'https://www.grandhoteloduin.nl/logo.png',
  image: 'https://www.grandhoteloduin.nl/images/hotel-exterior.jpg',
  telephone: '+31 222 317 445',
  email: 'reservations@grandhoteloduin.nl',
  address: {
    streetAddress: 'Ruyslaan 22',
    addressLocality: 'De Koog',
    addressRegion: 'Texel',
    postalCode: '1796 AD',
    addressCountry: 'NL',
  },
  geo: {
    latitude: 53.0975,
    longitude: 4.7514,
  },
  priceRange: '$$$$',
  starRating: 4,
  amenities: [
    'Free WiFi',
    'Spa',
    'Restaurant',
    'Bar',
    'Room Service',
    'Concierge',
    'Parking',
    'Fitness Center',
    'Indoor Pool',
    'Sauna',
  ],
};

// ============================================
// SCHEMA GENERATORS
// ============================================

/**
 * Generate Hotel schema (main property)
 */
export function generateHotelSchema(): WithContext<'Hotel'> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Hotel',
    name: HOTEL_INFO.name,
    description: HOTEL_INFO.description,
    url: HOTEL_INFO.url,
    logo: HOTEL_INFO.logo,
    image: HOTEL_INFO.image,
    telephone: HOTEL_INFO.telephone,
    email: HOTEL_INFO.email,
    address: {
      '@type': 'PostalAddress',
      ...HOTEL_INFO.address,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: HOTEL_INFO.geo.latitude,
      longitude: HOTEL_INFO.geo.longitude,
    },
    priceRange: HOTEL_INFO.priceRange,
    starRating: {
      '@type': 'Rating',
      ratingValue: HOTEL_INFO.starRating,
      bestRating: 5,
    },
    amenityFeature: HOTEL_INFO.amenities.map((amenity) => ({
      '@type': 'LocationFeatureSpecification',
      name: amenity,
      value: true,
    })),
    checkinTime: '15:00',
    checkoutTime: '11:00',
    currenciesAccepted: 'EUR',
    paymentAccepted: 'Cash, Credit Card, Debit Card',
    petsAllowed: true,
  };
}

/**
 * Generate LocalBusiness schema (for local SEO)
 */
export function generateLocalBusinessSchema(): WithContext<'LocalBusiness'> {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${HOTEL_INFO.url}/#localbusiness`,
    name: HOTEL_INFO.name,
    description: HOTEL_INFO.description,
    url: HOTEL_INFO.url,
    logo: HOTEL_INFO.logo,
    image: HOTEL_INFO.image,
    telephone: HOTEL_INFO.telephone,
    email: HOTEL_INFO.email,
    address: {
      '@type': 'PostalAddress',
      ...HOTEL_INFO.address,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: HOTEL_INFO.geo.latitude,
      longitude: HOTEL_INFO.geo.longitude,
    },
    priceRange: HOTEL_INFO.priceRange,
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '00:00',
        closes: '23:59',
      },
    ],
    sameAs: [
      'https://www.facebook.com/grandhoteloduin',
      'https://www.instagram.com/grandhoteloduin',
      'https://www.tripadvisor.com/Hotel_Review-Grand_Hotel_Opduin',
    ],
  };
}

/**
 * Generate WebSite schema (for sitelinks search)
 */
export function generateWebsiteSchema(): WithContext<'WebSite'> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${HOTEL_INFO.url}/#website`,
    name: HOTEL_INFO.name,
    url: HOTEL_INFO.url,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${HOTEL_INFO.url}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

// ============================================
// ROOM/PRODUCT SCHEMAS
// ============================================

export interface RoomSchemaInput {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  images?: string[];
  size: number;
  maxGuests: number;
  bedType: string;
  amenities?: string[];
  url: string;
}

/**
 * Generate Product schema for a room
 */
export function generateRoomSchema(room: RoomSchemaInput): WithContext<'Product'> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${HOTEL_INFO.url}/rooms/${room.id}`,
    name: room.name,
    description: room.description,
    image: room.images || [room.image],
    url: room.url,
    brand: {
      '@type': 'Brand',
      name: HOTEL_INFO.name,
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'EUR',
      price: room.price,
      priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      availability: 'https://schema.org/InStock',
      url: room.url,
      seller: {
        '@type': 'Organization',
        name: HOTEL_INFO.name,
      },
    },
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'Room Size',
        value: `${room.size} m²`,
      },
      {
        '@type': 'PropertyValue',
        name: 'Maximum Guests',
        value: room.maxGuests,
      },
      {
        '@type': 'PropertyValue',
        name: 'Bed Type',
        value: room.bedType,
      },
    ],
  };
}

/**
 * Generate HotelRoom schema (more specific than Product)
 */
export function generateHotelRoomSchema(room: RoomSchemaInput): WithContext<'HotelRoom'> {
  return {
    '@context': 'https://schema.org',
    '@type': 'HotelRoom',
    '@id': `${HOTEL_INFO.url}/rooms/${room.id}`,
    name: room.name,
    description: room.description,
    image: room.images || [room.image],
    url: room.url,
    floorSize: {
      '@type': 'QuantitativeValue',
      value: room.size,
      unitCode: 'MTK',
    },
    numberOfRooms: 1,
    occupancy: {
      '@type': 'QuantitativeValue',
      value: room.maxGuests,
    },
    bed: {
      '@type': 'BedDetails',
      typeOfBed: room.bedType,
    },
    amenityFeature: room.amenities?.map((amenity) => ({
      '@type': 'LocationFeatureSpecification',
      name: amenity,
      value: true,
    })),
    offers: {
      '@type': 'Offer',
      priceCurrency: 'EUR',
      price: room.price,
      availability: 'https://schema.org/InStock',
    },
  };
}

// ============================================
// OFFER SCHEMAS
// ============================================

export interface OfferSchemaInput {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  url: string;
  validFrom?: string;
  validThrough?: string;
  category: string;
}

/**
 * Generate Offer schema for special packages
 */
export function generateOfferSchema(offer: OfferSchemaInput): WithContext<'Offer'> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Offer',
    '@id': `${HOTEL_INFO.url}/offers/${offer.id}`,
    name: offer.title,
    description: offer.description,
    image: offer.image,
    url: offer.url,
    priceCurrency: 'EUR',
    price: offer.price,
    ...(offer.originalPrice && {
      priceSpecification: {
        '@type': 'PriceSpecification',
        price: offer.price,
        priceCurrency: 'EUR',
        valueAddedTaxIncluded: true,
      },
    }),
    validFrom: offer.validFrom,
    validThrough: offer.validThrough,
    availability: 'https://schema.org/InStock',
    seller: {
      '@type': 'Organization',
      name: HOTEL_INFO.name,
    },
    category: offer.category,
  };
}

// ============================================
// FAQ SCHEMA
// ============================================

export interface FAQItem {
  question: string;
  answer: string;
}

/**
 * Generate FAQPage schema
 */
export function generateFAQSchema(faqs: FAQItem[]): WithContext<'FAQPage'> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

// ============================================
// EVENT SCHEMA
// ============================================

export interface EventSchemaInput {
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
  image?: string;
  url?: string;
  location?: string;
  price?: number;
  availability?: 'InStock' | 'SoldOut' | 'PreOrder';
}

/**
 * Generate Event schema
 */
export function generateEventSchema(event: EventSchemaInput): WithContext<'Event'> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.name,
    description: event.description,
    startDate: event.startDate,
    endDate: event.endDate,
    image: event.image,
    url: event.url,
    location: {
      '@type': 'Place',
      name: event.location || HOTEL_INFO.name,
      address: {
        '@type': 'PostalAddress',
        ...HOTEL_INFO.address,
      },
    },
    organizer: {
      '@type': 'Organization',
      name: HOTEL_INFO.name,
      url: HOTEL_INFO.url,
    },
    ...(event.price && {
      offers: {
        '@type': 'Offer',
        price: event.price,
        priceCurrency: 'EUR',
        availability: `https://schema.org/${event.availability || 'InStock'}`,
      },
    }),
  };
}

// ============================================
// RESTAURANT SCHEMA
// ============================================

/**
 * Generate Restaurant schema
 */
export function generateRestaurantSchema(): WithContext<'Restaurant'> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    '@id': `${HOTEL_INFO.url}/restaurant/#restaurant`,
    name: 'Restaurant Opduin',
    description: 'Fine dining restaurant featuring local Texel ingredients and seasonal menus.',
    url: `${HOTEL_INFO.url}/restaurant`,
    telephone: HOTEL_INFO.telephone,
    address: {
      '@type': 'PostalAddress',
      ...HOTEL_INFO.address,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: HOTEL_INFO.geo.latitude,
      longitude: HOTEL_INFO.geo.longitude,
    },
    servesCuisine: ['Dutch', 'French', 'International', 'Seafood'],
    priceRange: '$$$',
    menu: `${HOTEL_INFO.url}/restaurant/menu`,
    acceptsReservations: true,
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '07:00',
        closes: '10:30',
        description: 'Breakfast',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '18:00',
        closes: '22:00',
        description: 'Dinner',
      },
    ],
    parentOrganization: {
      '@type': 'Hotel',
      name: HOTEL_INFO.name,
    },
  };
}

// ============================================
// BREADCRUMB SCHEMA
// ============================================

export interface BreadcrumbItem {
  name: string;
  url: string;
}

/**
 * Generate BreadcrumbList schema
 */
export function generateBreadcrumbSchema(items: BreadcrumbItem[]): WithContext<'BreadcrumbList'> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// ============================================
// ARTICLE/BLOG SCHEMA
// ============================================

export interface ArticleSchemaInput {
  title: string;
  description: string;
  image: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  authorName: string;
  category?: string;
}

/**
 * Generate Article schema for blog posts
 */
export function generateArticleSchema(article: ArticleSchemaInput): WithContext<'Article'> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    image: article.image,
    url: article.url,
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    author: {
      '@type': 'Person',
      name: article.authorName,
    },
    publisher: {
      '@type': 'Organization',
      name: HOTEL_INFO.name,
      logo: {
        '@type': 'ImageObject',
        url: HOTEL_INFO.logo,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': article.url,
    },
    ...(article.category && { articleSection: article.category }),
  };
}

// ============================================
// UTILITY: SCRIPT TAG GENERATOR
// ============================================

/**
 * Generate script tag content for JSON-LD
 */
export function toJsonLd(schema: WithContext<unknown> | WithContext<unknown>[]): string {
  return JSON.stringify(schema);
}

/**
 * Combine multiple schemas into a graph
 */
export function combineSchemas(schemas: WithContext<unknown>[]): { '@context': string; '@graph': unknown[] } {
  return {
    '@context': 'https://schema.org',
    '@graph': schemas.map(({ '@context': _, ...rest }) => rest),
  };
}
