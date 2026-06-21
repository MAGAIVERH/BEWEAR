import { describe, expect, it } from "vitest";

import { getGalleryImages } from "./product-gallery";

describe("getGalleryImages", () => {
  it("puts the variant image first, then category shots", () => {
    const images = getGalleryImages("sneakers", "https://cdn/main.jpg");
    expect(images[0]).toBe("https://cdn/main.jpg");
    expect(images.length).toBeGreaterThan(1);
  });

  it("returns only the main image for unknown categories", () => {
    expect(getGalleryImages("unknown", "https://cdn/main.jpg")).toEqual([
      "https://cdn/main.jpg",
    ]);
  });
});
