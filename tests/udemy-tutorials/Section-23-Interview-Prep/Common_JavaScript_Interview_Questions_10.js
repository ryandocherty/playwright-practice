console.log(`\n======================================================================================================`);
console.log(`Question 10: Explain the difference between null and undefined.                                         `);
console.log(`======================================================================================================\n`);

/*
Understanding the difference between null and undefined is fundamental in JavaScript.

===========================
        undefined
===========================

Type: undefined is a primtive value and a type itself.
Meaning: it means a variable has been declared but has not yet been assigned.

It also occurs when:
1. You access a property that does not exist on an object.
2. A function does not return a value explicitly (implicitly returns undefined).
3. Function parameters that are not passed will default to undefined.
*/

let x;
console.log(x); //Output: undefined
console.log(typeof undefined); //Output: "undefined"

//When you define a function with parameters but call it without passing all arguments,
//the missing arguments automatically get assigned the value undefined.
function greet(name, age) {
  console.log(`Name: ${name}`);
  console.log(`Age: ${age}`);
}

//Only pass the first argument:
greet(`Stephen`);
//Output:
//Name: Stephen
//Age: undefined

/*
===========================
          null
===========================

Type: null is a primitive value but the type is object (this is actually a historical bug in JS).
Meaning: it represents "no value" or "empty value" - it's an assignment value that explicitly indicates "no value".
*/

let y = null;
console.log(y); //Output: null
console.log(typeof null); //Output: "object"

let user = {
  name: "Ciri",
  age: 14,
};

console.log(user); //Output: {name: "Ciri", age: 14}
user = null; //Reset "user" to null to indicate there's no "user" object available
console.log(user); //Output: null

/*
Practical example with null: Clearing a DOM element reference.

Define a reference to some DOM element:
let selectedElement = document.getElementById(`myElement`);

//Use the DOM element for something:
console.log(selectedElement); 

Later, clear the reference explicitly:
selectedElement = null;

By setting the variable to null, you help free up memory if the reference is no longer needed.
*/

/*
===========================
     Key Differences
===========================

| Aspect      | undefined                                                                   | null                                    |
| ------------| --------------------------------------------------------------------------- | --------------------------------------- |
| Type        | `undefined`                                                                 | `object` (quirk of JS)                  |
| Assigned by | JavaScript itself (default value)                                           | Programmer (explicit assignment)        |
| Usage       | Variable not initialized yet; missing function params or missing properties | Represents intentional absence of value |
| Meaning     | "value not assigned"                                                        | "no value" or "empty"                   |
*/

console.log(typeof undefined); //Output: "undefined"
console.log(typeof null); //Output: "object"
console.log(undefined == null); //Output: true (loosely equal)
console.log(undefined === null); //Output: false (strictly not equal)

/*
===========================
  Usage Recommendations
===========================

Use undefined to indicate variables that are not initialised.
Use null to indicate variables that you want to clear or reset explicitly.
*/
