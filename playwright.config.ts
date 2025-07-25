import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 30 * 1000,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: 1,
  reporter: "html",
  use: {
    trace: "on",
    screenshot: "on",
  },

  //Here you can parameterise different projects with different configuration settings:
  //In the terminal, use "npx playwright test test.spec.js --project=[projectname]"
  projects: [
    {
      name: "chromium",
      use: { browserName: "chromium", headless: true, screenshot: "on", trace: "retain-on-failure" },
    },

    {
      name: "firefox",
      use: { browserName: "firefox", headless: false, screenshot: "on", trace: "retain-on-failure" },
    },

    {
      name: "webkit",
      use: {
        browserName: "webkit",
        headless: false,
        screenshot: "on",
        trace: "retain-on-failure",

        //You can simulate specific viewports:
        viewport: { width: 720, height: 720 },
      },
    },

    {
      name: "Pixel7",
      use: {
        browserName: "chromium",
        headless: true,
        screenshot: "on",
        trace: "off",

        //You can simulate a device to run a test with:
        ...devices["Pixel 7"],

        //As well as screenshots, you can capture videos of test execution:
        //It's not recommended to turn this option on for everything, as it uses lots of resources.
        video: "on-first-retry",
      },
    },

    {
      name: "iPhone11",
      use: {
        browserName: "webkit",
        headless: false,
        screenshot: "on",
        trace: "on",
        ...devices["iPhone 11"],

        //This option can be used to ignore SSL (Secure Sockets Layer) certification.
        //Without an SSL certificate, you'll get a "This website is not secure" error.
        //This option will help to automatically ignore the error and proceed to the website:
        ignoreHTTPSErrors: true,

        //This option can be used to automatically grant permissions to a browser.
        //Permissions include geolocation, camera, microphone, notifications.
        permissions: ["notifications"],
      },
    },
  ],
});
