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

  test("Services section has tile-level links to /services", async ({ page }) => {
    test.setTimeout(60_000);
    await page.goto("/pl", { waitUntil: "domcontentloaded", timeout: 30_000 });
    const servicesSection = page.locator("#services");
    await expect(servicesSection).toBeVisible({ timeout: 15_000 });
    // SectionHead pill + 5 tile links — at least 5 links to /services in this section.
    const links = servicesSection.locator('a[href="/pl/services/"]');
    expect(await links.count()).toBeGreaterThanOrEqual(5);
  });

  test("About bento has tile-level links to /about", async ({ page }) => {
    test.setTimeout(60_000);
    await page.goto("/pl", { waitUntil: "domcontentloaded", timeout: 30_000 });
    // AboutBento has no #id, but its 5 linked cells are the only /about anchors above the footer.
    // The footer also has a /about link so we restrict to <main>.
    const main = page.locator("main");
    const aboutLinks = main.locator('a[href="/pl/about/"]');
    expect(await aboutLinks.count()).toBeGreaterThanOrEqual(5);
  });
});
