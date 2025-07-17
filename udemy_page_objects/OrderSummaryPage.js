//Section 14.75: Creating Page objects and action methods for end to end Script - Part 1

//Page Object implementation for the "Order History" page of "https://rahulshettyacademy.com/client"
//https://rahulshettyacademy.com/client/#/dashboard/order-details...

export class OrderSummaryPage {
  constructor(page) {
    this.page = page;
    this.orderID_Locator = page.locator(`.col-text`);
    this.addresses_Locator = page.locator(`div[class="address"] p`);
    this.productName_Locator = page.locator(`.title`);
    this.productPrice_Locator = page.locator(`.price`);
  }

  async getOrderInfoInOrderSummary() {
    const orderIDInOrderSummary_Text = await this.orderID_Locator.textContent();
    const billingEmailInOrderSummary_Text = await this.addresses_Locator.nth(0).textContent();
    const billingCountryInOrderSummary_Text = await this.addresses_Locator.nth(1).textContent();
    const deliveryEmailInOrderSummary_Text = await this.addresses_Locator.nth(2).textContent();
    const deliveryCountryInOrderSummary_Text = await this.addresses_Locator.nth(3).textContent();
    const productNameInOrderSummary_Text = await this.productName_Locator.textContent();
    const productPriceInOrderSummary_Text = await this.productPrice_Locator.textContent();

    const orderIDInOrderSummary = orderIDInOrderSummary_Text.trim();
    const billingEmailInOrderSummary = billingEmailInOrderSummary_Text.trim();
    const billingCountryInOrderSummary = billingCountryInOrderSummary_Text.trim().split("- ")[1];
    const deliveryEmailInOrderSummary = deliveryEmailInOrderSummary_Text.trim();
    const deliveryCountryInOrderSummary = deliveryCountryInOrderSummary_Text.trim().split("- ")[1];
    const productNameInOrderSummary = productNameInOrderSummary_Text.trim();
    const productPriceInOrderSummary = productPriceInOrderSummary_Text.trim();
    const productPriceInOrderSummary_Numeric = parseFloat(productPriceInOrderSummary?.replace(/[$ ]+/g, ""));

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
