import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { CustomCursor } from "@/components/effects/CustomCursor";
import { FilmGrain } from "@/components/effects/FilmGrain";
import { SmoothScrollProvider } from "@/components/providers/SmoothScroll";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
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
      <body className={`${playfair.variable} ${inter.variable} antialiased`}>
        <SmoothScrollProvider>
          <CustomCursor />
          <FilmGrain opacity={0.025} />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
