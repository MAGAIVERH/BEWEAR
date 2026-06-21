import Header from "@/components/common/header";
import ProductRailSkeleton from "@/components/common/product-rail-skeleton";

const HomeLoading = () => {
  return (
    <>
      <Header />

      <main id="main-content">
        {/* Hero placeholder */}
        <div className="bg-muted relative aspect-[4/5] min-h-[460px] w-full animate-pulse sm:aspect-[3/2] md:aspect-video" />

        <div className="space-y-16 py-16 md:space-y-24 md:py-20">
          <ProductRailSkeleton title="Best sellers" />
          <ProductRailSkeleton title="New arrivals" />
        </div>
      </main>
    </>
  );
};

export default HomeLoading;
