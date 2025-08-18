//Section 18.103: Refactor Playwright tests into TypeScript compatible and run the E2E Test

//This file is a TypeScript refactor of "udemy_utils\APIUtils.js"

import { LoginPayload, PlaceOrderPayload, PrerequisiteData } from "./API_Types";

export class APIUtils {
  apiContext: any;
  loginPayload: LoginPayload;

  constructor(apiContext: any, loginPayload: LoginPayload) {
    this.apiContext = apiContext;
    this.loginPayload = loginPayload;
  }

  async getLoginToken(): Promise<string> {
    console.log(`\nSending loginPayload:`);
    console.log(this.loginPayload);

    const loginResponse = await this.apiContext.post(`https://rahulshettyacademy.com/api/ecom/auth/login`, {
      data: this.loginPayload,
    });
    const loginResponse_JSON = await loginResponse.json();
    console.log(`\nloginResponse: ${loginResponse_JSON.message}`);
    const loginToken = await loginResponse_JSON.token;
    return loginToken;
  }

  //This function promises to return a full PrerequisiteData:
  async getOrderID(placeOrderPayload: PlaceOrderPayload): Promise<PrerequisiteData> {
    console.log(`\nSending placeOrderPayload:`);
    console.log(placeOrderPayload);

    /*
    Below I'm declaring an object "prerequisiteData" with the type "PrerequisiteData".
    However, the interface for "PrerequisiteData" requires "loginToken" and "orderID" to be present.
    I'm initialising "prerequisiteData" as an empty object {} which lacks the required properties.

    In TypeScript, if you want to start with an empty object and later populate the properties,
    you should declare the object using the "Partial<objectName>" type.
    This makes all the properties optional, but you still benefit from type checks on property assignments.
    */
    let prerequisiteData: Partial<PrerequisiteData> = {};

    prerequisiteData.loginToken = await this.getLoginToken();

    const placeOrderResponse = await this.apiContext.post(`https://rahulshettyacademy.com/api/ecom/order/create-order`, {
      data: placeOrderPayload,
      headers: { Authorization: prerequisiteData.loginToken, "Content-Type": "application/json" },
    });

    const placeOrderResponse_JSON = await placeOrderResponse.json();
    console.log(`\nplaceOrderResponse: ${placeOrderResponse_JSON.message}`);
    const orderID = await placeOrderResponse_JSON.orders[0];
    console.log(`\nOrderID: ${orderID}`);

    prerequisiteData.orderID = orderID;

    //Check that "prerequisiteData" has been populated with the required properties:
    if (!prerequisiteData.loginToken || !prerequisiteData.orderID) {
      console.error(`Either "loginToken" or "orderID" is missing from required prerequisiteData.`);
    }

    /*
    Below I'm returning "prerequisiteData as PrerequisiteData;" - the "as" keyword is called a "type assertion".
    It tells the TypeScript compiler "Trust me, I know better — treat this value as having the specified type".
    It does not change the value at runtime. It only affects the compiler’s type checking.

    Currently, "prerequisiteData" is declared as "Partial<PrerequisiteData>".
    This means it might have *some* or *all* of the properties defined in "PrerequisiteData" (loginToken & orderID).
    This function getOrderID() promises to return a *full* "PrerequisiteData".

    Since "prerequisiteData" is partial, TypeScript complains because it can't guarantee all required propeties exist.
    Using "prerequisiteData as PrerequisiteData" asserts to TypeScript:
    "I am confident that this object does have all the required properties, even if you can’t verify it statically".
    */
    return prerequisiteData as PrerequisiteData;

    /*
    Important notes when using type assertions:
    1. Type assertions do NOT perform runtime checks. They are purely compile-time hints.
    2. If you assert the type incorrectly (e.g. the object is missing properties), you may get runtime errors later.
    3. It's good practice to check or fully build you object before asserting its type (done in the "if" statement).
    */
  }
}
