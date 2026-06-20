import { useQuery } from "@tanstack/react-query";

import { getWishlist } from "@/actions/get-wishlist";

export const getUseWishlistQueryKey = () => ["wishlist"] as const;

export const useWishlist = () => {
  return useQuery({
    queryKey: getUseWishlistQueryKey(),
    queryFn: () => getWishlist(),
  });
};
