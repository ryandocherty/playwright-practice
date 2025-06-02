//Section 10.51: Refactor API calls from utils folder and isolate from Web test logic
//Section 10.52: Part 2 - Refactor API calls from utils folder and isolate from Web test logic

/*
This Utils file contains a Class to:
1. Make an API login call which grabs and returns a login session token ("loginToken").
2. Make an API call to place an order, using the login session token ("loginToken").
3. Retrieve an order ID ("orderID") from placing an order, which will then be used to perform a test.
4. Return an object ("prerequisiteData") which contains both "loginToken" and "orderID" properties/values.
*/

import dotenv from "dotenv";
dotenv.config({ path: ".env" });

//Still loading the email/password from the .env file:
const loginEmail = process.env.LOGIN_EMAIL ?? "";
const loginPassword = process.env.LOGIN_PASSWORD ?? "";

export class Udemy_APIUtils {
  //Constructors are automatically invoked when a new instance of an object is created using a Class.
  constructor(APIContext, loginPayload) {
    //The "this" keyword acts as a dynamic reference that changes based on the object we're currently interacting with.
    //The value of "this" is determined by how a method is called and its context at that point in time.
    //The Constructor will get passed "APIContext" from our test block,
    //then it's assigned to the local APIContext object here by using "this":
    this.APIContext = APIContext;
    //Even though "this" is within the Constructor scope, using "this" lets the entire Class have access to it.
    //This means we can use "APIContext" anywhere within this Class as long as we use "this.APIContext".

    //Each instance of the test being run will require you to login
    //So we'll also force the "loginPayload" to be passed as part of the constructor:
    this.loginPayload = loginPayload;
  }

  async getLoginToken() {
    const loginResponse = await this.APIContext.post(`https://rahulshettyacademy.com/api/ecom/auth/login`, {
      data: this.loginPayload,
    });
    const loginResponse_JSON = await loginResponse.json();
    console.log(loginResponse_JSON);
    const loginToken = await loginResponse_JSON.token;
    return loginToken;
  }

  async getOrderID(placeOrderPayload) {
    //Initialise an empty object to eventually hold the values for "loginToken" and "orderID" properties:
    let prerequisiteData = {};
    //Add a "loginToken" property and assign it the value received from the getLoginToken() method:
    prerequisiteData.loginToken = await this.getLoginToken();

    const placeOrderResponse = await this.APIContext.post(
      `https://rahulshettyacademy.com/api/ecom/order/create-order`,
      {
        data: placeOrderPayload,
        headers: { Authorization: prerequisiteData.loginToken, "Content-Type": "application/json" },
      }
    );
    const placeOrderResponse_JSON = await placeOrderResponse.json();
    console.log(placeOrderResponse_JSON);
    const orderID = await placeOrderResponse_JSON.orders[0];
    console.log(orderID);

    //Add a "orderID" property and assign it the value received from the above "orderID":
    prerequisiteData.orderID = orderID;

    //Return the "prerequisiteData" object, which now contains the values of "loginToken" and "orderID":
    return prerequisiteData;
  }
}
