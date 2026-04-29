// Asserts post-B11 behavior: this test will FAIL until B11 wires the new
// Hero into app/[locale]/page.tsx. Committed now for parallel-track work.
import { test, expect } from "@playwright/test";

test("home / loads with hero, calculator and lime CTA", async ({ page }) => {
  test.setTimeout(90_000);
  await page.goto("/pl", { waitUntil: "domcontentloaded", timeout: 60_000 });
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Tworzę", { timeout: 30_000 });
  await expect(page.getByRole("heading", { level: 1 })).toContainText("zarabiać", { timeout: 30_000 });
  await expect(page.getByText(/Kalkulator wyceny/i)).toBeVisible({ timeout: 30_000 });
  // Calculator default = next + 8 pages + cms = 14 200 PLN
  // Polish locale uses non-breaking space as thousands separator ( )
  await expect(page.getByText(/14[\s ]?200/)).toBeVisible({ timeout: 30_000 });
});
