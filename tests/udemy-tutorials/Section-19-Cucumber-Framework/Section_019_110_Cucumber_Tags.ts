//Section 19.110: Implement Cucumber Tags for features and also demo on Tagged Hooks to filter
//Related file: features\InvalidLogin.feature
//Related file: features\ProductPurchase.feature

/*
==================================================
              About Cucumber Tags
==================================================

Tags in Cucumber are labels you can add to your feature files, scenarios, or scenario outlines.
They help to organise, filter, and control which tests to run.
They are very useful for managing test suites, especially as they grow in size.


==================================================
         How to Implement Cucumber Tags 
==================================================

1. Tags start with @ and are placed above Feature or Scenario declarations.
2. They allow you to group scenarios logically (e.g., by feature area, priority, test type).
3. You can run or exclude tests based on tags using command-line options or config.

Example:

    @smoke @ui
    Feature: Product Purchase

    @happyPath @regression
    Scenario: Successful Product Purchase
        Given the user logs in with a valid email address and password
        When the user adds a product to the cart
        Then the product is displayed in the cart
        ...


==================================================
           Running Scenarios by Tags
==================================================

1. Run only scenarios with a tag:
npx cucumber-js --tags @smoke

2. Exclude scenarios with a tag:
npx cucumber-js --tags "not @wip"

3. Combine tags with AND/OR logic:
npx cucumber-js --tags "@smoke and not @wip"


==================================================
         Best Practices for Using Tags
==================================================

1. Use Tags to Categorise
    Examples: @smoke, @regression, @wip (work in progress), @ui, @api, @slow.

2. Keep Tag Names Consistent and Meaningful
    Use lowercase or camelCase consistently, e.g., @smoke, @critical.

3. Use Tags to Control Test Runs
    Run quick smoke tests before deployment.
    Run full regression overnight.
    Skip flaky tests temporarily with @wip.

4. Avoid Over-Tagging
    Only tag what you need to group or filter; too many tags can get confusing.

5. Document Your Tagging Strategy
    Make sure the team knows what each tag means and when to use it.


==================================================
                  Tagged Hooks
==================================================

Hooks can also be conditionally selected for execution based on the tags of the scenario.
Tagged hooks in Cucumber are hooks (like Before and After) that run only for scenarios or features with specific tags.
This allows you to execute setup or teardown code selectively based on the tags assigned to scenarios.

1. Hooks are blocks of code that run before or after scenarios.
2. Tagged hooks run only when the scenario or feature has matching tags.
3. You specify tags as arguments to the hook decorator.


Examples:

    Before({ tags: "@smoke" }, async function () {
    // setup code specific to smoke tests
    console.log("Running setup for smoke tests");
    });

    After({ tags: "@db" }, async function () {
    // cleanup code for database tests
    console.log("Cleaning up after DB tests");
    });

    Before({tags: "@foo and @bar"}, function () {
    // This hook will be executed before scenarios tagged with @foo AND @bar
    });

    Before({tags: "@foo or @bar"}, function () {
    // This hook will be executed before scenarios tagged with @foo OR @bar
    });


Use Case for Tagged Hooks
1. Initialise different test data sets for different types of tests.
2. Set up or clean up resources only when needed (e.g., database, API mocks).
3. Run flaky test handling or retries only for specific scenarios.
4. Enable specialised logging or reporting for certain scenarios.


Best Practices for Tagged Hooks
1. Keep tagged hooks focused and minimal.
2. Use tagged hooks to avoid cluttering all tests with setup/teardown code that only applies to some.
3. Combine with tags in feature files for clear intent.
*/
