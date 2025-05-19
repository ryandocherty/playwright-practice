//Section 8.44: How to handle & Automate frames with Playwright - Example

import { test, expect } from "@playwright/test";

test("Udemy: Java Alert Popups", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

  /*------------------------------------Close Context--------------------------------------------*/
  /*---------------------------------------------------------------------------------------------*/

  await context.close();
});
