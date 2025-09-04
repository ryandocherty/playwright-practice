//Section 20.114: Running tests in Parallel in Azure cloud hosted browsers using commands

/*
==================================================
           Getting Started with Azure
==================================================

1. https://azure.microsoft.com/en-us/get-started/azure-portal/
2. Sign up (because it's Microsoft, it requires a creepy amount of personal information).
3. On the Portal dashboard, select "Create a Resource".
4. Search and select "Microsoft Playwright Testing".
5. Select "Create".

This should display a page to create a workspace.
As of now, our Playwright tests are sitting on a local machine in VSCode (local workspace).
The goal is to now deploy the repository onto the cloud machines and execute in the cloud browsers.
To do this we need to create a workspace on a cloud machine.
This requires a workspace name and region under "Instance Details".

Under "Project Details", there is also a "Resource Group" option.
This allows multiple workspaces to be part of a parent resource.
Today we're creating one workspace, but tomorrow you could create another and so on.
You can group each workspace under one resource and give permissions on resource-level.
This means all the child workspaces can share common access to resources.

6. Under Project Details -> Resource Group, enter a name such as "PlaywrightTesting".
7. Under Instance Details -> Name, enter a name such as "PRTest" (has to be unique).
8. Select "Review + Create".

This should display a page showing "Deployment is in Progress", which will take some time.
Now we've created an Azure account, and created our first resource for Playwright testing.


==================================================
        Connect Local Workspace to Azure
==================================================

Quickstart Guide: https://learn.microsoft.com/en-us/azure/playwright-testing/quickstart-run-end-to-end-tests

Prerequisites:
1. An Azure account with an active subscription.
2. Your Azure account needs the Owner, Contributor, or one of the classic administrator roles.
3. A Playwright project.
4. Azure CLI.

To get started with running your Playwright tests at scale on cloud browsers, 
you first create a Microsoft Playwright Testing workspace in the Playwright portal.

1. Go to https://aka.ms/mpt/portal and sign in.
    If you use Azure to run your tests, this portal will be where your results are displayed.
    On the portal page, you should see the workspace that was created earlier.

2. Click on the desired resource/workspace.
    This page should display all of the details on how to connect your tests to the cloud.

3. Install Playwright Testing service package - "npm init @azure/microsoft-playwright-testing"
    After it's installed, you'll see a new Azure dependency in your package.json file.
    It also creates a new config file by default - playwright.service.config.js
    So far we know that the typical playwright.config.js file is the heart to run your entire Playwright framework.
    Whenever you run Playwright tests, the playwright.config.js is the first route point where text execution starts.
    Similarly, you have to use playwright.service.config.js to configure Azure cloud tests.

4. Set Up Authentication - "az login"
    You need to provide the credentials associated with your Azure account.
    For this step, you need to install "Azure CLI" first (https://learn.microsoft.com/en-us/cli/azure/install-azure-cli-windows).
    After running the "az login" command, it will redirect you to the browser to login.
    After logging in, in the terminal you'll see a "Tenant and subscription selection".
    Just hit Enter to select the default tenant and subscription.
    After successful authentication, your local system can now talk to the cloud.

5. Add Region Endpoint - "PLAYWRIGHT_SERVICE_URL={MY-REGION-ENDPOINT}"
    Each Azure account has its own "Endpoint" where the tests are run, each account is assigned an endpoint.
    In reality, if your company has multiple projects, each person can use their own endpoint to run their hosted tests.
    Your framework will look for the variable "PLAYWRIGHT_SERVICE_URL".
    Within the "@azure/microsoft-playwright-testing" package, there is the PLAYWRIGHT_SERVICE_URL variable.
    This variable is a URL where all your tests will run.

6. Run the Tests - "npx playwright test --config=playwright.service.config.ts --workers=20"
    Because we're working with cloud computers, you can specify a lot more workers for parallel execution.

7. View the Report
    Go to your workspace, and you should now see a report of passes, failures, and flaky tests.
    The reports have a similar look and feel to a typical Playwright report.
    Reports will allow you to debug failed steps, view screenshots, and open the trace viewer directly from the report.
*/
