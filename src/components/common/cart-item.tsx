import { MinusIcon, PlusIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

import { formatCentsToUSD } from "@/helpers/money";
import { useDecreaseCartProduct } from "@/hooks/mutations/use-decrease-cart-product";
import { useIncreaseCartProduct } from "@/hooks/mutations/use-increase-cart-product";
import { useRemoveProductFromCart } from "@/hooks/mutations/use-remove-product-from-cart";

import { Button } from "../ui/button";

interface CartItemProps {
  id: string;
  productVariantId: string;
  productName: string;
  productVariantName: string;
  productVariantImageUrl: string;
  productVariantPriceInCents: number;
  size: string | null;
  quantity: number;
}

const CartItem = ({
  id,
  productVariantId,
  productName,
  productVariantName,
  productVariantImageUrl,
  productVariantPriceInCents,
  size,
  quantity,
}: CartItemProps) => {
  const removeProductFromCartMutation = useRemoveProductFromCart(id);
  const decreaseCartProductQuantityMutation = useDecreaseCartProduct(id);
  const increaseCartProductQuantityMutation = useIncreaseCartProduct(
    productVariantId,
    size ?? "",
  );

  const handleDeleteClick = () => {
    removeProductFromCartMutation.mutate(undefined, {
      onSuccess: () => {
        toast.success("Product removed from cart.");
      },
      onError: () => {
        toast.error("Failed to remove product from cart.");
      },
    });
  };

  const handleDecreaseQuantityClick = () => {
    decreaseCartProductQuantityMutation.mutate(undefined, {
      onSuccess: () => {
        toast.success("Quantity decreased.");
      },
    });
  };

  const handleIncreaseQuantityClick = () => {
    increaseCartProductQuantityMutation.mutate(undefined, {
      onSuccess: () => {
        toast.success("Quantity increased.");
      },
    });
  };

  return (
    <div className="flex gap-4">
      <div className="bg-muted relative h-20 w-20 shrink-0 overflow-hidden rounded-xl">
        <Image
          src={productVariantImageUrl}
          alt={productVariantName}
          fill
          sizes="80px"
          className="object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">{productName}</p>
            <p className="text-muted-foreground text-xs">
              {productVariantName}
              {size ? ` · Size ${size}` : ""}
            </p>
          </div>
          <button
            type="button"
            aria-label="Remove item"
            onClick={handleDeleteClick}
            disabled={removeProductFromCartMutation.isPending}
            className="text-muted-foreground hover:text-foreground shrink-0 transition-colors disabled:opacity-50"
          >
            <TrashIcon className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-auto flex items-center justify-between pt-2">
          <div className="flex items-center gap-1 rounded-full border">
            <Button
              size="icon"
              variant="ghost"
              className="h-7 w-7 rounded-full"
              aria-label="Decrease quantity"
              disabled={decreaseCartProductQuantityMutation.isPending}
              onClick={handleDecreaseQuantityClick}
            >
              <MinusIcon className="h-3.5 w-3.5" />
            </Button>
            <span className="w-5 text-center text-xs font-medium">
              {quantity}
            </span>
            <Button
              size="icon"
              variant="ghost"
              className="h-7 w-7 rounded-full"
              aria-label="Increase quantity"
              disabled={increaseCartProductQuantityMutation.isPending}
              onClick={handleIncreaseQuantityClick}
            >
              <PlusIcon className="h-3.5 w-3.5" />
            </Button>
          </div>
          <p className="text-sm font-semibold">
            {formatCentsToUSD(productVariantPriceInCents)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
