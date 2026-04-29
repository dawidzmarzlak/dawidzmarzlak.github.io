import { test, expect } from "@playwright/test";

const ROUTES = [
  "/pl",
  "/pl/services",
  "/pl/portfolio",
  "/pl/contact",
  "/pl/about",
  "/pl/pricing",
  "/pl/showcase",
  "/pl/cookies-policy",
  "/pl/privacy-policy",
];

for (const route of ROUTES) {
  test(`${route} renders without console errors`, async ({ page }) => {
    test.setTimeout(90_000);
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(`pageerror: ${e.message}`));
    page.on("console", (m) => {
      if (m.type() === "error") errors.push(`console: ${m.text()}`);
    });
    // Dev-mode first compile can take 7–10s per route; goto allows up to 60s.
    await page.goto(route, { waitUntil: "networkidle", timeout: 60_000 });
    await expect(page.locator("header").first()).toBeVisible({ timeout: 30_000 });
    await expect(page.locator("footer").first()).toBeVisible({ timeout: 30_000 });
    // Filter out noisy expected warnings (cookies banner, hydration mismatches in dev that don't break)
    const significant = errors.filter(
      (e) => !/Failed to load resource|favicon\.ico/.test(e)
    );
    expect(significant, significant.join("\n")).toEqual([]);
  });
}
