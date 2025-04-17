//Section 5.20: Handling Child windows & Tabs with Playwright by switching browser context

import { test, expect } from "@playwright/test";
import { UDEMY_SELECTORS } from "./Udemy_Tutorials_Helpers";

test("Udemy: Child Windows", async ({ browser }) => {
  /*
  For this test I want hanle clicking a link that will open a new page.


  When we use "page", we're limited to the scope of the single page we're interacting with.
  If we want to switch scope by opeing a new page, we have to indicate this by
  using the "browser" fixture instead of "page", as seen above.
  */

  /*
  1. Firstly we create a new context by calling the browser fixture with the method newContext(),
  then we're storing this in a variable called "context".
  2. Then we call the "context" variable and call the method newPage().
  3. We can then use "page" to start automating. The "page" variable can only be used to interact
  with the single page that it was opened for.
  */

  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

  /*
  We need to indicate that a new page will open.
  To do this, we use waitForEvent().
  
  Below we're saying wait for a new "page" variable to be triggered in the background.
  The waitForEvent() method will listen for the specified event.
  The event here is the "page", which is equal to context.newPage().

    const page2 = await context.waitForEvent(`page`);

  This "page2" variable now has the knowledge and scope of the child page that has opened.

  Here's where we actually click the link:

    await page.locator(.blinkingText`).click();

  The problem here is that the click() is what actually opens the page, 
  and if we write waitForEvent() before this then the click won't have happened yet,
  so therefore a new page wouldn't have opened yet (i.e. the Promise has not been fulfiled).

  When we use "await" for operations, we're sequentially returning Promises.
  There are 3 states of a Promise: pending, rejected, fulfiled.
  
  We need these 2 steps to run in parallel:

    await context.waitForEvent(`page`);
    await page.locator(`.blinkingText`).click();

  We don't use "await" in this case, we need something more asynchronous.
  For this, we can wrap these steps in an array using Promise.all().

  Whenever we think a set of steps need to execute in parallel, we use Promise.all().
  Promise.all() is an array of Promises, and creates a new Promise that is resolved
  with an array of results when all of the provided Promises resolve,
  or reject when any Promise is rejected.
  */

  const [newPage] = await Promise.all([context.waitForEvent(`page`), page.locator(`.blinkingText`).click()]);

  /*
  This array will now keep iterating thorugh these steps as long as a Promise is not rejected.
  Once all the Promises are fulfiled, it will come out of the array block.

  The waitForEvent(`page`) will initially return Promise pending, as we haven't clicked the link
  to open a new page yet.

  Because we're not using "await", it won't wait for this Promise pending to change 
  to Promise fulfiled and it will then immediately execute the click() operation.

  The array will ultimately return an index of fulfiled Promises.
  */
});
