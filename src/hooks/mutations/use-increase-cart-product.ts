import { useMutation, useQueryClient } from "@tanstack/react-query";

import { addProductToCart } from "@/actions/add-cart-product";

import { getUseCartQueryKey } from "../queries/use-cart";

export const getIncreaseCartProductMutationKey = (
  productVariantId: string,
  size: string,
) => ["increase-cart-product-quantity", productVariantId, size] as const;

export const useIncreaseCartProduct = (
  productVariantId: string,
  size: string,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: getIncreaseCartProductMutationKey(productVariantId, size),
    mutationFn: () => addProductToCart({ productVariantId, size, quantity: 1 }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getUseCartQueryKey() });
    },
  });
};
