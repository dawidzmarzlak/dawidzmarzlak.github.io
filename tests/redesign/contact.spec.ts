import { test, expect } from "@playwright/test";

test("/pl/contact brief form advances 3 steps", async ({ page }) => {
  await page.goto("/pl/contact#brief");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Porozmawiajmy");
  await page.fill("input[placeholder*='Anna']", "Tester");
  await page.fill("input[type=email]", "tester@example.com");
  await page.getByRole("button", { name: /Dalej/ }).click();
  await page.getByRole("button", { name: /Next\.js/i }).first().click();
  await page.getByRole("button", { name: /^do 10k$/ }).click();
  await page.getByRole("button", { name: /Dalej/ }).click();
  await page.fill("textarea", "Krótki opis projektu w sześciu słowach co najmniej.");
  await page.getByRole("button", { name: /Wyślij brief/ }).click();
  await expect(page.getByText(/Brief w drodze/)).toBeVisible();
});
