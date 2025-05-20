//Section 9.44: How to handle & Automate frames with Playwright - Example

import { test, expect } from "@playwright/test";

test("Udemy: Handling Frames", async ({ page }) => {
  /*
  For this test we want to handle "frames" on a webpage.


  "Frames" definition:
  Frames refer to HTML elements that allow a webpage to display multiple separate 
  documents or content sources within the same browser window or viewport. 
  These documents can come from the same origin or a different origin.

  Frames can be created using the <iframe> (inline frame) tag. 
  An <iframe> allows for embedding external web pages and can also display internal content within the same site.

  Frames behave like separate browsing contexts. 
  Each frame can have its own HTML, CSS, and JavaScript, independent of the parent document or other frames. 
  
  This means that:
  1. You can interact with embedded content without affecting the parent document.
  2. Each frame can maintain its own history, and can trigger its own events.
  3. You may encounter cross-origin restrictions due to the Same-Origin Policy if accessing frames from different domains.


  When you first invoke a browser in Playwright, it has control over this "main" frame.
  But on some websites, they will attach child/embedded frames on the parent main frame.
  You have to explicitly tell Playwright when you want to interact with a child frame.
  */

  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

  //frameLocator() is the method used to locate webpage frames.
  //It will switch from the "main" frame to the frame specified.
  //This will return a new page object, similar to when you open a new tab.
  //The new page object will then become the page we interact with.
  const framesPage = page.frameLocator(`#courses-iframe`);

  //-----------New Selector Concept-----------
  //The selector used here "li [href="learning-path"]" resolves to 2 elements, however one of them is not in visible mode.
  //We can tell Playwright to only interact with the visible element by adding ":visible" to the end of the selector:
  await framesPage.locator(`li [href="lifetime-access"]:visible`).click();

  //Now let's interact with the new frame by extracting the number shown in a header.
  //Example: "Join 13,522 Happy Subscibers!"
  const headerText = await framesPage.locator(`.text h2`).textContent();
  console.log(headerText);

  //1. Split the text at each whitespace, returns an array
  //2. Array contains: [0]"Join", [1]"13,522", [2]"Happy", [3]"Subscibers!"
  //3. Return index[1] ("13,522"), but also trim whitespace:
  const extractedNumber: any = headerText?.split(` `)[1].trim();
  console.log(extractedNumber);

  //hello
});
