import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";

Given("user is on the login page", async function () {
  this.loginPage = this.poManager.getLoginPage();
  await this.loginPage.navigateToLoginPage();
});

When("user attempts to log in with {string} and {string}", async function (emailAddress, password) {
  //Storing the "emailAddress" and "password" parameters in the World object.
  //This is so I can use them in a switch-case statement in the next step.
  this.emailAddress = emailAddress;
  this.password = password;

  console.log(`Attempting login with "${emailAddress}" and "${password}"`);
  await this.loginPage.enterLoginDetails(emailAddress, password);
});

Then("user should see an error message", async function () {
  switch (this.emailAddress) {
    case "":
      //Email is empty/blank:
      const [emailErrorText, passwordErrorText] = await Promise.all([
        this.loginPage.emailError_Label.textContent(),
        this.loginPage.passwordError_Label.textContent(),
      ]);
      expect(emailErrorText).toContain("Email is required");
      expect(passwordErrorText).toContain("Password is required");
      break;

    case "123@123.com":
      //Email address is nonexistent:
      const errorMessageText = await this.loginPage.errorMessage_Toast.textContent();
      expect(errorMessageText).toContain("Incorrect email or password");
      break;

    default:
      throw new Error(`Unhandled login scenario with ${this.emailAddress}`);
  }
});
