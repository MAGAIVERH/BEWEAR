import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteShippingAddress } from "@/actions/delete-shipping-address";

import { getUserAddressesQueryKey } from "../queries/use-user-addresses";

export const useDeleteShippingAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["delete-shipping-address"],
    mutationFn: (id: string) => deleteShippingAddress({ id }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getUserAddressesQueryKey(),
      });
    },
  });
};
