@errorMessageValidation
Feature: Invalid Login Error Messages - Parameterised

    Scenario Outline: Failed Login
        Given user is on the login page
        When user attempts to log in with "<emailAddress>" and "<password>"
        Then user should see an error message

    Examples:
        | emailAddress      | password      |
        |                   |               | 
        | 123@123.com       | 123           |