//Section 20.113: Introduction to Azure & Playwright cloud workspace resource creation steps

/*
PREFACE NOTE:
I'll not be doing any practical work as part of this section.
I'll just be watching the Udemy tutorials, doing some extra reading/research, and making notes.
Microsoft Azure requires a creepy amount of personal information which makes me uncomfortable.
They require your home address, phone number, and a debit/credit card.
All this to "verify your identity", which is disingenuous and absurd to me.
In the real world, an organisation is likely to already have an existing & paid Azure subscription.
*/

/*
==================================================
              What is Azure Cloud?
==================================================

Microsoft Azure is a comprehensive cloud computing platform provided by Microsoft.
Azure allows you to build, deploy, and manage applications and services through Microsoft-managed data centres.
It supports numerous programming languages, frameworks, and tools.

It offers a wide range of cloud services including:

1. Computing Power - virtual machines, app services, serverless functions (Azure Functions).
2. Storage - blob storage, databases, file storage.
3. Networking - virtual networks, load balancers, VPN gateways.
4. DevOps and Monitorin - CI/CD pipelines, application monitoring, logs.
5. AI and Analytics - cognitive services, machine learning models.
6. Identity Management - Azure Active Directory.


==================================================
              Azure with Playwright
==================================================

Azure and Playwright can be connected in common ways.

1. Running Playwright Tests in Azure Pipelines (CI/CD):
    Azure DevOps provides pipelines where you can automate your build and deployment processes.
    You can integrate Playwright to run your end-to-end tests as part of your CI/CD pipeline in Azure DevOps.
    This lets you ensure your applications works correctly with every code change automatically.

2. Hosting Applications on Azure and Testing with Playwright:
    When you deploy your application to Azure, you can use Playwright to test the live app hosted in Azure.
    This is just like you would test any web app.

3. Cloud-based Browser Testing Infrastructure:
    You can run Playwright tests on Azure Virtual Machines or use Azure Container INstances to host browsers for tests.
    This is especially useful for scalability and running tests in parallel on cloud-powered resources.

4. Using Azure Functions as Backend and Testing with Playwright:
    If your front-end interacts with serverless functions on Azure, you can write Playwright tests that ensure
    front-end integration works as expected.


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
The next tutorial will focus on connecting your local workspace to Azure.
*/
