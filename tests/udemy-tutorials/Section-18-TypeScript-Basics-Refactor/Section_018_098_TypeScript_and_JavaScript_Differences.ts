//Section 18.98: Understand the differences between TypeScript & JavaScript

/*
==================================================
              What is TypeScript?
==================================================

TypeScript is a "superset" of JavaScript developed and maintained by Microsoft.
It adds "optional static typing" and other features to the JavaScript language.
The key idea behind TypeScript is to provide early detection of bugs through a type system.
It also enhances developer tooling with features like autocompletion, refactoring, and better code navigation.

All the JavaScript code we've written so far is also valid TypeScript code.
TypeScript = JavaScript + Additional Features.

Even if you don't use these additional TypeScript features, the code can still compile and execute.
However, TypeScript will complain that these features are not implemented in your existing JS code.

JavaScript runs on Node, which is a runtime environment designed for executing JavaScript code.
Unfortunately, TypeScript does not have a direct platform like Node to run on.
JavaScript is natively supported by web browsers and environments like Node.
Browsers and Node have JavaScript engines (e.g. V8) that interpret and execute JavaScript code on the fly.
You write .js files, and these engines understand and run that code immediately.

Browsers and Node do not understand TypeScript syntax natively.
TypeScript introduces additional features (e.g. static types, advanced syntax) that do not exist in JavaScript engines.
Before execution, TypeScript must be compiled (transpiled) into plain JavaScript that the environment can run.
This compilation step removes type annotations and converts newer or advanced syntax features into compatible JavaScript.
TypeScript relies on a compiler (like the TypeScript Compiler "tsc") to convert TS into JavaScript.
Once converted, Node or browsers run the generated JavaScript code.

TypeScript Code (.ts) --> compile --> Plain JavaScript --> Run on Node/Browsers.

The ultimate goal of TypeScript is to catch errors during development, BEFORE executing any code.
TypeScript's goal is to prevent these errors from making it to runtime.


==================================================
          Key Features of TypeScript
==================================================

1. Static Typing:
    You can explicitly declare variable types (e.g. string, number, boolean, custom interfaces).
    This helps catch errors during development instead of at runtime.

2. Type Inference:
    TypeScript can infer types even when you don't explicitly declare them.
    E.g. "let x = 4", TypeScript will infer that "x" is of type "number".

3. Interfaces and Enums:
    Allows defining contracts and enumerations for better structure.

4. Advanced Language Features:
    Includes modern JavaScript features plus additional constructs like decorators, generics, namespaces, etc.

5. Compile-Time Checking:
    TypeScript code compiles down to clean JavaScript that can run anywhere JavaScript runs.

6. Better Tooling:
    Because of static types, editors (like VSCode) can provide superior code suggestions and error detection.


==================================================
           Playwright with TypeScript
==================================================

From https://playwright.dev/docs/test-typescript:

Playwright supports TypeScript out of the box. 
You just write tests in TypeScript, and Playwright will read them, transform to JavaScript and run.
Note that Playwright does not check the types and will run tests even if there are non-critical TypeScript compilation errors.
We recommend you run TypeScript compiler alongside Playwright.

So Playwright still converts TypeScript code into plain JavaScript internally.
*/
