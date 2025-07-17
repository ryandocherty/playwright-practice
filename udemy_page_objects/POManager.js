//Section 14.76: Creating Page objects and action methods for end to end Script - Part 2

//This file contains a Page Object Manager for my udemy_page_objects.
//This is to help thwe readability of the actual test file (Section_014_076_Page_Object_Manager.spec.js).

import { CartPage } from "./CartPage";
import { CheckoutPage } from "./CheckoutPage";
import { DashboardPage } from "./DashboardPage";
import { LoginPage } from "./LoginPage";
import { OrderConfirmedPage } from "./OrderConfirmedPage";
import { OrderHistoryPage } from "./OrderHistoryPage";
import { OrderSummaryPage } from "./OrderSummaryPage";

export class POManager {
  constructor(page) {
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
