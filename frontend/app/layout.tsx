import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import { CustomCursor } from "@/components/effects/CustomCursor";
import { FilmGrain } from "@/components/effects/FilmGrain";
import { SmoothScrollProvider } from "@/components/providers/SmoothScroll";
import { Header } from "@/components/organisms";

const cormorant = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${cormorant.variable} ${dmSans.variable} antialiased`}>
        {/* Fixed elements outside SmoothScrollProvider for proper positioning */}
        <Header />
        <CustomCursor />
        <FilmGrain opacity={0.025} />
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
