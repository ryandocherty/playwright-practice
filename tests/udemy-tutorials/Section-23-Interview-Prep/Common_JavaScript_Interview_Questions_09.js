console.log(`\n======================================================================================================`);
console.log(`Question 9: Explain the difference between == and ===.                                                  `);
console.log(`======================================================================================================\n`);

/*
This is a popular interview question to help guage how much day-to-day practical knowledge you have.
Knowing this difference is important as an automation tester, as tests frequently compare actual & expected values.

They are both comparison operators, but they behave differently in terms of type coercion.
*/

/*
=====================================
     Loose Equality Operator ==
=====================================

Loose Equaity Operator checks for *value equality* but performs *type coercion" if the data types of the two operands are different.
This means it tries to convert the operands to a common type before making the comparison.
*/

console.log(5 == 5);
//Output: true
//No surprises here, they're both the same number and type.

console.log(5 == "5");
//Output: true
//This is because "5" (string) is converted to 5 (number) before comparison.

console.log(null == undefined);
//Output: true
//This is because they are both treated equal in loose equality.

/*
=====================================
     Stict Equality Operator ===
=====================================

Strict Equaity Operator checks for both *value* and *type* equality.
No type conversion/coercion is performed.
The values must be of the same type and have the same value to return "true".
*/

console.log(5 === 6);
//Output: false
//No surprises here, they're the same data type but different values.

console.log(5 === "5");
//Output: false
//This is because the operands are different data types; 5 is a number and "5" is a string.

console.log(null === undefined);
//Output: false
//This is because the types are different.

/*
=====================================
            When to use
=====================================

It's considered best practice to use === over == to avoid unexpected type coercion bugs.
Only use == if you specifically want to allow type conversion during comparison.
*/

/*
=====================================
      Common pitfalls with ==
=====================================

1. Unexpected Type Coercion
    Using == might cause confusing results because JavaScript converts types automatically in ways you might not anticipate.

Below, you might expect "0 == false" to be false since they are both different types, but it returns true due to coercion.
*/

console.log(0 == false); //true
console.log("" == false); //true
console.log([] == false); //true
console.log(null == 0); //false
console.log(undefined == 0); //false

/*
2. Comparing Objects or Arrays
    Using == with objects checks for reference equality, not value equality.
*/

console.log([] == "");
//Output: true
//This is because [] is coerced to "".

console.log([1, 2] == "1,2");
//Output: true
//THis is because [1,2].toString() is "1,2".

console.log({} == "[object Object]");
//Output: true
//This is because the object is coerced differently (explained in detail later on).

/*
3. null and undefined special case
    null and undefined are equal with ==, but not equal with ===.

This can cause unexpected bugs if you expect them to behave differently.
*/

console.log(null == undefined); //true
console.log(null === undefined); //false

/*
=====================================
    When using == is acceptable
=====================================

One of the main acceptable uses for using == is checking for null or undefined.
Because "null == undefined" is true, a common pattern is to use "== null" to check if a variable
is either null or undefined. This is clean and concise.
*/

function process(input) {
  if (input == null) {
    console.log("Input is either null or undefined");
  } else {
    console.log("Input has a value");
  }
}

process(null); //Output: "Input is either null or undefined"
process(undefined); //Output: "Input is either null or undefined"
process(0); //Output: "Input has a value"

/*
=====================================
  Best practices with == and ===
=====================================

1. Default to using === to avoid unexpected type coercion.
2. Use == only when you explicitly want to allow type coercion, and you understand how it works.
3. For comparing null or undefined where either is an acceptable absense, == can be useful and concise.
4. Avoid comparing different types whenever possible to keep your code predictable.
5. For deep equality (object/arrays), used specialised functions or write your own utility function.
*/

/*
======================================================
{} == "[object Object]" can sometimes evaluate false
======================================================

Why does {} == "[object Object]" sometimes evaluate to false?

1. Understanding the operands:
    The left operand is an object literal: {}
    The right operand is a string: "[object Object]"

2. How == works with an Object and a String?
    When you use the loose equality operator == between an object and a primitive (like a string),
    JavaScript attempts to convert the object to a pritive value using the ToPrimitive conversion.
    It does this by:
    a. calling the object's .valueOf() method first, if it returns a primitive, use that.
    b. otherwise, call the object's .toString() method, if it returns a primitive, use that.

3. Applying ToPrimitive to {}
    For a plain object {}, the default behaviour is:
    a. {}.valueOf() returns the object itself (which is not a primitive).
    b. {}.toString() returns the string "[object Object]" (which is a primitive).
    So, {} becomes the string "[object Object]" after the ToPrimitive conversion.

4. Now the comparison looks like:
    After converting the object:
    "[object Object]" == "[object Object]" (which returns true most of the time).

5. So why can the result sometimes be false?
    The {} literal can be interpreted differently depending on where and how the code is run (e.g. browsers vs. node.js).
    Sometimes the {} may be parsed as a *block* and not as an object literal.
    This leads to a different comparison or even syntax errors.
*/

//Breaking it down explicitly:
const obj = {};
const str = "[object Object]";
const primitiveObj = obj.toString(); //"[object Object]"
console.log(primitiveObj == obj); //true
console.log(obj == str); //true (however, this can sometimes evaluate to false)

//If it ever evaluates to false, manually force to string then compare:
console.log(obj.toString() == "[object Object]"); //true
