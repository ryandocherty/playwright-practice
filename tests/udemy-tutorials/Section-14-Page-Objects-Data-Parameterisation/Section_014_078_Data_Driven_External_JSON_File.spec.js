//Section 14.78: How to drive the data from external json files to playwright tests
//Related file: "udemy_utils\PlaceOrder_SingleDataSet.json"
//Related file: "udemy_utils\Udemy_APIUtils.js"

/*
For this test we'll see how to perform data-driven testing.
So far we've been using the same/similar data for several tests (loginEmail, loginPassword, productName etc.).
Is it better to hard-code this in a test, or to have this test data separated in an external file?
It really depends, but sometimes it's better to drive the data from an external file.
This way, the test will look more optimised and you won't have a chunk of data sitting in your test file.
Also, if someone needs the data, you can just point them to the .json data file.

Ideally you want the .json test data file to follow the same naming convention as the spec.test.js file.
E.g. "loginTest.spec.js" -> "loginTest_TestData.json" (or something similar).

Due to .json files potentially having different encoding formats, there's a specific way to import them.
The best way to import .json data and avoid errors is to convert to String, then JS Object.
"JSON.parse(JSON.stringify(testData))""
*/

import { test, expect, request } from "@playwright/test";
import { APIUtils } from "../../../udemy_utils/APIUtils";
import { POManager } from "../../../udemy_page_objects/POManager";
import PlaceOrder_SingleDataSet from "../../../udemy_utils/PlaceOrder_SingleDataSet.json" assert { type: "json" };

const testData = JSON.parse(JSON.stringify(PlaceOrder_SingleDataSet));

let prerequisiteData, apiContext, apiUtils;
const loginPayload = { userEmail: testData.loginEmail, userPassword: testData.loginPassword };
const placeOrderPayload = {
  orders: [{ country: testData.desiredDeliveryCountry, productOrderedId: testData.productOrderedId_ZARA }],
};

test.beforeAll(async () => {
  try {
    apiContext = await request.newContext();
    apiUtils = new APIUtils(apiContext, loginPayload);
    prerequisiteData = await apiUtils.getOrderID(placeOrderPayload);
  } catch (error) {
    console.error(`Error during API setup: ${error}`);
  }
});

test("Udemy: Place order using data from an external file (single data set)", async ({ page }) => {
  //Injecting the login/auth token into the browser's localStorage.
  //This simulates a logged-in state:
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

  //Retreive the product information via the "productOrderedId" in "placeOrderPayload":
  const productNameAndPrice = getSelectedProductInfo(placeOrderPayload.orders[0].productOrderedId);

  console.log(`Product Ordered Name: ${productNameAndPrice.name}`);
  console.log(`Product Ordered Price: $${productNameAndPrice.price}`);

  expect(orderIDInOrderSummary).toBe(prerequisiteData.orderID);
  expect(billingEmailInOrderSummary).toBe(loginPayload.userEmail);
  expect(deliveryEmailInOrderSummary).toBe(loginPayload.userEmail);
  expect(billingCountryInOrderSummary).toBe(placeOrderPayload.orders[0].country);
  expect(deliveryCountryInOrderSummary).toBe(placeOrderPayload.orders[0].country);
  expect(productNameInOrderSummary).toBe(productNameAndPrice.name);
  expect(productPriceInOrderSummary_Numeric).toBe(productNameAndPrice.price);
});

function getSelectedProductInfo(productOrderedId) {
  //This function will dynamically help with the UI assertions at the end of the test.
  //Based on the "productOrderedId" in "PlaceOrderTestData_Single.json", it will return the productName and productPrice.

  switch (productOrderedId) {
    case testData.productOrderedId_ZARA:
      return { name: "ZARA COAT 3", price: 31500 };
    case testData.productOrderedId_ADIDAS:
      return { name: "ADIDAS ORIGINAL", price: 31500 };
    case testData.productOrderedId_IPHONE:
      return { name: "IPHONE 13 PRO", price: 231500 };
    default:
      return { name: "PRODUCT NOT FOUND", price: 0 };
  }
}
