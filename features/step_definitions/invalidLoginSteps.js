import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";

Given("I am on the login page", async function () {
  this.loginPage = this.poManager.getLoginPage();
  await this.loginPage.navigateToLoginPage();
});

When("I attempt to log in without entering ANY email address or password", async function () {
  await this.loginPage.enterLoginDetails("", "");
});

Then("I should see the error messages {string} and {string}", async function (emailErrorMessage, passwordErrorMessage) {
  const emailErrorText = await this.loginPage.emailError_Label.textContent();
  const passwordErrorText = await this.loginPage.passwordError_Label.textContent();
  expect(emailErrorText).toContain(emailErrorMessage);
  expect(passwordErrorText).toContain(passwordErrorMessage);
});

When("I attempt to log in with an invalid email address", async function () {
  await this.loginPage.enterLoginDetails("123", "");
});

Then("I should see the error message {string}", async function (emailErrorMessage) {
  const emailErrorText = await this.loginPage.emailError_Label.textContent();
  expect(emailErrorText).toContain(emailErrorMessage);
});

When("I attempt to log in with a wrong or nonexistent email address", async function () {
  await this.loginPage.enterLoginDetails("123@123.com", "123");
});

Then("I should see the error message toast {string}", async function (errorMessage) {
  const errorMessageText = await this.loginPage.errorMessage_Toast.textContent();
  expect(errorMessageText).toContain(errorMessage);
});
