//Section 19.109: Understand Cucumber Hooks and its implementation process in framework

import { Before, After, BeforeStep, AfterStep, Status } from "@cucumber/cucumber";
import { POManager } from "../../udemy_page_objects/POManager.js";
import { setDefaultTimeout } from "@cucumber/cucumber";

//Import "chromium" object to allow the use of the "chromium.launch()" method.
//You can then use this to create a new browser context, and thus a new page.
import { chromium } from "@playwright/test";

import dotenv from "dotenv";
dotenv.config({ path: ".env" });

setDefaultTimeout(30 * 1000);

Before(async function () {
  //==================================================
  //         Load Required Data from .env
  //==================================================
  this.loginEmail = process.env.LOGIN_EMAIL ?? "";
  this.loginPassword = process.env.LOGIN_PASSWORD ?? "";
  this.creditCardNumber = process.env.CREDIT_CARD_NUMBER ?? "";
  this.CCVCode = process.env.CCV_CODE ?? "";
  this.nameOnCard = process.env.NAME_ON_CARD ?? "";
  this.cardExpiryMonthDate = process.env.CARD_EXPIRY_MONTH ?? "";
  this.cardExpiryDayDate = process.env.CARD_EXPIRY_DAY ?? "";
  this.desiredProductName_1 = process.env.DESIRED_PRODUCT_NAME_1 ?? "";
  //==================================================

  //Here we use the imported "chromium" keyword to get the "browser" object back.
  //We can then get a newContext() from the browser object.
  //This allows you to derive "page" as you usually would in Playwright:
  this.browser = await chromium.launch();
  this.context = await this.browser.newContext();
  this.page = await this.context.newPage();

  //Using "this" means the World constructor gets activated.
  //This means "this.poManager" is stored in this World's constructor.
  //Now "this.poManager" is available throughout this scenario's World.
  this.poManager = new POManager(this.page);
});

BeforeStep(function () {
  //This hook will be executed before all steps in a scenario.
});

AfterStep(async function ({ result }) {
  //This hook will be executed after all steps, and take a screenshot on step failure.
  if (result.status === Status.FAILED) {
    await this.page.screenshot({ path: "screenshots/screenshotGherkin.png" });
  }
});

After(async function () {
  //Playwright closes the browser(s) automatically.
  //But this is where you can tear down any test data if required.
});
