//Section 19.105: Cucumber Configuration and setup feature files into Playwright Project
//Related file: features\Ecommerce.feature

/*
==================================================
             How to Install Cucumber
==================================================
https://github.com/cucumber/cucumber-js

1. Run the command: npm install @cucumber/cucumber
2. Install a Cucumber extension (in this case, the one by Alexander Krechik)
    Link: https://marketplace.visualstudio.com/items?itemName=alexkrechik.cucumberautocomplete

That's basically it! You can now start setting up feature files.


==================================================
                About Feature Files
==================================================

In Cucumber, Feature files are like a high-level test plan.
Feature files in Cucumber are somewhat analogous to a test suite in Playwright.
However, they serve related yet distinct purposes in their respective testing frameworks.

In Playwright (using @playwright/test), a test suite typically refers to a file 
or a group of tests written in JavaScript/TypeScript that define actual test cases using the test() function.
Suites can be organized via the describe() blocks (similar to Mocha/Jest) to group related tests.

Feature files in Cucumber declare what you want to test in a human-readable way.
A test suite in Playwright is a JS/TS file where you define how to automate and assert those tests.
They are conceptually similar but serve different roles: one is specification, the other is implementation.

So a test suite can contain multiple test cases, and it's like a folder that can hold multiple test cases.
Each Cucumber "Scenario" we typically treat as one test case.
Each Cucumber Feature file can hold multiple Scenarios.
This means multiple test cases can be written in one single Feature file.

==================================================
                Creating Feature Files
==================================================

Cucumber recommends that you create a "features" folder in the root of your project (...\playwright-practice\features)
By default, Cucumber looks for a "features" folder, so this will automatically be recognised.

We'll use this previous test and create a .feature file for it:
Section_018_103_1_Pass_Test_Data_as_Fixture_Refactor.spec.ts

Created:
features\Ecommerce.feature

You can drive required data directly from a .feature file.

It's up to you how you structure the "Given, When, Then" syntax.
Ultimately it's about making it readable in plain English so that anyone can understand it.
*/
