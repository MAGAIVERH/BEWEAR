import Image from "next/image";
import Link from "next/link";

import { productVariantTable } from "@/db/schema";
import { cn } from "@/lib/utils";

interface VariantSelectorProps {
  selectedVariantSlug: string;
  variants: (typeof productVariantTable.$inferSelect)[];
}

const VariantSelector = ({
  selectedVariantSlug,
  variants,
}: VariantSelectorProps) => {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {variants.map((variant) => {
        const isActive = selectedVariantSlug === variant.slug;
        return (
          <Link
            href={`/product-variant/${variant.slug}`}
            key={variant.id}
            aria-label={variant.name}
            aria-current={isActive}
            className={cn(
              "bg-muted relative h-16 w-16 overflow-hidden rounded-2xl border-2 transition",
              isActive
                ? "border-foreground"
                : "hover:border-border border-transparent",
            )}
          >
            <Image
              src={variant.imageUrl}
              alt={variant.name}
              fill
              sizes="64px"
              className="object-cover"
            />
          </Link>
        );
      })}
    </div>
  );
};

export default VariantSelector;
