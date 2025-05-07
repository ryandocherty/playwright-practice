//Section 8.33: Understand how GetByLabel & Playwright UI Runner works with an example
//npx playwright test --ui

import { test, expect } from "@playwright/test";

test("Udemy: getBy locators", async ({ page }) => {
  /*
  Playwright has special locators that are exclusive to Playwright.

  Up until now we've mostly been using locators using CSS or XPath, which are
  available in almost all other automation tools such as Selenium, Cypress etc.

  Playwright has methods for identifying elements using "getBy...",
  such as getByRole, getByLabel, getByText, and a few others.

  These locators are really useful!
*/

  await page.goto("https://rahulshettyacademy.com/angularpractice/");

  /*
  The page above has multiple labels (10 in total) on the page.
  One label looks like this, with a checkbox next to it:

    <input class="form-check-input" id="exampleCheck1" type="checkbox" xpath="1">
    <label class="form-check-label" for="exampleCheck1" xpath="1">Check me out if you Love IceCreams!</label>

  We can use "getByLabel" and use the unique text within the label to form a selector.
  It will search the webpage for the tag (a label) with the associated text.
  */

  await page.getByLabel("Check me out if you Love IceCreams!").click();

  /*
  How does Playwright know where to click if we're just selecting the label, not the specific checkbox?

  When we use getBy with a click() here, Playwright will reach the label, 
  and then intelligently see if here is a clickable operation available within the label's zone.

  It's of course still possible to get the checkbox using a specific attribute of the checkbox,
  but this is another great way to use locators.

  Using check() instead of click() also works here.
  Check() - "Ensure that checkbox or radio button is checked".
  */

  await page.getByLabel("Employed").check();

  /*
  An example of where getBy is not very efficient is when you want to type/input some text.
  On the webpage we have a label that reads "Password", with an input box below it:

    <label for="exampleInputPassword1" xpath="1">Password</label>
    <input class="form-control" id="exampleInputPassword1" placeholder="Password" type="password" xpath="1">

  If we use getByLabel("Password"), but then try fill() or pressSequentially(), it will not always work.
  When there is an edit/input box, sometimes it works and sometimes it doesn't.
  So whenever there is something to type, it can be inconsistent when using getBy.
  But whenever there is soemthing to click, check, or a selection box, getBy usually works well.

  On the webpage, we have a "Gender" label with a drop-down selection box:

    <label for="exampleFormControlSelect1" xpath="1">Gender</label>
    <select class="form-control" id="exampleFormControlSelect1" xpath="1">
        <option>Male</option>
        <option>Female</option>
    </select>

  Using getBy here usually works well with drop-down selection boxes.
  */

  await page.getByLabel("Gender").selectOption("Female");
});
