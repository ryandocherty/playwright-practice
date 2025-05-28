//Section 10.51: Refactor API calls from utils folder and isolate from Web test logic

//For this test I want to:
//Rewrite "Section_010_046_API_Calls_Request_Response_Method.spec" to set up a Utils file "Udemy_APIUtils.js",
//which I'll place the code for the API calls (login, get token, place order with token).
//This will help keep the tests blocks seperate from any code that will be reused frequently (API calls).

import { test, expect, request } from "@playwright/test";
//import { Udemy_APIUtils } from "./ut";
import dotenv from "dotenv";

//Load hidden environment variables:
dotenv.config({ path: ".env" });

//Still loading the email/password from the .env file:
const loginEmail = process.env.LOGIN_EMAIL ?? "";
const loginPassword = process.env.LOGIN_PASSWORD ?? "";

//Global variables:
let loginToken;
let orderID;
const loginPayload = { userEmail: loginEmail, userPassword: loginPassword };
const placeOrderPayload = { orders: [{ country: "United Kingdom", productOrderedId: "67a8dde5c0d3e6622a297cc8" }] };

test.beforeAll(async () => {
  //It's better to create the APIContext in your actual test block(s), not in the Utils file.
  //We'll pass the APIContext to a Constructor in our Utils file.

  const APIContext = await request.newContext();
});

test("Udemy: Login using API", async ({ page }) => {
  /*---------------------------------------Invoke APIUtils Class---------------------------------*/
  /*---------------------------------------------------------------------------------------------*/

  //const APIUtils = new

  await page.addInitScript((value) => {
    window.localStorage.setItem(`token`, value);
  }, loginToken);

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
});
