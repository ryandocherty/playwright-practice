//Section 14.75: Creating Page objects and action methods for end to end Script - Part 1

//Page Object implementation for the "Cart" page of "https://rahulshettyacademy.com/client"
//https://rahulshettyacademy.com/client/#/dashboard/cart

export class CartPage {
  constructor(page) {
    this.page = page;
    this.itemNameInCart_Locator = page.locator(`div[class='cartSection'] h3`);
    this.itemPriceInCart_Locator = page.locator(`.prodTotal`);
    this.checkout_Button = page.locator(`button:has-text("Checkout")`);
  }

  async getOrderInfoInCart() {
    //TODO: Maybe I should clear the cart first?
    await this.page.waitForLoadState(`networkidle`);
    const itemNameInCart_Text = await this.itemNameInCart_Locator.textContent();
    const priceInCart_Text = await this.itemPriceInCart_Locator.textContent();

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
