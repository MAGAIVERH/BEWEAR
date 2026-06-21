import { expect, test } from "@playwright/test";

test.describe("Search", () => {
  test("returns results for a known product", async ({ page }) => {
    await page.goto("/search?q=backpack");
    await expect(
      page.getByRole("heading", { name: /Results for/i }),
    ).toBeVisible();
    await expect(
      page.locator('a[href^="/product-variant/"]').first(),
    ).toBeVisible();
  });

  test("shows an empty state for nonsense queries", async ({ page }) => {
    await page.goto("/search?q=zzzznotaproduct");
    await expect(page.getByText(/No results found/i)).toBeVisible();
  });
});
