//Section 15.82: Various options in use property & setting up Project configurations
//Section 15.83: View port Property on emulating browser to mobile devices with playwright
//Section 15.84: Screenshots, Videos, Traces & SSL certification options setting in Config file
//Section 16.85: How to fix flaky tests with test retry option in playwright config file

import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 30 * 1000,
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: 1,
  workers: 3,
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
      use: { browserName: "firefox", headless: true, screenshot: "on", trace: "retain-on-failure" },
    },

    {
      name: "webkit",
      use: {
        browserName: "webkit",
        headless: true,
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
        headless: true,
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
