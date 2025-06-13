//Section 13.67: Introduction to excelJS node module and setting up JS Project

import { test, expect } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });
const loginEmail = process.env.LOGIN_EMAIL ?? "EMAIL NOT FOUND";
const loginPassword = process.env.LOGIN_PASSWORD ?? "PASSWORD NOT FOUND";

test.beforeAll(async ({ browser }) => {
  /*---------------------------------------Login page--------------------------------------------*/
  /*---------------------------------------------------------------------------------------------*/
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://rahulshettyacademy.com/client");
  await page.getByPlaceholder(`email@example.com`).fill(loginEmail);
  await page.getByPlaceholder(`enter your passsword`).fill(loginPassword);
  await page.getByRole(`button`, { name: `login` }).click();
  await page.waitForLoadState(`networkidle`);

  await context.storageState({ path: "Udemy_storageState.json" });
  context_LoggedIn = await browser.newContext({ storageState: "Udemy_storageState.json" });
});

test.beforeEach(async () => {
  page = await context_LoggedIn.newPage();
  await page.goto("https://rahulshettyacademy.com/client");
  await page.waitForLoadState(`networkidle`);
});

test("Udemy: Verify product 'ZARA COAT 3' is present (using sessionStorage)", async () => {
  const targetProductName = `ZARA COAT 3`;
  expect(page.getByText(targetProductName)).toBeVisible();
});
