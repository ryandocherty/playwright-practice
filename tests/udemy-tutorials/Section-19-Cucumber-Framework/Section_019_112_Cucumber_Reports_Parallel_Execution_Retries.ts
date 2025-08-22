//Section 19.112: Generate HTML reports for Cucumber Playwright & Rerun failed Scenarios

/*
==================================================
          Running Scenarios in Parallel
==================================================

You can run Cucumber tests in parallel with Playwright.
Playwright supports parallel test execution natively with its own test runner.
However, when using Cucumber, you need to manage parallelism a bit differently.

Cucumber does not natively support parallel execution within a single process.
However, it offers a way to run tests in parallel by spawning multiple processes.

You can use the --parallel flag with the Cucumber CLI:
npx cucumber-js --parallel <num_of_processes>

Here <num_of_processes> indicates how many parallel workers you want.

Note:
You cannot run entire .feature files in parallel.
You can run Scenarios in parallel, including those inside the same .feature file.
Cucumber’s design considers the Scenario as the smallest executable unit of work.


==================================================
      Best Practices for Parallel Scenarios
==================================================

1. Organise by logical features or user stories:
    Group scenarios that belong naturally under the same domain or functionality.
    If you have multiple scenarios that logically fit together, go ahead and group them in the same .feature file.

2. Avoid artificially bloating feature files:
    Don’t merge unrelated scenarios just for parallelism.

3. Balance scenario count:
    Having a reasonable number of scenarios per feature file helps parallelism without sacrificing readability.

4. Ensure test isolation on scenario level:
    Independent scenarios running in parallel avoid flakiness.

5. Use scenario outlines for repetitive scenario variations:
    This keeps features concise.

Parallelism will scale better with many scenarios across your whole test suite, not just inside one feature file.

The best strategy is probably to:
1. Write clear, focused .feature files representing meaningful user or business features.
2. Populate them with appropriately scoped scenarios.
3. Leverage Cucumber’s scenario-level parallelism as-is.


==================================================
      Considerations for Parallel Execution
==================================================

1. Isolate State: 
    Since multiple test processes run simultaneously, avoid sharing any global state.

2. Separate test data and browser contexts:
    Each scenario should instantiate its own Playwright browser or browser context.

3. Reporters compatibility:
    Make sure your reporter supports parallel execution.


==================================================
         Generating Reports in Cucumber
==================================================

You can generate reports with Cucumber to visualise your test run results.
There are several reporter options available, including built-in and third-party tools. 

Cucumber provides built-in formatters that output test results in various formats:
1. Pretty (console output)
2. HTML
3. JSON
4. JUnit XML
5. Summary
6. Usage

You can specify a formatter via the CLI using the --format (or -f) option.
For example:
npx cucumber-js --format html:reports/cucumber-report.html


==================================================
                Retries in Cucumber
==================================================

You can handle flaky tests with retries, which can help improve test suite stability.
Cucumber supports retries via CLI flags or programmatic config (cucumber.js file).

You can enable retries per scenario like this:
npx cucumber-js --retry 2

Retry Count Behaviour:
1. Cucumber retries only failed scenarios.
2. Scenarios that pass on retry are reported as passed.
3. The final failure is reported only if all retries fail.
*/
