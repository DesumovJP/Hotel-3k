/**
 * Media Module
 * Grand Hotel Opduin - Image & Media Optimization
 */

export {
  // Format detection
  supportsAvif,
  supportsWebp,

  // Srcset generation
  generateSrcSet,
  generateSizes,

  // Placeholders
  generateBlurPlaceholder,
  generateShimmerPlaceholder,

  // Loading strategies
  getImageLoadingStrategy,
  getOptimalDimensions,

  // Preloading
  preloadImage,
  preloadImages,

  // Lazy loading
  createLazyLoadObserver,

  // Aspect ratios
  ASPECT_RATIOS,
  getAspectRatioPadding,

  // Strapi helpers
  getStrapiMediaUrl,
  getStrapiImageUrl,
} from './image-utils';

export type {
  SrcSetOptions,
  ImagePriority,
  ImageLoading,
  LazyLoadOptions,
  AspectRatioKey,
} from './image-utils';
