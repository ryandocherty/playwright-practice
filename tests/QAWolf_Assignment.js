import { test, expect, chromium } from "@playwright/test";

/*
  In this test, I want to assert that the first 100 articles 
  on "news.ycombinator.com/newest" are sorted by newest to oldest.
*/

async function sortHackerNewsArticles() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://news.ycombinator.com/newest");

  //The website only shows 30 articles at a time.
  //I'm going to need to click this link to show more.
  //Locator for the "More" link:
  const moreLink = page.locator(`.morelink`);

  //Class for all the timestamps:
  const timeStampClass = `.age`;

  //I'm only checking the first 100 articles:
  const targetArticleAmount = 100;

  //Initialise an array to eventually hold the timestamps:
  const timeStamps = [];

  while (timeStamps.length < targetArticleAmount) {
    /*
    The "$$eval" method evaluates a function on multiple elements in the browser context,
    which is useful here because I need to ultimately grab 100 elements (timestamps).

    The 1st parameter provided is the CSS selector ".age" (the associated Class name of each timestamp).
    The 2nd parameter is a function that uses the ".age" Class to retrieve the
    associated attributes called "title" (the attribute name of the actual raw timestamps).
    Finally I'm then mapping these "title" attributes to the freshTimeStamps array.
    */
    const freshTimeStamps = await page.$$eval(timeStampClass, (elements) => {
      return elements.map((elements) => elements.getAttribute(`title`));
    });

    /*
    Loop through the freshTimeStamps array:
    1. Check the current timeStamp does not exist in the final timeStamps array to avoid duplication.
    2. Check that the timeStamps array contains no more than 100 elements.
    3. If both conditions are satisfied, push current timeStamp to the final timeStamps array: 
    */
    freshTimeStamps.forEach((timeStamp) => {
      if (!timeStamps.includes(timeStamp) && timeStamps.length < targetArticleAmount) {
        timeStamps.push(timeStamp);
      }
    });

    //Click "More" to load the next 30 articles:
    await moreLink.click();
  }

  console.log(`"timeStamps" array length: ${timeStamps.length}\n`);
  console.log(`\nRaw timestamps:`);
  console.log(timeStamps);

  //Using toSorted() to create a NEW sorted array.
  //However, toSorted() was sorting the timestamps in accending order (oldest article first),
  //but the raw timestamps are in decending order (newest article first).
  //So if I reverse-sort the raw timestamps using toReversed(), the sorted timestamps should be
  //in the same format as the raw timestamps, plus sorted programatically.
  const sortedTimeStamps = timeStamps.toSorted().toReversed();

  console.log(`\nSorted timestamps:`);
  console.log(sortedTimeStamps);

  //Loop through the timeStamps and sortedTimeStamps arrays and compare each element.
  //I'm storing the result in boolean form, so that I can output a simple "true/false" later on.
  const compareTimestamps = () => {
    let areArticlesSorted = false;
    for (let i = 0; i < timeStamps.length; i++) {
      if (timeStamps[i] !== sortedTimeStamps[i]) {
        console.log(`\nArticle timestamps MISMATCH!\nArticles are unlikely to be in order.`);
        console.log(timeStamps[i], ` | `, sortedTimeStamps[i]);
      } else {
        //Assert that each timestamp matches:
        expect(timeStamps[i] === sortedTimeStamps[i]);

        //Only set "areArticlesSorted" to true if no mismatches were found:
        areArticlesSorted = true;
      }
    }
    //If true, no timestamp mismatches were found, meaning the articles are sorted.
    //If false, timestamp mismatches were found, meaning the articles aren't sorted.
    return areArticlesSorted;
  };

  //Assert that the result of compareTimestamps() is true:
  expect(compareTimestamps);

  //Output a message depending on the result of compareTimestamps():
  if (compareTimestamps()) {
    console.log(`All timestamps match!\nThe first 100 articles are likely sorted from newest to oldest.`);
  } else {
    console.log(`Timestamps mismatch found!\nThe articles are unlikely to be sorted.`);
  }
}

(async () => {
  await sortHackerNewsArticles();
})();
