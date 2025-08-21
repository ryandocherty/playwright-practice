//Section 19.106: Create Step Definition files and associate with Cucumber.js config file
//Related file: features\Ecommerce.feature
//Related file: features\step_definitions\steps.js

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
You have to run the .feature file to create the basic code skeleton.
Cucumber will complain that there is no code linked to the .feature file, so it generates the code outline for you.

To do this, run:
npx cucumber-js

"cucumber-js" is a node module (node_modules\.bin\cucumber-js).
When this file is run using "npx cucumber-js", it scans your entire project for a "features" folder.
If the "features" file is found, it will enter the folder and look for .feature files.
If it finds .feature files, it will blindly execute these files.

Initially after running the command, Cucumber will complain and generate basic code for you in the Terminal.
After this, go ahead and create another folder within "features" called something like "step_definitions".
So now we have "playwright-practice\features\step_definitions".
Within this folder, create a "steps.js" file, which will contain our actual code.

Created:
features\step_definitions\productPurchaseSteps.js

Step 1. Import required Cucumber package
        `import { Given, When, Then } from '@cucumber/cucumber';`

Step 2. Copy and Paste the suggested code from the Terminal.

You'll notice that when using quotes in the .fearure file, Cucumber treats this as dynamic data:
"the user logs in with {string} and {string}"

This means that you can use the same .feature file with variable data (e.g. login emails/passwords).
The data you provide in a .feature file can be passed to your actual test code.
*/
