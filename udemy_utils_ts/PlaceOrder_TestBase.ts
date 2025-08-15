//Section 18.103. Refactor Playwright tests into TypeScript compatible and run the E2E Test

//This file is a TypeScript refactor of "udemy_utils\PlaceOrder_TestBase.js"

import { test as baseTest } from "@playwright/test";

/*
Above, we're using: `import { test as baseTest } from "@playwright/test";`
Instead of: `import base from "@playwright/test";`

This difference comes down to how the module exports are structured in the Playwright package,
and and how ES module imports work, especially in TypeScript.

===========================================================
Original: import base from "@playwright/test";
===========================================================
This tries to import the *default export* from the @playwright/test module and names it "base".
It assumes @playwright/test has a default export.

===========================================================
New: import { test as baseTest } from "@playwright/test";
===========================================================
This imports the *named export* "test" from the module and renames it locally as "baseTest".
Here, it assumes @playwright/test exports a named export called "test".

So why the change?
1. Playwright's "@playwright/test" package does NOT have a default export (it has named exports).
    Trying to import default like `import base from "@playwright/test";` will work in plain JavaScript,
    only if you have some compatibility flag enabled or using transpilation that adds synthetic default imports.
    Using `import base from '@playwright/test'` causes errors or unexpected behavior in TypeScript.

2. TypeScript enforces module import rules more strictly.
    If you want to import the core Playwright test functions in TypeScript, you should import the named export:
    `import { test, expect } from '@playwright/test';`

3. Using named imports matches the module's actual exports and works correctly in TS.
    Named export example: `import { test } from '@playwright/test';`

===========================================================
                        Summary
===========================================================
Using `import { test as baseTest } from "@playwright/test";` means we now
have *test* in our code that is based on Playwright's *test* but lets us add customisations easily.

We are:
1. Importing the named export *test* from the @playwright/test module.
2. Then renaming it locally to "baseTest" so you can refer to it by that name in our code.

We can still treat "customTest" like the default named export from @playwright/test.
Under the hood, it is built from the original "test", but extended with our fixtures, setup, or behaviors.
So anywhere we import "customTest" from our module, it behaves like Playwright’s test runner *plus* whatever we added.
*/

/*
=============================
          Interfaces
=============================
In order to define our "testDataForOrder" in TypeScript, we need to use an "Interface".
An interface is known as a type of "contract", which is an agreement describing the shape and structure of the object.

Typically when defining an object in TypeScript, we do something like:
  const myObj: {prop1: string, prop2: number} = {name:"Bob", age:"69"};

However, the syntax is different when using test.extend().
TypeScript requires you to describe the shape of your fixtures using an interface or type rather than a plain object.

Playwright’s fixture system needs static type information about: 
1. The names of the fixtures you add.
2. The types of their values.
*/

interface TestDataForOrder {
  loginEmail: string;
  loginPassword: string;
  desiredDeliveryCountry: string;
  desiredProductName: string;
  creditCardNumber: string;
  CCVCode: string;
  nameOnCard: string;
  cardExpiryMonthDate: string;
  cardExpiryDayDate: string;
}

export const customTest = baseTest.extend<{ testDataForOrder: TestDataForOrder }>(
  //Custom properties/fixtures are placed in curly braces:
  {
    testDataForOrder: {
      loginEmail: "emailaddress@email.com",
      loginPassword: "Password1!",
      desiredDeliveryCountry: "United Kingdom",
      desiredProductName: "ADIDAS ORIGINAL",
      creditCardNumber: "1234 5678 9012 3456",
      CCVCode: "123",
      nameOnCard: "Duane Dibbley",
      cardExpiryMonthDate: "05",
      cardExpiryDayDate: "12",
    },
  }
);
