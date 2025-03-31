//-----------This is a helper file for login_test_saucedemo.spec.ts-----------

import { Page } from "playwright/test";

//declare constants for various selectors on saucedemo.com:
export const SELECTORS = {
  loginButton_Saucedemo: '[data-test="login-button"]',
  errorMessage_Saucedemo: '[data-test="error"]',
  usernameInputBox_Saucedemo: '[data-test="username"]',
  passwordInputBox_Saucedemo: '[data-test="password"]',
};

//Function to extract text from any of the elements defined above:
export async function getElementText(page: Page, selector: string) {
  return await page.evaluate((selec) => {
    //Query the given element:
    const element = document.querySelector(selec);
    //If the element is found, return the text content. If not found, return an error
    return element ? element?.textContent : "Element not found";
  }, selector);
}
