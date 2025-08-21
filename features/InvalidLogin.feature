Feature: Invalid Login Error Message

    Scenario: Invalid Login
        Given the user attempts to log in with an invalid email address and/or password
        Then verify the login attempt fails and displays an error message