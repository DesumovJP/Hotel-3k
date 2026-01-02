/**
 * Google Tag Manager Integration
 * Grand Hotel Opduin - GTM Setup & Utilities
 */

// ============================================
// GTM CONFIGURATION
// ============================================

export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || '';
export const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID || '';

// ============================================
// DATAAYER UTILITIES
// ============================================

/**
 * Initialize GTM dataLayer
 */
export function initializeDataLayer(): void {
  if (typeof window === 'undefined') return;

  window.dataLayer = window.dataLayer || [];
}

/**
 * Push to dataLayer with timestamp
 */
export function pushToDataLayer(data: Record<string, unknown>): void {
  if (typeof window === 'undefined') return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    ...data,
    timestamp: new Date().toISOString(),
  });
}

// ============================================
// PAGE VIEW TRACKING
// ============================================

export interface PageViewData {
  page_path: string;
  page_title: string;
  page_type: string;
  content_group?: string;
  user_language?: string;
}

export function trackPageView(data: PageViewData): void {
  pushToDataLayer({
    event: 'page_view',
    ...data,
  });
}

// ============================================
// ECOMMERCE TRACKING
// ============================================

export interface EcommerceItem {
  item_id: string;
  item_name: string;
  item_category: string;
  item_category2?: string;
  price: number;
  quantity: number;
  currency: string;
}

export interface EcommerceData {
  currency: string;
  value: number;
  items: EcommerceItem[];
}

export function trackViewItem(item: EcommerceItem): void {
  pushToDataLayer({
    event: 'view_item',
    ecommerce: {
      currency: item.currency,
      value: item.price,
      items: [item],
    },
  });
}

export function trackAddToCart(items: EcommerceItem[], value: number): void {
  pushToDataLayer({
    event: 'add_to_cart',
    ecommerce: {
      currency: 'EUR',
      value,
      items,
    },
  });
}

export function trackBeginCheckout(data: EcommerceData): void {
  pushToDataLayer({
    event: 'begin_checkout',
    ecommerce: data,
  });
}

export function trackPurchase(
  transactionId: string,
  data: EcommerceData
): void {
  pushToDataLayer({
    event: 'purchase',
    ecommerce: {
      transaction_id: transactionId,
      ...data,
    },
  });
}

// ============================================
// USER DATA
// ============================================

export interface UserData {
  user_id?: string;
  user_type?: 'guest' | 'returning' | 'member';
  newsletter_subscribed?: boolean;
  preferred_language?: string;
}

export function setUserData(userData: UserData): void {
  pushToDataLayer({
    event: 'user_data',
    user: userData,
  });
}

// ============================================
// CONSENT MANAGEMENT
// ============================================

export type ConsentCategory = 'necessary' | 'analytics' | 'marketing' | 'personalization';

export interface ConsentState {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  personalization: boolean;
}

export function updateConsent(consent: ConsentState): void {
  pushToDataLayer({
    event: 'consent_update',
    consent,
  });

  // Update GTM consent state
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('consent', 'update', {
      analytics_storage: consent.analytics ? 'granted' : 'denied',
      ad_storage: consent.marketing ? 'granted' : 'denied',
      personalization_storage: consent.personalization ? 'granted' : 'denied',
    });
  }
}

// ============================================
// GTM SCRIPT COMPONENT HELPERS
// ============================================

/**
 * Get GTM script for head
 */
export function getGTMHeadScript(): string {
  if (!GTM_ID) return '';

  return `
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','${GTM_ID}');
  `;
}

/**
 * Get GTM noscript for body
 */
export function getGTMBodyScript(): string {
  if (!GTM_ID) return '';

  return `
    <noscript>
      <iframe
        src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}"
        height="0"
        width="0"
        style="display:none;visibility:hidden"
      ></iframe>
    </noscript>
  `;
}

// ============================================
// DEBUG UTILITIES
// ============================================

export function enableDebugMode(): void {
  if (typeof window === 'undefined') return;

  // Enable GTM debug mode
  const url = new URL(window.location.href);
  url.searchParams.set('gtm_debug', '1');
  window.history.replaceState({}, '', url.toString());
}

export function getDataLayerHistory(): Record<string, unknown>[] {
  if (typeof window === 'undefined') return [];
  return window.dataLayer || [];
}
