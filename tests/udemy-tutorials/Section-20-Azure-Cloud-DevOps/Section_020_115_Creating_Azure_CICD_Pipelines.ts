//Section 20.115: Intro to Azure CI/CD Pipelines, Repos and setting up Playwright repo in cloud

/*
==================================================
        Implementing Azure CI/CD Pipelines
==================================================

To begin setting up Azure CI/CD pipelines, you need to do some setup of uploading your repository.
For example, a GitHub or Azure repository, then from there you can push the code to a CI/CD pipeline.
Having your code in a version control system accessible by Azure DevOps or Azure Pipelines is essential.
This allows the pipeline to pull your code, install dependencies, run tests, and deploy if needed.

Just like Jenkins, Azure also has their own DevOps portal where you can create jobs and push the repositories.
Azure has its own centralised place where you can push your repositories and create jobs (like in Jenkins).


==================================================
        Part 1: Add Repository to Azure
==================================================

1. Login to Azure DevOps.
2. On the portal, search for Azure DevOps Organisations.
3. Select "My Azure DevOps Organizations".
4. Sign in if prompted, and select an organisation (or create a new one if needed).
5. Under "Create a project to get started", enter a project name (e.g. "TestSpace").
6. Choose the project visibility, then select "Create Project".

Now within this project, you will be able to upload your repositories.
On the left-hand panel, you'll have everything you need related to managing the project.
This is where you can push a code repository, create pipeline jobs, environments (dev, prod, QA) to manage deployments etc.
You can also create test plans and test cases here, and track/execute the test cases and show passes/failures.
You can also upload "Artifacts" such as NPM packages.

7. On the left-hand panel, go to the "Repos" option.
8. Make sure your repository is git enabled (if not already) using "git init" command.
9. Follow the steps in the "Repos" section:
        a. command: git remote add origin <PLAYWRIGHT_SERVICE_URL>
        b. command: git push -u origin --all 
                Note: possible error will show because this command will just authenticate you Azure account initially
        c. command: git add .
                Note: this command adds all your files to the staging phase
        d. command: git status 
                Note: this is optional, just used to check that the files are actually staged
        e. command: git commit -m "first commit"
        f. command: git push -u origin --all
                Note: now this command should actually push your code

10. Go back to your project (e.g. "TestSpace") and check that the code is present.


==================================================
        Part 2: Create the CI/CD Pipeline
==================================================

Azure DevOps will create a pipeline based on instructions, which you should provide in a .yml file.
There is a guide that can be accessed by clicking "Configure your CI/CD pipeline" in the workspaces dashboard.

Guide:
https://learn.microsoft.com/en-us/azure/playwright-testing/quickstart-automate-end-to-end-testing

Scrolling down you'll see an example of the .yml file, which is mostly self-explanatory.
There are 3 tasks in this .yml file:

1. Install dependencies:
        It does this by looking at the dependencies in your package.json file.
        Without these dependencies, you cannot run any of your tests.

2. Run Playwright tests:
        In the .yml example file, you can see it does this by running the command:
        npx playwright test -c playwright.service.config.ts --workers=20

3. Upload Playwright report
        Simply uploads the results of the tests to the Azure portal.

This .yml file needs to be placed in your project.
Then you need to update the paths within the .yml file (the parts that say "update acordingly").
*/
