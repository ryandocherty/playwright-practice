//Section 18.101: Build Playwright Pageobject TypeScript files and enforce the typing standards
//Section 18.102: Build Playwright Utility TypeScript files with enforcing the typing standards

//Page Object implementation for the "Cart" page of "https://rahulshettyacademy.com/client"
//https://rahulshettyacademy.com/client/#/dashboard/cart

import { Page, Locator } from "@playwright/test";

export class CartPage {
  page: Page;
  itemNameInCart_Locator: Locator;
  itemPriceInCart_Locator: Locator;
  checkout_Button: Locator;

  constructor(page: Page) {
    this.page = page;
    this.itemNameInCart_Locator = page.locator(`div[class='cartSection'] h3`);
    this.itemPriceInCart_Locator = page.locator(`.prodTotal`);
    this.checkout_Button = page.locator(`button:has-text("Checkout")`);
  }

  async getOrderInfoInCart() {
    /*
    Here we're specifying data types for some locators, and these locators are expected to return a string.
    However, it's possible that the return type is NULL/undefined (e.g. the element wasn't found, or didn't contain text).
    So TypeScript will compain like "The value might be null here, and you can't assign null to a string type".

    A recommended solution to this is to use the "??" operator (nullish coalescing operator).
    This means "if the left side is null or undefined, use the right side instead".
    So if a string isn't found using the locator (left side), it will default to the value you give (right side).
    In this case, we're telling it to default to an empty string - "".

    This way, the code is safe, and "itemNameInCart_Text" is guaranteed to be a string (never null).
    If the string is empty, then that indicates something wrong with the locator or the web element.
    These errors will then be caught by your test at runtime.
    */

    const itemNameInCart_Text: string = (await this.itemNameInCart_Locator.textContent()) ?? "";
    const priceInCart_Text: string = (await this.itemPriceInCart_Locator.textContent()) ?? "";

    const itemNameInCart = itemNameInCart_Text.trim();
    const priceInCart = priceInCart_Text.trim();

    const priceInCart_Numeric = parseFloat(priceInCart?.replace(/[^0-9.]+/g, ""));

    const orderInfoInCart = {
      itemNameInCart,
      priceInCart_Numeric,
    };

    return orderInfoInCart;
  }

  async navigateToCheckoutPage() {
    await this.checkout_Button.click();
    await this.page.waitForLoadState(`networkidle`);
  }
}
