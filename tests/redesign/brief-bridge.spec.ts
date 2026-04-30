import { test, expect } from "@playwright/test";

test("/pl/pricing → /pl/contact carries quote summary into brief form", async ({ page }) => {
  test.setTimeout(120_000);
  // Step 1: visit /pricing so the calculator runs and saveQuote() populates sessionStorage.
  await page.goto("/pl/pricing", { waitUntil: "domcontentloaded", timeout: 60_000 });
  await expect(page.locator('a[href*="from=quote"]')).toBeVisible({ timeout: 30_000 });
  await page.waitForFunction(
    () => !!window.sessionStorage.getItem("it-solutions:quote-v1"),
    null,
    { timeout: 10_000 }
  );

  // Step 2: navigate to /contact in the same tab — sessionStorage persists, so the brief
  // should read the stored quote and NOT show the gate.
  await page.goto("/pl/contact?from=quote#brief", { waitUntil: "domcontentloaded", timeout: 60_000 });

  // Quote summary should be visible (not the gate).
  await expect(page.getByText(/Twoja wycena/i).first()).toBeVisible({ timeout: 30_000 });
  await expect(page.getByText(/Strona wizytówka/i).first()).toBeVisible();

  // Fill identity step.
  await page.getByPlaceholder(/Anna Kowalska/i).fill("Tester");
  await page.getByPlaceholder("anna@firma.pl").fill("tester@example.com");
  await page.getByRole("button", { name: /^Dalej/ }).click();

  // Fill description step and submit.
  await page.locator("textarea").fill("Krótki opis projektu w sześciu słowach co najmniej.");
  await page.getByRole("button", { name: /Wyślij brief/ }).click();
  await expect(page.getByText(/Brief w drodze/)).toBeVisible({ timeout: 10_000 });
});
