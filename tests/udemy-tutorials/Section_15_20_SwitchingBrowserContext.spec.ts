//Section 5.20: Handling Child windows & Tabs with Playwright by switching browser context

import { test, expect } from "@playwright/test";
import { SELECTORS } from "./Udemy_Tutorials_Helpers";

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

  Whenever you think a set of steps need to execute in parallel, use Promise.all().
  Promise.all() is an array of Promises, and creates a new Promise that is resolved
  with an array of results when all of the provided Promises resolve,
  or reject when any Promise is rejected.
  */

  const [newPage] = await Promise.all([
    context.waitForEvent(`page`),
    page.locator(SELECTORS.blinkingTextLink).click(),
  ]);

  /*
  This array will now keep iterating thorugh these steps as long as a Promise is not rejected.
  Once all the Promises are fulfiled, it will come out of the array block.

  The waitForEvent(`page`) will initially return Promise pending, as we haven't clicked the link
  to open a new page yet.

  Because we're not using "await", it won't wait for this Promise pending to change 
  to Promise fulfiled and it will then immediately execute the click() operation.

  ----------What is "const [newPage]"?--------------------
  Promise.all() here resolves to an array with two elements (two resolved promise values). 
  We're only interested in the first result: the new page that was opened, 
  which comes from the first promise context.waitForEvent(`page`).

  So by writing "const [newPage]", we're saying:
  "From the array of results, assign the first element to the variable newPage"

  "const [newPage]" is using the destructuring assignment to extract
  the first element from the array that is returned by Promise.all().

  "const [newPage]" is not declaring a new array; it is destructuring the returned array from Promise.all().
  It grabs the first value in the array — the new page object that was emitted by context.waitForEvent('page').
  This allows you to work with the new page directly afterwards.
  --------------------------------------------------------

  The array will ultimately return an index of fulfiled Promises.
  */

  //Now we'll interact with the new page.
  //Let's grab this text on the new page:
  //"Please email us at mentor@rahulshettyacademy.com with below template to receive response".
  //Then we'll use string method(s) to extract just "rahulshettyacademy.com".

  //Firstly grab the whole string:
  const originalText = await newPage.locator(`.red`).textContent();
  const fullText = originalText?.trim();
  expect(fullText).toBe(
    `Please email us at mentor@rahulshettyacademy.com with below template to receive response`
  );
  console.log(fullText);

  //Use split() to return a (new) array using "@" as the seperator.
  const textArray = fullText?.split(`@`);
  expect(textArray).toEqual([
    `Please email us at mentor`,
    `rahulshettyacademy.com with below template to receive response`,
  ]);
  console.log(textArray);
  //Now "textArray" will contain:
  //Index 0: "Please email us at mentor".
  //Index 1: "rahulshettyacademy.com with below template to receive response".

  //We need the interact with the string stored in Index 1, which contains the domain we want to extract.
  //We can use split() again, using the whitespace after "rahulshettyacademy.com" as the seperator.
  //We can specify that we only want to interact on index[1] of textArray,
  //then on index[1] we split again using the whitespace as the seperator.
  //Finally, we can specify that we then only want domainText to contain index[0] of this
  //new array, which will just be "rahulshettyacademy.com":
  const domainText = textArray?.[1].split(` `)[0];
  expect(domainText).toBe(`rahulshettyacademy.com`);
  console.log(domainText);
  //Id we didn't specify "[0]" at the end, domainText would contain:
  //Index 0: 'rahulshettyacademy.com',
  //Index 1:'with',
  //Index 2:'below',
  //Index 3:'template',
  //Index 4:'to',
  //Index 5:'receive',
  //Index 6:'response'
});
