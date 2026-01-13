import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "./i18n/config";

export default createMiddleware({
  // A list of all locales that are supported
  locales,

  // Used when no locale matches
  defaultLocale,

  // Don't add locale prefix for the default locale
  localePrefix: "as-needed",
});

export const config = {
  // Match all pathnames except for
  // - api routes
  // - _next (Next.js internals)
  // - static files (images, favicon, etc.)
  matcher: [
    // Match all pathnames except for
    "/((?!api|_next|_vercel|.*\\..*).*)",
  ],
};
