//Section 5.19: Using async await with Assertions and understand validating the attributes

import { test, expect } from "@playwright/test";

test("Udemy: Using Async Await With Assertions, Validating Attributes", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

  /*
  For this test I want to check that a link on the website is "blinking".
  Basically, the link is constantly fading in and out, i.e. "blinking".

  The HTML for the blinking link is as follows:

  <a href="https://rahulshettyacademy.com/documents-request" 
    class="blinkingText" target="_blank">Free Access to InterviewQues/ResumeAssistance/Material
  </a>
  
  There's no built-in Playwright method to directly check that the link is blinking.
  However, it has class="blinkingText" which we can use for the check.

  There's a method called toHaveAttribute(), so we can at least check
  that the link/banner has this class.
  */

  const blinkingtextBanner = page.locator(`.blinkingText`).first();
  await expect(blinkingtextBanner).toHaveAttribute(`class`, `blinkingText`);
});
