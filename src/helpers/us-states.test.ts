import { describe, expect, it } from "vitest";

import { US_STATES } from "./us-states";

describe("US_STATES", () => {
  it("includes all 50 states plus DC", () => {
    expect(US_STATES).toHaveLength(51);
  });

  it("uses unique two-letter codes", () => {
    const codes = US_STATES.map((s) => s.code);
    expect(new Set(codes).size).toBe(codes.length);
    expect(codes.every((c) => /^[A-Z]{2}$/.test(c))).toBe(true);
  });

  it("includes District of Columbia", () => {
    expect(US_STATES.some((s) => s.code === "DC")).toBe(true);
  });
});
