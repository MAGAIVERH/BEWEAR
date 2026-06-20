// Curated free stock (Unsplash license) detail/lifestyle shots per category,
// stored in /public/gallery. They enrich the PDP gallery beyond the single
// seed image. Swap for real per-product photography when available.
const CATEGORY_GALLERY: Record<string, string[]> = {
  sneakers: ["/gallery/sneakers-1.jpg", "/gallery/sneakers-2.jpg"],
  "t-shirts": ["/gallery/t-shirts-1.jpg", "/gallery/t-shirts-2.jpg"],
  pants: ["/gallery/pants-1.jpg", "/gallery/pants-2.jpg"],
  shorts: ["/gallery/shorts-1.jpg", "/gallery/shorts-2.jpg"],
  "jackets-hoodies": [
    "/gallery/jackets-hoodies-1.jpg",
    "/gallery/jackets-hoodies-2.jpg",
  ],
  accessories: ["/gallery/accessories-1.jpg", "/gallery/accessories-2.jpg"],
};

/**
 * Gallery images for a product: the variant's own image first, followed by
 * curated category detail/lifestyle shots.
 */
export const getGalleryImages = (
  categorySlug: string,
  mainImageUrl: string,
): string[] => {
  return [mainImageUrl, ...(CATEGORY_GALLERY[categorySlug] ?? [])];
};
