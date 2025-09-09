//Section 14.80: How to pass test data as fixture by extend test annotation behaviour
//Related file: "udemy_utils\PlaceOrder_TestBase.js"

/*
For this test I'll build on the last test of using external data to drive the test.
However, this time I'll send the data as a fixture (the same way you use {page} or {browser}).

NOTE:
Passing the external data as a a fixture only supports 1 data set.
You cannot pamareterise the data when it's passed as a fixture.

The goal here is to extend the features of the "test" block.
Whenever you use the "test" object, by default you're importing it from the "@playwright/test" module.
Then you're using the "test" object to create your test cases.
On its own, "test" only knows to just execute the test code, but you can actually tweak/customise this behaviour.
Playwright supports extending test by using fixtures and the test.extend() method.

Why extend "test"?
1. Add your own fixtures or setup logic globally to every test.
2. Modify test workflows, like adding custom retries, timeouts, or custom parameters.
3. Add your own API or helpers to the test context for consistency.
4. Share setup/teardown logic across multiple tests easily.
*/

//We import the customised test from our TestBase file:
import { customtest } from "../../../udemy_utils/PlaceOrder_TestBase";

import { expect, request } from "@playwright/test";
import { APIUtils } from "../../../udemy_utils/APIUtils";
import { POManager } from "../../../udemy_page_objects/POManager";

//Here we pass our "customtest" and pass the fixture "testDataForOrder":
customtest("@Web Udemy: Place order using custom fixture", async ({ page, testDataForOrder }) => {
  const loginPayload = { userEmail: testDataForOrder.loginEmail, userPassword: testDataForOrder.loginPassword };
  const placeOrderPayload = {
    orders: [
      {
        country: testDataForOrder.desiredDeliveryCountry,
        productOrderedId: getProductInfo(testDataForOrder.desiredProductName).productOrderedId,
      },
    ],
  };

  const apiContext = await request.newContext();
  const apiUtils = new APIUtils(apiContext, loginPayload);
  const prerequisiteData = await apiUtils.getOrderID(placeOrderPayload);

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

  //Retreive the product information by passing "desiredProductName" in "testDataForOrder":
  const productIDAndPrice = getProductInfo(testDataForOrder.desiredProductName);

  console.log(`\nProduct Ordered Name: ${testDataForOrder.desiredProductName}`);
  console.log(`productOrderedId: ${productIDAndPrice.productOrderedId}`);
  console.log(`Product Ordered Price: $${productIDAndPrice.price}`);

  //Assertions on the "Order Summary" page:
  expect(orderIDInOrderSummary).toBe(prerequisiteData.orderID);
  expect(billingEmailInOrderSummary).toBe(loginPayload.userEmail);
  expect(deliveryEmailInOrderSummary).toBe(loginPayload.userEmail);
  expect(billingCountryInOrderSummary).toBe(placeOrderPayload.orders[0].country);
  expect(deliveryCountryInOrderSummary).toBe(placeOrderPayload.orders[0].country);
  expect(productNameInOrderSummary.toLowerCase()).toBe(testDataForOrder.desiredProductName.toLowerCase());
  expect(productPriceInOrderSummary_Numeric).toBe(productIDAndPrice.price);
});

function getProductInfo(desiredProductName) {
  //This function will dynamically help with the UI assertions at the end of the test.
  //Based on the "desiredProductName" in "testDataForOrder.json", it will return the productOrderedId and price.

  switch (desiredProductName) {
    case "ZARA COAT 3":
      return { productOrderedId: "68a961459320a140fe1ca57a", price: 11500 };
    case "ADIDAS ORIGINAL":
      return { productOrderedId: "68a961719320a140fe1ca57c", price: 11500 };
    case "IPHONE 13 PRO":
      return { productOrderedId: "68a961959320a140fe1ca57e", price: 55000 };
    default:
      return { name: "PRODUCT NOT FOUND", price: 0 };
  }
}
