console.log(`\n======================================================================================================`);
console.log(`Question 1: Can a JavaScript object hold a function as a property?                                      `);
console.log(`======================================================================================================\n`);

//The answer is yes:

const person = {
  fullName: "Jim Flimbo",
  age: 28,
  location: "England",

  //Here we have a function "greet" which uses the "person" object properties:
  greet: function () {
    console.log(`My name is ${this.fullName}, I'm ${this.age} and I live in ${this.location}.`);
  },
};

//When calling object properties, you do not need to use brackets:
console.log(person.fullName);
console.log(person.age);
console.log(person.location);

//When calling an object function, you need to use brackets:
person.greet();
