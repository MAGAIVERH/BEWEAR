type ProductRailSkeletonProps = {
  title: string;
  /** Number of placeholder cards to render. */
  count?: number;
};

/**
 * Loading placeholder for a horizontal product rail (matches `ProductList`
 * spacing), used as a Suspense fallback while catalog data streams in.
 */
const ProductRailSkeleton = ({ title, count = 5 }: ProductRailSkeletonProps) => {
  return (
    <div className="space-y-6">
      <div className="container-bw">
        <h2 className="section-title">{title}</h2>
      </div>

      <div className="container-bw">
        <div className="flex gap-4 overflow-hidden">
          {Array.from({ length: count }).map((_, index) => (
            <div
              key={`rail-skeleton-${index}`}
              className="min-w-0 shrink-0 basis-[45%] sm:basis-[33%] md:basis-[28%] lg:basis-[22%] xl:basis-[19%]"
            >
              <div className="flex flex-col gap-3">
                <div className="bg-muted aspect-square w-full animate-pulse rounded-3xl" />
                <div className="bg-muted h-3 w-3/4 animate-pulse rounded" />
                <div className="bg-muted h-3 w-1/2 animate-pulse rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductRailSkeleton;
