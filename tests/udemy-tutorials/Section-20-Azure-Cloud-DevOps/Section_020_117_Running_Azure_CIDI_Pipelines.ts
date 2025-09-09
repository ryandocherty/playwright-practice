//Section 20.117: Running Playwright CI/CD pipelines with detailed understanding of .yml file

/*
==================================================
             Create the .yml File
==================================================

The first essential step is to create a .yml file in the project level.
Only then will Azure DevOps will be able to recognise and create a pipeline out of it.
You can simply copy and paste the .yml template file provided in the guide.

The formatting and indentation of the .yml is very important here.
The template provided may have some formatting issues.
Even if you miss one proper indentation or space, it could cause issues and failures.


==================================================
             Example of the .yml File
==================================================

jobs:
  - job: Build
    steps:
      - task: PowerShell@2
        enabled: true
        displayName: "Install dependencies"
        inputs:
          targetType: "inline"
          script: "npm ci"
          workingDirectory: tests/ # update accordingly

      - task: AzureCLI@2
        displayName: Run Playwright Test
        env:
          PLAYWRIGHT_SERVICE_URL: $(PLAYWRIGHT_SERVICE_URL)
          PLAYWRIGHT_SERVICE_RUN_ID: $(Build.DefinitionName) - $(Build.BuildNumber) - $(System.JobAttempt)
        inputs:
          azureSubscription: "my_service_connection" # Service connection used to authenticate this pipeline with Azure to use the service
          scriptType: "pscore"
          scriptLocation: "inlineScript"
          inlineScript: |
            npx playwright test  --config=playwright.service.config.js --workers=20
          addSpnToEnvironment: true

      - task: PublishPipelineArtifact@1
        displayName: Upload Playwright report
        inputs:
          targetPath: tests/playwright-report/ # update accordingly
          artifact: "Playwright tests"
          publishLocation: "pipeline"


Things to update:

1. Update the path for "workingDirectory".
    This is simply the path to where your Playwright tests are located
    All of the tests in this project are located in the "tests" folder
    You can use "copy relative path" to get the correct path, which is just "tests/"

2. Add your service connection for "azureSubscription".
    Obviously this requires a valid Azure subscription (the free one is very limited)
    We need to create a service connection first:
    a. Go to Project Settings > Pipelines > Service connections > Create a service connection
    b. Select "Azure Resource Manager" and click Next (Playwright is considered a Resource)
    c. Select your Subscription once they load
    d. Select your Resource Group
    e. Provide a Connection Name (this will be the value you provide for "azureSubscription")

3. Update the path for "targetPath".
    This is simply the path to store your tests results
    This could be something like "tests/playwright-report/"

4. Commit and push the .yml file to the Azure repository.
    Once the .yml file has all the correct information, it needs to be pushed to the Azure repository.
    a. git add .
    b. git status
    c. git commit -m "pipeline file added"
    d. git push -u origin -all

Now that the .yml has been added to your Azure repository, we need to configure a pipeline to use the .yml file.


==================================================
       Configure Pipeline to use .yml File
==================================================

1. Go to your Azure project > Pipelines > Create Pipeline
2. On the "Where is your code" page, select "Azure Repos Git"
3. Select the repository (e.g "TestSpace")
4. On the "Configure your pipeline" page, select "Existing Azure Pipelines YAML file"
5. On the "Select an existing YAML file" panel, under "Path", select the .yml file (e.g. "azure-pipeline.yml")
6. On the "Review your pipeline YAML" page, check that it's correct

One final thing you need to do is provide the PLAYWRIGHT_SERVICE_URL.
You don't need to change the value in the .yml file, as it can be provided as a template literal, i.e. "$(PLAYWRIGHT_SERVICE_URL)".
1. On the "Review your pipeline YAML" page, click Variables > New Variable
2. Under "Name", enter "PLAYWRIGHT_SERVICE_URL"
3. Under "Value", provide your PLAYWRIGHT_SERVICE_URL (looks something like "wss://westeurope.api.playwright.microsoft...")
4. Click "OK" to save the variable
5. Finally click "Run"

From here, it does not need any more information.
From the .yml file, it will follow the instructions provided:

Step 1. It will install the required dependencies
Step 2. It will run the command provided in "inlineScript"
Step 3. It will output your test results report

You can view the pipeline under Pipelines > Jobs > Build.
Once the job is complete, it should provide a link to the report.

If you want to change the amount of workers, edit the command given under "inlineScript" in .yml file.
Add the line "--workers=X" (this is dependant on your subscription).
You can commit the .yml file change directly in the Azure repository, which will trigger the jobs to run again automatically.
This is the basic idea of CI/CD integration.


==================================================
                    Conclusion
==================================================

This is the beauty of CI/DC seamless integration with Azure.
We've now integrated our tests into the Azure DevOps pipeline.
We have our code repository, cloud hosting, execution, online reports, all outsourced to Azure.
All we have in our local system is a simple repository and we don't have to worry about our own DevOps solutions.
All the DevOps solutions have been outsourced to Azure, which handles everything on their cloud hosted resources.
You can also schedule jobs to run at certain times, like nightly runs, or whenever a code commit happens.
It will automatically handle the DevOps solutions for you and output a report for your organisation to see.
The reports are very similar to typical Playwright reports (because Microsoft), with passes/failures, screenshots, traces etc.
*/
