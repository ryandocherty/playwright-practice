//Section 8.39: Strategy on handling Calendars automation using Playwright

import { test, expect } from "@playwright/test";

test("Udemy: Handling Calenders", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://rahulshettyacademy.com/seleniumPractise");

  //Open the "Top Deals" page
  const [page_TopDeals] = await Promise.all([
    context.waitForEvent(`page`),
    page.getByRole(`link`, { name: `Top Deals` }).click(),
  ]);

  await expect(page_TopDeals).toHaveURL(`https://rahulshettyacademy.com/seleniumPractise/#/offers`);

  /*------------------------------------Close Browser--------------------------------------------*/
  /*---------------------------------------------------------------------------------------------*/

  await context.close();
  await browser.close();
});
