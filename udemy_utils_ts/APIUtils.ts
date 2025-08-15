//Section 18.103: Refactor Playwright tests into TypeScript compatible and run the E2E Test

//This file is a TypeScript refactor of "udemy_utils\APIUtils.js"

export class APIUtils {
  constructor(APIContext, loginPayload) {
    this.APIContext = APIContext;

    this.loginPayload = loginPayload;
  }

  async getLoginToken() {
    console.log(`\nSending loginPayload:`);
    console.log(this.loginPayload);

    const loginResponse = await this.APIContext.post(`https://rahulshettyacademy.com/api/ecom/auth/login`, {
      data: this.loginPayload,
    });
    const loginResponse_JSON = await loginResponse.json();
    console.log(`\nloginResponse: ${loginResponse_JSON.message}`);
    const loginToken = await loginResponse_JSON.token;
    return loginToken;
  }

  async getOrderID(placeOrderPayload) {
    console.log(`\nSending placeOrderPayload:`);
    console.log(placeOrderPayload);

    let prerequisiteData = {};

    prerequisiteData.loginToken = await this.getLoginToken();

    const placeOrderResponse = await this.APIContext.post(`https://rahulshettyacademy.com/api/ecom/order/create-order`, {
      data: placeOrderPayload,
      headers: { Authorization: prerequisiteData.loginToken, "Content-Type": "application/json" },
    });

    const placeOrderResponse_JSON = await placeOrderResponse.json();
    console.log(`\nplaceOrderResponse: ${placeOrderResponse_JSON.message}`);
    const orderID = await placeOrderResponse_JSON.orders[0];
    console.log(`\nOrderID: ${orderID}`);

    prerequisiteData.orderID = orderID;

    return prerequisiteData;
  }
}
