//Section 18.103. Refactor Playwright tests into TypeScript compatible and run the E2E Test

//This test is a TypeScript refactor of "Section_014_080_Pass_Test_Data_as_Fixture.spec.js"

import { expect } from "@playwright/test";
import { POManager } from "../../../udemy_page_objects_ts/POManager";
import { customTest } from "../../../udemy_utils_ts/PlaceOrder_TestBase";

import dotenv from "dotenv";
dotenv.config({ path: ".env" });

customTest("Udemy: Place order using custom fixtures (TS Refactor)", async ({ page, testDataForOrder }) => {
  //==================================================
  //               Import Credentials
  //==================================================
  const loginEmail = testDataForOrder.loginEmail;
  const loginPassword = testDataForOrder.loginPassword;
  const desiredDeliveryCountry = testDataForOrder.desiredDeliveryCountry;
  const desiredProductName = testDataForOrder.desiredProductName;
  const creditCardNumber = testDataForOrder.creditCardNumber;
  const CCVCode = testDataForOrder.CCVCode;
  const nameOnCard = testDataForOrder.nameOnCard;
  const cardExpiryMonthDate = testDataForOrder.cardExpiryMonthDate;
  const cardExpiryDayDate = testDataForOrder.cardExpiryDayDate;

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
  const checkoutPage = poManager.getCheckoutPage();
  await checkoutPage.enterPaymentDetails(creditCardNumber, CCVCode, nameOnCard, cardExpiryMonthDate, cardExpiryDayDate);
  await checkoutPage.enterDeliveryDetails(desiredDeliveryCountry);
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
  expect(billingCountryInOrderSummary && deliveryCountryInOrderSummary).toBe(desiredDeliveryCountry);
  expect(productNameInOrderSummary).toBe(itemNameInCart && productNameInOrderConfirmed);
  expect(productPriceInOrderSummary_Numeric).toBe(priceInCart_Numeric && priceInOrderConfirmed_Numeric);
});
