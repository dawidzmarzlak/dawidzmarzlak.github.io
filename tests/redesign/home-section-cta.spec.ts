import { test, expect } from "@playwright/test";

test.describe("home section CTAs to subpages", () => {
  test("Process section has link to /process", async ({ page }) => {
    test.setTimeout(60_000);
    await page.goto("/pl", { waitUntil: "domcontentloaded", timeout: 30_000 });
    const processSection = page.locator("#process");
    await expect(processSection).toBeVisible({ timeout: 15_000 });
    await expect(processSection.locator('a[href="/pl/process/"]')).toBeVisible();
  });

  test("Faq section has link to /faq", async ({ page }) => {
    test.setTimeout(60_000);
    await page.goto("/pl", { waitUntil: "domcontentloaded", timeout: 30_000 });
    const faqSection = page.locator("#faq");
    await expect(faqSection).toBeVisible({ timeout: 15_000 });
    await expect(faqSection.locator('a[href="/pl/faq/"]')).toBeVisible();
  });
});
