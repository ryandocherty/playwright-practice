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

  //Generate random integers to select dates from the calender:
  function generateRandomInteger(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const randomDesiredMonth: number = generateRandomInteger(1, 12);
  const randomDesiredDay: number = generateRandomInteger(1, 28);
  const randomDesiredYear: number = generateRandomInteger(2025, 2030);

  console.log(
    `Desired delivery date (m/d/y): ${randomDesiredMonth + `/` + randomDesiredDay + `/` + randomDesiredYear}`
  );

  const calender_OpenButton: any = page_TopDeals.locator(`.react-date-picker__button__icon`).nth(1);
  const calender_nextButton: any = page_TopDeals.locator(`.react-calendar__navigation__next-button`);
  const calender_yearLabel: any = page_TopDeals.locator(`.react-calendar__navigation__label`);

  //Open the calender selection window, then the year selector window:
  await calender_OpenButton.click();
  await calender_yearLabel.click();

  //Select the desired date:
  for (let i = 0; i < 100; i++) {
    if ((await calender_yearLabel?.textContent()) === randomDesiredYear.toString()) {
      await page_TopDeals
        .locator(`.react-calendar__year-view__months__month`)
        .nth(randomDesiredMonth - 1)
        .click();
      await page_TopDeals.locator(`//abbr[text()='${randomDesiredDay}']`).first().click();
      break;
    } else {
      await calender_nextButton.click();
    }
  }

  /*-----------------------Top Deals Page - Calender Assertions - My Method----------------------*/
  /*---------------------------------------------------------------------------------------------*/

  //For dates with leading zeros, I'm just grabbing the trailing number for the assertions.
  //e.g. They might display as "02", but I'm just grabbing the "2".
  //Anything without a leading zero can be grabbed more easily.

  const displayedMonth = await page_TopDeals.locator(`.react-date-picker__inputGroup__month`).getAttribute(`value`);
  expect(Number(displayedMonth)).toEqual(randomDesiredMonth);

  const displayedDay = await page_TopDeals.locator(`.react-date-picker__inputGroup__day`).getAttribute(`value`);
  expect(Number(displayedDay)).toEqual(randomDesiredDay);

  const displayedYear = await page_TopDeals.locator(`.react-date-picker__inputGroup__year`).getAttribute(`value`);
  expect(Number(displayedYear)).toEqual(randomDesiredYear);

  console.log(`Selected delivery date (m/d/y): ${displayedMonth}/${displayedDay}/${displayedYear}`);

  /*---------------------Top Deals Page - Calender Assertions - Using a Loop---------------------*/
  /*---------------------------------------------------------------------------------------------*/

  //1. Create an array "expectedDate" with desiredMonth, desiredDay, desiredYear.
  //2. Return an array "inputs" of <input> tags which correspond to the month, day, year displayed on the webpage.
  //3. Loop through the "inputs" array and extract the "value" attribute (the actual m/d/y numbers).
  //4. Then check the "desiredDate" matches "expectedDate" at each index.

  const desiredDate = [randomDesiredMonth, randomDesiredDay, randomDesiredYear];
  const inputs: any = page_TopDeals.locator(`.react-date-picker__inputGroup input`); //an array of <input> tags

  for (let i = 0; i < inputs.length; i++) {
    const date = await inputs[i].getAttribute(`value`);
    expect(date).toEqual(desiredDate[i]);
  }

  /*------------------------------------Close Context--------------------------------------------*/
  /*---------------------------------------------------------------------------------------------*/

  await context.close();
});
