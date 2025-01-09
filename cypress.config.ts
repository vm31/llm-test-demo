import { defineConfig } from 'cypress';

export default defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports',
    overwrite: false,
    html: true,
    json: true,
    charts: true,
    embeddedScreenshots: true,
  },
  viewportWidth: 1280,
  viewportHeight: 1280,
  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      return config;
    },
    fixturesFolder: 'cypress/fixtures',
    supportFile: 'cypress/support/index.ts',
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
    video: false,
    screenshotsFolder: 'cypress/reports',
    screenshotOnRunFailure: true,
    videosFolder: 'cypress/videos',
  },
});
