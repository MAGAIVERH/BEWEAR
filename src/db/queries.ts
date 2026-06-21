import { desc, eq } from "drizzle-orm";
import { unstable_cache } from "next/cache";

import { db } from "@/db";
import { categoryTable, productTable, productVariantTable } from "@/db/schema";

/**
 * Cached catalog reads.
 *
 * The catalog is effectively read-only at runtime (no in-app product mutations),
 * so we cache these queries with a time-based revalidation window and a shared
 * `catalog` tag. This keeps dynamic pages (PLP/PDP, which opt into dynamic
 * rendering via `searchParams`/session) from hitting Postgres on every request,
 * while staying fresh without a rebuild. Call `revalidateTag("catalog")` from a
 * future admin mutation to bust it on demand.
 */
export const CATALOG_REVALIDATE_SECONDS = 60 * 60; // 1 hour

const catalogCacheOptions = {
  revalidate: CATALOG_REVALIDATE_SECONDS,
  tags: ["catalog"],
};

/** All products with their variants (used by home rails and curated grids). */
export const getProductsWithVariants = unstable_cache(
  async () =>
    db.query.productTable.findMany({
      with: { variants: true },
    }),
  ["catalog:products-with-variants"],
  catalogCacheOptions,
);

/** Newest products first (home "New arrivals"). */
export const getNewestProductsWithVariants = unstable_cache(
  async () =>
    db.query.productTable.findMany({
      orderBy: [desc(productTable.createdAt)],
      with: { variants: true },
    }),
  ["catalog:newest-products"],
  catalogCacheOptions,
);

/** All categories. */
export const getCategories = unstable_cache(
  async () => db.query.categoryTable.findMany({}),
  ["catalog:categories"],
  catalogCacheOptions,
);

/** Products belonging to a single category (PLP + "you might also like"). */
export const getProductsByCategoryId = (categoryId: string) =>
  unstable_cache(
    async () =>
      db.query.productTable.findMany({
        where: eq(productTable.categoryId, categoryId),
        with: { variants: true },
      }),
    ["catalog:products-by-category", categoryId],
    catalogCacheOptions,
  )();

/** A category by its slug. */
export const getCategoryBySlug = (slug: string) =>
  unstable_cache(
    async () =>
      db.query.categoryTable.findFirst({
        where: eq(categoryTable.slug, slug),
      }),
    ["catalog:category-by-slug", slug],
    catalogCacheOptions,
  )();

/** A product variant by slug, with its product, sibling variants and category. */
export const getProductVariantBySlug = (slug: string) =>
  unstable_cache(
    async () =>
      db.query.productVariantTable.findFirst({
        where: eq(productVariantTable.slug, slug),
        with: {
          product: {
            with: {
              variants: true,
              category: true,
            },
          },
        },
      }),
    ["catalog:variant-by-slug", slug],
    catalogCacheOptions,
  )();
