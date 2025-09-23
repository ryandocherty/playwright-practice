console.log(`\n======================================================================================================`);
console.log(`Question 6. What are callback functions in JavaScript?                                                  `);
console.log(`======================================================================================================\n`);

/*
A callback function is a function that is passed as an argument to another function,
and is invoked (called back) inside that function to complete some kind of action.

This pattern allows you to:
1. Execute code *after* a certain task is done.
2. Handle asynchronous operations.
3. Customise behaviour by passing different functions.

Why use callbacks?
Javascript uses callback extensively to deal with:
1. Asynchronous operations (timers, network requests, file I/O).
2. Event handling.
3. Customising functions with user-defined behaviour.
*/

//====================================================
//      Example WITHOUT callbacks (synchronous)
//====================================================

function _fetchData() {
  //Fetch data from server (e.g. an API call).
  //This will likely not be instant, and could take a few seconds.
  //Without callbacks, JavaScript will not wait for the data to be fetched (this will cause problems down the line).

  return data;
}

function _processData(data) {
  //Process the data that was fetched from the server.
  //Without an asynchronous callback, the data was likely not fetched properly and is empty/null/incomplete.

  console.log(`Processing ${data}`);
}

/*
Typically, you'd now call fetchData() and then processData().
If fetching the data was instant, you could write:

data = fetchData();
processData(data);

The problem is that fetching data is practically never instant, and could take a few seconds.
The data you're trying to fetch could be from an API call server response, or read from a file etc.
JavaScript will execute the code line-by-line and won't wait until the data is fetched.
It will immediately move onto executing processData(), but there likely won't be any data to process and the code will fail.

This is where callback functions are useful (using promises is also valid and a more modern approach).
If you know one of your functions requires data that might take some time to retrieve, callbacks can be used.
This will enable asynchronous programming, meaning JavaScript will wait for the data to be fetched before moving on.
*/

//====================================================
//      Example WITH callbacks (asynchronous)
//====================================================

function fetchData(callback) {
  //Fetch data from server.

  //We can use setTimeout() to force JavaScript to wait while some code executes:
  setTimeout(() => {
    console.log(`Fetching data...`);
    console.log(`Data fetched!`);
    const data = "Some example data";

    //After the data has been fetched, we need to execute the processData() step.
    //In this case, we can pass the processData() function as an argument to this fetchData() function.
    //You can pass any function to this fetchData() function, which will be collected as the arg "callback":
    callback(data);
  }, 3000);
}

function processData(data) {
  console.log(`Processing: ${data}...`);
}

//Here we call fetchData(), and send the processData() function as the argument.
//It is collected in the fetchData() function as the argument named "callback".
fetchData(processData);

//Using the generic name "callback" makes it clearer that the fetchData() function is reusable.
//We might have multiple functions that are dependant on fetchData().

//Say we have another function to modify the data:
function modifyData(data) {
  console.log(`Modifying: ${data}...`);
}

//We can send the modifyData() function in the same way:
fetchData(modifyData);

//Every function we send to fetchData() will be collected in the "callback" argument in fetchData(callback).

//====================================================
//      More examples of callback functions
//====================================================

function greet(name) {
  console.log(`Hello, ${name}.`);
}

function processUserInput(callback) {
  let name = `Flim Jimbus`;
  callback(name);
}

processUserInput(greet);

/*
Explanation:

1. greet() is a function.
2. processUserInput() takes a function "callback" as a parameter.
3. Inside processUserInput(), it calls callback(name), which invokes greet(`Flim Jimbus`).
4. Output: Hello, Flim Jimbus.
*/
