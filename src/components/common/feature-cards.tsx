import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { categoryTable } from "@/db/schema";

type FeatureCardsProps = {
  categories: (typeof categoryTable.$inferSelect)[];
};

const FEATURE_IMAGES = [
  "/home/feature-1.jpg",
  "/home/feature-2.jpg",
  "/home/feature-3.jpg",
];

const FeatureCards = ({ categories }: FeatureCardsProps) => {
  const featured = categories.slice(0, 3);
  if (featured.length === 0) {
    return null;
  }

  return (
    <div className="container-bw grid gap-4 sm:grid-cols-3">
      {featured.map((category, index) => (
        <Link
          key={category.id}
          href={`/category/${category.slug}`}
          className="group relative block overflow-hidden rounded-3xl"
        >
          <div className="relative aspect-[4/5] w-full">
            <Image
              src={FEATURE_IMAGES[index % FEATURE_IMAGES.length]}
              alt={category.name}
              fill
              sizes="(min-width: 640px) 33vw, 100vw"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
              <div>
                <p className="text-[10px] font-semibold tracking-[0.18em] text-white/80 uppercase">
                  Shop
                </p>
                <h3 className="mt-1 text-lg font-bold tracking-tight text-white md:text-xl">
                  {category.name}
                </h3>
              </div>
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-black transition-transform duration-300 group-hover:translate-x-1">
                <ArrowRightIcon className="h-4 w-4" />
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default FeatureCards;
