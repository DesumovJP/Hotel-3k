/**
 * Meta Tag Generators
 * Grand Hotel Opduin - OG/Twitter Meta Generation
 */

import type { Metadata } from 'next';

// ============================================
// BASE CONFIGURATION
// ============================================

const SITE_CONFIG = {
  siteName: 'Grand Hotel Opduin',
  siteUrl: 'https://www.grandhoteloduin.nl',
  defaultTitle: 'Grand Hotel Opduin | Luxury Hotel on Texel Island',
  defaultDescription:
    'Experience luxury at Grand Hotel Opduin, a boutique hotel on the stunning island of Texel. Indulge in wellness, fine dining, and breathtaking dune views.',
  defaultImage: 'https://www.grandhoteloduin.nl/images/og-default.jpg',
  twitterHandle: '@grandhoteloduin',
  locale: 'en_US',
  alternateLocales: ['nl_NL', 'de_DE'],
};

// ============================================
// PAGE TYPE CONFIGURATIONS
// ============================================

export type PageType =
  | 'home'
  | 'rooms'
  | 'room-detail'
  | 'offers'
  | 'offer-detail'
  | 'restaurant'
  | 'wellness'
  | 'island'
  | 'blog'
  | 'blog-post'
  | 'contact'
  | 'booking';

interface PageTypeConfig {
  titleTemplate: string;
  ogType: 'website' | 'article';
  twitterCard: 'summary' | 'summary_large_image';
}

const PAGE_TYPE_CONFIGS: Record<PageType, PageTypeConfig> = {
  home: {
    titleTemplate: '%s',
    ogType: 'website',
    twitterCard: 'summary_large_image',
  },
  rooms: {
    titleTemplate: 'Rooms & Suites | %s',
    ogType: 'website',
    twitterCard: 'summary_large_image',
  },
  'room-detail': {
    titleTemplate: '%s | Grand Hotel Opduin',
    ogType: 'website',
    twitterCard: 'summary_large_image',
  },
  offers: {
    titleTemplate: 'Special Offers | %s',
    ogType: 'website',
    twitterCard: 'summary_large_image',
  },
  'offer-detail': {
    titleTemplate: '%s | Grand Hotel Opduin',
    ogType: 'website',
    twitterCard: 'summary_large_image',
  },
  restaurant: {
    titleTemplate: 'Restaurant | %s',
    ogType: 'website',
    twitterCard: 'summary_large_image',
  },
  wellness: {
    titleTemplate: 'Wellness & Spa | %s',
    ogType: 'website',
    twitterCard: 'summary_large_image',
  },
  island: {
    titleTemplate: 'Discover Texel | %s',
    ogType: 'website',
    twitterCard: 'summary_large_image',
  },
  blog: {
    titleTemplate: 'Blog | %s',
    ogType: 'website',
    twitterCard: 'summary_large_image',
  },
  'blog-post': {
    titleTemplate: '%s | Grand Hotel Opduin Blog',
    ogType: 'article',
    twitterCard: 'summary_large_image',
  },
  contact: {
    titleTemplate: 'Contact | %s',
    ogType: 'website',
    twitterCard: 'summary',
  },
  booking: {
    titleTemplate: 'Book Your Stay | %s',
    ogType: 'website',
    twitterCard: 'summary',
  },
};

// ============================================
// METADATA INTERFACES
// ============================================

export interface MetaInput {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  pageType?: PageType;
  noIndex?: boolean;
  keywords?: string[];
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  locale?: string;
}

export interface RoomMetaInput extends MetaInput {
  roomName: string;
  roomPrice: number;
  roomSize: number;
  roomCategory: string;
}

export interface OfferMetaInput extends MetaInput {
  offerTitle: string;
  offerPrice: number;
  validUntil?: string;
}

export interface ArticleMetaInput extends MetaInput {
  articleTitle: string;
  category: string;
  tags?: string[];
}

// ============================================
// METADATA GENERATORS
// ============================================

/**
 * Generate base metadata for any page
 */
export function generateMetadata(input: MetaInput): Metadata {
  const pageConfig = PAGE_TYPE_CONFIGS[input.pageType || 'home'];
  const title = input.title || SITE_CONFIG.defaultTitle;
  const description = input.description || SITE_CONFIG.defaultDescription;
  const image = input.image || SITE_CONFIG.defaultImage;
  const url = input.url || SITE_CONFIG.siteUrl;

  return {
    title: pageConfig.titleTemplate.replace('%s', title),
    description,
    keywords: input.keywords,
    authors: input.author ? [{ name: input.author }] : undefined,
    robots: input.noIndex ? 'noindex, nofollow' : 'index, follow',
    alternates: {
      canonical: url,
      languages: {
        'en-US': url,
        'nl-NL': url.replace('.nl', '.nl/nl'),
        'de-DE': url.replace('.nl', '.nl/de'),
      },
    },
    openGraph: {
      type: pageConfig.ogType,
      title,
      description,
      url,
      siteName: SITE_CONFIG.siteName,
      locale: input.locale || SITE_CONFIG.locale,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...(input.publishedTime && { publishedTime: input.publishedTime }),
      ...(input.modifiedTime && { modifiedTime: input.modifiedTime }),
    },
    twitter: {
      card: pageConfig.twitterCard,
      title,
      description,
      images: [image],
      site: SITE_CONFIG.twitterHandle,
      creator: SITE_CONFIG.twitterHandle,
    },
  };
}

/**
 * Generate metadata for room detail pages
 */
export function generateRoomMetadata(input: RoomMetaInput): Metadata {
  const description =
    input.description ||
    `Book the ${input.roomName} at Grand Hotel Opduin. ${input.roomSize}m² of luxury with stunning views. From €${input.roomPrice}/night.`;

  return generateMetadata({
    ...input,
    title: input.roomName,
    description,
    pageType: 'room-detail',
    keywords: [
      'hotel room',
      'texel accommodation',
      input.roomCategory,
      input.roomName.toLowerCase(),
      'luxury room',
    ],
  });
}

/**
 * Generate metadata for offer detail pages
 */
export function generateOfferMetadata(input: OfferMetaInput): Metadata {
  const description =
    input.description ||
    `${input.offerTitle} - Special package at Grand Hotel Opduin. From €${input.offerPrice}. ${input.validUntil ? `Valid until ${input.validUntil}.` : ''}`;

  return generateMetadata({
    ...input,
    title: input.offerTitle,
    description,
    pageType: 'offer-detail',
    keywords: ['hotel offer', 'special package', 'texel deal', input.offerTitle.toLowerCase()],
  });
}

/**
 * Generate metadata for blog posts
 */
export function generateArticleMetadata(input: ArticleMetaInput): Metadata {
  return generateMetadata({
    ...input,
    title: input.articleTitle,
    pageType: 'blog-post',
    keywords: input.tags || [input.category, 'texel', 'hotel blog'],
  });
}

// ============================================
// STATIC PAGE METADATA
// ============================================

export const homeMetadata: Metadata = generateMetadata({
  title: 'Grand Hotel Opduin | Luxury Hotel on Texel Island',
  description:
    'Experience luxury at Grand Hotel Opduin, a boutique hotel on the stunning island of Texel. Indulge in wellness, fine dining, and breathtaking dune views.',
  pageType: 'home',
  keywords: ['texel hotel', 'luxury hotel', 'boutique hotel', 'dutch island', 'beach hotel'],
});

export const roomsMetadata: Metadata = generateMetadata({
  title: 'Rooms & Suites',
  description:
    'Discover our collection of luxury rooms and suites at Grand Hotel Opduin. Sea views, dune vistas, and premium comfort on Texel Island.',
  pageType: 'rooms',
  url: `${SITE_CONFIG.siteUrl}/rooms`,
  keywords: ['hotel rooms', 'suites', 'sea view room', 'luxury accommodation', 'texel'],
});

export const restaurantMetadata: Metadata = generateMetadata({
  title: 'Restaurant',
  description:
    'Savor local Texel cuisine at Restaurant Opduin. Fresh seafood, farm-to-table ingredients, and seasonal menus in an elegant setting.',
  pageType: 'restaurant',
  url: `${SITE_CONFIG.siteUrl}/restaurant`,
  keywords: ['texel restaurant', 'fine dining', 'seafood', 'dutch cuisine', 'hotel restaurant'],
});

export const wellnessMetadata: Metadata = generateMetadata({
  title: 'Wellness & Spa',
  description:
    'Relax and rejuvenate at our wellness center. Indoor pool, saunas, massages, and spa treatments with views of the Texel dunes.',
  pageType: 'wellness',
  url: `${SITE_CONFIG.siteUrl}/wellness`,
  keywords: ['hotel spa', 'wellness', 'massage', 'sauna', 'indoor pool', 'texel'],
});

export const offersMetadata: Metadata = generateMetadata({
  title: 'Special Offers',
  description:
    'Explore our special packages and seasonal offers. Romantic escapes, wellness retreats, and family adventures on Texel Island.',
  pageType: 'offers',
  url: `${SITE_CONFIG.siteUrl}/offers`,
  keywords: ['hotel deals', 'special offers', 'packages', 'discount', 'texel vacation'],
});

export const islandMetadata: Metadata = generateMetadata({
  title: 'Discover Texel',
  description:
    'Explore the natural beauty of Texel Island. Sandy beaches, nature reserves, charming villages, and outdoor adventures await.',
  pageType: 'island',
  url: `${SITE_CONFIG.siteUrl}/island`,
  keywords: ['texel island', 'wadden sea', 'dutch island', 'nature reserve', 'beaches'],
});

export const blogMetadata: Metadata = generateMetadata({
  title: 'Blog',
  description:
    'Travel tips, local recommendations, and stories from Texel Island. Discover the best of Grand Hotel Opduin and beyond.',
  pageType: 'blog',
  url: `${SITE_CONFIG.siteUrl}/blog`,
  keywords: ['texel blog', 'travel tips', 'island guide', 'hotel news'],
});

export const contactMetadata: Metadata = generateMetadata({
  title: 'Contact',
  description:
    'Get in touch with Grand Hotel Opduin. We\'re here to help with reservations, inquiries, and special requests.',
  pageType: 'contact',
  url: `${SITE_CONFIG.siteUrl}/contact`,
});

export const bookingMetadata: Metadata = generateMetadata({
  title: 'Book Your Stay',
  description:
    'Reserve your room at Grand Hotel Opduin. Check availability, select your dates, and book directly for the best rates.',
  pageType: 'booking',
  url: `${SITE_CONFIG.siteUrl}/book`,
  noIndex: true,
});
