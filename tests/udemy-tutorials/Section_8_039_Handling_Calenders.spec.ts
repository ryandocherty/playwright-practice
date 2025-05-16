//Section 8.39: Strategy on handling Calendars automation using Playwright

import { test, expect } from "@playwright/test";

test("Udemy: Handling Calenders", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://rahulshettyacademy.com/seleniumPractise");
  await page.locator(`.brand`).first().waitFor();

  /*------------------------------------Top Deals Page-------------------------------------------*/
  /*---------------------------------------------------------------------------------------------*/

  //Open the "Top Deals" page
  const [page_TopDeals] = await Promise.all([
    context.waitForEvent(`page`),
    page.getByRole(`link`, { name: `Top Deals` }).click(),
  ]);

  await page_TopDeals.locator(`.brand`).first().waitFor();
  await expect(page_TopDeals).toHaveURL(`https://rahulshettyacademy.com/seleniumPractise/#/offers`);

  //Declare the desired calender date:
  const desiredDay: any = `09`;
  const desiredMonth: any = `1`;
  const desiredYear: any = `2040`;

  //Remove leading zeros if present:
  let desiredDay_noZeros = desiredDay;
  let desiredMonth_noZeros = desiredMonth;
  if (desiredDay.startsWith(`0`)) {
    desiredDay_noZeros = desiredDay.slice(1);
  }
  if (desiredMonth.startsWith(`0`)) {
    desiredMonth_noZeros = desiredMonth.slice(1);
  }

  console.log(
    `Desired delivery date (m/d/y): ${Number(desiredMonth) + `/` + Number(desiredDay) + `/` + Number(desiredYear)}`
  );

  const calender_OpenButton: any = page_TopDeals.locator(`.react-date-picker__button__icon`).nth(1);
  const calender_nextButton: any = page_TopDeals.locator(`.react-calendar__navigation__next-button`);
  const calender_yearLabel: any = page_TopDeals.locator(`.react-calendar__navigation__label`);

  //Open the calender selection window, then the year selector window:
  await calender_OpenButton.click();
  await calender_yearLabel.click();
  //await page.pause();

  //Select the desired date:
  for (let i = 0; i < 100; i++) {
    if ((await calender_yearLabel?.textContent()) === desiredYear) {
      await page_TopDeals
        .locator(`.react-calendar__year-view__months__month`)
        .nth(Number(desiredMonth_noZeros - 1))
        .click();
      await page_TopDeals.locator(`//abbr[text()='${desiredDay_noZeros}']`).click();
      break;
    } else {
      await calender_nextButton.click();
    }
  }

  /*-----------------------Top Deals Page - Calender Assertions - My Method----------------------*/
  /*---------------------------------------------------------------------------------------------*/

  //For dates with leading zeros, I'm just grabbing the number after for the assertions:
  //e.g. They might display as "02", but I'm just grabbing the "2".

  const displayedMonth = await page_TopDeals.locator(`.react-date-picker__inputGroup__month`).getAttribute(`value`);
  expect(Number(displayedMonth)).toEqual(Number(desiredMonth));

  const displayedDay = await page_TopDeals.locator(`.react-date-picker__inputGroup__day`).getAttribute(`value`);
  expect(Number(displayedDay)).toEqual(Number(desiredDay));

  const displayedYear = await page_TopDeals.locator(`.react-date-picker__inputGroup__year`).getAttribute(`value`);
  expect(Number(displayedYear)).toEqual(Number(desiredYear));

  console.log(`Selected delivery date (m/d/y): ${displayedMonth}/${displayedDay}/${displayedYear}`);

  /*---------------------Top Deals Page - Calender Assertions - Using a Loop---------------------*/
  /*---------------------------------------------------------------------------------------------*/

  //1. Create an array "expectedDate" with desiredMonth, desiredDay, desiredYear.
  //2. Return an array "inputs" of <input> tags which correspond to the month, day, year displayed on the webpage.
  //3. Loop through the "inputs" array and extract the "value" attribute (the actual m/d/y numbers).
  //4. Then check the "desiredDate" matches "expectedDate" at each index.

  const desiredDate = [desiredMonth, desiredDay, desiredYear];
  const inputs: any = page_TopDeals.locator(`.react-date-picker__inputGroup input`); //an array of <input> tags

  for (let i = 0; i < inputs.length; i++) {
    const date = await inputs[i].getAttribute(`value`);
    expect(date).toEqual(desiredDate[i]);
  }
  /*------------------------------------Close Browser--------------------------------------------*/
  /*---------------------------------------------------------------------------------------------*/

  await context.close();
  await browser.close();
});
