"use strict";
import { test, expect } from "@playwright/test";
import { getElementText, SELECTORS } from "./saucedemo_helpers";

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

test("Saucedemo invalid login: locked_out_user", async ({ page }) => {
  //attempt to login with username for someone who is locked out:
  await page.locator(SELECTORS.usernameInputBox).fill("locked_out_user");
  //this is a valid password:
  await page.locator(SELECTORS.passwordInputBox).fill("secret_sauce");
  await page.locator(SELECTORS.loginButton).click();
  await expect(page.locator(SELECTORS.errorMessage)).toBeVisible();
  expect(await getElementText(page, SELECTORS.errorMessage)).toBe(
    "Epic sadface: Sorry, this user has been locked out."
  );
});

test("Saucedemo invalid login: problem_user", async ({ page }) => {
  //attempt to login with username for someone who is locked out:
  await page.locator(SELECTORS.usernameInputBox).fill("problem_user");
  //this is a valid password:
  await page.locator(SELECTORS.passwordInputBox).fill("secret_sauce");
  await page.locator(SELECTORS.loginButton).click();
  await page.waitForLoadState("networkidle");

  //Saucedemo just shows images of dogs when logged in as problem_user
  //here I'm checking that the image of the first item is visible:
  await page.locator(SELECTORS.firstItemImage_datatest).waitFor({ state: "visible" });
  expect(page.locator(SELECTORS.firstItemImage_datatest)).toBeVisible();

  //A const to store the src of the first item viewable on the webpage.
  //I already have the exact src in saucedemo_helpers.ts,
  //but I want to grab it here fresh to do a comparison:
  const firstItem_src_attribute = await page.locator(SELECTORS.firstItemImage_datatest).getAttribute("src");

  //assert that the 'src' of the first item image is the same as the dog item image:
  expect(firstItem_src_attribute === SELECTORS.dogImage_src);

  //Saucedemo shows normal images when logged in as standard_user,
  //so here I'm checking that the src found earlier does not match
  //what a standard_user would be seeing:
  expect(firstItem_src_attribute !== SELECTORS.backpackImage_src);
});
