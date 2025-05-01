//Section 7.27: Write the Script to dynamically find the product to buy from list of products
//Section 7.28: Add assertions for the actions performed and implement necessary Sync steps
//Section 7.29: Handling Auto suggestive dropdown options with playwright - Example
//Section 7.30: Complete E2E flow of Placing the order and grab the OrderID with Playwright

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

  await page.fill(SELECTORS_CLIENT.userEmailInput, loginEmail);
  await page.fill(SELECTORS_CLIENT.userPasswordInput, loginPassword);
  await page.locator(SELECTORS_CLIENT.loginButton).click();
  await expect(page).toHaveURL(`https://rahulshettyacademy.com/client/dashboard/dash`);

  /*-------------------------------------Products page-------------------------------------------*/
  /*---------------------------------------------------------------------------------------------*/

  const products = page.locator(`.card-body`); //returns an array.
  await page.waitForLoadState(`networkidle`); //without this, productTitles below weren't being grabbed.
  const productTitles = await page.locator(SELECTORS_CLIENT.productTitles).allTextContents();
  const productsAmount = await page.locator(SELECTORS_CLIENT.productTitles).count();

  console.log(`Number of products found: ${productsAmount}`);
  console.log(productTitles);

  //Initialise a variable to hold the item's displayed price before adding to cart:
  //Also initialising with a default value (null), otherwise I get an error
  //later on when comparing "priceBeforeCart" to "priceInCart".
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

  //Assert that the 'Cart' link is visible:
  const isCartLinkVisible = await page.locator(`[routerlink='/dashboard/cart']`).isVisible();
  expect(isCartLinkVisible).toBeTruthy();

  /*-------------------------------------Cart page-----------------------------------------------*/
  /*---------------------------------------------------------------------------------------------*/

  //Click the 'Cart' link, then wait for the cart items to load (they all have a "div li" attribute):
  await page.locator(`[routerlink='/dashboard/cart']`).click();
  await page.locator(`div li`).first().waitFor();

  //Assert that the item added to the cart (ZARA COAT 3) is visible:
  const isItemInCartVisible = await page.locator(`h3:has-text('ZARA COAT 3')`).isVisible();
  expect(isItemInCartVisible).toBeTruthy();

  //Grab the text of the current item in cart:
  const itemInCart = await page.locator(`div[class='cartSection'] h3`).textContent();

  //Assert the correct item (ZARA COAT 3) is in the cart:
  expect(itemInCart).toBe(`ZARA COAT 3`);

  //Grab the displayed price of the current item in cart:
  const priceInCart: any = await page.locator(`.prodTotal`).textContent();
  const priceInCart_Numeric: number = parseFloat(priceInCart?.replace(/[^0-9]+/g, ""));

  console.log(`Item name (in cart): ${itemInCart}`);
  console.log(`Item Price (in cart): $${priceInCart_Numeric}`);

  //Check neither price variables are null first:
  if (priceBeforeCart_Numeric && priceInCart_Numeric) {
    //Assert that the price before adding to cart matches the price displayed in the cart:
    expect(priceBeforeCart_Numeric).toEqual(priceInCart_Numeric);
  } else {
    console.log(`priceBeforeCart_Numeric or priceInCart_Numeric is null`);
  }

  /*------------------------------------Checkout Page--------------------------------------------*/
  /*---------------------------------------------------------------------------------------------*/

  //Click the 'checkout' button, wait for payment page to load (has a bunch of ".input" attributes):
  await page.locator(`button:has-text("Checkout")`).click();
  await page.locator(`.input`).first().waitFor();

  //Assert that the email address displayed in the cart matches the login email:
  const emailInCartLabel = await page.locator(`.details__user [type='text']`).first().textContent();
  expect(emailInCartLabel?.trim()).toEqual(loginEmail);

  //Input a credit card number:
  const creditCardNumberInput = page.locator(`input[type="text"]`).first();
  await creditCardNumberInput.clear();
  await creditCardNumberInput.pressSequentially(`1234 5678 9012 3456`, { delay: 100 });

  //Input a CVV number:
  const CVVCodeInput = page.locator(`input[type="text"]`).nth(1);
  await CVVCodeInput.clear();
  await CVVCodeInput.pressSequentially(`123`, { delay: 100 });

  //Input the cardholder's name:
  const nameOnCardInput = page.locator(`input[type="text"]`).nth(2);
  await nameOnCardInput.clear();
  await nameOnCardInput.pressSequentially(`Duane Dibbley`, { delay: 100 });

  //Select a card expiry month:
  const expiryDate_Month = page.getByRole("combobox").first();
  await expiryDate_Month.selectOption(`05`);

  //Select a card expiry day:
  const expiryDate_Day = page.getByRole("combobox").nth(1);
  await expiryDate_Day.selectOption(`12`);

  const couponCodeInput = page.locator('input[name="coupon"]');
  const applyCouponButton = page.getByRole("button", { name: "Apply Coupon" });

  //The option to select a country is a list that dynamically updates as you type.
  //I need to start typing something, then first wait for the list to load:
  const selectCountryInput = page.locator(`[placeholder*="Country"]`);
  const selectCountryList = page.locator(`.ta-results`);
  await selectCountryInput.pressSequentially(`united`, { delay: 100 });
  await selectCountryList.waitFor();

  //Then I need to loop through the list options and select the desired one:
  const selectCountryListOptions = page.locator(`.ta-results button`);
  const countryListOptionsCount = await selectCountryListOptions.count();

  for (let i = 0; i < countryListOptionsCount; i++) {
    let countryListText = await selectCountryListOptions.nth(i).textContent();
    if (countryListText?.trim() === "United Kingdom") {
      console.log(`Selecting country: ${countryListText.trim()}`);
      await selectCountryListOptions.nth(i).click();
      break;
    }
  }

  /*------------------------------------Order Confirmed Page---------------------------------*/
  /*-----------------------------------------------------------------------------------------*/

  //Click the "Place Order" button:
  const placeOrderButton = page.locator(`.action__submit`);
  await placeOrderButton.click();

  const orderPlacedMessage = await page.locator(`.hero-primary`).textContent();
  expect(orderPlacedMessage).toContain(`THANKYOU`);
});
