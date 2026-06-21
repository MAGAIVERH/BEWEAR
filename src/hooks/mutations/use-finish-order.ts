import { useMutation, useQueryClient } from "@tanstack/react-query";

import { finishOrder } from "@/actions/finish-order";

import { getUseCartQueryKey } from "../queries/use-cart";

export const getUseFinishOrderMutationKey = () => ["finish-order"];

export const useFinishOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: getUseFinishOrderMutationKey(),
    mutationFn: async (input?: { couponCode?: string | null }) => {
      return await finishOrder(input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getUseCartQueryKey() });
    },
  });
};
