//Section 11.56: How to debug the API steps in script using Visual code debugging
//Section 11.57: Detailed view of Trace viewer to understand the API logging req/responses

/*
How do you debug when there's a mix of web UI automation, and API calls?

Playwright Inspector debugging is useful when you're only debugging UI automation code,
but it doesn't really help if you want to debug API calls.
When debugging using "--debug" in the terminal, it will skip any code for API calls.

What if something goes wrong with an API call?
Maybe an incorrect payload was provided or there was an error in the response.
The Playwright Inspector won't be able to help debug in this case.
You need to be able to inspect and debug the API call and see the actual data being passed,
or the exact error message that was received from a response etc.

This is possible with VSCode Debugger, or Trace Viewer.

-------------------------------------------------------------------------------------------------------------
Debugging steps with VSCode Debugger:
1. Open the package.json file.
2. Find the ""scripts": {}" part.
3. Create a "test" property underneath this (if not already present).
4. Add the command you'd use to run a test.

It should look something like this:

"scripts": {
    "test": "npx playwright test Section_010_051_API_Utils_Refactor.spec.js --headed"
},

5. Press Ctrl+Shift+P.
6. Find "Debug: Debug npm script".

When you select this option, the control will navigate to the package.json file.
As the name "Debug npm script" suggests, it finds the "scripts" section of the package.json file,
then runs the "test" property with the command provided, with a debugger attached.
Before selecting "Debug npm script", add a breakpoint to a specific line of code you want to debug from.

Once you run "Debug npm script", it will now start debugging from the breakpoint.
A toolbar will open with several options, allowing you to step-in, step-over etc.
Hovering over a variable will show the exact data/value that it holds at that point in time.

NOTE:
Playwright has a timeout feature which usually defaults to 30 seconds.
Debugging will likely take longer than this, at which point the test execution will fail and stop debugging.
Before debugging, increase the timeout in playwright.config to avoid this.


-------------------------------------------------------------------------------------------------------------
Debugging steps with Trace Viewer:
1. Open the playwright.config file.
2. Make sure "trace" is activated in some capacity ("retain-on-failure" or "on").
3. Run the desired test.
4. Open the generated trace.zip file (can drag+drop on https://trace.playwright.dev/).
5. Find the API call in the trace viewer (e.g. apiRequestContext.post).

Each tab will show different information, but "Call", "Log", and "Network" will show the important data.

For example, in the "Network" tab, you can select an individual API call.
This can show the Request, Response, and Body of an API call,
which will allow you to view the Payload sent and the response from the API call.
*/
