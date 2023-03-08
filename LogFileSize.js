


const puppeteer = require('puppeteer');


(async () => {
 const browser = await puppeteer.launch({headless: false});
 const page = await browser.newPage();


//listen to network event
const requestSizes = {};
page.on('response', async (response) => {
 // Get the URL of the response
 const url = response.url();


 // Get the content-length header from the response
 const contentLength = response.headers()['content-length'];


 // If the content-length header is present, store its value
 if (contentLength) {
   requestSizes[url] = parseInt(contentLength);
 }
});


 await page.goto('https://google.com');


 const totalSize = Object.values(requestSizes).reduce((acc, size) => acc + size, 0);
 console.log(totalSize);
})();
