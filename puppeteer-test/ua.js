const fs = require("fs");

// iphone
function generateRandomIPhoneUserAgent() {
  const iOSVersion = `${Math.floor(Math.random() * 15)}.${Math.floor(Math.random() * 5)}`;
  const safariVersion = `${Math.floor(Math.random() * 15)}.${Math.floor(Math.random() * 5)}`;
  const AppleWebKitVersion = Math.floor(Math.random() * 1000) + 500;
  const mobileSafariVersion = Math.floor(Math.random() * 1000) + 500;
  
  return `Mozilla/5.0 (iPhone; CPU iPhone OS ${iOSVersion.replace('.', '_')} like Mac OS X) AppleWebKit/${AppleWebKitVersion} (KHTML, like Gecko) Version/${safariVersion} Mobile/${mobileSafariVersion} Safari/${AppleWebKitVersion}`;
}

// ipad
function generateRandomIPadUserAgent() {
  const iOSVersion = `${Math.floor(Math.random() * 15)}.${Math.floor(Math.random() * 5)}`;
  const safariVersion = `${Math.floor(Math.random() * 15)}.${Math.floor(Math.random() * 5)}`;
  const AppleWebKitVersion = Math.floor(Math.random() * 1000) + 500;
  const mobileSafariVersion = Math.floor(Math.random() * 1000) + 500;
  
  return `Mozilla/5.0 (iPad; CPU OS ${iOSVersion.replace('.', '_')} like Mac OS X) AppleWebKit/${AppleWebKitVersion} (KHTML, like Gecko) Version/${safariVersion} Mobile/${mobileSafariVersion} Safari/${AppleWebKitVersion}`;
}

// 安卓 手机
function generateRandomAndroidUserAgent() {
  const androidVersion = `${Math.floor(Math.random() * 10)}.${Math.floor(Math.random() * 10)}.${Math.floor(Math.random() * 10)}`;
  const chromeVersion = `${Math.floor(Math.random() * 100)}.${Math.floor(Math.random() * 100)}.${Math.floor(Math.random() * 100)}`;
  const webkitVersion = Math.floor(Math.random() * 1000) + 500;
  
  function generateRandomDevice() {
    const devices = ['Nexus 5', 'Galaxy S20', 'Pixel 4', 'OnePlus 8', 'Xperia XZ'];
    return devices[Math.floor(Math.random() * devices.length)];
  }
  return `Mozilla/5.0 (Linux; Android ${androidVersion}; ${generateRandomDevice()}) AppleWebKit/${webkitVersion} (KHTML, like Gecko) Chrome/${chromeVersion} Mobile Safari/${webkitVersion}`;
}

// 安卓平板
function generateRandomAndroidTabletUserAgent() {
  const androidVersion = `${Math.floor(Math.random() * 10)}.${Math.floor(Math.random() * 10)}.${Math.floor(Math.random() * 10)}`;
  const chromeVersion = `${Math.floor(Math.random() * 100)}.${Math.floor(Math.random() * 100)}.${Math.floor(Math.random() * 100)}`;
  const webkitVersion = Math.floor(Math.random() * 1000) + 500;
  
  function generateRandomDevice() {
    const devices = ['Nexus 7', 'Galaxy Tab S7', 'Pixel C', 'Xperia Z4 Tablet', 'MediaPad M5'];
    return devices[Math.floor(Math.random() * devices.length)];
  }
  return `Mozilla/5.0 (Linux; Android ${androidVersion}; ${generateRandomDevice()}) AppleWebKit/${webkitVersion} (KHTML, like Gecko) Chrome/${chromeVersion} Safari/${webkitVersion}`;
}

// PC
function generateRandomPCUserAgent() {

  function generateRandomChromeVersion() {
    return `${Math.floor(Math.random() * 100)}.${Math.floor(Math.random() * 100)}.${Math.floor(Math.random() * 100)}`;
  }

  function generateRandomSafariVersion() {
    return `${Math.floor(Math.random() * 1000) + 500}`;
  }

  function generateRandomWebkitVersion() {
    return `${Math.floor(Math.random() * 1000) + 500}`;
  }

  function generateRandomArchitecture() {
    const architectures = ['Win64', 'x86_64', 'Intel Mac OS X 10_15_7', 'Linux x86_64'];
    return architectures[Math.floor(Math.random() * architectures.length)];
  }

  const osVersions = ['Windows NT 10.0', 'Windows NT 6.3', 'Windows NT 6.2', 'Windows NT 6.1', 'Windows NT 6.0', 'Windows NT 5.1', 'Windows NT 5.0', 'Macintosh', 'Linux'];
  const os = osVersions[Math.floor(Math.random() * osVersions.length)];

  let browser;
  if (os.startsWith('Windows')) {
      browser = `Chrome/${generateRandomChromeVersion()}`;
  } else if (os === 'Macintosh') {
      browser = `Safari/${generateRandomSafariVersion()}`;
  } else {
      browser = `Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/${generateRandomWebkitVersion()} (KHTML, like Gecko) Chrome/${generateRandomChromeVersion()} Safari/${generateRandomWebkitVersion()}`;
  }
  
  return `Mozilla/5.0 (${os}; ${generateRandomArchitecture()}) ${browser}`;
}

function getRandomValueWithProbability(values, probabilities) {
  // 验证输入参数
  if (!Array.isArray(values) || !Array.isArray(probabilities)) {
      throw new Error('Input parameters must be arrays');
  }
  if (values.length !== probabilities.length) {
      throw new Error('Length of values array must be equal to length of probabilities array');
  }
  if (probabilities.some(p => p < 0 || p > 1)) {
      throw new Error('Probabilities must be between 0 and 1');
  }

  // 计算总概率
  const totalProbability = probabilities.reduce((acc, prob) => acc + prob, 0);

  // 随机生成一个概率值
  const randomValue = Math.random() * totalProbability;

  // 找到对应的值
  let sum = 0;
  for (let i = 0; i < probabilities.length; i++) {
      sum += probabilities[i];
      if (randomValue <= sum) {
          return values[i];
      }
  }
}

// 示例用法
const values = ['m', 'pc', 'pad'];
const probabilities = [0.7, 0.2, 0.1];

// 示例用法
const getRadomUA = (len)=>{
  return new Array(len).fill(0).map(a => {
    const e = getRandomValueWithProbability(values, probabilities)
    switch(e){
      case 'm': 
        return Math.random() >= 0.5 ? generateRandomIPhoneUserAgent() : generateRandomAndroidUserAgent()
      case 'pc': 
        return generateRandomPCUserAgent();
      case 'pad': 
      return Math.random() >= 0.5 ? generateRandomIPadUserAgent() : generateRandomAndroidTabletUserAgent()
    }
  })
}
// 1. 需要虚拟出一个user-agent 池子(移动端70%/PC端20%/PAD设备10%），根据代理的（IP+端口）hash 然后对池子长度取模，获取对应的user-agent。
// 2. 对应的设备要对应的分辨率
// 3. 通过这个api获取代理ip和端口，每个10分钟有效，按流量收费，先不要用这个，等正式上线开跑了再用https://api.smartproxy.cn/web_v1/ip/get-ip-v3?app_key=03760ba3245607f14cba2951dc3b284c&pt=9&num=2&ep=&cc=US&state=&city=&life=30&protocol=1&format=json&lb=%5Cr%5Cn

const list = getRadomUA(500)

fs.writeFile("ua.json", JSON.stringify(list), 'utf8', function (err) { 
  if (err) { 
      console.log("An error occured while writing JSON Object to File."); 
      return console.log(err); 
  } 

  console.log("JSON file has been saved."); 
});
