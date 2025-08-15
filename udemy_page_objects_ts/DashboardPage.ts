//Section 18.101: Build Playwright Pageobject TypeScript files and enforce the typing standards
//Section 18.102: Build Playwright Utility TypeScript files with enforcing the typing standards

//This file is a TypeScript refactor of "udemy_page_objects\DashboardPage.js"

//Page Object implementation for the "Dashboard" page of "https://rahulshettyacademy.com/client"
//https://rahulshettyacademy.com/client/#/dashboard/dash

import { Page, Locator } from "@playwright/test";

export class DashboardPage {
  page: Page;
  allProducts: Locator;
  allProductTitles: Locator;
  addToCart_Button: Locator;
  cartLink: Locator;
  orderHistory_Button: Locator;

  constructor(page: Page) {
    this.page = page;
    this.allProducts = page.locator(`.card-body`);
    this.allProductTitles = page.locator(`.card-body b`);
    this.addToCart_Button = page.locator(`.w-10`);
    this.cartLink = page.locator(`[routerlink='/dashboard/cart']`);
    this.orderHistory_Button = page.locator(`button[routerlink='/dashboard/myorders']`);
  }

  async searchProduct_addToCart(desiredProductName: string) {
    const productTitles: string[] = await this.allProductTitles.allTextContents();
    const productTitlesCount: number = await this.allProductTitles.count();

    console.log(`Number of products found: ${productTitlesCount}`);
    console.log(productTitles);

    for (let i = 0; i < productTitlesCount; ++i) {
      if ((await this.allProducts.nth(i).locator(`b`).textContent()) === desiredProductName) {
        await this.allProducts.nth(i).locator(`.w-10`).click();
        console.log(`Clicking 'Add To Cart' for product "${desiredProductName}"`);
        break;
      }
    }
    await this.page.waitForLoadState(`networkidle`);
  }

  async navigateToCartPage() {
    await this.cartLink.click();
    await this.page.waitForLoadState(`networkidle`);
  }

  async navigateToOrderSummaryPage_UsingOrderID(orderID: string) {
    await this.page.goto(`https://rahulshettyacademy.com/client/#/dashboard/order-details/` + orderID);
    await this.page.waitForLoadState(`networkidle`);
  }
}
