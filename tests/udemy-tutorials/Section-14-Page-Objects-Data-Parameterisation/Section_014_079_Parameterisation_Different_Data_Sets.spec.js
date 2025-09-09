//Section 14.79: Implementing Parameterization in running tests with different data sets
//Related file: "udemy_utils\PlaceOrder_SeveralDataSets.json"
//Related file: "udemy_utils\Udemy_APIUtils.js"

/*
For this test I'll build on the last test of using external data to drive the test.
However, this time I'll "Parameterise" the test.

Goal:
Let's say this time, I'm required to run the same test to place an order, but with multiple different credentials.
I might also want to purchase a different product per credential.

Originally in the .json testData file, I just had 1 data set to place an order (1 x loginEmail, 1 x loginPassword etc.).
This time the .json testData file will contain an array of different data sets.
So the .json file will become an array with > 1 data set (multiple loginEmails and loginPasswords etc.).
*/

import { test, expect, request } from "@playwright/test";
import { APIUtils } from "../../../udemy_utils/APIUtils";
import { POManager } from "../../../udemy_page_objects/POManager";
import PlaceOrder_SeveralDataSets from "../../../udemy_utils/PlaceOrder_SeveralDataSets.json" assert { type: "json" };

//testData is an array of different data sets:
const testData = JSON.parse(JSON.stringify(PlaceOrder_SeveralDataSets));

let prerequisiteData, apiContext, apiUtils;

test.beforeAll(async () => {
  apiContext = await request.newContext();
  //Not invoking the "APIUtils" Class here anymore because loginPayload/placeOrderPayload depends on each data set.
});

//The whole test block is now in a for loop.
//It loops through the testData array, pulled from "PlaceOrder_SeveralDataSets.json".
//It will use the data from each index iteration (loginEmail, loginPassword etc.).
//The data from each index will then be placed into loginPayload and placeOrderPayload.
for (const data of testData) {
  test(`@Web Udemy: Placing order for: ${getProductInfo(data.productID).name}, account: ${data.loginEmail}`, async ({
    page,
  }) => {
    //Properties for loginPayload and placeOrderPayload are now dynamically created.
    //The credentials are read from the .json file  based on the current data set:
    const loginPayload = { userEmail: data.loginEmail, userPassword: data.loginPassword };
    const placeOrderPayload = {
      orders: [{ country: data.desiredDeliveryCountry, productOrderedId: data.productID }],
    };

    //Invoking a fresh APIUtils inside the test block.
    //This will dynamically pass the current credentials at each loop index:
    apiUtils = new APIUtils(apiContext, loginPayload);
    prerequisiteData = await apiUtils.getOrderID(placeOrderPayload);

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

    //Retreive the product information via the "productID" from each loop "data":
    const productNameAndPrice = getProductInfo(data.productID);

    console.log(`Product Ordered Name: ${productNameAndPrice.name}`);
    console.log(`Product Ordered Price: $${productNameAndPrice.price}`);

    expect(orderIDInOrderSummary).toBe(prerequisiteData.orderID);
    expect(billingEmailInOrderSummary).toBe(loginPayload.userEmail);
    expect(deliveryEmailInOrderSummary).toBe(loginPayload.userEmail);
    expect(billingCountryInOrderSummary).toBe(placeOrderPayload.orders[0].country);
    expect(deliveryCountryInOrderSummary).toBe(placeOrderPayload.orders[0].country);
    expect(productNameInOrderSummary.toLowerCase()).toBe(productNameAndPrice.name.toLowerCase());
    expect(productPriceInOrderSummary_Numeric).toBe(productNameAndPrice.price);
  });
}

function getProductInfo(productID) {
  //This function will dynamically help with the UI assertions at the end of the test.
  //It will return the productName and productPrice, based on the "productID" in "PlaceOrderTestData.json"
  //I can then use these variables to perform the UI assertions.

  switch (productID) {
    case "68a961459320a140fe1ca57a":
      return { name: "ZARA COAT 3", price: 11500 };
    case "68a961719320a140fe1ca57c":
      return { name: "ADIDAS ORIGINAL", price: 11500 };
    case "68a961959320a140fe1ca57e":
      return { name: "IPHONE 13 PRO", price: 55000 };
    default:
      return { name: "PRODUCT NOT FOUND", price: 0 };
  }
}
