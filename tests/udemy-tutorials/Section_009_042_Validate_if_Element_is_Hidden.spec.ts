//Section 8.42: How to validate if element is hidden, displayed mode with Expect assertions

import { test, expect } from "@playwright/test";

test("Udemy: Validate if Elements are Hidden", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

  //await page.goto("https://www.google.com/");
  //await page.goBack();
  //await page.goForward();

  await page.pause();
  const elementDisplayed_Textbox = page.locator(`#displayed-text`);
  const elementDisplayed_HideButton = page.locator(`#hide-textbox`);
  const elementDisplayed_ShowButton = page.locator(`#show-textbox`);

  //Assert the textbox, and hide/show are visible initially:
  await expect(elementDisplayed_Textbox).toBeVisible();
  await expect(elementDisplayed_HideButton).toBeVisible();
  await expect(elementDisplayed_ShowButton).toBeVisible();

  //Type something into the textbox:
  await elementDisplayed_Textbox.pressSequentially(`Hello`, { delay: 100 });

  //Click "Hide" to hide the textbox:
  await elementDisplayed_HideButton.click();
  await expect(elementDisplayed_Textbox).toBeHidden();

  //Click "Show" to show the textbox again:
  await elementDisplayed_ShowButton.click();
  await expect(elementDisplayed_Textbox).toBeVisible();
});
