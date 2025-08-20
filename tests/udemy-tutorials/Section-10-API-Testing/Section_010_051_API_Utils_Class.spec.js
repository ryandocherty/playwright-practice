//Section 10.51: Refactor API calls from utils folder and isolate from Web test logic
//Section 10.52: Part 2 - Refactor API calls from utils folder and isolate from Web test logic
//Related file: "udemy_utils\Udemy_APIUtils.js"

/*
For this test:
1. The ultimate goal is still to "Verify if an order shows up in the order history page".
2. I'm rewriting "Section_010_046_API_Calls_Request_Response_Method", but importing a Utilties file.
3. In this isolated Utils file "Udemy_APIUtils" I'll set up a Class to handle the API calls.
4. The API calls will be a "login" and "place order" call, which are prerequesites to obtain an orderID.
5. I'll then perform normal UI automation to verify that the orderID appears on the order history page.
*/

import { test, expect, request } from "@playwright/test";
import { APIUtils } from "../../../udemy_utils/APIUtils.js";
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

//productOrderedId for "ZARA COAT 4": 67a8dde5c0d3e6622a297cc8
//productOrderedId for "ADIDAS ORIGINAL": 67a8df1ac0d3e6622a297ccb
//productOrderedId for "IPHONE 13 PRO": 67a8df56c0d3e6622a297ccd

test.beforeAll(async () => {
  /*---------------------------------------Invoke APIUtils Class---------------------------------*/
  /*---------------------------------------------------------------------------------------------*/

  //It's better to create the APIContext in your actual test block(s), not in the Utils file.
  //We'll pass the APIContext to the Constructor in our Utils file.
  const APIContext = await request.newContext();

  //Each instance of this whole test requires you to login first,
  //so we create an object of "Udemy_APIUtils", and then pass "APIContext" and "loginPayload" to the Constructor:
  const apiUtils = new APIUtils(APIContext, loginPayload);

  //We'll then use the "APIUtils" Class instance to call getOrderID() and pass it the "placeOrderPayload".
  //getOrderID() returns an object "prerequisiteData" which contains the values of "loginToken" and "orderID":
  prerequisiteData = await apiUtils.getOrderID(placeOrderPayload);
});

test("Udemy: Verify Order using APIUtils", async ({ page }) => {
  /*-------------------------------------Login Page----------------------------------------------*/
  /*---------------------------------------------------------------------------------------------*/

  //Set the "loginToken" from our "prerequisiteData" object:
  await page.addInitScript((value) => {
    window.localStorage.setItem(`token`, value);
  }, prerequisiteData.loginToken);

  await page.goto("https://rahulshettyacademy.com/client");

  /*-------------------------------------Order History Page--------------------------------------*/
  /*---------------------------------------------------------------------------------------------*/

  //Click the "Orders" link:
  await page.getByRole(`button`, { name: `  ORDERS` }).click();
  console.log(`Clicking 'Orders'...`);

  //For safety, wait for the "Your Orders" header to load before continuing to interact:
  await page.getByRole(`heading`, { name: `Your Orders` }).waitFor();

  //Assert that the "orderID" value is visible on the Order History page:
  expect(page.getByText(prerequisiteData.orderID).first()).toBeVisible();
});
