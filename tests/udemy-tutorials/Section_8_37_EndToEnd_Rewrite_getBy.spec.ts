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
  const addToCartButton_Element = page
    .locator(`.card-body`)
    .filter({ hasText: targetProductName })
    .getByRole(`button`, { name: ` Add To Cart` });

  expect(addToCartButton_Element).toBeVisible();
  await addToCartButton_Element.click();

  const price_BeforeCart_Element = page
    .locator(`.card-body`)
    .filter({ hasText: targetProductName })
    .locator(`.text-muted`);

  expect(price_BeforeCart_Element).toBeVisible();
  const price_BeforeCart: any = await price_BeforeCart_Element.textContent();

  //Convert "price_BeforeCart" to purely numeric:
  const price_BeforeCart_Numeric: number = parseFloat(price_BeforeCart?.replace(/[^0-9.-]+/g, ``));

  console.log(`Price (products page): $${price_BeforeCart_Numeric}`);

  //There are 3 buttons named "Add to Cart", the one I want is just the "Cart" button, so I need to:
  //1. Locate element(s) with "listitem" parent (only the "Cart" button has this).
  //2. Then within "listitem" parent, locate a button with name "Cart".
  expect(page.getByRole(`listitem`).getByRole(`button`, { name: `  Cart ` })).toBeVisible();
  await page.getByRole(`listitem`).getByRole(`button`, { name: `  Cart ` }).click();
  console.log(`Clicking 'Add To Cart'...`);

  /*-------------------------------------Cart page-----------------------------------------------*/
  /*---------------------------------------------------------------------------------------------*/

  //For safety, wait for the "Checkout" button to load before continuing to interact:
  await page.getByRole(`button`).filter({ hasText: `Checkout` }).waitFor();

  //Grabbing the element separately before extracting the text.
  //This is so I can use toBeVisible() later on.
  const productName_InCart_Element: any = page
    .locator(`.cartSection`)
    .filter({ hasText: targetProductName })
    .getByRole(`heading`);

  //Grab the name of the product once it's inside the cart:
  const productName_InCart: any = await productName_InCart_Element.textContent();

  const price_InCart_Element: any = page
    .locator(`.cartSection`)
    .filter({ hasText: targetProductName })
    .getByRole(`paragraph`)
    .filter({ hasText: `MRP` });

  //Grab the price of the product once it's inside the cart:
  const price_InCart = await price_InCart_Element.textContent();
  //Convert "price_InCart" to purely numeric:
  const price_InCart_Numeric: number = parseFloat(price_InCart?.replace(/[^0-9.-]+/g, ``));

  console.log(`Price (in cart): $${price_InCart_Numeric}`);
  console.log(`Name (in cart): ${productName_InCart?.trim()}`);

  //Expect the product name & price to still be the same:
  expect(page.getByText(targetProductName)).toBeVisible();
  expect(productName_InCart_Element).toBeVisible();
  expect(price_InCart_Element).toBeVisible();
  expect(productName_InCart).toBe(targetProductName);
  expect(price_InCart_Numeric).toEqual(price_BeforeCart_Numeric);

  /*------------------------------------Checkout Page--------------------------------------------*/
  /*---------------------------------------------------------------------------------------------*/

  //Click the "Checkout" button:
  const checkoutButton = page.getByRole(`button`, { name: `Checkout` });
  expect(checkoutButton).toBeVisible();
  await checkoutButton.click();

  //Enter a credit cart number:
  const creditCardNumberInput = page.getByRole(`textbox`).first();
  expect(creditCardNumberInput).toBeEditable();
  await creditCardNumberInput.clear();
  await creditCardNumberInput.pressSequentially(`1234 5678 9012 3456`, { delay: 100 });

  //Enter a CVV number:
  const CVVCodeInput = page.getByRole(`textbox`).nth(1);
  expect(CVVCodeInput).toBeEditable();
  await CVVCodeInput.clear();
  await CVVCodeInput.pressSequentially(`420`, { delay: 100 });

  //Enter an credit card expiry month:
  const expiryDate_Month = page.getByRole(`combobox`).first();
  expect(expiryDate_Month).toBeEnabled();
  await expiryDate_Month.selectOption(`12`);

  //Enter an credit card expiry day:
  const expiryDate_Day = page.getByRole(`combobox`).nth(1);
  expect(expiryDate_Day).toBeEnabled();
  await expiryDate_Day.selectOption(`21`);

  //Enter the name on the credit card:
  const nameOnCardInput = page.getByRole(`textbox`).nth(2);
  expect(nameOnCardInput).toBeEditable();
  await nameOnCardInput.clear();
  await nameOnCardInput.pressSequentially(`Duane Dibbley`, { delay: 100 });

  //Enter a coupon code (optional):
  const couponCodeInput = page.getByRole(`textbox`).nth(3);
  const applyCouponButton = page.getByRole(`button`, { name: `Apply Coupon` });
  expect(couponCodeInput).toBeEditable();
  expect(applyCouponButton).toBeEnabled();
  await couponCodeInput.pressSequentially(`420`, { delay: 100 });
  await couponCodeInput.clear();

  //Email address is automatically entered, just need to assert it's visible:
  const emailAddressDisplay = page.getByText(loginEmail);
  expect(emailAddressDisplay).toBeVisible();

  //Enter shipping country:
  const selectCountryInput = page.getByPlaceholder(`Select Country`);
  expect(selectCountryInput).toBeEnabled();
  await selectCountryInput.pressSequentially(`United`);
  await page.getByRole(`button`, { name: ` United Kingdom` }).click();

  /*------------------------------------Order Confirmed Page---------------------------------*/
  /*-----------------------------------------------------------------------------------------*/

  //Click "Place Order":
  await page.getByText(`Place Order `).click();

  //Assert the correct product name and price is displayed:
  expect(page.getByText(targetProductName)).toBeVisible();
  expect(page.getByText(price_BeforeCart)).toBeVisible();

  /*------------------------------------Close Browser--------------------------------------------*/
  /*---------------------------------------------------------------------------------------------*/
  await context.close();
  await browser.close();
});
