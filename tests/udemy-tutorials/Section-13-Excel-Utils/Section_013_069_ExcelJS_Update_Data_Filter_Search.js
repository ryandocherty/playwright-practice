//Section 13.67: Traversing rows and columns of excel worksheet with excelJS library
//Section 13.68: Build Util functions to read and update excel file strategically
//Section 13.69: How to get and update the data from excel based on filter search criteria

import { Workbook } from "exceljs";

//await page.goto(`https://rahulshettyacademy.com/upload-download-test/`);

async function readExcelFile(filePath) {
  const workbook = new Workbook();
  await workbook.xlsx.readFile(filePath);
  const worksheet = workbook.getWorksheet(`Sheet1`);
  return { workbook, worksheet };
}

async function saveExcelFile(workbook, filePath) {
  //Save the file after making the modification:
  await workbook.xlsx.writeFile(filePath);
}

async function replaceCellValue(searchText, replacementText, filePath) {
  const worksheets = await readExcelFile(filePath);

  //Call the getCellCoordinates() function and store the values.
  //Sending "worksheet" as arg 1.
  //Sending "searchText" as arg 2.
  const coordinates = await getCellCoordinates(worksheets.worksheet, searchText);

  //Replace the cell's value:
  const cellToReplace = worksheets.worksheet.getCell(coordinates.row, coordinates.column);
  cellToReplace.value = replacementText;

  //Output a detailed message:
  console.log(`"${searchText}" replaced with "${replacementText}" at row ${coordinates.row}, column ${coordinates.column}`);

  //Call "saveExcelFile" after making the modifications.
  //1st arg: the "workbook" object property, taken from the top of this function.
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

//1st arg: accepts "searchText" (the text value of a cell you want to locate).
//2nd arg: accepts "replacementText" (the text value that you want to be the replacement).
//3rd arg: accepts the "filePath" of the Excel file.
replaceCellValue("Clementine", "Mango", "C:/Users/Roscoe/Desktop/Projects/playwright-practice/excel_download_test.xlsx");
