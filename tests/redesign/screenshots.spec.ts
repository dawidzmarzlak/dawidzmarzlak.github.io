import { test } from "@playwright/test";

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
  test(`screenshot ${route}`, async ({ page }, testInfo) => {
    test.setTimeout(120_000);
    await page.goto(route, { waitUntil: "networkidle", timeout: 60_000 });
    await page.waitForTimeout(800);
    const slug = route.replace(/^\/+|\/+$/g, "").replace(/\//g, "-") || "home";
    await page.screenshot({
      path: testInfo.outputPath(`${slug}-${testInfo.project.name}-fullpage.png`),
      fullPage: true,
    });
  });
}
