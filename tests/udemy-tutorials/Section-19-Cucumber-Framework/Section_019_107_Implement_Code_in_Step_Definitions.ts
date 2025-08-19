//Section 19.107: Implement Code login into StepDefinition file and run Cucumber feature files
//Related file: features\Ecommerce.feature
//Related file: features\step_definitions\steps.js

/*
==================================================
    Implementing Code in Step Definitions File
==================================================

We'll use this previous test to demonstrate Cucumber syntax:
Section_014_076_Page_Object_Manager.spec.js


-----Step 1:-----
Given the user logs in with "emailaddress@email.com" and "Password1!"

We have a slight problem here. We have this line of code:
`const poManager = new POManager(page);`

We're passing "page", because it's a fixture that's automatically exported by Playwright (when using "test()").
But "page" has no life here now we're using Cucumber syntax.

A solution to this is to import the "Playwright" keyword.
The "Playwright" keyword has a method called "launch()".
We can then use "launch()" to create a new browser context, and thus a new page.

    import { playwright } from "@playwright/test";
    const browser = await playwright.chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();




















*/
