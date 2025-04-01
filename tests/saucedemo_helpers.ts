//----------This is a helper file for saucedemo_login_test.spec.ts----------

import { Page } from "playwright/test";

//declare constants for various selectors on saucedemo.com:
export const SELECTORS = {
  loginButton: '[data-test="login-button"]',
  errorMessage: '[data-test="error"]',
  usernameInputBox: '[data-test="username"]',
  passwordInputBox: '[data-test="password"]',
  firstItemImage_datatest: '[data-test="inventory-item-sauce-labs-backpack-img"]',
  backpackImage_src: "/static/media/sauce-backpack-1200x1500.0a0b85a3.jpg",
  dogImage_src: "/static/media/sl-404.168b1cce.jpg",
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
