//Section 10.45: understanding the importance of API integration calls for Web tests
//Rahul Shetty's in-depth video on APIs - https://www.youtube.com/watch?v=bdHeDZPrYec

import { test, expect } from "@playwright/test";

test("Udemy: API Integration", async ({ page }) => {
  /*
  In this section, we'll see how to integrate API testing into web cases.

  We're NOT exclusively talking about performing API testing here, this section is
  more about how to make your web automation testing easier.
  This means reducing the execution time of web automation and/or to make tests more stable.
  We can use the help of APIs and integrate them with our web automation to build more robusts tests.


  "API" definition:
  An Application Programming Interface, is a set of rules and protocols 
  that allows different software applications to communicate with each other. 
  It defines the methods and data formats that applications can use to request and exchange information. 
  APIs are essential in modern software development for creating interactions between 
  different systems, libraries, or components.


  Most modern websites, apps, and other web technologies are driven by APIs in the back-end.
  An API will give you a response and the front-end engineer will parse the JSON response,
  and render the data they receiveed from the back-end to the front-end webpage.


  -----Example: https://rahulshettyacademy.com/client-----

  If we want to login to this website, what happens in the back-end?
  In the back-end, there will be an API call made.
  It will contain the login details (email/username & password) that will be sent as a request.
  This request will be sent to the API server, which will then send back a response alongside a "session token".
  Based on the token, we will then be authenticated and able to be logged in.

  To see the session token:
  1. Navigate to the website.
  2. Before logging in, open Inspect > Network > Fetch/XHR.
  3. Enter credentials and login, you'll see some activity as the API calls are made.
  4. Once logged in, while still on "Fetch/XHR" tab, on the left-hand side there should be a "login" call.
  5. Click the "login" call to view the tabs such as Headers, Payload, Preview etc.
  6. In "Preview" or "Response", you should see "token" alongside its value.
  7. You can also view it via Application > Local Storage

  The token appears in this kind of format:
  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODE5ZGExZGZkMmFmMWM5OWUxMTQ0YzciLCJ1c2V...

  We can use this session token to avoid loggin in for every test.
  */

  await page.goto("https://rahulshettyacademy.com/client");
});
