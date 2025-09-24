console.log(`\n======================================================================================================`);
console.log(`Question 8.1. Create an inheritance relationship between a parent and child class.                      `);
console.log(`               Invoke the parent constructor from the child class.                                      `);
console.log(`               Create a main.js file to call the parent class methods from a child class object.        `);
console.log(`Question 8.2. Explain how the "super" and "this" keywords help achieve this solution.                   `);
console.log(`======================================================================================================\n`);

/*
Some interview questions may come packaged in the form of multiple steps, like this question.

We need to give a detailed example demonstrating class inheritance in JavaScript using "class" syntax, 
and explain how to invoke the parent class constructor from the child class using "super", 
as well as how to use "this" to access instance properties.

Key concepts:
1. extends - A keyword used to create a child class inheriting from a parent class.
2. super(...) - A keyword used to call the parent class constructor inside the child class constructor.
3. this - A keyword used which refers to the current instance of an object.

Example structure:
1. "Parent" class with constructor and methods.
2. "Child" class extends "Parent", calls the Parent constructor with "super()", adds new properties and methods.
3. main.js creates a Child instance and calls both Parent and Child methods.
*/

//====================================================
// Basic Example (without creating separate files)
//====================================================

//Step 1. Create a Parent.js file:
//--------------------Parent.js--------------------

export class Parent {
  constructor(name) {
    this.name = name; //Instance property
  }

  greet() {
    console.log(`Hello, my name is ${this.name}.`);
  }
}

//Step 2. Create a Child.js file:
//--------------------Child.js--------------------

//import {Parent} from "./Parent.js"

export class Child extends Parent {
  constructor(name, age) {
    super(name); //Call Parent constructor to initialise "name"
    this.age = age; //Additional property in Child class
  }

  //Override or extend methods
  greet() {
    //Call Parent's greet() method using "super"
    super.greet();
    console.log(`I am ${this.age} years old.`);
  }
  childMethod() {
    console.log(`This is a method unique to the Child class.`);
  }
}

//Step 3. Create a main.js file:
//--------------------main.js--------------------

//import {Child} from "./Child.js"

//Create an instance of the Child class:
const childInstance = new Child("Barry", 48);

//Call the method inherited from Parent class:
childInstance.greet();
//Output:
//"Hello, my name is Barry."
//"I am 48 years old."

//Call the method unique to Child class:
childInstance.childMethod();
//Output:
//"This is a method unique to the Child class."

/*
Explaination:

1. In "Child" constructor, "super(name)" calls "Parent" constructor.
    This allows "Parent" to initialise the "name" property on "this".

2. "this" inside the "Child" class refers to the instance being created.
    After calling "super()", you can add aditional properties like "this.age".

3. Inside the "greet()" method of "Child", "super.greet()" calls the "greet()" method of the "Parent" class.
    This enables you to reuse or extend the behaviour of the "Parent" class.

4. You can define additional child-specific methods like "childMethod()".

You would typicall place these three files (Parent.js, Child.js, and main.js) inside the same folder.
You'd then just run the main.js file (node main.js).


====================================================
                 More about super()
====================================================

Advantages of calling super() in Child constructor:

1. Proper initialisation of Parent properties.
    The Parent constructor often sets up essential properties or state.
    Calling super() ensures the Child instance inherits this correct initialisation.
    Skipping it can break your object.

2. It's necessary for using "this" in Child constructor.
    JavaScript requires calling super() *before* accessing "this" in a subclass constructor.
    Without calling super(), referencing "this" causes a runtime error.

Advantages of calling super.method() inside an overidden method:

1. Code reuse.
    The parent method already has logic you want to keep.
    Calling super.method() lets you save effort and avoid duplicating code by extending the parent's behaviour.

2. Extending instead of replacing behaviour.
    Sometimes the child only needs to add functionality on top of the parent method, not replace it fully.

3. Maintain consistency.
    If the parent class method changes internally (e.g. adding logging or validation),
    child classes calling super() automatically get the benefit of updated logic without modification.

Why you might *not* call super():

1. If the child's behaviour is completely unrelated or incompatible with the parent's.
2. If you want to replace the parent's implementation altogether.

Final notes on super():

1. Calling super() is *mandatory* in subclasses before you use "this".
2. Calling super.method() inside methods is optional but often helps write cleaner, more maintainable code.
*/

/*
====================================================
           Example using seperate files
====================================================

See:
tests/udemy-tutorials/Section-23-Interview-Prep/01_child.js
tests/udemy-tutorials/Section-23-Interview-Prep/01_mainjs
tests/udemy-tutorials/Section-23-Interview-Prep/01_parent.js
*/
