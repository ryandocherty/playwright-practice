//Section 4.15: Techniques to wait dynamically for new page in  Service based applications

import { test, expect } from "@playwright/test";

test("Udemy: Dynamic Waiting", async ({ page }) => {
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
  On a website, data is loaded by calls.
  There are multiple different "wait" methods to make sure the calls are finished
  before interacting with the webpage.

  We can include this method:

  "page.waitForLoadState(`networkidle`);"

  However, Playwright themselves state:
  "networkidle - DISCOURAGED. Wait until there are no network connections for at least 500 ms. 
  Don't use this method for testing, rely on web assertions to assess readiness instead."

  Using this method below, the test is still flakey because allTextContents()
  still returns an empty array:
  */

  await page.waitForLoadState(`networkidle`);
  const allCardTitles = await cardTitles.allTextContents();
  console.log(`Using ".waitForLoadState("networkidle")": ${allCardTitles}`);

  /*
  If waitForLoadState("networkidle") doesn't work, we can always revert back to
  using a locator to utilise its auto-wait mechanisms just before using allTextContents().

  We can combine the locator with a method called waitFor(). This will wait until
  the specified element is loaded.

  "await page.locator(`.card-title a`).waitFor()"
  
  Using CSS ".card-title a" will still return multiple elements on the webpage,
  and Playwright will not know which element you want it to wait for and the test will fail.
  So remember when using a locator in this way, also use first() so that 
  it's just returning a single element.
  */

  await page.locator(`.card-title a`).first().waitFor();
  const allCardTitles2 = await cardTitles.allTextContents();
  console.log(`Using ".first().waitFor()": ${allCardTitles2}`);

  //--------------------Some demo assersions--------------------
  expect(allCardTitles2.length).toBeGreaterThan(0);
  expect(allCardTitles2).toContain("iphone X");

  //List of the expected product titles:
  const expectedProductTitles = [`iphone X`, `Samsung Note 8`, `Nokia Edge`, `Blackberry`];

  //Loop through expectedProductTitles array.
  //Firstly (optionally) check that the length of expectedProductTitles matches allCardTitles2.
  //Secondly check that the title at index "i" matches the expected title.
  //Thirdly output the expected & received names to the console.
  for (let i = 0; i < expectedProductTitles.length; i++) {
    expect(expectedProductTitles).toHaveLength(allCardTitles2.length);
    expect(expectedProductTitles[i]).toBe(allCardTitles2[i]);
    console.log(`\nExpected Name: ${expectedProductTitles[i]} \nReceived Name: ${allCardTitles2[i]}`);
  }
  //------------------------------------------------------------
});
