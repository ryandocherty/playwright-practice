//Section 4.13: How to work with locators which extract multiple webelements in page

import { test, expect } from "@playwright/test";

test("Udemy: Extracting Text Demo", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

  const userNameInputBox = page.locator(`#username`);
  const passwordInputBox = page.locator(`[type="password"]`);
  const signInButton = page.locator(`#signInBtn`);

  //--------------------Error message demo--------------------
  await userNameInputBox.fill(`Wrong_Username`);
  await passwordInputBox.fill(`Wrong_Password`);
  await signInButton.click();
  const errorMessageText = await page.locator(`[style*="block"]`).textContent();
  console.log(`Error message: "${errorMessageText}"`);
  expect(errorMessageText).toContain(`Incorrect`);
  //----------------------------------------------------------

  await userNameInputBox.clear();
  await passwordInputBox.clear();
  await userNameInputBox.fill(`rahulshettyacademy`);
  await passwordInputBox.fill(`learning`);
});
