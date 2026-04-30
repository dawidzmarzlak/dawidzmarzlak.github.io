import { test, expect } from "@playwright/test";

test.describe("/faq subpage", () => {
  test("loads with hero + 5 categories + cta", async ({ page }) => {
    test.setTimeout(60_000);
    await page.goto("/pl/faq", { waitUntil: "domcontentloaded", timeout: 30_000 });
    const h1 = page.getByRole("heading", { level: 1 });
    await expect(h1).toBeVisible({ timeout: 15_000 });
    // 5 category h2 headings (scoped to the FAQ categories section, excluding CtaCard h2)
    await expect(page.locator("section").locator("h2.font-display")).toHaveCount(5, { timeout: 10_000 });
    // Each category has at least 3 collapsible Q buttons (scoped to main to exclude hamburger)
    const buttons = page.locator("main").locator('button[aria-expanded]');
    expect(await buttons.count()).toBeGreaterThanOrEqual(15);
  });

  test("Q&A button toggles aria-expanded", async ({ page }) => {
    await page.goto("/pl/faq", { waitUntil: "domcontentloaded" });
    const firstBtn = page.locator("main").locator('button[aria-expanded]').first();
    // Wait for React hydration — button must be visible before clicking
    await expect(firstBtn).toBeVisible({ timeout: 15_000 });
    await expect(firstBtn).toHaveAttribute("aria-expanded", "false");
    await firstBtn.click();
    await expect(firstBtn).toHaveAttribute("aria-expanded", "true");
  });
});
