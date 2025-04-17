import { test, expect } from "@playwright/test";

test("Visual regression example", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/v1/");

  /*
Using expect(page).toHaveScreenshot() helps maintain consistent UI
by checking for unintended visual changes across builds.
This is particularly useful when changes are made to the frontend code,
ensuring that the application's appearence remains as intended.
*/

  //Take a screenshot of the initial state of the landing page:
  await page.waitForLoadState("networkidle");
  //await expect(page).toHaveScreenshot("saucedemo-landing-page.png", { maxDiffPixels: 100 });
  //This line checks the current page's screenshot matches a baseline screenshot,
  //named 'saucedemo-landing-page.png'.
  //If a baseline image does not exist, it will create one.

  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill("standard_user");
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill("secret_sauce");
  await page.getByRole("button", { name: "LOGIN" }).click();

  //Take another screenshot of the initial state after logging in:
  await page.waitForLoadState("networkidle");
  //await expect(page).toHaveScreenshot("saucedemo-logged-in.png", { maxDiffPixels: 100 });
});

/*
-----Managing Baseline Screenshots-----

Initial Run:
The first time you run the test, it will save the screenshots as baseline images.

Re-running the Test:
If the layout of the application changes and you want to update the baseline,
you can do so by deleting the existing snapshots. This way, Playwright will
create new baseline screenshots based on the latest UI state.
*/
