import { Given, When, Then } from "@cucumber/cucumber";
import { POManager } from "../../udemy_page_objects/POManager";

//Import "Playwright" keyword to allow the use of the "chromium.launch()" method.
//You can then use this to create a new browser context, and thus a new page.
import { playwright } from "@playwright/test";

Given("the user logs in with {loginEmail} and {loginPassword}", async function (loginEmail, loginPassword) {
  //Here we use the imported "playwright" keyword to get the "browser" object back.
  //We can then get a newContext() from the browser object.
  //This allows you to derive "page" as you usually would in Playwright:
  const browser = await playwright.chromium.launch();
  const context = await browser.newContext();
  const page = context.newPage();

  const poManager = new POManager(page);
  const loginPage = poManager.getLoginPage();
  await loginPage.goToLoginPage();
  await loginPage.validLogin(loginEmail, loginPassword);
});

When("the user adds {string} to cart", async function (string) {
  const dashboardPage = poManager.getDashboardPage();
  await dashboardPage.searchProduct_addToCart(desiredProductName);
  await dashboardPage.navigateToCartPage();
});

Then("the product {string} is displayed in the cart", async function (string) {
  const cartPage = poManager.getCartPage();
  const orderInfoInCart = await cartPage.getOrderInfoInCart();
  const { itemNameInCart } = orderInfoInCart;
  //Write "expect itemNameInCart to be desiredProductName" here
  await cartPage.navigateToCheckoutPage();
});

Given("the user enters valid billing information", async function () {
  const checkoutPage = poManager.getCheckoutPage();
  await checkoutPage.enterPaymentDetails(creditCardNumber, CCVCode, nameOnCard, cardExpiryMonthDate, cardExpiryDayDate);
  await checkoutPage.enterDeliveryDetails(desiredCountryName);
});

When("the user places the order", async function () {
  const checkoutPage = poManager.getCheckoutPage();
  await checkoutPage.placeOrder();
});

Then("verify {string} is present in the Order History page", async function (string) {
  const orderConfirmedPage = poManager.getOrderConfirmedPage();
  const orderInfoInOrderConfirmed = await orderConfirmedPage.getOrderInfoInOrderConfirmed();
  const { productNameInOrderConfirmed, priceInOrderConfirmed_Numeric, orderIDInOrderConfirmed } = orderInfoInOrderConfirmed;
  await orderConfirmedPage.navigateToOrderHistoryPage();
  const orderHistoryPage = poManager.getOrderHistoryPage();
  await orderHistoryPage.navigateToOrderSummaryPage(orderIDInOrderConfirmed);
  const orderSummaryPage = poManager.getOrderSummaryPage();
  const allOrderInfo = await orderSummaryPage.getOrderInfoInOrderSummary();

  const { productNameInOrderSummary } = allOrderInfo;
  //Write "expect productNameInOrderSummary to be desiredProductName" here
});
