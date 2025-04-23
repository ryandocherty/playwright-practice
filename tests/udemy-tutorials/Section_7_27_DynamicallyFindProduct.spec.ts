//Section 7.27: Write the Script to dynamically find the product to buy from list of products

import { test, expect } from "@playwright/test";
import { SELECTORS_CLIENT } from "./Udemy_Tutorials_Helpers";
import dotenv from "dotenv";

//Load hidden environment variables:
dotenv.config({ path: ".env" });

test("Udemy: Client Item Purchase Test", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/client");

  //Assign the email and password to a variable.
  //Using the nullish coalescing operator "??" to provide a fallback/default value,
  //in case there is an issue importing them:
  const loginEmail = process.env.LOGIN_EMAIL ?? "";
  const loginPassword = process.env.LOGIN_PASSWORD ?? "";
  await page.pause();

  //Throw an error if the email or password is empty:
  if (!process.env.LOGIN_EMAIL || !process.env.LOGIN_PASSWORD) {
    console.log(`LOGIN_EMAIL: `, process.env.LOGIN_EMAIL);
    console.log(`LOGIN_PASSWORD: `, process.env.LOGIN_PASSWORD);
  }

  await page.locator(SELECTORS_CLIENT.userEmailInput).fill(loginEmail);
  await page.locator(SELECTORS_CLIENT.userPasswordInput).fill(loginPassword);
});
