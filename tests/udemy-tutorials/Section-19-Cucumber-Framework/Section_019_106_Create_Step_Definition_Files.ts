//Section 19.106: Create Step Definition files and associate with Cucumber.js config file
//Related file: features\Ecommerce.feature

/*
==================================================
           About Step Definition Files
==================================================

Step definition files are the JavaScript files where you implement the actual code that executes each Gherkin step.
Essentially, the step definitions "glue" the plain-language steps to your test automation code.

Important Notes:
1. The step definitions receive the step text as a parameter and the implementation matches the text.
2. You typically have some kind of "World" object where Playwright’s page is instantiated and shared between steps.
3. The test runner initializes Playwright before running tests and disposes it afterward.

General Flow:
.feature file describes behavior --> step definition file implements automation --> Cucumber runs steps and outputs results.


==================================================
          Creating Step Definition Files
==================================================

Cucumber has a feature that will automatically generate the basic skeleton of your steps.



*/
