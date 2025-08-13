//Section 16.86: Understand how playwright run tests in serial & parallel mode and update setting

/*
There are 3 individual tests in this file.
We have the "customtest", then a test that runs twice in a for loop.
By default, tests will run in Serial mode for tests present in the same file.
By default, actual test files will run in Parallel mode.
If you run the whole test folder (i.e. every .spec file), all *files* will run in Parallel.
But the individual tests within a file will run in Serial.
This behaviour can be modified, which we'll cover in Section_016_087.

A "worker" represents a whole .spec file (with all of its tests run sequentially inside that worker), and not a single test.
A worker is assigned per .spec file (or test file).
All the tests within that .spec file run sequentially inside that single worker.
Multiple spec files can run in parallel, each in their own worker.

The way Playwright runs workers remains consistent regardless of whether your tests perform:
1. UI interactions (browsers)
2. API calls
3. Both combined

In some cases, reducing the number of workers can help with flakey tests.
This can be due to:
1. Shared Resources and/or Race Conditions:
    If tests share or compete for external resources (e.g., database, API rate limits, files, test data), 
    running too many in parallel may cause race conditions or overload those resources.

2. Environment Limitations:
    Your development or CI environment may have limited CPU, memory, or network bandwidth.

3. Tests Affecting Each Other
    Sometimes tests in different files depend on global state or external systems that aren’t fully isolated.
*/

import { customtest } from "../../../udemy_utils/PlaceOrder_TestBase";
import { test, expect, request } from "@playwright/test";
import { APIUtils } from "../../../udemy_utils/APIUtils";
import { POManager } from "../../../udemy_page_objects/POManager";

import PlaceOrder_SeveralDataSets from "../../../udemy_utils/PlaceOrder_SeveralDataSets.json" assert { type: "json" };
const testData = JSON.parse(JSON.stringify(PlaceOrder_SeveralDataSets));

for (const data of testData) {
  test(`Udemy: Placing order for: ${getProductInfo(data.productID).name}, account: ${data.loginEmail}`, async ({ page }) => {
    const loginPayload = { userEmail: data.loginEmail, userPassword: data.loginPassword };
    const placeOrderPayload = {
      orders: [{ country: data.desiredDeliveryCountry, productOrderedId: data.productID }],
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

    const productNameAndPrice = getProductInfo(data.productID);

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
}

customtest("Udemy: Place order using custom fixture", async ({ page, testDataForOrder }) => {
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
  expect(productNameInOrderSummary).toBe(testDataForOrder.desiredProductName);
  expect(productPriceInOrderSummary_Numeric).toBe(productIDAndPrice.price);
});

function getProductInfo(desiredProductIdentifier) {
  switch (desiredProductIdentifier) {
    case "ZARA COAT 3":
      return { productOrderedId: "67a8dde5c0d3e6622a297cc8", price: 31500 };
    case "ADIDAS ORIGINAL":
      return { productOrderedId: "67a8df1ac0d3e6622a297ccb", price: 31500 };
    case "IPHONE 13 PRO":
      return { productOrderedId: "67a8df56c0d3e6622a297ccd", price: 231500 };
    case "67a8dde5c0d3e6622a297cc8":
      return { name: "ZARA COAT 3", price: 31500 };
    case "67a8df1ac0d3e6622a297ccb":
      return { name: "ADIDAS ORIGINAL", price: 31500 };
    case "67a8df56c0d3e6622a297ccd":
      return { name: "IPHONE 13 PRO", price: 231500 };
    default:
      return { name: "PRODUCT NOT FOUND", price: 0 };
  }
}
