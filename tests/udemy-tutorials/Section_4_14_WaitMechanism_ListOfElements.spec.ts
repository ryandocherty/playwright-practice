//Section 4.14: Understanding how wait mechanism works if list of elements are returned

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

  /*
  For this test, let's say I want to grab ALL of the titles of the products.

  Atm, there are only 4 products on the page. But what if there were 40 tomorrow?
  It would be cumbersome to use nth(0), nth(1), nth(2) etc.
  In this case, the "allTextContents()" method comes in handy.
  The allTextContents() method will return an array of all the titles found.
  */

  const allCardTitles = await cardTitles.allTextContents();
  console.log(allCardTitles);

  /*
  As of now, allTextContents() will return an empty array.
  This is because allTextContents() does not have any auto-wait mechanism.

  Going to https://playwright.dev/docs/actionability, you can see that this method is not listed,
  however some other text extraction methods are listed.

  Even though we have Playwright set to wait 30 seconds for elements to be visible, stable etc.,
  the empty array is still 'valid' to Playwright. An empty array is not classed as invalid/null.


  If we added this line before attempting allTextContents():

  "await page.locator(`.card-title a`).first().textContent();"

  Then the array would be populated correctly, because the textContent() method
  actually does have auto-wait mechanisms. In this case, Playwright would wait until
  it found the first product, in which case the remaining products have likely loaded as well.
  Therefore, allTextContents() wouldn't have a problem finding all the product titles.
  */

  await page.locator(`.card-title a`).first().textContent();
  console.log(await cardTitles.allTextContents());
});
