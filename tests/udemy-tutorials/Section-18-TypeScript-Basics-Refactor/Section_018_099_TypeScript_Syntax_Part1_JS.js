//Section 18.99: Deep dive into TypeScript type syntaxes and their usage - 1
//NOTE - This section is designed to be viewed alongside "Section_018_099_TypeScript_Syntax_Part1_TS.ts".

//==================================================
//   Dynamic Typing (JS) vs. Static Typing (TS)
//==================================================

let message = "Hello";
/*
We've create a simple JavaScript variable above.
"Hello" is a string that's present in the "message" variable.
"let" is a keyword. It's a scope variable.
At the moment, the scope of "message" is the entire file unless you define a block.
We're not specifying the type here, and JS intelligently infers the data type (string).

This is where the concept of TypeScript's Static Typing comes into play.
TypeScript checks data types during development itself (as you write code), catching errors before running the code.
JavaScript is dynamically typed, meaning type errors only surface at runtime.
In TypeScript, you need to explicitly specify the data type prior to running the code.

Static Typing helps catch errors before the code is run.
In JavaScript, you might accidentally attempt to reassign a variable to a different data type.
But this error won't surface until you run the code, at which point it'll throw a syntax error.
The code might actually run without throwing any error, but your logic could still be wrong and produce an unexpected result.
TypeScript will catch these syntax errors as you write the code.
*/

message = 10;
/*
Here we've no reassigned "message" to a number.
This is still valid JavaScript code and will be accepted.
JavaScript is dynamic and will change the data type of "message" from string to number at runtime.
If we were to print "message", it will print "10" (as a number).
This is not allowed in TypeScript and will throw an error immediately after typing the code.
*/

let age = 30;
let isActive = false;
let numbers = [1, 2, 3, 4, 5];
