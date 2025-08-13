//Section 11.58: How to intercept Network response calls with Playwright route method

/*
Most modern websites are driven by API calls.

-----Example with "https://rahulshettyacademy.com/client":

When we've been logging into this website, it makes an API "login" call,
then based on the response it renders the data on the front-end.
But this website is driven by API calls and makes mutiple other API calls,
such as "get-all-products" to render the available products for the logged-in user.
It makes a call in the back-end, then the back-end gave a response, then the front-end is reading
the response and rendering the data that's passed with the response (product names, price, image, catagory etc.).

The same thing happens when opening the "orders" tab on the website.
It makes an API call "get-orders-for-customer" and then renders the data from the response to the front-end.
So this page will basically display previous orders for the currently logged-in user.

---Potential Scenario:
What if we need to verify whether a "no orders found" message appears on the "orders" tab?
The prerequisite would be that there cannot be any orders in the "orders" tab for the message to get displayed.
If you were to write an automated test for this, you potentially might have to delete all the orders in the "orders" tab,
for the "no orders found" message to appear.
Or another potential solution would be to find an account that happens to have no orders, but this could be time consuming.

---Potential Problem:
So the prerequisite would be that there cannot be any orders in the "orders" tab.
But what if another colleague needs the account to have visible orders in the "orders" tab?
You might end up deleting the data that they require for one of their own tests,
and it'll likely be time consuming to have to delete all the orders anyway.
NOTE - a lot of companies will likely have a special dummy account for this scenario, but it's not guaranteed.

---Potential Solition:
When we actually have an account with no orders, 
the json response for the "get-orders-for-customer" call looks like this:

{"data":[],"message":"No Orders"}

The call has not returned any data in the response (i.e. the data is null/empty).
So if there's no data found/returned, it also returns the message "No Orders".
This causes the message "You have No Orders to show at this time" to appear in the "orders" tab,
because the front-end read the response data as null/empty.

So in theory, can we intercept/alter the response before it renders data to the front-end?
Can Playwright stop the response, then inject a fake/mock response, THEN send it to the front-end?
In essence: if we have an account that has 1+ orders, can we inject `{"data":[],"message":"No Orders"}`
before it gets rendered to the browser, essentially causing the "no orders found" message to display,
even though there ARE actually orders associated with the logged-in user?

This is possible with Playwright, and the fake response will only be available for that specific browser instance.
So as soon as the browser is closed, the fake response disappears, and the orders will reappear as usual in other instances.
This allows us to test the "no orders found" message without actually altering any data.
This is the basic concept of intercepting network responses (also called "mocking a response").

Let's say there's a real bug in the application that the "no orders found" message doesn't actually appear anyway.
Well this test will still catch that bug, because the error message only appears anyway if the API response is null.
This website is driven by API calls, so the error message is exclusively dependent on the API response being null/empty.
*/

/*
For this test:
The utimate goal is to verify whether a "no orders found" message appears on the "orders" tab, 
on an account that does actually have orders, by intercepting and mocking the API response when loading the "orders" tab.

1. Login and collect the session token by invoking the Class "Udemy_APIUtils.getLoginToken()".
2. Place an order by invoking the Class "Udemy_APIUtils.getOrderID()", using the session token.
3. Load the "orders" tab.
4. Intercept the API response to return a mock "no orders found" response using route() method.
5. Finally test the "no orders found" message through normal UI automation.
*/

import { test, expect, request } from "@playwright/test";
import { APIUtils } from "../../../udemy_utils/APIUtils";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });
const loginEmail = process.env.LOGIN_EMAIL ?? "";
const loginPassword = process.env.LOGIN_PASSWORD ?? "";

let prerequisiteData;
const loginPayload = { userEmail: loginEmail, userPassword: loginPassword };
const placeOrderPayload = { orders: [{ country: "United Kingdom", productOrderedId: "67a8dde5c0d3e6622a297cc8" }] };

test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const apiUtils = new APIUtils(apiContext, loginPayload);

  //getOrderID() returns an object containing both "loginToken" and "orderID":
  prerequisiteData = await apiUtils.getOrderID(placeOrderPayload);
});

test("Udemy: Verify No Orders error message", async ({ page }) => {
  /*-------------------------------------Login Page----------------------------------------------*/
  /*---------------------------------------------------------------------------------------------*/
  await page.addInitScript((value) => {
    window.localStorage.setItem(`token`, value);
  }, prerequisiteData.loginToken);

  await page.goto("https://rahulshettyacademy.com/client");

  /*-------------------------------------Order History Page--------------------------------------*/
  /*---------------------------------------------------------------------------------------------*/
  //Basic method:
  //1. Fetch and intercept the response.
  //2. Inject the mock response.
  //3. Send mock response to browser.
  //4. Browser then renders data from mock response.

  //route.request() — Returns the Request object that was intercepted.
  //route.continue() — Continue with the normal request without change.
  //route.fulfill() — Provide a mocked response.
  //route.abort() — Abort the request.

  //page.route(url, handler);
  //Here is where we intercept the API response using the route() method.
  //The term "route" is like a general term meaning "reroute this the way I want".
  //1st argument: the URL/endpoint (in this case "get-orders-for-customer").
  //2nd argument: the handler (how you want to route, in the form of an asynchronous function).
  await page.route(`https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*`, async (route) => {
    //The 2nd arg contains the (route) object representing the intercepted route.
    //You can't get the API response from just "page", so we need to use "request" to switch to API mode.
    //Here we're saying "fetch the response of this route (endpoint)".
    //However, just passing ".fetch(route)" will just pass the endpoint URL (Route object).
    //We need to pass a Request object, NOT a Route object ("fetch()" is not designed to accept a Route object as a parameter).
    //So we explicitly say ".fetch(route.request())" to fetch the details about the request (like URL, headers, body etc.).
    const response = await page.request.fetch(route.request());

    //Now we need to setup the mock payload data to be passed to the browser.
    //We setup a "body" variable beause fullfil() expects a body (in JSON format as well).
    const mockPayload_NoOrders = { data: [], message: "No Orders" };
    const body = JSON.stringify(mockPayload_NoOrders);

    //We now provide the data of the mocked response using "route.fullfil()".
    //route.fullfil() aborts the ongoing request and sends a new one manually (potentially with mocked payload data).
    //route.fulfill() intercepts the request and completely stops it from going to the original server.
    //Here we're sending back the same "get-orders-for-customer" response (arg 1), but injecting the mock data (arg 2).
    route.fulfill({
      response,
      body,
    });
  });
  //await page.pause();
  await page.getByRole(`button`, { name: `  ORDERS` }).click();
  console.log(`Clicking 'Orders'...`);

  //Using waitForResponse():
  //This is to overcome slight delays with receiving the real (unmodified) response.
  //There is a possibility that you end up attempting to send the fake response,
  //before the real response is actually retrieved.
  await page.waitForResponse(`https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*`);

  //Assert that a "no orders found" message appears on the "orders" tab:
  const errorMessage_NoOrders = await page.locator(`.mt-4`).textContent();
  console.log(errorMessage_NoOrders);
  expect(errorMessage_NoOrders).toContain(`No Orders`);
});
