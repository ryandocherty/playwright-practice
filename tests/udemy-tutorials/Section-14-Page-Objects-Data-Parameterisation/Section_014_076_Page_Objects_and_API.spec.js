//This file isn't part of any Udemy tutorial.
//This is just an idea I had to mix the previous tutorials on Page Objects and API calls.

//Goal of this test:
//1. Place an order using an API call.
//2. Obtain an OrderID from the API response.
//3. Use Page Objects to navigate to the "Order Summary" page.
//4. Perform assertions to check correct: product name, price, address, country, orderID.

import { test, expect, request } from "@playwright/test";
import { APIUtils } from "../../../udemy_utils/APIUtils.js";
import { POManager } from "../../../udemy_page_objects/POManager.js";

import dotenv from "dotenv";
dotenv.config({ path: ".env" });

const loginEmail = process.env.LOGIN_EMAIL ?? "";
const loginPassword = process.env.LOGIN_PASSWORD ?? "";

let prerequisiteData;
const loginPayload = { userEmail: loginEmail, userPassword: loginPassword };
const placeOrderPayload = { orders: [{ country: "United Kingdom", productOrderedId: "68a961459320a140fe1ca57a" }] };

test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const apiUtils = new APIUtils(apiContext, loginPayload);
  prerequisiteData = await apiUtils.getOrderID(placeOrderPayload);
});

test("Udemy: Page Object Manager and API", async ({ page }) => {
  await page.addInitScript((value) => {
    window.localStorage.setItem(`token`, value);
  }, prerequisiteData.loginToken);

  await page.goto("https://rahulshettyacademy.com/client");
  const poManager = new POManager(page);
  const dashboardPage = poManager.getDashboardPage();
  await dashboardPage.navigateToOrderSummaryPage_UsingOrderID(prerequisiteData.orderID);
  const orderSummaryPage = poManager.getOrderSummaryPage();
  const orderSummaryInfo = await orderSummaryPage.getOrderInfoInOrderSummary();

  const {
    orderIDInOrderSummary,
    billingEmailInOrderSummary,
    billingCountryInOrderSummary,
    deliveryEmailInOrderSummary,
    deliveryCountryInOrderSummary,
    productNameInOrderSummary,
    productPriceInOrderSummary_Numeric,
  } = orderSummaryInfo;

  const productNameAndPrice = getSelectedProductInfo();

  expect(orderIDInOrderSummary).toBe(prerequisiteData.orderID);
  expect(billingEmailInOrderSummary).toBe(loginPayload.userEmail);
  expect(deliveryEmailInOrderSummary).toBe(loginPayload.userEmail);
  expect(billingCountryInOrderSummary).toBe(placeOrderPayload.orders[0].country);
  expect(deliveryCountryInOrderSummary).toBe(placeOrderPayload.orders[0].country);
  expect(productNameInOrderSummary).toBe(productNameAndPrice.name);
  expect(productPriceInOrderSummary_Numeric).toBe(productNameAndPrice.price);
});

function getSelectedProductInfo() {
  //This function will dynamically help with the UI assertions at the end of the test.
  //Based on the "productOrderedId" in "placeOrderPayload", it will return the productName and productPrice.
  //I can use the returned "productSelected" object to perform assertions.

  const productOrderedId_ZARA = "68a961459320a140fe1ca57a";
  const productOrderedId_ADIDAS = "668a961719320a140fe1ca57c";
  const productOrderedId_IPHONE = "68a961959320a140fe1ca57e";

  let selectedProductInfo = {};
  const productID = placeOrderPayload.orders[0].productOrderedId;

  switch (productID) {
    case productOrderedId_ZARA:
      selectedProductInfo = { name: "ZARA COAT 3", price: 11500 };
      break;
    case productOrderedId_ADIDAS:
      selectedProductInfo = { name: "ADIDAS ORIGINAL", price: 11500 };
      break;
    case productOrderedId_IPHONE:
      selectedProductInfo = { name: "IPHONE 13 PRO", price: 55000 };
      break;
    default:
      selectedProductInfo = { name: "PRODUCT NOT FOUND", price: 0 };
      break;
  }
  return selectedProductInfo;
}
