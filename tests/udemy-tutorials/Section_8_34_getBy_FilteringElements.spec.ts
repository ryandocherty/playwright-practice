//Section 8.34: Filtering elements with GetByRole,GetByText and perform chaining methods in step

import { test, expect } from "@playwright/test";

test("Udemy: getBy locators", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/angularpractice/");
  await page.getByLabel("Check me out if you Love IceCreams!").click();
  await page.getByLabel("Employed").check();
  await page.getByLabel("Gender").selectOption("Female");
});
