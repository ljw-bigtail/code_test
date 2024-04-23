const cheerio = require("cheerio");
const puppeteer = require("puppeteer");
const ua_list = require("./ua.json");

function getRandomItemFromArray(array) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

function sleep(sec = 10 + Math.ceil(10 * Math.random())) {
  return new Promise((res) => {
    setTimeout(() => {
      res();
    }, sec * 1000);
  });
}

async function autoScroll(page, distance = 100, toScrollHeight = 120000) {
  await page.evaluate(
    async ({ distance, toScrollHeight }) => {
      await new Promise((resolve, reject) => {
        var totalHeight = 0;
        var timer = setInterval(
          ([distanceTime, toScrollHeightTime]) => {
            var scrollHeight = document.body.scrollHeight;
            window.scrollBy(0, distanceTime);
            totalHeight += distanceTime;

            if (
              totalHeight >= scrollHeight ||
              totalHeight > toScrollHeightTime
            ) {
              clearInterval(timer);
              resolve();
            }
          },
          100,
          [distance, toScrollHeight]
        );
      });
    },
    { distance, toScrollHeight }
  );
}

async function rePage(browser, page, isTrue, isScroll, url) {
  try {
    await page.goto(url);

    // 首页 start
    const close = "body > div.popup-lightbox .popup-close";
    await page.waitForSelector(close);
    await page.click(close);
    // 首页 end

    const new_in = "body > header > nav > ul > li:nth-child(2) > h2 > a";
    await page.click(new_in);
    console.log('查看列表页');
    // await page.waitForNavigation({ waitUntil: "domcontentloaded" });
    // await page.waitForSelector(
    //   "#wrapper div.pagination"
    // );
    // const nextpage =
    //   "#wrapper div.pagination > div.active+a";
    if (isScroll) {
      const bodysHeight = await page.$eval("body", (dom) => dom.scrollHeight);
      await autoScroll(
        page,
        Math.floor(200 * Math.random() * 0.5 + 50),
        Math.floor(bodysHeight * Math.random())
      );
      await sleep();
    }
    // await page.waitForSelector(
    //   "#wrapper div.pagination"
    // );
    // await page.click(nextpage);
    const detailList =
      "#wrapper div.product-list";
    await page.waitForSelector(detailList);
    const count = await page.$eval(
      detailList,
      (element) =>
        element.querySelectorAll(".product-box") &&
        element.querySelectorAll(".product-box").length
    );
    const index = Math.floor(count * Math.random());
    const bodyInnerHTML = await page.$eval("body", (dom) => dom.innerHTML);
    const $ = cheerio.load(bodyInnerHTML);
    const id = $(`div.product-list > div.product-box`).eq(index).data("id");
    await page.click(`div.product-list > div.product-box[data-id="${id}"]`);
    console.log('查看详情页');
    await sleep(3);
    const pages = await browser.pages();
    const newPage = pages[pages.length - 1]; // 获取最新打开的页面
    if (isScroll) {
      const bodysHeight = await newPage.$eval(
        "body",
        (dom) => dom.scrollHeight
      );
      console.log(bodysHeight);
      await autoScroll(
        newPage,
        Math.floor(200 * Math.random() * 0.5 + 50),
        Math.floor(bodysHeight * Math.random())
      );
      await sleep();
    }
    if (isTrue) {
      await newPage.waitForSelector("#AddToCart");
      await newPage.click("#AddToCart");
    }
  } catch (err) {
    console.log(err);
    await rePage(browser, page, isTrue, isScroll, url);
  }
}

async function rePageM(browser, page, isTrue, isScroll, url) {
  try {
    await page.goto(url);
    const close = "body > div.popup-lightbox .popup-close";
    await page.waitForSelector(close);
    await page.click(close);
    const new_in =
      "body > header > div.wrapper > div.head-left > a.sidenav-trigger.waves-effect.waves-classic > i";
    await page.click(new_in);
    await sleep(1);
    // const newpop =
    //   "#menu-slide-out > ul > li.sidenav-bottom > ul > li:nth-child(6) > h2 > a";
    // await page.click(newpop);
    const hot = "#menu-slide-out > ul > li.sidenav-bottom > ul > li:nth-child(3) > h2 > a"
    await page.click(hot);
    await page.waitForNavigation({ waitUntil: "domcontentloaded" });
    console.log('查看列表页');
    if (isScroll) {
      const bodysHeight = await page.$eval("body", (dom) => dom.scrollHeight);
      await autoScroll(
        page,
        Math.floor(200 * Math.random() * 0.5 + 50),
        Math.floor(bodysHeight * Math.random())
      );
      await sleep();
    }
    const pagelist =
      "#page > main > section > div > div > div > div > div > div.j-list-infinite-scroll";
    const count = await page.$eval(
      pagelist,
      (element) =>
        element.querySelectorAll(".newProduct") &&
        element.querySelectorAll(".newProduct").length
    );
    const index = Math.ceil(count * Math.random());
    await page.click(
      `div.j-list-infinite-scroll > div.newProduct:nth-child(${index + 3})`
    );
    console.log('查看详情页');
    await sleep(10);
    if (isScroll) {
      const bodysHeight = await page.$eval("body", (dom) => dom.scrollHeight);
      await autoScroll(
        page,
        Math.floor(200 * Math.random() * 0.5 + 50),
        Math.floor(bodysHeight * Math.random())
      );
      await sleep();
    }
    if (isTrue) {
      await page.waitForSelector("#AddToCart");
      await page.click("#AddToCart");
    }
  } catch (err) {
    await rePageM(browser, page, isTrue, isScroll, url);
  }
}

const https = require('https');

const getIp = ()=>{
  const url = `https://api.smartproxy.cn/web_v1/ip/get-ip-v3?app_key=03760ba3245607f14cba2951dc3b284c&pt=9&num=1&ep=&cc=US&state=&city=&life=30&protocol=1&format=json&lb=%5Cr%5Cn`
  return new Promise((res, rej)=>{
    https.get(url, (response) => {
      let todo = '';
      response.on('data', (chunk) => {
        todo += chunk;
      });
      response.on('end', () => {
        const data = JSON.parse(todo)
        res(data.data.list[0])
      });
    }).on("error", (error) => {
      rej("Error: " + error.message);
    });
  })
}

function formatDate(date = new Date()) {
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  const hours = ('0' + date.getHours()).slice(-2);
  const minutes = ('0' + date.getMinutes()).slice(-2);
  const seconds = ('0' + date.getSeconds()).slice(-2);
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

// const url = 'https://xx.tujust.com/'
const url = "https://www.asillumious.com/";
// const url = "https://jellmate.chimpone.com/";
// const url = "https://www.asillumious.com/?browser_mode=h5";
// const url ="https://www.godeskplus.com/products/vintage-american-flag-1776-mens-cotton-t-shirt-7601229.html?from=rv";
// const url = "https://www.godeskplus.com";
// const url ="https://www.godeskplus.com/?browser_mode=pc";
// const proxyServer = "47.254.47.185:2218";
// const proxyUser = 'USERNAME';
// const proxyPass = 'PASSWORD'
let qty = 0;
let log = []

const app = ['https://www.facebook.com/', 'https://www.google.com/', 'https://www.twitter.com/home', 'https://www.instagram.com/']

const once = async (puppeteer)=>{
  const start = +new Date()
  const proxyServer = await getIp()

  const browser = await puppeteer.launch({
    args: [
      `--proxy-server=${proxyServer}`,
      "--blink-settings=imagesEnabled=false",
      "--no-sandbox",
      "--disable-setuid-sandbox",
    ],
    defaultViewport: null,
    ignoreHTTPSErrors: true,
    headless: false,
  });

  const page = await browser.newPage();
  // await page.authenticate({proxyUser, proxyPass});

  // const page_ua = 'Mozilla/5.0 (Linux; Android 9.7.5; OnePlus 8) AppleWebKit/1099 (KHTML, like Gecko) Chrome/64.94.44 Mobile Safari/1099'
  // const page_ua = ua_list[4];
  const page_ua = getRandomItemFromArray(ua_list);

  const isMobile = /Mobile|Android|iPhone|iPad|Phone/i.test(page_ua);
  await page.setUserAgent(page_ua);
  
  await page.setExtraHTTPHeaders({
    'Referer': getRandomItemFromArray(app)
  });


  console.log('开始进程：');
  console.log("IP：" + proxyServer);
  if (isMobile) {
    console.log("移动设备：" + page_ua);
    await page.setViewport({ width: 390, height: 844 });
    await rePageM(browser, page, true, true, url + '?browser_mode=h5');
  } else {
    console.log("桌面设备：" + page_ua);
    await page.setViewport({ width: 1920, height: 1080 });
    await rePage(browser, page, true, true, url + '?browser_mode=pc');
  }

  qty++

  const log_item = log.find(e => {
    e.ua === page_ua
  })
  const count = log_item ? log_item.count+1 : 1

  log.push({
    ip: proxyServer,
    ua: page_ua,
    count: count,
    now: formatDate(),
    long: +new Date() - start
  })
  
  console.log({
    ip: proxyServer,
    ua: page_ua,
    count: count,
    now: formatDate(),
    timecost: +new Date() - start
  });

  await sleep(3);
  await browser.close()

  if(qty < 5){
    await once(puppeteer)
  }else{
    console.log(`任务结束，${qty}个已处理。`);
    fs.writeFile("state.json", JSON.stringify({
      log
    }), 'utf8', function (err) { 
      if (err) { 
        console.log("An error occured while writing JSON Object to File."); 
        return console.log(err); 
      } 
      console.log("JSON file has been saved."); 
    });
  }

}

(async (puppeteer) => {
  await once(puppeteer)
})(puppeteer);



