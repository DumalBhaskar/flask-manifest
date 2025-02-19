const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const targetWebsite = process.env.SCRAPE_URL
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();

  // Navigate to the target website
  await page.goto(targetWebsite);

  // Extract data: Page title and first heading
  const result = await page.evaluate(() => {
    const pageTitle = document.title;
    const firstHeading = document.querySelector('h1') ? document.querySelector('h1').innerText : 'No H1 found';
    return { pageTitle, firstHeading };
  });

  // Save the extracted data to a JSON file
  fs.writeFileSync('scraped_data.json', JSON.stringify(result, null, 2));

  console.log('Data saved to scraped_data.json');

  await browser.close();
})();