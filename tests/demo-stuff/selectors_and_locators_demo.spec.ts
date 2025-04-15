import { test, expect } from "@playwright/test";

test("Selectors and Locators demo", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/v1/");

  //await page.pause();

  //using a webpage element/object property:
  await page.click("id=user-name");
  await page.locator("id=user-name").fill("Hello!");
  expect(await page.locator("id=user-name").inputValue()).toBe("Hello!");

  //using a CSS selector:
  await page.locator("#login-button").click();

  //using XPath:
  await page.locator(`xpath=//*[@id="user-name"]`).fill("Hi!");
  expect(await page.locator(`xpath=//*[@id="user-name"]`).inputValue()).toBe("Hi!");

  await page.locator(`//*[@id="user-name"]`).fill("Hey!");
  expect(await page.locator(`//*[@id="user-name"]`).inputValue()).toBe("Hey!");

  //using Text
  await page.locator("text=LOGIN").click();
  await page.locator('input:has-text("LOGIN")').click();
});
