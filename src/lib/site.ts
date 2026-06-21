/**
 * Central site metadata used across SEO surfaces (metadata, sitemap, robots,
 * JSON-LD). Set `NEXT_PUBLIC_SITE_URL` in the environment for the production
 * domain; the fallback keeps local/build runs working.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://bewear-navy.vercel.app"
).replace(/\/$/, "");

export const SITE_NAME = "BEWEAR";

export const SITE_TITLE = "BEWEAR — Premium Streetwear & Sneakers";

export const SITE_DESCRIPTION =
  "Shop the latest drops in premium streetwear, sneakers and accessories. Engineered for everyday motion.";
