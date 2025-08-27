import { getCart } from "@/actions/get-cart";
import { useQuery } from "@tanstack/react-query";

export const getUseCartQueryKey = ["cart"] as const;
export const useCart = () => {
  return useQuery({
    queryKey: getUseCartQueryKey,
    queryFn: () => getCart(),
  });
};
