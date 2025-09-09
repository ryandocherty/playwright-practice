//Section 18.103. Refactor Playwright tests into TypeScript compatible and run the E2E Test

//This test is a TypeScript refactor of "Section_010_051_API_Utils_Class.spec.js"

import { test, expect, request } from "@playwright/test";
import { APIUtils } from "../../../udemy_utils_ts/APIUtils";
import { LoginPayload, PlaceOrderPayload, PrerequisiteData } from "../../../udemy_utils_ts/API_Types";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

//Load the email/password from the .env file:
const loginEmail = process.env.LOGIN_EMAIL ?? "";
const loginPassword = process.env.LOGIN_PASSWORD ?? "";

let prerequisiteData: PrerequisiteData;
const loginPayload: LoginPayload = { userEmail: loginEmail, userPassword: loginPassword };
const placeOrderPayload: PlaceOrderPayload = {
  orders: [{ country: "United Kingdom", productOrderedId: "68a961719320a140fe1ca57c" }],
};

//productOrderedId for "ZARA COAT 3": 68a961459320a140fe1ca57a
//productOrderedId for "ADIDAS ORIGINAL": 68a961719320a140fe1ca57c
//productOrderedId for "IPHONE 13 PRO": 68a961959320a140fe1ca57e

test.beforeAll(async () => {
  //==================================================
  //            Invoke APIUtils Class
  //==================================================
  const apiContext: any = await request.newContext();
  const apiUtils = new APIUtils(apiContext, loginPayload);
  prerequisiteData = await apiUtils.getOrderID(placeOrderPayload);
});

test("@Web Udemy: Verify Order using APIUtils", async ({ page }) => {
  //==================================================
  //    Login Page - Set Auth Token in localStorage
  //==================================================

  //Set the "loginToken" from our "prerequisiteData" object:
  await page.addInitScript((value) => {
    window.localStorage.setItem(`token`, value);
  }, prerequisiteData.loginToken);

  await page.goto("https://rahulshettyacademy.com/client");

  //==================================================
  //               Order History Page
  //==================================================

  //Click the "Orders" link:
  await page.getByRole(`button`, { name: `  ORDERS` }).click();
  console.log(`Clicking 'Orders'...`);

  //For safety, wait for the "Your Orders" header to load before continuing to interact:
  await page.getByRole(`heading`, { name: `Your Orders` }).waitFor();

  //Assert that the "orderID" value is visible on the Order History page:
  expect(page.getByText(prerequisiteData.orderID).first()).toBeVisible();
});
