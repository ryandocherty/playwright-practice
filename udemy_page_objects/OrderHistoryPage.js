//Section 14.75: Creating Page objects and action methods for end to end Script - Part 1

//Page Object implementation for the "Order History" page of "https://rahulshettyacademy.com/client"
//https://rahulshettyacademy.com/client/#/dashboard/myorders

export class OrderHistoryPage {
  constructor(page) {
    this.page = page;
    this.orderIDColumn_Locator = page.locator(`th[scope="row"]`);
    this.viewOrder_Button = page.locator(`button:has-text('View')`);
  }

  async getOrderInfoInOrderHistory() {}

  async navigateToOrderSummaryPage(orderID) {
    await this.orderIDColumn_Locator.first().waitFor(); //Columns don't load without this and break the loop below.
    const orderIdColumn_Count = await this.orderIDColumn_Locator.count();

    console.log(`Locating OrderID "${orderID}"`);

    for (let i = 0; i < orderIdColumn_Count; i++) {
      if ((await this.orderIDColumn_Locator.nth(i).textContent()) === orderID) {
        console.log(`OrderID "${orderID}" located at position ${i + 1} in the list`);
        await this.viewOrder_Button.nth(i).click();
        console.log(`Clicked 'View order'`);
        break;
      } else {
        console.log(`OrderID not found`);
      }
    }
    await this.page.locator(`.email-title`).waitFor();
  }
}
