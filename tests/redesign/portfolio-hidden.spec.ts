import { test, expect } from "@playwright/test";

test.describe("portfolio hidden but reachable", () => {
  test("navbar does not link to /portfolio", async ({ page }) => {
    await page.goto("/pl", { waitUntil: "domcontentloaded" });
    const nav = page.getByRole("navigation").first();
    await expect(nav.locator('a[href="/pl/portfolio"]')).toHaveCount(0);
  });

  test("footer does not link to /portfolio", async ({ page }) => {
    await page.goto("/pl", { waitUntil: "domcontentloaded" });
    const footer = page.locator("footer");
    await expect(footer.locator('a[href="/pl/portfolio"]')).toHaveCount(0);
  });

  test("/portfolio page still loads (direct URL access)", async ({ page }) => {
    await page.goto("/pl/portfolio", { waitUntil: "domcontentloaded" });
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("/portfolio page emits robots noindex meta", async ({ page }) => {
    await page.goto("/pl/portfolio", { waitUntil: "domcontentloaded" });
    const robotsMeta = await page.locator('meta[name="robots"]').getAttribute("content");
    expect(robotsMeta?.toLowerCase() ?? "").toContain("noindex");
  });

  test("sitemap.xml does not include /portfolio", async ({ request }) => {
    const res = await request.get("/sitemap.xml");
    expect(res.status()).toBe(200);
    const body = await res.text();
    expect(body).not.toContain("/portfolio");
  });
});
