import { z } from "zod";

export const toggleWishlistSchema = z.object({
  productVariantId: z.uuid(),
});

export type ToggleWishlistSchema = z.infer<typeof toggleWishlistSchema>;
