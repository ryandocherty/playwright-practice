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

//Using a negative startIndex with splice:
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
Use "slice" when you need to COPY parts of an array without changing the original array.
Use "splice" when you need to modify specific parts of an array, while also changing the original array.
*/

/*
==========================
    Example usage
==========================

Challenge:
We have an array of numbers accending in multiples (steps) of X.
There is a gap in the array (some elements are missing).
The goal is to fill in the missing gap(s) with the correct multiples, using any of the array methods.

Assume:
1. You don't know where the gap(s) are (i.e. there could be gap(s) anywhere in the array, including in-between the first 2 elements).
2. You don't know what the multiples are (i.e you don't know it's in multiples of 5).
*/

//            Index:  0  1   2   3   4   5   6   7
const numbersArray = [5, 25, 30, 35, 50, 55, 60, 65];

/*
Because we assume we don't know what the multiple (step) is, we need to calculate it.
The gap could be anywhere in the array, including the first 2 elements.
This means we can't calcuate the step by simply writing "const step = numbersArray[1] - numbersArray[0]".

We can calculate the step by finding the minimum difference between any two consecutive elements.
The assumption is that the correct step is the smallest positive difference found between any pair of consecutive elements.
*/

function calculateStep(numbersArray) {
  //First check that there are enough elements to determine the step:
  if (numbersArray.length < 2) {
    console.log(`Not enough elements to determine the step.`);
    return 0;
  }

  //We need to work backwards (subtractively) with minStep.
  //It helps that minStep is initialised as a large number, so infinity is a good option.
  //Eventually minStep will be filtered down to the lowest positive difference.
  let minStep = Infinity;

  //Loop through the array and find the difference between each consecutive pair of elements.
  //If the current difference is > 0, and < minStep, then assign the minStep to the difference.
  for (let i = 0; i < numbersArray.length - 1; i++) {
    let difference = numbersArray[i + 1] - numbersArray[i];
    if (difference > 0 && difference < minStep) {
      minStep = difference;
    }
  }
  return minStep;
}

function fillGaps(numbersArray) {
  //Grab the step first:
  let step = calculateStep(numbersArray);
  console.log(`step: ${step}.`); //5

  for (let i = 0; i < numbersArray.length; i++) {
    let currentElement = numbersArray[i];
    let nextElement = numbersArray[i + 1];

    //Calculate gap count (the amount of indexes with missing numbers):
    let gapCount = (nextElement - currentElement) / step - 1;

    if (gapCount > 0) {
      //Initialise missingNumbers[] fresh for each potential gap in numbersArray[].
      //If we didn't do this, we'd accumulate all missing numbers from all gaps into a single missingNumbers[] array.
      //On encountering the first gap, we'd potentially insert all missing numbers from all gaps at once into the array for that first gap.
      let missingNumbers = [];

      for (let j = 1; j <= gapCount; j++) {
        missingNumbers.push(j * step + currentElement); // ((j * step) + currentElement)

        /*
        Initial numbersArray = [5, 25, 30, 35, 50, 55, 60, 65];
        
        1st loop iteration:
                gapCount = 3
                currentElement = 5 (i = 0)
                missingNumbers = [10, 15, 20]

         2nd loop iteration:
                gapCount = 2
                currentElement = 35 (i = 3)
                missingNumbers = [40, 45]
        */
      }

      //Insert the missing numbers at i+1 position:
      numbersArray.splice(i + 1, 0, ...missingNumbers);

      /*
      Initial numbersArray = [5, 25, 30, 35, 50, 55, 60, 65];

        1st loop iteration:
                currentElement = 5 (i+1 = 25)
                numbersArray = [5, 10, 15, 20, 25, 30, 35, 50, 55, 60, 65]

        2nd loop iteration:
                currentElement = 35 (i+1 = 50)
                numbersArray = 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65]
        */

      //Since we inserted elements, skip those in the loop to avoid an infinite loop:
      i += gapCount;
    }
  }
}

console.log(`Before filling gap(s):`, numbersArray);
fillGaps(numbersArray);
console.log(`After filling gap(s):`, numbersArray);
