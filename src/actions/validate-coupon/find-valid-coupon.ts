import { eq } from "drizzle-orm";

import { db } from "@/db";
import { couponTable } from "@/db/schema";
import { computeCouponDiscount } from "@/helpers/coupon";
import { formatCentsToUSD } from "@/helpers/money";

export type ValidatedCoupon = {
  code: string;
  discountType: "percent" | "fixed";
  value: number;
  discountInCents: number;
};

/**
 * Resolves a coupon code and validates it against a subtotal. Throws a
 * user-friendly Error when the coupon can't be applied. Shared by the
 * validate-coupon action (preview) and finish-order (authoritative apply).
 */
export const findValidCoupon = async (
  rawCode: string,
  subtotalInCents: number,
): Promise<ValidatedCoupon> => {
  const code = rawCode.trim().toUpperCase();

  const coupon = await db.query.couponTable.findFirst({
    where: eq(couponTable.code, code),
  });

  if (!coupon || !coupon.active) {
    throw new Error("This coupon is invalid.");
  }
  if (coupon.expiresAt && coupon.expiresAt.getTime() < Date.now()) {
    throw new Error("This coupon has expired.");
  }
  if (
    coupon.maxRedemptions !== null &&
    coupon.timesRedeemed >= coupon.maxRedemptions
  ) {
    throw new Error("This coupon is no longer available.");
  }
  if (subtotalInCents < coupon.minOrderInCents) {
    throw new Error(
      `This coupon requires a ${formatCentsToUSD(coupon.minOrderInCents)} minimum.`,
    );
  }

  return {
    code: coupon.code,
    discountType: coupon.discountType,
    value: coupon.value,
    discountInCents: computeCouponDiscount(coupon, subtotalInCents),
  };
};
