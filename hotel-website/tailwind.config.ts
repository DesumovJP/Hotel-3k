import type { Config } from "tailwindcss";

/**
 * Grand Hotel Opduin - Premium Design System
 * Brand Colors: Shell #a79f88, Navy #212943
 * "Hamptons of the Wadden" - Luxury coastal aesthetic
 */

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // ============================================
      // COLOR SYSTEM - Brand-aligned palette
      // ============================================
      colors: {
        // Shell/Taupe - Brand Primary (warm accent)
        shell: {
          50: "#FAFAF8",
          100: "#F5F4F1",
          200: "#E8E6E0",
          300: "#D4D0C6",
          400: "#BFB9AB",
          500: "#a79f88", // Brand color
          600: "#918A74",
          700: "#7A7461",
          800: "#635E4F",
          900: "#4D493D",
          DEFAULT: "#a79f88",
        },
        // Navy - Brand Secondary (CTAs & Text)
        navy: {
          50: "#F0F1F4",
          100: "#D8DBE4",
          200: "#B1B7C9",
          300: "#8A93AE",
          400: "#636F93",
          500: "#3D4B78",
          600: "#313D61",
          700: "#212943", // Brand color
          800: "#1A2136",
          900: "#131829",
          DEFAULT: "#212943",
        },
        // Sand - Warm backgrounds (derived from shell)
        sand: {
          50: "#FDFCFB",
          100: "#FAF9F6",
          200: "#F5F3EE",
          300: "#EFEAE2",
          400: "#E5DED2",
          500: "#D8CFC0",
          600: "#C4B9A6",
          DEFAULT: "#FAF9F6",
        },
        // Cream - Card backgrounds
        cream: {
          50: "#FFFFFF",
          100: "#FEFEFE",
          200: "#FCFCFB",
          300: "#FAFAF8",
          DEFAULT: "#FEFEFE",
        },
        // Ink - Text colors (based on navy)
        ink: {
          50: "#F5F5F6",
          100: "#E5E6E8",
          200: "#CBCDD1",
          300: "#A8ABB3",
          400: "#7A7E89",
          500: "#4D525F",
          600: "#363B47",
          700: "#212943",
          800: "#1A1F2E",
          900: "#0D1017",
          DEFAULT: "#212943",
        },
        // Accent Gold (for special highlights)
        gold: {
          50: "#FBF9F3",
          100: "#F7F2E6",
          200: "#EFE5CD",
          300: "#E7D8B4",
          400: "#D4BC82",
          500: "#C1A050",
          600: "#A68838",
          700: "#7D662A",
          800: "#54441C",
          900: "#2B220E",
          DEFAULT: "#C1A050",
        },
        // Semantic Colors
        success: {
          light: "#E8F5E9",
          DEFAULT: "#4CAF50",
          dark: "#2E7D32",
        },
        warning: {
          light: "#FFF8E1",
          DEFAULT: "#FFC107",
          dark: "#F57F17",
        },
        error: {
          light: "#FFEBEE",
          DEFAULT: "#F44336",
          dark: "#C62828",
        },
      },

      // ============================================
      // TYPOGRAPHY
      // ============================================
      fontFamily: {
        display: ["var(--font-playfair)", "Georgia", "serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: {
        // Fluid Typography Scale
        "display-2xl": ["clamp(3rem, 7vw, 5rem)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-xl": ["clamp(2.5rem, 5vw, 4rem)", { lineHeight: "1.15", letterSpacing: "-0.02em" }],
        "display-lg": ["clamp(2rem, 4vw, 3rem)", { lineHeight: "1.2", letterSpacing: "-0.015em" }],
        "display-md": ["clamp(1.5rem, 3vw, 2.25rem)", { lineHeight: "1.25", letterSpacing: "-0.01em" }],
        "display-sm": ["clamp(1.25rem, 2.5vw, 1.75rem)", { lineHeight: "1.3", letterSpacing: "-0.01em" }],
        "body-xl": ["1.25rem", { lineHeight: "1.6" }],
        "body-lg": ["1.125rem", { lineHeight: "1.6" }],
        "body-md": ["1rem", { lineHeight: "1.6" }],
        "body-sm": ["0.875rem", { lineHeight: "1.5" }],
        "body-xs": ["0.75rem", { lineHeight: "1.5" }],
        overline: ["0.75rem", { lineHeight: "1.4", letterSpacing: "0.12em" }],
      },
      letterSpacing: {
        tighter: "-0.02em",
        tight: "-0.01em",
        normal: "0",
        wide: "0.02em",
        wider: "0.05em",
        widest: "0.12em",
        luxury: "0.2em",
      },

      // ============================================
      // SPACING
      // ============================================
      spacing: {
        "section-sm": "clamp(3rem, 6vw, 4.5rem)",
        "section-md": "clamp(4.5rem, 9vw, 6rem)",
        "section-lg": "clamp(6rem, 12vw, 9rem)",
        gutter: "clamp(1.5rem, 4vw, 4rem)",
      },

      // ============================================
      // MOTION
      // ============================================
      transitionDuration: {
        "120": "120ms",
        "180": "180ms",
        "240": "240ms",
        "300": "300ms",
        "450": "450ms",
        "600": "600ms",
      },
      transitionTimingFunction: {
        "premium-in": "cubic-bezier(0.22, 1, 0.36, 1)",
        "premium-out": "cubic-bezier(0.33, 1, 0.68, 1)",
        spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "fade-in": "fade-in 600ms cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "fade-up": "fade-up 600ms cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "scale-in": "scale-in 450ms cubic-bezier(0.22, 1, 0.36, 1) forwards",
        shimmer: "shimmer 2s linear infinite",
      },

      // ============================================
      // ELEVATION
      // ============================================
      boxShadow: {
        "elevation-1": "0 1px 2px rgba(33, 41, 67, 0.04), 0 1px 3px rgba(33, 41, 67, 0.08)",
        "elevation-2": "0 2px 4px rgba(33, 41, 67, 0.04), 0 4px 8px rgba(33, 41, 67, 0.08)",
        "elevation-3": "0 4px 8px rgba(33, 41, 67, 0.04), 0 8px 24px rgba(33, 41, 67, 0.08)",
        "elevation-4": "0 8px 16px rgba(33, 41, 67, 0.06), 0 16px 48px rgba(33, 41, 67, 0.12)",
        "glow-shell": "0 0 20px rgba(167, 159, 136, 0.3), 0 0 40px rgba(167, 159, 136, 0.15)",
        "glow-gold": "0 0 20px rgba(193, 160, 80, 0.3), 0 0 40px rgba(193, 160, 80, 0.15)",
        "focus-ring": "0 0 0 2px #a79f88, 0 0 0 4px rgba(167, 159, 136, 0.2)",
      },

      // ============================================
      // LAYOUT
      // ============================================
      maxWidth: {
        "content-sm": "640px",
        "content-md": "768px",
        "content-lg": "1024px",
        "content-xl": "1280px",
        "content-2xl": "1440px",
      },
      screens: {
        xs: "475px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      aspectRatio: {
        "4/3": "4 / 3",
        "3/2": "3 / 2",
        "16/9": "16 / 9",
        hero: "16 / 7",
        card: "4 / 5",
        room: "3 / 2",
      },
      borderRadius: {
        sm: "0.125rem",
        DEFAULT: "0.25rem",
        md: "0.375rem",
        lg: "0.5rem",
        xl: "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      zIndex: {
        drawer: "40",
        modal: "50",
        popover: "60",
        tooltip: "70",
        toast: "80",
        overlay: "90",
        max: "100",
      },
    },
  },
  plugins: [],
};

export default config;
