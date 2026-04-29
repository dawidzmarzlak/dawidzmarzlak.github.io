import { test, expect } from "@playwright/test";

test("/pl/portfolio filters projects", async ({ page }) => {
  test.setTimeout(90_000);
  await page.goto("/pl/portfolio", { waitUntil: "domcontentloaded", timeout: 60_000 });
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Projekty", { timeout: 30_000 });
  const allCount = await page.locator("[data-portfolio-bento] article").count();
  expect(allCount).toBeGreaterThan(0);
  await page.getByRole("navigation", { name: /Filtr projektów/i }).getByRole("button", { name: /Next\.js/i }).click();
  const nextCount = await page.locator("[data-portfolio-bento] article").count();
  expect(nextCount).toBeLessThan(allCount);
});

test("/pl/portfolio shows public + private cards with size labels and NDA badge", async ({ page }) => {
  test.setTimeout(90_000);
  await page.goto("/pl/portfolio", { waitUntil: "domcontentloaded", timeout: 60_000 });
  await expect(page.locator("[data-portfolio-bento] [data-kind='public']").first()).toBeVisible({ timeout: 30_000 });
  await expect(page.locator("[data-portfolio-bento] [data-kind='private']").first()).toBeVisible({ timeout: 30_000 });
  const privateCard = page.locator("[data-portfolio-bento] [data-kind='private']").first();
  await expect(privateCard.getByText("NDA")).toBeVisible();
  await expect(privateCard.getByText(/Duży klient|Mały klient/i)).toBeVisible();
});
