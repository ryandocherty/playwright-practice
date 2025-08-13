//Section 11.61: How to intercept Network request calls with Playwright - Example demo

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
"Verify you get an 'Unauthorised/Forbidden/Not found' error message when trying to access others' order information".

Steps:
1. Login to an account.
2. Navigate to "Orders" > "View Order".
3. Listen for and intercept the API call "get-orders-details".
4. Reroute the API call to attempt to show an unauthorised order, send the response to the browser.
5. Verify an "Unauthorised/Forbidden/Not found" error message appears and no sensitive information is shown.
*/

import { test, expect, request } from "@playwright/test";
import { APIUtils } from "../../../udemy_utils/APIUtils";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });
const loginEmail = process.env.LOGIN_EMAIL ?? "";
const loginPassword = process.env.LOGIN_PASSWORD ?? "";

let loginToken;
const loginPayload = { userEmail: loginEmail, userPassword: loginPassword };

test.beforeAll(async () => {
  //Get a loginToken by invoking the Udemy_APIUtils Class:
  const apiContext = await request.newContext();
  const apiUtils = new APIUtils(apiContext, loginPayload);
  loginToken = await apiUtils.getLoginToken();
});

test("Udemy: Verify Unauthorised/Forbidden message", async ({ page }) => {
  //Set the loginToken in the browser storage:
  await page.addInitScript((value) => {
    window.localStorage.setItem(`token`, value);
  }, loginToken);

  await page.goto(`https://rahulshettyacademy.com/client`);

  //Using route.continue():
  //This method's purpose is to let the intercepted request continue to the original destination/server "unmodified".
  //route.continue() DOES allow you to modify certain parts of the request before it is sent onward.
  //route.continue() doesn't send a new call (like route.fulfill() does), but modifies the original network request "in-flight".
  //You CAN modify Headers, URL, and Method with route.continue().
  //You CANNOT modify the Payload with route.continue().
  await page.route(`https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*`, (route) =>
    route.continue({
      //Reroute the API call to attempt to show an order that doesn't belong to the current user:
      url: `https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b6`,
    })
  );

  //Navigate to "Orders" > "View Order".
  //Assert the Unauthorised/Forbidden message apppears:
  await page.locator(`[routerlink$='/dashboard/myorders']`).click();
  await page.getByRole(`button`, { name: `View` }).first().click();
  await page.waitForLoadState(`networkidle`);
  expect(page.getByText(`You are not authorize to view this order`)).toBeVisible();
});
