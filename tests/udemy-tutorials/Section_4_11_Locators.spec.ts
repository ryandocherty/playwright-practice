//Section 4.11: Locators supported by playwright and how to type into elements on page

import { test, expect } from "@playwright/test";

/*
Generic username input box HTML example:
<input type="text" name="username" id="username" class="form-control">

if "id" is present:
CSS = tagname#id (or) #id
example = input#username

if "class" attribute is present:
CSS = tagname.class (or) .class
example = input.form-control

Write CSS based on any attribute:
CSS = [attribute='value']
example = [name="username"]

Write CSS with traversing from Parent to Child:
CSS = parentName >> childTagName

If you need to write the locator based on text:
text=""
*/

test("Udemy: Selectors Demo", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

  await page.locator(`input#username`).fill("Hello");
  await page.locator(`input#username`).clear();

  await page.locator(`[id="password"]`).fill("Hello");
  await page.locator(`[id="password"]`).clear();
});
