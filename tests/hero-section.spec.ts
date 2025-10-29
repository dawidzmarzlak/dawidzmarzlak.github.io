import { test, expect } from '@playwright/test';

test.describe('Hero Section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/en');
    await page.waitForLoadState('networkidle');
  });

  test('cursor should follow text during typewriter animation', async ({ page }) => {
    // Wait for the company name to start typing
    const companyName = page.locator('h2').first();

    // Check that cursor is inline with text (part of the same text content)
    await expect(companyName).toBeVisible();

    // Wait for typewriter to complete
    await page.waitForTimeout(3000);

    // The cursor should appear and disappear as part of the text content
    const hasInlineCursor = await companyName.evaluate((el) => {
      return el.textContent?.includes('|') || false;
    });

    // During typing, cursor should be present
    expect(hasInlineCursor).toBe(true);
  });

  test('no layout shifts during typewriter animations', async ({ page }) => {
    // Get initial positions of key elements
    const badge = page.locator('text=Innovative Solutions').first();
    const ctaButton = page.locator('text=Get Started').first();

    // Wait for badge to appear
    await expect(badge).toBeVisible({ timeout: 5000 });
    const badgeInitialBox = await badge.boundingBox();

    // Wait for button to appear (after animations)
    await expect(ctaButton).toBeVisible({ timeout: 10000 });
    const buttonInitialBox = await ctaButton.boundingBox();

    // Wait a bit more and check positions haven't changed
    await page.waitForTimeout(1000);

    const badgeFinalBox = await badge.boundingBox();
    const buttonFinalBox = await ctaButton.boundingBox();

    // Y positions should remain stable (allowing 2px tolerance for rendering differences)
    expect(Math.abs((badgeInitialBox?.y || 0) - (badgeFinalBox?.y || 0))).toBeLessThan(2);
    expect(Math.abs((buttonInitialBox?.y || 0) - (buttonFinalBox?.y || 0))).toBeLessThan(2);
  });

  test('content fits on Samsung Galaxy S8+ viewport', async ({ page, browserName }) => {
    // Only run on mobile viewport
    test.skip(browserName !== 'Samsung Galaxy S8+', 'This test is only for mobile viewport');

    // Set viewport to Samsung Galaxy S8+ dimensions
    await page.setViewportSize({ width: 360, height: 740 });
    await page.goto('/en');
    await page.waitForLoadState('networkidle');

    // Wait for all content to load
    await page.waitForTimeout(8000);

    // Get hero section
    const heroSection = page.locator('section').first();
    await expect(heroSection).toBeVisible();

    // Check that section height doesn't exceed viewport
    const sectionBox = await heroSection.boundingBox();
    expect(sectionBox?.height).toBeLessThanOrEqual(740);

    // Check that all key elements are visible in viewport
    const companyName = page.locator('h2').first();
    const title = page.locator('h1').first();
    const subtitle = page.locator('p').first();
    const ctaButton = page.locator('text=Get Started').first();
    const scrollIndicator = page.locator('[class*="absolute bottom"]').last();

    await expect(companyName).toBeInViewport();
    await expect(title).toBeInViewport();
    await expect(subtitle).toBeInViewport();
    await expect(ctaButton).toBeInViewport();
    await expect(scrollIndicator).toBeInViewport();

    // Verify no content is cut off by checking scroll height
    const bodyScrollHeight = await page.evaluate(() => document.body.scrollHeight);
    const viewportHeight = 740;

    // Hero section should not require scrolling
    expect(bodyScrollHeight).toBeLessThanOrEqual(viewportHeight + 50); // 50px tolerance for browser chrome
  });

  test('scroll indicator is properly positioned', async ({ page }) => {
    await page.waitForTimeout(8000); // Wait for all animations

    const scrollIndicator = page.locator('[class*="absolute bottom"]').last();
    await expect(scrollIndicator).toBeVisible();

    const indicatorBox = await scrollIndicator.boundingBox();
    const viewportHeight = page.viewportSize()?.height || 0;

    // Check that indicator is at least 32px from bottom
    const distanceFromBottom = viewportHeight - (indicatorBox?.y || 0) - (indicatorBox?.height || 0);
    expect(distanceFromBottom).toBeGreaterThanOrEqual(32);
  });

  test('typewriter animations complete successfully', async ({ page }) => {
    // Wait for company name to complete
    await page.waitForTimeout(3000);
    const companyName = page.locator('h2').first();
    await expect(companyName).toContainText('IT Solutions');

    // Wait for title to complete
    await page.waitForTimeout(5000);
    const title = page.locator('h1').first();
    const titleText = await title.textContent();
    expect(titleText?.length || 0).toBeGreaterThan(20); // Full text should be displayed

    // Wait for subtitle to complete
    await page.waitForTimeout(8000);
    const subtitle = page.locator('p.text-muted-foreground').first();
    const subtitleText = await subtitle.textContent();
    expect(subtitleText?.length || 0).toBeGreaterThan(50); // Full text should be displayed

    // CTA buttons should be visible
    await expect(page.locator('text=Get Started')).toBeVisible();
  });

  test('responsive text sizing works correctly', async ({ page }) => {
    // Desktop view
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/en');

    const title = page.locator('h1').first();
    const titleFontSize = await title.evaluate((el) => {
      return window.getComputedStyle(el).fontSize;
    });

    const desktopFontSize = parseFloat(titleFontSize);

    // Mobile view
    await page.setViewportSize({ width: 360, height: 740 });
    await page.goto('/en');

    const mobileTitleFontSize = await title.evaluate((el) => {
      return window.getComputedStyle(el).fontSize;
    });

    const mobileFontSize = parseFloat(mobileTitleFontSize);

    // Desktop should have larger font size than mobile
    expect(desktopFontSize).toBeGreaterThan(mobileFontSize);
  });
});
