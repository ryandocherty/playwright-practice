//Section 14.75: Creating Page objects and action methods for end to end Script - Part 1

//Page Object implementation for the "Checkout" page of "https://rahulshettyacademy.com/client"
//https://rahulshettyacademy.com/client/#/dashboard/order?...

export class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.textInputs = page.locator(`input[type="text"]`);
    this.comboboxInputs = page.locator(`.ddl`);
    this.couponCodeInput = page.locator('input[name="coupon"]');
    this.applyCoupon_Button = page.locator(".mt-1");
    this.selectCountryInput = page.locator(`[placeholder*="Country"]`);
    this.selectCountryList = page.locator(`.ta-results`);
    this.selectCountryListOptions = page.locator(`.ta-results button`);
    this.placeOrder_Button = page.locator(`.action__submit`);
  }

  async enterPaymentDetails(creditCardNumber, CCVCode, nameOnCard, cardExpiryMonthDate, cardExpiryDayDate) {
    await this.textInputs.nth(0).clear();
    await this.textInputs.nth(1).clear();
    await this.textInputs.nth(2).clear();

    await this.textInputs.nth(0).pressSequentially(creditCardNumber, { delay: 100 });
    await this.textInputs.nth(1).pressSequentially(CCVCode, { delay: 100 });
    await this.textInputs.nth(2).pressSequentially(nameOnCard, { delay: 100 });
    await this.comboboxInputs.nth(0).selectOption(cardExpiryMonthDate);
    await this.comboboxInputs.nth(1).selectOption(cardExpiryDayDate);

    await this.page.waitForLoadState(`networkidle`);
  }

  async enterDeliveryDetails(desiredCountryName) {
    await this.selectCountryInput.pressSequentially(desiredCountryName);
    await this.selectCountryList.waitFor();

    let selectCountryListOptions_count = await this.selectCountryListOptions.count();

    for (let i = 0; i < selectCountryListOptions_count; i++) {
      let countryListText = await this.selectCountryListOptions.nth(i).textContent();
      if (countryListText?.trim() === desiredCountryName) {
        console.log(`Selecting country: ${countryListText.trim()}`);
        await this.selectCountryListOptions.nth(i).click();
        break;
      }
    }
    await this.page.waitForLoadState(`networkidle`);
  }

  async placeOrder() {
    await this.placeOrder_Button.click();
    await this.page.locator(`.hero-primary`).waitFor();
  }
}
