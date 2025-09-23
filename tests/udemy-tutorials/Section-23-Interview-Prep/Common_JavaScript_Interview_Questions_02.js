console.log(`\n======================================================================================================`);
console.log(`Question 2: What are anonymous functions in Javascript? Define thier syntax and implementation.         `);
console.log(`======================================================================================================\n`);

/*
An anonymous function is a function that is declared without any named identifier.
Unlike regular functions which have names, anonymous functions are defined inline without a name.
They are often used as arguments to other functions, immediately invoked, or assigned to variables.

Why use Anonymous Functios?
1. To create functions on-the-fly without needing to reuse them elsewhere.
2. To pass functions as arguments (callbacks).
3. To write Immediately Invoked Function Expressions (IIFE).
4. To keep the global namespace clean by not introducing named functions unnecessarily.
*/

//This is how you'd typically define a (named) function:
function sayHello() {
  console.log(`Hello, World!`);
}

//Then you'd invoke the function like so:
sayHello();

//Or you could use "return" and then store it in a variable:
function sayGoodbye() {
  return "Goodbye, World!";
}
const goodbyeMessage = sayGoodbye();
console.log(goodbyeMessage);

/*
These functions are not anonymous because they have names (sayHello, sayGoodbye).
With named functions, you typically invoke them using their names.
But if the function does not have a name, how do you invoke them?
*/

//=======================================================================
// Anonymous Function - Assigning to a Variable
//=======================================================================

//One common technique is to store the function as a variable:
const greet = function (name) {
  return `Hello, I am ${name}.`;
};

//Then you can use the "greet" variable to invoke the anonymous function:
console.log(greet("Duane Dibbley"));

//Here, the function is anonymous because it has no name after "function".
//It's assigned to the variable "greet".

//=======================================================================
// Anonymous Function - As Callbacks
//=======================================================================

/*
A callback is a function you pass as an argument to another function,
and that function is expected to invoke (call back) the passed-in function at some point.
This allows you to run code *after* a certain task has completed.
This makes your programs more flexible and enables asynchronous programming.
*/

setTimeout(function () {
  console.log("This function executed after 2 seconds.");
}, 2000);

//Here, the function is passed to "setTimeout()" as a parameter.
//The function is anonymous and executes after 2 seconds.

//=======================================================================
// Anonymous Function - Immediately Invoked Function Expression (IIFE)
//=======================================================================

//This function funs right after its definition - useful for scoping variables.
(function () {
  console.log("This function runs immediately.");
})();

//=======================================================================
// Anonymous Function (Modern Syntax) - Arrow Functions
//=======================================================================

//This arrow function is anonymous and assigned to the variable "add".
const add = (a, b) => a + b;
console.log(add(10, 20));
