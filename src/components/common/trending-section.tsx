import Image from "next/image";
import Link from "next/link";

import { productTable, productVariantTable } from "@/db/schema";

type ProductWithVariants = typeof productTable.$inferSelect & {
  variants: (typeof productVariantTable.$inferSelect)[];
};

type TrendingSectionProps = {
  products: ProductWithVariants[];
};

// Curated to products that have clean, flat (no-model) studio photography,
// so the grid stays uniform and premium. Sneakers first (Nike-style).
const TRENDING_SLUGS = [
  "nike-air-force",
  "nike-dunk-low",
  "nike-panda",
  "nike-vomero",
  "backpack",
  "high-socks",
  "run-tee",
  "nature-tee",
  "nike-club-pants",
  "knit-pants",
  "brooklyn-pants",
  "jordan-pants",
  "core-shorts",
  "challenger-shorts",
  "premier-shorts",
];

const BRAND_LINKS = [
  { label: "Find a Store", href: "#" },
  { label: "Help", href: "#" },
  { label: "Join Us", href: "/authentication" },
  { label: "Sign In", href: "/authentication" },
];

const TrendingSection = ({ products }: TrendingSectionProps) => {
  const items = TRENDING_SLUGS.map((slug) =>
    products.find((product) => product.slug === slug),
  )
    .filter((product): product is ProductWithVariants => product !== undefined)
    .slice(0, 12);

  if (items.length === 0) {
    return null;
  }

  return (
    <section className="container-bw">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-display uppercase">Trending</h2>
        <p className="text-muted-foreground mt-3 text-sm md:text-base">
          Classic silhouettes and fresh drops to build your look from the ground
          up.
        </p>
      </div>

      <div className="mx-auto mt-12 grid max-w-5xl grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4 md:grid-cols-6">
        {items.map((product) => {
          const variant = product.variants[0];
          return (
            <Link
              key={product.id}
              href={`/product-variant/${variant.slug}`}
              className="group flex flex-col items-center gap-2 text-center"
            >
              <div className="relative mx-auto aspect-square w-16 md:w-20">
                <Image
                  src={variant.imageUrl}
                  alt={product.name}
                  fill
                  sizes="80px"
                  className="object-contain brightness-[1.06] contrast-[1.22] transition-transform duration-300 ease-out group-hover:scale-110"
                />
              </div>
              <span className="text-xs font-medium">{product.name}</span>
            </Link>
          );
        })}
      </div>

      {/* Brand mark + quick links */}
      <div className="mt-20 flex flex-col items-center gap-6">
        <Image src="/logo.svg" alt="BEWEAR" width={140} height={36} />
        <nav className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm font-medium">
          {BRAND_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="hover:text-muted-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
};

export default TrendingSection;
