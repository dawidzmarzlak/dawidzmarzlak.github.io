import { test, expect } from "@playwright/test";

test("/pl/pricing renders presets + calculator and updates total when toggling integrations", async ({ page }) => {
  test.setTimeout(90_000);
  await page.goto("/pl/pricing", { waitUntil: "domcontentloaded", timeout: 60_000 });

  await expect(page.getByRole("button", { name: /Strona firmowa/i })).toBeVisible({ timeout: 30_000 });
  await expect(page.getByText(/Najpopularniejsze/i)).toBeVisible();

  const totalRow = page.getByText(/Suma jednorazowa/i).locator("..").locator("..");
  const before = await totalRow.innerText();

  // The 'company' default preset is a site, so 'Newsletter' (siteIntegrations) is the affordance.
  await page.getByRole("button", { name: /^Newsletter$/i }).first().click();
  await page.waitForTimeout(200);

  const after = await totalRow.innerText();
  expect(before).not.toBe(after);
});

test("/pl/pricing — klik 'Sklep online' preset zmienia kind na Sklep i odsłania bramki płatności", async ({ page }) => {
  test.setTimeout(90_000);
  await page.goto("/pl/pricing", { waitUntil: "domcontentloaded", timeout: 60_000 });

  await expect(page.getByRole("button", { name: /Sklep online/i })).toBeVisible({ timeout: 30_000 });
  await page.getByRole("button", { name: /Sklep online/i }).click();

  // The 'Sklep' kind tile in the calculator (first matching button — it's the only one).
  await expect(page.getByRole("button", { name: /^Sklep$/i }).first()).toHaveAttribute("aria-pressed", "true", { timeout: 5_000 });
  // Shop-specific 'Bramki płatności' label should be visible.
  await expect(page.getByText(/Bramki płatności/i).first()).toBeVisible();
  // BLIK gateway should be rendered.
  await expect(page.getByRole("button", { name: /^BLIK$/i })).toBeVisible();
});

test("/pl/pricing — switching to 'Aplikacja' kind reveals app-only knobs", async ({ page }) => {
  test.setTimeout(90_000);
  await page.goto("/pl/pricing", { waitUntil: "domcontentloaded", timeout: 60_000 });

  // The kind-row 'Aplikacja' button inside the calculator.
  await page.getByRole("button", { name: /^Aplikacja$/i }).first().click();
  await expect(page.getByText(/Logowanie \/ role/i)).toBeVisible({ timeout: 5_000 });
  await expect(page.getByText(/Aplikacja mobilna/i)).toBeVisible();
});
