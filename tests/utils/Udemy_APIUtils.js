import dotenv from "dotenv";
dotenv.config({ path: ".env" });

//Still loading the email/password from the .env file:
const loginEmail = process.env.LOGIN_EMAIL ?? "";
const loginPassword = process.env.LOGIN_PASSWORD ?? "";

//Global variables:
let loginToken;
let orderID;

export class Udemy_APIUtils {
  APIContext;
  loginPayload;
  placeOrderPayload;

  //Constructors are automatically invoked when a new instance of an object is created using a Class.
  constructor(APIContext, loginPayload, placeOrderPayload) {
    //The "this" keyword acts as a dynamic reference that changes based on the object we're currently interacting with.
    //The value of "this" is determined by how a method is called and its context at that point in time.
    //The Constructor will get passed "APIContext" from our test block,
    //then it's assigned to the local APIContext object here by using "this":
    this.APIContext = APIContext;
    //Even though "this" is within the Constructor scope, using "this" lets the entire Class have access to it.
    //This means we can use "APIContext" anywhere within this Class as long as we use "this.APIContext".

    //The same goes for "loginPayload" and "placeOrderPayload":
    this.loginPayload = loginPayload;
    this.placeOrderPayload = placeOrderPayload;
  }

  async getLoginToken(loginPayload) {
    const loginResponse = await this.APIContext.post(`https://rahulshettyacademy.com/api/ecom/auth/login`, {
      data: this.loginPayload,
    });
    const loginResponse_JSON = await loginResponse.json();
    console.log(loginResponse_JSON);
    loginToken = loginResponse_JSON.token;
    return loginToken;
  }

  async getOrderID(placeOrderPayload) {
    const placeOrderResponse = await this.APIContext.post(
      `https://rahulshettyacademy.com/api/ecom/order/create-order`,
      {
        data: this.placeOrderPayload,
        headers: { Authorization: this.getLoginToken(this.loginPayload), "Content-Type": "application/json" },
      }
    );
    const placeOrderResponse_JSON = await placeOrderResponse.json();
    console.log(placeOrderResponse_JSON);
    orderID = placeOrderResponse_JSON.orders[0];
    return orderID;
  }
}
