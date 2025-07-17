//Section 14.75: Creating Page objects and action methods for end to end Script - Part 1

//Page Object implementation for the "Cart" page of "https://rahulshettyacademy.com/client"
//https://rahulshettyacademy.com/client/#/dashboard/cart

export class CartPage {
  constructor(page) {
    this.page = page;
    this.itemNameInCart_Locator = page.locator(`div[class='cartSection'] h3`);
    this.itemNumberInCart_Locator = page.locator(`.itemNumber`);
    this.itemPriceInCart_Locator = page.locator(`.prodTotal`);
    this.grandTotalInCart_Locator = page.locator(`.value`);
    this.checkout_Button = page.locator(`button:has-text("Checkout")`);
  }

  //Could maybe have some methods to just grab the order details as they appear in the Cart?
  //Then perform the assertions in the test file?

  async getOrderInfoInCart() {
    const itemNameInCart_Text = await this.itemNameInCart_Locator.textContent();
    const itemNumberInCart_Text = await this.itemNumberInCart_Locator.textContent();
    const priceInCart_Text = await this.itemPriceInCart_Locator.textContent();
    const grandTotalInCart_Text = await this.grandTotalInCart_Locator.nth(1).textContent();

    const itemNameInCart = itemNameInCart_Text.trim();
    const itemNumberInCart = itemNumberInCart_Text.trim();
    const priceInCart = priceInCart_Text.trim();
    const grandTotalInCart = grandTotalInCart_Text.trim();

    const priceInCart_Numeric = parseFloat(priceInCart?.replace(/[^0-9.]+/g, ""));
    const grandTotalInCart_Numeric = parseFloat(grandTotalInCart?.replace(/[^0-9.]+/g, ""));

    const orderInfoInCart = {
      itemNameInCart,
      itemNumberInCart,
      priceInCart_Numeric,
      grandTotalInCart_Numeric,
    };

    return orderInfoInCart;
  }

  async navigateToCheckoutPage() {
    await this.checkout_Button.click();
    await this.page.waitForLoadState(`networkidle`);
  }
}
