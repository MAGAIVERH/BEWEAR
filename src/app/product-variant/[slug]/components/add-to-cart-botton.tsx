"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { addProductToCart } from "@/actions/add-cart-product";
import { Button } from "@/components/ui/button";
import { getUseCartQueryKey } from "@/hooks/queries/use-cart";

interface AddToCartButtonProps {
  productVariantId: string;
  quantity: number;
  size: string | null;
}

const AddToCartButton = ({
  productVariantId,
  quantity,
  size,
}: AddToCartButtonProps) => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationKey: ["addProductToCart", productVariantId, size, quantity],
    mutationFn: () => {
      if (!size) {
        throw new Error("Size is required");
      }
      return addProductToCart({
        productVariantId,
        size,
        quantity,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getUseCartQueryKey() });
      toast.success("Added to bag.");
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong.",
      );
    },
  });
  return (
    <Button
      className="rounded-full"
      size="lg"
      variant="outline"
      disabled={isPending || !size}
      onClick={() => mutate()}
    >
      {isPending && <Loader2 className="animate-spin" />}
      Add to bag
    </Button>
  );
};

export default AddToCartButton;
