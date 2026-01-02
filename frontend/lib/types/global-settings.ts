/**
 * GlobalSettings Types for Strapi Integration
 * Single Type: GlobalSettings
 */

// Social Link Type (Facebook, Instagram)
export interface SocialLink {
  id: number;
  name: string;
  url: string;
  icon: "facebook" | "instagram";
}

// Footer Navigation Link
export interface FooterLink {
  id: number;
  name: string;
  slug: string;
}

// Legal Link (Privacy, Terms, Cookies)
export interface LegalLink {
  id: number;
  name: string;
  slug: string;
}

// Contact Information
export interface ContactInfo {
  address: string;
  addressLine2?: string;
  city: string;
  postalCode: string;
  country: string;
  phone: string;
  email: string;
}

// Global Settings Single Type
export interface GlobalSettings {
  id: number;
  attributes: {
    // Brand
    siteName: string;
    tagline: string;

    // Contact Information
    contact: ContactInfo;

    // Social Media Links
    socialLinks: SocialLink[];

    // Footer Navigation
    footerLinks: FooterLink[];

    // Legal Links
    legalLinks: LegalLink[];

    // SEO & Meta
    seoDefaultTitle?: string;
    seoDefaultDescription?: string;

    // Timestamps
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

// API Response Types
export interface GlobalSettingsResponse {
  data: GlobalSettings;
  meta: Record<string, unknown>;
}

// Flattened Props for Component Usage
export interface FooterLuxeProps {
  siteName: string;
  tagline: string;
  contact: ContactInfo;
  socialLinks: SocialLink[];
  footerLinks: FooterLink[];
  legalLinks: LegalLink[];
}

// Helper function to transform Strapi response to component props
export function transformGlobalSettings(
  response: GlobalSettingsResponse
): FooterLuxeProps {
  const { attributes } = response.data;

  return {
    siteName: attributes.siteName,
    tagline: attributes.tagline,
    contact: attributes.contact,
    socialLinks: attributes.socialLinks,
    footerLinks: attributes.footerLinks,
    legalLinks: attributes.legalLinks,
  };
}
