//Section 14.76: Creating Page objects and action methods for end to end Script - Part 2

/*
This test is a rewrite of the previous test "Section_014_074_Page_Object_Pattern.spec.js".
This test includes a "Page Object Manager" to handle the multiple different Page Objects.
This way, I won't have to import several Page Objects into the test file (which looks cumbersome).
I'll only have to import the POManager, which then handles the Page Objects.
*/

import { test, expect } from "@playwright/test";
import { POManager } from "../../../udemy_page_objects/POManager";

import dotenv from "dotenv";
dotenv.config({ path: ".env" });

test("Udemy: Page Object Manager", async ({ page }) => {
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
