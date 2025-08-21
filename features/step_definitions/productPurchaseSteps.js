//Section 19.106: Create Step Definition files and associate with Cucumber.js config file
//Section 19.107: Implement Code login into StepDefinition file and run Cucumber feature files
//Section 19.108: What is World Constructor? Its usage in Playwright Cucumber

import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";

Given("the user logs in with a valid email address and password", async function () {
  //Login using the credentials provided in the .env file:
  const loginPage = this.poManager.getLoginPage();
  await loginPage.navigateToLoginPage();
  await loginPage.enterLoginDetails(this.loginEmail, this.loginPassword);
});

When("the user adds a product to the cart", async function () {
  //Go to the "Dashboard" page and add the desired product to the cart:
  const dashboardPage = this.poManager.getDashboardPage();
  await dashboardPage.searchProduct_addToCart(this.desiredProductName_1);

  //Go to the "Cart" page:
  await dashboardPage.navigateToCartPage();
});

Then("the product is displayed in the cart", async function () {
  const cartPage = this.poManager.getCartPage();
  const { itemNameInCart } = await cartPage.getOrderInfoInCart();

  //Assert that the correct product is showing in the "Cart" page:
  expect(itemNameInCart).toBe(this.desiredProductName_1);

  //Go to the "Checkout" page:
  await cartPage.navigateToCheckoutPage();
});

Given("the user enters valid billing information, delivery country {string}", async function (desiredCountryName) {
  const checkoutPage = this.poManager.getCheckoutPage();

  //Enter the billing information provided in the .env file:
  await checkoutPage.enterPaymentDetails(
    this.creditCardNumber,
    this.CCVCode,
    this.nameOnCard,
    this.cardExpiryMonthDate,
    this.cardExpiryDayDate
  );

  //Enter the delivery information:
  //desiredCountryName is coming directly from the .feature file (for demo purposes):
  await checkoutPage.enterDeliveryDetails(desiredCountryName);
});

When("the user places the order", async function () {
  const checkoutPage = this.poManager.getCheckoutPage();

  //Place the order:
  await checkoutPage.placeOrder();
});

Then("verify the product is present in the Order History page", async function () {
  //Go to "Order Confirmed" page and grab the orderID:
  const orderConfirmedPage = this.poManager.getOrderConfirmedPage();
  const { orderIDInOrderConfirmed } = await orderConfirmedPage.getOrderInfoInOrderConfirmed();

  //Go to "Order History" page:
  await orderConfirmedPage.navigateToOrderHistoryPage();
  const orderHistoryPage = this.poManager.getOrderHistoryPage();

  //Go to "Order Summary" page using the orderID:
  await orderHistoryPage.navigateToOrderSummaryPage(orderIDInOrderConfirmed);
  const orderSummaryPage = this.poManager.getOrderSummaryPage();

  //Grab the product name displayed in the "Order Summary" page.
  //Assert that it's displaying the correct product name:
  const { productNameInOrderSummary } = await orderSummaryPage.getOrderInfoInOrderSummary();
  expect(productNameInOrderSummary).toBe(this.desiredProductName_1);
});
