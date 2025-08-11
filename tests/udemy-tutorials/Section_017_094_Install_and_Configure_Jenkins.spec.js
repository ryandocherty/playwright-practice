//Section 17.94: Install & Configure Jenkins

/*
-----What is Jenkins?-----

Jenkins is an open-source automation server.
It's commonly used to implement continuous integration (CI) and continuous delivery/deployment (CD) pipelines.
It basically helps automate the parts of software development related to building, testing, and deploying.


----What does Jenkins do?-----

1. Automates repetitive tasks (build, test, package, deploy).
2. Triggers jobs from SCM events (pushes, PRs), timers, or manual triggers.
3. Orchestrates multi-stage pipelines (compile --> test --> package --> deploy).
4. Runs jobs on agents (workers) to scale builds in parallel or isolate environments.
5. Integrates with many tools through plugins (Git, Docker, Kubernetes, Slack, JUnit, etc.)


-----Core concepts of Jenkins-----

1. Controller: the central Jenkins server that provides the UI, manages jobs, schedules builds, and coordinates agents.
2. Agent: a machine (VM/container) that runs build jobs. Agents can be static machines, Docker containers, or dynamically provisioned in Kubernetes.
3. Job/Item: a configured task (freestyle job or pipeline).
4. Pipeline: code-defined job (Jenkinsfile) describing stages/steps; supports Declarative and Scripted syntaxes.
5. Jenkinsfile: a version-controlled file at repo root that defines your pipeline (so pipeline config is in code).
6. Plugins: extend Jenkins functionality (SCM integrations, build tools, test report publishers, credentials management).


-----How to install Jenkins-----

https://www.jenkins.io/doc/book/installing/windows/
*/
