import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toggleWishlist } from "@/actions/toggle-wishlist";

import { getUseWishlistQueryKey } from "../queries/use-wishlist";

export const useToggleWishlist = (productVariantId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["toggle-wishlist", productVariantId],
    mutationFn: () => toggleWishlist({ productVariantId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getUseWishlistQueryKey() });
    },
  });
};
