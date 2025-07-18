//Section 14.75: Creating Page objects and action methods for end to end Script - Part 1

//Page Object implementation for the "Dashboard" page of "https://rahulshettyacademy.com/client"
//https://rahulshettyacademy.com/client/#/dashboard/dash

export class DashboardPage {
  constructor(page) {
    this.page = page;
    this.allProducts = page.locator(`.card-body`);
    this.allProductTitles = page.locator(`.card-body b`);
    this.addToCart_Button = page.locator(`.w-10`);
    this.cartLink = page.locator(`[routerlink='/dashboard/cart']`);
    this.orderHistory_Button = page.locator(`button[routerlink='/dashboard/myorders']`);
  }

  async searchProduct_addToCart(desiredProductName) {
    const productTitles = await this.allProductTitles.allTextContents();
    const productTitlesCount = await this.allProductTitles.count();

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

  async navigateToOrderSummaryPage_UsingOrderID(orderID) {
    await this.page.goto(`https://rahulshettyacademy.com/client/#/dashboard/order-details/` + orderID);
    await this.page.waitForLoadState(`networkidle`);
  }
}
