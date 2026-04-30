import { test, expect } from "@playwright/test";

test("home / does NOT render portfolio grid (portfolio hidden)", async ({ page }) => {
  test.setTimeout(60_000);
  await page.goto("/pl", { waitUntil: "domcontentloaded", timeout: 30_000 });
  // Wait for hero to load so DOM is ready
  await page.getByRole("heading", { level: 1 }).waitFor({ timeout: 15_000 });
  // No portfolio cards on home anymore
  await expect(page.locator("[data-portfolio-card]")).toHaveCount(0);
});
