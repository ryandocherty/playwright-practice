//Section 12.65: What is visual testing & How to perform it using Playwright

/*
This test is a simple demonstration of using visual testing in Playwright.

-----Purpose of Visual Testing-----

1. Detect UI Regressions
When you change your codebase (new features, bug fixes, refactors), visual testing helps catch unintended changes in the UI.
This could be layout issues, broken styles, missing elements, or changes in colours and fonts.

2. Validate Appearance Across Browsers and Viewports:
It ensures consistency in how your app looks on various browsers, devices, and screen sizes, which is crucial for responsive design.

3. Enhance Test Coverage:
Functional tests check if elements exist or actions work.
Visual testing confirms that the UI renders visually as expected, covering aspects that functional tests might miss.

4. Ease Review Process:
Automated visual snapshots give developers and testers quick feedback.
This makes it easier to identify visual defects without manual checking.


-----Process of Visual Testing-----
1. Take an initial screenshot, then store this image in your project.
2. Later on (maybe the next day), take another screenshot and do a comparison to the original.

Visual testing is mainly useful for websites that don't often change or update.
For example, a news website wouldn't be the best example for visual testing as articles will be added regularly.
Every pixel matters to Playwright when it performs these visual comparisons.
Even something as simple as a timestamp/clock element will fail a screenshot comparison, as the displayed time will likely differ.

A good example might be google.
Google's search engine landing page doesn't visually change very often.
*/

import { test, expect } from "@playwright/test";

test("Udemy: Visual Testing", async ({ page }) => {
  await page.goto("https://google.com");

  //Here we're saying "take a fresh screenshot, then compare it to the specified screenshot"
  //The very 1st time this line is executed, the test will fail because we don't have an initial screenshot.
  //The 2nd time it's executed is when the proper comparison will be done.
  expect(await page.screenshot()).toMatchSnapshot(`Google_Landing.png`);
});
