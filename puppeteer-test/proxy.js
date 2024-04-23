const puppeteer = require("puppeteer");
const ua_list = require("./ua.json");

function getRandomItemFromArray(array) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

const page_ua = getRandomItemFromArray(ua_list)
const url = "https://www.asillumious.com/hot-sale/";
const proxyServer = "47.254.47.185:2218";
// const proxyUser = 'USERNAME';
// const proxyPass = 'PASSWORD'

(async (puppeteer) => {
  const browser = await puppeteer.launch({
    args: [
      `--proxy-server=${proxyServer}`, 
      '--blink-settings=imagesEnabled=false',
      '--no-sandbox',
      '--disable-setuid-sandbox'
    ],
    ignoreHTTPSErrors: true,
    // headless: false,
  });
  const page = await browser.newPage();
  // await page.authenticate({proxyUser, proxyPass});
  await page.setUserAgent(page_ua);
  await page.goto(url);



})(puppeteer);


