import { test, expect } from "@playwright/test";

test("/pl/pricing → /pl/contact carries quote summary into brief form", async ({ page }) => {
  test.setTimeout(120_000);
  await page.goto("/pl/pricing", { waitUntil: "domcontentloaded", timeout: 60_000 });

  // Default preset = 'company' (site / 10 pages / cms). Submit it as-is via the breakdown CTA.
  await expect(page.getByRole("link", { name: /Wyślij brief/i })).toBeVisible({ timeout: 30_000 });
  await page.getByRole("link", { name: /Wyślij brief/i }).click();

  // We are now on /pl/contact — gate should NOT show because session storage has the quote.
  await expect(page).toHaveURL(/\/pl\/contact/);
  await expect(page.getByText(/Twoja wycena/i).first()).toBeVisible({ timeout: 30_000 });
  await expect(page.getByText(/Strona wizytówka/i)).toBeVisible();

  // Fill identity step.
  await page.getByPlaceholder(/Anna Kowalska/i).fill("Tester");
  await page.getByPlaceholder("anna@firma.pl").fill("tester@example.com");
  await page.getByRole("button", { name: /^Dalej/ }).click();

  // Fill description step and submit.
  await page.locator("textarea").fill("Krótki opis projektu w sześciu słowach co najmniej.");
  await page.getByRole("button", { name: /Wyślij brief/ }).click();
  await expect(page.getByText(/Brief w drodze/)).toBeVisible({ timeout: 10_000 });
});
