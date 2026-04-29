import { test, expect } from "@playwright/test";

test("/pl/services switches detail card on tab click", async ({ page }) => {
  await page.goto("/pl/services");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Pięć stosów");
  await expect(page.locator("[data-stack-detail]")).toContainText("Production-grade React");
  await page.getByRole("button", { name: /WordPress/i }).click();
  await expect(page.locator("[data-stack-detail]")).toContainText("WordPress — ale zrobiony jak należy");
});
