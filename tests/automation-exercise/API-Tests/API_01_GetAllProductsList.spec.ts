/*
https://www.automationexercise.com/api_list


================================
API 1: Get All Products List
================================
API URL: https://automationexercise.com/api/productsList
Request Method: GET
Response Code: 200
Response JSON: All products list


================================
Test Case(s)
================================

1. Verify all orders appear as expected on the website. 
    Compare API call "/productsList" to an array of selected productName elements.
*/

import { test, expect, request } from "@playwright/test";

let APIContext: any;
const rd_email: string = "emailaddress@email.com";
const rd_password: string = "Password1!";

//Define the loginPayload, in URL-encoded data format.
//This will produce something like: "email=youremail%40example.com&password=yourpassword".
const loginPayload = new URLSearchParams();
loginPayload.append("email", rd_email);
loginPayload.append("password", rd_password);

test.beforeAll(async () => {
  //Create new API context to switch to API mode:
  APIContext = await request.newContext();
});

test.describe("API Practice: api/productsList", () => {
  test("Verify products list is returned when using GET api/productsList", async () => {
    //API URL: https://automationexercise.com/api/productsList
    //Using GET should work with this API, and return a list of products and their details.

    const productsListResponse = await APIContext.get("https://automationexercise.com/api/productsList");
    console.log(`GET productsList Response Status: ${productsListResponse.status()}`);
    expect(productsListResponse.ok()).toBeTruthy();
    const productsListResponse_JSON = await productsListResponse.json();

    //Expected Response Code for GET: 200
    //Expected Response JSON: All products list
    expect(productsListResponse_JSON.responseCode).toBe(200);
    console.log(`productsListResponse_JSON code: ${productsListResponse_JSON.responseCode}`);

    //An array of all product names retrieved from the JSON response:
    const productNames = productsListResponse_JSON.products.map((product: any) => product.name);
    console.log(`From API:`);
    console.log(productNames);
  });

  test("Verify error message is returned when using POST with api/productsList", async () => {
    //API URL: https://automationexercise.com/api/productsList
    //Using POST should NOT work with this API, and return an error message.

    const productsListResponse = await APIContext.post("https://automationexercise.com/api/productsList");
    console.log(`POST productsList Response Status: ${productsListResponse.status()}`);
    expect(productsListResponse.ok()).toBeTruthy();
    const productsListResponse_JSON = await productsListResponse.json();

    //Expected Response Code for POST: 405
    //Expected Response Message: This request method is not supported
    expect(productsListResponse_JSON.responseCode).toBe(405);
    expect(productsListResponse_JSON.message).toBe("This request method is not supported.");
    console.log(`productsListResponse_JSON code: ${productsListResponse_JSON.responseCode}`);
  });

  test("Get all product names from browser", async ({ page }) => {
    await page.goto("https://www.automationexercise.com/");

    //An array of all product names retrieved from the webpage:
    const productNames = await page.locator(`.text-center p`).allTextContents();
    console.log(`\nFrom Web Automation:`);
    console.log(productNames);
  });

  test("Compare products from API to products from web automation", async () => {});
});
