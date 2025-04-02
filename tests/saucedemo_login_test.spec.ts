"use strict";
import { test, expect, selectors } from "@playwright/test";
import {
  getElementText,
  SELECTORS,
  addToCartButtons,
  removeFromCartButtons,
  getElementDataTest,
} from "./saucedemo_helpers";

/*
These tests are to check that the error messages displayed
on saucedemo.com are correct, depending on which combination
of login credentials are given.
*/

test.beforeEach(async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");
  await page.waitForLoadState("networkidle");
});

test("Saucedemo invalid login: no credentials", async ({ page }) => {
  //attempt to login without entering any credentials:
  await page.locator(SELECTORS.loginButton).click();
  await expect(page.locator(SELECTORS.errorMessage)).toBeVisible();

  //1. Call the getElementText() function (defined in saucedemo_helpers.ts)
  //2. Pass 1st arg: the 'page' fixture
  //3. Pass 2nd arg: the specified selector (defined in saucedemo_helpers.ts)
  expect(await getElementText(page, SELECTORS.errorMessage)).toBe("Epic sadface: Username is required");
});

test("Saucedemo invalid login: no password", async ({ page }) => {
  //attempt to login with correct username + no password:
  await page.locator(SELECTORS.usernameInputBox).fill("standard_user");
  await page.locator(SELECTORS.loginButton).click();
  await expect(page.locator(SELECTORS.errorMessage)).toBeVisible();
  expect(await getElementText(page, SELECTORS.errorMessage)).toBe("Epic sadface: Password is required");
});

test("Saucedemo invalid login: no username", async ({ page }) => {
  //attempt to login with no username + correct password:
  await page.locator(SELECTORS.passwordInputBox).fill("secret_sauce");
  await page.locator(SELECTORS.loginButton).click();
  await expect(page.locator(SELECTORS.errorMessage)).toBeVisible();
  expect(await getElementText(page, SELECTORS.errorMessage)).toBe("Epic sadface: Username is required");
});

test("Saucedemo invalid login: invalid username", async ({ page }) => {
  //attempt to login with incorrect username:
  await page.locator(SELECTORS.usernameInputBox).fill("not_a_valid_username");
  //this is the valid password:
  await page.locator(SELECTORS.passwordInputBox).fill("secret_sauce");
  await page.locator(SELECTORS.loginButton).click();
  await expect(page.locator(SELECTORS.errorMessage)).toBeVisible();
  expect(await getElementText(page, SELECTORS.errorMessage)).toBe(
    "Epic sadface: Username and password do not match any user in this service"
  );
});

test("Saucedemo invalid login: invalid password", async ({ page }) => {
  //attempt to login with correct username:
  await page.locator(SELECTORS.usernameInputBox).fill("standard_user");
  //this is an invalid password:
  await page.locator(SELECTORS.passwordInputBox).fill("not_a_password");
  await page.locator(SELECTORS.loginButton).click();
  await expect(page.locator(SELECTORS.errorMessage)).toBeVisible();
  expect(await getElementText(page, SELECTORS.errorMessage)).toBe(
    "Epic sadface: Username and password do not match any user in this service"
  );
});

test("Saucedemo login: locked_out_user", async ({ page }) => {
  //locked_out_user = unable to log-in
  await page.locator(SELECTORS.usernameInputBox).fill("locked_out_user");
  await page.locator(SELECTORS.passwordInputBox).fill("secret_sauce");
  await page.locator(SELECTORS.loginButton).click();
  await expect(page.locator(SELECTORS.errorMessage)).toBeVisible();
  expect(await getElementText(page, SELECTORS.errorMessage)).toBe(
    "Epic sadface: Sorry, this user has been locked out."
  );
});

test("Saucedemo login: problem_user", async ({ page }) => {
  //problem_user = just shows the same dog picture for every item

  await page.locator(SELECTORS.usernameInputBox).fill("problem_user");
  await page.locator(SELECTORS.passwordInputBox).fill("secret_sauce");
  await page.locator(SELECTORS.loginButton).click();
  await page.waitForLoadState("networkidle");

  //Saucedemo just shows images of dogs when logged in as problem_user
  //here I'm checking that the image of the first item is visible:
  await page.locator(SELECTORS.firstItemImage).waitFor({ state: "visible" });
  expect(page.locator(SELECTORS.firstItemImage)).toBeVisible();

  //A const to store the src of the first item viewable on the webpage.
  //I already have the exact src in saucedemo_helpers.ts,
  //but I want to grab it here fresh to do a comparison:
  const firstItem_src = await page.locator(SELECTORS.firstItemImage).getAttribute("src");

  //assert that the 'src' of the first item image is the same as the dog item image:
  expect(firstItem_src === SELECTORS.dogImage_src);

  //Saucedemo shows normal images when logged in as standard_user,
  //so here I'm checking that the src found earlier does not match
  //what a standard_user would be seeing (backpack image):
  expect(firstItem_src !== SELECTORS.backpackImage_src);
});

test("Saucedemo login: performance_glitch_user", async ({ page }) => {
  //performance_glitch_user = simulates slow log-in speed

  await page.locator(SELECTORS.usernameInputBox).fill("performance_glitch_user");
  await page.locator(SELECTORS.passwordInputBox).fill("secret_sauce");

  //Timing the speed it takes to log in as a performance_glitch_user:
  const startTime = Date.now();
  await page.locator(SELECTORS.loginButton).click();
  await page.waitForLoadState("networkidle");
  const endTime = Date.now();
  const loadTime = endTime - startTime;
  console.log(`Log-in took ${loadTime / 1000} seconds`);

  //expect the log-in time to be less than 10s:
  expect(loadTime).toBeLessThan(10000);
});

test("Saucedemo login: error_user", async ({ page }) => {
  //error_user = simulates some buttons not working

  await page.locator(SELECTORS.usernameInputBox).fill("error_user");
  await page.locator(SELECTORS.passwordInputBox).fill("secret_sauce");
  await page.locator(SELECTORS.loginButton).click();
  await page.waitForLoadState("networkidle");

  //page.$$ returns an array of all "Add to Cart" buttons:
  //Note - all of the "data-test" attributes for the buttons
  //initially start with "add-to-cart", which makes this simple
  //Note - the "^=" is a wildcard match to select all attributes that start with a specific value
  const initialButtons = await page.$$(`button[data-test^="add-to-cart"]`);

  //initialise an array to store the broken buttons' data-test attributes
  const brokenButtons = [];

  //loop through each of the buttons found with data-test attribute starting with "add-to-cart":
  for (const button of initialButtons) {
    //grab the "data-test" attribute for each button in the loop:
    const initialButtons_DataTest = await button.getAttribute("data-test");

    await page.pause();
    await button.click();
    await page.waitForLoadState("networkidle");
    const buttonText = await button.innerText();

    //NOTE FOR LATER: here is the problem
    //It's still reading the buttons as "add to cart":
    console.log(`Button text: ${buttonText}`);

    if ((await button.innerText()) !== "Remove") {
      brokenButtons.push(await button.getAttribute("data-test"));
    }
    console.log(`Initial Button Data Test: ${initialButtons_DataTest}`);
  }
});

//1. grab all original data-test^="add-to-cart" attributes before clicking any buttons
//2. loop through and click all the buttons
//3. grab all the buttons that now have data-test^="remove"
//4. output the buttons that do not have data-test^="remove"
