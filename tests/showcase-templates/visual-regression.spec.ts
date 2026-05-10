import { test, expect } from "@playwright/test";

const PAGES = [
  { slug: "artisan-cafe",   path: "/en/showcase/artisan-cafe"   },
  { slug: "saas-dashboard", path: "/en/showcase/saas-dashboard" },
  { slug: "fashion-store",  path: "/en/showcase/fashion-store"  },
];

const VIEWPORTS = [
  { width: 1440, height: 900, name: "desktop" },
  { width: 1024, height: 768, name: "tablet"  },
  { width: 390,  height: 844, name: "mobile"  },
];

// Run only on chromium so viewports set below aren't multiplied across projects
test.use({ browserName: "chromium" });
// Give each test enough time for large full-page screenshots (desktop can be 4000px+)
test.setTimeout(90_000);

for (const p of PAGES) {
  test.describe(`showcase ${p.slug}`, () => {
    for (const vp of VIEWPORTS) {
      test(`renders at ${vp.name} (${vp.width}x${vp.height})`, async ({ page }) => {
        await page.setViewportSize({ width: vp.width, height: vp.height });
        await page.goto(p.path);
        await page.waitForLoadState("networkidle");
        // Pause CSS animations/transitions so screenshots are stable
        await page.addStyleTag({
          content: [
            "*,*::before,*::after{",
            "  animation-duration:0s !important;",
            "  animation-delay:0s !important;",
            "  transition-duration:0s !important;",
            "  transition-delay:0s !important;",
            "}",
          ].join("")
        });
        // Wait for any JS-driven animations (e.g. framer-motion whileInView) to settle
        await page.waitForTimeout(500);
        await expect(page).toHaveScreenshot(`${p.slug}-${vp.name}.png`, {
          fullPage: true,
          maxDiffPixelRatio: 0.02, // tolerate up to 2% pixel diff (font hinting, AA, subpixel)
          animations: "disabled",  // Playwright also disables CSS animations during capture
          timeout: 60_000,         // allow up to 60 s for stable screenshot pair
        });
      });
    }
  });
}
