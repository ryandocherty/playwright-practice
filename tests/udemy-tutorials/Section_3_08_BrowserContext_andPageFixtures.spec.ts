//Section 3.8: What is browser context and Page fixtures in Playwright ?

import { test, expect } from "@playwright/test";

/* 
• Here "browser" is a fixture that comes with the Playwright library.
• There a multiple fixtures available automatically as part of the Playwright package.
• We are passing "browser" as a parameter to the test function.
• To represent, and let the function know that "browser" is specifcally a Playwright fixture,
   you have to wrap "browser" in curly braces, then it'll be evaluated as a Playwright fixture.
• If you do not pass it through curly braces, it is evaluated as a normal browser string value.
*/
test("Udemy: Browser fixture", async ({ browser }) => {
  //First you need to create a fresh browser context.
  //This instance will be a clean version of the browser,
  //basically meaning no plugins, cookies etc.

  //Here we're creating the new browser context:
  const context = await browser.newContext();
  //You can pass properties in the brackets here, like injected cookies.

  //At the moment it's just created a new browser context,
  //so now we open open a new page:
  const page = await context.newPage();
  //This page is now where you'll perform automation tests.

  await page.goto("https://www.saucedemo.com/");

  await context.close();
  await browser.close();
});

/* 
• If you don't have any properties you want to pass (such as injected cookies),
   you can just use the "page" fixture instead.
• This will open a new blank page context automatically.
• This allows you to skip declaring "context" and "page".
*/
test("Udemy: Page fixture", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");
});
