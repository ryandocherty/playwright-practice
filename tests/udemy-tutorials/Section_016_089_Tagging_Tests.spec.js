//Section 16.89: How to tag tests and control the execution from the command line parameters

/*
In this test file we have 2 tests.
The first test is a typical test that utilises web UI automation to make a purchase.
The second test utilises API calls to make the purchase rather than UI automation.
You can tag tests so that you can control test execution, e.g. you only want API tests to run.

In the test name, use "@" to tag the test.
For example:
test('@webUI Login returns token', () => {...});
test('@API Form validation works', () => {...});
test('@smoke Login returns token', () => {...});
test('@regression Form validation works', () => {...});

At the commandline, you can then use these tags to control which tests execute.
So for the 2 tests in this file:
I've assigned "@web" for the test that just uses API calls.
I've assigned "@UI" for the test that uses UI automation.

In the terminal, use:
npx playwright test --grep="@Web"
npx playwright test --grep="@UI"

OR:
npx playwright test --grep '@Web'
npx playwright test --grep '@UI'


-----What is "grep"?-----
The term "grep" is a command-line utility used in Unix/Linux systems.
It searches text or output for lines matching a given pattern (usually a regular expression).
It stands for "Global Regular Expression Print".

*/

import { test, expect, request } from "@playwright/test";
import { POManager } from "../../udemy_page_objects/POManager";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });

test(`@UI Udemy: Test Tagging Demo for UI`, async ({ page }) => {
  //==================================================
  //               Import Credentials
  //==================================================
  const loginEmail = process.env.LOGIN_EMAIL ?? "";
  const loginPassword = process.env.LOGIN_PASSWORD ?? "";
  const creditCardNumber = process.env.CREDIT_CARD_NUMBER ?? "";
  const CCVCode = process.env.CCV_CODE ?? "";
  const nameOnCard = process.env.NAME_ON_CARD ?? "";
  const cardExpiryMonthDate = process.env.CARD_EXPIRY_MONTH ?? "";
  const cardExpiryDayDate = process.env.CARD_EXPIRY_DAY ?? "";

  //==================================================
  //                  Login Page
  //==================================================
  const poManager = new POManager(page);

  const loginPage = poManager.getLoginPage();
  await loginPage.goToLoginPage();
  await loginPage.validLogin(loginEmail, loginPassword);
  await expect(page).toHaveURL(`https://rahulshettyacademy.com/client/#/dashboard/dash`);

  //==================================================
  //                  Dashboard Page
  //==================================================
  const desiredProductName = `IPHONE 13 PRO`;

  const dashboardPage = poManager.getDashboardPage();
  await dashboardPage.searchProduct_addToCart(desiredProductName);
  await dashboardPage.navigateToCartPage();
  await expect(page).toHaveURL(`https://rahulshettyacademy.com/client/#/dashboard/cart`);

  //==================================================
  //                  Cart Page
  //==================================================
  const cartPage = poManager.getCartPage();
  const orderInfoInCart = await cartPage.getOrderInfoInCart();
  const { itemNameInCart, priceInCart_Numeric } = orderInfoInCart;
  await cartPage.navigateToCheckoutPage();
  expect(page.url()).toContain(`https://rahulshettyacademy.com/client/#/dashboard/order?`);

  //==================================================
  //                  Checkout Page
  //==================================================
  const desiredCountryName = `United Kingdom`;
  const checkoutPage = poManager.getCheckoutPage();
  await checkoutPage.enterPaymentDetails(creditCardNumber, CCVCode, nameOnCard, cardExpiryMonthDate, cardExpiryDayDate);
  await checkoutPage.enterDeliveryDetails(desiredCountryName);
  await checkoutPage.placeOrder();
  expect(page.url()).toContain(`https://rahulshettyacademy.com/client/#/dashboard/thanks?`);

  //==================================================
  //               Order Confirmed Page
  //==================================================
  const orderConfirmedPage = poManager.getOrderConfirmedPage();
  const orderInfoInOrderConfirmed = await orderConfirmedPage.getOrderInfoInOrderConfirmed();
  const { productNameInOrderConfirmed, priceInOrderConfirmed_Numeric, orderIDInOrderConfirmed } = orderInfoInOrderConfirmed;
  await orderConfirmedPage.navigateToOrderHistoryPage();
  expect(page).toHaveURL(`https://rahulshettyacademy.com/client/#/dashboard/myorders`);

  //==================================================
  //               Order History Page
  //==================================================
  const orderHistoryPage = poManager.getOrderHistoryPage();
  await orderHistoryPage.navigateToOrderSummaryPage(orderIDInOrderConfirmed);
  await expect(page).toHaveURL(`https://rahulshettyacademy.com/client/#/dashboard/order-details/` + orderIDInOrderConfirmed);

  //==================================================
  //               Order Summary Page
  //==================================================
  const orderSummaryPage = poManager.getOrderSummaryPage();
  const allOrderInfo = await orderSummaryPage.getOrderInfoInOrderSummary();

  const {
    orderIDInOrderSummary,
    billingEmailInOrderSummary,
    billingCountryInOrderSummary,
    deliveryEmailInOrderSummary,
    deliveryCountryInOrderSummary,
    productNameInOrderSummary,
    productPriceInOrderSummary_Numeric,
  } = allOrderInfo;

  expect(orderIDInOrderSummary).toBe(orderIDInOrderConfirmed);
  expect(billingEmailInOrderSummary && deliveryEmailInOrderSummary).toBe(loginEmail);
  expect(billingCountryInOrderSummary && deliveryCountryInOrderSummary).toBe(desiredCountryName);
  expect(productNameInOrderSummary).toBe(itemNameInCart && productNameInOrderConfirmed);
  expect(productPriceInOrderSummary_Numeric).toBe(priceInCart_Numeric && priceInOrderConfirmed_Numeric);
});

test(`@Web Udemy: Test Tagging Demo for Web`, async () => {
  const loginEmail = process.env.LOGIN_EMAIL ?? "";
  const loginPassword = process.env.LOGIN_PASSWORD ?? "";
  const apiContext = await request.newContext();

  const loginPayload = { userEmail: loginEmail, userPassword: loginPassword };
  const placeOrderPayload = { orders: [{ country: "United Kingdom", productOrderedId: "67a8dde5c0d3e6622a297cc8" }] };

  const loginResponse = await apiContext.post(`https://rahulshettyacademy.com/api/ecom/auth/login`, {
    data: loginPayload,
  });
  expect(loginResponse.ok()).toBeTruthy();
  const loginResponse_JSON = await loginResponse.json();
  const loginToken = loginResponse_JSON.token;

  const placeOrderResponse = await apiContext.post(`https://rahulshettyacademy.com/api/ecom/order/create-order`, {
    data: placeOrderPayload,
    headers: { Authorization: loginToken, "Content-Type": "application/json" },
  });
  expect(placeOrderResponse.ok()).toBeTruthy();
  const placeOrderResponse_JSON = await placeOrderResponse.json();

  console.log(`\nplaceOrderResponse: ${placeOrderResponse_JSON.message}`);
  expect(placeOrderResponse_JSON.message).toBe("Order Placed Successfully");
});
