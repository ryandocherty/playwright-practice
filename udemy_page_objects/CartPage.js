//Section 14.75: Creating Page objects and action methods for end to end Script - Part 1

//Page Object implementation for the "Cart" page of "https://rahulshettyacademy.com/client"
//https://rahulshettyacademy.com/client/#/dashboard/cart

export class CartPage {
  constructor(page) {
    this.page = page;
    this.itemInCart_Text = page.locator(`div[class='cartSection'] h3`);
    this.priceInCart_Text = page.locator(`.prodTotal`);
    this.checkout_Button = page.locator(`button:has-text("Checkout")`);
  }

  //Could maybe have some methods to just grab the order details as they appear in the Cart?
  //Then perform the assertions in the test file?

  async navigateToCheckoutPage() {
    await this.checkout_Button.click();
    await this.page.waitForLoadState(`networkidle`);
  }
}
