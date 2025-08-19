//Section 18.101: Build Playwright Pageobject TypeScript files and enforce the typing standards

/*
I'm refactoring my E2E tests and Utility files.
I don't want to disturb the original .js files, instead I'll create new .ts files.


=======================================
    Refactor: udemy_page_objects 
=======================================

Refactoring:
udemy_page_objects\CartPage.js
udemy_page_objects\CheckoutPage.js
udemy_page_objects\DashboardPage.js
udemy_page_objects\LoginPage.js
udemy_page_objects\OrderConfirmedPage.js
udemy_page_objects\OrderHistoryPage.js
udemy_page_objects\OrderSummaryPage.js
udemy_page_objects\POManager.js

Refactored to:
udemy_page_objects_ts\CartPage.ts
udemy_page_objects_ts\CheckoutPage.ts
udemy_page_objects_ts\DashboardPage.ts
udemy_page_objects_ts\LoginPage.ts
udemy_page_objects_ts\OrderConfirmedPage.ts
udemy_page_objects_ts\OrderHistoryPage.ts
udemy_page_objects_ts\OrderSummaryPage.ts
udemy_page_objects_ts\POManager.ts

=======================================
    Refactor: udemy_utils
=======================================

Refactoring:
udemy_utils\APIUtils.js
udemy_utils\PlaceOrder_TestBase.js

Refactored to:
udemy_utils_ts\APIUtils.ts
udemy_utils_ts\PlaceOrder_TestBase.ts

New file:
udemy_utils_ts\API_Types.ts
*/
