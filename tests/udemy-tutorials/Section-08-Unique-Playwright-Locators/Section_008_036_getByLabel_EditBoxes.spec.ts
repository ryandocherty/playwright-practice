//Section 8.36: Understand when getByLabel can be used to enter into edit boxes

import { test, expect } from "@playwright/test";

test("Udemy: getByLabel with edit boxes", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/angularpractice/");

  /*
  When can you use getByLabel() to enter text into a input box (assuming it has a label)?

  Playwright can help with finding desired elements by association, but there are some rules.
  We need to understand when Playwright can help find associations.

  As a general example, say we had some HTML for an input box with a label like this:

    <label>
    Password
    <input type="password"/>
    </label>

  The input box is wrapped within the <label> tag, 
  so Playwright can easily associate the label with the input box.

  
  ----------Example with "https://rahulshettyacademy.com/angularpractice/"---------

  Aother case where it will work is on the angularpractice webpage above.
  We have the an input box for the password, with a label above it saying "Password".
  Here's the CSS for the label and the input box:

    <label for="exampleInputPassword1">Password</label>
    <input class="form-control" id="exampleInputPassword1" placeholder="Password" type="password">

  The input box is NOT within the <label> tag and appears below it instead, 
  but Playwright will still be able to associate these two elements because
  there is a reference provided: for="exampleInputPassword1".
  You can see that the "for" attribute has provided a linkage, as the input box has id="exampleInputPassword1".
  An association has still been provided here, and Playwright will be able to make the
  association between the "for" and "id" attriutes for both elements.

  Therfore, just this line would work:
    await page.getByLabel("Password").fill("password1234");


  ----------Example with "https://rahulshettyacademy.com/client/"---------

  This website also has a password input box with a label saying "Password".
  Here's the CSS for both:

    <label _ngcontent-tul-c43="" for="password">Password</label>
    <input _ngcontent-tul-c43="" type="password" formcontrolname="userPassword" id="userPassword" 
        placeholder="enter your passsword" class="form-control ng-untouched ng-pristine ng-invalid">

  As you can see the label has for="password".
  But the input box has id="userPassword".
  These values are different, so Playwright will struggle to find an association
  when just using getByLabel("Password").


  So when using getByLabel(), either the input box has to be wrapped within <label></label>,
  or there has to be some value that provides linkage between the two (such as "for" and "id").
  */
});
