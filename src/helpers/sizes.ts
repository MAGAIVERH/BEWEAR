const APPAREL_SIZES = ["XS", "S", "M", "L", "XL", "XXL"];
const SNEAKER_SIZES = [
  "US 7",
  "US 8",
  "US 9",
  "US 10",
  "US 11",
  "US 12",
  "US 13",
];
const ONE_SIZE = ["One Size"];

/**
 * Available sizes for a product, derived from its category slug.
 * Apparel uses letter sizes, sneakers use US shoe sizes, accessories are one size.
 */
export const getSizesForCategory = (categorySlug: string): string[] => {
  if (categorySlug === "sneakers") {
    return SNEAKER_SIZES;
  }
  if (categorySlug === "accessories") {
    return ONE_SIZE;
  }
  return APPAREL_SIZES;
};
