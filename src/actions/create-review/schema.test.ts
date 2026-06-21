import { describe, expect, it } from "vitest";

import { createReviewSchema } from "./schema";

const PRODUCT_ID = "123e4567-e89b-12d3-a456-426614174000";

describe("createReviewSchema", () => {
  it("accepts a valid review", () => {
    const result = createReviewSchema.safeParse({
      productId: PRODUCT_ID,
      rating: 5,
      comment: "Great product",
    });
    expect(result.success).toBe(true);
  });

  it("allows omitting the comment", () => {
    expect(
      createReviewSchema.safeParse({ productId: PRODUCT_ID, rating: 3 }).success,
    ).toBe(true);
  });

  it("rejects a rating outside 1–5", () => {
    expect(
      createReviewSchema.safeParse({ productId: PRODUCT_ID, rating: 6 }).success,
    ).toBe(false);
    expect(
      createReviewSchema.safeParse({ productId: PRODUCT_ID, rating: 0 }).success,
    ).toBe(false);
  });

  it("rejects a non-uuid product id", () => {
    expect(
      createReviewSchema.safeParse({ productId: "nope", rating: 4 }).success,
    ).toBe(false);
  });
});
