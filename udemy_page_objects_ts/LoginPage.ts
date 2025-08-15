//Section 18.101: Build Playwright Pageobject TypeScript files and enforce the typing standards
//Section 18.102: Build Playwright Utility TypeScript files with enforcing the typing standards

//This file is a TypeScript refactor of "udemy_page_objects\LoginPage.js"

//Page Object implementation for the "Login" page of "https://rahulshettyacademy.com/client"
//https://rahulshettyacademy.com/client/#/auth/login

import { Page, Locator } from "@playwright/test";

export class LoginPage {
  page: Page;
  signIn_Button: Locator;
  userEmail_Input: Locator;
  userPassword_Input: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signIn_Button = page.locator(`#login`);
    this.userEmail_Input = page.locator(`#userEmail`);
    this.userPassword_Input = page.locator(`#userPassword`);
  }

  async goToLoginPage() {
    await this.page.goto("https://rahulshettyacademy.com/client");
  }

  async validLogin(loginEmail: string, loginPassword: string) {
    await this.userEmail_Input.fill(loginEmail);
    await this.userPassword_Input.fill(loginPassword);
    await this.signIn_Button.click();
    await this.page.waitForLoadState(`networkidle`);
  }
}
