//Section 10.46: Playwright request method to make API calls and grab response - Example
//Section 10.47: Parsing API response & passing token to browser local storage with Playwright
//Section 10.48: Place order API to create order and bypass the flow in UI with mix of web/API
//Section 10.49: End to end validation with mix of API & Web concepts - Reduce test time

//For this test I want to:
//Rewrite "Section_008_037_EndToEnd_Rewrite_getBy.spec.ts" to introduce a login API.

//Include "request" when planning on web API testing:
import { test, expect, request } from "@playwright/test";
import dotenv from "dotenv";

//Load hidden environment variables:
dotenv.config({ path: ".env" });

//Still loading the email/password from the .env file:
const loginEmail = process.env.LOGIN_EMAIL ?? "";
const loginPassword = process.env.LOGIN_PASSWORD ?? "";

//Global variables:
let loginToken: any;
let orderID: any;
const loginPayload = { userEmail: loginEmail, userPassword: loginPassword };
const placeOrderPayload = { orders: [{ country: "United Kingdom", productOrderedId: "67a8dde5c0d3e6622a297cc8" }] };

test.beforeAll(async () => {
  //test.beforeAll() - this code block will get executed once before all subsequent test blocks.

  //The "request.newContext()" method allows you to create a new context for making API requests.
  //This is similar to using "browser.newContext()" to create a new instance of the "browser" fixture.
  //You can pass information to the newContext() such as baseURL, HTTPHeaders, proxy stuff etc.
  //For now we'll keep the context empty.
  const APIContext = await request.newContext();

  //Note - "Inspect > Network > Headers/Payload/Response" displays the info/data required here.
  //The first API call/request we need to make is a "login" call, which is a type of "POST" call.
  //We then provide the data needed to make this call:
  //1. The URL/endpoint (the API URL, not the normal one).
  //2. The payload data (email & password), which we can store as a variable.
  const loginResponse = await APIContext.post(`https://rahulshettyacademy.com/api/ecom/auth/login`, {
    data: loginPayload,
  });

  //We then just need to assert that loginResponse was successful.
  //We can use .ok() for the assertion,
  //which is a boolean stating whether the response was successful (status in the range 200-299) or not.
  expect(loginResponse.ok()).toBeTruthy();

  //Now we need to grab the JSON response (loginResponse) to be able to retrieve the session token.
  //Using loginResponse.json() returns the JSON representation of response body.
  //You can see the format of this in Inspect > Network > Response.
  const loginResponse_JSON = await loginResponse.json();
  console.log(loginResponse_JSON);

  //The "loginResponseJSON" object now contains 3 objects:
  //[0] token
  //[1] userID
  //[2] message
  //We then just need to grab the token, which we can store in a variable.
  loginToken = loginResponse_JSON.token;

  /*
  -------------Test Case------------------------------
  Goal: Verify if an order shows up in the order history page.

  What prerequisite data will we need?
  We need the data from creating an order, then the orderID data.
  Can we use APIs to create the order and thus create an orderID?
  This ultimately depends on how the website developer has set up the website (modern websites tend to be driven by APIs).
  You can ask the developer if are there any API calls for creating an order, or use browser tools to check.
  If yes, then we can use APIs to make an order with this API call and retreive an orderID very quickly.
  Then we can use this orderID to then verify if it appears on the history page.

  If our goal is just to "Verify if an order shows up in the order history page",
  then we can use APIs to skip the automation of clicking buttons etc. to create the order,
  then jump straight to the order history page and run the tests there.

  Using the browser's Network tools, you can manually place an order while monitoring
  the Network tab to see if there was an API call made, to help determine
  if using an API is possible with whatever website you're working with.

  -------------Potential Problems---------------------
  If we monitor the Network tab while creating an order on "https://rahulshettyacademy.com/client",
  we see that there is indeed an API call made to create the order.

  Request URL: https://rahulshettyacademy.com/api/ecom/order/create-order
  Request Method: POST

  There's a potential problem here - how do you tell the API call to create the order just for the account that's logged in?
  We need to specify that the order should only be created on behalf of the currently logged in account.
  To do this we need to "authorise" the order, and only this way will it appear in the correct order history page.

  In Network > Headers, you can see "Request Headers" by scrolling down.
  In Request Headers, you can see a key-value pair "Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfa...".

  The value here is the loginToken from earlier, which corresponds to the currently logged in account.
  The Request Header is sending "Authorization" as the key, and "loginToken" as the value.

  -------------Method---------------------------------
  Earlier when we called the API for the "login" call, the only data passed was "loginPayload".
  This time we need to pass a Header with the loginToken.
  Hopefully we will then get a JSON Response that contains an orderID.
  We can then grab the orderID from the JSON response and use it to perform our assertions on the order history page.

  -------------API Advantages-------------------------
  By using API calls here, we're just focusing on the core goal to "Verify if an order shows up in the order history page".
  We'll be able to skip the website UI, which can be unstable due to slow internet, rendering issues etc.
  API calls are much faster and very stable as they communicate directly with the back-end server.
  As APIs are more direct, they're less prone to errors caused by UI changes (e.g., layout changes) and can lead to steadier test results.
  Normal UI automation involves interacting with rendered elements, handling animations, waiting for visible elements etc.
  With API calls, you can often finish tasks in a fraction of the time it would take using UI automation.
  In some cases, you might even see a reduction of operations down to 1/10th to 1/2 of the time taken by UI automation.
  For example, processes that take several seconds (say 5-10 seconds of UI automation) might only take ~200-800ms with API calls.
  */

  //Similarly to how you use "context.newPage()", we need to use "newContext()" for a new API POST call.
  //We already declared "const APIContext = await request.newContext()", so we can use "APIContext".
  //We then need to pass the correct endpoint for creating an order, alongside the required data.
  //The date we need can be seen in the Payload tab, or in the specific product's URL.
  //Example - "https://rahulshettyacademy.com/client/dashboard/product-details/67a8dde5c0d3e6622a297cc8"
  //OrderID - "67a8dde5c0d3e6622a297cc8"
  //The data required to place an order on this website: "country" and "productOrderedId".
  //We then need to pass the Header "Authorization" for the order.
  //We'll also pass the Header "Content-Type" to ensure the response is in JSON format (not essential though).
  const placeOrderResponse = await APIContext.post(`https://rahulshettyacademy.com/api/ecom/order/create-order`, {
    data: placeOrderPayload,
    headers: { Authorization: loginToken, "Content-Type": "application/json" },
  });

  const placeOrderResponse_JSON = await placeOrderResponse.json();
  console.log(placeOrderResponse_JSON);

  //The "placeOrderResponse_JSON" object contains:
  //[0] orders
  //[1] productOrderID
  //[2] message
  //"orders" & "productOrderID" are arrays.
  //"orders" contains the ID that'll appear in Order History (1 order can contain several products).
  //"productOrderID" is the ID of a single specific product.
  //Out goal is to check the Order History page, so we need index[0] of "orders":
  orderID = placeOrderResponse_JSON.orders[0];
});

test("Udemy: Login using API", async ({ page }) => {
  /*---------------------------------------Inject Login Token------------------------------------*/
  /*---------------------------------------------------------------------------------------------*/
  //Here is where we'll inject loginToken to avoid repeatedly logging in.
  //By default, Playwright does not have the ability to insert the token into browser local storage.
  //However, general JavaScript DOES have this ability, and Playwright can execute any JS expressions.
  //To do this, we'll use "addInitScript()", which is an initialisation script.
  //We can insert JavaScript code inside this script, which we'll use this to store the login token/cookie.

  //1. We call page.addInitScript() to inject a script into the page before any other scripts.
  //2. The browser runs the function "(value) => {window.localStorage.setItem(`token`, value);}".
  //3. The "value" parameter inside the function is automatically filled with whatever was passed as the second argument,
  //   which is the value of "loginToken".
  //4. It executes "window.localStorage.setItem('token', loginToken)", which stores the login token in the browser’s local storage.
  await page.addInitScript((value) => {
    window.localStorage.setItem(`token`, value);
  }, loginToken);

  //Previously we would go to this page and then manually login.
  //But now that we've injected the loginToken, this page will redirect straight to the dashboard/produtcs page.
  await page.goto("https://rahulshettyacademy.com/client");

  /*-------------------------------------Order History Page--------------------------------------*/
  /*---------------------------------------------------------------------------------------------*/

  //Click the "Orders" link:
  const ordersButton = page.getByRole(`button`, { name: `  ORDERS` });
  expect(ordersButton).toBeVisible();
  await ordersButton.click();
  console.log(`Clicking 'Orders'...`);

  //For safety, wait for the "Your Orders" header to load before continuing to interact:
  await page.getByRole(`heading`, { name: `Your Orders` }).waitFor();

  //Assert that the "orderID" value is visible on the Order History page:
  expect(page.getByText(orderID).first()).toBeVisible();

  //If you wanted to assert the correct "Country" value (only visible on "Order Summary", not "Order History"):
  //expect(page.getByText(placeOrderPayload.orders[0].country)).toBeVisible();
});
