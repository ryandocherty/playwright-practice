//Section 9.43: How to automate Java/JavaScript Alert popups with Playwright

import { test, expect } from "@playwright/test";

test("Udemy: Java Alert Popups", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

  /*
  Java popups will block you from interacting with a webpage until it is closed.
  This means an automation test will not be able to continue until a pop-up is dealt with.
  
  In this test we're dealing with Java pop-ups (as opposed to Web pop-ups).
  You cannot spy on the HTML/CSS of a Java popup, because it's not HTML/CSS (Java of course).

  In Playwright, these Java popups are called "dialog" pop-ups.
  We need to tell Playwright in advance to listen to a pop-up event using "page.on".

  Using "page.on", we're telling Playwright to listen out for an event.
  It doesn't mattter where in the code "page.on" appears, 
  it will automatically use this event listener to choose an option.
  
  We'll pass the 1st argument "dialog", to indicate it's a dialogue/alert pop-up.

  The 2nd argument will be our desired selection, usually between an "Okay/Accept" or "No/Decline/Cancel".
  To do this we have methods called "accept()" and "dismiss()".
  Pop-ups don't always have a literal "accept/dismiss" button,
  so it instead goes by what appears as the most positive (yes/accept) or negative (no/decline) option.

  Examples:
  page.on(`dialog`, (dialog) => dialog.accept());
  page.on(`dialog`, (dialog) => dialog.dismiss());
  */

  //Listen out for a dialog event, and choose to accept the dialog pop-up whenever it appears.
  page.on(`dialog`, (dialog) => dialog.accept());

  //Click "Alert" and/or "Confirm" to trigger the pop-up:
  await page.locator(`#confirmbtn`).click();
  await page.locator(`#alertbtn`).click();

  //Quick demo of mouse hover:
  await Promise.all([
    await page.locator(`#mousehover`).hover(),
    await page.locator(`.mouse-hover-content a`).first().click(),
  ]);
});
