import { test, expect } from "@playwright/test";

test.describe("calculator business reframe", () => {
  test("industry/audience/stage knobs render at top", async ({ page }) => {
    test.setTimeout(60_000);
    await page.goto("/pl/pricing", { waitUntil: "domcontentloaded", timeout: 30_000 });
    await expect(page.getByText(/Branża \/ sektor/i)).toBeVisible({ timeout: 15_000 });
    await expect(page.getByText(/Grupa docelowa/i)).toBeVisible();
    await expect(page.getByText(/Etap projektu/i)).toBeVisible();
  });

  test("relabeled business knobs visible (CMS, catalog, payments)", async ({ page }) => {
    test.setTimeout(60_000);
    await page.goto("/pl/pricing", { waitUntil: "domcontentloaded" });
    // Default preset is 'company' → site → CMS visible
    await expect(page.getByText(/Samodzielna edycja treści/i)).toBeVisible({ timeout: 15_000 });
    // Click 'Sklep' kind button and retry until shop section renders (handles hydration delay).
    // Clicking is idempotent when kind=shop is already active (setKind no-ops on same kind).
    const sklepBtn = page.getByRole("button", { name: /^Sklep$/i });
    await expect(async () => {
      await sklepBtn.click();
      await expect(page.getByText(/Liczba produktów/i)).toBeVisible({ timeout: 2_000 });
    }).toPass({ timeout: 20_000 });
    await expect(page.getByText(/Metody płatności online/i)).toBeVisible();
  });

  test("tech preferences panel collapsed by default", async ({ page }) => {
    await page.goto("/pl/pricing", { waitUntil: "domcontentloaded" });
    const panel = page.getByTestId("tech-prefs-panel");
    await expect(panel).toBeVisible({ timeout: 15_000 });
    const toggle = panel.locator('button[aria-expanded]').first();
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    // Hosting label hidden until panel is opened
    await expect(panel.getByText(/^Hosting$/)).toHaveCount(0);
  });

  test("tech preferences panel expands and shows hosting", async ({ page }) => {
    test.setTimeout(60_000);
    // Use load waitUntil so JS is fetched and React can hydrate before interaction.
    await page.goto("/pl/pricing", { waitUntil: "load", timeout: 30_000 });
    const panel = page.getByTestId("tech-prefs-panel");
    const toggle = panel.locator('button[aria-expanded]').first();
    // Wait for the panel to be visible and in collapsed state, then click once.
    await expect(toggle).toHaveAttribute("aria-expanded", "false", { timeout: 15_000 });
    await toggle.click();
    await expect(panel.getByText(/^Hosting$/)).toBeVisible({ timeout: 10_000 });
  });

  test("tech preferences shows shopPlatform when kind=shop", async ({ page }) => {
    test.setTimeout(60_000);
    await page.goto("/pl/pricing?kind=shop", { waitUntil: "load", timeout: 30_000 });
    const panel = page.getByTestId("tech-prefs-panel");
    const toggle = panel.locator('button[aria-expanded]').first();
    await expect(toggle).toHaveAttribute("aria-expanded", "false", { timeout: 15_000 });
    await toggle.click();
    await expect(panel.getByText(/Platforma/i)).toBeVisible({ timeout: 10_000 });
  });

  test("tech preferences shows backend+storage when kind=app", async ({ page }) => {
    test.setTimeout(60_000);
    await page.goto("/pl/pricing?kind=app", { waitUntil: "load", timeout: 30_000 });
    const panel = page.getByTestId("tech-prefs-panel");
    const toggle = panel.locator('button[aria-expanded]').first();
    await expect(toggle).toHaveAttribute("aria-expanded", "false", { timeout: 15_000 });
    await toggle.click();
    await expect(panel.getByText(/^Backend$/)).toBeVisible({ timeout: 10_000 });
    await expect(panel.getByText(/Storage \/ DB/i)).toBeVisible();
  });
});
