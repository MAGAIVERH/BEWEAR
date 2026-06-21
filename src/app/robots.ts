import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Keep private / transactional routes out of the index.
      disallow: [
        "/api/",
        "/cart/",
        "/checkout/",
        "/my-orders",
        "/account",
        "/wishlist",
        "/authentication",
      ],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
