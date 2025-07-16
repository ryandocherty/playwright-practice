//Section 14.74: What is page object pattern & Importance of its implementation

/*
For this demo we'll see how to implement a "Page Object Pattern" for our UI automation tests.

So far in our tests, all of the Page Objects (like "page.goto", "page.locator" etc.) are definied in the tests themselves.
However, it's best for the test cases to only contain the test logic, and the logic should be wrapped as a method.


-----What is Page Object Pattern?-----
The Page Object Pattern is a popular design pattern commonly used in UI test automation and browser automation frameworks.
The idea is to create an abstraction layer between the test scripts and the web page UI.
Instead of having test scripts directly interact with the selectors or raw page elements, 
you encapsulate page-related information and actions into dedicated classes or objects — called Page Objects.


-----Why use the Page Object Pattern?-----
1. Readability:
Tests become easier to read because the interactions are expressed through meaningful methods.

2. Maintainability:
If the UI changes (e.g. selectors change), you only need to update those references in one place — the page object file.

3. Reusability:
Page objects can be reused across multiple tests, avoiding duplication.

4. Separation of Concerns:
Keeps test logic separated from page structure.


-----What does the Page Object Pattern look like?-----
Using "Section_007_EndToEnd_Automation_Practice.spec.js" as an example.
This test interacts with several different pages: login page, products page, checkout page, order history page etc.
Each page has its own Page Objects (e.g. locators) defined in the test itself.
Using the Page Object Pattern, we'll create a .js file for each page and store the Page Objects in there.
So we'll have a loginPage.js file which will separately contain the Page Objects for the login page.
Then  we'll have a productsPage.js file to separately contain the Page Objects for the products page.
And so on...
We can also store any methods used within these Page Object files.
*/

test("Udemy: Excel upload download validation", async ({ page }) => {
  await page.goto(`https://rahulshettyacademy.com/upload-download-test/`);
});
