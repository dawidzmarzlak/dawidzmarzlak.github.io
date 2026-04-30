import { test, expect } from "@playwright/test";

test("/pl/contact shows the gate when no quote is stored", async ({ page }) => {
  await page.goto("/pl/contact#brief");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Porozmawiajmy");
  // Gate empty state: link to /pricing rather than the brief form fields.
  await expect(page.getByRole("link", { name: /Otwórz kalkulator/i })).toBeVisible();
  await expect(page.getByPlaceholder("anna@firma.pl")).toHaveCount(0);
});
