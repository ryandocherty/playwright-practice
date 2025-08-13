//Section 18.99: Deep dive into TypeScript type syntaxes and their usage - 1
//NOTE - This section is designed to be viewed alongside "Section_018_099_TypeScript_Syntax_Part1_JS.js".

//==================================================
//   Dynamic Typing (JS) vs. Static Typing (TS)
//==================================================

let message1 = "Hello";
/*
TypeScript's type system is designed to be helpful without being overly strict.
It uses a feature called "type inference" to infer data types.
Here, TypeScript automatically infers that "message1" is of type "string" because we've assigned a string literal to it.

Note: 
TypeScript does not require explicit types everywhere.
It still enforces type safety because once "message1" is inferred to be a string, 
you cannot assign values of other types to it without errors.
If we now tried to assign "message1" to a number, it will immediately throw an error.

Example:
    message1 = 10; //Error: Type 'number' is not assignable to type 'string'.

Note:
It's possible for TypeScript code that contains errors to still get compiled.
It depends on your compiler settings and how strict you have your environment configured.
By default, TypeScript does not emit JavaScript if there are errors.
When you run the TypeScript compiler (tsc) normally and it encounters type errors or other compilation errors, 
it will not produce output JavaScript files.

Do NOT think of TypeScript errors as just "warnings".
TypeScript errors are true compile-time errors, not just warnings.
They signal issues that can cause bugs or unexpected behaviour.
*/

let message2: string = "Hey";
/*
It's best to specify the data type when declaring a variable to help catch errors before running any code.
The syntax is a colon, followed by the data type.
This will now be free of compile errors.
Specifying the type at variable declaration also helps with code clarity and readability (you'll know its intent).
 */

//Other simple data type examples:
let age1: number = 30;
let isActive1: boolean = false;

//You still need to specify the type when declaring arrays.
//However, you need to also specify that it's an array by using "[]":
let numbers1: number[] = [2, 4, 6, 8, 10];

//Sometimes you might not know the data type but you still want TypeScript coding standards.
//In this case, you can use "any" when declaring a variable.
//It will then perform just how JavaScript performs at runtime:
let data1: any = "This could be any data type";
data1 = 42;
data1 = false;
//Reassigning the variable has not cased any errors, because it's allowed to be any data type.

//==================================================
//           Running TypeScript Code
//==================================================

/*
TypeScript code needs to be compiled into plain JavaScript first before it can be executed.


    Your TypeScript code (*.ts) 
         ↓ compile (with tsc or build tools) 
    Plain JavaScript (*.js) 
         ↓
    Run on Node.js or in browsers


You can't just run the command "Node example.ts" similarly to how you run "Node example.js".
There is no runtime environment for TypeScript, so it needs to be converted to JavaScript first.

To do this, we typically use the TypeScript compiler "tsc".
Simply run the command:
tsc <fileName>.ts

This will generate a new .js file with the converted TypeScript code, but in standard JavaScript.
It will look different of course, e.g. it removes your explicit data types because they don't exist in JavaScript.

Even though we're now just running a JavaScript file, the advantage is safety and peace of mind.
We've used TypeScript for its ability to detect bugs early on.
We can now be confident that there will be no runtime errors when running the .js file it has generated.
*/

console.log(message1);
console.log(message2);
console.log(age1);
console.table(numbers1);
console.log(data1);
