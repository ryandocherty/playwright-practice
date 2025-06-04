//Section 11.55: How to save session storage using Playwright and inject into new Browser context

/*
Scenario:
So far we know how to login by providing a token/cookie in the session storage.
But some websites have much more complicated login processes (such as banking websites).
Some websites have complicated scenarios to store the session cookies, such as multiple key-value pairs other than a simple "token".
This could tediously involve setting lots of different values in the session storage.
NOTE - most websites do actually just use a simple "token", however it's best to cover both scenarios.

There is a workaround for this scenario:
1. Login once through usual UI automation.
2. Collect the necessary data using a Playwright method called storageState().
3. storageState() will collect basically everything you see Inspect > Application > Storage.
4. Store this data in a .json file.
5. Then inject this .json file directly into the browser when calling browser.newContext()
6. This way, the new browser context will open up in the desired "storage state".
*/

import { test, expect } from "@playwright/test";
import dotenv from "dotenv";

//Load hidden environment variables:
dotenv.config({ path: ".env" });

//Still loading the email/password from the .env file:
const loginEmail = process.env.LOGIN_EMAIL ?? "";
const loginPassword = process.env.LOGIN_PASSWORD ?? "";

//Declare global variable to store a browser instance with injected session storage data:
let context_LoggedIn;
//Declare "page" globally, so it can used inside test.beforeEach.
let page;

test.beforeAll(async ({ browser }) => {
  /*---------------------------------------Login page--------------------------------------------*/
  /*---------------------------------------------------------------------------------------------*/
  //context = the whole browser instance (can contain multiple tabs/pages).
  //page = an individual tab within the browser context/instance.
  //The cookies we inject should be on the browser level, not the page level.
  //This way, every page will have the injected cookies.
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://rahulshettyacademy.com/client");
  await page.getByPlaceholder(`email@example.com`).fill(loginEmail);
  await page.getByPlaceholder(`enter your passsword`).fill(loginPassword);
  await page.getByRole(`button`, { name: `login` }).click();
  await page.waitForLoadState(`networkidle`);

  //Here we're calling storageState() to capture all of the storage data (cookies, tokens etc.).
  //The cookies are coming from the context level (the whole browser, not just an individual page).
  //We're then creating a .json file to store the captured data.
  await context.storageState({ path: "Udemy_storageState.json" });

  //Now we need to open a new browser context and inject the storage data.
  //Now when we use "context_LoggedIn", it'll behave like a logged-in user.
  //This way, each test in this file will not require you to login first.
  //We just need to use "page = await context_LoggedIn.newPage()".
  context_LoggedIn = await browser.newContext({ storageState: "Udemy_storageState.json" });
});

test.beforeEach(async () => {
  //NOTE - this "page" variable has been created dynamically, so we don't need the {page} fixture.
  //The "page" variable now contains the session storage data, and will bypass the login screen:
  page = await context_LoggedIn.newPage();

  await page.goto("https://rahulshettyacademy.com/client");
  await page.waitForLoadState(`networkidle`);
});

test("Udemy: Verify product 'ZARA COAT 3' is present (using sessionStorage)", async () => {
  const targetProductName = `ZARA COAT 3`;
  expect(page.getByText(targetProductName)).toBeVisible();
});

test("Udemy: Verify product 'ADIDAS ORIGINAL' is present (using sessionStorage)", async () => {
  const targetProductName = `ADIDAS ORIGINAL`;
  expect(page.getByText(targetProductName)).toBeVisible();
});

test("Udemy: Verify product 'IPHONE 13 PRO' is present (using sessionStorage)", async () => {
  const targetProductName = `IPHONE 13 PRO`;
  expect(page.getByText(targetProductName)).toBeVisible();
});

test("Udemy: Print all visible products names (using sessionStorage)", async () => {
  const productTitles = await page.locator(`.card-body b`).allTextContents();
  const productsTitles_count = await page.locator(`.card-body b`).count();
  console.log(`Number of products found: ${productsTitles_count}`);
  console.log(productTitles);
});
