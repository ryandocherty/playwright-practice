//Section 19.106: Create Step Definition files and associate with Cucumber.js config file
//Section 19.107: Implement Code login into StepDefinition file and run Cucumber feature files
//Section 19.108: What is World Constructor? Its usage in Playwright Cucumber

import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";

Given("the user logs in with a valid email address and password", async function () {
  const loginPage = this.poManager.getLoginPage();
  await loginPage.goToLoginPage();
  await loginPage.validLogin(this.loginEmail, this.loginPassword);
});

When("the user adds a product to the cart", async function () {
  const dashboardPage = this.poManager.getDashboardPage();
  await dashboardPage.searchProduct_addToCart(this.desiredProductName_1);
  await dashboardPage.navigateToCartPage();
});

Then("the product is displayed in the cart", async function () {
  const cartPage = this.poManager.getCartPage();
  const orderInfoInCart = await cartPage.getOrderInfoInCart();
  const { itemNameInCart } = orderInfoInCart;
  expect(itemNameInCart).toBe(this.desiredProductName_1);
  await cartPage.navigateToCheckoutPage();
});

Given(
  "the user enters valid billing information, delivery country {string}",
  { timeout: 15 * 1000 },
  async function (desiredCountryName) {
    const checkoutPage = this.poManager.getCheckoutPage();
    await checkoutPage.enterPaymentDetails(
      this.creditCardNumber,
      this.CCVCode,
      this.nameOnCard,
      this.cardExpiryMonthDate,
      this.cardExpiryDayDate
    );

    //desiredCountryName is coming directly from the .feature file (for demo purposes):
    await checkoutPage.enterDeliveryDetails(desiredCountryName);
  }
);

When("the user places the order", async function () {
  const checkoutPage = this.poManager.getCheckoutPage();
  await checkoutPage.placeOrder();
});

Then("verify the product is present in the Order History page", async function () {
  const orderConfirmedPage = this.poManager.getOrderConfirmedPage();
  const orderInfoInOrderConfirmed = await orderConfirmedPage.getOrderInfoInOrderConfirmed();
  const { orderIDInOrderConfirmed } = orderInfoInOrderConfirmed;
  await orderConfirmedPage.navigateToOrderHistoryPage();
  const orderHistoryPage = this.poManager.getOrderHistoryPage();
  await orderHistoryPage.navigateToOrderSummaryPage(orderIDInOrderConfirmed);
  const orderSummaryPage = this.poManager.getOrderSummaryPage();
  const allOrderInfo = await orderSummaryPage.getOrderInfoInOrderSummary();

  const { productNameInOrderSummary } = allOrderInfo;
  expect(productNameInOrderSummary).toBe(this.desiredProductName_1);
});
