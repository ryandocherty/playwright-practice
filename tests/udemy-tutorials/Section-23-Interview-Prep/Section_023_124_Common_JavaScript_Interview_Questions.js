//Section 23.124. 75 Mins In detail discussion on commonly asked JavaScript Interview Questions

console.log(`\n======================================================================================================`);
console.log(`Question 1: Can a JavaScript object hold a function as a property?`);
console.log(`======================================================================================================\n`);

//The answer is yes:

const person = {
  fullName: "Jim Flimbo",
  age: 28,
  location: "England",

  //Here we have a function "greet" which uses the "person" object properties:
  greet: function () {
    console.log(`My name is ${this.fullName}, I'm ${this.age} and I live in ${this.location}.`);
  },
};

//When calling object properties, you do not need to use brackets:
console.log(person.fullName);
console.log(person.age);
console.log(person.location);

//When calling an object function, you need to use brackets:
person.greet();

console.log(`\n======================================================================================================`);
console.log(`Question 2: What are anonymous functions in Javascript? Define thier syntax and implementation.`);
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

console.log(`\n======================================================================================================`);
console.log(`Question 3: What is the difference between var, let, and const? Explain with examples.`);
console.log(`======================================================================================================\n`);

/*
Understanding the differences between var, let, and const is fundamental in JavaScript.
Especially since they each have different scoping and reassignment rules.
*/

/*
==========================
        1. var
==========================

Scope: Function-scoped (or globally scoped if declared outside any function).
Hoisting: Declarations are hoisted to the top of their scope and initialised with "undefined".
Re-declaration: Allowed.
Re-assignment: Allowed.
*/

var x = 23;
function varExample() {
  console.log(x); //Output: undefined (due to hoisting)
  if (true) {
    var x = 10;
    console.log(x); //Output: 10
  }
  console.log(x); //Output: 10 (var is function-scoped, not block-scoped)
}
varExample();
console.log(x); //Output: 23

//The var variable "x" is accessible anywhere inside the "varExample()" function.
//It is accessible even before it is declared (hoisted).
//It is NOT block-scoped - so it's visible outside the "if" block.
//Declaring a variable without var, let, or const (e.g. "x = 12") will default it to "var".

/*
==========================
        2. let
==========================

Scope: Block-scoped.
Hoisting: Declarations are hoisted but not initialised. Accessing before declaration causes a ReferenceError (Temporal Dead Zone).
Re-declaration: Not allowed in the same scope.
Re-assignment: Allowed.
*/

function letExample() {
  //console.log(y) //Output: ReferenceError: Cannot access 'y' before initialization
  if (true) {
    let y = 20;
    console.log(y); //Output: 20
    //let y = 30; //Output: Cannot redeclare block-scoped variable 'y'
  }
  //console.log(y); //Output: ReferenceError: y is not defined
}
letExample();

//The let variable "y" is only available within the "if" block.
//Trying to access "y" before declaration or outside the block will throw an error.
//You cannot declare two "let" variables with the same name in the same block.

/*
==========================
        3. const
==========================

Scope: Block-scoped (same as let).
Hoisting: Same hoisting behaviour as let (Temporal Dead Zone).
Re-declaration: Not allowed.
Re-assignment: Not allowed (must be initialised at declaration).
*/

function constExample() {
  const z = 30;
  console.log(z); //Output: 30
  //z = 40; //Output: TypeError: Assignment to constant variable
  if (true) {
    const z = 50; //This is a new variable, block-scoped
    console.log(z); //Output: 50
  }
  console.log(z); //Output: 30
}
constExample();

const constObj = { name: "Jimothy" };
constObj.name = "Timothy"; //This is allowed
console.log(constObj.name); //Output: "Timothy"
//constObj = {name: "Flimothy"}; //Output: TypeError: Assignment to constant variable

//Variables with const must be initialised when declared.
//You cannot reassign a const variable.
//However, if const is used with object or arrays, the *contents* can be modified, but the *binding* itself cannot.

console.log(`\n======================================================================================================`);
console.log(`Question 4: Explain the different methods for accessing and manipulating array elements.`);
console.log(`======================================================================================================\n`);

//Commonly used JavaScript array methods are "push", "pop", "slice", "shift", "splice", and "unshift".
//They are fundamental tools for manipulating arrays by adding, removing, or extracting elements.

//                0          1          2        3        4
const fruits = ["apple", "bananna", "orange", "mango", "grape"];

//Accessing array elements by index:
console.log(fruits[0]); //Output: "apple"
console.log(fruits[3]); //Output: "mango"

//Accessing the index (number) of elements in an array:
console.log(fruits.indexOf("bananna")); //Output: 1
console.log(fruits.indexOf("grape")); //Output: 4

//Iterating over arrays:
fruits.forEach((fruit, index) => {
  console.log(`${index} : ${fruit}`);
});

/*
  Output:
  0 : apple
  1 : bananna
  2 : orange
  3 : mango
  4 : grape
  */

/*
==========================
        1. push
==========================

Purpose: Adds one or more element(s) to the END of an array.
Returns: The new length of the array.
Modifies: The original array.
*/

const pushExample = ["apple", "bananna"];
pushExample.push("orange");
console.log(pushExample); //Output: ["apple", "bananna", "orange"]

/*
==========================
        2. unshift
==========================

Purpose: Adds one or more element(s) to the START of an array.
Returns: The new length of the array.
Modifies: The original array.
*/

const unshiftExample = ["apple", "bananna", "orange"];
unshiftExample.unshift("grape");
console.log(unshiftExample); //Output: ["grape", "apple", "bananna", "orange"];

/*
==========================
        3. pop
==========================

Purpose: Removes the LAST element from an array.
Returns: The removed element.
Modifies: The original array.
*/

const popExample = ["apple", "bananna", "orange"];
const lastElement = popExample.pop();
console.log(popExample); //Output: ["apple", "bananna"]
console.log(lastElement); //Output: "orange"

/*
==========================
        4. shift
==========================

Purpose: Removes the FIRST element from an array.
Returns: The removed element.
Modifies: The original array.
*/

const shiftExample = ["apple", "bananna", "orange"];
const firstElement = shiftExample.shift();
console.log(shiftExample); //Output: ["bananna", "orange"]
console.log(firstElement); //Output: "apple"

/*
==========================
        5. slice
==========================

Purpose: Returns a shallow copy of a portion of an array without modifying the original.
Parameters: slice(startIndex, endIndex) - extracts elements from startIndex up to but NOT including endIndex.
            If the parameters are omitted, it just copies the whole array.
Returns: New array with extracted elements.
*/

//                      0          1          2        3        4
const sliceExample = ["apple", "bananna", "orange", "mango", "grape"];
const slicedArray = sliceExample.slice(1, 3);
console.log(slicedArray); //Output: ["bananna", "orange"]
console.log(sliceExample); //Output: ["apple", "bananna", "orange", "mango", "grape"]
const unchangedArray = sliceExample.slice();
console.log(unchangedArray); //Output: ["apple", "bananna", "orange", "mango", "grape"]

/*
==========================
        6. splice
==========================

Purpose: Add, remove, or replace elements at any posiiton in an array.
Parameters: splice(startIndex, deleteCount, item1, item2, ...).
            Using a negative startIndex starts from the end of the array.
            Having no deleteCount will delete every element after the startIndex.
Returns: Array containing the removed elements (empty if none are removed).
Modifies: The original array.

1. Starting from "startIndex", remove "deleteCount" elements from array.
2. Then, insert any additional items (if provided) starting from "startIndex".
*/

//Removing elements with splice:
//                       0          1          2        3        4
const spliceRemoved = ["apple", "bananna", "orange", "mango", "grape"];
let removed = spliceRemoved.splice(1, 3);
console.log(spliceRemoved); //Output: ["apple", "grape"]
console.log(removed); //Output: ["bananna", "orange", "mango"]

//Adding elements with splice:
//                     0          1          2        3        4
const spliceAdded = ["apple", "bananna", "orange", "mango", "grape"];
spliceAdded.splice(3, 0, "blueberry", "raspberry");
console.log(spliceAdded); //Output: ["apple", "bananna", "orange", "blueberry", "raspberry", "mango", "grape"]

//Replacing elements with splice:
//                       0          1          2        3        4
const spliceReplaced = ["apple", "bananna", "orange", "mango", "grape"];
let replaced = spliceReplaced.splice(1, 2, "blueberry", "kiwi");
console.log(spliceReplaced); //Output: ["apple", "blueberry", "kiwi", "mango", "grape"]
console.log(replaced); //Output: ["bananna", "orange"]

//Using a negative index with splice:
//                       0          1          2        3        4
const spliceNegative = ["apple", "bananna", "orange", "mango", "grape"];
spliceNegative.splice(-2, 1);
console.log(spliceNegative); //Output: ["apple", "bananna", "orange", "grape"]

/*
==========================
  When to use each method
==========================

Use "push" and "unshift" when you need to ADD elements to an array.
Use "pop" and "shift" when you need to REMOVE elements from an array.
Use "slice" when you need to COPY parts of an array without changing the original.
Use "splice" when you need to modify specific parts of an array, while also modifying the original.

==========================
     Example usage
==========================


*/
