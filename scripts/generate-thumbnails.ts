import { chromium } from 'playwright';
import * as path from 'path';
import * as fs from 'fs';

const SHOWCASE_SLUGS = [
  'architecture-studio',
  'artisan-cafe',
  'coworking-space',
  'creative-agency',
  'crypto-platform',
  'eco-brand',
  'esports-team',
  'fashion-store',
  'fine-dining',
  'fitness-studio',
  'law-firm',
  'luxury-hotel',
  'music-store',
  'photo-portfolio',
  'podcast-studio',
  'real-estate',
  'saas-dashboard',
  'spa-wellness',
  'vet-clinic',
  'wedding-planner',
];

const CONFIG = {
  baseUrl: process.env.BASE_URL || 'http://localhost:3000',
  locale: 'en',
  viewport: { width: 1280, height: 720 },
  deviceScaleFactor: 2,
  timeout: 3000,
};

async function main() {
  console.log('🚀 Starting thumbnail generation...\n');

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: CONFIG.viewport,
    deviceScaleFactor: CONFIG.deviceScaleFactor,
  });

  // Set cookie consent to hide the cookie banner
  await context.addInitScript(() => {
    const consent = {
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true,
      timestamp: new Date().toISOString(),
      version: '1.0',
    };
    localStorage.setItem('cookie-consent', JSON.stringify(consent));
  });

  for (let i = 0; i < SHOWCASE_SLUGS.length; i++) {
    const slug = SHOWCASE_SLUGS[i];
    const page = await context.newPage();
    const url = `${CONFIG.baseUrl}/${CONFIG.locale}/showcase/${slug}`;

    console.log(`[${i + 1}/${SHOWCASE_SLUGS.length}] ${slug}`);

    try {
      await page.goto(url, { waitUntil: 'networkidle' });
      await page.waitForTimeout(CONFIG.timeout);

      const outputPath = path.join(
        process.cwd(),
        'public',
        'showcase',
        slug,
        'thumbnail.png'
      );

      fs.mkdirSync(path.dirname(outputPath), { recursive: true });

      await page.screenshot({ path: outputPath, type: 'png' });
      console.log(`   ✓ Saved: public/showcase/${slug}/thumbnail.png`);
    } catch (error) {
      console.error(`   ✗ Error: ${error}`);
    }

    await page.close();
  }

  await browser.close();
  console.log('\n✅ All thumbnails generated!');
}

main().catch(console.error);
