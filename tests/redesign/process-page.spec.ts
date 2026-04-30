import { test, expect } from "@playwright/test";

test.describe("/process subpage", () => {
  test("loads with hero + 7 step cards + philosophy + cta", async ({ page }) => {
    test.setTimeout(60_000);
    await page.goto("/pl/process", { waitUntil: "domcontentloaded", timeout: 30_000 });
    const h1 = page.getByRole("heading", { level: 1 });
    await expect(h1).toBeVisible({ timeout: 15_000 });
    await expect(h1).toContainText(/proces|krokach|kroków/i);
    // Extended steps — 7 articles
    await expect(page.locator("article").filter({ hasText: /Konsultacja|Wycena|UX|Develop|Test|Wdroż|Wsparcie/ })).toHaveCount(7);
    // CTA card at bottom links to /contact (section#contact scoped)
    await expect(page.locator('section#contact a[href="/contact"]')).toBeVisible();
  });

  test("breadcrumb has Start link to home", async ({ page }) => {
    await page.goto("/pl/process", { waitUntil: "domcontentloaded" });
    await expect(page.locator('a[href="/pl/"]').first()).toBeVisible();
  });
});
