const UserAgent = require('user-agents')

const fs = require("fs");


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

const values = ['mobile', 'desktop', 'tablet'];
const probabilities = [0.7, 0.2, 0.1];
const getRadomUA = (len)=>{
  return new Array(len).fill(0).map(a => {
    const e = getRandomValueWithProbability(values, probabilities)
    const value = new UserAgent({ deviceCategory: e })
    return value.data.userAgent
  })
}

const list = getRadomUA(500)

fs.writeFile("ua.json", JSON.stringify(list), 'utf8', function (err) { 
  if (err) { 
      console.log("An error occured while writing JSON Object to File."); 
      return console.log(err); 
  } 

  console.log("JSON file has been saved."); 
});
