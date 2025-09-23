//Section 14.80: How to pass test data as fixture by extend test annotation behaviour
//Related file: "tests\udemy-tutorials\Section_014_080_Pass_Test_Data_as_Fixture.spec.js"

//We still import an object from the "@playwright/test" module.
//However, by default we don't call it "test" and instead call it "base".
//We've been calling it "test" for readability; this makes it clear that it's a test block.
//You can technically call it anything, you're ultimately just importing an object from a module.
import base from "@playwright/test";

/*
-----More about base.test.extend()-----
"base" is the entire Playwright Test module exported by the package.
It includes multiple exports like "test", "expect", "devices", and others.
For example, "base.test" is the main test function/reference you use to define tests.

You can also do destructuring like:
"import {test, expect} from "@playwright/test";"

Both approaches are valid.
However, using "base" as a container is helpful when you want to extened from "test", or access multiple exports.
"base.test" is the original Playwright test function, which is also a special object that supports the .extend() method.
".extend()"" is a function provided by Playwright to create a new test object that inherits from the original,
but allows you to override or add new fixtures.
*/

//We've imported an object and called it "base".
//We're creating a new object from the "base" object.
//Then we're extending it and adding custom properties.
//Then we need to export it so that the "customtest" is available globally.
export const customtest = base.test.extend(
  //Custom properties/fixtures are placed in curly braces:
  {
    testDataForOrder: {
      loginEmail: "emailaddress@email.com",
      loginPassword: "Password1!",
      desiredDeliveryCountry: "United Kingdom",
      desiredProductName: "IPHONE 13 PRO",
    },
  }
);
