//Section 18.101: Build Playwright Pageobject TypeScript files and enforce the typing standards
//Section 18.102: Build Playwright Utility TypeScript files with  enforcing the typing standards

//This file contains a Page Object Manager for my udemy_page_objects_ts.
//This is to help the readability of the actual test file (Section_014_076_Page_Object_Manager.spec.js).

import { Page } from "@playwright/test";
import { CartPage } from "./CartPage";
import { CheckoutPage } from "./CheckoutPage";
import { DashboardPage } from "./DashboardPage";
import { LoginPage } from "./LoginPage";
import { OrderConfirmedPage } from "./OrderConfirmedPage";
import { OrderHistoryPage } from "./OrderHistoryPage";
import { OrderSummaryPage } from "./OrderSummaryPage";

export class POManager {
  /*
In TypeScript, we declare our Class Members with their associated data type before the constructor.
But what is the data type for "loginPage", "dashboardPage" and so on?
Data types are nothing but "what kind of value is passed inside it?"
Well we're passing a Class object called "LoginPage" inside "loginPage", it's not a string, boolean, number etc.
A Class object is passed inside it, so the data type is the object name itself that you're passing.
*/

  page: Page;
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  orderConfirmedPage: OrderConfirmedPage;
  orderHistoryPage: OrderHistoryPage;
  orderSummaryPage: OrderSummaryPage;

  constructor(page: Page) {
    this.page = page;
    this.loginPage = new LoginPage(this.page);
    this.dashboardPage = new DashboardPage(this.page);
    this.cartPage = new CartPage(this.page);
    this.checkoutPage = new CheckoutPage(this.page);
    this.orderConfirmedPage = new OrderConfirmedPage(this.page);
    this.orderHistoryPage = new OrderHistoryPage(this.page);
    this.orderSummaryPage = new OrderSummaryPage(this.page);
  }

  getLoginPage() {
    return this.loginPage;
  }

  getDashboardPage() {
    return this.dashboardPage;
  }

  getCartPage() {
    return this.cartPage;
  }

  getCheckoutPage() {
    return this.checkoutPage;
  }

  getOrderConfirmedPage() {
    return this.orderConfirmedPage;
  }

  getOrderHistoryPage() {
    return this.orderHistoryPage;
  }

  getOrderSummaryPage() {
    return this.orderSummaryPage;
  }
}
