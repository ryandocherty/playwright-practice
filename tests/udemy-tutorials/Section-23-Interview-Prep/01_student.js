//Define the Student class (child).
//Import the Person class (parent).

import { Person } from "./01_person.js";
/*
This class basically only talks about students' grades, and every student will have a name and age.
But we don't need to instantiate name and age here, instead we can inherit them from the Person class.
This means we could have a seperate Teacher class, and each teacher will still have a name/age, but not grades.
By inheriting these properties from the Person class, we avoid unnecessarily instantiating name/age in every subclass.
*/

//Inherit properties from parent class using extends
export class Student extends Person {
  constructor(name, age, grade) {
    super(name, age); //Call the parent class constructor using super()
    this.grade = grade;
  }

  getStudentDetails() {
    //Using super() will automatically check the parent class for this method.
    //If found, the method will be executed.
    const nameAndAge = super.getDetails();
    return `${nameAndAge}, Grade: ${this.grade}`;
  }
}
