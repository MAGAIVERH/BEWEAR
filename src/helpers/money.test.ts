import { describe, expect, it } from "vitest";

import { formatCentsToUSD } from "./money";

describe("formatCentsToUSD", () => {
  it("formats cents as USD currency", () => {
    expect(formatCentsToUSD(129900)).toBe("$1,299.00");
  });

  it("handles zero", () => {
    expect(formatCentsToUSD(0)).toBe("$0.00");
  });

  it("rounds sub-cent values to two decimals", () => {
    expect(formatCentsToUSD(1999)).toBe("$19.99");
  });

  it("groups thousands with commas", () => {
    expect(formatCentsToUSD(1000000)).toBe("$10,000.00");
  });
});
