//Section 10.46: Playwright request method to make API calls and grab response - Example
//Section 10.47: Parsing API response & passing token to browser local storage with Playwright

//For this test I want to:
//Rewrite "Section_008_037_EndToEnd_Rewrite_getBy.spec.ts" to introduce a login API.

//Include "request" when planning on web API testing:
import { test, expect, request } from "@playwright/test";
import dotenv from "dotenv";

//Load hidden environment variables:
dotenv.config({ path: ".env" });

//Still loading the email/password from .env file:
const loginEmail = process.env.LOGIN_EMAIL ?? "";
const loginPassword = process.env.LOGIN_PASSWORD ?? "";

//Storing loginToken outside test blocks so it's shared:
let loginToken: any;

test.beforeAll(async () => {
  //test.beforeAll() - this code block will get executed once before all subsequent tests.

  //The "request.newContext()" method allows you to create a new context for making API requests.
  //This is similar to using "browser.newContext()" to create a new instance of the "browser" fixture.
  //You can pass information to the newContext() such as baseURL, HTTPHeaders, proxy stuff etc.
  //For now we'll keep the context empty.
  const APIContext = await request.newContext();

  //Note - "Inspect > Network > Headers/Payload/Response" displays the info/data required here.
  //The first API call/request we need to make is a "login" call, which is a type of "POST" call.
  //We then provide the data needed to make this call:
  //1. The URL/endpoint (the API URL, not the normal one).
  //2. The payload data (email & password), which we can store as a variable.
  const loginPayload = { userEmail: loginEmail, userPassword: loginPassword };
  const loginResponse = await APIContext.post(`https://rahulshettyacademy.com/api/ecom/auth/login`, {
    data: loginPayload,
  });

  //We then just need to assert that loginResponse was successful.
  //We can use .ok() for the assertion,
  //which is a boolean stating whether the response was successful (status in the range 200-299) or not.
  expect(loginResponse.ok()).toBeTruthy();

  //Now we need to grab the JSON response (loginResponse) to be able to retrieve the session token.
  //Using loginResponse.json() returns the JSON representation of response body.
  //You can see the format of this in Inspect > Network > Response.
  const loginResponseJSON = await loginResponse.json();

  //The "loginResponseJSON" object now contains 3 objects:
  //1. token
  //2. userID
  //3. message
  //We then just need to grab the token, which we can store in a variable.
  loginToken = loginResponseJSON.token;
  console.log(loginToken);
});

test("Udemy: Login using API", async ({ page }) => {
  /*---------------------------------------Inject Login Token------------------------------------*/
  /*---------------------------------------------------------------------------------------------*/
  //Here is where we'll inject loginToken to avoid repeatedly logging in.
  //By default, Playwright does not have the ability to insert the token into browser local storage.
  //However, general JavaScript DOES have this ability, and Playwright can execute any JS expressions.
  //To do this, we'll use "addInitScript()", which is an initialisation script.
  //We can insert JavaScript code inside this script.
  //We'll use this to store the login token/cookie.

  //1. We call page.addInitScript() to inject a script into the page before any other scripts.
  //2. The browser runs the function "(value) => {window.localStorage.setItem(`token`, value);}".
  //3. The "value" parameter inside the function is automatically filled with whatever was passed as the second argument,
  //   which is the value of "loginToken".
  //4. It executes "window.localStorage.setItem('token', loginToken)", which stores the login token in the browser’s local storage.
  await page.addInitScript((value) => {
    window.localStorage.setItem(`token`, value);
  }, loginToken);

  //Previously we would go to this page and then manually login.
  //But now that we've injected the loginToken, this page will direct to the dashboard/produtcs page.
  await page.goto("https://rahulshettyacademy.com/client");

  /*-------------------------------------Products page-------------------------------------------*/
  /*---------------------------------------------------------------------------------------------*/
  await page.waitForLoadState(`networkidle`); //without this, productTitles below weren't being grabbed.
  const productTitles = await page.locator(`.card-body b`).allTextContents();
  const productsTitles_count = await page.locator(`.card-body b`).count();

  console.log(`Number of products found: ${productsTitles_count}`);
  console.table(productTitles);

  const targetProductName = `ZARA COAT 3`;
  const targetCountry = `United Kingdom`;

  console.log(`Target Product: ${targetProductName}`);
  console.log(`Target Country: ${targetCountry}`);

  //1. Locate "card-body" classes (each available product has this class).
  //2. Filter these "card-body" classes down to one containing text "ZARA COAT 3".
  //3. Then within this single "card-body" class, locate a button with name "Add to Cart".
  //4. Click this "Add to Cart" button.
  const addToCartButton_Element = page
    .locator(`.card-body`)
    .filter({ hasText: targetProductName })
    .getByRole(`button`, { name: ` Add To Cart` });

  expect(addToCartButton_Element).toBeVisible();
  await addToCartButton_Element.click();
  console.log(`Clicking 'Add to Cart' for ${targetProductName}...`);

  const price_ProductsPage_Element = page
    .locator(`.card-body`)
    .filter({ hasText: targetProductName })
    .locator(`.text-muted`);

  expect(price_ProductsPage_Element).toBeVisible();
  const price_ProductsPage: any = await price_ProductsPage_Element.textContent();

  //Convert "price_ProductsPage" to purely numeric:
  const price_ProductsPage_Numeric: number = parseFloat(price_ProductsPage?.replace(/[^0-9.-]+/g, ``));

  console.log(`Price (products page): $${price_ProductsPage_Numeric}`);

  //There are 3 buttons named "Add to Cart", the one I want is just the "Cart" button, so I need to:
  //1. Locate element(s) with "listitem" parent (only the "Cart" button has this).
  //2. Then within "listitem" parent, locate a button with name "Cart".
  expect(page.getByRole(`listitem`).getByRole(`button`, { name: `  Cart ` })).toBeVisible();
  await page.getByRole(`listitem`).getByRole(`button`, { name: `  Cart ` }).click();
  console.log(`Clicking 'Cart'...`);

  /*-------------------------------------Cart page-----------------------------------------------*/
  /*---------------------------------------------------------------------------------------------*/
  await page.getByRole(`button`).filter({ hasText: `Checkout` }).waitFor();

  //Grabbing the element separately before extracting the text.
  //This is so I can use toBeVisible() later on.
  const productName_InCart_Element = page
    .locator(`.cartSection`)
    .filter({ hasText: targetProductName })
    .getByRole(`heading`);

  //Grab the name of the product once it's inside the cart:
  const productName_InCart = await productName_InCart_Element.textContent();

  const price_InCart_Element: any = page
    .locator(`.cartSection`)
    .filter({ hasText: targetProductName })
    .getByRole(`paragraph`)
    .filter({ hasText: `MRP` });

  //Grab the price of the product once it's inside the cart:
  const price_InCart = await price_InCart_Element.textContent();
  //Convert "price_InCart" to purely numeric:
  const price_InCart_Numeric: number = parseFloat(price_InCart?.replace(/[^0-9.-]+/g, ``));

  console.log(`Price (in cart): $${price_InCart_Numeric}`);
  console.log(`Name (in cart): ${productName_InCart?.trim()}`);

  //Expect the product name & price to still be the same:
  expect(page.getByText(targetProductName)).toBeVisible();
  expect(productName_InCart_Element).toBeVisible();
  expect(price_InCart_Element).toBeVisible();
  expect(productName_InCart).toBe(targetProductName);
  expect(price_InCart_Numeric).toEqual(price_ProductsPage_Numeric);

  /*------------------------------------Checkout Page--------------------------------------------*/
  /*---------------------------------------------------------------------------------------------*/
  //Click the "Checkout" button:
  const checkoutButton = page.getByRole(`button`, { name: `Checkout` });
  expect(checkoutButton).toBeVisible();
  await checkoutButton.click();
  console.log(`Clicking 'Checkout'...`);

  //Enter a credit cart number:
  const creditCardNumberInput = page.getByRole(`textbox`).first();
  expect(creditCardNumberInput).toBeEditable();
  await creditCardNumberInput.clear();
  await creditCardNumberInput.pressSequentially(`1234 5678 9012 3456`, { delay: 100 });

  //Enter a CVV number:
  const CVVCodeInput = page.getByRole(`textbox`).nth(1);
  expect(CVVCodeInput).toBeEditable();
  await CVVCodeInput.clear();
  await CVVCodeInput.pressSequentially(`420`, { delay: 100 });

  //Enter the name on the credit card:
  const nameOnCardInput = page.getByRole(`textbox`).nth(2);
  expect(nameOnCardInput).toBeEditable();
  await nameOnCardInput.clear();
  await nameOnCardInput.pressSequentially(`Duane Dibbley`, { delay: 100 });

  //Enter a coupon code (optional):
  const couponCodeInput = page.getByRole(`textbox`).nth(3);
  const applyCouponButton = page.getByRole(`button`, { name: `Apply Coupon` });
  expect(couponCodeInput).toBeEditable();
  expect(applyCouponButton).toBeEnabled();
  await couponCodeInput.pressSequentially(`420`, { delay: 100 });
  await couponCodeInput.clear();

  //Enter an credit card expiry month:
  const expiryDate_Month = page.getByRole(`combobox`).first();
  expect(expiryDate_Month).toBeEnabled();
  await expiryDate_Month.selectOption(`12`);

  //Enter an credit card expiry day:
  const expiryDate_Day = page.getByRole(`combobox`).nth(1);
  expect(expiryDate_Day).toBeEnabled();
  await expiryDate_Day.selectOption(`21`);

  //Email address is automatically entered, just need to assert it's visible:
  const emailAddressDisplay = page.getByText(loginEmail);
  expect(emailAddressDisplay).toBeVisible();

  //Enter shipping country:
  const selectCountryInput = page.getByPlaceholder(`Select Country`);
  expect(selectCountryInput).toBeEnabled();
  await selectCountryInput.pressSequentially(`United`);
  await page.getByRole(`button`, { name: ` United Kingdom` }).click();
  console.log(`Selecting Country: ${targetCountry}...`);

  /*------------------------------------Order Confirmed Page-------------------------------------*/
  /*---------------------------------------------------------------------------------------------*/
  //Click the "Place Order" button:
  await page.getByText(`Place Order `).click();
  console.log(`Clicking 'Place Order'...`);

  //Assert the correct product name and price is displayed:

  expect(page.getByText(targetProductName)).toBeVisible();
  expect(page.getByText(price_ProductsPage)).toBeVisible();

  //Grab order ID displayed on the confirmation page.
  //This regex matches text that starts and ends with "|" (the format of all order ID's):
  const orderId_raw: any = await page.getByText(/^\s*\|.*\|\s*$/).textContent();

  //Clean up the order ID (remove "|" symbols and trim it):
  const orderId = orderId_raw?.replace(/\|/g, ``).trim();
  console.log(`Order ID: ${orderId}`);

  /*------------------------------------Order History Page---------------------------------------*/
  /*---------------------------------------------------------------------------------------------*/
  //Click the "Orders" link:
  const ordersButton = page.getByRole(`button`, { name: `  ORDERS` });
  expect(ordersButton).toBeVisible();
  await ordersButton.click();
  console.log(`Clicking 'Orders'...`);

  //For safety, wait for the "Your Orders" header to load before continuing to interact:
  await page.getByRole(`heading`, { name: `Your Orders` }).waitFor();

  //Assert that the orderID, product name, and price are visible on the Order History page:
  expect(page.getByText(orderId).first()).toBeVisible();
  expect(page.getByText(targetProductName).first()).toBeVisible();
  expect(page.getByText(price_ProductsPage).first()).toBeVisible();

  /*------------------------------------Order Summary Page-----------------------------------*/
  /*-----------------------------------------------------------------------------------------*/
  //1. Locate the table rows (max of 7 rows displayed)
  //2. Filter the rows to the one that contains the recent orderID
  //3. On this single row, locate the "View" button and click it
  const viewButton = page.locator(`tr`).filter({ hasText: orderId }).getByRole(`button`, { name: `View` });
  expect(viewButton).toBeVisible();
  await viewButton.click();
  console.log(`Clicking 'View'...`);

  //Wait for the "Order Summary" title to load before continuing to interact:
  await page.locator(`.email-title`).first().waitFor();

  //Assert all of the correct information is visible on the "Order Summary" page:
  expect(page.getByText(loginEmail).first()).toBeVisible();
  expect(page.getByText(orderId)).toBeVisible();
  expect(page.getByText(targetProductName).first()).toBeVisible();
  expect(page.getByText(targetCountry).first()).toBeVisible();
  expect(page.getByText(price_ProductsPage).first()).toBeVisible();
});
