import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";

import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import ProductList from "@/components/common/product-list";
import { db } from "@/db";
import { productTable, productVariantTable } from "@/db/schema";
import { formatCentsToUSD } from "@/helpers/money";
import { getGalleryImages } from "@/helpers/product-gallery";
import { getSizesForCategory } from "@/helpers/sizes";

import ProductActions from "./components/product-actions";
import ProductGallery from "./components/product-gallery";
import VariantSelector from "./components/variant-selector";

interface ProductVariantPageProps {
  params: Promise<{ slug: string }>;
}

const ProductVariantPage = async ({ params }: ProductVariantPageProps) => {
  const { slug } = await params;
  const productVariant = await db.query.productVariantTable.findFirst({
    where: eq(productVariantTable.slug, slug),
    with: {
      product: {
        with: {
          variants: true,
          category: true,
        },
      },
    },
  });
  if (!productVariant) {
    return notFound();
  }
  const sizes = getSizesForCategory(productVariant.product.category.slug);
  const galleryImages = getGalleryImages(
    productVariant.product.category.slug,
    productVariant.imageUrl,
  );
  const likelyProducts = await db.query.productTable.findMany({
    where: eq(productTable.categoryId, productVariant.product.categoryId),
    with: {
      variants: true,
    },
  });
  return (
    <>
      <Header />

      <div className="px-5 py-8 md:px-8 lg:px-12">
        <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-12">
          {/* Gallery */}
          <ProductGallery
            images={galleryImages}
            alt={`${productVariant.product.name} — ${productVariant.name}`}
          />

          {/* Info */}
          <div className="mt-8 space-y-8 lg:mt-0">
            <div className="space-y-2">
              <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                {productVariant.product.name}
              </h1>
              <p className="text-xl font-semibold">
                {formatCentsToUSD(productVariant.priceInCents)}
              </p>
            </div>

            <div className="space-y-3">
              <p className="text-sm font-medium">
                Color: {productVariant.name}
              </p>
              <VariantSelector
                selectedVariantSlug={productVariant.slug}
                variants={productVariant.product.variants}
              />
            </div>

            <ProductActions
              productVariantId={productVariant.id}
              sizes={sizes}
            />

            <div className="space-y-2 border-t pt-6">
              <h3 className="text-sm font-semibold">Description</h3>
              <p className="text-muted-foreground text-sm leading-7">
                {productVariant.product.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <ProductList title="You might also like" products={likelyProducts} />
      </div>

      <Footer />
    </>
  );
};

export default ProductVariantPage;
