//This file contains type declarations for my API tests.

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
