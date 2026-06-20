import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { categoryTable } from "@/db/schema";

type EditorialCategoriesProps = {
  categories: (typeof categoryTable.$inferSelect)[];
};

// Curated free stock (Unsplash license) in /public — swap for real imagery later.
const FEATURE_IMAGES = ["/category-1.jpg", "/category-2.jpg"];

const EditorialCategories = ({ categories }: EditorialCategoriesProps) => {
  const featured = categories.slice(0, 2);

  if (featured.length === 0) {
    return null;
  }

  return (
    <div className="container-bw grid gap-4 md:grid-cols-2">
      {featured.map((category, index) => (
        <Link
          key={category.id}
          href={`/category/${category.slug}`}
          className="group relative block overflow-hidden rounded-3xl"
        >
          <div className="relative aspect-[4/5] w-full md:aspect-[3/4]">
            <Image
              src={FEATURE_IMAGES[index % FEATURE_IMAGES.length]}
              alt={category.name}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 md:p-8">
              <div>
                <p className="text-xs font-semibold tracking-[0.18em] text-white/80 uppercase">
                  Shop
                </p>
                <h3 className="mt-1 text-2xl font-bold tracking-tight text-white md:text-3xl">
                  {category.name}
                </h3>
              </div>
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-black transition-transform duration-300 group-hover:translate-x-1">
                <ArrowRightIcon className="h-5 w-5" />
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default EditorialCategories;
