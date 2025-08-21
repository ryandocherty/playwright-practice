@errorValidation
Feature: Invalid Login Error Messages

    Background: 
        Given I am on the login page
    
    Scenario: Blank Email and Password
        When I attempt to log in without entering ANY email address or password
        Then I should see the error messages "Email is required" and "Password is required"
   
    Scenario: Invalid Email (incorrect format)
        When I attempt to log in with an invalid email address
        Then I should see the error message "Enter Valid Email"

    Scenario: Wrong Email (correct format, but incorrect/nonexistent email address)
        When I attempt to log in with a wrong or nonexistent email address
        Then I should see the error message toast "Incorrect email or password"