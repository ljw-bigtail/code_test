const fs = require("fs");
const path = require("path");
const https = require("https");
const http = require("http");
const cheerio = require("cheerio");
const puppeteer = require("puppeteer");
const pdfkit = require("pdfkit");
const sharp = require('sharp');

// 参数配置
const config = {
  base: "http://m.qiman57.com/", // 爬取的网页
  id: 16080, // 漫画id
  bookName: "after_the_one", // 漫画名称
  dir: "",
  waitDay: 7, // 每7天更新一次列表
  // userPassword: 'test', // 打开密码
};
config.dir = "end/" + config.bookName; // 保存的文件夹名称

// 文件夹不存在就创建
async function exitsDir(reaPath) {
  const absPath = path.resolve(__dirname, reaPath);
  try {
    await fs.readdirSync(absPath);
  } catch (e) {
    await fs.mkdirSync(absPath, { recursive: true });
  }
}

// 手动延时
async function delay(time){
  return new Promise(res => {
    setTimeout(()=>{
      res()
    }, time)
  })
}

/**
 * 使用文件进行数据缓存
 */
class FileCache {
  constructor(filename) {
    this.filename = filename;
    this.cache = undefined;
  }
  async clear() {
    await fs.writeFileSync("");
  }
  async get() {
    if (this.cache) return this.cache;
    const cahceFileString = await this.exitsFile(this.filename);
    try {
      this.cache = JSON.parse(cahceFileString);
    } catch (err) {
      this.cache = {};
    }
    return this.cache;
  }
  async set() {
    this.cache = this.cache ?? (await this.get());
    if (arguments.length == 1) {
      if (typeof arguments[0] == "object") {
        this.cache = Object.assign({}, this.cache, arguments[0]);
      } else {
        console.error("arguments[0] type err");
      }
    } else if (arguments.length == 2) {
      const [key, value] = arguments;
      this.cache[key] = value;
    } else {
      console.error("arguments err");
    }
    const absPath = path.resolve(__dirname, this.filename);
    await fs.writeFileSync(absPath, JSON.stringify(this.cache));
    return this.cache;
  }
  async exitsFile(reaPath) {
    const absPath = path.resolve(__dirname, reaPath);
    try {
      await fs.statSync(absPath);
    } catch (e) {
      await fs.writeFileSync(absPath, "", { recursive: true });
    }
    return await fs.readFileSync(absPath);
  }
}

// 获取章节列表
const getListJSON = async (browser) => {
  // 获取DOM
  const page = await browser.newPage();
  await page.goto(`${config.base}${config.id}/`);
  await page.click(".show-more");
  await page.waitForResponse((res) => {
    return res.request().url().includes("bookchapter");
  });
  const bodyInnerHTML = await page.$eval("body", (dom) => dom.innerHTML);
  // DOM => array
  const getList = (data) => {
    const $ = cheerio.load(data);
    const _data = $(".catalog-box .catalog-list ul li")
      .map((e, el) => {
        const a = $(el).find("a");
        return {
          href: a.attr("href"),
          name: a.text(),
        };
      })
      .toArray();
    return _data;
  };
  const data = getList(bodyInnerHTML);
  // 关闭页面
  await page.close();
  return data;
};

// 批量存储图片
function saveImgs(imgs) {
  imgs.map((img) => {
    (img.src.includes("https:") ? https : http).get(img.src, (res) => {
      let imgData = "";
      res.setEncoding("binary");
      res.on("data", (chunk) => {
        imgData += chunk;
      });
      res.on("end", async () => {
        await fs.writeFileSync(`./${config.dir}/${img.file}`, imgData, "binary");
      });
    });
  });
}

// 图片倒出道pdf
const imgToPDF = async function (imgs, outFilename) {
  // pdf
  const pdfName = `./${config.dir}/pdf/${outFilename}`
  let doc = null
  try{
    doc = new pdfkit({
      autoFirstPage: false, // 不要第一页
      Title: config.bookName,
      // userPassword: config.userPassword,
    });
    doc.pipe(fs.createWriteStream(pdfName));
    // A4 (595.28 x 841.89)
    // 图片尺寸 (800 * 1270)
    imgs.map((img) => {
      const _imgSrc = reSetExt(`./${config.dir}/${img.file}`, 'jpg')
      // console.log(_imgSrc);
      doc
        .addPage({
          margin: 0,
        })
        .image(_imgSrc, 0, 0, {
          fit: [580, 800],
          align: "center",
          valign: "center",
        });
    });
    doc.end();
  }catch(err){
    console.log('PDF 存储异常：', outFilename);
    fs.rmSync(pdfName)
  }
};

// webp => jpg
async function imgFormat(imgs){
  if(!imgs)return
  for (let index = 0; index < imgs.length; index++) {
    const imgSrc = `./${config.dir}/${imgs[index].file}`
    const _imgSrc = reSetExt(imgSrc, 'jpg')
    if(getExt(imgSrc) != 'jpg'){
      try{
        await fs.readFileSync(_imgSrc)
      }catch(e){
        await sharp(imgSrc).toFile(_imgSrc)
      }
    }
  }
}

const reverseIndex = function(sub, index){
  return (sub - index).toString().padStart(4, '0')
}

const getExt = function(name){
  let ext = name.substring(name.lastIndexOf(".")+1)
  return ['jpg', 'webp'].includes(ext) ? ext : 'jpg'
}

const reSetExt = function(name, ext){
  const _ext = getExt(name)
  const reg = new RegExp(_ext)
  return name.replace(reg, ext)
}

// 根据任务列表递归查询图片地址列表 并 保存图片
const task = async (browser, list, index, cb) => {
  if (list.length == index) {
    // 任务结束关闭浏览器
    console.log("2. 图片缓存完毕。");
    fileCache.set("done", 1); // 缓存完
    await browser.close();
    cb && cb();
    return;
  }
  // 有缓存时 跳过并执行下一个任务
  let imgs = list[index].imgs;
  if (!imgs) {
    const page = await browser.newPage();
    await page.goto(`${config.base}${list[index].href}`);
    const newImgs = await page.evaluate(() => window.newImgs);
    imgs = newImgs.map((e, i) => {
      let ext = getExt(e)
      return {
        src: e,
        file: `img/${reverseIndex(list.length, index)}_${i + 1}_${list[index].name}.${ext}`,
      };
    });
    list[index].imgs = imgs;
    // 保存文件
    await saveImgs(imgs);
    // 成功后 添加缓存
    cache = await fileCache.set("list", list);
    page && await page.close();
  }
  // await delay(300)
  // 递归 查询下一个任务
  await task(browser, list, ++index, cb);
};

// 创建缓存文件
const fileCache = new FileCache(`./${config.dir}/cache.json`);
let browser = null;

// 任务
const run_img = async (browser, cache) => {  
  await task(browser, cache.list, 0, function () {
    console.log("任务结束。");
  });
};

async function run_pdf(list){
  // 多图转pdf
  for (let index = 0; index < list.length; index++) {
    const pdfName = `${reverseIndex(list.length, index)}_${list[index].name}.pdf`;
    let needsPDF = false;
    try {
      await fs.statSync(`./${config.dir}/pdf/${pdfName}`);
    } catch (e) {
      needsPDF = true;
    }
    if (needsPDF) {
      await imgFormat(list[index].imgs)
      await imgToPDF(list[index].imgs, pdfName);
    }
  }
}


process.on("uncaughtException", async function (err) {
  await fileCache.set("done", 0); // 任务缓存未完
  console.log("缓存异常：", err);
  browser && (await browser.close());
  process.exit(0);
});

(async function(){
  await exitsDir(`./${config.dir}/img`);
  await exitsDir(`./${config.dir}/pdf`);

  let cache = await fileCache.get();
  // 时间小于 X 天就不执行
  let stopInfo = "";
  if (cache.list && cache.updateTime) {
    if (+new Date() - cache.updateTime < 1000 * 60 * 60 * 24 * config.waitDay) {
      stopInfo = "还没到设定的更新时间。";
    }
  }
  if (cache.done == 0) {
    // 未完成 继续处理
    stopInfo = "";
  }
  if (stopInfo !== "") {
    console.log("任务暂停：" + stopInfo);
    return;
  }
  console.log("任务开始：");
  // 获取并保存列表缓存
  let list = null;
  if (!cache.list) {
    list = await getListJSON(browser);
    cache = await fileCache.set({
      list: list,
      updateTime: +new Date(),
    });
  }
  console.log("1. 列表获取完毕。");

  browser = await puppeteer.launch({ headless: false });
  await run_img(browser, cache)

  await run_pdf(cache.list)
})()
