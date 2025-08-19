//Section 19.104: What is Cucumber Framework? How it fits in Playwright needs

/*
==================================================
                What is Cucumber?
==================================================

https://cucumber.io/

Cucumber is a tool that supports Behaviour-Driven Development (BDD).
The main goal of BDD is to improve collaboration between developers, testers, and business stakeholders.
It achieves this by using a shared language (typically just plain English) to describe application behavior.

Cucumber syntax is written in "Gherkin" language, which is plain English structured around three keywords:
1. Given - to describe the initial context or setup.
2. When - to describe an action or event.
3. Then - to describe an expected outcome.

This makes test scenarios understandable to both technical and non-technical members of a project.


==================================================
             Gherkin Syntax Example
==================================================

Feature: Withdrawing cash

Rule: Customers cannot withdraw more than their balance

Scenario: Successful withdrawal within balance
    Given Alice has 234.56 in their account
    When Alice tries to withdraw 200.00
    Then the withdrawal is successful

Scenario: Declined withdrawal in excess of balance
    Given Hamza has 198.76 in their account
    When Hamza tries to withdraw 200.00
    Then the withdrawal is declined


==================================================
            Cucumber with Playwright
==================================================

Cucumber defines *feature files* with scenarios describing what needs to be tested in a human-readable format.
Playwright *implements the step definitions* that execute the automated browser actions (tests).
Thus, Cucumber provides the *behaviour specification*, and Playwright is the *test execution engine*.

Cucumber basically acts as a top over interface.
Anyone that wants to understand the written code can look at the plain-English Cucumber feature file.
They can then blindly run the file without seeing any actual code.
The code will then execute and perform the specific test scenario.

Basic Workflow:
1. Write *feature files* describing scenarios in Gherkin syntax.
2. Write *step definitions* that map the Gherkin steps to Playwright functions.
3. Run tests that execute Playwright commands and report the scenario results.

Using my previous E2E test as an example (Section_007_EndToEnd_Automation_Practice.spec.ts).
This test:
1. Logs into a website
2. Adds a product to the cart
3. Checks out the product
4. Enters payment/delivery information
5. Purchases the product
6. Navigates to the Order Summary
7. Verifies the correct purchase info is shown

In Gherkin syntax, this could be written as:

    Feature: Purchasing a product
    Scenario: Successful product purchase
        Given customer has valid credentials and payment information
        When customer purchases a product
        Then order information is shown in customer's Order History
*/
