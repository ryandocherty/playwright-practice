console.log(`\n======================================================================================================`);
console.log(`Question 3: What is the difference between var, let, and const? Explain with examples.                  `);
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
