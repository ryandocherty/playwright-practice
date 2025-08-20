//Section 19.106: Create Step Definition files and associate with Cucumber.js config file
//Section 19.107: Implement Code login into StepDefinition file and run Cucumber feature files
//Section 19.108: What is World Constructor? Its usage in Playwright Cucumber

import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { POManager } from "../../udemy_page_objects/POManager";

//Import "Playwright" object to allow the use of the "chromium.launch()" method.
//You can then use this to create a new browser context, and thus a new page.
import { playwright } from "@playwright/test";

Given("the user logs in with {string} and {string}", async function (loginEmail, loginPassword) {
  //Here we use the imported "playwright" keyword to get the "browser" object back.
  //We can then get a newContext() from the browser object.
  //This allows you to derive "page" as you usually would in Playwright:
  const browser = await playwright.chromium.launch();
  const context = await browser.newContext();
  const page = context.newPage();

  //Using "this" means the World constructor gets activated.
  //This means "this.poManager" is stored in this World's constructor.
  //Now "this.poManager" is available throughout this scenario's World.
  this.poManager = new POManager(page);
  const loginPage = this.poManager.getLoginPage();
  await loginPage.goToLoginPage();
  await loginPage.validLogin(loginEmail, loginPassword);
});

When("the user adds {string} to cart", async function (desiredProductName) {
  const dashboardPage = this.poManager.getDashboardPage();
  await dashboardPage.searchProduct_addToCart(desiredProductName);
  await dashboardPage.navigateToCartPage();
});

Then("the product {string} is displayed in the cart", async function (desiredProductName) {
  const cartPage = this.poManager.getCartPage();
  const orderInfoInCart = await cartPage.getOrderInfoInCart();
  const { itemNameInCart } = orderInfoInCart;
  expect(itemNameInCart).toBe(desiredProductName);
  await cartPage.navigateToCheckoutPage();
});

Given("the user enters valid billing information", { timeout: 10 * 1000 }, async function () {
  const checkoutPage = this.poManager.getCheckoutPage();
  await checkoutPage.enterPaymentDetails(creditCardNumber, CCVCode, nameOnCard, cardExpiryMonthDate, cardExpiryDayDate);
  await checkoutPage.enterDeliveryDetails(desiredCountryName);
});

When("the user places the order", async function () {
  const checkoutPage = this.poManager.getCheckoutPage();
  await checkoutPage.placeOrder();
});

Then("verify {string} is present in the Order History page", async function (string) {
  const orderConfirmedPage = this.poManager.getOrderConfirmedPage();
  const orderInfoInOrderConfirmed = await orderConfirmedPage.getOrderInfoInOrderConfirmed();
  const { productNameInOrderConfirmed, priceInOrderConfirmed_Numeric, orderIDInOrderConfirmed } = orderInfoInOrderConfirmed;
  await orderConfirmedPage.navigateToOrderHistoryPage();
  const orderHistoryPage = this.poManager.getOrderHistoryPage();
  await orderHistoryPage.navigateToOrderSummaryPage(orderIDInOrderConfirmed);
  const orderSummaryPage = this.poManager.getOrderSummaryPage();
  const allOrderInfo = await orderSummaryPage.getOrderInfoInOrderSummary();

  const { productNameInOrderSummary } = allOrderInfo;
  expect(productNameInOrderSummary).toBe(desiredProductName);
});
