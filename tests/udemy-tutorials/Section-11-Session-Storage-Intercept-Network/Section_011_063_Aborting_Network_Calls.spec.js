//Section 11.63: How to abort the Network calls with Playwright - Examples

/*
----Example Scenarios using abort():

Scenario 1: 
What if you need to test the front-end when the server is down?
If the server is not actually down, you can simulate this with Playwright by aborting a network call to load a page.
This would result in a webpage not being loaded, which can simulate the server being down.
You could then perform a UI test for some kind of "Page didn't load" error message.

Scenario 2:
What if your test doesn't require the webpage to load stuff like CSS or images?
You might have a test that's a purely functional test that doesn't require visual styles to load.
Say your test is to validate logging in to a website, you MIGHT not necessarily need the extra visual CSS to load.
You could abort the API call that loads the website CSS/images so you can just focus on logging in.
This technique could make the page load a little faster, saving some time and resources for tests.
HOWEVER, keep in mind that some websites DO require the CSS etc. to load in order for the website to be functional.
Aborting API calls to load CSS will sometimes impact the test, doing so should be case-by-case.
*/

import { test, expect, request } from "@playwright/test";

test("Udemy: Abort CSS and Log In", async ({ page }) => {
  /*---------------------------------------Login page--------------------------------------------*/
  /*---------------------------------------------------------------------------------------------*/

  //Using route.abort():
  //Here we're aborting the API call that loads the page CSS.
  //Using wildcard method "**/*.css" - this means "anything before and after the slash, with a .css extension".
  await page.route(`**/*.css`, (route) => route.abort());

  //Here we're blocking API any calls with common image extensions (i.e. we're blocking images from loading):
  await page.route(`**/*.{jpg, jpeg, png}`, (route) => route.abort());

  //Using page.on():
  //This method is used to listen for various events emitted by a page object.
  //It's useful for monitoring console output, network activity, dialogs, page load, and more.
  //We can use this to print request and response calls, allowing you to view which ones have failed (via the status code).
  //Here, we're listening for "request" calls and outptting the URLs:
  page.on(`request`, (request) => console.log(request.url()));

  //To check API call status codes, we need to listen for "reponse" calls.
  //Status codes are only part of a network call response.
  page.on(`response`, (response) => console.log(response.url(), response.status()));

  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  await page.fill(`input#username`, `rahulshettyacademy`);
  await page.fill(`[id="password"]`, `learning`);
  await page.locator(`#signInBtn`).click();

  await page.locator(`.card-title a`).first().waitFor();
  const productNames = await page.locator(`.card-title a`).allTextContents();
  console.table(productNames);
});
