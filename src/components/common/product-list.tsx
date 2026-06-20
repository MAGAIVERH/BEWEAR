"use client";

import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useCallback } from "react";

import { productTable, productVariantTable } from "@/db/schema";

import ProductItem from "./product-item";

interface ProductListProps {
  title: string;
  products: (typeof productTable.$inferSelect & {
    variants: (typeof productVariantTable.$inferSelect)[];
  })[];
}

const ProductList = ({ title, products }: ProductListProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    dragFree: true,
    containScroll: "trimSnaps",
  });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between px-5 md:px-8 lg:px-12">
        <h3 className="section-title">{title}</h3>

        <div className="hidden gap-2 md:flex">
          <button
            type="button"
            aria-label="Previous products"
            onClick={scrollPrev}
            className="hover:bg-foreground hover:text-background flex h-10 w-10 items-center justify-center rounded-full border transition"
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Next products"
            onClick={scrollNext}
            className="hover:bg-foreground hover:text-background flex h-10 w-10 items-center justify-center rounded-full border transition"
          >
            <ChevronRightIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4 px-5 md:px-8 lg:px-12">
          {products.map((product) => (
            <div
              key={product.id}
              className="min-w-0 shrink-0 basis-[45%] sm:basis-[33%] md:basis-[28%] lg:basis-[22%] xl:basis-[19%]"
            >
              <ProductItem product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
