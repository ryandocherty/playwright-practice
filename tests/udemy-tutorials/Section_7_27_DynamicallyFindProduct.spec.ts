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

  /*-------------------------Import email address and password-------------------------*/
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
  /*-----------------------------------------------------------------------------------*/

  /*--------------------------------Log in to the shop---------------------------------*/
  await page.fill(SELECTORS_CLIENT.userEmailInput, loginEmail);
  await page.fill(SELECTORS_CLIENT.userPasswordInput, loginPassword);
  await page.locator(SELECTORS_CLIENT.loginButton).click();
  await expect(page).toHaveURL(`https://rahulshettyacademy.com/client/dashboard/dash`);
  /*-----------------------------------------------------------------------------------*/

  const products = page.locator(`.card-body`); //returns an array.
  await page.waitForLoadState(`networkidle`); //without this, productTitles below weren't being grabbed.
  const productTitles = await page.locator(SELECTORS_CLIENT.productTitles).allTextContents();
  const productsAmount = await page.locator(SELECTORS_CLIENT.productTitles).count();

  console.log(`Number of products found: ${productsAmount}`);
  console.log(productTitles);

  //Initialise a variable to hold the item's displayed price before adding to cart:
  //Also initialising with a default value, otherwise I get an error
  //later on when comparing priceBeforeCart to priceInCart.
  let priceBeforeCart_Numeric: number | null = null;

  //Chained locator using the "products" array:
  //"products" uses the ".card-body" class to loop through the products at position "i",
  //then locates the corresponding "b" attribute (product names/text).
  //If it matches the desired product name, use ".card-body" again to then
  //locate the corresponding button and then click it:
  for (let i = 0; i < productsAmount; ++i) {
    if ((await products.nth(i).locator(`b`).textContent()) === `ZARA COAT 3`) {
      await expect(products.nth(i).getByRole(`button`, { name: ` Add To Cart` })).toBeVisible();

      const priceBeforeCart: any = await products.nth(i).locator(`.text-muted`).textContent();
      priceBeforeCart_Numeric = parseFloat(priceBeforeCart?.replace(/[^0-9.-]+/g, ""));

      console.log(`Item Price (before cart): $${priceBeforeCart_Numeric}`);

      await products.nth(i).getByRole(`button`, { name: ` Add To Cart` }).click();
      console.log(`Clicked 'Add To Cart'`);
      break;
    }
  }

  //Click the 'Cart' button:
  await page.locator(`[routerlink='/dashboard/cart']`).click();

  //Grab the text of the current item in cart:
  const itemInCart = await page.locator(`div[class='cartSection'] h3`).textContent();

  //Grab the displayed price of the current item in cart:
  const priceInCart: any = await page.locator(`.prodTotal`).textContent();
  const priceInCart_Numeric: number = parseFloat(priceInCart?.replace(/[^0-9]+/g, ""));

  console.log(`Item in cart: ${itemInCart}`);
  console.log(`Item Price (in cart): $${priceInCart_Numeric}`);

  //Assert the correct item (ZARA COAT 3) is in the cart:
  expect(itemInCart).toBe(`ZARA COAT 3`);

  //Assert that the price before adding to cart matches the price displayed in the cart:
  expect(priceBeforeCart_Numeric).toEqual(priceInCart_Numeric);
});
