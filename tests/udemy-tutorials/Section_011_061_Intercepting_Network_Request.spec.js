//Section 10.61: How to intercept Network request calls with Playwright - Example demo

/*
-----Example Security Scenario with https://rahulshettyacademy.com/client:

When you go to "Orders" > "View Order" on this website, it makes an API GET call "get-orders-details".
The Request URL looks like this:
"https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=6842cee481a20695306416f9".
You can see the specific order ID string at the end of the URL:
"6842cee481a20695306416f9".
The order ID is concatenated at the end of the "get-orders-details" call.
The Response contains the actual data (product name, price, image etc.) which is then rendered on the front end.
Thr Response also contains the message "Orders fetched for customer Successfully".

What's a potential security testing scenario here?
There's a way hackers could potentially use third party tools to tweak the API call.
They could insert their own order ID and view an order that doesn't belong to them.
This could expose sensitive details about a different user's order, like addresses and banking info.
We've already seen how to intercept an API call and sending a mock response.
This should obviously not be allowed, and should instead respond with some kind of "unauthorised" error.


So the security testing scenario here could be:
"Verify you get an Unauthorised/Forbidden error message when trying to access others' orders".

Steps:
1. Login to an account.
2. Navigate to "Orders" > "View Order".
3. Listen for and intercept the API call "get-orders-details".
4. Inject mock data (an incorrect orderID) and send the response to the browser.
5. Verify the "Unauthorised/Forbidden" error message appears and no secret information is shown.


*/

import { test, expect, request } from "@playwright/test";
import { Udemy_APIUtils } from "../utils/Udemy_APIUtils";
import dotenv from "dotenv";

//Load hidden environment variables:
dotenv.config({ path: ".env" });

//Still loading the email/password from the .env file:
const loginEmail = process.env.LOGIN_EMAIL ?? "";
const loginPassword = process.env.LOGIN_PASSWORD ?? "";

//Global variables:
let prerequisiteData;
const loginPayload = { userEmail: loginEmail, userPassword: loginPassword };
const placeOrderPayload = { orders: [{ country: "United Kingdom", productOrderedId: "67a8dde5c0d3e6622a297cc8" }] };

test.beforeAll(async () => {
  /*---------------------------------------Invoke APIUtils Class---------------------------------*/
  /*---------------------------------------------------------------------------------------------*/

  const APIContext = await request.newContext();
  const APIUtils = new Udemy_APIUtils(APIContext, loginPayload);
  loginToken = await APIUtils.getLoginToken();
  console.log(loginToken);
});
