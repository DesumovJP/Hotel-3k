import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import { locales, type Locale } from "@/i18n/config";
import "@/app/globals.css";
import { Header } from "@/components/organisms";
import { CustomCursor } from "@/components/effects/CustomCursor";
import { FilmGrain } from "@/components/effects/FilmGrain";
import { SmoothScrollProvider } from "@/components/providers/SmoothScroll";

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

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Providing all messages to the client side
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${cormorant.variable} ${dmSans.variable} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          {/* Fixed elements outside SmoothScrollProvider for proper positioning */}
          <Header />
          <CustomCursor />
          <FilmGrain opacity={0.025} />
          <SmoothScrollProvider>
            {children}
          </SmoothScrollProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
