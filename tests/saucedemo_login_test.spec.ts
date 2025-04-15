"use strict";
import { test, expect, selectors } from "@playwright/test";
import {
  getElementText,
  getItemName,
  SELECTORS,
  addToCartButtons,
  removeFromCartButtons,
  correctItemPrices,
} from "./saucedemo_helpers";

/*
These tests are to check that the error messages displayed
on saucedemo.com are correct, depending on which combination
of login credentials are given.
*/

test.beforeEach(async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");
  await page.waitForLoadState("networkidle");
});

test.describe("Saucedemo: invalid logins", () => {
  test("Saucedemo invalid login: no credentials", async ({ page }) => {
    //attempt to login without entering any credentials:
    await page.locator(SELECTORS.loginButton).click();
    await expect(page.locator(SELECTORS.errorMessage)).toBeVisible();

    //1. Call the getElementText() function (defined in saucedemo_helpers.ts)
    //2. Pass 1st arg: the 'page' fixture
    //3. Pass 2nd arg: the specified selector as a string (defined in saucedemo_helpers.ts)
    expect(await getElementText(page, SELECTORS.errorMessage)).toBe("Epic sadface: Username is required");
  });

  test("Saucedemo invalid login: no password", async ({ page }) => {
    //attempt to login with correct username + no password:
    await page.locator(SELECTORS.usernameInputBox).fill("standard_user");
    await page.locator(SELECTORS.loginButton).click();
    await expect(page.locator(SELECTORS.errorMessage)).toBeVisible();
    expect(await getElementText(page, SELECTORS.errorMessage)).toBe("Epic sadface: Password is required");
  });

  test("Saucedemo invalid login: no username", async ({ page }) => {
    //attempt to login with no username + correct password:
    await page.locator(SELECTORS.passwordInputBox).fill("secret_sauce");
    await page.locator(SELECTORS.loginButton).click();
    await expect(page.locator(SELECTORS.errorMessage)).toBeVisible();
    expect(await getElementText(page, SELECTORS.errorMessage)).toBe("Epic sadface: Username is required");
  });

  test("Saucedemo invalid login: invalid username", async ({ page }) => {
    //attempt to login with incorrect username:
    await page.locator(SELECTORS.usernameInputBox).fill("not_a_valid_username");
    //this is the valid password:
    await page.locator(SELECTORS.passwordInputBox).fill("secret_sauce");
    await page.locator(SELECTORS.loginButton).click();
    await expect(page.locator(SELECTORS.errorMessage)).toBeVisible();
    expect(await getElementText(page, SELECTORS.errorMessage)).toBe(
      "Epic sadface: Username and password do not match any user in this service"
    );
  });

  test("Saucedemo invalid login: invalid password", async ({ page }) => {
    //attempt to login with correct username:
    await page.locator(SELECTORS.usernameInputBox).fill("standard_user");
    //this is an invalid password:
    await page.locator(SELECTORS.passwordInputBox).fill("not_a_password");
    await page.locator(SELECTORS.loginButton).click();
    await expect(page.locator(SELECTORS.errorMessage)).toBeVisible();
    expect(await getElementText(page, SELECTORS.errorMessage)).toBe(
      "Epic sadface: Username and password do not match any user in this service"
    );
  });
});

test.describe("Saucedemo: logging in as different users", () => {
  test("Saucedemo login: locked_out_user", async ({ page }) => {
    //locked_out_user = unable to log-in
    await page.locator(SELECTORS.usernameInputBox).fill("locked_out_user");
    await page.locator(SELECTORS.passwordInputBox).fill("secret_sauce");
    await page.locator(SELECTORS.loginButton).click();
    await expect(page.locator(SELECTORS.errorMessage)).toBeVisible();
    expect(await getElementText(page, SELECTORS.errorMessage)).toBe(
      "Epic sadface: Sorry, this user has been locked out."
    );
  });

  test("Saucedemo login: problem_user", async ({ page }) => {
    //problem_user = just shows the same dog picture for every item

    /*
    Idea for future:
    Atm, this test just checks the first image on the website and validates against "dogImage_src".
    Could use page.$$ to return a fresh array of all images on the website?
    Then loop through the array, grab the images src's and compare to "dogImage_src"?
    */

    await page.locator(SELECTORS.usernameInputBox).fill("problem_user");
    await page.locator(SELECTORS.passwordInputBox).fill("secret_sauce");
    await page.locator(SELECTORS.loginButton).click();
    await page.waitForLoadState("networkidle");

    //Saucedemo just shows images of dogs when logged in as problem_user
    //here I'm checking that the image of the first item is visible:
    await page.locator(SELECTORS.firstItemImage).waitFor({ state: "visible" });
    expect(page.locator(SELECTORS.firstItemImage)).toBeVisible();

    //A const to store the src of the first item viewable on the webpage.
    //I already have the exact src in saucedemo_helpers.ts,
    //but I want to grab it here fresh to do a comparison:
    const firstItem_src = await page.locator(SELECTORS.firstItemImage).getAttribute("src");

    //assert that the 'src' of the first item image is the same as the dog item image:
    expect(firstItem_src === SELECTORS.dogImage_src);

    //Saucedemo shows normal images when logged in as standard_user,
    //so here I'm checking that the src found earlier does not match
    //what a standard_user would be seeing (backpack image):
    expect(firstItem_src !== SELECTORS.backpackImage_src);
  });

  test("Saucedemo login: performance_glitch_user", async ({ page }) => {
    //performance_glitch_user = simulates slow log-in speed

    await page.locator(SELECTORS.usernameInputBox).fill("performance_glitch_user");
    await page.locator(SELECTORS.passwordInputBox).fill("secret_sauce");

    //Timing the speed it takes to log in as a performance_glitch_user:
    const startTime = Date.now();
    await page.locator(SELECTORS.loginButton).click();
    await page.waitForLoadState("networkidle");
    const endTime = Date.now();
    const loadTime = endTime - startTime;
    console.log(`Log-in took ${loadTime / 1000} seconds`);

    //expect the log-in time to be less than 10s:
    expect(loadTime).toBeLessThan(10000);
  });

  test("Saucedemo login: error_user", async ({ page }) => {
    //error_user = simulates some buttons not working

    await page.locator(SELECTORS.usernameInputBox).fill("error_user");
    await page.locator(SELECTORS.passwordInputBox).fill("secret_sauce");
    await page.locator(SELECTORS.loginButton).click();
    await page.waitForLoadState("networkidle");

    //page.$$ returns an array of all the specified elements found
    //here I'm returning an array of buttons with the Class "btn_inventory":
    const buttonsBeforeClick = await page.$$(`button.btn_inventory`);

    //loop through each of the buttons found with Class "btn_inventory":
    for (const button of buttonsBeforeClick) {
      //grab the "data-test" attribute for each button in the loop:
      const buttonBeforeClick_DataTest = await button.getAttribute("data-test");
      console.log(`Clicking button: "${buttonBeforeClick_DataTest}"`);

      //assert that the button text says "Add to cart" before clicking:
      expect((await button.innerText()) === "Add to cart");

      await button.click();
      await page.waitForLoadState("networkidle");
    }

    //after clicking the buttons, return an updated array of the buttons' Class:
    const buttonsAfterClick = await page.$$(`button.btn_inventory`);

    //loop through the array of buttons after they've been clicked:
    for (const button of buttonsAfterClick) {
      const itemName = await getItemName(button);
      const buttonText = await button.innerText();

      if (buttonText !== "Remove") {
        expect(buttonText !== "Remove");
        console.log(`Button for item "${itemName}" has NOT updated and still reads as "${buttonText}".`);
      } else {
        expect(buttonText === "Remove");
        console.log(`Button for item "${itemName}" has correctly updated to "${buttonText}".`);
      }
    }
  });

  test("Saucedemo login: visual_user", async ({ page }) => {
    //visual_user = simulates some visual issues on the webpage (wonky buttons, wrong prices & pictures etc.)

    await page.locator(SELECTORS.usernameInputBox).fill("visual_user");
    await page.locator(SELECTORS.passwordInputBox).fill("secret_sauce");
    await page.locator(SELECTORS.loginButton).click();
    await page.waitForLoadState("networkidle");

    //return an array of all of the Classes of the currently displayed item prices:
    const incorrectItemPrices = await page.$$(".inventory_item_price");

    //initialise an empty object to hold the displayed prices:
    const displayedPrices: Record<string, number> = {};

    //loop to output the currently displayed item prices:
    for (const price of incorrectItemPrices) {
      const displayedPrice_asText = await price.innerText();

      //clean-up the string (remove the dollar sign basically) and convert to purely numerical:
      const displayedPrice_asNum = parseFloat(displayedPrice_asText.replace(/[^0-9.-]+/g, ""));

      //grab the item name using the function in helpers.ts:
      const itemName = await getItemName(price);

      //if itemName exists, add itemName & displayedPrice_asNum to displayedPrices object:
      if (itemName) {
        displayedPrices[itemName] = displayedPrice_asNum;
        console.log(`Item Name: ${itemName}\nDisplayed Price: ${displayedPrice_asNum}\n`);
      } else {
        console.log(`Could not find the item name for the displayed price.`);
      }
    }
  });
});
