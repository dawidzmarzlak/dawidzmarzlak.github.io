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
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(`pageerror: ${e.message}`));
    page.on("console", (m) => {
      if (m.type() === "error") errors.push(`console: ${m.text()}`);
    });
    await page.goto(route, { waitUntil: "networkidle" });
    await expect(page.locator("header").first()).toBeVisible();
    await expect(page.locator("footer").first()).toBeVisible();
    // Filter out noisy expected warnings (cookies banner, hydration mismatches in dev that don't break)
    const significant = errors.filter(
      (e) => !/Failed to load resource|favicon\.ico/.test(e)
    );
    expect(significant, significant.join("\n")).toEqual([]);
  });
}
