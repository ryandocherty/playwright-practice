//Section 18.101: Build Playwright Pageobject TypeScript files and enforce the typing standards
//Section 18.102: Build Playwright Utility TypeScript files with enforcing the typing standards

//Page Object implementation for the "Order History" page of "https://rahulshettyacademy.com/client"
//https://rahulshettyacademy.com/client/#/dashboard/myorders

import { Page, Locator } from "@playwright/test";

export class OrderHistoryPage {
  page: Page;
  orderIDColumn_Locator: Locator;
  viewOrder_Button: Locator;

  constructor(page: Page) {
    this.page = page;
    this.orderIDColumn_Locator = page.locator(`th[scope="row"]`);
    this.viewOrder_Button = page.locator(`button:has-text('View')`);
  }

  async getOrderInfoInOrderHistory() {}

  async navigateToOrderSummaryPage(orderID: string) {
    await this.orderIDColumn_Locator.first().waitFor(); //Columns don't load without this and break the loop below.
    const orderIdColumn_Count: number = await this.orderIDColumn_Locator.count();

    console.log(`Locating OrderID "${orderID}"`);

    for (let i = 0; i < orderIdColumn_Count; i++) {
      if ((await this.orderIDColumn_Locator.nth(i).textContent()) === orderID) {
        console.log(`OrderID "${orderID}" located at position ${i + 1} in the list`);
        await this.viewOrder_Button.nth(i).click();
        console.log(`Clicking 'View Order' for OrderID "${orderID}"`);
        break;
      } else {
        console.log(`OrderID not found`);
      }
    }
    await this.page.locator(`.email-title`).waitFor();
  }
}
