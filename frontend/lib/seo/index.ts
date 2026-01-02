/**
 * SEO Module
 * Grand Hotel Opduin
 */

// Structured Data (JSON-LD)
export {
  generateHotelSchema,
  generateLocalBusinessSchema,
  generateWebsiteSchema,
  generateRoomSchema,
  generateHotelRoomSchema,
  generateOfferSchema,
  generateFAQSchema,
  generateEventSchema,
  generateRestaurantSchema,
  generateBreadcrumbSchema,
  generateArticleSchema,
  toJsonLd,
  combineSchemas,
} from './structured-data';

export type {
  WithContext,
  RoomSchemaInput,
  OfferSchemaInput,
  FAQItem,
  EventSchemaInput,
  BreadcrumbItem,
  ArticleSchemaInput,
} from './structured-data';

// Meta Tags
export {
  generateMetadata,
  generateRoomMetadata,
  generateOfferMetadata,
  generateArticleMetadata,
  homeMetadata,
  roomsMetadata,
  restaurantMetadata,
  wellnessMetadata,
  offersMetadata,
  islandMetadata,
  blogMetadata,
  contactMetadata,
  bookingMetadata,
} from './meta';

export type {
  PageType,
  MetaInput,
  RoomMetaInput,
  OfferMetaInput,
  ArticleMetaInput,
} from './meta';
