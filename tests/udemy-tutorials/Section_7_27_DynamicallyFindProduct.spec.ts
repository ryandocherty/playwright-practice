//Section 7.27: Write the Script to dynamically find the product to buy from list of products

import { test, expect } from "@playwright/test";
import { SELECTORS_CLIENT } from "./Udemy_Tutorials_Helpers";
import dotenv from "dotenv";

//Load hidden environment variables:
dotenv.config({ path: ".env" });

test("Udemy: Client Item Purchase Test", async ({ browser }) => {
  /*
  For this test I want to:
  1. Log in to a website
  2. Dynamically select 1 product from a list of products
  3. Add the product to cart and go to checkout
  4. Assert some information (correct product added, correct price etc.)
  */

  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/client");

  //Assign the email and password to a variable.
  //Using the nullish coalescing operator "??" to provide a fallback/default value,
  //in case there is an issue importing them:
  const loginEmail = process.env.LOGIN_EMAIL ?? "";
  const loginPassword = process.env.LOGIN_PASSWORD ?? "";

  //Throw an error if the email or password is empty:
  if (!process.env.LOGIN_EMAIL || !process.env.LOGIN_PASSWORD) {
    console.log(`LOGIN_EMAIL: ${loginEmail}`);
    console.log(`LOGIN_PASSWORD: ${loginPassword}`);
  }

  //Login to the shop:
  await page.fill(SELECTORS_CLIENT.userEmailInput, loginEmail);
  await page.fill(SELECTORS_CLIENT.userPasswordInput, loginPassword);
  await page.locator(SELECTORS_CLIENT.loginButton).click();
  await expect(page).toHaveURL(`https://rahulshettyacademy.com/client/dashboard/dash`);

  const products = page.locator(SELECTORS_CLIENT.productTitles);
  const productTitlesText = await page.locator(SELECTORS_CLIENT.productTitles).allTextContents();
  const productsAmount = await page.locator(SELECTORS_CLIENT.productTitles).count();
  console.log(`Number of products found: ${productsAmount}`);
  console.log(productTitlesText);

  for (let i = 0; i < productsAmount; i++) {}
});
