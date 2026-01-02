/**
 * Strapi API Client
 * Fetches data from Strapi CMS
 */

import type {
  GlobalSettingsResponse,
  FooterLuxeProps,
} from "@/lib/types/global-settings";
import { transformGlobalSettings } from "@/lib/types/global-settings";
import { defaultFooterLuxeProps } from "@/components/organisms/FooterLuxe";

// Strapi API base URL from environment
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

// Default headers for API requests
const getHeaders = (): HeadersInit => {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (STRAPI_TOKEN) {
    headers["Authorization"] = `Bearer ${STRAPI_TOKEN}`;
  }

  return headers;
};

/**
 * Fetch global settings from Strapi
 * Falls back to default props if API is unavailable
 */
export async function fetchGlobalSettings(): Promise<FooterLuxeProps> {
  try {
    const response = await fetch(
      `${STRAPI_URL}/api/global-setting?populate=*`,
      {
        headers: getHeaders(),
        next: { revalidate: 3600 }, // Revalidate every hour
      }
    );

    if (!response.ok) {
      console.warn(
        `Failed to fetch global settings: ${response.status} ${response.statusText}`
      );
      return defaultFooterLuxeProps;
    }

    const data: GlobalSettingsResponse = await response.json();
    return transformGlobalSettings(data);
  } catch (error) {
    console.warn("Error fetching global settings, using defaults:", error);
    return defaultFooterLuxeProps;
  }
}

/**
 * GraphQL query for global settings (alternative to REST)
 */
export const GLOBAL_SETTINGS_QUERY = `
  query GlobalSettings {
    globalSetting {
      data {
        id
        attributes {
          siteName
          tagline
          contact {
            address
            addressLine2
            city
            postalCode
            country
            phone
            email
          }
          socialLinks {
            id
            name
            url
            icon
          }
          footerLinks {
            id
            name
            slug
          }
          legalLinks {
            id
            name
            slug
          }
          seoDefaultTitle
          seoDefaultDescription
        }
      }
    }
  }
`;

/**
 * Fetch global settings using GraphQL
 * Requires Strapi GraphQL plugin
 */
export async function fetchGlobalSettingsGraphQL(): Promise<FooterLuxeProps> {
  try {
    const response = await fetch(`${STRAPI_URL}/graphql`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({
        query: GLOBAL_SETTINGS_QUERY,
      }),
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      console.warn(
        `GraphQL request failed: ${response.status} ${response.statusText}`
      );
      return defaultFooterLuxeProps;
    }

    const { data } = await response.json();

    if (!data?.globalSetting?.data) {
      return defaultFooterLuxeProps;
    }

    return transformGlobalSettings({
      data: data.globalSetting.data,
      meta: {},
    });
  } catch (error) {
    console.warn("Error with GraphQL query, using defaults:", error);
    return defaultFooterLuxeProps;
  }
}
