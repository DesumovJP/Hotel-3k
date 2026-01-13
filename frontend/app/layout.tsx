import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Grand Hotel Opduin | Luxury Resort on Texel Island",
  description:
    "Experience the Hamptons of the Wadden at Grand Hotel Opduin. Luxury accommodations, world-class dining, and wellness on the beautiful island of Texel, Netherlands.",
  keywords: [
    "Grand Hotel Opduin",
    "Texel",
    "luxury hotel",
    "Netherlands",
    "Wadden",
    "beach resort",
    "spa",
    "wellness",
  ],
  openGraph: {
    title: "Grand Hotel Opduin | Luxury Resort on Texel Island",
    description:
      "Experience the Hamptons of the Wadden at Grand Hotel Opduin.",
    type: "website",
    locale: "en_US",
  },
};

type Props = {
  children: React.ReactNode;
};

// Root layout - minimal, locale-specific content handled in [locale]/layout
export default function RootLayout({ children }: Props) {
  return children;
}
