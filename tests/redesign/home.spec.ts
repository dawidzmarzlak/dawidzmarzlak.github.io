// Asserts post-B11 behavior: this test will FAIL until B11 wires the new
// Hero into app/[locale]/page.tsx. Committed now for parallel-track work.
import { test, expect } from "@playwright/test";

test("home / loads with hero, calculator and lime CTA", async ({ page }) => {
  test.setTimeout(90_000);
  await page.goto("/pl", { waitUntil: "domcontentloaded", timeout: 60_000 });
  const h1 = page.getByRole("heading", { level: 1 });
  await expect(h1).toContainText("Tworzę", { timeout: 30_000 });
  await expect(h1).toContainText("aplikacje", { timeout: 30_000 });
  await expect(h1).toContainText("zarabiać", { timeout: 30_000 });
  await expect(page.getByText(/Kalkulator wyceny/i)).toBeVisible({ timeout: 30_000 });
});
