//Section 13.66: Introduction to excelJS node module and setting up JS Project

import { test, expect } from "@playwright/test";

test("Udemy: Verify product 'ZARA COAT 3' is present (using sessionStorage)", async ({ page }) => {
  await page.goto(`https://rahulshettyacademy.com/upload-download-test/`);
});
