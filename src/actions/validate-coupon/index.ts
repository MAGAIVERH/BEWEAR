"use server";

import { findValidCoupon } from "./find-valid-coupon";
import { ValidateCouponSchema, validateCouponSchema } from "./schema";

export const validateCoupon = async (data: ValidateCouponSchema) => {
  const { code, subtotalInCents } = validateCouponSchema.parse(data);
  return findValidCoupon(code, subtotalInCents);
};
