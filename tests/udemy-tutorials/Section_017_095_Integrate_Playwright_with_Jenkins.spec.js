//Section 17.95: Integrate the Playwright framework with Jenkins and create parameterized Job

/*
Now that Jenkins is installed and we have a running server, we need to integrate it with our Playwright project.

-----Basic Jenkins Integration-----

1. Open Jenkins on your localhost server (like http://localhost:8080/).
2. Select `New Item` in the top left.
3. Enter a name (e.g. `PlaywrightFramework`).
4. Select the Item Type (e.g. Freestyle Project) and select OK.

This will open the project configuration page. 
Here you give the details on how you want to run your framework tests.
The first thing to configure is the project path location.
This can be locally, or a link to a Git repository.
If you give a Git repository, it will take the code from there.

5. For Git projects: under `Source Code Management` give the Git repository link.
6. For local projects: under `General`, click `Advanced`, then tick `Use custom workspace` and give the system path.
7. Under `Build Steps`, select `Execute Windows batch command`.

Here is where we specify the command we want Jenkins to execute.
This is where our custom scripts inside package.json come into play.
We currently have a script called `regression-tests` in our package.json file.
This script runs `npx playwright test`, which executes all tests.
For now, this is the command we'll give to Jenkins.

8. Under `Command`, enter the desired command (e.g. `npm run regression-tests`).
9. Select `Save`.


-----Running the Tests with Jenkins-----

1. On the dashboard page, select `Build Now`.

This automatically triggers the test execution.
Jenkins will go to the project file path, then execute the given command.
You'll see a `Build Executor Status` section, which can be used to view the running tests.


-----Parametrise the Project-----

We're currently hard-coding the command in Jenkins, but have multiple custom scripts in the package.json file.
We can parameterise these in Jenkins so that you can select from multiple custom scripts.
This way, we can dynamically tell Jenkins which script to execute at runtime.

1. Open the `PlaywrightFramework` job and select `Configure` on the left side panel.
2. Under `General`, tick `This project is parameterised`.
3. Select `Add Parameter`, then select `Choice Paramater`.
4. Enter a name (e.g. `Script`).
5. Enter the desired `Choices`.

The `Choices` here are our custom scripts in package.json, which are currently:
"scripts": {
    "ui-tests": "npx playwright test --grep=@UI --project=chromium",
    "web-tests": "npx playwright test --grep=@Web --project=chromium",
    "regression-tests": "npx playwright test"
},

Just give the exact names of the scripts: ui-tests, web-tests, regression-tests.
We now need to dynamically call this `Script` parameter.
We cannot just give `npm run Script` as the command.
Jenkins will treat `Script` as a string, but we need it to be a Jenkins variable.
To do this for Windows Batch Commands, we need to wrap the string in quotes and percentage signs.

6. Under `Build Steps`, under `Command`, enter `npm run "%Script%"` (instead of `npm run regression-tests`).
7. Select "Save".

Now on the dashboard page we see "Build with Parameters" (instead of "Build Now").

8. Select "Build with Parameters"
9. Select a parameter from the "Script" drop-down box.
10. Select "Build".

We can now dynamically choose which custom script from package.json is executed by Jenkins.


----Extra: Allure Reporting-----

We can add to our custom scripts:

"scripts": {
    "ui-tests": "npx playwright test --grep=@UI --project=chromium",
    "web-tests": "npx playwright test --grep=@Web --project=chromium",
    "regression-tests": "npx playwright test"
},

To include Allure reporting:

"scripts": {
    "ui-tests": "npx playwright test --grep=@UI --project=chromium --reporter=line,allure-playwright",
    "web-tests": "npx playwright test --grep=@Web --project=chromium --reporter=line,allure-playwright",
    "regression-tests": "npx playwright test --reporter=line,allure-playwright"
},
*/
