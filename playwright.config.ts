import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  use: {

    headless: false,
    viewport: { width: 1280, height: 720 },
    actionTimeout: 5000,
    navigationTimeout: 30000,
  },
  projects: [
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
    {
      name: 'chrome',
      use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    },
  ],
  retries: 0,
  reporter:[["dot"], ["json",{
    outputFile: "jsonReports/jsonReport.json"
   }],["html", {
    open: "always"
   }]]
});