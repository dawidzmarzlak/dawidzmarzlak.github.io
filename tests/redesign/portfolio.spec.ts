import { test, expect } from "@playwright/test";

test("/pl/portfolio filters projects", async ({ page }) => {
  test.setTimeout(90_000);
  await page.goto("/pl/portfolio", { waitUntil: "networkidle", timeout: 60_000 });
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Projekty", { timeout: 30_000 });
  // 8 projects total in the bento grid
  const allCount = await page.locator("[data-portfolio-bento] article").count();
  expect(allCount).toBeGreaterThanOrEqual(8);
  // Filter to Next.js — only 2 projects have "next" tag (FashionHub, EduPlatform)
  // Scope to the filter nav so we don't accidentally hit the Next.js dev-tools button.
  await page.getByRole("navigation", { name: /Filtr projektów/i }).getByRole("button", { name: /Next\.js/i }).click();
  const nextCount = await page.locator("[data-portfolio-bento] article").count();
  expect(nextCount).toBeLessThan(allCount);
  // Verify a known-Next.js project is still visible
  await expect(page.getByText(/FashionHub/i).first()).toBeVisible();
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
