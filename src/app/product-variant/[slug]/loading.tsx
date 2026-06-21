import Header from "@/components/common/header";
import ProductRailSkeleton from "@/components/common/product-rail-skeleton";

const ProductVariantLoading = () => {
  return (
    <>
      <Header />

      <main id="main-content">
      <div className="px-5 py-8 md:px-8 lg:px-12">
        {/* Breadcrumbs */}
        <div className="bg-muted h-3 w-48 animate-pulse rounded" />

        <div className="mt-6 lg:grid lg:grid-cols-2 lg:items-start lg:gap-12">
          {/* Gallery */}
          <div className="space-y-4">
            <div className="bg-muted aspect-square w-full animate-pulse rounded-3xl" />
            <div className="flex gap-3">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={`thumb-skeleton-${index}`}
                  className="bg-muted h-20 w-20 animate-pulse rounded-2xl"
                />
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="mt-8 space-y-8 lg:mt-0">
            <div className="space-y-3">
              <div className="bg-muted h-8 w-3/4 animate-pulse rounded" />
              <div className="bg-muted h-6 w-24 animate-pulse rounded" />
            </div>
            <div className="flex gap-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={`variant-skeleton-${index}`}
                  className="bg-muted h-16 w-16 animate-pulse rounded-2xl"
                />
              ))}
            </div>
            <div className="bg-muted h-12 w-full animate-pulse rounded-full" />
            <div className="bg-muted h-40 w-full animate-pulse rounded-xl" />
          </div>
        </div>
      </div>

      <div className="mt-8">
        <ProductRailSkeleton title="You might also like" />
      </div>
      </main>
    </>
  );
};

export default ProductVariantLoading;
