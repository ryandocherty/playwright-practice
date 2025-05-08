//Section 8.37: Rewrite end to end test with getByRole, getByText conjuction with Filter logic

import { test, expect } from "@playwright/test";
import { SELECTORS_CLIENT } from "./Udemy_Tutorials_Helpers";
import dotenv from "dotenv";

//Load hidden environment variables:
dotenv.config({ path: ".env" });

test("Udemy: e2e Practice Rewrite", async ({ browser }) => {
  //For this test I want to:
  //Rewrite "Section_7_EndToEnd_Automation_Practice.spec.ts" to use getBy locators.

  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/client");

  /*----------------------------Import email address and password--------------------------------*/
  /*---------------------------------------------------------------------------------------------*/

  //Assign the email and password to a variable.
  //Using the nullish coalescing operator "??" to provide a fallback/default value,
  //in case there is an issue importing them:
  const loginEmail = process.env.LOGIN_EMAIL ?? "";
  const loginPassword = process.env.LOGIN_PASSWORD ?? "";

  //Log the username/password to the console if they are empty:
  if (!process.env.LOGIN_EMAIL || !process.env.LOGIN_PASSWORD) {
    console.log(`LOGIN_EMAIL: ${loginEmail}`);
    console.log(`LOGIN_PASSWORD: ${loginPassword}`);
  }

  /*---------------------------------------Login page--------------------------------------------*/
  /*---------------------------------------------------------------------------------------------*/

  await page.getByPlaceholder(`email@example.com`).fill(loginEmail);
  await page.getByPlaceholder(`enter your passsword`).fill(loginPassword);
  expect(page.getByRole(`button`, { name: `login` })).toBeVisible();
  await page.getByRole(`button`, { name: `login` }).click();
  await expect(page).toHaveURL(`https://rahulshettyacademy.com/client/dashboard/dash`);

  /*-------------------------------------Products page-------------------------------------------*/
  /*---------------------------------------------------------------------------------------------*/

  const products = page.locator(`.card-body`); //no getBy locator available for div elements (yet)
  await page.waitForLoadState(`networkidle`); //without this, productTitles below weren't being grabbed.
  const productTitles = await page.locator(`.card-body b`).allTextContents();
  const productsTitles_count = await page.locator(`.card-body b`).count();

  console.log(`Number of products found: ${productsTitles_count}`);
  console.log(productTitles);

  const targetProductName = `ZARA COAT 3`;
  const targetCountry = `United Kingdom`;

  //1. Locate "card-body" classes (each available product has this class).
  //2. Filter these "card-body" classes down to one containing text "ZARA COAT 3".
  //3. Then within this single "card-body" class, locate a button with name "Add to Cart".
  //4. Click this "Add to Cart" button.
  await page
    .locator(`.card-body`)
    .filter({ hasText: `ZARA COAT 3` })
    .getByRole(`button`, { name: ` Add To Cart` })
    .click();

  //Grab the price of the peoduct before adding to cart:
  const priceBeforeCart: any = await page
    .locator(`.card-body`)
    .filter({ hasText: `ZARA COAT 3` })
    .locator(`.text-muted`)
    .textContent();

  //Convert "priceBeforeCart" to purely numeric:
  const priceBeforeCart_Numeric: number = parseFloat(priceBeforeCart?.replace(/[^0-9.-]+/g, ""));

  console.log(`${targetProductName} price (products page): $${priceBeforeCart_Numeric}`);

  //There are 3 buttons named "Add to Cart", the one I want is just the "Cart" button, so I need to:
  //1. Locate element(s) with "listitem" parent (only the "Cart" button has this).
  //2. Then within "listitem" parent, locate a button with name "Cart".
  expect(page.getByRole(`listitem`).getByRole(`button`, { name: `  Cart ` })).toBeVisible();
  await page.getByRole(`listitem`).getByRole(`button`, { name: `  Cart ` }).click();
  console.log(`Clicking 'Add To Cart'...`);

  /*-------------------------------------Cart page-----------------------------------------------*/
  /*---------------------------------------------------------------------------------------------*/

  //For safety, wait for the "Checkout" button to load first:
  await page.getByRole(`button`).filter({ hasText: `Checkout` }).waitFor();

  //Grab the name of the product once its inside the cart:
  const productName_InCart = await page
    .locator(`.cartSection`)
    .filter({ hasText: targetProductName })
    .getByRole(`paragraph`)
    .filter({ hasText: `MRP` })
    .textContent();

  const priceInCart: any = await page
    .locator(`.cartSection`)
    .filter({ hasText: targetProductName })
    .getByRole(`paragraph`)
    .filter({ hasText: `MRP` })
    .textContent();

  const priceInCart_Numeric: number = parseFloat(priceInCart?.replace(/[^0-9.-]+/g, ""));

  console.log(`Product name (in cart): ${productName_InCart}`);
  console.log(`Price (in cart): $${priceInCart_Numeric}`);

  //expect(productName_InCart).toBe(targetProduct);

  await page.pause();
});
