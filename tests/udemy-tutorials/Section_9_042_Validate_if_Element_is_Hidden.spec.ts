//Section 8.39: Strategy on handling Calendars automation using Playwright

import { test, expect } from "@playwright/test";

test("Udemy: Validate if Elements are Hidden", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://www.rahulshettyacademy.com/AutomationPractice/");

  /*------------------------------------Close Context--------------------------------------------*/
  /*---------------------------------------------------------------------------------------------*/

  await context.close();
});
