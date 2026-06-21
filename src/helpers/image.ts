/**
 * Tiny neutral blur placeholder for `next/image`.
 *
 * An 8×8 light-gray SVG (matching the studio `--muted` background) encoded as a
 * data URI. It ships only a few bytes, yet gives every image a soft placeholder
 * while the optimized asset loads — keeping LCP/CLS controlled without a
 * per-image `blurDataURL`. Use with `placeholder="blur"`.
 *
 * Pre-encoded as a literal so it works in both Server and Client Components
 * (no `Buffer` at runtime).
 */
export const BLUR_DATA_URL =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPjxyZWN0IHdpZHRoPSI4IiBoZWlnaHQ9IjgiIGZpbGw9IiNlY2VjZWMiLz48L3N2Zz4=";
