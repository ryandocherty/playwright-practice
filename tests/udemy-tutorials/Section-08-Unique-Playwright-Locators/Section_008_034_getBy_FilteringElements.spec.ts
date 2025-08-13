//Section 8.34: Filtering elements with GetByRole,GetByText and perform chaining methods in step

import { test, expect } from "@playwright/test";

test("Udemy: getBy locators", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/angularpractice/");
  await page.getByLabel("Check me out if you Love IceCreams!").click();
  await page.getByLabel("Employed").check();
  await page.getByLabel("Gender").selectOption("Female");

  /*
  There is another method called getByPlaceholder().
  Sometimes in input-boxes, you'll see placeholder text which will disappear when you start typing.
  In the password input box, there's the placeholder text "Password":

    <input class="form-control" id="exampleInputPassword1" placeholder="Password" type="password" xpath="1">

  We can use getByPlaceholder() to form a locator for the password box.
  */
  await page.getByPlaceholder("Password").fill("password1234");

  /*
  A tip for quickly testing if getByLabel will work on a particular webpage element:
  
  Using the label "Check me out if you Love IceCreams!" as an example.
  If you manually go to the website and try clicking label text (not the actual checkbox), 
  you'll see that the box still gets checked anyway.

  This is also true for the Employment Status "Student" or "Employed" labels - 
  clicking the text (not the actual radio buttons) still checks the box/radio button it's accociated with.

  When clicking the "Gender" label text, it doesn't select an option but you can see
  that the drop-down box still gets highlighted, suggesting that they are associated with each other
  and using getByLabel will still work.

  However, if you click on the "Email" or "Password" labels, you'll see that nothing happens - 
  the input boxes for email/password do not get highlighted or anything.
  This suggests that the input box is not directly accociated with the label, 
  and simply using just getByLabel will not be sufficient.
  */

  /*
  Probably the most powerful getBy method is getByRole().
  Let's say we want to click the "Submit" button on the webpage.
  Here's the CSS/HTML for the button:

    <input class="btn btn-success" type="submit" value="Submit">

  Even though the tag is <input>, the class still suggests its role is a button.
  If we want to click this button, we really need not get an XPath or CSS.
  We can use getByRole("button"), and Playwright will filter down to all the buttons it detects on the page.
  We then need to pass a second argument in curly brackets {} (as an object) to filter to the exact button.
  There are multiple options you can pass as the second argument, here we'll use the "name" object:
  */
  await page.getByRole("button", { name: "Submit" }).click();

  /*
  There's also getByText() which is scan the webpage for the given text.
  Here we're just checking that the text appears after pressing submit:
  */
  expect(await page.getByText("Success! The Form has been submitted successfully!.").isVisible()).toBeTruthy();

  /*
  We can also use getByRole() to find links on a webpage.
  On the webpage ther's a Shop link, here's the HTML:

    <a class="nav-link" href="/angularpractice/shop">Shop</a>
  */
  await page.getByRole("link", { name: "Shop" }).click();

  /*
  You can also use getBy methods and combine/chain them with normal locators.
  On the "Shop" page, there are 4 produts listed. Here's the CSS for one product:

    <app-card _ngcontent-c2="" class="col-lg-3 col-md-6 mb-3"></app-card>

  Within <app-card> for each product, there is a "Add" button to add the corresponding product to the cart.
  We can chain a locator(), a filter(), and a getByRole() method to find this specific button, 
  without the need to first grab each button into a list, then iterate using a loop to find the desired one.

  So we're:
  1. Locating all "app-card" tags on the page (4 in total).
  2. Then filtering the 4 tags down to the one that hasText "Nokia Edge".
  3. Then within this 1 tag, find the corresponding button and click it.

  Note that we don't need a second argument for getByRole(), as we've already filtered down enough:
  */
  await page.locator("app-card").filter({ hasText: "Nokia Edge" }).getByRole("button").click();

  /*-----Note from the lecturer-----:
  It's up to you how you want to utilise these different locator methods. 
  However, there are debates in the industry on which ones to use.
  When developing a framework within the industry, typically people commonly choose to use
  one type of locator for consistency across the framework/project.
  Companies tend to have framework standards and practices and therefore will discourage
  from using a random mix of locators for different pages.
  A company might only want to use locators using CSS, so the entire framework will be
  based on only using CSS for locators because that works best for their stratergy or goals.
  Also, most other automation tools (Selenium, Cypress etc.) use CSS-based locators, so CSS
  actually tends to be the most commonly used throughout the industry.
  */
});
