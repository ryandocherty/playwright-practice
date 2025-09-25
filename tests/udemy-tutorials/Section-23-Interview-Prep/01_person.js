//Define the Person class (parent).
//Use "export" so that it can shared/imported between files.

export class Person {
  /*
    Because the constructor takes (name, age) parameters, 
    this means that you HAVE to send these parameters when invoking this class.
    e.g. const personInstance = new Person("Bob", 23)

    The parameters will then be stored in "this" for each instance of the Class.
    */
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  getDetails() {
    return `Name: ${this.name}, Age: ${this.age}`;
  }
}
