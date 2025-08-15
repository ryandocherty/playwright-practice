//Section 18.101: Build Playwright Pageobject TypeScript files and enforce the typing standards
//Section 18.102: Build Playwright Utility TypeScript files with enforcing the typing standards

//This file is a TypeScript refactor of "udemy_page_objects\OrderConfirmedPage.js"

//Page Object implementation for the "Order Confirmed" page of "https://rahulshettyacademy.com/client"
//https://rahulshettyacademy.com/client/#/dashboard/thanks?...

import { Page, Locator } from "@playwright/test";

export class OrderConfirmedPage {
  page: Page;
  productNameInOrderConfirmed_Locator: Locator;
  priceInOrderConfirmed_Locator: Locator;
  orderIDInOrderConfirmed_Locator: Locator;
  orderHistoryLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productNameInOrderConfirmed_Locator = page.locator(`div[class="title"]`);
    this.priceInOrderConfirmed_Locator = page.locator(`.title`);
    this.orderIDInOrderConfirmed_Locator = page.locator(`.em-spacer-1 .ng-star-inserted`);
    this.orderHistoryLink = page.locator(`label[routerlink='/dashboard/myorders']`);
  }

  async getOrderInfoInOrderConfirmed() {
    const productNameInOrderConfirmed_Text: string = (await this.productNameInOrderConfirmed_Locator.first().textContent()) ?? "";
    const priceInOrderConfirmed_Text: string = (await this.priceInOrderConfirmed_Locator.nth(1).textContent()) ?? "";
    const orderIDInOrderConfirmed_Text: string = (await this.orderIDInOrderConfirmed_Locator.textContent()) ?? "";

    const productNameInOrderConfirmed: string = productNameInOrderConfirmed_Text.trim();
    const priceInOrderConfirmed_Numeric: number = parseFloat(priceInOrderConfirmed_Text?.replace(/[^0-9.]+/g, ""));
    const orderIDInOrderConfirmed: string = orderIDInOrderConfirmed_Text?.replace(/\|/g, ``).trim();

    const orderInfoInOrderConfirmed = {
      productNameInOrderConfirmed,
      priceInOrderConfirmed_Numeric,
      orderIDInOrderConfirmed,
    };
    return orderInfoInOrderConfirmed;
  }

  async navigateToOrderHistoryPage() {
    await this.orderHistoryLink.click();
    await this.page.waitForLoadState(`networkidle`);
  }
}
