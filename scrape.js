const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();

  // Navigate to the target website
  await page.goto('https://killercoda.com');

  // Extract data: Page title and first heading
  const result = await page.evaluate(() => {
    const pageTitle = document.title;
    const firstHeading = document.querySelector('h1') ? document.querySelector('h1').innerText : 'No H1 found';
    return { pageTitle, firstHeading };
  });

  // Save the extracted data to a JSON file
  fs.writeFileSync('extracted-data.json', JSON.stringify(result, null, 2));

  console.log('Data saved to extracted-data.json');

  await browser.close();
})();