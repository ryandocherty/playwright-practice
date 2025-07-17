//Section 14.74: What is page object pattern & Importance of its implementation
//Section 14.75: Creating Page objects and action methods for end to end Script - Part 1

/*
For this demo we'll see how to implement a "Page Object Pattern" for our UI automation tests.

So far in our tests, all of the Page Objects (like "page.goto", "page.locator" etc.) are definied in the tests themselves.
However, it's best for the test cases to only contain the test logic, and the logic should be wrapped as a method.


-----What is Page Object Pattern?-----
The Page Object Pattern is a popular design pattern commonly used in UI test automation and browser automation frameworks.
The idea is to create an abstraction layer between the test scripts and the web page UI.
Instead of having test scripts directly interact with the selectors or raw page elements, 
you encapsulate page-related information and actions into dedicated classes or objects — called Page Objects.


-----Why use the Page Object Pattern?-----
1. Readability:
Tests become easier to read because the interactions are expressed through meaningful methods.

2. Maintainability:
If the UI changes (e.g. selectors change), you only need to update those references in one place — the page object file.

3. Reusability:
Page objects can be reused across multiple tests, avoiding duplication.

4. Separation of Concerns:
Keeps test logic separated from page structure.


-----What does the Page Object Pattern look like?-----
Using "Section_007_EndToEnd_Automation_Practice.spec.js" as an example.
This test interacts with several different pages: login page, products page, checkout page, order history page etc.
Each page has its own Page Objects (e.g. locators) defined in the test itself.
Using the Page Object Pattern, we'll create a .js file for each page and store the Page Objects in there.
So we'll have a loginPage.js file which will separately contain the Page Objects for the login page.
Then  we'll have a productsPage.js file to separately contain the Page Objects for the products page.
And so on...
We can also store any methods used within these Page Object files.
*/

import { test, expect } from "@playwright/test";
import { LoginPage } from "../../udemy_page_objects/LoginPage";
import { DashboardPage } from "../../udemy_page_objects/DashboardPage";
import { CartPage } from "../../udemy_page_objects/CartPage";
import { CheckoutPage } from "../../udemy_page_objects/CheckoutPage";
import { OrderConfirmedPage } from "../../udemy_page_objects/OrderConfirmedPage";
import { OrderHistoryPage } from "../../udemy_page_objects/OrderHistoryPage";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });

test("Udemy: Page Object Pattern", async ({ page }) => {
  /*----------------------------Import credentials-----------------------------------------------*/
  /*---------------------------------------------------------------------------------------------*/
  const loginEmail = process.env.LOGIN_EMAIL ?? "";
  const loginPassword = process.env.LOGIN_PASSWORD ?? "";
  const creditCardNumber = process.env.CREDIT_CARD_NUMBER ?? "";
  const CCVCode = process.env.CCV_CODE ?? "";
  const nameOnCard = process.env.NAME_ON_CARD ?? "";
  const cardExpiryMonthDate = process.env.CARD_EXPIRY_MONTH ?? "";
  const cardExpiryDayDate = process.env.CARD_EXPIRY_DAY ?? "";

  /*---------------------------------------Login page--------------------------------------------*/
  /*---------------------------------------------------------------------------------------------*/

  const loginPage = new LoginPage(page);
  await loginPage.goToLoginPage();
  await loginPage.validLogin(loginEmail, loginPassword);
  await expect(page).toHaveURL(`https://rahulshettyacademy.com/client/#/dashboard/dash`);

  /*-------------------------------------Dashboard page------------------------------------------*/
  /*---------------------------------------------------------------------------------------------*/

  const desiredProductName = `ZARA COAT 3`;

  const dashboardPage = new DashboardPage(page);
  await dashboardPage.searchProduct_addToCart(desiredProductName);
  await dashboardPage.navigateToCartPage();
  await expect(page).toHaveURL(`https://rahulshettyacademy.com/client/#/dashboard/cart`);

  /*-------------------------------------Cart page-----------------------------------------------*/
  /*---------------------------------------------------------------------------------------------*/

  const cartPage = new CartPage(page);
  const orderInfo = await cartPage.getOrderInfoInCart();
  await cartPage.navigateToCheckoutPage();
  expect(page.url()).toContain(`https://rahulshettyacademy.com/client/#/dashboard/order?`);

  /*------------------------------------Checkout Page--------------------------------------------*/
  /*---------------------------------------------------------------------------------------------*/

  const desiredCountryName = `United Kingdom`;

  const checkoutPage = new CheckoutPage(page);
  await checkoutPage.enterPaymentDetails(creditCardNumber, CCVCode, nameOnCard, cardExpiryMonthDate, cardExpiryDayDate);
  await checkoutPage.enterDeliveryDetails(desiredCountryName);
  await checkoutPage.placeOrder();
  expect(page.url()).toContain(`https://rahulshettyacademy.com/client/#/dashboard/thanks?`);

  /*------------------------------------Order Confirmed Page---------------------------------*/
  /*-----------------------------------------------------------------------------------------*/

  const orderConfirmedPage = new OrderConfirmedPage(page);
  const orderInfoInOrderConfirmed = await orderConfirmedPage.getOrderInfoInOrderConfirmed();
  await orderConfirmedPage.navigateToOrderHistoryPage();
  expect(page).toHaveURL(`https://rahulshettyacademy.com/client/#/dashboard/myorders`);

  /*------------------------------------Order History Page-----------------------------------*/
  /*-----------------------------------------------------------------------------------------*/

  const orderHistoryPage = new OrderHistoryPage(page);
  const orderID = await orderInfoInOrderConfirmed.orderID;
  await orderHistoryPage.navigateToOrderSummaryPage(orderID);
  await expect(page).toHaveURL(`https://rahulshettyacademy.com/client/#/dashboard/order-details/` + orderID);

  /*------------------------------------Order Summary Page-----------------------------------*/
  /*-----------------------------------------------------------------------------------------*/

  //Wait for the order summary page to load:
  await page.locator(`.tagline`).waitFor();

  //Assert the correct order Id is displayed on the "Order Summary" page:
  const orderIdOnSummary_raw = await page.locator(`.col-text`).textContent();
  const orderIdOnSummary = orderIdOnSummary_raw?.trim();
  console.log(`Order Id (on summary): ${orderIdOnSummary}`);
  expect(orderIdOnSummary).toBe(orderId);

  //Assert the correct item is displayed on the "Order Summary" page:
  const productNameOnSummary_raw = await page.locator(`.title`).textContent();
  const productNameOnSummary = productNameOnSummary_raw?.trim();
  console.log(`Item name (on summary): ${productNameOnSummary}`);
  expect(productNameOnSummary).toBe(desiredProductName);

  //Assert the correct price is displayed on the "Order Summary" page:
  const priceOnSummary_raw = await page.locator(`.price`).textContent();
  const priceOnSummary_Numeric = parseFloat(priceOnSummary_raw?.replace(/[^0-9]+/g, ""));
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
  expect(billingCountryOnSummary?.trim()).toContain(desiredCountryName);
  expect(deliveryCountryOnSummary?.trim()).toContain(desiredCountryName);
});
