type CouponLike = {
  discountType: "percent" | "fixed";
  value: number;
};

/**
 * Returns the discount amount (in cents) a coupon yields for a given subtotal.
 * Percent coupons apply a percentage; fixed coupons subtract a cents amount.
 * The discount never exceeds the subtotal.
 */
export const computeCouponDiscount = (
  coupon: CouponLike,
  subtotalInCents: number,
) => {
  const raw =
    coupon.discountType === "percent"
      ? Math.round((subtotalInCents * coupon.value) / 100)
      : coupon.value;
  return Math.max(0, Math.min(raw, subtotalInCents));
};
