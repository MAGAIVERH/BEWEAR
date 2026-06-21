import { useMutation } from "@tanstack/react-query";

import { validateCoupon } from "@/actions/validate-coupon";

export const getValidateCouponMutationKey = () => ["validate-coupon"] as const;

export const useValidateCoupon = () =>
  useMutation({
    mutationKey: getValidateCouponMutationKey(),
    mutationFn: validateCoupon,
  });
