import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import Breadcrumbs from "@/components/common/breadcrumbs";
import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import Pagination from "@/components/common/pagination";
import ProductFilters from "@/components/common/product-filters";
import ProductItem from "@/components/common/product-item";
import { db } from "@/db";
import { categoryTable, productTable } from "@/db/schema";

const PAGE_SIZE = 8;

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{
    color?: string;
    sort?: string;
    minPrice?: string;
    maxPrice?: string;
    page?: string;
  }>;
}

const getFirstVariantPrice = (product: {
  variants: { priceInCents: number }[];
}) => product.variants[0]?.priceInCents ?? 0;

const CategoryPage = async ({ params, searchParams }: CategoryPageProps) => {
  const { slug } = await params;
  const { color, sort, minPrice, maxPrice, page } = await searchParams;

  const category = await db.query.categoryTable.findFirst({
    where: eq(categoryTable.slug, slug),
  });
  if (!category) {
    return notFound();
  }

  const allProducts = await db.query.productTable.findMany({
    where: eq(productTable.categoryId, category.id),
    with: {
      variants: true,
    },
  });

  const availableColors = Array.from(
    new Set(allProducts.flatMap((product) => product.variants.map((v) => v.color))),
  ).sort();

  // Filters
  const min = minPrice ? Number(minPrice) * 100 : undefined;
  const max = maxPrice ? Number(maxPrice) * 100 : undefined;

  let products = allProducts.filter((product) => {
    if (color && !product.variants.some((v) => v.color === color)) {
      return false;
    }
    const price = getFirstVariantPrice(product);
    if (min !== undefined && !Number.isNaN(min) && price < min) {
      return false;
    }
    if (max !== undefined && !Number.isNaN(max) && price > max) {
      return false;
    }
    return true;
  });

  // Sorting
  if (sort === "price-asc") {
    products = [...products].sort(
      (a, b) => getFirstVariantPrice(a) - getFirstVariantPrice(b),
    );
  } else if (sort === "price-desc") {
    products = [...products].sort(
      (a, b) => getFirstVariantPrice(b) - getFirstVariantPrice(a),
    );
  } else if (sort === "newest") {
    products = [...products].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  }

  // Pagination
  const totalProducts = products.length;
  const totalPages = Math.max(1, Math.ceil(totalProducts / PAGE_SIZE));
  const currentPage = Math.min(Math.max(1, Number(page ?? 1)), totalPages);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const paginatedProducts = products.slice(startIndex, startIndex + PAGE_SIZE);
  const rangeStart = totalProducts === 0 ? 0 : startIndex + 1;
  const rangeEnd = Math.min(startIndex + PAGE_SIZE, totalProducts);

  return (
    <>
      <Header />

      <div className="px-5 py-10 md:px-8 lg:px-12">
        <Breadcrumbs
          items={[{ label: "Home", href: "/" }, { label: category.name }]}
        />

        <div className="mt-6 space-y-2">
          <p className="text-eyebrow-brand">Category</p>
          <h1 className="section-title">{category.name}</h1>
          <p className="text-muted-foreground text-sm">
            {totalProducts === 0
              ? "No products"
              : `Showing ${rangeStart}–${rangeEnd} of ${totalProducts}`}
          </p>
        </div>

        <div className="mt-6">
          <Suspense fallback={<div className="h-16 border-y" />}>
            <ProductFilters availableColors={availableColors} />
          </Suspense>
        </div>

        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 py-24 text-center">
            <p className="text-lg font-semibold">No products found</p>
            <p className="text-muted-foreground text-sm">
              Try adjusting your filters.
            </p>
          </div>
        ) : (
          <>
            <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
              {paginatedProducts.map((product) => (
                <ProductItem key={product.id} product={product} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="mt-10">
                <Suspense fallback={null}>
                  <Pagination totalPages={totalPages} />
                </Suspense>
              </div>
            )}
          </>
        )}
      </div>

      <Footer />
    </>
  );
};

export default CategoryPage;
