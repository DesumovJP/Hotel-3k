/**
 * Image Utilities
 * Grand Hotel Opduin - Media Optimization Pipeline
 */

// ============================================
// IMAGE FORMAT DETECTION
// ============================================

/**
 * Check if browser supports AVIF format
 */
export async function supportsAvif(): Promise<boolean> {
  if (typeof window === 'undefined') return false;

  const avifData =
    'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKBzgABpAQ0AIAMQgAoIAAAAABAAEBAAAh/LM';

  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = avifData;
  });
}

/**
 * Check if browser supports WebP format
 */
export async function supportsWebp(): Promise<boolean> {
  if (typeof window === 'undefined') return false;

  const webpData =
    'data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=';

  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = webpData;
  });
}

// ============================================
// SRCSET GENERATION
// ============================================

export interface SrcSetOptions {
  widths?: number[];
  format?: 'auto' | 'avif' | 'webp' | 'jpg';
  quality?: number;
}

const DEFAULT_WIDTHS = [640, 750, 828, 1080, 1200, 1920, 2048, 3840];

/**
 * Generate srcset string for responsive images
 */
export function generateSrcSet(
  basePath: string,
  options: SrcSetOptions = {}
): string {
  const { widths = DEFAULT_WIDTHS, format = 'auto', quality = 80 } = options;

  // For Next.js Image optimization
  const params = new URLSearchParams();
  if (format !== 'auto') {
    params.set('fm', format);
  }
  params.set('q', quality.toString());

  return widths
    .map((width) => {
      const url = `${basePath}?w=${width}&${params.toString()}`;
      return `${url} ${width}w`;
    })
    .join(', ');
}

/**
 * Generate sizes attribute for responsive images
 */
export function generateSizes(breakpoints: { [key: string]: string }): string {
  const entries = Object.entries(breakpoints);
  const sizes: string[] = [];

  // Sort by breakpoint value descending
  entries.sort((a, b) => {
    const aValue = parseInt(a[0]) || 0;
    const bValue = parseInt(b[0]) || 0;
    return bValue - aValue;
  });

  for (const [breakpoint, size] of entries) {
    if (breakpoint === 'default') {
      sizes.push(size);
    } else {
      sizes.push(`(min-width: ${breakpoint}px) ${size}`);
    }
  }

  return sizes.join(', ');
}

// ============================================
// PLACEHOLDER GENERATION
// ============================================

/**
 * Generate a blur placeholder data URL
 */
export function generateBlurPlaceholder(
  color: string = '#F5E9DA'
): string {
  // Simple 1x1 pixel SVG placeholder
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"><rect fill="${color}" width="1" height="1"/></svg>`;
  return `data:image/svg+xml;base64,${btoa(svg)}`;
}

/**
 * Generate shimmer placeholder data URL
 */
export function generateShimmerPlaceholder(
  width: number = 700,
  height: number = 475
): string {
  const shimmerColor = '#F5E9DA';
  const highlightColor = '#FFFFFF';

  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="shimmer" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style="stop-color:${shimmerColor}">
            <animate attributeName="offset" values="-2;1" dur="2s" repeatCount="indefinite"/>
          </stop>
          <stop offset="50%" style="stop-color:${highlightColor}">
            <animate attributeName="offset" values="-1;2" dur="2s" repeatCount="indefinite"/>
          </stop>
          <stop offset="100%" style="stop-color:${shimmerColor}">
            <animate attributeName="offset" values="0;3" dur="2s" repeatCount="indefinite"/>
          </stop>
        </linearGradient>
      </defs>
      <rect fill="url(#shimmer)" width="${width}" height="${height}"/>
    </svg>
  `;

  return `data:image/svg+xml;base64,${btoa(svg.trim())}`;
}

// ============================================
// IMAGE LOADING UTILITIES
// ============================================

export type ImagePriority = 'high' | 'low' | 'auto';
export type ImageLoading = 'lazy' | 'eager';

/**
 * Determine image loading strategy based on position
 */
export function getImageLoadingStrategy(
  isAboveFold: boolean
): { loading: ImageLoading; priority: boolean; fetchPriority: ImagePriority } {
  if (isAboveFold) {
    return {
      loading: 'eager',
      priority: true,
      fetchPriority: 'high',
    };
  }

  return {
    loading: 'lazy',
    priority: false,
    fetchPriority: 'auto',
  };
}

/**
 * Get optimal image dimensions for container
 */
export function getOptimalDimensions(
  containerWidth: number,
  aspectRatio: number = 16 / 9,
  devicePixelRatio: number = 2
): { width: number; height: number } {
  const width = Math.min(containerWidth * devicePixelRatio, 3840);
  const height = Math.round(width / aspectRatio);

  return { width, height };
}

// ============================================
// PRELOAD UTILITIES
// ============================================

/**
 * Preload critical images
 */
export function preloadImage(src: string, options: {
  as?: 'image';
  type?: string;
  fetchpriority?: 'high' | 'low' | 'auto';
} = {}): void {
  if (typeof document === 'undefined') return;

  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = options.as || 'image';
  link.href = src;

  if (options.type) {
    link.type = options.type;
  }

  if (options.fetchpriority) {
    link.setAttribute('fetchpriority', options.fetchpriority);
  }

  document.head.appendChild(link);
}

/**
 * Preload multiple images
 */
export function preloadImages(
  sources: string[],
  options?: Parameters<typeof preloadImage>[1]
): void {
  sources.forEach((src) => preloadImage(src, options));
}

// ============================================
// INTERSECTION OBSERVER UTILITIES
// ============================================

export interface LazyLoadOptions {
  rootMargin?: string;
  threshold?: number | number[];
  onLoad?: () => void;
}

/**
 * Create lazy load observer
 */
export function createLazyLoadObserver(
  options: LazyLoadOptions = {}
): IntersectionObserver | null {
  if (typeof IntersectionObserver === 'undefined') return null;

  const { rootMargin = '200px', threshold = 0 } = options;

  return new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          const src = img.dataset.src;
          const srcset = img.dataset.srcset;

          if (src) {
            img.src = src;
            delete img.dataset.src;
          }

          if (srcset) {
            img.srcset = srcset;
            delete img.dataset.srcset;
          }

          observer.unobserve(img);
          options.onLoad?.();
        }
      });
    },
    { rootMargin, threshold }
  );
}

// ============================================
// ASPECT RATIO UTILITIES
// ============================================

export const ASPECT_RATIOS = {
  hero: 16 / 7,
  room: 3 / 2,
  card: 4 / 5,
  portrait: 3 / 4,
  landscape: 16 / 9,
  square: 1,
  wide: 2 / 1,
  ultrawide: 21 / 9,
} as const;

export type AspectRatioKey = keyof typeof ASPECT_RATIOS;

/**
 * Calculate padding for aspect ratio container
 */
export function getAspectRatioPadding(ratio: number | AspectRatioKey): string {
  const numericRatio = typeof ratio === 'string' ? ASPECT_RATIOS[ratio] : ratio;
  return `${(1 / numericRatio) * 100}%`;
}

// ============================================
// STRAPI IMAGE URL HELPERS
// ============================================

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

/**
 * Get full URL for Strapi media
 */
export function getStrapiMediaUrl(path: string | null | undefined): string {
  if (!path) return '';

  // Already a full URL
  if (path.startsWith('http')) return path;

  // Relative path
  return `${STRAPI_URL}${path}`;
}

/**
 * Get Strapi image with format transformation
 */
export function getStrapiImageUrl(
  path: string,
  options: { format?: 'thumbnail' | 'small' | 'medium' | 'large' } = {}
): string {
  if (!path) return '';

  const baseUrl = getStrapiMediaUrl(path);

  // Strapi v5 formats are stored as separate URLs
  // This is a simplified version - actual implementation depends on Strapi response structure
  if (options.format && !path.startsWith('http')) {
    const parts = path.split('/');
    const filename = parts.pop() || '';
    const dir = parts.join('/');
    return `${STRAPI_URL}${dir}/${options.format}_${filename}`;
  }

  return baseUrl;
}
