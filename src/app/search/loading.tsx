import Header from "@/components/common/header";

const SearchLoading = () => {
  return (
    <>
      <Header />

      <div className="px-5 py-10 md:px-8 lg:px-12">
        <div className="space-y-3">
          <div className="bg-muted h-3 w-16 animate-pulse rounded" />
          <div className="bg-muted h-9 w-56 animate-pulse rounded" />
          <div className="bg-muted h-3 w-20 animate-pulse rounded" />
        </div>

        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={`search-skeleton-${index}`} className="flex flex-col gap-3">
              <div className="bg-muted aspect-square w-full animate-pulse rounded-3xl" />
              <div className="bg-muted h-3 w-3/4 animate-pulse rounded" />
              <div className="bg-muted h-3 w-1/2 animate-pulse rounded" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SearchLoading;
