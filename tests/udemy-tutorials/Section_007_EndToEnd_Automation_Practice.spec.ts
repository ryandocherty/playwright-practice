//Section 7.27: Write the Script to dynamically find the product to buy from list of products
//Section 7.28: Add assertions for the actions performed and implement necessary Sync steps
//Section 7.29: Handling Auto suggestive dropdown options with playwright - Example
//Section 7.30: Complete E2E flow of Placing the order and grab the OrderID with Playwright
//Section 7.31: Dynamically find the order from OrderHistory page using Playwright Script logic

import { test, expect } from "@playwright/test";
import { SELECTORS_CLIENT } from "./Udemy_Tutorials_Helpers";
import dotenv from "dotenv";

//Load hidden environment variables:
dotenv.config({ path: ".env" });

test("Udemy: Client Item Purchase Test", async ({ page }) => {
  /*
  For this test I want to:
  1. Log in to a website
  2. Dynamically select 1 product from a list of products
  3. Add the product to cart and go to checkout
  4. Assert some information (correct product added, correct price etc.)
  */

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
  expect(page.locator(SELECTORS_CLIENT.loginButton)).toBeVisible();
  await page.locator(SELECTORS_CLIENT.loginButton).click();
  await expect(page).toHaveURL(`https://rahulshettyacademy.com/client/dashboard/dash`);

  /*-------------------------------------Products page-------------------------------------------*/
  /*---------------------------------------------------------------------------------------------*/

  const products = page.locator(`.card-body`); //returns an array.
  await page.waitForLoadState(`networkidle`); //without this, productTitles below weren't being grabbed.
  const productTitles = await page.locator(`.card-body b`).allTextContents();
  const productsTitles_count = await page.locator(`.card-body b`).count();

  console.log(`Number of products found: ${productsTitles_count}`);
  console.log(productTitles);

  const targetProduct = `ZARA COAT 3`;
  const targetCountry = `United Kingdom`;

  //Initialise a variable to hold the item's displayed price before adding to cart:
  //Also initialising with a default value (null), otherwise I get an error
  //later on when comparing "priceBeforeCart" to "priceInCart".
  let priceBeforeCart_Numeric: number | null = null;

  //Chained locator using the "products" array:
  //"products" uses the ".card-body" class to loop through the products at position "i",
  //then locates the corresponding "b" attribute (product names/text).
  //If it matches the desired product name, use ".card-body" again to then
  //locate the corresponding button and then click it:
  for (let i = 0; i < productsTitles_count; ++i) {
    if ((await products.nth(i).locator(`b`).textContent()) === targetProduct) {
      await expect(products.nth(i).getByRole(`button`, { name: ` Add To Cart` })).toBeVisible();

      const priceBeforeCart: any = await products.nth(i).locator(`.text-muted`).textContent();
      priceBeforeCart_Numeric = parseFloat(priceBeforeCart?.replace(/[^0-9.-]+/g, ""));

      console.log(`Item Price (before cart): $${priceBeforeCart_Numeric}`);

      await products.nth(i).getByRole(`button`, { name: ` Add To Cart` }).click();
      console.log(`Clicking 'Add To Cart'...`);
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
  await page.locator(`h1`).first().waitFor();

  await page.pause();
  //Assert that the item added to the cart (ZARA COAT 3) is visible:
  expect(page.getByText(targetProduct)).toBeVisible();

  //Grab the text of the current item in cart:
  const itemInCart = await page.locator(`div[class='cartSection'] h3`).first().textContent();

  //Assert the correct item (ZARA COAT 3) is in the cart:
  expect(itemInCart).toBe(targetProduct);

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
  const countryListOptions_count = await selectCountryListOptions.count();
  console.log(`Number of countries in current list: ${countryListOptions_count}`);

  for (let i = 0; i < countryListOptions_count; i++) {
    let countryListText = await selectCountryListOptions.nth(i).textContent();
    if (countryListText?.trim() === targetCountry) {
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

  //Assert that the "Thank you" message appears:
  const orderPlacedMessage = await page.locator(`.hero-primary`).textContent();
  expect(orderPlacedMessage?.trim()).toBe(`Thankyou for the order.`);

  //Grab the item name displayed on the confirmation page:
  const itemInOrderConfirmed = await page.locator(`div[class="title"]`).first().textContent();
  console.log(`Item name (order confirmed): ${itemInOrderConfirmed}`);
  //Assert the correct item appears on the confirmation page:
  expect(itemInOrderConfirmed).toBe(itemInCart);

  //Grab the price displayed on the confirmation page:
  const priceInOrderConfirmed: any = await page.locator(`.title`).nth(1).textContent();
  //Convert the price to purely numeric:
  const priceInOrderConfirmed_Numeric: number = parseFloat(priceInOrderConfirmed?.replace(/[^0-9]+/g, ""));
  console.log(`Item price (order confirmed): $${priceInOrderConfirmed_Numeric}`);
  //Assert the correct price is displayed on the confirmation page:
  expect(priceInOrderConfirmed_Numeric).toEqual(priceInCart_Numeric);

  //Grab order ID displayed on the confirmation page:
  const orderId_raw = await page.locator(`.em-spacer-1 .ng-star-inserted`).textContent();
  //Clean up the order ID (remove symbols and trim it):
  const orderId = orderId_raw?.replace(/\|/g, ``).trim();
  console.log(`orderID: ${orderId}`);

  /*------------------------------------Order History Page-----------------------------------*/
  /*-----------------------------------------------------------------------------------------*/

  //Click the "Order History" link:
  const orderhistoryLink = page.locator(`[routerlink="/dashboard/myorders"]`).first();
  expect(orderhistoryLink).toBeVisible();
  await orderhistoryLink.click();
  console.log(`Clicked 'Order history'`);

  const viewOrderButton = page.locator(`button:has-text('View')`);

  //Locate the order ID column, assert it to be visible:
  const orderIdColumn = page.locator(`th[scope="row"]`);
  await expect(orderIdColumn.first()).toBeVisible(); //without this, orderIdColumn_count is 0

  //Count the number of order Id's found:
  const orderIdColumn_count = await orderIdColumn.count();
  console.log(`Number of Order Id's found: ${orderIdColumn_count}`);

  //Output the order Id strings:
  const orderIdColumnText = await orderIdColumn.allTextContents();
  console.log(orderIdColumnText);

  //A loop to dynamically find the order Id of the recently placed order,
  //then output its position in the list and click the "view" button:
  for (let i = 0; i < orderIdColumn_count; i++) {
    if ((await orderIdColumn.nth(i).textContent()) === orderId) {
      console.log(`Order Id "${orderId}" found at position ${i + 1} in the list`);
      expect(viewOrderButton.nth(i)).toBeVisible();
      await viewOrderButton.nth(i).click();
      console.log(`Clicked 'View order'`);
      break;
    } else {
      console.log(`Order Id not found`);
    }
  }

  /*------------------------------------Order Summary Page-----------------------------------*/
  /*-----------------------------------------------------------------------------------------*/

  //Wait for the order summary page to load:
  await page.locator(`.tagline`).waitFor();
  await expect(page).toHaveURL(`https://rahulshettyacademy.com/client/dashboard/order-details/` + orderId);

  //Assert the correct order Id is displayed on the "Order Summary" page:
  const orderIdOnSummary_raw = await page.locator(`.col-text`).textContent();
  const orderIdOnSummary = orderIdOnSummary_raw?.trim();
  console.log(`Order Id (on summary): ${orderIdOnSummary}`);
  expect(orderIdOnSummary).toBe(orderId);

  //Assert the correct item is displayed on the "Order Summary" page:
  const productNameOnSummary_raw = await page.locator(`.title`).textContent();
  const productNameOnSummary = productNameOnSummary_raw?.trim();
  console.log(`Item name (on summary): ${productNameOnSummary}`);
  expect(productNameOnSummary).toBe(targetProduct);

  //Assert the correct price is displayed on the "Order Summary" page:
  const priceOnSummary_raw: any = await page.locator(`.price`).textContent();
  const priceOnSummary_Numeric: number = parseFloat(priceOnSummary_raw?.replace(/[^0-9]+/g, ""));
  console.log(`Item price (on summary): $${priceOnSummary_Numeric}`);
  expect(priceOnSummary_Numeric).toEqual(
    priceBeforeCart_Numeric && priceInCart_Numeric && priceInOrderConfirmed_Numeric
  );

  //Order summary is split into 2 sections: "Billing Address" & "Delivery Address"
  //Both sections display the email address and country for the order,
  //so I'm grabbing these strings separately (however, they are the same in this test):
  const billingAddressSection = page.locator(`div[class="address"]`).first();
  const billingEmailOnSummary = await billingAddressSection.locator(`.text`).first().textContent();
  const billingCountryOnSummary = await billingAddressSection.locator(`.text`).last().textContent();
  const deliveryAddressSection = page.locator(`div[class="address"]`).last();
  const deliveryEmailOnSummary = await deliveryAddressSection.locator(`.text`).first().textContent();
  const deliveryCountryOnSummary = await deliveryAddressSection.locator(`.text`).last().textContent();

  console.log(`Billing email (on summary): ${billingEmailOnSummary}`);
  console.log(`Billing country (on summary): ${billingCountryOnSummary}`);
  console.log(`Delivery email (on summary): ${deliveryEmailOnSummary}`);
  console.log(`Delivery country (on summary): ${deliveryCountryOnSummary}`);

  //Assert the correct billing & delivery information is displayed:
  expect(billingEmailOnSummary?.trim()).toBe(loginEmail);
  expect(deliveryEmailOnSummary?.trim()).toBe(loginEmail);
  expect(billingCountryOnSummary?.trim()).toContain(targetCountry);
  expect(deliveryCountryOnSummary?.trim()).toContain(targetCountry);
});
