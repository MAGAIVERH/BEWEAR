import Image from "next/image";
import Link from "next/link";

import { productTable, productVariantTable } from "@/db/schema";
import { BLUR_DATA_URL } from "@/helpers/image";
import { formatCentsToUSD } from "@/helpers/money";
import { cn } from "@/lib/utils";

import WishlistButton from "./wishlist-button";

interface ProductItemProps {
  product: typeof productTable.$inferSelect & {
    variants: (typeof productVariantTable.$inferSelect)[];
  };
  className?: string;
  /** Nike-style floating product on a transparent background (no card). */
  floating?: boolean;
}

const ProductItem = ({ product, className, floating }: ProductItemProps) => {
  const firstVariant = product.variants[0];
  return (
    <Link
      href={`/product-variant/${firstVariant.slug}`}
      className={cn("group flex flex-col gap-3", className)}
    >
      <div
        className={cn(
          "relative aspect-square w-full overflow-hidden",
          floating ? "" : "bg-muted rounded-3xl",
        )}
      >
        <Image
          src={firstVariant.imageUrl}
          alt={firstVariant.name}
          fill
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
          sizes="(min-width: 1024px) 20vw, (min-width: 768px) 30vw, 45vw"
          className={cn(
            "transition-transform duration-500 ease-out group-hover:scale-105",
            // Floating look: lift the studio light-gray background to white via
            // contrast so the product appears to float on the white page.
            floating
              ? "object-contain brightness-[1.06] contrast-[1.22]"
              : "object-cover",
          )}
        />
        <WishlistButton
          productVariantId={firstVariant.id}
          className="absolute top-3 right-3 z-10"
        />
      </div>

      <div className="flex flex-col gap-1">
        <p className="truncate text-sm font-semibold">{product.name}</p>
        <p className="text-muted-foreground truncate text-xs">
          {product.description}
        </p>
        <p className="mt-1 text-sm font-semibold">
          {formatCentsToUSD(firstVariant.priceInCents)}
        </p>
      </div>
    </Link>
  );
};

export default ProductItem;
