//Section 5.18: Selecting radio buttons, Checkboxes and implement expect assertions

import { test, expect } from "@playwright/test";

test("Udemy: Implementing Expect Assertions", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

  //Return a boolean value of whether the "Terms" box has been checked or not:
  let isTermsBoxChecked = await page.locator(`#terms`).isChecked();
  console.log(`Terms box checked?: ${isTermsBoxChecked}`);
  expect(isTermsBoxChecked).toBeFalsy();

  //Return a boolean value of whether the "User" button has been checked or not:
  let isUserButtonChecked = await page.locator(`.radiotextsty`).last().isChecked();
  console.log(`User button checked?: ${isUserButtonChecked}`);
  expect(isUserButtonChecked).toBeFalsy();

  //Select "Consultant" option from drop-down box:
  await page.locator(`select.form-control`).selectOption(`consult`);

  //Select the "User" radio button:
  console.log(`Clicking "User" radio button...`);
  await page.locator(`.radiotextsty`).last().click();
  isUserButtonChecked = await page.locator(`.radiotextsty`).last().isChecked();
  console.log(`User button checked?: ${isUserButtonChecked}`);
  //Assert that "User" button is checked:
  await expect(page.locator(`.radiotextsty`).last()).toBeChecked();

  //Select "Okay" button from the pop-up:
  await page.locator(`#okayBtn`).click();

  //Click the terms & conditions check box:
  console.log(`Clicking "Terms" checkbox...`);
  await page.locator(`#terms`).click();
  isTermsBoxChecked = await page.locator(`#terms`).isChecked();
  console.log(`Terms box checked?: ${isTermsBoxChecked}`);
  //Assert that the terms & conditions box is checked:
  await expect(page.locator(`#terms`).last()).toBeChecked();

  //Uncheck the "Terms" checkbox:
  console.log(`Unclicking "Terms" checkbox...`);
  await page.locator(`#terms`).uncheck();
  isTermsBoxChecked = await page.locator(`#terms`).isChecked();
  console.log(`Terms box checked?: ${isTermsBoxChecked}`);
  expect(isTermsBoxChecked).toBeFalsy();
});

/*
-----Difference between toBeChecked() and isChecked()-----

Usage:
1. toBeChecked() is used within an assertion context (expect) 
and provides a more readable way to assert the state of checkboxes in your tests.
2. isChecked() is a method that returns the actual state of the checkbox, 
which can be used for more complex logic or directly accessing the state.

Return Type:
1. toBeChecked() does not return a value; it simply asserts the condition and will throw an error if the assertion fails.
2. isChecked() returns a boolean (true or false), indicating whether the checkbox is currently checked.
*/
