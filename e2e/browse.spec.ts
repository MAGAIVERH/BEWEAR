import { expect, test } from "@playwright/test";

test.describe("Browse", () => {
  test("home renders the hero and brand title", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/BEWEAR/);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("browse a category and open a product detail page", async ({ page }) => {
    await page.goto("/category/accessories");
    await expect(
      page.getByRole("heading", { name: "Accessories", level: 1 }),
    ).toBeVisible();

    const firstProduct = page
      .locator('a[href^="/product-variant/"]')
      .first();
    await expect(firstProduct).toBeVisible();
    await firstProduct.click();

    await expect(page).toHaveURL(/\/product-variant\//);
    await expect(
      page.getByRole("button", { name: /add to bag/i }),
    ).toBeVisible();
  });
});
