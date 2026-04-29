import { test, expect } from "@playwright/test";

test("/pl/portfolio filters projects", async ({ page }) => {
  await page.goto("/pl/portfolio");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Projekty");
  // 8 projects total in the bento grid
  const allCount = await page.locator("[data-portfolio-bento] article").count();
  expect(allCount).toBeGreaterThanOrEqual(8);
  // Filter to Next.js — only 2 projects have "next" tag (FashionHub, EduPlatform)
  await page.getByRole("button", { name: /Next\.js/i }).click();
  const nextCount = await page.locator("[data-portfolio-bento] article").count();
  expect(nextCount).toBeLessThan(allCount);
  // Verify a known-Next.js project is still visible
  await expect(page.getByText(/FashionHub/i).first()).toBeVisible();
});
