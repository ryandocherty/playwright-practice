//Section 4.15: Techniques to wait dynamically for new page in  Service based applications

import { test, expect } from "@playwright/test";

test("Udemy: List of Elements", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

  const userNameInputBox = page.locator(`#username`);
  const passwordInputBox = page.locator(`[type="password"]`);
  const signInButton = page.locator(`#signInBtn`);
  const cardTitles = page.locator(`.card-title a`);

  await userNameInputBox.clear();
  await passwordInputBox.clear();
  await userNameInputBox.fill(`rahulshettyacademy`);
  await passwordInputBox.fill(`learning`);
  await signInButton.click();

  await page.locator(`.card-title a`).first().textContent();
  const allCardTitles = await cardTitles.allTextContents();
  console.log(allCardTitles);
});
