import { describe, expect, it } from "vitest";

import { subscribeNewsletterSchema } from "./schema";

describe("subscribeNewsletterSchema", () => {
  it("accepts a valid email", () => {
    const result = subscribeNewsletterSchema.safeParse({
      email: "user@example.com",
    });
    expect(result.success).toBe(true);
  });

  it("rejects an invalid email", () => {
    const result = subscribeNewsletterSchema.safeParse({ email: "not-an-email" });
    expect(result.success).toBe(false);
  });

  it("rejects a missing email", () => {
    expect(subscribeNewsletterSchema.safeParse({}).success).toBe(false);
  });
});
