//Section 16.87: How to run tests parallely from the same file by extending test option behaviour

/*
In the last section (Section_016_086) that Playwright's default behaviour for running tests is:
1. Each test (.spec) file runs Parallel to other test files.
2. Test blocks within each .spec file run in Serial.

This behaviour can be modified so that each test block in the same file will also run in Parallel.
Above the test blocks, you can use "test.describe.configure()" to modify behaviour.
To specifically run the test blocks in Parallel, we'll use "test.describe.configure({mode: `parallel`})"

-----Pros and Cons of running test in Serial vs. Parallel?-----
Pros of Serial:
1. Predictability and Stability (tests don't interfere with each others' state).
2. Better for Tests with Shared States (avoids race conditions or data corruption).
3. Less Recource Intensive (uses fewer system resources like CPU & memory).

Cons of Serial:
1. Slower Overall Execution Time (total test suite time will take longer).
2. No Utilisation of Multi-core CPUs (doesn't take advantage of parallelism).

Pros of Parallel:
1. Faster Test Execution (multiple tests run simultaneously, reducing total test times significantly).
2. Better Use of System Resources (utilises multi-core CPU capabilities effectively).

Cons of Parallel:
1. Potentially Flaky Tests (tests that share states or data may cause race conditions or conflicts).
2. Increased Resource Usage (more CPU and memory consumption may slow down other processes).
3. Harder to Debug (when failures occur, it can be trickier to determine which test caused the issue).

-----Best Practices?-----
1. Use Parallel testing when you have a large test suite made up of isolated tests (unit tests, stateless tests).
2. Use Serial testing when tests share states/resources or integration/e2e tests that require order or exclusive access.
3. Try to write tests that do not depend on side effects or shared states, to maximise parallelisation benefits.
*/

import { test, expect } from "@playwright/test";

//Here we're forcing the 3 test blocks within this file to run in Parallel mode:
test.describe.configure({ mode: "parallel" });
//test.describe.configure({ mode: "serial" });

/* 
What's the point of forcing Serial mode if tests default to running in Serial anyway?
The advantage here is that if the first test fails, it will skip the subsequent test blocks.
It makes sure that previous tests pass before sequentially moving onto the next one.

Let's say there's a test later on in the file that requires a previous test to pass.
If the previous test fails, then it's very likely that the later test will also expectedly fail.
We can skip the subsequent test that was dependant on the earlier test.
This means we're not wasting time waiting for the subsequent tests to (expectedly) fail.

Of course, if tests are not dependant on each other, then Parallel is the way to go.
*/

test("Udemy: Handling Frames - Parallel Tests Demo", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  const framesPage = page.frameLocator(`#courses-iframe`);
  await framesPage.locator(`li [href="lifetime-access"]:visible`).click();
  const headerText = await framesPage.locator(`.text h2`).textContent();
  console.log(headerText);
  const extractedNumber = headerText?.split(` `)[1].trim();
  console.log(extractedNumber);
  expect(Number(extractedNumber.replace(/,/g, ""))).toBeGreaterThan(0);
});

test("Udemy: Capturing Screenshots - Parallel Tests Demo", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  const textbox = page.locator(`#displayed-text`);
  const hideTextbox_Button = page.locator(`#hide-textbox`);
  const showTextbox_Button = page.locator(`#show-textbox`);
  await expect(textbox).toBeVisible();
  await expect(hideTextbox_Button).toBeVisible();
  await expect(showTextbox_Button).toBeVisible();
  await textbox.pressSequentially(`Hello`, { delay: 100 });
  await page.screenshot({ path: `screenshots/Before_Hidden.png` });
  await hideTextbox_Button.click();
  await expect(textbox).toBeHidden();
  await page.screenshot({ path: `screenshots/After_Hidden.png` });
  await showTextbox_Button.click();
  await expect(textbox).toBeVisible();
  await textbox.screenshot({ path: `screenshots/PartialScreenshot_Textbox.png` });
});

test("Udemy: Java Alert Popups - Parallel Tests Demo", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  page.on(`dialog`, (dialog) => dialog.accept());
  await page.locator(`#confirmbtn`).click();
  await page.locator(`#alertbtn`).click();
  await Promise.all([await page.locator(`#mousehover`).hover(), await page.locator(`.mouse-hover-content a`).first().click()]);
});
