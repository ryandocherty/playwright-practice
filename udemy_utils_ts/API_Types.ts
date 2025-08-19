//This file contains type declarations for my API tests.
//Related file: "Section_018_103_2_API_Utils_Class_Refactor.spec.ts"
//Related file: "udemy_utils_ts\APIUtils.ts"

//==================================================
//                  Interfaces
//==================================================
export interface LoginPayload {
  userEmail: string;
  userPassword: string;
}

export interface Order {
  country: string;
  productOrderedId: string;
}

export interface PlaceOrderPayload {
  orders: Order[];
}

export interface PrerequisiteData {
  loginToken: string;
  orderID: string;
}
