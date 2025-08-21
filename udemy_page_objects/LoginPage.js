//Section 14.74: What is page object pattern & Importance of its implementation
//Section 14.75: Creating Page objects and action methods for end to end Script - Part 1

//Page Object implementation for the "Login" page of "https://rahulshettyacademy.com/client"
//https://rahulshettyacademy.com/client/#/auth/login

export class LoginPage {
  //Sending "page" as a paremeter to the Constructor.
  //This is because "page" has no meaning/definition in this file.
  constructor(page) {
    //We'll declare the initialisation of the locators in the constructor itself.
    //This means when an object of this Class is created, these vriables will be automatically initialised.
    this.page = page;
    this.signIn_Button = page.locator(`#login`);
    this.userEmail_Input = page.locator(`#userEmail`);
    this.userPassword_Input = page.locator(`#userPassword`);
    this.emailError_Label = page.locator(`div[class='form-group'] div[class='invalid-feedback'] div`);
    this.passwordError_Label = page.locator(`div[class='form-group mb-4'] div[class='invalid-feedback'] div`);
    this.errorMessage_Toast = page.locator(`.toast-bottom-right`);
  }

  async navigateToLoginPage() {
    //This is why we have "this.page = page;" in the Constructor, instead of only passing "page" as a param.
    //We can now use "this.page" whenever we need to use the Page object.
    await this.page.goto("https://rahulshettyacademy.com/client");
  }

  async enterLoginDetails(loginEmail, loginPassword) {
    await this.userEmail_Input.fill(loginEmail);
    await this.userPassword_Input.fill(loginPassword);
    await this.signIn_Button.click();
    await this.page.waitForLoadState(`networkidle`);
  }
}
