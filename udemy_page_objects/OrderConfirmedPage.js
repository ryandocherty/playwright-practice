//Section 14.75: Creating Page objects and action methods for end to end Script - Part 1

//Page Object implementation for the "Order Confirmed" page of "https://rahulshettyacademy.com/client"
//https://rahulshettyacademy.com/client/#/dashboard/thanks?...

export class OrderConfirmedPage {
  constructor(page) {
    this.page = page;
    this.productNameInOrderConfirmed_Locator = page.locator(`div[class="title"]`);
    this.priceInOrderConfirmed_Locator = page.locator(`.title`);
    this.orderIDInOrderConfirmed_Locator = page.locator(`.em-spacer-1 .ng-star-inserted`);
    this.orderHistoryLink = page.locator(`label[routerlink='/dashboard/myorders']`);
  }

  async getOrderInfoInOrderConfirmed() {
    const productNameInOrderConfirmed_Text = await this.productNameInOrderConfirmed_Locator.first().textContent();
    const priceInOrderConfirmed_Text = await this.priceInOrderConfirmed_Locator.nth(1).textContent();
    const orderIDInOrderConfirmed_Text = await this.orderIDInOrderConfirmed_Locator.textContent();

    const productNameInOrderConfirmed = productNameInOrderConfirmed_Text.trim();
    const priceInOrderConfirmed = parseFloat(priceInOrderConfirmed_Text?.replace(/[^0-9.]+/g, ""));
    const orderID = orderIDInOrderConfirmed_Text?.replace(/\|/g, ``).trim();

    const orderInfoInOrderConfirmed = { productNameInOrderConfirmed, priceInOrderConfirmed, orderID };
    return orderInfoInOrderConfirmed;
  }

  async navigateToOrderHistoryPage() {
    await this.orderHistoryLink.click();
    await this.page.waitForLoadState(`networkidle`);
  }
}
