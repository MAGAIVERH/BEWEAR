import { describe, expect, it } from "vitest";

import { computeCouponDiscount } from "./coupon";

describe("computeCouponDiscount", () => {
  it("applies a percentage discount", () => {
    expect(
      computeCouponDiscount({ discountType: "percent", value: 10 }, 10000),
    ).toBe(1000);
  });

  it("rounds percentage discounts to the nearest cent", () => {
    expect(
      computeCouponDiscount({ discountType: "percent", value: 15 }, 999),
    ).toBe(150);
  });

  it("applies a fixed discount in cents", () => {
    expect(
      computeCouponDiscount({ discountType: "fixed", value: 500 }, 10000),
    ).toBe(500);
  });

  it("never exceeds the subtotal", () => {
    expect(
      computeCouponDiscount({ discountType: "fixed", value: 999999 }, 5000),
    ).toBe(5000);
  });

  it("never returns a negative discount", () => {
    expect(
      computeCouponDiscount({ discountType: "fixed", value: -100 }, 5000),
    ).toBe(0);
  });
});
