import type { NextConfig } from "next";

/**
 * Grand Hotel Opduin - Next.js Configuration
 * Optimized for performance: LCP ≤2.0s, CLS ≤0.05, INP ≤200ms
 */

const nextConfig: NextConfig = {
  // ============================================
  // IMAGE OPTIMIZATION
  // ============================================
  images: {
    // Modern format support (AVIF > WebP > original)
    formats: ['image/avif', 'image/webp'],

    // Device breakpoints for srcset generation
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],

    // Image sizes for fixed-width images
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],

    // Long cache TTL for optimized images (30 days)
    minimumCacheTTL: 60 * 60 * 24 * 30,

    // Remote patterns for external images
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "**.strapi.io",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
      },
    ],

    // Disable default loader to use custom optimization
    // loader: 'custom',
    // loaderFile: './lib/media/image-loader.ts',

    // Disable static image imports if using CMS
    // disableStaticImages: true,

    // Quality for optimized images
    // quality: 80,
  },

  // ============================================
  // PERFORMANCE OPTIMIZATIONS
  // ============================================
  experimental: {
    // Enable CSS optimization
    // optimizeCss: true,

    // Optimize package imports
    optimizePackageImports: [
      'lucide-react',
      'framer-motion',
    ],
  },

  // ============================================
  // COMPILER OPTIONS
  // ============================================
  compiler: {
    // Remove console.log in production
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },

  // ============================================
  // HEADERS FOR PERFORMANCE & SECURITY
  // ============================================
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          // Security headers
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          // Permissions Policy (disable unused features)
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(self)',
          },
        ],
      },
      // Cache static assets aggressively
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // Cache fonts
      {
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  // ============================================
  // REDIRECTS
  // ============================================
  async redirects() {
    return [
      // Redirect old URLs if needed
      // {
      //   source: '/old-path',
      //   destination: '/new-path',
      //   permanent: true,
      // },
    ];
  },

  // ============================================
  // REWRITES FOR API PROXY
  // ============================================
  async rewrites() {
    return [
      // Proxy Strapi API calls (optional, for CORS issues)
      // {
      //   source: '/api/cms/:path*',
      //   destination: `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/:path*`,
      // },
    ];
  },

  // ============================================
  // ENVIRONMENT VARIABLES (public)
  // ============================================
  env: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.grandhoteloduin.nl',
  },

  // ============================================
  // BUILD OPTIONS
  // ============================================
  // Strict mode for React
  reactStrictMode: true,

  // Disable x-powered-by header
  poweredByHeader: false,

  // Generate ETags for caching
  generateEtags: true,

  // Compress responses
  compress: true,
};

export default nextConfig;
