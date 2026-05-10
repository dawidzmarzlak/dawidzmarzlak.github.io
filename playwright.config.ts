import { defineConfig, devices } from '@playwright/test';

const BASE_URL = process.env.BASE_URL ?? 'http://localhost:3000';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: BASE_URL,
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } },
    },
    {
      name: 'tablet',
      use: { ...devices['Desktop Chrome'], viewport: { width: 1024, height: 768 } },
    },
    {
      name: 'Samsung Galaxy S8+',
      use: {
        ...devices['Galaxy S8'],
        viewport: { width: 360, height: 740 }
      },
    },
  ],

  webServer: {
    command: 'npm run dev',
    url: `${BASE_URL}/pl`,
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
});
