//Section 16.88: Reason for test failures - Race condition - Fix them

/*
Several tests in this project perform the same tests but in different ways.
A few of our tests log into a website and purchase a product, with the same credentials.
*/
