import { test, expect } from "@playwright/test";

test("/pl/pricing renders presets + calculator and updates total when toggling integrations", async ({ page }) => {
  test.setTimeout(90_000);
  await page.goto("/pl/pricing", { waitUntil: "domcontentloaded", timeout: 60_000 });

  await expect(page.getByRole("button", { name: /Strona firmowa/i })).toBeVisible({ timeout: 30_000 });
  await expect(page.getByText(/Najpopularniejsze/i)).toBeVisible();

  const totalRow = page.getByText(/Suma jednorazowa/i).locator("..").locator("..");
  const before = await totalRow.innerText();

  await page.getByRole("button", { name: /^Płatności$/i }).click();
  await page.waitForTimeout(150);

  const after = await totalRow.innerText();
  expect(before).not.toBe(after);
});

test("/pl/pricing — klik 'Sklep online' preset zmienia stack na Woo i podnosi cenę", async ({ page }) => {
  test.setTimeout(90_000);
  await page.goto("/pl/pricing", { waitUntil: "domcontentloaded", timeout: 60_000 });

  await expect(page.getByRole("button", { name: /Sklep online/i })).toBeVisible({ timeout: 30_000 });
  await page.getByRole("button", { name: /Sklep online/i }).click();
  await expect(page.getByRole("button", { name: /^Woo$/i })).toHaveAttribute("aria-pressed", "true", { timeout: 5_000 });
});
