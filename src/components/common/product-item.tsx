import Image from "next/image";
import Link from "next/link";

import { productTable, productVariantTable } from "@/db/schema";
import { formatCentsToUSD } from "@/helpers/money";
import { cn } from "@/lib/utils";

interface ProductItemProps {
  product: typeof productTable.$inferSelect & {
    variants: (typeof productVariantTable.$inferSelect)[];
  };
  className?: string;
}

const ProductItem = ({ product, className }: ProductItemProps) => {
  const firstVariant = product.variants[0];
  return (
    <Link
      href={`/product-variant/${firstVariant.slug}`}
      className={cn("group flex flex-col gap-3", className)}
    >
      <div className="bg-muted relative aspect-square w-full overflow-hidden rounded-3xl">
        <Image
          src={firstVariant.imageUrl}
          alt={firstVariant.name}
          fill
          sizes="(min-width: 1024px) 20vw, (min-width: 768px) 30vw, 45vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
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
