//----------Helper file for Udemy tutotials----------

export const SELECTORS_LOGINPRACTICE = {
  userNameInputBox: `#username`,
  passwordInputBox: `[type="password"]`,
  signInButton: `#signInBtn`,
  dropDownBox: `select.form-control`,
  cardTitles: `.card-title a`,
  radioButtons: `.radiotextsty`,
  popUp_OkayButton: `#okayBtn`,
  popUp_CancelButton: `#cancelBtn`,
  termsCheckBox: `#terms`,
  blinkingTextLink: `.blinkingText`,
};

export const SELECTORS_CLIENT = {
  registerAccountLink: `.login-wrapper-footer-text`,
  userEmailInput: `#userEmail`,
  userPasswordInput: `#userPassword`,
  loginButton: `#login`,
  productTitles: `.card-body b`,
  addToCartButtons: `.card-body i`,
};

/*if (desiredMonthNumber.startsWith(`0`)) {
    const selectedDeliveryMonth_firstDigit: any = await page_TopDeals
      .locator(`.react-date-picker__inputGroup__leadingZero`)
      .first()
      .textContent();

    const selectedDeliveryMonth_secondDigit: any = await page_TopDeals
      .locator(`.react-date-picker__inputGroup__month`)
      .getAttribute(`value`);

    const finalDeliveryMonth = selectedDeliveryMonth_firstDigit + selectedDeliveryMonth_secondDigit;
    console.log(`Final delivery month: ${finalDeliveryMonth}`);
    expect(finalDeliveryMonth).toBe(desiredMonthNumber);
  } else {
    const selectedDeliveryMonth: any = await page_TopDeals
      .locator(`.react-date-picker__inputGroup__month`)
      .getAttribute(`value`);

    console.log(`Final delivery month: ${selectedDeliveryMonth}`);
    expect(selectedDeliveryMonth).toBe(desiredMonthNumber);
  }

  if (desiredDay.startsWith(`0`)) {
    const selectedDeliveryDay_firstDigit: any = await page_TopDeals
      .locator(`.react-date-picker__inputGroup__leadingZero`)
      .nth(1)
      .textContent();

    const selectedDeliveryDay_secondDigit: any = await page_TopDeals
      .locator(`.react-date-picker__inputGroup__day`)
      .getAttribute(`value`);

    const finalDeliveryDay = selectedDeliveryDay_firstDigit + selectedDeliveryDay_secondDigit;
    console.log(`Final delivery day: ${finalDeliveryDay}`);
    expect(finalDeliveryDay).toBe(desiredDay);
  } else {
    const selectedDeliveryDay: any = await page_TopDeals
      .locator(`.react-date-picker__inputGroup__day`)
      .getAttribute(`value`);

    console.log(`Final delivery day: ${selectedDeliveryDay}`);
  }

  const selectedDeliveryYear = await page
    .locator(`.react-date-picker__inputGroup__year`)
    .getAttribute(`value`);

  console.log(`Final delivery year: ${selectedDeliveryYear}`); */
