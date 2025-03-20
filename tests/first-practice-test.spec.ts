//Import the Playwright test library:
import { test, expect } from "@playwright/test";

test("Has Google title", async ({ page }) => {
  //Navigate to google's homepage:
  await page.goto("https://www.google.com/");

  //Assert that the title is "Google":
  await expect(page).toHaveTitle("Google");

  //Get the title of "Google.com",
  //Then assert that the length of "Google" is 6 characters long:
  expect(await page.title()).toHaveLength(6);
});

test("Has Store page title", async ({ page }) => {
  await page.goto("https://www.google.com/");

  //Wait for the webpage to load all resources first, before interacting with any elements:
  await page.waitForLoadState("networkidle");

  //Find and click the "Reject all" button on the cookies pop-up:
  await page.locator('role=button[name="Reject all"]').click();

  //Wait for the 'Store' link to be visible (was having issues with it not being visible):
  await page.locator('role=link[name="Store"]').waitFor({ state: "visible" });

  //Click the 'Store' link:
  await page.locator('role=link[name="Store"]').click();

  //Wait for the Store page to be fully loaded first:
  await page.waitForLoadState("networkidle");

  //Check that the Store page title contains "Google store" substring:
  await expect(page).toHaveTitle(/Google Store/);
});
