import { test, expect } from '@playwright/test';

const WP_URL    = process.env.WP_URL    ?? 'http://localhost:8088/';
const NEXT_URL  = process.env.NEXT_URL  ?? 'http://localhost:3000/en/showcase/artisan-cafe';

test.describe('Bean & Brew — WP theme vs. Next.js showcase parity', () => {
  test('WP homepage exposes all expected sections and content', async ({ page }) => {
    await page.goto(WP_URL, { waitUntil: 'networkidle' });

    // Hero
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Every Cup Tells a Story');
    await expect(page.getByText('Bean & Brew', { exact: false }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: /Visit Us/i }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: /View Menu/i })).toBeVisible();

    // Story
    await expect(page.getByRole('heading', { name: 'Our Story' })).toBeVisible();
    await expect(page.locator('.cafe-story__polaroid')).toHaveCount(3);
    await expect(page.locator('.cafe-story__sticker')).toBeVisible();

    // Menu (chalkboard + tabs)
    await expect(page.getByRole('heading', { name: 'Our Menu' })).toBeVisible();
    const tabs = page.locator('.cafe-menu__tab');
    await expect(tabs).toHaveCount(4);
    await expect(tabs.first()).toHaveClass(/is-active/);

    // Coffee panel visible by default; Espresso + Flat White listed
    await expect(page.getByText('Espresso', { exact: true })).toBeVisible();
    // "Flat White" span also contains a "Featured" badge child — match via container
    await expect(page.locator('.cafe-menu__item-name').filter({ hasText: 'Flat White' })).toBeVisible();

    // Click "Tea" tab → Matcha Latte should appear, Espresso should hide
    await page.locator('.cafe-menu__tab[data-category="tea"]').click();
    await expect(page.getByText('Matcha Latte')).toBeVisible();
    await expect(page.getByText('Espresso', { exact: true })).toBeHidden();

    // Location
    await expect(page.getByRole('heading', { name: 'Visit Us' })).toBeVisible();
    await expect(page.locator('.cafe-location__map')).toBeVisible();
    await expect(page.getByText('15 Coffee Lane, London')).toBeVisible();
  });

  test('decorative elements load (sanity)', async ({ page }) => {
    await page.goto(WP_URL, { waitUntil: 'networkidle' });
    await expect(page.locator('.cafe-hero__dashed-circle')).toBeVisible();
    await expect(page.locator('.cafe-hero__wave')).toBeVisible();
    await expect(page.locator('.cafe-location__map-pin svg')).toBeVisible();
  });

  test('homepage screenshot diff (informational)', async ({ page }) => {
    await page.goto(WP_URL, { waitUntil: 'networkidle' });
    await page.waitForTimeout(500); // let scroll-reveal settle
    await page.screenshot({
      path: 'test-results/wp-bean-brew-homepage.png',
      fullPage: true,
    });

    await page.goto(NEXT_URL, { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);
    await page.screenshot({
      path: 'test-results/next-bean-brew-homepage.png',
      fullPage: true,
    });
    // Visual diff is intentionally manual — see test-results/ for screenshots.
  });
});
