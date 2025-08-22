//Section 19.111: Parameterization with Scenario outline & run tests Parallel in Playwright

/*

==================================================
         About Cucumber Parameterisation
==================================================

Parameterization means inserting placeholders (also called step arguments) 
in your step definitions and passing values from your feature file. 
Cucumber then injects these values into your step implementation.


==================================================
              How to Parameterise
==================================================

Example:

    Feature: Login Feature

    Scenario Outline: User logs into the application with valid credentials
        Given I open the login page
        When I login with username "<username>" and password "<password>"
        Then I should see the welcome message "<welcomeMessage>"

    Examples:
        | username | password  | welcomeMessage         |
        | user1    | pass123   | Welcome, user1!        |
        | user2    | pass456   | Welcome, user2!        |


1. Scenario Outline - this allows passing different sets of data for the same scenario.
2. <username>, <password>, and <welcomeMessage> are placeholders.
3. The "Examples" table provides actual data sets to run the scenario multiple times.

Using "Scenario Outline" tells Cucumber that this is a parameterised test.
It will look to see how many rows there are.
The first row is ignored because they are the headers used for the placeholder values.
It will then run the test X number of times, depending on how many remaining rows there are.
The data in the remaining rows will be injected into the test at runtime.
*/
