Feature: Product Purchase

    Scenario: Successful Product Purchase
        Given the user logs in with "emailaddress@email.com" and "Password1!"
        When the user adds "ZARA COAT 3" to cart
        Then the product "ZARA COAT 3" is displayed in the cart
        Given the user enters valid billing information
        When the user places the order
        Then verify "ZARA COAT 3" is present in the Order History page
