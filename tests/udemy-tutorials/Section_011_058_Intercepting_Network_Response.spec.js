//Section 10.58: How to intercept Network response calls with Playwright route method

/*
Most modern websites are driven by API calls.

-----Example with "https://rahulshettyacademy.com/client":

When we've been logging into this website, it makes an API "login" call,
then based on the response it renders the data on the front-end.
But this website is driven by API calls and makes mutiple other API calls,
such as "get-all-products" to render the available products for the logged-in user.
It makes a call in the back-end, then the back-end gave a response, then the front-end is reading
the response and rendering the data that's passed with the response (product names, price, image, catagory etc.).

The same thing happens when opening the "orders" tab on the website.
It makes an API call "get-orders-for-customer" and then renders the data from the response to the front-end.
So this page will basically display previous orders for the currently logged-in user.

---Potential Scenario:
What if we need to verify whether a "no orders found" message appears on the "orders" tab?
The prerequisite would be that there cannot be any orders in the "orders" tab for the message to get displayed.
If you were to write an automated test for this, you potentially might have to delete all the orders in the "orders" tab,
for the "no orders found" message to appear.
Or another potential solution would be to find an account that happens to have no orders, but this could be time consuming.

---Potential Problem:
So the prerequisite would be that there cannot be any orders in the "orders" tab.
But what if another colleague needs the account to have visible orders in the "orders" tab?
You might end up deleting the data that they require for one of their own tests,
and it'll likely be time consuming to have to delete all the orders anyway.
NOTE - a lot of companies will likely have a special dummy account for this scenario, but it's not guaranteed.

---Potential Solition:
When we actually have an account with no orders, 
the json response for the "get-orders-for-customer" call looks like this:

{"data":[],"message":"No Orders"}

The call has not returned any data in the response (i.e. the data is null/empty).
So if there's no data found/returned, it also returns the message "No Orders".
This causes the message "You have No Orders to show at this time" to appear in the "orders" tab,
because the front-end read the response data as null/empty.

So in theory, can we intercept/alter the response before it renders data to the front-end?
Can Playwright stop the response, then inject a fake/mock response, THEN send it to the front-end?
In essence: if we have an account that has 1+ orders, can we inject `{"data":[],"message":"No Orders"}`
before it gets rendered to the browser, essentially causing the "no orders found" message to display,
even though there ARE actually orders associated with the logged-in user?

This is possible with Playwright, and the fake response will only be available for that specific browser instance.
So as soon as the browser is closed, the fake response disappears, and the orders will reappear as usual in other instances.
This allows us to test the "no orders found" message without actually altering any data.
This is the basic concept of intercepting network responses (also called "mocking a response").

Let's say there's a real bug in the application that the "no orders found" message doesn't actually appear anyway.
Well this test will still catch that bug, because the error message only appears anyway if the API response is null.
This website is driven by API calls, so the error message is exclusively dependent on the API response being null/empty.
*/
