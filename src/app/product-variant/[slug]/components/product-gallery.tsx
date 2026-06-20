"use client";

import Image from "next/image";
import { useState } from "react";

import { cn } from "@/lib/utils";

type ProductGalleryProps = {
  images: string[];
  alt: string;
};

const ProductGallery = ({ images, alt }: ProductGalleryProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const mainImage = images[activeIndex] ?? images[0];

  return (
    <div className="space-y-4">
      <div className="group bg-muted relative aspect-square w-full overflow-hidden rounded-3xl">
        <Image
          src={mainImage}
          alt={alt}
          fill
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
      </div>

      {images.length > 1 && (
        <div className="flex flex-wrap gap-3">
          {images.map((image, index) => (
            <button
              key={image}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`View image ${index + 1}`}
              aria-current={index === activeIndex}
              className={cn(
                "bg-muted relative h-20 w-20 overflow-hidden rounded-2xl border-2 transition",
                index === activeIndex
                  ? "border-foreground"
                  : "hover:border-border border-transparent",
              )}
            >
              <Image
                src={image}
                alt=""
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGallery;
