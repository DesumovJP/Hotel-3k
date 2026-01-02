/**
 * Analytics Module
 * Grand Hotel Opduin
 */

// Events
export {
  trackEvent,
  trackViewContent,
  trackStartBooking,
  trackSelectDates,
  trackSelectRoom,
  trackAddUpsell,
  trackCompleteBooking,
  trackGalleryInteraction,
  trackFormInteraction,
} from './events';

export type {
  AnalyticsEvent,
  ContentType,
  BookingSource,
  UpsellType,
  ViewContentEvent,
  StartBookingEvent,
  SelectDatesEvent,
  SelectRoomEvent,
  AddUpsellEvent,
  CompleteBookingEvent,
  FilterChangeEvent,
  GalleryInteractionEvent,
  FormInteractionEvent,
} from './events';

// A/B Testing
export {
  AB_TESTS,
  getVariant,
  useABTest,
  isVariant,
  forceVariant,
  clearAssignments,
  getAllAssignments,
  getCTALabel,
  getHeroMediaType,
  getBenefitsOrder,
  CTA_LABELS,
  BENEFITS_ORDER,
} from './ab-testing';

export type {
  ABTest,
  CTAVariant,
  HeroMediaVariant,
  BenefitsOrderVariant,
} from './ab-testing';

// GTM
export {
  GTM_ID,
  GA4_ID,
  initializeDataLayer,
  pushToDataLayer,
  trackPageView,
  trackViewItem,
  trackAddToCart,
  trackBeginCheckout,
  trackPurchase,
  setUserData,
  updateConsent,
  getGTMHeadScript,
  getGTMBodyScript,
  enableDebugMode,
  getDataLayerHistory,
} from './gtm';

export type {
  PageViewData,
  EcommerceItem,
  EcommerceData,
  UserData,
  ConsentCategory,
  ConsentState,
} from './gtm';
