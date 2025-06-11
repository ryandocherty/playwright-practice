//Section 12.64: Capture  Screenshots with Playwright on page & partial Element level  - Demo

/*
This test is a simple demonstration of taking screenshots during text execution.
The test demonstrates capturing whole-page screenshots, and partial element screenshots.
*/

import { test, expect } from "@playwright/test";

test("Udemy: Capturing Screenshots", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

  const textbox = page.locator(`#displayed-text`);
  const hideTextbox_Button = page.locator(`#hide-textbox`);
  const showTextbox_Button = page.locator(`#show-textbox`);

  //Assert the textbox, and the hide/show buttons are visible initially:
  await expect(textbox).toBeVisible();
  await expect(hideTextbox_Button).toBeVisible();
  await expect(showTextbox_Button).toBeVisible();

  //Type something into the textbox:
  await textbox.pressSequentially(`Hello`, { delay: 100 });

  //Here I'm taking a whole-page screenshot before clicking the "Hide" button:
  await page.screenshot({ path: `screenshots/Before_Hidden.png` });

  //Click "Hide" to hide the textbox.
  await hideTextbox_Button.click();
  await expect(textbox).toBeHidden();

  //Here I'm taking a whole-page screenshot after clicking the "Hide" button.
  await page.screenshot({ path: `screenshots/After_Hidden.png` });

  //Click "Show" to show the textbox again:
  await showTextbox_Button.click();
  await expect(textbox).toBeVisible();

  //Here I'm taking a partial screenshot of the texbox element:
  await textbox.screenshot({ path: `screenshots/PartialScreenshot_Textbox.png` });
});
