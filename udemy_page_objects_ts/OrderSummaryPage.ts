//Section 18.101: Build Playwright Pageobject TypeScript files and enforce the typing standards
//Section 18.102: Build Playwright Utility TypeScript files with enforcing the typing standards

//Page Object implementation for the "Order History" page of "https://rahulshettyacademy.com/client"
//https://rahulshettyacademy.com/client/#/dashboard/order-details...

import { Page, Locator } from "@playwright/test";

export class OrderSummaryPage {
  page: Page;
  orderID_Locator: Locator;
  addresses_Locator: Locator;
  productName_Locator: Locator;
  productPrice_Locator: Locator;

  constructor(page: Page) {
    this.page = page;
    this.orderID_Locator = page.locator(`.col-text`);
    this.addresses_Locator = page.locator(`div[class="address"] p`);
    this.productName_Locator = page.locator(`.title`);
    this.productPrice_Locator = page.locator(`.price`);
  }

  async getOrderInfoInOrderSummary() {
    const orderIDInOrderSummary_Text: string = (await this.orderID_Locator.textContent()) ?? "";
    const billingEmailInOrderSummary_Text: string = (await this.addresses_Locator.nth(0).textContent()) ?? "";
    const billingCountryInOrderSummary_Text: string = (await this.addresses_Locator.nth(1).textContent()) ?? "";
    const deliveryEmailInOrderSummary_Text: string = (await this.addresses_Locator.nth(2).textContent()) ?? "";
    const deliveryCountryInOrderSummary_Text: string = (await this.addresses_Locator.nth(3).textContent()) ?? "";
    const productNameInOrderSummary_Text: string = (await this.productName_Locator.textContent()) ?? "";
    const productPriceInOrderSummary_Text: string = (await this.productPrice_Locator.textContent()) ?? "";

    const orderIDInOrderSummary: string = orderIDInOrderSummary_Text.trim();
    const billingEmailInOrderSummary: string = billingEmailInOrderSummary_Text.trim();
    const billingCountryInOrderSummary: string = billingCountryInOrderSummary_Text.trim().split("- ")[1];
    const deliveryEmailInOrderSummary: string = deliveryEmailInOrderSummary_Text.trim();
    const deliveryCountryInOrderSummary: string = deliveryCountryInOrderSummary_Text.trim().split("- ")[1];
    const productNameInOrderSummary: string = productNameInOrderSummary_Text.trim();
    const productPriceInOrderSummary: string = productPriceInOrderSummary_Text.trim();
    const productPriceInOrderSummary_Numeric: number = parseFloat(productPriceInOrderSummary?.replace(/[$ ]+/g, ""));

    const orderInfoInOrderSummary = {
      orderIDInOrderSummary,
      billingEmailInOrderSummary,
      billingCountryInOrderSummary,
      deliveryEmailInOrderSummary,
      deliveryCountryInOrderSummary,
      productNameInOrderSummary,
      productPriceInOrderSummary_Numeric,
    };

    return orderInfoInOrderSummary;
  }
}
