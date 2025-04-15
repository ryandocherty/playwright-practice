//Section 4.12: Extracting the text from browser and inserting valid expect assertions in test

import { test, expect } from "@playwright/test";

test("Udemy: Extracting Text Demo", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

  await page.locator(`#username`).fill(`Wrong_Username`);
  await page.locator(`[type="password"]`).fill(`Wrong_Password`);
  await page.locator(`#signInBtn`).click();

  /*
  The error message that gets displayed here when attempting to login with 
  incorrect credentials only actually displays after ~2 seconds. 
  
  This is where Playwright is clever, as it will automatically wait until the
  error message is displayed. The wait time can be modified in connfig.ts, and is
  set to 5 seconds by default.


  HTML of error message when invisible = style="display: none;"
  HTML of error message when visible = style="display: block;"

  Here I'm using style*=
  The '*' is a regular expression meaning 'partial value'
  So I'm using the 'style' attribute, but we just have to specify 'block',
  instead of basically saying style="display: block;"
  */
  const errorMessageText = await page.locator(`[style*="block"]`).textContent();
  console.log(`Error message: "${errorMessageText}"`);
  expect(errorMessageText).toContain(`Incorrect`);
});
