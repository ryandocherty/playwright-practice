//----------This is a helper file for saucedemo_login_test.spec.ts----------

import { Page } from "playwright/test";

//declare constants for various selectors on saucedemo.com:
export const SELECTORS = {
  //Selectors on landing page:
  loginButton: '[data-test="login-button"]',
  errorMessage: '[data-test="error"]',
  usernameInputBox: '[data-test="username"]',
  passwordInputBox: '[data-test="password"]',

  //Selectors once logged in:
  firstItemImage: '[data-test="inventory-item-sauce-labs-backpack-img"]',
  backpackImage_src: "/static/media/sauce-backpack-1200x1500.0a0b85a3.jpg",
  dogImage_src: "/static/media/sl-404.168b1cce.jpg",
};

export const addToCartButtons = [
  //Add to cart buttons:
  '[data-test="add-to-cart-sauce-labs-backpack"]',
  '[data-test="add-to-cart-sauce-labs-bike-light"]',
  '[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]',
  '[data-test="add-to-cart-sauce-labs-fleece-jacket"]',
  '[data-test="add-to-cart-sauce-labs-onesie"]',
  '[data-test="add-to-cart-test\\.allthethings\\(\\)-t-shirt-\\(red\\)"]',
];

export const removeFromCartButtons = [
  //Remove from cart buttons:
  '[data-test="remove-sauce-labs-backpack"]',
  '[data-test="remove-sauce-labs-bike-light"]',
  '[data-test="remove-sauce-labs-bolt-t-shirt"]',
  '[data-test="remove-sauce-labs-fleece-jacket"]',
  '[data-test="remove-sauce-labs-onesie"]',
  '[data-test="remove-test\\.allthethings\\(\\)-t-shirt-\\(red\\)"]',
];

//Function to extract text from any of the elements defined above:
export async function getElementText(page: Page, selector: string) {
  return await page.evaluate((selec) => {
    //Query the given element:
    const element = document.querySelector(selec);
    //If the element is found, return the text content. If not found, return an error
    return element ? element?.textContent : console.log("Element not found");
  }, selector);
}
