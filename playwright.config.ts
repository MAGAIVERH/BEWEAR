import { defineConfig, devices } from "@playwright/test";

/**
 * E2E config. Locally, Playwright boots the Next dev server (against the real
 * Neon DB) and runs the specs in `e2e/`. In CI set `PLAYWRIGHT_BASE_URL` to a
 * running deployment, or provide DB env so the dev server can start.
 */
const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:3000";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL,
    trace: "on-first-retry",
    navigationTimeout: 60_000,
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  // Run against the production server for fast, deterministic pages (the dev
  // server's first-compile is too slow for tight test timeouts).
  webServer: process.env.PLAYWRIGHT_BASE_URL
    ? undefined
    : {
        command: "pnpm build && pnpm start",
        url: "http://localhost:3000",
        reuseExistingServer: !process.env.CI,
        timeout: 180_000,
      },
});
