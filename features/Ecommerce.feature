Feature: Product Purchase

    Scenario: Successful Product Purchase
        Given the user logs in with a valid email address and password
        When the user adds a product to the cart
        Then the product is displayed in the cart
        Given the user enters valid billing information, delivery country "United Kingdom"
        When the user places the order
        Then verify the product is present in the Order History page
