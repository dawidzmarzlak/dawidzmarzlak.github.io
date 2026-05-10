import { test, expect } from "@playwright/test";

/**
 * Visual regression baselines committed in `*-snapshots/` are platform-specific
 * (Playwright tags them with `-chromium-<platform>.png`). The current set was
 * generated on win32 / chromium. When this suite is wired into CI (Linux runner)
 * in a future phase, fresh Linux baselines must be generated and committed —
 * the win32 PNGs will not be consulted by the Linux runner.
 *
 * For Phase 1 (local customization validation), the win32 baselines are
 * sufficient: run `BASE_URL=http://localhost:3001 npm run test:visual` after
 * making a config change to verify the page hasn't drifted from its baseline.
 */

const PAGES = [
  { slug: "artisan-cafe",   path: "/en/showcase/artisan-cafe",   settleMs: 500 },
  { slug: "saas-dashboard", path: "/en/showcase/saas-dashboard", settleMs: 500 },
  { slug: "fashion-store",  path: "/en/showcase/fashion-store",  settleMs: 500 },
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
        await page.waitForTimeout(p.settleMs);
        await expect(page).toHaveScreenshot(`${p.slug}-${vp.name}.png`, {
          fullPage: true,
          // Tolerate up to 2% pixel diff. Higher than the plan's nominal 1% to absorb
          // font hinting + AA + subpixel noise on win32. Reconsider when Linux baselines
          // are generated for CI — Linux fontconfig produces less subpixel jitter.
          maxDiffPixelRatio: 0.02,
          animations: "disabled",  // Playwright also disables CSS animations during capture
          timeout: 60_000,         // allow up to 60 s for stable screenshot pair
        });
      });
    }
  });
}
