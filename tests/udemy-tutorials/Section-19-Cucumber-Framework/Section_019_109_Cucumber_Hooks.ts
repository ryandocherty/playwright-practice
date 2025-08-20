//Section 19.109: Understand Cucumber Hooks and its implementation process in framework
//Related file: features\Ecommerce.feature
//Related file: features\step_definitions\steps.js
//Related file: features\support\hooks.js

/*
==================================================
           About Cucumber Hooks
==================================================

Hooks are blocks of code that run at specific points in the Cucumber test execution lifecycle.
They let you run setup or teardown logic before or after scenarios, steps, or feature execution, 
without putting that code inside your step definitions.
Hooks help keep tests clean, reduce duplication, and manage shared resources like browsers, databases, or test data.

1. Before Hook
    Runs before each scenario.
    Great for preparation: launching browsers, setting environment variables, resetting test data etc.

2. After Hook
    Runs after each scenario.
    Usually for cleanup: closing connections, clearing test data, closing browsers.

3. BeforeAll and AfterAll Hooks
    Runs once before/after all scenarios in a test run.
    Useful for global setup or teardown tasks that only need to happen once.

4. Tagged Hooks
    Hooks can be restricted to run only on scenarios with certain tags.

Why use Hooks?
1. Initialise and clean your test environment.
2. Avoid repetition of setup/teardown code in every step definition.
3. Manage shared resources safely and efficiently.
4. Control scenario execution flow with conditions (tags).
5. Keep test code clean and maintainable.


==================================================
            Creating Cucumber Hooks
==================================================

Firstly, you typically create a new folder called "support" within the "features" folder.
Cucumber recognises this folder automatically (Cucumber supports this hierarchy).
Inside the "support" folder is where you'd typically write your hooks (inside a .js file).

Created:
features\support\hooks.js
*/
