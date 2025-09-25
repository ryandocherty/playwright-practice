//Import the Student class.
//We do not need to import the Parent class because Student inherits from Parent.

import { Student } from "./01_student.js";

//Create new object instances of the Student class.
//Creating a new instance requires the (name, age, grade) parameters (seen in the Student constructor).
const student1 = new Student("Jimothy Timbers", 16, "A");
const student2 = new Student("Flam Tap", 17, "A*");
const student3 = new Student("John Johnson", 16, "B");

//Now we can call the getStudentDeatils() method in the Student class.
//Each instance (student1, student2...) has its own paramaters stored in "this".
console.log(student1.getStudentDetails()); //Output: Name: Jimothy Timbers, Age: 16, Grade: A
console.log(student2.getStudentDetails()); //Output: Name: Flam Tap, Age: 17, Grade: A*
console.log(student3.getStudentDetails()); //Output: Name: John Johnson, Age: 16, Grade: B

/*
====================================================
                 Walkthrough
====================================================

1. Using "new Student(name,age,grade)" triggers the creation of a new Student object.
    A new empty object is created internally.
    The new object's prototype is set to "Student.prototype".
    This links it to the child class's methods.

2. The Student constructor is called with the provided parameters.
    Inside the Student constructor, the first thing is super(name, age).
    This calls the parent class constructor (Person class constructor).

3. Inside the Person constructor.
    Person constructor initialises the properties:
    this.name = name
    this.age = age
    Here, "this" refers to the same new object created in step 1.
    The parent constructor (Person) finishes and returns control back to the child constructor (Student).

4. Back to the Student constructor.
    Student constructor sets "this.grade = grade" on the same object.
    The constructor returns the fully initialised object.
    
5. The created "student1" object has:
    a. Properties:
        name: "Jimothy Timbers"
        age: 16
        grabe: "A"
    b. Prototype linked to Student.prototype, which itself inherits from Person.prototype.
    
This means the "student1" object can access methods from both Student and Person classes.


====================================================
                    Diagrams
====================================================

Step 1: new Student("Jimothy Timbers", 16, "A");
  Creates a new empty object, let’s call it:  student1 (the instance)

step 2: prototype linkage when object created

  student1
    |
    v
  Student.prototype     -------->   Person.prototype  -------->   Object.prototype  -------->  null
  (methods: getStudentDetails())    (methods: getDetails())       (basic JS object methods)

Step 3: Constructor calls

  Student constructor starts
      |
      v
  Calls super(name, age) --> calls Person constructor
      |
      v
  Person constructor initialises this.name = "Jimothy Timbers"
  Person constructor initialises this.age = 16
      |
      v
  Control returns to Student constructor
      |
      v
  Student constructor initialises this.grade = "A"

Result:
  student1 = {
    name: "Jimothy Timbers",    // from Person constructor via super()
    age: 16,                    // from Person constructor via super()
    grade: "A"                  // from Student constructor
  }
  
Can access methods:
  student.getDetails()         --> Person.prototype.getDetails() 
  student.getStudentDetails()  --> Student.prototype.getStudentDetails()
*/
