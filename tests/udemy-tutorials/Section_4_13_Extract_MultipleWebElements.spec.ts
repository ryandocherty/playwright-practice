//Section 4.13: How to work with locators which extract multiple webelements in page

import { test, expect } from "@playwright/test";

test("Udemy: Extracting Multiple Elements", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

  const userNameInputBox = page.locator(`#username`);
  const passwordInputBox = page.locator(`[type="password"]`);
  const signInButton = page.locator(`#signInBtn`);

  await userNameInputBox.clear();
  await passwordInputBox.clear();
  await userNameInputBox.fill(`rahulshettyacademy`);
  await passwordInputBox.fill(`learning`);
  await signInButton.click();

  /*
  For this test I want to grab the title of the first product (iPhone X) on the page.

  The way the HTML is set up is as follows:

  <div class="card-body">
    <h4 class="card-title">
        <a href="#" xpath="1">iphone X</a>
    </h4>
  </div>

  I'll need to use .className for the selector, 
  but then traverse from Parent to Child to grab the actual title text.

  The Parent here is ".card-title" (can also use "card-body" though).
  There aren't any specific attributes to use on the line containing "iphone X",
  so instead I can give the HTML tag name "a" (meaning "anchor").

  Syntax = .className <tag>

  So this would read as ".card-title a"

  However, on this specific website there are 4 products that share these
  same class names and tags. So this would fail, as Playwright wouldn't know
  which element to return.

  One way to specify the first product would be to use "nth()":
  await page.locator(".card-title a").nth(0).textContent();

  Using this method, all 4 of the elements found will be taken into an array.

  Another way to specify the first product would be to use "first()":
  await page.locator(".card-title a").first().textContent();

  Note - there isn't a second() or third() etc., but there is a last().
  To get the in-between elements, use nth(1), nth(2) etc.
  */

  const firstProductTitle = await page.locator(`.card-title a`).first().textContent();
  console.log(`1st Product: "${firstProductTitle}"`);
  expect(firstProductTitle).toBe(`iphone X`);

  const secondProductTitle = await page.locator(`.card-title a`).nth(1).textContent();
  console.log(`2nd Product: "${secondProductTitle}"`);
  expect(secondProductTitle).toBe(`Samsung Note 8`);
});
