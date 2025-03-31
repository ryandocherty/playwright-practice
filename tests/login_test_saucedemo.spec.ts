"use strict";
import { test, expect } from "@playwright/test";
import { getElementText, SELECTORS } from "./helpers_saucedemo";

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
  await page.locator(SELECTORS.loginButton_Saucedemo).click();
  await expect(page.locator(SELECTORS.errorMessage_Saucedemo)).toBeVisible();

  //1. Call the getElementText() function (defined in helpers.ts)
  //2. Pass 1st arg: the 'page' fixture
  //3. Pass 2nd arg: the specified selector (defined in helpers.ts)
  expect(await getElementText(page, SELECTORS.errorMessage_Saucedemo)).toBe("Epic sadface: Username is required");
});

test("Saucedemo invalid login: no password", async ({ page }) => {
  //attempt to login with correct username + no password:
  await page.locator(SELECTORS.usernameInputBox_Saucedemo).fill("standard_user");
  await page.locator(SELECTORS.loginButton_Saucedemo).click();
  await expect(page.locator(SELECTORS.errorMessage_Saucedemo)).toBeVisible();
  expect(await getElementText(page, SELECTORS.errorMessage_Saucedemo)).toBe("Epic sadface: Password is required");
});

test("Saucedemo invalid login: no username", async ({ page }) => {
  //attempt to login with no username + correct password:
  await page.locator(SELECTORS.passwordInputBox_Saucedemo).fill("secret_sauce");
  await page.locator(SELECTORS.loginButton_Saucedemo).click();
  await expect(page.locator(SELECTORS.errorMessage_Saucedemo)).toBeVisible();
  expect(await getElementText(page, SELECTORS.errorMessage_Saucedemo)).toBe("Epic sadface: Username is required");
});

test("Saucedemo invalid login: invalid username", async ({ page }) => {
  //attempt to login with incorrect username:
  await page.locator(SELECTORS.usernameInputBox_Saucedemo).fill("not_a_valid_username");
  //this is the valid password:
  await page.locator(SELECTORS.passwordInputBox_Saucedemo).fill("secret_sauce");
  await page.locator(SELECTORS.loginButton_Saucedemo).click();
  await expect(page.locator(SELECTORS.errorMessage_Saucedemo)).toBeVisible();
  expect(await getElementText(page, SELECTORS.errorMessage_Saucedemo)).toBe(
    "Epic sadface: Username and password do not match any user in this service"
  );
});

test("Saucedemo invalid login: invalid password", async ({ page }) => {
  //attempt to login with correct username:
  await page.locator(SELECTORS.usernameInputBox_Saucedemo).fill("standard_user");
  //this is an invalid password:
  await page.locator(SELECTORS.passwordInputBox_Saucedemo).fill("no_a_password");
  await page.locator(SELECTORS.loginButton_Saucedemo).click();
  await expect(page.locator(SELECTORS.errorMessage_Saucedemo)).toBeVisible();
  expect(await getElementText(page, SELECTORS.errorMessage_Saucedemo)).toBe(
    "Epic sadface: Username and password do not match any user in this service"
  );
});
