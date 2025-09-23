console.log(`\n======================================================================================================`);
console.log(`Question 6. What are promises in JavaScript? Explain the differences between callbacks and promises.`);
console.log(`======================================================================================================\n`);

/*
A Promise is an object that represents the eventual completion (or failure) of 
an asynchronous operation and its resulting value.
Instead of immediately returning the final value, an asynchronous function returns a Promise object
that will eventually be resolved with that value or rejected with an error.
Promises are are more modern approach to handling asynchronous operations.

Key states of a Promise:
1. Pending: Initial state, neither fulfilled nor rejected.
2. Fulfilled/Resolved: Operation completed successfully.
3. Rejected: Operation failed.

Benefits of Promises:
1. Avoid "callback hell" by chaining asynchronous operations.
2. More readable and maintainable asynchronous code.
3. Better error handling via .catch()

What is Callback Hell?
Also sometimes called the "Pyramid of Doom", this happens when you have multiple nested asynchronous operations using callbacks.
The code becomes deeply indented and difficult to read, understand, maintain, and debug.
This usually occurs when each asynchronous operation depends on the result on the result of
the previous one, so you nest callback inside callbacks repeatedly.
*/

/*
Using the previous "fetchData()" example, we need the data to be fetched before invoking "modifyData()".
When you use setTimeout() to wait for some event, you specify a delay duration in miliseconds, but:

1. You don't know exactly how long the operation will take - you're essentially guessing.
    It can be longer/shorter depending on factors like network speed, server response time, or processing.

2. If you guess a time that's too short, your code might try to use data before it's ready.
    This can result in errors and/or uncomplete data.

3. If you guess a time that's too long, your code wastes time unnecessarily.
    This can cause slower performance and bad user experiences.

A better and more modern approach is to use Promises or asynch/await.
Promises and asynch/await allow you to wait precisely until the data is ready, without guessing timeouts.
*/

//====================================================
//      Example with setTimeout() (old approach)
//====================================================

function _fetchData(callback) {
  console.log(`Fetching data...`);

  setTimeout(() => {
    console.log(`Fetching data is taking longer than 3 seconds...`);
    const data = "NULL/INCOMPLETE";

    callback(data);
  }, 3000); //Waiting 3 seconds, but fetching the data could take longer than this!
}

function _processData(data) {
  console.log(`Processing: ${data}...`);
}

//_fetchData(_processData); //Output: NULL/INCOMPLETE

//====================================================
//      Example with Promise (modern approach)
//====================================================

function fetchData() {
  //First you create a new Promise object.
  //Promises can either be in the state Pending, Resolved, Rejected.
  //While Pending, this function will not Resolve, meaning it fully waits for the data to be fetched.
  //If rejected, it will not

  return new Promise((resolve) => {
    console.log(`Fetching data...`);

    setTimeout(() => {
      console.log(`Promise Resolved! Data has been fetched.`);
      const data = "Complete Data";
      resolve(data);
    }, 3000);
  });
}

function processData(data) {
  //Do some processing on the fetched data.
  console.log(`Processing: ${data}`);
}

/*
Here we then use the Promise with the ".then()" method.
The .then() method is fundamental when working with JavaScript Promises.
This is a method available on a Promise instance.
It allows you to specify what should happen when the Promise is fulfilled (resolved) successfully.

It takes 2 optional callback functions as arguments:
promise.then(onFulfilled, onRejected);

onFulfilled: Function called when the Promise is resolved successfully. Recieved the resolved value.
onRejected: This is optional. Function called if the Promise is rejected. Received the error.

Almost always, .then() is used with just the first function (for success), and errors are caught in a .catch() later.

In the example below, the first argument is a callback function, which calls processData().
The first argument is what you want to happen onFulfilled, which in his case is to call processData().
If the Promise was rejected (i.e. data was not fetched), it would invoke the 2nd .then() arg, onRejected.
This means it would not call the processData() function (as desired).
The .then() method is also not executed while the Promise is in the pending state.
*/

fetchData()
  .then((data) => {
    processData(data);
  })
  .catch((error) => {
    console.error(`Error: ${error}`);
  });
