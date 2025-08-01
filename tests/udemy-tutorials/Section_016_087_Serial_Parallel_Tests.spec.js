//Section 16.87: How to run tests parallely from the same file by extending test option behaviour

import { test, expect } from "@playwright/test";

test("Udemy: Handling Frames - Parallel Tests Demo", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  const framesPage = page.frameLocator(`#courses-iframe`);
  await framesPage.locator(`li [href="lifetime-access"]:visible`).click();
  const headerText = await framesPage.locator(`.text h2`).textContent();
  console.log(headerText);
  const extractedNumber = headerText?.split(` `)[1].trim();
  console.log(extractedNumber);
  expect(extractedNumber).toBeGreaterThan(0);
});

test("Udemy: Capturing Screenshots - Parallel Tests Demo", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  const textbox = page.locator(`#displayed-text`);
  const hideTextbox_Button = page.locator(`#hide-textbox`);
  const showTextbox_Button = page.locator(`#show-textbox`);
  await expect(textbox).toBeVisible();
  await expect(hideTextbox_Button).toBeVisible();
  await expect(showTextbox_Button).toBeVisible();
  await textbox.pressSequentially(`Hello`, { delay: 100 });
  await page.screenshot({ path: `screenshots/Before_Hidden.png` });
  await hideTextbox_Button.click();
  await expect(textbox).toBeHidden();
  await page.screenshot({ path: `screenshots/After_Hidden.png` });
  await showTextbox_Button.click();
  await expect(textbox).toBeVisible();
  await textbox.screenshot({ path: `screenshots/PartialScreenshot_Textbox.png` });
});

test("Udemy: Java Alert Popups", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  page.on(`dialog`, (dialog) => dialog.accept());
  await page.locator(`#confirmbtn`).click();
  await page.locator(`#alertbtn`).click();
  await Promise.all([await page.locator(`#mousehover`).hover(), await page.locator(`.mouse-hover-content a`).first().click()]);
});
