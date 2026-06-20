"use client";

import { MinusIcon, PlusIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import AddToCartButton from "./add-to-cart-botton";

interface ProductActionsProps {
  productVariantId: string;
  sizes: string[];
}

const ProductActions = ({ productVariantId, sizes }: ProductActionsProps) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string | null>(
    sizes.length === 1 ? sizes[0] : null,
  );

  const handleDecrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  return (
    <>
      <div className="space-y-4 px-5">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium">Select size</h3>
          {!selectedSize && (
            <span className="text-muted-foreground text-xs">Required</span>
          )}
        </div>
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
          {sizes.map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => setSelectedSize(size)}
              aria-pressed={selectedSize === size}
              className={cn(
                "rounded-xl border py-2.5 text-sm font-medium transition",
                selectedSize === size
                  ? "border-foreground bg-foreground text-background"
                  : "hover:border-foreground",
              )}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4 px-5">
        <h3 className="text-sm font-medium">Quantity</h3>
        <div className="flex w-[100px] items-center justify-between rounded-lg border">
          <Button size="icon" variant="ghost" onClick={handleDecrement}>
            <MinusIcon />
          </Button>
          <p>{quantity}</p>
          <Button size="icon" variant="ghost" onClick={handleIncrement}>
            <PlusIcon />
          </Button>
        </div>
      </div>

      <div className="flex flex-col space-y-4 px-5">
        <AddToCartButton
          productVariantId={productVariantId}
          quantity={quantity}
          size={selectedSize}
        />
        <Button className="rounded-full" size="lg" disabled={!selectedSize}>
          Buy now
        </Button>
      </div>
    </>
  );
};

export default ProductActions;
