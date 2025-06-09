//Section 10.63: How to abort the Network calls with Playwright - Examples

/*
----Example Scenario:

What if you need to test the front-end when the server is down?
If the server is not actually down, you need to simulate this.
*/

import { test, expect, request } from "@playwright/test";
import { Udemy_APIUtils } from "../utils/Udemy_APIUtils";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });
const loginEmail = process.env.LOGIN_EMAIL ?? "";
const loginPassword = process.env.LOGIN_PASSWORD ?? "";

let loginToken;
const loginPayload = { userEmail: loginEmail, userPassword: loginPassword };

test.beforeAll(async () => {
  //Get a loginToken by invoking the Udemy_APIUtils Class:
  const APIContext = await request.newContext();
  const APIUtils = new Udemy_APIUtils(APIContext, loginPayload);
  loginToken = await APIUtils.getLoginToken();
});

test("Udemy: Verify Unauthorised/Forbidden message", async ({ page }) => {
  //Set the loginToken in the browser storage:
  await page.addInitScript((value) => {
    window.localStorage.setItem(`token`, value);
  }, loginToken);

  await page.goto(`https://rahulshettyacademy.com/client`);
});
