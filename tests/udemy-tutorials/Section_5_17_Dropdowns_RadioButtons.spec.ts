//Section 5.17: Handling static Select dropdown options with Playwright

import { test, expect } from "@playwright/test";
import { UDEMY_SELECTORS } from "./Udemy_Tutorials_Helpers";

test("Udemy: Dropdowns and Radio Buttons", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

  await page.locator(UDEMY_SELECTORS.userNameInputBox).clear();
  await page.locator(UDEMY_SELECTORS.passwordInputBox).clear();

  /*
  For this test I want to select "Consultant" in the dropdown box,
  then select the "User" radio button before signing in.

  HTML for the drop down box is as follows:

  <select class="form-control" data-style="btn-info">
    <option value="stud">Student</option>
    <option value="teach">Teacher</option>
    <option value="consult">Consultant</option>
  </select>  

  In order to select an option from a dropdown, we'll use the selectOption() method.
  In the HTML you can see there are 3 "value" options, we'll just need
  to send one of those values to the drop down box.
  */

  await page.locator(UDEMY_SELECTORS.dropDownBox).selectOption(`consult`);

  /*
  HTML for both Admin & User radio buttons is as follows:

  Admin:
  <span class="radiotextsty">Admin</span>
    <input type="radio" value="admin" id="usertype" checked="checked" name="radio">
    <span class="checkmark"></span>

  User:
  <span class="radiotextsty"> User</span>
    <input type="radio" value="user" id="usertype" name="radio">
    <span class="checkmark"></span>

  We have a class called "radiotextsty", but both buttons have this class so
  therefore it is not a unique class.
  This is where the "last()" method comes in handy.
  Because we only have 2 radio buttons, we can easily use last() to make the selector
  pick the last radio button (User).
  If we had 3+ buttons, we could always use nth() to select a specific one.
  */

  await page.locator(`.radiotextsty`).last().click();

  /*
  When we click the "User" radio button on this website, a pop-up appears.
  The pop-up contains a message, with "Cancel" and "Okay" buttons.

  The HTML for the buttons is as follows:

  <button type="button" id="okayBtn" class="btn btn-success" autofocus="" css="1">Okay</button>
  <button type="button" id="cancelBtn" class="btn btn-secondary" data-dismiss="modal">Cancel</button>

  We can use the "id" atrribute to make a unique selector 
  for the "okay" button - "#okayBtn".
  */

  await page.locator(`#okayBtn`).click();
});
