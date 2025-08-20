//Section 19.108: What is World Constructor? Its usage in Playwright Cucumber
//Related file: features\Ecommerce.feature
//Related file: features\step_definitions\steps.js

/*
==================================================
           About the "World" in Cucumber
==================================================

The "World" is essentially a context or a shared state container object that gets created before each scenario runs.
It acts like an environment where you can store variables, helper functions, 
or anything that you want to share across the different step definitions within the same scenario.

The World object provides a clean way to maintain state between steps.
This helps to avoid global variables or passing too many parameters.

Why "World"?
Imagine each scenario runs in its own "World".
This is a a sandboxed space isolated from other scenarios to avoid side-effects from bleeding between tests.

How is "World" provided?
When you write step definitions in Cucumber for JavaScript (e.g., using @cucumber/cucumber package), 
you get access to the World instance via this inside your step definition functions.
It can also be provided via a custom World class (recommended).

Custom "World".
You can define your own World class or object to extend that context with custom methods or properties.

Summary:
1. The World in Cucumber is a place to keep your scenario's state.
2. You can make a custom World by implementing a class to hold necessary objects (like a Playwright browser instance).
3. Steps are executed with access to that World, making is easy to share states/data between steps within a scenario.
4. Hooks (i.e. Before, After) help set up and tear down the World-related resources.
*/
