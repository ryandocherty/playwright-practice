//Section 13.70: Strategy to handle download & uploading files using Playwright

/* 
For this test I want to:
1. Navigate to a website and download a .xlsx (Excel) file.
2. Use Playwright to read the file and perform modifications using ExcelJS.
3. Save the file, then upload the modified file back onto the original website.
4. Use Playwright to perform assertions and validations on the newly reflected data.

Test case scenario:
Let's say we want to modify the Excel sheet to update a product's price.
We then want to upload the modified Excel sheet to the website to reflect the new data.
Finally we want to validate that the data appears correctly on the website.
*/

import { test, expect } from "@playwright/test";
import ExcelJS from "exceljs";

async function readExcelFile(filePath) {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(filePath);
  const worksheet = workbook.getWorksheet(`Sheet1`);
  return { workbook, worksheet };
}

async function saveExcelFile(workbook, filePath) {
  //Save the file after making the modification:
  await workbook.xlsx.writeFile(filePath);
}

async function replaceCellValue(searchText, replacementText, coordModifier, filePath) {
  const worksheets = await readExcelFile(filePath);

  //Call the getCellCoordinates() function and store the values.
  //Sending "worksheet" as arg 1.
  //Sending "searchText" as arg 2.
  const coordinates = await getCellCoordinates(worksheets.worksheet, searchText);

  //Replace the cell's value.
  //Includes any desired cell coordinate changes:
  const cellToReplace = worksheets.worksheet.getCell(
    coordinates.row + coordModifier.rowChange,
    coordinates.column + coordModifier.colChange
  );
  cellToReplace.value = replacementText;

  //Output a detailed message:
  console.log(
    `"${searchText}" replaced with "${replacementText}" at row ${coordinates.row}, column ${coordinates.column}`
  );

  //Call "saveExcelFile()" after making the modifications.
  //1st arg: the "workbook" property of the object "worksheets", taken from the top of this function.
  //2nd arg: the "filePath" of the Excel file.
  saveExcelFile(worksheets.workbook, filePath);
}

async function getCellCoordinates(worksheet, searchText) {
  let coordinates = { row: -1, column: -1 };
  let wasSearchTextFound = false;
  worksheet.eachRow((row, rowNumber) => {
    row.eachCell((cell, colNumber) => {
      //console.log(`Row ${rowNumber}, Col ${colNumber}, Value: ${cell.value}`);

      //Print the location of a specific cell value:
      if (cell.value === searchText) {
        //Assign the coordinates of "searchText" to the "output" object properties:
        coordinates.row = rowNumber;
        coordinates.column = colNumber;

        //Set the flag to true:
        wasSearchTextFound = true;
      }
    });
  });

  if (!wasSearchTextFound) {
    console.log(`"${searchText}" not found`);
  } else {
    console.log(`"${searchText}" found at row ${coordinates.row}, column ${coordinates.column}`);
    return coordinates;
  }
}

test("Udemy: Excel upload download validation", async ({ page }) => {
  await page.goto(`https://rahulshettyacademy.com/upload-download-test/`);

  //Download the .xlsx file from the website:
  //However, I want to avoid race conditions caused by download speeds being varied
  //So I'm using waitForEvent() then storing the value/promise as "downloadPromise".
  //Then I'm awaiting "downloadPromise" AFTER download starts, which should keep waiting until the download promise is resolved.
  const downloadPromise = page.waitForEvent("download");
  await page.locator("#downloadButton").click();
  await downloadPromise;

  //1st arg: accepts "searchText" (the text value of a cell you want to locate).
  //2nd arg: accepts "replacementText" (the text value that you want to be the replacement).
  //3rd arg: accepts an object "coordModifier" with desired modifications to the cell row & column numbers (to allow traversal).
  //4th arg: accepts the "filePath" of the Excel file.
  await replaceCellValue("Mango", 420, { rowChange: 0, colChange: 2 }, "C:/Users/Roscoe/Downloads/download.xlsx");

  //Click the "Choose File" button,
  //then use "setInputFiles()" to upload the modified .xlsx file.
  //Note - the #fileinput attribute has type="file" in the HTML/CSS, this is required for Playwright to be able to upload files.
  await page.locator("#fileinput").click();
  await page.locator("#fileinput").setInputFiles("C:/Users/Roscoe/Downloads/download.xlsx");
});
