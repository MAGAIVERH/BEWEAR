import { describe, expect, it } from "vitest";

import { getSizesForCategory } from "./sizes";

describe("getSizesForCategory", () => {
  it("returns US shoe sizes for sneakers", () => {
    const sizes = getSizesForCategory("sneakers");
    expect(sizes).toContain("US 9");
    expect(sizes.every((s) => s.startsWith("US "))).toBe(true);
  });

  it("returns a single 'One Size' for accessories", () => {
    expect(getSizesForCategory("accessories")).toEqual(["One Size"]);
  });

  it("falls back to apparel letter sizes for other categories", () => {
    expect(getSizesForCategory("t-shirts")).toEqual([
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL",
    ]);
  });

  it("treats unknown categories as apparel", () => {
    expect(getSizesForCategory("unknown")).toContain("M");
  });
});
