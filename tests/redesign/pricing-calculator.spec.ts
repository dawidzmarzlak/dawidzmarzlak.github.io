import { test, expect } from "@playwright/test";

test("/pl/pricing renders presets + calculator and updates total when toggling integrations", async ({ page }) => {
  test.setTimeout(90_000);
  await page.goto("/pl/pricing", { waitUntil: "domcontentloaded", timeout: 60_000 });

  await expect(page.getByRole("button", { name: /Strona firmowa/i })).toBeVisible({ timeout: 30_000 });
  await expect(page.getByText(/Najpopularniejsze/i)).toBeVisible();
  // Wait for the Newsletter chip to be hydrated as a real button (aria-pressed reflects state).
  const newsletter = page.getByRole("button", { name: /^Newsletter$/i }).first();
  await expect(newsletter).toBeVisible({ timeout: 30_000 });
  await expect(newsletter).toHaveAttribute("aria-pressed", /true|false/, { timeout: 10_000 });

  const totalRow = page.getByText(/Suma jednorazowa/i).locator("..").locator("..");
  const before = await totalRow.innerText();

  await newsletter.click();

  // Auto-retry until the total row settles to a different value (avoids flake under parallel load).
  await expect.poll(async () => totalRow.innerText(), { timeout: 15_000 }).not.toBe(before);
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
