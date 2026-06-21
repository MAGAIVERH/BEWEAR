import { z } from "zod";

export const validateCouponSchema = z.object({
  code: z.string().trim().min(1, "Enter a coupon code.").max(40),
  subtotalInCents: z.number().int().positive(),
});

export type ValidateCouponSchema = z.infer<typeof validateCouponSchema>;
