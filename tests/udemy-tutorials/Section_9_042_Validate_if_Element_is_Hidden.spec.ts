//Section 8.39: Strategy on handling Calendars automation using Playwright

import { test, expect } from "@playwright/test";

test("Udemy: Handling Calenders", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://rahulshettyacademy.com/seleniumPractise");

  /*------------------------------------Close Context--------------------------------------------*/
  /*---------------------------------------------------------------------------------------------*/

  await context.close();
});
