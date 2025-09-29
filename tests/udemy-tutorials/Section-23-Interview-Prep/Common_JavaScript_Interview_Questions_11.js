console.log(`\n======================================================================================================`);
console.log(`Question 11. Create an array of objects representing students with their names and scores.              `);
console.log(`             Use the array methods "filter", "map", and "reduce".                                       `);
console.log(`             Get the below result with an optimised solution:                                           `);
console.log(`             1. Filters out students who passed the exam with a score more than/equal to 40.            `);
console.log(`             2. Update Passed students names to uppercase.                                              `);
console.log(`             3. Total score of all passing students.                                                    `);
console.log(`======================================================================================================\n`);

/*
This is a classic programming interview question that invloves using array methods (filter, map, reduce) and objects.

================================
   JavaScript Array filter()
================================

The filter() method creates a new array with all elements that pass a test implemented by the provided callback function.

Syntax:
let newArray = array.filter(function(currentValue, index, arr), thisValue);

1. function() - Required. A function to run for each array element.
2. currentValue - Required. The value of the current element.
3. index - Optional. The index of the current element.
4. arr - Optional. The array of the current element.
5. thisValue - Optional. Defaults to undefined. A value passed to the function as its "this" value.

The callback function should return:
1. A truthy value to keep the element.
2. A falsy value to exclude the element.

Key points about filter():
1. The filter() method returns a new array with elements that satisfy the condition.
2. The original array remains unchanged.
3. The callback function is called for each element.
4. Elements for which callback returns true (or truthy) are included in the resulting array.
5. The filter() method is great for selecting subsets of data.
*/

//Example:
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const evens = numbers.filter((number) => number % 2 === 0);
console.log(numbers); //Output: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
console.log(evens); //Output: [2, 4, 6, 8, 10]

/*
================================
   JavaScript Array map()
================================

The map() method is another essential and powerful array method in JavaScript, often used together with filter().
It creates a new array populated with the results of calling a provided callback function on every element in the calling array.

Syntax:
let newArray = array.map(function(currentValue, index, arr), thisValue);

1. function() - Required. A fucntion to be run for each array element.
2. currentValue - Required. The value of the current element.
3. index - Optional. The index of the current element.
4. arr - Optional. The array of the current element.
5. thisValue - Optional. Defaults to undefined. A value passed to the function to be used as its "this" value.

Key points about map():
1. Returns a new array.
2. The new array has the *same length* as the original array.
3. The callback function *transforms* each element (produces a new value).
4. The original array remains unchanged.
5. The map() method does not execute the function for empty elements.
*/

//Example:
const numbers2 = [1, 2, 3, 4];
const doubled = numbers2.map((number) => number * 2);
console.log(numbers2); //Output: [1, 2, 3, 4]
console.log(doubled); //Output: [2, 4, 6, 8]

//Example with filter() and map():
const users = [
  { name: "Alice", age: 34, active: true },
  { name: "Bob", age: 43, active: false },
  { name: "Carol", age: 58, active: true },
  { name: "Dave", age: 27, active: false },
];
const namesOfActiveUsers = users.filter((user) => user.active).map((user) => user.name);
console.log(namesOfActiveUsers); //Output: ["Alice", "Carol"]

/*
================================
   JavaScript Array reduce()
================================

The reduce() method is a powerful and versatile array method in JavaScript.
It is used to reduce an array to a single value by executing a reducer function on each element.
The reduce() method executes a reducer function on each element of the array, resulting in a single output value.

Syntax:
let singleValue = array.reduce(function(total, currentValue, currentIndex, arr), initialValue);

1. function() - Required. A function to be run for each element in the array.
2. total - Required. The initialValue, or the previously returned value of the function.
3. currentValue - Required. The value of the current element.
4. currentIndex - Optional. The index of the current element.
5. arr - Optional. The array the current element belongs to.
6. initialValue - Optional. A value passed to the function as the initial value.

Important notes:
If no initialValue is supplied, the 1st element in the array will be used and iteration wiill start from 2nd element.
Without an initialValue, the 1st element is used as the initial accumulator and reduction starts at the 2nd element.
Using an initialValue is recommended to avoid errors or empty arrays.

How reduce() works:
1. Starts with "accumulator = initialValue" (if provided) or the first array element.
2. Calls the callback function for each element in order.
3. The return value of callback becomes the new accumulator.
4. After all elements are processed, reduce() returns the final value of the accumulator.

The reduce() method is useful when you want to:
1. Combine all elements to a single value.
2. Sum up all numbers in an array.
3. Find a min or max number.
4. Flatten nested arrays.
5. Group or count elements.
6. Implement complex transformations.
*/

//----------Example 1: Sum of all numbers in an array----------

const numbers3 = [3, 6, 9, 12, 15];
const sum = numbers.reduce((accumulator, currentValue) => {
  return accumulator + currentValue;
}, 0);
console.log(numbers3); //Output: [3, 6, 9, 12, 15]
console.log(sum); //Output: 55

/*
Explanation:
1. accumulator starts at 0 (the initialValue).
2. Each element is added to accumulator.
3. Finally the total sum (55) us returned.
*/

//----------Example 2: Flatten an array of arrays----------

const nestedArray = [[1, 2], [3, 4], [5]];
const flattenedArray = nestedArray.reduce((accumulator, currentValue) => {
  return accumulator.concat(currentValue);
}, []);
console.log(flattenedArray); //Output: [1, 2, 3, 4, 5]

/* 
Basic Explanation:
1. accumulator starts as an empty array [].
2. Each nested array is concatenated to accumulator.
3. Result is a single flattened array.

Detailed Explaination:
1. Initial state:
    a. accumulator is initialised to an empty array [] (because of the initial value [])
    b. The array to process: [[1, 2], [3, 4], [5]]

2. Iteration 1:
    a. currentValue is the 1st element: [1,2]
    b. accumulator.concat(currentValue) becomes [].concat([1,2]) which results in [1,2]
    c. New accumulator is [1,2]

3. Iteration 2:
    a. currentValue is the 2nd element: [3,4]
    b. accumulator.concat(currentValue) becomes [1,2].concat([3,4]) which results in [1,2,3,4]
    c. New accumulator is [1,2,3,4]

4. Iteration 3:
    a. currentValue is the 3rd element: [5]
    b. accumulator.concat(currentValue) becomes [1,2,3,4].concat([5]) which results in [1,2,3,4,5]
    c. New accumulator is [1,2,3,4,5]

5. After all iterations:
    a. reduce() returns the final accumulator: [1,2,3,4,5]
    b. This is the flattened array.
*/

//----------Example 3: Count occurrences of items in an array:---------

const fruits = ["apple", "banana", "apple", "orange", "banana", "apple"];
const fruitsCount = fruits.reduce((accumulator, fruit) => {
  accumulator[fruit] = (accumulator[fruit] || 0) + 1;
  return accumulator;
}, {});
console.log(fruitsCount); //Output: {apple: 3, banana: 2, orange: 1}

//Remember, you can dynamically create or update object properties using bracket notation: obj[key] = value.
const obj = {};
const key = "example";
obj[key] = 42;
console.log(obj); //Output: {example: 42}

/* 
Basic Explanation:
1. accumulator starts as an empty object {}.
2. For each fruit, increment its count in the accumulator object.
3. Result is an object that maps fruit -> count.

Detailed Explanation:
1. Initial state:
    a. accumulator is initialised as an empty object {}, which will hold counts.
    b. Array to process: ["apple", "banana", "apple", "orange", "banana", "apple"]

2. Iteration 1 (fruit = "apple"):
    a. accumulator["apple"] does not exist, so (accumulator["apple"] || 0) is 0.
    b. Increment by 1 -> 1.
    c. accumulator is now: {apple: 1}.

3. Iteration 2 (fruit = "banana"):
    a. accumulator["banana"] undefined, so (accumulator["banana"] || 0) is 0.
    b. Increment by 1 -> 1.
    c. accumulator is now: {apple: 1, banana: 1}

4. Iteration 3 (fruit = "apple"):
    a. accumulator["apple"] is 1, so (1 || 0) is 1.
    b. Increment by 1 -> 2.
    c. accumulator is now: {apple: 2, banana: 1}.

5. Iteration 4 (fruit = "orange"):
    a. accumulator["orange"] undefined, so (accumulator["orange"] || 0) is 0.
    b. Increment by 1 -> 1.
    c. accumulator is now: {apple: 2, banana: 1, orange: 1}.

6. Iteration 5 (fruit = "banana"):
    a. accumulator["banana"] is 1, so (1 || 0) is 1.
    b. Increment by 1 -> 2.
    c. accumulator is now: {apple: 2, banana: 2, orange: 1}.

7. Iteration 6 (fruit = "apple"):
    a. accumulator["apple"] is 2, so (2 || 0) is 2.
    b. Increment by 1 -> 3.
    c. Accumulator is now: {apple: 3, banana: 2, orange: 1}.

8. After all iterations:
    a. reduce() returns the final accumulator object: {apple: 3, banana: 2, orange: 1}.
*/

//================================
//  Interview Question Solution
//================================

const students = [
  { name: "Charlie", score: 13 },
  { name: "Ronald", score: 39 },
  { name: "Deandra", score: 48 },
  { name: "Frank", score: 20 },
  { name: "Dennis", score: 70 },
  { name: "Waitress", score: 40 },
  { name: "Matthew", score: 98 },
];

const passedStudents = students.filter((student) => student.score >= 40);
console.log(passedStudents);
/*
The filter() method iterates through the array index-by-index.
It takes the first index (e.g. { name: "Charlie", score: 13 }) and stores it in the "student" parameter.
We then have an arrow function to grab the "score" property, and check if its value is >= 40.
If the condition is satisfied, it gets stored in the new array "passedStudents".
If the condition is not satisfied, it gets ignored/skipped.
So we're "filtering" the array based on a function which checks a condition.
*/
