"use strict";
import { test, expect } from "@playwright/test";

//Defining the webpage element selectors outside block scope
//This is to help prevent duplicating these definitions in each test case:
const loginButton_Saucedemo_Selector = '[data-test="login-button"]';
const errorMessage_Saucedemo_Selector = '[data-test="error"]';
const usernameInputBox_Saucedemo_Selector = '[data-test="username"]';
const passwordInputBox_Saucedemo_Selector = '[data-test="password"]';

test.beforeEach(async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");
  await page.waitForLoadState("networkidle");
});

test("Saucedemo invalid login: no credentials", async ({ page }) => {
  //attempt to login without entering any credentials:
  await page.locator(loginButton_Saucedemo_Selector).click();
  await expect(page.locator(errorMessage_Saucedemo_Selector)).toBeVisible();
  await expect(page.locator(errorMessage_Saucedemo_Selector)).toHaveText(
    "Epic sadface: Username is required"
  );
});

test("Saucedemo invalid login: invalid username", async ({ page }) => {
  //attempt to login with incorrect username:
  await page.locator(usernameInputBox_Saucedemo_Selector).fill("not_a_valid_username");
  await page.locator(passwordInputBox_Saucedemo_Selector).click();
  await expect(page.locator(errorMessage_Saucedemo_Selector)).toBeVisible();
  await expect(page.locator(errorMessage_Saucedemo_Selector)).toHaveText(
    "Epic sadface: Username and password do not match any user in this service"
  );
});
