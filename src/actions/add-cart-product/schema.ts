import { z } from "zod";

export const addProductToCartSchema = z.object({
  productVariantId: z.uuid(),
  size: z.string().min(1),
  quantity: z.number().min(1),
});

export type AddProductToCartSchema = z.infer<typeof addProductToCartSchema>;
