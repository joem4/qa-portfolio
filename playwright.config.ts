import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

const environment = process.env.ENV || 'qa';

dotenv.config({
  path: path.resolve(__dirname, `.env.${environment}`),
});

if (!process.env.BASE_URL) {
  throw new Error(`BASE_URL is not defined in .env.${environment}`);
}

if (!process.env.COGNITO_USERNAME || !process.env.COGNITO_PASSWORD) {
  throw new Error(`COGNITO_USERNAME or COGNITO_PASSWORD is not defined in .env.${environment}`);
}

export default defineConfig({
  testDir: './tests',

  fullyParallel: true,

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 0,

  workers: process.env.CI ? 2 : undefined,

  timeout: 60_000,

  expect: {
    timeout: 10_000,
  },

  outputDir: 'test-results',

  reporter: [
    ['list'],
    ['html', { open: 'never' }],
  ],

  use: {
    baseURL: process.env.BASE_URL,

    headless: process.env.HEADLESS === 'false' ? false : true,

    viewport: {
      width: 1280,
      height: 720,
    },

    trace: process.env.CI ? 'on' : 'on-first-retry',

    screenshot: 'only-on-failure',

    video: 'retain-on-failure',

    actionTimeout: 15_000,

    navigationTimeout: 30_000,

    ignoreHTTPSErrors: true,
  },

  projects: [
    {
      name: 'setup',
      testMatch: /.*\.setup\.spec\.ts/,
    },

    {
      name: 'Chromium',
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'storage/auth-state.json',
      },
      dependencies: ['setup'],
    },
  ],
});