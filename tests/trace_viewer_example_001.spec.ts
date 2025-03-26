import { test, expect } from "@playwright/test";

test("Trace Viewer example", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/v1/");
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill("standard_user");
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill("secret_sauce");

  console.log("Hello from the console!");

  //This is wrong on purpose, to demo the Trace Viewer:
  await page.getByRole("button", { name: "WRONG" }).click();
});
