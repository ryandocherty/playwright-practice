console.log(`\n======================================================================================================`);
console.log(`Question 5. Is JavaScript Asynchronous? Prove with an example.                                          `);
console.log(`======================================================================================================\n`);

/*
The answer to this is nuanced.
JavaScript itself is "single-threaded", meaning it executes code line-by-line on a single main thread. 
However, JavaScript environments (like browsers or Node.js) provide asynchronous APIs.
These allow you to perform non-blocking operations, such as timers, nwetwork requests, file I/O, etc.
These asynchronous operations use callback functions, promises, async/await, or even loops to handle concurrency,
without blocking the main thread.
*/

//How to prove JavaScript's asynchronous behaviour with an example?
//Here's a simple example using "setTimeout()", which schedules a task to run asynchronously after a delay.

console.log(`Start`);

setTimeout(() => {
  console.log(`Inside setTimeout callback`);
}, 0);

console.log(`End`);

/*
Output:

  Start
  End
  Inside setTimeout callback

Explanation:
1. The 1st "console.log()" statement runs immediately.

2. Then "setTimeout()" schedules the callback but does not run it immediately.
   Even with a 0 milisecond delay, the callback gets placed in the task queue.

3. The 2nd "console.log()" runs next.

4. After the synchronous code finishes, the event loop picks tasks from the queue.
   So then the "setTimeout()" callback runs.

 This demonstrates that the callback is executed asynchronously.
 JavaScript doesn't block waiting for the timer and continues running subsequent code.
*/

//Here's an example of an asynchronous pattern using Promises:

console.log(`Before Promise`);

Promise.resolve().then(() => {
  console.log(`Inside Promise then`);
});

console.log(`After Promise`);

/*
Output:

  Before Promise
  After Promise
  Inside Promise then

Promises' "then()" callbacks run in the microtask queue.
These run after the current synchronous code but before macrotasks like "setTimeout()".

Summary:
JavaScript executes code synchronously line-by-line.
Asynchronous operations (timers, network requests, promises) are handled via event loops and queues.
You can provide asynchronous behaviour by scheduling callbacks and observe they run *after* synchronous code completes.
The event loop processes all microtasks in the microtask queue before it processes the next macrotask from the macrotask queue.

Simplified Event Loop Cycle:
1. Execute all synchronous code and function calls on the call stack.
2. When the call stack is empty:
    Process all microtasks in the microtask queue (e.g. Promises).
    Then process one macrotask (e.g. a setTimeout callback).
3. Repeat, as long as tasks exist or new asynchronous events occur.
*/

//Simple demonstration of the Event Loop Cycle:

console.log(`Start (synchronous code)`);

setTimeout(() => {
  console.log(`setTimeout callback (macrotask)`);
}, 0);

Promise.resolve().then(() => {
  console.log(`Promise.then callback (microtask)`);
});

console.log(`End (synchronous code)`);

/*
Output:

  Start (synchronous code)
  End (synchronous code)
  Promise.then callback (microtask)
  setTimeout callback (macrotask)


Note: this file has other synchronous and asynchronous code above, so this is the full output:

  Start
  End
  Before Promise
  After Promise
  Start (synchronous code)
  End (synchronous)
  Inside Promise then
  Promise.then callback (microtask)
  Inside setTimeout callback
  setTimeout callback (macrotask)
*/
