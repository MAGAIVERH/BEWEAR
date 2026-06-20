import { z } from "zod";

export const createReviewSchema = z.object({
  productId: z.uuid(),
  rating: z.number().int().min(1).max(5),
  comment: z.string().max(1000).optional(),
});

export type CreateReviewSchema = z.infer<typeof createReviewSchema>;
