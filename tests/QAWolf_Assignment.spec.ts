import { test, expect, chromium } from "@playwright/test";

test.only("QA Wolf Assignment: First 100 articles are sorted", async ({ page }) => {
  await page.goto("https://news.ycombinator.com/newest");

  //The website only shows 30 articles at a time.
  //I'm going to need to click this link to show more.
  //Locator for the "More" link:
  const moreLink = page.locator(`.morelink`);

  //Class for each timestamp:
  const timeStampClass = `.age`;

  //I'm only checking the first 100 articles:
  const targetArticleAmount = 100;

  //Initialise an array to eventually hold the timestamps:
  const timeStamps: any = [];

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

  console.log(`timeStamps (raw):`);
  console.log(timeStamps);
  console.log(`timeStamps length: ${timeStamps.length}`);

  //Using toSorted() to create a NEW sorted array.
  //However, toSorted() was sorting the timestamps in accending order (earliest first),
  //however the raw timestamps are in decending order (latest article first).
  //So if I reverse-sort the raw timestamps, the sorted timestamps should be in the same format
  //as the raw timestamps but also programatically sorted.
  const sortedTimeStamps = timeStamps.toSorted();
  const reversedTimeStamps = sortedTimeStamps.toReversed();
  //console.log(`timeStamps (sorted):`);
  //console.log(sortedTimeStamps);
  console.log(`timeStamps (reversed):`);
  console.log(reversedTimeStamps);

  for (let i = 0; i < timeStamps.length; i++) {
    if (timeStamps[i] !== reversedTimeStamps[i]) {
      console.log(`Timestamps MISMATCH!`);
      console.log(timeStamps[i], ` `, reversedTimeStamps[i]);
    } else {
      console.log(`Timestamps match!`);
    }
  }
});

async function sortHackerNewsArticles() {
  // launch browser
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  // go to Hacker News

  await page.pause();
  await page.goto("https://news.ycombinator.com/newest");
}

// (async () => {
//   await sortHackerNewsArticles();
// })();
