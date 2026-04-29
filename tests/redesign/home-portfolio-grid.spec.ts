import { test, expect } from "@playwright/test";

test("home shows public project name and NDA badge for private case", async ({ page }) => {
  test.setTimeout(90_000);
  await page.goto("/pl", { waitUntil: "domcontentloaded", timeout: 60_000 });
  const cards = page.locator("[data-portfolio-card]");
  await expect(cards.first()).toBeVisible({ timeout: 30_000 });
  await expect(page.locator("[data-portfolio-card][data-kind='public']").first()).toBeVisible();
  const privateCard = page.locator("[data-portfolio-card][data-kind='private']").first();
  await expect(privateCard).toBeVisible();
  await expect(privateCard.getByText(/NDA/i)).toBeVisible();
  await expect(privateCard.getByText(/Duży klient|Mały klient/i)).toBeVisible();
});
