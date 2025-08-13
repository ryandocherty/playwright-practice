//Section 17.90: How to generate HTML & Allure reporting for Playwright Framework tests

/*
So far we've been using the default HTML reports after executing tests.
HTML reports are totally fine to use, however there is another popular test report tool called Allure.
Allure is a third-party plugin.

-----What is Allure?-----
Allure is an open-source flexible lightweight multi-language test reporting tool.

It aggregates test results and generates visually appealing reports that include:
1. Test status summaries (passed, failed, skipped)
2. Detailed test steps and logs
3. Attachments like screenshots, videos, logs
4. History of test execution trends over time
5. Categories grouping and defects management

Playwright can be configured to generate allure-compatible result files.

-----HTML vs. Allure?-----
Which report tool you use depends on your needs, however it's best to cover both scenarios.

Use Playwright's built-in HTML reporter if you need:
1. A quick setup
2. Basic reports
3. Inline trace/screenshot viewing

Use Allure if you need advanced features like:
1. Test history/trend tracking
2. Rich metadata and categorised test results
3. Better integration with complex CI/CD pipelines
4. Cross-framework or multi-language reporting standards

In summary:
Allure reporting adds powerful, detailed, and customizable reports with history and rich data.
Playwright's built-in HTML report is simple, fast, and tightly integrated.
Evaluate based on project complexity, team preferences, and reporting needs.

-----How to use Allure reporting?-----
Install the Node module: 
    npm i allure-playwright 
    npm install -D allure-playwright

Install the Allure commandline:
    npm install -g allure-commandline

When running a test from the terminal, you need to specify "--reporter=line" first.
This formats the report into simple text-based report.
We then use this simple text report to generate the Allure report using "--reporter=line,allure-playwright".

So for example, your command might look something like this:
    npx playwright test --grep="@UI" --project=chromium --reporter=line,allure-playwright

NOTE:
Sometimes it's required to wrap the reporter in quotation marks.
Most shells pass "--reporter=line,allure-playwright" correctly as a single argument.
However, in some environments (like certain Windows terminals, or scripts), the argument can be split or mangled.
This causes Playwright to see an incorrect string.

So if you get an error like MODULE_NOT_FOUND, try something like this:
    npx playwright test --grep="@UI" --project=chromium --reporter="line,allure-playwright"

After the test execution is complete, an "allure-results" folder should appear.
You now need to generate the Allure report which will consolidate the data in this folder.
To do this, use the command:
    allure generate ./allure-results --clean

NOTE:
You may need to install Java on your system for this to work:
https://www.oracle.com/java/technologies/downloads/

A new folder called "allure-report" shouold now appear.
Type this command to open the report:
    allure open ./allure-report 
*/
