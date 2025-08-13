//Section 18.100: Deep dive into TypeScript type syntaxes and their usage -2

/*
We've covered the core basics of TypeScript in the last lecture.
We'll now see how to declare functions, objects, and classes in TypeScript.
*/

//==================================================
//        TypeScript - Declaring Functions
//==================================================

//If your function takes arguments, then these arguments need a specified type.
//You should also specify a return type:
function add(param1: number, param2: number): number {
  return param1 + param2;
}

/*
If you were to pass a parameter here that isn't a number type, TypeScript will throw an error.
E.g. add(10, "30")  //Error: Argument of type 'string' is not assignable to parameter of type 'number'.

In JavaScript however, this would be accepted.
It would treat the "+" operator as concatenation and the output would be "1030".
This is an example of a logic error that JavaScript won't catch but TypeScript will.
The goal of the "add()" function is to sum up two numbers.
JavaScript will still compile the code without errors, but it would produce an undesired result.
TypeScript will catch this error as soon as you're done typing the (incorrect) code.
*/
console.log(add(10, 30));

//==================================================
//        TypeScript - Declaring Objects
//==================================================

//You need to specify the object properties' types after declaring the object name:
let user: { name: string; age: number; eyeColour: string; height: number } = {
  name: "Jim",
  age: 34,
  eyeColour: "Blue",
  height: 177.8,
};

/*
You cannot add properties to objects in the same way you do with JavaScript.
Declaring the object in TypeScript sets up a "contract" on how the object should behave and look.
It's an agreement describing the shape and structure of the object.

You generally can't add new properties to an object that doesn’t already declare those properties in its type or interface.
This is different from plain JavaScript, where objects are flexible and properties can be added dynamically at runtime.
If the type does not include a property, trying to add it later will usually cause a compile-time error.
There are technically ways to add properties to objects in TypeScript, but they all generally weaken type safety.

In JavaScript, you could simply write something like this and the property would be added without issue:
    user.location = "Ireland";

You can still compile the .ts file with the line of code above, and it will still generate a .js file.
However, you'll see errors in the terminal/output:
Error: Property 'location' does not exist on type '{ name: string; age: number; eyeColour: string; height: number; }'.
TypeScript will still throw and error and complain, but it will not stop you from executing the transpiled .js code.
*/

//A common and valid approach:
//1. Declare the property on the object type, but initialise it with a default/placeholder value.
//2. Later on, you can fill this empty property.

let user1: { name: string; age: number; location: string } = {
  name: "Jim",
  age: 34,
  location: "", //Empty default/placeholder value.
};

//Add the property later on:
user1.location = "Ireland";

//This works correctly because:
//1. The property "location" exists on the object from the start.
//2. It fulfills the requirement of the item type (string).
//3. You maintain type safety — the property is always a string.

//==================================================
//        TypeScript - Declaring Classes
//==================================================

/*
For this section we'll use a class from a previous lecture (CartPage).

In the constructor, we're passing "page" as a parameter, which is coming from outside the class.
We're then assigning it locally in the constructor (as an instance variable).
In TypeScript, we still need to specify a type for these local instance variables.

However, what data type does "page" have exactly? 
It comes from Playwright, so how do we know what data type it is?
You can take a look on Playwright's documentation - https://playwright.dev/docs/pom.

From the documentation, "page" actually has type "Page" (lol).
You also have to specify the type of pages and locators when importing these from '@playwright/test'.

You typically declare these under the class name, but above the constructor
*/

//Specify the types when importing from the Playwright module:
import { expect, type Locator, type Page } from "@playwright/test";

class CartPage {
  //Specify the types before the constructor:
  page: Page;
  itemNameInCart_Locator: Locator;
  itemPriceInCart_Locator: Locator;
  checkout_Button: Locator;

  constructor(page: Page) {
    this.page = page;
    this.itemNameInCart_Locator = page.locator(`div[class='cartSection'] h3`);
    this.itemPriceInCart_Locator = page.locator(`.prodTotal`);
    this.checkout_Button = page.locator(`button:has-text("Checkout")`);
  }
}
