import { ilike, inArray, or } from "drizzle-orm";
import type { Metadata } from "next";

import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import ProductItem from "@/components/common/product-item";
import { db } from "@/db";
import { categoryTable, productTable } from "@/db/schema";

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export async function generateMetadata({
  searchParams,
}: SearchPageProps): Promise<Metadata> {
  const { q } = await searchParams;
  const query = (q ?? "").trim();
  return {
    title: query ? `Search: ${query}` : "Search",
    description:
      "Search premium streetwear, sneakers and accessories at BEWEAR.",
    // Search result pages should not be indexed.
    robots: { index: false, follow: true },
    alternates: { canonical: "/search" },
  };
}

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const { q } = await searchParams;
  const query = (q ?? "").trim();

  // Categories matching the term (e.g. "T-Shirts", "Sneakers") so a search by
  // category name also returns that category's products.
  const matchingCategoryIds = query
    ? (
        await db.query.categoryTable.findMany({
          where: ilike(categoryTable.name, `%${query}%`),
          columns: { id: true },
        })
      ).map((category) => category.id)
    : [];

  const products = query
    ? await db.query.productTable.findMany({
        where: or(
          ilike(productTable.name, `%${query}%`),
          ilike(productTable.description, `%${query}%`),
          matchingCategoryIds.length > 0
            ? inArray(productTable.categoryId, matchingCategoryIds)
            : undefined,
        ),
        with: {
          variants: true,
        },
      })
    : [];

  return (
    <>
      <Header />

      <main id="main-content" className="px-5 py-10 md:px-8 lg:px-12">
        <div className="space-y-2">
          <p className="text-eyebrow-brand">Search</p>
          <h1 className="section-title">
            {query ? `Results for “${query}”` : "Search"}
          </h1>
          {query && (
            <p className="text-muted-foreground text-sm">
              {products.length} {products.length === 1 ? "result" : "results"}
            </p>
          )}
        </div>

        {!query ? (
          <div className="flex flex-col items-center justify-center gap-2 py-24 text-center">
            <p className="text-lg font-semibold">Search the store</p>
            <p className="text-muted-foreground text-sm">
              Type a product name to get started.
            </p>
          </div>
        ) : products.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 py-24 text-center">
            <p className="text-lg font-semibold">No results found</p>
            <p className="text-muted-foreground text-sm">
              Try a different search term.
            </p>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <ProductItem key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </>
  );
};

export default SearchPage;
