//Section 17.93: How to create custom scripts to trigger the tests from package.json file

/*
You can create custom scripts in the package.json file to trigger specific tests.
The package.json file is an important core file within your project (alongside the playwright.config file).
You can drive a lot of the test execution through the package.json file.

A package.json file looks something like this:

{
  "name": "playwright-test",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {},
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": "",
  "type": "module",
  "devDependencies": {
    "@playwright/test": "^1.54.1",
    "@types/node": "^22.13.10",
    "allure-playwright": "^3.3.2",
    "typescript": "^5.8.2"
  },
  "dependencies": {
    "dotenv": "^16.5.0",
    "exceljs": "^4.4.0"
  }
}

In the "scripts" section, you can add custom scripts that can be used to trigger specific tests.
For example, we can add a script that will only trigger tests with a specific tag (like "Web").
Simply put, you can create a shortcut to trigger tests instead of typing out a long command in the terminal.

These commands trigger tests that are tagged with "UI" or "Web" using the Chromium project:
npx playwright test --grep="@UI" --project=chromium
npx playwright test --grep="@Web" --project=chromium

We can add customs scripts like this:

"scripts": {
    "ui-tests": "npx playwright test --grep=@UI --project=chromium",
    "web-tests": "npx playwright test --grep=@Web --project=chromium",
    "regression-tests": "npx playwright test"
},

NOTE - using --grep="@UI" (with quotes) can cause issues.

Then in the terminal, you use the command "npm run..." to trigger a script.
Note - we use "run" here, which targets the "scripts" section in the package.json file.

Examples:
npm run ui-tests
npm run web-tests
npm run regression-tests
*/
